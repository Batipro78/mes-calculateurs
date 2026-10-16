// Consommation moyenne par an d'un ventilateur, d'une climatisation fixe et d'un climatiseur mobile.
// Sources : EDF (particulier.edf.fr, « Ventilateur ou climatiseur » : ventilateur 5 kWh/an ;
// « Climatisation reversible » : enquete CONSER, EDF R&D, PAC air/air moyenne du parc en mode froid
// 250 kWh/an, climatiseur mobile moyen 710 kWh/an, soit 2,8 fois plus). Prix : Tarif Bleu EDF,
// option Base, 0,2001 EUR TTC/kWh depuis le 1er aout 2026.
export default function ({ t, cadre, W, H }) {
  const PRIX = 0.2001;
  const fr = (n) => n.toFixed(2).replace(".", ",");
  const lignes = [
    { nom: "Ventilateur", kwh: 5, couleur: "#4ade80" },
    { nom: "Clim fixe (pompe à chaleur air/air)", kwh: 250, couleur: "#38bdf8" },
    { nom: "Climatiseur mobile", kwh: 710, couleur: "#f472b6" },
  ];
  const x0 = 64;
  const barreMax = 760;
  const y0 = 186;
  const rh = 104;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const w = Math.max(10, Math.round((l.kwh / 710) * barreMax));
      const euros = l.kwh * PRIX;
      const prix = l.kwh === 250 ? "environ 50 €" : `${fr(euros)} €`;
      return [
        t(x0, y + 24, 26, 800, l.couleur, l.nom),
        `<rect x="${x0}" y="${y + 40}" width="${w}" height="40" rx="8" fill="${l.couleur}" fill-opacity="0.9"/>`,
        t(x0 + w + 16, y + 69, 30, 800, "#ffffff", `${l.kwh} kWh`),
        t(x0 + w + 16 + (l.kwh === 5 ? 120 : 150), y + 69, 26, 600, "#cbd5e1", `${prix} par an`),
      ].join("\n  ");
    })
    .join("\n  ");
  const haut = y0 + lignes.length * rh;
  const pied =
    t(64, haut + 12, 20, 400, "#cbd5e1", "Moyennes EDF par an, au tarif Base de 0,2001 € le kWh (août 2026). Le mobile consomme 2,8 fois plus que le fixe.") +
    "\n  " +
    t(64, haut + 40, 18, 400, "#94a3b8", "Un climatiseur fixe consomme de 100 à 700 kWh par an selon l'appareil et l'usage (EDF).");
  const alt = `Consommation moyenne par an d'un ventilateur, d'une climatisation fixe et d'un climatiseur mobile avec le coût au tarif de ${String(PRIX).replace(".", ",")} euro le kWh : ventilateur 5 kWh soit 1 euro, clim fixe 250 kWh soit 50 euros, climatiseur mobile 710 kWh soit 142 euros`;
  return {
    nom: "climatisation-fixe-mobile-ventilateur-kwh-par-an",
    route: "combien-consomme-une-climatisation",
    alt,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "CLIMATISATION · CONSOMMATION MOYENNE",
      titre: "Combien consomme une climatisation ?",
      note: "",
      corps: `${corps}\n  ${pied}`,
    }),
  };
}
