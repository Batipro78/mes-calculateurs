// Fabrique les visuels originaux des pages (schemas, graphiques de bareme).
//
//   npm run visuels
//
// Pour chaque visuel, ecrit :
//   - public/images/<nom>.webp            -> l'image affichee dans la page
//   - app/<route>/opengraph-image.png     -> l'image de partage de la page
//   - app/<route>/opengraph-image.alt.txt -> son texte alternatif
//
// Les chiffres du bareme de l'impot sont lus dans le code du simulateur : si le
// bareme change, relancer ce script suffit a remettre l'image a jour.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { TRANCHES } from "../app/simulateur-impot-revenu/constants.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

// Espace normal comme separateur de milliers (l'espace fine insecable de
// toLocaleString n'existe pas dans toutes les polices).
const euros = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function t(x, y, size, weight, fill, content, extra = "") {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(content)}</text>`;
}

// Cadre commun : fond nuit, halo de la couleur de la page, titre, signature.
function cadre({ accent, kicker, titre, note, corps }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Segoe UI, Arial, Helvetica, sans-serif">
  <defs>
    <linearGradient id="fond" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1224"/>
      <stop offset="1" stop-color="#131d3b"/>
    </linearGradient>
    <radialGradient id="halo" cx="1080" cy="40" r="620" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fond)"/>
  <rect width="${W}" height="${H}" fill="url(#halo)"/>
  ${t(64, 66, 21, 700, accent, kicker, 'letter-spacing="2.5"')}
  ${t(64, 124, 50, 800, "#ffffff", titre)}
  ${corps}
  <rect x="64" y="556" width="42" height="42" rx="11" fill="url(#mc)"/>
  ${t(85, 584, 18, 800, "#ffffff", "MC", 'text-anchor="middle"')}
  ${t(120, 585, 24, 600, "#94a3b8", "mescalculateurs.fr")}
  ${note ? t(1136, 585, 22, 400, "#94a3b8", note, 'text-anchor="end"') : ""}
</svg>`;
}

// ---------------------------------------------------------------- 1. Impot
function visuelImpot() {
  const couleurs = ["#4ade80", "#facc15", "#fb923c", "#f87171", "#e11d48"];
  const tauxMax = TRANCHES[TRANCHES.length - 1].taux;
  const lignes = TRANCHES.map((tr, i) => {
    const y = 176 + i * 70;
    const largeur = Math.max(14, (tr.taux / tauxMax) * 470);
    const pct = `${Math.round(tr.taux * 100)} %`;
    let plage;
    if (i === 0) plage = `jusqu'à ${euros(tr.max)} €`;
    else if (tr.max === Infinity) plage = `au-delà de ${euros(tr.min)} €`;
    else plage = `de ${euros(tr.min)} à ${euros(tr.max)} €`;
    return [
      t(196, y + 44, 52, 800, couleurs[i], pct, 'text-anchor="end"'),
      `<rect x="220" y="${y + 6}" width="${largeur}" height="46" rx="11" fill="${couleurs[i]}"/>`,
      t(220 + largeur + 24, y + 41, 32, 600, "#e2e8f0", plage),
    ].join("\n  ");
  }).join("\n  ");
  return {
    nom: "bareme-impot-revenu-2026",
    route: "simulateur-impot-revenu",
    alt: "Barème de l'impôt sur le revenu 2026 : les cinq tranches et leur taux, de 0 % à 45 %",
    svg: cadre({
      accent: "#fb7185",
      kicker: "REVENUS 2025 · PAR PART DE QUOTIENT FAMILIAL",
      titre: "Barème de l'impôt sur le revenu 2026",
      note: "Chaque taux ne s'applique qu'à sa tranche",
      corps: lignes,
    }),
  };
}

