import type { Metadata } from "next";
import SimulateurCreditAuto from "./SimulateurCreditAuto";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-credit-auto" },
  title: "Simulateur Credit Auto 2026 - Calculez vos Mensualites Gratuit",
  description:
    "Simulez votre credit auto en ligne gratuitement. Calculez vos mensualites, le cout total et le taux d'endettement. Taux moyens 2026 par duree (24 a 84 mois), tableau d'amortissement inclus.",
  keywords:
    "simulateur credit auto, credit voiture mensualite, calculateur pret automobile, taux credit auto 2026, mensualite voiture, cout credit automobile, simulation pret vehicule",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Credit Auto" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le taux moyen d'un credit auto en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En 2026, les taux moyens d'un credit auto varient selon la duree : 3,5% sur 12 mois, 3,9% sur 24 mois, 4,2% sur 36 mois, 4,5% sur 48 mois, 4,9% sur 60 mois, 5,5% sur 72 mois et 6,0% sur 84 mois. Ces taux sont des moyennes constatees aupres des concessionnaires et etablissements financiers. Votre taux reel depend de votre profil emprunteur, de votre apport et du vehicule finance.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer la mensualite d'un credit auto ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La mensualite d'un credit auto se calcule avec la formule : M = C x (t/12) / (1 - (1 + t/12)^(-n)), ou C est le capital emprunte (prix - apport), t le taux annuel divise par 100, et n le nombre de mensualites. Par exemple, pour 17 000 € empruntes sur 48 mois a 4,5%, la mensualite est d'environ 387 €.",
                },
              },
              {
                "@type": "Question",
                name: "Vaut-il mieux choisir un credit auto classique ou une LOA ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le credit auto classique (financement personnel) est preferable si vous souhaitez etre proprietaire du vehicule et obtenir les meilleurs taux. La LOA (Location avec Option d'Achat) propose des mensualites souvent plus basses, mais vous n'etes pas proprietaire pendant le contrat et le cout global est generalement plus eleve. Le credit auto est recommande pour un usage long terme (plus de 5 ans), la LOA pour changer regulierement de vehicule. Dans les deux cas, comparez plusieurs offres avant de signer.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Credit Auto" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Credit Auto 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos mensualites, le cout du credit et votre taux d&apos;endettement.
        Taux moyens 2026 integres — simulation instantanee.
      </p>

      <SimulateurCreditAuto />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Taux de credit auto en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>taux de credit auto</strong> ont evolue en 2026 en fonction
          de la politique de la BCE et de la concurrence entre etablissements.
          Voici les taux moyens constate pour un pret auto classique :
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux moyen 2026</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Exemple mensualite (20 000 €)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">12 mois</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-semibold">3,5 %</td>
                <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">1 698 € / mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">24 mois</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-semibold">3,9 %</td>
                <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">868 € / mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">36 mois</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-semibold">4,2 %</td>
                <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">591 € / mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">48 mois</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-semibold">4,5 %</td>
                <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">455 € / mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">60 mois</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-semibold">4,9 %</td>
                <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">376 € / mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">72 mois</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-semibold">5,5 %</td>
                <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">325 € / mois</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">84 mois</td>
                <td className="py-2.5 px-2 text-right text-blue-600 font-semibold">6,0 %</td>
                <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">296 € / mois</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne un credit auto ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>credit auto</strong> est un pret affecte : les fonds sont
          verses directement au vendeur du vehicule. La mensualite est calculee
          selon la formule d&apos;amortissement constant, ou chaque mois vous
          remboursez une partie du capital et des interets. Au debut du credit,
          la part des interets est plus importante ; elle diminue progressivement
          au fil des remboursements.
        </p>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le <strong>taux d&apos;endettement</strong> — rapport entre vos mensualites
          et vos revenus — ne doit pas depasser{" "}
          <strong>33 % de vos revenus nets</strong> pour que votre dossier soit
          accepte par la plupart des banques. Un apport personnel permet de
          reduire le capital emprunte, les interets et d&apos;ameliorer votre
          dossier.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Conseils pour negocier votre credit auto
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">
              Comparez plusieurs offres
            </p>
            <p className="text-xs text-blue-600 mt-1">
              La concurrence entre banques et concessionnaires peut faire
              varier le taux de 1 a 2 points. Obtenez au moins 3 devis avant
              de signer.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">
              Maximisez votre apport
            </p>
            <p className="text-xs text-green-600 mt-1">
              Un apport de 10 a 20 % reduit le montant emprunte et rassure les
              preteurs. Il reduit mecaniquement le cout total du credit.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">
              Choisissez la bonne duree
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Une duree plus courte signifie moins d&apos;interets, mais des
              mensualites plus elevees. La duree ideale est celle ou les
              mensualites restent sous 33 % de vos revenus.
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="font-semibold text-purple-700 text-sm">
              Credit auto vs LOA vs LLD
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Le credit classique rend proprietaire. La LOA permet de racheter
              le vehicule en fin de contrat. La LLD (location longue duree)
              inclut l&apos;entretien mais n&apos;offre pas d&apos;option
              d&apos;achat.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Credit auto vs LOA : lequel choisir ?
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Critere</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Credit auto</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">LOA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Propriete du vehicule</td>
                <td className="py-2.5 px-2 text-right text-green-600">Oui, des l&apos;achat</td>
                <td className="py-2.5 px-2 text-right text-orange-600">Seulement si rachat</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Mensualites</td>
                <td className="py-2.5 px-2 text-right text-slate-600">Plus elevees</td>
                <td className="py-2.5 px-2 text-right text-green-600">Plus basses</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Cout total</td>
                <td className="py-2.5 px-2 text-right text-green-600">Moins cher</td>
                <td className="py-2.5 px-2 text-right text-orange-600">Plus cher</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Flexibilite</td>
                <td className="py-2.5 px-2 text-right text-orange-600">Remboursement anticipe penalise</td>
                <td className="py-2.5 px-2 text-right text-green-600">Changement vehicule facile</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Ideal pour</td>
                <td className="py-2.5 px-2 text-right text-slate-600">Garder le vehicule 5+ ans</td>
                <td className="py-2.5 px-2 text-right text-slate-600">Changer tous les 3-4 ans</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 mt-6">Mis a jour le 8 avril 2026</p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-credit-auto" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
