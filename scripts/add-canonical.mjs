#!/usr/bin/env node
// Ajoute alternates.canonical a toutes les pages (statiques + dynamiques)
// Usage : node scripts/add-canonical.mjs [--dry]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_DIR = path.resolve(__dirname, "..", "app");
const DRY = process.argv.includes("--dry");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "api") continue;
      walk(p, acc);
    } else if (entry.name === "page.tsx") {
      acc.push(p);
    }
  }
  return acc;
}

function toUrlPath(filePath) {
  // app/calcul-imc/page.tsx -> /calcul-imc
  // app/calcul-imc/[params]/page.tsx -> /calcul-imc/[params]  (placeholder to be replaced)
  const rel = path.relative(APP_DIR, path.dirname(filePath)).split(path.sep).join("/");
  if (!rel || rel === ".") return "/";
  return "/" + rel;
}

function isDynamic(urlPath) {
  return /\[[^/]+\]/.test(urlPath);
}

// Pattern pour static page: export const metadata: Metadata = {
const STATIC_META_RE = /(export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{)/;

// Pattern pour generateMetadata: return { ... } dans un generateMetadata
const GEN_META_FN_RE = /export\s+async\s+function\s+generateMetadata[\s\S]*?\{([\s\S]*)$/m;

function hasCanonical(content) {
  return /alternates\s*:\s*\{[\s\S]*?canonical/.test(content);
}

function processStatic(content, urlPath) {
  if (hasCanonical(content)) return { content, changed: false, reason: "already has canonical" };
  const match = content.match(STATIC_META_RE);
  if (!match) return { content, changed: false, reason: "no static metadata match" };
  const insertion = `\n  alternates: { canonical: "${urlPath}" },`;
  const newContent = content.replace(STATIC_META_RE, `$1${insertion}`);
  return { content: newContent, changed: true, reason: "static" };
}

// Pour les pages dynamiques, on ajoute dans chaque return { ... } de generateMetadata
// On utilise le param de la page pour construire le canonical
function getDynamicParamName(filePath) {
  // /app/xxx/[params]/page.tsx -> "params"
  // /app/xxx/[montant]/page.tsx -> "montant"
  const dir = path.dirname(filePath);
  const parts = dir.split(path.sep);
  const last = parts[parts.length - 1];
  const m = last.match(/^\[(.+)\]$/);
  return m ? m[1] : null;
}

function getDynamicBasePath(urlPath) {
  // /calcul-imc/[params] -> /calcul-imc
  return urlPath.replace(/\/\[[^/]+\]$/, "");
}

function processDynamic(content, filePath, urlPath) {
  if (hasCanonical(content)) return { content, changed: false, reason: "already has canonical" };
  const paramName = getDynamicParamName(filePath);
  if (!paramName) return { content, changed: false, reason: "no dynamic param" };
  const basePath = getDynamicBasePath(urlPath);

  // Trouver le corps de la fonction generateMetadata en localisant le ") {" qui termine la signature
  const fnStart = content.indexOf("generateMetadata");
  if (fnStart === -1) return { content, changed: false, reason: "no generateMetadata function" };

  // On cherche le pattern "): Promise<Metadata> {" ou plus generalement "): ... {" apres fnStart
  // En suivant les parentheses pour trouver la fin de la signature
  let i = fnStart;
  // Sauter jusqu'a la premiere parenthese ouvrante de la signature
  while (i < content.length && content[i] !== "(") i++;
  if (i >= content.length) return { content, changed: false, reason: "no sig paren" };
  let parenDepth = 1;
  i++;
  while (i < content.length && parenDepth > 0) {
    if (content[i] === "(") parenDepth++;
    else if (content[i] === ")") parenDepth--;
    i++;
  }
  if (parenDepth !== 0) return { content, changed: false, reason: "unbalanced parens" };
  // Maintenant avancer jusqu'au { (peut y avoir ": Promise<Metadata>" avant)
  // Mais attention aux < ... > generiques — on skip jusqu'au `{` mais faut gerer les angle brackets
  let angleDepth = 0;
  while (i < content.length) {
    const ch = content[i];
    if (ch === "<") angleDepth++;
    else if (ch === ">") angleDepth--;
    else if (ch === "{" && angleDepth === 0) break;
    i++;
  }
  if (i >= content.length) return { content, changed: false, reason: "no fn body brace" };
  const fnBodyStart = i;
  // Maintenant compter les accolades pour trouver la fin du corps
  let depth = 0;
  let fnBodyEnd = -1;
  for (let j = fnBodyStart; j < content.length; j++) {
    if (content[j] === "{") depth++;
    else if (content[j] === "}") {
      depth--;
      if (depth === 0) {
        fnBodyEnd = j;
        break;
      }
    }
  }
  if (fnBodyEnd === -1) return { content, changed: false, reason: "could not find fn body end" };

  const before = content.slice(0, fnBodyStart);
  const body = content.slice(fnBodyStart, fnBodyEnd + 1);
  const after = content.slice(fnBodyEnd + 1);

  // Dans le body, transformer chaque "return {" en ajoutant alternates
  // On veut que le slug vienne de la variable qui a ete awaitee
  // On cherche d'abord la variable du slug : "const { xxx: slug } = await params"
  // ou "const slug = (await params).xxx" etc. C'est complexe.
  // Solution robuste : detecter le pattern "const { PARAM_NAME: X } = await params" ou "const { PARAM_NAME } = await params"
  let slugVar = null;
  const destructureRe = new RegExp(`const\\s*\\{\\s*${paramName}\\s*(?::\\s*(\\w+))?\\s*\\}\\s*=\\s*await\\s+params`);
  const mDestr = body.match(destructureRe);
  if (mDestr) {
    slugVar = mDestr[1] || paramName;
  } else {
    // Chercher "const params = await props.params" ou autre
    // Par defaut on utilise (await params).PARAM_NAME
    slugVar = null; // on generera inline
  }
  const slugExpr = slugVar ? slugVar : `(await params).${paramName}`;

  // Transformer chaque "return {" non-vide en ajoutant alternates
  // On evite les "return {};" (pas de return object vide)
  let newBody = body;
  // Pattern: return { (suivi de contenu)
  // On insere apres "return {"
  newBody = newBody.replace(/return\s*\{(?!\s*\})/g, (m) => {
    return `return {\n    alternates: { canonical: \`${basePath}/\${${slugExpr}}\` },`;
  });

  if (newBody === body) return { content, changed: false, reason: "no return { found" };

  return { content: before + newBody + after, changed: true, reason: `dynamic (slug from ${slugExpr})` };
}

const files = walk(APP_DIR);
let staticCount = 0, dynamicCount = 0, skipped = 0, errors = [];

for (const file of files) {
  const urlPath = toUrlPath(file);
  const content = fs.readFileSync(file, "utf8");
  let result;
  if (isDynamic(urlPath)) {
    result = processDynamic(content, file, urlPath);
    if (result.changed) dynamicCount++;
  } else {
    result = processStatic(content, urlPath);
    if (result.changed) staticCount++;
  }
  if (!result.changed) {
    skipped++;
    if (!result.reason.includes("already")) {
      errors.push(`  [${urlPath}] ${result.reason}`);
    }
  } else if (!DRY) {
    fs.writeFileSync(file, result.content, "utf8");
  }
}

console.log(`\n=== Resultat ===`);
console.log(`Statiques modifiees : ${staticCount}`);
console.log(`Dynamiques modifiees : ${dynamicCount}`);
console.log(`Sautees (deja canonical ou non applicable) : ${skipped}`);
if (errors.length > 0) {
  console.log(`\nFichiers non traites (non "already") :`);
  errors.forEach(e => console.log(e));
}
if (DRY) console.log(`\n(dry run - aucun fichier ecrit)`);
