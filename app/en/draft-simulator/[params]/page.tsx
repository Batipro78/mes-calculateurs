import type { Metadata } from "next";
import DraftSimulator from "../DraftSimulator";
import AdSlot from "../../../components/AdSlot";
import BreadcrumbEN from "../../../components/BreadcrumbEN";
import RelatedCalculatorsEN from "../../../components/RelatedCalculatorsEN";
import { notFound } from "next/navigation";
import { Gender, GENDER_LABELS, calcDraftRisk } from "../draftCalcEN";

const AGES_SEO = [18, 20, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65];
const GENDERS: Gender[] = ["male", "female"];

// Profile-based pages
const PROFILES = [
  { slug: "veteran", label: "Military Veteran", gender: "male" as Gender, age: 35, military: "veteran" as const, desc: "Former active-duty service member" },
  { slug: "national-guard", label: "National Guard Member", gender: "male" as Gender, age: 28, military: "guard" as const, desc: "Active reserve component" },
  { slug: "single-parent", label: "Single Parent", gender: "male" as Gender, age: 30, military: "registered" as const, desc: "Sole caregiver with dependents" },
  { slug: "healthcare-worker", label: "Healthcare Worker", gender: "female" as Gender, age: 35, military: "none" as const, desc: "Doctor, nurse, or essential medical staff" },
  { slug: "college-student", label: "College Student", gender: "male" as Gender, age: 20, military: "registered" as const, desc: "Currently enrolled in university" },
  { slug: "dual-citizen", label: "Dual Citizen", gender: "male" as Gender, age: 25, military: "registered" as const, desc: "US + foreign citizenship" },
  { slug: "conscientious-objector", label: "Conscientious Objector", gender: "male" as Gender, age: 22, military: "registered" as const, desc: "Moral/religious opposition to war" },
];

type ParsedResult = { type: "age"; gender: Gender; age: number } | { type: "profile"; profile: typeof PROFILES[number] };

function parseSlug(slug: string): ParsedResult | null {
  for (const g of GENDERS) {
    for (const a of AGES_SEO) {
      if (slug === `${g}-${a}-years-old`) return { type: "age", gender: g, age: a };
    }
  }
  for (const p of PROFILES) {
    if (slug === p.slug) return { type: "profile", profile: p };
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const g of GENDERS) {
    for (const a of AGES_SEO) {
      params.push({ params: `${g}-${a}-years-old` });
    }
  }
  for (const p of PROFILES) {
    params.push({ params: p.slug });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "age") {
    const result = calcDraftRisk(parsed.gender, parsed.age, "fit", "registered", "single", "standard");
    return {
      title: `Would a ${parsed.age}-year-old ${GENDER_LABELS[parsed.gender].toLowerCase()} be drafted? Score: ${result.score}/100`,
      description: `Draft priority analysis for a ${parsed.age}-year-old ${GENDER_LABELS[parsed.gender].toLowerCase()}: ${result.label} (${result.score}/100). ${result.description} Based on US Selective Service regulations and historical draft patterns.`,
      keywords: `draft ${parsed.age} year old ${GENDER_LABELS[parsed.gender].toLowerCase()}, military draft age ${parsed.age}, selective service ${parsed.age}, would ${parsed.age} be drafted`,
    };
  } else {
    const p = parsed.profile;
    const result = calcDraftRisk(p.gender, p.age, "fit", p.military, p.slug === "single-parent" ? "single-parent" : "single",
      p.slug === "healthcare-worker" ? "healthcare" : "standard");
    return {
      title: `Would a ${p.label} be drafted? ${result.label} (${result.score}/100)`,
      description: `Draft analysis for ${p.label.toLowerCase()}s: ${result.description} Priority score: ${result.score}/100. Based on US Selective Service system.`,
      keywords: `draft ${p.slug.replace(/-/g, " ")}, military draft ${p.slug.replace(/-/g, " ")}, selective service ${p.slug.replace(/-/g, " ")}`,
    };
  }
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  let title: string;
  let subtitle: string;
  let result;

  if (parsed.type === "age") {
    title = `${GENDER_LABELS[parsed.gender]}, ${parsed.age} Years Old`;
    subtitle = `Draft priority analysis for a ${parsed.age}-year-old ${GENDER_LABELS[parsed.gender].toLowerCase()}.`;
    result = calcDraftRisk(parsed.gender, parsed.age, "fit", "registered", "single", "standard");
  } else {
    const p = parsed.profile;
    title = p.label;
    subtitle = p.desc;
    result = calcDraftRisk(p.gender, p.age, "fit", p.military,
      p.slug === "single-parent" ? "single-parent" : "single",
      p.slug === "healthcare-worker" ? "healthcare" : "standard");
  }

  const otherAges = AGES_SEO.filter((a) => parsed.type !== "age" || a !== parsed.age).slice(0, 6);
  const otherProfiles = PROFILES.filter((p) => parsed.type !== "profile" || p.slug !== parsed.profile.slug).slice(0, 5);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [{
          "@type": "Question",
          name: `Would a ${title.toLowerCase()} be drafted?`,
          acceptedAnswer: { "@type": "Answer",
            text: `A ${title.toLowerCase()} scores ${result.score}/100 on our draft priority scale, classified as "${result.label}". ${result.description}`
          },
        }],
      })}} />

      <BreadcrumbEN currentPage={title} parentPage="Draft Simulator" parentHref="/en/draft-simulator" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">🪖</div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Draft Simulator: {title}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{subtitle}</p>

      {/* Result */}
      <div className="rounded-2xl p-8 text-white shadow-lg mb-8" style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}dd)` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm">Draft priority score</p>
            <p className="text-5xl font-extrabold">{result.score}/100</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{result.label}</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 mb-4">
          <div className="bg-white rounded-full h-3" style={{ width: `${result.score}%` }} />
        </div>
        <p className="text-white/90 text-sm">{result.description}</p>
      </div>

      {/* Factors */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Scoring Factors</h2>
        <div className="space-y-2">
          {result.factors.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">{f.emoji}</span>
                <p className="text-sm font-medium text-slate-700">{f.label}</p>
              </div>
              <p className={`font-bold text-sm ${f.points > 0 ? "text-red-600" : f.points < 0 ? "text-emerald-600" : "text-slate-400"}`}>
                {f.points > 0 ? `+${f.points}` : f.points}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This is a hypothetical educational simulator. There is currently
          no active draft in the US. Scores are based on historical patterns and Selective Service regulations.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Interactive Simulator</h2>
      <DraftSimulator />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Other ages */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Other ages</h2>
        <div className="flex flex-wrap gap-2">
          {otherAges.map((a) => (
            <a key={a} href={`/en/draft-simulator/male-${a}-years-old`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all">
              Male, {a}
            </a>
          ))}
        </div>
      </section>

      {/* Profiles */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Special profiles</h2>
        <div className="flex flex-wrap gap-2">
          {otherProfiles.map((p) => (
            <a key={p.slug} href={`/en/draft-simulator/${p.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all">
              {p.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculatorsEN currentSlug="/en/draft-simulator" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
