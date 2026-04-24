import type { Metadata } from "next";
import DraftSimulator from "./DraftSimulator";
import AdSlot from "../../components/AdSlot";
import BreadcrumbEN from "../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../components/RelatedCalculatorsEN";

export const metadata: Metadata = {
  title: "Military Draft Simulator 2026 - Would You Be Drafted?",
  description: "Hypothetical US military draft simulator. See your draft priority score based on age, gender, military experience, medical status, and occupation. Educational tool based on Selective Service regulations.",
  keywords: "military draft simulator, would I be drafted, selective service draft, US conscription, draft lottery simulator, military mobilization USA, draft age, Iran war draft",
  alternates: {
    canonical: "/en/draft-simulator",
    languages: {
      "fr": "/simulateur-mobilisation",
      "en": "/en/draft-simulator",
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
                name: "Can the US bring back the military draft?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, legally. While the US has relied on an all-volunteer force since 1973, the Selective Service System remains active. To reinstate the draft, Congress would need to pass legislation and the President would need to sign it. All males ages 18-25 are required to register with Selective Service. In a national emergency, Congress could authorize conscription within weeks.",
                },
              },
              {
                "@type": "Question",
                name: "What age would be drafted first?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Under the current Selective Service system, men ages 18-25 would be called first, starting with 20-year-olds, then 21, 22, 23, 24, 25, then 19, and finally 18. The order within each age group would be determined by a lottery based on birthdays. In an extended mobilization, the age range could potentially extend to 35 or even 45.",
                },
              },
              {
                "@type": "Question",
                name: "Can women be drafted in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Currently, no. Only males are required to register with Selective Service. However, there have been multiple attempts in Congress to extend registration to women, and the issue remains under active debate. As of 2026, women serve in all combat roles on a voluntary basis but cannot be conscripted.",
                },
              },
              {
                "@type": "Question",
                name: "What are valid draft exemptions and deferments?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Historical exemptions include: physical or mental disability, conscientious objector status (religious/moral opposition to war), sole surviving son, critical civilian occupation (healthcare, infrastructure), hardship deferment (sole support of family), and ministerial status. College student deferments were used during Vietnam but their availability in a future draft is uncertain.",
                },
              },
              {
                "@type": "Question",
                name: "Could the Iran crisis lead to a draft?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "While the Iran crisis has raised concerns, a draft is considered extremely unlikely for a regional conflict. The US military has 1.3 million active-duty personnel plus 800,000 reserves. A draft would only be considered in a large-scale, multi-front war requiring millions of troops. However, the political discussion around draft readiness has intensified in 2026.",
                },
              },
            ],
          }),
        }}
      />
      <BreadcrumbEN currentPage="Draft Simulator" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🪖
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Military Draft Simulator &mdash; Would You Be Called?
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Hypothetical draft priority calculator based on US Selective Service regulations.
        See where you would fall in a potential military mobilization.
      </p>

      <DraftSimulator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO Content */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          The US Military Draft: History &amp; Current Status
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          The United States has a complex history with military conscription. While the
          <strong> all-volunteer force</strong> has been the standard since 1973, the{" "}
          <strong>Selective Service System</strong> remains active as a contingency measure.
          With rising global tensions in 2026, including the Iran nuclear crisis and ongoing
          geopolitical conflicts, questions about a potential draft have resurfaced.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">US Draft History</h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">Civil War (1863-1865)</p>
            <p className="text-xs text-slate-500">First federal draft. Could pay $300 to avoid service. Led to the New York Draft Riots (120+ killed).</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">World War I (1917-1918)</p>
            <p className="text-xs text-slate-500">2.8 million drafted. Ages 21-30 (later 18-45). First large-scale lottery system.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">World War II (1940-1947)</p>
            <p className="text-xs text-slate-500">10 million drafted. Ages 18-45. Longest continuous draft in US history.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">Vietnam War (1964-1973)</p>
            <p className="text-xs text-slate-500">2.2 million drafted. Last active draft. Led to massive protests and draft reform. Lottery system introduced in 1969.</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Current US Military Strength (2026)</h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-700">1.3M</p>
            <p className="text-xs text-blue-500">Active duty personnel</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-700">800K</p>
            <p className="text-xs text-blue-500">Reserve &amp; National Guard</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-700">16M+</p>
            <p className="text-xs text-blue-500">Selective Service registrants</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Selective Service Registration</h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>All US males must register within 30 days of their 18th birthday.</strong> This
          includes US citizens, permanent residents, undocumented immigrants, refugees, and
          asylum seekers. Failure to register can result in:
        </p>
        <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 mb-4">
          <li>Loss of federal financial aid for college</li>
          <li>Ineligibility for federal jobs</li>
          <li>Ineligibility for US citizenship (for immigrants)</li>
          <li>Possible prosecution (fine up to $250,000 and/or 5 years in prison)</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How does the draft lottery work?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              In a draft lottery, all 365 days of the year are randomly ordered. Your birthday
              determines your sequence number. If your birthday is drawn early (low number),
              you&apos;re called first. During Vietnam, the first lottery in 1969 drew September 14
              as #1. Everyone with that birthday was called immediately.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">What happens if you refuse the draft?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Draft evasion is a federal crime punishable by up to 5 years in prison and a $250,000
              fine. During Vietnam, approximately 570,000 men were classified as &quot;draft offenders&quot;
              and about 210,000 were accused of violating draft laws. President Carter granted
              amnesty to most Vietnam-era draft evaders in 1977.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can you be drafted with a college degree?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Yes. During Vietnam, college student deferments were available but controversial.
              In a modern draft, student deferments might not be offered. However, graduates might
              be eligible for officer training rather than enlisted service.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/draft-simulator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
