import type { Metadata } from "next";
import SurvivalBudgetCalculator from "./SurvivalBudgetCalculator";
import AdSlot from "../../components/AdSlot";
import BreadcrumbEN from "../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../components/RelatedCalculatorsEN";

export const metadata: Metadata = {
  title: "Survival Budget Calculator 2026 - Minimum Cost of Living in the US",
  description: "Calculate the minimum monthly budget to survive in any US city. Includes rent, food, transport, health insurance, and utilities. Compare to federal poverty line and SNAP benefits.",
  keywords: "cost of living calculator USA, minimum budget to live, survival budget, monthly expenses calculator, poverty line 2026, SNAP benefits, living wage calculator, how much to survive",
  alternates: {
    canonical: "/en/survival-budget-calculator",
    languages: {
      "fr": "/calculateur-budget-survie",
      "en": "/en/survival-budget-calculator",
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
                name: "What is the minimum budget to survive in the US in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The minimum monthly budget varies greatly by location: $2,500-$3,500/month for a single person in a major metro (NYC, SF, LA), $1,800-$2,500 in a large city (Chicago, Houston), $1,400-$1,800 in a mid-size city, and $1,200-$1,500 in rural areas. These figures include rent, food, transport, utilities, and basic health insurance.",
                },
              },
              {
                "@type": "Question",
                name: "What is the federal poverty line in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 2026 federal poverty line (FPL) is approximately $16,560/year ($1,380/month) for a single person, $22,320/year ($1,860/month) for a 2-person household, and $34,080/year ($2,840/month) for a family of 4. Many federal assistance programs use 100-200% of FPL as eligibility thresholds.",
                },
              },
              {
                "@type": "Question",
                name: "What government assistance is available for low-income Americans?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Key programs include: SNAP (food stamps, up to $291/month for singles), Medicaid (free healthcare if income <138% FPL), Section 8 (housing subsidies), LIHEAP (energy bill help), EITC (earned income tax credit up to $7,430/year), ACA subsidies (health insurance premium assistance), and TANF (temporary cash assistance, varies by state).",
                },
              },
              {
                "@type": "Question",
                name: "Can you survive on minimum wage in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The federal minimum wage of $7.25/hour yields approximately $1,256/month gross (~$1,100 net). This is below the poverty line and far below the survival budget in most US cities. However, many states and cities have higher minimums: California ($16/hr), New York ($16/hr), Washington ($16.28/hr). Even at $15/hr, a single person in a major metro would struggle without assistance.",
                },
              },
            ],
          }),
        }}
      />
      <BreadcrumbEN currentPage="Survival Budget Calculator" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧮
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Survival Budget Calculator &mdash; US Cost of Living 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculate the minimum monthly budget to survive in any US city.
        Compare your expenses to the federal poverty line and available assistance programs.
      </p>

      <SurvivalBudgetCalculator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO Content */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Understanding the True Cost of Living in America
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          The cost of living in the United States varies dramatically by location. While the
          federal poverty line sets a national baseline, the reality is that <strong>surviving
          in New York City costs 2-3x more than surviving in rural Kansas</strong>. This
          calculator uses real 2026 data to estimate your minimum monthly expenses.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Average Monthly Rent by City Type (2026)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Location</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Single</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Couple</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Family (4)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">Major Metro (NYC, SF, LA)</td>
                <td className="py-3 px-2 text-right text-slate-800">$1,800</td>
                <td className="py-3 px-2 text-right text-slate-800">$2,300</td>
                <td className="py-3 px-2 text-right text-slate-800">$2,900</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">Large City (Chicago, Houston)</td>
                <td className="py-3 px-2 text-right text-slate-800">$1,200</td>
                <td className="py-3 px-2 text-right text-slate-800">$1,550</td>
                <td className="py-3 px-2 text-right text-slate-800">$2,000</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">Mid-Size City (Portland, Boise)</td>
                <td className="py-3 px-2 text-right text-slate-800">$850</td>
                <td className="py-3 px-2 text-right text-slate-800">$1,100</td>
                <td className="py-3 px-2 text-right text-slate-800">$1,400</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-medium text-slate-700">Rural America</td>
                <td className="py-3 px-2 text-right text-slate-800">$650</td>
                <td className="py-3 px-2 text-right text-slate-800">$800</td>
                <td className="py-3 px-2 text-right text-slate-800">$1,050</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Key US Cost of Living Facts (2026)</h3>
        <ul className="list-disc list-inside text-slate-600 text-sm space-y-2">
          <li><strong>Healthcare</strong> is the #1 differentiator vs. other developed countries. ACA marketplace plans cost $350-900+/month without employer coverage</li>
          <li><strong>Transportation</strong> costs vary 3-5x depending on car ownership vs. public transit availability</li>
          <li><strong>SNAP benefits</strong> can cover up to $291/month for a single person — a major lifeline for food costs</li>
          <li><strong>State minimums</strong> range from $7.25 (federal, 20 states) to $20+/hour (California, Washington)</li>
          <li><strong>Housing</strong> is the single largest expense everywhere, typically 30-50% of total budget</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">What is the cheapest state to live in the US?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              As of 2026, the cheapest states for overall cost of living are Mississippi, Kansas,
              Oklahoma, Alabama, and West Virginia. However, lower costs often come with trade-offs:
              fewer job opportunities, less public transit, and potentially limited healthcare access.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How much should I spend on rent?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The traditional rule is the <strong>30% rule</strong>: spend no more than 30% of
              gross income on housing. However, in major metros, many Americans spend 40-50%+
              on rent. If possible, aim for 25-30% to leave room for savings and emergencies.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Do these estimates include taxes?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              This calculator shows <strong>after-tax expenses</strong> (what you need to spend).
              To earn this amount, you&apos;d need approximately 20-30% more gross income, depending
              on your state&apos;s income tax rate (0% in Texas, Florida, Nevada vs. 13.3% in California).
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/survival-budget-calculator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
