import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurCapaciteBE from "../CalculateurCapaciteBE";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  calculerCapaciteEmpruntBE,
  TAUX_MOYENS_BE_EMPRUNT,
} from "../capaciteEmpruntBeCalc";

const REVENUS = [1800, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 8000];
const DUREES = [15, 20, 25, 30];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

type Parsed = { revenu: number; duree: number };

function parseSlug(slug: string): Parsed | null {
  const m = slug.match(/^(\d+)-euros-(\d+)-ans$/);
  if (!m) return null;
  const revenu = parseInt(m[1], 10);
  const duree = parseInt(m[2], 10);
  if (!REVENUS.includes(revenu) || !DUREES.includes(duree)) return null;
  return { revenu, duree };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const r of REVENUS) {
    for (const d of DUREES) {
      params.push({ params: `${r}-euros-${d}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const res = calculerCapaciteEmpruntBE(parsed.revenu, 0, parsed.duree);
  return {
    alternates: { canonical: `/be/calcul-capacite-emprunt/${slug}` },
    title: `Capacite emprunt ${parsed.revenu} EUR net sur ${parsed.duree} ans Belgique`,
    description: `Avec ${parsed.revenu} EUR/mois nets en Belgique, vous pouvez emprunter ${fmt(res.capitalMax)} EUR sur ${parsed.duree} ans au taux ${res.taux} %. Mensualite max ${fmt(res.mensualiteMax)} EUR.`,
    keywords: `capacite emprunt ${parsed.revenu} belgique, ${parsed.duree} ans pret belge`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const res = calculerCapaciteEmpruntBE(parsed.revenu, 0, parsed.duree);

  const comparaison = DUREES.map((d) => ({
    duree: d,
    res: calculerCapaciteEmpruntBE(parsed.revenu, 0, d),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien puis-je emprunter avec ${parsed.revenu} EUR net en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec un revenu mensuel net de ${parsed.revenu} EUR en Belgique, votre capacite d'emprunt sur ${parsed.duree} ans est d'environ ${fmt(res.capitalMax)} EUR (mensualite max ${fmt(res.mensualiteMax)} EUR au taux ${res.taux} %). Cette estimation suppose 33 % d'endettement et aucune charge existante.`,
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
        currentPage={`${parsed.revenu} EUR / ${parsed.duree} ans`}
        parentPage="Capacite d'Emprunt"
        parentHref="/be/calcul-capacite-emprunt"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Capacite emprunt : {parsed.revenu} EUR net / {parsed.duree} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Combien emprunter en Belgique avec ce revenu et cette duree.
      </p>

      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-100 mb-1">Capacite d&apos;emprunt</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(res.capitalMax)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-blue-100 mt-2 text-sm">
          Mensualite max {fmt(res.mensualiteMax)} EUR (33 % de {parsed.revenu} EUR)
          <br />
          au taux moyen {res.taux} % sur {parsed.duree} ans
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Capacite selon la duree
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Capital max</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Lien</th>
              </tr>
            </thead>
            <tbody>
              {comparaison.map((c) => (
                <tr key={c.duree} className={`border-b border-slate-100 ${c.duree === parsed.duree ? "bg-blue-50/40" : ""}`}>
                  <td className="py-2.5 px-2 font-medium text-slate-700">{c.duree} ans</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{TAUX_MOYENS_BE_EMPRUNT[c.duree]} %</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(c.res.mensualiteMax)} EUR</td>
                  <td className="py-2.5 px-2 text-right font-bold text-blue-600">{fmt(c.res.capitalMax)} EUR</td>
                  <td className="py-2.5 px-2 text-right">
                    <a href={`/be/calcul-capacite-emprunt/${parsed.revenu}-euros-${c.duree}-ans`} className="text-blue-600 hover:underline text-xs font-medium">voir →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif (avec apport)</h2>
      <CalculateurCapaciteBE />


      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">Autres revenus sur {parsed.duree} ans</h3>
        <div className="flex flex-wrap gap-2">
          {REVENUS.filter((r) => r !== parsed.revenu).map((r) => (
            <a key={r} href={`/be/calcul-capacite-emprunt/${r}-euros-${parsed.duree}-ans`} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all">
              {fmt(r)} EUR
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
