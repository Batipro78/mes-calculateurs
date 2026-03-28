import type { Metadata } from "next";
import CalculateurMicroEntreprise from "./CalculateurMicroEntreprise";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Simulateur Micro-Entreprise 2026 - Charges, Impot, Revenu Net",
  description:
    "Simulez vos revenus en micro-entreprise (auto-entrepreneur). Charges URSSAF, impot sur le revenu, ACRE, versement liberatoire. Calcul du revenu net annuel et mensuel.",
  keywords:
    "simulateur micro-entreprise, auto-entrepreneur calcul, charges URSSAF, revenu net auto-entrepreneur, versement liberatoire, ACRE, cotisations sociales micro-entreprise",
};

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quelles sont les charges d'un auto-entrepreneur en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les charges sociales URSSAF dependent de l'activite : 12,3% pour l'achat-revente, 21,1% pour les services BNC, 21,2% pour les services BIC et professions liberales. S'ajoute la CFP (0,1% ou 0,2%). Avec l'ACRE, les charges sont reduites de 50% la premiere annee.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le plafond de chiffre d'affaires en micro-entreprise ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le plafond est de 188 700 EUR pour l'achat-revente de marchandises et de 77 700 EUR pour les prestations de services et professions liberales. Au-dela, vous basculez automatiquement en entreprise individuelle classique.",
                },
              },
              {
                "@type": "Question",
                name: "Comment fonctionne le versement liberatoire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le versement liberatoire permet de payer l'impot sur le revenu en meme temps que les charges URSSAF, a un taux fixe : 1% pour l'achat-revente, 1,7% pour les services BIC, 2,2% pour les services BNC et professions liberales. Il est accessible sous condition de revenu fiscal (inferieur a un seuil).",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que l'ACRE ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'ACRE (Aide a la Creation ou Reprise d'Entreprise) permet de beneficier d'une reduction de 50% des charges sociales pendant la premiere annee d'activite. Elle est accessible aux demandeurs d'emploi, beneficiaires du RSA, et jeunes de moins de 26 ans.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Micro-Entreprise" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏢
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Micro-Entreprise 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre revenu net en micro-entreprise : charges URSSAF, impot,
        ACRE, versement liberatoire.
      </p>

      <CalculateurMicroEntreprise />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tout savoir sur la micro-entreprise en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>micro-entreprise</strong> (anciennement auto-entreprise) est le
          regime le plus simple pour creer une activite independante en France. Les
          charges sont calculees en <strong>pourcentage du chiffre d&apos;affaires</strong>,
          sans comptabilite complexe.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Taux de charges sociales URSSAF 2026</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Activite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Charges</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Abattement</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Plafond CA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Achat / Revente (BIC)</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">12,3%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">71%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">188 700 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Services (BIC)</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">21,2%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">50%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">77 700 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Services (BNC)</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">21,1%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">34%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">77 700 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Professions liberales (BNC)</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">21,2%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">34%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">77 700 EUR</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Location meublee (BIC)</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">21,2%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">50%</td>
                <td className="py-2.5 px-2 text-right text-slate-500">77 700 EUR</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Le versement liberatoire</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Le <strong>versement liberatoire</strong> permet de payer l&apos;impot sur le
          revenu en meme temps que les cotisations URSSAF, a un taux fixe et
          definitif :
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
            <p className="font-semibold text-violet-700 text-sm">Achat / Revente</p>
            <p className="text-2xl font-extrabold text-violet-800 mt-1">1%</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
            <p className="font-semibold text-violet-700 text-sm">Services BIC</p>
            <p className="text-2xl font-extrabold text-violet-800 mt-1">1,7%</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
            <p className="font-semibold text-violet-700 text-sm">BNC / Liberal</p>
            <p className="text-2xl font-extrabold text-violet-800 mt-1">2,2%</p>
          </div>
        </div>
        <p className="text-slate-500 text-xs mt-2">
          Condition : le revenu fiscal de reference N-2 du foyer doit etre inferieur a un seuil (28 797 EUR par part en 2026).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">L&apos;ACRE : 50% de charges en moins</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          L&apos;<strong>ACRE</strong> (Aide a la Creation ou Reprise d&apos;Entreprise)
          reduit vos charges sociales de <strong>50%</strong> pendant votre premiere
          annee d&apos;activite. Vous y avez droit si vous etes :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Demandeur d&apos;emploi indemnise ou indemnisable</li>
          <li>Beneficiaire du RSA ou de l&apos;ASS</li>
          <li>Jeune de 18 a 25 ans (ou 29 ans si reconnu handicape)</li>
          <li>Createur dans un QPV (Quartier Prioritaire de la Ville)</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples de revenus nets</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Developpeur freelance (BNC)</p>
            <p className="text-xs text-green-600 mt-1">CA : 50 000 EUR → Charges : 10 700 EUR</p>
            <p className="text-xs text-green-600 font-bold">Net : ~36 000 EUR/an (~3 000 EUR/mois)</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">E-commerce (achat-revente)</p>
            <p className="text-xs text-green-600 mt-1">CA : 80 000 EUR → Charges : 10 000 EUR</p>
            <p className="text-xs text-green-600 font-bold">Net : ~66 000 EUR/an (~5 500 EUR/mois)</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Graphiste freelance (BNC)</p>
            <p className="text-xs text-green-600 mt-1">CA : 30 000 EUR → Charges : 6 400 EUR</p>
            <p className="text-xs text-green-600 font-bold">Net : ~22 000 EUR/an (~1 830 EUR/mois)</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Uber Eats / Livraison (BIC)</p>
            <p className="text-xs text-green-600 mt-1">CA : 20 000 EUR → Charges : 4 280 EUR</p>
            <p className="text-xs text-green-600 font-bold">Net : ~15 000 EUR/an (~1 250 EUR/mois)</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">CFP : Contribution a la Formation Professionnelle</h3>
        <p className="text-slate-600 leading-relaxed">
          En plus des charges sociales, vous payez la <strong>CFP</strong> :
          0,1% du CA pour l&apos;achat-revente, 0,2% pour les services et
          professions liberales. Elle vous donne droit a des formations financees.
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-micro-entreprise" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
