// Visuel de /date-d-accouchement-calcul-exact.
// Exemple : premier jour des dernieres regles le 20 janvier 2026. Les dates sont
// calculees ici en ajoutant des jours a cette date (comme le calculateur de
// /calcul-date-accouchement : 40 SA = 280 jours).
// Sources des reperes :
//  - ameli.fr (premiers-symptomes-grossesse) : la gestation « varie entre 280 et 290 jours »,
//    « duree moyenne 284 jours » ;
//  - ameli.fr (difficultes-accouchement-naissance) : « entre 37 et 41 semaines d'amenorrhee
//    un nouveau-ne est dit a terme », prematurite avant 37 SA ;
//  - has-sante.fr (declenchement artificiel du travail) : surveillance toutes les 48 h a
//    41 SA + 0 jour, declenchement recommande a 41 SA + 6 jours.
export default function ({ t, cadre, esc, W, H }) {
  const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const ddr = Date.UTC(2026, 0, 20);
  const apres = (jours) => {
    const d = new Date(ddr + jours * 86400000);
    return `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]}`;
  };
  const court = (jours) => {
    const d = new Date(ddr + jours * 86400000);
    const m = MOIS[d.getUTCMonth()];
    return `${d.getUTCDate()} ${m.length > 5 ? m.slice(0, 3) + ".": m}`;
  };

  const J37 = 37 * 7; // 259
  const J40 = 40 * 7; // 280
  const J41 = 41 * 7; // 287
  const J41P6 = 41 * 7 + 6; // 293
  const JMOY = 284;
  const JMAX = 290;

  // Axe : de 36 SA (252 j) a 42 SA (294 j)
  const J0 = 36 * 7;
  const J1 = 42 * 7;
  const X0 = 80;
  const X1 = 1120;
  const px = (j) => X0 + ((j - J0) / (J1 - J0)) * (X1 - X0);

  const yBarre = 262;
  const hBarre = 52;
  const zones = [
    { de: J0, a: J37, couleur: "#fbbf24", texte: "avant 37 SA" },
    { de: J37, a: J41, couleur: "#4ade80", texte: "à terme : de 37 à 41 SA" },
    { de: J41, a: J1, couleur: "#60a5fa", texte: "41 SA et +" },
  ];
  const barre = zones
    .map((z) => [
      `<rect x="${px(z.de).toFixed(1)}" y="${yBarre}" width="${(px(z.a) - px(z.de) - 3).toFixed(1)}" height="${hBarre}" rx="8" fill="${z.couleur}"/>`,
      t(((px(z.de) + px(z.a)) / 2 - 1.5).toFixed(1), yBarre + 34, 21, 700, "#0b1224", z.texte, 'text-anchor="middle"'),
    ].join("\n  "))
    .join("\n  ");

  const reperes = [
    { j: J37, sa: "37 SA", ancre: "middle", couleur: "#fbbf24" },
    { j: J40, sa: "40 SA", ancre: "middle", couleur: "#ffffff" },
    { j: J41, sa: "41 SA", ancre: "left", couleur: "#60a5fa" },
    { j: J41P6, sa: "41 SA + 6 j", ancre: "end", couleur: "#60a5fa" },
  ];
  const marques = reperes
    .map((r) => {
      const x = px(r.j);
      const xt = r.ancre === "end" ? 1136 : r.ancre === "left" ? x - 10 : x;
      return [
        `<line x1="${x.toFixed(1)}" y1="228" x2="${x.toFixed(1)}" y2="${yBarre + hBarre + 12}" stroke="${r.couleur}" stroke-width="3"/>`,
        t(xt.toFixed(1), 190, 28, 800, r.couleur, r.sa, `text-anchor="${r.ancre === "left" ? "end" : r.ancre}"`),
        t(xt.toFixed(1), 220, 24, 600, "#e2e8f0", court(r.j), `text-anchor="${r.ancre === "left" ? "end" : r.ancre}"`),
      ].join("\n  ");
    })
    .join("\n  ");

  // Fourchette 280 a 290 jours (ameli) sous la barre
  const yFourchette = 352;
  const fourchette = [
    `<line x1="${px(J40).toFixed(1)}" y1="${yFourchette}" x2="${px(JMAX).toFixed(1)}" y2="${yFourchette}" stroke="#cbd5e1" stroke-width="4"/>`,
    `<line x1="${px(J40).toFixed(1)}" y1="${yFourchette - 10}" x2="${px(J40).toFixed(1)}" y2="${yFourchette + 10}" stroke="#cbd5e1" stroke-width="4"/>`,
    `<line x1="${px(JMAX).toFixed(1)}" y1="${yFourchette - 10}" x2="${px(JMAX).toFixed(1)}" y2="${yFourchette + 10}" stroke="#cbd5e1" stroke-width="4"/>`,
    `<circle cx="${px(JMOY).toFixed(1)}" cy="${yFourchette}" r="9" fill="#f472b6"/>`,
    t(((px(J40) + px(JMAX)) / 2).toFixed(1), yFourchette + 38, 22, 600, "#cbd5e1", "gestation observée : 280 à 290 jours", 'text-anchor="middle"'),
  ].join("\n  ");

  const cartes = [
    { x: 64, titre: `40 SA = ${J40} jours`, l1: "après le 1er jour des dernières", l2: "règles : date du calculateur", couleur: "#ffffff" },
    { x: 428, titre: `Moyenne : ${JMOY} jours`, l1: `soit le ${apres(JMOY)} ici`, l2: "(durée observée, ameli)", couleur: "#f472b6" },
    { x: 792, titre: `41 SA = ${J41} jours`, l1: "début de la surveillance du bébé", l2: "toutes les 48 h (HAS)", couleur: "#60a5fa" },
  ]
    .map((c) => [
      `<rect x="${c.x}" y="432" width="344" height="104" rx="16" fill="#ffffff" fill-opacity="0.06"/>`,
      t(c.x + 20, 468, 28, 800, c.couleur, c.titre),
      t(c.x + 20, 500, 21, 500, "#cbd5e1", c.l1),
      t(c.x + 20, 526, 21, 500, "#cbd5e1", c.l2),
    ].join("\n  "))
    .join("\n  ");

  const corps = `
  ${barre}
  ${marques}
  ${fourchette}
  ${cartes}`;

  return {
    nom: "date-accouchement-calcul-terme",
    route: "date-d-accouchement-calcul-exact",
    alt: `Frise de la fin de grossesse pour des dernières règles le 20 janvier 2026 : 37 SA le ${apres(J37)}, 40 SA (280 jours) le ${apres(J40)}, 41 SA (287 jours) le ${apres(J41)}, 41 SA + 6 jours le ${apres(J41P6)}. La gestation observée va de 280 à 290 jours, avec une moyenne de 284 jours.`,
    svg: cadre({
      accent: "#f472b6",
      kicker: "EXEMPLE : DERNIÈRES RÈGLES LE 20 JANVIER 2026",
      titre: "Une fenêtre, pas une date",
      note: "Repères : ameli.fr, HAS",
      corps,
    }),
  };
}
