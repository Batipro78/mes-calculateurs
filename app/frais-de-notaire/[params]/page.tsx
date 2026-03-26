import type { Metadata } from "next";
import CalculateurNotaire from "../CalculateurNotaire";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

type TypeBien = "ancien" | "neuf" | "terrain";

const PRIX = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 600000, 750000, 1000000];
const TYPES: TypeBien[] = ["ancien", "neuf", "terrain"];

const TYPE_LABELS: Record<TypeBien, string> = {
  ancien: "dans l'ancien",
  neuf: "dans le neuf",
  terrain: "terrain",
};

const TYPE_LABELS_SHORT: Record<TypeBien, string> = {
  ancien: "Ancien",
  neuf: "Neuf",
  terrain: "Terrain",
};

const TAUX_DROITS: Record<TypeBien, number> = {
  ancien: 0.05807,
  neuf: 0.0071,
  terrain: 0.05807,
};

const TRANCHES_EMOLUMENTS = [
  { limite: 6500, taux: 0.03870 },
  { limite: 17000, taux: 0.01596 },
  { limite: 60000, taux: 0.01064 },
  { limite: Infinity, taux: 0.00799 },
];

function calculerEmoluments(prix: number): number {
  let emoluments = 0;
  let reste = prix;
  let seuilBas = 0;
  for (const tranche of TRANCHES_EMOLUMENTS) {
    const montantTranche = Math.min(reste, tranche.limite - seuilBas);
    if (montantTranche <= 0) break;
    emoluments += montantTranche * tranche.taux;
    reste -= montantTranche;
    seuilBas = tranche.limite;
  }
  return emoluments;
}

