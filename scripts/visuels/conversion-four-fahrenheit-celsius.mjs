// Visuel du convertisseur de temperature : les temperatures de four des recettes
// anglo-saxonnes, de 250 a 500 °F, converties en °C par la formule exacte
// °C = (°F - 32) x 5/9 (la meme que le convertisseur), arrondies au degre.
export default function ({ t, cadre }) {
  const fahrenheit = [250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500];
  const enC = (f) => ((f - 32) * 5) / 9;
  const colonnes = 4;
  const larg = 250;
  const haut = 92;
  const ecartX = (1072 - colonnes * larg) / (colonnes - 1);
  const cartes = fahrenheit
    .map((f, i) => {
      const x = 64 + (i % colonnes) * (larg + ecartX);
      const y = 214 + Math.floor(i / colonnes) * (haut + 14);
      const fort = f === 300;
      return [
        `<rect x="${x.toFixed(1)}" y="${y}" width="${larg}" height="${haut}" rx="14" fill="${fort ? "#fb923c" : "#1e293b"}" stroke="${fort ? "#fdba74" : "#334155"}" stroke-width="2"/>`,
        t((x + 22).toFixed(1), y + 58, 28, 800, fort ? "#1c1917" : "#fdba74", `${f} °F`),
        t((x + larg - 22).toFixed(1), y + 58, 28, 800, fort ? "#1c1917" : "#ffffff", `${Math.round(enC(f))} °C`, 'text-anchor="end"'),
        t((x + larg / 2).toFixed(1), y + 57, 24, 600, fort ? "#1c1917" : "#64748b", "→", 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");

  // Derniere case de la grille : la formule.
  const xF = 64 + 3 * (larg + ecartX);
  const yF = 214 + 2 * (haut + 14);
  const formule = [
    `<rect x="${xF.toFixed(1)}" y="${yF}" width="${larg}" height="${haut}" rx="14" fill="none" stroke="#fb923c" stroke-width="2" stroke-dasharray="6 6"/>`,
    t((xF + larg / 2).toFixed(1), yF + 40, 21, 700, "#fdba74", "°C = (°F − 32) × 5/9", 'text-anchor="middle"'),
    t((xF + larg / 2).toFixed(1), yF + 70, 18, 400, "#cbd5e1", "arrondi au degré", 'text-anchor="middle"'),
  ].join("\n  ");

  const corps = `
  ${t(64, 182, 27, 600, "#e2e8f0", `Les températures des recettes en anglais, converties en degrés Celsius. 300 °F = ${Math.round(enC(300))} °C.`)}
  ${cartes}
  ${formule}`;

  return {
    nom: "conversion-four-fahrenheit-celsius",
    route: "conversion-temperature",
    alt: `Températures de four converties de Fahrenheit en Celsius : ${fahrenheit.map((f) => `${f} °F = ${Math.round(enC(f))} °C`).join(", ")}. Formule : °C = (°F − 32) × 5/9.`,
    svg: cadre({
      accent: "#fb923c",
      kicker: "CUISINE · TEMPÉRATURES DE FOUR",
      titre: "Four : convertir °F en °C",
      note: "Formule exacte, arrondie au degré",
      corps,
    }),
  };
}
