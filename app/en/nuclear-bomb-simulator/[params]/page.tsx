import type { Metadata } from "next";
import NuclearSimulator from "../NuclearSimulator";
import AdSlot from "../../../components/AdSlot";
import BreadcrumbEN from "../../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../../components/RelatedCalculatorsEN";
import { notFound } from "next/navigation";

const WEAPONS = [
  { slug: "hiroshima", name: "Little Boy (Hiroshima)", yield: 15, desc: "Fission bomb dropped on Hiroshima, August 6, 1945. Yield: 15 kilotons. Caused approximately 140,000 deaths.", article: "the Hiroshima bomb" },
  { slug: "nagasaki", name: "Fat Man (Nagasaki)", yield: 21, desc: "Plutonium bomb dropped on Nagasaki, August 9, 1945. Yield: 21 kilotons. Caused approximately 70,000 deaths.", article: "the Nagasaki bomb" },
  { slug: "tactical", name: "Tactical Nuke (5 kT)", yield: 5, desc: "Low-yield tactical nuclear weapon (5 kT), designed for battlefield use. Russia has approximately 2,000 of these.", article: "a tactical nuke" },
  { slug: "trident", name: "W76 Trident (USA)", yield: 100, desc: "American strategic warhead deployed on Trident II submarine-launched ballistic missiles. Yield: 100 kT. Approximately 1,500 in service.", article: "a US Trident warhead" },
  { slug: "b61", name: "B61-12 (USA/NATO)", yield: 50, desc: "US tactical/strategic gravity bomb deployed across NATO bases in Europe. Yield: adjustable up to 50 kT. Key weapon in the Iran contingency planning.", article: "a B61-12 NATO bomb" },
  { slug: "sarmat", name: "RS-28 Sarmat (Russia)", yield: 800, desc: "Russian intercontinental ballistic missile capable of carrying multiple warheads. Yield per warhead: ~800 kT. Range: 11,000 miles.", article: "a Russian Sarmat missile" },
  { slug: "b83", name: "B83 (USA)", yield: 1200, desc: "Largest active nuclear bomb in the US arsenal. Yield: 1.2 Mt. Gravity bomb delivered by B-2 Spirit or B-52 bombers.", article: "a US B83 bomb" },
  { slug: "tsar-bomba", name: "Tsar Bomba (USSR)", yield: 50000, desc: "Largest nuclear weapon ever tested. 50 Mt (50,000 kT), equivalent to 3,333 Hiroshimas. Tested October 30, 1961 on Novaya Zemlya island.", article: "the Tsar Bomba" },
] as const;

const CITIES = [
  { slug: "new-york", name: "New York City", lat: 40.7128, lng: -74.0060, pop: "8.3 million (20.1M metro)" },
  { slug: "los-angeles", name: "Los Angeles", lat: 34.0522, lng: -118.2437, pop: "3.9 million (13.2M metro)" },
  { slug: "chicago", name: "Chicago", lat: 41.8781, lng: -87.6298, pop: "2.7 million (9.5M metro)" },
  { slug: "houston", name: "Houston", lat: 29.7604, lng: -95.3698, pop: "2.3 million (7.1M metro)" },
  { slug: "washington-dc", name: "Washington DC", lat: 38.9072, lng: -77.0369, pop: "700,000 (6.3M metro)" },
  { slug: "miami", name: "Miami", lat: 25.7617, lng: -80.1918, pop: "450,000 (6.1M metro)" },
  { slug: "san-francisco", name: "San Francisco", lat: 37.7749, lng: -122.4194, pop: "870,000 (4.7M metro)" },
  { slug: "seattle", name: "Seattle", lat: 47.6062, lng: -122.3321, pop: "740,000 (4.0M metro)" },
  { slug: "dallas", name: "Dallas", lat: 32.7767, lng: -96.7970, pop: "1.3 million (7.6M metro)" },
  { slug: "denver", name: "Denver", lat: 39.7392, lng: -104.9903, pop: "710,000 (2.9M metro)" },
] as const;

function calculateZones(yieldKt: number) {
  const fireball = 0.033 * Math.pow(yieldKt, 0.40);
  const radiation = 0.40 * Math.pow(yieldKt, 0.33);
  const blast20psi = 0.28 * Math.pow(yieldKt, 0.33);
  const blast5psi = 0.71 * Math.pow(yieldKt, 0.33);
  const thermal = 0.67 * Math.pow(yieldKt, 0.41);
  const blast1psi = 2.2 * Math.pow(yieldKt, 0.33);

  return [
    { name: "Fireball", radius: fireball, fatality: "100%", desc: "Total vaporization" },
    { name: "Lethal radiation", radius: radiation, fatality: "90-100%", desc: "Lethal dose (500 rem)" },
    { name: "Total destruction (20 psi)", radius: blast20psi, fatality: "~90%", desc: "Reinforced concrete destroyed" },
    { name: "Buildings collapsed (5 psi)", radius: blast5psi, fatality: "~50%", desc: "Residential buildings destroyed" },
    { name: "3rd degree burns", radius: thermal, fatality: "20-50%", desc: "Severe burns, fires" },
    { name: "Windows shattered (1 psi)", radius: blast1psi, fatality: "~5%", desc: "Light damage, debris" },
  ];
}

function fmtDist(km: number): string {
  const miles = km * 0.6214;
  if (miles >= 1) return `${miles.toFixed(1)} mi (${km.toFixed(1)} km)`;
  return `${Math.round(km * 3281)} ft (${Math.round(km * 1000)} m)`;
}

