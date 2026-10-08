// Cout d'un radiateur electrique de 1 000, 1 500 et 2 000 W a pleine puissance.
// Formule : kWh = puissance (W) x heures / 1000 ; cout = kWh x prix du kWh.
// Prix du kWh : Tarif Bleu EDF, option Base 3 et 6 kVA, 0,2001 EUR TTC/kWh depuis le
// 1er aout 2026 (particulier.edf.fr/fr/accueil/electricite-gaz/tarif-bleu.html).
// Hypothese d'exemple : 8 h de chauffe a pleine puissance par jour, mois de 30 jours
// (comme le calculateur /calcul-consommation-electrique).
export default function ({ t, cadre, W, H }) {
  const PRIX = 0.2001;
  const HEURES_JOUR = 8;
  const JOURS = 30;
  const fr = (n) => n.toFixed(2).replace(".", ",");
  const kwh = (n) => String(Math.round(n * 10) / 10).replace(".", ",");
  const lignes = [
    { w: 1000, couleur: "#fbbf24" },
    { w: 1500, couleur: "#fb923c" },
    { w: 2000, couleur: "#f87171" },
  ];
  const cols = [
    { titre: "1 heure", h: 1, jours: 1, cx: 520 },
    { titre: `1 jour (${HEURES_JOUR} h)`, h: HEURES_JOUR, jours: 1, cx: 790 },
    { titre: `1 mois (${JOURS} jours)`, h: HEURES_JOUR, jours: JOURS, cx: 1040 },
  ];
  const entete = cols.map((c) => t(c.cx, 172, 22, 700, "#e2e8f0", c.titre, 'text-anchor="middle"')).join("\n  ");
  const y0 = 190;
  const rh = 92;
  const corps = lignes
    .map((l, r) => {
      const y = y0 + r * rh;
      const fond = `<rect x="64" y="${y}" width="1072" height="${rh - 8}" rx="12" fill="${l.couleur}" fill-opacity="0.14"/>`;
      const nom = t(84, y + 52, 36, 800, l.couleur, `${String(l.w).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} W`);
      const cases = cols
        .map((c) => {
          const k = (l.w * c.h * c.jours) / 1000;
          return t(c.cx, y + 42, 36, 800, "#ffffff", `${fr(k * PRIX)} €`, 'text-anchor="middle"') +
            t(c.cx, y + 70, 19, 400, "#94a3b8", `${kwh(k)} kWh`, 'text-anchor="middle"');
        })
        .join("");
      return `${fond}\n  ${nom}\n  ${cases}`;
    })
    .join("\n  ");
  const haut = y0 + lignes.length * rh;
  const pied =
    t(64, haut + 22, 20, 400, "#cbd5e1", `À pleine puissance, au tarif Base de ${String(PRIX).replace(".", ",")} € le kWh (Tarif Bleu EDF, août 2026).`) +
    "\n  " +
    t(64, haut + 48, 18, 400, "#94a3b8", "Cas maximal : le thermostat coupe le radiateur dès que la température est atteinte.");
  const alt = `Coût d'un radiateur électrique à pleine puissance au tarif de ${String(PRIX).replace(".", ",")} euro le kWh : ${fr(1 * PRIX)} euro par heure pour 1 000 W, ${fr(1.5 * PRIX)} pour 1 500 W et ${fr(2 * PRIX)} pour 2 000 W ; pour 8 heures par jour, ${fr(8 * PRIX)}, ${fr(12 * PRIX)} et ${fr(16 * PRIX)} euros par jour ; sur 30 jours, ${fr(240 * PRIX)}, ${fr(360 * PRIX)} et ${fr(480 * PRIX)} euros`;
  return {
    nom: "cout-radiateur-electrique-1000-1500-2000w",
    route: "combien-consomme-un-radiateur-electrique",
    alt,
    svg: cadre({
      accent: "#fb923c",
      kicker: "RADIATEUR ÉLECTRIQUE · COÛT À PLEINE PUISSANCE",
      titre: "Combien coûte un radiateur électrique ?",
      note: "",
      corps: `${entete}\n  ${corps}\n  ${pied}`,
    }),
  };
}
