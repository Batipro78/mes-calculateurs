import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurConsommationEau from "../CalculateurConsommationEau";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcConsommationEau } from "../consommationEauCalc";

const POIDS_LIST = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const ACTIVITES = ["sedentaire", "leger", "modere", "actif", "intense"] as const;
const CLIMATS = ["tempere", "chaud", "tres-chaud"] as const;

type Activite = (typeof ACTIVITES)[number];
type Climat = (typeof CLIMATS)[number];

const ACTIVITE_LABELS: Record<Activite, string> = {
  sedentaire: "sedentaire",
  leger: "legerement actif",
  modere: "moderement actif",
  actif: "tres actif",
  intense: "athlete",
};

const CLIMAT_LABELS: Record<Climat, string> = {
  tempere: "climat tempere",
  chaud: "climat chaud",
  "tres-chaud": "climat tres chaud",
};

function fmtL(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function fmtMl(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

function parseSlug(
  slug: string
): { poids: number; activite: Activite; climat: Climat } | null {
  const match = slug.match(
    /^(\d+)kg-(sedentaire|leger|modere|actif|intense)-(tempere|chaud|tres-chaud)$/
  );
  if (!match) return null;
  return {
    poids: parseInt(match[1]),
    activite: match[2] as Activite,
    climat: match[3] as Climat,
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const poids of POIDS_LIST) {
    for (const activite of ACTIVITES) {
      for (const climat of CLIMATS) {
        params.push({ params: `${poids}kg-${activite}-${climat}` });
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

  const { poids, activite, climat } = parsed;
  const climatKey = climat.replace("-", "_");
  const res = calcConsommationEau(poids, activite, climatKey, false, false);

  return {
    title: `Eau ${poids} kg ${ACTIVITE_LABELS[activite]} = ${fmtL(res.total)} L/jour - Hydratation`,
    description: `Besoin en eau pour ${poids} kg, ${ACTIVITE_LABELS[activite]}, ${CLIMAT_LABELS[climat]} : ${fmtL(res.total)} litres par jour (${res.verres} verres de 250 ml). Base ${fmtL(res.base)} L + bonus activite ${fmtL(res.activiteBonus)} L.`,
    keywords: `eau ${poids} kg, hydratation ${activite}, besoin eau ${poids}kg, consommation eau ${activite}, litres eau ${poids} kilos`,
    openGraph: {
      title: `Eau ${poids} kg ${activite} : ${fmtL(res.total)} L/jour`,
      description: `${res.verres} verres de 250 ml par jour pour ${poids} kg en ${ACTIVITE_LABELS[activite]}.`,
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

  const { poids, activite, climat } = parsed;

  if (
    !POIDS_LIST.includes(poids) ||
    !ACTIVITES.includes(activite) ||
    !CLIMATS.includes(climat)
  ) {
    notFound();
  }

  const climatKey = climat.replace("-", "_");
  const res = calcConsommationEau(poids, activite, climatKey, false, false);

  // Comparaison selon le poids (meme activite, meme climat)
  const comparaisonPoids = POIDS_LIST.map((p) => {
    const r = calcConsommationEau(p, activite, climatKey, false, false);
    return { poids: p, total: r.total, verres: r.verres, isCurrent: p === poids };
  });

  // Comparaison selon l'activite (meme poids, meme climat)
  const comparaisonActivite = ACTIVITES.map((a) => {
    const r = calcConsommationEau(poids, a, climatKey, false, false);
    return { activite: a, total: r.total, verres: r.verres, isCurrent: a === activite };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de litres d'eau pour ${poids} kg avec une activite ${ACTIVITE_LABELS[activite]} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une personne de ${poids} kg avec un niveau d'activite ${ACTIVITE_LABELS[activite]} en ${CLIMAT_LABELS[climat]}, le besoin quotidien en eau est de ${fmtL(res.total)} litres par jour, soit ${res.verres} verres de 250 ml. Ce calcul inclut la base de ${fmtL(res.base)} L (${poids} kg x 33 ml/kg) plus ${fmtL(res.activiteBonus)} L pour l'activite physique et ${fmtL(res.climatBonus)} L pour le climat.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment repartir ${fmtL(res.total)} L d'eau dans la journee ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${fmtL(res.total)} litres par jour, la repartition recommandee est : ${fmtMl(res.repartition.matin)} ml le matin (30%), ${fmtMl(res.repartition.midi)} ml a midi (25%), ${fmtMl(res.repartition.apres_midi)} ml l'apres-midi (25%), et ${fmtMl(res.repartition.soir)} ml le soir (20%). Il est conseille de boire regulierement sans attendre la soif.`,
        },
      },
      {
        "@type": "Question",
        name: `L'activite ${ACTIVITE_LABELS[activite]} augmente-t-elle vraiment le besoin en eau ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, l'activite physique ${ACTIVITE_LABELS[activite]} augmente les besoins en eau de ${fmtL(res.activiteBonus)} L par rapport a une personne sedentaire. La transpiration pendant l'effort peut faire perdre entre 0,5 et 2 litres par heure selon l'intensite et la chaleur. Il est important de s'hydrater avant, pendant et apres l'exercice.`,
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
        currentPage={`${poids} kg — ${ACTIVITE_LABELS[activite]}`}
        parentPage="Calcul Consommation Eau"
        parentHref="/calcul-consommation-eau"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💧
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Eau {poids} kg — {ACTIVITE_LABELS[activite]}, {CLIMAT_LABELS[climat]}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Besoin en eau quotidien pour {poids} kg,{" "}
        {ACTIVITE_LABELS[activite]}, {CLIMAT_LABELS[climat]}.
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Besoin quotidien en eau</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtL(res.total)} L</p>
        <p className="text-xl font-medium mt-1">par jour</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/70">Verres (250 ml)</p>
            <p className="text-2xl font-bold">{res.verres}</p>
          </div>
          <div>
            <p className="text-white/70">Base poids</p>
            <p className="text-2xl font-bold">{fmtL(res.base)} L</p>
          </div>
          <div>
            <p className="text-white/70">Bonus activite</p>
            <p className="text-2xl font-bold">+{fmtL(res.activiteBonus)} L</p>
          </div>
        </div>
      </div>

      {/* Detail repartition */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Repartition recommandee sur la journee
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4 text-center bg-blue-100 text-blue-700 border-blue-200">
            <p className="text-xs font-medium mb-1">Matin</p>
            <p className="text-xl font-extrabold">{fmtMl(res.repartition.matin)} ml</p>
            <p className="text-xs mt-1 opacity-70">30% du total</p>
          </div>
          <div className="rounded-xl border p-4 text-center bg-cyan-100 text-cyan-700 border-cyan-200">
            <p className="text-xs font-medium mb-1">Midi</p>
            <p className="text-xl font-extrabold">{fmtMl(res.repartition.midi)} ml</p>
            <p className="text-xs mt-1 opacity-70">25% du total</p>
          </div>
          <div className="rounded-xl border p-4 text-center bg-sky-100 text-sky-700 border-sky-200">
            <p className="text-xs font-medium mb-1">Apres-midi</p>
            <p className="text-xl font-extrabold">{fmtMl(res.repartition.apres_midi)} ml</p>
            <p className="text-xs mt-1 opacity-70">25% du total</p>
          </div>
          <div className="rounded-xl border p-4 text-center bg-indigo-100 text-indigo-700 border-indigo-200">
            <p className="text-xs font-medium mb-1">Soir</p>
            <p className="text-xl font-extrabold">{fmtMl(res.repartition.soir)} ml</p>
            <p className="text-xs mt-1 opacity-70">20% du total</p>
          </div>
        </div>
      </div>

      {/* Comparaison selon le poids */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Besoin en eau selon le poids — {ACTIVITE_LABELS[activite]}, {CLIMAT_LABELS[climat]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres / jour</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Verres</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPoids.map((row) => (
                <tr
                  key={row.poids}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-blue-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-blue-600">{row.poids} kg</span>
                    ) : (
                      <a
                        href={`/calcul-consommation-eau/${row.poids}kg-${activite}-${climat}`}
                        className="text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        {row.poids} kg
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-blue-600" : "text-slate-700"}`}>
                    {fmtL(row.total)} L
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-blue-600" : "text-slate-500"}`}>
                    {row.verres}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison selon l'activite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Besoin en eau selon l&apos;activite — {poids} kg, {CLIMAT_LABELS[climat]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Activite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres / jour</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Verres</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonActivite.map((row) => (
                <tr
                  key={row.activite}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-blue-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-blue-600 capitalize">{ACTIVITE_LABELS[row.activite]}</span>
                    ) : (
                      <a
                        href={`/calcul-consommation-eau/${poids}kg-${row.activite}-${climat}`}
                        className="text-slate-700 hover:text-blue-600 transition-colors capitalize"
                      >
                        {ACTIVITE_LABELS[row.activite]}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-blue-600" : "text-slate-700"}`}>
                    {fmtL(row.total)} L
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-blue-600" : "text-slate-500"}`}>
                    {row.verres}
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
          Hydratation {poids} kg — {ACTIVITE_LABELS[activite]}, {CLIMAT_LABELS[climat]}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour une personne de <strong>{poids} kg</strong> avec un niveau
          d&apos;activite <strong>{ACTIVITE_LABELS[activite]}</strong> en{" "}
          <strong>{CLIMAT_LABELS[climat]}</strong>, le besoin quotidien en eau
          est de <strong>{fmtL(res.total)} litres</strong>, soit{" "}
          <strong>{res.verres} verres de 250 ml</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ce calcul se decompose en : base ponderate{" "}
          <strong>{fmtL(res.base)} L</strong> ({poids} kg x 33 ml/kg),
          bonus activite <strong>+{fmtL(res.activiteBonus)} L</strong>,
          {res.climatBonus > 0 && (
            <> bonus climatique <strong>+{fmtL(res.climatBonus)} L</strong>,</>
          )}{" "}
          pour un total de <strong>{fmtL(res.total)} L/jour</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          La repartition optimale sur la journee est :{" "}
          <strong>{fmtMl(res.repartition.matin)} ml le matin</strong>,{" "}
          <strong>{fmtMl(res.repartition.midi)} ml a midi</strong>,{" "}
          <strong>{fmtMl(res.repartition.apres_midi)} ml l&apos;apres-midi</strong>,{" "}
          <strong>{fmtMl(res.repartition.soir)} ml le soir</strong>. Il est
          recommande de boire regulierement, sans attendre la sensation de soif.
        </p>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurConsommationEau />

      <RelatedCalculators currentSlug="/calcul-consommation-eau" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
