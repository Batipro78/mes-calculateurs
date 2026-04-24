import type { Metadata } from "next";
import NuclearSimulator from "./NuclearSimulator";
import AdSlot from "../../components/AdSlot";
import BreadcrumbEN from "../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../components/RelatedCalculatorsEN";

export const metadata: Metadata = {
  title: "Nuclear Bomb Simulator 2026 - Interactive Impact Map & Destruction Zones",
  description: "Simulate the impact of a nuclear bomb on any US city. Interactive map showing fireball, radiation, blast, and thermal burn zones. Free educational tool.",
  keywords: "nuclear bomb simulator, nuclear explosion map, nuke impact simulator, nuclear war simulation, Hiroshima bomb radius, Tsar Bomba impact, nuclear attack map USA, atomic bomb damage radius",
  alternates: {
    canonical: "/en/nuclear-bomb-simulator",
    languages: {
      "fr": "/simulateur-bombe-nucleaire",
      "en": "/en/nuclear-bomb-simulator",
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
                name: "What would happen if a nuclear bomb hit New York City?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The impact depends on the bomb's yield. A modern strategic warhead (100 kT W76 Trident) would create a fireball of ~300m radius, total destruction within 1.3 km, collapsed buildings within 3.3 km, and shattered windows up to 10 km. A Hiroshima-type bomb (15 kT) would cause significantly less damage, with total destruction within ~700m.",
                },
              },
              {
                "@type": "Question",
                name: "What is the most powerful nuclear bomb ever tested?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Tsar Bomba, tested by the USSR on October 30, 1961, is the most powerful nuclear weapon ever detonated: 50 megatons (50,000 kilotons), equivalent to 3,333 times the Hiroshima bomb. Its shockwave shattered windows 560 miles away and the fireball measured 2.1 miles in diameter.",
                },
              },
              {
                "@type": "Question",
                name: "How many nuclear weapons does the United States have?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The United States maintains approximately 5,500 nuclear warheads, making it the second-largest nuclear arsenal after Russia (~6,200). The US nuclear triad consists of land-based ICBMs (Minuteman III), submarine-launched ballistic missiles (Trident II), and air-delivered bombs (B61, B83) carried by B-2 and B-52 bombers.",
                },
              },
              {
                "@type": "Question",
                name: "How to survive a nuclear attack?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In case of a nuclear alert: 1) Get inside a solid building immediately (basement, underground parking). 2) Stay away from windows and lie flat on the floor. 3) Remain sheltered for at least 24 hours to avoid radioactive fallout. 4) Never look at the explosion (risk of blindness). 5) Listen to official instructions on radio (NOAA Weather Radio, AM/FM emergency broadcasts). Beyond 10-15 miles from a 300 kT detonation, survival chances are good with proper shelter.",
                },
              },
              {
                "@type": "Question",
                name: "What is the current nuclear threat level in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As of 2026, rising geopolitical tensions, including the Iran crisis and ongoing conflicts, have increased concerns about nuclear proliferation. The Doomsday Clock stands near its closest-ever point to midnight. Nine countries possess nuclear weapons: USA, Russia, China, France, UK, India, Pakistan, Israel, and North Korea, with a combined arsenal of approximately 12,500 warheads.",
                },
              },
            ],
          }),
        }}
      />
      <BreadcrumbEN currentPage="Nuclear Bomb Simulator" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ☢️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Nuclear Bomb Simulator &mdash; Interactive Impact Map
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Visualize nuclear explosion destruction zones on an interactive map.
        Select a weapon and an impact point on any US city.
      </p>

      <NuclearSimulator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO Content */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Understanding Nuclear Explosion Effects
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          A <strong>nuclear explosion</strong> produces several devastating effects
          that propagate in concentric circles around ground zero. The range of each
          effect depends on the bomb&apos;s yield, measured in{" "}
          <strong>kilotons (kT)</strong> or <strong>megatons (Mt)</strong> of TNT
          equivalent.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          The 6 Impact Zones
        </h3>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-red-600 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Fireball</p>
              <p className="text-xs text-slate-500">
                Temperature of several million degrees. Everything is instantly vaporized:
                buildings, vehicles, people. For Hiroshima (15 kT), the fireball
                measured about 600 feet in radius.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-600 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Lethal Radiation (500 rem)</p>
              <p className="text-xs text-slate-500">
                Lethal dose of initial radiation. Exposed individuals develop acute
                radiation syndrome and die within hours to weeks. Beyond this zone,
                radioactive fallout remains dangerous for days.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Heavy Blast (20 psi)</p>
              <p className="text-xs text-slate-500">
                Even reinforced concrete buildings are destroyed. The overpressure of
                20 psi flattens everything in its path. Near-total fatality rate (~90%).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Moderate Blast (5 psi)</p>
              <p className="text-xs text-slate-500">
                Residential buildings collapse. Massive fires break out. Approximately 50%
                fatality rate. This is the zone where most Hiroshima casualties occurred.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">3rd Degree Burns</p>
              <p className="text-xs text-slate-500">
                Thermal radiation causes severe burns on all exposed skin. Flammable
                materials (wood, fabric, paper) ignite spontaneously, creating massive
                secondary fires.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Light Blast (1 psi)</p>
              <p className="text-xs text-slate-500">
                All windows shatter, causing numerous injuries from flying glass debris.
                Light structural damage. Survival chances are good with quick shelter.
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Hopkinson&apos;s Scaling Law (Cube Root Scaling)
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Effect radii follow <strong>Hopkinson&apos;s scaling law</strong>: the
          destruction radius is proportional to the cube root of the yield. This means
          a bomb 1,000 times more powerful doesn&apos;t have a 1,000 times larger radius,
          but only 10 times larger (cube root of 1,000 = 10).
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-sm font-mono text-slate-700">
            R = R₀ × (Y / Y₀)^(1/3)
          </p>
          <p className="text-xs text-slate-400 mt-1">
            R = radius, Y = yield in kT, R₀ and Y₀ = reference values
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Nuclear Arsenals Worldwide (2026)
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-600">~6,200</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">Russia</p>
            <p className="text-xs text-slate-400">Strategic + tactical warheads</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-600">~5,500</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">United States</p>
            <p className="text-xs text-slate-400">Full nuclear triad</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-600">~350</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">China</p>
            <p className="text-xs text-slate-400">Rapidly expanding arsenal</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-sky-600">~290</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">France</p>
            <p className="text-xs text-slate-400">SSBN + Rafale ASMPA</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~225</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">United Kingdom</p>
            <p className="text-xs text-slate-400">Trident submarines</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-slate-600">~170</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">Others (India, Pakistan, Israel, North Korea)</p>
            <p className="text-xs text-slate-400">Estimates</p>
          </div>
        </div>
      </section>

      {/* Current Threats Section - Iran/Geopolitics */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Nuclear Threats in 2026: Iran Crisis &amp; Global Tensions
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          The escalating <strong>Iran nuclear crisis</strong> has brought nuclear preparedness
          back to the forefront of public discourse. With Iran&apos;s uranium enrichment program
          advancing and diplomatic tensions rising, experts warn that the risk of nuclear
          conflict or a dirty bomb attack is at its highest point since the Cold War.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          The <strong>Doomsday Clock</strong>, maintained by the Bulletin of the Atomic Scientists,
          remains near its closest-ever position to midnight. Key risk factors include:
        </p>
        <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 mb-4">
          <li>Iran&apos;s nuclear enrichment capacity and IAEA inspections standoff</li>
          <li>Russia-NATO tensions and tactical nuclear weapons doctrine</li>
          <li>North Korea&apos;s expanding ICBM and warhead program</li>
          <li>US-China strategic competition in the Pacific</li>
          <li>Modernization of nuclear arsenals by all nine nuclear states</li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          Understanding the potential effects of nuclear weapons is crucial for emergency
          preparedness. This simulator uses established physics formulas to provide
          educational estimates of blast, radiation, and thermal effects.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              What&apos;s the difference between kilotons and megatons?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A <strong>kiloton (kT)</strong> equals 1,000 tons of TNT. A{" "}
              <strong>megaton (Mt)</strong> equals 1 million tons of TNT, or 1,000 kT.
              Hiroshima (15 kT) was a small bomb compared to modern warheads (100-300 kT)
              or the Tsar Bomba (50,000 kT = 50 Mt).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              How far away is safe from a nuclear explosion?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              For a 300 kT warhead (standard strategic weapon), severe damage extends about
              3 miles and shattered windows about 10 miles. Beyond 12 miles, direct blast
              effects are negligible. However, radioactive fallout can contaminate areas
              over 60 miles away depending on wind and weather conditions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Why doesn&apos;t this simulator show radioactive fallout?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fallout depends on highly variable factors: wind direction and speed,
              humidity, detonation altitude, and soil composition. Modeling it would
              require real-time weather data. This simulator focuses on immediate effects
              (blast, heat, initial radiation) which can be calculated using physics formulas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Is the United States a nuclear target?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The US is protected by its own nuclear deterrent (second-strike capability)
              and the world&apos;s most powerful conventional military. Its nuclear submarine fleet
              (SSBNs) is undetectable and can retaliate even if the homeland is struck. This
              retaliatory capability makes any nuclear attack on the US theoretically
              &quot;suicidal&quot; for the attacker &mdash; this is the principle of deterrence (MAD:
              Mutually Assured Destruction).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              What should you do in a nuclear emergency?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              1) Get inside a solid building immediately (basement, underground parking).
              2) Close all doors and windows, shut off ventilation. 3) Stay away from windows
              and lie flat. 4) Never look at the explosion. 5) Stay sheltered for at least 24
              hours. 6) Listen to NOAA Weather Radio or AM/FM emergency broadcasts for
              official instructions. 7) Do not go outside until authorities say it&apos;s safe.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/nuclear-bomb-simulator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
