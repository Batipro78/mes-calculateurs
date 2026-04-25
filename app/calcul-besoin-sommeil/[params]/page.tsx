import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurBesoinSommeil from "../CalculateurBesoinSommeil";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcBesoinSommeil } from "../besoinSommeilCalc";

const AGES = [1, 3, 6, 10, 14, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
const ACTIVITES = ["sedentaire", "modere", "actif", "intense"] as const;
type Activite = typeof ACTIVITES[number];

const ACTIVITE_LABELS: Record<Activite, string> = {
  sedentaire: "Sedentaire",
  modere: "Modere",
  actif: "Actif",
  intense: "Intense",
};

function parseSlug(slug: string): { age: number; activite: Activite } | null {
  const match = slug.match(/^(\d+)ans-(sedentaire|modere|actif|intense)$/);
  if (!match) return null;
  return {
    age: parseInt(match[1]),
    activite: match[2] as Activite,
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const age of AGES) {
    for (const activite of ACTIVITES) {
      params.push({ params: `${age}ans-${activite}` });
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

  const { age, activite } = parsed;
  const res = calcBesoinSommeil(age, activite, "bonne");
  const activiteLabel = ACTIVITE_LABELS[activite].toLowerCase();

  return {
    alternates: { canonical: `/calcul-besoin-sommeil/${slug}` },
    title: `Besoin Sommeil ${age} ans (${ACTIVITE_LABELS[activite]}) = ${res.heuresAjustees}h - ${res.cycles} cycles`,
    description: `Combien d'heures de sommeil pour ${age} ans avec un niveau d'activite ${activiteLabel} ? Besoin ideal : ${res.heuresAjustees}h/nuit, soit ${res.cycles} cycles de 90 min. Heures recommandees : ${res.heuresRecommandees.min}-${res.heuresRecommandees.max}h selon la NSF.`,
    keywords: `besoin sommeil ${age} ans, heures sommeil ${age} ans, sommeil ${activiteLabel}, cycles sommeil ${age} ans`,
    openGraph: {
      title: `Sommeil ${age} ans (${ACTIVITE_LABELS[activite]}) : ${res.heuresAjustees}h/nuit`,
      description: `Besoin ideal : ${res.heuresAjustees}h — ${res.cycles} cycles de 90 min. NSF recommande ${res.heuresRecommandees.min}-${res.heuresRecommandees.max}h/nuit.`,
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

  const { age, activite } = parsed;
  if (!AGES.includes(age) || !ACTIVITES.includes(activite)) notFound();

  const res = calcBesoinSommeil(age, activite, "bonne");
  const activiteLabel = ACTIVITE_LABELS[activite];

  // Comparaison par age (meme activite)
  const comparaisonAge = AGES.map((a) => {
    const r = calcBesoinSommeil(a, activite, "bonne");
    return { age: a, heures: r.heuresAjustees, cycles: r.cycles, isCurrent: a === age };
  });

  // Comparaison par activite (meme age)
  const comparaisonActivite = ACTIVITES.map((act) => {
    const r = calcBesoinSommeil(age, act, "bonne");
    return { activite: act, label: ACTIVITE_LABELS[act], heures: r.heuresAjustees, cycles: r.cycles, isCurrent: act === activite };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien d'heures de sommeil faut-il a ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${age} ans, la National Sleep Foundation recommande ${res.heuresRecommandees.min} a ${res.heuresRecommandees.max} heures de sommeil par nuit (ideal : ${res.heuresRecommandees.ideal}h). Avec un niveau d'activite ${activiteLabel.toLowerCase()}, le besoin ajuste est de ${res.heuresAjustees}h/nuit, soit ${res.cycles} cycles de 90 minutes.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de cycles de sommeil pour ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${res.heuresAjustees}h de sommeil (besoin recommande a ${age} ans avec activite ${activiteLabel.toLowerCase()}), vous devriez realiser environ ${res.cycles} cycles de 90 minutes par nuit. Chaque cycle comprend les phases de sommeil leger, profond et paradoxal (REM).`,
        },
      },
      {
        "@type": "Question",
        name: `L'activite physique influence-t-elle le besoin de sommeil a ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, l'activite physique influence le besoin de sommeil. Une activite intense peut augmenter le besoin de 30 minutes a 1 heure pour permettre la recuperation musculaire. A ${age} ans avec un niveau ${activiteLabel.toLowerCase()}, le besoin ajuste est de ${res.heuresAjustees}h contre ${res.heuresRecommandees.ideal}h en baseline.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://mescalculateurs.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calcul Besoin Sommeil",
        item: "https://mescalculateurs.fr/calcul-besoin-sommeil",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${age} ans — ${activiteLabel}`,
        item: `https://mescalculateurs.fr/calcul-besoin-sommeil/${age}ans-${activite}`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${age} ans — ${activiteLabel}`}
        parentPage="Calcul Besoin Sommeil"
        parentHref="/calcul-besoin-sommeil"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Sommeil {age} ans — {activiteLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Besoin en sommeil pour {age} ans avec un niveau d&apos;activite {activiteLabel.toLowerCase()}.
        Heures ideales, cycles et horaires recommandes.
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Besoin de sommeil recommande</p>
        <p className="text-5xl font-extrabold tracking-tight">{res.heuresAjustees}h</p>
        <p className="text-xl font-medium mt-1 text-white/80">par nuit</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-white/70">NSF recommande</p>
            <p className="text-2xl font-bold">{res.heuresRecommandees.min}–{res.heuresRecommandees.max}h</p>
          </div>
          <div>
            <p className="text-white/70">Cycles/nuit</p>
            <p className="text-2xl font-bold">{res.cycles}</p>
          </div>
          <div>
            <p className="text-white/70">Ajustement</p>
            <p className="text-2xl font-bold">
              {res.ajustement === 0 ? "Aucun" : res.ajustement > 0 ? `+${res.ajustement}h` : `${res.ajustement}h`}
            </p>
          </div>
        </div>
      </div>

      {/* Horaires coucher/reveil */}
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-4">
            ☀️ Heures de coucher recommandees
          </h2>
          <p className="text-xs text-slate-400 mb-3">Pour se reveiller repose a...</p>
          <div className="space-y-2">
            {["06:00", "06:30", "07:00", "07:30", "08:00"].map((wake, i) => (
              <div key={wake} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">Reveil {wake.replace(":", "h")}</span>
                <span className="text-sm font-bold text-indigo-700">{res.heureCoucher[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-4">
            🌙 Heures de reveil recommandees
          </h2>
          <p className="text-xs text-slate-400 mb-3">Pour se coucher a...</p>
          <div className="space-y-2">
            {["21:00", "21:30", "22:00", "22:30", "23:00", "23:30"].map((bed, i) => (
              <div key={bed} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">Coucher {bed.replace(":", "h")}</span>
                <span className="text-sm font-bold text-purple-700">{res.heureReveil[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparaison par age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Besoin sommeil selon l&apos;age (activite : {activiteLabel})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Heures ideales</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Cycles/nuit</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAge.map((row) => (
                <tr
                  key={row.age}
                  className={`border-b border-slate-100 last:border-0 ${row.isCurrent ? "bg-indigo-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-indigo-600">{row.age} ans</span>
                    ) : (
                      <a
                        href={`/calcul-besoin-sommeil/${row.age}ans-${activite}`}
                        className="text-slate-700 hover:text-indigo-600 transition-colors"
                      >
                        {row.age} ans
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-indigo-600" : "text-slate-700"}`}>
                    {row.heures}h
                  </td>
                  <td className={`py-2.5 px-2 text-right hidden sm:table-cell ${row.isCurrent ? "text-indigo-500 font-bold" : "text-slate-500"}`}>
                    {row.cycles}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par activite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Besoin sommeil {age} ans selon l&apos;activite
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Niveau d&apos;activite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Heures ideales</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Cycles/nuit</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonActivite.map((row) => (
                <tr
                  key={row.activite}
                  className={`border-b border-slate-100 last:border-0 ${row.isCurrent ? "bg-purple-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-purple-600">{row.label}</span>
                    ) : (
                      <a
                        href={`/calcul-besoin-sommeil/${age}ans-${row.activite}`}
                        className="text-slate-700 hover:text-purple-600 transition-colors"
                      >
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-purple-600" : "text-slate-700"}`}>
                    {row.heures}h
                  </td>
                  <td className={`py-2.5 px-2 text-right hidden sm:table-cell ${row.isCurrent ? "text-purple-500 font-bold" : "text-slate-500"}`}>
                    {row.cycles}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Texte SEO */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Besoin sommeil : {age} ans, activite {activiteLabel.toLowerCase()}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{age} ans</strong> avec un niveau d&apos;activite{" "}
          <strong>{activiteLabel.toLowerCase()}</strong>, le besoin ideal en sommeil est de{" "}
          <strong>{res.heuresAjustees} heures par nuit</strong>, soit environ{" "}
          <strong>{res.cycles} cycles de 90 minutes</strong>. La National Sleep Foundation
          recommande {res.heuresRecommandees.min} a {res.heuresRecommandees.max}h pour cette
          tranche d&apos;age.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {res.ajustement !== 0 && (
            <>
              L&apos;activite physique {activiteLabel.toLowerCase()} implique un ajustement de{" "}
              <strong>{res.ajustement > 0 ? `+${res.ajustement}h` : `${res.ajustement}h`}</strong> par
              rapport a la recommandation de base. {res.ajustement > 0
                ? "Un entrainement intense necessite davantage de recuperation, notamment en sommeil profond pour la reparation musculaire."
                : "Une activite legere reduit legerement le besoin en sommeil de recuperation."}
            </>
          )}
          {res.ajustement === 0 &&
            "Votre niveau d'activite correspond aux recommandations de base sans ajustement specifique."}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour optimiser votre sommeil, visez des horaires reguliers et
          programmez votre reveil en fin de cycle (multiples de 90 min apres
          l&apos;endormissement). Un reveil en milieu de cycle provoque une
          inertie du sommeil plus forte.
        </p>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurBesoinSommeil />

      <RelatedCalculators currentSlug="/calcul-besoin-sommeil" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
