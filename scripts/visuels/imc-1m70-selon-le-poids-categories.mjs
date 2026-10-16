// IMC d'une personne de 1,70 m selon son poids, avec les seuils 18,5 / 25 / 30 (OMS : surpoids >= 25,
// obesite >= 30, insuffisance < 18,5 ; CDC : poids normal de 18,5 a moins de 25).
export default function ({ t, cadre, W, H }) {
  const taille = 1.7;
  const poids = [50, 60, 70, 80, 90];
  const cat = (imc) =>
    imc < 18.5
      ? { nom: "Insuffisance", couleur: "#60a5fa" }
      : imc < 25
        ? { nom: "Poids normal", couleur: "#34d399" }
        : imc < 30
          ? { nom: "Surpoids", couleur: "#fbbf24" }
          : { nom: "Obésité", couleur: "#f87171" };
  const lignes = poids.map((kg) => {
    const imc = kg / (taille * taille);
    return { kg, imc, ...cat(imc) };
  });
  const echMin = 15;
  const echMax = 33;
  const x0 = 64;
  const largeur = 1070;
  const px = (v) => Math.round(x0 + ((v - echMin) / (echMax - echMin)) * largeur);
  const yBarre = 230;
  const hBarre = 70;
  const zones = [
    { a: echMin, b: 18.5, c: "#60a5fa" },
    { a: 18.5, b: 25, c: "#34d399" },
    { a: 25, b: 30, c: "#fbbf24" },
    { a: 30, b: echMax, c: "#f87171" },
  ]
    .map((z) => `<rect x="${px(z.a)}" y="${yBarre}" width="${px(z.b) - px(z.a)}" height="${hBarre}" fill="${z.c}" fill-opacity="0.35"/>`)
    .join("\n  ");
  const seuils = [18.5, 25, 30]
    .map(
      (s) =>
        `<line x1="${px(s)}" y1="${yBarre - 8}" x2="${px(s)}" y2="${yBarre + hBarre + 8}" stroke="#e2e8f0" stroke-width="2"/>\n  ` +
        t(px(s), yBarre - 16, 22, 700, "#e2e8f0", String(s).replace(".", ","), 'text-anchor="middle"'),
    )
    .join("\n  ");
  const points = lignes
    .map((l, i) => {
      const x = px(l.imc);
      const haut = i % 2 === 0;
      return [
        `<circle cx="${x}" cy="${yBarre + hBarre / 2}" r="14" fill="${l.couleur}" stroke="#0f172a" stroke-width="3"/>`,
        t(x, haut ? yBarre + hBarre + 48 : yBarre + hBarre + 108, 26, 800, "#ffffff", `${l.kg} kg`, 'text-anchor="middle"'),
        t(x, haut ? yBarre + hBarre + 74 : yBarre + hBarre + 134, 20, 600, l.couleur, `IMC ${l.imc.toFixed(1).replace(".", ",")}`, 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");
  const pied = t(64, 540, 18, 400, "#cbd5e1", "IMC = poids en kg ÷ taille en m au carré. Seuils de l'OMS et du CDC, calcul pour une taille de 1,70 m.");
  const alt = `IMC d'une personne de 1,70 m selon son poids avec les seuils de 18,5, 25 et 30 : ${lignes
    .map((l) => `${l.kg} kg donnent ${l.imc.toFixed(1).replace(".", ",")} soit ${l.nom.toLowerCase()}`)
    .join(" ; ")}`;
  return {
    nom: "imc-1m70-selon-le-poids-categories",
    route: "comment-calculer-son-imc",
    alt,
    svg: cadre({
      accent: "#f472b6",
      kicker: "IMC · POUR UNE TAILLE DE 1,70 M",
      titre: "Comment calculer son IMC ?",
      note: "",
      corps: `${zones}\n  ${seuils}\n  ${points}\n  ${pied}`,
    }),
  };
}
