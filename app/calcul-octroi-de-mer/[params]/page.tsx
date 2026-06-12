import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurOctroiMer from "../CalculateurOctroiMer";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  calculerOctroiMer,
  fmtEur,
  fmtPct,
  TVA_PAR_TERRITOIRE,
  LABEL_TERRITOIRE,
  type Territoire,
} from "../octroiMerCalc";

// 15 variantes : 5 territoires x 3 montants (500, 1000, 2000)
interface VarianteOM {
  slug: string;
  territoire: Territoire;
  valeurCAF: number;
  label: string;
}

const VARIANTES: VarianteOM[] = [
  // Guadeloupe
  { slug: "guadeloupe-500-euros",    territoire: "guadeloupe",  valeurCAF: 500,  label: "Guadeloupe 500 EUR" },
  { slug: "guadeloupe-1000-euros",   territoire: "guadeloupe",  valeurCAF: 1000, label: "Guadeloupe 1 000 EUR" },
  { slug: "guadeloupe-2000-euros",   territoire: "guadeloupe",  valeurCAF: 2000, label: "Guadeloupe 2 000 EUR" },
  // Martinique
  { slug: "martinique-500-euros",    territoire: "martinique",  valeurCAF: 500,  label: "Martinique 500 EUR" },
  { slug: "martinique-1000-euros",   territoire: "martinique",  valeurCAF: 1000, label: "Martinique 1 000 EUR" },
  { slug: "martinique-2000-euros",   territoire: "martinique",  valeurCAF: 2000, label: "Martinique 2 000 EUR" },
  // Guyane
  { slug: "guyane-500-euros",        territoire: "guyane",      valeurCAF: 500,  label: "Guyane 500 EUR" },
  { slug: "guyane-1000-euros",       territoire: "guyane",      valeurCAF: 1000, label: "Guyane 1 000 EUR" },
  { slug: "guyane-2000-euros",       territoire: "guyane",      valeurCAF: 2000, label: "Guyane 2 000 EUR" },
  // La Reunion
  { slug: "la-reunion-500-euros",    territoire: "la-reunion",  valeurCAF: 500,  label: "La Reunion 500 EUR" },
  { slug: "la-reunion-1000-euros",   territoire: "la-reunion",  valeurCAF: 1000, label: "La Reunion 1 000 EUR" },
  { slug: "la-reunion-2000-euros",   territoire: "la-reunion",  valeurCAF: 2000, label: "La Reunion 2 000 EUR" },
  // Mayotte
  { slug: "mayotte-500-euros",       territoire: "mayotte",     valeurCAF: 500,  label: "Mayotte 500 EUR" },
  { slug: "mayotte-1000-euros",      territoire: "mayotte",     valeurCAF: 1000, label: "Mayotte 1 000 EUR" },
  { slug: "mayotte-2000-euros",      territoire: "mayotte",     valeurCAF: 2000, label: "Mayotte 2 000 EUR" },
];

