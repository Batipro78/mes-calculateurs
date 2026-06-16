// Analyse (lecture seule) : recense TOUTES les définitions fmt* locales restantes
// (hors app/lib/fmt.ts), groupées par (nom, corps normalisé), pour décider de la suite.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "app");

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.tsx?$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const DEF_RE =
  /function\s+(fmt[0-9A-Za-z]*)\s*\(\s*([A-Za-z_]\w*)\s*:\s*number\s*(?:,\s*[^)]*)?\)\s*:\s*string\s*\{\s*return\s+([\s\S]*?);\s*\}/g;
const squash = (s) => s.replace(/\s+/g, " ").trim();

const groups = {};
const files = {};
let total = 0;
for (const file of walk(ROOT)) {
  if (file.replace(/\\/g, "/").endsWith("app/lib/fmt.ts")) continue;
  const src = fs.readFileSync(file, "utf8");
  let m;
  DEF_RE.lastIndex = 0;
  while ((m = DEF_RE.exec(src))) {
    const [, name, arg, expr] = m;
    const body = squash(expr).split(arg).join("n");
    const key = `${name} :: ${body}`;
    groups[key] = (groups[key] || 0) + 1;
    (files[key] = files[key] || []).push(
      file.replace(/\\/g, "/").replace(/.*\/app\//, "app/")
    );
    total++;
  }
}

const sorted = Object.entries(groups).sort((a, b) => b[1] - a[1]);
console.log(`Total défs fmt* locales restantes : ${total} (${sorted.length} variantes)\n`);
for (const [key, n] of sorted) {
  console.log(`${String(n).padStart(3)}×  ${key}`);
}
