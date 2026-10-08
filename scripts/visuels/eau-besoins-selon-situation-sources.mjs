// Besoins en eau selon la situation, chiffres sources uniquement.
// EFSA, Scientific Opinion on Dietary Reference Values for water, EFSA Journal 2010;8(3):1459 :
//   femme adulte 2,0 L/jour d'eau totale (boissons + aliments), homme 2,5 L ;
//   grossesse : +300 mL/jour ; allaitement : environ +700 mL/jour (par rapport aux femmes non allaitantes).
//   Valables pour un climat tempere et une activite moderee.
// ameli.fr (canicule) : au moins 1,5 a 2 litres d'eau par jour ; si la temperature corporelle augmente,
//   0,5 L d'eau en plus par jour et par degre supplementaire.
export default function ({ t, cadre }) {
  const fr = (n) => n.toFixed(1).replace(".", ",");
  const FEMME = 2.0;
  const HOMME = 2.5;
  const GROSSESSE = 0.3;
  const ALLAITEMENT = 0.7;
  const lignes = [
    { label: "Femme adulte", base: FEMME, plus: 0, couleur: "#38bdf8" },
    { label: "Homme adulte", base: HOMME, plus: 0, couleur: "#38bdf8" },
    { label: "Femme enceinte", base: FEMME, plus: GROSSESSE, couleur: "#f472b6" },
    { label: "Femme allaitante", base: FEMME, plus: ALLAITEMENT, couleur: "#c084fc" },
  ];
  const x0 = 330;
  const pxL = 190;
  const y0 = 164;
  const rh = 62;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const wb = l.base * pxL;
      const wp = l.plus * pxL;
      const total = l.base + l.plus;
      const nom = t(64, y + 38, 24, 700, "#ffffff", l.label);
      let barre = `<rect x="${x0}" y="${y}" width="${wb}" height="52" rx="10" fill="#38bdf8"/>`;
      if (l.plus > 0) barre += `<rect x="${x0 + wb}" y="${y}" width="${wp}" height="52" rx="10" fill="${l.couleur}"/>`;
      const texte = t(x0 + (total * pxL) + 20, y + 36, 28, 800, "#ffffff", `${fr(total)} L`) +
        (l.plus > 0 ? t(x0 + total * pxL + 112, y + 36, 21, 700, l.couleur, `(${fr(l.base)} + ${fr(l.plus)})`) : "");
      return `${nom}\n  ${barre}\n  ${texte}`;
    })
    .join("\n  ");
  const yb = y0 + 4 * rh + 12;
  const bas = `<rect x="64" y="${yb}" width="1072" height="98" rx="14" fill="#ffffff" fill-opacity="0.07"/>` +
    t(88, yb + 34, 22, 700, "#fbbf24", "Chaleur : au moins 1,5 à 2 L d'eau par jour à boire (ameli.fr)") +
    t(88, yb + 64, 22, 700, "#fbbf24", `Fièvre : +0,5 L par jour et par degré de température en plus (ameli)`) +
    t(88, yb + 88, 17, 400, "#94a3b8", "Barres : eau totale EFSA (boissons + aliments), climat tempéré. Chaleur et fièvre : ameli.fr.");
  const alt = `Besoin en eau totale par jour selon l'EFSA : femme adulte ${fr(FEMME)} L, homme adulte ${fr(HOMME)} L, femme enceinte ${fr(FEMME + GROSSESSE)} L (${fr(FEMME)} + ${fr(GROSSESSE)}), femme allaitante ${fr(FEMME + ALLAITEMENT)} L (${fr(FEMME)} + ${fr(ALLAITEMENT)}). Chaleur : au moins 1,5 à 2 L à boire ; fièvre : 0,5 L de plus par jour et par degré de température en plus.`;
  return {
    nom: "eau-besoins-selon-situation-sources",
    route: "calcul-consommation-eau",
    alt,
    svg: cadre({
      accent: "#22d3ee",
      kicker: "EAU PAR JOUR · BESOINS SELON LA SITUATION",
      titre: "Ce que disent les sources, par situation",
      note: "",
      corps: `${corps}\n  ${bas}`,
    }),
  };
}
