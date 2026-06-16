// Audit GEO/SEO (lecture seule) : pour chaque page calculateur FR (app/<slug>/page.tsx),
// recense les signaux qui comptent pour se faire citer par les moteurs IA + le SEO.
const fs = require("fs");
const path = require("path");
const APP = path.join(__dirname, "..", "app");

// On ne regarde que les calculateurs FR de 1er niveau (pas /be /en /api, pas [params]).
const SKIP = new Set([
  "be", "en", "api", "components", "lib", "data", "embed", "integrateurs",
  "sitemap", "sitemap.xml", "sitemap-index.xml",
]);

function approxTextChars(src) {
  // Heuristique grossiere : longueur du contenu hors balises/JSON-LD.
  const noScripts = src.replace(/<script[\s\S]*?<\/script>/g, "");
  const text = noScripts.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  return text.length;
}

const rows = [];
for (const e of fs.readdirSync(APP, { withFileTypes: true })) {
  if (!e.isDirectory() || SKIP.has(e.name)) continue;
  const pagePath = path.join(APP, e.name, "page.tsx");
  if (!fs.existsSync(pagePath)) continue;
  // agrege le contenu du dossier (page + composants frere) pour les signaux
  let blob = "";
  for (const f of fs.readdirSync(path.join(APP, e.name))) {
    if (f.endsWith(".tsx")) blob += fs.readFileSync(path.join(APP, e.name, f), "utf8");
  }
  const page = fs.readFileSync(pagePath, "utf8");
  rows.push({
    slug: e.name,
    faq: /FAQPage|<Faq\b|HowToJsonLd|Faq /.test(blob) && /FAQPage|<Faq\b/.test(blob),
    howto: /HowToJsonLd|"HowTo"|HowTo\b/.test(blob),
    sources: /SourcesMethodo/.test(blob),
    webapp: /WebAppJsonLd/.test(blob),
    chars: approxTextChars(page),
  });
}

rows.sort((a, b) => a.slug.localeCompare(b.slug));

const n = rows.length;
const c = (k) => rows.filter((r) => r[k]).length;
console.log(`=== ${n} pages calculateur FR (1er niveau) ===`);
console.log(`FAQ JSON-LD   : ${c("faq")}/${n}`);
console.log(`HowTo JSON-LD : ${c("howto")}/${n}   <-- levier GEO principal`);
console.log(`SourcesMethodo: ${c("sources")}/${n}`);
console.log(`WebAppJsonLd  : ${c("webapp")}/${n}`);
console.log();
console.log("=== Pages SANS HowTo (candidates GEO), triees par taille de page.tsx ===");
rows
  .filter((r) => !r.howto)
  .sort((a, b) => b.chars - a.chars)
  .forEach((r) =>
    console.log(
      `  ${r.howto ? "H" : "-"}${r.faq ? "F" : "-"}${r.sources ? "S" : "-"}  ${String(r.chars).padStart(6)}  ${r.slug}`
    )
  );
