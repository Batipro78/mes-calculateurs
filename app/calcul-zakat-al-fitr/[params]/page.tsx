import type { Metadata } from "next";
import CalculZakatFitr from "../CalculZakatFitr";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerZakatFitr } from "../zakatFitrCalc";

// 15 variantes SEO populaires
const VARIANTES = [
  // Format : {nb}-personnes (Mosquée Paris 7€)
  "1-personne",
  "2-personnes",
  "3-personnes",
  "4-personnes",
  "5-personnes",
  "6-personnes",
  "7-personnes",
  "8-personnes",
  // Format : {nb}-personnes-cfcm (CFCM 9€)
  "2-personnes-cfcm",
  "4-personnes-cfcm",
  "6-personnes-cfcm",
  // Format : famille-{nb}-personnes
  "famille-3-personnes",
  "famille-4-personnes",
  "famille-5-personnes",
  "couple-2-personnes",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): {
  nb_personnes: number;
  source: "mosquee-paris" | "cfcm";
} | null {
  // Format: {nb}-personne(s) ou {nb}-personnes-cfcm ou famille/couple-{nb}-personnes
  let match = slug.match(/^(\d+)-personnes?(-cfcm)?$/);
  if (match) {
    const [, nb, cfcm] = match;
    return {
      nb_personnes: parseInt(nb),
      source: cfcm ? "cfcm" : "mosquee-paris",
    };
  }

  // Format: famille-{nb}-personnes ou couple-{nb}-personnes
  match = slug.match(/^(famille|couple)-(\d+)-personnes$/);
  if (match) {
    const [, , nb] = match;
    return {
      nb_personnes: parseInt(nb),
      source: "mosquee-paris",
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

  const resultat = calculerZakatFitr({
    nb_adultes: parsed.nb_personnes,
    nb_enfants: 0,
    source: parsed.source,
  });

  const sourceLabel = parsed.source === "mosquee-paris" ? "Mosquée Paris" : "CFCM";

  return {
    alternates: { canonical: `/calcul-zakat-al-fitr/${slug}` },
    title: `Zakat al-Fitr ${parsed.nb_personnes} personne${parsed.nb_personnes > 1 ? "s" : ""} = ${fmt(resultat.total, 0)} € (${sourceLabel})`,
    description: `Zakat al-Fitr pour ${parsed.nb_personnes} personne${parsed.nb_personnes > 1 ? "s" : ""} = ${fmt(resultat.total, 0)} € selon ${sourceLabel}. À verser avant l&apos;Aïd al-Fitr. Montant ${sourceLabel} 2026.`,
    keywords: `zakat al fitr ${parsed.nb_personnes} personnes, montant zakat al fitr, ${sourceLabel}, aid al fitr, aumone ramadan`,
    openGraph: {
      title: `Zakat al-Fitr : ${fmt(resultat.total, 0)} € pour ${parsed.nb_personnes} personne${parsed.nb_personnes > 1 ? "s" : ""}`,
      description: `Calcul rapide : ${parsed.nb_personnes} × ${fmt(resultat.montant_par_personne, 0)} € = ${fmt(resultat.total, 0)} €`,
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

  const resultat = calculerZakatFitr({
    nb_adultes: parsed.nb_personnes,
    nb_enfants: 0,
    source: parsed.source,
  });

  const sourceLabel = parsed.source === "mosquee-paris" ? "Mosquée de Paris" : "CFCM";
  const totalStr = fmt(resultat.total, 0);
  const montantStr = fmt(resultat.montant_par_personne, 0);

  // Variations autour : ±1 personne
  const variations = [
    {
      label: `${parsed.nb_personnes - 1} personne${parsed.nb_personnes - 1 !== 1 ? "s" : ""}`,
      resultat: calculerZakatFitr({
        nb_adultes: Math.max(1, parsed.nb_personnes - 1),
        nb_enfants: 0,
        source: parsed.source,
      }),
      hidden: parsed.nb_personnes <= 1,
    },
    {
      label: `${parsed.nb_personnes + 1} personne${parsed.nb_personnes + 1 !== 1 ? "s" : ""}`,
      resultat: calculerZakatFitr({
        nb_adultes: parsed.nb_personnes + 1,
        nb_enfants: 0,
        source: parsed.source,
      }),
    },
    {
      label: `${parsed.nb_personnes + 2} personne${parsed.nb_personnes + 2 !== 1 ? "s" : ""}`,
      resultat: calculerZakatFitr({
        nb_adultes: parsed.nb_personnes + 2,
        nb_enfants: 0,
        source: parsed.source,
      }),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Zakat al-Fitr pour ${parsed.nb_personnes} personne${parsed.nb_personnes > 1 ? "s" : ""} : combien ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${parsed.nb_personnes} personne${parsed.nb_personnes > 1 ? "s" : ""}, la Zakat al-Fitr selon ${sourceLabel} est de ${totalStr} € (${montantStr} € par personne × ${parsed.nb_personnes}).`,
        },
      },
      {
        "@type": "Question",
        name: "Qui paie pour qui dans la Zakat al-Fitr ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le chef de famille paie pour tous les membres du foyer à sa charge : époux/épouse, enfants (y compris nourrissons), parents âgés et dépendants. Chaque personne = 1 part de Zakat al-Fitr.",
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
        currentPage={`Zakat al-Fitr ${parsed.nb_personnes} personne${parsed.nb_personnes > 1 ? "s" : ""}`}
        parentPage="Calcul Zakat al-Fitr"
        parentHref="/calcul-zakat-al-fitr"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📿
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Zakat al-Fitr {parsed.nb_personnes} personne{parsed.nb_personnes > 1 ? "s" : ""}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Selon {sourceLabel} — À verser avant l&apos;Aïd al-Fitr
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-100 mb-1">Total Zakat al-Fitr à verser</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {totalStr} <span className="text-2xl font-semibold">€</span>
        </p>
        <p className="text-lg text-emerald-100 mt-3">
          {parsed.nb_personnes} personne{parsed.nb_personnes > 1 ? "s" : ""} × {montantStr} €
        </p>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Détail du calcul
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Membres du foyer</p>
            <p className="text-2xl font-bold text-slate-800">
              {parsed.nb_personnes}
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Source ({sourceLabel})</p>
            <p className="text-2xl font-bold text-emerald-700">
              {montantStr} €
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-slate-800">
              {totalStr} €
            </p>
          </div>
        </div>
      </div>

      {/* Variations */}
      {variations.filter((v) => !v.hidden).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Pour un foyer différent
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Montants selon {sourceLabel}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Foyer
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {variations
                  .filter((v) => !v.hidden)
                  .map((v, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-2 font-medium text-slate-700">
                        {v.label}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-slate-800">
                        {fmt(v.resultat.total, 0)} €
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Affiner votre calcul
      </h2>
      <CalculZakatFitr />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Interpretation */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Votre Zakat al-Fitr en détail
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>Total à verser : {totalStr} €</strong> pour {parsed.nb_personnes} personne{parsed.nb_personnes > 1 ? "s" : ""}.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Cet montant est calculé selon les directives officielles de <strong>{sourceLabel}</strong> :
          <strong> {montantStr} € par personne</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Vous pouvez verser cette somme directement via votre mosquée locale, une association caritative musulmane,
          ou à des familles nécessiteuses de votre voisinage. <strong>L&apos;important est de verser avant la prière de l&apos;Aïd al-Fitr.</strong>
        </p>
      </section>

      <section className="mt-8 bg-emerald-50 rounded-2xl border border-emerald-200 p-8">
        <h3 className="font-bold text-emerald-900 mb-3">Rappels importants :</h3>
        <ul className="space-y-2 text-sm text-emerald-800">
          <li className="flex gap-2">
            <span className="font-bold">→</span>
            <span>Vous pouvez verser dès le début du Ramadan ou quelques jours avant l&apos;Aïd al-Fitr.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">→</span>
            <span>Les montants <strong>{sourceLabel}</strong> 2026 peuvent varier. Vérifiez avec votre mosquée locale.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">→</span>
            <span>La Zakat al-Fitr doit être versée avant la prière de l&apos;Aïd (obligatoire, pas facultatif).</span>
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-zakat-al-fitr" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
