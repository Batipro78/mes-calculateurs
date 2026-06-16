const fs = require("fs");
const path = require("path");
const APP = path.join(__dirname, "..", "app");

const listSrc = fs.readFileSync(path.join(APP, "lib", "calculators-list.ts"), "utf8");
const inList = new Set([...listSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

const homeSrc = fs.readFileSync(path.join(APP, "page.tsx"), "utf8");
const inHome = new Set([...homeSrc.matchAll(/href:\s*"(\/[a-z0-9-]+)"/g)].map((m) => m[1]));

const relSrc = fs.readFileSync(path.join(APP, "components", "RelatedCalculators.tsx"), "utf8");
const mapBody = relSrc.slice(relSrc.indexOf("RELATED_MAP"), relSrc.indexOf("interface RelatedCalculatorsProps"));
const inbound = {};
const hasEntry = new Set();
for (const line of mapBody.split("\n")) {
  const km = line.match(/^\s*"(\/[a-z0-9-]+)":\s*\[(.*)\]/);
  if (!km) continue;
  hasEntry.add(km[1]);
  for (const t of [...km[2].matchAll(/"(\/[a-z0-9-]+)"/g)].map((m) => m[1]))
    inbound[t] = (inbound[t] || 0) + 1;
}

// hubs / pages non-calculateur a exclure du diagnostic "calculateur"
const HUBS = new Set([
  "/calculateurs-finance","/calculateurs-immobilier","/calculateurs-mathematiques",
  "/calculateurs-nutrition","/calculateurs-sante-famille","/convertisseurs",
  "/simulateurs-auto","/simulateurs-emploi",
]);
const LEGAL = new Set(["/a-propos","/confidentialite","/mentions-legales","/cgu","/aide","/integrateurs","/embed"]);

const roots = [];
for (const e of fs.readdirSync(APP, { withFileTypes: true })) {
  if (!e.isDirectory()) continue;
  const s = "/" + e.name;
  if (LEGAL.has(s)) continue;
  if (fs.existsSync(path.join(APP, e.name, "page.tsx"))) roots.push(s);
}
const calcs = roots.filter((s) => !HUBS.has(s));

const missHome = calcs.filter((s) => !inHome.has(s));
const missList = calcs.filter((s) => !inList.has(s));
const orphan = calcs.filter((s) => (inbound[s] || 0) === 0);

console.log(`Calculateurs (hors hubs/legal) : ${calcs.length}`);
console.log(`\n### ${missHome.length} calculateurs SANS lien depuis la home :`);
missHome.forEach((s) => console.log("  " + s));
console.log(`\n### ${missList.length} calculateurs absents de ALL_CALCULATORS :`);
missList.forEach((s) => console.log("  " + s));
console.log(`\n### ${orphan.length} calculateurs a 0 lien entrant dans RELATED_MAP :`);
orphan.forEach((s) => console.log("  " + s));
console.log(`\n### Hubs : liens entrants depuis RELATED_MAP/home`);
[...HUBS].forEach((s) => console.log(`  home:${inHome.has(s)?"oui":"NON"}  related-in:${inbound[s]||0}  ${s}`));
