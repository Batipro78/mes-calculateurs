// Allocation chomage (ARE) mensuelle brute selon le salaire brut, avec le calcul du simulateur
// /simulateur-chomage (fichier chomageCalc.ts) : 24 mois travailles a salaire constant, 35 ans.
// Les memes salaires sont dans app/simulateur-chomage/page.tsx (SALAIRES_VISUEL) pour l'alt.
import { calculerARE, SEUIL_DEGRESSIVITE } from "../../app/simulateur-chomage/chomageCalc.ts";

export default function ({ t, cadre, W, H }) {
  const salaires = [1500, 2000, 2500, 3000, 4000, 6000];
  const espace = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const fr1 = (n) => n.toFixed(1).replace(".", ",");
  const lignes = salaires.map((s) => ({ salaire: s, ...calculerARE(s, 24, 35) }));
  const max = Math.max(...lignes.map((l) => l.areMois));
  const x0 = 230;
  const largeurMax = 520;
  const y0 = 166;
  const pas = 54;
  const corps = lignes
    .map((l, i) => {
      const y = y0 + i * pas;
      const w = Math.max(20, (l.areMois / max) * largeurMax);
      const couleur = l.isDegressif ? "#fbbf24" : "#38bdf8";
      const parts = [
        t(204, y + 33, 28, 700, "#e2e8f0", `${espace(l.salaire)} €`, 'text-anchor="end"'),
        `<rect x="${x0}" y="${y}" width="${w}" height="44" rx="10" fill="${couleur}"/>`,
        t(x0 + w + 16, y + 32, 28, 800, "#ffffff", `${espace(l.areMois)} €`),
        t(x0 + w + 16 + (String(espace(l.areMois)).length + 2) * 15.5 + 14, y + 31, 20, 400, "#94a3b8", `${fr1(l.tauxRemplacement)} % du brut`),
      ];
      return parts.join("\n  ");
    })
    .join("\n  ");
  const six = lignes[lignes.length - 1];
  const pied =
    t(64, 508, 20, 600, "#fbbf24", `Barre jaune : plus de ${String(SEUIL_DEGRESSIVITE).replace(".", ",")} € par jour et moins de 55 ans, donc dégressivité à partir du 7e mois.`) +
    "\n  " +
    t(64, 534, 20, 400, "#cbd5e1", `À 6 000 € brut : ${espace(six.areMois)} € par mois, puis ${espace(six.areJourApresDegressivite * 30)} € dès le 7e mois.`);
  const alt = `Allocation chômage brute par mois selon le salaire brut, pour 24 mois travaillés à 35 ans : ${lignes.map((l) => `${espace(l.salaire)} € brut donnent ${espace(l.areMois)} € par mois`).join(", ")}`;
  return {
    nom: "chomage-allocation-mensuelle-selon-salaire",
    route: "simulateur-chomage",
    alt,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "CHÔMAGE · ALLOCATION BRUTE PAR MOIS",
      titre: "Ce que donne le simulateur",
      note: "24 mois travaillés, 35 ans",
      corps,
    }).replace("</svg>", `  ${pied}\n</svg>`),
  };
}
