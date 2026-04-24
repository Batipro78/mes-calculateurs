import type { Metadata } from "next";
import BlackoutSimulator from "../BlackoutSimulator";
import AdSlot from "../../../components/AdSlot";
import BreadcrumbEN from "../../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../../components/RelatedCalculatorsEN";
import { notFound } from "next/navigation";
import {
  HousingType, HeatingType,
  HOUSING_LABELS, HEATING_LABELS,
  calcAutonomyScore,
} from "../blackoutCalcEN";

const HOUSINGS: HousingType[] = ["apartment", "house", "mobile-home"];
const HEATINGS: HeatingType[] = ["all-electric", "natural-gas", "wood", "hybrid"];
const PEOPLE = [1, 2, 3, 4, 5];

interface ParsedParams {
  housing: HousingType;
  heating: HeatingType;
  numPeople: number;
}

function parseSlug(slug: string): ParsedParams | null {
  for (const housing of HOUSINGS) {
    for (const heating of HEATINGS) {
      for (const p of PEOPLE) {
        if (slug === `${housing}-${heating}-${p}-people`) {
          return { housing, heating, numPeople: p };
        }
      }
    }
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const housing of HOUSINGS) {
    for (const heating of HEATINGS) {
      for (const p of PEOPLE) {
        params.push({ params: `${housing}-${heating}-${p}-people` });
      }
    }
  }
  return params;
}

