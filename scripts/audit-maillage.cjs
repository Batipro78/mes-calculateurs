// Audit du maillage interne (lecture seule).
// Compte les liens ENTRANTS de chaque calculateur depuis RELATED_MAP,
// repere les pages absentes de ALL_CALCULATORS (donc non liables via Related/Search),
// et les pages orphelines/peu pointees.
const fs = require("fs");
const path = require("path");
const APP = path.join(__dirname, "..", "app");

// 1) slugs de ALL_CALCULATORS
const listSrc = fs.readFileSync(path.join(APP, "lib", "calculators-list.ts"), "utf8");
const inList = new Set([...listSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

// 2) RELATED_MAP : cles (sources) + valeurs (cibles)
const relSrc = fs.readFileSync(path.join(APP, "components", "RelatedCalculators.tsx"), "utf8");
const mapBody = relSrc.slice(relSrc.indexOf("RELATED_MAP"), relSrc.indexOf("interface RelatedCalculatorsProps"));
const sources = new Set([...mapBody.matchAll(/"(\/[a-z0-9-]+)":\s*\[/g)].map((m) => m[1]));
const inbound = {};
for (const m of mapBody.matchAll(/"(\/[a-z0-9-]+)"/g)) {
  // on ne compte que les occurrences en position de cible (dans les tableaux) :
}
// compte propre : pour chaque ligne cle: [cibles], incremente inbound des cibles
for (const line of mapBody.split("\n")) {
  const km = line.match(/^\s*"(\/[a-z0-9-]+)":\s*\[(.*)\]/);
  if (!km) continue;
  const targets = [...km[2].matchAll(/"(\/[a-z0-9-]+)"/g)].map((m) => m[1]);
  for (const t of targets) inbound[t] = (inbound[t] || 0) + 1;
}

// 3) pages racine reelles
const SKIP = new Set(["be","en","api","components","lib","data","embed","integrateurs","sitemap","sitemap.xml","sitemap-index.xml","confidentialite","mentions-legales","a-propos","cgu"]);
const roots = [];
for (const e of fs.readdirSync(APP, { withFileTypes: true })) {
  if (!e.isDirectory() || SKIP.has(e.name)) continue;
  if (fs.existsSync(path.join(APP, e.name, "page.tsx"))) roots.push("/" + e.name);
}

const notInList = roots.filter((s) => !inList.has(s));
const noOutbound = roots.filter((s) => !sources.has(s));
const lowInbound = roots
  .map((s) => ({ s, n: inbound[s] || 0 }))
  .filter((x) => x.n <= 1)
  .sort((a, b) => a.n - b.n);

console.log(`Pages racine : ${roots.length} | dans ALL_CALCULATORS : ${roots.filter((s)=>inList.has(s)).length}`);
console.log();
console.log(`### ${notInList.length} pages ABSENTES de ALL_CALCULATORS (invisibles dans Search + non liables via Related) :`);
notInList.forEach((s) => console.log("  " + s));
console.log();
console.log(`### ${noOutbound.length} pages SANS entree dans RELATED_MAP (ne pointent vers personne) :`);
noOutbound.forEach((s) => console.log("  " + s));
console.log();
console.log(`### Pages avec <=1 lien ENTRANT (mal decouvertes par Google) :`);
lowInbound.forEach((x) => console.log(`  ${x.n}  ${x.s}`));
