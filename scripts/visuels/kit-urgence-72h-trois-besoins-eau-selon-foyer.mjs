// Le kit d'urgence 72 h de l'Etat range en trois besoins, et la reserve d'eau selon le foyer.
// Sources : guide « Tous responsables » (SGDSN, ecologie.gouv.fr) : « les trois principes-cles en
// cas de crise : boire et manger, avoir chaud, se soigner » ; fiche « Votre kit d'urgence 72 h »
// (georisques.gouv.fr) : « eau potable en quantite (6 litres par personne en bouteilles) ».
// Eau = 6 litres x nombre de personnes (calcul du guide).
export default function ({ t, cadre, W, H }) {
  const colonnes = [
    { titre: "Boire et manger", couleur: "#38bdf8", items: ["Eau en bouteilles", "Conserves, sans cuisson", "Petits pots bébé", "Nourriture animaux"] },
    { titre: "Avoir chaud", couleur: "#fb923c", items: ["Vêtements chauds", "Couverture de survie", "Lampe + piles", "Bougies, briquet"] },
    { titre: "Se soigner", couleur: "#f472b6", items: ["Médicaments", "Trousse de secours", "Lunettes de secours", "Pansements, compresses"] },
  ];
  const cw = 350;
  const gap = 20;
  const x0 = 64;
  const y0 = 150;
  const cols = colonnes
    .map((c, i) => {
      const x = x0 + i * (cw + gap);
      const items = c.items.map((it, k) => t(x + 24, y0 + 78 + k * 34, 22, 500, "#e2e8f0", "• " + it)).join("\n  ");
      return [
        `<rect x="${x}" y="${y0}" width="${cw}" height="200" rx="14" fill="${c.couleur}" fill-opacity="0.14"/>`,
        t(x + 24, y0 + 40, 28, 800, c.couleur, c.titre),
        items,
      ].join("\n  ");
    })
    .join("\n  ");
  const yEau = y0 + 262;
  const foyers = [1, 2, 3, 4, 5];
  const eau = foyers
    .map((n, i) => {
      const cx = 160 + i * 220;
      return t(cx, yEau + 30, 34, 800, "#ffffff", `${6 * n} L`, 'text-anchor="middle"') +
        t(cx, yEau + 54, 18, 400, "#94a3b8", n === 1 ? "1 personne" : `${n} personnes`, 'text-anchor="middle"');
    })
    .join("\n  ");
  const pied = t(64, yEau + 84, 19, 400, "#cbd5e1", "Eau : 6 litres par personne en bouteilles pour 72 heures (guide « Tous responsables », Géorisques).") +
    "\n  " +
    t(64, yEau + 110, 18, 400, "#94a3b8", "Aussi dans le kit : radio à piles, chargeur, argent liquide, papiers, double des clés.");
  const alt = "Le kit d'urgence 72 heures de l'État en trois besoins : boire et manger, avoir chaud, se soigner, avec la réserve d'eau à prévoir à raison de 6 litres par personne : 6 litres pour 1 personne, 12 pour 2, 18 pour 3, 24 pour 4 et 30 pour 5";
  return {
    nom: "kit-urgence-72h-trois-besoins-eau-selon-foyer",
    route: "que-mettre-dans-un-kit-de-survie",
    alt,
    svg: cadre({
      accent: "#f87171",
      kicker: "KIT D'URGENCE 72 H · LISTE OFFICIELLE",
      titre: "Que mettre dans un kit de survie ?",
      note: "",
      corps: `${cols}\n  ${t(64, yEau - 14, 22, 700, "#e2e8f0", "Réserve d'eau selon le foyer")}\n  ${eau}\n  ${pied}`,
    }),
  };
}
