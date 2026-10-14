// Qui paie quoi sur une consultation a 50 EUR chez un generaliste de secteur 2 adherent a l'Optam.
// Les montants viennent du code du calculateur (/calcul-remboursement-mutuelle, mutuelleCalc.ts) :
//   base de remboursement 30 EUR, Securite sociale 70 % moins 2 EUR de participation forfaitaire,
//   mutuelle "X % de la base" Securite sociale comprise. Le depassement est le prix moins la base.
import { calcRemboursementMutuelle, ACTES } from "../../app/calcul-remboursement-mutuelle/mutuelleCalc.ts";

export default function ({ t, cadre, W, H }) {
  const prix = 50;
  const base = ACTES["consultation-generaliste"].baseSS;
  const fr = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ","));
  const cas = [
    { niveau: "basique", titre: "Mutuelle à 100 % de la base" },
    { niveau: "intermediaire", titre: "Mutuelle à 200 % de la base" },
  ].map((c) => {
    const r = calcRemboursementMutuelle("consultation-generaliste", prix, c.niveau);
    const pf = r.retenueForfaitaire;
    const depasseNonCouvert = Math.round((r.resteACharge - pf) * 100) / 100;
    return { ...c, secu: r.remboursementSS, mut: r.remboursementMutuelle, pf, dep: depasseNonCouvert, reste: r.resteACharge };
  });
  const COUL = { secu: "#38bdf8", mut: "#4ade80", pf: "#fbbf24", dep: "#f87171" };
  const x0 = 64;
  const pxE = 1072 / prix;
  const hBarre = 70;
  const lignes = cas
    .map((c, i) => {
      const y = 184 + i * 166;
      let x = x0;
      const segs = [
        ["secu", c.secu],
        ["mut", c.mut],
        ["pf", c.pf],
        ["dep", c.dep],
      ]
        .filter(([, v]) => v > 0.001)
        .map(([k, v]) => {
          const w = v * pxE;
          const out =
            `<rect x="${x}" y="${y}" width="${w}" height="${hBarre}" fill="${COUL[k]}"/>` +
            t(x + w / 2, y + 44, w > 90 ? 28 : 20, 800, "#0b1224", `${fr(v)} €`, 'text-anchor="middle"');
          x += w;
          return out;
        })
        .join("\n  ");
      return [
        t(x0, y - 14, 24, 700, "#ffffff", c.titre),
        `<clipPath id="barre${i}"><rect x="${x0}" y="${y}" width="1072" height="${hBarre}" rx="14"/></clipPath>`,
        `<g clip-path="url(#barre${i})">\n  ${segs}\n  </g>`,
        t(x0, y + hBarre + 36, 26, 700, "#e2e8f0", `Il vous reste à payer : ${fr(c.reste)} € sur ${prix} €`),
      ].join("\n  ");
    })
    .join("\n  ");
  const items = [
    ["secu", "Sécurité sociale"],
    ["mut", "Mutuelle"],
    ["pf", "Participation forfaitaire (jamais remboursée)"],
    ["dep", "Dépassement non couvert"],
  ];
  const xs = [64, 290, 450, 860];
  const legende = items
    .map(([k, l], i) => `<rect x="${xs[i]}" y="490" width="18" height="18" rx="4" fill="${COUL[k]}"/>` + t(xs[i] + 28, 506, 19, 400, "#e2e8f0", l))
    .join("\n  ");
  const pied = t(64, 538, 17, 400, "#94a3b8", `Exemple : consultation à ${prix} € chez un généraliste de secteur 2 adhérent à l'Optam. Base de remboursement : ${fr(base)} €, Sécurité sociale 70 %.`);
  const a = cas[0];
  const b = cas[1];
  const alt = `Qui paie quoi pour une consultation à ${prix} € chez un généraliste de secteur 2 adhérent à l'Optam (base de remboursement ${fr(base)} €) : avec une mutuelle à 100 % de la base, la Sécurité sociale paie ${fr(a.secu)} €, la mutuelle ${fr(a.mut)} €, et il reste ${fr(a.reste)} € à payer (${fr(a.pf)} € de participation forfaitaire et ${fr(a.dep)} € de dépassement) ; avec une mutuelle à 200 %, la mutuelle paie ${fr(b.mut)} € et il reste ${fr(b.reste)} € (la participation forfaitaire).`;
  return {
    nom: "mutuelle-qui-paie-quoi-consultation",
    route: "remboursement-mutuelle-comment-ca-marche",
    alt,
    svg: cadre({
      accent: "#4ade80",
      kicker: "REMBOURSEMENT · QUI PAIE QUOI SUR UNE CONSULTATION",
      titre: "Sécu, mutuelle, et ce qui reste",
      note: "",
      corps: `${lignes}\n  ${legende}\n  ${pied}`,
    }),
  };
}
