// Renforce le maillage interne : ajoute les pages orphelines (0 lien entrant)
// comme cibles dans des pages thematiquement liees de RELATED_MAP, et cree les
// entrees manquantes. Idempotent (n'ajoute pas un slug deja present).
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "..", "app", "components", "RelatedCalculators.tsx");

// source -> orphelins a ajouter dans son tableau de cibles
const SOURCE_ADD = {
  "/simulateur-pret-immobilier": ["/simulateur-assurance-emprunteur"],
  "/calcul-capacite-emprunt": ["/simulateur-assurance-emprunteur"],
  "/calcul-rentabilite-locative": ["/simulateur-rendement-scpi"],
  "/simulateur-epargne": ["/simulateur-rendement-scpi", "/calcul-interet-compose"],
  "/simulateur-cout-voiture": ["/calcul-cote-argus-voiture"],
  "/calcul-cout-trajet-voiture": ["/calcul-cote-argus-voiture"],
  "/calcul-risque-cardiovasculaire": ["/calcul-remboursement-mutuelle"],
  "/calcul-consommation-electrique": ["/simulateur-blackout"],
  "/simulateur-impot-societe": ["/simulateur-dividendes"],
  "/calcul-taxe-fonciere": ["/calcul-ifi"],
  "/calcul-malus-ecologique": ["/simulateur-amende-exces-vitesse"],
  "/simulateur-credit-auto": ["/simulateur-loa-lld"],
  "/simulateur-retraite": ["/simulateur-rente-viagere"],
  "/calcul-tva": ["/verificateur-devis"],
  "/calcul-prime-activite": ["/simulateur-apl"],
  "/calcul-macros": ["/calcul-indice-glycemique"],
  "/calcul-calories": ["/calcul-indice-inflammation"],
  "/calcul-imc": ["/calcul-rapport-taille-tour-de-taille"],
  "/calcul-metabolisme-base": ["/calcul-consommation-eau"],
  "/calcul-calories-sport": ["/calcul-classement-tennis-fft"],
  "/calcul-allure-natation": ["/calcul-handicap-golf-whs"],
  "/calcul-date-paques": ["/calcul-fetes-catholiques"],
  "/calcul-zakat": ["/calcul-kaffara-ramadan"],
  "/calcul-moyenne": ["/calcul-mention-bac"],
  "/simulateur-pension-alimentaire": ["/calcul-prestation-compensatoire"],
  "/simulateur-credit-conso": ["/audit-frais-bancaires"],
  "/prix-macon": ["/prix-travaux-maison"],
  "/prix-electricien": ["/prix-travaux-maison"],
};

// entrees a creer (pages qui n'avaient aucune sortie)
const NEW_ENTRIES = [
  ['/prix-travaux-maison', ["/prix-macon", "/prix-electricien", "/prix-plombier", "/calculateur-dpe"]],
  ['/calculateur-gain-pari', ["/calculateur-pari-combine", "/convertisseur-cote-probabilite", "/calcul-pourcentage", "/convertisseur-devises"]],
  ['/calculateur-pari-combine', ["/calculateur-gain-pari", "/convertisseur-cote-probabilite", "/calcul-pourcentage", "/calcul-tva"]],
  ['/convertisseur-cote-probabilite', ["/calculateur-gain-pari", "/calculateur-pari-combine", "/calcul-pourcentage", "/convertisseur-devises"]],
];

let src = fs.readFileSync(FILE, "utf8");
const lines = src.split("\n");
let added = 0;

for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^(\s*)"(\/[a-z0-9-]+)":\s*\[(.*)\],\s*$/);
  if (!m) continue;
  const [, indent, slug, targetsRaw] = m;
  if (!SOURCE_ADD[slug]) continue;
  const existing = [...targetsRaw.matchAll(/"(\/[a-z0-9-]+)"/g)].map((x) => x[1]);
  const toAdd = SOURCE_ADD[slug].filter((s) => !existing.includes(s));
  if (!toAdd.length) continue;
  const all = [...existing, ...toAdd];
  lines[i] = `${indent}"${slug}": [${all.map((s) => `"${s}"`).join(", ")}],`;
  added += toAdd.length;
}

src = lines.join("\n");

// insere les nouvelles entrees avant le "};" qui ferme RELATED_MAP
const closeIdx = src.indexOf("\n};", src.indexOf("RELATED_MAP"));
const block = NEW_ENTRIES
  .filter(([slug]) => !new RegExp(`"${slug}":\\s*\\[`).test(src))
  .map(([slug, t]) => `  "${slug}": [${t.map((s) => `"${s}"`).join(", ")}],`)
  .join("\n");
let newCount = block ? block.split("\n").length : 0;
if (block) src = src.slice(0, closeIdx) + "\n" + block + src.slice(closeIdx);

fs.writeFileSync(FILE, src, "utf8");
console.log(`Liens entrants ajoutes : ${added}`);
console.log(`Nouvelles entrees creees : ${newCount}`);
