import type { Metadata } from "next";
import BunkerCalculator from "./BunkerCalculator";
import AdSlot from "../../components/AdSlot";
import BreadcrumbEN from "../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../components/RelatedCalculatorsEN";

export const metadata: Metadata = {
  title: "Bunker Cost Calculator 2026 - How Much Does a Survival Bunker Cost?",
  description: "Calculate the total cost of building an underground survival bunker. Estimate construction, food, water, and equipment costs based on capacity and duration. US prices.",
  keywords: "bunker cost calculator, survival bunker price, underground shelter cost, doomsday bunker, prepper bunker USA, NBC shelter cost, how much does a bunker cost",
  alternates: {
    canonical: "/en/bunker-cost-calculator",
    languages: {
      "fr": "/simulateur-bunker",
      "en": "/en/bunker-cost-calculator",
    },
  },
};

export default function Page() {
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
                name: "How much does a survival bunker cost in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A basic underground bunker costs $40,000-$80,000 for a simple shelter. Standard bunkers with filtered air and water storage run $100,000-$250,000. NBC-protected shelters (nuclear, biological, chemical) cost $200,000-$500,000+. Luxury bunkers with full amenities can exceed $1 million. Costs vary significantly by location, soil conditions, and local building codes.",
                },
              },
              {
                "@type": "Question",
                name: "Do you need a permit to build an underground bunker in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In most US states, yes. Underground construction typically requires building permits and must comply with local zoning ordinances, building codes, and HOA regulations (if applicable). Requirements vary by state and county. Some rural areas have fewer restrictions, while urban areas may prohibit underground construction entirely. Always check with your local building department before starting construction.",
                },
              },
              {
                "@type": "Question",
                name: "How long can you survive in a bunker?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Survival duration depends on three critical factors: air supply (ventilation/filtration), water storage (1 gallon per person per day minimum), and food supply (2,000 calories per person per day). A well-supplied bunker for 4 people for 3 months requires ~360 gallons of water and 720,000 calories of food. With proper ventilation, water recycling, and food storage, some bunkers are designed for 1-2 year occupancy.",
                },
              },
              {
                "@type": "Question",
                name: "What is the prepper bunker market size in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The US survival shelter market is estimated at $11+ billion annually as of 2026, driven by concerns about nuclear threats, natural disasters, pandemics, and social unrest. Companies like Rising S, Atlas Survival Shelters, and Vivos have reported surges in demand following events like the Ukraine conflict and Iran nuclear tensions.",
                },
              },
              {
                "@type": "Question",
                name: "What is an NBC bunker?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "NBC stands for Nuclear, Biological, Chemical. An NBC bunker is designed to protect occupants from all three threat types. It features blast-resistant doors, HEPA/NBC air filtration systems, positive pressure ventilation (to keep contaminated air out), radiation shielding, and decontamination chambers. NBC bunkers are the gold standard for protection and cost significantly more than basic shelters.",
                },
              },
            ],
          }),
        }}
      />
      <BreadcrumbEN currentPage="Bunker Cost Calculator" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🛡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Bunker Cost Calculator &mdash; Underground Shelter Budget
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculate the total cost of building a survival bunker based on type,
        capacity, and duration. Includes construction, food, water, and equipment costs.
      </p>

      <BunkerCalculator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO Content */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Building a Survival Bunker in 2026: Complete Guide
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Interest in <strong>underground survival shelters</strong> has surged in recent years,
          driven by rising geopolitical tensions, nuclear proliferation concerns (Iran, North Korea),
          and extreme weather events. The US prepper and survival shelter market exceeds{" "}
          <strong>$11 billion annually</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Bunker Types &amp; Price Ranges</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Type</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cost/sq ft</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">4-person cost</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Features</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">Basic</td>
                <td className="py-3 px-2 text-right text-slate-800">$150</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">$60K-$80K</td>
                <td className="py-3 px-2 text-xs text-slate-500">Concrete walls, basic ventilation</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">Standard</td>
                <td className="py-3 px-2 text-right text-slate-800">$300</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">$120K-$180K</td>
                <td className="py-3 px-2 text-xs text-slate-500">Filtered air, water storage, generator</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">NBC Protected</td>
                <td className="py-3 px-2 text-right text-slate-800">$550</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">$220K-$350K</td>
                <td className="py-3 px-2 text-xs text-slate-500">Nuclear/bio/chem filtration, blast doors</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">Luxury</td>
                <td className="py-3 px-2 text-right text-slate-800">$1,000</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">$400K-$700K+</td>
                <td className="py-3 px-2 text-xs text-slate-500">Full amenities, hydroponics, medical</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Key Considerations</h3>
        <ul className="list-disc list-inside text-slate-600 text-sm space-y-2 mb-4">
          <li><strong>Location:</strong> Soil type, water table depth, and bedrock greatly affect excavation costs</li>
          <li><strong>Permits:</strong> Most US jurisdictions require building permits for underground structures</li>
          <li><strong>Ventilation:</strong> Air filtration is the single most critical system — plan for redundancy</li>
          <li><strong>Water:</strong> 1 gallon per person per day minimum. Consider water recycling for long-term stays</li>
          <li><strong>Food:</strong> Freeze-dried meals last 25+ years. Budget $10/person/day for quality supplies</li>
          <li><strong>Energy:</strong> Generator + fuel storage, solar panels, or hand-crank backup</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How deep should a bunker be?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A minimum of 10 feet below ground provides decent protection from most threats.
              For nuclear protection, 20+ feet with reinforced concrete or steel is recommended.
              The depth also depends on your local water table — you don&apos;t want to be below it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I build a bunker in my backyard?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              It depends on local zoning laws, HOA rules, and building codes. Many suburban and
              rural areas allow underground construction with proper permits. Urban areas and HOA
              communities often have restrictions. Always consult your local building department first.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How long does it take to build a bunker?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A basic prefabricated bunker can be installed in 1-2 weeks once the hole is excavated.
              Custom-built concrete bunkers typically take 2-4 months. Large luxury bunkers can take
              6-12 months. Permitting alone can add 1-3 months to the timeline.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/bunker-cost-calculator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