// --------------------------------------------------------------- 2. Cercle
function visuelCercle() {
  const cx = 300;
  const cy = 352;
  const r = 162;
  const corps = `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#22d3ee" fill-opacity="0.14" stroke="#22d3ee" stroke-width="6"/>
  <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke="#fbbf24" stroke-width="4" stroke-dasharray="12 10"/>
  <line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="9" fill="#ffffff"/>
  ${t(cx + r / 2, cy - 18, 44, 800, "#ffffff", "r", 'text-anchor="middle" font-style="italic"')}
  ${t(cx - 22, cy + 104, 44, 800, "#fbbf24", "d", 'text-anchor="end" font-style="italic"')}
  <rect x="556" y="168" width="580" height="160" rx="22" fill="#ffffff" fill-opacity="0.06" stroke="#22d3ee" stroke-opacity="0.5" stroke-width="2"/>
  ${t(588, 208, 21, 700, "#22d3ee", "AIRE (SURFACE)", 'letter-spacing="2.5"')}
  ${t(588, 270, 58, 800, "#ffffff", "A = π × r²")}
  ${t(588, 308, 25, 400, "#cbd5e1", "r = 5 cm  →  A ≈ 78,54 cm²")}
  <rect x="556" y="346" width="580" height="160" rx="22" fill="#ffffff" fill-opacity="0.06" stroke="#fbbf24" stroke-opacity="0.5" stroke-width="2"/>
  ${t(588, 386, 21, 700, "#fbbf24", "PÉRIMÈTRE (CIRCONFÉRENCE)", 'letter-spacing="2.5"')}
  ${t(588, 448, 58, 800, "#ffffff", "P = 2 × π × r")}
  ${t(588, 486, 25, 400, "#cbd5e1", "r = 5 cm  →  P ≈ 31,42 cm")}`;
  return {
    nom: "formule-aire-perimetre-cercle",
    route: "calcul-surface-cercle",
    alt: "Schéma d'un cercle avec son rayon r et son diamètre d, et les formules de l'aire (π × r²) et du périmètre (2 × π × r)",
    svg: cadre({
      accent: "#22d3ee",
      kicker: "GÉOMÉTRIE · LES DEUX FORMULES À CONNAÎTRE",
      titre: "Aire et périmètre d'un cercle",
      note: "d = 2 × r",
      corps,
    }),
  };
}

// --------------------------------------------------------- 3. Octroi de mer
function visuelOctroi() {
  // Exemple de la page : 1 000 EUR CAF a La Reunion, OM 12,5 %, OMR 2,5 %, TVA 8,5 %.
  const valeur = 1000;
  const parts = [
    { label: "Octroi de mer · 12,5 %", montant: valeur * 0.125, couleur: "#38bdf8" },
    { label: "Octroi de mer régional · 2,5 %", montant: valeur * 0.025, couleur: "#c084fc" },
    { label: "TVA · 8,5 %", montant: valeur * 0.085, couleur: "#fbbf24" },
  ];
  const taxes = parts.reduce((s, p) => s + p.montant, 0);
  const total = valeur + taxes;
  const x0 = 64;
  const largeur = 1072;
  const echelle = largeur / total;
  let x = x0 + valeur * echelle;
  const segments = parts.map((p) => {
    const w = p.montant * echelle;
    const seg = `<rect x="${x.toFixed(1)}" y="176" width="${(w - 3).toFixed(1)}" height="84" fill="${p.couleur}"/>`;
    x += w;
    return seg;
  }).join("\n  ");
  const colonnes = parts.map((p, i) => {
    const cxl = 64 + i * 364;
    return [
      `<circle cx="${cxl + 11}" cy="319" r="11" fill="${p.couleur}"/>`,
      t(cxl + 34, 327, 21, 600, "#cbd5e1", p.label),
      t(cxl, 408, 66, 800, p.couleur, `${euros(p.montant)} €`),
    ].join("\n  ");
  }).join("\n  ");
  const corps = `
  <rect x="${x0}" y="176" width="${(valeur * echelle - 3).toFixed(1)}" height="84" rx="0" fill="#334155"/>
  ${t(x0 + 28, 230, 32, 700, "#ffffff", `Marchandise : ${euros(valeur)} €`)}
  ${segments}
  ${colonnes}
  <line x1="64" y1="446" x2="1136" y2="446" stroke="#ffffff" stroke-opacity="0.16" stroke-width="2"/>
  ${t(64, 510, 44, 800, "#ffffff", `Coût rendu : ${euros(total)} €`)}
  ${t(1136, 510, 44, 800, "#38bdf8", `+ ${((taxes * 100) / valeur).toFixed(1).replace(".", ",")} % de taxes`, 'text-anchor="end"')}`;
  return {
    nom: "exemple-calcul-octroi-de-mer",
    route: "calcul-octroi-de-mer",
    alt: "Exemple de calcul de l'octroi de mer à La Réunion : 1 000 € de marchandise, 125 € d'octroi de mer, 25 € d'octroi de mer régional et 85 € de TVA, soit 1 235 € de coût rendu",
    svg: cadre({
      accent: "#38bdf8",
      kicker: "EXEMPLE · IMPORTATION À LA RÉUNION",
      titre: "Octroi de mer : ce que ça ajoute au prix",
      note: "Les taux varient selon le produit et le territoire",
      corps,
    }),
  };
}

