// Facture annuelle de chauffage au gaz selon la consommation, au prix repere de la CRE.
// Les chiffres sont lus dans le code du simulateur (app/simulateur-facture-gaz/factureGazCalc.ts) :
// grille du 1er octobre 2026, zone GRDF, client chauffage, prix moyen (abonnement 360,79 EUR TTC
// par an, kWh a 0,14557 EUR TTC). 11 370 kWh = consommation de reference « chauffage » de la CRE
// (fichier OPEN_DATA_GRDF.xlsx, onglet « Consommateurs types », 11,37 MWh/an). Les autres
// consommations sont des hypotheses du simulateur, pas des valeurs officielles.
import { factureAnnuelleTTC } from "../../app/simulateur-facture-gaz/factureGazCalc.ts";

export default function ({ t, cadre, W, H }) {
  const espace = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const lignes = [
    { nom: "8 000 kWh", detail: "logement de 50 m² (hypothèse)", kwh: 8000, couleur: "#fdba74" },
    { nom: "11 370 kWh", detail: "client type de la CRE", kwh: 11370, couleur: "#fb923c" },
    { nom: "13 000 kWh", detail: "logement de 80 m² (hypothèse)", kwh: 13000, couleur: "#f97316" },
    { nom: "20 000 kWh", detail: "logement de 120 m² (hypothèse)", kwh: 20000, couleur: "#ef4444" },
  ];
  const totaux = lignes.map((l) => factureAnnuelleTTC(l.kwh, "moyenne", "chauffage"));
  const max = Math.max(...totaux);
  const x0 = 360;
  const barreMax = 520;
  const y0 = 170;
  const rh = 76;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const total = totaux[i];
      const w = Math.round((total / max) * barreMax);
      return [
        t(64, y + 28, 28, 800, l.couleur, l.nom),
        t(64, y + 54, 18, 400, "#94a3b8", l.detail),
        `<rect x="${x0}" y="${y + 6}" width="${w}" height="46" rx="8" fill="${l.couleur}" fill-opacity="0.9"/>`,
        t(x0 + w + 16, y + 40, 30, 800, "#ffffff", `${espace(total)} € par an`),
        t(x0 + w + 16, y + 66, 18, 400, "#cbd5e1", `${espace(total / 12)} € par mois`),
      ].join("\n  ");
    })
    .join("\n  ");
  const haut = y0 + lignes.length * rh;
  const pied =
    t(64, haut + 24, 20, 400, "#cbd5e1", "Prix repère de la CRE d'octobre 2026, prix moyen, abonnement de 360,79 € par an compris (TTC).") +
    "\n  " +
    t(64, haut + 50, 18, 400, "#94a3b8", "Seuls les 11 370 kWh sont la consommation de la CRE ; votre contrat a son propre prix.");
  const alt = `Facture de chauffage au gaz au prix repère de la CRE d'octobre 2026, abonnement compris : ${lignes
    .map((l, i) => `${l.nom}${l.kwh === 11370 ? " (client type de la CRE)" : ""} soit ${espace(totaux[i])} euros par an`)
    .join(", ")}`;
  return {
    nom: "chauffage-gaz-facture-annuelle-selon-consommation",
    route: "combien-coute-le-chauffage-au-gaz",
    alt,
    svg: cadre({
      accent: "#fb923c",
      kicker: "CHAUFFAGE AU GAZ · FACTURE ANNUELLE",
      titre: "Combien coûte le chauffage au gaz ?",
      note: "",
      corps: `${corps}\n  ${pied}`,
    }),
  };
}
