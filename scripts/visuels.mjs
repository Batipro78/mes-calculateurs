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

// ------------------------------------------- Articles « question » (serie 2)
// Nombre a la francaise : 14 517,50 (espace normale pour les milliers).
const nombre = (n, decimales = 0) => {
  const [ent, dec] = n.toFixed(decimales).split(".");
  const milliers = ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return dec ? `${milliers},${dec}` : milliers;
};

// Carte translucide bordee de la couleur donnee.
const carte = (x, y, w, h, couleur) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="#ffffff" fill-opacity="0.06" stroke="${couleur}" stroke-opacity="0.55" stroke-width="2"/>`;

// --------------------------------------------- 8. Celsius / Fahrenheit
function visuelTemperature() {
  const versF = (c) => c * 1.8 + 32;
  const formules = [
    { x: 64, label: "CELSIUS → FAHRENHEIT", formule: "°F = °C × 1,8 + 32", ex: `180 °C × 1,8 + 32 = ${nombre(versF(180))} °F`, couleur: "#f87171" },
    { x: 608, label: "FAHRENHEIT → CELSIUS", formule: "°C = (°F − 32) ÷ 1,8", ex: `(350 °F − 32) ÷ 1,8 ≈ ${nombre((350 - 32) / 1.8, 2)} °C`, couleur: "#38bdf8" },
  ];
  const cartes = formules.map((f) => [
    carte(f.x, 160, 528, 150, f.couleur),
    t(f.x + 28, 198, 19, 700, f.couleur, f.label, 'letter-spacing="2"'),
    t(f.x + 28, 252, 38, 800, "#ffffff", f.formule),
    t(f.x + 28, 290, 23, 400, "#cbd5e1", f.ex),
  ].join("\n  ")).join("\n  ");
  // Echelle double : meme position = meme temperature, de -40 a 200 °C.
  const x0 = 200;
  const largeur = 920;
  const xDe = (c) => x0 + ((c + 40) / 240) * largeur;
  const reperes = [
    { c: -40, legende: "même nombre" },
    { c: 0, legende: "l'eau gèle" },
    { c: 37, legende: "corps humain" },
    { c: 100, legende: "l'eau bout" },
    { c: 180, legende: "four" },
  ];
  const points = reperes.map((r) => {
    const x = xDe(r.c).toFixed(1);
    const f = versF(r.c);
    const texteF = Number.isInteger(f) ? nombre(f) : nombre(f, 1);
    return [
      `<line x1="${x}" y1="402" x2="${x}" y2="446" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/>`,
      `<circle cx="${x}" cy="424" r="9" fill="#ffffff"/>`,
      t(x, 390, 30, 800, "#ffffff", nombre(r.c), 'text-anchor="middle"'),
      t(x, 480, 30, 800, "#fde68a", texteF, 'text-anchor="middle"'),
      t(x, 510, 18, 400, "#94a3b8", r.legende, 'text-anchor="middle"'),
    ].join("\n  ");
  }).join("\n  ");
  const corps = `
  <defs>
    <linearGradient id="thermo" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#38bdf8"/>
      <stop offset="1" stop-color="#f87171"/>
    </linearGradient>
  </defs>
  ${cartes}
  ${t(64, 390, 30, 800, "#ffffff", "°C")}
  ${t(64, 480, 30, 800, "#fde68a", "°F")}
  <rect x="${x0}" y="418" width="${largeur}" height="12" rx="6" fill="url(#thermo)"/>
  ${points}`;
  return {
    nom: "formule-conversion-celsius-fahrenheit",
    route: "comment-convertir-fahrenheit-en-celsius",
    alt: "Formules de conversion des températures : °F = °C × 1,8 + 32 et °C = (°F − 32) ÷ 1,8, avec une échelle de repères de -40 °C (-40 °F) à 180 °C (356 °F)",
    svg: cadre({
      accent: "#f87171",
      kicker: "TEMPÉRATURES · LES DEUX FORMULES ET LES REPÈRES",
      titre: "Convertir Celsius et Fahrenheit",
      note: "-40 °C = -40 °F",
      corps,
    }),
  };
}

// ------------------------------------------------------ 9. Taxe fonciere
function visuelTaxeFonciere() {
  // Exemple fictif de l'article : valeur locative 4 000 EUR, coefficient 2026
  // de 1,008 (impots.gouv.fr), base = 50 %, taux global suppose de 40 %.
  const valeur = 4000;
  const revalorisee = valeur * 1.008;
  const base = revalorisee * 0.5;
  const taxe = base * 0.4;
  const etapes = [
    { label: "VALEUR LOCATIVE", montant: `${nombre(valeur)} €`, op: "loyer théorique" },
    { label: "REVALORISÉE 2026", montant: `${nombre(revalorisee)} €`, op: "× 1,008" },
    { label: "BASE (MOITIÉ)", montant: `${nombre(base)} €`, op: "× 50 %" },
    { label: "TAXE FONCIÈRE", montant: `${nombre(taxe, 2)} €`, op: "× taux de 40 %" },
  ];
  const couleurs = ["#94a3b8", "#fbbf24", "#fb923c", "#f87171"];
  const cartes = etapes.map((e, i) => {
    const x = 64 + i * 278;
    const fleche = i < etapes.length - 1
      ? `<path d="M${x + 248} 232 l14 18 l-14 18" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
      : "";
    return [
      carte(x, 160, 236, 168, couleurs[i]),
      t(x + 22, 200, 17, 700, couleurs[i], e.label, 'letter-spacing="1"'),
      t(x + 22, 262, 40, 800, "#ffffff", e.montant),
      t(x + 22, 304, 21, 400, "#cbd5e1", e.op),
      fleche,
    ].join("\n  ");
  }).join("\n  ");
  const dates = [
    { date: "15 octobre", texte: "autres moyens, si 300 € ou moins" },
    { date: "20 octobre", texte: "paiement en ligne" },
    { date: "26 octobre", texte: "date du prélèvement" },
  ];
  const lignesDates = dates.map((d, i) => {
    const x = 96 + i * 352;
    return [
      t(x, 456, 36, 800, "#ffffff", d.date),
      t(x, 494, 20, 400, "#cbd5e1", d.texte),
    ].join("\n  ");
  }).join("\n  ");
  const corps = `
  ${cartes}
  <rect x="64" y="358" width="1072" height="160" rx="22" fill="#fbbf24" fill-opacity="0.08" stroke="#fbbf24" stroke-opacity="0.45" stroke-width="2"/>
  ${t(96, 400, 19, 700, "#fbbf24", "PAIEMENT 2026 : LES DATES À RETENIR", 'letter-spacing="2"')}
  ${lignesDates}`;
  return {
    nom: "calcul-taxe-fonciere-2026-exemple",
    route: "comment-est-calculee-la-taxe-fonciere",
    alt: "Calcul de la taxe foncière 2026 sur un exemple : valeur locative de 4 000 €, revalorisée à 4 032 €, base de 2 016 €, taxe de 806,40 € avec un taux de 40 %, et dates de paiement des 15, 20 et 26 octobre 2026",
    svg: cadre({
      accent: "#fbbf24",
      kicker: "EXEMPLE FICTIF · VALEUR LOCATIVE 4 000 € · TAUX 40 %",
      titre: "Comment est calculée la taxe foncière",
      note: "Le vrai taux est celui de votre commune",
      corps,
    }),
  };
}

