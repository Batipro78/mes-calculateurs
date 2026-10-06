// Prime d'activite selon le salaire net, personne seule, sans enfant, sans
// forfait logement ni autre ressource. Formule et valeurs en vigueur depuis le
// 1er avril 2026 :
//  - montant forfaitaire 638,28 EUR (decret n° 2026-222 du 30 mars 2026, caf.fr bareme) ;
//  - 59,85 % des revenus professionnels (service-public.gouv.fr, F2882) ;
//  - bonification : 0 sous 59 x SMIC horaire (709,18 EUR), maximum 37,7 % du
//    forfaitaire (240,63 EUR) a partir de 138 x SMIC horaire (1 658,76 EUR), progression
//    lineaire entre les deux (SMIC horaire 12,02 EUR) ;
//  - rien n'est verse sous 15 EUR (service-public.gouv.fr).
export default function ({ t, cadre, euros, esc, W, H }) {
  const FORFAIT = 638.28;
  const TAUX = 0.5985;
  const SMICH = 12.02;
  const BAS = 59 * SMICH;
  const HAUT = 138 * SMICH;
  const BONIF_MAX = 0.377 * FORFAIT;
  const bonif = (x) => (x <= BAS ? 0 : x >= HAUT ? BONIF_MAX : (BONIF_MAX * (x - BAS)) / (HAUT - BAS));
  const prime = (x) => {
    const p = FORFAIT + TAUX * x + bonif(x) - x;
    return p < 15 ? 0 : p;
  };
  // Salaire au-dela duquel la prime passe sous 15 EUR, donc n'est plus versee.
  const plafond = (FORFAIT + BONIF_MAX - 15) / (1 - TAUX);

  const salaires = [800, 1000, 1200, 1400, 1600, 1800, 2000, 2200];
  const base = 462;
  const echelle = 235 / prime(salaires[0]);
  const fente = 1072 / salaires.length;
  const barres = salaires
    .map((s, i) => {
      const p = prime(s);
      const h = Math.max(3, p * echelle);
      const x = 64 + i * fente + 20;
      const w = fente - 40;
      const couleur = p > 0 ? "#34d399" : "#475569";
      return [
        `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="8" fill="${couleur}"/>`,
        t(x + w / 2, base - h - 12, 28, 800, p > 0 ? "#ffffff" : "#94a3b8", `${euros(p)} €`, 'text-anchor="middle"'),
        t(x + w / 2, base + 34, 24, 600, "#cbd5e1", `${euros(s)} €`, 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");

  const corps = `
  ${t(64, 168, 22, 600, "#cbd5e1", "Forfait 638,28 € + 59,85 % du salaire + bonification − salaire")}
  ${t(1136, 214, 21, 600, "#fbbf24", `Plus versée au-delà d'environ ${euros(Math.round(plafond / 10) * 10)} € net`, 'text-anchor="end"')}
  <line x1="64" y1="${base}" x2="1136" y2="${base}" stroke="#334155" stroke-width="2"/>
  ${barres}
  ${t(600, 528, 20, 400, "#94a3b8", "Salaire net par mois (personne seule, sans enfant, sans aide au logement)", 'text-anchor="middle"')}`;

  const ex = (s) => `${euros(prime(s))} € à ${euros(s)} €`;
  return {
    nom: "prime-activite-selon-salaire",
    route: "prime-d-activite-pour-qui-quel-salaire",
    alt: `Prime d'activité estimée selon le salaire net, pour une personne seule sans enfant en 2026 : ${ex(1000)}, ${ex(1400)}, ${ex(1800)}, ${ex(2000)} et 0 € à 2 200 €`,
    svg: cadre({
      accent: "#34d399",
      kicker: "ESTIMATION · BARÈME DU 1ER AVRIL 2026",
      titre: "Prime d'activité selon le salaire",
      note: "La CAF fait foi",
      corps,
    }),
  };
}
