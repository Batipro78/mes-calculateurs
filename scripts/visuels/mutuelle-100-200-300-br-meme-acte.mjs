// Ce que remboursent 100 %, 200 % et 300 % de la base pour un meme acte avec depassement.
// Calcul tire du calculateur /calcul-remboursement-mutuelle (mutuelleCalc.ts) :
// consultation de specialiste (sur avis du medecin traitant) a 80 EUR, base de remboursement 31,50 EUR, Securite sociale 70 %
// moins 2 EUR de participation forfaitaire ; garantie "X % de la base", Securite sociale comprise.
import { calcRemboursementMutuelle, ACTES, NIVEAUX, POURCENTAGE_BR } from "../../app/calcul-remboursement-mutuelle/mutuelleCalc.ts";

export default function ({ t, cadre, W, H }) {
  const prix = 80;
  const acte = "consultation-specialiste";
  const base = ACTES[acte].baseSS;
  const fr = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ","));
  const couleurs = { basique: "#60a5fa", intermediaire: "#a78bfa", premium: "#4ade80" };
  const cartes = NIVEAUX.map((n) => ({ n, pct: POURCENTAGE_BR[n], r: calcRemboursementMutuelle(acte, prix, n) }));
  const gap = 24;
  const cw = (1072 - 2 * gap) / 3;
  const y0 = 160;
  const ch = 348;
  const corps = cartes
    .map(({ n, pct, r }, i) => {
      const x = 64 + i * (cw + gap);
      const cx = x + cw / 2;
      const c = couleurs[n];
      // barre empilee : Securite sociale / mutuelle / reste, sur la largeur de la carte
      const bx = x + 24;
      const bw = cw - 48;
      const px = bw / prix;
      const wSecu = r.remboursementSS * px;
      const wMut = r.remboursementMutuelle * px;
      const wReste = r.resteACharge * px;
      const by = y0 + 218;
      const barre =
        `<clipPath id="b${i}"><rect x="${bx}" y="${by}" width="${bw}" height="34" rx="9"/></clipPath>` +
        `<g clip-path="url(#b${i})">` +
        `<rect x="${bx}" y="${by}" width="${wSecu}" height="34" fill="#38bdf8"/>` +
        `<rect x="${bx + wSecu}" y="${by}" width="${wMut}" height="34" fill="${c}"/>` +
        `<rect x="${bx + wSecu + wMut}" y="${by}" width="${wReste}" height="34" fill="#f87171"/></g>`;
      return [
        `<rect x="${x}" y="${y0}" width="${cw}" height="${ch}" rx="16" fill="${c}" fill-opacity="0.13" stroke="${c}" stroke-opacity="0.5" stroke-width="2"/>`,
        t(cx, y0 + 52, 36, 800, c, `${pct} % de la base`, 'text-anchor="middle"'),
        t(cx, y0 + 88, 19, 400, "#cbd5e1", `plafond total : ${fr((base * pct) / 100)} €`, 'text-anchor="middle"'),
        t(cx, y0 + 134, 21, 400, "#cbd5e1", "La mutuelle paie", 'text-anchor="middle"'),
        t(cx, y0 + 178, 44, 800, "#ffffff", `${fr(r.remboursementMutuelle)} €`, 'text-anchor="middle"'),
        barre,
        t(cx, y0 + 296, 21, 400, "#cbd5e1", "Reste à votre charge", 'text-anchor="middle"'),
        t(cx, y0 + 330, 30, 800, r.resteACharge > 10 ? "#fca5a5" : "#86efac", `${fr(r.resteACharge)} €`, 'text-anchor="middle"'),
      ].join("\n  ");
    })
    .join("\n  ");
  const secu = cartes[0].r.remboursementSS;
  const pied = t(64, 532, 18, 400, "#94a3b8", `Spécialiste sur avis du médecin traitant, ${prix} €, base ${fr(base)} € : Sécu ${fr(secu)} € (bleu), mutuelle (couleur), reste à vous (rouge).`);
  const alt = `Pour une consultation de spécialiste, sur avis du médecin traitant, à ${prix} € (base de remboursement ${fr(base)} €), la Sécurité sociale paie ${fr(secu)} € ; une mutuelle à 100 % de la base paie ${fr(cartes[0].r.remboursementMutuelle)} € et il reste ${fr(cartes[0].r.resteACharge)} € à payer, à 200 % elle paie ${fr(cartes[1].r.remboursementMutuelle)} € et il reste ${fr(cartes[1].r.resteACharge)} €, à 300 % elle paie ${fr(cartes[2].r.remboursementMutuelle)} € et il reste ${fr(cartes[2].r.resteACharge)} €`;
  return {
    nom: "mutuelle-100-200-300-br-meme-acte",
    route: "calcul-remboursement-mutuelle",
    alt,
    svg: cadre({
      accent: "#60a5fa",
      kicker: "MUTUELLE · 100 %, 200 % OU 300 % DE LA BASE",
      titre: "Même consultation, trois garanties",
      note: "",
      corps: `${corps}\n  ${pied}`,
    }),
  };
}
