import type { Metadata } from "next";
import CalculateurMasseGrasse from "../CalculateurMasseGrasse";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SEXES = ["homme", "femme"] as const;
const POIDS = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const TAILLES = [160, 165, 170, 175, 180, 185];

type Sexe = (typeof SEXES)[number];

interface CategorieMG {
  key: string;
  label: string;
  couleur: string;
  bgGradient: string;
}

const CATEGORIES: CategorieMG[] = [
  { key: "essentiel", label: "Essentiel", couleur: "text-blue-600", bgGradient: "from-blue-500 to-cyan-500" },
  { key: "athlete", label: "Athlete", couleur: "text-emerald-600", bgGradient: "from-emerald-500 to-green-500" },
  { key: "fitness", label: "Fitness", couleur: "text-teal-600", bgGradient: "from-teal-500 to-emerald-500" },
  { key: "normal", label: "Normal", couleur: "text-amber-600", bgGradient: "from-amber-500 to-yellow-500" },
  { key: "surpoids", label: "Surpoids", couleur: "text-red-600", bgGradient: "from-red-500 to-rose-500" },
];

function getCategorieBMI(pct: number, sexe: Sexe): CategorieMG {
  if (sexe === "homme") {
    if (pct < 6) return CATEGORIES[0];
    if (pct < 14) return CATEGORIES[1];
    if (pct < 18) return CATEGORIES[2];
    if (pct < 25) return CATEGORIES[3];
    return CATEGORIES[4];
  } else {
    if (pct < 14) return CATEGORIES[0];
    if (pct < 21) return CATEGORIES[1];
    if (pct < 25) return CATEGORIES[2];
    if (pct < 32) return CATEGORIES[3];
    return CATEGORIES[4];
  }
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function parseSlug(slug: string): { sexe: Sexe; poids: number; taille: number } | null {
  const match = slug.match(/^(homme|femme)-(\d+)kg-(\d+)cm$/);
  if (!match) return null;
  return {
    sexe: match[1] as Sexe,
    poids: parseInt(match[2]),
    taille: parseInt(match[3]),
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const s of SEXES) {
    for (const p of POIDS) {
      for (const t of TAILLES) {
        params.push({ params: `${s}-${p}kg-${t}cm` });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { sexe, poids, taille } = parsed;
  const tailleM = taille / 100;
  const bmiVal = poids / (tailleM * tailleM);
  const age = 30; // age de reference pour les pages statiques
  const mgBMI = sexe === "homme"
    ? 1.2 * bmiVal + 0.23 * age - 16.2
    : 1.2 * bmiVal + 0.23 * age - 5.4;
  const cat = getCategorieBMI(mgBMI, sexe);

  return {
    title: `Masse grasse ${sexe} ${poids} kg ${taille} cm ≈ ${fmt(mgBMI)} % — ${cat.label}`,
    description: `Estimation du taux de masse grasse pour un ${sexe} de ${poids} kg et ${taille} cm : environ ${fmt(mgBMI)} % (${cat.label}). Calculez precisement avec la methode US Navy.`,
    keywords: `masse grasse ${sexe} ${poids} kg ${taille} cm, taux graisse ${sexe}, calcul masse grasse ${poids}kg`,
    openGraph: {
      title: `Masse grasse — ${sexe} ${poids} kg / ${taille} cm ≈ ${fmt(mgBMI)} %`,
      description: `Estimation : ${fmt(mgBMI)} % de masse grasse (${cat.label}) pour un ${sexe} de ${poids} kg / ${taille} cm.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { sexe, poids, taille } = parsed;
  if (!POIDS.includes(poids) || !TAILLES.includes(taille)) notFound();

  const tailleM = taille / 100;
  const bmiVal = poids / (tailleM * tailleM);
  const age = 30; // reference pour les pages statiques
  const mgBMI = sexe === "homme"
    ? 1.2 * bmiVal + 0.23 * age - 16.2
    : 1.2 * bmiVal + 0.23 * age - 5.4;
  const masseGrasse = (poids * mgBMI) / 100;
  const masseMaigre = poids - masseGrasse;
  const cat = getCategorieBMI(mgBMI, sexe);

  // Comparaison par poids pour ce sexe/taille
  const comparaisonPoids = POIDS.map((p) => {
    const bmi = p / (tailleM * tailleM);
    const mg = sexe === "homme"
      ? 1.2 * bmi + 0.23 * age - 16.2
      : 1.2 * bmi + 0.23 * age - 5.4;
    const c = getCategorieBMI(mg, sexe);
    return { poids: p, mg, categorie: c.label, couleur: c.couleur, isCurrent: p === poids };
  });

  // Comparaison par taille pour ce sexe/poids
  const comparaisonTailles = TAILLES.map((t) => {
    const tM = t / 100;
    const bmi = poids / (tM * tM);
    const mg = sexe === "homme"
      ? 1.2 * bmi + 0.23 * age - 16.2
      : 1.2 * bmi + 0.23 * age - 5.4;
    const c = getCategorieBMI(mg, sexe);
    return { taille: t, mg, categorie: c.label, couleur: c.couleur, isCurrent: t === taille };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le taux de masse grasse pour un ${sexe} de ${poids} kg et ${taille} cm ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${sexe} de ${poids} kg mesurant ${taille} cm (age de reference 30 ans), le taux de masse grasse estime par la methode IMC est d'environ ${fmt(mgBMI)} %, soit ${fmt(masseGrasse)} kg de masse grasse et ${fmt(masseMaigre)} kg de masse maigre. Categorie : ${cat.label}. Pour un resultat plus precis, utilisez la methode US Navy avec les mesures de tour de taille et de cou.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment reduire sa masse grasse a ${poids} kg ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour reduire la masse grasse, il faut combiner un deficit calorique modere (300-500 kcal/jour), un entrainement en musculation pour preserver la masse maigre, et une alimentation riche en proteines. La methode US Navy permet de suivre precisement l'evolution de votre composition corporelle.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${sexe} ${poids} kg — ${taille} cm`}
        parentPage="Calcul Masse Grasse"
        parentHref="/calcul-masse-grasse"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏋️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Masse grasse : {sexe} {poids} kg / {taille} cm
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation du taux de graisse corporelle pour un {sexe} de {poids} kg
        mesurant {taille} cm — methode IMC (age de reference : 30 ans).
      </p>

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${cat.bgGradient} text-white rounded-2xl p-8 shadow-lg mb-8`}>
        <p className="text-white/80 mb-1">Taux de masse grasse estimé (IMC)</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(mgBMI)}<span className="text-2xl font-bold ml-1">%</span>
        </p>
        <p className="text-xl font-bold mt-2">{cat.label}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/70">Masse grasse</p>
            <p className="font-semibold">{fmt(masseGrasse)} kg</p>
          </div>
          <div>
            <p className="text-white/70">Masse maigre</p>
            <p className="font-semibold">{fmt(masseMaigre)} kg</p>
          </div>
          <div>
            <p className="text-white/70">IMC</p>
            <p className="font-semibold">{fmt(bmiVal)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800 leading-relaxed mb-8">
        <strong>Note :</strong> Ces valeurs sont estimees par la methode IMC
        (age de reference : 30 ans). Pour un resultat plus precis, utilisez le
        calculateur interactif ci-dessous avec la methode US Navy.
      </div>

      {/* Comparaison par poids */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Masse grasse pour {taille} cm ({sexe}) selon le poids
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">%MG estimé</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Categorie</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPoids.map((row) => (
                <tr
                  key={row.poids}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{row.poids} kg</span>
                    ) : (
                      <a
                        href={`/calcul-masse-grasse/${sexe}-${row.poids}kg-${taille}cm`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {row.poids} kg
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {fmt(row.mg)} %
                  </td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.couleur}`}>
                    {row.categorie}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par taille */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Masse grasse pour {poids} kg ({sexe}) selon la taille
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Taille</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">%MG estimé</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Categorie</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonTailles.map((row) => (
                <tr
                  key={row.taille}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{row.taille} cm</span>
                    ) : (
                      <a
                        href={`/calcul-masse-grasse/${sexe}-${poids}kg-${row.taille}cm`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {row.taille} cm
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {fmt(row.mg)} %
                  </td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.couleur}`}>
                    {row.categorie}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Liens sexe oppose */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Voir aussi pour {sexe === "homme" ? "femme" : "homme"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {POIDS.slice(0, 5).map((p) => (
            <a
              key={`opp-${p}`}
              href={`/calcul-masse-grasse/${sexe === "homme" ? "femme" : "homme"}-${p}kg-${taille}cm`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {sexe === "homme" ? "Femme" : "Homme"} {p} kg / {taille} cm
            </a>
          ))}
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif (methode US Navy)
      </h2>
      <CalculateurMasseGrasse />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {fmt(mgBMI)} % de masse grasse : que signifie ce chiffre ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un <strong>{sexe}</strong> de <strong>{poids} kg</strong> mesurant{" "}
          <strong>{taille} cm</strong>, le taux de masse grasse estime est de{" "}
          <strong>{fmt(mgBMI)} %</strong>, soit environ{" "}
          <strong>{fmt(masseGrasse)} kg</strong> de graisse et{" "}
          <strong>{fmt(masseMaigre)} kg</strong> de masse maigre (muscles, os, eau, organes).
          Cela correspond a la categorie <strong>{cat.label}</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Cette estimation est basee sur la formule de Deurenberg (methode IMC)
          avec un age de reference de 30 ans. Pour un resultat personnalise et
          plus precis, utilisez le calculateur interactif avec les mesures de
          tour de taille et de cou (methode US Navy).
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Conseils pratiques
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5">
          <li>
            Calculez vos besoins caloriques avec notre{" "}
            <a href="/calcul-calories" className="text-violet-600 hover:underline font-medium">
              calculateur de calories
            </a>
          </li>
          <li>
            Connaissez votre IMC avec notre{" "}
            <a href="/calcul-imc" className="text-violet-600 hover:underline font-medium">
              calculateur IMC
            </a>
          </li>
          <li>Pesez-vous le matin a jeun pour des mesures coherentes</li>
          <li>Mesurez avec un ruban souple a plat sur la peau (non serre)</li>
        </ul>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-masse-grasse" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
