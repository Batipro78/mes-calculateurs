import type { Metadata } from "next";
import SimulateurRenteViagere from "../SimulateurRenteViagere";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerRente, fmtEur } from "../renteViagereCalc";

const CAPITAUX = [50000, 100000, 150000, 200000, 300000, 500000, 750000, 1000000];
const AGES = [55, 60, 65, 70, 75];

function parseSlug(slug: string): { capital: number; age: number } | null {
  const m = slug.match(/^(\d+)-euros-a-(\d+)-ans$/);
  if (!m) return null;
  return { capital: parseInt(m[1]), age: parseInt(m[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const c of CAPITAUX) {
    for (const a of AGES) {
      params.push({ params: `${c}-euros-a-${a}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { capital, age } = parsed;
  const res = calculerRente({
    capital, ageAuVersement: age, typeContrat: "assurance-vie", reversionConjoint: false,
  });

  return {
    alternates: { canonical: `/simulateur-rente-viagere/${slug}` },
    title: `Rente viagere ${capital.toLocaleString("fr-FR")} EUR a ${age} ans - Simulation 2026`,
    description: `Convertir ${capital.toLocaleString("fr-FR")} EUR en rente viagere a ${age} ans : ${fmtEur(res.renteNetteMensuelle)}/mois net (${fmtEur(res.renteNetteAnnuelle)}/an), taux de conversion ${res.tauxConversion.toFixed(2)}%. Abattement fiscal ${res.abattementFiscal}%.`,
    keywords: `rente viagere ${capital} euros, rente ${age} ans, conversion ${capital} euros rente, rente viagere ${age} ans`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { capital, age } = parsed;
  if (!CAPITAUX.includes(capital) || !AGES.includes(age)) notFound();

  const resSimple = calculerRente({ capital, ageAuVersement: age, typeContrat: "assurance-vie", reversionConjoint: false });
  const resReversion = calculerRente({ capital, ageAuVersement: age, typeContrat: "assurance-vie", reversionConjoint: true });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle rente viagere pour ${capital.toLocaleString("fr-FR")} EUR a ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Un capital de ${capital.toLocaleString("fr-FR")} EUR converti en rente viagere a ${age} ans (sans reversion) genere environ ${fmtEur(resSimple.renteMensuelle)}/mois brut, soit ${fmtEur(resSimple.renteNetteMensuelle)}/mois net apres fiscalite (TMI 30% + PS 17,2% sur ${resSimple.fractionImposable}% imposable). Rente annuelle nette : ${fmtEur(resSimple.renteNetteAnnuelle)}. Taux de conversion ${resSimple.tauxConversion.toFixed(2)}%.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={`${capital.toLocaleString("fr-FR")} EUR a ${age} ans`}
        parentPage="Simulateur Rente Viagere"
        parentHref="/simulateur-rente-viagere"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Rente viagere : {capital.toLocaleString("fr-FR")} EUR a {age} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Conversion d&apos;un capital de {capital.toLocaleString("fr-FR")} EUR en rente viagere debutant a {age} ans.
      </p>

      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-100 mb-1">Rente mensuelle nette (sans reversion)</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(resSimple.renteNetteMensuelle)}</p>
        <p className="text-amber-100 mt-2">a vie — taux de conversion {resSimple.tauxConversion.toFixed(2)}%</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-amber-100">Rente brute/mois</p>
            <p className="font-semibold">{fmtEur(resSimple.renteMensuelle)}</p>
          </div>
          <div>
            <p className="text-amber-100">Abattement fiscal</p>
            <p className="font-semibold">{resSimple.abattementFiscal}%</p>
          </div>
          <div>
            <p className="text-amber-100">Rente annuelle nette</p>
            <p className="font-semibold">{fmtEur(resSimple.renteNetteAnnuelle)}</p>
          </div>
        </div>
      </div>

      {/* Comparaison avec reversion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Sans reversion vs avec reversion conjoint</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Option</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Rente brute/mois</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Rente nette/mois</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-2.5 px-2 text-slate-700">Sans reversion</td>
              <td className="py-2.5 px-2 text-right font-bold text-amber-600">{resSimple.tauxConversion.toFixed(2)}%</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtEur(resSimple.renteMensuelle)}</td>
              <td className="py-2.5 px-2 text-right font-bold text-emerald-600">{fmtEur(resSimple.renteNetteMensuelle)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2.5 px-2 text-slate-700">Avec reversion conjoint</td>
              <td className="py-2.5 px-2 text-right font-bold text-amber-600">{resReversion.tauxConversion.toFixed(2)}%</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtEur(resReversion.renteMensuelle)}</td>
              <td className="py-2.5 px-2 text-right font-bold text-emerald-600">{fmtEur(resReversion.renteNetteMensuelle)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <SimulateurRenteViagere />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {CAPITAUX.filter(c => c !== capital).slice(0, 6).map(c => (
            <a key={c} href={`/simulateur-rente-viagere/${c}-euros-a-${age}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all">
              {c.toLocaleString("fr-FR")} EUR
            </a>
          ))}
          {AGES.filter(a => a !== age).map(a => (
            <a key={a} href={`/simulateur-rente-viagere/${capital}-euros-a-${a}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all">
              a {a} ans
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-rente-viagere" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
