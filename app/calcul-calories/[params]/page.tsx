import type { Metadata } from "next";
import CalculateurCalories from "../CalculateurCalories";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SEXES = ["homme", "femme"] as const;
const AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60];
const POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const TAILLES = [155, 160, 165, 170, 175, 180, 185, 190];
const ACTIVITES = [
  { slug: "sedentaire", label: "Sedentaire", coefficient: 1.2 },
  { slug: "actif", label: "Moderement actif", coefficient: 1.55 },
  { slug: "sportif", label: "Tres actif", coefficient: 1.725 },
];

function calcMB(sexe: string, poids: number, taille: number, age: number): number {
  return sexe === "homme"
    ? 10 * poids + 6.25 * taille - 5 * age + 5
    : 10 * poids + 6.25 * taille - 5 * age - 161;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

type Slug = {
  sexe: string;
  poids: number;
  taille: number;
  age: number;
  activiteSlug: string;
};

function parseSlug(slug: string): Slug | null {
  // Format: homme-75kg-175cm-30ans-actif
  const match = slug.match(/^(homme|femme)-(\d+)kg-(\d+)cm-(\d+)ans-(sedentaire|actif|sportif)$/);
  if (!match) return null;
  return {
    sexe: match[1],
    poids: parseInt(match[2]),
    taille: parseInt(match[3]),
    age: parseInt(match[4]),
    activiteSlug: match[5],
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  // On genere un sous-ensemble pour eviter trop de pages
  // Combinaisons: 2 sexes x 9 ages x 11 poids x 3 activites = 594 pages (taille fixe par sexe)
  for (const sexe of SEXES) {
    const taillesForSexe = sexe === "homme" ? [170, 175, 180, 185] : [155, 160, 165, 170];
    for (const age of AGES) {
      for (const poids of POIDS) {
        for (const activite of ACTIVITES) {
          for (const taille of taillesForSexe) {
            params.push({ params: `${sexe}-${poids}kg-${taille}cm-${age}ans-${activite.slug}` });
          }
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { sexe, poids, taille, age, activiteSlug } = parsed;
  const activite = ACTIVITES.find((a) => a.slug === activiteSlug)!;
  const mb = calcMB(sexe, poids, taille, age);
  const tdee = mb * activite.coefficient;

  const sexeLabel = sexe === "homme" ? "Homme" : "Femme";

  return {
    title: `Calories ${sexeLabel} ${age} ans, ${poids} kg, ${taille} cm (${activite.label}) = ${fmt(tdee)} kcal/jour`,
    description: `Besoin calorique journalier pour ${sexeLabel === "Homme" ? "un homme" : "une femme"} de ${age} ans, ${poids} kg, ${taille} cm, ${activite.label.toLowerCase()} : ${fmt(tdee)} kcal/jour. Metabolisme de base : ${fmt(mb)} kcal. Objectifs perte et prise de poids.`,
    keywords: `calories ${sexeLabel.toLowerCase()} ${age} ans, besoin calorique ${poids} kg, TDEE ${sexeLabel.toLowerCase()}, calories par jour ${age} ans ${poids} kg`,
    openGraph: {
      title: `${sexeLabel} ${age} ans / ${poids} kg / ${taille} cm = ${fmt(tdee)} kcal/jour`,
      description: `TDEE : ${fmt(tdee)} kcal/jour. MB : ${fmt(mb)} kcal. ${activite.label}.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { sexe, poids, taille, age, activiteSlug } = parsed;
  if (!SEXES.includes(sexe as "homme" | "femme") || !POIDS.includes(poids) || !TAILLES.includes(taille) || !AGES.includes(age)) notFound();

  const activite = ACTIVITES.find((a) => a.slug === activiteSlug);
  if (!activite) notFound();

  const mb = calcMB(sexe, poids, taille, age);
  const tdee = mb * activite.coefficient;
  const perteLente = tdee - 250;
  const perteRapide = tdee - 500;
  const priseLente = tdee + 250;
  const priseRapide = tdee + 500;

  const proteines = poids * 1.8;
  const lipides = (tdee * 0.3) / 9;
  const glucides = (tdee - proteines * 4 - lipides * 9) / 4;

  const sexeLabel = sexe === "homme" ? "Homme" : "Femme";
  const sexeArticle = sexe === "homme" ? "un homme" : "une femme";

  // Comparaison par age
  const comparaisonAge = AGES.map((a) => {
    const mbVal = calcMB(sexe, poids, taille, a);
    const tdeeVal = mbVal * activite.coefficient;
    return { age: a, mb: mbVal, tdee: tdeeVal, isCurrent: a === age };
  });

  // Comparaison par poids
  const comparaisonPoids = POIDS.map((p) => {
    const mbVal = calcMB(sexe, p, taille, age);
    const tdeeVal = mbVal * activite.coefficient;
    return { poids: p, mb: mbVal, tdee: tdeeVal, isCurrent: p === poids };
  });

  // Comparaison par activite
  const comparaisonActivite = ACTIVITES.map((act) => {
    const tdeeVal = mb * act.coefficient;
    return { label: act.label, slug: act.slug, tdee: tdeeVal, isCurrent: act.slug === activiteSlug };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de calories par jour pour ${sexeArticle} de ${age} ans pesant ${poids} kg ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${sexeArticle} de ${age} ans, ${poids} kg, ${taille} cm et ${activite.label.toLowerCase()}, le besoin calorique journalier est de ${fmt(tdee)} kcal. Le metabolisme de base est de ${fmt(mb)} kcal.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de calories pour maigrir a ${poids} kg ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour perdre du poids a ${poids} kg, visez ${fmt(perteRapide)} kcal/jour (perte rapide, -0,5 kg/sem) ou ${fmt(perteLente)} kcal/jour (perte lente, -0,25 kg/sem). Ne descendez pas en dessous de ${sexe === "homme" ? "1 500" : "1 200"} kcal/jour.`,
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
        currentPage={`${sexeLabel} ${age} ans, ${poids} kg`}
        parentPage="Calcul Calories"
        parentHref="/calcul-calories"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔥
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calories : {sexeLabel} {age} ans, {poids} kg
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Besoin calorique journalier pour {sexeArticle} de {age} ans, {poids} kg, {taille} cm — {activite.label.toLowerCase()}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Besoin calorique journalier (TDEE)</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(tdee)} kcal</p>
        <p className="text-lg font-medium mt-1">{activite.label}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Sexe</p>
            <p className="font-semibold">{sexeLabel}</p>
          </div>
          <div>
            <p className="text-white/70">Age</p>
            <p className="font-semibold">{age} ans</p>
          </div>
          <div>
            <p className="text-white/70">Poids</p>
            <p className="font-semibold">{poids} kg</p>
          </div>
          <div>
            <p className="text-white/70">Taille</p>
            <p className="font-semibold">{taille} cm</p>
          </div>
        </div>
      </div>

      {/* Objectifs + Macros cote a cote */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Objectifs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Objectifs caloriques</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-red-600">Perte rapide</p>
                <p className="text-xs text-slate-400">-500 kcal/j</p>
              </div>
              <p className="text-lg font-extrabold text-red-600">{fmt(perteRapide)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-orange-600">Perte lente</p>
                <p className="text-xs text-slate-400">-250 kcal/j</p>
              </div>
              <p className="text-lg font-extrabold text-orange-600">{fmt(perteLente)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center bg-green-50/50 -mx-2 px-2 py-1 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-green-700">Maintien</p>
              </div>
              <p className="text-lg font-extrabold text-green-700">{fmt(tdee)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-blue-600">Prise lente</p>
                <p className="text-xs text-slate-400">+250 kcal/j</p>
              </div>
              <p className="text-lg font-extrabold text-blue-600">{fmt(priseLente)}</p>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-purple-600">Prise rapide</p>
                <p className="text-xs text-slate-400">+500 kcal/j</p>
              </div>
              <p className="text-lg font-extrabold text-purple-600">{fmt(priseRapide)}</p>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Macronutriments (maintien)</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-blue-700">Proteines (1,8g/kg)</span>
                <span className="font-bold text-blue-700">{Math.round(proteines)}g</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(((proteines * 4) / tdee) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{Math.round((proteines * 4 / tdee) * 100)}% — {Math.round(proteines * 4)} kcal</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-amber-700">Lipides (30%)</span>
                <span className="font-bold text-amber-700">{Math.round(lipides)}g</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "30%" }} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">30% — {Math.round(lipides * 9)} kcal</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-green-700">Glucides (reste)</span>
                <span className="font-bold text-green-700">{Math.round(glucides)}g</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(((glucides * 4) / tdee) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{Math.round((glucides * 4 / tdee) * 100)}% — {Math.round(glucides * 4)} kcal</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">Metabolisme de base : <strong className="text-slate-600">{fmt(mb)} kcal</strong></p>
            <p className="text-xs text-slate-400">Coefficient activite : <strong className="text-slate-600">x {activite.coefficient}</strong></p>
          </div>
        </div>
      </div>

      {/* Comparaison par activite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          TDEE selon le niveau d&apos;activite ({sexeLabel}, {age} ans, {poids} kg)
        </h2>
        <div className="space-y-2">
          {comparaisonActivite.map((row) => (
            <div key={row.slug} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${row.isCurrent ? "bg-green-50 border-green-300" : "border-slate-100"}`}>
              <span className={`font-semibold text-sm ${row.isCurrent ? "text-green-700" : "text-slate-600"}`}>{row.label}</span>
              <span className={`font-extrabold ${row.isCurrent ? "text-green-700" : "text-slate-700"}`}>{fmt(row.tdee)} kcal</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparaison par age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          TDEE selon l&apos;age ({sexeLabel}, {poids} kg, {activite.label.toLowerCase()})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">MB</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">TDEE</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAge.map((row) => (
                <tr key={row.age} className={`border-b border-slate-100 ${row.isCurrent ? "bg-green-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-green-600">{row.age} ans</span>
                    ) : (
                      <a href={`/calcul-calories/${sexe}-${poids}kg-${taille}cm-${row.age}ans-${activiteSlug}`} className="text-slate-700 hover:text-green-600 transition-colors">
                        {row.age} ans
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-green-600" : "text-slate-500"}`}>{fmt(row.mb)}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-green-600" : "text-slate-700"}`}>{fmt(row.tdee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par poids */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          TDEE selon le poids ({sexeLabel}, {age} ans, {activite.label.toLowerCase()})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">MB</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">TDEE</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPoids.map((row) => (
                <tr key={row.poids} className={`border-b border-slate-100 ${row.isCurrent ? "bg-green-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-green-600">{row.poids} kg</span>
                    ) : (
                      <a href={`/calcul-calories/${sexe}-${row.poids}kg-${taille}cm-${age}ans-${activiteSlug}`} className="text-slate-700 hover:text-green-600 transition-colors">
                        {row.poids} kg
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-green-600" : "text-slate-500"}`}>{fmt(row.mb)}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-green-600" : "text-slate-700"}`}>{fmt(row.tdee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurCalories />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {fmt(tdee)} calories par jour : qu&apos;est-ce que ca veut dire ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour {sexeArticle} de <strong>{age} ans</strong>, pesant <strong>{poids} kg</strong> et mesurant{" "}
          <strong>{taille} cm</strong>, avec un mode de vie <strong>{activite.label.toLowerCase()}</strong>,
          le besoin calorique journalier est de <strong>{fmt(tdee)} kcal</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le metabolisme de base est de <strong>{fmt(mb)} kcal</strong> (calories brulees au repos),
          multiplie par le coefficient d&apos;activite de <strong>{activite.coefficient}</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>perdre du poids</strong>, visez {fmt(perteRapide)} a {fmt(perteLente)} kcal/jour.
          Pour <strong>prendre du poids</strong>, visez {fmt(priseLente)} a {fmt(priseRapide)} kcal/jour.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Vous pouvez aussi <a href="/calcul-imc" className="text-blue-600 hover:underline font-medium">calculer votre IMC</a> pour
          verifier si votre poids actuel est adapte a votre taille.
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres profils</h2>
        <div className="flex flex-wrap gap-2">
          {AGES.filter((a) => a !== age).slice(0, 4).map((a) => (
            <a
              key={`a-${a}`}
              href={`/calcul-calories/${sexe}-${poids}kg-${taille}cm-${a}ans-${activiteSlug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50/50 transition-all"
            >
              {sexeLabel} {a} ans, {poids} kg
            </a>
          ))}
          {POIDS.filter((p) => p !== poids).slice(0, 4).map((p) => (
            <a
              key={`p-${p}`}
              href={`/calcul-calories/${sexe}-${p}kg-${taille}cm-${age}ans-${activiteSlug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50/50 transition-all"
            >
              {sexeLabel} {age} ans, {p} kg
            </a>
          ))}
          <a
            href={`/calcul-calories/${sexe === "homme" ? "femme" : "homme"}-${poids}kg-${taille}cm-${age}ans-${activiteSlug}`}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50/50 transition-all"
          >
            {sexe === "homme" ? "Femme" : "Homme"} {age} ans, {poids} kg
          </a>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-calories" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
