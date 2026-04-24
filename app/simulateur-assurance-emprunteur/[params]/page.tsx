import type { Metadata } from "next";
import SimulateurAssuranceEmprunteur from "../SimulateurAssuranceEmprunteur";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  calculerAssurance,
  fmtEur,
  TAUX_BANQUE_MOYEN,
  TAUX_DELEGATION_MOYEN,
  type ProfilAge,
} from "../assuranceEmprunteurCalc";

const CAPITAUX = [100000, 150000, 200000, 250000, 300000, 400000, 500000];
const DUREES = [15, 20, 25];

function parseSlug(slug: string): { capital: number; duree: number } | null {
  const m = slug.match(/^(\d+)-euros-(\d+)-ans$/);
  if (!m) return null;
  return { capital: parseInt(m[1]), duree: parseInt(m[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const c of CAPITAUX) {
    for (const d of DUREES) {
      params.push({ params: `${c}-euros-${d}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { capital, duree } = parsed;
  const age: ProfilAge = "adulte";
  const res = calculerAssurance({
    capital,
    dureeAnnees: duree,
    tauxBanque: TAUX_BANQUE_MOYEN[age]["non-fumeur"],
    tauxDelegation: TAUX_DELEGATION_MOYEN[age]["non-fumeur"],
    quotiteCouverture: 100,
  });

  return {
    alternates: { canonical: `/simulateur-assurance-emprunteur/${slug}` },
    title: `Assurance pret ${capital.toLocaleString("fr-FR")} EUR sur ${duree} ans - Simulation 2026`,
    description: `Cout de l'assurance emprunteur pour un pret de ${capital.toLocaleString("fr-FR")} EUR sur ${duree} ans : environ ${fmtEur(res.coutMensuelBanque)}/mois en banque, ${fmtEur(res.coutMensuelDelegation)}/mois en delegation. Economie ${fmtEur(res.economieTotale)} avec la loi Lemoine.`,
    keywords: `assurance pret ${capital} euros, cout assurance ${capital} ${duree} ans, delegation assurance ${capital} euros, economie assurance pret ${capital}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { capital, duree } = parsed;
  if (!CAPITAUX.includes(capital) || !DUREES.includes(duree)) notFound();

  const age: ProfilAge = "adulte";
  const resNF = calculerAssurance({
    capital, dureeAnnees: duree,
    tauxBanque: TAUX_BANQUE_MOYEN[age]["non-fumeur"],
    tauxDelegation: TAUX_DELEGATION_MOYEN[age]["non-fumeur"],
    quotiteCouverture: 100,
  });
  const resF = calculerAssurance({
    capital, dureeAnnees: duree,
    tauxBanque: TAUX_BANQUE_MOYEN[age]["fumeur"],
    tauxDelegation: TAUX_DELEGATION_MOYEN[age]["fumeur"],
    quotiteCouverture: 100,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coute l'assurance emprunteur pour un pret de ${capital.toLocaleString("fr-FR")} EUR sur ${duree} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un pret de ${capital.toLocaleString("fr-FR")} EUR sur ${duree} ans, une assurance emprunteur en banque coute environ ${fmtEur(resNF.coutMensuelBanque)}/mois pour un non-fumeur 35-50 ans, soit ${fmtEur(resNF.coutTotalBanque)} sur la duree totale. En delegation (loi Lemoine), le cout tombe a environ ${fmtEur(resNF.coutMensuelDelegation)}/mois, soit ${fmtEur(resNF.coutTotalDelegation)} au total. Economie : ${fmtEur(resNF.economieTotale)}.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle economie avec la delegation pour ${capital.toLocaleString("fr-FR")} EUR sur ${duree} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec la loi Lemoine (delegation d'assurance), l'economie sur un pret de ${capital.toLocaleString("fr-FR")} EUR sur ${duree} ans est d'environ ${fmtEur(resNF.economieTotale)} pour un non-fumeur, soit ${resNF.pctEconomie.toFixed(0)}% de moins qu'en banque. Pour un fumeur, l'economie monte a ${fmtEur(resF.economieTotale)} (${resF.pctEconomie.toFixed(0)}%).`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={`${capital.toLocaleString("fr-FR")} EUR sur ${duree} ans`}
        parentPage="Simulateur Assurance Emprunteur"
        parentHref="/simulateur-assurance-emprunteur"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🛡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Assurance pret : {capital.toLocaleString("fr-FR")} EUR sur {duree} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Cout estime et economie avec la delegation (loi Lemoine 2022) pour un emprunteur non-fumeur 35-50 ans.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-100 mb-1">Economie totale avec la delegation</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtEur(resNF.economieTotale)}
        </p>
        <p className="text-emerald-100 mt-2">
          sur {duree} ans, soit {fmtEur(resNF.economieMensuelle)}/mois ({resNF.pctEconomie.toFixed(0)}% moins cher)
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-emerald-100">Assurance banque</p>
            <p className="font-semibold">{fmtEur(resNF.coutTotalBanque)} total</p>
          </div>
          <div>
            <p className="text-emerald-100">Assurance delegation</p>
            <p className="font-semibold">{fmtEur(resNF.coutTotalDelegation)} total</p>
          </div>
        </div>
      </div>

      {/* Comparatif fumeur/non-fumeur */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Assurance {capital.toLocaleString("fr-FR")} EUR / {duree} ans : par profil
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Profil</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Banque /mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Delegation /mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Economie totale</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 text-slate-700">Non-fumeur 35-50 ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">{fmtEur(resNF.coutMensuelBanque)}</td>
                <td className="py-2.5 px-2 text-right font-bold text-indigo-600">{fmtEur(resNF.coutMensuelDelegation)}</td>
                <td className="py-2.5 px-2 text-right font-bold text-emerald-600">{fmtEur(resNF.economieTotale)}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 text-slate-700">Fumeur 35-50 ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">{fmtEur(resF.coutMensuelBanque)}</td>
                <td className="py-2.5 px-2 text-right font-bold text-indigo-600">{fmtEur(resF.coutMensuelDelegation)}</td>
                <td className="py-2.5 px-2 text-right font-bold text-emerald-600">{fmtEur(resF.economieTotale)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser votre simulation</h2>
      <SimulateurAssuranceEmprunteur />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Liens autres montants/durees */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {CAPITAUX.filter(c => c !== capital).slice(0, 6).map(c => (
            <a key={c} href={`/simulateur-assurance-emprunteur/${c}-euros-${duree}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
              {c.toLocaleString("fr-FR")} EUR - {duree} ans
            </a>
          ))}
          {DUREES.filter(d => d !== duree).map(d => (
            <a key={d} href={`/simulateur-assurance-emprunteur/${capital}-euros-${d}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
              {capital.toLocaleString("fr-FR")} EUR - {d} ans
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-assurance-emprunteur" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
