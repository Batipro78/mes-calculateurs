// Cout du carburant pour 500 km, selon le carburant.
// Prix a la pompe : releve du ministere de la Transition ecologique du 9 octobre 2026 (fichier
// « Prix HTT et TTC depuis janvier 2020 », feuille Carburants routiers) : SP95-E10 2,138 EUR le litre,
// gazole 2,328 EUR (arrondis 2,14 et 2,33). kWh a domicile : tarif Base du Tarif Bleu EDF, 0,2001 EUR TTC.
// Les consommations (7, 6 L/100 km ; 17 kWh/100 km) et le prix de borne rapide (0,50 EUR le kWh) sont des
// exemples, pas des valeurs officielles.
export default function ({ t, cadre, W, H }) {
  const km = 500;
  const lignes = [
    { nom: "Essence", detail: "7 L/100 km à 2,14 € le litre", cout: (km * 7) / 100 * 2.14, couleur: "#f97316" },
    { nom: "Diesel", detail: "6 L/100 km à 2,33 € le litre", cout: (km * 6) / 100 * 2.33, couleur: "#a78bfa" },
    { nom: "Électrique, borne rapide", detail: "17 kWh/100 km à 0,50 € le kWh (exemple)", cout: (km * 17) / 100 * 0.5, couleur: "#38bdf8" },
    { nom: "Électrique, à domicile", detail: "17 kWh/100 km à 0,2001 € le kWh", cout: (km * 17) / 100 * 0.2001, couleur: "#34d399" },
  ];
  const fmt = (n) => n.toFixed(2).replace(".", ",");
  const max = Math.max(...lignes.map((l) => l.cout));
  const x0 = 64;
  const barreMax = 560;
  const y0 = 160;
  const rh = 96;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * rh;
      const w = Math.round((l.cout / max) * barreMax);
      return [
        t(x0, y + 24, 26, 800, l.couleur, l.nom),
        t(x0, y + 48, 18, 400, "#94a3b8", l.detail),
        `<rect x="${x0}" y="${y + 58}" width="${w}" height="22" rx="6" fill="${l.couleur}" fill-opacity="0.9"/>`,
        t(x0 + w + 16, y + 78, 30, 800, "#ffffff", `${fmt(l.cout)} €`),
      ].join("\n  ");
    })
    .join("\n  ");
  const pied = t(64, y0 + lignes.length * rh + 14, 18, 400, "#cbd5e1", "Prix à la pompe du 9 octobre 2026 (ministère de la Transition écologique), carburant seul, sans péages.");
  const alt = `Coût du carburant pour un trajet de 500 kilomètres avec les prix du 9 octobre 2026 : ${lignes
    .map((l) => `${l.nom.toLowerCase()} (${l.detail}) soit ${fmt(l.cout)} euros`)
    .join(", ")}`;
  return {
    nom: "trajet-500-km-cout-carburant-essence-diesel-electrique",
    route: "combien-coute-un-trajet-en-voiture",
    alt,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "TRAJET DE 500 KM · CARBURANT",
      titre: "Combien coûte un trajet en voiture ?",
      note: "",
      corps: `${corps}\n  ${pied}`,
    }),
  };
}
