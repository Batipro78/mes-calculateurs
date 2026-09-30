// Verifie que des phrases citees figurent vraiment dans le texte brut des pages sources.
// Usage : node verif-citations.mjs <fichier-json>
// Le JSON : [{ "url": "...", "phrases": ["...", "..."] }, ...]
import { readFile } from "node:fs/promises";

const ENTITES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", eacute: "é", egrave: "è", ecirc: "ê", agrave: "à", acirc: "â", ccedil: "ç", ocirc: "ô", ugrave: "ù", ucirc: "û", icirc: "î", iuml: "ï", euml: "ë", oelig: "œ", rsquo: "'", lsquo: "'", laquo: "«", raquo: "»", hellip: "…", ndash: "–", mdash: "—", Eacute: "É", Agrave: "À" };

function texteBrut(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, n) => ENTITES[n] ?? m);
}

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[’‘ʼ`]/g, "'")
    .replace(/[   ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const lots = JSON.parse(await readFile(process.argv[2], "utf8"));
for (const lot of lots) {
  let page = "";
  let statut = "";
  try {
    const res = await fetch(lot.url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36", "Accept-Language": "fr-FR,fr;q=0.9" },
      redirect: "follow",
    });
    statut = `HTTP ${res.status}`;
    page = norm(texteBrut(await res.text()));
  } catch (e) {
    statut = `ECHEC ${e.message}`;
  }
  console.log(`\n== ${lot.url}\n   ${statut}, ${page.length} caracteres de texte`);
  for (const p of lot.phrases) {
    const trouve = page.includes(norm(p));
    let contexte = "";
    if (!trouve && page) {
      // cherche le plus long debut de phrase present, pour montrer ou ca diverge
      const mots = norm(p).split(" ");
      for (let n = mots.length - 1; n >= 3; n--) {
        const debut = mots.slice(0, n).join(" ");
        const i = page.indexOf(debut);
        if (i >= 0) {
          contexte = `\n      page : « ${page.slice(i, i + norm(p).length + 60)} »`;
          break;
        }
      }
    }
    console.log(`   ${trouve ? "OUI" : "NON"}  ${p}${contexte}`);
  }
}
