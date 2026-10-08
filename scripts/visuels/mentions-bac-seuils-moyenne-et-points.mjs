// Seuils du baccalaureat general, de la moyenne a obtenir et du total de points correspondant.
// Source : code de l'education, art. D. 334-8 (admis des 10 ; entre 8 et 10 : second groupe d'epreuves ;
// moins de 8 : ajourne) et art. D. 334-11 (mentions : 12, 14, 16 ; 18 pour les felicitations du jury).
// Total de points = moyenne x 100 coefficients : 100 est le total pour un eleve sans option
// (education.gouv.fr, « Comment calculer votre note au baccalaureat »).
export default function ({ t, cadre, esc, W, H }) {
  const COEFS = 100;
  const paliers = [
    { min: 0, max: 8, nom: "Ajourné", couleur: "#f87171" },
    { min: 8, max: 10, nom: "Second groupe (rattrapage)", couleur: "#fb923c" },
    { min: 10, max: 12, nom: "Admis, sans mention", couleur: "#94a3b8" },
    { min: 12, max: 14, nom: "Mention assez bien", couleur: "#38bdf8" },
    { min: 14, max: 16, nom: "Mention bien", couleur: "#818cf8" },
    { min: 16, max: 18, nom: "Mention très bien", couleur: "#c084fc" },
    { min: 18, max: 20, nom: "Très bien + félicitations", couleur: "#fbbf24" },
  ];
  const milliers = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const xBarre = 760;
  const echelle = 12; // pixels par point de moyenne : 20 points = 240 px
  const y0 = 228;
  const rh = 46;
  const entete =
    t(80, 180, 17, 700, "#94a3b8", "RÉSULTAT", 'letter-spacing="2"') +
    t(500, 180, 17, 700, "#94a3b8", "MOYENNE SUR 20", 'letter-spacing="2"') +
    t(xBarre, 180, 17, 700, "#94a3b8", "ÉCHELLE 0 À 20", 'letter-spacing="2"') +
    t(1136, 180, 17, 700, "#94a3b8", "TOTAL DE POINTS", 'text-anchor="end" letter-spacing="2"');
  const corps = paliers
    .map((p, i) => {
      const y = y0 + i * rh;
      const plage = i === 0 ? "moins de 8" : i === paliers.length - 1 ? "18 et plus" : `${p.min} à moins de ${p.max}`;
      const pts = i === 0 ? `moins de ${milliers(p.max * COEFS)}` : `dès ${milliers(p.min * COEFS)}`;
      return `<rect x="64" y="${y - 30}" width="1072" height="${rh - 6}" rx="10" fill="${p.couleur}" fill-opacity="0.14"/>
  <rect x="${xBarre}" y="${y - 20}" width="${(p.max - p.min) * echelle - 2}" height="22" rx="4" fill="${p.couleur}" transform="translate(${p.min * echelle} 0)"/>
  ${t(80, y - 2, 22, 700, p.couleur, p.nom)}
  ${t(500, y - 2, 21, 500, "#e2e8f0", plage)}
  ${t(1136, y - 2, 22, 800, "#ffffff", pts, 'text-anchor="end"')}`;
    })
    .join("\n  ");
  const alt = `Seuils du baccalauréat général : ajourné sous 8 sur 20, second groupe d'épreuves de 8 à moins de 10, admis sans mention de 10 à moins de 12 (dès ${10 * COEFS} points), assez bien dès 12 (${12 * COEFS} points), bien dès 14 (${14 * COEFS}), très bien dès 16 (${16 * COEFS}), très bien avec félicitations du jury dès 18 (${18 * COEFS} points sur ${20 * COEFS}), pour un total de ${COEFS} coefficients`;
  return {
    nom: "mentions-bac-seuils-moyenne-et-points",
    route: "calcul-moyenne",
    alt,
    svg: cadre({
      accent: "#a78bfa",
      kicker: "BAC GÉNÉRAL · SEUILS DE LA MOYENNE ET TOTAL DE POINTS",
      titre: "À partir de quelle moyenne ?",
      note: "Code de l'éducation, D. 334-8 et D. 334-11",
      corps: `${entete}\n  ${corps}`,
    }),
  };
}
