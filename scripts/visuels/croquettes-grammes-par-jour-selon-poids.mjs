// Besoin d'energie et croquettes par jour d'un chien adulte, selon son poids.
// Source : Pet Nutrition Alliance (petnutritionalliance.org/wp-content/uploads/2023/03/MER.RER_.PNA_.pdf) :
// RER = 70 x poids(kg)^0,75 ; chien adulte castre = 1,6 x RER (identique au facteur "normal" du
// calculateur /calcul-calories-chien-chat). Aliment d'exemple : 380 kcal pour 100 g (hypothese).
export default function ({ t, cadre, W, H }) {
  const DENSITE = 380;
  const FACTEUR = 1.6;
  const poids = [5, 10, 20, 30];
  const sep = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const couleurs = ["#fbbf24", "#fb923c", "#f87171", "#f472b6"];
  const donnees = poids.map((p) => {
    const kcal = 70 * Math.pow(p, 0.75) * FACTEUR;
    return { p, kcal, g: (kcal / DENSITE) * 100 };
  });
  const gmax = Math.max(...donnees.map((d) => d.g));
  const x0 = 250;
  const largeurMax = 520;
  const y0 = 160;
  const rh = 76;
  const lignes = donnees
    .map((d, i) => {
      const y = y0 + i * rh;
      const lw = Math.max(8, (d.g / gmax) * largeurMax);
      return [
        t(64, y + 42, 34, 800, couleurs[i], `${d.p} kg`),
        `<rect x="${x0}" y="${y + 10}" width="${lw.toFixed(1)}" height="42" rx="10" fill="${couleurs[i]}"/>`,
        t(x0 + lw + 16, y + 43, 32, 800, "#ffffff", `${sep(d.g)} g`),
        t(1136, y + 42, 22, 400, "#94a3b8", `${sep(d.kcal)} kcal par jour`, 'text-anchor="end"'),
      ].join("\n  ");
    })
    .join("\n  ");
  const haut = y0 + poids.length * rh;
  const pied =
    t(64, haut + 22, 20, 400, "#cbd5e1", `Chien adulte, activité normale, aliment à ${DENSITE} kcal pour 100 g (valeur d'exemple).`) +
    "\n  " +
    t(64, haut + 48, 18, 400, "#94a3b8", "Estimation : l'écart peut atteindre 50 %. Ajustez selon la silhouette et le sac.");
  const alt = `Besoin d'énergie et quantité de croquettes par jour pour un chien adulte d'activité normale, avec un aliment à ${DENSITE} kilocalories pour 100 grammes : ${donnees
    .map((d) => `${d.p} kg demandent ${sep(d.kcal)} kcal soit ${sep(d.g)} g`)
    .join(" ; ")}`;
  return {
    nom: "croquettes-grammes-par-jour-selon-poids",
    route: "combien-de-croquettes-par-jour",
    alt,
    svg: cadre({
      accent: "#fbbf24",
      kicker: "CHIEN ADULTE · CROQUETTES PAR JOUR",
      titre: "Combien de croquettes par jour ?",
      note: "",
      corps: `${lignes}\n  ${pied}`,
    }),
  };
}
