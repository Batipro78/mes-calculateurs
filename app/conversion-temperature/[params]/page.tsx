import type { Metadata } from "next";
import ConvertisseurTemperature from "../ConvertisseurTemperature";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const CELSIUS_VALS = [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 37, 40, 50, 60, 80, 100, 150, 200, 250];
const FAHRENHEIT_VALS = [-40, 0, 32, 50, 60, 68, 72, 77, 80, 90, 98.6, 100, 120, 140, 160, 180, 200, 212, 300, 350, 400, 450];

function celsiusToFahrenheit(c: number): number { return c * 9 / 5 + 32; }
function fahrenheitToCelsius(f: number): number { return (f - 32) * 5 / 9; }
function celsiusToKelvin(c: number): number { return c + 273.15; }

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

interface Parsed {
  valeur: number;
  de: "celsius" | "fahrenheit";
  vers: "celsius" | "fahrenheit";
}

function parseSlug(slug: string): Parsed | null {
  const matchCF = slug.match(/^(-?\d+(?:[.,]\d+)?)-celsius-en-fahrenheit$/);
  if (matchCF) return { valeur: parseFloat(matchCF[1].replace(",", ".")), de: "celsius", vers: "fahrenheit" };

  const matchFC = slug.match(/^(-?\d+(?:[.,]\d+)?)-fahrenheit-en-celsius$/);
  if (matchFC) return { valeur: parseFloat(matchFC[1].replace(",", ".")), de: "fahrenheit", vers: "celsius" };

  return null;
}

function getAllSlugs(): string[] {
  const slugs: string[] = [];
  for (const c of CELSIUS_VALS) slugs.push(`${c}-celsius-en-fahrenheit`);
  for (const f of FAHRENHEIT_VALS) slugs.push(`${f}-fahrenheit-en-celsius`);
  return slugs;
}

