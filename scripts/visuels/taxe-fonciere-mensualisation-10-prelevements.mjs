// Visuel du calculateur de taxe fonciere : la mensualisation.
// Source : impots.gouv.fr « Le prelevement mensuel » (lu le 05/10/2026) : « dix
// prelevements mensuels, de janvier a octobre », « le 15 de chaque mois »,
// chaque prelevement = « le dixieme de l'impot du l'annee precedente » ; adhesion
// entre le 1er juillet et le 15 decembre -> prelevements a partir du 15 janvier.
export default function ({ t, cadre }) {
  // Exemple : meme taxe que l'article « comment est calculee la taxe fonciere »
  // (valeur locative 4 000 EUR, coefficient 1,008, base 50 %, taux 40 %).
  const taxe = Math.round(4000 * 1.008 * 0.5 * 0.4 * 100) / 100; // 806,40
  const mensualite = Math.round((taxe / 10) * 100) / 100;
  const fr = (n) => n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const mois = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const x0 = 64;
  const larg = 82;
  const ecart = (1072 - 12 * larg) / 11;
  const cases = mois
    .map((m, i) => {
      const x = x0 + i * (larg + ecart);
      const paye = i < 10;
      return [
        `<rect x="${x.toFixed(1)}" y="232" width="${larg}" height="132" rx="14" fill="${paye ? "#f59e0b" : "#1e293b"}" fill-opacity="${paye ? 0.9 : 1}" stroke="${paye ? "#fbbf24" : "#334155"}" stroke-width="2"/>`,
        t((x + larg / 2).toFixed(1), 270, 19, 700, paye ? "#1c1917" : "#64748b", m, 'text-anchor="middle"'),
        t((x + larg / 2).toFixed(1), 320, paye ? 22 : 17, 800, paye ? "#1c1917" : "#fbbf24", paye ? fr(mensualite) : "si hausse", 'text-anchor="middle"'),
        t((x + larg / 2).toFixed(1), 348, 15, 600, paye ? "#1c1917" : "#94a3b8", paye ? "le 15" : "le solde", 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");

  const corps = `
  ${t(64, 190, 28, 600, "#e2e8f0", `Exemple : ${fr(taxe)} € de taxe → 10 prélèvements de ${fr(mensualite)} €`)}
  ${cases}
  ${t(64, 420, 24, 600, "#fbbf24", "Chaque prélèvement = 1/10 de la taxe de l'année précédente.")}
  ${t(64, 458, 24, 400, "#cbd5e1", "Si la taxe augmente, les prélèvements continuent en novembre, voire en décembre.")}
  ${t(64, 500, 24, 400, "#cbd5e1", "Adhésion du 1er juillet au 15 décembre : début le 15 janvier suivant.")}`;

  return {
    nom: "taxe-fonciere-mensualisation-10-prelevements",
    route: "calcul-taxe-fonciere",
    alt: `Taxe foncière mensualisée : 10 prélèvements le 15 de chaque mois, de janvier à octobre ; si la taxe augmente, le solde est prélevé en novembre, voire en décembre. Exemple : ${fr(taxe)} € de taxe, soit 10 prélèvements de ${fr(mensualite)} €.`,
    svg: cadre({
      accent: "#f59e0b",
      kicker: "PRÉLÈVEMENT MENSUEL · SOURCE : IMPOTS.GOUV.FR",
      titre: "Taxe foncière : payer en 10 mois",
      note: "Montant réel : votre avis d'impôt",
      corps,
    }),
  };
}