function calculerFrais(prix: number, type: TypeBien) {
  const droitsMutation = prix * TAUX_DROITS[type];
  const emoluments = calculerEmoluments(prix);
  const emolumentsTVA = emoluments * 0.2;
  const debours = Math.min(1500, prix * 0.001) + 400;
  const contributionSecu = prix >= 10000 ? 15 : 0;
  const totalFrais = droitsMutation + emoluments + emolumentsTVA + debours + contributionSecu;
  const pourcentage = prix > 0 ? (totalFrais / prix) * 100 : 0;
  return { droitsMutation, emoluments, emolumentsTVA, debours, contributionSecu, totalFrais, pourcentage };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseSlug(slug: string): { prix: number; type: TypeBien } | null {
  const match = slug.match(/^(\d+)-euros-(ancien|neuf|terrain)$/);
  if (!match) return null;
  return { prix: parseInt(match[1]), type: match[2] as TypeBien };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const p of PRIX) {
    for (const t of TYPES) {
      params.push({ params: `${p}-euros-${t}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { prix, type } = parsed;
  const frais = calculerFrais(prix, type);

  return {
    title: `Frais de notaire ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} - Simulation 2026`,
    description: `Frais de notaire pour un achat de ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} : ${fmt(frais.totalFrais)} EUR (${fmt(frais.pourcentage)}%). Detail : droits de mutation, emoluments, debours. Bareme 2026.`,
    keywords: `frais notaire ${fmtInt(prix)} euros, frais notaire ${type}, achat ${fmtInt(prix)} euros ${type}, simulation notaire ${fmtInt(prix)}`,
    openGraph: {
      title: `Frais de notaire ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} = ${fmt(frais.totalFrais)} EUR`,
      description: `Achat ${TYPE_LABELS[type]} a ${fmtInt(prix)} EUR : frais de notaire estimes a ${fmt(frais.totalFrais)} EUR soit ${fmt(frais.pourcentage)}% du prix.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { prix, type } = parsed;
  if (!PRIX.includes(prix) || !TYPES.includes(type)) notFound();

  const frais = calculerFrais(prix, type);
  const prixTotal = prix + frais.totalFrais;

  // Comparaison par type pour ce prix
  const comparaisonTypes = TYPES.map((t) => {
    const f = calculerFrais(prix, t);
    return { type: t, label: TYPE_LABELS_SHORT[t], totalFrais: f.totalFrais, pourcentage: f.pourcentage, isCurrent: t === type };
  });

  // Comparaison par prix pour ce type
  const comparaisonPrix = PRIX.map((p) => {
    const f = calculerFrais(p, type);
    return { prix: p, totalFrais: f.totalFrais, pourcentage: f.pourcentage, prixTotal: p + f.totalFrais, isCurrent: p === prix };
  });

  const autresPrix = PRIX.filter((p) => p !== prix);
  const autresTypes = TYPES.filter((t) => t !== type);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coutent les frais de notaire pour ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les frais de notaire pour un achat de ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} s'elevent a environ ${fmt(frais.totalFrais)} EUR, soit ${fmt(frais.pourcentage)}% du prix. Le cout total de l'acquisition est de ${fmt(prixTotal)} EUR. Estimation 2026.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le detail des frais de notaire pour ${fmtInt(prix)} EUR ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un achat de ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} : droits de mutation ${fmt(frais.droitsMutation)} EUR, emoluments du notaire ${fmt(frais.emoluments)} EUR (+ ${fmt(frais.emolumentsTVA)} EUR de TVA), debours ${fmt(frais.debours)} EUR.`,
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
        currentPage={`${fmtInt(prix)} EUR - ${TYPE_LABELS_SHORT[type]}`}
        parentPage="Frais de Notaire"
        parentHref="/frais-de-notaire"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Frais de notaire : {fmtInt(prix)} EUR {TYPE_LABELS[type]}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation detaillee des frais de notaire pour un achat de {fmtInt(prix)} EUR {TYPE_LABELS[type]} — bareme 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-cyan-200/50 mb-8">
        <p className="text-cyan-200 mb-1">Frais de notaire estimes</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(frais.totalFrais)} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-cyan-200 mt-2">soit {fmt(frais.pourcentage)}% du prix d&apos;achat</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-cyan-200">Prix du bien</p>
            <p className="font-semibold">{fmtInt(prix)} EUR</p>
          </div>
          <div>
            <p className="text-cyan-200">Frais</p>
            <p className="font-semibold">{fmt(frais.totalFrais)} EUR</p>
          </div>
          <div>
            <p className="text-cyan-200">Cout total</p>
            <p className="font-semibold">{fmt(prixTotal)} EUR</p>
          </div>
        </div>
      </div>

      {/* Detail des frais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Droits de mutation</p>
          <p className="text-2xl font-extrabold text-cyan-600">{fmt(frais.droitsMutation)} EUR</p>
          <p className="text-xs text-slate-400 mt-1">Taxes Etat + departement</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Emoluments notaire</p>
          <p className="text-2xl font-extrabold text-slate-800">{fmt(frais.emoluments)} EUR</p>
          <p className="text-xs text-slate-400 mt-1">+ {fmt(frais.emolumentsTVA)} EUR TVA</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Debours</p>
          <p className="text-2xl font-extrabold text-slate-800">{fmt(frais.debours)} EUR</p>
          <p className="text-xs text-slate-400 mt-1">Formalites administratives</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Part des frais</p>
          <p className="text-2xl font-extrabold text-amber-500">{fmt(frais.pourcentage)}%</p>
          <p className="text-xs text-slate-400 mt-1">Du prix d&apos;achat</p>
        </div>
      </div>

      {/* Barre visuelle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-8">
        <p className="text-xs font-medium text-slate-400 mb-3">Repartition du cout total</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{ width: `${(prix / prixTotal) * 100}%` }}
          />
          <div
            className="bg-amber-300"
            style={{ width: `${(frais.totalFrais / prixTotal) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-cyan-600 font-medium">Prix du bien ({fmtInt(prix)} EUR)</span>
          <span className="text-amber-500 font-medium">Frais ({fmt(frais.totalFrais)} EUR)</span>
        </div>
      </div>

      {/* Comparaison par type */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(prix)} EUR : frais selon le type de bien
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Type</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Frais de notaire</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Pourcentage</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout total</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonTypes.map((row) => (
                <tr key={row.type} className={`border-b border-slate-100 ${row.isCurrent ? "bg-cyan-50/50" : ""}`}>
                  <td className="py-3 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-cyan-600">{row.label}</span>
                    ) : (
                      <a href={`/frais-de-notaire/${prix}-euros-${row.type}`} className="text-slate-700 hover:text-cyan-600 transition-colors">
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className={`py-3 px-2 text-right font-bold ${row.isCurrent ? "text-cyan-600" : "text-slate-700"}`}>
                    {fmt(row.totalFrais)} EUR
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt(row.pourcentage)}%</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt(prix + row.totalFrais)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par prix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Frais de notaire {TYPE_LABELS[type]} par prix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prix du bien</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Frais de notaire</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout total</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPrix.map((row) => (
                <tr key={row.prix} className={`border-b border-slate-100 ${row.isCurrent ? "bg-cyan-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-cyan-600">{fmtInt(row.prix)} EUR</span>
                    ) : (
                      <a href={`/frais-de-notaire/${row.prix}-euros-${type}`} className="text-slate-700 hover:text-cyan-600 transition-colors">
                        {fmtInt(row.prix)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-cyan-600" : "text-slate-700"}`}>
                    {fmt(row.totalFrais)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.prixTotal)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurNotaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Frais de notaire pour un achat de {fmtInt(prix)} EUR {TYPE_LABELS[type]} en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un achat immobilier de <strong>{fmtInt(prix)} EUR {TYPE_LABELS[type]}</strong>, les frais
          de notaire s&apos;elevent a environ <strong>{fmt(frais.totalFrais)} EUR</strong>, soit{" "}
          <strong>{fmt(frais.pourcentage)}%</strong> du prix. Le cout total de votre acquisition sera
          de <strong>{fmt(prixTotal)} EUR</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les droits de mutation representent la plus grande part ({fmt(frais.droitsMutation)} EUR),
          suivis des emoluments du notaire ({fmt(frais.emoluments)} EUR HT) et des debours
          ({fmt(frais.debours)} EUR). Ces frais sont a regler le jour de la signature de l&apos;acte
          authentique chez le notaire.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Conseils pour reduire vos frais</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Deduisez la valeur du mobilier (cuisine equipee, meubles) du prix de vente</li>
          <li>Negociez une remise sur les emoluments (possible au-dela de 100 000 EUR)</li>
          <li>Comparez ancien vs neuf : les frais sont 3x moins eleves dans le neuf</li>
          <li>Prevoyez ces frais dans votre plan de financement (non inclus dans le pret)</li>
        </ul>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {autresTypes.map((t) => (
            <a
              key={t}
              href={`/frais-de-notaire/${prix}-euros-${t}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all"
            >
              {fmtInt(prix)} EUR - {TYPE_LABELS_SHORT[t]}
            </a>
          ))}
          {autresPrix.slice(0, 6).map((p) => (
            <a
              key={p}
              href={`/frais-de-notaire/${p}-euros-${type}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all"
            >
              {fmtInt(p)} EUR - {TYPE_LABELS_SHORT[type]}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/frais-de-notaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
