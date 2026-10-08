// Amende et points selon l'excès de vitesse retenu (barème au 7 octobre 2026).
// Les montants et les points viennent de la fonction calculerAmende() du simulateur
// /simulateur-amende-exces-vitesse (app/simulateur-amende-exces-vitesse/amendeCalc.ts), qui applique :
//  - service-public.fr, fiche F19460 : classe, amende forfaitaire, points, peines complémentaires ;
//  - service-public.fr, actualité A18723 : amende forfaitaire délictuelle de 300 € depuis le 29/12/2025.
// Pour chaque tranche, on cherche la vitesse mesurée dont la vitesse retenue vaut limite + excès.
import { calculerAmende, vitesseRetenue } from "../../app/simulateur-amende-exces-vitesse/amendeCalc.ts";

export default function ({ t, cadre, esc, euros, W, H }) {
  const mesureePour = (limite, exces) => {
    for (let m = limite; m < 400; m++) if (vitesseRetenue(m) === limite + exces) return m;
    throw new Error("vitesse introuvable");
  };
  const calc = (limite, exces) =>
    calculerAmende({ vitesseMesuree: mesureePour(limite, exces), vitesseAutorisee: limite });
  const pts = (n) => (n === 0 ? "0 point" : `${n} point${n > 1 ? "s" : ""}`);

  // [libellé, excès pris pour le calcul, peines possibles]
  const tranches = [
    ["Moins de 5 km/h", 3, "Aucune"],
    ["De 5 à 19 km/h", 10, "Aucune"],
    ["De 20 à 29 km/h", 25, "Aucune"],
    ["De 30 à 39 km/h", 35, "Suspension, stage"],
    ["De 40 à 49 km/h", 45, "Suspension, stage"],
    ["50 km/h et plus", 60, "Délit : suspension, prison"],
  ];

  const xA = 430; // centre colonne limite > 50
  const xB = 590; // centre colonne limite <= 50
  const xP = 735; // centre colonne points
  const xS = 805; // début colonne peines
  const y0 = 198;
  const rh = 48;

  const entete =
    t(64, 174, 17, 700, "#94a3b8", "EXCÈS RETENU") +
    t(xA, 156, 17, 700, "#94a3b8", "AMENDE FORFAITAIRE", 'text-anchor="middle"') +
    t(xA, 176, 17, 700, "#94a3b8", "limite > 50", 'text-anchor="middle"') +
    t(xB, 176, 17, 700, "#94a3b8", "limite ≤ 50", 'text-anchor="middle"') +
    t(xP, 174, 17, 700, "#94a3b8", "POINTS", 'text-anchor="middle"') +
    t(xS, 174, 17, 700, "#94a3b8", "PEINES POSSIBLES");

  const lignes = tranches
    .map(([nom, exces, peines], i) => {
      const y = y0 + i * rh;
      const haute = calc(90, exces); // limite > 50
      const basse = calc(50, exces); // limite <= 50
      const delit = haute.tribunalCorrectionnel;
      const couleur = delit ? "#f87171" : exces >= 30 ? "#fb923c" : exces >= 5 ? "#fbbf24" : "#4ade80";
      const fond = `<rect x="64" y="${y}" width="1072" height="${rh - 6}" rx="10" fill="${couleur}" fill-opacity="0.13"/>`;
      return [
        fond,
        t(80, y + 29, 22, 700, couleur, nom),
        t(xA, y + 30, 26, 800, "#ffffff", `${euros(haute.amendeForfaitaire)} €`, 'text-anchor="middle"'),
        t(xB, y + 30, 26, 800, "#ffffff", `${euros(basse.amendeForfaitaire)} €`, 'text-anchor="middle"'),
        t(xP, y + 30, 22, 800, "#ffffff", pts(haute.pointsRetires), 'text-anchor="middle"'),
        t(xS, y + 29, 19, 600, "#e2e8f0", peines),
      ].join("\n  ");
    })
    .join("\n  ");

  const bas = y0 + tranches.length * rh;
  const mm = (r) => `${euros(r.amendeMinoree)} / ${euros(r.amendeMajoree)}`;
  const r68 = calc(90, 10);
  const r135 = calc(50, 10);
  const rd = calc(90, 60);
  const pied =
    t(64, bas + 22, 18, 400, "#cbd5e1", `Minorée / majorée (€) : ${mm(r68)} pour ${r68.amendeForfaitaire} € ; ${mm(r135)} pour ${r135.amendeForfaitaire} € ; ${mm(rd)} pour ${rd.amendeForfaitaire} €.`) +
    "\n  " +
    t(64, bas + 46, 17, 400, "#94a3b8", "Excès calculé sur la vitesse retenue, après la marge du radar. Source : service-public.fr (fiches F19460, F18509).");

  const alt = `Tableau de l'amende forfaitaire et des points retirés selon l'excès de vitesse retenu : moins de 5 km/h ${euros(calc(90, 3).amendeForfaitaire)} € ou ${euros(calc(50, 3).amendeForfaitaire)} € et 0 point ; de 5 à 19 km/h ${euros(calc(90, 10).amendeForfaitaire)} € ou ${euros(calc(50, 10).amendeForfaitaire)} € et 1 point ; de 20 à 29 km/h ${euros(calc(90, 25).amendeForfaitaire)} € et 2 points ; de 30 à 39 km/h ${euros(calc(90, 35).amendeForfaitaire)} € et 3 points ; de 40 à 49 km/h ${euros(calc(90, 45).amendeForfaitaire)} € et 4 points ; 50 km/h et plus ${euros(calc(90, 60).amendeForfaitaire)} € (délit) et 6 points`;

  return {
    nom: "exces-de-vitesse-amende-et-points-par-tranche",
    route: "exces-de-vitesse-combien-de-points-et-d-amende",
    alt,
    svg: cadre({
      accent: "#f97316",
      kicker: "EXCÈS DE VITESSE · AMENDE ET POINTS PAR TRANCHE",
      titre: "Combien de points et d'amende ?",
      note: "",
      corps: `${entete}\n  ${lignes}\n  ${pied}`,
    }),
  };
}
