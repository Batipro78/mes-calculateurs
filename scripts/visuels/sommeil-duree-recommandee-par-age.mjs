// Durees de sommeil recommandees par age (sur 24 h, siestes comprises pour les petits).
// Source : National Sleep Foundation, recommandations 2015 (Hirshkowitz et al., Sleep Health 1(4):233-243),
// reconfirmees par la NSF le 10 juin 2026. Ce sont les memes tranches que le calculateur /calcul-besoin-sommeil
// (fonction getHeuresParAge). Les barres sont tracees a partir de min et max ; le milieu est calcule.
export default function ({ t, cadre, esc, W, H }) {
  const tranches = [
    { label: "Nouveau-nés", sous: "0 à 3 mois", min: 14, max: 17, couleur: "#f472b6" },
    { label: "Nourrissons", sous: "4 à 11 mois", min: 12, max: 15, couleur: "#fb7185" },
    { label: "Tout-petits", sous: "1 à 2 ans", min: 11, max: 14, couleur: "#fb923c" },
    { label: "Préscolaires", sous: "3 à 5 ans", min: 10, max: 13, couleur: "#fbbf24" },
    { label: "Enfants", sous: "6 à 13 ans", min: 9, max: 11, couleur: "#a3e635" },
    { label: "Adolescents", sous: "14 à 17 ans", min: 8, max: 10, couleur: "#4ade80" },
    { label: "Jeunes adultes", sous: "18 à 25 ans", min: 7, max: 9, couleur: "#38bdf8" },
    { label: "Adultes", sous: "26 à 64 ans", min: 7, max: 9, couleur: "#818cf8" },
    { label: "Seniors", sous: "65 ans et plus", min: 7, max: 8, couleur: "#c084fc" },
  ];
  const x0 = 340; // position de 4 h sur l axe (graduations de 4 h a 18 h)
  const echelle = 46; // px par heure
  const y0 = 158;
  const rh = 38;
  const lignes = tranches
    .map((r, i) => {
      const y = y0 + i * rh;
      const xa = x0 + (r.min - 4) * echelle;
      const largeur = (r.max - r.min) * echelle;
      const texte = `${r.min} à ${r.max} h`;
      return [
        t(64, y + 21, 22, 700, "#ffffff", r.label),
        t(236, y + 21, 18, 400, "#94a3b8", r.sous),
        `<rect x="${xa}" y="${y + 2}" width="${largeur}" height="30" rx="8" fill="${r.couleur}"/>`,
        t(xa + largeur + 14, y + 26, 24, 800, r.couleur, texte),
      ].join("\n  ");
    })
    .join("\n  ");
  // Axe : graduations tous les 2 h
  const graduations = [4, 6, 8, 10, 12, 14, 16, 18]
    .map((h) => {
      const x = x0 + (h - 4) * echelle;
      return `<line x1="${x}" y1="${y0 - 6}" x2="${x}" y2="${y0 + tranches.length * rh - 4}" stroke="#334155" stroke-width="1" stroke-dasharray="3 5"/>`;
    })
    .join("\n  ");
  const axeBas = y0 + tranches.length * rh + 6;
  const reperes = [4, 8, 12, 16]
    .map((h) => t(x0 + (h - 4) * echelle, axeBas + 14, 18, 400, "#94a3b8", `${h} h`, 'text-anchor="middle"'))
    .join("");
  const pied = t(64, axeBas + 14, 18, 400, "#94a3b8", "Heures par 24 h");
  const alt = `Durées de sommeil recommandées par âge : ${tranches
    .map((r) => `${r.label.toLowerCase()} (${r.sous}) ${r.min} à ${r.max} heures`)
    .join(", ")}`;
  return {
    nom: "sommeil-duree-recommandee-par-age",
    route: "combien-d-heures-de-sommeil-par-nuit",
    alt,
    svg: cadre({
      accent: "#818cf8",
      kicker: "SOMMEIL · DURÉES RECOMMANDÉES PAR ÂGE",
      titre: "Combien d'heures de sommeil ?",
      note: "",
      corps: `${graduations}\n  ${lignes}\n  ${reperes}\n  ${pied}`,
    }),
  };
}
