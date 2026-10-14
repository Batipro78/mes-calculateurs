// Pension de base selon les trimestres et l'age de depart : decote et surcote.
// Tous les chiffres viennent du calculateur (app/simulateur-retraite/calcRetraite.ts) :
// personne nee en 1970 (age legal 64 ans, 172 trimestres), salaire annuel moyen de 35 000 EUR.
//   decote : taux de 50 % reduit de 0,625 point par trimestre manquant (service-public.gouv.fr, F19666) ;
//   surcote : pension majoree de 1,25 % par trimestre apres l'age legal et au-dela de la duree
//   du taux plein (service-public.gouv.fr, F19643).
import { calcRetraite } from "../../app/simulateur-retraite/calcRetraite.ts";

export default function ({ t, cadre, W, H }) {
  const nombre = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const ANNEE = 1970;
  const SAM = 35000;
  const cas = [
    { trim: 164, age: 64 },
    { trim: 168, age: 64 },
    { trim: 172, age: 64 },
    { trim: 176, age: 65 },
    { trim: 180, age: 66 },
  ].map((c) => ({ ...c, r: calcRetraite(ANNEE, SAM, c.trim, c.age) }));

  const vert = "#4ade80";
  const rouge = "#f87171";
  const neutre = "#fbbf24";
  const max = Math.max(...cas.map((c) => c.r.pensionBase));
  const gap = 20;
  const cw = (1072 - 4 * gap) / 5;
  const bas = 410;
  const hMax = 205;

  const corps = cas
    .map((c, i) => {
      const x = 64 + i * (cw + gap);
      const cx = x + cw / 2;
      const h = (c.r.pensionBase / max) * hMax;
      const couleur = c.r.trimestresDecote > 0 ? rouge : c.r.trimestresSupp > 0 ? vert : neutre;
      let etat;
      if (c.r.trimestresDecote > 0) etat = `décote : −${c.r.trimestresDecote} trim.`;
      else if (c.r.trimestresSupp > 0) etat = `surcote : +${c.r.trimestresSupp} trim.`;
      else etat = "taux plein, sans surcote";
      let effet;
      if (c.r.trimestresDecote > 0) effet = `taux de ${String(+(c.r.tauxAvantSurcote * 100).toFixed(3)).replace(".", ",")} %`;
      else if (c.r.trimestresSupp > 0) effet = `pension +${(c.r.trimestresSupp * 1.25).toFixed(2).replace(".", ",").replace(",00", "")} %`;
      else effet = "taux de 50 %";
      return [
        `<rect x="${x}" y="${(bas - h).toFixed(1)}" width="${cw}" height="${h.toFixed(1)}" rx="12" fill="${couleur}" fill-opacity="0.9"/>`,
        t(cx, bas - h - 14, 31, 800, "#ffffff", `${nombre(c.r.pensionBase)} €`, 'text-anchor="middle"'),
        t(cx, bas + 36, 22, 800, "#ffffff", `${c.trim} trim. · ${c.age} ans`, 'text-anchor="middle"'),
        t(cx, bas + 66, 18, 700, couleur, etat, 'text-anchor="middle"'),
        t(cx, bas + 92, 18, 400, "#cbd5e1", effet, 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");

  const axe = `<line x1="64" y1="${bas}" x2="1136" y2="${bas}" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>`;
  const pied = t(64, 536, 17, 400, "#94a3b8", "Pension de base brute par mois (régime général), 172 trimestres requis pour la génération 1970. Estimation du simulateur.");

  const decotes = cas.filter((c) => c.r.trimestresDecote > 0);
  const surcotes = cas.filter((c) => c.r.trimestresSupp > 0);
  const alt =
    `Pension de base brute par mois selon le nombre de trimestres et l'âge de départ, pour une personne née en ${ANNEE} avec un salaire annuel moyen de ${nombre(SAM)} € : ` +
    cas.map((c) => `${c.trim} trimestres à ${c.age} ans, ${nombre(c.r.pensionBase)} €`).join(" ; ") +
    `. La décote baisse la pension avec ${decotes.map((c) => c.r.trimestresDecote).join(" et ")} trimestres manquants, la surcote la relève de ${surcotes.map((c) => (c.r.trimestresSupp * 1.25).toFixed(2).replace(".", ",").replace(",00", "")).join(" % et de ")} %.`;

  return {
    nom: "simulateur-retraite-trimestres-decote-surcote",
    route: "simulateur-retraite",
    alt,
    svg: cadre({
      accent: "#f59e0b",
      kicker: "NÉ EN 1970 · SALAIRE MOYEN 35 000 € · PENSION DE BASE",
      titre: "Décote et surcote : l'effet sur la pension",
      note: "",
      corps: `${axe}\n  ${corps}\n  ${pied}`,
    }),
  };
}
