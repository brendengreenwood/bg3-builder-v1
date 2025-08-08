#!/usr/bin/env node
/**
 * BG3 Vanilla extractor (no external deps; Node ESM)
 * Same parser as community extractor, but aimed at extracted game PAKs (Shared, Gustav, etc.).
 *
 * Usage:
 *   node scripts/extract-vanilla.mjs --src "C:/BG3/Extracted" --out "public/data/vanilla"
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
const OUT = getArg('--out', 'public/data/vanilla');
if (!SRC) {
  console.error('[extract-vanilla] Missing --src (root of extracted game data).');
  process.exit(1);
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function walkDir(dir, filterFn) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) results.push(...walkDir(p, filterFn));
    else if (!filterFn || filterFn(p)) results.push(p);
  }
  return results;
}

const NEW_ENTRY_RE = /^\s*new\s+entry\s+"([^"]+)"\s*,\s*type\s+"([^"]+)"/i;
const USING_RE = /^\s*using\s+"([^"]+)"/i;
const DATA_RE = /^\s*data\s+"([^"]+)"\s+"([\s\S]*)"\s*$/i;

function parseStatsFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const entries = [];
  let current = null;
  const flush = () => { if (current) { entries.push(current); current = null; } };
  for (let raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('//')) continue;
    const mEntry = line.match(NEW_ENTRY_RE);
    if (mEntry) { flush(); current = { id: mEntry[1], type: mEntry[2], using: undefined, data: {}, sourceFile: path.basename(filePath) }; continue; }
    if (!current) continue;
    const mUsing = line.match(USING_RE); if (mUsing) { current.using = mUsing[1]; continue; }
    const mData = line.match(DATA_RE); if (mData) { const [_, k, v] = mData; if (current.data[k] === undefined) current.data[k] = v; else if (Array.isArray(current.data[k])) current.data[k].push(v); else current.data[k] = [current.data[k], v]; }
  }
  flush();
  return entries;
}

function collectStatsEntries(root) {
  // Many PAKs: Shared, Gustav, etc. Each may have Stats/Generated/Data.
  const candidates = walkDir(root, p => /Stats[\\\/]Generated[\\\/]Data[\\\/]?$/i.test(p));
  // If we didn’t find directory nodes with the exact name, just search all .txt under /Stats/Generated/Data across tree.
  const txts = walkDir(root, p => p.toLowerCase().endsWith('.txt') && p.toLowerCase().includes(`${path.sep}stats${path.sep}generated${path.sep}data${path.sep}`));
  const files = new Set([...txts]);
  const all = [];
  for (const f of files) {
    try { all.push(...parseStatsFile(f)); } catch (e) { console.warn('[extract-vanilla] parse failed', f, e.message); }
  }
  return all;
}

function partitionByType(entries) {
  const map = new Map();
  for (const e of entries) { if (!map.has(e.type)) map.set(e.type, []); map.get(e.type).push(e); }
  return map;
}

function writeJSON(outDir, name, obj) {
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(obj, null, 2), 'utf8');
  console.log(`[extract-vanilla] Wrote ${name}`);
}

(function main(){
  const outRoot = path.isAbsolute(OUT) ? OUT : path.join(process.cwd(), OUT);
  ensureDir(outRoot);
  const all = collectStatsEntries(SRC);
  const byType = partitionByType(all);
  const spells = byType.get('SpellData') || [];
  const passives = byType.get('PassiveData') || [];
  const statuses = byType.get('StatusData') || [];
  const weapons = byType.get('Weapon') || [];
  const armors = byType.get('Armor') || [];
  const objects = byType.get('Object') || [];
  const items = [
    ...weapons.map(e => ({ ...e, kind: 'Weapon' })),
    ...armors.map(e => ({ ...e, kind: 'Armor' })),
    ...objects.map(e => ({ ...e, kind: 'Object' })),
  ];
  writeJSON(outRoot, 'spells.json', spells);
  writeJSON(outRoot, 'passives.json', passives);
  writeJSON(outRoot, 'statuses.json', statuses);
  writeJSON(outRoot, 'items.json', items);
  writeJSON(outRoot, 'summary.json', {
    source: 'BG3-Vanilla',
    extractedAt: new Date().toISOString(),
    counts: {
      totalEntries: all.length,
      spells: spells.length,
      passives: passives.length,
      statuses: statuses.length,
      items: items.length,
      byType: Object.fromEntries([...byType.entries()].map(([k,v]) => [k, v.length]))
    }
  });
})();