// ---------------------------------------------------------- 10. Pourcentage
function visuelPourcentage() {
  const evolution = ((2150 - 2000) / 2000) * 100;
  const corps = `
  ${carte(64, 160, 1072, 170, "#fb923c")}
  ${t(96, 200, 19, 700, "#fb923c", "ÉVOLUTION ENTRE DEUX NOMBRES (HAUSSE OU BAISSE)", 'letter-spacing="2"')}
  ${t(96, 262, 46, 800, "#ffffff", "(arrivée − départ) ÷ départ × 100")}
  ${t(96, 306, 25, 400, "#cbd5e1", `2 000 € → 2 150 € : 150 ÷ 2 000 × 100 = + ${nombre(evolution, 1)} %`)}
  ${carte(64, 350, 528, 168, "#fbbf24")}
  ${t(96, 390, 19, 700, "#fbbf24", "X % D'UNE SOMME", 'letter-spacing="2"')}
  ${t(96, 446, 38, 800, "#ffffff", "somme × X ÷ 100")}
  ${t(96, 490, 23, 400, "#cbd5e1", `20 % de 150 € = ${nombre((150 * 20) / 100)} €`)}
  ${carte(608, 350, 528, 168, "#f87171")}
  ${t(640, 390, 19, 700, "#f87171", "PRIX AVANT UNE REMISE DE 25 %", 'letter-spacing="2"')}
  ${t(640, 446, 38, 800, "#ffffff", `60 € ÷ 0,75 = ${nombre(60 / 0.75)} €`)}
  ${t(640, 490, 23, 400, "#cbd5e1", `et non 60 € + 25 % = ${nombre(60 * 1.25)} €`)}`;
  return {
    nom: "formule-calcul-pourcentage-augmentation",
    route: "comment-calculer-un-pourcentage-d-augmentation",
    alt: "Trois formules de pourcentage : évolution = (arrivée − départ) ÷ départ × 100, X % d'une somme = somme × X ÷ 100, et prix avant une remise de 25 % : 60 € ÷ 0,75 = 80 €",
    svg: cadre({
      accent: "#fb923c",
      kicker: "AUGMENTATION · PART D'UNE SOMME · REMISE",
      titre: "Calculer un pourcentage : 3 formules",
      note: "On divise par la valeur de départ",
      corps,
    }),
  };
}

