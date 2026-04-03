import type { Metadata } from "next";
import CalculateurIndemnite from "./CalculateurIndemnite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title:
    "Calcul Indemnite de Licenciement 2026 - Simulateur gratuit",
  description:
    "Calculez votre indemnite de licenciement legale en 2026. Licenciement, rupture conventionnelle, mise a la retraite. Bareme legal, anciennete, salaire de reference. Gratuit.",
  keywords:
    "indemnite licenciement, calcul indemnite, rupture conventionnelle, indemnite legale, licenciement economique, simulateur indemnite 2026",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Indemnite Licenciement" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer l'indemnite de licenciement en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'indemnite legale se calcule ainsi : 1/4 de mois de salaire par annee d'anciennete pour les 10 premieres annees, puis 1/3 de mois par annee au-dela. Le salaire de reference est le plus avantageux entre la moyenne des 12 ou des 3 derniers mois."
                }
              },
              {
                "@type": "Question",
                name: "Qui a droit a l'indemnite de licenciement ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tout salarie en CDI licencie (sauf faute grave ou lourde) disposant d'au moins 8 mois d'anciennete ininterrompue dans l'entreprise. L'indemnite est egalement due en cas de rupture conventionnelle."
                }
              },
              {
                "@type": "Question",
                name: "L'indemnite de licenciement est-elle imposable ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'indemnite de licenciement est exoneree d'impot sur le revenu dans la limite du montant legal ou conventionnel. Au-dela, l'exoneration s'applique dans la limite la plus elevee entre 2 fois la remuneration annuelle brute ou 50% de l'indemnite totale."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Indemnite Licenciement" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📄
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indemnite de Licenciement 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre indemnite legale de licenciement ou de rupture
        conventionnelle selon le Code du travail.
      </p>

      <CalculateurIndemnite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer son indemnite de licenciement ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;indemnite legale de licenciement est due a tout salarie en CDI
          licencie (sauf faute grave ou lourde) disposant d&apos;au moins{" "}
          <strong>8 mois d&apos;anciennete</strong> dans l&apos;entreprise.
          Elle s&apos;applique aussi en cas de <strong>rupture
          conventionnelle</strong>. Le calcul est fixe par le{" "}
          <strong>Code du travail (article R.1234-2)</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Le bareme legal</h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-1">
          <p>Jusqu&apos;a 10 ans : <strong>1/4 de mois</strong> de salaire par annee</p>
          <p>Au-dela de 10 ans : <strong>1/3 de mois</strong> de salaire par annee</p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Quel salaire de reference ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le salaire de reference est le plus avantageux entre deux calculs :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>
            La <strong>moyenne des 12 derniers mois</strong> de salaire brut
            precedant le licenciement
          </li>
          <li>
            La <strong>moyenne des 3 derniers mois</strong> (primes et
            gratifications proratisees)
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Exemples de calcul
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-bold text-slate-700 mb-2">
              Exemple 1 : 5 ans, 2 500 EUR brut
            </p>
            <p className="text-sm text-slate-600">
              2 500 x 1/4 x 5 = <strong>3 125 EUR</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-bold text-slate-700 mb-2">
              Exemple 2 : 15 ans, 3 000 EUR brut
            </p>
            <p className="text-sm text-slate-600">
              (3 000 x 1/4 x 10) + (3 000 x 1/3 x 5) = 7 500 + 5 000 ={" "}
              <strong>12 500 EUR</strong>
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Convention collective
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Votre <strong>convention collective</strong> peut prevoir une
          indemnite superieure a l&apos;indemnite legale. Dans ce cas, c&apos;est
          le montant le plus favorable au salarie qui s&apos;applique. Les
          conventions de la metallurgie, de la banque ou de la chimie, par
          exemple, sont souvent plus avantageuses.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Fiscalite de l&apos;indemnite
        </h3>
        <p className="text-slate-600 leading-relaxed">
          L&apos;indemnite de licenciement est <strong>exoneree
          d&apos;impot</strong> sur le revenu dans la limite du montant legal ou
          conventionnel. Si l&apos;indemnite depasse ce seuil, la fraction
          excedentaire est exoneree dans la limite la plus elevee entre : 2 fois
          la remuneration annuelle brute, 50% de l&apos;indemnite totale, ou le
          montant legal/conventionnel. La CSG/CRDS est egalement exoneree sur
          la part correspondant au minimum legal.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Rupture conventionnelle vs Licenciement
        </h3>
        <p className="text-slate-600 leading-relaxed">
          La <strong>rupture conventionnelle</strong> ouvre droit a une
          indemnite au moins egale a l&apos;indemnite legale de licenciement.
          Elle donne aussi droit aux <strong>allocations chomage</strong>
          (ARE), contrairement a la demission. C&apos;est une rupture amiable
          du contrat de travail qui doit etre homologuee par la DREETS
          (ex-Direccte).
        </p>
      </section>

      <RelatedCalculators currentSlug="/indemnite-licenciement" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