function fmtSurface(km: number): string {
  const km2 = Math.PI * km * km;
  const mi2 = km2 * 0.3861;
  if (mi2 >= 1) return `${mi2.toFixed(0)} mi² (${km2.toFixed(0)} km²)`;
  return `${(km2 * 100).toFixed(0)} hectares`;
}

interface ParsedParams {
  weapon: (typeof WEAPONS)[number];
  city: (typeof CITIES)[number];
}

function parseSlug(slug: string): ParsedParams | null {
  for (const weapon of WEAPONS) {
    for (const city of CITIES) {
      if (slug === `${weapon.slug}-on-${city.slug}`) {
        return { weapon, city };
      }
    }
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const weapon of WEAPONS) {
    for (const city of CITIES) {
      params.push({ params: `${weapon.slug}-on-${city.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { weapon, city } = parsed;
  const zones = calculateZones(weapon.yield);

  return {
    alternates: { canonical: `/en/nuclear-bomb-simulator/${slug}` },
    title: `${weapon.name} on ${city.name} - Nuclear Impact Simulation 2026`,
    description: `What would happen if ${weapon.article} (${weapon.yield >= 1000 ? `${weapon.yield / 1000} Mt` : `${weapon.yield} kT`}) hit ${city.name}? Total destruction within ${fmtDist(zones[2].radius)}, buildings collapsed within ${fmtDist(zones[3].radius)}, windows shattered within ${fmtDist(zones[5].radius)}. Interactive map.`,
    keywords: `nuclear bomb ${city.name}, ${weapon.name} ${city.name}, nuclear impact ${city.name}, atomic bomb ${city.name}, nuke simulation ${city.name}`,
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

  const { weapon, city } = parsed;
  const zones = calculateZones(weapon.yield);
  const yieldLabel = weapon.yield >= 1000 ? `${weapon.yield / 1000} Mt` : `${weapon.yield} kT`;
  const xHiroshima = weapon.yield >= 15 ? Math.round(weapon.yield / 15) : (weapon.yield / 15).toFixed(1);

  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 5);
  const otherWeapons = WEAPONS.filter((w) => w.slug !== weapon.slug).slice(0, 5);

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
                name: `What would happen if ${weapon.article} hit ${city.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `A ${yieldLabel} explosion (${xHiroshima}x Hiroshima) on ${city.name} would cause total destruction within ${fmtDist(zones[2].radius)}, building collapse within ${fmtDist(zones[3].radius)}, severe burns within ${fmtDist(zones[4].radius)}, and shattered windows within ${fmtDist(zones[5].radius)}. The population of ${city.name} (${city.pop}) would be massively affected.`,
                },
              },
            ],
          }),
        }}
      />

      <BreadcrumbEN
        currentPage={`${weapon.name} on ${city.name}`}
        parentPage="Nuclear Bomb Simulator"
        parentHref="/en/nuclear-bomb-simulator"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ☢️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {weapon.name} on {city.name}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation of a {yieldLabel} explosion ({xHiroshima}x Hiroshima) on {city.name}.
      </p>

      {/* Main result */}
      <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-200 text-sm mb-1">{weapon.name} ({yieldLabel})</p>
        <p className="text-3xl font-extrabold mb-1">Impact on {city.name}</p>
        <p className="text-red-200 text-sm">Population: {city.pop}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {zones.map((z, i) => (
            <div key={i}>
              <p className="text-red-200 text-xs">{z.name}</p>
              <p className="font-bold text-lg">{fmtDist(z.radius)}</p>
              <p className="text-red-300 text-xs">Fatality rate: {z.fatality}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Detailed Impact Zones &mdash; {yieldLabel} on {city.name}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Zone</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Radius</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Area</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Fatality Rate</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-3 px-2">
                    <p className="font-medium text-slate-700">{z.name}</p>
                    <p className="text-xs text-slate-400">{z.desc}</p>
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">{fmtDist(z.radius)}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmtSurface(z.radius)}</td>
                  <td className="py-3 px-2 text-right font-bold text-red-600">{z.fatality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Context */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {weapon.name}: Historical Context
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">{weapon.desc}</p>
        <p className="text-slate-600 leading-relaxed mb-4">
          With a yield of <strong>{yieldLabel}</strong>, this weapon is{" "}
          <strong>{xHiroshima} times more powerful</strong> than the bomb dropped on
          Hiroshima in 1945. On {city.name} ({city.pop}), the effects would be
          devastating: total destruction within {fmtDist(zones[2].radius)},
          residential buildings collapsed within {fmtDist(zones[3].radius)}, and
          windows shattered up to {fmtDist(zones[5].radius)} from ground zero.
        </p>
        <p className="text-slate-600 leading-relaxed">
          These estimates are based on Glasstone &amp; Dolan formulas (Hopkinson
          scaling law) for an optimal airburst detonation. Actual effects would
          vary based on detonation altitude, terrain, and weather conditions.
          Radioactive fallout is not included in this simulation.
        </p>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This simulator is an educational tool.
          The data shown are theoretical approximations based on nuclear explosion
          physics. It does not constitute a real prediction.
        </p>
      </div>

      {/* Interactive simulator */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Interactive Simulator
      </h2>
      <NuclearSimulator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Same weapon, other cities */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {weapon.name} on other cities
        </h2>
        <div className="flex flex-wrap gap-2">
          {otherCities.map((c) => (
            <a
              key={c.slug}
              href={`/en/nuclear-bomb-simulator/${weapon.slug}-on-${c.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {c.name}
            </a>
          ))}
        </div>
      </section>

      {/* Same city, other weapons */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Other weapons on {city.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {otherWeapons.map((w) => (
            <a
              key={w.slug}
              href={`/en/nuclear-bomb-simulator/${w.slug}-on-${city.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {w.name}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/nuclear-bomb-simulator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
