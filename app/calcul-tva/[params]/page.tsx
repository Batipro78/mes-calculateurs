import type { Metadata } from "next";
import CalculateurTVA from "../CalculateurTVA";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MONTANTS = [50, 100, 150, 200, 300, 500, 1000, 2000, 5000, 10000];
const TAUX_LIST = [
  { slug: "20-pourcent", taux: 0.20, label: "20%", desc: "taux normal" },
  { slug: "10-pourcent", taux: 0.10, label: "10%", desc: "taux intermediaire" },
  { slug: "5-5-pourcent", taux: 0.055, label: "5,5%", desc: "taux reduit" },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

interface ParsedParams {
  montant: number;
  tauxObj: typeof TAUX_LIST[0];
  isTTC: boolean;
}

function parseSlug(slug: string): ParsedParams | null {
  for (const tauxObj of TAUX_LIST) {
    const htMatch = slug.match(new RegExp(`^(\\d+)-euros-ht-${tauxObj.slug}$`));
    if (htMatch) {
      return { montant: parseInt(htMatch[1]), tauxObj, isTTC: false };
    }
    const ttcMatch = slug.match(new RegExp(`^(\\d+)-euros-ttc-${tauxObj.slug}$`));
    if (ttcMatch) {
      return { montant: parseInt(ttcMatch[1]), tauxObj, isTTC: true };
    }
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const t of TAUX_LIST) {
      params.push({ params: `${m}-euros-ht-${t.slug}` });
      params.push({ params: `${m}-euros-ttc-${t.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, tauxObj, isTTC } = parsed;

  if (isTTC) {
    const ht = montant / (1 + tauxObj.taux);
    const tva = montant - ht;
    return {
    alternates: { canonical: `/calcul-tva/${slug}` },
      title: `TVA sur ${fmtInt(montant)} EUR TTC a ${tauxObj.label} - Calcul 2026`,
      description: `${fmtInt(montant)} EUR TTC avec TVA ${tauxObj.label} = ${fmt(ht)} EUR HT. Montant de la TVA : ${fmt(tva)} EUR. Calculateur gratuit.`,
      keywords: `TVA ${fmtInt(montant)} euros TTC, ${fmtInt(montant)} TTC en HT, calcul TVA ${tauxObj.label}, TVA sur ${fmtInt(montant)} euros`,
      openGraph: {
        title: `${fmtInt(montant)} EUR TTC = ${fmt(ht)} EUR HT (TVA ${tauxObj.label})`,
        description: `Calculez la TVA ${tauxObj.label} sur ${fmtInt(montant)} EUR TTC. Montant HT : ${fmt(ht)} EUR. TVA : ${fmt(tva)} EUR.`,
      },
    };
  }

  const tva = montant * tauxObj.taux;
  const ttc = montant + tva;
  return {
    alternates: { canonical: `/calcul-tva/${slug}` },
    title: `TVA sur ${fmtInt(montant)} EUR HT a ${tauxObj.label} - Calcul 2026`,
    description: `${fmtInt(montant)} EUR HT + TVA ${tauxObj.label} = ${fmt(ttc)} EUR TTC. Montant de la TVA : ${fmt(tva)} EUR. Calculateur gratuit.`,
    keywords: `TVA ${fmtInt(montant)} euros HT, ${fmtInt(montant)} HT en TTC, calcul TVA ${tauxObj.label}, TVA sur ${fmtInt(montant)} euros`,
    openGraph: {
      title: `${fmtInt(montant)} EUR HT = ${fmt(ttc)} EUR TTC (TVA ${tauxObj.label})`,
      description: `Calculez la TVA ${tauxObj.label} sur ${fmtInt(montant)} EUR HT. Montant TTC : ${fmt(ttc)} EUR. TVA : ${fmt(tva)} EUR.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, tauxObj, isTTC } = parsed;
  if (!MONTANTS.includes(montant)) notFound();

  let ht: number, ttc: number, tva: number;
  if (isTTC) {
    ttc = montant;
    ht = montant / (1 + tauxObj.taux);
    tva = ttc - ht;
  } else {
    ht = montant;
    tva = montant * tauxObj.taux;
    ttc = montant + tva;
  }

  // Resultats avec les 3 taux pour comparaison
  const comparaison = TAUX_LIST.map((t) => {
    if (isTTC) {
      const htComp = montant / (1 + t.taux);
      const tvaComp = montant - htComp;
      return { label: t.label, desc: t.desc, ht: htComp, tva: tvaComp, ttc: montant };
    }
    const tvaComp = montant * t.taux;
    const ttcComp = montant + tvaComp;
    return { label: t.label, desc: t.desc, ht: montant, tva: tvaComp, ttc: ttcComp };
  });

  const breadcrumbLabel = `${fmtInt(montant)} EUR ${isTTC ? "TTC" : "HT"} a ${tauxObj.label}`;

  // Montants proches
  const idx = MONTANTS.indexOf(montant);
  const montantsProches = MONTANTS.filter((_, i) => i !== idx).slice(0, 6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isTTC
          ? `Combien fait ${fmtInt(montant)} EUR TTC en HT avec une TVA a ${tauxObj.label} ?`
          : `Combien fait ${fmtInt(montant)} EUR HT en TTC avec une TVA a ${tauxObj.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isTTC
            ? `${fmtInt(montant)} EUR TTC avec une TVA a ${tauxObj.label} correspond a ${fmt(ht)} EUR HT. Le montant de la TVA est de ${fmt(tva)} EUR.`
            : `${fmtInt(montant)} EUR HT avec une TVA a ${tauxObj.label} donne ${fmt(ttc)} EUR TTC. Le montant de la TVA est de ${fmt(tva)} EUR.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment calculer la TVA a ${tauxObj.label} sur ${fmtInt(montant)} EUR ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isTTC
            ? `Pour passer de ${fmtInt(montant)} EUR TTC au HT avec une TVA de ${tauxObj.label} : ${fmtInt(montant)} / ${fmt(1 + tauxObj.taux)} = ${fmt(ht)} EUR HT. La TVA est de ${fmt(tva)} EUR.`
            : `Pour calculer le TTC a partir de ${fmtInt(montant)} EUR HT avec une TVA de ${tauxObj.label} : ${fmtInt(montant)} x ${fmt(1 + tauxObj.taux)} = ${fmt(ttc)} EUR TTC. La TVA est de ${fmt(tva)} EUR.`,
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
        parentPage="Calcul TVA"
        parentHref="/calcul-tva"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          TVA {tauxObj.label} sur {fmtInt(montant)} EUR {isTTC ? "TTC" : "HT"}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {isTTC
          ? `Calculez le montant HT et la TVA pour ${fmtInt(montant)} EUR TTC au ${tauxObj.desc}.`
          : `Calculez le montant TTC et la TVA pour ${fmtInt(montant)} EUR HT au ${tauxObj.desc}.`}
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-100 mb-1">
          {fmtInt(montant)} EUR {isTTC ? "TTC" : "HT"} avec TVA {tauxObj.label} =
        </p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(isTTC ? ht : ttc)}{" "}
          <span className="text-2xl font-semibold">EUR {isTTC ? "HT" : "TTC"}</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="flex justify-between text-sm">
          <span className="text-emerald-200">Montant de la TVA</span>
          <span className="font-semibold">{fmt(tva)} EUR</span>
        </div>
      </div>

      {/* Detail du calcul */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Montant HT</span>
            <span className="text-lg font-bold text-slate-800">{fmt(ht)} EUR</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">TVA ({tauxObj.label})</span>
            <span className="text-lg font-bold text-emerald-600">+ {fmt(tva)} EUR</span>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">Montant TTC</span>
            <span className="text-lg font-extrabold text-slate-800">{fmt(ttc)} EUR</span>
          </div>
        </div>
      </div>

      {/* Comparaison des taux */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison des taux pour {fmtInt(montant)} EUR {isTTC ? "TTC" : "HT"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">HT</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">TVA</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">TTC</th>
              </tr>
            </thead>
            <tbody>
              {comparaison.map((c) => (
                <tr key={c.label} className={`border-b border-slate-100 ${c.label === tauxObj.label ? "bg-emerald-50/50" : ""}`}>
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {c.label} <span className="text-xs text-slate-400">({c.desc})</span>
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt(c.ht)} EUR</td>
                  <td className="py-3 px-2 text-right text-emerald-600 font-medium">{fmt(c.tva)} EUR</td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">{fmt(c.ttc)} EUR</td>
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
      <CalculateurTVA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte explicatif */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre la TVA a {tauxObj.label}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le taux de TVA a <strong>{tauxObj.label}</strong> ({tauxObj.desc}) s&apos;applique en France
          metropolitaine. {isTTC
            ? `Pour retrouver le montant HT a partir de ${fmtInt(montant)} EUR TTC, on divise par ${fmt(1 + tauxObj.taux)}, ce qui donne ${fmt(ht)} EUR HT.`
            : `Pour calculer le TTC a partir de ${fmtInt(montant)} EUR HT, on multiplie par ${fmt(1 + tauxObj.taux)}, ce qui donne ${fmt(ttc)} EUR TTC.`}
        </p>
        <p className="text-slate-600 leading-relaxed">
          La TVA (Taxe sur la Valeur Ajoutee) est un impot indirect sur la consommation.
          La France applique 4 taux : 20% (normal), 10% (intermediaire), 5,5% (reduit) et 2,1% (super reduit).
        </p>
      </section>

      {/* Liens vers autres montants */}
      {montantsProches.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Autres montants avec TVA {tauxObj.label}
          </h2>
          <div className="flex flex-wrap gap-2">
            {montantsProches.map((m) => (
              <a
                key={m}
                href={`/calcul-tva/${m}-euros-${isTTC ? "ttc" : "ht"}-${tauxObj.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
              >
                {fmtInt(m)} EUR {isTTC ? "TTC" : "HT"}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/calcul-tva" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
