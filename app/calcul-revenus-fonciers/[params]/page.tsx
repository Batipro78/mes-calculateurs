import type { Metadata } from "next";
import CalculateurRevenusFonciers from "../CalculateurRevenusFonciers";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calcRevenusFonciers } from "../revenusFonciersCalc";

const LOYERS = [6000, 8000, 10000, 12000, 15000, 18000, 24000, 36000];
const TMI_LIST = [11, 30, 41];
const REGIMES = ["micro-foncier", "reel"] as const;

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
}
function fmtP(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function parseSlug(
  slug: string
): { loyers: number; tmi: number; regime: "micro-foncier" | "reel" } | null {
  const match = slug.match(/^(\d+)-euros-tmi-(\d+)-(micro-foncier|reel)$/);
  if (!match) return null;
  const loyers = parseInt(match[1]);
  const tmi = parseInt(match[2]);
  const regime = match[3] as "micro-foncier" | "reel";
  if (!LOYERS.includes(loyers)) return null;
  if (!TMI_LIST.includes(tmi)) return null;
  return { loyers, tmi, regime };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const loyers of LOYERS) {
    for (const tmi of TMI_LIST) {
      for (const regime of REGIMES) {
        slugs.push(`${loyers}-euros-tmi-${tmi}-${regime}`);
      }
    }
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { loyers, tmi, regime } = parsed;

  const charges = Math.round(loyers * 0.2);
  const regimeCalc = regime === "micro-foncier" ? "micro" : "reel";
  const result = calcRevenusFonciers(loyers, charges, 0, 0, regimeCalc, tmi);

  return {
    alternates: { canonical: `/calcul-revenus-fonciers/${slug}` },
    title: `${fmt(loyers)} € loyers, TMI ${tmi}% - Regime ${regime === "micro-foncier" ? "micro-foncier" : "reel"} : ${fmt(result.totalImposition)} € d'impot`,
    description: `Revenus fonciers de ${fmt(loyers)} € avec TMI ${tmi}% en regime ${regime}. Impot total : ${fmt(result.totalImposition)} €, revenu imposable : ${fmt(result.revenuImposable)} €, rendement net : ${fmtP(result.rendementNet)}%. Simulateur 2026.`,
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

  const { loyers, tmi, regime } = parsed;
  const charges = Math.round(loyers * 0.2);
  const regimeCalc = regime === "micro-foncier" ? "micro" : ("reel" as const);
  const result = calcRevenusFonciers(loyers, charges, 0, 0, regimeCalc, tmi);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Combien d'impots pour ${fmt(loyers)} € de loyers au regime ${regime} ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Pour ${fmt(loyers)} € de loyers annuels avec une TMI de ${tmi}% en regime ${regime}, l'imposition totale s'eleve a ${fmt(result.totalImposition)} € (IR ${fmt(result.impotRevenu)} € + prelevements sociaux ${fmt(result.prelevementsSociaux)} €). Le rendement net apres impots est de ${fmtP(result.rendementNet)}%.`,
                },
              },
              {
                "@type": "Question",
                name: `Micro-foncier ou regime reel pour ${fmt(loyers)} € de loyers ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Pour ${fmt(loyers)} € de loyers et une TMI de ${tmi}%, le regime ${result.comparaison.meilleurRegime === "micro" ? "micro-foncier" : "reel"} est plus avantageux avec une economie de ${fmt(result.comparaison.economie)} € par an. Micro-foncier : ${fmt(result.comparaison.micro.totalImposition)} €. Regime reel : ${fmt(result.comparaison.reel.totalImposition)} €.`,
                },
              },
              {
                "@type": "Question",
                name: "Comment reduire l'imposition des revenus fonciers ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour reduire l'imposition, optez pour le regime reel si vos charges (interets d'emprunt, travaux, taxe fonciere...) depassent 30% des loyers. Si les charges sont superieures aux loyers, vous creez un deficit foncier imputable sur le revenu global a hauteur de 10 700 €/an.",
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://mescalculateurs.fr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Revenus Fonciers",
                item: "https://mescalculateurs.fr/calcul-revenus-fonciers",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${fmt(loyers)} € - TMI ${tmi}% - ${regime}`,
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage={`${fmt(loyers)} € — TMI ${tmi}%`}
        parentPage="Revenus Fonciers"
        parentHref="/calcul-revenus-fonciers"
        lastUpdated="8 avril 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏘️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {fmt(loyers)} &euro; de loyers — TMI {tmi}% — Regime {regime}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Imposition des revenus fonciers pour {fmt(loyers)} &euro; de loyers annuels avec une TMI de {tmi}%.
      </p>

      {/* Carte principale */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl p-8 shadow-lg shadow-indigo-200/50 mb-8">
        <p className="text-indigo-200 mb-1">Impot total — {fmt(loyers)} &euro; de loyers / TMI {tmi}% / Regime {regime}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(result.totalImposition)} <span className="text-2xl font-semibold">&euro;</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-indigo-200">Revenu imposable</p>
            <p className="font-semibold text-lg">{fmt(result.revenuImposable)} &euro;</p>
          </div>
          <div>
            <p className="text-indigo-200">IR ({tmi}%)</p>
            <p className="font-semibold text-lg">{fmt(result.impotRevenu)} &euro;</p>
          </div>
          <div>
            <p className="text-indigo-200">PS (17,2%)</p>
            <p className="font-semibold text-lg">{fmt(result.prelevementsSociaux)} &euro;</p>
          </div>
          <div>
            <p className="text-indigo-200">Rendement net</p>
            <p className="font-semibold text-lg">{fmtP(result.rendementNet)}%</p>
          </div>
        </div>
      </div>

      {/* Comparaison micro vs reel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Micro-foncier vs Regime reel pour {fmt(loyers)} &euro; (TMI {tmi}%)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`rounded-xl p-4 ${result.comparaison.meilleurRegime === "micro" ? "bg-emerald-50 border-2 border-emerald-300" : "bg-slate-50 border border-slate-200"}`}>
            <div className="flex items-center gap-2 mb-3">
              <p className="font-bold text-slate-800">Micro-foncier</p>
              {result.comparaison.meilleurRegime === "micro" && (
                <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-semibold">Optimal</span>
              )}
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Abattement 30%</span>
                <span className="font-medium text-green-600">-{fmt(result.comparaison.micro.abattement ?? 0)} &euro;</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Revenu imposable</span>
                <span className="font-medium">{fmt(result.comparaison.micro.revenuImposable)} &euro;</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">IR + PS</span>
                <span className="font-bold text-slate-800">{fmt(result.comparaison.micro.totalImposition)} &euro;</span>
              </div>
            </div>
          </div>
          <div className={`rounded-xl p-4 ${result.comparaison.meilleurRegime === "reel" ? "bg-indigo-50 border-2 border-indigo-300" : "bg-slate-50 border border-slate-200"}`}>
            <div className="flex items-center gap-2 mb-3">
              <p className="font-bold text-slate-800">Regime reel</p>
              {result.comparaison.meilleurRegime === "reel" && (
                <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full font-semibold">Optimal</span>
              )}
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Charges deduites</span>
                <span className="font-medium text-green-600">-{fmt(result.comparaison.reel.chargesDeductibles ?? 0)} &euro;</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Revenu imposable</span>
                <span className="font-medium">{fmt(result.comparaison.reel.revenuImposable)} &euro;</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">IR + PS</span>
                <span className="font-bold text-slate-800">{fmt(result.comparaison.reel.totalImposition)} &euro;</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${result.comparaison.meilleurRegime === "reel" ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"}`}>
          Economie avec le regime {result.comparaison.meilleurRegime === "reel" ? "reel" : "micro-foncier"} : <strong>{fmt(result.comparaison.economie)} &euro;/an</strong>
        </div>
      </div>

      {/* Table variation par montant de loyers */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Imposition selon le montant des loyers (TMI {tmi}% — regime {regime})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Loyers</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Revenu imposable</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">IR + PS</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Rendement net</th>
              </tr>
            </thead>
            <tbody>
              {LOYERS.map((l) => {
                const ch = Math.round(l * 0.2);
                const r = calcRevenusFonciers(l, ch, 0, 0, regimeCalc, tmi);
                const isActive = l === loyers;
                return (
                  <tr key={l} className={`border-b border-slate-100 ${isActive ? "bg-indigo-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {isActive ? (
                        <span className="font-bold text-indigo-600">{fmt(l)} &euro;</span>
                      ) : (
                        <a
                          href={`/calcul-revenus-fonciers/${l}-euros-tmi-${tmi}-${regime}`}
                          className="text-slate-700 hover:text-indigo-600"
                        >
                          {fmt(l)} &euro;
                        </a>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{fmt(r.revenuImposable)} &euro;</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${isActive ? "text-indigo-600" : "text-slate-700"}`}>
                      {fmt(r.totalImposition)} &euro;
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{fmtP(r.rendementNet)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table variation par TMI */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Imposition selon la TMI — {fmt(loyers)} &euro; de loyers (regime {regime})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">TMI</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">IR</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">PS</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Rendement net</th>
              </tr>
            </thead>
            <tbody>
              {TMI_LIST.map((t) => {
                const r = calcRevenusFonciers(loyers, charges, 0, 0, regimeCalc, t);
                const isActive = t === tmi;
                return (
                  <tr key={t} className={`border-b border-slate-100 ${isActive ? "bg-indigo-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {isActive ? (
                        <span className="font-bold text-indigo-600">{t}%</span>
                      ) : (
                        <a
                          href={`/calcul-revenus-fonciers/${loyers}-euros-tmi-${t}-${regime}`}
                          className="text-slate-700 hover:text-indigo-600"
                        >
                          {t}%
                        </a>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{fmt(r.impotRevenu)} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{fmt(r.prelevementsSociaux)} &euro;</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${isActive ? "text-indigo-600" : "text-slate-700"}`}>
                      {fmt(r.totalImposition)} &euro;
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{fmtP(r.rendementNet)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurRevenusFonciers />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Analyse : {fmt(loyers)} &euro; de loyers, TMI {tmi}%, regime {regime}
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Avec <strong>{fmt(loyers)} &euro;</strong> de loyers annuels et une TMI de <strong>{tmi}%</strong>,
          l&apos;imposition totale en regime {regime} s&apos;eleve a <strong>{fmt(result.totalImposition)} &euro;</strong>.
          Le revenu imposable est de {fmt(result.revenuImposable)} &euro;, avec {fmt(result.impotRevenu)} &euro; d&apos;impot
          sur le revenu et {fmt(result.prelevementsSociaux)} &euro; de prelevements sociaux (17,2%).
          Le rendement net apres fiscalite est de <strong>{fmtP(result.rendementNet)}%</strong>.
        </p>
        {result.comparaison.meilleurRegime !== regimeCalc && (
          <p className="mt-3 text-slate-600 leading-relaxed">
            Note : le regime{" "}
            <a
              href={`/calcul-revenus-fonciers/${loyers}-euros-tmi-${tmi}-${result.comparaison.meilleurRegime === "micro" ? "micro-foncier" : "reel"}`}
              className="text-indigo-600 hover:underline font-semibold"
            >
              {result.comparaison.meilleurRegime === "micro" ? "micro-foncier" : "reel"}
            </a>{" "}
            serait plus avantageux dans cette situation, avec une economie de{" "}
            <strong>{fmt(result.comparaison.economie)} &euro;</strong> par an.
          </p>
        )}
      </section>

      <RelatedCalculators currentSlug="/calcul-revenus-fonciers" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
