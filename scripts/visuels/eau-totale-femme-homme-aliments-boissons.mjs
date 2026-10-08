// Eau totale par jour : repere EFSA (2010), part des aliments et part a boire.
// Reperes EFSA (Scientific Opinion on Dietary Reference Values for water, EFSA Journal 2010;8(3):1459) :
//   2,0 L/jour (femmes) et 2,5 L/jour (hommes), eau totale = boissons + eau des aliments ;
//   95e percentile des apports observes : 3,1 L (femmes) et 4,0 L (hommes).
// Eau des aliments : environ 1 L par jour (exemple de Vidal, « De l'eau pour vivre »).
//   La part « a boire » est CALCULEE : eau totale - 1 L. Verre = 250 ml (valeur du calculateur du site).
export default function ({ t, cadre, W, H }) {
  const fr = (n) => n.toFixed(1).replace(".", ",");
  const ALIMENTS = 1.0;
  const VERRE = 0.25;
  const lignes = [
    { label: "Femme adulte", sous: "repère EFSA", total: 2.0, repere: true },
    { label: "Homme adulte", sous: "repère EFSA", total: 2.5, repere: true },
    { label: "Femmes (haut)", sous: "95e percentile observé", total: 3.1, repere: false },
    { label: "Hommes (haut)", sous: "95e percentile observé", total: 4.0, repere: false },
  ];
  const x0 = 330;
  const pxL = 160;
  const y0 = 176;
  const rh = 76;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const nom = t(64, y + 26, 24, 700, "#ffffff", l.label) + t(64, y + 50, 17, 400, "#94a3b8", l.sous);
      let barre;
      let droite = "";
      if (l.repere) {
        const boire = l.total - ALIMENTS;
        const wa = ALIMENTS * pxL;
        const wb = boire * pxL;
        barre =
          `<rect x="${x0}" y="${y}" width="${wa}" height="56" rx="10" fill="#f59e0b"/>` +
          `<rect x="${x0 + wa}" y="${y}" width="${wb}" height="56" rx="10" fill="#38bdf8"/>` +
          t(x0 + wa / 2, y + 38, 26, 800, "#0b1224", `${fr(ALIMENTS)} L`, 'text-anchor="middle"') +
          t(x0 + wa + wb / 2, y + 38, 26, 800, "#0b1224", `${fr(boire)} L`, 'text-anchor="middle"');
        const verres = Math.round(boire / VERRE);
        droite = t(x0 + l.total * pxL + 22, y + 26, 20, 700, "#7dd3fc", `à boire : ${verres} verres`) + t(x0 + l.total * pxL + 22, y + 50, 17, 400, "#94a3b8", "de 250 ml");
      } else {
        barre =
          `<rect x="${x0}" y="${y}" width="${l.total * pxL}" height="56" rx="10" fill="#64748b" fill-opacity="0.7"/>` +
          t(x0 + (l.total * pxL) / 2, y + 38, 26, 800, "#ffffff", `${fr(l.total)} L`, 'text-anchor="middle"');
      }
      return `${nom}\n  ${barre}\n  ${droite}`;
    })
    .join("\n  ");
  const legende =
    `<rect x="${x0}" y="${y0 + 4 * rh + 6}" width="18" height="18" rx="4" fill="#f59e0b"/>` +
    t(x0 + 28, y0 + 4 * rh + 22, 19, 400, "#e2e8f0", "eau des aliments (environ 1 L)") +
    `<rect x="${x0 + 360}" y="${y0 + 4 * rh + 6}" width="18" height="18" rx="4" fill="#38bdf8"/>` +
    t(x0 + 388, y0 + 4 * rh + 22, 19, 400, "#e2e8f0", "eau à boire (eau totale - 1 L)");
  const pied = t(64, y0 + 4 * rh + 62, 18, 400, "#94a3b8", "EFSA 2010 : eau totale = boissons + aliments, climat tempéré, activité modérée. Aliments : environ 1 L (Vidal).");
  const alt = `Eau totale par jour selon l'EFSA : ${fr(2.0)} L pour une femme dont environ ${fr(ALIMENTS)} L viennent des aliments et ${fr(2.0 - ALIMENTS)} L à boire (${Math.round((2.0 - ALIMENTS) / VERRE)} verres de 250 ml) ; ${fr(2.5)} L pour un homme dont ${fr(2.5 - ALIMENTS)} L à boire (${Math.round((2.5 - ALIMENTS) / VERRE)} verres). Les 5 % qui en absorbent le plus atteignent ${fr(3.1)} L (femmes) et ${fr(4.0)} L (hommes) d'eau totale.`;
  return {
    nom: "eau-totale-femme-homme-aliments-boissons",
    route: "combien-de-litres-d-eau-par-jour",
    alt,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "EAU PAR JOUR · REPÈRES EFSA : TOTALE ET À BOIRE",
      titre: "2 L ou 2,5 L d'eau, mais pas tout à boire",
      note: "",
      corps: `${corps}\n  ${legende}\n  ${pied}`,
    }),
  };
}
