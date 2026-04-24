import type { Metadata } from "next";
import ConvertisseurLongueur from "../ConvertisseurLongueur";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const CM_VALS = [1, 2, 5, 10, 20, 30, 50, 100, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200];
const POUCES_VALS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 24, 27, 32, 40, 43, 50, 55, 65, 75, 85];

function cmToPouces(cm: number): number { return cm / 2.54; }
function poucesToCm(pouces: number): number { return pouces * 2.54; }
function cmToPieds(cm: number): number { return cm / 30.48; }

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

interface Parsed {
  valeur: number;
  de: "cm" | "pouces";
}

function parseSlug(slug: string): Parsed | null {
  const matchCm = slug.match(/^(\d+)-cm-en-pouces$/);
  if (matchCm) return { valeur: parseInt(matchCm[1]), de: "cm" };

  const matchIn = slug.match(/^(\d+)-pouces-en-cm$/);
  if (matchIn) return { valeur: parseInt(matchIn[1]), de: "pouces" };

  return null;
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const cm of CM_VALS) slugs.push(`${cm}-cm-en-pouces`);
  for (const p of POUCES_VALS) slugs.push(`${p}-pouces-en-cm`);
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { valeur, de } = parsed;
  const resultat = de === "cm" ? cmToPouces(valeur) : poucesToCm(valeur);
  const deSymb = de === "cm" ? "cm" : "pouces";
  const versSymb = de === "cm" ? "pouces" : "cm";

  return {
    alternates: { canonical: `/conversion-longueur/${slug}` },
    title: `${valeur} ${deSymb} en ${versSymb} = ${fmtInt(resultat)} ${versSymb}`,
    description: `${valeur} ${deSymb} = ${fmtInt(resultat)} ${versSymb}. Conversion longueur ${de === "cm" ? "centimetres en pouces" : "pouces en centimetres"} avec tableau, formule et equivalences.`,
    keywords: `${valeur} ${deSymb} en ${versSymb}, conversion ${valeur} ${deSymb}, ${deSymb} ${versSymb}, longueur ${valeur}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { valeur, de } = parsed;
  const resultat = de === "cm" ? cmToPouces(valeur) : poucesToCm(valeur);
  const cm = de === "cm" ? valeur : resultat;
  const pieds = cmToPieds(cm);
  const ftFloor = Math.floor(pieds);
  const inReste = Math.round((pieds - ftFloor) * 12);
  const deSymb = de === "cm" ? "cm" : "pouces";
  const versSymb = de === "cm" ? "pouces" : "cm";
  const deLabel = de === "cm" ? "Centimetres" : "Pouces";
  const versLabel = de === "cm" ? "Pouces" : "Centimetres";

  const sourceVals = de === "cm" ? CM_VALS : POUCES_VALS;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien font ${valeur} ${deSymb} en ${versSymb} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${valeur} ${deSymb} = ${fmtInt(resultat)} ${versSymb}. ${de === "cm" ? "Divisez les cm par 2,54 pour obtenir les pouces." : "Multipliez les pouces par 2,54 pour obtenir les cm."}`,
        },
      },
      {
        "@type": "Question",
        name: `Combien font ${valeur} ${deSymb} en pieds ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${valeur} ${deSymb} = ${fmtInt(pieds)} pieds, soit ${ftFloor}'${inReste}".`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${valeur} ${deSymb} en ${versSymb}`} parentPage="Conversion Longueur" parentHref="/conversion-longueur" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📏
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {valeur} {deSymb} en {versLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Conversion de {valeur} {deLabel.toLowerCase()} en {versLabel.toLowerCase()}, pieds et autres unites.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-200 mb-1">{valeur} {deSymb} =</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat)} <span className="text-2xl font-semibold">{versSymb}</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-orange-200">Centimetres</p>
            <p className="font-semibold text-lg">{fmtInt(cm)} cm</p>
          </div>
          <div>
            <p className="text-orange-200">Pouces</p>
            <p className="font-semibold text-lg">{fmtInt(de === "cm" ? resultat : valeur)}&quot;</p>
          </div>
          <div>
            <p className="text-orange-200">Pieds/Pouces</p>
            <p className="font-semibold text-lg">{ftFloor}&apos;{inReste}&quot;</p>
          </div>
        </div>
      </div>

      {/* Calcul detaille */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Calcul detaille</h2>
        <div className="bg-orange-50/50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
          {de === "cm" ? (
            <>
              <p>pouces = cm &divide; 2,54</p>
              <p>pouces = {valeur} &divide; 2,54</p>
              <p className="font-bold text-orange-600">pouces = {fmt(resultat)}</p>
            </>
          ) : (
            <>
              <p>cm = pouces &times; 2,54</p>
              <p>cm = {valeur} &times; 2,54</p>
              <p className="font-bold text-orange-600">cm = {fmt(resultat)}</p>
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
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Pieds</th>
              </tr>
            </thead>
            <tbody>
              {sourceVals.map((v) => {
                const res = de === "cm" ? cmToPouces(v) : poucesToCm(v);
                const p = cmToPieds(de === "cm" ? v : res);
                const fF = Math.floor(p);
                const iR = Math.round((p - fF) * 12);
                return (
                  <tr key={v} className={`border-b border-slate-100 ${v === valeur ? "bg-orange-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {v === valeur ? (
                        <span className="font-bold text-orange-600">{v} {deSymb}</span>
                      ) : (
                        <a href={`/conversion-longueur/${v}-${de === "cm" ? "cm-en-pouces" : "pouces-en-cm"}`} className="text-slate-700 hover:text-orange-600 transition-colors">
                          {v} {deSymb}
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-bold ${v === valeur ? "text-orange-600" : "text-slate-700"}`}>
                      {fmtInt(res)} {versSymb}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">
                      {fF}&apos;{iR}&quot;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Convertisseur interactif</h2>
      <ConvertisseurLongueur />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {valeur} {deSymb} en {versSymb} — Explication
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>{valeur} {deLabel.toLowerCase()}</strong> correspondent a <strong>{fmt(resultat)} {versLabel.toLowerCase()}</strong> (soit {ftFloor} pieds {inReste} pouces).
          {de === "cm" && valeur === 170 && " 170 cm est proche de la taille moyenne d'un homme francais (175,6 cm), soit environ 5'7\"."}
          {de === "cm" && valeur === 180 && " 180 cm correspond a 5'11\", une taille consideree comme grande."}
          {de === "pouces" && valeur === 55 && " Un ecran de 55 pouces fait 139,7 cm de diagonale, c'est une taille populaire pour les televiseurs."}
          {de === "pouces" && valeur === 27 && " Un moniteur de 27 pouces fait 68,6 cm de diagonale, tres populaire pour le travail et le gaming."}
        </p>
        <p className="text-slate-600 leading-relaxed">
          La conversion repose sur la relation exacte : <strong>1 pouce = 2,54 cm</strong>, definie internationalement depuis 1959.
          Pour une estimation rapide de cm en pouces : <strong>divisez par 2,5</strong> (marge d&apos;erreur &lt; 2%).
        </p>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres conversions</h2>
        <div className="flex flex-wrap gap-2">
          {sourceVals.filter((v) => v !== valeur).slice(0, 10).map((v) => (
            <a
              key={v}
              href={`/conversion-longueur/${v}-${de === "cm" ? "cm-en-pouces" : "pouces-en-cm"}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
            >
              {v} {deSymb}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/conversion-longueur" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
