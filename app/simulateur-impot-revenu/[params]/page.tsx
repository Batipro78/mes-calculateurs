import type { Metadata } from "next";
import SimulateurImpot from "../SimulateurImpot";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const REVENUS = [
  15000, 18000, 20000, 22000, 25000, 28000, 30000, 32000, 35000, 38000,
  40000, 42000, 45000, 48000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 90000, 100000, 120000, 150000,
];

// Tranches d'imposition 2026 (revenus 2025)
const TRANCHES = [
  { min: 0, max: 11497, taux: 0 },
  { min: 11497, max: 29315, taux: 0.11 },
  { min: 29315, max: 83823, taux: 0.3 },
  { min: 83823, max: 180294, taux: 0.41 },
  { min: 180294, max: Infinity, taux: 0.45 },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmt2(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculImpot(revenuNet: number, nbParts: number) {
  const abattement = Math.max(495, Math.min(revenuNet * 0.1, 14171));
  const revenuImposable = Math.max(0, revenuNet - abattement);
  const quotient = revenuImposable / nbParts;

  let impotParPart = 0;
  const detailTranches: { tranche: string; taux: number; montant: number }[] = [];

  for (const t of TRANCHES) {
    if (quotient <= t.min) break;
    const base = Math.min(quotient, t.max) - t.min;
    const montant = base * t.taux;
    impotParPart += montant;
    if (base > 0) {
      detailTranches.push({
        tranche: `${fmt(t.min)} - ${t.max === Infinity ? "+" : fmt(t.max)} EUR`,
        taux: t.taux * 100,
        montant: montant * nbParts,
      });
    }
  }

  const impotBrut = impotParPart * nbParts;

  // Decote 2026
  let decote = 0;
  if (nbParts <= 1.5) {
    if (impotBrut < 1929) {
      decote = Math.max(0, 873 - impotBrut * 0.4525);
    }
  } else {
    if (impotBrut < 3191) {
      decote = Math.max(0, 1444 - impotBrut * 0.4525);
    }
  }

  const impotNet = Math.max(0, impotBrut - decote);
  let tauxMarginal = 0;
  for (const t of TRANCHES) {
    if (quotient > t.min) tauxMarginal = t.taux * 100;
  }

  const tauxMoyen = revenuNet > 0 ? (impotNet / revenuNet) * 100 : 0;

  return { impotBrut, decote, impotNet, tauxMarginal, tauxMoyen, detailTranches, quotient, revenuImposable, abattement };
}

function parseSlug(slug: string): { revenu: number } | null {
  const match = slug.match(/^(\d+)-euros$/);
  if (!match) return null;
  return { revenu: parseInt(match[1]) };
}

export function generateStaticParams() {
  return REVENUS.map((r) => ({ params: `${r}-euros` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { revenu } = parsed;
  const result = calculImpot(revenu, 1);
  const parMois = Math.round(result.impotNet / 12);

  return {
    title: `Impot sur ${fmt(revenu)} EUR de revenu - Simulation 2026`,
    description: `Combien d'impot pour ${fmt(revenu)} EUR de revenu annuel ? Resultat : ${fmt(Math.round(result.impotNet))} EUR/an (${fmt(parMois)} EUR/mois). Taux marginal ${result.tauxMarginal}%, taux moyen ${fmt2(result.tauxMoyen)}%. Bareme 2026.`,
    keywords: `impot ${fmt(revenu)} euros, simulation impot ${fmt(revenu)}, combien impot ${fmt(revenu)}, impot revenu ${fmt(revenu)} euros 2026`,
    openGraph: {
      title: `${fmt(revenu)} EUR de revenu = ${fmt(Math.round(result.impotNet))} EUR d'impot (2026)`,
      description: `Simulation detaillee : ${fmt(Math.round(result.impotNet))} EUR/an soit ${fmt(parMois)} EUR/mois d'impot pour un revenu de ${fmt(revenu)} EUR. Taux moyen ${fmt2(result.tauxMoyen)}%.`,
    },
  };
}

type Situation = { label: string; nbParts: number; desc: string };

const SITUATIONS: Situation[] = [
  { label: "Celibataire", nbParts: 1, desc: "Sans enfant" },
  { label: "Celibataire + 1 enfant", nbParts: 1.5, desc: "" },
  { label: "Celibataire + 2 enfants", nbParts: 2, desc: "" },
  { label: "Couple", nbParts: 2, desc: "Marie/pacse, sans enfant" },
  { label: "Couple + 1 enfant", nbParts: 2.5, desc: "" },
  { label: "Couple + 2 enfants", nbParts: 3, desc: "" },
  { label: "Couple + 3 enfants", nbParts: 4, desc: "" },
];

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { revenu } = parsed;
  if (!REVENUS.includes(revenu)) notFound();

  const result = calculImpot(revenu, 1);
  const parMois = Math.round(result.impotNet / 12);
  const resteAVivre = revenu - result.impotNet;

  // Comparaison par situation familiale
  const comparaisonSituations = SITUATIONS.map((s) => {
    const r = calculImpot(revenu, s.nbParts);
    return { ...s, impot: r.impotNet, tauxMoyen: r.tauxMoyen, tauxMarginal: r.tauxMarginal };
  });

  // Comparaison par revenu (celibataire)
  const comparaisonRevenus = REVENUS.map((rev) => {
    const r = calculImpot(rev, 1);
    return { revenu: rev, impot: r.impotNet, tauxMoyen: r.tauxMoyen, isCurrent: rev === revenu };
  });

  const autresRevenus = REVENUS.filter((r) => r !== revenu);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien d'impot pour ${fmt(revenu)} EUR de revenu ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un revenu annuel de ${fmt(revenu)} EUR (celibataire, sans enfant), l'impot sur le revenu est de ${fmt(Math.round(result.impotNet))} EUR par an, soit ${fmt(parMois)} EUR par mois. Le taux marginal est de ${result.tauxMarginal}% et le taux moyen de ${fmt2(result.tauxMoyen)}%. Simulation basee sur le bareme 2026.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le taux d'imposition pour ${fmt(revenu)} EUR ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${fmt(revenu)} EUR de revenu annuel, le taux marginal d'imposition est de ${result.tauxMarginal}% et le taux moyen effectif est de ${fmt2(result.tauxMoyen)}%. Apres abattement de 10% (${fmt(Math.round(result.abattement))} EUR), le revenu imposable est de ${fmt(Math.round(result.revenuImposable))} EUR.`,
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
        currentPage={`${fmt(revenu)} EUR`}
        parentPage="Simulateur Impot Revenu"
        parentHref="/simulateur-impot-revenu"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏛️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Impot sur {fmt(revenu)} EUR de revenu
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation detaillee de l&apos;impot sur le revenu pour {fmt(revenu)} EUR annuels — bareme 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-200 mb-1">Impot sur le revenu (celibataire)</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(Math.round(result.impotNet))} <span className="text-2xl font-semibold">EUR / an</span>
        </p>
        <p className="text-red-200 mt-2">soit {fmt(parMois)} EUR / mois</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-red-200">Revenu declare</p>
            <p className="font-semibold">{fmt(revenu)} EUR</p>
          </div>
          <div>
            <p className="text-red-200">Revenu imposable</p>
            <p className="font-semibold">{fmt(Math.round(result.revenuImposable))} EUR</p>
          </div>
          <div>
            <p className="text-red-200">Taux marginal</p>
            <p className="font-semibold">{result.tauxMarginal}%</p>
          </div>
          <div>
            <p className="text-red-200">Taux moyen</p>
            <p className="font-semibold">{fmt2(result.tauxMoyen)}%</p>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Abattement 10%</p>
          <p className="text-2xl font-extrabold text-slate-800">{fmt(Math.round(result.abattement))} EUR</p>
          <p className="text-xs text-slate-400 mt-1">Min 495 EUR — Max 14 171 EUR</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Reste a vivre</p>
          <p className="text-2xl font-extrabold text-green-600">{fmt(Math.round(resteAVivre))} EUR/an</p>
          <p className="text-xs text-slate-400 mt-1">{fmt(Math.round(resteAVivre / 12))} EUR/mois</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Part des impots</p>
          <p className="text-2xl font-extrabold text-red-500">{fmt2(result.tauxMoyen)}%</p>
          <p className="text-xs text-slate-400 mt-1">De votre revenu</p>
        </div>
      </div>

      {/* Barre visuelle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-8">
        <p className="text-xs font-medium text-slate-400 mb-3">Repartition de votre revenu</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500"
            style={{ width: `${100 - result.tauxMoyen}%` }}
          />
          <div
            className="bg-red-400"
            style={{ width: `${result.tauxMoyen}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-green-600 font-medium">Net : {fmt(Math.round(resteAVivre))} EUR ({fmt2(100 - result.tauxMoyen)}%)</span>
          <span className="text-red-500 font-medium">Impot : {fmt(Math.round(result.impotNet))} EUR ({fmt2(result.tauxMoyen)}%)</span>
        </div>
      </div>

      {/* Detail par tranche */}
      {result.detailTranches.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Detail par tranche pour {fmt(revenu)} EUR
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Tranche</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Montant</th>
                </tr>
              </thead>
              <tbody>
                {result.detailTranches.map((t, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3 px-2 text-slate-600">{t.tranche}</td>
                    <td className="py-3 px-2 text-right font-semibold text-slate-700">{t.taux}%</td>
                    <td className="py-3 px-2 text-right font-bold text-red-500">{fmt(Math.round(t.montant))} EUR</td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td className="py-3 px-2 font-bold text-slate-800" colSpan={2}>Total (avant decote)</td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">{fmt(Math.round(result.impotBrut))} EUR</td>
                </tr>
                {result.decote > 0 && (
                  <tr>
                    <td className="py-3 px-2 text-green-600" colSpan={2}>Decote</td>
                    <td className="py-3 px-2 text-right font-bold text-green-600">- {fmt(Math.round(result.decote))} EUR</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comparaison par situation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmt(revenu)} EUR : impot selon la situation familiale
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Situation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Parts</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Impot / an</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Impot / mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux moyen</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonSituations.map((s) => (
                <tr key={s.label} className={`border-b border-slate-100 ${s.nbParts === 1 ? "bg-red-50/50" : ""}`}>
                  <td className="py-3 px-2 font-medium text-slate-700">{s.label}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{s.nbParts}</td>
                  <td className="py-3 px-2 text-right font-bold text-red-500">{fmt(Math.round(s.impot))} EUR</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt(Math.round(s.impot / 12))} EUR</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt2(s.tauxMoyen)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par revenu */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par revenu (celibataire)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Revenu annuel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Impot / an</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux moyen</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonRevenus.map((row) => (
                <tr key={row.revenu} className={`border-b border-slate-100 ${row.isCurrent ? "bg-red-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-red-600">{fmt(row.revenu)} EUR</span>
                    ) : (
                      <a href={`/simulateur-impot-revenu/${row.revenu}-euros`} className="text-slate-700 hover:text-red-600 transition-colors">
                        {fmt(row.revenu)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-red-600" : "text-slate-700"}`}>
                    {fmt(Math.round(row.impot))} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt2(row.tauxMoyen)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Simulateur interactif
      </h2>
      <SimulateurImpot />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte explicatif */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Impot sur le revenu pour {fmt(revenu)} EUR en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un revenu annuel net de <strong>{fmt(revenu)} EUR</strong> (celibataire, sans enfant),
          l&apos;impot sur le revenu s&apos;eleve a <strong>{fmt(Math.round(result.impotNet))} EUR par an</strong>,
          soit <strong>{fmt(parMois)} EUR par mois</strong>. Votre taux marginal d&apos;imposition
          est de <strong>{result.tauxMarginal}%</strong> et votre taux moyen effectif
          de <strong>{fmt2(result.tauxMoyen)}%</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Apres l&apos;abattement forfaitaire de 10% ({fmt(Math.round(result.abattement))} EUR),
          votre revenu imposable est de <strong>{fmt(Math.round(result.revenuImposable))} EUR</strong>.
          Il vous reste <strong>{fmt(Math.round(resteAVivre))} EUR net d&apos;impot</strong> sur l&apos;annee,
          soit environ <strong>{fmt(Math.round(resteAVivre / 12))} EUR par mois</strong>.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Comment reduire votre impot ?</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Dons aux associations (66% de reduction, plafond 20% du revenu)</li>
          <li>Emploi a domicile (50% de credit d&apos;impot)</li>
          <li>Investissement locatif (Pinel, Denormandie)</li>
          <li>Plan d&apos;Epargne Retraite (PER) : versements deductibles</li>
          <li>Frais reels si superieurs a l&apos;abattement de 10%</li>
        </ul>
      </section>

      {/* Liens vers autres simulations */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {autresRevenus.map((r) => (
            <a
              key={r}
              href={`/simulateur-impot-revenu/${r}-euros`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {fmt(r)} EUR
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-impot-revenu" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
