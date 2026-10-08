// Deux calculs de moyenne, poses comme sur une copie.
// Gauche : moyenne avec coefficients = somme(note x coef) / somme(coef).
//   Meme exemple que le calculateur /calcul-moyenne (Maths 14 coef 5, Francais 12 coef 4, Sport 16 coef 2).
// Droite : le piege de la « moyenne de moyennes ». Exemple pose par le site :
//   trimestre 1 = 2 notes (8 et 12), trimestre 2 = 6 notes de 14.
//   Moyenne des deux moyennes = (10 + 14) / 2 ; moyenne de toutes les notes = somme des notes / nombre de notes.
export default function ({ t, cadre, esc, W, H }) {
  const virgule = (n, d = 2) => n.toFixed(d).replace(".", ",");
  const matieres = [
    { nom: "Maths", note: 14, coef: 5 },
    { nom: "Français", note: 12, coef: 4 },
    { nom: "Sport", note: 16, coef: 2 },
  ];
  const points = matieres.reduce((s, m) => s + m.note * m.coef, 0);
  const coefs = matieres.reduce((s, m) => s + m.coef, 0);
  const moyPond = points / coefs;
  const moySimple = matieres.reduce((s, m) => s + m.note, 0) / matieres.length;

  const t1 = [8, 12];
  const t2 = [14, 14, 14, 14, 14, 14];
  const moy = (a) => a.reduce((s, x) => s + x, 0) / a.length;
  const m1 = moy(t1);
  const m2 = moy(t2);
  const moyDesMoyennes = (m1 + m2) / 2;
  const toutes = [...t1, ...t2];
  const somme = toutes.reduce((s, x) => s + x, 0);
  const moyToutes = somme / toutes.length;

  const panneau = (x, titre, couleur) =>
    `<rect x="${x}" y="150" width="520" height="384" rx="22" fill="#ffffff" fill-opacity="0.06" stroke="${couleur}" stroke-opacity="0.55" stroke-width="2"/>
  ${t(x + 28, 190, 20, 700, couleur, titre, 'letter-spacing="2"')}`;

  const lignes = matieres
    .map((m, i) => {
      const y = 238 + i * 44;
      return (
        t(92, y, 25, 600, "#e2e8f0", m.nom) +
        t(380, y, 25, 600, "#cbd5e1", `${m.note} × ${m.coef}`, 'text-anchor="end"') +
        t(548, y, 25, 800, "#ffffff", String(m.note * m.coef), 'text-anchor="end"')
      );
    })
    .join("\n  ");

  const gauche = `${panneau(64, "AVEC COEFFICIENTS", "#a78bfa")}
  ${lignes}
  <line x1="92" y1="362" x2="548" y2="362" stroke="#94a3b8" stroke-opacity="0.5" stroke-width="2"/>
  ${t(92, 396, 22, 600, "#cbd5e1", `Total : ${coefs} coefficients, ${points} points`)}
  ${t(92, 456, 44, 800, "#a78bfa", `${points} ÷ ${coefs} = ${virgule(moyPond)}`)}
  ${t(92, 504, 20, 400, "#94a3b8", `Sans coefficients, la moyenne simple serait ${virgule(moySimple, 0)}.`)}`;

  const droite = `${panneau(616, "LE PIÈGE DE LA MOYENNE DE MOYENNES", "#fbbf24")}
  ${t(644, 238, 21, 600, "#e2e8f0", `Trimestre 1 : 2 notes (8 et 12), moyenne ${virgule(m1, 0)}`)}
  ${t(644, 276, 21, 600, "#e2e8f0", `Trimestre 2 : 6 notes de 14, moyenne ${virgule(m2, 0)}`)}
  <line x1="644" y1="306" x2="1108" y2="306" stroke="#94a3b8" stroke-opacity="0.5" stroke-width="2"/>
  ${t(644, 348, 20, 600, "#fb923c", "Moyenne des deux moyennes")}
  ${t(644, 392, 30, 800, "#fb923c", `(${virgule(m1, 0)} + ${virgule(m2, 0)}) ÷ 2 = ${virgule(moyDesMoyennes, 0)}`)}
  ${t(644, 436, 20, 600, "#4ade80", "Moyenne de toutes les notes")}
  ${t(644, 480, 30, 800, "#4ade80", `${somme} ÷ ${toutes.length} = ${virgule(moyToutes, 0)}`)}
  ${t(644, 516, 17, 400, "#94a3b8", "Le trimestre 2 compte 6 notes : 12 ou 13 selon la méthode.")}`;

  const alt = `Deux calculs de moyenne. Avec coefficients : Maths 14 coefficient 5 donne ${14 * 5}, Français 12 coefficient 4 donne ${12 * 4}, Sport 16 coefficient 2 donne ${16 * 2} ; ${points} divisé par ${coefs} donne ${virgule(moyPond)}. Piège de la moyenne de moyennes : moyennes de ${virgule(m1, 0)} et ${virgule(m2, 0)} donnent ${virgule(moyDesMoyennes, 0)} pour la moyenne des deux moyennes, alors que la moyenne de toutes les notes est ${virgule(moyToutes, 0)}`;
  return {
    nom: "moyenne-coefficients-et-moyenne-de-moyennes",
    route: "comment-calculer-sa-moyenne",
    alt,
    svg: cadre({
      accent: "#a78bfa",
      kicker: "CALCULER SA MOYENNE · DEUX EXEMPLES CHIFFRÉS",
      titre: "Coefficients et moyenne de moyennes",
      note: "",
      corps: `${gauche}\n  ${droite}`,
    }),
  };
}