// ----------------------------------------------------------- 11. Succession
function visuelSuccession() {
  // Bareme en ligne directe (service-public.gouv.fr F14198) : droits d'un
  // enfant qui recoit 150 000 EUR, pour la note en bas de l'image.
  const bareme = [
    [8072, 0.05], [12109, 0.1], [15932, 0.15], [552324, 0.2],
    [902838, 0.3], [1805677, 0.4], [Infinity, 0.45],
  ];
  let reste = 150000 - 100000;
  let bas = 0;
  let droits = 0;
  for (const [haut, taux] of bareme) {
    const tranche = Math.min(reste, haut - bas);
    if (tranche <= 0) break;
    droits += tranche * taux;
    reste -= tranche;
    bas = haut;
  }
  const liens = [
    { lien: "Conjoint ou partenaire de PACS", abattement: "Exonéré", taux: "aucun droit", couleur: "#4ade80" },
    { lien: "Enfant, père, mère, grand-parent", abattement: "100 000 €", taux: "5 % à 45 %", couleur: "#60a5fa" },
    { lien: "Frère ou sœur", abattement: "15 932 €", taux: "35 % puis 45 %", couleur: "#a78bfa" },
    { lien: "Neveu ou nièce", abattement: "7 967 €", taux: "55 %", couleur: "#fb923c" },
    { lien: "Cousin ou sans lien", abattement: "1 594 €", taux: "55 % ou 60 %", couleur: "#f87171" },
  ];
  const lignes = liens.map((l, i) => {
    const y = 204 + i * 64;
    return [
      i % 2 === 0 ? `<rect x="64" y="${y}" width="1072" height="60" rx="14" fill="#ffffff" fill-opacity="0.05"/>` : "",
      `<circle cx="92" cy="${y + 30}" r="10" fill="${l.couleur}"/>`,
      t(120, y + 40, 27, 700, "#ffffff", l.lien),
      t(664, y + 42, 33, 800, l.couleur, l.abattement),
      t(892, y + 40, 27, 600, "#e2e8f0", l.taux),
    ].join("\n  ");
  }).join("\n  ");
  const corps = `
  ${t(120, 186, 18, 700, "#94a3b8", "LIEN AVEC LE DÉFUNT", 'letter-spacing="2"')}
  ${t(664, 186, 18, 700, "#94a3b8", "ABATTEMENT", 'letter-spacing="2"')}
  ${t(892, 186, 18, 700, "#94a3b8", "TAUX ENSUITE", 'letter-spacing="2"')}
  ${lignes}`;
  return {
    nom: "droits-succession-abattement-taux-par-lien",
    route: "droits-de-succession-combien-qui-paie",
    alt: "Droits de succession selon le lien avec le défunt : conjoint ou partenaire de PACS exonéré, enfant, père, mère ou grand-parent 100 000 € d'abattement puis 5 % à 45 %, frère ou sœur 15 932 €, neveu ou nièce 7 967 €, cousin ou personne sans lien 1 594 €",
    svg: cadre({
      accent: "#a78bfa",
      kicker: "DROITS DE SUCCESSION · SUR LA PART DE CHAQUE HÉRITIER",
      titre: "Succession : abattement et taux",
      note: `Un enfant qui reçoit 150 000 € paie ${nombre(droits, 2)} €`,
      corps,
    }),
  };
}