function fmtDuration(hours: number): string {
  if (hours < 24) return `${hours} hours`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { housing, heating, numPeople } = parsed;
  const score = calcAutonomyScore(heating, "electric", "electric", numPeople, []);

  return {
    alternates: { canonical: `/en/blackout-simulator/${slug}` },
    title: `Blackout in ${HOUSING_LABELS[housing]} with ${HEATING_LABELS[heating]} heating (${numPeople} people) - Power Outage Simulator 2026`,
    description: `How long can a ${HOUSING_LABELS[housing].toLowerCase()} with ${HEATING_LABELS[heating].toLowerCase()} heating survive a blackout? Readiness score: ${score.totalScore}/100. Estimated autonomy: ${fmtDuration(score.autonomyDurationH)}. ${numPeople} people. Free preparedness test.`,
    keywords: `blackout ${HOUSING_LABELS[housing].toLowerCase()}, power outage ${HEATING_LABELS[heating].toLowerCase()} heating, emergency preparedness ${numPeople} people, blackout survival`,
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

  const { housing, heating, numPeople } = parsed;
  const scoreBaseline = calcAutonomyScore(heating, "electric", "electric", numPeople, []);
  const scoreEssential = calcAutonomyScore(heating, "electric", "electric", numPeople,
    ["flashlights", "radio", "powerbank", "water-reserve", "dry-food", "blankets"]);

  const levelLabel = scoreBaseline.level === "critical" ? "Critical" :
    scoreBaseline.level === "fragile" ? "Fragile" :
    scoreBaseline.level === "decent" ? "Decent" : "Prepared";

  const otherHeatings = HEATINGS.filter((h) => h !== heating);

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
                name: `How prepared is a ${HOUSING_LABELS[housing].toLowerCase()} with ${HEATING_LABELS[heating].toLowerCase()} heating for a blackout?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Without any emergency equipment, a ${HOUSING_LABELS[housing].toLowerCase()} with ${HEATING_LABELS[heating].toLowerCase()} heating scores ${scoreBaseline.totalScore}/100 for blackout readiness. With a basic $100-200 emergency kit, the score jumps to ${scoreEssential.totalScore}/100 and autonomy extends from ${fmtDuration(scoreBaseline.autonomyDurationH)} to ${fmtDuration(scoreEssential.autonomyDurationH)}.`,
                },
              },
            ],
          }),
        }}
      />

      <BreadcrumbEN
        currentPage={`${HOUSING_LABELS[housing]} - ${HEATING_LABELS[heating]}`}
        parentPage="Blackout Simulator"
        parentHref="/en/blackout-simulator"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Blackout in a {HOUSING_LABELS[housing]} with {HEATING_LABELS[heating]} Heating
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Preparedness assessment for {numPeople} {numPeople === 1 ? "person" : "people"}.
      </p>

      {/* Baseline Score */}
      <div className={`bg-gradient-to-br ${scoreBaseline.level === "critical" ? "from-red-600 to-red-800" : scoreBaseline.level === "fragile" ? "from-orange-500 to-red-500" : "from-yellow-500 to-orange-500"} text-white rounded-2xl p-8 shadow-lg mb-8`}>
        <p className="text-white/70 text-sm mb-1">Without emergency equipment</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-extrabold">{scoreBaseline.totalScore}/100</p>
            <p className="text-white/70 text-sm mt-1">Readiness: {levelLabel}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{fmtDuration(scoreBaseline.autonomyDurationH)}</p>
            <p className="text-white/70 text-sm">Estimated autonomy</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 mt-4">
          <div className="bg-white rounded-full h-3" style={{ width: `${scoreBaseline.totalScore}%` }} />
        </div>
      </div>

      {/* With basic kit */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/70 text-sm mb-1">With a basic emergency kit (~$150-250)</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-extrabold">{scoreEssential.totalScore}/100</p>
            <p className="text-white/70 text-sm mt-1">
              +{scoreEssential.totalScore - scoreBaseline.totalScore} points improvement
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{fmtDuration(scoreEssential.autonomyDurationH)}</p>
            <p className="text-white/70 text-sm">Estimated autonomy</p>
          </div>
        </div>
      </div>

      {/* Vulnerabilities */}
      {scoreBaseline.vulnerabilities.length > 0 && (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 mb-8">
          <h3 className="font-bold text-red-800 mb-3">
            Key Vulnerabilities for {HOUSING_LABELS[housing]} + {HEATING_LABELS[heating]}
          </h3>
          <ul className="space-y-2">
            {scoreBaseline.vulnerabilities.map((v, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                <span className="text-red-400 mt-0.5">⚠️</span>{v}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SEO Content */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {HOUSING_LABELS[housing]} with {HEATING_LABELS[heating]} Heating: Blackout Analysis
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {heating === "all-electric"
            ? `An all-electric ${HOUSING_LABELS[housing].toLowerCase()} is the most vulnerable home configuration during a power outage. You lose heating, cooking, and hot water simultaneously. This is especially dangerous during winter storms (like the 2021 Texas freeze) or summer heat waves.`
            : heating === "natural-gas"
            ? `A ${HOUSING_LABELS[housing].toLowerCase()} with natural gas heating has a significant advantage during blackouts. Gas heating typically continues working (though some furnaces need electricity for fans/ignition). Gas cooking and gas water heaters also remain functional.`
            : heating === "wood"
            ? `A ${HOUSING_LABELS[housing].toLowerCase()} with wood/pellet heating is the most resilient configuration. As long as you have firewood, you have heat and potentially cooking capability. This is why wood stoves are popular in rural areas and among preppers.`
            : `A ${HOUSING_LABELS[housing].toLowerCase()} with hybrid heating has moderate resilience. Your gas systems continue working, but electric components will fail. The key is knowing which systems in your home depend on electricity.`
          }
        </p>
        <p className="text-slate-600 leading-relaxed">
          For a household of <strong>{numPeople} {numPeople === 1 ? "person" : "people"}</strong>,
          you&apos;ll need approximately <strong>{numPeople} gallon{numPeople > 1 ? "s" : ""} of water per day</strong>{" "}
          and about <strong>{numPeople * 2000} calories of food per day</strong>. A 3-day emergency
          supply costs roughly <strong>${Math.round(100 + (numPeople - 1) * 40)}-${Math.round(200 + (numPeople - 1) * 60)}</strong>.
        </p>
      </section>

      {/* Interactive simulator */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Interactive Simulator</h2>
      <BlackoutSimulator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Other heating types */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Compare other heating types in {HOUSING_LABELS[housing].toLowerCase()}
        </h2>
        <div className="flex flex-wrap gap-2">
          {otherHeatings.map((h) => (
            <a
              key={h}
              href={`/en/blackout-simulator/${housing}-${h}-${numPeople}-people`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              {HEATING_LABELS[h]}
            </a>
          ))}
        </div>
      </section>

      {/* Other household sizes */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Different household sizes
        </h2>
        <div className="flex flex-wrap gap-2">
          {PEOPLE.filter((p) => p !== numPeople).map((p) => (
            <a
              key={p}
              href={`/en/blackout-simulator/${housing}-${heating}-${p}-people`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              {p} {p === 1 ? "person" : "people"}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/blackout-simulator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
