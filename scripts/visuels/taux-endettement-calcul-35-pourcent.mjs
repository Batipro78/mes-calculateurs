// Formule du taux d'endettement et exemple chiffre face au seuil de 35 % du HCSF.
// Seuil : decision D-HCSF-2021-7 du 29 septembre 2021, applicable au 1er janvier 2022
// (economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers).
// Formule : celle du calculateur /calcul-taux-endettement, (charges / revenus) x 100.
export default function ({ t, cadre, euros, esc, W, H }) {
  const SEUIL = 35;
  const salaire1 = 2400;
  const salaire2 = 1600;
  const pret = 1140; // mensualite du projet, assurance emprunteur comprise
  const auto = 200;
  const revenus = salaire1 + salaire2;
  const charges = pret + auto;
  const taux = (charges / revenus) * 100;
  const tauxTxt = taux.toFixed(1).replace(".", ",");

  // Barre graduee de 0 a 40 %
  const x0 = 64;
  const largeur = 1072;
  const echelle = 40;
  const px = (v) => x0 + (v / echelle) * largeur;
  const yb = 430;

  const corps = `
  <rect x="64" y="160" width="1072" height="84" rx="18" fill="#ffffff" fill-opacity="0.07" stroke="#38bdf8" stroke-opacity="0.5" stroke-width="2"/>
  ${t(600, 214, 34, 800, "#ffffff", "Taux = charges de crédit du mois ÷ revenus du mois × 100", 'text-anchor="middle"')}

  ${t(64, 292, 22, 700, "#38bdf8", "EXEMPLE : UN COUPLE", 'letter-spacing="2"')}
  ${t(64, 332, 25, 400, "#cbd5e1", `Revenus : ${euros(salaire1)} + ${euros(salaire2)} = `)}
  ${t(372, 332, 25, 800, "#ffffff", `${euros(revenus)} €`)}
  ${t(64, 370, 25, 400, "#cbd5e1", `Charges : prêt ${euros(pret)} (assurance incluse) + auto ${euros(auto)} = `)}
  ${t(654, 370, 25, 800, "#ffffff", `${euros(charges)} €`)}

  ${t(1136, 332, 22, 700, "#94a3b8", "RÉSULTAT", 'text-anchor="end" letter-spacing="2"')}
  ${t(1136, 392, 64, 800, "#4ade80", `${tauxTxt} %`, 'text-anchor="end"')}

  <rect x="${x0}" y="${yb}" width="${largeur}" height="40" rx="10" fill="#ffffff" fill-opacity="0.1"/>
  <rect x="${x0}" y="${yb}" width="${(px(taux) - x0).toFixed(1)}" height="40" rx="10" fill="#4ade80"/>
  <line x1="${px(SEUIL).toFixed(1)}" y1="${yb - 14}" x2="${px(SEUIL).toFixed(1)}" y2="${yb + 54}" stroke="#fb7185" stroke-width="5"/>
  ${t(px(SEUIL) - 4, yb + 84, 24, 800, "#fb7185", `Seuil du HCSF : ${SEUIL} %`, 'text-anchor="end"')}
  ${t(x0, yb + 80, 22, 400, "#94a3b8", "0 %")}
  ${t(x0 + largeur, yb + 80, 22, 400, "#94a3b8", "40 %", 'text-anchor="end"')}`;

  return {
    nom: "taux-endettement-calcul-35-pourcent",
    route: "taux-d-endettement-comment-calculer",
    alt: `Formule du taux d'endettement (charges de crédit ÷ revenus × 100) et exemple : ${euros(charges)} € de charges pour ${euros(revenus)} € de revenus, soit ${tauxTxt} %, sous le seuil de ${SEUIL} % du HCSF`,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "CRÉDIT IMMOBILIER · NORME DES BANQUES : 35 % ASSURANCE COMPRISE",
      titre: "Taux d'endettement : la formule",
      note: "Exemple chiffré, à titre indicatif",
      corps,
    }),
  };
}
