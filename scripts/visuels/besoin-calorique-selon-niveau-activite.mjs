// Effet du niveau d'activite sur le besoin calorique journalier.
// Formule du calculateur /calcul-calories : Mifflin-St Jeor (Mifflin et al., Am J Clin Nutr 1990 ;51(2):241-7),
// puis besoin = metabolisme de base x coefficient d'activite du calculateur (1,2 / 1,375 / 1,55 / 1,725 / 1,9).
// Exemples : femme 35 ans 65 kg 165 cm ; homme 35 ans 80 kg 180 cm.
export default function ({ t, cadre, euros, W, H }) {
  const mifflin = (sexe, p, tl, a) => 10 * p + 6.25 * tl - 5 * a + (sexe === "h" ? 5 : -161);
  const mbF = mifflin("f", 65, 165, 35);
  const mbH = mifflin("h", 80, 180, 35);
  const niveaux = [
    ["Sédentaire", 1.2],
    ["Légèrement actif", 1.375],
    ["Modérément actif", 1.55],
    ["Très actif", 1.725],
    ["Extrêmement actif", 1.9],
  ];
  const max = mbH * 1.9;
  const x0 = 330;
  const barMax = 560;
  const y0 = 184;
  const rh = 64;
  const rangs = niveaux.map(([nom, c], i) => {
    const y = y0 + i * rh;
    const wf = Math.round(((mbF * c) / max) * barMax);
    const wh = Math.round(((mbH * c) / max) * barMax);
    return `${t(64, y + 24, 23, 700, "#ffffff", nom)}
  ${t(64, y + 48, 18, 400, "#94a3b8", `coefficient ${String(c).replace(".", ",")}`)}
  <rect x="${x0}" y="${y + 2}" width="${wf}" height="26" rx="7" fill="#f472b6"/>
  ${t(x0 + wf + 10, y + 23, 21, 800, "#ffffff", `${euros(mbF * c)} kcal`)}
  <rect x="${x0}" y="${y + 32}" width="${wh}" height="26" rx="7" fill="#38bdf8"/>
  ${t(x0 + wh + 10, y + 53, 21, 800, "#ffffff", `${euros(mbH * c)} kcal`)}`;
  }).join("\n  ");
  const legende = `<rect x="760" y="142" width="20" height="20" rx="5" fill="#f472b6"/>
  ${t(788, 159, 19, 600, "#e2e8f0", "Femme 65 kg")}
  <rect x="940" y="142" width="20" height="20" rx="5" fill="#38bdf8"/>
  ${t(968, 159, 19, 600, "#e2e8f0", "Homme 80 kg")}`;
  const pied = t(64, 532, 17, 400, "#94a3b8", `35 ans, 165 cm (femme) et 180 cm (homme). Base : ${euros(mbF)} kcal (femme), ${euros(mbH)} kcal (homme), formule de Mifflin-St Jeor.`);
  const alt = `Besoin calorique par jour selon le niveau d'activité du calculateur, pour une femme de 35 ans, 65 kg, 165 cm et un homme de 35 ans, 80 kg, 180 cm : sédentaire ${euros(mbF * 1.2)} et ${euros(mbH * 1.2)} kcal, légèrement actif ${euros(mbF * 1.375)} et ${euros(mbH * 1.375)}, modérément actif ${euros(mbF * 1.55)} et ${euros(mbH * 1.55)}, très actif ${euros(mbF * 1.725)} et ${euros(mbH * 1.725)}, extrêmement actif ${euros(mbF * 1.9)} et ${euros(mbH * 1.9)}.`;
  return {
    nom: "besoin-calorique-selon-niveau-activite",
    route: "calcul-calories",
    alt,
    svg: cadre({
      accent: "#34d399",
      kicker: "BESOIN CALORIQUE · EFFET DU NIVEAU D'ACTIVITÉ",
      titre: "Le coefficient d'activité change tout",
      note: "",
      corps: `${legende}\n  ${rangs}\n  ${pied}`,
    }),
  };
}
