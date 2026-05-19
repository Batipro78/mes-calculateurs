import type { Metadata } from "next";
import CalculAllureNatation from "../CalculAllureNatation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  formatAllureNatation,
  vitesseVersAllure,
  allureVersVitesse,
  predireTempsNatation,
  genererPredictions,
  calculerSWOLF,
} from "../natationCalc";

// Allures courantes : 1:00 à 2:30 par paliers de 15s
const ALLURES_MIN_DECIM = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5];

// Vitesses km/h courantes
const VITESSES_KMH = [3, 3.5, 4, 4.5, 5];

// Distances cibles
const DISTANCES_CIBLES = [
  { slug: "ironman-3800m-en-1h", distance: 3800, tempsMin: 60 },
  { slug: "ironman-3800m-en-1h15", distance: 3800, tempsMin: 75 },
  { slug: "ironman-3800m-en-1h30", distance: 3800, tempsMin: 90 },
  { slug: "half-ironman-1900m-en-35min", distance: 1900, tempsMin: 35 },
  { slug: "half-ironman-1900m-en-40min", distance: 1900, tempsMin: 40 },
  { slug: "half-ironman-1900m-en-50min", distance: 1900, tempsMin: 50 },
  { slug: "1500m-en-25min", distance: 1500, tempsMin: 25 },
  { slug: "1500m-en-30min", distance: 1500, tempsMin: 30 },
  { slug: "400m-en-7min", distance: 400, tempsMin: 7 },
];

