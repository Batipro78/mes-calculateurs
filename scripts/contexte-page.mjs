// Montre le texte brut d'une page autour de mots donnes.
// Usage : node contexte.mjs <url> <mot> [<mot> ...]
const [url, ...mots] = process.argv.slice(2);
const res = await fetch(url, {
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36", "Accept-Language": "fr-FR,fr;q=0.9" },
});
const html = await res.text();
const texte = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&rsquo;/g, "'").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&ccedil;/g, "ç")
  .replace(/[’‘]/g, "'")
  .replace(/\s+/g, " ");
console.log(`HTTP ${res.status}, ${texte.length} caracteres`);
const bas = texte.toLowerCase();
for (const mot of mots) {
  let i = -1;
  let n = 0;
  console.log(`\n--- ${mot}`);
  while ((i = bas.indexOf(mot.toLowerCase(), i + 1)) >= 0 && n < 4) {
    console.log(`  … ${texte.slice(Math.max(0, i - 220), i + 320)} …`);
    n += 1;
  }
  if (n === 0) console.log("  (absent)");
}
