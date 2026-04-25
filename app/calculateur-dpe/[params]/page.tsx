import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcDPE } from "../dpeCalc";

const SURFACES = [30, 50, 70, 90, 110, 130, 150];
const CHAUFFAGES = ["electrique", "gaz", "fioul", "pac", "bois"];
const EPOQUES = ["avant-1975", "1975-1989", "1990-2005", "2006-2012", "apres-2012"];

const EPOQUE_TO_ANNEE: Record<string, number> = {
  "avant-1975": 1960,
  "1975-1989": 1982,
  "1990-2005": 1997,
  "2006-2012": 2009,
  "apres-2012": 2016,
};

const EPOQUE_LABEL: Record<string, string> = {
  "avant-1975": "avant 1975",
  "1975-1989": "1975-1989",
  "1990-2005": "1990-2005",
  "2006-2012": "2006-2012",
  "apres-2012": "apres 2012",
};

const CHAUFFAGE_LABEL: Record<string, string> = {
  electrique: "Electricite",
  gaz: "Gaz naturel",
  fioul: "Fioul",
  pac: "Pompe a chaleur",
  bois: "Bois / Pellet",
};

const CLASSES_DPE_COLORS: Record<string, string> = {
  A: "text-[#009b6e]",
  B: "text-[#51b848]",
  C: "text-[#7db83a]",
  D: "text-amber-600",
  E: "text-[#f2a731]",
  F: "text-[#e8732a]",
  G: "text-[#d63228]",
};

