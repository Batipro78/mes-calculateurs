import type { Metadata } from "next";
import CalculateurNotaire from "../CalculateurNotaire";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

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
  for (const s of getVillesSlugs()) {
    params.push({ params: s });
  }
  return params;
}

// Prix median approximatif par coefficient (base nationale 2026)
function prixMedianVille(ville: Ville): number {
  return Math.round(250000 * ville.coefficient);
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) {
    const prixMedian = prixMedianVille(ville);
    const fraisMedian = calculerFrais(prixMedian, "ancien");
    return {
      alternates: { canonical: `/frais-de-notaire/${slug}` },
      title: `Frais de notaire a ${ville.nom} (${ville.departement}) - Simulation 2026`,
      description: `Calcul des frais de notaire a ${ville.nom} en 2026. Pour un bien de ${fmtInt(prixMedian)} EUR (prix median local), frais estimes a ${fmt(fraisMedian.totalFrais)} EUR dans l'ancien. Bareme 2026 et exemples par prix.`,
      keywords: `frais notaire ${ville.nom.toLowerCase()}, frais notaire ${ville.departement}, cout notaire ${ville.nom.toLowerCase()}, simulation notaire ${ville.nom.toLowerCase()}, achat immobilier ${ville.nom.toLowerCase()}`,
      openGraph: {
        title: `Frais de notaire a ${ville.nom} - Estimation 2026`,
        description: `Simulation frais de notaire a ${ville.nom} : ${fmt(fraisMedian.totalFrais)} EUR pour un bien de ${fmtInt(prixMedian)} EUR dans l'ancien.`,
      },
    };
  }

  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { prix, type } = parsed;
  const frais = calculerFrais(prix, type);

  return {
    alternates: { canonical: `/frais-de-notaire/${slug}` },
    title: `Frais de notaire ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} - Simulation 2026`,
    description: `Frais de notaire pour un achat de ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} : ${fmt(frais.totalFrais)} EUR (${fmt(frais.pourcentage)}%). Detail : droits de mutation, emoluments, debours. Bareme 2026.`,
    keywords: `frais notaire ${fmtInt(prix)} euros, frais notaire ${type}, achat ${fmtInt(prix)} euros ${type}, simulation notaire ${fmtInt(prix)}`,
    openGraph: {
      title: `Frais de notaire ${fmtInt(prix)} EUR ${TYPE_LABELS[type]} = ${fmt(frais.totalFrais)} EUR`,
      description: `Achat ${TYPE_LABELS[type]} a ${fmtInt(prix)} EUR : frais de notaire estimes a ${fmt(frais.totalFrais)} EUR soit ${fmt(frais.pourcentage)}% du prix.`,
    },
  };
}