// Taux standards appliques pour les variantes dynamiques
const TAUX_OM_DEFAUT = 12.5;
const TAUX_OMR_DEFAUT = 2.5;

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) return {};

  const tauxTVA = TVA_PAR_TERRITOIRE[variante.territoire];
  const res = calculerOctroiMer({
    territoire: variante.territoire,
    valeurCAF: variante.valeurCAF,
    tauxOM: TAUX_OM_DEFAUT,
    tauxOMR: TAUX_OMR_DEFAUT,
    tauxTVA,
  });

  const labelTerritoire = LABEL_TERRITOIRE[variante.territoire];

  return {
    alternates: { canonical: `/calcul-octroi-de-mer/${slug}` },
    title: `Octroi de Mer ${labelTerritoire} ${variante.valeurCAF} EUR - Simulation 2026`,
    description: `Octroi de mer sur ${variante.valeurCAF} EUR CAF en ${labelTerritoire} : ${fmtEur(res.totalTaxes)} de taxes (OM ${TAUX_OM_DEFAUT} % + OMR ${TAUX_OMR_DEFAUT} % + TVA ${tauxTVA} %), cout rendu ${fmtEur(res.coutRendu)}, majoration ${fmtPct(res.majorationPct)}.`,
    keywords: `octroi de mer ${labelTerritoire.toLowerCase()}, calcul octroi de mer ${variante.valeurCAF} euros, taxe import ${labelTerritoire.toLowerCase()}, cout rendu DOM`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) notFound();

  const tauxTVA = TVA_PAR_TERRITOIRE[variante.territoire];
  const res = calculerOctroiMer({
    territoire: variante.territoire,
    valeurCAF: variante.valeurCAF,
    tauxOM: TAUX_OM_DEFAUT,
    tauxOMR: TAUX_OMR_DEFAUT,
    tauxTVA,
  });

  const labelTerritoire = LABEL_TERRITOIRE[variante.territoire];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est l'octroi de mer sur ${variante.valeurCAF} EUR en ${labelTerritoire} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une marchandise a ${fmtEur(variante.valeurCAF)} CAF importee en ${labelTerritoire}, avec un taux d'octroi de mer de ${TAUX_OM_DEFAUT} % et un OMR de ${TAUX_OMR_DEFAUT} %, le total des taxes s'eleve a ${fmtEur(res.totalTaxes)} (dont OM ${fmtEur(res.octroiDeMer)}, OMR ${fmtEur(res.omr)}, TVA ${fmtEur(res.tva)}). Le cout rendu DOM est de ${fmtEur(res.coutRendu)}, soit une majoration de ${fmtPct(res.majorationPct)} sur la valeur CAF.`,
        },
      },
      {
        "@type": "Question",
        name: `La TVA s'applique-t-elle en ${labelTerritoire} en plus de l'octroi de mer ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tauxTVA > 0
            ? `Oui, en ${labelTerritoire}, la TVA s'applique au taux de ${tauxTVA} % sur la valeur CAF de la marchandise. Sur ${fmtEur(variante.valeurCAF)}, cela represente ${fmtEur(res.tva)}. L'octroi de mer n'entre pas dans la base d'imposition de la TVA (articles 267 et 292 du CGI).`
            : `Non, en ${labelTerritoire}, la TVA n'est provisoirement pas applicable (taux 0 %). Seuls l'octroi de mer (${fmtEur(res.octroiDeMer)}) et l'OMR (${fmtEur(res.omr)}) s'appliquent sur ${fmtEur(variante.valeurCAF)} CAF.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment reduire le cout de l'octroi de mer en ${labelTerritoire} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Certains produits beneficient de taux reduits ou de franchises decides par la collectivite (produits de premiere necessite, matieres premieres locales, equipements professionnels). Pour ${fmtEur(variante.valeurCAF)} de marchandise, le cout rendu actuel est de ${fmtEur(res.coutRendu)}. Consultez la grille tarifaire officielle sur douane.gouv.fr et verifiez le code NC de votre produit.`,
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
        currentPage={variante.label}
        parentPage="Calcul Octroi de Mer"
        parentHref="/calcul-octroi-de-mer"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏝️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Octroi de Mer : {variante.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation de l&apos;octroi de mer sur {fmtEur(variante.valeurCAF)} CAF en {labelTerritoire} — taux OM {TAUX_OM_DEFAUT} %, OMR {TAUX_OMR_DEFAUT} %, TVA {tauxTVA} %.
      </p>

      {/* Carte principale */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-100 mb-1">Total taxes a l&apos;importation</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.totalTaxes)}</p>
        <p className="text-blue-100 mt-2">
          Cout rendu {labelTerritoire} : <strong>{fmtEur(res.coutRendu)}</strong> — majoration {fmtPct(res.majorationPct)}
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-100">Octroi de mer</p>
            <p className="font-semibold">{fmtEur(res.octroiDeMer)}</p>
          </div>
          <div>
            <p className="text-blue-100">OMR</p>
            <p className="font-semibold">{fmtEur(res.omr)}</p>
          </div>
          <div>
            <p className="text-blue-100">TVA ({tauxTVA} %)</p>
            <p className="font-semibold">{fmtEur(res.tva)}</p>
          </div>
        </div>
      </div>

      {/* Tableau de decomposition */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
        <p className="font-semibold text-blue-900 mb-3">Decomposition des taxes — {labelTerritoire}</p>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">Valeur CAF</td>
              <td className="py-2 text-right font-medium text-slate-800">{fmtEur(variante.valeurCAF)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">Octroi de mer (OM {TAUX_OM_DEFAUT} %)</td>
              <td className="py-2 text-right font-bold text-red-600">{fmtEur(res.octroiDeMer)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">OMR ({TAUX_OMR_DEFAUT} %)</td>
              <td className="py-2 text-right font-bold text-orange-600">{fmtEur(res.omr)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700">TVA ({tauxTVA} %)</td>
              <td className="py-2 text-right font-bold text-amber-600">{fmtEur(res.tva)}</td>
            </tr>
            <tr className="border-b border-blue-200">
              <td className="py-2 text-slate-700 font-semibold">Total taxes</td>
              <td className="py-2 text-right font-bold text-red-700">{fmtEur(res.totalTaxes)}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-800 font-bold text-base">Cout rendu {labelTerritoire}</td>
              <td className="py-2 text-right font-extrabold text-blue-700 text-xl">{fmtEur(res.coutRendu)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurOctroiMer />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations octroi de mer</h2>
        <div className="flex flex-wrap gap-2">
          {VARIANTES.filter((v) => v.slug !== slug).map((v) => (
            <a
              key={v.slug}
              href={`/calcul-octroi-de-mer/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {v.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-octroi-de-mer" />
    </div>
  );
}
