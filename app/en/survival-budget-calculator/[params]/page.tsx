import type { Metadata } from "next";
import SurvivalBudgetCalculator from "../SurvivalBudgetCalculator";
import AdSlot from "../../../components/AdSlot";
import BreadcrumbEN from "../../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../../components/RelatedCalculatorsEN";
import { notFound } from "next/navigation";
import { CityZone, Situation, TransportType, ZONE_LABELS, SITUATION_LABELS, TRANSPORT_LABELS, calcSurvivalBudget } from "../survivalCalcEN";

const ZONES: CityZone[] = ["major-metro", "large-city", "mid-city", "rural"];
const SITUATIONS: Situation[] = ["single", "couple", "family"];
const TRANSPORTS: TransportType[] = ["public-transit", "car"];

interface ParsedParams { zone: CityZone; situation: Situation; transport: TransportType }

function parseSlug(slug: string): ParsedParams | null {
  for (const z of ZONES) for (const s of SITUATIONS) for (const t of TRANSPORTS)
    if (slug === `${z}-${s}-${t}`) return { zone: z, situation: s, transport: t };
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const z of ZONES) for (const s of SITUATIONS) for (const t of TRANSPORTS)
    params.push({ params: `${z}-${s}-${t}` });
  return params;
}

function fmtUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const result = calcSurvivalBudget(parsed.zone, parsed.situation, parsed.transport);
  const zoneShort = ZONE_LABELS[parsed.zone].split("(")[0].trim();
  return {
    title: `Cost of Living: ${SITUATION_LABELS[parsed.situation]} in ${zoneShort} (${TRANSPORT_LABELS[parsed.transport]}) - ${fmtUSD(result.total)}/mo`,
    description: `Minimum monthly budget for a ${parsed.situation} in a ${zoneShort.toLowerCase()} with ${TRANSPORT_LABELS[parsed.transport].toLowerCase()}: ${fmtUSD(result.total)}/month (${fmtUSD(result.total * 12)}/year). Rent: ${fmtUSD(result.lines[0].amount)}, Food: ${fmtUSD(result.lines[1].amount)}, Healthcare: ${fmtUSD(result.lines[5].amount)}.`,
    keywords: `cost of living ${zoneShort.toLowerCase()}, ${parsed.situation} budget ${zoneShort.toLowerCase()}, minimum expenses USA, survival budget ${parsed.situation}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const result = calcSurvivalBudget(parsed.zone, parsed.situation, parsed.transport);
  const zoneShort = ZONE_LABELS[parsed.zone].split("(")[0].trim();
  const otherZones = ZONES.filter((z) => z !== parsed.zone);
  const otherSituations = SITUATIONS.filter((s) => s !== parsed.situation);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [{
          "@type": "Question",
          name: `How much does a ${parsed.situation} need to survive in a ${zoneShort.toLowerCase()}?`,
          acceptedAnswer: { "@type": "Answer",
            text: `A ${parsed.situation} using ${TRANSPORT_LABELS[parsed.transport].toLowerCase()} in a ${zoneShort.toLowerCase()} needs approximately ${fmtUSD(result.total)}/month (${fmtUSD(result.total * 12)}/year). Major expenses: rent ${fmtUSD(result.lines[0].amount)}, food ${fmtUSD(result.lines[1].amount)}, health insurance ${fmtUSD(result.lines[5].amount)}, transport ${fmtUSD(result.lines[2].amount)}.`
          },
        }],
      })}} />

      <BreadcrumbEN currentPage={`${SITUATION_LABELS[parsed.situation]} in ${zoneShort}`}
        parentPage="Survival Budget Calculator" parentHref="/en/survival-budget-calculator" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">🧮</div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Survival Budget: {SITUATION_LABELS[parsed.situation]} in {zoneShort}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Using {TRANSPORT_LABELS[parsed.transport].toLowerCase()} — minimum monthly expenses.
      </p>

      {/* Result card */}
      <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-red-200 text-sm mb-1">{SITUATION_LABELS[parsed.situation]} in {zoneShort}</p>
        <p className="text-4xl font-extrabold">{fmtUSD(result.total)}/mo</p>
        <p className="text-red-200 text-sm">{fmtUSD(result.total * 12)}/year</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {result.lines.slice(0, 4).map((l) => (
            <div key={l.label}>
              <p className="text-red-200 text-xs">{l.label}</p>
              <p className="font-bold text-lg">{fmtUSD(l.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Complete Monthly Breakdown</h2>
        <div className="space-y-2">
          {result.lines.map((l) => (
            <div key={l.label} className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span>{l.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-slate-700">{l.label}</p>
                  <p className="text-xs text-slate-400">{l.note}</p>
                </div>
              </div>
              <p className="font-bold text-slate-800">{fmtUSD(l.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reference points */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400">Federal Poverty Line</p>
          <p className="text-xl font-bold text-slate-800">{fmtUSD(result.federalPovertyLine)}/mo</p>
          <p className="text-xs text-red-500">{Math.round(result.total / result.federalPovertyLine * 100)}% of your budget</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400">Federal Min Wage</p>
          <p className="text-xl font-bold text-slate-800">{fmtUSD(result.federalMinWage)}/mo</p>
          <p className="text-xs text-amber-500">{Math.round(result.total / result.federalMinWage * 100)}% of your budget</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-blue-400">Max SNAP Benefit</p>
          <p className="text-xl font-bold text-blue-700">{fmtUSD(result.snapBenefit)}/mo</p>
          <p className="text-xs text-blue-500">Food assistance</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Note:</strong> These are estimated minimum survival budgets based on 2026 US averages.
          Actual costs vary by specific city and state. All amounts in US dollars.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Interactive Calculator</h2>
      <SurvivalBudgetCalculator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Other zones */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">{SITUATION_LABELS[parsed.situation]} in other locations</h2>
        <div className="flex flex-wrap gap-2">
          {otherZones.map((z) => (
            <a key={z} href={`/en/survival-budget-calculator/${z}-${parsed.situation}-${parsed.transport}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all">
              {ZONE_LABELS[z].split("(")[0].trim()}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Other household types in {zoneShort}</h2>
        <div className="flex flex-wrap gap-2">
          {otherSituations.map((s) => (
            <a key={s} href={`/en/survival-budget-calculator/${parsed.zone}-${s}-${parsed.transport}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all">
              {SITUATION_LABELS[s]}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/survival-budget-calculator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
