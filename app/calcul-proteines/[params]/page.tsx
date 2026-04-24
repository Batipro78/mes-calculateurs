import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurProteines from "../CalculateurProteines";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcProteines } from "../proteinesCalc";

const POIDS_LIST = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const ACTIVITES = ["sedentaire", "actif", "sportif", "musculation", "endurance"] as const;
type Activite = (typeof ACTIVITES)[number];

const ACTIVITE_LABELS: Record<Activite, string> = {
  sedentaire: "Sedentaire",
  actif: "Actif",
  sportif: "Sportif",
  musculation: "Musculation",
  endurance: "Endurance",
};

interface ParsedSlug {
  poids: number;
  activite: Activite;
}

function parseSlug(slug: string): ParsedSlug | null {
  const match = slug.match(/^(\d+)kg-(sedentaire|actif|sportif|musculation|endurance)$/);
  if (!match) return null;
  const poids = parseInt(match[1]);
  const activite = match[2] as Activite;
  if (!POIDS_LIST.includes(poids)) return null;
  return { poids, activite };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const poids of POIDS_LIST) {
    for (const activite of ACTIVITES) {
      params.push({ params: `${poids}kg-${activite}` });
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

  const { poids, activite } = parsed;
  const result = calcProteines(poids, activite, "maintien");
  const activiteLabel = ACTIVITE_LABELS[activite];

  return {
    alternates: { canonical: `/calcul-proteines/${slug}` },
    title: `Proteines ${poids} kg ${activiteLabel} = ${result.grammes}g/jour | Calcul 2026`,
    description: `Besoin en proteines pour une personne de ${poids} kg, profil ${activiteLabel.toLowerCase()} : ${result.grammes}g/jour (${result.parRepas}g par repas). Fourchette recommandee : ${Math.round(result.fourchette.min * poids)}g – ${Math.round(result.fourchette.max * poids)}g.`,
    keywords: `proteines ${poids} kg, besoin proteines ${activiteLabel.toLowerCase()}, apport protidique ${poids}kg, proteines par jour ${poids} kilos`,
    openGraph: {
      title: `${poids} kg / ${activiteLabel} → ${result.grammes}g de proteines/jour`,
      description: `Fourchette : ${Math.round(result.fourchette.min * poids)}g – ${Math.round(result.fourchette.max * poids)}g. Par repas : ${result.parRepas}g.`,
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

  const { poids, activite } = parsed;
  const activiteLabel = ACTIVITE_LABELS[activite];
  const result = calcProteines(poids, activite, "maintien");
  const { grammes, parRepas, fourchette, calories, pourcentage } = result;

  const fourchetteMin = Math.round(fourchette.min * poids);
  const fourchetteMax = Math.round(fourchette.max * poids);

  // Comparaison par poids (meme activite)
  const comparaisonPoids = POIDS_LIST.map((p) => {
    const r = calcProteines(p, activite, "maintien");
    return { poids: p, grammes: r.grammes, isCurrent: p === poids };
  });

  // Comparaison par activite (meme poids)
  const comparaisonActivite = ACTIVITES.map((a) => {
    const r = calcProteines(poids, a, "maintien");
    return { activite: a, label: ACTIVITE_LABELS[a], grammes: r.grammes, isCurrent: a === activite };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de proteines par jour pour ${poids} kg ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une personne de ${poids} kg avec un profil ${activiteLabel.toLowerCase()}, le besoin en proteines est de ${grammes}g par jour, soit ${parRepas}g par repas (3 repas). La fourchette recommandee est de ${fourchetteMin}g a ${fourchetteMax}g selon l'intensite de l'activite.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle quantite de poulet pour avoir ${grammes}g de proteines ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le blanc de poulet contient environ 31g de proteines pour 100g. Pour obtenir ${grammes}g de proteines, il vous faudrait environ ${Math.round((grammes / 31) * 100)}g de poulet. En pratique, repartissez vos sources de proteines sur plusieurs aliments differents (poisson, oeufs, legumineuses...).`,
        },
      },
      {
        "@type": "Question",
        name: `Les ${grammes}g de proteines representent combien de calories ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les proteines apportent 4 kcal par gramme. Vos ${grammes}g de proteines representent donc ${calories} kcal, soit environ ${pourcentage}% d'un regime standard de 2000 kcal par jour.`,
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
        currentPage={`${poids} kg – ${activiteLabel}`}
        parentPage="Calcul Proteines"
        parentHref="/calcul-proteines"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💪
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Proteines {poids} kg — {activiteLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Besoin en proteines journalier pour {poids} kg, profil {activiteLabel.toLowerCase()}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Apport en proteines journalier recommande</p>
        <p className="text-5xl font-extrabold tracking-tight">{grammes}g</p>
        <p className="text-lg font-medium mt-1">de proteines par jour</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Poids</p>
            <p className="font-semibold">{poids} kg</p>
          </div>
          <div>
            <p className="text-white/70">Activite</p>
            <p className="font-semibold">{activiteLabel}</p>
          </div>
          <div>
            <p className="text-white/70">Par repas</p>
            <p className="font-semibold">{parRepas}g</p>
          </div>
          <div>
            <p className="text-white/70">Calories proteines</p>
            <p className="font-semibold">{calories} kcal</p>
          </div>
        </div>
        <div className="mt-4 bg-white/10 rounded-xl px-4 py-3 text-sm">
          Fourchette recommandee : <strong>{fourchetteMin}g – {fourchetteMax}g</strong> ({fourchette.min}–{fourchette.max} g/kg)
        </div>
      </div>

      {/* Comparaison par activite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Proteines selon l&apos;activite pour {poids} kg
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Activite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Proteines/jour</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Par repas</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonActivite.map((row) => (
                <tr
                  key={row.activite}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-purple-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-purple-600">{row.label}</span>
                    ) : (
                      <a
                        href={`/calcul-proteines/${poids}kg-${row.activite}`}
                        className="text-slate-700 hover:text-purple-600 transition-colors"
                      >
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-purple-600" : "text-slate-700"}`}>
                    {row.grammes}g
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-purple-600" : "text-slate-500"}`}>
                    {Math.round(row.grammes / 3)}g
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par poids */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Proteines selon le poids — profil {activiteLabel.toLowerCase()}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Proteines/jour</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Par repas</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Calories</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPoids.map((row) => (
                <tr
                  key={row.poids}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-purple-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-purple-600">{row.poids} kg</span>
                    ) : (
                      <a
                        href={`/calcul-proteines/${row.poids}kg-${activite}`}
                        className="text-slate-700 hover:text-purple-600 transition-colors"
                      >
                        {row.poids} kg
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-purple-600" : "text-slate-700"}`}>
                    {row.grammes}g
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-purple-600" : "text-slate-500"}`}>
                    {Math.round(row.grammes / 3)}g
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-purple-600" : "text-slate-500"}`}>
                    {row.grammes * 4} kcal
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurProteines />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {grammes}g de proteines par jour pour {poids} kg : explication
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour une personne de <strong>{poids} kg</strong> avec un profil{" "}
          <strong>{activiteLabel.toLowerCase()}</strong>, le besoin en proteines est de{" "}
          <strong>{grammes}g par jour</strong> selon la formule de base ({fourchette.min * 1}g par kg
          pour ce niveau d&apos;activite, objectif maintien).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Repartis sur 3 repas, cela represente environ <strong>{parRepas}g de proteines par repas</strong>.
          La fourchette recommandee pour votre profil est de <strong>{fourchetteMin}g a {fourchetteMax}g</strong>{" "}
          selon l&apos;intensite de vos seances.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ces {grammes}g de proteines apportent <strong>{calories} kcal</strong>, soit{" "}
          <strong>{pourcentage}%</strong> d&apos;un regime standard de 2000 kcal. Pour calculer
          votre besoin calorique total, utilisez notre{" "}
          <a href="/calcul-calories" className="text-purple-600 hover:underline font-medium">
            calculateur de calories
          </a>.
        </p>
        <p className="text-xs text-slate-400 mt-6">Mis a jour le 8 avril 2026</p>
      </section>

      <RelatedCalculators currentSlug="/calcul-proteines" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