// --------------------------------------------------------------- 4. Burnout
function visuelBurnout() {
  // Structure du MBI-HSS : 22 questions notees de 0 a 6, reparties en 3 dimensions.
  const dims = [
    { n: 9, l1: "Épuisement", l2: "émotionnel", couleur: "#f87171" },
    { n: 5, l1: "Dépersonnalisation", l2: "", couleur: "#fb923c" },
    { n: 8, l1: "Accomplissement", l2: "personnel", couleur: "#60a5fa" },
  ];
  const corps = dims.map((d, i) => {
    const x = 64 + i * 368;
    return [
      `<rect x="${x}" y="168" width="336" height="344" rx="24" fill="#ffffff" fill-opacity="0.06" stroke="${d.couleur}" stroke-opacity="0.55" stroke-width="2"/>`,
      t(x + 32, 292, 128, 800, d.couleur, d.n),
      t(x + 128, 292, 30, 600, "#cbd5e1", "questions"),
      t(x + 32, 360, 29, 800, "#ffffff", d.l1),
      d.l2 ? t(x + 32, 398, 29, 800, "#ffffff", d.l2) : "",
      t(x + 32, 474, 27, 400, "#cbd5e1", `Score de 0 à ${d.n * 6}`),
    ].join("\n  ");
  }).join("\n  ");
  return {
    nom: "test-burnout-mbi-3-dimensions",
    route: "test-burnout-mbi",
    alt: "Les 3 dimensions du test de burnout MBI : épuisement émotionnel (9 questions), dépersonnalisation (5 questions) et accomplissement personnel (8 questions)",
    svg: cadre({
      accent: "#a78bfa",
      kicker: "MASLACH BURNOUT INVENTORY · 22 QUESTIONS NOTÉES DE 0 À 6",
      titre: "Test de burnout MBI : les 3 dimensions",
      note: "Accomplissement : c'est un score bas qui alerte",
      corps,
    }),
  };
}

// ---------------------------------------------------------- 5. Monnaie jeux
function visuelMonnaieJeu() {
  const monnaies = [
    { nom: "V-bucks", jeu: "Fortnite", couleur: "#818cf8" },
    { nom: "RP", jeu: "League of Legends", couleur: "#60a5fa" },
    { nom: "Apex Coins", jeu: "Apex Legends", couleur: "#f87171" },
    { nom: "Robux", jeu: "Roblox", couleur: "#4ade80" },
    { nom: "COD Points", jeu: "Call of Duty", couleur: "#fb923c" },
    { nom: "FIFA Points", jeu: "EA Sports FC", couleur: "#34d399" },
    { nom: "VP", jeu: "Valorant", couleur: "#fb7185" },
    { nom: "Minecoins", jeu: "Minecraft", couleur: "#fbbf24" },
  ];
  const corps = monnaies.map((m, i) => {
    const x = 64 + (i % 4) * 272;
    const y = 172 + Math.floor(i / 4) * 174;
    return [
      `<rect x="${x}" y="${y}" width="256" height="158" rx="22" fill="#ffffff" fill-opacity="0.06" stroke="${m.couleur}" stroke-opacity="0.55" stroke-width="2"/>`,
      `<rect x="${x + 24}" y="${y + 26}" width="44" height="8" rx="4" fill="${m.couleur}"/>`,
      t(x + 24, y + 86, 36, 800, m.couleur, m.nom),
      t(x + 24, y + 126, 23, 600, "#e2e8f0", m.jeu),
    ].join("\n  ");
  }).join("\n  ");
  return {
    nom: "monnaies-jeux-video-par-jeu",
    route: "convertisseur-monnaie-jeu",
    alt: "Les monnaies virtuelles des jeux vidéo et leur jeu : V-bucks (Fortnite), RP (League of Legends), Apex Coins, Robux (Roblox), COD Points, FIFA Points, VP (Valorant), Minecoins (Minecraft)",
    svg: cadre({
      accent: "#f472b6",
      kicker: "8 JEUX · 8 MONNAIES VIRTUELLES",
      titre: "Monnaies de jeux vidéo : qui utilise quoi ?",
      note: "",
      corps,
    }),
  };
}

