import type { Metadata } from "next";
import SimulateurSCPI from "../SimulateurSCPI";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerSCPI, fmtEur } from "../scpiCalc";

const MONTANTS = [10000, 20000, 30000, 50000, 75000, 100000, 150000, 200000, 300000];
const TMIS = [11, 30, 41];

function parseSlug(slug: string): { montant: number; tmi: number } | null {
  const m = slug.match(/^(\d+)-euros-tmi-(\d+)$/);
  if (!m) return null;
  return { montant: parseInt(m[1]), tmi: parseInt(m[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const t of TMIS) {
      params.push({ params: `${m}-euros-tmi-${t}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, tmi } = parsed;
  const res = calculerSCPI({
    montantInvesti: montant, tdvm: 4.8, fraisEntree: 10, fraisGestion: 0,
    tmi, dureeAnnees: 15, revalorisationAnnuelle: 1,
  });

  return {
    alternates: { canonical: `/simulateur-rendement-scpi/${slug}` },
    title: `SCPI ${montant.toLocaleString("fr-FR")} EUR TMI ${tmi}% - Rendement 2026`,
    description: `Investir ${montant.toLocaleString("fr-FR")} EUR en SCPI avec une TMI ${tmi}% : ${fmtEur(res.revenuMensuelNet)}/mois net, soit ${res.rendementNetAnnuel.toFixed(2)}% de rendement net/an. Simulation detaillee.`,
    keywords: `SCPI ${montant} euros, rendement SCPI ${montant}, SCPI TMI ${tmi}, revenu SCPI ${montant} euros`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, tmi } = parsed;
  if (!MONTANTS.includes(montant) || !TMIS.includes(tmi)) notFound();

  const res = calculerSCPI({
    montantInvesti: montant, tdvm: 4.8, fraisEntree: 10, fraisGestion: 0,
    tmi, dureeAnnees: 15, revalorisationAnnuelle: 1,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien rapporte ${montant.toLocaleString("fr-FR")} EUR en SCPI avec TMI ${tmi}% ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Investir ${montant.toLocaleString("fr-FR")} EUR en SCPI (TDVM moyen 4,8%, frais d'entree 10%) genere un revenu brut de ${fmtEur(res.revenuBrutAnnuel)}/an. Apres fiscalite (TMI ${tmi}% + 17,2% prelevements sociaux), il reste ${fmtEur(res.revenuAnnuelNetImpots)}/an net, soit ${fmtEur(res.revenuMensuelNet)}/mois. Rendement net : ${res.rendementNetAnnuel.toFixed(2)}%/an.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={`${montant.toLocaleString("fr-FR")} EUR TMI ${tmi}%`}
        parentPage="Simulateur SCPI"
        parentHref="/simulateur-rendement-scpi"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏢
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          SCPI : {montant.toLocaleString("fr-FR")} EUR avec TMI {tmi}%
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation detaillee pour un investissement SCPI de {montant.toLocaleString("fr-FR")} EUR sur 15 ans (TDVM moyen 4,8%).
      </p>

      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-teal-100 mb-1">Revenu net apres impots</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.revenuMensuelNet)}</p>
        <p className="text-teal-100 mt-2">par mois — rendement net {res.rendementNetAnnuel.toFixed(2)}%/an</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-teal-100">Revenu brut/an</p>
            <p className="font-semibold">{fmtEur(res.revenuBrutAnnuel)}</p>
          </div>
          <div>
            <p className="text-teal-100">Impots/an</p>
            <p className="font-semibold">-{fmtEur(res.revenuBrutAnnuel - res.revenuAnnuelNetImpots)}</p>
          </div>
          <div>
            <p className="text-teal-100">Net sur 15 ans</p>
            <p className="font-semibold">{fmtEur(res.revenuTotalNetSurDuree)}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <SimulateurSCPI />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {MONTANTS.filter(m => m !== montant).slice(0, 6).map(m => (
            <a key={m} href={`/simulateur-rendement-scpi/${m}-euros-tmi-${tmi}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all">
              {m.toLocaleString("fr-FR")} EUR
            </a>
          ))}
          {TMIS.filter(t => t !== tmi).map(t => (
            <a key={t} href={`/simulateur-rendement-scpi/${montant}-euros-tmi-${t}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all">
              TMI {t}%
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-rendement-scpi" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
