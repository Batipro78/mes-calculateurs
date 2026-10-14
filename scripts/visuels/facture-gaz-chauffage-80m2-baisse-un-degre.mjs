// Facture de gaz d'un logement chauffe au gaz (13 000 kWh par an, hypothese du simulateur pour 80 m2)
// et economie quand on baisse le chauffage de 1, 2 ou 3 degres.
// Les chiffres viennent du code du simulateur (app/simulateur-facture-gaz/factureGazCalc.ts) :
//  - prix repere de la CRE, grille du 1er octobre 2026 (abonnement 360,79 EUR TTC par an,
//    kWh a 0,14557 EUR TTC en prix moyen) ;
//  - repere officiel de 7 % de consommation en moins par degre (ministere de la Transition
//    ecologique et ADEME), applique a la part variable ; l'abonnement ne baisse pas.
import {
  calcFactureGaz,
  economieBaisseChauffage,
  CONSOMMATIONS_TYPIQUES,
  GAIN_PAR_DEGRE,
  MOIS_GRILLE,
} from "../../app/simulateur-facture-gaz/factureGazCalc.ts";

export default function ({ t, cadre, W, H }) {
  const conso = CONSOMMATIONS_TYPIQUES["chauffage-80m2"];
  const base = calcFactureGaz(conso, "moyenne", "chauffage-80m2");
  const euros = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const fr = (n, d = 5) => n.toFixed(d).replace(".", ",");
  const espace = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const lignes = [0, 1, 2, 3].map((deg) => {
    const eco = economieBaisseChauffage(conso, "moyenne", deg);
    return { deg, eco, facture: base.factureAnnuelle - eco, pct: Math.round(GAIN_PAR_DEGRE * deg * 100) };
  });
  const couleurs = ["#94a3b8", "#fbbf24", "#fb923c", "#f87171"];
  const xb = 64;
  const largeurMax = 560;
  const y0 = 166;
  const rh = 78;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const w = (l.facture / base.factureAnnuelle) * largeurMax;
      const titre = l.deg === 0 ? "Chauffage inchangé" : `Chauffage − ${l.deg} °C`;
      const sous = l.deg === 0 ? `${espace(conso)} kWh par an` : `${espace(Math.round(conso * (1 - GAIN_PAR_DEGRE * l.deg)))} kWh par an (− ${l.pct} %)`;
      const droite =
        l.deg === 0
          ? t(xb + w + 22, y + 44, 34, 800, "#ffffff", `${euros(l.facture)} € par an`)
          : t(xb + w + 22, y + 34, 34, 800, "#ffffff", `${euros(l.facture)} € par an`) +
            "\n  " +
            t(xb + w + 22, y + 62, 24, 700, couleurs[i], `soit ${euros(l.eco)} € économisés`);
      return [
        t(xb, y + 22, 24, 700, "#ffffff", titre),
        t(xb, y + 46, 17, 400, "#94a3b8", sous),
        `<rect x="${xb}" y="${y + 54}" width="${w}" height="14" rx="7" fill="${couleurs[i]}"/>`,
        droite,
      ].join("\n  ");
    })
    .join("\n  ");
  const pied =
    t(64, y0 + 4 * rh + 14, 18, 400, "#cbd5e1", `Prix repère de la CRE, ${MOIS_GRILLE} : abonnement ${fr(base.abonnementAnnuel, 2)} € TTC par an, kWh à ${fr(base.prixKwh)} € TTC. Le prix change chaque mois.`) +
    "\n  " +
    t(64, y0 + 4 * rh + 38, 18, 400, "#94a3b8", `Repère officiel : − ${Math.round(GAIN_PAR_DEGRE * 100)} % de consommation par degré. L'abonnement reste dû.`);
  const alt =
    `Facture de gaz pour un logement chauffé au gaz de ${espace(conso)} kWh par an avec le prix repère de la CRE d'${MOIS_GRILLE} : ${euros(lignes[0].facture)} euros par an ; ` +
    lignes
      .slice(1)
      .map((l) => `${euros(l.facture)} euros en baissant le chauffage de ${l.deg} degré${l.deg > 1 ? "s" : ""}, soit ${euros(l.eco)} euros économisés`)
      .join(" ; ") +
    `. Repère de ${Math.round(GAIN_PAR_DEGRE * 100)} % de consommation en moins par degré.`;
  return {
    nom: "facture-gaz-chauffage-80m2-baisse-un-degre",
    route: "simulateur-facture-gaz",
    alt,
    svg: cadre({
      accent: "#f97316",
      kicker: "FACTURE DE GAZ · BAISSER LE CHAUFFAGE",
      titre: "Ce que rapporte un degré en moins",
      note: "",
      corps: `${corps}\n  ${pied}`,
    }),
  };
}
