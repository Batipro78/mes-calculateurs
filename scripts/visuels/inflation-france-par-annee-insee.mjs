// Visuel du calculateur d'inflation : l'inflation annuelle moyenne en France
// depuis 2000, lue dans le meme fichier que le calculateur (donnees Insee).
import { INFLATION_FR, DERNIERE_ANNEE } from "../../app/calculateur-inflation/inflationData.ts";

export default function ({ t, cadre }) {
  const annees = Object.keys(INFLATION_FR).map(Number).sort((a, b) => a - b);
  const premiere = annees[0];
  const max = Math.max(...annees.map((a) => INFLATION_FR[a]));
  const pct = (n) => String(n.toFixed(1)).replace(".", ",");

  // Ce que vaut 100 EUR de la premiere annee en euros de la derniere : meme
  // calcul que le calculateur (on applique les annees qui suivent l'annee de depart).
  let mult = 1;
  for (const a of annees) if (a > premiere) mult *= 1 + INFLATION_FR[a] / 100;
  const cent = Math.round(100 * mult);

  const x0 = 64;
  const largeurZone = 1072;
  const pas = largeurZone / annees.length;
  const barre = Math.round(pas * 0.68);
  const base = 478;
  const hautMax = 236;

  const barres = annees
    .map((a, i) => {
      const v = INFLATION_FR[a];
      const h = Math.max(3, (v / max) * hautMax);
      const x = x0 + i * pas + (pas - barre) / 2;
      const fort = v >= 4;
      const couleur = fort ? "#f87171" : "#fb923c";
      const morceaux = [
        `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${barre}" height="${h.toFixed(1)}" rx="4" fill="${couleur}" opacity="${fort ? 1 : 0.8}"/>`,
        t((x + barre / 2).toFixed(1), (base - h - 9).toFixed(1), fort ? 20 : 15, fort ? 800 : 600, fort ? "#fecaca" : "#cbd5e1", pct(v), 'text-anchor="middle"'),
      ];
      if (a % 5 === 0 || a === DERNIERE_ANNEE) {
        morceaux.push(t((x + barre / 2).toFixed(1), base + 34, 20, 600, "#94a3b8", String(a), 'text-anchor="middle"'));
      }
      return morceaux.join("\n  ");
    })
    .join("\n  ");

  const corps = `
  ${t(64, 182, 27, 600, "#e2e8f0", `En % par an, en moyenne sur l'année. 100 € de ${premiere} valent ${cent} € de ${DERNIERE_ANNEE}.`)}
  <line x1="${x0}" y1="${base}" x2="${x0 + largeurZone}" y2="${base}" stroke="#475569" stroke-width="2"/>
  ${barres}`;

  return {
    nom: "inflation-france-par-annee-insee",
    route: "calculateur-inflation",
    alt: `Inflation annuelle moyenne en France de ${premiere} à ${DERNIERE_ANNEE} selon l'Insee : entre 0 et 2,8 % par an jusqu'en 2021, puis 5,2 % en 2022, 4,9 % en 2023, 2,0 % en 2024 et ${pct(INFLATION_FR[DERNIERE_ANNEE])} % en ${DERNIERE_ANNEE}. 100 € de ${premiere} valent ${cent} € de ${DERNIERE_ANNEE}.`,
    svg: cadre({
      accent: "#fb923c",
      kicker: "INSEE · INDICE DES PRIX À LA CONSOMMATION",
      titre: `L'inflation en France depuis ${premiere}`,
      note: "Source : Insee",
      corps,
    }),
  };
}
