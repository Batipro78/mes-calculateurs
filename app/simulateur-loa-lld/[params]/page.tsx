import type { Metadata } from "next";
import SimulateurLoaLld from "../SimulateurLoaLld";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerLoaLld, fmtEur } from "../loaLldCalc";

// Couples (prix-vehicule, duree) pour le SEO
const CAS: Array<{ slug: string; prix: number; loyer: number; duree: number; valeurResiduelle: number; label: string }> = [
  { slug: "voiture-20000-euros-36-mois", prix: 20000, loyer: 250, duree: 36, valeurResiduelle: 9000, label: "Voiture 20 000 EUR / 36 mois" },
  { slug: "voiture-25000-euros-48-mois", prix: 25000, loyer: 290, duree: 48, valeurResiduelle: 10000, label: "Voiture 25 000 EUR / 48 mois" },
  { slug: "voiture-30000-euros-48-mois", prix: 30000, loyer: 350, duree: 48, valeurResiduelle: 12000, label: "Voiture 30 000 EUR / 48 mois" },
  { slug: "voiture-35000-euros-48-mois", prix: 35000, loyer: 420, duree: 48, valeurResiduelle: 14000, label: "Voiture 35 000 EUR / 48 mois" },
  { slug: "voiture-40000-euros-48-mois", prix: 40000, loyer: 480, duree: 48, valeurResiduelle: 16000, label: "Voiture 40 000 EUR / 48 mois" },
  { slug: "voiture-50000-euros-60-mois", prix: 50000, loyer: 590, duree: 60, valeurResiduelle: 18000, label: "Voiture 50 000 EUR / 60 mois" },
  { slug: "voiture-electrique-30000-euros-48-mois", prix: 30000, loyer: 320, duree: 48, valeurResiduelle: 10000, label: "Voiture electrique 30 000 EUR / 48 mois" },
];

export function generateStaticParams() {
  return CAS.map((c) => ({ params: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) return {};

  const res = calculerLoaLld({
    prixVehicule: cas.prix, apportInitial: Math.round(cas.prix * 0.1),
    loyerMensuel: cas.loyer, dureeMonths: cas.duree,
    valeurResiduelleLOA: cas.valeurResiduelle, kmParAn: 15000,
  });

  return {
    alternates: { canonical: `/simulateur-loa-lld/${slug}` },
    title: `LOA vs LLD ${cas.label} - Comparatif 2026`,
    description: `Comparatif LOA vs LLD pour une ${cas.label.toLowerCase()} : LOA ${fmtEur(res.coutTotalLOA)} (avec rachat), LLD ${fmtEur(res.coutTotalLLD)}. Loyer ${fmtEur(cas.loyer)}/mois.`,
    keywords: `LOA LLD ${cas.prix} euros, location voiture ${cas.prix}, leasing ${cas.duree} mois, comparatif LOA LLD ${cas.prix}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) notFound();

  const apport = Math.round(cas.prix * 0.1);
  const res = calculerLoaLld({
    prixVehicule: cas.prix, apportInitial: apport,
    loyerMensuel: cas.loyer, dureeMonths: cas.duree,
    valeurResiduelleLOA: cas.valeurResiduelle, kmParAn: 15000,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le cout total LOA et LLD pour ${cas.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${cas.label.toLowerCase()} : la LOA avec rachat coute ${fmtEur(res.coutTotalLOA)} au total (${fmtEur(apport)} apport + ${fmtEur(cas.loyer * cas.duree)} loyers + ${fmtEur(cas.valeurResiduelle)} rachat final). La LLD simple coute ${fmtEur(res.coutTotalLLD)} (apport + loyers, puis restitution). Loyer mensuel ${fmtEur(cas.loyer)}, duree ${cas.duree} mois.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={cas.label} parentPage="Simulateur LOA vs LLD" parentHref="/simulateur-loa-lld" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚘
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">LOA vs LLD : {cas.label}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comparatif location avec/sans option d&apos;achat pour une {cas.label.toLowerCase()}, apport {fmtEur(apport)}, loyer {fmtEur(cas.loyer)}/mois.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-sky-200/50">
          <p className="text-sky-100 text-sm mb-1">LOA avec rachat</p>
          <p className="text-4xl font-extrabold">{fmtEur(res.coutTotalLOA)}</p>
          <p className="text-sky-100 mt-1 text-sm">devenir proprietaire a la fin</p>
          <div className="h-px bg-white/20 my-3" />
          <div className="text-xs space-y-1">
            <p>Apport : {fmtEur(apport)}</p>
            <p>Loyers : {fmtEur(cas.loyer * cas.duree)}</p>
            <p>Rachat : {fmtEur(cas.valeurResiduelle)}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
          <p className="text-emerald-100 text-sm mb-1">LLD (restitution)</p>
          <p className="text-4xl font-extrabold">{fmtEur(res.coutTotalLLD)}</p>
          <p className="text-emerald-100 mt-1 text-sm">location puis restitution</p>
          <div className="h-px bg-white/20 my-3" />
          <div className="text-xs space-y-1">
            <p>Apport : {fmtEur(apport)}</p>
            <p>Loyers : {fmtEur(cas.loyer * cas.duree)}</p>
            <p>Pas de rachat</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <SimulateurLoaLld />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres profils</h2>
        <div className="flex flex-wrap gap-2">
          {CAS.filter(c => c.slug !== cas.slug).map(c => (
            <a key={c.slug} href={`/simulateur-loa-lld/${c.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all">
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-loa-lld" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
