// Surcote : +1,25 % de pension de base par trimestre civil entier travaille apres l'age legal
// ET au-dela de la duree du taux plein (service-public.gouv.fr F19643 ; lassuranceretraite.fr :
// "une annee supplementaire de travail augmente votre retraite de +5 % (= nombre de trimestres x 1,25 %)").
// Exemple : pension de base de 1 750 EUR par mois a taux plein (celui de la page de l'Assurance retraite).
// Les montants sont CALCULES ici : pension x (1 + 0,0125 x trimestres).
export default function ({ t, cadre, W, H }) {
  const fr = (n) => {
    const [ent, dec] = n.toFixed(2).split(".");
    const milliers = ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return dec === "00" ? milliers : `${milliers},${dec}`;
  };
  const TAUX = 0.0125;
  const BASE = 1750;
  const pas = [
    { trim: 0, label: "Taux plein", sous: "âge légal + durée atteints" },
    { trim: 4, label: "1 an de plus", sous: "4 trimestres" },
    { trim: 8, label: "2 ans de plus", sous: "8 trimestres" },
    { trim: 12, label: "3 ans de plus", sous: "12 trimestres" },
  ].map((p) => ({ ...p, pension: BASE * (1 + TAUX * p.trim), hausse: TAUX * p.trim * 100 }));

  const gap = 24;
  const cw = (1072 - 3 * gap) / 4;
  const bas = 440;
  const hMax = 230;
  const max = pas[pas.length - 1].pension;
  const couleurs = ["#94a3b8", "#4ade80", "#34d399", "#2dd4bf"];

  const corps = pas
    .map((p, i) => {
      const x = 64 + i * (cw + gap);
      const cx = x + cw / 2;
      const h = (p.pension / max) * hMax;
      const gain = p.pension - BASE;
      const dedans =
        p.trim === 0
          ? t(cx, bas - 16, 26, 800, "#0b1224", "base : 100 %", 'text-anchor="middle"')
          : t(cx, bas - 16, 30, 800, "#0b1224", `+${fr(p.hausse)} %`, 'text-anchor="middle"');
      return [
        `<rect x="${x}" y="${(bas - h).toFixed(1)}" width="${cw}" height="${h.toFixed(1)}" rx="14" fill="${couleurs[i]}"/>`,
        t(cx, bas - h - 16, 38, 800, "#ffffff", `${fr(p.pension)} €`, 'text-anchor="middle"'),
        dedans,
        t(cx, bas + 38, 25, 800, "#ffffff", p.label, 'text-anchor="middle"'),
        t(cx, bas + 64, 19, 400, "#cbd5e1", p.sous, 'text-anchor="middle"'),
        t(cx, bas + 90, 19, 700, couleurs[i], p.trim === 0 ? "pension de départ" : `+${fr(gain)} € par mois, à vie`, 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");

  const axe = `<line x1="64" y1="${bas}" x2="1136" y2="${bas}" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>`;
  const alt =
    `Schéma de la surcote : une pension de base de ${fr(BASE)} € par mois au taux plein est majorée de ${fr(TAUX * 100)} % par trimestre travaillé après l'âge légal et la durée du taux plein, ` +
    pas.slice(1).map((p) => `${p.trim} trimestres donnent ${fr(p.pension)} € (+${fr(p.hausse)} %)`).join(", ") +
    ".";

  return {
    nom: "surcote-retraite-1-25-pourcent-par-trimestre",
    route: "surcote-retraite-comment-est-elle-calculee",
    alt,
    svg: cadre({
      accent: "#4ade80",
      kicker: "SURCOTE · EXEMPLE SUR UNE PENSION DE BASE DE 1 750 €",
      titre: "Chaque trimestre de plus : +1,25 % à vie",
      note: "",
      corps: `${axe}\n  ${corps}`,
    }),
  };
}
