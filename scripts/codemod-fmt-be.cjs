/**
 * Codemod fr-BE : factorise les fmt* locaux des pages /be vers app/lib/fmt.ts.
 * Même principe que codemod-fmt.cjs : classification par COMPORTEMENT exact,
 * import alias pour préserver les appels, et tout ce qui ne matche pas est laissé.
 *
 *   fmtEUR_BE : n.toLocaleString("fr-BE", {min:2, max:2})
 *   fmtIntBE  : Math.round(n).toLocaleString("fr-BE")
 *   fmtPctBE  : (n * 100).toLocaleString("fr-BE", {min:2, max:2})
 *
 * Usage : node scripts/codemod-fmt-be.cjs [--apply]
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

// Normalise : retire tous les espaces, puis la virgule finale avant "}".
function canon(expr) {
  return expr.replace(/\s+/g, "").replace(/,\}/g, "}");
}

function classify(expr, arg) {
  const e = canon(expr);
  const a = arg;
  if (e === `${a}.toLocaleString("fr-BE",{minimumFractionDigits:2,maximumFractionDigits:2})`)
    return "fmtEUR_BE";
  if (e === `Math.round(${a}).toLocaleString("fr-BE")`) return "fmtIntBE";
  if (e === `(${a}*100).toLocaleString("fr-BE",{minimumFractionDigits:2,maximumFractionDigits:2})`)
    return "fmtPctBE";
  return null;
}

const report = { migratedFiles: 0, migratedDefs: 0, skipped: {} };

for (const file of walk(ROOT)) {
  if (file.replace(/\\/g, "/").endsWith("app/lib/fmt.ts")) continue;
  const src = fs.readFileSync(file, "utf8");
  if (!/fr-BE/.test(src) || !/function\s+fmt/.test(src)) continue;

  const needed = new Map();
  let localChanges = 0;

  let changed = src.replace(DEF_RE, (full, name, arg, expr) => {
    if (!/fr-BE/.test(expr)) return full;
    const helper = classify(expr, arg);
    if (!helper) {
      const k = canon(expr).slice(0, 80);
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
console.log("--- fr-BE NON classés (laissés) ---");
const sk = Object.entries(report.skipped).sort((a, b) => b[1] - a[1]);
if (!sk.length) console.log("  (aucun)");
sk.forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}×  ${k}`));
