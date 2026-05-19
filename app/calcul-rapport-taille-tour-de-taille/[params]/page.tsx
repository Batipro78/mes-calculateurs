import type { Metadata } from "next";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calculerWthr, fmt, type Sexe } from "../wthrCalc";
import { notFound } from "next/navigation";

// Données pour générer les pages statiques
const TOURS_TAILLE_HOMMES = [80, 85, 90, 95, 100, 105];
const TOURS_TAILLE_FEMMES = [65, 70, 75, 80, 85, 90];
const TAILLES = [160, 165, 170, 175, 180, 185];
const RATIOS = ["0-43", "0-48", "0-50", "0-55", "0-60"];

const QUESTIONS_SLUG = [
  "wthr-vs-imc",
  "regle-or-oms-0-5",
  "graisse-viscerale-mesure",
  "risque-cardiovasculaire-wthr",
];

interface CategorieWthr {
  niveau: string;
  couleur: string;
  bg: string;
}

const CATEGORIES_HOMME: CategorieWthr[] = [
  { niveau: "Sous-poids", couleur: "text-blue-600", bg: "from-blue-500 to-cyan-500" },
  { niveau: "Sain", couleur: "text-emerald-600", bg: "from-emerald-500 to-green-500" },
  { niveau: "Surpoids", couleur: "text-amber-600", bg: "from-amber-500 to-yellow-500" },
  { niveau: "Obésité", couleur: "text-orange-600", bg: "from-orange-500 to-amber-600" },
  { niveau: "Obésité morbide", couleur: "text-red-800", bg: "from-red-700 to-red-500" },
];

const CATEGORIES_FEMME: CategorieWthr[] = [
  { niveau: "Sous-poids", couleur: "text-blue-600", bg: "from-blue-500 to-cyan-500" },
  { niveau: "Sain", couleur: "text-emerald-600", bg: "from-emerald-500 to-green-500" },
  { niveau: "Surpoids", couleur: "text-amber-600", bg: "from-amber-500 to-yellow-500" },
  { niveau: "Obésité", couleur: "text-orange-600", bg: "from-orange-500 to-amber-600" },
  { niveau: "Obésité morbide", couleur: "text-red-800", bg: "from-red-700 to-red-500" },
];

