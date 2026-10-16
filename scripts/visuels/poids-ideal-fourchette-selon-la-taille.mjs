// Fourchette de poids « normal » selon la taille : IMC de 18,5 a 24,9 (calculateur /calcul-poids-ideal,
// seuils CDC et OMS), avec le poids de la formule de Lorentz pour un homme et pour une femme
// (memes formules que app/calcul-poids-ideal/poidsIdealCalc.ts).
export default function ({ t, cadre, W, H }) {
  const tailles = [160, 170, 180, 190];
  const fmt = (n) => n.toFixed(1).replace(".", ",");
  const lignes = tailles.map((cm) => {
    const m = cm / 100;
    return {
      cm,
      min: m * m * 18.5,
      max: m * m * 24.9,
      lh: cm - 100 - (cm - 150) / 4,
      lf: cm - 100 - (cm - 150) / 2.5,
    };
  });
  const echMin = 40;
  const echMax = 95;
  const x0 = 250;
  const largeur = 760;
  const px = (kg) => Math.round(x0 + ((kg - echMin) / (echMax - echMin)) * largeur);
  const y0 = 170;
  const rh = 92;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const a = px(l.min);
      const b = px(l.max);
      return [
        t(64, y + 36, 30, 800, "#ffffff", `${(l.cm / 100).toFixed(2).replace(".", ",")} m`),
        `<rect x="${a}" y="${y + 8}" width="${b - a}" height="40" rx="10" fill="#8b5cf6" fill-opacity="0.85"/>`,
        t(a, y + 74, 20, 600, "#c4b5fd", `${fmt(l.min)} kg`),
        t(b, y + 74, 20, 600, "#c4b5fd", `${fmt(l.max)} kg`, 'text-anchor="end"'),
        `<circle cx="${px(l.lh)}" cy="${y + 28}" r="9" fill="#fbbf24"/>`,
        `<circle cx="${px(l.lf)}" cy="${y + 28}" r="9" fill="#f472b6"/>`,
      ].join("\n  ");
    })
    .join("\n  ");
  const yl = y0 + lignes.length * rh + 6;
  const legende =
    `<rect x="64" y="${yl - 14}" width="30" height="16" rx="5" fill="#8b5cf6" fill-opacity="0.85"/>` +
    "\n  " + t(104, yl, 19, 400, "#cbd5e1", "Fourchette (IMC de 18,5 à 24,9)") +
    "\n  " + `<circle cx="470" cy="${yl - 6}" r="8" fill="#fbbf24"/>` +
    "\n  " + t(486, yl, 19, 400, "#cbd5e1", "Lorentz homme") +
    "\n  " + `<circle cx="660" cy="${yl - 6}" r="8" fill="#f472b6"/>` +
    "\n  " + t(676, yl, 19, 400, "#cbd5e1", "Lorentz femme");
  const alt = `Fourchette de poids correspondant à un indice de masse corporelle de 18,5 à 24,9 selon la taille : ${lignes
    .map((l) => `${(l.cm / 100).toFixed(2).replace(".", ",")} m de ${fmt(l.min)} à ${fmt(l.max)} kg`)
    .join(" ; ")}, avec le poids de la formule de Lorentz pour un homme et pour une femme`;
  return {
    nom: "poids-ideal-fourchette-selon-la-taille",
    route: "quel-est-mon-poids-ideal",
    alt,
    svg: cadre({
      accent: "#a78bfa",
      kicker: "POIDS IDÉAL · FOURCHETTE SELON LA TAILLE",
      titre: "Quel est mon poids idéal ?",
      note: "",
      corps: `${corps}\n  ${legende}`,
    }),
  };
}
