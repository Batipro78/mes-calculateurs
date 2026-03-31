import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurBudgetSurvie from "../CalculateurBudgetSurvie";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  calcBudgetSurvie,
  ZONE_LABELS,
  SITUATION_LABELS,
  TRANSPORT_LABELS,
  RSA_SEUL,
  RSA_COUPLE,
  RSA_COUPLE_2_ENFANTS,
  SMIC_NET,
  SEUIL_PAUVRETE,
  type Zone,
  type Situation,
  type Transport,
} from "../calcBudgetSurvie";

const ZONES: Zone[] = ["paris", "grande-ville", "ville-moyenne", "rural"];
const SITUATIONS: Situation[] = ["seul", "couple", "famille"];
const TRANSPORTS: Transport[] = ["transport-commun", "voiture"];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

type ParsedSlug = { zone: Zone; situation: Situation; transport: Transport } | null;

function parseSlug(slug: string): ParsedSlug {
  // paris-seul-transport-commun, rural-couple-voiture, grande-ville-famille-transport-commun
  const match = slug.match(/^(paris|grande-ville|ville-moyenne|rural)-(seul|couple|famille)-(transport-commun|voiture)$/);
  if (!match) return null;
  return { zone: match[1] as Zone, situation: match[2] as Situation, transport: match[3] as Transport };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const z of ZONES) {
    for (const s of SITUATIONS) {
      for (const t of TRANSPORTS) {
        params.push({ params: `${z}-${s}-${t}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const r = calcBudgetSurvie(parsed.zone, parsed.situation, parsed.transport);
  const zoneLabel = ZONE_LABELS[parsed.zone];
  const sitLabel = SITUATION_LABELS[parsed.situation].toLowerCase();
  const transLabel = TRANSPORT_LABELS[parsed.transport].toLowerCase();

  return {
    title: `Budget survie ${sitLabel} a ${zoneLabel} = ${fmt(r.total)} EUR/mois (${transLabel})`,
    description: `Budget minimum pour vivre ${sitLabel} a ${zoneLabel} en 2026 : ${fmt(r.total)} EUR/mois avec ${transLabel}. Logement ${fmt(r.postes[0].montant)} EUR, alimentation ${fmt(r.postes[1].montant)} EUR. Comparaison RSA, SMIC, seuil de pauvrete.`,
    keywords: `budget minimum ${parsed.zone}, cout de la vie ${parsed.zone}, vivre ${sitLabel} ${parsed.zone}, budget survie 2026`,
    openGraph: {
      title: `${sitLabel} a ${zoneLabel} → ${fmt(r.total)} EUR/mois minimum`,
      description: `Budget survie 2026. Loyer : ${fmt(r.postes[0].montant)} EUR. Total : ${fmt(r.total)} EUR/mois.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  if (!ZONES.includes(parsed.zone) || !SITUATIONS.includes(parsed.situation) || !TRANSPORTS.includes(parsed.transport)) {
    notFound();
  }

  const r = calcBudgetSurvie(parsed.zone, parsed.situation, parsed.transport);
  const zoneLabel = ZONE_LABELS[parsed.zone];
  const sitLabel = SITUATION_LABELS[parsed.situation];
  const transLabel = TRANSPORT_LABELS[parsed.transport];
  const rsaRef = parsed.situation === "seul" ? RSA_SEUL : parsed.situation === "couple" ? RSA_COUPLE : RSA_COUPLE_2_ENFANTS;

  // Comparaison par zone
  const comparaisonZone = ZONES.map((z) => {
    const res = calcBudgetSurvie(z, parsed.situation, parsed.transport);
    return { zone: z, label: ZONE_LABELS[z], total: res.total, loyer: res.postes[0].montant, isCurrent: z === parsed.zone };
  });

  // Comparaison par situation
  const comparaisonSituation = SITUATIONS.map((s) => {
    const res = calcBudgetSurvie(parsed.zone, s, parsed.transport);
    return { situation: s, label: SITUATION_LABELS[s], total: res.total, isCurrent: s === parsed.situation };
  });

  const postesTries = [...r.postes].sort((a, b) => b.montant - a.montant);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien faut-il pour vivre ${sitLabel.toLowerCase()} a ${zoneLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le budget minimum pour vivre ${sitLabel.toLowerCase()} a ${zoneLabel} en 2026 est d'environ ${fmt(r.total)} EUR/mois (avec ${transLabel.toLowerCase()}). Le logement represente ${fmt(r.postes[0].montant)} EUR (${Math.round((r.postes[0].montant / r.total) * 100)}%), l'alimentation ${fmt(r.postes[1].montant)} EUR.`,
        },
      },
      {
        "@type": "Question",
        name: `Le RSA suffit-il pour vivre ${sitLabel.toLowerCase()} a ${zoneLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Non. Le RSA pour ${sitLabel.toLowerCase()} est de ${fmt(Math.round(rsaRef))} EUR/mois. Le budget minimum a ${zoneLabel} est de ${fmt(r.total)} EUR. Il manque ${fmt(Math.round(r.total - rsaRef))} EUR/mois.`,
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
        currentPage={`${sitLabel} - ${zoneLabel}`}
        parentPage="Calculateur Budget Survie"
        parentHref="/calculateur-budget-survie"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧮
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Budget survie : {sitLabel.toLowerCase()} a {zoneLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Budget minimum pour vivre {sitLabel.toLowerCase()} a {zoneLabel} en 2026 ({transLabel.toLowerCase()}).
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Budget minimum mensuel</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(r.total)} EUR</p>
        <p className="text-lg font-medium mt-1">par mois ({fmt(r.total * 12)} EUR/an)</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Loyer</p>
            <p className="font-semibold">{fmt(r.postes[0].montant)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Alimentation</p>
            <p className="font-semibold">{fmt(r.postes[1].montant)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">vs RSA</p>
            <p className="font-semibold text-red-200">-{fmt(Math.round(r.total - rsaRef))} EUR</p>
          </div>
          <div>
            <p className="text-white/70">vs SMIC net</p>
            <p className={`font-semibold ${SMIC_NET >= r.total ? "text-green-200" : "text-red-200"}`}>
              {SMIC_NET >= r.total ? "+" : "-"}{fmt(Math.abs(Math.round(r.total - SMIC_NET)))} EUR
            </p>
          </div>
        </div>
      </div>

      {/* Detail des postes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail du budget</h2>
        <div className="space-y-3">
          {postesTries.map((p) => (
            <div key={p.label} className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{p.icone} {p.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{Math.round((p.montant / r.total) * 100)}%</span>
                <span className="text-sm font-bold text-slate-700 w-20 text-right">{fmt(p.montant)} EUR</span>
              </div>
            </div>
          ))}
          <div className="h-px bg-slate-200 mt-2" />
          <div className="flex items-center justify-between font-bold">
            <span className="text-slate-700">Total</span>
            <span className="text-red-600">{fmt(r.total)} EUR/mois</span>
          </div>
        </div>
      </div>

      {/* Comparaison par zone */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Budget {sitLabel.toLowerCase()} selon la zone
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Zone</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Loyer</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total/mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total/an</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonZone.map((row) => (
                <tr key={row.zone} className={`border-b border-slate-100 ${row.isCurrent ? "bg-red-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-red-600">{row.label}</span>
                    ) : (
                      <a href={`/calculateur-budget-survie/${row.zone}-${parsed.situation}-${parsed.transport}`} className="text-slate-700 hover:text-red-600 transition-colors">
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "text-red-600" : "text-slate-500"}`}>{fmt(row.loyer)} EUR</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-red-600" : "text-slate-700"}`}>{fmt(row.total)} EUR</td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "text-red-600" : "text-slate-500"}`}>{fmt(row.total * 12)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par situation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Budget a {zoneLabel} selon la situation
        </h2>
        <div className="space-y-2">
          {comparaisonSituation.map((row) => (
            <div
              key={row.situation}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                row.isCurrent ? "bg-red-50 border-red-300" : "border-slate-100"
              }`}
            >
              <span className={`font-semibold text-sm ${row.isCurrent ? "text-red-700" : "text-slate-600"}`}>
                {row.isCurrent ? row.label : (
                  <a href={`/calculateur-budget-survie/${parsed.zone}-${row.situation}-${parsed.transport}`} className="hover:text-red-600 transition-colors">
                    {row.label}
                  </a>
                )}
              </span>
              <span className={`font-extrabold ${row.isCurrent ? "text-red-700" : "text-slate-700"}`}>{fmt(row.total)} EUR/mois</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurBudgetSurvie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Vivre {sitLabel.toLowerCase()} a {zoneLabel} : combien ca coute ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour vivre <strong>{sitLabel.toLowerCase()}</strong> a <strong>{zoneLabel}</strong> en 2026,
          le budget minimum est d&apos;environ <strong>{fmt(r.total)} EUR/mois</strong> (avec {transLabel.toLowerCase()}).
          Le loyer represente <strong>{fmt(r.postes[0].montant)} EUR</strong> ({Math.round((r.postes[0].montant / r.total) * 100)}% du budget),
          l&apos;alimentation <strong>{fmt(r.postes[1].montant)} EUR</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le RSA ({fmt(Math.round(rsaRef))} EUR) ne couvre que <strong>{Math.round((rsaRef / r.total) * 100)}%</strong> de ce budget.
          Le SMIC net (1 443 EUR) {SMIC_NET >= r.total
            ? `permet de couvrir ce budget avec une marge de ${fmt(Math.round(SMIC_NET - r.total))} EUR.`
            : `ne suffit pas — il manque ${fmt(Math.round(r.total - SMIC_NET))} EUR/mois.`}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les aides sociales (APL, prime d&apos;activite, CSS) peuvent reduire le budget reel de
          200 a 500 EUR/mois selon l&apos;eligibilite. Ce budget n&apos;inclut pas les loisirs, l&apos;epargne
          ni les vacances.
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {ZONES.filter((z) => z !== parsed.zone).map((z) => (
            <a
              key={z}
              href={`/calculateur-budget-survie/${z}-${parsed.situation}-${parsed.transport}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {ZONE_LABELS[z]}
            </a>
          ))}
          {SITUATIONS.filter((s) => s !== parsed.situation).map((s) => (
            <a
              key={s}
              href={`/calculateur-budget-survie/${parsed.zone}-${s}-${parsed.transport}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {SITUATION_LABELS[s]} a {zoneLabel}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calculateur-budget-survie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