// ------------------------------------------------------- 12. Frais de notaire
function visuelNotaire() {
  // Exemple de l'article : 250 000 EUR dans l'ancien, tel que le calcule
  // /frais-de-notaire (droits 5,807 %, emoluments au bareme + TVA 20 %,
  // debours forfaitaires 650 EUR, securite immobiliere 0,10 %).
  const prix = 250000;
  const droits = prix * 0.05807;
  const tranches = [[6500, 0.0387], [17000, 0.01596], [60000, 0.01064], [Infinity, 0.00799]];
  let emoluments = 0;
  let bas = 0;
  for (const [haut, taux] of tranches) {
    if (prix <= bas) break;
    emoluments += (Math.min(prix, haut) - bas) * taux;
    bas = haut;
  }
  const parts = [
    { label: "Droits de mutation", montant: droits, couleur: "#38bdf8" },
    { label: "Émoluments + TVA", montant: emoluments * 1.2, couleur: "#a78bfa" },
    { label: "Débours (estimés)", montant: 650, couleur: "#fbbf24" },
    { label: "Sécurité immobilière", montant: Math.max(15, prix * 0.001), couleur: "#4ade80" },
  ];
  const total = parts.reduce((s, p) => s + p.montant, 0);
  const montant = (n) => (Number.isInteger(Math.round(n * 100) / 100) ? nombre(n) : nombre(n, 2));
  let x = 64;
  const segments = parts.map((p) => {
    const w = (p.montant / total) * 1072;
    const seg = `<rect x="${x.toFixed(1)}" y="382" width="${Math.max(2, w - 3).toFixed(1)}" height="46" fill="${p.couleur}"/>`;
    x += w;
    return seg;
  }).join("\n  ");
  const legende = parts.map((p, i) => {
    const xl = 64 + i * 268;
    return [
      `<circle cx="${xl + 9}" cy="462" r="9" fill="${p.couleur}"/>`,
      t(xl + 28, 469, 20, 600, "#cbd5e1", p.label),
      t(xl, 510, 30, 800, p.couleur, `${montant(p.montant)} €`),
    ].join("\n  ");
  }).join("\n  ");
  const cartes = [
    { x: 64, label: "ANCIEN", chiffre: "7 à 8 %", couleur: "#38bdf8" },
    { x: 608, label: "NEUF (MOINS DE 5 ANS)", chiffre: "2 à 3 %", couleur: "#4ade80" },
  ].map((c) => [
    carte(c.x, 156, 528, 150, c.couleur),
    t(c.x + 28, 196, 19, 700, c.couleur, c.label, 'letter-spacing="2"'),
    t(c.x + 28, 274, 64, 800, "#ffffff", c.chiffre),
    t(c.x + 290, 272, 23, 400, "#cbd5e1", "du prix, en moyenne"),
  ].join("\n  ")).join("\n  ");
  const pct = nombre((total / prix) * 100, 2);
  const corps = `
  ${cartes}
  ${t(64, 362, 26, 700, "#ffffff", `Exemple : 250 000 € dans l'ancien → ${montant(total)} € de frais (${pct} %)`)}
  ${segments}
  ${legende}`;
  return {
    nom: "frais-de-notaire-pourcentage-ancien-neuf",
    route: "frais-de-notaire-quel-pourcentage",
    alt: `Frais de notaire : 7 à 8 % du prix dans l'ancien et 2 à 3 % dans le neuf en moyenne, et détail d'un achat ancien à 250 000 € : ${montant(total)} € de frais, dont ${montant(droits)} € de droits de mutation`,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "ACHAT IMMOBILIER · PAYÉS PAR L'ACHETEUR EN PLUS DU PRIX",
      titre: "Frais de notaire : quel pourcentage ?",
      note: "Montant exact : devis du notaire",
      corps,
    }),
  };
}

const tous = [
  visuelImpot(),
  visuelCercle(),
  visuelOctroi(),
  visuelBurnout(),
  visuelMonnaieJeu(),
  visuelSalaire(),
  visuelAccueil(),
  visuelTemperature(),
  visuelTaxeFonciere(),
  visuelPourcentage(),
  visuelSuccession(),
  visuelNotaire(),
];

// `npm run visuels -- <nom> [<nom>...]` ne refait que les visuels nommes.
const demandes = process.argv.slice(2);
const visuels = demandes.length ? tous.filter((v) => demandes.includes(v.nom)) : tous;
if (demandes.length && visuels.length !== demandes.length) {
  console.error(`Nom inconnu. Noms possibles : ${tous.map((v) => v.nom).join(", ")}`);
  process.exit(1);
}

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
