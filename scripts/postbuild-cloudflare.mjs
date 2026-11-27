// Apres `next build` (output: "export") : supprime dans out/ chaque X.txt qui a
// un X.html jumeau dans le meme dossier (donnees de navigation React, inutiles :
// les pages se lient par des <a href>). Les .txt sans jumeau (robots.txt,
// llms.txt, ads.txt, cle IndexNow) ne sont jamais touches.
// Puis compte les fichiers : Cloudflare gratuit = 20 000 fichiers max par version.
import { readdirSync, unlinkSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const LIMITE = 19500;

if (!existsSync(OUT)) {
  console.error("[postbuild] dossier out/ introuvable");
  process.exit(1);
}

let supprimes = 0;
let total = 0;
let html = 0;

function parcourir(dir) {
  const entrees = readdirSync(dir, { withFileTypes: true });
  const noms = new Set(entrees.filter((e) => e.isFile()).map((e) => e.name));
  for (const e of entrees) {
    const chemin = join(dir, e.name);
    if (e.isDirectory()) {
      parcourir(chemin);
      continue;
    }
    if (e.name.endsWith(".txt") && noms.has(e.name.slice(0, -4) + ".html")) {
      unlinkSync(chemin);
      supprimes++;
      continue;
    }
    total++;
    if (e.name.endsWith(".html")) html++;
  }
}

parcourir(OUT);
console.log(`[postbuild] ${supprimes} fichiers .txt jumeaux supprimes`);
console.log(`[postbuild] out/ : ${total} fichiers dont ${html} pages HTML (limite ${LIMITE})`);
if (total >= LIMITE) {
  console.error("[postbuild] TROP DE FICHIERS pour Cloudflare gratuit");
  process.exit(1);
}
