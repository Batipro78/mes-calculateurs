import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurTVABE from "../CalculateurTVABE";
import Breadcrumb from "../../../components/Breadcrumb";

const MONTANTS = [50, 100, 200, 500, 1000, 2000, 5000, 10000];
const TAUX = [
  { slug: "21", valeur: 0.21, label: "21 %", desc: "normal" },
  { slug: "12", valeur: 0.12, label: "12 %", desc: "intermediaire" },
  { slug: "6", valeur: 0.06, label: "6 %", desc: "reduit" },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

function parseSlug(slug: string): { montant: number; taux: typeof TAUX[number] } | null {
  const m = slug.match(/^(\d+)-euros-(\d+)-pourcent$/);
  if (!m) return null;
  const montant = parseInt(m[1], 10);
  const taux = TAUX.find((t) => t.slug === m[2]);
  if (!taux || !MONTANTS.includes(montant)) return null;
  return { montant, taux };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const t of TAUX) {
      params.push({ params: `${m}-euros-${t.slug}-pourcent` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, taux } = parsed;
  const tvac = montant * (1 + taux.valeur);
  const tva = montant * taux.valeur;

  return {
    alternates: { canonical: `/be/calcul-tva/${slug}` },
    title: `TVA ${taux.label} sur ${montant} EUR HTVA - Calcul Belgique 2026`,
    description: `Calcul de TVA belge ${taux.label} sur ${montant} EUR HTVA : TVA = ${fmt(tva)} EUR, TVAC = ${fmt(tvac)} EUR. Conforme baremes 2026.`,
    keywords: `TVA ${taux.slug}% Belgique, ${montant} euros HTVA TVAC, calcul TVA belge ${montant}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, taux } = parsed;
  const htva = montant;
  const tva = htva * taux.valeur;
  const tvac = htva + tva;

  // Tableau de comparaison sur autres taux
  const autresResultats = TAUX.filter((t) => t.slug !== taux.slug).map((t) => ({
    taux: t,
    tva: htva * t.valeur,
    tvac: htva * (1 + t.valeur),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien fait ${montant} EUR HTVA avec TVA ${taux.label} en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${montant} EUR HTVA + ${taux.label} de TVA = ${fmt(tvac)} EUR TVAC. La TVA s'eleve a ${fmt(tva)} EUR.`,
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
        currentPage={`${montant} EUR HTVA + TVA ${taux.label}`}
        parentPage="Calcul TVA Belgique"
        parentHref="/be/calcul-tva"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          TVA {taux.label} sur {montant} EUR HTVA
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul de TVA belge au taux {taux.desc} ({taux.label}) sur un montant
        HTVA de {montant} EUR.
      </p>

      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-100 mb-1">Montant TVAC</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(tvac)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-emerald-100 mt-2 text-sm">
          {montant} EUR HTVA + {fmt(tva)} EUR de TVA ({taux.label})
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Avec d&apos;autres taux belges (meme HTVA)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Taux
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  TVA
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  TVAC
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {autresResultats.map((r) => (
                <tr key={r.taux.slug} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {r.taux.label} ({r.taux.desc})
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {fmt(r.tva)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-emerald-600">
                    {fmt(r.tvac)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/calcul-tva/${montant}-euros-${r.taux.slug}-pourcent`}
                      className="text-emerald-600 hover:underline text-xs font-medium"
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
      <CalculateurTVABE />


      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {montant} EUR HTVA avec TVA {taux.label} : detail
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un montant HTVA de <strong>{montant} EUR</strong> en Belgique, la
          TVA au taux {taux.desc} de <strong>{taux.label}</strong> s&apos;eleve
          a <strong>{fmt(tva)} EUR</strong>. Le montant TVAC (toutes taxes
          comprises) est donc de <strong>{fmt(tvac)} EUR</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Le taux {taux.label} s&apos;applique en Belgique sur :{" "}
          {taux.slug === "21"
            ? "la quasi-totalite des biens et services qui ne beneficient pas d'un taux reduit (taux normal par defaut)"
            : taux.slug === "12"
              ? "la restauration, le charbon et — depuis 2026 — les hotels et campings"
              : "l'alimentation de base, l'eau distribuee, les livres et journaux, les medicaments non rembourses, les transports en commun et les renovations de batiments de plus de 10 ans"}
          .
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres montants au taux {taux.label}
        </h3>
        <div className="flex flex-wrap gap-2">
          {MONTANTS.filter((m) => m !== montant).map((m) => (
            <a
              key={m}
              href={`/be/calcul-tva/${m}-euros-${taux.slug}-pourcent`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
            >
              {fmtInt(m)} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