// --------------------------------------------------------------- 6. Salaire
function visuelSalaire() {
  // Taux indicatifs de la page : ~22 % non-cadre, ~25 % cadre, ~15 % fonction publique.
  const brut = 2500;
  const statuts = [
    { nom: "Non-cadre", taux: 22, couleur: "#60a5fa" },
    { nom: "Cadre", taux: 25, couleur: "#818cf8" },
    { nom: "Fonction publique", taux: 15, couleur: "#34d399" },
  ];
  const x0 = 380;
  const largeur = 756;
  const corps = statuts.map((s, i) => {
    const y = 178 + i * 112;
    const net = brut * (1 - s.taux / 100);
    const wNet = (largeur * net) / brut;
    return [
      t(64, y + 36, 33, 800, "#ffffff", s.nom),
      t(64, y + 70, 22, 400, "#94a3b8", `environ ${s.taux} % de cotisations`),
      `<rect x="${x0}" y="${y}" width="${largeur}" height="80" rx="16" fill="#ffffff" fill-opacity="0.10"/>`,
      `<rect x="${x0}" y="${y}" width="${wNet.toFixed(1)}" height="80" rx="16" fill="${s.couleur}"/>`,
      t(x0 + 28, y + 53, 38, 800, "#0b1224", `${euros(net)} € net`),
      t(x0 + largeur - 20, y + 50, 27, 700, "#e2e8f0", `− ${s.taux} %`, 'text-anchor="end"'),
    ].join("\n  ");
  }).join("\n  ");
  return {
    nom: "salaire-brut-net-exemple-2500-euros",
    route: "salaire-brut-net",
    alt: "Passage du salaire brut au net pour 2 500 € brut par mois : environ 1 950 € net pour un non-cadre, 1 875 € pour un cadre et 2 125 € dans la fonction publique",
    svg: cadre({
      accent: "#60a5fa",
      kicker: "EXEMPLE · 2 500 € BRUT PAR MOIS",
      titre: "Du salaire brut au salaire net",
      note: "Taux indicatifs, avant impôt sur le revenu",
      corps,
    }),
  };
}

// --------------------------------------------------------------- 7. Accueil
function visuelAccueil() {
  const themes = [
    { nom: "Finance & Impôts", ex: "Impôt · TVA · Épargne", couleur: "#fb7185" },
    { nom: "Immobilier", ex: "Prêt · Frais de notaire", couleur: "#a78bfa" },
    { nom: "Emploi & Salaire", ex: "Brut/net · Chômage · Congés", couleur: "#60a5fa" },
    { nom: "Santé & Famille", ex: "IMC · Grossesse · Sommeil", couleur: "#f472b6" },
    { nom: "Nutrition", ex: "Calories · Protéines", couleur: "#4ade80" },
    { nom: "Auto & Véhicule", ex: "Coût · Malus · Crit'Air", couleur: "#38bdf8" },
    { nom: "Prix Travaux", ex: "Électricien · Plombier", couleur: "#fb923c" },
    { nom: "Mathématiques", ex: "Pourcentage · Moyenne", couleur: "#fbbf24" },
    { nom: "Convertisseurs", ex: "Devises · Poids · Longueur", couleur: "#34d399" },
  ];
  const corps = themes.map((th, i) => {
    const x = 64 + (i % 3) * 364;
    const y = 166 + Math.floor(i / 3) * 124;
    return [
      `<rect x="${x}" y="${y}" width="344" height="108" rx="20" fill="#ffffff" fill-opacity="0.06" stroke="${th.couleur}" stroke-opacity="0.55" stroke-width="2"/>`,
      `<rect x="${x}" y="${y + 22}" width="7" height="64" rx="3.5" fill="${th.couleur}"/>`,
      t(x + 28, y + 50, 31, 800, th.couleur, th.nom),
      t(x + 28, y + 84, 22, 400, "#e2e8f0", th.ex),
    ].join("\n  ");
  }).join("\n  ");
  return {
    nom: "calculateurs-en-ligne-par-theme",
    route: null, // l'accueil garde l'image de partage generale du site
    alt: "Les neuf thèmes de calculateurs gratuits du site : finance et impôts, immobilier, emploi et salaire, santé et famille, nutrition, auto, prix des travaux, mathématiques, convertisseurs",
    svg: cadre({
      accent: "#818cf8",
      kicker: "GRATUIT · SANS INSCRIPTION",
      titre: "Tous les calculateurs, par thème",
      note: "",
      corps,
    }),
  };
}

const visuels = [
  visuelImpot(),
  visuelCercle(),
  visuelOctroi(),
  visuelBurnout(),
  visuelMonnaieJeu(),
  visuelSalaire(),
  visuelAccueil(),
];

await mkdir(path.join(ROOT, "public", "images"), { recursive: true });

for (const v of visuels) {
  const source = Buffer.from(v.svg, "utf8");
  const webp = path.join(ROOT, "public", "images", `${v.nom}.webp`);
  await sharp(source).webp({ quality: 90 }).toFile(webp);
  const sorties = [path.relative(ROOT, webp)];
  if (v.route) {
    const dossier = path.join(ROOT, "app", v.route);
    await sharp(source).png({ compressionLevel: 9 }).toFile(path.join(dossier, "opengraph-image.png"));
    await writeFile(path.join(dossier, "opengraph-image.alt.txt"), v.alt + "\n", "utf8");
    sorties.push(path.relative(ROOT, path.join(dossier, "opengraph-image.png")));
  }
  console.log(`${v.nom} -> ${sorties.join(" + ")}`);
}
