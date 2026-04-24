import type { Metadata } from "next";
import CalculateurPrestation from "../CalculateurPrestation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerPrestation, fmtEur } from "../prestationCalc";

// Cas typiques
const CAS: Array<{ slug: string; label: string; revenuDem: number; revenuDeb: number; duree: number; age: number; enfants: number }> = [
  { slug: "mariage-10-ans", label: "Mariage 10 ans", revenuDem: 24000, revenuDeb: 50000, duree: 10, age: 40, enfants: 1 },
  { slug: "mariage-15-ans", label: "Mariage 15 ans", revenuDem: 24000, revenuDeb: 60000, duree: 15, age: 45, enfants: 2 },
  { slug: "mariage-20-ans", label: "Mariage 20 ans", revenuDem: 20000, revenuDeb: 70000, duree: 20, age: 50, enfants: 2 },
  { slug: "mariage-25-ans", label: "Mariage 25 ans", revenuDem: 18000, revenuDeb: 80000, duree: 25, age: 55, enfants: 3 },
  { slug: "mariage-30-ans", label: "Mariage 30 ans", revenuDem: 15000, revenuDeb: 80000, duree: 30, age: 60, enfants: 3 },
  { slug: "mariage-5-ans-sans-enfant", label: "Mariage 5 ans sans enfant", revenuDem: 30000, revenuDeb: 50000, duree: 5, age: 35, enfants: 0 },
  { slug: "femme-au-foyer-20-ans", label: "Femme au foyer 20 ans", revenuDem: 0, revenuDeb: 60000, duree: 20, age: 50, enfants: 2 },
];

export function generateStaticParams() {
  return CAS.map((c) => ({ params: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) return {};

  const res = calculerPrestation({
    revenuAnnuelDemandeur: cas.revenuDem, revenuAnnuelDebiteur: cas.revenuDeb,
    dureeMariage: cas.duree, ageDemandeur: cas.age, nbEnfantsDemandeur: cas.enfants, patrimoineCommun: 0,
  });

  return {
    alternates: { canonical: `/calcul-prestation-compensatoire/${slug}` },
    title: `Prestation compensatoire : ${cas.label} - Simulation 2026`,
    description: `Estimation de la prestation compensatoire pour un ${cas.label.toLowerCase()} (${cas.revenuDem.toLocaleString("fr-FR")} vs ${cas.revenuDeb.toLocaleString("fr-FR")} EUR) : montant indicatif ${fmtEur(res.montantEstime)}. Fourchette ${fmtEur(res.plancher)}-${fmtEur(res.plafond)}.`,
    keywords: `prestation compensatoire ${cas.label.toLowerCase()}, divorce ${cas.duree} ans, prestation divorce apres ${cas.duree} ans`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) notFound();

  const res = calculerPrestation({
    revenuAnnuelDemandeur: cas.revenuDem, revenuAnnuelDebiteur: cas.revenuDeb,
    dureeMariage: cas.duree, ageDemandeur: cas.age, nbEnfantsDemandeur: cas.enfants, patrimoineCommun: 0,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle prestation compensatoire apres un ${cas.label.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${cas.label.toLowerCase()} avec ${cas.revenuDem.toLocaleString("fr-FR")} EUR vs ${cas.revenuDeb.toLocaleString("fr-FR")} EUR de revenus annuels et ${cas.enfants} enfant(s) a charge, l'estimation indicative est de ${fmtEur(res.montantEstime)}, avec une fourchette de ${fmtEur(res.plancher)} a ${fmtEur(res.plafond)} selon la methode de calcul utilisee. Le juge decide librement selon l'article 271 du Code civil.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={cas.label} parentPage="Calcul Prestation Compensatoire" parentHref="/calcul-prestation-compensatoire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Prestation compensatoire : {cas.label}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation pour un divorce apres {cas.duree} ans de mariage, revenus {cas.revenuDem.toLocaleString("fr-FR")} vs {cas.revenuDeb.toLocaleString("fr-FR")} EUR/an.
      </p>

      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8">
        <p className="text-violet-100 mb-1">Montant estime indicatif</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.montantEstime)}</p>
        <p className="text-violet-100 mt-2">
          Fourchette : {fmtEur(res.plancher)} - {fmtEur(res.plafond)}
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurPrestation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres cas typiques</h2>
        <div className="flex flex-wrap gap-2">
          {CAS.filter(c => c.slug !== cas.slug).map(c => (
            <a key={c.slug} href={`/calcul-prestation-compensatoire/${c.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all">
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-prestation-compensatoire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
