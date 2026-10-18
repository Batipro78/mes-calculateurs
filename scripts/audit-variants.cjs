// Audit (lecture seule) : compte les URLs du sitemap par calculateur (1er segment)
// et separe page racine vs pages-variantes [params]. Base du dossier de decision P1 (noindex).
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const srcPath = path.join(__dirname, "..", "app", "lib", "sitemap-data.ts");
const tsCode = fs.readFileSync(srcPath, "utf8");
const js = ts.transpileModule(tsCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

const moduleObj = { exports: {} };
const fn = new Function("module", "exports", js);
fn(moduleObj, moduleObj.exports);
const { getAllUrls, BASE_URL } = moduleObj.exports;

const all = getAllUrls();
const buckets = new Map(); // slug -> { root: n, variants: n, total: n }

for (const e of all) {
  const u = e.url.replace(BASE_URL, "").replace(/^\//, "");
  const seg = u.split("/")[0] || "(accueil)";
  const isVariant = u.includes("/"); // un segment => racine ; plus => variante
  if (!buckets.has(seg)) buckets.set(seg, { root: 0, variants: 0 });
  const b = buckets.get(seg);
  if (isVariant) b.variants++;
  else b.root++;
}

const rows = [...buckets.entries()].map(([slug, b]) => ({
  slug,
  root: b.root,
  variants: b.variants,
  total: b.root + b.variants,
}));

const totalUrls = all.length;
const totalVariants = rows.reduce((s, r) => s + r.variants, 0);
const totalRoots = rows.reduce((s, r) => s + r.root, 0);

console.log(`=== TOTAL : ${totalUrls} URLs | racines: ${totalRoots} | variantes [params]: ${totalVariants} ===\n`);

console.log("=== Calculateurs AVEC variantes (tries par nb de variantes desc) ===");
console.log("variantes  racine  slug");
rows
  .filter((r) => r.variants > 0)
  .sort((a, b) => b.variants - a.variants)
  .forEach((r) =>
    console.log(`${String(r.variants).padStart(9)}  ${String(r.root).padStart(6)}  ${r.slug}`)
  );

const noVar = rows.filter((r) => r.variants === 0);
console.log(`\n=== Calculateurs SANS variante (${noVar.length}) : pages racine seules ===`);
console.log(noVar.map((r) => r.slug).sort().join(", "));
