// Litres de peinture selon la surface a peindre et le nombre de couches.
// Formule : litres = surface x couches / rendement (Castorama, "calculer votre besoin en
// peinture" : le rendement est le nombre de m2 par litre, indique sur le pot, en general
// entre 5 et 20 m2/L). Rendement retenu : 10 m2/L, repere du calculateur /calcul-surface-peinture
// pour une peinture acrylique de mur.
export default function ({ t, cadre, W, H }) {
  const RENDEMENT = 10;
  const surfaces = [10, 20, 50, 100];
  const cols = [
    { titre: "1 couche", c: 1, cx: 560 },
    { titre: "2 couches", c: 2, cx: 800 },
    { titre: "3 couches", c: 3, cx: 1040 },
  ];
  const litres = (n) => String(Math.round(n * 100) / 100).replace(".", ",");
  const entete = cols.map((c) => t(c.cx, 172, 22, 700, "#e2e8f0", c.titre, 'text-anchor="middle"')).join("\n  ");
  const couleurs = ["#e879f9", "#c084fc", "#a78bfa", "#818cf8"];
  const y0 = 190;
  const rh = 76;
  const corps = surfaces
    .map((s, r) => {
      const y = y0 + r * rh;
      const fond = `<rect x="64" y="${y}" width="1072" height="${rh - 8}" rx="12" fill="${couleurs[r]}" fill-opacity="0.14"/>`;
      const nom = t(84, y + 45, 34, 800, couleurs[r], `${s} m²`);
      const cases = cols
        .map((c) => t(c.cx, y + 46, 34, 800, "#ffffff", `${litres((s * c.c) / RENDEMENT)} L`, 'text-anchor="middle"'))
        .join("");
      return `${fond}\n  ${nom}\n  ${cases}`;
    })
    .join("\n  ");
  const haut = y0 + surfaces.length * rh;
  const pied =
    t(64, haut + 22, 20, 400, "#cbd5e1", `Pour ${RENDEMENT} m² par litre. Litres = surface × couches ÷ rendement.`) +
    "\n  " +
    t(64, haut + 48, 18, 400, "#94a3b8", "Le rendement réel est écrit sur le pot (5 à 20 m² par litre). Prévoir 10 % de marge.");
  const alt = `Litres de peinture nécessaires selon la surface et le nombre de couches, avec un rendement de ${RENDEMENT} mètres carrés par litre : 10 m² demandent 1 litre en une couche et 2 en deux ; 20 m² demandent 2 et 4 litres ; 50 m² demandent 5 et 10 litres ; 100 m² demandent 10 et 20 litres`;
  return {
    nom: "peinture-litres-selon-surface-et-couches",
    route: "combien-de-litres-de-peinture",
    alt,
    svg: cadre({
      accent: "#e879f9",
      kicker: "PEINTURE · LITRES NÉCESSAIRES",
      titre: "Combien de litres de peinture ?",
      note: "",
      corps: `${entete}\n  ${corps}\n  ${pied}`,
    }),
  };
}
