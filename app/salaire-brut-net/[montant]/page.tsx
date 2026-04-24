import type { Metadata } from "next";
import CalculateurSalaire from "../CalculateurSalaire";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MONTANTS_BRUT = [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3500, 3800, 4000, 4500, 5000];
const MONTANTS_NET = [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3500, 3800, 4000, 4500, 5000];

const TAUX = { "non-cadre": 0.22, cadre: 0.25, public: 0.15 };

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmt2(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseSlug(montant: string): { value: number; isNet: boolean } | null {
  const netMatch = montant.match(/^(\d+)-euros-net$/);
  if (netMatch) return { value: parseInt(netMatch[1]), isNet: true };
  const brutMatch = montant.match(/^(\d+)-euros$/);
  if (brutMatch) return { value: parseInt(brutMatch[1]), isNet: false };
  return null;
}

export function generateStaticParams() {
  const params: { montant: string }[] = [];
  for (const m of MONTANTS_BRUT) {
    params.push({ montant: `${m}-euros` });
  }
  for (const m of MONTANTS_NET) {
    params.push({ montant: `${m}-euros-net` });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ montant: string }> }): Promise<Metadata> {
  const { montant } = await params;
  const parsed = parseSlug(montant);
  if (!parsed) return {};

  const { value, isNet } = parsed;

  if (isNet) {
    const brut = Math.round(value / (1 - TAUX["non-cadre"]));
    return {
    alternates: { canonical: `/salaire-brut-net/${montant}` },
      title: `${fmt(value)} euros net en brut - Calcul salaire 2026`,
      description: `Combien fait ${fmt(value)} euros net en salaire brut ? Environ ${fmt(brut)} EUR brut pour un non-cadre. Simulateur gratuit avec tous les statuts.`,
      keywords: `${value} euros net en brut, salaire ${value} net, convertir ${value} net en brut, salaire brut net ${value}`,
      openGraph: {
        title: `${fmt(value)} EUR net = combien en brut ? Calcul 2026`,
        description: `Un salaire net de ${fmt(value)} EUR correspond a environ ${fmt(brut)} EUR brut (non-cadre). Simulez avec tous les statuts.`,
      },
    };
  }

  const net = Math.round(value * (1 - TAUX["non-cadre"]));
  return {
    alternates: { canonical: `/salaire-brut-net/${montant}` },
    title: `${fmt(value)} euros brut en net - Calcul salaire 2026`,
    description: `Combien fait ${fmt(value)} euros brut en net ? Environ ${fmt(net)} EUR net pour un non-cadre. Simulateur gratuit avec detail des cotisations.`,
    keywords: `${value} euros brut en net, salaire ${value} brut, convertir ${value} brut en net, salaire brut net ${value}`,
    openGraph: {
      title: `${fmt(value)} EUR brut = combien en net ? Calcul 2026`,
      description: `Un salaire brut de ${fmt(value)} EUR correspond a environ ${fmt(net)} EUR net (non-cadre). Calculez pour cadre et fonction publique.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ montant: string }> }) {
  const { montant } = await params;
  const parsed = parseSlug(montant);
  if (!parsed) notFound();

  const { value, isNet } = parsed;
  const allMontants = isNet ? MONTANTS_NET : MONTANTS_BRUT;
  if (!allMontants.includes(value)) notFound();

  // Calculs pour les 3 statuts
  const resultats = (Object.entries(TAUX) as [string, number][]).map(([statut, taux]) => {
    const brut = isNet ? value / (1 - taux) : value;
    const net = isNet ? value : value * (1 - taux);
    const cotisations = brut - net;
    return { statut, taux, brut, net, cotisations };
  });

  const principal = resultats[0]; // non-cadre par defaut
  const breadcrumbLabel = isNet ? `${fmt(value)} EUR net` : `${fmt(value)} EUR brut`;

  // Montants proches pour les liens internes
  const idx = allMontants.indexOf(value);
  const montantsProches = allMontants
    .filter((_, i) => i !== idx && Math.abs(i - idx) <= 3)
    .slice(0, 6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isNet
          ? `Combien fait ${fmt(value)} euros net en brut ?`
          : `Combien fait ${fmt(value)} euros brut en net ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isNet
            ? `Un salaire net de ${fmt(value)} EUR correspond a environ ${fmt2(principal.brut)} EUR brut pour un non-cadre (cotisations de 22%), ${fmt2(resultats[1].brut)} EUR brut pour un cadre (25%) et ${fmt2(resultats[2].brut)} EUR brut en fonction publique (15%).`
            : `Un salaire brut de ${fmt(value)} EUR correspond a environ ${fmt2(principal.net)} EUR net pour un non-cadre (cotisations de 22%), ${fmt2(resultats[1].net)} EUR net pour un cadre (25%) et ${fmt2(resultats[2].net)} EUR net en fonction publique (15%).`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le salaire ${isNet ? "brut" : "net"} annuel pour ${fmt(value)} EUR ${isNet ? "net" : "brut"} par mois ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isNet
            ? `Pour un salaire net mensuel de ${fmt(value)} EUR, le salaire brut annuel est d'environ ${fmt2(principal.brut * 12)} EUR pour un non-cadre, soit ${fmt2(principal.net * 12)} EUR net par an.`
            : `Pour un salaire brut mensuel de ${fmt(value)} EUR, le salaire net annuel est d'environ ${fmt2(principal.net * 12)} EUR pour un non-cadre, soit ${fmt2(principal.brut * 12)} EUR brut par an.`,
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
        parentPage="Salaire Brut / Net"
        parentHref="/salaire-brut-net"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {isNet
            ? `${fmt(value)} EUR net en brut`
            : `${fmt(value)} EUR brut en net`}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {isNet
          ? `Decouvrez combien represente un salaire net de ${fmt(value)} EUR en brut selon votre statut.`
          : `Decouvrez combien represente un salaire brut de ${fmt(value)} EUR en net selon votre statut.`}
      </p>

      {/* Resultat principal en gros */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-100 mb-1">
          {isNet ? `${fmt(value)} EUR net =` : `${fmt(value)} EUR brut =`}
        </p>
        <p className="text-5xl font-extrabold tracking-tight">
          {isNet ? fmt2(principal.brut) : fmt2(principal.net)}{" "}
          <span className="text-2xl font-semibold">EUR {isNet ? "brut" : "net"}</span>
        </p>
        <p className="text-blue-200 text-sm mt-2">
          Pour un non-cadre du secteur prive (cotisations {principal.taux * 100}%)
        </p>
      </div>

      {/* Tableau comparatif par statut */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Detail par statut
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Statut</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Brut mensuel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cotisations</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Net mensuel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Net annuel</th>
              </tr>
            </thead>
            <tbody>
              {resultats.map((r) => (
                <tr key={r.statut} className="border-b border-slate-100">
                  <td className="py-3 px-2 font-medium text-slate-700 capitalize">
                    {r.statut === "non-cadre" ? "Non-cadre" : r.statut === "cadre" ? "Cadre" : "Fonction publique"}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt2(r.brut)} EUR</td>
                  <td className="py-3 px-2 text-right text-red-500">- {fmt2(r.cotisations)} EUR ({r.taux * 100}%)</td>
                  <td className="py-3 px-2 text-right font-bold text-blue-600">{fmt2(r.net)} EUR</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt2(r.net * 12)} EUR</td>
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
      <CalculateurSalaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte explicatif unique */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {isNet
            ? `Comprendre un salaire net de ${fmt(value)} EUR`
            : `Comprendre un salaire brut de ${fmt(value)} EUR`}
        </h2>
        {isNet ? (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Avec un salaire net mensuel de <strong>{fmt(value)} EUR</strong>, votre salaire brut
              varie selon votre statut professionnel. Un non-cadre du secteur prive percevra
              environ <strong>{fmt2(principal.brut)} EUR brut</strong> par mois, soit{" "}
              <strong>{fmt2(principal.brut * 12)} EUR brut annuel</strong>.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Les cotisations sociales representent la difference entre le brut et le net.
              Elles financent la Securite sociale, la retraite et l&apos;assurance chomage.
              Pour un cadre, les cotisations sont plus elevees (25%), ce qui signifie qu&apos;il
              faut un brut de <strong>{fmt2(resultats[1].brut)} EUR</strong> pour obtenir {fmt(value)} EUR net.
            </p>
          </>
        ) : (
          <>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Avec un salaire brut mensuel de <strong>{fmt(value)} EUR</strong>, votre salaire net
              sera d&apos;environ <strong>{fmt2(principal.net)} EUR</strong> si vous etes non-cadre
              dans le secteur prive, soit <strong>{fmt2(principal.net * 12)} EUR net par an</strong>.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Les cotisations salariales de <strong>{fmt2(principal.cotisations)} EUR</strong> par mois
              (soit {principal.taux * 100}% du brut) financent votre protection sociale : Securite
              sociale, retraite, assurance chomage. Pour un cadre, le net sera de{" "}
              <strong>{fmt2(resultats[1].net)} EUR</strong> en raison de cotisations plus elevees.
            </p>
          </>
        )}

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Taux de cotisations appliques (2026)
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Non-cadre</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~22%</p>
            <p className="text-xs text-slate-400 mt-1">Secteur prive</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Cadre</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~25%</p>
            <p className="text-xs text-slate-400 mt-1">Secteur prive</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Fonction publique</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~15%</p>
            <p className="text-xs text-slate-400 mt-1">Etat / Territorial</p>
          </div>
        </div>
      </section>

      {/* Liens vers montants proches */}
      {montantsProches.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Autres montants {isNet ? "net" : "brut"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {montantsProches.map((m) => (
              <a
                key={m}
                href={`/salaire-brut-net/${m}-euros${isNet ? "-net" : ""}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
              >
                {fmt(m)} EUR {isNet ? "net" : "brut"}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/salaire-brut-net" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
