import type { Metadata } from "next";
import CalculateurGrossesse from "../CalculateurGrossesse";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerGrossesse, CAT_LABELS } from "../grossesseCalc";

// Semaines de grossesse courantes
const SEMAINES = [8, 12, 16, 20, 24, 28, 32, 36, 40];

function parseSlug(slug: string): { semaines: number } | null {
  const m = slug.match(/^(\d+)-semaines$/);
  if (!m) return null;
  return { semaines: parseInt(m[1]) };
}

export function generateStaticParams() {
  return SEMAINES.map((s) => ({ params: `${s}-semaines` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { semaines } = parsed;

  // Exemple : femme IMC normal 60kg/165cm
  const res = calculerGrossesse({
    poidsAvant: 60, taille: 165, semainesAmenorrhee: semaines,
    poidsActuel: 60, typeGrossesse: "simple",
  });

  return {
    alternates: { canonical: `/calcul-prise-poids-grossesse/${slug}` },
    title: `Prise de poids a ${semaines} SA - Recommandations 2026`,
    description: `Prise de poids attendue a ${semaines} semaines d'amenorrhee : +${res.priseAttendueMin.toFixed(1)} a +${res.priseAttendueMax.toFixed(1)} kg pour une femme d'IMC normal. Bareme IOM officiel.`,
    keywords: `prise poids ${semaines} SA, prise poids ${semaines} semaines grossesse, kilos ${semaines} SA, grossesse ${semaines} SA`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { semaines } = parsed;
  if (!SEMAINES.includes(semaines)) notFound();

  // 4 profils types pour cette semaine
  const profils = [
    { poidsAvant: 50, taille: 165, label: "IMC maigre (18)" },
    { poidsAvant: 60, taille: 165, label: "IMC normal (22)" },
    { poidsAvant: 75, taille: 165, label: "IMC surpoids (27)" },
    { poidsAvant: 90, taille: 165, label: "IMC obese (33)" },
  ];

  const resultats = profils.map((p) => {
    const res = calculerGrossesse({
      poidsAvant: p.poidsAvant, taille: p.taille,
      semainesAmenorrhee: semaines, poidsActuel: p.poidsAvant,
      typeGrossesse: "simple",
    });
    return { ...p, res };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de kilos prendre a ${semaines} SA de grossesse ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${semaines} semaines d'amenorrhee, la prise de poids recommandee depend de votre IMC avant grossesse : IMC normal (18,5-25) : +${resultats[1].res.priseAttendueMin.toFixed(1)} a +${resultats[1].res.priseAttendueMax.toFixed(1)} kg ; IMC maigre : +${resultats[0].res.priseAttendueMin.toFixed(1)} a +${resultats[0].res.priseAttendueMax.toFixed(1)} kg ; IMC surpoids : +${resultats[2].res.priseAttendueMin.toFixed(1)} a +${resultats[2].res.priseAttendueMax.toFixed(1)} kg ; IMC obesite : +${resultats[3].res.priseAttendueMin.toFixed(1)} a +${resultats[3].res.priseAttendueMax.toFixed(1)} kg.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${semaines} SA`} parentPage="Calcul Prise de Poids Grossesse" parentHref="/calcul-prise-poids-grossesse" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🤰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Prise de poids a {semaines} SA</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Recommandations officielles IOM 2009 a {semaines} semaines d&apos;amenorrhee selon votre IMC avant grossesse.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Prise de poids attendue a {semaines} SA selon l&apos;IMC</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Profil</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">IMC</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Prise mini</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Prise maxi</th>
            </tr>
          </thead>
          <tbody>
            {resultats.map((r, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="py-2.5 px-2 text-slate-700">{CAT_LABELS[r.res.categorieIMC]}</td>
                <td className="py-2.5 px-2 text-right text-slate-600">{r.res.imcAvant.toFixed(1)}</td>
                <td className="py-2.5 px-2 text-right font-bold text-emerald-600">+{r.res.priseAttendueMin.toFixed(1)} kg</td>
                <td className="py-2.5 px-2 text-right font-bold text-pink-600">+{r.res.priseAttendueMax.toFixed(1)} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calcul personnalise</h2>
      <CalculateurGrossesse />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres semaines</h2>
        <div className="flex flex-wrap gap-2">
          {SEMAINES.filter(s => s !== semaines).map(s => (
            <a key={s} href={`/calcul-prise-poids-grossesse/${s}-semaines`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/50 transition-all">
              {s} SA
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-prise-poids-grossesse" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
