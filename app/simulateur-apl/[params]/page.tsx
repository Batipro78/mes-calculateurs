import type { Metadata } from "next";
import SimulateurAPL from "../SimulateurAPL";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

type Zone = "1" | "2" | "3";
type Situation = "seul" | "couple";

const ZONES: Zone[] = ["1", "2", "3"];
const SITUATIONS: Situation[] = ["seul", "couple"];
const NB_CHARGES_LIST = [0, 1, 2, 3, 4];

const ZONE_LABELS: Record<Zone, string> = {
  "1": "Zone 1 (Ile-de-France)",
  "2": "Zone 2 (grandes villes)",
  "3": "Zone 3 (reste du territoire)",
};

const ZONE_SHORT: Record<Zone, string> = {
  "1": "Ile-de-France",
  "2": "grandes agglomerations",
  "3": "reste du territoire",
};

const SITUATION_LABELS: Record<Situation, string> = {
  seul: "personne seule",
  couple: "couple",
};

// Loyers plafonds mensuels 2026
const LOYERS_PLAFONDS: Record<Zone, number[]> = {
  "1": [319.41, 385.09, 409.82, 437.77],
  "2": [278.28, 340.57, 363.43, 385.77],
  "3": [260.82, 314.41, 336.04, 357.02],
};
const SUPPLEMENT_PERSONNE: Record<Zone, number> = { "1": 30.42, "2": 29.35, "3": 27.82 };

const FORFAIT_CHARGES_BASE = [60.59, 73.17];
const FORFAIT_CHARGES_SUPP = 11.20;
const P0 = 39.15;
const R0_SEUL = 5235;
const R0_COUPLE = 7501;
const R0_SUPP = 1400;

const TP: Record<Situation, number[]> = {
  seul: [0.029, 0.028, 0.027, 0.026, 0.025],
  couple: [0.032, 0.031, 0.030, 0.029, 0.028],
};

function getLoyerPlafond(zone: Zone, nbPersonnes: number): number {
  if (nbPersonnes <= 4) return LOYERS_PLAFONDS[zone][nbPersonnes - 1];
  return LOYERS_PLAFONDS[zone][3] + SUPPLEMENT_PERSONNE[zone] * (nbPersonnes - 4);
}

function getForfaitCharges(nbPersonnes: number): number {
  if (nbPersonnes === 1) return FORFAIT_CHARGES_BASE[0];
  return FORFAIT_CHARGES_BASE[1] + FORFAIT_CHARGES_SUPP * Math.max(0, nbPersonnes - 2);
}

