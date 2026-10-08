// Cout par jour de quelques appareils, avec les puissances et durees par defaut du
// calculateur /calcul-consommation-electrique (APPAREILS_PREDEFINIS).
// Formule : kWh/jour = puissance (W) x heures / 1000 ; cout = kWh x 0,2001 EUR
// (Tarif Bleu EDF, option Base 3 et 6 kVA, TTC, depuis le 1er aout 2026 :
// particulier.edf.fr/fr/accueil/electricite-gaz/tarif-bleu.html).
export default function ({ t, cadre, W, H }) {
  const PRIX = 0.2001;
  const appareils = [
    { nom: "Ampoule LED", w: 9, h: 5, couleur: "#4ade80" },
    { nom: "Box internet", w: 15, h: 24, couleur: "#4ade80" },
    { nom: "Téléviseur", w: 120, h: 4, couleur: "#38bdf8" },
    { nom: "Réfrigérateur", w: 150, h: 24, couleur: "#38bdf8" },
    { nom: "Lave-linge", w: 1200, h: 1, couleur: "#fbbf24" },
    { nom: "Four électrique", w: 2500, h: 1, couleur: "#fb923c" },
    { nom: "Radiateur électrique", w: 1500, h: 8, couleur: "#f87171" },
  ];
  const fr = (n) => n.toFixed(2).replace(".", ",");
  const kwh = (n) => String(Math.round(n * 100) / 100).replace(".", ",");
  const sep = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const duree = (h) => (h === 24 ? "24 h" : `${String(h).replace(".", ",")} h`);
  const donnees = appareils.map((a) => ({ ...a, k: (a.w * a.h) / 1000 }));
  const max = Math.max(...donnees.map((d) => d.k * PRIX));
  const x0 = 310;
  const largeurMax = 480;
  const y0 = 146;
  const rh = 47;
  const lignes = donnees
    .map((d, i) => {
      const y = y0 + i * rh;
      const cout = d.k * PRIX;
      const lw = Math.max(8, (cout / max) * largeurMax);
      return [
        t(64, y + 28, 23, 700, "#ffffff", d.nom),
        `<rect x="${x0}" y="${y + 6}" width="${lw.toFixed(1)}" height="32" rx="8" fill="${d.couleur}"/>`,
        t(x0 + lw + 14, y + 30, 24, 800, "#ffffff", `${fr(cout)} €`),
        t(1136, y + 29, 19, 400, "#94a3b8", `${sep(d.w)} W · ${duree(d.h)} · ${kwh(d.k)} kWh`, 'text-anchor="end"'),
      ].join("\n  ");
    })
    .join("\n  ");
  const haut = y0 + donnees.length * rh;
  const pied =
    t(64, haut + 24, 19, 400, "#cbd5e1", `Coût par jour au tarif Base de ${String(PRIX).replace(".", ",")} € le kWh (Tarif Bleu EDF, août 2026).`) +
    "\n  " +
    t(64, haut + 48, 17, 400, "#94a3b8", "Puissances et durées par défaut du calculateur : modifiez-les pour votre cas.");
  const alt = `Coût par jour de sept appareils au tarif de ${String(PRIX).replace(".", ",")} euro le kWh, avec les valeurs par défaut du calculateur : ` +
    donnees.map((d) => `${d.nom.toLowerCase()} (${d.w} W, ${duree(d.h)}) ${fr(d.k * PRIX)} euro`).join(", ");
  return {
    nom: "cout-par-jour-appareils-courants-electricite",
    route: "calcul-consommation-electrique",
    alt,
    svg: cadre({
      accent: "#fbbf24",
      kicker: "CONSOMMATION ÉLECTRIQUE · COÛT PAR JOUR",
      titre: "Ce que coûtent vos appareils",
      note: "",
      corps: `${lignes}\n  ${pied}`,
    }),
  };
}
