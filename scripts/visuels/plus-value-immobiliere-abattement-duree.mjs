// Visuel : les deux abattements pour duree de detention d'une plus-value immobiliere.
// Baremes : service-public.gouv.fr/particuliers/vosdroits/F10864 (tableau « Taux
// d'abattement pour la vente d'un bien immobilier ») :
//   impot sur le revenu : 0 % jusqu'a 5 ans, 6 % par an de la 6e a la 21e annee,
//                         4 % la 22e annee, exoneration au-dela ;
//   prelevements sociaux : 1,65 % par an de la 6e a la 21e annee, 1,6 % la 22e,
//                          9 % par an de la 23e a la 30e, exoneration au-dela.
// Memes formules que le calculateur /calcul-plus-value-immobiliere.
export default function ({ t, cadre }) {
  const abIR = (a) => (a < 6 ? 0 : a <= 21 ? (a - 5) * 6 : 100);
  const abPS = (a) => (a < 6 ? 0 : a <= 21 ? (a - 5) * 1.65 : a === 22 ? 28 : a <= 30 ? 28 + (a - 22) * 9 : 100);
  const X0 = 120, X1 = 1100, Y0 = 495, Y1 = 205, ANMAX = 32;
  const x = (a) => X0 + (a / ANMAX) * (X1 - X0);
  const y = (p) => Y0 - (p / 100) * (Y0 - Y1);
  const pct = (n) => String(n).replace(".", ",");
  const annees = Array.from({ length: ANMAX + 1 }, (_, i) => i);
  const ligne = (f) => annees.map((a) => `${x(a).toFixed(1)},${y(f(a)).toFixed(1)}`).join(" ");
  const cI = "#38bdf8", cP = "#fbbf24";

  const grille = [0, 50, 100].map((p) => [
    `<line x1="${X0}" y1="${y(p)}" x2="${X1}" y2="${y(p)}" stroke="#334155" stroke-width="1.5"/>`,
    t(X0 - 12, y(p) + 7, 20, 600, "#94a3b8", `${p} %`, 'text-anchor="end"'),
  ].join("\n  ")).join("\n  ");
  const graduations = [0, 5, 10, 15, 20, 25, 30].map((a) =>
    t(x(a), 522, 20, 600, "#94a3b8", String(a), 'text-anchor="middle"')).join("\n  ");
  const reperes = [22, 30].map((a) =>
    `<line x1="${x(a)}" y1="${Y1 - 6}" x2="${x(a)}" y2="${Y0}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="7 6"/>`).join("\n  ");
  const points = (a, dy) => [
    `<circle cx="${x(a)}" cy="${y(abIR(a))}" r="7" fill="${cI}"/>`,
    t(x(a) - 14, y(abIR(a)) - 8, 22, 800, cI, `${pct(abIR(a))} %`, 'text-anchor="end"'),
    `<circle cx="${x(a)}" cy="${y(abPS(a))}" r="7" fill="${cP}"/>`,
    t(x(a) - 14, y(abPS(a)) + dy, 22, 800, cP, `${pct(abPS(a))} %`, 'text-anchor="end"'),
  ].join("\n  ");

  const corps = `
  ${grille}
  ${graduations}
  ${t((X0 + X1) / 2, 548, 19, 600, "#cbd5e1", "années de détention", 'text-anchor="middle"')}
  ${reperes}
  <polyline points="${ligne(abIR)}" fill="none" stroke="${cI}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
  <polyline points="${ligne(abPS)}" fill="none" stroke="${cP}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
  ${points(10, -14)}
  ${points(15, -14)}
  ${t(x(30) - 12, 440, 22, 700, "#ffffff", "30 ans : PS à zéro", 'text-anchor="end"')}
  ${t(x(22) + 12, 478, 22, 700, "#ffffff", "22 ans : IR à zéro")}
  <rect x="140" y="196" width="26" height="8" rx="4" fill="${cI}"/>
  ${t(178, 206, 22, 600, "#e2e8f0", "Impôt sur le revenu (6 % par an dès la 6e année)")}
  <rect x="140" y="232" width="26" height="8" rx="4" fill="${cP}"/>
  ${t(178, 242, 22, 600, "#e2e8f0", "Prélèvements sociaux (1,65 % par an, puis 9 % dès la 23e)")}`;

  const alt =
    `Courbes de l'abattement pour durée de détention d'une plus-value immobilière : pour l'impôt sur le revenu 30 % à 10 ans, 60 % à 15 ans et 100 % à 22 ans ; pour les prélèvements sociaux ${pct(abPS(10))} % à 10 ans, ${pct(abPS(15))} % à 15 ans, 28 % à 22 ans et 100 % à 30 ans`;
  return {
    nom: "plus-value-immobiliere-abattement-duree",
    route: "plus-value-immobiliere-qui-calcule-quand-payer",
    alt,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "PLUS-VALUE IMMOBILIÈRE · PART DE LA PLUS-VALUE NON TAXÉE",
      titre: "L'abattement selon la durée de détention",
      note: "Source : service-public.gouv.fr",
      corps,
    }),
  };
}
