import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurAutonomie from "../CalculateurAutonomie";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  calcBudgetSurvie,
  ZONE_LABELS,
  SITUATION_LABELS,
  SMIC_NET,
  RSA_SEUL,
  RSA_COUPLE,
  RSA_COUPLE_2_ENFANTS,
  type Zone,
  type Situation,
} from "../../calculateur-budget-survie/calcBudgetSurvie";

const EPARGNES = [2000, 5000, 10000, 15000, 20000, 30000, 50000];
const ZONES: Zone[] = ["paris", "grande-ville", "ville-moyenne", "rural"];
const SITUATIONS: Situation[] = ["seul", "couple", "famille"];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function parseSlug(slug: string): { epargne: number; zone: Zone; situation: Situation } | null {
  const match = slug.match(/^(\d+)-euros-(paris|grande-ville|ville-moyenne|rural)-(seul|couple|famille)$/);
  if (!match) return null;
  return { epargne: parseInt(match[1]), zone: match[2] as Zone, situation: match[3] as Situation };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const e of EPARGNES) {
    for (const z of ZONES) {
      for (const s of SITUATIONS) {
        params.push({ params: `${e}-euros-${z}-${s}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const budget = calcBudgetSurvie(parsed.zone, parsed.situation, "transport-commun");
  const mois = budget.total > 0 ? Math.floor(parsed.epargne / budget.total) : 0;
  const zoneLabel = ZONE_LABELS[parsed.zone];
  const sitLabel = SITUATION_LABELS[parsed.situation].toLowerCase();

  return {
    title: `${fmt(parsed.epargne)} EUR d'epargne ${sitLabel} a ${zoneLabel} = ${mois} mois d'autonomie`,
    description: `Avec ${fmt(parsed.epargne)} EUR d'epargne, ${sitLabel} a ${zoneLabel}, vous pouvez tenir ${mois} mois. Budget minimum : ${fmt(budget.total)} EUR/mois. Calculateur autonomie financiere 2026.`,
    keywords: `autonomie financiere ${fmt(parsed.epargne)} euros, vivre sans travailler ${parsed.zone}, duree epargne ${fmt(parsed.epargne)}, budget survie ${parsed.zone}`,
    openGraph: {
      title: `${fmt(parsed.epargne)} EUR → ${mois} mois d'autonomie (${zoneLabel})`,
      description: `${sitLabel}, budget ${fmt(budget.total)} EUR/mois. Epargne epuisee en ${mois} mois.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  if (!EPARGNES.includes(parsed.epargne) || !ZONES.includes(parsed.zone) || !SITUATIONS.includes(parsed.situation)) {
    notFound();
  }

  const budget = calcBudgetSurvie(parsed.zone, parsed.situation, "transport-commun");
  const autonomieMois = budget.total > 0 ? parsed.epargne / budget.total : 0;
  const zoneLabel = ZONE_LABELS[parsed.zone];
  const sitLabel = SITUATION_LABELS[parsed.situation];
  const rsaRef = parsed.situation === "seul" ? RSA_SEUL : parsed.situation === "couple" ? RSA_COUPLE : RSA_COUPLE_2_ENFANTS;

  // Avec RSA
  const depAvecRSA = Math.max(budget.total - rsaRef, 0);
  const moisAvecRSA = depAvecRSA > 0 ? parsed.epargne / depAvecRSA : Infinity;

  // Comparaison par montant d'epargne
  const compEpargne = EPARGNES.map((e) => {
    const mois = budget.total > 0 ? e / budget.total : 0;
    return { epargne: e, mois, isCurrent: e === parsed.epargne };
  });

  // Comparaison par zone
  const compZone = ZONES.map((z) => {
    const b = calcBudgetSurvie(z, parsed.situation, "transport-commun");
    const mois = b.total > 0 ? parsed.epargne / b.total : 0;
    return { zone: z, label: ZONE_LABELS[z], budget: b.total, mois, isCurrent: z === parsed.zone };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de temps tient-on avec ${fmt(parsed.epargne)} EUR ${sitLabel.toLowerCase()} a ${zoneLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec ${fmt(parsed.epargne)} EUR d'epargne, ${sitLabel.toLowerCase()} a ${zoneLabel}, vous pouvez tenir environ ${Math.floor(autonomieMois)} mois (budget minimum ${fmt(budget.total)} EUR/mois). Avec le RSA en complement, l'autonomie passe a ${moisAvecRSA === Infinity ? "illimitee" : `${Math.floor(moisAvecRSA)} mois`}.`,
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
        currentPage={`${fmt(parsed.epargne)} EUR - ${sitLabel} - ${zoneLabel}`}
        parentPage="Calculateur Autonomie"
        parentHref="/calculateur-autonomie"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⏳
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {fmt(parsed.epargne)} EUR {sitLabel.toLowerCase()} a {zoneLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Duree d&apos;autonomie avec {fmt(parsed.epargne)} EUR d&apos;epargne, {sitLabel.toLowerCase()}, a {zoneLabel}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-amber-500 to-red-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Duree d&apos;autonomie estimee</p>
        <p className="text-5xl font-extrabold tracking-tight">{Math.floor(autonomieMois)} mois</p>
        <p className="text-lg font-medium mt-1">soit ~{Math.floor(autonomieMois * 30)} jours</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Epargne</p>
            <p className="font-semibold">{fmt(parsed.epargne)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Budget/mois</p>
            <p className="font-semibold">{fmt(budget.total)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Avec RSA</p>
            <p className="font-semibold">{moisAvecRSA === Infinity ? "Illimite" : `${Math.floor(moisAvecRSA)} mois`}</p>
          </div>
          <div>
            <p className="text-white/70">Budget annuel</p>
            <p className="font-semibold">{fmt(budget.total * 12)} EUR</p>
          </div>
        </div>
      </div>

      {/* Impact RSA */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-emerald-800 mb-2">Avec le RSA en complement</h2>
        <p className="text-sm text-emerald-700 leading-relaxed">
          Le RSA ({fmt(Math.round(rsaRef))} EUR/mois) reduit la part a financer par l&apos;epargne
          de {fmt(budget.total)} EUR a {fmt(Math.round(depAvecRSA))} EUR/mois.
          Votre autonomie passe de <strong>{Math.floor(autonomieMois)} mois</strong> a{" "}
          <strong>{moisAvecRSA === Infinity ? "illimitee (revenus >= depenses)" : `${Math.floor(moisAvecRSA)} mois`}</strong>.
        </p>
      </div>

      {/* Comparaison par epargne */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Autonomie selon l&apos;epargne ({sitLabel.toLowerCase()}, {zoneLabel})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Epargne</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Autonomie</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Epuise vers</th>
              </tr>
            </thead>
            <tbody>
              {compEpargne.map((row) => {
                const dateEp = new Date();
                dateEp.setMonth(dateEp.getMonth() + Math.floor(row.mois));
                return (
                  <tr key={row.epargne} className={`border-b border-slate-100 ${row.isCurrent ? "bg-amber-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {row.isCurrent ? (
                        <span className="font-bold text-amber-600">{fmt(row.epargne)} EUR</span>
                      ) : (
                        <a href={`/calculateur-autonomie/${row.epargne}-euros-${parsed.zone}-${parsed.situation}`} className="text-slate-700 hover:text-amber-600 transition-colors">
                          {fmt(row.epargne)} EUR
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-amber-600" : "text-slate-700"}`}>
                      {Math.floor(row.mois)} mois
                    </td>
                    <td className={`py-2.5 px-2 text-right text-sm ${row.isCurrent ? "text-amber-600" : "text-slate-500"}`}>
                      {dateEp.toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par zone */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmt(parsed.epargne)} EUR selon la zone ({sitLabel.toLowerCase()})
        </h2>
        <div className="space-y-2">
          {compZone.map((row) => (
            <div
              key={row.zone}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                row.isCurrent ? "bg-amber-50 border-amber-300" : "border-slate-100"
              }`}
            >
              <span className={`font-semibold text-sm ${row.isCurrent ? "text-amber-700" : "text-slate-600"}`}>
                {row.isCurrent ? row.label : (
                  <a href={`/calculateur-autonomie/${parsed.epargne}-euros-${row.zone}-${parsed.situation}`} className="hover:text-amber-600 transition-colors">
                    {row.label}
                  </a>
                )}
                <span className={`ml-2 text-xs ${row.isCurrent ? "text-amber-500" : "text-slate-400"}`}>
                  ({fmt(row.budget)} EUR/mois)
                </span>
              </span>
              <span className={`font-extrabold ${row.isCurrent ? "text-amber-700" : "text-slate-700"}`}>
                {Math.floor(row.mois)} mois
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurAutonomie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Combien de temps avec {fmt(parsed.epargne)} EUR {sitLabel.toLowerCase()} a {zoneLabel} ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec une epargne de <strong>{fmt(parsed.epargne)} EUR</strong>, {sitLabel.toLowerCase()} a{" "}
          <strong>{zoneLabel}</strong>, votre autonomie financiere est estimee a environ{" "}
          <strong>{Math.floor(autonomieMois)} mois</strong> (budget minimum de {fmt(budget.total)} EUR/mois).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En ajoutant le RSA ({fmt(Math.round(rsaRef))} EUR/mois), la duree passe a{" "}
          <strong>{moisAvecRSA === Infinity ? "illimitee" : `${Math.floor(moisAvecRSA)} mois`}</strong>.
          D&apos;autres aides (APL, prime d&apos;activite, CSS) peuvent encore allonger cette duree.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour allonger votre autonomie : privilegiez une zone moins chere
          ({ZONE_LABELS["rural"]} = {fmt(calcBudgetSurvie("rural", parsed.situation, "transport-commun").total)} EUR/mois
          vs {fmt(calcBudgetSurvie("paris", parsed.situation, "transport-commun").total)} EUR a Paris),
          utilisez les transports en commun ou le velo, et sollicitez toutes les aides disponibles.
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {EPARGNES.filter((e) => e !== parsed.epargne).slice(0, 5).map((e) => (
            <a
              key={e}
              href={`/calculateur-autonomie/${e}-euros-${parsed.zone}-${parsed.situation}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              {fmt(e)} EUR
            </a>
          ))}
          {ZONES.filter((z) => z !== parsed.zone).map((z) => (
            <a
              key={z}
              href={`/calculateur-autonomie/${parsed.epargne}-euros-${z}-${parsed.situation}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              {ZONE_LABELS[z]}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calculateur-autonomie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
