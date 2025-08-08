#!/usr/bin/env node
/**
 * Resolve localization for extracted stats JSON by joining LOCA (exported) key->string maps.
 * Expected input: a directory with JSON files from the extractor (spells.json, items.json, ...)
 * and a localization TSV/CSV (exported via LSLib) mapping string handles to texts.
 *
 * Usage:
 *   node scripts/resolve-localization.mjs --in "public/data/community" --loc "C:/mods/CommunityLibrary/Localization/export.tsv" --out "public/data/community"
 *
 * This script adds name/description fields to entries when keys are present:
 * - data.DisplayName, data.DisplayNameRef -> name
 * - data.Description, data.DescriptionRef -> description
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
function getArg(name, def = undefined) {
  const i = args.indexOf(name);
  if (i !== -1 && i + 1 < args.length) return args[i + 1];
  return def;
}

const IN = getArg('--in');
const OUT = getArg('--out', IN);
const LOC = getArg('--loc');
if (!IN || !LOC) {
  console.error('Usage: node scripts/resolve-localization.mjs --in <jsonDir> --loc <exported.tsv> [--out <outDir>]');
  process.exit(1);
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function loadLocTSV(file) {
  // Expected columns: key\tvalue  (supports quoted values containing tabs)
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/).filter(l => l.trim().length);
  const map = new Map();
  for (const line of lines) {
    const idx = line.indexOf('\t');
    if (idx === -1) continue;
    const k = line.slice(0, idx);
    const v = line.slice(idx + 1);
    map.set(k, v);
  }
  return map;
}

function applyLocToEntry(e, locMap) {
  const d = e.data || {};
  const nameKey = d.DisplayNameRef || d.DisplayName || d['SpellName'] || d['ItemName'];
  const descKey = d.DescriptionRef || d.Description || d['SpellDescription'] || d['ItemDescription'];
  const name = (nameKey && locMap.get(String(nameKey))) || undefined;
  const description = (descKey && locMap.get(String(descKey))) || undefined;
  if (name) e.name = name;
  if (description) e.description = description;
  return e;
}

(function main(){
  const loc = loadLocTSV(LOC);
  ensureDir(OUT);
  const files = ['spells.json', 'passives.json', 'statuses.json', 'items.json'];
  for (const f of files) {
    const p = path.join(IN, f);
    if (!fs.existsSync(p)) continue;
    const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (Array.isArray(arr)) {
      const out = arr.map(e => applyLocToEntry(e, loc));
      fs.writeFileSync(path.join(OUT, f), JSON.stringify(out, null, 2), 'utf8');
      console.log(`[loc] Updated ${f}`);
    }
  }
})();

