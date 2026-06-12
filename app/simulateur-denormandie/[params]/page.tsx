import type { Metadata } from "next";
import CalculateurDenormandie from "../CalculateurDenormandie";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerDenormandie, fmtEur, fmtPct } from "../denormandieCalc";
import type { Localisation, DureeEngagement } from "../denormandieCalc";

interface VarianteDenormandie {
  slug: string;
  label: string;
  localisation: Localisation;
  prixAcquisition: number;
  montantTravaux: number;
  duree: DureeEngagement;
}

// Travaux = prix / 3 (exactement 25 % du total = prix/(3) car travaux/(prix+travaux) = (p/3)/(p+p/3) = (p/3)/(4p/3) = 1/4 = 25%)
function travaux(prix: number): number {
  return Math.round(prix / 3);
}

const VARIANTES: VarianteDenormandie[] = [
  // Metropole - 7 variantes
  {
    slug: "metropole-100000-euros-6-ans",
    label: "100 000 EUR · Metropole · 6 ans",
    localisation: "metropole",
    prixAcquisition: 100000,
    montantTravaux: travaux(100000),
    duree: 6,
  },
  {
    slug: "metropole-100000-euros-9-ans",
    label: "100 000 EUR · Metropole · 9 ans",
    localisation: "metropole",
    prixAcquisition: 100000,
    montantTravaux: travaux(100000),
    duree: 9,
  },
  {
    slug: "metropole-150000-euros-6-ans",
    label: "150 000 EUR · Metropole · 6 ans",
    localisation: "metropole",
    prixAcquisition: 150000,
    montantTravaux: travaux(150000),
    duree: 6,
  },
  {
    slug: "metropole-150000-euros-9-ans",
    label: "150 000 EUR · Metropole · 9 ans",
    localisation: "metropole",
    prixAcquisition: 150000,
    montantTravaux: travaux(150000),
    duree: 9,
  },
  {
    slug: "metropole-150000-euros-12-ans",
    label: "150 000 EUR · Metropole · 12 ans",
    localisation: "metropole",
    prixAcquisition: 150000,
    montantTravaux: travaux(150000),
    duree: 12,
  },
  {
    slug: "metropole-200000-euros-6-ans",
    label: "200 000 EUR · Metropole · 6 ans",
    localisation: "metropole",
    prixAcquisition: 200000,
    montantTravaux: travaux(200000),
    duree: 6,
  },
  {
    slug: "metropole-200000-euros-9-ans",
    label: "200 000 EUR · Metropole · 9 ans",
    localisation: "metropole",
    prixAcquisition: 200000,
    montantTravaux: travaux(200000),
    duree: 9,
  },
  // Outre-mer - 5 variantes
  {
    slug: "outre-mer-100000-euros-6-ans",
    label: "100 000 EUR · Outre-mer · 6 ans",
    localisation: "outre-mer",
    prixAcquisition: 100000,
    montantTravaux: travaux(100000),
    duree: 6,
  },
  {
    slug: "outre-mer-150000-euros-6-ans",
    label: "150 000 EUR · Outre-mer · 6 ans",
    localisation: "outre-mer",
    prixAcquisition: 150000,
    montantTravaux: travaux(150000),
    duree: 6,
  },
  {
    slug: "outre-mer-150000-euros-9-ans",
    label: "150 000 EUR · Outre-mer · 9 ans",
    localisation: "outre-mer",
    prixAcquisition: 150000,
    montantTravaux: travaux(150000),
    duree: 9,
  },
  {
    slug: "outre-mer-150000-euros-12-ans",
    label: "150 000 EUR · Outre-mer · 12 ans",
    localisation: "outre-mer",
    prixAcquisition: 150000,
    montantTravaux: travaux(150000),
    duree: 12,
  },
  {
    slug: "outre-mer-200000-euros-9-ans",
    label: "200 000 EUR · Outre-mer · 9 ans",
    localisation: "outre-mer",
    prixAcquisition: 200000,
    montantTravaux: travaux(200000),
    duree: 9,
  },
];

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const v = VARIANTES.find((x) => x.slug === slug);
  if (!v) return {};

  const res = calculerDenormandie({
    localisation: v.localisation,
    prixAcquisition: v.prixAcquisition,
    montantTravaux: v.montantTravaux,
    duree: v.duree,
  });

  const zone = v.localisation === "outre-mer" ? "Outre-mer" : "Metropole";

  return {
    alternates: { canonical: `/simulateur-denormandie/${slug}` },
    title: `Denormandie ${fmtEur(v.prixAcquisition)} · ${zone} · ${v.duree} ans - Simulation 2026`,
    description: `Simulation Denormandie : acquisition ${fmtEur(v.prixAcquisition)} + travaux ${fmtEur(v.montantTravaux)}, ${v.duree} ans en ${zone.toLowerCase()}. Reduction totale : ${fmtEur(res.reductionTotale)}, soit ${fmtEur(res.reductionAnnuelleBase)}/an.`,
    keywords: `Denormandie ${v.prixAcquisition} euros, Denormandie ${zone.toLowerCase()} ${v.duree} ans, simulation Denormandie 2026, reduction impot Denormandie`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const v = VARIANTES.find((x) => x.slug === slug);
  if (!v) notFound();

  const res = calculerDenormandie({
    localisation: v.localisation,
    prixAcquisition: v.prixAcquisition,
    montantTravaux: v.montantTravaux,
    duree: v.duree,
  });

  const zone = v.localisation === "outre-mer" ? "Outre-mer" : "Metropole";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle reduction d'impot Denormandie pour ${fmtEur(v.prixAcquisition)} en ${zone.toLowerCase()} sur ${v.duree} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une acquisition de ${fmtEur(v.prixAcquisition)} avec ${fmtEur(v.montantTravaux)} de travaux (25 % du total) en ${zone.toLowerCase()}, la base Denormandie retenue est ${fmtEur(res.baseRetenue)}. Avec un engagement de ${v.duree} ans, le taux est de ${(res.taux * 100).toFixed(0)} %, soit une reduction d'impot totale de ${fmtEur(res.reductionTotale)}, equivalant a ${fmtEur(res.reductionAnnuelleBase)} par an.`,
        },
      },
      {
        "@type": "Question",
        name: `Le dispositif Denormandie est-il plus avantageux en outre-mer ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui. Les taux Denormandie en outre-mer (DOM-COM) sont significativement plus eleves : 23 % pour 6 ans, 29 % pour 9 ans et 32 % pour 12 ans, contre respectivement 12 %, 18 % et 21 % en metropole. Sur une base de 200 000 EUR sur 9 ans, la difference est de 22 000 EUR supplementaires de reduction d'impot en outre-mer (58 000 EUR vs 36 000 EUR en metropole).`,
        },
      },
      {
        "@type": "Question",
        name: `Comment verifier que mon bien est dans une commune eligible Denormandie ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Il faut que la commune soit membre du programme Action coeur de ville (liste disponible sur action-coeur-de-ville.fr), ait signe une convention ORT (operation de revitalisation du territoire), ou concerne une copropriete en grande difficulte (depuis 2024). Vous pouvez verifier l'eligibilite de votre commune sur service-public.fr via le simulateur officiel Denormandie.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={v.label}
        parentPage="Simulateur Denormandie"
        parentHref="/simulateur-denormandie"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏘️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Denormandie : {v.label}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation Denormandie {zone} - acquisition {fmtEur(v.prixAcquisition)} + travaux {fmtEur(v.montantTravaux)} · engagement {v.duree} ans.
      </p>

      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl p-8 shadow-lg shadow-indigo-200/50 mb-8">
        <p className="text-indigo-100 mb-1">Reduction d&apos;impot totale sur {v.duree} ans</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.reductionTotale)}</p>
        <p className="text-indigo-100 mt-2">
          Taux {(res.taux * 100).toFixed(0)} % · Base {fmtEur(res.baseRetenue)}{res.basePlafonnee ? " (plafonnee a 300 000 EUR)" : ""}
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-indigo-100">Reduction annuelle</p>
            <p className="font-semibold">{fmtEur(res.reductionAnnuelleBase)}/an</p>
          </div>
          <div>
            <p className="text-indigo-100">Part travaux</p>
            <p className="font-semibold">{fmtPct(res.partTravaux)}</p>
          </div>
          <div>
            <p className="text-indigo-100">Cout total</p>
            <p className="font-semibold">{fmtEur(res.coutTotal)}</p>
          </div>
        </div>
      </div>

      {res.detail12ans && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-3">Detail de la reduction sur 12 ans</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-white rounded-lg p-3 border border-indigo-100">
              <p className="text-xs text-slate-500">Annees 1 a 9</p>
              <p className="text-xl font-bold text-indigo-700">{fmtEur(res.reductionAnnuelleBonifiee)} / an</p>
              <p className="text-xs text-slate-400">= {fmtEur(res.reductionAnnuelleBonifiee * 9)} sur 9 ans</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-100">
              <p className="text-xs text-slate-500">Annees 10 a 12</p>
              <p className="text-xl font-bold text-indigo-700">{fmtEur(res.reductionAnnuelleFinale)} / an</p>
              <p className="text-xs text-slate-400">= {fmtEur(res.reductionAnnuelleFinale * 3)} sur 3 ans</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurDenormandie />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations Denormandie</h2>
        <div className="flex flex-wrap gap-2">
          {VARIANTES.filter((x) => x.slug !== v.slug).map((x) => (
            <a
              key={x.slug}
              href={`/simulateur-denormandie/${x.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
            >
              {x.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-denormandie" />
    </div>
  );
}
