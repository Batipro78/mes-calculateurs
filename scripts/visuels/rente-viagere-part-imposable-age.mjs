// Visuel du simulateur de rente viagere : la part imposable d'une rente viagere
// a titre onereux selon l'age au premier versement. Les pourcentages sont lus
// dans le code du simulateur (fractionImposable), qui suit le BOFiP
// BOI-RSA-PENS-30-20 (« 70 % si l'interesse est age de moins de 50 ans ; 50 % s'il
// est age de 50 a 59 ans inclus ; 40 % s'il est age de 60 a 69 ans inclus ; 30 %
// s'il est age de plus de 69 ans », lu le 05/10/2026).
import { fractionImposable } from "../../app/simulateur-rente-viagere/renteViagereCalc.ts";

export default function ({ t, cadre, euros }) {
  const tranches = [
    { age: 45, libelle: "Moins de 50 ans" },
    { age: 55, libelle: "50 à 59 ans" },
    { age: 65, libelle: "60 à 69 ans" },
    { age: 75, libelle: "70 ans et plus" },
  ].map((tr) => ({ ...tr, part: fractionImposable(tr.age) }));

  const rente = 10000;
  const couleurs = ["#f87171", "#fb923c", "#facc15", "#4ade80"];
  const lignes = tranches
    .map((tr, i) => {
      const y = 218 + i * 74;
      const largeur = (tr.part / 100) * 560;
      return [
        t(64, y + 38, 27, 700, "#e2e8f0", tr.libelle),
        `<rect x="330" y="${y + 6}" width="560" height="46" rx="11" fill="#1e293b"/>`,
        `<rect x="330" y="${y + 6}" width="${largeur}" height="46" rx="11" fill="${couleurs[i]}"/>`,
        t(330 + largeur - 14, y + 40, 26, 800, "#111827", `${tr.part} %`, 'text-anchor="end"'),
        t(1136, y + 40, 24, 600, "#cbd5e1", `${euros((rente * tr.part) / 100)} €`, 'text-anchor="end"'),
      ].join("\n  ");
    })
    .join("\n  ");

  const corps = `
  ${t(64, 182, 26, 600, "#e2e8f0", `Part de la rente soumise à l'impôt, selon l'âge au 1er versement`)}
  ${t(1136, 182, 20, 600, "#94a3b8", `sur ${euros(rente)} €/an`, 'text-anchor="end"')}
  ${lignes}`;

  return {
    nom: "rente-viagere-part-imposable-age",
    route: "simulateur-rente-viagere",
    alt: `Rente viagère à titre onéreux : part imposable selon l'âge au premier versement, ${tranches.map((tr) => `${tr.part} % (${tr.libelle.toLowerCase()})`).join(", ")}. Sur ${euros(rente)} € de rente par an, ${tranches.map((tr) => `${euros((rente * tr.part) / 100)} €`).join(", ")} sont imposables.`,
    svg: cadre({
      accent: "#4ade80",
      kicker: "RENTE VIAGÈRE À TITRE ONÉREUX · BOFIP",
      titre: "Rente viagère : quelle part est imposée ?",
      note: "Fixée une fois pour toutes au départ",
      corps,
    }),
  };
}
