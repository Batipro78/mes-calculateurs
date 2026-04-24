import type { Metadata } from "next";
import ConvertisseurPoids from "../ConvertisseurPoids";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const KG_VALS = [1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50, 60, 65, 70, 75, 80, 85, 90, 95, 100, 120, 150];
const LBS_VALS = [1, 5, 10, 20, 50, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 250, 300];

function kgToLbs(kg: number): number { return kg * 2.20462; }
function lbsToKg(lbs: number): number { return lbs * 0.45359237; }
function kgToOz(kg: number): number { return kg * 35.27396; }

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

interface Parsed {
  valeur: number;
  de: "kg" | "livres";
}

function parseSlug(slug: string): Parsed | null {
  const matchKg = slug.match(/^(\d+)-kg-en-livres$/);
  if (matchKg) return { valeur: parseInt(matchKg[1]), de: "kg" };

  const matchLbs = slug.match(/^(\d+)-livres-en-kg$/);
  if (matchLbs) return { valeur: parseInt(matchLbs[1]), de: "livres" };

  return null;
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const kg of KG_VALS) slugs.push(`${kg}-kg-en-livres`);
  for (const lbs of LBS_VALS) slugs.push(`${lbs}-livres-en-kg`);
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { valeur, de } = parsed;
  const resultat = de === "kg" ? kgToLbs(valeur) : lbsToKg(valeur);
  const deSymb = de === "kg" ? "kg" : "lbs";
  const versSymb = de === "kg" ? "lbs" : "kg";
  const versLabel = de === "kg" ? "livres" : "kg";

  return {
    alternates: { canonical: `/conversion-poids/${slug}` },
    title: `${valeur} ${deSymb} en ${versLabel} = ${fmtInt(resultat)} ${versSymb}`,
    description: `${valeur} ${deSymb} = ${fmtInt(resultat)} ${versSymb}. Conversion poids ${de === "kg" ? "kilogrammes en livres" : "livres en kilogrammes"} avec tableau, formule et equivalences.`,
    keywords: `${valeur} ${deSymb} en ${versLabel}, conversion ${valeur} ${deSymb}, ${deSymb} ${versSymb}, poids ${valeur}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { valeur, de } = parsed;
  const resultat = de === "kg" ? kgToLbs(valeur) : lbsToKg(valeur);
  const oz = de === "kg" ? kgToOz(valeur) : kgToOz(lbsToKg(valeur));
  const deSymb = de === "kg" ? "kg" : "lbs";
  const versSymb = de === "kg" ? "lbs" : "kg";
  const deLabel = de === "kg" ? "Kilogrammes" : "Livres";
  const versLabel = de === "kg" ? "Livres" : "Kilogrammes";

  const sourceVals = de === "kg" ? KG_VALS : LBS_VALS;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien font ${valeur} ${deSymb} en ${versLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${valeur} ${deSymb} = ${fmtInt(resultat)} ${versSymb}. ${de === "kg" ? "Multipliez les kg par 2,20462 pour obtenir les livres." : "Multipliez les livres par 0,45359 pour obtenir les kg."}`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${valeur} ${deSymb} en ${versLabel.toLowerCase()}`} parentPage="Conversion Poids" parentHref="/conversion-poids" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {valeur} {deSymb} en {versLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Conversion de {valeur} {deLabel.toLowerCase()} en {versLabel.toLowerCase()}, onces et autres unites.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-200 mb-1">{valeur} {deSymb} =</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat)} <span className="text-2xl font-semibold">{versSymb}</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-emerald-200">Kilogrammes</p>
            <p className="font-semibold text-lg">{fmtInt(de === "kg" ? valeur : resultat)} kg</p>
          </div>
          <div>
            <p className="text-emerald-200">Livres</p>
            <p className="font-semibold text-lg">{fmtInt(de === "livres" ? valeur : resultat)} lbs</p>
          </div>
          <div>
            <p className="text-emerald-200">Onces</p>
            <p className="font-semibold text-lg">{fmtInt(oz)} oz</p>
          </div>
        </div>
      </div>

      {/* Calcul detaille */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Calcul detaille</h2>
        <div className="bg-emerald-50/50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
          {de === "kg" ? (
            <>
              <p>lbs = kg &times; 2,20462</p>
              <p>lbs = {valeur} &times; 2,20462</p>
              <p className="font-bold text-emerald-600">lbs = {fmt(resultat)}</p>
            </>
          ) : (
            <>
              <p>kg = lbs &times; 0,45359</p>
              <p>kg = {valeur} &times; 0,45359</p>
              <p className="font-bold text-emerald-600">kg = {fmt(resultat)}</p>
            </>
          )}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tableau de conversion {deLabel.toLowerCase()}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">{deLabel} ({deSymb})</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">{versLabel} ({versSymb})</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Onces (oz)</th>
              </tr>
            </thead>
            <tbody>
              {sourceVals.map((v) => {
                const res = de === "kg" ? kgToLbs(v) : lbsToKg(v);
                const ozVal = de === "kg" ? kgToOz(v) : kgToOz(lbsToKg(v));
                return (
                  <tr key={v} className={`border-b border-slate-100 ${v === valeur ? "bg-emerald-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {v === valeur ? (
                        <span className="font-bold text-emerald-600">{v} {deSymb}</span>
                      ) : (
                        <a href={`/conversion-poids/${v}-${de === "kg" ? "kg-en-livres" : "livres-en-kg"}`} className="text-slate-700 hover:text-emerald-600 transition-colors">
                          {v} {deSymb}
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-bold ${v === valeur ? "text-emerald-600" : "text-slate-700"}`}>
                      {fmtInt(res)} {versSymb}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">
                      {fmtInt(ozVal)} oz
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Convertisseur interactif</h2>
      <ConvertisseurPoids />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {valeur} {deSymb} en {versLabel.toLowerCase()} — Explication
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>{valeur} {deLabel.toLowerCase()}</strong> correspondent a <strong>{fmt(resultat)} {versLabel.toLowerCase()}</strong> (soit {fmtInt(oz)} onces).
          {de === "kg" && valeur === 1 && " Un kilogramme vaut exactement 2,20462 livres."}
          {de === "kg" && valeur === 70 && " 70 kg est un poids corporel moyen pour un adulte, soit environ 154 livres."}
          {de === "livres" && valeur === 100 && " 100 livres correspondent a environ 45,4 kg."}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Le kilogramme est l&apos;unite de masse du Systeme international (SI), utilisee dans la quasi-totalite des pays.
          La livre (pound) est encore utilisee aux Etats-Unis, au Royaume-Uni (avec les stones) et dans certains contextes internationaux (aviation, boxe).
        </p>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres conversions</h2>
        <div className="flex flex-wrap gap-2">
          {sourceVals.filter((v) => v !== valeur).slice(0, 10).map((v) => (
            <a
              key={v}
              href={`/conversion-poids/${v}-${de === "kg" ? "kg-en-livres" : "livres-en-kg"}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
            >
              {v} {deSymb}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/conversion-poids" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
