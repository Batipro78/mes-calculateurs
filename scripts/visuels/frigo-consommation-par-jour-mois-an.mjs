// Consommation moyenne d'un frigo, d'un congelateur et d'un frigo americain.
// Sources : EDF, "comment bien choisir son frigo" (particulier.edf.fr/fr/accueil/guide-energie/
// economies-energie/comment-bien-choisir-son-frigo.html) : frigo 332,30 kWh/an, congelateur
// 253,58 kWh/an, frigo americain = 2 fois un frigo classique. Prix : Tarif Bleu EDF, option
// Base, 0,2001 EUR TTC/kWh depuis le 1er aout 2026. Jour = an / 365, mois = an / 12.
export default function ({ t, cadre, W, H }) {
  const PRIX = 0.2001;
  const fr = (n) => n.toFixed(2).replace(".", ",");
  const kwh = (n) => String(Math.round(n * 10) / 10).replace(".", ",");
  const lignes = [
    { nom: "Frigo", an: 332.3, couleur: "#22d3ee" },
    { nom: "Congélateur", an: 253.58, couleur: "#60a5fa" },
    { nom: "Frigo américain", an: 332.3 * 2, couleur: "#f472b6" },
  ];
  const cols = [
    { titre: "1 jour", div: 365, cx: 560 },
    { titre: "1 mois", div: 12, cx: 810 },
    { titre: "1 an", div: 1, cx: 1040 },
  ];
  const entete = cols.map((c) => t(c.cx, 172, 22, 700, "#e2e8f0", c.titre, 'text-anchor="middle"')).join("\n  ");
  const y0 = 190;
  const rh = 92;
  const corps = lignes
    .map((l, r) => {
      const y = y0 + r * rh;
      const fond = `<rect x="64" y="${y}" width="1072" height="${rh - 8}" rx="12" fill="${l.couleur}" fill-opacity="0.14"/>`;
      const nom = t(84, y + 52, 30, 800, l.couleur, l.nom);
      const cases = cols
        .map((c) => {
          const k = l.an / c.div;
          return t(c.cx, y + 42, 34, 800, "#ffffff", `${fr(k * PRIX)} €`, 'text-anchor="middle"') +
            t(c.cx, y + 70, 19, 400, "#94a3b8", `${kwh(k)} kWh`, 'text-anchor="middle"');
        })
        .join("");
      return `${fond}\n  ${nom}\n  ${cases}`;
    })
    .join("\n  ");
  const haut = y0 + lignes.length * rh;
  const pied =
    t(64, haut + 22, 20, 400, "#cbd5e1", "Moyennes EDF, appareil branché toute l'année, au tarif Base de 0,2001 € le kWh (août 2026).") +
    "\n  " +
    t(64, haut + 48, 18, 400, "#94a3b8", "Votre modèle : lisez les kWh par an sur l'étiquette énergie. Américain = 2 fois un frigo classique (EDF).");
  const alt = `Consommation moyenne d'un frigo, d'un congélateur et d'un frigo américain avec le coût au tarif de ${String(PRIX).replace(".", ",")} euro le kWh : frigo ${kwh(332.3)} kWh par an soit ${fr(332.3 * PRIX)} euros, congélateur ${kwh(253.58)} kWh soit ${fr(253.58 * PRIX)} euros, frigo américain ${kwh(664.6)} kWh soit ${fr(664.6 * PRIX)} euros`;
  return {
    nom: "frigo-consommation-par-jour-mois-an",
    route: "combien-consomme-un-frigo",
    alt,
    svg: cadre({
      accent: "#22d3ee",
      kicker: "FRIGO · CONSOMMATION MOYENNE",
      titre: "Combien consomme un frigo ?",
      note: "",
      corps: `${entete}\n  ${corps}\n  ${pied}`,
    }),
  };
}
