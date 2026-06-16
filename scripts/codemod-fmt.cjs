/**
 * Codemod sûr pour factoriser les fonctions fmt*() locales vers app/lib/fmt.ts
 *
 * Principe : on classe CHAQUE fonction par son COMPORTEMENT réel (options de
 * toLocaleString), on ne migre que 2 comportements non ambigus, et on garde le
 * nom local via un alias d'import (les appels existants ne changent pas).
 *
 *   - EUR2  : n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })  -> fmtEUR
 *   - INT0  : n.toLocaleString("fr-FR", { maximumFractionDigits: 0 })                             -> fmtInt
 *
 * TOUT le reste est laissé tel quel et listé dans le rapport (skips).
 *
 * Usage :
 *   node scripts/codemod-fmt.cjs           # simulation (dry-run), aucun fichier modifié
 *   node scripts/codemod-fmt.cjs --apply   # applique
 */
const fs = require("fs");
const path = require("path");

const APPLY = process.argv.includes("--apply");
const ROOT = path.join(__dirname, "..", "app");

// Récupère récursivement tous les .ts/.tsx sous app/
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.tsx?$/.test(e.name)) acc.push(p);
  }
  return acc;
}

// Définition d'une fonction fmt* : function NAME(arg): string { return EXPR; }
const DEF_RE =
  /function\s+(fmt[0-9A-Za-z]*)\s*\(\s*([A-Za-z_]\w*)\s*:\s*number\s*\)\s*:\s*string\s*\{\s*return\s+([\s\S]*?);\s*\}/g;

// Normalise une expression en supprimant espaces/retours pour comparaison.
function squash(s) {
  return s.replace(/\s+/g, " ").trim();
}

// Détermine le helper cible pour une expression de return, ou null si non géré.
// arg = nom du paramètre local (ex: "n", "montant").
function classify(expr, arg) {
  const e = squash(expr);
  // Doit être EXACTEMENT arg.toLocaleString("fr-FR", { OPTS }) — pas de Math.round, pas de calcul.
  const m = e.match(
    new RegExp(`^${arg}\\.toLocaleString\\(\\s*"fr-FR"\\s*,\\s*\\{(.*)\\}\\s*\\)$`)
  );
  if (!m) return null;
  const opts = m[1].replace(/\s+/g, "");
  if (opts === "minimumFractionDigits:2,maximumFractionDigits:2") return "fmtEUR";
  if (opts === "maximumFractionDigits:0") return "fmtInt";
  // { min:0, max:0 } est strictement identique à { max:0 } à l'affichage.
  if (opts === "minimumFractionDigits:0,maximumFractionDigits:0") return "fmtInt";
  return null;
}

const report = { migratedFiles: 0, migratedDefs: 0, skippedDefs: 0, skips: {} };

for (const file of walk(ROOT)) {
  // Ne jamais traiter la lib elle-même (elle DÉFINIT les helpers).
  if (file.replace(/\\/g, "/").endsWith("app/lib/fmt.ts")) continue;
  let src = fs.readFileSync(file, "utf8");
  if (!/function\s+fmt/.test(src)) continue;

  const needed = new Map(); // helper -> Set(alias local names)
  let changed = src;
  let localChanges = 0;

  changed = changed.replace(DEF_RE, (full, name, arg, expr) => {
    const helper = classify(expr, arg);
    if (!helper) {
      report.skippedDefs++;
      const key = squash(expr).slice(0, 80);
      report.skips[key] = (report.skips[key] || 0) + 1;
      return full; // on laisse tel quel
    }
    if (!needed.has(helper)) needed.set(helper, new Set());
    needed.get(helper).add(name);
    localChanges++;
    return ""; // on retire la def locale
  });

  if (localChanges === 0) continue;

  // Construit les specifiers d'import : helper, ou "helper as localName" si different.
  const specifiers = [];
  for (const [helper, names] of needed) {
    for (const n of names) {
      specifiers.push(n === helper ? helper : `${helper} as ${n}`);
    }
  }
  const importLine = `import { ${specifiers.join(", ")} } from "@/app/lib/fmt";`;

  // Nettoie les lignes devenues vides laissées par la suppression.
  changed = changed.replace(/^[ \t]*\n(?=[ \t]*\n)/gm, "");

  // Insère l'import après la dernière ligne d'import du haut de fichier
  // (ou après "use client" si pas d'import).
  // Insère notre import comme TOUT PREMIER import, juste après une éventuelle
  // directive "use client". Robuste face aux imports multi-lignes existants.
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

console.log(APPLY ? "=== APPLIQUÉ ===" : "=== SIMULATION (dry-run) ===");
console.log(`Fichiers migrés      : ${report.migratedFiles}`);
console.log(`Définitions migrées  : ${report.migratedDefs}`);
console.log(`Définitions ignorées : ${report.skippedDefs}`);
console.log("\n--- Comportements IGNORÉS (laissés tels quels), top 20 ---");
Object.entries(report.skips)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}×  ${k}`));
