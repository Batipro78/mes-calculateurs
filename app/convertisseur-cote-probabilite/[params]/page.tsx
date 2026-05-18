import type { Metadata } from "next";
import ConvertisseurCoteProba from "../ConvertisseurCoteProba";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  coteDecimaleVersToutFormat,
  calculerMargeBookmaker,
} from "../coteProbaCalc";

const COTES = [
  "1-10",
  "1-25",
  "1-50",
  "1-80",
  "2-00",
  "2-25",
  "2-50",
  "3-00",
  "4-00",
  "5-00",
  "7-00",
  "10-00",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): number | null {
  const match = slug.match(/^cote-([\d-]+)$/);
  if (!match) return null;
  const coteStr = match[1].replace(/-/g, ".");
  const cote = parseFloat(coteStr);
  return cote > 0 ? cote : null;
}

export function generateStaticParams() {
  return COTES.map((cote) => ({ params: `cote-${cote}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const cote = parseSlug(slug);
  if (cote === null) return {};

  const resultat = coteDecimaleVersToutFormat(cote);
  const coteStr = fmt(cote, 2);
  const probaStr = fmt(resultat.proba, 2);

  return {
    alternates: { canonical: `/convertisseur-cote-probabilite/${slug}` },
    title: `Conversion cote ${coteStr} en probabilite ${probaStr}% - Tous formats`,
    description: `Cote ${coteStr} = Probabilite ${probaStr}%. Formats : Decimale ${fmt(resultat.decimal, 2)}, Fractionnelle ${resultat.fractionnelle}, Americaine ${resultat.americaine > 0 ? "+" : ""}${resultat.americaine}.`,
    keywords: `cote ${coteStr}, probabilite ${probaStr}, conversion cote, cote decimale, cote fractionnelle, cote americaine`,
    openGraph: {
      title: `Cote ${coteStr} = ${probaStr}%`,
      description: `Convertissez la cote ${coteStr} en tous les formats. Probabilite : ${probaStr}%.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const cote = parseSlug(slug);
  if (cote === null) notFound();

  const resultat = coteDecimaleVersToutFormat(cote);
  const coteStr = fmt(cote, 2);
  const probaStr = fmt(resultat.proba, 2);

  // Comparaison avec autres cotes
  const COTES_NUM = COTES.map((c) => parseFloat(c.replace(/-/g, ".")));
  const comparaison = COTES_NUM
    .filter((c) => c !== cote)
    .slice(0, 8)
    .map((c) => {
      const res = coteDecimaleVersToutFormat(c);
      return { cote: c, proba: res.proba, fraction: res.fractionnelle };
    });

  // Marge avec cote inverse (pair/impair)
  const coteInverse = 1 / (resultat.proba / 100);
  const margeExemple = calculerMargeBookmaker([cote, coteInverse]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de probabilite pour une cote de ${coteStr} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une cote decimale de ${coteStr} correspond a une probabilite de ${probaStr}%. Formule : Probabilite = (1 / ${coteStr}) × 100 = ${probaStr}%.`,
        },
      },
      {
        "@type": "Question",
        name: `Quels sont les formats de ${coteStr} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La cote ${coteStr} s&apos;exprime aussi : Fractionnelle = ${resultat.fractionnelle}, Americaine = ${resultat.americaine > 0 ? "+" : ""}${resultat.americaine}.`,
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
        currentPage={`Cote ${coteStr}`}
        parentPage="Convertisseur Cote"
        parentHref="/convertisseur-cote-probabilite"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎲
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Cote {coteStr} = {probaStr}%
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Conversion en tous formats et analyse de marge bookmaker.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-teal-100 mb-1">Probabilite implicite</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {probaStr}{" "}
          <span className="text-2xl font-semibold">%</span>
        </p>
      </div>

      {/* Tous les formats */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Tous les formats de cote
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Decimale</p>
            <p className="text-2xl font-bold text-teal-600">
              {fmt(resultat.decimal, 2)}
            </p>
            <p className="text-xs text-slate-400 mt-2">Format europeen</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Fractionnelle</p>
            <p className="text-2xl font-bold text-teal-600">
              {resultat.fractionnelle}
            </p>
            <p className="text-xs text-slate-400 mt-2">Format britannique</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Americaine</p>
            <p className="text-2xl font-bold text-teal-600">
              {resultat.americaine > 0 ? "+" : ""}
              {resultat.americaine}
            </p>
            <p className="text-xs text-slate-400 mt-2">Format US</p>
          </div>
        </div>
      </div>

      {/* Comparaison avec autres cotes */}
      {comparaison.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Autres cotes et leur probabilite
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Cote Decimale
                  </th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Fractionnelle
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Probabilite
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparaison.map((c) => (
                  <tr
                    key={fmt(c.cote, 2)}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-2 font-medium text-slate-700">
                      {fmt(c.cote, 2)}
                    </td>
                    <td className="py-3 px-2 text-slate-600">{c.fraction}</td>
                    <td className="py-3 px-2 text-right font-bold text-slate-800">
                      {fmt(c.proba, 2)}%
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
        Calculateur interactif
      </h2>
      <ConvertisseurCoteProba />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Explications */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Que signifie cette cote ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une cote de <strong>{coteStr}</strong> signifie qu&apos;il y a une probabilite de{" "}
          <strong>{probaStr}%</strong> que l&apos;evenement se produise, selon le bookmaker.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si vous pariez 1 EUR avec une cote de {coteStr}, vous recevrez environ{" "}
          <strong>{fmt(cote, 2)} EUR</strong> en cas de victoire (mise + gain).
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>Formule de probabilite :</strong> (1 / {coteStr}) × 100 ={" "}
          {probaStr}%
        </p>
      </section>

      {/* Marge bookmaker exemple */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Exemple : Marge bookmaker
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si l&apos;evenement oppose (non-realisation) a une cote inverse de{" "}
          <strong>{fmt(coteInverse, 2)}</strong>, la marge serait environ{" "}
          <strong>{fmt(margeExemple, 2)}%</strong>.
        </p>
        <p className="text-xs text-slate-400">
          (Cet exemple simplifie : en realite, les deux cotes ne sont jamais exactement inverses.)
        </p>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-cote-probabilite" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
