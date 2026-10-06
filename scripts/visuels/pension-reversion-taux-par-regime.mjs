// Visuel de /pension-de-reversion-quel-montant : le taux et les conditions par regime,
// et ce que donne une pension de 1 500 EUR/mois pour le defunt.
// Sources (pages officielles, valeurs 2026) :
//  - regime general : 54 %, 55 ans, plafond 25 001,60 EUR (seul) / 40 002,56 EUR (couple)
//    -> service-public.gouv.fr/particuliers/vosdroits/F13104 (verifie le 1er janvier 2026)
//  - Agirc-Arrco : 60 %, sans condition de ressources, perdue au remariage
//    -> agirc-arrco.fr/categorie_expert/reversion-au-conjoint-et-ex-conjoint/
//  - fonction publique (Etat) : 50 %, ni age ni ressources
//    -> retraitesdeletat.gouv.fr (la veuve, le veuf et les ex-conjoints)
export default function ({ t, cadre, euros }) {
  const pension = 1500; // pension mensuelle du defunt, pour l'exemple
  const regimes = [
    {
      nom: "RÉGIME GÉNÉRAL", sous: "retraite de base", taux: 0.54, couleur: "#a78bfa",
      lignes: ["Marié(e), 55 ans minimum", "Plafond : 25 001,60 € par an", "(40 002,56 € si en couple)"],
    },
    {
      nom: "AGIRC-ARRCO", sous: "retraite complémentaire", taux: 0.6, couleur: "#38bdf8",
      lignes: ["Marié(e), 55 ans (parfois moins)", "Aucune condition de ressources", "Perdue en cas de remariage"],
    },
    {
      nom: "FONCTION PUBLIQUE", sous: "retraite de l'État", taux: 0.5, couleur: "#4ade80",
      lignes: ["Marié(e) : 4 ans ou un enfant", "Ni âge ni ressources exigés", "Perdue si vous revivez en couple"],
    },
  ];
  const cartes = regimes.map((r, i) => {
    const x = 64 + i * 368;
    const montant = pension * r.taux;
    const pct = `${Math.round(r.taux * 100)} %`;
    return [
      `<rect x="${x}" y="156" width="336" height="372" rx="22" fill="#ffffff" fill-opacity="0.06" stroke="${r.couleur}" stroke-opacity="0.65" stroke-width="2"/>`,
      t(x + 26, 196, 20, 700, r.couleur, r.nom, 'letter-spacing="1.5"'),
      t(x + 26, 222, 18, 400, "#94a3b8", r.sous),
      t(x + 26, 304, 82, 800, "#ffffff", pct),
      t(x + 26, 336, 20, 400, "#cbd5e1", "de la pension du défunt"),
      t(x + 26, 380, 20, 600, "#e2e8f0", r.lignes[0]),
      t(x + 26, 408, 20, 600, "#e2e8f0", r.lignes[1]),
      t(x + 26, 436, 20, 600, "#e2e8f0", r.lignes[2]),
      `<line x1="${x + 26}" y1="458" x2="${x + 310}" y2="458" stroke="${r.couleur}" stroke-opacity="0.45" stroke-width="2"/>`,
      t(x + 26, 484, 18, 400, "#94a3b8", `Défunt à ${euros(pension)} € par mois`),
      t(x + 26, 516, 34, 800, r.couleur, `${euros(montant)} € par mois`),
    ].join("\n  ");
  }).join("\n  ");
  const g = pension * 0.54;
  const a = pension * 0.6;
  const f = pension * 0.5;
  return {
    nom: "pension-reversion-taux-par-regime",
    route: "pension-de-reversion-quel-montant",
    alt: `Pension de réversion en 2026 : 54 % de la retraite de base du défunt au régime général (plafond de ressources 25 001,60 € par an), 60 % à l'Agirc-Arrco (sans condition de ressources, perdue au remariage) et 50 % dans la fonction publique ; pour un défunt à ${euros(pension)} € par mois : ${euros(g)} €, ${euros(a)} € et ${euros(f)} € par mois`,
    svg: cadre({
      accent: "#a78bfa",
      kicker: "VEUFS, VEUVES ET EX-CONJOINTS · MONTANTS BRUTS PAR MOIS",
      titre: "Pension de réversion : quel taux ?",
      note: "Chaque régime a ses règles",
      corps: cartes,
    }),
  };
}
