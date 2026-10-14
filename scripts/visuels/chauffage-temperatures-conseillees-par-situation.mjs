// Temperatures de chauffage conseillees selon la situation, et limites legales.
// Sources (lues le 14/10/2026) :
//  - ADEME, « Les bons gestes pour un chauffage plus economique » (12/12/2025) :
//    pieces de vie occupees 19 °C, inoccupees 16 a 17 °C ; chambre 17 °C la nuit et quand elle est
//    inoccupee ; salle de bain 22 °C quand on l'utilise, 16 a 17 °C le reste du temps.
//    agirpourlatransition.ademe.fr/particuliers/amenager-maison/chauffer/bons-gestes-chauffage-plus-economique
//  - Code de l'energie, art. R241-26 (19 °C en moyenne pour l'ensemble des pieces d'un logement)
//    et R241-27 (inoccupation de 24 h a moins de 48 h : 16 °C ; 48 h et plus : 8 °C).
//    Ce sont des limites SUPERIEURES de temperature.
export default function ({ t, cadre, W, H }) {
  const MIN = 6;
  const MAX = 24;
  const x0 = 470; // x de 6 °C
  const x1 = 1120; // x de 24 °C
  const px = (deg) => x0 + ((deg - MIN) / (MAX - MIN)) * (x1 - x0);
  const fr = (n) => String(n).replace(".", ",");
  const lignes = [
    { nom: "Pièce de vie occupée", sous: "salon, bureau", de: 19, a: 19, src: "ADEME", couleur: "#fb923c" },
    { nom: "Pièce de vie inoccupée", sous: "salon, bureau vide", de: 16, a: 17, src: "ADEME", couleur: "#fbbf24" },
    { nom: "Chambre, la nuit", sous: "17 °C ou 18 °C selon la fiche ADEME", de: 17, a: 18, src: "ADEME", couleur: "#a78bfa" },
    { nom: "Salle de bain utilisée", sous: "16 à 17 °C le reste du temps", de: 22, a: 22, src: "ADEME", couleur: "#f87171" },
    { nom: "Absence de 24 à 48 h", sous: "limite légale", de: 16, a: 16, src: "loi", couleur: "#38bdf8", max: true },
    { nom: "Absence de 48 h ou plus", sous: "limite légale", de: 8, a: 8, src: "loi", couleur: "#60a5fa", max: true },
  ];
  const y0 = 168;
  const rh = 56;
  const haut = y0 + lignes.length * rh;
  // graduations
  const grad = [8, 12, 16, 20, 24]
    .map(
      (d) =>
        `<line x1="${px(d)}" y1="${y0 - 6}" x2="${px(d)}" y2="${haut - 4}" stroke="#334155" stroke-width="1.5"/>` +
        t(px(d), y0 - 14, 17, 400, "#94a3b8", `${d} °C`, 'text-anchor="middle"'),
    )
    .join("\n  ");
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const xa = px(l.de);
      const xb = px(l.a);
      const largeur = Math.max(14, xb - xa);
      const barre =
        l.de === l.a
          ? `<circle cx="${xa}" cy="${y + 26}" r="14" fill="${l.couleur}"/>`
          : `<rect x="${xa - 14}" y="${y + 12}" width="${largeur + 28}" height="28" rx="14" fill="${l.couleur}"/>`;
      const val = l.de === l.a ? `${l.de} °C` : `${l.de} à ${l.a} °C`;
      const texteVal = (l.max ? "max. " : "") + val;
      const gauche = l.a >= 16 && l.a < 19; // etiquette a gauche du point pour ne pas croiser la ligne des 19 °C
      const xv = gauche ? xa - 14 - 14 : (l.de === l.a ? xa : xb + 14) + 28;
      return [
        t(64, y + 24, 25, 700, "#ffffff", l.nom),
        t(64, y + 46, 16, 400, "#94a3b8", l.sous),
        barre,
        t(xv, y + 35, 25, 800, l.couleur, texteVal, `${gauche ? 'text-anchor="end" ' : ''}paint-order="stroke" stroke="#0f1830" stroke-width="10" stroke-linejoin="round"`),
      ].join("\n  ");
    })
    .join("\n  ");
  const limite =
    `<line x1="${px(19)}" y1="${y0 - 6}" x2="${px(19)}" y2="${haut - 4}" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="7 6"/>` +
    t(px(19), haut + 18, 18, 700, "#ffffff", "19 °C : limite légale en moyenne dans un logement", 'text-anchor="middle"');
  const alt =
    `Températures de chauffage conseillées par situation : ${fr(19)} °C dans une pièce de vie occupée, 16 à 17 °C quand elle est inoccupée, 17 à 18 °C dans la chambre la nuit, 22 °C dans la salle de bain quand on l'utilise (ADEME). ` +
    `Limites légales pendant une absence : 16 °C de 24 à 48 heures, 8 °C au-delà. Moyenne maximale dans un logement : 19 °C (Code de l'énergie).`;
  return {
    nom: "chauffage-temperatures-conseillees-par-situation",
    route: "quelle-temperature-pour-le-chauffage",
    alt,
    svg: cadre({
      accent: "#fb923c",
      kicker: "CHAUFFAGE · TEMPÉRATURES CONSEILLÉES",
      titre: "Quelle température selon la situation ?",
      note: "",
      corps: `${grad}
  ${limite}
  ${corps}`,
    }),
  };
}
