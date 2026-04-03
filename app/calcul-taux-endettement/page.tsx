import type { Metadata } from "next";
import CalculateurEndettement from "./CalculateurEndettement";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Taux d'Endettement 2026 - Simulateur gratuit",
  description:
    "Calculez votre taux d'endettement gratuitement. Seuil des 33%, reste a vivre, capacite d'emprunt. Outil indispensable avant une demande de credit immobilier.",
  keywords:
    "calcul taux endettement, taux endettement 33%, simulateur endettement, capacite emprunt, reste a vivre, credit immobilier taux endettement, seuil endettement banque",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Taux Endettement" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer son taux d'endettement ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le taux d'endettement se calcule en divisant le total de vos charges mensuelles (credits, loyer) par le total de vos revenus mensuels nets, puis en multipliant par 100. Formule : (charges / revenus) x 100. Par exemple, avec 2 500 EUR de revenus et 800 EUR de charges, le taux est de 32%.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le taux d'endettement maximum pour un credit immobilier ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis janvier 2022, le Haut Conseil de Stabilite Financiere (HCSF) a fixe le taux d'endettement maximum a 35% (assurance emprunteur comprise). En pratique, les banques visent souvent un taux de 33% hors assurance. Un depassement est possible dans 20% des dossiers, principalement pour les primo-accedants et les hauts revenus.",
                },
              },
              {
                "@type": "Question",
                name: "Quels revenus sont pris en compte pour le taux d'endettement ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les banques prennent en compte : les salaires nets (fixes), les revenus fonciers (a 70%), les pensions de retraite, les allocations familiales, les revenus d'activite non salariee (moyenne sur 3 ans). Les primes exceptionnelles, les heures supplementaires variables et les revenus de placements ne sont generalement pas retenus.",
                },
              },
              {
                "@type": "Question",
                name: "Peut-on emprunter avec un taux d'endettement superieur a 33% ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, c'est possible dans certains cas. Les banques peuvent accorder un credit avec un taux jusqu'a 35% (regles HCSF) si le reste a vivre est suffisant (en general > 1 000 EUR par personne). Les hauts revenus, les primo-accedants et les fonctionnaires beneficient souvent de plus de souplesse.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Taux d'Endettement" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Taux d&apos;Endettement 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre taux d&apos;endettement, votre reste a vivre et votre
        capacite d&apos;emprunt maximale.
      </p>

      <CalculateurEndettement />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tout savoir sur le taux d&apos;endettement
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>taux d&apos;endettement</strong> mesure la part de vos
          revenus consacree au remboursement de vos dettes. C&apos;est le
          premier critere analyse par les banques lors d&apos;une demande de
          credit immobilier. Au-dela de <strong>33%</strong>, la plupart des
          banques refusent le dossier (sauf exceptions).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule de calcul</h3>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4">
          <p className="font-mono text-sm text-blue-800 font-bold">
            Taux d&apos;endettement = (Charges mensuelles / Revenus mensuels) x 100
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Exemple : (900 EUR / 3 000 EUR) x 100 = 30%
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Les seuils a connaitre</h3>
        <div className="grid gap-3 sm:grid-cols-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100 text-center">
            <p className="text-2xl font-extrabold text-green-700">&lt; 25%</p>
            <p className="text-sm font-medium text-green-600 mt-1">Excellent</p>
            <p className="text-xs text-green-500 mt-1">Dossier tres solide</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-center">
            <p className="text-2xl font-extrabold text-amber-700">25-33%</p>
            <p className="text-sm font-medium text-amber-600 mt-1">Acceptable</p>
            <p className="text-xs text-amber-500 mt-1">Seuil bancaire respecte</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 text-center">
            <p className="text-2xl font-extrabold text-orange-700">33-40%</p>
            <p className="text-sm font-medium text-orange-600 mt-1">Eleve</p>
            <p className="text-xs text-orange-500 mt-1">Risque de refus</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100 text-center">
            <p className="text-2xl font-extrabold text-red-700">&gt; 40%</p>
            <p className="text-sm font-medium text-red-600 mt-1">Critique</p>
            <p className="text-xs text-red-500 mt-1">Surendettement</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Revenus pris en compte par les banques</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Type de revenu</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Pris en compte</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">A quel %</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Salaire net fixe</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">Oui</td>
                <td className="py-2.5 px-2 text-right text-slate-500">100%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">13e mois / Primes regulieres</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">Oui</td>
                <td className="py-2.5 px-2 text-right text-slate-500">100% (lisse)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Revenus fonciers</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">Oui</td>
                <td className="py-2.5 px-2 text-right text-slate-500">70%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Pension retraite / invalidite</td>
                <td className="py-2.5 px-2 text-right text-green-600 font-bold">Oui</td>
                <td className="py-2.5 px-2 text-right text-slate-500">100%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Allocations familiales</td>
                <td className="py-2.5 px-2 text-right text-amber-600 font-bold">Partiel</td>
                <td className="py-2.5 px-2 text-right text-slate-500">Selon la banque</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Primes exceptionnelles</td>
                <td className="py-2.5 px-2 text-right text-red-600 font-bold">Non</td>
                <td className="py-2.5 px-2 text-right text-slate-500">0%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Heures sup variables</td>
                <td className="py-2.5 px-2 text-right text-red-600 font-bold">Non</td>
                <td className="py-2.5 px-2 text-right text-slate-500">0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La regle HCSF de 2022</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Depuis janvier 2022, le <strong>Haut Conseil de Stabilite
          Financiere (HCSF)</strong> impose aux banques deux regles strictes :
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Taux max : 35%</p>
            <p className="text-xs text-slate-500 mt-1">
              Le taux d&apos;endettement ne doit pas depasser 35% (assurance
              emprunteur incluse). En pratique, 33% hors assurance.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Duree max : 25 ans</p>
            <p className="text-xs text-slate-500 mt-1">
              La duree maximale d&apos;un credit immobilier est de 25 ans
              (27 ans avec un differe pour un achat en VEFA ou avec travaux).
            </p>
          </div>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les banques disposent d&apos;une <strong>marge de flexibilite de
          20%</strong> de leur production de credits pour depasser ces seuils.
          Cette souplesse est reservee en priorite aux <strong>primo-accedants</strong>
          (80% de la marge) et aux achats de <strong>residence principale</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Le reste a vivre</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Le <strong>reste a vivre</strong> est la somme qui reste apres paiement
          de toutes les charges. C&apos;est un critere aussi important que le
          taux d&apos;endettement. Un taux de 35% avec 4 000 EUR de reste a vivre
          est plus facilement accepte qu&apos;un taux de 30% avec 800 EUR de
          reste a vivre.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Composition du foyer</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Reste a vivre minimum</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Personne seule</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">700 - 1 000 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Couple sans enfant</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1 200 - 1 500 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Couple + 1 enfant</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1 500 - 1 800 EUR</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Couple + 2 enfants</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1 800 - 2 200 EUR</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Exemples concrets
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Couple, 2 salaires</p>
            <p className="text-xs text-green-600 mt-1">Revenus : 4 500 EUR → Charges : 1 200 EUR</p>
            <p className="text-xs text-green-600 font-bold">Taux : 26,7% - Reste : 3 300 EUR</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Celibataire, credit auto</p>
            <p className="text-xs text-amber-600 mt-1">Revenus : 2 200 EUR → Charges : 700 EUR</p>
            <p className="text-xs text-amber-600 font-bold">Taux : 31,8% - Reste : 1 500 EUR</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">Famille, multi-credits</p>
            <p className="text-xs text-orange-600 mt-1">Revenus : 3 500 EUR → Charges : 1 400 EUR</p>
            <p className="text-xs text-orange-600 font-bold">Taux : 40% - Reste : 2 100 EUR</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">Jeune actif, loyer + conso</p>
            <p className="text-xs text-red-600 mt-1">Revenus : 1 800 EUR → Charges : 850 EUR</p>
            <p className="text-xs text-red-600 font-bold">Taux : 47,2% - Reste : 950 EUR</p>
          </div>
        </div>
      </section>

      {/* Cross-link vers pret immobilier */}
      <section className="mt-8 bg-gradient-to-r from-violet-50 to-blue-50 rounded-2xl border border-violet-100 p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🏠</div>
          <div>
            <h3 className="font-bold text-slate-800">
              Simulez votre pret immobilier
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Maintenant que vous connaissez votre taux d&apos;endettement,
              calculez vos mensualites et le cout total de votre futur credit.
            </p>
            <a
              href="/simulateur-pret-immobilier"
              className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 mt-2"
            >
              Simulateur pret immobilier
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-taux-endettement" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
