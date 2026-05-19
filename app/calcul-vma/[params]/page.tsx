import type { Metadata } from "next";
import CalculVMA from "../CalculVMA";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  calculerVMACooper,
  calculerAllureSelonPourcentVMA,
  formatAllure,
  fmt,
  calculerFCMaxTanaka,
  calculerZoneKarvonen,
  ZONES_FC,
  ALLURES_ENTRAINEMENT,
} from "../vmaCalc";

// VMA populaires : 10 à 22 km/h par palier de 0.5
const VMAS_KMPH = [
  10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
  17.5, 18, 18.5, 19, 19.5, 20,
];

// Distances Cooper testées : 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600
const DISTANCES_COOPER_M = [2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600];

function parseSlug(slug: string): {
  type: "vma" | "cooper";
  value: number;
} | null {
  // Format : vma-15-kmh ou vma-15.5-kmh
  let match = slug.match(/^vma-(\d+(?:\.\d+)?)-kmh$/);
  if (match) {
    const vma = parseFloat(match[1]);
    return { type: "vma", value: vma };
  }

  // Format : cooper-3000m
  match = slug.match(/^cooper-(\d+)m$/);
  if (match) {
    const distance = parseInt(match[1]);
    return { type: "cooper", value: distance };
  }

  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  // VMA en km/h
  VMAS_KMPH.forEach((vma) => {
    const vmaStr = vma % 1 === 0 ? vma.toString() : vma.toFixed(1);
    params.push({ params: `vma-${vmaStr}-kmh` });
  });

  // Distances Cooper
  DISTANCES_COOPER_M.forEach((distance) => {
    params.push({ params: `cooper-${distance}m` });
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

  if (type === "vma") {
    const vma = value;
    const endurance = calculerAllureSelonPourcentVMA(vma, 70);
    const seuil = calculerAllureSelonPourcentVMA(vma, 87.5);
    title = `VMA ${fmt(vma, 1)} km/h : allures d'entraînement et zones FC`;
    description = `VMA ${fmt(vma, 1)} km/h : endurance ${formatAllure(endurance.minKm)}, seuil ${formatAllure(seuil.minKm)}. Zones cardiaques Karvonen et plans entraînement.`;
    keywords = `vma ${vma}, vitesse maximale aerobie, allure entrainement, fc max, zones cardiaques`;
  } else {
    const vma = calculerVMACooper(value);
    title = `Test Cooper ${value}m : VMA ${fmt(vma, 1)} km/h`;
    description = `Distance ${value}m au test Cooper = VMA ${fmt(vma, 1)} km/h. Calcul des allures d'entraînement et zones de fréquence cardiaque.`;
    keywords = `test cooper ${value}, vma ${fmt(vma, 1)}, vitesse maximale aerobie`;
  }

  return {
    alternates: { canonical: `/calcul-vma/${slug}` },
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

  const { type, value } = parsed;
  let vma: number;
  let pageTitle = "";
  let pageDescription = "";

  if (type === "vma") {
    vma = value;
    pageTitle = `VMA ${fmt(vma, 1)} km/h`;
    pageDescription = `Allures d'entraînement, zones FC et plans détaillés pour une VMA de ${fmt(vma, 1)} km/h.`;
  } else {
    vma = calculerVMACooper(value);
    pageTitle = `Test Cooper ${value}m`;
    pageDescription = `Distance ${value}m au test Cooper = VMA ${fmt(vma, 1)} km/h. Allures et zones FC.`;
  }

  // Calculs pour la page
  const fcMax = calculerFCMaxTanaka(30); // FC max pour un coureur de 30 ans
  const fcRepos = 60;
  const endurance = calculerAllureSelonPourcentVMA(vma, 70);
  const seuil = calculerAllureSelonPourcentVMA(vma, 87.5);
  const vma100 = calculerAllureSelonPourcentVMA(vma, 105);

  // Comparaison avec autres VMA
  const comparaison = VMAS_KMPH.filter((v) => v !== vma)
    .slice(0, 6)
    .map((v) => {
      const end = calculerAllureSelonPourcentVMA(v, 70);
      return { vma: v, allure: formatAllure(end.minKm), kmh: fmt(end.kmh, 1) };
    });

  // FAQ JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Que signifie une VMA de ${fmt(vma, 1)} km/h ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une VMA de ${fmt(vma, 1)} km/h signifie que vous pouvez maintenir cette vitesse en utilisant 100% de votre capacité aérobie. C'est la vitesse de référence pour calibrer vos entraînements.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle allure pour l'endurance fondamentale à ${fmt(vma, 1)} km/h de VMA ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour l'endurance fondamentale (65-75% VMA), visez une allure de ${formatAllure(endurance.minKm)} par km (${fmt(endurance.kmh, 1)} km/h). C'est le rythme à utiliser pour vos sorties longues.`,
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
        parentPage="Calcul VMA"
        parentHref="/calcul-vma"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💚
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {pageTitle}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{pageDescription}</p>

      {/* Résultat principal */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-100 mb-1">VMA calculée</p>
        <p className="text-5xl font-extrabold tracking-tight mb-3">
          {fmt(vma, 1)}
        </p>
        <p className="text-emerald-100">km/h</p>
      </div>

      {/* Tableau allures rapide */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Allures d&apos;entraînement pour cette VMA
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Type d&apos;entraînement
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  % VMA
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Allure (min/km)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Vitesse (km/h)
                </th>
              </tr>
            </thead>
            <tbody>
              {ALLURES_ENTRAINEMENT.map((a) => {
                const minAllure = calculerAllureSelonPourcentVMA(
                  vma,
                  a.minPourcent
                );
                const maxAllure = calculerAllureSelonPourcentVMA(
                  vma,
                  a.maxPourcent
                );
                return (
                  <tr
                    key={a.nom}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-2 font-medium text-slate-700">
                      {a.nom}
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-slate-600">
                      {a.minPourcent}-{a.maxPourcent}%
                    </td>
                    <td className="py-3 px-2 text-right font-mono font-bold text-emerald-600">
                      {formatAllure(minAllure.minKm)} -{" "}
                      {formatAllure(maxAllure.minKm)}
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-slate-600">
                      {fmt(minAllure.kmh, 1)} - {fmt(maxAllure.kmh, 1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculVMA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Zones FC */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Zones de fréquence cardiaque (Karvonen)
        </h2>
        <p className="text-slate-600 mb-4 text-sm">
          Calcul pour un coureur de 30 ans avec FC repos de 60 bpm.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Zone
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Min (bpm)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Max (bpm)
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Utilité
                </th>
              </tr>
            </thead>
            <tbody>
              {ZONES_FC.map((z) => {
                const fcMin = calculerZoneKarvonen(
                  fcMax,
                  fcRepos,
                  z.minPourcent
                );
                const fcMax_ = calculerZoneKarvonen(
                  fcMax,
                  fcRepos,
                  z.maxPourcent
                );
                return (
                  <tr
                    key={z.zone}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-2 font-medium text-slate-700">
                      {z.zone}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-emerald-600">
                      {fcMin}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-emerald-600">
                      {fcMax_}
                    </td>
                    <td className="py-3 px-2 text-xs text-slate-600">
                      {z.minPourcent}-{z.maxPourcent}% FC max
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparaison avec autres VMA */}
      {comparaison.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Autres niveaux de VMA
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {comparaison.map((c) => (
              <div
                key={c.vma}
                className="bg-slate-50 rounded-lg p-3 border border-slate-200"
              >
                <p className="text-sm font-medium text-slate-700">
                  {fmt(c.vma, 1)} km/h
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {c.allure} / km ({c.kmh} km/h)
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Explication */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Ce que signifie une VMA de {fmt(vma, 1)} km/h
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une VMA de <strong>{fmt(vma, 1)} km/h</strong> signifie que vous
          pouvez maintenir cette vitesse pendant environ 6 à 8 minutes en
          mobilisant 100% de votre capacité aérobie.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Cette valeur est utilisée pour calibrer tous vos entraînements :
        </p>
        <ul className="text-sm text-slate-600 space-y-2">
          <li>
            ✓ <strong>Endurance fondamentale</strong> : 65-75% VMA pour les
            sorties longues faciles
          </li>
          <li>
            ✓ <strong>Seuil aérobie</strong> : 85-90% VMA pour les entraînements
            au seuil
          </li>
          <li>
            ✓ <strong>VMA pure</strong> : 100-110% VMA pour le fractionné court
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-vma" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
