import type { Metadata } from "next";
import CalculateurIMC from "../CalculateurIMC";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120];
const TAILLES = [155, 160, 165, 170, 175, 180, 185, 190];

interface CategorieIMC {
  label: string;
  min: number;
  max: number;
  couleur: string;
  bgGradient: string;
}

const CATEGORIES: CategorieIMC[] = [
  { label: "Maigreur", min: 0, max: 18.5, couleur: "text-blue-600", bgGradient: "from-blue-500 to-cyan-500" },
  { label: "Poids normal", min: 18.5, max: 25, couleur: "text-emerald-600", bgGradient: "from-emerald-500 to-green-500" },
  { label: "Surpoids", min: 25, max: 30, couleur: "text-amber-600", bgGradient: "from-amber-500 to-yellow-500" },
  { label: "Obesite moderee", min: 30, max: 35, couleur: "text-orange-600", bgGradient: "from-orange-500 to-amber-600" },
  { label: "Obesite severe", min: 35, max: 40, couleur: "text-red-600", bgGradient: "from-red-500 to-rose-500" },
  { label: "Obesite morbide", min: 40, max: 100, couleur: "text-red-800", bgGradient: "from-red-700 to-red-500" },
];

function getCategorie(imc: number): CategorieIMC {
  return CATEGORIES.find((c) => imc >= c.min && imc < c.max) || CATEGORIES[CATEGORIES.length - 1];
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function parseSlug(slug: string): { poids: number; taille: number } | null {
  const match = slug.match(/^(\d+)-kg-(\d+)-cm$/);
  if (!match) return null;
  return { poids: parseInt(match[1]), taille: parseInt(match[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const p of POIDS) {
    for (const t of TAILLES) {
      params.push({ params: `${p}-kg-${t}-cm` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { poids, taille } = parsed;
  const tailleM = taille / 100;
  const imc = poids / (tailleM * tailleM);
  const categorie = getCategorie(imc);
  const poidsIdealBas = 18.5 * tailleM * tailleM;
  const poidsIdealHaut = 25 * tailleM * tailleM;

  return {
    alternates: { canonical: `/calcul-imc/${slug}` },
    title: `IMC ${poids} kg pour ${taille} cm = ${fmt(imc)} - ${categorie.label}`,
    description: `Calcul IMC pour ${poids} kg et ${taille} cm : IMC de ${fmt(imc)} (${categorie.label}). Poids ideal pour ${taille} cm : ${fmt(poidsIdealBas)} a ${fmt(poidsIdealHaut)} kg. Classification OMS 2026.`,
    keywords: `IMC ${poids} kg ${taille} cm, calcul IMC ${poids} kg, IMC ${taille} cm, poids ideal ${taille} cm`,
    openGraph: {
      title: `${poids} kg / ${taille} cm = IMC ${fmt(imc)} (${categorie.label})`,
      description: `IMC de ${fmt(imc)} pour ${poids} kg et ${taille} cm. Classification : ${categorie.label}. Poids ideal : ${fmt(poidsIdealBas)}-${fmt(poidsIdealHaut)} kg.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { poids, taille } = parsed;
  if (!POIDS.includes(poids) || !TAILLES.includes(taille)) notFound();

  const tailleM = taille / 100;
  const imc = poids / (tailleM * tailleM);
  const categorie = getCategorie(imc);
  const poidsIdealBas = 18.5 * tailleM * tailleM;
  const poidsIdealHaut = 25 * tailleM * tailleM;

  // Comparaison par poids pour cette taille
  const comparaisonPoids = POIDS.map((p) => {
    const imcVal = p / (tailleM * tailleM);
    const cat = getCategorie(imcVal);
    return { poids: p, imc: imcVal, categorie: cat.label, couleur: cat.couleur, isCurrent: p === poids };
  });

  // Comparaison par taille pour ce poids
  const comparaisonTailles = TAILLES.map((t) => {
    const tM = t / 100;
    const imcVal = poids / (tM * tM);
    const cat = getCategorie(imcVal);
    return { taille: t, imc: imcVal, categorie: cat.label, couleur: cat.couleur, isCurrent: t === taille };
  });

  const jaugePosition = Math.min((imc / 50) * 100, 100);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est l'IMC pour ${poids} kg et ${taille} cm ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une personne de ${poids} kg mesurant ${taille} cm, l'IMC est de ${fmt(imc)}. Cela correspond a la categorie "${categorie.label}" selon la classification OMS. Le poids ideal pour ${taille} cm se situe entre ${fmt(poidsIdealBas)} kg et ${fmt(poidsIdealHaut)} kg.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le poids ideal pour ${taille} cm ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une taille de ${taille} cm, le poids ideal (IMC normal entre 18,5 et 25) se situe entre ${fmt(poidsIdealBas)} kg et ${fmt(poidsIdealHaut)} kg.`,
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
        currentPage={`${poids} kg - ${taille} cm`}
        parentPage="Calcul IMC"
        parentHref="/calcul-imc"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          IMC : {poids} kg pour {taille} cm
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Resultat IMC pour une personne de {poids} kg mesurant {taille} cm — classification OMS.
      </p>

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${categorie.bgGradient} text-white rounded-2xl p-8 shadow-lg mb-8`}>
        <p className="text-white/80 mb-1">Votre IMC</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(imc)}</p>
        <p className="text-xl font-bold mt-2">{categorie.label}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/70">Poids</p>
            <p className="font-semibold">{poids} kg</p>
          </div>
          <div>
            <p className="text-white/70">Taille</p>
            <p className="font-semibold">{taille} cm</p>
          </div>
          <div>
            <p className="text-white/70">Poids ideal</p>
            <p className="font-semibold">{fmt(poidsIdealBas)}-{fmt(poidsIdealHaut)} kg</p>
          </div>
        </div>
      </div>

      {/* Jauge */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <p className="text-xs font-medium text-slate-400 mb-3">Echelle IMC</p>
        <div className="relative">
          <div className="flex h-4 rounded-full overflow-hidden">
            <div className="bg-blue-400 flex-1" />
            <div className="bg-emerald-400 flex-[2.6]" />
            <div className="bg-amber-400 flex-[2]" />
            <div className="bg-orange-400 flex-[2]" />
            <div className="bg-red-400 flex-[2]" />
            <div className="bg-red-700 flex-[4]" />
          </div>
          <div
            className="absolute top-0 -mt-1 transition-all duration-500"
            style={{ left: `${jaugePosition}%` }}
          >
            <div className="w-0.5 h-6 bg-slate-800 mx-auto" />
            <div className="text-xs font-bold text-slate-800 -ml-3 mt-0.5">{fmt(imc)}</div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-5">
            <span>16</span>
            <span>18,5</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40+</span>
          </div>
        </div>
      </div>

      {/* Classification OMS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Classification OMS</h2>
        <div className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <div
              key={c.label}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm ${
                categorie.label === c.label
                  ? `border-2 font-bold ${c.couleur}`
                  : "border-transparent text-slate-400"
              }`}
            >
              <span>{c.label}</span>
              <span className="text-xs">
                {c.min === 0 ? `< ${c.max}` : c.max === 100 ? `>= ${c.min}` : `${c.min} - ${c.max}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparaison par poids */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          IMC pour {taille} cm selon le poids
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">IMC</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Classification</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPoids.map((row) => (
                <tr key={row.poids} className={`border-b border-slate-100 ${row.isCurrent ? "bg-rose-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-rose-600">{row.poids} kg</span>
                    ) : (
                      <a href={`/calcul-imc/${row.poids}-kg-${taille}-cm`} className="text-slate-700 hover:text-rose-600 transition-colors">
                        {row.poids} kg
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-rose-600" : "text-slate-700"}`}>
                    {fmt(row.imc)}
                  </td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.couleur}`}>{row.categorie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par taille */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          IMC pour {poids} kg selon la taille
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Taille</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">IMC</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Classification</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonTailles.map((row) => (
                <tr key={row.taille} className={`border-b border-slate-100 ${row.isCurrent ? "bg-rose-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-rose-600">{row.taille} cm</span>
                    ) : (
                      <a href={`/calcul-imc/${poids}-kg-${row.taille}-cm`} className="text-slate-700 hover:text-rose-600 transition-colors">
                        {row.taille} cm
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-rose-600" : "text-slate-700"}`}>
                    {fmt(row.imc)}
                  </td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.couleur}`}>{row.categorie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurIMC />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          IMC de {fmt(imc)} : qu&apos;est-ce que ca veut dire ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour une personne pesant <strong>{poids} kg</strong> et mesurant <strong>{taille} cm</strong>,
          l&apos;IMC est de <strong>{fmt(imc)}</strong>, ce qui correspond a la categorie
          &quot;<strong>{categorie.label}</strong>&quot; selon la classification de l&apos;OMS.
          Le poids ideal pour {taille} cm se situe entre <strong>{fmt(poidsIdealBas)} kg</strong> et{" "}
          <strong>{fmt(poidsIdealHaut)} kg</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;IMC se calcule avec la formule : <strong>poids (kg) / taille (m)&sup2;</strong>.
          Soit {poids} / ({tailleM} x {tailleM}) = {fmt(imc)}.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Limites de l&apos;IMC</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Ne distingue pas masse grasse et masse musculaire</li>
          <li>Non adapte aux sportifs, femmes enceintes et personnes agees</li>
          <li>Ne prend pas en compte la repartition des graisses</li>
          <li>Consultez un medecin pour un bilan personnalise</li>
        </ul>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres calculs IMC</h2>
        <div className="flex flex-wrap gap-2">
          {POIDS.filter((p) => p !== poids).slice(0, 6).map((p) => (
            <a
              key={`p-${p}`}
              href={`/calcul-imc/${p}-kg-${taille}-cm`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50 transition-all"
            >
              {p} kg / {taille} cm
            </a>
          ))}
          {TAILLES.filter((t) => t !== taille).slice(0, 4).map((t) => (
            <a
              key={`t-${t}`}
              href={`/calcul-imc/${poids}-kg-${t}-cm`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50 transition-all"
            >
              {poids} kg / {t} cm
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-imc" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
