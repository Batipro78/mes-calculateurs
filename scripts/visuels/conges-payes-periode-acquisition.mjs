// Visuel de l'article /conges-payes-quelle-annee-quand-les-poser.
// Sources : service-public.gouv.fr/particuliers/vosdroits/F2258 (2,5 jours ouvrables par
// mois de travail effectif, 30 jours ouvrables pour une année complète, période de
// référence du 1er juin au 31 mai sauf convention ou accord, jours non entiers portés
// à l'entier supérieur, période de prise qui doit comprendre au moins du 1er mai au
// 31 octobre) et service-public.gouv.fr/particuliers/actualites/A15702.
// Exemple daté : période de référence du 1er juin 2025 au 31 mai 2026.
export default function ({ t, cadre, W }) {
  const PAR_MOIS = 2.5; // jours ouvrables acquis par mois de travail effectif
  const mois = ["J", "J", "A", "S", "O", "N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"];
  // 17 mois : juin 2025 -> octobre 2026 (les 12 premiers = période de référence)
  const x0 = 64;
  const larg = 1072 / mois.length;
  const nombre = (n) => String(n).replace(".", ",");

  const base = 336; // ligne de base des barres
  const parJour = 4.1; // hauteur (px) d'un jour ouvrable
  let barres = "";
  for (let i = 0; i < 12; i++) {
    const cumul = (i + 1) * PAR_MOIS;
    const h = cumul * parJour;
    const x = x0 + i * larg + 5;
    const dernier = i === 11;
    barres += `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(larg - 10).toFixed(1)}" height="${h.toFixed(1)}" rx="6" fill="${dernier ? "#2dd4bf" : "#5eead4"}" fill-opacity="${dernier ? 1 : 0.5}"/>`;
    barres += t(x + (larg - 10) / 2, base - h - 9, dernier ? 26 : 20, dernier ? 800 : 700, dernier ? "#ffffff" : "#ccfbf1", nombre(cumul), 'text-anchor="middle"');
  }

  let lettres = "";
  mois.forEach((m, i) => {
    const hors = i >= 12;
    lettres += t(x0 + i * larg + larg / 2, base + 28, 21, 700, hors ? "#fbbf24" : "#cbd5e1", m, 'text-anchor="middle"');
  });

  const xRef0 = x0;
  const xRef1 = x0 + 12 * larg;
  const xPrise0 = x0 + 11 * larg; // 1er mai 2026 = début du 12e mois
  const xPrise1 = x0 + 17 * larg; // fin octobre 2026

  const corps = `
  ${t(64, 174, 22, 600, "#cbd5e1", "Jours ouvrables acquis, cumulés mois après mois (2,5 par mois)")}
  <line x1="${x0}" y1="${base}" x2="${x0 + 1072}" y2="${base}" stroke="#475569" stroke-width="2"/>
  ${barres}
  ${lettres}
  <rect x="${xRef0 + 2}" y="372" width="${(xRef1 - xRef0 - 4).toFixed(1)}" height="46" rx="12" fill="#2dd4bf"/>
  ${t((xRef0 + xRef1) / 2, 403, 23, 800, "#042f2e", "ACQUISITION : 1er juin 2025 → 31 mai 2026", 'text-anchor="middle"')}
  <rect x="${(xPrise0 + 2).toFixed(1)}" y="428" width="${(xPrise1 - xPrise0 - 4).toFixed(1)}" height="46" rx="12" fill="#fbbf24"/>
  ${t((xPrise0 + xPrise1) / 2, 459, 23, 800, "#451a03", "PRISE : 1er mai → 31 oct. 2026", 'text-anchor="middle"')}
  ${t(xPrise0 - 14, 459, 20, 600, "#fbbf24", "au moins", 'text-anchor="end"')}
  ${t(64, 508, 22, 400, "#cbd5e1", "30 jours ouvrables = 5 semaines. Un nombre non entier est porté à l'entier supérieur : 12,5 → 13.")}
  ${t(64, 538, 22, 400, "#cbd5e1", "En arrêt maladie non professionnel : 2 jours ouvrables par mois (24 par an au maximum).")}`;

  return {
    nom: "conges-payes-periode-acquisition",
    route: "conges-payes-quelle-annee-quand-les-poser",
    alt: "Frise des congés payés : sur la période de référence du 1er juin 2025 au 31 mai 2026, on acquiert 2,5 jours ouvrables par mois, soit 30 jours ouvrables au bout de 12 mois ; la période de prise comprend au moins du 1er mai au 31 octobre 2026",
    svg: cadre({
      accent: "#2dd4bf",
      kicker: "CONGÉS PAYÉS · ACQUISITION PUIS PRISE",
      titre: "Congés payés : quelle année ?",
      note: "Dates par défaut, sauf accord ou convention",
      corps,
    }),
  };
}
