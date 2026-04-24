import type { Metadata } from "next";
import CalculateurIFI from "../CalculateurIFI";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerIFI, fmtEur } from "../ifiCalc";

// Patrimoines SEO : de 1,3M a 10M
const PATRIMOINES = [1400000, 1500000, 1700000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000];

function parseSlug(slug: string): { patrimoine: number } | null {
  const m = slug.match(/^patrimoine-(\d+)-euros$/);
  if (!m) return null;
  return { patrimoine: parseInt(m[1]) };
}

export function generateStaticParams() {
  return PATRIMOINES.map((p) => ({ params: `patrimoine-${p}-euros` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { patrimoine } = parsed;
  // On considere ici le patrimoine NET sans abattement RP (hypothese pour simplification SEO)
  const res = calculerIFI({
    patrimoineImmoBrut: patrimoine, dettesImmobilieres: 0, residencePrincipale: 0, autresAbattements: 0,
  });

  return {
    alternates: { canonical: `/calcul-ifi/${slug}` },
    title: `IFI pour ${patrimoine.toLocaleString("fr-FR")} EUR - Simulation 2026`,
    description: `Calcul de l'IFI 2026 pour un patrimoine immobilier net de ${patrimoine.toLocaleString("fr-FR")} EUR : impot a payer ${fmtEur(res.ifiNet)}. Bareme officiel article 977 CGI.`,
    keywords: `IFI ${patrimoine} euros, calcul IFI ${patrimoine}, impot fortune ${patrimoine} euros, IFI ${patrimoine} 2026`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { patrimoine } = parsed;
  if (!PATRIMOINES.includes(patrimoine)) notFound();

  const res = calculerIFI({
    patrimoineImmoBrut: patrimoine, dettesImmobilieres: 0, residencePrincipale: 0, autresAbattements: 0,
  });

  // Si on inclut une residence principale de 500k, l'IFI baisse de 150k × 0.7% = 1050 EUR typique
  const resAvecRP = calculerIFI({
    patrimoineImmoBrut: patrimoine, dettesImmobilieres: 0, residencePrincipale: 500000, autresAbattements: 0,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien d'IFI pour un patrimoine immobilier de ${patrimoine.toLocaleString("fr-FR")} EUR ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un patrimoine immobilier net de ${patrimoine.toLocaleString("fr-FR")} EUR (sans abattement RP), l'IFI 2026 s'eleve a ${fmtEur(res.ifiNet)}. Avec une residence principale de 500 000 EUR (abattement 30% soit -150 000 EUR), l'IFI tombe a ${fmtEur(resAvecRP.ifiNet)}, soit une economie de ${fmtEur(res.ifiNet - resAvecRP.ifiNet)}.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={`Patrimoine ${patrimoine.toLocaleString("fr-FR")} EUR`}
        parentPage="Calcul IFI"
        parentHref="/calcul-ifi"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏛
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          IFI pour {patrimoine.toLocaleString("fr-FR")} EUR de patrimoine
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul de l&apos;Impot sur la Fortune Immobiliere 2026 pour un patrimoine immobilier net de {patrimoine.toLocaleString("fr-FR")} EUR.
      </p>

      <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg shadow-rose-200/50 mb-8">
        <p className="text-rose-100 mb-1">IFI 2026 estime (sans RP)</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.ifiNet)}</p>
        <p className="text-rose-100 mt-2">
          Patrimoine net : {fmtEur(res.patrimoineNet)}
          {res.decote > 0 && ` — decote ${fmtEur(res.decote)} appliquee`}
        </p>
      </div>

      {/* Comparaison avec abattement RP */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Impact de l&apos;abattement residence principale (30%)</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Scenario</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Patrimoine net</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">IFI a payer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-2.5 px-2 text-slate-700">Sans residence principale</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtEur(res.patrimoineNet)}</td>
              <td className="py-2.5 px-2 text-right font-bold text-rose-600">{fmtEur(res.ifiNet)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2.5 px-2 text-slate-700">Dont RP de 500 000 EUR (abat. 30%)</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtEur(resAvecRP.patrimoineNet)}</td>
              <td className="py-2.5 px-2 text-right font-bold text-emerald-600">{fmtEur(resAvecRP.ifiNet)}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-500 mt-3">
          Economie d&apos;IFI avec l&apos;abattement RP de 500K : {fmtEur(res.ifiNet - resAvecRP.ifiNet)}
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurIFI />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres patrimoines</h2>
        <div className="flex flex-wrap gap-2">
          {PATRIMOINES.filter(p => p !== patrimoine).map(p => (
            <a key={p} href={`/calcul-ifi/patrimoine-${p}-euros`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50 transition-all">
              {p.toLocaleString("fr-FR")} EUR
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-ifi" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
