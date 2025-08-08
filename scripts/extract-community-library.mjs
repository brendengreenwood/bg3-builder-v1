#!/usr/bin/env node
/**
 * BG3 Community Library extractor (no external deps; Node ESM)
 *
 * Usage:
 *   node scripts/extract-community-library.mjs --src "path/to/CommunityLibrary_extracted" --out "data/json/community"
 *
 * Notes:
 * - Expects an UNPACKED CommunityLibrary directory (PAK -> folder)
 *   Typical structure contains Stats/Generated/Data with .txt files (SpellData, PassiveData, StatusData, Armor, Weapon, etc.)
 * - This parses the Stats KV format into JSON. Localization (DisplayName/Description) is not resolved here; we keep raw keys/handles.
 * - Output: separate JSON files for spells, passives, statuses, items.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
function getArg(name, def = undefined) {
  const i = args.indexOf(name);
  if (i !== -1 && i + 1 < args.length) return args[i + 1];
  return def;
}

const SRC = getArg('--src');
const OUT = getArg('--out', 'data/json/community');

if (!SRC) {
  console.error('[extract] Missing --src path to extracted Community Library directory.');
  console.error('Example: npm run extract:community -- --src "C:/mods/CommunityLibrary" --out "data/json/community"');
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walkDir(dir, filterFn) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...walkDir(p, filterFn));
    } else if (!filterFn || filterFn(p)) {
      results.push(p);
    }
  }
  return results;
}

// Very light parser for BG3 Stats .txt format
// Supports patterns like:
//   new entry "ID", type "SpellData"
//   using "PARENT_ID"
//   data "Key" "Value"
// Blocks separated by blank lines or next 'new entry'.

const NEW_ENTRY_RE = /^\s*new\s+entry\s+"([^"]+)"\s*,\s*type\s+"([^"]+)"/i;
const USING_RE = /^\s*using\s+"([^"]+)"/i;
const DATA_RE = /^\s*data\s+"([^"]+)"\s+"([\s\S]*)"\s*$/i;

function parseStatsFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const entries = [];
  let current = null;

  const flush = () => {
    if (current) {
      entries.push(current);
      current = null;
    }
  };

  for (let raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('//')) {
      // blank or comment separates blocks
      continue;
    }
    const mEntry = line.match(NEW_ENTRY_RE);
    if (mEntry) {
      flush();
      current = {
        id: mEntry[1],
        type: mEntry[2],
        using: undefined,
        data: {},
        sourceFile: path.basename(filePath),
      };
      continue;
    }
    if (!current) {
      // Lines before first entry; skip.
      continue;
    }
    const mUsing = line.match(USING_RE);
    if (mUsing) {
      current.using = mUsing[1];
      continue;
    }
    const mData = line.match(DATA_RE);
    if (mData) {
      const key = mData[1];
      const value = mData[2].replace(/"\s*$/,''); // defensive trim of trailing quote if any anomalies
      // Allow repeated keys -> store as array
      if (current.data[key] === undefined) {
        current.data[key] = value;
      } else if (Array.isArray(current.data[key])) {
        current.data[key].push(value);
      } else {
        current.data[key] = [current.data[key], value];
      }
      continue;
    }
    // Unknown line; ignore but could log for diagnostics
  }
  flush();
  return entries;
}

function collectStatsEntries(statsRoot) {
  const dataRoot = path.join(statsRoot, 'Stats', 'Generated', 'Data');
  const files = walkDir(dataRoot, p => p.toLowerCase().endsWith('.txt'));
  const all = [];
  for (const f of files) {
    try {
      const entries = parseStatsFile(f);
      all.push(...entries);
    } catch (e) {
      console.warn(`[extract] Failed to parse ${f}:`, e.message);
    }
  }
  return all;
}

function partitionByType(entries) {
  const map = new Map();
  for (const e of entries) {
    if (!map.has(e.type)) map.set(e.type, []);
    map.get(e.type).push(e);
  }
  return map;
}

function writeJSON(outDir, name, obj) {
  ensureDir(outDir);
  const p = path.join(outDir, name);
  fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf8');
  console.log(`[extract] Wrote ${name} (${Array.isArray(obj) ? obj.length : 'object'})`);
}

(function main() {
  const statsRoot = SRC;
  const outRoot = path.isAbsolute(OUT) ? OUT : path.join(process.cwd(), OUT);
  ensureDir(outRoot);

  const all = collectStatsEntries(statsRoot);
  const byType = partitionByType(all);

  // Core domains
  const spells = byType.get('SpellData') || [];
  const passives = byType.get('PassiveData') || [];
  const statuses = byType.get('StatusData') || [];
  const weapons = byType.get('Weapon') || [];
  const armors = byType.get('Armor') || [];
  const objects = byType.get('Object') || [];

  // Simple items array: merge weapon/armor/object; tag kind
  const items = [
    ...weapons.map(e => ({ ...e, kind: 'Weapon' })),
    ...armors.map(e => ({ ...e, kind: 'Armor' })),
    ...objects.map(e => ({ ...e, kind: 'Object' })),
  ];

  // Write outputs
  writeJSON(outRoot, 'spells.json', spells);
  writeJSON(outRoot, 'passives.json', passives);
  writeJSON(outRoot, 'statuses.json', statuses);
  writeJSON(outRoot, 'items.json', items);

  // Metadata summary
  const summary = {
    source: 'BG3-Community-Library',
    extractedAt: new Date().toISOString(),
    counts: {
      totalEntries: all.length,
      spells: spells.length,
      passives: passives.length,
      statuses: statuses.length,
      items: items.length,
      byType: Object.fromEntries([...byType.entries()].map(([k,v]) => [k, v.length]))
    }
  };
  writeJSON(outRoot, 'summary.json', summary);

  console.log('[extract] Done.');
})();

