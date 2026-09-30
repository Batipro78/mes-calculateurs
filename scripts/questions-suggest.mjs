// Releve les recherches que Bing et Google proposent d'eux-memes autour d'un
// sujet (les suggestions de la barre de recherche = ce que les gens tapent
// souvent). Sert a choisir les questions des articles.
//
//   node scripts/questions-suggest.mjs "octroi de mer" "taxe octroi de mer"
//
// Chaque argument est une amorce. Sortie : une ligne par suggestion,
//   <nb de fois vue>  <moteurs>  <suggestion>
// triee de la plus vue a la moins vue.

const amorces = process.argv.slice(2);
if (amorces.length === 0) {
  console.error('Usage : node scripts/questions-suggest.mjs "sujet" ["autre amorce" ...]');
  process.exit(1);
}

const MOTS = ["", "comment", "combien", "pourquoi", "quel", "quelle", "quand", "qui", "est-ce que", "c'est quoi", "peut-on"];

async function bing(q) {
  const url = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(q)}&market=fr-FR&language=fr-FR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`bing HTTP ${res.status}`);
  return (await res.json())[1] ?? [];
}

async function google(q) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&gl=fr&ie=utf-8&oe=utf-8&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`google HTTP ${res.status}`);
  const texte = new TextDecoder("utf-8").decode(await res.arrayBuffer());
  return JSON.parse(texte)[1] ?? [];
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const vues = new Map(); // suggestion -> { n, moteurs:Set }
let requetes = 0;
let echecs = 0;

function noter(liste, moteur) {
  for (const s of liste) {
    const cle = s.toLowerCase().replace(/\s+/g, " ").trim();
    if (!vues.has(cle)) vues.set(cle, { n: 0, moteurs: new Set() });
    const v = vues.get(cle);
    v.n += 1;
    v.moteurs.add(moteur);
  }
}

for (const amorce of amorces) {
  for (const mot of MOTS) {
    const formes = mot ? [`${mot} ${amorce}`, `${amorce} ${mot}`] : [amorce];
    for (const q of formes) {
      for (const [nom, fn] of [["bing", bing], ["google", google]]) {
        requetes += 1;
        try {
          noter(await fn(q), nom);
        } catch (e) {
          echecs += 1;
          console.error(`ECHEC ${nom} "${q}" : ${e.message}`);
        }
        await pause(120);
      }
    }
  }
}

const lignes = [...vues.entries()]
  .sort((a, b) => b[1].n - a[1].n || a[0].localeCompare(b[0]))
  .map(([s, v]) => `${String(v.n).padStart(3)}  ${[...v.moteurs].sort().join("+").padEnd(11)}  ${s}`);

console.log(`# amorces : ${amorces.join(" | ")}`);
console.log(`# ${requetes} requetes, ${echecs} echecs, ${lignes.length} suggestions distinctes`);
console.log(lignes.join("\n"));
