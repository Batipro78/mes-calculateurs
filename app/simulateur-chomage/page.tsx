import type { Metadata } from "next";
import CalculateurChomage from "./CalculateurChomage";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Simulateur Chomage 2026 - Calcul Allocation ARE gratuit",
  description:
    "Calculez votre allocation chomage (ARE) gratuitement. Montant journalier, mensuel, duree d'indemnisation, degressivite. Bareme France Travail 2026.",
  keywords:
    "simulateur chomage, calcul allocation chomage, ARE, aide retour emploi, France Travail, Pole emploi, indemnite chomage, SJR, montant chomage",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Chomage ARE" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment est calculee l'allocation chomage (ARE) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'ARE est calculee a partir du Salaire Journalier de Reference (SJR). Le montant journalier est le plus avantageux entre : 57,4% du SJR ou 40,4% du SJR + 13,18 EUR. Le minimum est de 31,59 EUR/jour et le maximum de 274,80 EUR/jour.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de temps peut-on toucher le chomage ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La duree d'indemnisation depend de l'age et des mois travailles : maximum 18 mois avant 53 ans, 22,5 mois entre 53 et 54 ans, et 27 mois a partir de 55 ans. Il faut avoir travaille au moins 6 mois sur les 24 derniers mois.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que la degressivite de l'ARE ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour les salaires superieurs a 4 965 EUR brut/mois, l'ARE est reduite de 30% apres 6 mois d'indemnisation. Cette degressivite ne s'applique pas aux personnes de 57 ans et plus.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le montant minimum du chomage ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le montant minimum de l'ARE est de 31,59 EUR par jour, soit environ 948 EUR par mois (30 jours). Ce plancher s'applique quelle que soit la methode de calcul utilisee.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Chomage" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Chomage 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre allocation chomage (ARE) : montant journalier, mensuel,
        duree d&apos;indemnisation et degressivite.
      </p>

      <CalculateurChomage />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment est calculee l&apos;allocation chomage en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>Allocation d&apos;aide au Retour a l&apos;Emploi (ARE)</strong> est
          versee par <strong>France Travail</strong> (anciennement Pole emploi) aux
          demandeurs d&apos;emploi ayant suffisamment cotise. Le montant depend de votre
          ancien salaire brut et de la duree de travail.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Etape 1 : Le Salaire Journalier de Reference (SJR)</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Le <strong>SJR</strong> est la base de calcul de l&apos;ARE. Il se calcule en
          divisant la somme des salaires bruts des 24 derniers mois (ou 36 mois pour les 53 ans et plus)
          par le nombre de jours calendaires de cette periode.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          SJR = Salaires bruts totaux / Nombre de jours (mois x 30)
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Etape 2 : Le montant journalier</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          France Travail calcule deux montants et retient <strong>le plus avantageux</strong> :
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-2">
          <p><strong>Methode 1</strong> : 57,4% du SJR</p>
          <p><strong>Methode 2</strong> : 40,4% du SJR + 13,18 EUR (part fixe)</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 mt-4">
          <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
            <p className="font-semibold text-sky-700 text-sm">Plancher</p>
            <p className="text-2xl font-extrabold text-sky-800 mt-1">31,59 EUR/jour</p>
            <p className="text-xs text-sky-600 mt-1">~948 EUR/mois minimum</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
            <p className="font-semibold text-sky-700 text-sm">Plafond</p>
            <p className="text-2xl font-extrabold text-sky-800 mt-1">274,80 EUR/jour</p>
            <p className="text-xs text-sky-600 mt-1">~8 244 EUR/mois maximum</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Duree d&apos;indemnisation</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La duree d&apos;indemnisation correspond au nombre de mois travailles,
          dans la limite d&apos;un plafond qui depend de l&apos;age :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Condition</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Duree max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Moins de 53 ans</td>
                <td className="py-2.5 px-2 text-slate-500">6 mois min. travailles sur 24</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">18 mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">53-54 ans</td>
                <td className="py-2.5 px-2 text-slate-500">6 mois min. travailles sur 36</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">22,5 mois</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">55 ans et plus</td>
                <td className="py-2.5 px-2 text-slate-500">6 mois min. travailles sur 36</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">27 mois</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La degressivite</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Si votre salaire brut mensuel depassait <strong>4 965 EUR</strong>, votre ARE est
          reduite de <strong>30%</strong> apres 6 mois d&apos;indemnisation. Cette regle ne
          s&apos;applique pas si vous avez <strong>57 ans ou plus</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples concrets</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Salaire 1 800 EUR brut/mois</p>
            <p className="text-xs text-blue-600 mt-1">SJR = 60 EUR → ARE = ~36 EUR/j</p>
            <p className="text-xs text-blue-600 font-bold">~1 080 EUR/mois</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Salaire 3 000 EUR brut/mois</p>
            <p className="text-xs text-blue-600 mt-1">SJR = 100 EUR → ARE = ~57 EUR/j</p>
            <p className="text-xs text-blue-600 font-bold">~1 720 EUR/mois</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Salaire 2 000 EUR brut/mois</p>
            <p className="text-xs text-blue-600 mt-1">SJR = 66,67 EUR → ARE = ~40 EUR/j</p>
            <p className="text-xs text-blue-600 font-bold">~1 200 EUR/mois</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Salaire 4 000 EUR brut/mois</p>
            <p className="text-xs text-blue-600 mt-1">SJR = 133,33 EUR → ARE = ~67 EUR/j</p>
            <p className="text-xs text-blue-600 font-bold">~2 020 EUR/mois</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Conditions pour toucher le chomage</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Avoir travaille au moins <strong>6 mois (130 jours)</strong> sur les 24 derniers mois</li>
          <li>Etre inscrit comme demandeur d&apos;emploi a France Travail</li>
          <li>Ne pas avoir quitte volontairement son emploi (sauf rupture conventionnelle)</li>
          <li>Etre apte au travail et resider en France</li>
          <li>Rechercher activement un emploi</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Taux de remplacement</h3>
        <p className="text-slate-600 leading-relaxed">
          En moyenne, l&apos;ARE represente entre <strong>57% et 75%</strong> du salaire
          brut, soit environ <strong>72%</strong> du salaire net. Plus le salaire est eleve,
          plus le taux de remplacement est bas (a cause du plafond).
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-chomage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
