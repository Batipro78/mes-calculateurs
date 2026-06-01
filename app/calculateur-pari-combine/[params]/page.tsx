import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurPariCombine from "../CalculateurPariCombine";
import Breadcrumb from "../../components/Breadcrumb";

const NB_SELECTIONS = [2, 3, 4, 5];
const COTES_MOYENNES = [
  { slug: "1-50", valeur: 1.5, label: "1.50" },
  { slug: "1-80", valeur: 1.8, label: "1.80" },
  { slug: "2-00", valeur: 2.0, label: "2.00" },
  { slug: "2-50", valeur: 2.5, label: "2.50" },
  { slug: "3-00", valeur: 3.0, label: "3.00" },
];
const MISES = [5, 10, 20, 50];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function parseSlug(
  slug: string
): { nb: number; coteMoyenne: typeof COTES_MOYENNES[number]; mise: number } | null {
  const m = slug.match(/^(\d+)-selections-(.+)-mise-(\d+)$/);
  if (!m) return null;

  const nb = parseInt(m[1], 10);
  const coteSlug = m[2];
  const mise = parseInt(m[3], 10);

  const cote = COTES_MOYENNES.find((c) => c.slug === coteSlug);

  if (!NB_SELECTIONS.includes(nb) || !cote || !MISES.includes(mise)) {
    return null;
  }

  return { nb, coteMoyenne: cote, mise };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const nb of NB_SELECTIONS) {
    for (const cote of COTES_MOYENNES) {
      for (const mise of MISES) {
        params.push({
          params: `${nb}-selections-${cote.slug}-mise-${mise}`,
        });
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

  const { nb, coteMoyenne, mise } = parsed;
  const coteTotale = Math.pow(coteMoyenne.valeur, nb);
  const gainTotal = mise * coteTotale;
  const beneficeNet = gainTotal - mise;

  return {
    alternates: { canonical: `/calculateur-pari-combine/${slug}` },
    title: `Pari Combiné ${nb} sélections × ${coteMoyenne.label} − ${mise} EUR — Gain ${fmt(gainTotal)} EUR`,
    description: `Pari combiné ${nb} sélections à cote moyenne ${coteMoyenne.label}, mise ${mise} EUR : cote totale ${fmt(coteTotale)}, gain ${fmt(gainTotal)} EUR, bénéfice ${fmt(beneficeNet)} EUR.`,
    keywords: `pari combiné ${nb} sélections, accumulator ${coteMoyenne.label}, gain ${mise}€, cote totale`,
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

  const { nb, coteMoyenne, mise } = parsed;

  // Creer un combiné avec nb selections a la meme cote
  const cotes = Array(nb).fill(coteMoyenne.valeur);
  const coteTotale = Math.pow(coteMoyenne.valeur, nb);
  const gainTotal = mise * coteTotale;
  const beneficeNet = gainTotal - mise;
  const probaImplicite = (1 / coteTotale) * 100;

  // Autres mises pour la meme config
  const autreMises = MISES.filter((m) => m !== mise).map((m) => ({
    mise: m,
    cote: Math.pow(coteMoyenne.valeur, nb),
    gain: m * Math.pow(coteMoyenne.valeur, nb),
  }));

  // Autres cotes pour le meme nb et mise
  const autreCotes = COTES_MOYENNES.filter((c) => c.slug !== coteMoyenne.slug).map(
    (c) => ({
      cote: c,
      coteTotale: Math.pow(c.valeur, nb),
      gain: mise * Math.pow(c.valeur, nb),
    })
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combiné ${nb} sélections à ${coteMoyenne.label} : gain avec ${mise} EUR ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec ${nb} sélections à cote moyenne ${coteMoyenne.label} et une mise de ${mise} EUR, la cote totale est ${fmt(coteTotale)}, le gain total ${fmt(gainTotal)} EUR et le bénéfice net ${fmt(beneficeNet)} EUR.`,
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
        currentPage={`Combiné ${nb} × ${coteMoyenne.label} − ${mise} EUR`}
        parentPage="Calculateur Pari Combiné"
        parentHref="/calculateur-pari-combine"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎯
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Combiné {nb} sélections × {coteMoyenne.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Mise {mise} EUR — Cote totale {fmt(coteTotale)} — Gain {fmt(gainTotal)}{" "}
        EUR
      </p>

      <div className="grid gap-6 mb-8 lg:grid-cols-3">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200/50">
          <p className="text-sm text-indigo-100 mb-1">Gain total</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(gainTotal)}{" "}
            <span className="text-lg font-semibold">EUR</span>
          </p>
          <p className="text-indigo-100 mt-2 text-xs">
            Mise {mise} EUR × Cote {fmt(coteTotale)}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-400 mb-2">Cote totale</p>
          <p className="text-2xl font-extrabold text-indigo-600">
            {fmt(coteTotale)}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {coteMoyenne.label}^{nb}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs text-slate-400 mb-2">Probabilité implicite</p>
          <p className="text-2xl font-extrabold text-slate-800">
            {probaImplicite.toLocaleString("fr-FR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </p>
          <p className="text-xs text-slate-400 mt-2">
            1 / {fmt(coteTotale)}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurPariCombine />


      <div className="grid gap-8 mt-8 lg:grid-cols-2">
        {/* Autres mises */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">
            Autres mises ({nb} sélections × {coteMoyenne.label})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2 text-slate-500 font-medium">
                    Mise
                  </th>
                  <th className="text-right py-2 px-2 text-slate-500 font-medium">
                    Gain total
                  </th>
                  <th className="text-right py-2 px-2 text-slate-500 font-medium">
                    Lien
                  </th>
                </tr>
              </thead>
              <tbody>
                {autreMises.map((r) => (
                  <tr key={r.mise} className="border-b border-slate-100">
                    <td className="py-2 px-2 font-medium text-slate-700">
                      {fmtInt(r.mise)} EUR
                    </td>
                    <td className="py-2 px-2 text-right text-slate-600">
                      {fmt(r.gain)} EUR
                    </td>
                    <td className="py-2 px-2 text-right">
                      <a
                        href={`/calculateur-pari-combine/${nb}-selections-${coteMoyenne.slug}-mise-${r.mise}`}
                        className="text-indigo-600 hover:underline text-xs font-medium"
                      >
                        voir →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Autres cotes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">
            Autres cotes moyennes ({nb} sélections − {mise} EUR)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2 text-slate-500 font-medium">
                    Cote moy.
                  </th>
                  <th className="text-right py-2 px-2 text-slate-500 font-medium">
                    Cote totale
                  </th>
                  <th className="text-right py-2 px-2 text-slate-500 font-medium">
                    Gain
                  </th>
                  <th className="text-right py-2 px-2 text-slate-500 font-medium">
                    Lien
                  </th>
                </tr>
              </thead>
              <tbody>
                {autreCotes.map((r) => (
                  <tr key={r.cote.slug} className="border-b border-slate-100">
                    <td className="py-2 px-2 font-medium text-slate-700">
                      {r.cote.label}
                    </td>
                    <td className="py-2 px-2 text-right text-slate-600">
                      {fmt(r.coteTotale)}
                    </td>
                    <td className="py-2 px-2 text-right font-semibold text-indigo-600">
                      {fmt(r.gain)} EUR
                    </td>
                    <td className="py-2 px-2 text-right">
                      <a
                        href={`/calculateur-pari-combine/${nb}-selections-${r.cote.slug}-mise-${mise}`}
                        className="text-indigo-600 hover:underline text-xs font-medium"
                      >
                        voir →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Détail du calcul</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec <strong>{nb} sélections</strong> à cote moyenne{" "}
          <strong>{coteMoyenne.label}</strong> et une mise de{" "}
          <strong>{mise} EUR</strong>, la cote totale est calculée ainsi :
        </p>
        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm text-slate-700 mb-4 border border-slate-200">
          Cote totale = {coteMoyenne.label}^{nb} = {fmt(coteTotale)}
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le gain total s&apos;obtient en multipliant la mise par la cote totale :
        </p>
        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm text-slate-700 mb-4 border border-slate-200">
          Gain total = {mise} EUR × {fmt(coteTotale)} = {fmt(gainTotal)} EUR
        </div>
        <p className="text-slate-600 leading-relaxed">
          Le bénéfice net est le gain total moins la mise : <strong>{fmt(beneficeNet)} EUR</strong>.
          La probabilité implicite (estimation selon les cotes) est{" "}
          <strong>{probaImplicite.toLocaleString("fr-FR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          %</strong>, ce qui signifie que le combiné est théoriquement moins probable qu&apos;une simple
          sélection.
        </p>
      </section>
    </div>
  );
}
