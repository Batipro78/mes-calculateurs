import type { Metadata } from "next";
import CalculateurPourcentage from "../CalculateurPourcentage";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const POURCENTAGES = [5, 10, 15, 20, 25, 30, 50, 75];
const VALEURS = [100, 200, 500, 1000, 1500, 2000, 5000];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseSlug(slug: string): { pourcent: number; valeur: number } | null {
  const match = slug.match(/^(\d+)-pourcent-de-(\d+)$/);
  if (!match) return null;
  return { pourcent: parseInt(match[1]), valeur: parseInt(match[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const p of POURCENTAGES) {
    for (const v of VALEURS) {
      params.push({ params: `${p}-pourcent-de-${v}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { pourcent, valeur } = parsed;
  const resultat = valeur * (pourcent / 100);

  return {
    alternates: { canonical: `/calcul-pourcentage/${slug}` },
    title: `${pourcent}% de ${fmtInt(valeur)} = ${fmt(resultat)} - Calcul pourcentage`,
    description: `Combien fait ${pourcent}% de ${fmtInt(valeur)} ? Resultat : ${fmt(resultat)}. Calculateur de pourcentage gratuit avec explications detaillees.`,
    keywords: `${pourcent} pourcent de ${valeur}, ${pourcent}% de ${valeur}, calcul ${pourcent} pourcentage ${valeur}, combien fait ${pourcent} pour cent de ${valeur}`,
    openGraph: {
      title: `${pourcent}% de ${fmtInt(valeur)} = ${fmt(resultat)}`,
      description: `Calcul rapide : ${pourcent}% de ${fmtInt(valeur)} = ${fmt(resultat)}. Decouvrez la methode de calcul et d'autres pourcentages.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { pourcent, valeur } = parsed;
  if (!POURCENTAGES.includes(pourcent) || !VALEURS.includes(valeur)) notFound();

  const resultat = valeur * (pourcent / 100);

  // Tableau avec tous les pourcentages pour cette valeur
  const tableauPourcentages = POURCENTAGES.map((p) => ({
    pourcent: p,
    resultat: valeur * (p / 100),
    isCurrent: p === pourcent,
  }));

  // Tableau avec toutes les valeurs pour ce pourcentage
  const tableauValeurs = VALEURS.map((v) => ({
    valeur: v,
    resultat: v * (pourcent / 100),
    isCurrent: v === valeur,
  }));

  const breadcrumbLabel = `${pourcent}% de ${fmtInt(valeur)}`;

  // Liens proches
  const autresPourcentages = POURCENTAGES.filter((p) => p !== pourcent).slice(0, 4);
  const autresValeurs = VALEURS.filter((v) => v !== valeur).slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien fait ${pourcent}% de ${fmtInt(valeur)} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${pourcent}% de ${fmtInt(valeur)} = ${fmt(resultat)}. Le calcul est : ${fmtInt(valeur)} x ${pourcent} / 100 = ${fmt(resultat)}.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment calculer ${pourcent}% d'un nombre ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour calculer ${pourcent}% d'un nombre, multipliez ce nombre par ${pourcent / 100}. Par exemple, ${pourcent}% de ${fmtInt(valeur)} = ${fmtInt(valeur)} x ${pourcent / 100} = ${fmt(resultat)}.`,
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
        parentPage="Calcul Pourcentage"
        parentHref="/calcul-pourcentage"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {pourcent}% de {fmtInt(valeur)} = {fmt(resultat)}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul detaille de {pourcent} pour cent de {fmtInt(valeur)} avec explications et tableau comparatif.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-100 mb-1">{pourcent}% de {fmtInt(valeur)} =</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(resultat)}</p>
        <div className="h-px bg-white/20 my-4" />
        <p className="text-sm text-orange-200">
          Formule : {fmtInt(valeur)} x {pourcent} / 100 = {fmt(resultat)}
        </p>
      </div>

      {/* Methode de calcul */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Methode de calcul</h2>
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500 mb-1">Etape 1 : Convertir le pourcentage en decimal</p>
            <p className="font-mono text-slate-700">{pourcent}% = {pourcent} / 100 = {pourcent / 100}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500 mb-1">Etape 2 : Multiplier par la valeur</p>
            <p className="font-mono text-slate-700">{fmtInt(valeur)} x {pourcent / 100} = {fmt(resultat)}</p>
          </div>
        </div>
      </div>

      {/* Tableau : tous les % de cette valeur */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Tous les pourcentages de {fmtInt(valeur)}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Pourcentage</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Resultat</th>
              </tr>
            </thead>
            <tbody>
              {tableauPourcentages.map((row) => (
                <tr key={row.pourcent} className={`border-b border-slate-100 ${row.isCurrent ? "bg-orange-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-orange-600">{row.pourcent}% de {fmtInt(valeur)}</span>
                    ) : (
                      <a href={`/calcul-pourcentage/${row.pourcent}-pourcent-de-${valeur}`} className="text-slate-700 hover:text-orange-600 transition-colors">
                        {row.pourcent}% de {fmtInt(valeur)}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-orange-600" : "text-slate-700"}`}>
                    {fmt(row.resultat)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau : ce % de toutes les valeurs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {pourcent}% de differentes valeurs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Calcul</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Resultat</th>
              </tr>
            </thead>
            <tbody>
              {tableauValeurs.map((row) => (
                <tr key={row.valeur} className={`border-b border-slate-100 ${row.isCurrent ? "bg-orange-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-orange-600">{pourcent}% de {fmtInt(row.valeur)}</span>
                    ) : (
                      <a href={`/calcul-pourcentage/${pourcent}-pourcent-de-${row.valeur}`} className="text-slate-700 hover:text-orange-600 transition-colors">
                        {pourcent}% de {fmtInt(row.valeur)}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-orange-600" : "text-slate-700"}`}>
                    {fmt(row.resultat)}
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
      <CalculateurPourcentage />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte explicatif */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre le calcul de {pourcent}% de {fmtInt(valeur)}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Calculer <strong>{pourcent}%</strong> de <strong>{fmtInt(valeur)}</strong> revient a trouver
          quelle part de {fmtInt(valeur)} represente {pourcent} centiemes. Le resultat
          est <strong>{fmt(resultat)}</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ce type de calcul est courant dans la vie quotidienne : soldes ({pourcent}% de remise
          sur un article a {fmtInt(valeur)} EUR = {fmt(resultat)} EUR d&apos;economie),
          pourboires, augmentations de salaire, ou encore calcul de TVA.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Astuce de calcul mental</h3>
        <p className="text-slate-600 leading-relaxed">
          {pourcent === 10
            ? `Pour calculer 10% d'un nombre, il suffit de diviser par 10. Donc 10% de ${fmtInt(valeur)} = ${fmt(resultat)}.`
            : pourcent === 50
              ? `Pour calculer 50% d'un nombre, il suffit de diviser par 2. Donc 50% de ${fmtInt(valeur)} = ${fmt(resultat)}.`
              : pourcent === 25
                ? `Pour calculer 25% d'un nombre, divisez par 4. Donc 25% de ${fmtInt(valeur)} = ${fmt(resultat)}.`
                : pourcent === 20
                  ? `Pour calculer 20% d'un nombre, divisez par 5. Donc 20% de ${fmtInt(valeur)} = ${fmt(resultat)}.`
                  : `Pour calculer ${pourcent}% mentalement, vous pouvez d'abord trouver 10% (${fmt(valeur * 0.1)}) puis ajuster. ${pourcent}% de ${fmtInt(valeur)} = ${fmt(resultat)}.`}
        </p>
      </section>

      {/* Liens vers autres calculs */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres calculs</h2>
        <div className="flex flex-wrap gap-2">
          {autresPourcentages.map((p) => (
            <a
              key={`p-${p}`}
              href={`/calcul-pourcentage/${p}-pourcent-de-${valeur}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
            >
              {p}% de {fmtInt(valeur)}
            </a>
          ))}
          {autresValeurs.map((v) => (
            <a
              key={`v-${v}`}
              href={`/calcul-pourcentage/${pourcent}-pourcent-de-${v}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
            >
              {pourcent}% de {fmtInt(v)}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-pourcentage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
