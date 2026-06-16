/**
 * Codemod Intl/USD : factorise les fmt* basés sur Intl.NumberFormat / USD.
 * Même moteur que codemod-fmt-be.cjs (classification par comportement exact).
 *
 *   Intl.NumberFormat("fr-FR", {maximumFractionDigits:0}).format(n)            -> fmtInt (identique par spec à toLocaleString)
 *   Intl.NumberFormat("en-US", {style:"currency",currency:"USD",max:0}).format(n) -> fmtUSD
 *   Intl.NumberFormat("en-US").format(n)                                        -> fmtNumberUS
 *
 * Usage : node scripts/codemod-fmt-intl.cjs [--apply]
 */
const fs = require("fs");
const path = require("path");

const APPLY = process.argv.includes("--apply");
const ROOT = path.join(__dirname, "..", "app");

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.tsx?$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const DEF_RE =
  /function\s+(fmt[0-9A-Za-z]*)\s*\(\s*([A-Za-z_]\w*)\s*:\s*number\s*\)\s*:\s*string\s*\{\s*return\s+([\s\S]*?);\s*\}/g;

const canon = (expr) => expr.replace(/\s+/g, "").replace(/,\}/g, "}");

function classify(expr, a) {
  const e = canon(expr);
  if (e === `newIntl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(${a})`)
    return "fmtInt";
  if (
    e ===
    `newIntl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(${a})`
  )
    return "fmtUSD";
  if (e === `newIntl.NumberFormat("en-US").format(${a})`) return "fmtNumberUS";
  return null;
}

const report = { migratedFiles: 0, migratedDefs: 0, skipped: {} };

for (const file of walk(ROOT)) {
  if (file.replace(/\\/g, "/").endsWith("app/lib/fmt.ts")) continue;
  const src = fs.readFileSync(file, "utf8");
  if (!/Intl\.NumberFormat/.test(src) || !/function\s+fmt/.test(src)) continue;

  const needed = new Map();
  let localChanges = 0;

  let changed = src.replace(DEF_RE, (full, name, arg, expr) => {
    if (!/Intl\.NumberFormat/.test(expr)) return full;
    const helper = classify(expr, arg);
    if (!helper) {
      const k = canon(expr).slice(0, 90);
      report.skipped[k] = (report.skipped[k] || 0) + 1;
      return full;
    }
    if (!needed.has(helper)) needed.set(helper, new Set());
    needed.get(helper).add(name);
    localChanges++;
    return "";
  });

  if (localChanges === 0) continue;

  const specifiers = [];
  for (const [helper, names] of needed)
    for (const n of names) specifiers.push(n === helper ? helper : `${helper} as ${n}`);
  const importLine = `import { ${specifiers.join(", ")} } from "@/app/lib/fmt";`;

  changed = changed.replace(/^[ \t]*\n(?=[ \t]*\n)/gm, "");

  const lines = changed.split("\n");
  let insertAt = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === "") continue;
    if (t === '"use client";' || t === "'use client';") insertAt = i + 1;
    break;
  }
  lines.splice(insertAt, 0, importLine);
  changed = lines.join("\n");

  report.migratedFiles++;
  report.migratedDefs += localChanges;
  if (APPLY) fs.writeFileSync(file, changed, "utf8");
}

console.log(APPLY ? "=== APPLIQUÉ ===" : "=== SIMULATION ===");
console.log(`Fichiers migrés     : ${report.migratedFiles}`);
console.log(`Définitions migrées : ${report.migratedDefs}`);
console.log("--- Intl NON classés (laissés) ---");
const sk = Object.entries(report.skipped).sort((a, b) => b[1] - a[1]);
if (!sk.length) console.log("  (aucun)");
sk.forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}×  ${k}`));