// SWOLF cibles
const SWOLF_CIBLES = [
  { slug: "swolf-30", swolf: 30 },
  { slug: "swolf-40", swolf: 40 },
  { slug: "swolf-50", swolf: 50 },
  { slug: "swolf-60", swolf: 60 },
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): {
  type: "allure" | "vitesse" | "distance" | "swolf";
  value: number;
  label?: string;
  distance?: number;
} | null {
  // Allure : allure-1min-100m, allure-1min15-100m, etc.
  let match = slug.match(/^allure-(\d+)min(?:(\d+))?-100m$/);
  if (match) {
    const min = parseInt(match[1]);
    const sec = match[2] ? parseInt(match[2]) : 0;
    const decim = min + sec / 60;
    return { type: "allure", value: decim, label: `${min}:${sec.toString().padStart(2, "0")}` };
  }

  // Vitesse : vitesse-4-kmh, vitesse-3-5-kmh
  match = slug.match(/^vitesse-([\d.]+)-kmh$/);
  if (match) {
    const vitesse = parseFloat(match[1]);
    return { type: "vitesse", value: vitesse, label: `${vitesse} km/h` };
  }

  // Distance temps : 1500m-en-25min, ironman-3800m-en-1h30
  match = slug.match(/^(?:(ironman|half-ironman|[\d]+)m)-en-([\d]+)(?:h(\d+))?min?$/);
  if (match) {
    const distanceStr = match[1];
    const heures = parseInt(match[2]) || 0;
    const minutes = parseInt(match[3]) || 0;
    const tempsMin = heures * 60 + minutes;

    let distance = 0;
    if (distanceStr === "ironman") distance = 3800;
    else if (distanceStr === "half-ironman") distance = 1900;
    else distance = parseInt(distanceStr);

    const allure = tempsMin / (distance / 100);
    return {
      type: "distance",
      value: allure,
      label: slug.replace(/-/g, " "),
      distance,
    };
  }

  // SWOLF : swolf-30, swolf-40, etc.
  match = slug.match(/^swolf-(\d+)$/);
  if (match) {
    const swolf = parseInt(match[1]);
    return { type: "swolf", value: swolf, label: `SWOLF ${swolf}` };
  }

  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  // Allures en min/100m
  ALLURES_MIN_DECIM.forEach((allure) => {
    const min = Math.floor(allure);
    const sec = Math.round((allure - min) * 60);
    if (sec === 0) {
      params.push({ params: `allure-${min}min-100m` });
    } else {
      params.push({ params: `allure-${min}min${sec}-100m` });
    }
  });

  // Vitesses en km/h
  VITESSES_KMH.forEach((vitesse) => {
    params.push({ params: `vitesse-${vitesse}-kmh` });
  });

  // Distances cibles
  DISTANCES_CIBLES.forEach((dc) => {
    params.push({ params: dc.slug });
  });

  // SWOLF cibles
  SWOLF_CIBLES.forEach((sc) => {
    params.push({ params: sc.slug });
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

  const { type, value, label } = parsed;
  let title = "";
  let description = "";
  let keywords = "";

  if (type === "allure") {
    const formatted = formatAllureNatation(value);
    const kmh = allureVersVitesse(value);
    title = `Allure ${formatted}/100m : prédictions Ironman, Half Ironman`;
    description = `Allure natation ${formatted} par 100m = ${fmt(kmh, 2)} km/h. Temps : Ironman ${predireTempsNatation(value, 3800)}, Half ${predireTempsNatation(value, 1900)}, 1500m ${predireTempsNatation(value, 1500)}.`;
    keywords = `allure natation ${formatted}, vitesse ${fmt(kmh, 2)} kmh, natation piscine`;
  } else if (type === "vitesse") {
    const allure = vitesseVersAllure(value);
    const formatted = formatAllureNatation(allure);
    title = `Vitesse ${value} km/h : allure ${formatted}/100m en natation`;
    description = `Vitesse ${value} km/h = allure ${formatted} par 100m. Prédictions Ironman, piscine et eau libre.`;
    keywords = `${value} kmh natation, vitesse ${value} km/h, allure nage`;
  } else if (type === "distance") {
    const formatted = formatAllureNatation(value);
    const kmh = allureVersVitesse(value);
    title = `${label} : allure ${formatted}/100m`;
    description = `Pour ${label}, allure requise : ${formatted}/100m (${fmt(kmh, 2)} km/h).`;
    keywords = `${label}, allure natation, triathlon`;
  } else {
    // SWOLF
    title = `SWOLF ${value} : améliorer votre score en natation`;
    description = `SWOLF ${value} = score d'efficacité natation. Tactiques pour réduire votre SWOLF : technique, nombre de coups.`;
    keywords = `swolf ${value}, efficacité natation, technique crawl, coups de bras`;
  }

  return {
    alternates: { canonical: `/calcul-allure-natation/${slug}` },
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

  const { type, value: valueResult, label, distance } = parsed;

  let pageTitle = "";
  let pageDescription = "";
  let resultLabel = "";
  let alluremin100m: number | null = null;
  let swolfResult = null;

  if (type === "allure") {
    const formatted = formatAllureNatation(valueResult);
    const kmh = allureVersVitesse(valueResult);
    alluremin100m = valueResult;
    pageTitle = `Allure ${formatted}/100m`;
    pageDescription = `Conversion allure ${formatted} par 100m vers vitesse et temps estimés.`;
    resultLabel = "Allure entrée";
  } else if (type === "vitesse") {
    const allure = vitesseVersAllure(valueResult);
    const formatted = formatAllureNatation(allure);
    alluremin100m = allure;
    pageTitle = `Vitesse ${valueResult} km/h`;
    pageDescription = `Conversion vitesse ${valueResult} km/h vers allure en min/100m.`;
    resultLabel = "Vitesse entrée";
  } else if (type === "distance") {
    const formatted = formatAllureNatation(valueResult);
    const kmh = allureVersVitesse(valueResult);
    alluremin100m = valueResult;
    pageTitle = `Objectif : ${label}`;
    pageDescription = `Allure et vitesse nécessaires pour atteindre cet objectif de temps.`;
    resultLabel = "Allure requise";
  } else if (type === "swolf") {
    swolfResult = { swolf: valueResult, niveau: "", niveauCouleur: "" };
    // Déterminer le niveau basé sur le SWOLF
    if (valueResult <= 35) {
      swolfResult.niveau = "Elite";
      swolfResult.niveauCouleur = "from-red-500 to-orange-600";
    } else if (valueResult <= 45) {
      swolfResult.niveau = "Avancé";
      swolfResult.niveauCouleur = "from-blue-500 to-cyan-600";
    } else if (valueResult <= 55) {
      swolfResult.niveau = "Intermédiaire";
      swolfResult.niveauCouleur = "from-emerald-500 to-teal-600";
    } else if (valueResult <= 65) {
      swolfResult.niveau = "Débutant entraîné";
      swolfResult.niveauCouleur = "from-yellow-500 to-amber-600";
    } else {
      swolfResult.niveau = "Débutant";
      swolfResult.niveauCouleur = "from-slate-500 to-slate-600";
    }
    pageTitle = `SWOLF ${valueResult}`;
    pageDescription = `SWOLF ${valueResult} = niveau ${swolfResult.niveau}. Score efficacité natation (temps 25m + coups).`;
    resultLabel = "SWOLF Score";
  }

  const predictions =
    alluremin100m !== null ? genererPredictions(alluremin100m) : [];
  const kmh = alluremin100m !== null ? allureVersVitesse(alluremin100m) : 0;
  const formatted =
    alluremin100m !== null ? formatAllureNatation(alluremin100m) : "";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Qu&apos;est-ce que ${formatted}/100m en vitesse ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une allure de ${formatted} par 100m correspond à une vitesse de ${fmt(kmh, 2)} km/h.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel temps pour l&apos;Ironman à ${formatted}/100m ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `À une allure de ${formatted} par 100m, le temps pour l&apos;Ironman (3800m) est ${predictions.find((p) => p.distance === 3800)?.temps}.`,
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
        parentPage="Calcul Allure Natation"
        parentHref="/calcul-allure-natation"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {pageTitle}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{pageDescription}</p>

      {/* Résultat principal */}
      {swolfResult ? (
        <div
          className={`bg-gradient-to-br ${swolfResult.niveauCouleur} text-white rounded-2xl p-8 shadow-lg mb-8`}
        >
          <p className="text-white/90 mb-1">{resultLabel}</p>
          <p className="text-5xl font-extrabold tracking-tight mb-3">
            {swolfResult.swolf}
          </p>
          <p className="text-white/90">Niveau : {swolfResult.niveau}</p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-cyan-200/50 mb-8">
          <p className="text-cyan-100 mb-1">{resultLabel}</p>
          <p className="text-5xl font-extrabold tracking-tight mb-3">
            {formatted}
          </p>
          <p className="text-cyan-100">{fmt(kmh, 2)} km/h</p>
        </div>
      )}

      {/* Prédictions sur distances */}
      {predictions.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Temps prédits
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
                      {p.distanceLabel}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-blue-600">
                      {p.temps}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculAllureNatation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Explication */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Détails du calcul
        </h2>
        <p className="text-slate-600 leading-relaxed">
          {type === "swolf"
            ? `Un SWOLF de ${valueResult} est au niveau "${swolfResult?.niveau}". Pour s'améliorer, travaillez votre technique pour réduire le nombre de coups tout en maintenant ou en augmentant votre vitesse.`
            : `Une allure de ${formatted} par 100m correspond à une vitesse de ${fmt(kmh, 2)} km/h.`}
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-allure-natation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
