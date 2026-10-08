import type { Metadata } from "next";
import SimulateurAmende from "../SimulateurAmende";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerAmende, fmtEur } from "../amendeCalc";

// Couples (vitesse mesuree, vitesse autorisee, zone) pour le SEO
const CAS: Array<{ slug: string; mesuree: number; autorisee: number; zone: "ville" | "hors-ville"; label: string }> = [
  { slug: "60-en-zone-50", mesuree: 60, autorisee: 50, zone: "ville", label: "60 km/h en zone 50" },
  { slug: "65-en-zone-50", mesuree: 65, autorisee: 50, zone: "ville", label: "65 km/h en zone 50" },
  { slug: "80-en-zone-50", mesuree: 80, autorisee: 50, zone: "ville", label: "80 km/h en zone 50" },
  { slug: "100-en-zone-50", mesuree: 100, autorisee: 50, zone: "ville", label: "100 km/h en zone 50" },
  { slug: "90-en-zone-80", mesuree: 90, autorisee: 80, zone: "hors-ville", label: "90 km/h en zone 80" },
  { slug: "100-en-zone-80", mesuree: 100, autorisee: 80, zone: "hors-ville", label: "100 km/h en zone 80" },
  { slug: "120-en-zone-80", mesuree: 120, autorisee: 80, zone: "hors-ville", label: "120 km/h en zone 80" },
  { slug: "140-en-zone-90", mesuree: 140, autorisee: 90, zone: "hors-ville", label: "140 km/h en zone 90" },
  { slug: "150-en-zone-130", mesuree: 150, autorisee: 130, zone: "hors-ville", label: "150 km/h sur autoroute" },
  { slug: "160-en-zone-130", mesuree: 160, autorisee: 130, zone: "hors-ville", label: "160 km/h sur autoroute" },
  { slug: "180-en-zone-130", mesuree: 180, autorisee: 130, zone: "hors-ville", label: "180 km/h sur autoroute" },
  { slug: "200-en-zone-130", mesuree: 200, autorisee: 130, zone: "hors-ville", label: "200 km/h sur autoroute (délit)" },
];

export function generateStaticParams() {
  return CAS.map((c) => ({ params: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) return {};

  const res = calculerAmende({ vitesseMesuree: cas.mesuree, vitesseAutorisee: cas.autorisee, zone: cas.zone });

  return {
    alternates: { canonical: `/simulateur-amende-exces-vitesse/${slug}` },
    title: `Amende pour ${cas.label} - ${fmtEur(res.amendeForfaitaire)} + ${res.pointsRetires} point${res.pointsRetires > 1 ? "s" : ""}`,
    description: `${cas.label} : amende ${fmtEur(res.amendeForfaitaire)} (${fmtEur(res.amendeMinoree)} minorée), ${res.pointsRetires === 0 ? "aucun point retiré" : `-${res.pointsRetires} point${res.pointsRetires > 1 ? "s" : ""}`}. ${res.suspensionPossible ? "Suspension possible" : "Pas de suspension"}.`,
    keywords: `amende ${cas.label.toLowerCase()}, exces ${cas.mesuree} ${cas.autorisee}, points perdus ${cas.label.toLowerCase()}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const cas = CAS.find((c) => c.slug === slug);
  if (!cas) notFound();

  const res = calculerAmende({ vitesseMesuree: cas.mesuree, vitesseAutorisee: cas.autorisee, zone: cas.zone });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle amende pour ${cas.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${cas.label} (vitesse retenue ${res.vitesseRetenue} km/h après la marge du radar, soit un excès de ${res.depassement} km/h), l'amende forfaitaire est de ${fmtEur(res.amendeForfaitaire)} (${fmtEur(res.amendeMinoree)} en minorée sous 15 jours, ${fmtEur(res.amendeMajoree)} majorée ${res.tribunalCorrectionnel ? "en cas de retard" : "après le délai de paiement"}). ${res.pointsRetires === 0 ? "Aucun point n'est retiré." : `Retrait de ${res.pointsRetires} point${res.pointsRetires > 1 ? "s" : ""} du permis.`} ${res.tribunalCorrectionnel ? "C'est un délit : si vous refusez l'amende forfaitaire délictuelle, l'affaire peut aller au tribunal correctionnel (jusqu'à 3 750 € d'amende et 3 mois de prison)." : res.suspensionPossible ? "Suspension possible du permis jusqu'à 3 ans, si le juge la prononce." : ""}`,
        },
      },
    ],
  };

  const isDelit = res.tribunalCorrectionnel;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={cas.label} parentPage="Simulateur Amende Exces de Vitesse" parentHref="/simulateur-amende-exces-vitesse" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Amende pour {cas.label}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Vitesse retenue {res.vitesseRetenue} km/h après la marge du radar : excès de {res.depassement} km/h.
        {isDelit && " Attention : c'est le seuil du délit."}
      </p>

      <div className={`bg-gradient-to-br ${isDelit ? "from-red-700 to-rose-800" : "from-red-500 to-orange-600"} text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8`}>
        <p className="text-red-100 mb-1">{isDelit ? "Délit routier : amende forfaitaire délictuelle" : "Amende forfaitaire"}</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.amendeForfaitaire)}</p>
        <p className="text-red-100 mt-2">
          {res.pointsRetires === 0 ? "+ aucun point retiré" : `+ retrait de ${res.pointsRetires} point${res.pointsRetires > 1 ? "s" : ""} du permis`}
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-red-100">Minorée (sous 15 jours)</p>
            <p className="font-semibold">{fmtEur(res.amendeMinoree)}</p>
          </div>
          <div>
            <p className="text-red-100">Forfaitaire</p>
            <p className="font-semibold">{fmtEur(res.amendeForfaitaire)}</p>
          </div>
          <div>
            <p className="text-red-100">{isDelit ? "Majorée (en cas de retard)" : "Majorée (après 45 jours, 60 en télépaiement)"}</p>
            <p className="font-semibold">{fmtEur(res.amendeMajoree)}</p>
          </div>
        </div>
      </div>

      {(res.suspensionPossible || res.tribunalCorrectionnel) && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-8">
          <h2 className="font-bold text-amber-900 mb-3">Conséquences supplémentaires</h2>
          <ul className="text-sm text-amber-900 space-y-1.5">
            {res.suspensionPossible && <li>• <strong>Suspension possible</strong> du permis (3 ans maximum), si le juge la prononce</li>}
            {res.suspensionPossible && !isDelit && <li>• Stage de sensibilisation possible, aux frais du conducteur, si le juge l&apos;ordonne</li>}
            {isDelit && <li>• <strong className="text-red-700">Si vous refusez l&apos;amende forfaitaire délictuelle</strong> : tribunal correctionnel, jusqu&apos;à 3 750 EUR et 3 mois de prison</li>}
            {isDelit && <li>• Confiscation du véhicule possible (obligatoire en cas de récidive)</li>}
          </ul>
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur personnalisé</h2>
      <SimulateurAmende />


      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres cas d&apos;excès de vitesse</h2>
        <div className="flex flex-wrap gap-2">
          {CAS.filter(c => c.slug !== cas.slug).map(c => (
            <a key={c.slug} href={`/simulateur-amende-exces-vitesse/${c.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all">
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-amende-exces-vitesse" />
    </div>
  );
}