export function generateStaticParams() {
  return getAllSlugs().map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { valeur, de, vers } = parsed;
  const resultat = de === "celsius" ? celsiusToFahrenheit(valeur) : fahrenheitToCelsius(valeur);
  const deSymb = de === "celsius" ? "\u00b0C" : "\u00b0F";
  const versSymb = vers === "celsius" ? "\u00b0C" : "\u00b0F";

  return {
    alternates: { canonical: `/conversion-temperature/${slug}` },
    title: `${valeur}${deSymb} en ${vers === "celsius" ? "Celsius" : "Fahrenheit"} = ${fmtInt(resultat)}${versSymb}`,
    description: `${valeur}${deSymb} = ${fmtInt(resultat)}${versSymb}. Conversion temperature ${de === "celsius" ? "Celsius vers Fahrenheit" : "Fahrenheit vers Celsius"} avec formule, tableau et reperes.`,
    keywords: `${valeur} ${de} en ${vers}, conversion ${valeur}${deSymb}, ${valeur} degres ${de} ${vers}, temperature ${valeur}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { valeur, de, vers } = parsed;
  const resultat = de === "celsius" ? celsiusToFahrenheit(valeur) : fahrenheitToCelsius(valeur);
  const kelvin = de === "celsius" ? celsiusToKelvin(valeur) : celsiusToKelvin(fahrenheitToCelsius(valeur));
  const deSymb = de === "celsius" ? "\u00b0C" : "\u00b0F";
  const versSymb = vers === "celsius" ? "\u00b0C" : "\u00b0F";
  const deLabel = de === "celsius" ? "Celsius" : "Fahrenheit";
  const versLabel = vers === "celsius" ? "Celsius" : "Fahrenheit";

  const sourceVals = de === "celsius" ? CELSIUS_VALS : FAHRENHEIT_VALS;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien font ${valeur}${deSymb} en ${versLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${valeur}${deSymb} = ${fmtInt(resultat)}${versSymb}. La formule utilisee est : ${de === "celsius" ? "\u00b0F = \u00b0C \u00d7 9/5 + 32" : "\u00b0C = (\u00b0F \u2212 32) \u00d7 5/9"}.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien font ${valeur}${deSymb} en Kelvin ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${valeur}${deSymb} = ${fmtInt(kelvin)} K.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${valeur}${deSymb} en ${versLabel}`} parentPage="Conversion Temperature" parentHref="/conversion-temperature" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {valeur}{deSymb} en {versLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Conversion de {valeur} degres {deLabel} en {versLabel}, Kelvin et reperes pratiques.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-200 mb-1">{valeur}{deSymb} =</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat)} <span className="text-2xl font-semibold">{versSymb}</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-200">Celsius</p>
            <p className="font-semibold text-lg">{fmtInt(de === "celsius" ? valeur : resultat)}&deg;C</p>
          </div>
          <div>
            <p className="text-blue-200">Fahrenheit</p>
            <p className="font-semibold text-lg">{fmtInt(de === "fahrenheit" ? valeur : resultat)}&deg;F</p>
          </div>
          <div>
            <p className="text-blue-200">Kelvin</p>
            <p className="font-semibold text-lg">{fmtInt(kelvin)} K</p>
          </div>
        </div>
      </div>

      {/* Formule detaillee */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Calcul detaille</h2>
        {de === "celsius" ? (
          <div className="bg-blue-50/50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
            <p>&deg;F = &deg;C &times; 9/5 + 32</p>
            <p>&deg;F = {valeur} &times; 1,8 + 32</p>
            <p>&deg;F = {fmtInt(valeur * 1.8)} + 32</p>
            <p className="font-bold text-blue-600">&deg;F = {fmt(resultat)}</p>
          </div>
        ) : (
          <div className="bg-blue-50/50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
            <p>&deg;C = (&deg;F &minus; 32) &times; 5/9</p>
            <p>&deg;C = ({valeur} &minus; 32) &times; 5/9</p>
            <p>&deg;C = {fmtInt(valeur - 32)} &times; 5/9</p>
            <p className="font-bold text-blue-600">&deg;C = {fmt(resultat)}</p>
          </div>
        )}
      </div>

      {/* Tableau de conversions proches */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tableau de conversion {deLabel}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">{deLabel} ({deSymb})</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">{versLabel} ({versSymb})</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Kelvin (K)</th>
              </tr>
            </thead>
            <tbody>
              {sourceVals.map((v) => {
                const res = de === "celsius" ? celsiusToFahrenheit(v) : fahrenheitToCelsius(v);
                const k = de === "celsius" ? celsiusToKelvin(v) : celsiusToKelvin(fahrenheitToCelsius(v));
                return (
                  <tr key={v} className={`border-b border-slate-100 ${v === valeur ? "bg-blue-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {v === valeur ? (
                        <span className="font-bold text-blue-600">{v}{deSymb}</span>
                      ) : (
                        <a href={`/conversion-temperature/${v}-${de}-en-${vers}`} className="text-slate-700 hover:text-blue-600 transition-colors">
                          {v}{deSymb}
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-bold ${v === valeur ? "text-blue-600" : "text-slate-700"}`}>
                      {fmtInt(res)}{versSymb}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">
                      {fmtInt(k)} K
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Convertisseur interactif</h2>
      <ConvertisseurTemperature />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {valeur}{deSymb} en {versLabel} — Explication
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>{valeur} degres {deLabel}</strong> correspond a <strong>{fmt(resultat)} degres {versLabel}</strong> (soit {fmtInt(kelvin)} Kelvin).
          {de === "celsius" && valeur === 0 && " C'est le point de congelation de l'eau, soit 32\u00b0F."}
          {de === "celsius" && valeur === 100 && " C'est le point d'ebullition de l'eau a pression atmospherique normale."}
          {de === "celsius" && valeur === 37 && " C'est la temperature normale du corps humain."}
          {de === "fahrenheit" && valeur === 32 && " C'est le point de congelation de l'eau, soit 0\u00b0C."}
          {de === "fahrenheit" && valeur === 212 && " C'est le point d'ebullition de l'eau a pression atmospherique normale."}
        </p>
        <p className="text-slate-600 leading-relaxed">
          L&apos;echelle {deLabel} est {de === "celsius" ? "utilisee dans la majorite des pays du monde, y compris la France" : "principalement utilisee aux Etats-Unis, aux Bahamas et dans quelques territoires"}.
          Pour convertir rapidement {deLabel} en {versLabel}, utilisez la formule :
          {de === "celsius" ? " multipliez par 1,8 et ajoutez 32." : " soustrayez 32 et multipliez par 5/9."}
        </p>
      </section>

      {/* Liens vers autres conversions */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres conversions</h2>
        <div className="flex flex-wrap gap-2">
          {sourceVals.filter((v) => v !== valeur).slice(0, 10).map((v) => (
            <a
              key={v}
              href={`/conversion-temperature/${v}-${de}-en-${vers}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {v}{deSymb} en {versSymb}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/conversion-temperature" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