function parseSlug(slug: string): {
  type: "combo" | "ratio" | "question";
  tour?: number;
  taille?: number;
  sexe?: Sexe;
  ratio?: string;
  question?: string;
} | null {
  // Format: homme-85cm-175cm ou femme-70cm-165cm
  const comboMatch = slug.match(/^(homme|femme)-(\d+)cm-(\d+)cm$/);
  if (comboMatch) {
    return {
      type: "combo",
      sexe: comboMatch[1] as Sexe,
      tour: parseInt(comboMatch[2]),
      taille: parseInt(comboMatch[3]),
    };
  }

  // Format: wthr-0-50 (ratio)
  const ratioMatch = slug.match(/^wthr-([\d-]+)$/);
  if (ratioMatch) {
    return {
      type: "ratio",
      ratio: ratioMatch[1],
    };
  }

  // Format: wthr-vs-imc, regle-or-oms-0-5, etc.
  if (QUESTIONS_SLUG.includes(slug)) {
    return {
      type: "question",
      question: slug,
    };
  }

  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  // Combos hommes
  for (const tour of TOURS_TAILLE_HOMMES) {
    for (const taille of TAILLES) {
      params.push({ params: `homme-${tour}cm-${taille}cm` });
    }
  }

  // Combos femmes
  for (const tour of TOURS_TAILLE_FEMMES) {
    for (const taille of TAILLES) {
      params.push({ params: `femme-${tour}cm-${taille}cm` });
    }
  }

  // Ratios
  for (const ratio of RATIOS) {
    params.push({ params: `wthr-${ratio}` });
  }

  // Questions
  for (const question of QUESTIONS_SLUG) {
    params.push({ params: question });
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

  if (parsed.type === "combo" && parsed.tour && parsed.taille && parsed.sexe) {
    const resultat = calculerWthr(parsed.tour, parsed.taille, parsed.sexe);
    const genre = parsed.sexe === "homme" ? "Homme" : "Femme";
    return {
      alternates: { canonical: `/calcul-rapport-taille-tour-de-taille/${slug}` },
      title: `WtHR ${genre} ${parsed.tour}cm/${parsed.taille}cm = ${fmt(resultat.wthr)} - ${resultat.niveau}`,
      description: `Calcul WtHR pour ${genre} : tour de taille ${parsed.tour}cm, taille ${parsed.taille}cm = ratio ${fmt(resultat.wthr)} (${resultat.niveau}). Risque cardiovasculaire : ${resultat.risqueCardio}.`,
      keywords: `WtHR ${parsed.tour}cm ${parsed.taille}cm, rapport taille tour de taille, ${genre.toLowerCase()} ${parsed.tour}cm`,
    };
  }

  if (parsed.type === "ratio" && parsed.ratio) {
    return {
      alternates: {
        canonical: `/calcul-rapport-taille-tour-de-taille/wthr-${parsed.ratio}`,
      },
      title: `WtHR ${parsed.ratio.replace("-", ".")} - Interprétation et risque cardio`,
      description: `Comprendre un WtHR de ${parsed.ratio.replace("-", ".")} : classification, risque cardiovasculaire, comparaison à la règle d'or OMS 0.5.`,
    };
  }

  if (parsed.type === "question" && parsed.question) {
    const titres: Record<string, string> = {
      "wthr-vs-imc": "WtHR vs IMC : lequel choisir pour votre santé ?",
      "regle-or-oms-0-5": "Règle d'or OMS : pourquoi 0.5 est le seuil idéal",
      "graisse-viscerale-mesure": "Graisse viscérale : comment la mesurer et la réduire",
      "risque-cardiovasculaire-wthr": "Risque cardiovasculaire et WtHR : ce qu'il faut savoir",
    };
    return {
      alternates: {
        canonical: `/calcul-rapport-taille-tour-de-taille/${parsed.question}`,
      },
      title: titres[parsed.question] || "Calcul WtHR",
    };
  }

  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  // ========== COMBO: homme-85cm-175cm ==========
  if (parsed.type === "combo" && parsed.tour && parsed.taille && parsed.sexe) {
    const resultat = calculerWthr(parsed.tour, parsed.taille, parsed.sexe);
    const genre = parsed.sexe === "homme" ? "Homme" : "Femme";
    const categories = parsed.sexe === "homme" ? CATEGORIES_HOMME : CATEGORIES_FEMME;
    const categorie =
      categories.find((c) => c.niveau === resultat.niveau) || categories[1];

    // Comparaison: même tour, tailles différentes
    const comparaisonTailles = TAILLES.map((t) => {
      const res = calculerWthr(parsed.tour!, t, parsed.sexe!);
      return {
        taille: t,
        wthr: res.wthr,
        niveau: res.niveau,
        couleur: res.niveauCouleur,
        isCurrent: t === parsed.taille,
      };
    });

    // Comparaison: même taille, tours différents
    const tours = parsed.sexe === "homme" ? TOURS_TAILLE_HOMMES : TOURS_TAILLE_FEMMES;
    const comparaisonTours = tours.map((tour) => {
      const res = calculerWthr(tour, parsed.taille!, parsed.sexe!);
      return {
        tour,
        wthr: res.wthr,
        niveau: res.niveau,
        couleur: res.niveauCouleur,
        isCurrent: tour === parsed.tour,
      };
    });

    const jaugePosition = Math.min((resultat.wthr / 0.7) * 100, 100);
    const regleDorPosition = (0.5 / 0.7) * 100;

    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `Quel est le WtHR pour une personne de ${parsed.tour}cm de tour de taille et ${parsed.taille}cm de taille ?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Pour un ${genre.toLowerCase()} avec un tour de taille de ${parsed.tour}cm et une taille de ${parsed.taille}cm, le WtHR est ${fmt(resultat.wthr)} (${resultat.niveau}). Le risque cardiovasculaire est ${resultat.risqueCardio}.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `Quelle est la règle d'or OMS pour cette taille (${parsed.taille}cm) ?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `La règle d'or OMS recommande un tour de taille ≤ ${Math.round(parsed.taille! / 2)}cm (moitié de la taille). Vous avez ${parsed.tour}cm ${
                      parsed.tour <= parsed.taille! / 2
                        ? "(✓ conforme)"
                        : `(⚠ ${parsed.tour - Math.round(parsed.taille! / 2)}cm au-dessus)`
                    }.`,
                  },
                },
              ],
            }),
          }}
        />
        <Breadcrumb
          currentPage={`${genre} ${parsed.tour}cm - ${parsed.taille}cm`}
          parentPage="Calcul WtHR"
          parentHref="/calcul-rapport-taille-tour-de-taille"
        />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
            ❤️
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            WtHR : {genre} {parsed.tour}cm / {parsed.taille}cm
          </h1>
        </div>
        <p className="text-slate-500 mb-8 ml-[52px]">
          Résultat WtHR pour un {genre.toLowerCase()} avec tour de taille{" "}
          {parsed.tour}cm et taille {parsed.taille}cm.
        </p>

        {/* Résultat principal */}
        <div className={`bg-gradient-to-br ${categorie.bg} text-white rounded-2xl p-8 shadow-lg mb-8`}>
          <p className="text-white/80 mb-1">WtHR</p>
          <p className="text-5xl font-extrabold tracking-tight">{fmt(resultat.wthr)}</p>
          <p className="text-xl font-bold mt-2">{resultat.niveau}</p>
          <div className="h-px bg-white/20 my-4" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-white/70">Tour de taille</p>
              <p className="font-semibold">{parsed.tour} cm</p>
            </div>
            <div>
              <p className="text-white/70">Taille</p>
              <p className="font-semibold">{parsed.taille} cm</p>
            </div>
            <div>
              <p className="text-white/70">Risque cardio</p>
              <p className="font-semibold">{resultat.risqueCardio}</p>
            </div>
          </div>
        </div>

        {/* Jauge */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <p className="text-xs font-medium text-slate-400 mb-3">Échelle WtHR</p>
          <div className="relative">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="bg-blue-400 flex-1" />
              <div className="bg-emerald-400 flex-1" />
              <div className="bg-amber-400 flex-1" />
              <div className="bg-orange-400 flex-1" />
              <div className="bg-red-400 flex-1" />
              <div className="bg-red-700 flex-1" />
            </div>
            <div
              className="absolute top-0 -mt-1"
              style={{ left: `${jaugePosition}%` }}
            >
              <div className="w-1 h-6 bg-slate-800 mx-auto" />
              <div className="text-xs font-bold text-slate-800 -ml-3 mt-0.5 whitespace-nowrap">
                {fmt(resultat.wthr)}
              </div>
            </div>
            <div
              className="absolute top-0 -mt-2 opacity-50"
              style={{ left: `${regleDorPosition}%` }}
            >
              <div className="text-xs text-emerald-600 font-semibold -ml-4">
                0.5
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-6">
              <span>0.3</span>
              <span>0.42-0.48</span>
              <span>0.5 OMS</span>
              <span>0.58</span>
              <span>0.65</span>
              <span>0.7+</span>
            </div>
          </div>
        </div>

        {/* Comparaison tours */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            WtHR pour {parsed.taille}cm selon le tour de taille
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Tour de taille
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    WtHR
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Classification
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparaisonTours.map((row) => (
                  <tr
                    key={row.tour}
                    className={`border-b border-slate-100 ${
                      row.isCurrent ? "bg-rose-50/50" : ""
                    }`}
                  >
                    <td className="py-2.5 px-2">
                      {row.isCurrent ? (
                        <span className="font-bold text-rose-600">{row.tour} cm</span>
                      ) : (
                        <a
                          href={`/calcul-rapport-taille-tour-de-taille/${parsed.sexe}-${row.tour}cm-${parsed.taille}cm`}
                          className="text-slate-700 hover:text-rose-600 transition-colors"
                        >
                          {row.tour} cm
                        </a>
                      )}
                    </td>
                    <td
                      className={`py-2.5 px-2 text-right font-bold ${
                        row.isCurrent ? "text-rose-600" : "text-slate-700"
                      }`}
                    >
                      {fmt(row.wthr)}
                    </td>
                    <td className={`py-2.5 px-2 text-right text-sm ${row.couleur}`}>
                      {row.niveau}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparaison tailles */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            WtHR pour {parsed.tour}cm de tour selon la taille
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Taille
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    WtHR
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Classification
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparaisonTailles.map((row) => (
                  <tr
                    key={row.taille}
                    className={`border-b border-slate-100 ${
                      row.isCurrent ? "bg-rose-50/50" : ""
                    }`}
                  >
                    <td className="py-2.5 px-2">
                      {row.isCurrent ? (
                        <span className="font-bold text-rose-600">{row.taille} cm</span>
                      ) : (
                        <a
                          href={`/calcul-rapport-taille-tour-de-taille/${parsed.sexe}-${parsed.tour}cm-${row.taille}cm`}
                          className="text-slate-700 hover:text-rose-600 transition-colors"
                        >
                          {row.taille} cm
                        </a>
                      )}
                    </td>
                    <td
                      className={`py-2.5 px-2 text-right font-bold ${
                        row.isCurrent ? "text-rose-600" : "text-slate-700"
                      }`}
                    >
                      {fmt(row.wthr)}
                    </td>
                    <td className={`py-2.5 px-2 text-right text-sm ${row.couleur}`}>
                      {row.niveau}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

        {/* Interprétation */}
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Interprétation : WtHR de {fmt(resultat.wthr)}
          </h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Pour un {genre.toLowerCase()} avec un tour de taille de{" "}
            <strong>{parsed.tour}cm</strong> et une taille de{" "}
            <strong>{parsed.taille}cm</strong>, le WtHR est{" "}
            <strong>{fmt(resultat.wthr)}</strong>, ce qui correspond à{" "}
            <strong>{resultat.niveau}</strong> selon les critères NHS UK 2022.
          </p>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Risque cardiovasculaire : <strong>{resultat.risqueCardio}</strong>.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <p className="font-bold text-emerald-700 mb-2">Règle d&apos;or OMS</p>
              <p className="text-sm text-emerald-600">
                WtHR ≤ 0.5 (tour de taille ≤ {Math.round(parsed.taille / 2)}cm pour cette taille)
              </p>
              <p className="text-xs mt-2 text-emerald-500">
                {parsed.tour <= parsed.taille / 2
                  ? "✓ Vous êtes conforme"
                  : `⚠ Vous dépassez de ${parsed.tour - Math.round(parsed.taille / 2)}cm`}
              </p>
            </div>
            <div className={`${
              resultat.wthr < 0.5 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
            } rounded-lg p-4 border`}>
              <p className={`font-bold mb-2 ${
                resultat.wthr < 0.5 ? "text-emerald-700" : "text-amber-700"
              }`}>
                {resultat.wthr < 0.5 ? "✓ Sain" : "⚠ À surveiller"}
              </p>
              <p className={`text-sm ${
                resultat.wthr < 0.5 ? "text-emerald-600" : "text-amber-600"
              }`}>
                {resultat.wthr < 0.5
                  ? "Votre risque cardiovasculaire est faible."
                  : "Envisagez des mesures de prévention (activité physique, alimentation)."}
              </p>
            </div>
          </div>
        </section>

        <RelatedCalculators currentSlug="/calcul-rapport-taille-tour-de-taille" />
        <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
      </div>
    );
  }

  // ========== RATIO: wthr-0-50 ==========
  if (parsed.type === "ratio") {
    const ratio = parsed.ratio!.replace("-", ".");
    const ratioNum = parseFloat(ratio);
    return (
      <div>
        <Breadcrumb
          currentPage={`WtHR ${ratio}`}
          parentPage="Calcul WtHR"
          parentHref="/calcul-rapport-taille-tour-de-taille"
        />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
          WtHR de {ratio} : Interprétation
        </h1>
        <p className="text-slate-500 mb-8">
          Comprendre ce que signifie un rapport taille/tour de taille de {ratio}.
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <p className="text-slate-600 leading-relaxed mb-4">
            Un WtHR de <strong>{ratio}</strong> indique{" "}
            {ratioNum <= 0.5
              ? "un risque faible de problèmes cardiovasculaires. Vous êtes conforme à la règle d'or OMS (≤ 0.5)."
              : `un risque augmenté de problèmes cardiovasculaires. Vous dépassez la règle d'or OMS (0.5 recommandé).`}
          </p>
          <p className="text-slate-600">
            Exemples de combinaisons correspondant à WtHR {ratio} :
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-3 space-y-1">
            {[160, 170, 180].map((h) => {
              const tourCalcule = Math.round(h * ratioNum);
              return (
                <li key={h}>
                  {tourCalcule}cm de tour pour {h}cm de taille
                </li>
              );
            })}
          </ul>
        </div>

        <RelatedCalculators currentSlug="/calcul-rapport-taille-tour-de-taille" />
      </div>
    );
  }

  // ========== QUESTION: wthr-vs-imc, etc. ==========
  if (parsed.type === "question") {
    const titres: Record<string, { titre: string; contenu: string }> = {
      "wthr-vs-imc": {
        titre: "WtHR vs IMC : lequel choisir ?",
        contenu:
          "Le WtHR (rapport taille/tour de taille) mesure la distribution des graisses, tandis que l'IMC se base uniquement sur le poids. Pour une évaluation complète, utilisez les deux : IMC pour le poids global, WtHR pour la santé cardiovasculaire.",
      },
      "regle-or-oms-0-5": {
        titre: "Règle d'or OMS : tour de taille ≤ moitié de la taille",
        contenu:
          "L'OMS recommande un WtHR ≤ 0.5 car c'est un seuil simple, universel et validé par la science. Une personne de 170cm devrait avoir un tour de taille ≤ 85cm.",
      },
      "graisse-viscerale-mesure": {
        titre: "Graisse viscérale : comment la mesurer et la réduire",
        contenu:
          "Le tour de taille mesure indirectement la graisse viscérale. Pour la réduire : activité physique régulière, alimentation équilibrée riche en fibres, réduction du stress. Consultez un professionnel de santé.",
      },
      "risque-cardiovasculaire-wthr": {
        titre: "Risque cardiovasculaire et WtHR : ce qu'il faut savoir",
        contenu:
          "Un WtHR élevé augmente le risque d'hypertension, de diabète type 2 et de maladies du cœur. Plus que le poids, c'est la distribution des graisses (viscérale vs sous-cutanée) qui compte.",
      },
    };

    const page = titres[parsed.question!] || titres["wthr-vs-imc"];

    return (
      <div>
        <Breadcrumb
          currentPage={page.titre}
          parentPage="Calcul WtHR"
          parentHref="/calcul-rapport-taille-tour-de-taille"
        />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8">{page.titre}</h1>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 prose prose-sm max-w-none">
          <p className="text-slate-600 leading-relaxed">{page.contenu}</p>
        </div>
        <RelatedCalculators currentSlug="/calcul-rapport-taille-tour-de-taille" />
      </div>
    );
  }

  notFound();
}
