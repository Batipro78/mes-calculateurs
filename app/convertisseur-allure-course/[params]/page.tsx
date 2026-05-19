import type { Metadata } from "next";
import ConvertisseurAllureCourse from "../ConvertisseurAllureCourse";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  formatAllure,
  kmhVersAllureMinKm,
  allureMinKmVersKmh,
  predireTempsCourse,
  genererPredictions,
} from "../allureCourseCalc";

// Allures courantes : 3:30 a 8:00 par paliers de 30s
const ALLURES_MIN_DECIM = [
  3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0,
];

// Vitesses km/h courantes
const VITESSES_KMH = [8, 9, 10, 11, 12, 13, 14, 15];

// Predictions de temps cible
const TEMPS_CIBLES = [
  { slug: "marathon-4h", distance: 42.195, tempsMin: 240 },
  { slug: "marathon-3h30", distance: 42.195, tempsMin: 210 },
  { slug: "semi-1h45", distance: 21.0975, tempsMin: 105 },
  { slug: "semi-2h", distance: 21.0975, tempsMin: 120 },
  { slug: "10km-50min", distance: 10, tempsMin: 50 },
  { slug: "10km-45min", distance: 10, tempsMin: 45 },
  { slug: "5km-25min", distance: 5, tempsMin: 25 },
  { slug: "5km-22min", distance: 5, tempsMin: 22 },
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): {
  type: "allure" | "vitesse" | "temps";
  value: number;
  valueSecondary?: number;
} | null {
  // Allure : allure-5min30-par-km ou allure-6min-par-km
  let match = slug.match(/^allure-(\d+)min(?:(\d+))?-par-km$/);
  if (match) {
    const min = parseInt(match[1]);
    const sec = match[2] ? parseInt(match[2]) : 0;
    const decim = min + sec / 60;
    return { type: "allure", value: decim };
  }

  // Vitesse : vitesse-12-kmh
  match = slug.match(/^vitesse-(\d+)-kmh$/);
  if (match) {
    const vitesse = parseInt(match[1]);
    return { type: "vitesse", value: vitesse };
  }

  // Marathon temps : marathon-4h, marathon-3h30
  match = slug.match(/^marathon-(\d+)h(?:(\d+))?$/);
  if (match) {
    const heures = parseInt(match[1]);
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const tempsMin = heures * 60 + minutes;
    const allure = tempsMin / 42.195;
    return { type: "temps", value: allure };
  }

  // Semi temps : semi-1h45, semi-2h
  match = slug.match(/^semi-(\d+)h(\d+)$/);
  if (match) {
    const heures = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const tempsMin = heures * 60 + minutes;
    const allure = tempsMin / 21.0975;
    return { type: "temps", value: allure };
  }

  // Distance specifique : 10km-50min, 5km-25min
  match = slug.match(/^(10km|5km)-(\d+)min$/);
  if (match) {
    const distance = match[1] === "10km" ? 10 : 5;
    const tempsMin = parseInt(match[2]);
    const allure = tempsMin / distance;
    return { type: "temps", value: allure };
  }

  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  // Allures en min/km
  ALLURES_MIN_DECIM.forEach((allure) => {
    const min = Math.floor(allure);
    const sec = Math.round((allure - min) * 60);
    if (sec === 0) {
      params.push({ params: `allure-${min}min-par-km` });
    } else {
      params.push({ params: `allure-${min}min${sec}-par-km` });
    }
  });

  // Vitesses en km/h
  VITESSES_KMH.forEach((vitesse) => {
    params.push({ params: `vitesse-${vitesse}-kmh` });
  });

  // Temps cibles
  TEMPS_CIBLES.forEach((tc) => {
    params.push({ params: tc.slug });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (parsed === null) return {};

  const { type, value } = parsed;
  let title = "";
  let description = "";
  let keywords = "";

  if (type === "allure") {
    const formatted = formatAllure(value);
    const kmh = allureMinKmVersKmh(value);
    title = `Allure ${formatted}/km : temps marathon, semi, 10km - Convertisseur`;
    description = `Allure de course ${formatted} par km = ${fmt(kmh, 1)} km/h. Temps estimes : marathon ${predireTempsCourse(value, 42.195).formatte}, semi ${predireTempsCourse(value, 21.0975).formatte}, 10km ${predireTempsCourse(value, 10).formatte}.`;
    keywords = `allure ${formatted}, ${formatted} par km, vitesse ${fmt(kmh, 1)} kmh, tempo running`;
  } else if (type === "vitesse") {
    const allure = kmhVersAllureMinKm(value);
    const formatted = formatAllure(allure);
    title = `Vitesse ${value} km/h : allure ${formatted}/km - Convertisseur`;
    description = `Vitesse ${value} km/h = allure ${formatted} par km. Temps estimes pour marathon, semi-marathon et 10km.`;
    keywords = `${value} kmh, vitesse ${value} km/h, allure ${formatted}`;
  } else {
    const formatted = formatAllure(value);
    const kmh = allureMinKmVersKmh(value);
    const tempsSemi = predireTempsCourse(value, 21.0975);
    const tempsMarathon = predireTempsCourse(value, 42.195);
    if (slug.includes("marathon")) {
      title = `Temps marathon cible : allure ${formatted}/km, ${fmt(kmh, 1)} km/h`;
      description = `Pour courir un marathon en ${tempsMarathon.formatte}, vous devez maintenir une allure de ${formatted} par km (${fmt(kmh, 1)} km/h).`;
      keywords = "marathon, temps marathon, allure marathon, vitesse marathon";
    } else if (slug.includes("semi")) {
      title = `Temps semi-marathon : allure ${formatted}/km, ${fmt(kmh, 1)} km/h`;
      description = `Pour courir un semi-marathon en ${tempsSemi.formatte}, vous devez maintenir une allure de ${formatted} par km.`;
      keywords = "semi-marathon, temps semi, allure semi, vitesse semi";
    } else {
      title = `Temps ${slug.replace(/-/g, " ")} : allure ${formatted}/km`;
      description = `Pour courir ${slug.replace(/-/g, " ")}, vous devez maintenir une allure de ${formatted} par km (${fmt(kmh, 1)} km/h).`;
      keywords = `${slug.replace(/-/g, " ")}, allure course`;
    }
  }

  return {
    alternates: { canonical: `/convertisseur-allure-course/${slug}` },
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (parsed === null) notFound();

  const { type, value: allureMinKmDec } = parsed;
  const kmh = allureMinKmVersKmh(allureMinKmDec);
  const formatted = formatAllure(allureMinKmDec);
  const predictions = genererPredictions(allureMinKmDec);

  let pageTitle = "";
  let pageDescription = "";
  let resultLabel = "";

  if (type === "allure") {
    pageTitle = `Allure ${formatted}/km`;
    pageDescription = `Conversion allure ${formatted} par km vers vitesse et temps estimes.`;
    resultLabel = "Allure entree";
  } else if (type === "vitesse") {
    pageTitle = `Vitesse ${Math.round(kmh)} km/h`;
    pageDescription = `Conversion vitesse ${Math.round(kmh)} km/h vers allure en min/km.`;
    resultLabel = "Vitesse entree";
  } else {
    pageTitle = `Objectif : ${slug.replace(/-/g, " ")}`;
    pageDescription = `Allure et vitesse necessaires pour atteindre cet objectif de temps.`;
    resultLabel = "Allure requise";
  }

  // Comparaison avec autres allures
  const comparaison = ALLURES_MIN_DECIM.filter((a) => a !== allureMinKmDec)
    .slice(0, 6)
    .map((a) => {
      const fmt_a = formatAllure(a);
      const kmh_a = allureMinKmVersKmh(a);
      return { allure: fmt_a, kmh: kmh_a };
    });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Qu&apos;est-ce que ${formatted}/km en vitesse ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une allure de ${formatted} par km correspond a une vitesse de ${fmt(kmh, 1)} km/h. Formule : Vitesse (km/h) = 60 / Allure (min/km).`,
        },
      },
      {
        "@type": "Question",
        name: `Quel temps pour un marathon a ${formatted}/km ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A une allure de ${formatted} par km, le temps pour courir un marathon (42.195 km) est ${predictions.find((p) => p.distance === "Marathon")?.tempsTotal}.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={pageTitle}
        parentPage="Convertisseur Allure"
        parentHref="/convertisseur-allure-course"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏃
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {pageTitle}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{pageDescription}</p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-100 mb-1">{resultLabel}</p>
        <p className="text-5xl font-extrabold tracking-tight mb-3">
          {formatted}
        </p>
        <p className="text-emerald-100">
          {fmt(kmh, 1)} km/h
        </p>
      </div>

      {/* Predictions sur distances */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Temps predits
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Distance
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Temps
                </th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr
                  key={p.distance}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {p.distance}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-emerald-600">
                    {p.tempsTotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <ConvertisseurAllureCourse />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Comparaison avec autres allures */}
      {comparaison.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Comparaison avec autres allures
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {comparaison.map((c) => (
              <div
                key={c.allure}
                className="bg-slate-50 rounded-lg p-3 border border-slate-200"
              >
                <p className="text-sm font-medium text-slate-700">{c.allure}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {fmt(c.kmh, 1)} km/h
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Explications */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Que signifie cette allure ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une allure de <strong>{formatted}</strong> par kilometre signifie que
          vous progressez a une vitesse moyenne de{" "}
          <strong>{fmt(kmh, 1)} km/h</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>Formule :</strong> Vitesse (km/h) = 60 / Allure (min/km)
        </p>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-allure-course" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
