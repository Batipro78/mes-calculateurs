import type { Metadata } from "next";
import ConvertisseurDevises from "../ConvertisseurDevises";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface Devise {
  code: string;
  slug: string;
  nom: string;
  symbole: string;
  taux: number;
}

const DEVISES: Devise[] = [
  { code: "EUR", slug: "eur", nom: "Euro", symbole: "EUR", taux: 1 },
  { code: "USD", slug: "usd", nom: "Dollar americain", symbole: "$", taux: 1.0856 },
  { code: "GBP", slug: "gbp", nom: "Livre sterling", symbole: "£", taux: 0.8612 },
  { code: "CHF", slug: "chf", nom: "Franc suisse", symbole: "CHF", taux: 0.9541 },
  { code: "CAD", slug: "cad", nom: "Dollar canadien", symbole: "CA$", taux: 1.4732 },
  { code: "JPY", slug: "jpy", nom: "Yen japonais", symbole: "¥", taux: 162.45 },
  { code: "MAD", slug: "mad", nom: "Dirham marocain", symbole: "MAD", taux: 10.75 },
  { code: "TND", slug: "tnd", nom: "Dinar tunisien", symbole: "TND", taux: 3.38 },
  { code: "DZD", slug: "dzd", nom: "Dinar algerien", symbole: "DZD", taux: 145.82 },
  { code: "CNY", slug: "cny", nom: "Yuan chinois", symbole: "¥", taux: 7.89 },
  { code: "TRY", slug: "try", nom: "Livre turque", symbole: "TRY", taux: 38.92 },
  { code: "AED", slug: "aed", nom: "Dirham des EAU", symbole: "AED", taux: 3.99 },
  { code: "XOF", slug: "xof", nom: "Franc CFA (BCEAO)", symbole: "CFA", taux: 655.957 },
];

const MONTANTS = [100, 500, 1000, 2000, 5000, 10000];

// Paires populaires (toujours depuis EUR)
const PAIRES_DEPUIS_EUR = DEVISES.filter((d) => d.code !== "EUR");

