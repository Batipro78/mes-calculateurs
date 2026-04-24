import type { Metadata } from "next";
import SimulateurDividendes from "../SimulateurDividendes";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerDividendes, fmtEur } from "../dividendesCalc";

const MONTANTS = [5000, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 150000, 200000];
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
  const res = calculerDividendes({ dividendesBruts: montant, tmi, optionFiscale: "pfu", gerantMajoritaire: false });

  return {
    alternates: { canonical: `/simulateur-dividendes/${slug}` },
    title: `Dividendes ${montant.toLocaleString("fr-FR")} EUR TMI ${tmi}% - Impot 2026`,
    description: `Impot sur ${montant.toLocaleString("fr-FR")} EUR de dividendes avec TMI ${tmi}% : PFU ${fmtEur(res.pfu_total)}, bareme ${fmtEur(res.bareme_total)}. Meilleur choix : ${res.meilleurChoix === "pfu" ? "PFU (flat tax 30%)" : "bareme progressif"}.`,
    keywords: `dividendes ${montant} euros, impot dividendes ${montant}, PFU ${montant}, bareme dividendes ${montant} TMI ${tmi}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, tmi } = parsed;
  if (!MONTANTS.includes(montant) || !TMIS.includes(tmi)) notFound();

  const res = calculerDividendes({ dividendesBruts: montant, tmi, optionFiscale: "pfu", gerantMajoritaire: false });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel impot sur ${montant.toLocaleString("fr-FR")} EUR de dividendes avec TMI ${tmi}% ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${montant.toLocaleString("fr-FR")} EUR de dividendes bruts avec une TMI ${tmi}%, le PFU (flat tax 30%) preleve ${fmtEur(res.pfu_total)} (12,8% IR + 17,2% PS), laissant ${fmtEur(res.pfu_net)} net. Le bareme progressif avec abattement 40% donne ${fmtEur(res.bareme_total)} d'impot (${fmtEur(res.bareme_ir)} IR + ${fmtEur(res.bareme_ps)} PS), soit ${fmtEur(res.bareme_net)} net. Le meilleur choix : ${res.meilleurChoix === "pfu" ? "PFU" : "bareme progressif"}, economie ${fmtEur(res.economieMeilleurChoix)}.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${montant.toLocaleString("fr-FR")} EUR TMI ${tmi}%`} parentPage="Simulateur Dividendes" parentHref="/simulateur-dividendes" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💎
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Dividendes : {montant.toLocaleString("fr-FR")} EUR avec TMI {tmi}%
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comparaison PFU vs bareme progressif pour {montant.toLocaleString("fr-FR")} EUR de dividendes bruts, TMI {tmi}%.
      </p>

      <div className={`bg-gradient-to-br ${res.meilleurChoix === "pfu" ? "from-violet-500 to-purple-600" : "from-emerald-500 to-teal-600"} text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8`}>
        <p className="text-white/80 mb-1">Meilleur choix : {res.meilleurChoix === "pfu" ? "PFU (Flat tax 30%)" : "Bareme progressif"}</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.meilleurChoix === "pfu" ? res.pfu_net : res.bareme_net)}</p>
        <p className="text-white/90 mt-2">
          net percu — economie vs autre option : {fmtEur(res.economieMeilleurChoix)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-violet-900 font-semibold mb-2">PFU (Flat tax 30%)</p>
          <p className="text-3xl font-extrabold text-slate-800">{fmtEur(res.pfu_net)}</p>
          <p className="text-sm text-slate-500 mb-3">net</p>
          <p className="text-xs text-slate-600">Impot : {fmtEur(res.pfu_total)} ({res.pfu_tauxEffectif.toFixed(1)}%)</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-emerald-900 font-semibold mb-2">Bareme progressif</p>
          <p className="text-3xl font-extrabold text-slate-800">{fmtEur(res.bareme_net)}</p>
          <p className="text-sm text-slate-500 mb-3">net</p>
          <p className="text-xs text-slate-600">Impot : {fmtEur(res.bareme_total)} ({res.bareme_tauxEffectif.toFixed(1)}%)</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <SimulateurDividendes />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres montants / TMI</h2>
        <div className="flex flex-wrap gap-2">
          {MONTANTS.filter(m => m !== montant).slice(0, 6).map(m => (
            <a key={m} href={`/simulateur-dividendes/${m}-euros-tmi-${tmi}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all">
              {m.toLocaleString("fr-FR")} EUR
            </a>
          ))}
          {TMIS.filter(t => t !== tmi).map(t => (
            <a key={t} href={`/simulateur-dividendes/${montant}-euros-tmi-${t}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all">
              TMI {t}%
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-dividendes" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
