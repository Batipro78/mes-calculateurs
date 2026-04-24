import type { Metadata } from "next";
import CalculateurLMNP from "../CalculateurLMNP";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerLMNP, fmtEur } from "../lmnpCalc";

// Cas pratiques SEO
const CAS: Array<{ slug: string; label: string; prix: number; terrain: number; mobilier: number; loyers: number; charges: number; tmi: number }> = [
  { slug: "studio-100000-euros", label: "Studio 100 000 EUR", prix: 100000, terrain: 15000, mobilier: 5000, loyers: 7200, charges: 2000, tmi: 30 },
  { slug: "appartement-150000-euros", label: "Appartement 150 000 EUR", prix: 150000, terrain: 22000, mobilier: 8000, loyers: 9600, charges: 2800, tmi: 30 },
  { slug: "appartement-200000-euros", label: "Appartement 200 000 EUR", prix: 200000, terrain: 30000, mobilier: 10000, loyers: 12000, charges: 3500, tmi: 30 },
  { slug: "appartement-300000-euros", label: "Appartement 300 000 EUR", prix: 300000, terrain: 45000, mobilier: 12000, loyers: 16000, charges: 4500, tmi: 30 },
  { slug: "maison-400000-euros", label: "Maison 400 000 EUR", prix: 400000, terrain: 80000, mobilier: 15000, loyers: 20000, charges: 5500, tmi: 30 },
  { slug: "tmi-41-appartement-200000", label: "Appartement 200K TMI 41%", prix: 200000, terrain: 30000, mobilier: 10000, loyers: 12000, charges: 3500, tmi: 41 },
  { slug: "tmi-11-appartement-150000", label: "Appartement 150K TMI 11%", prix: 150000, terrain: 22000, mobilier: 8000, loyers: 9600, charges: 2800, tmi: 11 },
];

export function generateStaticParams() {
  return CAS.map((c) => ({ params: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) return {};

  const res = calculerLMNP({
    prixBienTotal: cas.prix, valeurTerrain: cas.terrain, valeurMobilier: cas.mobilier,
    dureeAmortBien: 30, dureeAmortMobilier: 7,
    loyersAnnuelsHT: cas.loyers, chargesDeductibles: cas.charges, tmi: cas.tmi,
  });

  return {
    alternates: { canonical: `/calcul-amortissement-lmnp/${slug}` },
    title: `LMNP ${cas.label} - Amortissement et economie fiscale 2026`,
    description: `LMNP ${cas.label.toLowerCase()} (TMI ${cas.tmi}%) : amortissement annuel ${fmtEur(res.amortissementTotalAnnuel)}, gain regime reel vs micro-BIC ${fmtEur(res.gainRegimeReel)}/an. Simulation detaillee.`,
    keywords: `LMNP ${cas.prix} euros, amortissement ${cas.label.toLowerCase()}, LMNP reel ${cas.prix}, fiscalite LMNP ${cas.prix}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) notFound();

  const res = calculerLMNP({
    prixBienTotal: cas.prix, valeurTerrain: cas.terrain, valeurMobilier: cas.mobilier,
    dureeAmortBien: 30, dureeAmortMobilier: 7,
    loyersAnnuelsHT: cas.loyers, chargesDeductibles: cas.charges, tmi: cas.tmi,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel amortissement pour une ${cas.label.toLowerCase()} en LMNP ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une ${cas.label.toLowerCase()} en LMNP (TMI ${cas.tmi}%), avec ${fmtEur(cas.loyers)} de loyers annuels et ${fmtEur(cas.charges)} de charges deductibles, l'amortissement total annuel est de ${fmtEur(res.amortissementTotalAnnuel)} (${fmtEur(res.amortissementBienAnnuel)} bien + ${fmtEur(res.amortissementMobilierAnnuel)} mobilier). Economie d'impot annuelle via l'amortissement : ${fmtEur(res.economieImpot)}. Gain du regime reel vs micro-BIC : ${fmtEur(res.gainRegimeReel)}/an.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={cas.label} parentPage="Calcul Amortissement LMNP" parentHref="/calcul-amortissement-lmnp" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">LMNP : {cas.label}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Amortissement et economie fiscale pour un investissement LMNP a {fmtEur(cas.prix)}, TMI {cas.tmi}%.
      </p>

      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-teal-100 mb-1">Gain fiscal annuel (regime reel vs micro-BIC)</p>
        <p className="text-5xl font-extrabold tracking-tight">+{fmtEur(res.gainRegimeReel)}</p>
        <p className="text-teal-100 mt-2">
          Soit {fmtEur(res.gainRegimeReel * 30)} sur 30 ans d&apos;amortissement
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-teal-100">Amortissement total/an</p>
            <p className="font-semibold">{fmtEur(res.amortissementTotalAnnuel)}</p>
          </div>
          <div>
            <p className="text-teal-100">Impot micro-BIC</p>
            <p className="font-semibold">{fmtEur(res.impotSansLMNP)}</p>
          </div>
          <div>
            <p className="text-teal-100">Impot LMNP reel</p>
            <p className="font-semibold">{fmtEur(res.impotAvecLMNPReel)}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurLMNP />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres profils LMNP</h2>
        <div className="flex flex-wrap gap-2">
          {CAS.filter(c => c.slug !== cas.slug).map(c => (
            <a key={c.slug} href={`/calcul-amortissement-lmnp/${c.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all">
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-amortissement-lmnp" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
