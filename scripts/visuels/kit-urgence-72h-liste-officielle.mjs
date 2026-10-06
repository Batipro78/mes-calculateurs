// Visuel du simulateur de blackout : le kit d'urgence 72 h recommande par l'Etat.
// Source : georisques.gouv.fr « Mon kit d'urgence 72h » (lu le 05/10/2026) :
// « les premieres 72 heures sont souvent les plus eprouvantes », liste des choses a
// mettre dans le kit, « de l'eau potable en quantite (6 litres par personne en
// bouteilles) », « verifier une fois par an le contenu de votre kit ».
export default function ({ t, cadre }) {
  const LITRES_PAR_PERSONNE = 6;
  const elements = [
    "Radio à piles + piles de rechange",
    "Lampe de poche, bougies, briquet",
    "Chargeur de téléphone",
    "Trousse de premiers secours",
    "Médicaments",
    "Nourriture sans cuisson (conserves)",
    "Vêtements chauds, couverture de survie",
    "Couteau multifonction, ouvre-boîte",
    "Argent liquide",
    "Copies des papiers (pochette étanche)",
    "Double des clés, lunettes de secours",
    "Jeux pour occuper le temps",
  ];
  const colonnes = 2;
  const lignes = elements
    .map((e, i) => {
      const x = 64 + (i % colonnes) * 422;
      const y = 214 + Math.floor(i / colonnes) * 52;
      return [
        `<circle cx="${x + 10}" cy="${y - 8}" r="7" fill="#38bdf8"/>`,
        t(x + 28, y, 20, 500, "#e2e8f0", e),
      ].join("\n  ");
    })
    .join("\n  ");

  // Encadre eau : 6 L par personne, pour 1 a 4 personnes.
  const eau = [1, 2, 3, 4]
    .map((n, i) => t(1108, 290 + i * 46, 24, 600, "#e2e8f0", `${n} pers. : ${n * LITRES_PAR_PERSONNE} L`, 'text-anchor="end"'))
    .join("\n  ");

  const corps = `
  ${t(64, 170, 24, 600, "#cbd5e1", "Pour tenir chez soi les 72 premières heures d'une crise (coupure d'électricité, d'eau…)")}
  ${lignes}
  <rect x="916" y="202" width="220" height="290" rx="16" fill="#0c4a6e" fill-opacity="0.55" stroke="#38bdf8" stroke-width="2"/>
  ${t(1026, 240, 19, 800, "#7dd3fc", "EAU EN BOUTEILLES", 'text-anchor="middle"')}
  ${eau}
  ${t(1026, 476, 17, 500, "#bae6fd", "6 litres par personne", 'text-anchor="middle"')}`;

  return {
    nom: "kit-urgence-72h-liste-officielle",
    route: "simulateur-blackout",
    alt: `Kit d'urgence 72 h recommandé par l'État (georisques.gouv.fr) : ${elements.join(", ").toLowerCase()}, et 6 litres d'eau en bouteilles par personne, soit 24 litres pour 4 personnes.`,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "RECOMMANDATION OFFICIELLE · GEORISQUES.GOUV.FR",
      titre: "Le kit d'urgence 72 h",
      note: "À vérifier une fois par an",
      corps,
    }),
  };
}
