// Du metabolisme de base au besoin du jour, puis aux apports avec deficit.
// Formule du calculateur /calcul-calories : Mifflin-St Jeor (Mifflin et al., Am J Clin Nutr 1990 ;51(2):241-7)
//   homme : 10 x poids + 6,25 x taille - 5 x age + 5 ; femme : ... - 161
// Besoin du jour = metabolisme de base x 1,375 (niveau « legerement actif » du calculateur).
// Deficits de 250 et 500 kcal/jour : les deux objectifs « perte lente » et « perte rapide » du calculateur.
export default function ({ t, cadre, euros, W, H }) {
  const mifflin = (sexe, p, tl, a) => 10 * p + 6.25 * tl - 5 * a + (sexe === "h" ? 5 : -161);
  const COEF = 1.375;
  const profils = [
    { titre: "Femme, 35 ans, 65 kg, 165 cm", sexe: "f", p: 65, tl: 165, a: 35, couleur: "#f472b6" },
    { titre: "Homme, 35 ans, 80 kg, 180 cm", sexe: "h", p: 80, tl: 180, a: 35, couleur: "#38bdf8" },
  ];
  const calc = profils.map((x) => {
    const mb = mifflin(x.sexe, x.p, x.tl, x.a);
    const besoin = mb * COEF;
    return { ...x, mb, besoin, lignes: [
      ["Métabolisme de base", mb, 0.55],
      ["Besoin du jour (× 1,375)", besoin, 1],
      ["Avec un déficit de 250", besoin - 250, 0.7],
      ["Avec un déficit de 500", besoin - 500, 0.45],
    ] };
  });
  const max = Math.max(...calc.map((c) => c.besoin));
  const largeurPanneau = 504;
  const xs = [64, 632];
  const barMax = 330;
  const corps = calc.map((c, i) => {
    const x = xs[i];
    let s = t(x, 178, 24, 800, c.couleur, c.titre);
    c.lignes.forEach(([nom, val, op], r) => {
      const y = 204 + r * 78;
      const w = Math.round((val / max) * barMax);
      s += "\n  " + t(x, y + 20, 19, 600, "#cbd5e1", nom);
      s += `\n  <rect x="${x}" y="${y + 30}" width="${largeurPanneau}" height="30" rx="8" fill="#ffffff" fill-opacity="0.06"/>`;
      s += `\n  <rect x="${x}" y="${y + 30}" width="${w}" height="30" rx="8" fill="${c.couleur}" fill-opacity="${op}"/>`;
      s += "\n  " + t(x + w + 12, y + 54, 26, 800, "#ffffff", `${euros(val)} kcal`);
    });
    return s;
  }).join("\n  ");
  const pied = t(64, 536, 17, 400, "#94a3b8", "Calcul du calculateur du site : formule de Mifflin-St Jeor (1990) × coefficient d'activité 1,375, valeurs arrondies.");
  const f = calc[0], h = calc[1];
  const alt = `Du métabolisme de base au besoin du jour pour une femme de 35 ans, 65 kg, 165 cm : ${euros(f.mb)} kcal de base, ${euros(f.besoin)} kcal par jour avec un coefficient de 1,375, ${euros(f.besoin - 250)} avec un déficit de 250 et ${euros(f.besoin - 500)} avec un déficit de 500. Pour un homme de 35 ans, 80 kg, 180 cm : ${euros(h.mb)}, ${euros(h.besoin)}, ${euros(h.besoin - 250)} et ${euros(h.besoin - 500)} kcal.`;
  return {
    nom: "calories-par-jour-du-metabolisme-au-besoin",
    route: "combien-de-calories-par-jour-pour-maigrir",
    alt,
    svg: cadre({
      accent: "#34d399",
      kicker: "CALORIES PAR JOUR · DU MÉTABOLISME DE BASE AU DÉFICIT",
      titre: "De combien de calories ai-je besoin ?",
      note: "",
      corps: `${corps}\n  ${pied}`,
    }),
  };
}