function calculerAPLMontant(loyer: number, zone: Zone, situation: Situation, nbCharges: number, revenus: number) {
  const nbPersonnes = (situation === "couple" ? 2 : 1) + nbCharges;
  const loyerPlafond = getLoyerPlafond(zone, nbPersonnes);
  const loyerPlafonne = Math.min(loyer, loyerPlafond);
  const forfaitCharges = getForfaitCharges(nbPersonnes);
  const r0 = (situation === "seul" ? R0_SEUL : R0_COUPLE) + R0_SUPP * nbCharges;
  const tp = TP[situation][Math.min(nbCharges, TP[situation].length - 1)];
  const pp = P0 + tp * (Math.max(0, revenus - r0) / 12);
  let apl = loyerPlafonne + forfaitCharges - pp;
  apl = Math.max(0, apl);
  if (apl > 0 && apl < 10) apl = 0;
  return { apl, loyerPlafond, forfaitCharges, pp };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

interface ParsedParams {
  zone: Zone;
  situation: Situation;
  nbCharges: number;
}

function parseSlug(slug: string): ParsedParams | null {
  // Pattern: zone-1-seul-0-enfant, zone-2-couple-3-enfants
  const match = slug.match(/^zone-([123])-(seul|couple)-(\d+)-enfants?$/);
  if (!match) return null;
  const zone = match[1] as Zone;
  const situation = match[2] as Situation;
  const nbCharges = parseInt(match[3]);
  return { zone, situation, nbCharges };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const z of ZONES) {
    for (const s of SITUATIONS) {
      for (const n of NB_CHARGES_LIST) {
        params.push({ params: `zone-${z}-${s}-${n}-enfant${n !== 1 ? "s" : ""}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { zone, situation, nbCharges } = parsed;
  const sitLabel = SITUATION_LABELS[situation];
  const zoneLabel = ZONE_LABELS[zone];
  const enfantsLabel = nbCharges === 0 ? "sans enfant" : nbCharges === 1 ? "1 enfant" : `${nbCharges} enfants`;

  // Exemples de calcul avec loyer moyen et revenus moyens
  const loyerExemple = zone === "1" ? 700 : zone === "2" ? 550 : 450;
  const revenusExemple = 15000;
  const { apl } = calculerAPLMontant(loyerExemple, zone, situation, nbCharges, revenusExemple);

  return {
    title: `APL ${sitLabel} ${enfantsLabel} ${zoneLabel} - Simulation 2026`,
    description: `Calculez votre APL en ${zoneLabel} pour ${nbCharges === 0 ? "une " : ""}${sitLabel} ${enfantsLabel}. Exemple : ${fmt(apl)} EUR/mois pour un loyer de ${fmtInt(loyerExemple)} EUR. Baremes 2026.`,
    keywords: `APL ${sitLabel}, APL zone ${zone}, APL ${enfantsLabel}, aide logement ${sitLabel}, simulation APL 2026 ${zoneLabel}`,
    openGraph: {
      title: `Simulateur APL - ${sitLabel} ${enfantsLabel} en ${zoneLabel}`,
      description: `Estimez votre APL 2026 : ${sitLabel} ${enfantsLabel} en ${zoneLabel}. Loyer plafond, forfait charges, calcul detaille.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { zone, situation, nbCharges } = parsed;
  if (!ZONES.includes(zone) || !SITUATIONS.includes(situation) || !NB_CHARGES_LIST.includes(nbCharges)) notFound();

  const sitLabel = SITUATION_LABELS[situation];
  const zoneShort = ZONE_SHORT[zone];
  const enfantsLabel = nbCharges === 0 ? "sans enfant" : nbCharges === 1 ? "1 enfant" : `${nbCharges} enfants`;
  const nbPersonnes = (situation === "couple" ? 2 : 1) + nbCharges;
  const loyerPlafond = getLoyerPlafond(zone, nbPersonnes);
  const forfaitCharges = getForfaitCharges(nbPersonnes);

  // Tableau d'exemples avec differents revenus
  const revenusExemples = [0, 5000, 10000, 15000, 20000, 25000, 30000];
  const loyerExemple = zone === "1" ? 700 : zone === "2" ? 550 : 450;

  const exemples = revenusExemples.map((rev) => {
    const { apl } = calculerAPLMontant(loyerExemple, zone, situation, nbCharges, rev);
    return { revenus: rev, apl };
  });

  // Tableau par loyer
  const loyersExemples = [300, 400, 500, 600, 700, 800, 900, 1000];
  const revenusRef = 15000;
  const exemplesLoyer = loyersExemples.map((loyer) => {
    const { apl } = calculerAPLMontant(loyer, zone, situation, nbCharges, revenusRef);
    return { loyer, apl };
  });

  const breadcrumbLabel = `${situation === "couple" ? "Couple" : "Seul(e)"} ${enfantsLabel} - Zone ${zone}`;

  // Liens proches
  const autresZones = ZONES.filter((z) => z !== zone);
  const autreSituation: Situation = situation === "seul" ? "couple" : "seul";
  const autresEnfants = NB_CHARGES_LIST.filter((n) => n !== nbCharges).slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le plafond de loyer APL en zone ${zone} pour ${nbCharges === 0 ? "une " : ""}${sitLabel} ${enfantsLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En zone ${zone} (${zoneShort}), le plafond de loyer pour ${nbCharges === 0 ? "une " : ""}${sitLabel} ${enfantsLabel} est de ${fmt(loyerPlafond)} EUR par mois en 2026. Au-dela de ce montant, l'APL est calculee sur la base de ce plafond.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien d'APL pour ${nbCharges === 0 ? "une " : ""}${sitLabel} ${enfantsLabel} en zone ${zone} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le montant de l'APL depend de vos revenus et de votre loyer. Par exemple, pour un loyer de ${fmtInt(loyerExemple)} EUR avec des revenus annuels de 15 000 EUR, l'APL estimee est d'environ ${fmt(exemples.find((e) => e.revenus === 15000)?.apl || 0)} EUR par mois.`,
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
        currentPage={breadcrumbLabel}
        parentPage="Simulateur APL"
        parentHref="/simulateur-apl"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏘️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          APL {situation === "couple" ? "Couple" : "Personne seule"} {enfantsLabel} &mdash; Zone {zone}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation de l&apos;APL 2026 pour {nbCharges === 0 ? "une " : ""}{sitLabel} {enfantsLabel} en {zoneShort}.
      </p>

      {/* Infos cles */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg shadow-teal-200/50">
          <p className="text-sm text-teal-100 mb-1">Loyer plafond</p>
          <p className="text-3xl font-extrabold tracking-tight">
            {fmt(loyerPlafond)} <span className="text-base font-semibold">EUR</span>
          </p>
          <p className="text-xs text-teal-200 mt-1">Zone {zone} - {nbPersonnes} pers.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Forfait charges</p>
          <p className="text-2xl font-extrabold text-teal-600">
            {fmt(forfaitCharges)} <span className="text-sm font-semibold text-slate-400">EUR</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">{nbPersonnes} personne{nbPersonnes > 1 ? "s" : ""}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Composition du foyer</p>
          <p className="text-2xl font-extrabold text-slate-800">{nbPersonnes}</p>
          <p className="text-xs text-slate-400 mt-1">{situation === "couple" ? "Couple" : "Seul(e)"} + {nbCharges} enfant{nbCharges !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Tableau APL par revenus */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          APL estimee selon vos revenus
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          Pour un loyer de {fmtInt(loyerExemple)} EUR/mois en zone {zone}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Revenus annuels</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">APL estimee / mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">APL estimee / an</th>
              </tr>
            </thead>
            <tbody>
              {exemples.map((ex) => (
                <tr key={ex.revenus} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">{fmtInt(ex.revenus)} EUR</td>
                  <td className="py-2.5 px-2 text-right font-bold text-teal-600">
                    {ex.apl > 0 ? `${fmt(ex.apl)} EUR` : "Non eligible"}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {ex.apl > 0 ? `${fmt(ex.apl * 12)} EUR` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau APL par loyer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          APL estimee selon votre loyer
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          Pour des revenus annuels de {fmtInt(revenusRef)} EUR en zone {zone}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Loyer mensuel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">APL estimee / mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Reste a charge</th>
              </tr>
            </thead>
            <tbody>
              {exemplesLoyer.map((ex) => (
                <tr key={ex.loyer} className={`border-b border-slate-100 ${ex.loyer > loyerPlafond ? "bg-amber-50/30" : ""}`}>
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {fmtInt(ex.loyer)} EUR
                    {ex.loyer > loyerPlafond && <span className="text-xs text-amber-600 ml-1">(plafonne)</span>}
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-teal-600">
                    {ex.apl > 0 ? `${fmt(ex.apl)} EUR` : "Non eligible"}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {ex.apl > 0 ? `${fmt(ex.loyer - ex.apl)} EUR` : `${fmtInt(ex.loyer)} EUR`}
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
      <SimulateurAPL />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte explicatif */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          APL pour {nbCharges === 0 ? "une " : ""}{sitLabel} {enfantsLabel} en zone {zone}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En <strong>zone {zone}</strong> ({zoneShort}), {nbCharges === 0 ? "une " : ""}<strong>{sitLabel}</strong> {enfantsLabel} beneficie
          d&apos;un loyer plafond de <strong>{fmt(loyerPlafond)} EUR/mois</strong> et d&apos;un forfait charges
          de <strong>{fmt(forfaitCharges)} EUR/mois</strong> pour le calcul de l&apos;APL.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le montant de votre APL depend principalement de vos <strong>revenus</strong> declares
          en N-2 (soit 2024 pour une demande en 2026). Plus vos revenus sont faibles, plus
          l&apos;aide sera importante. {nbCharges > 0 && (
            <>
              Avec <strong>{nbCharges} enfant{nbCharges > 1 ? "s" : ""} a charge</strong>, le plafond de loyer
              et les seuils de ressources sont plus favorables.
            </>
          )}
        </p>
        <p className="text-slate-600 leading-relaxed">
          L&apos;APL est versee mensuellement par la CAF, generalement le 5 du mois.
          Elle n&apos;est pas versee si le montant calcule est inferieur a <strong>10 EUR/mois</strong>.
        </p>
      </section>

      {/* Liens vers autres profils */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres profils APL</h2>
        <div className="flex flex-wrap gap-2">
          {autresZones.map((z) => (
            <a
              key={`z-${z}`}
              href={`/simulateur-apl/zone-${z}-${situation}-${nbCharges}-enfant${nbCharges !== 1 ? "s" : ""}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
            >
              Zone {z} - {situation === "couple" ? "Couple" : "Seul(e)"} {enfantsLabel}
            </a>
          ))}
          <a
            href={`/simulateur-apl/zone-${zone}-${autreSituation}-${nbCharges}-enfant${nbCharges !== 1 ? "s" : ""}`}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
          >
            Zone {zone} - {autreSituation === "couple" ? "Couple" : "Seul(e)"} {enfantsLabel}
          </a>
          {autresEnfants.map((n) => (
            <a
              key={`n-${n}`}
              href={`/simulateur-apl/zone-${zone}-${situation}-${n}-enfant${n !== 1 ? "s" : ""}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
            >
              Zone {zone} - {situation === "couple" ? "Couple" : "Seul(e)"} {n === 0 ? "sans enfant" : `${n} enfant${n > 1 ? "s" : ""}`}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-apl" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
