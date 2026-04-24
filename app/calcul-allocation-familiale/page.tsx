import type { Metadata } from "next";
import AllocationFamiliale from "./AllocationFamiliale";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Allocation Familiale CAF 2026 - Simulateur Gratuit",
  description:
    "Calculez vos allocations familiales CAF 2026 gratuitement. Allocations familiales, complement familial, allocation de rentree scolaire (ARS). Bareme officiel selon vos revenus et nombre d'enfants.",
  keywords:
    "allocation familiale, calcul allocation familiale, simulateur CAF, allocations familiales 2026, ARS, complement familial, bareme CAF, allocation rentree scolaire",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Allocations Familiales CAF" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "A partir de combien d'enfants touche-t-on les allocations familiales ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les allocations familiales sont versees a partir de 2 enfants a charge de moins de 20 ans. Le montant depend de vos revenus et du nombre d'enfants. Pour 2 enfants en tranche 1 (revenus < 74 966 EUR), le montant est d'environ 141,99 EUR par mois en 2026.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le montant de l'allocation de rentree scolaire (ARS) en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'ARS est versee en aout pour chaque enfant scolarise de 6 a 18 ans, sous conditions de ressources. Les montants 2026 sont : 416,40 EUR pour les 6-10 ans, 439,38 EUR pour les 11-14 ans, et 454,60 EUR pour les 15-18 ans.",
                },
              },
              {
                "@type": "Question",
                name: "Comment sont calculees les allocations familiales selon les revenus ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les allocations familiales sont modulees selon 3 tranches de revenus. Pour 2 enfants : tranche 1 (< 74 966 EUR) = 141,99 EUR/mois, tranche 2 (74 966 - 99 922 EUR) = 71 EUR/mois, tranche 3 (> 99 922 EUR) = 35,50 EUR/mois. Les plafonds augmentent de 6 631 EUR par enfant supplementaire au-dela de 2.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Allocation Familiale CAF" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👨‍👩‍👧‍👦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Allocation Familiale CAF 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez vos allocations familiales, complement familial et allocation de
        rentree scolaire (ARS) selon vos revenus et votre situation.
      </p>

      <AllocationFamiliale />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Comment fonctionnent les allocations familiales en 2026 ?
        </h2>
        <p>
          Les <strong>allocations familiales</strong> sont versees par la CAF
          (Caisse d&apos;Allocations Familiales) a toutes les familles ayant au
          moins <strong>2 enfants de moins de 20 ans</strong> a charge. Elles
          sont versees automatiquement, sans condition de ressources pour
          l&apos;ouverture du droit, mais leur{" "}
          <strong>montant est module selon les revenus</strong> du foyer depuis
          2015.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-green-800 mb-2">
            Baremes 2026 des allocations familiales
          </h3>
          <p className="text-green-700 text-sm mb-3">
            Les montants dependent de vos{" "}
            <strong>revenus N-2</strong> (revenus 2024 pour les versements 2026)
            et du <strong>nombre d&apos;enfants</strong> a charge.
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>
              2 enfants : <strong>141,99 EUR</strong> (T1) /{" "}
              <strong>71 EUR</strong> (T2) / <strong>35,50 EUR</strong> (T3)
            </li>
            <li>
              3 enfants : <strong>323,91 EUR</strong> (T1) /{" "}
              <strong>161,96 EUR</strong> (T2) / <strong>80,98 EUR</strong> (T3)
            </li>
            <li>
              Par enfant supplementaire : <strong>+181,92 EUR</strong> (T1) /{" "}
              <strong>+90,96 EUR</strong> (T2) / <strong>+45,48 EUR</strong>{" "}
              (T3)
            </li>
            <li>
              Majoration enfant 14+ ans : <strong>+71 EUR</strong> (T1) /{" "}
              <strong>+35,50 EUR</strong> (T2) / <strong>+17,75 EUR</strong>{" "}
              (T3)
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Les 3 tranches de revenus
        </h2>

        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">
                  Tranche
                </th>
                <th className="text-right p-3 font-semibold text-slate-700">
                  Plafond 2 enfants
                </th>
                <th className="text-right p-3 font-semibold text-slate-700">
                  Plafond 3 enfants
                </th>
                <th className="text-right p-3 font-semibold text-slate-700">
                  Taux
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 text-slate-700">Tranche 1</td>
                <td className="p-3 text-right font-bold">
                  &le; 74 966 EUR
                </td>
                <td className="p-3 text-right font-bold">
                  &le; 81 597 EUR
                </td>
                <td className="p-3 text-right text-green-600 font-bold">
                  Taux plein
                </td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="p-3 text-slate-700">Tranche 2</td>
                <td className="p-3 text-right font-bold">
                  &le; 99 922 EUR
                </td>
                <td className="p-3 text-right font-bold">
                  &le; 106 553 EUR
                </td>
                <td className="p-3 text-right text-amber-600 font-bold">
                  Taux divise par 2
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 text-slate-700">Tranche 3</td>
                <td className="p-3 text-right font-bold">
                  &gt; 99 922 EUR
                </td>
                <td className="p-3 text-right font-bold">
                  &gt; 106 553 EUR
                </td>
                <td className="p-3 text-right text-red-500 font-bold">
                  Taux divise par 4
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          La majoration pour enfants de plus de 14 ans
        </h2>
        <p>
          Une <strong>majoration</strong> est accordee pour chaque enfant de{" "}
          <strong>14 ans et plus</strong>, sauf pour l&apos;aine d&apos;une
          famille de 2 enfants. Cette majoration s&apos;ajoute au montant de
          base des allocations familiales et suit la meme modulation par tranche
          de revenus.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Le complement familial
        </h2>
        <p>
          Le <strong>complement familial</strong> est une aide supplementaire
          versee aux familles ayant au moins{" "}
          <strong>3 enfants ages de 3 a 21 ans</strong>. Il est soumis a des
          conditions de ressources et s&apos;eleve a environ{" "}
          <strong>172,77 EUR par mois</strong> en 2026. Il ne se cumule pas avec
          l&apos;allocation de base de la PAJE.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          L&apos;allocation de rentree scolaire (ARS)
        </h2>
        <p>
          L&apos;<strong>ARS</strong> est versee chaque annee en aout pour
          chaque enfant scolarise de <strong>6 a 18 ans</strong>. Elle est
          soumise a conditions de ressources. Les montants varient selon
          l&apos;age de l&apos;enfant :
        </p>
        <ul>
          <li>
            6-10 ans : <strong>416,40 EUR</strong>
          </li>
          <li>
            11-14 ans : <strong>439,38 EUR</strong>
          </li>
          <li>
            15-18 ans : <strong>454,60 EUR</strong>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Conditions generales
        </h2>
        <ul>
          <li>
            Resider en <strong>France</strong> de maniere stable et effective
          </li>
          <li>
            Avoir au moins <strong>2 enfants de moins de 20 ans</strong> a
            charge pour les allocations familiales
          </li>
          <li>
            Les enfants doivent etre <strong>declares a la CAF</strong>
          </li>
          <li>
            Les revenus pris en compte sont ceux de l&apos;annee{" "}
            <strong>N-2</strong> (revenus 2024 pour 2026)
          </li>
          <li>
            Les allocations sont versees le <strong>5 de chaque mois</strong>{" "}
            (ou le jour ouvrable suivant)
          </li>
        </ul>

        <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">
              Famille 2 enfants (tranche 1)
            </h4>
            <p className="text-sm text-slate-600 mb-2">
              Revenus &lt; 74 966 EUR, enfants 8 et 12 ans
            </p>
            <p className="text-2xl font-black text-green-600">
              ~142 EUR/mois
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">
              Famille 3 enfants (tranche 1)
            </h4>
            <p className="text-sm text-slate-600 mb-2">
              Revenus &lt; 81 597 EUR, enfants 5, 10 et 15 ans
            </p>
            <p className="text-2xl font-black text-green-600">
              ~395 EUR/mois
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Comment faire sa demande ?
        </h2>
        <ol>
          <li>
            Connectez-vous sur <strong>caf.fr</strong> ou creez un compte si
            necessaire
          </li>
          <li>
            Declarez vos enfants a charge dans la rubrique{" "}
            <strong>&laquo; Mon compte &raquo;</strong>
          </li>
          <li>
            Les allocations familiales sont attribuees{" "}
            <strong>automatiquement</strong> des le 2e enfant
          </li>
          <li>
            Pour l&apos;ARS, une attestation de scolarite peut etre demandee
            pour les 16-18 ans
          </li>
          <li>
            Le complement familial est egalement attribue automatiquement si
            vous remplissez les conditions
          </li>
        </ol>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-allocation-familiale" />
    </div>
  );
}
