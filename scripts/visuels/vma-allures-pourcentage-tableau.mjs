// Allures en pourcentage de VMA, pour quatre VMA (10, 12, 14, 16 km/h).
// Formules (les memes que le calculateur /calcul-vma, fonction calculerAllureSelonPourcentVMA) :
//   vitesse (km/h) = VMA x pourcentage / 100
//   allure (min/km) = 60 / vitesse, affichee en minutes:secondes (secondes arrondies).
// Les pourcentages sont un repere d'entrainement : aucun chiffre n'est tire d'une etude.
export default function ({ t, cadre, W, H }) {
  const vmas = [10, 12, 14, 16];
  const pourcents = [60, 70, 80, 90, 100];
  const fr = (n) => n.toFixed(1).replace(".", ",");
  const allure = (kmh) => {
    const total = Math.round((60 / kmh) * 60);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };
  const x0 = 250;
  const cw = (1136 - x0) / vmas.length;
  const y0 = 198;
  const rh = 62;
  const couleurs = ["#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#fbbf24"];
  const entete = vmas
    .map((v, i) => t(x0 + i * cw + cw / 2, 176, 24, 700, "#e2e8f0", `VMA ${v} km/h`, 'text-anchor="middle"'))
    .join("\n  ");
  const corps = pourcents
    .map((p, r) => {
      const y = y0 + r * rh;
      const fond = `<rect x="64" y="${y}" width="1072" height="${rh - 8}" rx="10" fill="${couleurs[r]}" fill-opacity="0.14"/>`;
      const nom = t(84, y + 38, 30, 800, couleurs[r], `${p} %`);
      const cases = vmas
        .map((v, i) => {
          const kmh = (v * p) / 100;
          const cx = x0 + i * cw + cw / 2;
          return (
            t(cx, y + 24, 26, 800, "#ffffff", `${allure(kmh)} /km`, 'text-anchor="middle"') +
            t(cx, y + 45, 18, 400, "#cbd5e1", `${fr(kmh)} km/h`, 'text-anchor="middle"')
          );
        })
        .join("");
      return `${fond}\n  ${nom}\n  ${cases}`;
    })
    .join("\n  ");
  const haut = y0 + pourcents.length * rh;
  const pied =
    t(64, haut + 22, 20, 400, "#cbd5e1", "Vitesse = VMA × pourcentage. Allure = 60 ÷ vitesse. Ex. : VMA 14 km/h à 70 % → 9,8 km/h → 6:07 /km.") +
    "\n  " +
    t(64, haut + 48, 17, 400, "#94a3b8", "Calcul du calculateur du site ; les pourcentages sont des repères d'entraînement, pas une norme.");
  const alt = `Tableau des allures en pourcentage de VMA : pour une VMA de 14 km/h, 70 % donne ${fr(14 * 0.7)} km/h soit ${allure(14 * 0.7)} par km, 80 % donne ${allure(14 * 0.8)} par km, 100 % donne ${allure(14)} par km ; colonnes pour des VMA de 10, 12, 14 et 16 km/h, lignes de 60 à 100 %`;
  return {
    nom: "vma-allures-pourcentage-tableau",
    route: "comment-calculer-sa-vma",
    alt,
    svg: cadre({
      accent: "#34d399",
      kicker: "VMA · ALLURES SELON LE POURCENTAGE DE VMA",
      titre: "Votre allure selon votre VMA",
      note: "",
      corps: `${entete}\n  ${corps}\n  ${pied}`,
    }),
  };
}
