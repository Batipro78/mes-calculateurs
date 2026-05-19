import type { Metadata } from "next";
import ConvertisseurMonnaieJeu from "../ConvertisseurMonnaieJeu";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  MONNAIES,
  monnaieVersEuros,
  eurosVersMonnaie,
  convertirVers,
  type Monnaie,
} from "../monnaieJeuCalc";

// Variantes SEO populaires
const VARIANTES = [
  // V-bucks vers euros
  "1000-vbucks-en-euros",
  "2800-vbucks-en-euros",
  "5000-vbucks-en-euros",
  "13500-vbucks-en-euros",
  // RP LoL vers euros
  "650-rp-en-euros",
  "1380-rp-en-euros",
  "2800-rp-en-euros",
  "5000-rp-en-euros",
  // Apex Coins vers euros
  "1000-apex-en-euros",
  "2150-apex-en-euros",
  "4350-apex-en-euros",
  "6700-apex-en-euros",
  "11500-apex-en-euros",
  // Robux vers euros
  "400-robux-en-euros",
  "800-robux-en-euros",
  "1700-robux-en-euros",
  "4500-robux-en-euros",
  "10000-robux-en-euros",
  // COD Points vers euros
  "500-cp-en-euros",
  "1100-cp-en-euros",
  "2400-cp-en-euros",
  "5000-cp-en-euros",
  // FIFA Points vers euros
  "500-fp-en-euros",
  "1050-fp-en-euros",
  "2200-fp-en-euros",
  "5900-fp-en-euros",
  "12000-fp-en-euros",
  // Valorant Points vers euros
  "475-vp-en-euros",
  "1000-vp-en-euros",
  "2050-vp-en-euros",
  "3650-vp-en-euros",
  // Minecoins vers euros
  "320-minecoins-en-euros",
  "1020-minecoins-en-euros",
  "1720-minecoins-en-euros",
  "3500-minecoins-en-euros",
  // Euros vers monnaies (inverses populaires)
  "5-euros-en-vbucks",
  "10-euros-en-rp",
  "10-euros-en-apex",
  "10-euros-en-robux",
  "20-euros-en-cp",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

interface ParsedSlug {
  type: "monnaie-vers-euros" | "euros-vers-monnaie";
  quantite: number;
  monnaie: Monnaie;
}

function parseSlug(slug: string): ParsedSlug | null {
  // Pattern: "1000-vbucks-en-euros"
  const match1 = slug.match(
    /^(\d+)-(vbucks|rp|apex|robux|cp|fp|vp|minecoins)-en-euros$/
  );
  if (match1) {
    return {
      type: "monnaie-vers-euros",
      quantite: parseInt(match1[1]),
      monnaie: match1[2] as Monnaie,
    };
  }

  // Pattern: "10-euros-en-vbucks"
  const match2 = slug.match(
    /^(\d+(?:\.\d+)?)-euros-en-(vbucks|rp|apex|robux|cp|fp|vp|minecoins)$/
  );
  if (match2) {
    return {
      type: "euros-vers-monnaie",
      quantite: parseFloat(match2[1]),
      monnaie: match2[2] as Monnaie,
    };
  }

  return null;
}

export function generateStaticParams() {
  return VARIANTES.map((variante) => ({ params: variante }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const monnaieInfo = MONNAIES.find((m) => m.id === parsed.monnaie);
  if (!monnaieInfo) return {};

  let title: string;
  let description: string;
  let canonical: string;

  if (parsed.type === "monnaie-vers-euros") {
    const euros = monnaieVersEuros(parsed.quantite, parsed.monnaie);
    const quantiteStr = fmt(parsed.quantite, 0);
    const eurosStr = fmt(euros, 2);

    title = `Combien font ${quantiteStr} ${monnaieInfo.nom} en euros ? ${eurosStr}€`;
    description = `${quantiteStr} ${monnaieInfo.nom} (${monnaieInfo.jeu}) = ${eurosStr} EUR. Convertisseur avec taux officiels.`;
    canonical = `/convertisseur-monnaie-jeu/${slug}`;
  } else {
    const monnaieConverted = eurosVersMonnaie(parsed.quantite, parsed.monnaie);
    const quantiteStr = fmt(parsed.quantite, 2);
    const monnaieStr = fmt(monnaieConverted, 0);

    title = `${quantiteStr}€ en ${monnaieInfo.nom} = ${monnaieStr} ${monnaieInfo.nom}`;
    description = `${quantiteStr} euros convertis en ${monnaieInfo.nom} (${monnaieInfo.jeu}) = ${monnaieStr}. Taux officiels.`;
    canonical = `/convertisseur-monnaie-jeu/${slug}`;
  }

  return {
    alternates: { canonical },
    title,
    description,
    openGraph: {
      title,
      description,
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

  const monnaieInfo = MONNAIES.find((m) => m.id === parsed.monnaie);
  if (!monnaieInfo) notFound();

  let euros: number;
  let conversions: Record<Monnaie, number>;
  let titre: string;
  let soustitre: string;

  if (parsed.type === "monnaie-vers-euros") {
    euros = monnaieVersEuros(parsed.quantite, parsed.monnaie);
    conversions = convertirVers(parsed.quantite, parsed.monnaie);
    titre = `${fmt(parsed.quantite, 0)} ${monnaieInfo.nom} = ${fmt(euros, 2)}€`;
    soustitre = `Conversion de ${monnaieInfo.nom} vers euros`;
  } else {
    euros = parsed.quantite;
    conversions = {} as Record<Monnaie, number>;
    for (const m of MONNAIES) {
      conversions[m.id] = eurosVersMonnaie(euros, m.id);
    }
    titre = `${fmt(euros, 2)}€ = ${fmt(conversions[parsed.monnaie], 0)} ${monnaieInfo.nom}`;
    soustitre = `Conversion d'euros vers ${monnaieInfo.nom}`;
  }

  // Variantes autres quantites pour le meme jeu
  const autrVariantes = VARIANTES.filter(
    (v) =>
      (v.includes(parsed.monnaie) && v.includes("euros")) ||
      (parsed.type === "euros-vers-monnaie" && v.includes(parsed.monnaie))
  ).slice(0, 8);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: titre,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${parsed.type === "monnaie-vers-euros" ? `${fmt(parsed.quantite, 0)} ${monnaieInfo.nom} (${monnaieInfo.jeu}) = ${fmt(euros, 2)} EUR` : `${fmt(euros, 2)} EUR = ${fmt(conversions[parsed.monnaie], 0)} ${monnaieInfo.nom}`}.`,
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
        currentPage={monnaieInfo.nom}
        parentPage="Convertisseur Monnaies Jeux"
        parentHref="/convertisseur-monnaie-jeu"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-pink-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {monnaieInfo.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{titre}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{soustitre}</p>

      {/* Resultat principal en gros */}
      <div className="bg-gradient-to-br from-fuchsia-600 to-pink-700 text-white rounded-2xl p-8 shadow-lg shadow-pink-200/50 mb-8">
        <p className="text-pink-100 mb-1">
          {parsed.type === "monnaie-vers-euros" ? "Equivalent en euros" : `Equivalent en ${monnaieInfo.nom}`}
        </p>
        <p className="text-5xl font-extrabold tracking-tight">
          {parsed.type === "monnaie-vers-euros"
            ? fmt(euros, 2)
            : fmt(conversions[parsed.monnaie], 0)}
          {parsed.type === "monnaie-vers-euros" ? (
            <span className="text-2xl font-semibold">€</span>
          ) : (
            <span className="text-2xl font-semibold ml-2">
              {monnaieInfo.nom}
            </span>
          )}
        </p>
      </div>

      {/* Tableau: Autres quantites du meme jeu */}
      {parsed.type === "monnaie-vers-euros" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Autres quantites de {monnaieInfo.nom}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    {monnaieInfo.nom}
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    EUR
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  0.5,
                  1,
                  2,
                  5,
                  10,
                  20,
                  50,
                  100,
                ]
                  .map((coef) => parsed.quantite * coef)
                  .map((q) => ({
                    quantite: q,
                    euros: monnaieVersEuros(q, parsed.monnaie),
                  }))
                  .map((row) => (
                    <tr
                      key={row.quantite}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-2 font-medium text-slate-700">
                        {fmt(row.quantite, 0)}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-slate-800">
                        {fmt(row.euros, 2)}€
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tableau: Meme valeur EUR dans autres jeux */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmt(euros, 2)}€ dans les autres jeux
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Jeu / Monnaie
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Quantite
                </th>
              </tr>
            </thead>
            <tbody>
              {MONNAIES.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {m.emoji} {m.nom}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">
                    {fmt(conversions[m.id], 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <ConvertisseurMonnaieJeu />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/convertisseur-monnaie-jeu" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
