// Age humain equivalent d'un chien, par age et par taille.
// Lignes « Petit » a « Geant » : methode du calculateur /calcul-age-chien-humain
// (15 ans la 1re annee, +9 la 2e, puis +4 / +5 / +6 / +7 par annee selon la taille).
// Ligne « Labrador (etude) » : formule de Wang et al., Cell Systems 2020,
// age humain = 16 x ln(age chien) + 31 (etablie sur 104 chiens, surtout des labradors).
// Ligne « x 7 » : l'ancienne regle, pour comparer.
export default function ({ t, cadre, esc, W, H }) {
  const ajout = { petit: 4, moyen: 5, grand: 6, geant: 7 };
  const avma = (a, taille) => {
    let h;
    if (a <= 1) h = 15 * a;
    else if (a <= 2) h = 15 + 9 * (a - 1);
    else h = 24 + ajout[taille] * (a - 2);
    return Math.round(h);
  };
  const wang = (a) => Math.round(16 * Math.log(a) + 31);
  const ages = [1, 2, 3, 5, 7, 10, 12];
  const lignes = [
    { label: "Multiplier par 7", sous: "idée reçue", couleur: "#94a3b8", f: (a) => a * 7, gris: true },
    { label: "Petit chien", sous: "moins de 10 kg", couleur: "#4ade80", f: (a) => avma(a, "petit") },
    { label: "Chien moyen", sous: "10 à 25 kg", couleur: "#38bdf8", f: (a) => avma(a, "moyen") },
    { label: "Grand chien", sous: "25 à 45 kg", couleur: "#fbbf24", f: (a) => avma(a, "grand") },
    { label: "Chien géant", sous: "plus de 45 kg", couleur: "#fb7185", f: (a) => avma(a, "geant") },
    { label: "Labrador", sous: "formule de l'étude", couleur: "#c084fc", f: (a) => wang(a) },
  ];
  const x0 = 330;
  const cw = (1136 - x0) / ages.length;
  const y0 = 190;
  const rh = 48;
  const entete = ages
    .map((a, i) => t(x0 + i * cw + cw / 2, 172, 22, 700, "#e2e8f0", `${a} an${a > 1 ? "s" : ""}`, 'text-anchor="middle"'))
    .join("\n  ");
  const corps = lignes
    .map((l, r) => {
      const y = y0 + r * rh;
      const fond = `<rect x="64" y="${y}" width="1072" height="${rh - 6}" rx="10" fill="${l.couleur}" fill-opacity="${l.gris ? 0.08 : 0.14}"/>`;
      const nom = t(80, y + 22, 22, 700, l.couleur, l.label) + t(80, y + 38, 15, 400, "#94a3b8", l.sous);
      const cases = ages
        .map((a, i) => t(x0 + i * cw + cw / 2, y + 31, 28, l.gris ? 600 : 800, l.gris ? "#cbd5e1" : "#ffffff", String(l.f(a)), 'text-anchor="middle"'))
        .join("");
      return `${fond}\n  ${nom}\n  ${cases}`;
    })
    .join("\n  ");
  const haut = y0 + lignes.length * rh;
  const pied = t(64, haut + 20, 20, 400, "#cbd5e1", "Âge humain équivalent, en années. Ex. : chien moyen de 5 ans → 39 ans, pas 35.")
    + "\n  " + t(64, haut + 46, 17, 400, "#94a3b8", "Lignes par taille : méthode du calculateur. Labrador : Wang et al., Cell Systems, 2020 (16 × ln(âge) + 31).");
  const alt = `Tableau de l'âge humain équivalent d'un chien selon son âge et sa taille : à 5 ans, ${avma(5, "petit")} ans pour un petit chien, ${avma(5, "moyen")} pour un chien moyen, ${avma(5, "grand")} pour un grand chien, ${avma(5, "geant")} pour un chien géant, contre 35 avec la règle du multiplier par 7`;
  return {
    nom: "age-chien-age-humain-par-taille",
    route: "quel-age-a-mon-chien-en-age-humain",
    alt,
    svg: cadre({
      accent: "#fbbf24",
      kicker: "ÂGE DU CHIEN · ÂGE HUMAIN ÉQUIVALENT, PAR TAILLE",
      titre: "Quel âge a mon chien en âge humain ?",
      note: "",
      corps: `${entete}\n  ${corps}\n  ${pied}`,
    }),
  };
}
