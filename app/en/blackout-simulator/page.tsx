import type { Metadata } from "next";
import BlackoutSimulator from "./BlackoutSimulator";
import AdSlot from "../../components/AdSlot";
import BreadcrumbEN from "../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../components/RelatedCalculatorsEN";

export const metadata: Metadata = {
  title: "Power Outage Simulator 2026 - Are You Prepared for a Blackout?",
  description: "Test your blackout readiness. Score your home's autonomy during a power outage based on your heating, cooking, and emergency equipment. Free preparedness tool.",
  keywords: "blackout simulator, power outage preparedness, emergency kit calculator, grid failure USA, Texas blackout, California power outage, survival kit cost, SHTF preparedness",
  alternates: {
    canonical: "/en/blackout-simulator",
    languages: {
      "fr": "/simulateur-blackout",
      "en": "/en/blackout-simulator",
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
                name: "How long do power outages typically last in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Average US power outages last about 2.5 hours. However, extreme events can last much longer: the Texas Winter Storm (2021) left millions without power for up to 5 days, California wildfire shutoffs can last 3-5 days, and major hurricanes have caused outages lasting 2+ weeks.",
                },
              },
              {
                "@type": "Question",
                name: "What should I do first during a power outage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1) Check if the outage is localized (check your breaker box) or widespread (check neighbors). 2) Unplug sensitive electronics to prevent surge damage. 3) Keep refrigerator/freezer doors closed (food stays safe ~4 hours in fridge, ~48 hours in full freezer). 4) Use flashlights, not candles. 5) Turn on your NOAA weather radio for emergency broadcasts. 6) Charge phones with power banks.",
                },
              },
              {
                "@type": "Question",
                name: "How much does a basic emergency kit cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A basic 3-day emergency kit costs approximately $100-200 per person, including flashlights, NOAA radio, power bank, water reserves (5 gallons/person), dry food, and emergency blankets. A comfort kit with camping stove and 7-day food supply runs $400-700. A fully autonomous setup with generator and solar panels can cost $1,500-3,000+.",
                },
              },
              {
                "@type": "Question",
                name: "Are all-electric homes more vulnerable to blackouts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, significantly. All-electric homes lose heating, cooking, and hot water simultaneously during a blackout. Homes with natural gas retain gas heating, gas cooking, and gas water heating even without electricity. This is why FEMA recommends having backup heating and cooking options regardless of your home's primary energy source.",
                },
              },
              {
                "@type": "Question",
                name: "Generator vs portable power station: which is better?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Generators (3500W, $700-1,400) are better for extended outages and powering large appliances, but they're noisy, require fuel, and must be used outdoors due to carbon monoxide risk. Portable power stations ($450-1,700) are silent, indoor-safe, and can be recharged via solar panels, but have limited capacity. For most families, a combination of both provides the best protection.",
                },
              },
            ],
          }),
        }}
      />
      <BreadcrumbEN currentPage="Blackout Simulator" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Power Outage Simulator &mdash; Are You Prepared?
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Test your home&apos;s blackout readiness. Get a preparedness score and a personalized
        emergency equipment shopping list with estimated costs.
      </p>

      <BlackoutSimulator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO Content */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Power Outages in America: Why Preparedness Matters
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          The US power grid is aging and increasingly vulnerable to extreme weather events.
          According to NERC (North American Electric Reliability Corporation), Americans
          experience an average of <strong>5+ power interruptions per year</strong>,
          with a growing trend of longer and more severe outages.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Major US Blackouts</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">Texas Winter Storm (2021)</p>
            <p className="text-xs text-slate-500">4.5 million homes without power for up to 5 days. 246+ deaths. $195 billion in damages.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">California PSPS (2019-2024)</p>
            <p className="text-xs text-slate-500">Planned shutoffs affecting millions during wildfire season. Up to 5 days without power.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">Hurricane Ian (2022)</p>
            <p className="text-xs text-slate-500">2.6 million homes in Florida lost power. Some areas waited 2+ weeks for restoration.</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">US Power Grid Vulnerabilities</h3>
        <ul className="list-disc list-inside text-slate-600 text-sm space-y-2 mb-6">
          <li><strong>ERCOT (Texas)</strong>: Independent grid, not connected to national system, vulnerable to extreme cold/heat</li>
          <li><strong>WECC (Western US)</strong>: Wildfire-related shutoffs, drought affecting hydroelectric capacity</li>
          <li><strong>Eastern Interconnection</strong>: Hurricane and ice storm damage, aging infrastructure</li>
          <li><strong>Growing demand</strong>: EV charging, AI data centers, and electrification straining capacity</li>
          <li><strong>Cybersecurity threats</strong>: Increasing attacks on critical infrastructure</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          FEMA Emergency Preparedness Guidelines
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          FEMA recommends every household maintain supplies for at least <strong>72 hours (3 days)</strong>
          of self-sufficiency. For areas prone to severe weather, FEMA suggests extending
          this to <strong>2 weeks</strong>. Key supplies include:
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <ul className="text-sm text-slate-600 space-y-1">
            <li>1 gallon of water per person per day (minimum 3-day supply)</li>
            <li>Non-perishable food (3-day minimum, 2-week recommended)</li>
            <li>Battery-powered or crank NOAA weather radio</li>
            <li>Flashlights and extra batteries</li>
            <li>First aid kit</li>
            <li>Medications (7-day supply)</li>
            <li>Phone charger / power bank</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How long will food last in my fridge during a blackout?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A full refrigerator keeps food safe for about <strong>4 hours</strong> if the door stays closed.
              A full freezer maintains temperature for approximately <strong>48 hours</strong> (24 hours if half full).
              After these timeframes, perishable food should be discarded if it exceeds 40°F (4°C).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I use a generator indoors?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Never use a generator indoors</strong>, in a garage, or near windows. Generators produce
              carbon monoxide (CO), an odorless deadly gas. Over 80 people die each year in the US from
              generator-related CO poisoning. Always operate generators outdoors, at least 20 feet from
              your home, with the exhaust facing away from buildings.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How can I report a power outage?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Contact your local utility company. Most have dedicated outage reporting lines, apps, and
              websites. You can also check outage maps from your utility provider. During widespread emergencies,
              tune into NOAA Weather Radio (channels 162.400-162.550 MHz) for updates.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/blackout-simulator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
