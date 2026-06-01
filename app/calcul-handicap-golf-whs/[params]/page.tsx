import type { Metadata } from "next";
import CalculHandicapGolfWHS from "../CalculHandicapGolfWHS";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  calculerIndexWHS,
  calculerHandicapJeu,
  type CarteScore,
} from "../golfHandicapCalc";

// ~20 variantes SEO populaires
const VARIANTES = [
  // Index exemples : 5, 10, 15, 18, 20, 24, 28, 36
  "index-5",
  "index-10",
  "index-15",
  "index-18",
  "index-20",
  "index-24",
  "index-28",
  "index-36",
  // Slope exemples : 100, 113, 125, 135, 145
  "slope-100-parcours-facile",
  "slope-113-parcours-standard",
  "slope-125-parcours-difficile",
  "slope-135-parcours-tres-difficile",
  "slope-145-parcours-extreme",
  // Questions golf
  "handicap-debutant-golf",
  "handicap-amateur-golf",
  "handicap-professionnel-golf",
  "handicap-femme-moyen-golf",
  "combien-cartes-pour-index-whs",
  "formule-differentiel-golf-whs",
  "whs-vs-ancien-systeme",
];

function fmt(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

interface ParsedSlug {
  type: "index" | "slope" | "question";
  indexValue?: number;
  slopeValue?: number;
  question?: string;
}

function parseSlug(slug: string): ParsedSlug | null {
  // index-X patterns
  const indexMatch = slug.match(/^index-(\d+)$/);
  if (indexMatch) {
    return {
      type: "index",
      indexValue: parseFloat(indexMatch[1]),
    };
  }

  // slope-X patterns
  const slopeMatch = slug.match(/^slope-(\d+)/);
  if (slopeMatch) {
    return {
      type: "slope",
      slopeValue: parseFloat(slopeMatch[1]),
    };
  }

  // Question patterns
  if (
    slug === "handicap-debutant-golf" ||
    slug === "handicap-amateur-golf" ||
    slug === "handicap-professionnel-golf" ||
    slug === "handicap-femme-moyen-golf" ||
    slug === "combien-cartes-pour-index-whs" ||
    slug === "formule-differentiel-golf-whs" ||
    slug === "whs-vs-ancien-systeme"
  ) {
    return {
      type: "question",
      question: slug,
    };
  }

  return null;
}

export function generateStaticParams() {
  return VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "index" && parsed.indexValue !== undefined) {
    return {
      alternates: { canonical: `/calcul-handicap-golf-whs/${slug}` },
      title: `Handicap golf Index ${parsed.indexValue} - Niveau et progression`,
      description: `Handicap golf Index WHS ${parsed.indexValue} : quel niveau ? Progression, entraînement recommandé. Calcul officiel FFGolf.`,
      keywords: `handicap golf ${parsed.indexValue}, index whs ${parsed.indexValue}, niveau golf`,
    };
  }

  if (parsed.type === "slope" && parsed.slopeValue !== undefined) {
    const difficulte =
      parsed.slopeValue < 110
        ? "facile"
        : parsed.slopeValue < 130
          ? "standard"
          : "difficile";
    return {
      alternates: { canonical: `/calcul-handicap-golf-whs/${slug}` },
      title: `Slope ${parsed.slopeValue} au golf - Parcours ${difficulte}`,
      description: `Slope ${parsed.slopeValue} golf : difficulté ${difficulte}. Comprendre le Rating, l'impact sur le handicap de jeu. Calculateur WHS.`,
      keywords: `slope golf ${parsed.slopeValue}, slope rating, difficulté parcours golf`,
    };
  }

  // Questions
  const questionTitles: Record<string, string> = {
    "handicap-debutant-golf": "Handicap golf débutant - Progression et objectifs",
    "handicap-amateur-golf":
      "Handicap golf amateur - Niveaux et entraînement recommandé",
    "handicap-professionnel-golf": "Handicap golf professionnel - Critères et sélection",
    "handicap-femme-moyen-golf": "Handicap golf femme moyen - Statistiques et comparaison",
    "combien-cartes-pour-index-whs":
      "Combien de cartes pour un Index WHS ? Minimum 3 cartes",
    "formule-differentiel-golf-whs":
      "Formule différentiel golf WHS - Calcul officiel",
    "whs-vs-ancien-systeme": "WHS vs ancien système EDA - Comparaison différences",
  };

  return {
    alternates: { canonical: `/calcul-handicap-golf-whs/${slug}` },
    title: questionTitles[slug] || "Golf WHS",
    description: `Découvrez tout sur le handicap golf WHS, les différentiels, les slopes et le système FFGolf officiel.`,
    keywords: `golf, handicap, whs, index`,
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

  // Scénario Index
  if (parsed.type === "index" && parsed.indexValue !== undefined) {
    const index = parsed.indexValue;

    // Générer 3 cartes d'exemple pour obtenir cet index
    const cartesExemple: CarteScore[] = [
      { scoreBrut: 72 + index, sss: 72, slope: 130 },
      { scoreBrut: 72 + index - 2, sss: 72, slope: 130 },
      { scoreBrut: 72 + index + 1, sss: 72, slope: 130 },
    ];

    const resultat = calculerIndexWHS(cartesExemple);

    const levelLabel =
      index < 5
        ? "Très bon golfeur"
        : index < 10
          ? "Bon golfeur"
          : index < 15
            ? "Golfeur moyen-bon"
            : index < 20
              ? "Golfeur moyen"
              : "Débutant";

    const handicapJeu = calculerHandicapJeu(index, 130, 72, 72);

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
                  name: `Un Index WHS de ${index} au golf, c&apos;est bon ?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Un Index ${index} correspond à un golfeur ${levelLabel}. Handicap de jeu type (Slope 130) : ${handicapJeu}. Cette progression suppose un entraînement régulier et une bonne connaissance des techniques de base.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `Comment atteindre un Index WHS de ${index} ?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Pour atteindre un Index ${index}, il faut : 1) Entraînement régulier (3-4 fois/semaine). 2) Travail technique du swing et du court jeu. 3) Gestion mentale pendant les parties. 4) Enregistrer au moins ${index < 15 ? "10" : "5"} cartes officielles.`,
                  },
                },
              ],
            }),
          }}
        />

        <Breadcrumb
          currentPage={`Handicap golf Index ${index}`}
          parentPage="Calcul Handicap Golf WHS"
          parentHref="/calcul-handicap-golf-whs"
        />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
            ⛳
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Handicap golf Index {fmt(index, 1)}
          </h1>
        </div>
        <p className="text-slate-500 mb-8 ml-[52px]">
          {levelLabel} — Handicap de jeu type : {handicapJeu}
        </p>

        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl p-8 shadow-lg shadow-green-200/50 mb-8">
          <p className="text-green-100 mb-1">Index WHS</p>
          <p className="text-5xl font-extrabold tracking-tight">
            {fmt(index, 1)}
          </p>
          <p className="text-lg mt-2 font-semibold text-green-100">
            {levelLabel}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-xs text-slate-500 mb-2">Handicap de jeu (Slope 130, SSS 72)</p>
            <p className="text-2xl font-bold text-slate-800">{handicapJeu}</p>
            <p className="text-xs text-slate-500 mt-2">Trous à rendre</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-xs text-slate-500 mb-2">Cartes minimum</p>
            <p className="text-2xl font-bold text-slate-800">3</p>
            <p className="text-xs text-slate-500 mt-2">Pour un Index provisoire</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-xs text-slate-500 mb-2">Cartes officielles</p>
            <p className="text-2xl font-bold text-slate-800">20</p>
            <p className="text-xs text-slate-500 mt-2">Pour stabiliser l&apos;Index</p>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Progression type - Atteindre Index {fmt(index, 1)}
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Voici les étapes générales pour progresser vers ce niveau.
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Technique :</strong> Maîtrise du swing de base, prise en
                main correcte, posture stable
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Court jeu :</strong> Chip, pitch et putt maîtrisés
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Mental :</strong> Gestion du stress et des émotions
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Entraînement :</strong> {index < 15 ? "3-4" : "1-2"} fois par semaine
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Parties :</strong> Jouer régulièrement en compétition
              </span>
            </li>
          </ul>
        </section>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Affiner votre calcul
        </h2>
        <CalculHandicapGolfWHS />


        <RelatedCalculators currentSlug="/calcul-handicap-golf-whs" />
      </div>
    );
  }

  // Scénario Slope
  if (parsed.type === "slope" && parsed.slopeValue !== undefined) {
    const slope = parsed.slopeValue;
    const difficulte =
      slope < 110
        ? "facile (peu d'obstacles)"
        : slope < 130
          ? "standard (équilibré)"
          : "difficile (beaucoup d'obstacles)";

    const index = 18;
    const handicapJeu = calculerHandicapJeu(index, slope, 72, 72);

    return (
      <div>
        <Breadcrumb
          currentPage={`Slope ${slope} au golf`}
          parentPage="Calcul Handicap Golf WHS"
          parentHref="/calcul-handicap-golf-whs"
        />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
            ⛳
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Slope {slope} au golf
          </h1>
        </div>
        <p className="text-slate-500 mb-8 ml-[52px]">
          Parcours {difficulte}
        </p>

        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Comprendre le Slope {slope}
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Un Slope de {slope} indique un parcours {difficulte}.
              Plus le Slope est élevé, plus le parcours est difficile pour un golfeur moyen.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-800 mb-2">Impact sur le Handicap de jeu :</p>
                <p className="text-sm text-slate-600">
                  Pour un Index 18 avec SSS 72 et Par 72 : Handicap de jeu = {handicapJeu} coups
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-mono text-slate-700">
                  {fmt(index, 1)} × ({slope} / 113) + (72 − 72) = {handicapJeu}
                </p>
              </div>

              <p className="text-sm text-slate-600 pt-2 border-t border-slate-200">
                Un Slope plus élevé augmente votre handicap de jeu. Par exemple, un Slope 145 vous donne
                un handicap supérieur à un Slope 110 pour le même Index WHS.
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
            <h3 className="font-bold text-green-900 mb-4">Échelle Slope</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-green-800">95 - 110</p>
                <p className="text-green-700">Très facile (pitch & putt)</p>
              </div>
              <div>
                <p className="font-semibold text-green-800">110 - 125</p>
                <p className="text-green-700">Standard</p>
              </div>
              <div>
                <p className="font-semibold text-green-800">125 - 140</p>
                <p className="text-green-700">Difficile</p>
              </div>
              <div className="pt-3 border-t border-green-200">
                <p className="font-semibold text-green-800">140 - 155</p>
                <p className="text-green-700">Très difficile</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Affiner votre calcul
        </h2>
        <CalculHandicapGolfWHS />


        <RelatedCalculators currentSlug="/calcul-handicap-golf-whs" />
      </div>
    );
  }

  // Scénario Questions
  if (parsed.type === "question") {
    const questions: Record<
      string,
      { title: string; content: React.ReactNode }
    > = {
      "handicap-debutant-golf": {
        title: "Handicap golf débutant - Progression et objectifs",
        content: (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Un débutant en golf commence généralement avec un Index WHS entre 28 et 36.
              C&apos;est normal ! La progression est gratifiante.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Objectifs par étape</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>0-3 mois :</strong> Index 32-36 (apprentissage swing)
                  </li>
                  <li>
                    <strong>3-6 mois :</strong> Index 24-28 (régularité)
                  </li>
                  <li>
                    <strong>6-12 mois :</strong> Index 18-24 (consolidation)
                  </li>
                  <li>
                    <strong>1-2 ans :</strong> Index 12-18 (maîtrise)
                  </li>
                </ul>
              </div>
            </div>
          </>
        ),
      },
      "handicap-amateur-golf": {
        title: "Handicap golf amateur - Niveaux et entraînement",
        content: (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Un amateur régulier a généralement un Index entre 10 et 20.
              Il joue 1-2 fois par semaine et maîtrise les fondamentaux.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Niveaux amateurs</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Index 18-20 :</strong> Amateur moyen
                  </li>
                  <li>
                    <strong>Index 12-18 :</strong> Amateur bon
                  </li>
                  <li>
                    <strong>Index 5-12 :</strong> Amateur très bon
                  </li>
                </ul>
              </div>
            </div>
          </>
        ),
      },
      "handicap-professionnel-golf": {
        title: "Handicap golf professionnel - Critères et sélection",
        content: (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Un golfeur professionnel a généralement un Index négatif (−2 à −5)
              ou très positif (0-2). Les pros participent à des tournois.
            </p>
          </>
        ),
      },
      "handicap-femme-moyen-golf": {
        title: "Handicap golf femme moyen - Statistiques",
        content: (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              L&apos;Index WHS moyen pour une femme golfeur (tous niveaux) est environ 20-24,
              comparable aux hommes du même niveau.
            </p>
          </>
        ),
      },
      "combien-cartes-pour-index-whs": {
        title: "Combien de cartes pour un Index WHS ?",
        content: (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Vous avez besoin d&apos;un minimum de 3 cartes pour obtenir un Index WHS.
              Plus vous en avez, plus votre Index est stable et fiable.
            </p>
            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="font-semibold text-slate-800 mb-2">Stabilité par nombre de cartes :</p>
                <ul className="space-y-1 text-slate-700">
                  <li>3-4 cartes : provisoire</li>
                  <li>5-10 cartes : semi-stable</li>
                  <li>15-19 cartes : stable</li>
                  <li>20+ cartes : très stable (référence officielle)</li>
                </ul>
              </div>
            </div>
          </>
        ),
      },
      "formule-differentiel-golf-whs": {
        title: "Formule différentiel golf WHS - Calcul officiel",
        content: (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Le différentiel WHS = (Score brut − SSS) × 113 / Slope
            </p>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="font-mono text-sm text-slate-800 mb-2">
                  (82 − 72) × 113 / 130 = 8.46
                </p>
                <p className="text-xs text-slate-600">
                  Un score de 82 sur un parcours SSS 72 avec Slope 130
                </p>
              </div>
            </div>
          </>
        ),
      },
      "whs-vs-ancien-systeme": {
        title: "WHS vs ancien système EDA - Différences",
        content: (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Le WHS (depuis 2021) remplace l&apos;ancien système EDA.
              Principales différences : calcul unifié worldwide, moins de cartes requises,
              plus transparent et juste.
            </p>
          </>
        ),
      },
    };

    const question = questions[slug];
    if (!question) notFound();

    return (
      <div>
        <Breadcrumb
          currentPage={question.title}
          parentPage="Calcul Handicap Golf WHS"
          parentHref="/calcul-handicap-golf-whs"
        />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
            ⛳
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            {question.title}
          </h1>
        </div>
        <p className="text-slate-500 mb-8 ml-[52px]">
          Guide complet sur le handicap golf WHS
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          {question.content}
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Affiner votre calcul
        </h2>
        <CalculHandicapGolfWHS />


        <RelatedCalculators currentSlug="/calcul-handicap-golf-whs" />
      </div>
    );
  }

  notFound();
}
