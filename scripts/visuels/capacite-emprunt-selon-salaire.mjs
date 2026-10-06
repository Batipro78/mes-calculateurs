// Visuel de /capacite-d-emprunt-quel-salaire : capital empruntable selon le salaire net.
//
// Regles et hypotheses (memes que le calculateur /calcul-capacite-emprunt, hors assurance) :
//  - mensualite maximale = 35 % du revenu net (decision HCSF D-HCSF-2021-7, economie.gouv.fr)
//  - credit a mensualites constantes : capital = mensualite x (1 - (1 + i)^-n) / i
//  - taux par defaut du calculateur : 3,35 % sur 20 ans et 3,45 % sur 25 ans (hypotheses)
//  - sans autre credit, sans assurance, sans apport.
export default function ({ t, cadre, euros, W, H }) {
  const SALAIRES = [1500, 2000, 2500, 3000, 3500, 4000];
  const OFFRES = [
    { annees: 20, taux: 3.35, couleur: "#38bdf8" },
    { annees: 25, taux: 3.45, couleur: "#a78bfa" },
  ];
  const capital = (salaire, annees, taux) => {
    const mensualite = salaire * 0.35;
    const i = taux / 100 / 12;
    const n = annees * 12;
    return (mensualite * (1 - Math.pow(1 + i, -n))) / i;
  };
  const donnees = SALAIRES.map((s) => ({
    salaire: s,
    valeurs: OFFRES.map((o) => capital(s, o.annees, o.taux)),
  }));
  const max = Math.max(...donnees.flatMap((d) => d.valeurs));

  const base = 498;
  const hMax = 240;
  const largeurGroupe = 1072 / SALAIRES.length;
  const largeurBarre = 64;
  const ecart = 6;

  const barres = donnees
    .map((d, g) => {
      const x0 = 64 + g * largeurGroupe + (largeurGroupe - (2 * largeurBarre + ecart)) / 2;
      const parts = d.valeurs.map((v, k) => {
        const h = (v / max) * hMax;
        const x = x0 + k * (largeurBarre + ecart);
        const label = `${Math.round(v / 1000)} k€`;
        return [
          `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${largeurBarre}" height="${h.toFixed(1)}" rx="5" fill="${OFFRES[k].couleur}"/>`,
          t(x + largeurBarre / 2, base - h - 9, 19, 700, OFFRES[k].couleur, label, 'text-anchor="middle"'),
        ].join("\n  ");
      });
      const centre = x0 + largeurBarre + ecart / 2;
      parts.push(t(centre, base + 30, 22, 700, "#ffffff", `${euros(d.salaire)} €`, 'text-anchor="middle"'));
      return parts.join("\n  ");
    })
    .join("\n  ");

  const legende = OFFRES.map((o, k) => {
    const x = 64 + k * 250;
    return [
      `<rect x="${x}" y="186" width="20" height="20" rx="4" fill="${o.couleur}"/>`,
      t(x + 30, 203, 20, 600, "#cbd5e1", `Sur ${o.annees} ans, taux ${String(o.taux).replace(".", ",")} %`),
    ].join("\n  ");
  }).join("\n  ");

  const corps = `
  ${t(64, 168, 22, 400, "#cbd5e1", "Capital empruntable selon le salaire net mensuel (mensualité = 35 % du salaire)")}
  ${legende}
  <line x1="64" y1="${base}" x2="1136" y2="${base}" stroke="#334155" stroke-width="2"/>
  ${barres}`;

  const [d1, d2] = [donnees[2], donnees[5]];
  const alt = `Barres du capital empruntable selon le salaire net, avec une mensualité de 35 % du salaire, hors assurance : ${euros(d1.salaire)} € net donne ${euros(d1.valeurs[0])} € sur 20 ans et ${euros(d1.valeurs[1])} € sur 25 ans ; ${euros(d2.salaire)} € net donne ${euros(d2.valeurs[0])} € sur 20 ans et ${euros(d2.valeurs[1])} € sur 25 ans`;

  return {
    nom: "capacite-emprunt-selon-salaire",
    route: "capacite-d-emprunt-quel-salaire",
    alt,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "CRÉDIT IMMOBILIER · RÈGLE DES 35 % (HCSF)",
      titre: "Capacité d'emprunt selon le salaire",
      note: "Hors assurance, sans autre crédit",
      corps,
    }),
  };
}
