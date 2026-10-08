// Les trois tests de terrain de la VMA et leur formule, avec le meme coureur en exemple.
// Formules (memes que le calculateur /calcul-vma, fichier vmaCalc.ts) :
//   demi-Cooper 6 min : VMA = distance (m) / 100   (calculerVMADemiCooper : distance x 2 / 200)
//   Cooper 12 min     : VMA = distance (m) / 200   (calculerVMACooper)
//   VAMEVAL           : VMA = vitesse du dernier palier realise (calculerVMAVameval)
// Relation theorique VO2max = 3,5 x VMA (formule de Leger ; estimation, voir l'article).
export default function ({ t, cadre, W, H }) {
  const demi = (d) => (d * 2) / 200;
  const cooper = (d) => d / 200;
  const vameval = (v) => v;
  const fr = (n) => String(n).replace(".", ",");
  const espace = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const vma = 15;
  const cartes = [
    { nom: "Demi-Cooper", sous: "6 minutes, effort maximal", formule: "distance ÷ 100", ex: `${espace(1500)} m en 6 min`, res: demi(1500), couleur: "#34d399" },
    { nom: "Cooper", sous: "12 minutes, effort maximal", formule: "distance ÷ 200", ex: `${espace(3000)} m en 12 min`, res: cooper(3000), couleur: "#38bdf8" },
    { nom: "VAMEVAL", sous: "paliers de 1 min, +0,5 km/h", formule: "vitesse du dernier palier", ex: "dernier palier : 15 km/h", res: vameval(15), couleur: "#fbbf24" },
  ];
  const gap = 24;
  const cw = (1072 - 2 * gap) / 3;
  const y0 = 160;
  const ch = 300;
  const corps = cartes
    .map((c, i) => {
      const x = 64 + i * (cw + gap);
      const cx = x + cw / 2;
      return [
        `<rect x="${x}" y="${y0}" width="${cw}" height="${ch}" rx="16" fill="${c.couleur}" fill-opacity="0.13" stroke="${c.couleur}" stroke-opacity="0.5" stroke-width="2"/>`,
        t(cx, y0 + 46, 32, 800, c.couleur, c.nom, 'text-anchor="middle"'),
        t(cx, y0 + 76, 18, 400, "#cbd5e1", c.sous, 'text-anchor="middle"'),
        t(cx, y0 + 134, c.formule.length > 16 ? 22 : 30, 800, "#ffffff", c.formule, 'text-anchor="middle"'),
        t(cx, y0 + 190, 20, 400, "#cbd5e1", "Exemple", 'text-anchor="middle"'),
        t(cx, y0 + 220, 22, 600, "#ffffff", c.ex, 'text-anchor="middle"'),
        t(cx, y0 + 270, 40, 800, c.couleur, `${fr(c.res)} km/h`, 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");
  const vo2 = vma * 3.5;
  const pied =
    t(64, 500, 22, 600, "#e2e8f0", `Même coureur, même VMA : ${vma} km/h. Estimation de sa VO2max : ${vma} × 3,5 = ${fr(vo2)} ml/kg/min.`) +
    "\n  " +
    t(64, 528, 17, 400, "#94a3b8", "Cooper et demi-Cooper donnent une estimation ; la relation × 3,5 est théorique (formule de Léger).");
  const alt = `Les trois tests de VMA : demi-Cooper sur 6 minutes (VMA = distance divisée par 100, 1 500 m donnent ${fr(demi(1500))} km/h), Cooper sur 12 minutes (distance divisée par 200, 3 000 m donnent ${fr(cooper(3000))} km/h) et VAMEVAL (vitesse du dernier palier, ici ${vameval(15)} km/h)`;
  return {
    nom: "vma-trois-tests-formules",
    route: "calcul-vma",
    alt,
    svg: cadre({
      accent: "#34d399",
      kicker: "VMA · TROIS TESTS DE TERRAIN",
      titre: "Comment calculer sa VMA",
      note: "",
      corps,
    }).replace("</svg>", `  ${pied}\n</svg>`),
  };
}
