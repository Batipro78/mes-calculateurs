// De la vitesse mesurée par le radar à l'amende et aux points.
// Marge technique : antai.gouv.fr « Les radars en France » : 5 km/h sous 100 km/h, 5 % à partir de 100 km/h,
// retranchée de la vitesse mesurée (arrondi à l'entier inférieur : choix du calculateur).
// Amende et points : calculerAmende() du simulateur /simulateur-amende-exces-vitesse
// (barème service-public.fr, fiche F19460, et actualité A18723 pour le délit).
import { calculerAmende } from "../../app/simulateur-amende-exces-vitesse/amendeCalc.ts";

export default function ({ t, cadre, esc, euros, W, H }) {
  // [limite autorisée, vitesse mesurée]
  const cas = [
    [50, 56],
    [80, 93],
    [90, 120],
    [130, 140],
    [130, 160],
    [130, 190],
  ];
  const lignes = cas.map(([limite, mesuree]) => {
    const r = calculerAmende({ vitesseMesuree: mesuree, vitesseAutorisee: limite });
    return { limite, mesuree, r };
  });

  const xs = { limite: 150, mesuree: 330, retenue: 520, exces: 700, amende: 880, points: 1070 };
  const y0 = 196;
  const rh = 50;
  const entete = [
    t(xs.limite, 168, 17, 700, "#94a3b8", "LIMITE", 'text-anchor="middle"'),
    t(xs.mesuree, 168, 17, 700, "#94a3b8", "MESURÉE", 'text-anchor="middle"'),
    t(xs.retenue, 168, 17, 700, "#94a3b8", "RETENUE", 'text-anchor="middle"'),
    t(xs.exces, 168, 17, 700, "#94a3b8", "EXCÈS RETENU", 'text-anchor="middle"'),
    t(xs.amende, 168, 17, 700, "#94a3b8", "AMENDE", 'text-anchor="middle"'),
    t(xs.points, 168, 17, 700, "#94a3b8", "POINTS", 'text-anchor="middle"'),
  ].join("\n  ");

  const corps = lignes
    .map(({ limite, mesuree, r }, i) => {
      const y = y0 + i * rh;
      const delit = r.tribunalCorrectionnel;
      const couleur = delit ? "#f87171" : r.pointsRetires >= 3 ? "#fb923c" : r.pointsRetires >= 1 ? "#fbbf24" : "#4ade80";
      const marge = mesuree < 100 ? "−5" : "−5 %";
      return [
        `<rect x="64" y="${y}" width="1072" height="${rh - 6}" rx="10" fill="${couleur}" fill-opacity="0.13"/>`,
        t(xs.limite, y + 31, 24, 700, "#e2e8f0", `${limite} km/h`, 'text-anchor="middle"'),
        t(xs.mesuree, y + 31, 24, 700, "#ffffff", `${mesuree} km/h`, 'text-anchor="middle"'),
        t(xs.retenue, y + 31, 26, 800, couleur, `${r.vitesseRetenue} km/h`, 'text-anchor="middle"'),
        t(xs.exces, y + 31, 24, 700, "#ffffff", `+${r.depassement} km/h`, 'text-anchor="middle"'),
        t(xs.amende, y + 31, 26, 800, "#ffffff", `${euros(r.amendeForfaitaire)} €`, 'text-anchor="middle"'),
        t(xs.points, y + 31, 24, 800, "#ffffff", r.pointsRetires === 0 ? "0" : `−${r.pointsRetires}`, 'text-anchor="middle"'),
        t(xs.mesuree + 98, y + 31, 17, 600, "#94a3b8", marge, 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");

  const bas = y0 + lignes.length * rh;
  const pied =
    t(64, bas + 22, 18, 400, "#cbd5e1", "Marge technique : 5 km/h sous 100 km/h, 5 % à partir de 100 km/h, toujours en faveur du conducteur.") +
    "\n  " +
    t(64, bas + 46, 17, 400, "#94a3b8", "Source : ANTAI (marge) et service-public.fr (amende, points). Calcul du simulateur, arrondi à l'entier inférieur.");

  const [l1, l2, l3, l4, l5, l6] = lignes;
  const pt = (n) => `${n} point${n > 1 ? "s" : ""}`;
  const alt = `Tableau de la vitesse mesurée, de la vitesse retenue après la marge du radar, de l'amende et des points : limite ${l1.limite} km/h et ${l1.mesuree} mesurés donnent ${l1.r.vitesseRetenue} retenus, ${pt(l1.r.pointsRetires)} et ${l1.r.amendeForfaitaire} € ; limite ${l2.limite} et ${l2.mesuree} mesurés donnent ${l2.r.vitesseRetenue} retenus, ${pt(l2.r.pointsRetires)} et ${l2.r.amendeForfaitaire} € ; limite ${l3.limite} et ${l3.mesuree} mesurés donnent ${l3.r.vitesseRetenue} retenus, ${pt(l3.r.pointsRetires)} et ${l3.r.amendeForfaitaire} € ; limite ${l4.limite} et ${l4.mesuree} mesurés donnent ${l4.r.vitesseRetenue} retenus, ${pt(l4.r.pointsRetires)} et ${l4.r.amendeForfaitaire} € ; limite ${l5.limite} et ${l5.mesuree} mesurés donnent ${l5.r.vitesseRetenue} retenus, ${pt(l5.r.pointsRetires)} et ${l5.r.amendeForfaitaire} € ; limite ${l6.limite} et ${l6.mesuree} mesurés donnent ${l6.r.vitesseRetenue} retenus, ${pt(l6.r.pointsRetires)} et ${l6.r.amendeForfaitaire} € (délit)`;

  return {
    nom: "vitesse-mesuree-vitesse-retenue-radar",
    route: "simulateur-amende-exces-vitesse",
    alt,
    svg: cadre({
      accent: "#f97316",
      kicker: "RADAR · VITESSE MESURÉE ET VITESSE RETENUE",
      titre: "De la vitesse mesurée à l'amende",
      note: "",
      corps: `${entete}\n  ${corps}\n  ${pied}`,
    }),
  };
}
