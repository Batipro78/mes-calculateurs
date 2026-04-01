import type { Metadata } from "next";
import BunkerCalculator from "../BunkerCalculator";
import AdSlot from "../../../components/AdSlot";
import BreadcrumbEN from "../../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../../components/RelatedCalculatorsEN";
import { notFound } from "next/navigation";
import { BunkerType, DurationType, BUNKER_TYPES, DURATIONS, calcBunkerCost } from "../bunkerCalcEN";

const PEOPLE_SEO = [2, 4, 6, 8, 12];

interface ParsedParams {
  bunkerType: BunkerType;
  numPeople: number;
  duration: DurationType;
}

function parseSlug(slug: string): ParsedParams | null {
  for (const type of BUNKER_TYPES) {
    for (const p of PEOPLE_SEO) {
      for (const d of DURATIONS) {
        if (slug === `${type.id}-${p}-people-${d.id}`) {
          return { bunkerType: type.id, numPeople: p, duration: d.id };
        }
      }
    }
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const type of BUNKER_TYPES) {
    for (const p of PEOPLE_SEO) {
      for (const d of DURATIONS) {
        params.push({ params: `${type.id}-${p}-people-${d.id}` });
      }
    }
  }
  return params;
}

function fmtUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const type = BUNKER_TYPES.find((t) => t.id === parsed.bunkerType)!;
  const dur = DURATIONS.find((d) => d.id === parsed.duration)!;
  const result = calcBunkerCost(parsed.bunkerType, parsed.numPeople, parsed.duration);

  return {
    title: `${type.name} Bunker for ${parsed.numPeople} People (${dur.label}) - Cost: ${fmtUSD(result.totalCost)}`,
    description: `How much does a ${type.name.toLowerCase()} survival bunker cost for ${parsed.numPeople} people for ${dur.label}? Total estimate: ${fmtUSD(result.totalCost)}. Construction: ${fmtUSD(result.constructionCost)}, Food: ${fmtUSD(result.foodCost)}, Water: ${fmtUSD(result.waterCost)}. ${fmtNumber(result.totalSqFt)} sq ft.`,
    keywords: `${type.name.toLowerCase()} bunker cost, bunker ${parsed.numPeople} people, survival shelter ${dur.label}, underground bunker price ${parsed.numPeople} person`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const type = BUNKER_TYPES.find((t) => t.id === parsed.bunkerType)!;
  const dur = DURATIONS.find((d) => d.id === parsed.duration)!;
  const result = calcBunkerCost(parsed.bunkerType, parsed.numPeople, parsed.duration);

  const otherTypes = BUNKER_TYPES.filter((t) => t.id !== parsed.bunkerType);
  const otherDurations = DURATIONS.filter((d) => d.id !== parsed.duration).slice(0, 4);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `How much does a ${type.name.toLowerCase()} bunker for ${parsed.numPeople} people cost?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `A ${type.name.toLowerCase()} bunker for ${parsed.numPeople} people designed for ${dur.label} of occupancy costs approximately ${fmtUSD(result.totalCost)}. This breaks down to: construction ${fmtUSD(result.constructionCost)}, food supply ${fmtUSD(result.foodCost)}, water supply ${fmtUSD(result.waterCost)}, and equipment ${fmtUSD(result.equipmentCost)}. Total area: ${fmtNumber(result.totalSqFt)} sq ft.`,
                },
              },
            ],
          }),
        }}
      />

      <BreadcrumbEN
        currentPage={`${type.name} - ${parsed.numPeople} people - ${dur.label}`}
        parentPage="Bunker Cost Calculator"
        parentHref="/en/bunker-cost-calculator"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {type.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {type.name} Bunker for {parsed.numPeople} People ({dur.label})
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Complete cost breakdown for a {type.name.toLowerCase()} underground shelter.
      </p>

      {/* Result */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-amber-200 text-sm mb-1">{type.name} Bunker</p>
        <p className="text-4xl font-extrabold mb-1">{fmtUSD(result.totalCost)}</p>
        <p className="text-amber-200 text-sm">{parsed.numPeople} people, {dur.label} autonomy</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <p className="text-amber-200 text-xs">Construction</p>
            <p className="font-bold text-lg">{fmtUSD(result.constructionCost)}</p>
          </div>
          <div>
            <p className="text-amber-200 text-xs">Food</p>
            <p className="font-bold text-lg">{fmtUSD(result.foodCost)}</p>
          </div>
          <div>
            <p className="text-amber-200 text-xs">Water</p>
            <p className="font-bold text-lg">{fmtUSD(result.waterCost)}</p>
          </div>
          <div>
            <p className="text-amber-200 text-xs">Equipment</p>
            <p className="font-bold text-lg">{fmtUSD(result.equipmentCost)}</p>
          </div>
        </div>
      </div>

      {/* Space details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Space &amp; Supply Details</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-slate-800">{fmtNumber(result.totalSqFt)} sq ft</p>
            <p className="text-xs text-slate-500">Total area</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{fmtNumber(result.waterGallons)} gal</p>
            <p className="text-xs text-blue-500">Water needed</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-orange-700">{fmtNumber(Math.round(result.foodCalories / 1000))}K</p>
            <p className="text-xs text-orange-500">Calories needed</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-700">${type.pricePerSqFt}</p>
            <p className="text-xs text-amber-500">Per sq ft</p>
          </div>
        </div>
      </div>

      {/* Context */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {type.name} Bunker: What You Get
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">{type.desc}</p>
        <p className="text-slate-600 leading-relaxed">
          For <strong>{parsed.numPeople} occupants</strong> over <strong>{dur.label}</strong>,
          you&apos;ll need {fmtNumber(result.livingSqFt)} sq ft of living space plus{" "}
          {fmtNumber(result.storageSqFt)} sq ft for supplies. Daily requirements include{" "}
          {parsed.numPeople} gallons of water and {fmtNumber(parsed.numPeople * 2000)} calories
          of food. At ${type.pricePerSqFt}/sq ft construction cost, the total project comes to{" "}
          <strong>{fmtUSD(result.totalCost)}</strong> including all supplies and equipment.
        </p>
      </section>

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> Costs are estimates based on 2026 US market data. Actual costs
          vary by location, soil conditions, and local regulations. Always consult licensed contractors.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Interactive Calculator</h2>
      <BunkerCalculator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Other types */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Compare other bunker types</h2>
        <div className="flex flex-wrap gap-2">
          {otherTypes.map((t) => (
            <a key={t.id}
              href={`/en/bunker-cost-calculator/${t.id}-${parsed.numPeople}-people-${parsed.duration}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/50 transition-all">
              {t.emoji} {t.name}
            </a>
          ))}
        </div>
      </section>

      {/* Other durations */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Other durations</h2>
        <div className="flex flex-wrap gap-2">
          {otherDurations.map((d) => (
            <a key={d.id}
              href={`/en/bunker-cost-calculator/${parsed.bunkerType}-${parsed.numPeople}-people-${d.id}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/50 transition-all">
              {d.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/bunker-cost-calculator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