function VilleNotairePage({ ville }: { ville: Ville }) {
  const prixMedian = prixMedianVille(ville);
  const fraisMedianAncien = calculerFrais(prixMedian, "ancien");
  const fraisMedianNeuf = calculerFrais(prixMedian, "neuf");

  // Tableau par tranche de prix adaptee a la ville
  const brackets = [
    Math.round(prixMedian * 0.5),
    Math.round(prixMedian * 0.7),
    prixMedian,
    Math.round(prixMedian * 1.3),
    Math.round(prixMedian * 1.7),
    Math.round(prixMedian * 2.5),
  ];

  const autresVilles = VILLES.filter((v) => v.slug !== ville.slug).slice(0, 12);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coutent les frais de notaire a ${ville.nom} en 2026 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${ville.nom}, les frais de notaire dans l'ancien representent environ 7-8% du prix d'achat. Pour un bien de ${fmtInt(prixMedian)} EUR (prix median local), les frais sont estimes a ${fmt(fraisMedianAncien.totalFrais)} EUR (${fmt(fraisMedianAncien.pourcentage)}%). Dans le neuf, ils tombent a ${fmt(fraisMedianNeuf.totalFrais)} EUR (2-3%).`,
        },
      },
      {
        "@type": "Question",
        name: `Les frais de notaire sont-ils differents a ${ville.nom} qu'ailleurs en France ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Non, le bareme des frais de notaire est national et identique a ${ville.nom} que dans le reste de la France : 5,80% de droits de mutation dans l'ancien, 0,71% dans le neuf. Ce qui varie, c'est le prix du bien : a ${ville.nom} (${ville.departement}), les prix au m2 etant differents, les frais en valeur absolue le sont aussi.`,
        },
      },
      {
        "@type": "Question",
        name: `Qui paye les frais de notaire a ${ville.nom} : acheteur ou vendeur ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${ville.nom} comme partout en France, les frais de notaire sont a la charge de l'acheteur. Ils doivent etre payes le jour de la signature de l'acte authentique chez le notaire, en plus du prix de vente. Ils ne sont pas inclus dans le pret immobilier.`,
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
        currentPage={`Frais de notaire a ${ville.nom}`}
        parentPage="Frais de Notaire"
        parentHref="/frais-de-notaire"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Frais de notaire a {ville.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation des frais de notaire a {ville.nom} ({ville.departement}) — bareme national 2026, exemples par prix local.
      </p>

      {/* Resultat median */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-cyan-200/50 mb-8">
        <p className="text-cyan-200 mb-1">Frais de notaire a {ville.nom} — exemple median</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(fraisMedianAncien.totalFrais)} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-cyan-200 mt-2">
          Pour un bien ancien de {fmtInt(prixMedian)} EUR (prix median a {ville.nom})
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-cyan-200">Prix median local</p>
            <p className="font-semibold">{fmtInt(prixMedian)} EUR</p>
          </div>
          <div>
            <p className="text-cyan-200">Frais (ancien)</p>
            <p className="font-semibold">{fmt(fraisMedianAncien.totalFrais)} EUR</p>
          </div>
          <div>
            <p className="text-cyan-200">Frais (neuf)</p>
            <p className="font-semibold">{fmt(fraisMedianNeuf.totalFrais)} EUR</p>
          </div>
        </div>
      </div>

      {/* Tableau des frais par tranche de prix a cette ville */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Frais de notaire a {ville.nom} — par tranche de prix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prix du bien</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Frais ancien</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Frais neuf</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Simulation</th>
              </tr>
            </thead>
            <tbody>
              {brackets.map((p) => {
                const nearestPrix = PRIX.reduce((prev, curr) => Math.abs(curr - p) < Math.abs(prev - p) ? curr : prev, PRIX[0]);
                const fAncien = calculerFrais(p, "ancien");
                const fNeuf = calculerFrais(p, "neuf");
                return (
                  <tr key={p} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700 font-medium">{fmtInt(p)} EUR</td>
                    <td className="py-2.5 px-2 text-right font-bold text-cyan-600">{fmt(fAncien.totalFrais)} EUR</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{fmt(fNeuf.totalFrais)} EUR</td>
                    <td className="py-2.5 px-2 text-right">
                      <a href={`/frais-de-notaire/${nearestPrix}-euros-ancien`} className="text-cyan-600 hover:underline text-xs font-medium">
                        voir {fmtInt(nearestPrix)} EUR &rarr;
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurNotaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO localise */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Frais de notaire a {ville.nom} en 2026 : ce qu&apos;il faut savoir
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom}</strong> ({ville.departement}, code postal {ville.codePostal}), les frais de notaire
          suivent le meme bareme national que dans le reste de la France. Pour un bien immobilier dans l&apos;ancien,
          comptez environ <strong>7 a 8% du prix d&apos;achat</strong>. Dans le neuf, ces frais tombent a
          <strong> 2 a 3%</strong> grace a un taux reduit de droits de mutation.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un bien au prix median a {ville.nom} (~{fmtInt(prixMedian)} EUR), les {ville.gentile} doivent prevoir
          environ <strong>{fmt(fraisMedianAncien.totalFrais)} EUR</strong> de frais de notaire dans l&apos;ancien,
          soit <strong>{fmt(fraisMedianAncien.pourcentage)}%</strong> du prix d&apos;achat. Ces frais couvrent :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Droits de mutation</strong> : {fmt(fraisMedianAncien.droitsMutation)} EUR (taxes Etat + departement {ville.departement})</li>
          <li><strong>Emoluments du notaire</strong> : {fmt(fraisMedianAncien.emoluments)} EUR HT (remuneration du notaire)</li>
          <li><strong>TVA sur emoluments</strong> : {fmt(fraisMedianAncien.emolumentsTVA)} EUR</li>
          <li><strong>Debours</strong> : {fmt(fraisMedianAncien.debours)} EUR (formalites administratives, cadastre, hypotheque)</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment reduire les frais de notaire a {ville.nom} ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Deduire la <strong>valeur du mobilier</strong> (cuisine equipee, meubles) du prix de vente</li>
          <li>Negocier les <strong>emoluments</strong> au-dela de 100 000 EUR (remise possible jusqu&apos;a 20%)</li>
          <li>Acheter dans le <strong>neuf</strong> plutot que dans l&apos;ancien (frais divises par 3)</li>
          <li>Prevoir ces frais dans votre <strong>apport personnel</strong> (non finances par le pret)</li>
        </ul>
      </section>

      {/* Autres villes */}
      {autresVilles.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Frais de notaire dans d&apos;autres villes</h2>
          <div className="flex flex-wrap gap-2">
            {autresVilles.map((v) => (
              <a
                key={v.slug}
                href={`/frais-de-notaire/${v.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all"
              >
                {v.nom}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/frais-de-notaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) return <VilleNotairePage ville={ville} />;

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