function fmt(n: number, dec = 2): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseSlug(slug: string): { montant: number; deviseSlug: string } | null {
  const match = slug.match(/^(\d+)-euros-en-(.+)$/);
  if (!match) return null;
  return { montant: parseInt(match[1]), deviseSlug: match[2] };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const d of PAIRES_DEPUIS_EUR) {
      params.push({ params: `${m}-euros-en-${d.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, deviseSlug } = parsed;
  const devise = DEVISES.find((d) => d.slug === deviseSlug);
  if (!devise) return {};

  const resultat = montant * devise.taux;

  return {
    title: `${fmtInt(montant)} EUR en ${devise.code} - Conversion Euro ${devise.nom} (2026)`,
    description: `${fmtInt(montant)} euros en ${devise.nom} = ${fmt(resultat)} ${devise.code}. Taux de change 1 EUR = ${fmt(devise.taux, 4)} ${devise.code}. Convertisseur gratuit 2026.`,
    keywords: `${fmtInt(montant)} euros en ${devise.code}, convertir EUR ${devise.code}, ${fmtInt(montant)} EUR ${devise.nom}, taux change euro ${devise.nom}`,
    openGraph: {
      title: `${fmtInt(montant)} EUR = ${fmt(resultat)} ${devise.code}`,
      description: `Conversion : ${fmtInt(montant)} euros = ${fmt(resultat)} ${devise.nom}. Taux : 1 EUR = ${fmt(devise.taux, 4)} ${devise.code}.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, deviseSlug } = parsed;
  const devise = DEVISES.find((d) => d.slug === deviseSlug);
  if (!devise || !MONTANTS.includes(montant)) notFound();

  const resultat = montant * devise.taux;
  const tauxInverse = 1 / devise.taux;

  // Tableau de conversion pour differents montants
  const tableauMontants = MONTANTS.map((m) => ({
    montant: m,
    resultat: m * devise.taux,
    isCurrent: m === montant,
  }));

  // Tableau dans toutes les devises pour ce montant
  const tableauDevises = PAIRES_DEPUIS_EUR.map((d) => ({
    ...d,
    resultat: montant * d.taux,
    isCurrent: d.slug === deviseSlug,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien font ${fmtInt(montant)} euros en ${devise.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${fmtInt(montant)} euros = ${fmt(resultat)} ${devise.code} (${devise.nom}). Taux de change : 1 EUR = ${fmt(devise.taux, 4)} ${devise.code}. Taux indicatif 2026.`,
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
        currentPage={`${fmtInt(montant)} EUR en ${devise.code}`}
        parentPage="Convertisseur Devises"
        parentHref="/convertisseur-devises"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💱
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {fmtInt(montant)} EUR en {devise.code}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Conversion de {fmtInt(montant)} euros en {devise.nom} — taux indicatif 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-sky-200/50 mb-8">
        <p className="text-sky-200 mb-1">{fmtInt(montant)} EUR =</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat)} <span className="text-2xl font-semibold">{devise.code}</span>
        </p>
        <p className="text-sky-200 mt-2">{devise.nom}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-sky-200">1 EUR =</p>
            <p className="font-semibold">{fmt(devise.taux, 4)} {devise.code}</p>
          </div>
          <div>
            <p className="text-sky-200">1 {devise.code} =</p>
            <p className="font-semibold">{fmt(tauxInverse, 4)} EUR</p>
          </div>
        </div>
      </div>

      {/* Tableau montants */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Tableau de conversion EUR / {devise.code}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Euro (EUR)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">{devise.nom} ({devise.code})</th>
              </tr>
            </thead>
            <tbody>
              {tableauMontants.map((row) => (
                <tr key={row.montant} className={`border-b border-slate-100 ${row.isCurrent ? "bg-sky-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-sky-600">{fmtInt(row.montant)} EUR</span>
                    ) : (
                      <a href={`/convertisseur-devises/${row.montant}-euros-en-${deviseSlug}`} className="text-slate-700 hover:text-sky-600 transition-colors">
                        {fmtInt(row.montant)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-sky-600" : "text-slate-700"}`}>
                    {fmt(row.resultat)} {devise.code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toutes les devises pour ce montant */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(montant)} EUR dans toutes les devises
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Devise</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Montant</th>
              </tr>
            </thead>
            <tbody>
              {tableauDevises.map((row) => (
                <tr key={row.slug} className={`border-b border-slate-100 ${row.isCurrent ? "bg-sky-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-sky-600">{row.code} - {row.nom}</span>
                    ) : (
                      <a href={`/convertisseur-devises/${montant}-euros-en-${row.slug}`} className="text-slate-700 hover:text-sky-600 transition-colors">
                        {row.code} - {row.nom}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-sky-600" : "text-slate-700"}`}>
                    {fmt(row.resultat)} {row.code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Convertisseur interactif</h2>
      <ConvertisseurDevises />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Convertir {fmtInt(montant)} euros en {devise.nom}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>{fmtInt(montant)} euros</strong> = <strong>{fmt(resultat)} {devise.code}</strong> ({devise.nom})
          au taux de change indicatif de 1 EUR = {fmt(devise.taux, 4)} {devise.code}.
          Inversement, 1 {devise.code} = {fmt(tauxInverse, 4)} EUR.
        </p>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 mt-4">
          <p className="text-xs text-amber-700">
            Taux indicatifs mis a jour periodiquement. Pour des transactions reelles,
            consultez votre banque ou un service de change. Les frais de conversion
            bancaires ne sont pas inclus.
          </p>
        </div>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres conversions</h2>
        <div className="flex flex-wrap gap-2">
          {PAIRES_DEPUIS_EUR.filter((d) => d.slug !== deviseSlug).slice(0, 6).map((d) => (
            <a
              key={d.slug}
              href={`/convertisseur-devises/${montant}-euros-en-${d.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
            >
              {fmtInt(montant)} EUR en {d.code}
            </a>
          ))}
          {MONTANTS.filter((m) => m !== montant).slice(0, 4).map((m) => (
            <a
              key={m}
              href={`/convertisseur-devises/${m}-euros-en-${deviseSlug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
            >
              {fmtInt(m)} EUR en {devise.code}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-devises" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
