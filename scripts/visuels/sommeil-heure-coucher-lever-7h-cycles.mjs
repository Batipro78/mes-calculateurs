// Heure de coucher pour se lever a 7 h, selon le nombre de cycles de 90 minutes.
// Heures de coucher en cycles complets de 90 min (valeur du calculateur), sans endormissement.
// Le calculateur /calcul-besoin-sommeil retire, lui, un nombre d heures (8 h adulte -> 23 h 00) :
// heure de coucher = heure de lever - duree de sommeil, SANS temps d'endormissement.
// Duree de sommeil = cycles x 90 min (cycle de 90 min : valeur du calculateur).
export default function ({ t, cadre, esc, W, H }) {
  const LEVER = 7 * 60; // 7 h 00
  const DUREE_CYCLE = 90;
  const fmt = (min) => {
    const m = ((min % 1440) + 1440) % 1440;
    return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;
  };
  const dureeTxt = (min) => `${Math.floor(min / 60)} h${min % 60 ? " " + String(min % 60).padStart(2, "0") : ""}`;
  const defs = [
    { cycles: 3, couleur: "#94a3b8" },
    { cycles: 4, couleur: "#fbbf24" },
    { cycles: 5, couleur: "#4ade80" },
    { cycles: 6, couleur: "#38bdf8" },
    { cycles: 7, couleur: "#c084fc" },
  ];
  // Echelle : de 19 h 30 (veille) a 7 h 00 = 690 min
  const debutEchelle = LEVER - 690;
  const x0 = 470;
  const px = 640 / 690;
  const y0 = 190;
  const rh = 62;
  const lignes = defs
    .map((d, i) => {
      const sommeil = d.cycles * DUREE_CYCLE;
      const coucher = LEVER - sommeil;
      const xc = x0 + (coucher - debutEchelle) * px;
      const xf = x0 + (LEVER - debutEchelle) * px;
      const y = y0 + i * rh;
      return [
        t(64, y + 22, 26, 800, d.couleur, `${d.cycles} cycles`),
        t(64, y + 44, 18, 400, "#94a3b8", `${dureeTxt(sommeil)} de sommeil`),
        `<rect x="${xc}" y="${y + 6}" width="${xf - xc}" height="36" rx="8" fill="${d.couleur}"/>`,
        t(x0 - 14, y + 34, 30, 800, "#ffffff", fmt(coucher), 'text-anchor="end"'),
      ].join("\n  ");
    })
    .join("\n  ");
  const trait = x0 + (LEVER - debutEchelle) * px;
  const axe = `<line x1="${trait}" y1="${y0 - 14}" x2="${trait}" y2="${y0 + defs.length * rh}" stroke="#e2e8f0" stroke-width="2"/>`
    + t(trait, y0 - 22, 22, 700, "#e2e8f0", "Lever 7 h 00", 'text-anchor="middle"')
    + t(x0 - 14, y0 - 22, 20, 600, "#94a3b8", "Coucher", 'text-anchor="end"');
  const pied = t(64, y0 + defs.length * rh + 24, 19, 400, "#cbd5e1", "Heure de coucher = lever − cycles complets de 90 min, sans temps d'endormissement.");
  const alt = `Heure de coucher pour se lever à 7 h : ${defs
    .map((d) => `${d.cycles} cycles (${dureeTxt(d.cycles * DUREE_CYCLE)} de sommeil) = coucher à ${fmt(LEVER - d.cycles * DUREE_CYCLE)}`)
    .join(", ")}. Calcul : heure de lever moins des cycles complets de 90 minutes, sans temps d'endormissement`;
  return {
    nom: "sommeil-heure-coucher-lever-7h-cycles",
    route: "calcul-besoin-sommeil",
    alt,
    svg: cadre({
      accent: "#a78bfa",
      kicker: "CYCLES DE SOMMEIL · LEVER À 7 H",
      titre: "À quelle heure se coucher ?",
      note: "",
      corps: `${axe}\n  ${lignes}\n  ${pied}`,
    }),
  };
}
