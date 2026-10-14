// Du salaire a l'allocation chomage : exemple de l'article (2 500 EUR brut, 24 mois, 35 ans),
// calcule avec le code du simulateur /simulateur-chomage (chomageCalc.ts).
import { calculerARE, PART_FIXE, ARE_MINIMALE, ARE_MAXIMALE, PLAFOND_TAUX_SJR } from "../../app/simulateur-chomage/chomageCalc.ts";

export default function ({ t, cadre, W, H }) {
  const salaire = 2500;
  const mois = 24;
  const r = calculerARE(salaire, mois, 35);
  const espace = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const fr2 = (n) => {
    const [e, d] = n.toFixed(2).split(".");
    return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")},${d}`;
  };
  const total = salaire * mois;
  const jours = Math.round(r.joursReference);
  const plafondSjr = r.sjr * PLAFOND_TAUX_SJR;
  const gagne1 = r.formule1 >= r.formule2;

  const y = 156;
  const h = 300;
  const flèche = (x1, x2, yy) =>
    `<line x1="${x1}" y1="${yy}" x2="${x2 - 8}" y2="${yy}" stroke="#94a3b8" stroke-width="3"/>` +
    `<polygon points="${x2},${yy} ${x2 - 14},${yy - 9} ${x2 - 14},${yy + 9}" fill="#94a3b8"/>`;
  const carte = (x, yy, w, hh, couleur, plein = false) =>
    `<rect x="${x}" y="${yy}" width="${w}" height="${hh}" rx="16" fill="${couleur}" fill-opacity="${plein ? 0.22 : 0.12}" stroke="${couleur}" stroke-opacity="${plein ? 1 : 0.5}" stroke-width="${plein ? 4 : 2}"/>`;

  const c1 = { x: 64, w: 236 };
  const c2 = { x: 346, w: 236 };
  const c3 = { x: 628, w: 300 };
  const c4 = { x: 974, w: 162 };

  const corps = [
    // 1. Salaires
    carte(c1.x, y, c1.w, h, "#a78bfa"),
    t(c1.x + 20, y + 40, 18, 700, "#a78bfa", "1 · SALAIRES", 'letter-spacing="2"'),
    t(c1.x + 20, y + 96, 40, 800, "#ffffff", `${espace(salaire)} €`),
    t(c1.x + 20, y + 130, 20, 400, "#cbd5e1", "brut par mois"),
    t(c1.x + 20, y + 190, 40, 800, "#ffffff", `× ${mois} mois`),
    t(c1.x + 20, y + 224, 20, 400, "#cbd5e1", "24 derniers mois"),
    t(c1.x + 20, y + 270, 24, 700, "#a78bfa", `= ${espace(total)} €`),
    flèche(c1.x + c1.w + 6, c2.x - 4, y + h / 2),

    // 2. SJR
    carte(c2.x, y, c2.w, h, "#38bdf8"),
    t(c2.x + 20, y + 40, 18, 700, "#38bdf8", "2 · SJR", 'letter-spacing="2"'),
    t(c2.x + 20, y + 84, 20, 400, "#cbd5e1", "salaire journalier"),
    t(c2.x + 20, y + 108, 20, 400, "#cbd5e1", "de référence"),
    t(c2.x + 20, y + 168, 24, 600, "#ffffff", `${espace(total)} €`),
    t(c2.x + 20, y + 200, 24, 600, "#ffffff", `÷ ${jours} jours`),
    t(c2.x + 20, y + 270, 38, 800, "#38bdf8", `${fr2(r.sjr)} €`),
    flèche(c2.x + c2.w + 6, c3.x - 4, y + h / 2),

    // 3. Deux formules
    carte(c3.x, y, c3.w, 138, "#34d399", gagne1),
    t(c3.x + 18, y + 34, 18, 700, "#34d399", "FORMULE 1", 'letter-spacing="2"'),
    t(c3.x + 18, y + 72, 24, 600, "#ffffff", "57 % du SJR"),
    t(c3.x + 18, y + 118, 38, 800, "#34d399", `${fr2(r.formule1)} €`),
    carte(c3.x, y + 162, c3.w, 138, "#fbbf24", !gagne1),
    t(c3.x + 18, y + 162 + 34, 18, 700, "#fbbf24", "FORMULE 2", 'letter-spacing="2"'),
    t(c3.x + 18, y + 162 + 72, 24, 600, "#ffffff", `40,4 % du SJR + ${fr2(PART_FIXE)} €`),
    t(c3.x + 18, y + 162 + 118, 38, 800, "#fbbf24", `${fr2(r.formule2)} €`),
    flèche(c3.x + c3.w + 6, c4.x - 4, y + h / 2),

    // 4. Allocation
    carte(c4.x, y, c4.w, h, "#f472b6", true),
    t(c4.x + 16, y + 40, 18, 700, "#f472b6", "3 · ON GARDE", 'letter-spacing="1.5"'),
    t(c4.x + 16, y + 74, 20, 400, "#cbd5e1", "la plus haute"),
    t(c4.x + 16, y + 150, 40, 800, "#ffffff", `${fr2(r.areJour)}`),
    t(c4.x + 16, y + 180, 20, 400, "#cbd5e1", "€ par jour"),
    t(c4.x + 16, y + 236, 22, 600, "#ffffff", "× 30 jours"),
    t(c4.x + 16, y + 276, 28, 800, "#f472b6", `${fr2(r.areMois)} €`),
  ].join("\n  ");

  const pied =
    t(64, 494, 20, 600, "#e2e8f0", `Ensuite : minimum ${fr2(ARE_MINIMALE)} € par jour, jamais plus de 75 % du SJR (${fr2(plafondSjr)} € ici), jamais plus de ${fr2(ARE_MAXIMALE)} € par jour.`) +
    "\n  " +
    t(64, 522, 18, 400, "#94a3b8", "Montants bruts, avant CSG, CRDS et retraite complémentaire. Emploi continu, salaire constant, 35 ans.");

  const alt = `Schéma du calcul de l'allocation chômage pour 2 500 € brut par mois pendant 24 mois : ${espace(total)} € de salaires divisés par ${jours} jours donnent un salaire journalier de référence de ${fr2(r.sjr)} €. Formule 1, 57 % du SJR : ${fr2(r.formule1)} €. Formule 2, 40,4 % du SJR plus ${fr2(PART_FIXE)} € : ${fr2(r.formule2)} €. On garde la plus haute, ${fr2(r.areJour)} € par jour, soit ${fr2(r.areMois)} € par mois, dans la limite du minimum de ${fr2(ARE_MINIMALE)} €, de 75 % du SJR et de ${fr2(ARE_MAXIMALE)} € par jour`;

  return {
    nom: "chomage-du-salaire-a-l-allocation",
    route: "chomage-comment-est-calcule-le-montant",
    alt,
    svg: cadre({
      accent: "#38bdf8",
      kicker: "CHÔMAGE · LE CALCUL EN TROIS ÉTAPES",
      titre: "Du salaire à l'allocation",
      note: "exemple : 2 500 € brut, 24 mois",
      corps,
    }).replace("</svg>", `  ${pied}\n</svg>`),
  };
}