function parseSlug(slug: string): { surface: number; chauffage: string; epoque: string } | null {
  const match = slug.match(/^(\d+)m2-([a-z]+)-(.+)$/);
  if (!match) return null;
  const surface = parseInt(match[1]);
  const chauffage = match[2];
  const epoque = match[3];
  if (!SURFACES.includes(surface)) return null;
  if (!CHAUFFAGES.includes(chauffage)) return null;
  if (!EPOQUES.includes(epoque)) return null;
  return { surface, chauffage, epoque };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const surface of SURFACES) {
    for (const chauffage of CHAUFFAGES) {
      for (const epoque of EPOQUES) {
        params.push({ params: `${surface}m2-${chauffage}-${epoque}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { surface, chauffage, epoque } = parsed;
  const annee = EPOQUE_TO_ANNEE[epoque];
  const res = calcDPE(surface, chauffage, "partielle", "double", annee, "centre");

  return {
    alternates: { canonical: `/calculateur-dpe/${slug}` },
    title: `DPE ${surface} m² - ${CHAUFFAGE_LABEL[chauffage]} - ${EPOQUE_LABEL[epoque]} = Classe ${res.classeEnergie}`,
    description: `Simulateur DPE pour un logement de ${surface} m² chauffage ${CHAUFFAGE_LABEL[chauffage]}, construit ${EPOQUE_LABEL[epoque]}. Consommation estimee : ${res.consommationEstimee} kWh/m²/an (classe ${res.classeEnergie}). Cout annuel : ${res.coutAnnuel} €.`,
    keywords: `DPE ${surface} m2, DPE ${chauffage}, DPE ${epoque}, classe energetique ${res.classeEnergie}, diagnostic performance energetique`,
    openGraph: {
      title: `DPE ${surface} m² ${CHAUFFAGE_LABEL[chauffage]} ${EPOQUE_LABEL[epoque]} → Classe ${res.classeEnergie}`,
      description: `Consommation ${res.consommationEstimee} kWh/m²/an, GES ${res.ges} kg CO2/m²/an, cout ${res.coutAnnuel} €/an.`,
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
  if (!parsed) notFound();

  const { surface, chauffage, epoque } = parsed;
  const annee = EPOQUE_TO_ANNEE[epoque];
  const res = calcDPE(surface, chauffage, "partielle", "double", annee, "centre");

  // Tableau comparatif : variation de surface pour ce chauffage et epoque
  const comparaisonSurfaces = SURFACES.map((s) => {
    const r = calcDPE(s, chauffage, "partielle", "double", annee, "centre");
    return {
      surface: s,
      consommation: r.consommationEstimee,
      classe: r.classeEnergie,
      cout: r.coutAnnuel,
      isCurrent: s === surface,
    };
  });

  // Tableau comparatif : variation de chauffage pour cette surface et epoque
  const comparaisonChauffages = CHAUFFAGES.map((ch) => {
    const r = calcDPE(surface, ch, "partielle", "double", annee, "centre");
    return {
      chauffage: ch,
      consommation: r.consommationEstimee,
      classe: r.classeEnergie,
      cout: r.coutAnnuel,
      isCurrent: ch === chauffage,
    };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle est la classe DPE pour un logement de ${surface} m² avec ${CHAUFFAGE_LABEL[chauffage]} construit ${EPOQUE_LABEL[epoque]} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un logement de ${surface} m² chauffage ${CHAUFFAGE_LABEL[chauffage]}, construit ${EPOQUE_LABEL[epoque]}, avec isolation partielle et double vitrage, la consommation estimee est de ${res.consommationEstimee} kWh/m²/an. Cela correspond a la classe DPE ${res.classeEnergie}. Le cout annuel de chauffage est estime a ${res.coutAnnuel} €.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelles sont les economies possibles pour ce logement ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En ameliorant d'une classe energetique (passer de ${res.classeEnergie} a la classe superieure), les economies potentielles sont estimees a ${res.economiesPotentielles} €/an. Les travaux les plus efficaces pour un logement ${EPOQUE_LABEL[epoque]} sont l'isolation des combles et des murs, le remplacement des fenetres, et l'optimisation du systeme de chauffage.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mescalculateurs.fr" },
      { "@type": "ListItem", position: 2, name: "Simulateur DPE", item: "https://mescalculateurs.fr/calculateur-dpe" },
      { "@type": "ListItem", position: 3, name: `DPE ${surface} m² ${CHAUFFAGE_LABEL[chauffage]}` },
    ],
  };

  const classeColor = CLASSES_DPE_COLORS[res.classeEnergie] || "text-slate-700";

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${surface} m² - ${CHAUFFAGE_LABEL[chauffage]}`}
        parentPage="Simulateur DPE"
        parentHref="/calculateur-dpe"
        lastUpdated="8 avril 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          DPE : {surface} m² — {CHAUFFAGE_LABEL[chauffage]} — {EPOQUE_LABEL[epoque]}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation DPE pour un logement de {surface} m² chauffage {CHAUFFAGE_LABEL[chauffage]},
        construit {EPOQUE_LABEL[epoque]}, isolation partielle, double vitrage, region centre.
      </p>

      {/* Alerte passoire */}
      {res.passoire && (
        <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-5 flex gap-3 mb-6">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold text-red-700">Passoire energetique (classe {res.classeEnergie})</p>
            <p className="text-sm text-red-600 mt-1">
              Les logements G sont interdits a la location depuis janvier 2025. Les logements F le seront en 2028.
              La valeur du bien peut etre impactee de 13 a 19% par rapport a un logement classe D.
            </p>
          </div>
        </div>
      )}

      {/* Resultat principal */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-1">Consommation</p>
          <p className="text-2xl font-extrabold text-slate-800">{res.consommationEstimee}</p>
          <p className="text-xs text-slate-500">kWh/m²/an</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-1">Classe DPE</p>
          <p className={`text-4xl font-extrabold ${classeColor}`}>{res.classeEnergie}</p>
          <p className="text-xs text-slate-500">Energie</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs text-slate-400 mb-1">Emissions GES</p>
          <p className="text-2xl font-extrabold text-slate-800">{res.ges}</p>
          <p className="text-xs text-slate-500">kg CO₂/m²/an — Classe {res.classeGES}</p>
        </div>
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
          <p className="text-xs text-emerald-700 mb-1">Cout annuel</p>
          <p className="text-2xl font-extrabold text-emerald-800">{res.coutAnnuel.toLocaleString("fr-FR")} €</p>
          <p className="text-xs text-emerald-600">Pour {surface} m²</p>
        </div>
      </div>

      {res.economiesPotentielles > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3">
          <span className="text-xl">💡</span>
          <p className="text-sm text-amber-800">
            <strong>Economies potentielles</strong> en passant a la classe superieure :{" "}
            <strong>- {res.economiesPotentielles.toLocaleString("fr-FR")} €/an</strong>. Renseignez-vous sur{" "}
            <strong>MaPrimeRenov'</strong> et les Certificats d&apos;Economies d&apos;Energie (CEE).
          </p>
        </div>
      )}

      {/* Tableau comparatif surfaces */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          DPE selon la surface — chauffage {CHAUFFAGE_LABEL[chauffage]}, {EPOQUE_LABEL[epoque]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Surface</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Consommation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Classe</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout/an</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonSurfaces.map((row) => (
                <tr
                  key={row.surface}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-emerald-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-emerald-700">{row.surface} m²</span>
                    ) : (
                      <a
                        href={`/calculateur-dpe/${row.surface}m2-${chauffage}-${epoque}`}
                        className="text-slate-700 hover:text-emerald-600 transition-colors"
                      >
                        {row.surface} m²
                      </a>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.consommation} kWh/m²/an</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${CLASSES_DPE_COLORS[row.classe] || "text-slate-700"}`}>
                    {row.classe}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-semibold ${row.isCurrent ? "text-emerald-700" : "text-slate-700"}`}>
                    {row.cout.toLocaleString("fr-FR")} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau comparatif chauffages */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          DPE selon le type de chauffage — {surface} m², {EPOQUE_LABEL[epoque]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Chauffage</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Consommation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Classe</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout/an</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonChauffages.map((row) => (
                <tr
                  key={row.chauffage}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-emerald-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-emerald-700">{CHAUFFAGE_LABEL[row.chauffage]}</span>
                    ) : (
                      <a
                        href={`/calculateur-dpe/${surface}m2-${row.chauffage}-${epoque}`}
                        className="text-slate-700 hover:text-emerald-600 transition-colors"
                      >
                        {CHAUFFAGE_LABEL[row.chauffage]}
                      </a>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.consommation} kWh/m²/an</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${CLASSES_DPE_COLORS[row.classe] || "text-slate-700"}`}>
                    {row.classe}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-semibold ${row.isCurrent ? "text-emerald-700" : "text-slate-700"}`}>
                    {row.cout.toLocaleString("fr-FR")} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contenu SEO */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          DPE classe {res.classeEnergie} pour {surface} m² ({EPOQUE_LABEL[epoque]}) : analyse
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un logement de <strong>{surface} m²</strong> construit <strong>{EPOQUE_LABEL[epoque]}</strong> avec
          un chauffage <strong>{CHAUFFAGE_LABEL[chauffage]}</strong>, une isolation partielle et du double vitrage
          consomme environ <strong>{res.consommationEstimee} kWh/m²/an</strong>, soit une classe
          energetique <strong className={classeColor}>{res.classeEnergie}</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le cout annuel de chauffage est estime a <strong>{res.coutAnnuel.toLocaleString("fr-FR")} €</strong> pour
          un prix de l&apos;energie moyen. Les emissions de gaz a effet de serre sont de{" "}
          <strong>{res.ges} kg CO₂/m²/an</strong> (classe GES {res.classeGES}).
        </p>
        {res.passoire && (
          <p className="text-slate-600 leading-relaxed">
            Ce logement est une <strong>passoire energetique</strong>. Des travaux de renovation sont urgents,
            notamment pour maintenir la possibilite de le mettre en location. Les aides disponibles incluent
            MaPrimeRenov&apos; (jusqu&apos;a 70% selon les revenus), les CEE (Certificats d&apos;Economies
            d&apos;Energie) et l&apos;eco-pret a taux zero (eco-PTZ).
          </p>
        )}
        <p className="text-xs text-slate-400 mt-4">Mis a jour le 8 avril 2026</p>
      </section>

      {/* Liens vers variantes */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations DPE similaires</h2>
        <div className="flex flex-wrap gap-2">
          {SURFACES.filter((s) => s !== surface).slice(0, 5).map((s) => (
            <a
              key={s}
              href={`/calculateur-dpe/${s}m2-${chauffage}-${epoque}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
            >
              {s} m² — {CHAUFFAGE_LABEL[chauffage]}
            </a>
          ))}
          {CHAUFFAGES.filter((c) => c !== chauffage).map((c) => (
            <a
              key={c}
              href={`/calculateur-dpe/${surface}m2-${c}-${epoque}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
            >
              {surface} m² — {CHAUFFAGE_LABEL[c]}
            </a>
          ))}
        </div>
      </section>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calculateur-dpe" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
