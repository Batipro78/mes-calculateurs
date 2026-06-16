import { fmtIntBE as fmt } from "@/app/lib/fmt";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurDroitsEnregistrement from "../CalculateurDroitsEnregistrement";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  calculerDroitsEnregistrement,
  type RegionBE,
} from "../droitsEnregistrementCalc";

const PRIX = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000];
const REGIONS: { slug: string; value: RegionBE; label: string }[] = [
  { slug: "wallonie", value: "wallonie", label: "Wallonie" },
  { slug: "flandre", value: "flandre", label: "Flandre" },
  { slug: "bruxelles", value: "bruxelles", label: "Bruxelles" },
];
const STATUTS: { slug: string; unique: boolean; label: string }[] = [
  { slug: "habitation-unique", unique: true, label: "Habitation propre & unique" },
  { slug: "investissement", unique: false, label: "Investissement / 2e bien" },
];

type Parsed = {
  prix: number;
  region: typeof REGIONS[number];
  statut: typeof STATUTS[number];
};

function parseSlug(slug: string): Parsed | null {
  const m = slug.match(/^(\d+)-euros-(wallonie|flandre|bruxelles)-(habitation-unique|investissement)$/);
  if (!m) return null;
  const prix = parseInt(m[1], 10);
  const region = REGIONS.find((r) => r.slug === m[2]);
  const statut = STATUTS.find((s) => s.slug === m[3]);
  if (!region || !statut || !PRIX.includes(prix)) return null;
  return { prix, region, statut };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const p of PRIX) {
    for (const r of REGIONS) {
      for (const s of STATUTS) {
        params.push({ params: `${p}-euros-${r.slug}-${s.slug}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const res = calculerDroitsEnregistrement(
    parsed.region.value,
    parsed.prix,
    parsed.statut.unique,
  );

  return {
    alternates: { canonical: `/be/droits-enregistrement/${slug}` },
    title: `Droits enregistrement ${parsed.region.label} ${parsed.prix} EUR - ${parsed.statut.label}`,
    description: `Droits d'enregistrement en ${parsed.region.label} pour un bien de ${fmt(parsed.prix)} EUR (${parsed.statut.label.toLowerCase()}) : ${fmt(res.droitsEnregistrement)} EUR au taux de ${res.tauxApplique} %.`,
    keywords: `droits enregistrement ${parsed.region.slug}, ${parsed.prix} euros ${parsed.region.slug}, achat immobilier belgique`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const res = calculerDroitsEnregistrement(
    parsed.region.value,
    parsed.prix,
    parsed.statut.unique,
  );

  // Comparaison entre regions
  const comparaisonRegions = REGIONS.map((r) => ({
    region: r,
    res: calculerDroitsEnregistrement(r.value, parsed.prix, parsed.statut.unique),
  }));

  const pctDuPrix = parsed.prix > 0 ? (res.droitsEnregistrement / parsed.prix) * 100 : 0;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coutent les droits d'enregistrement en ${parsed.region.label} pour un bien de ${fmt(parsed.prix)} EUR ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En ${parsed.region.label}, pour ${parsed.statut.label.toLowerCase()} a ${fmt(parsed.prix)} EUR, les droits d'enregistrement s'elevent a ${fmt(res.droitsEnregistrement)} EUR (taux ${res.tauxApplique} %${res.abattementApplique > 0 ? `, abattement ${fmt(res.abattementApplique)} EUR sur la 1re tranche` : ""}). Cela represente ${pctDuPrix.toFixed(2)} % du prix d'achat.`,
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
        currentPage={`${fmt(parsed.prix)} EUR en ${parsed.region.label}`}
        parentPage="Droits d'enregistrement"
        parentHref="/be/droits-enregistrement"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Droits d&apos;enregistrement {parsed.region.label} : {fmt(parsed.prix)} EUR
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {parsed.statut.label} en {parsed.region.label}, baremes 2026.
      </p>

      <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-8 shadow-lg shadow-rose-200/50 mb-8">
        <p className="text-rose-100 mb-1">Droits d&apos;enregistrement</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(res.droitsEnregistrement)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-rose-100 mt-2 text-sm">
          Soit {pctDuPrix.toFixed(2)} % du prix d&apos;achat (taux applique :{" "}
          {res.tauxApplique} %)
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Detail du calcul
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Prix d&apos;achat</span>
            <span className="font-semibold text-slate-700">
              {fmt(parsed.prix)} EUR
            </span>
          </div>
          {res.abattementApplique > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">
                - Abattement (1re tranche)
              </span>
              <span className="font-semibold text-emerald-600">
                -{fmt(res.abattementApplique)} EUR
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500">Base taxable</span>
            <span className="font-semibold text-slate-700">
              {fmt(res.baseTaxable)} EUR
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-100">
            <span className="font-medium text-slate-600">
              x {res.tauxApplique} %
            </span>
            <span className="font-bold text-rose-600">
              {fmt(res.droitsEnregistrement)} EUR
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison entre regions (meme prix & statut)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Region
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Taux
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Droits
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {comparaisonRegions.map((c) => (
                <tr
                  key={c.region.slug}
                  className={`border-b border-slate-100 ${
                    c.region.slug === parsed.region.slug ? "bg-rose-50/40" : ""
                  }`}
                >
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {c.region.label}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {c.res.tauxApplique} %
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-rose-600">
                    {fmt(c.res.droitsEnregistrement)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/droits-enregistrement/${parsed.prix}-euros-${c.region.slug}-${parsed.statut.slug}`}
                      className="text-rose-600 hover:underline text-xs font-medium"
                    >
                      voir →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurDroitsEnregistrement />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre ce calcul
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour l&apos;achat d&apos;un bien de <strong>{fmt(parsed.prix)} EUR</strong>{" "}
          en <strong>{parsed.region.label}</strong> destine a{" "}
          {parsed.statut.unique ? (
            <strong>devenir votre habitation propre et unique</strong>
          ) : (
            <strong>un investissement ou une residence secondaire</strong>
          )}
          , le taux applique est de <strong>{res.tauxApplique} %</strong>
          {res.abattementApplique > 0 && (
            <>
              {" "}avec un <strong>abattement de {fmt(res.abattementApplique)} EUR</strong> sur la premiere tranche
            </>
          )}
          . Vous devrez donc payer <strong>{fmt(res.droitsEnregistrement)} EUR</strong>{" "}
          de droits d&apos;enregistrement.
        </p>
        <p className="text-slate-600 leading-relaxed">
          A ces droits s&apos;ajoutent les honoraires du notaire (baremes
          regules, ~1 % du prix), les debours administratifs (~500 a 1 500
          EUR), la TVA 21 % sur les honoraires, et les frais
          d&apos;inscription hypothecaire si vous contractez un pret. Le total
          des frais d&apos;acquisition tournera autour de{" "}
          {parsed.statut.unique
            ? "4 a 8 % du prix"
            : "12 a 15 % du prix"}
          .
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres prix en {parsed.region.label} ({parsed.statut.label})
        </h3>
        <div className="flex flex-wrap gap-2">
          {PRIX.filter((p) => p !== parsed.prix).map((p) => (
            <a
              key={p}
              href={`/be/droits-enregistrement/${p}-euros-${parsed.region.slug}-${parsed.statut.slug}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50 transition-all"
            >
              {fmt(p)} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
