import type { Metadata } from "next";
import SimulateurAmende from "../SimulateurAmende";
import AdSlot from "../../components/AdSlot";
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
  { slug: "200-en-zone-130", mesuree: 200, autorisee: 130, zone: "hors-ville", label: "200 km/h sur autoroute (delit)" },
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
    description: `${cas.label} : amende ${fmtEur(res.amendeForfaitaire)} (${fmtEur(res.amendeMinoree)} minoree), -${res.pointsRetires} point${res.pointsRetires > 1 ? "s" : ""}. ${res.suspensionObligatoire ? "Suspension obligatoire" : res.suspensionPossible ? "Suspension possible" : "Pas de suspension"}.`,
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
          text: `Pour ${cas.label} (exces de ${res.depassement} km/h), l'amende forfaitaire est de ${fmtEur(res.amendeForfaitaire)} (${fmtEur(res.amendeMinoree)} en minoree sous 15 jours, ${fmtEur(res.amendeMajoree)} majoree apres 45 jours). Retrait de ${res.pointsRetires} point${res.pointsRetires > 1 ? "s" : ""} du permis. ${res.suspensionObligatoire ? "Suspension obligatoire du permis 3 ans et convocation au tribunal correctionnel (delit)." : res.suspensionPossible ? "Suspension possible du permis jusqu'a 3 ans." : ""}`,
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
        Exces de {res.depassement} km/h {cas.zone === "ville" ? "en agglomeration" : "hors agglomeration"}.
        {isDelit && " Attention : depasse le seuil du delit."}
      </p>

      <div className={`bg-gradient-to-br ${isDelit ? "from-red-700 to-rose-800" : "from-red-500 to-orange-600"} text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8`}>
        <p className="text-red-100 mb-1">{isDelit ? "DELIT routier" : "Amende forfaitaire"}</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.amendeForfaitaire)}</p>
        <p className="text-red-100 mt-2">
          + retrait de {res.pointsRetires} point{res.pointsRetires > 1 ? "s" : ""} du permis
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          {res.amendeMinoree > 0 && (
            <div>
              <p className="text-red-100">Minoree (15j)</p>
              <p className="font-semibold">{fmtEur(res.amendeMinoree)}</p>
            </div>
          )}
          <div>
            <p className="text-red-100">Forfaitaire</p>
            <p className="font-semibold">{fmtEur(res.amendeForfaitaire)}</p>
          </div>
          <div>
            <p className="text-red-100">Majoree (45j+)</p>
            <p className="font-semibold">{fmtEur(res.amendeMajoree)}</p>
          </div>
        </div>
      </div>

      {(res.suspensionPossible || res.suspensionObligatoire || res.stageObligatoire) && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-8">
          <h2 className="font-bold text-amber-900 mb-3">Consequences supplementaires</h2>
          <ul className="text-sm text-amber-900 space-y-1.5">
            {res.suspensionObligatoire && <li>• <strong className="text-red-700">Suspension OBLIGATOIRE du permis</strong> (3 ans maximum)</li>}
            {res.suspensionPossible && !res.suspensionObligatoire && <li>• <strong>Suspension possible</strong> du permis (jusqu&apos;a 3 ans)</li>}
            {res.stageObligatoire && <li>• <strong>Stage de sensibilisation obligatoire</strong> (150-250 EUR)</li>}
            {res.tribunalCorrectionnel && <li>• <strong className="text-red-700">Convocation au tribunal correctionnel</strong> (delit)</li>}
          </ul>
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur personnalise</h2>
      <SimulateurAmende />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres cas d&apos;exces de vitesse</h2>
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
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
