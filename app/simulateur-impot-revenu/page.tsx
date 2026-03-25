import type { Metadata } from "next";
import SimulateurImpot from "./SimulateurImpot";

export const metadata: Metadata = {
  title:
    "Simulateur Impot sur le Revenu 2026 - Calcul gratuit en ligne",
  description:
    "Simulez votre impot sur le revenu 2026 : tranches d'imposition, quotient familial, decote, taux marginal et moyen. Celibataire, couple, enfants. Gratuit et instantane.",
  keywords:
    "simulateur impot revenu 2026, calcul impot, tranches imposition 2026, quotient familial, impot sur le revenu, taux marginal, declaration revenus, bareme impot, calcul IR",
};

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <a
          href="/"
          className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
        >
          &larr; Tous les calculateurs
        </a>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏛️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Impot sur le Revenu
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre impot sur le revenu 2026 avec le bareme officiel,
        le quotient familial et la decote.
      </p>

      <SimulateurImpot />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment est calcule l&apos;impot sur le revenu en France ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          L&apos;impot sur le revenu (IR) est un impot progressif : plus vos
          revenus sont eleves, plus le taux d&apos;imposition augmente. Il est
          calcule selon un bareme par tranches, applique au revenu net imposable
          apres abattements et deductions. En France, environ 45% des foyers
          fiscaux sont imposables. Le prelevement a la source (PAS) est en
          vigueur depuis 2019, ce qui signifie que l&apos;impot est preleve
          directement sur votre salaire chaque mois.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le bareme progressif 2026 (revenus 2025)
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">Tranche de revenu</th>
                <th className="pb-2 text-slate-500 font-medium">Taux</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2">Jusqu&apos;a 11 497 EUR</td>
                <td className="py-2 font-semibold text-green-600">0%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2">De 11 497 a 29 315 EUR</td>
                <td className="py-2 font-semibold">11%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2">De 29 315 a 83 823 EUR</td>
                <td className="py-2 font-semibold">30%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2">De 83 823 a 180 294 EUR</td>
                <td className="py-2 font-semibold">41%</td>
              </tr>
              <tr>
                <td className="py-2">Au-dela de 180 294 EUR</td>
                <td className="py-2 font-semibold text-red-600">45%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-400 mt-2">
            Ces tranches s&apos;appliquent au quotient familial (revenu / nombre de parts)
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le quotient familial : comment ca marche ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le quotient familial divise le revenu imposable par un nombre de
          parts qui depend de la situation familiale et du nombre d&apos;enfants.
          Ce mecanisme attenue la progressivite de l&apos;impot pour les
          familles. Le bareme est applique au quotient, puis le resultat est
          multiplie par le nombre de parts pour obtenir l&apos;impot brut.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Nombre de parts</p>
            <ul className="text-xs text-slate-500 mt-2 space-y-1">
              <li>Celibataire sans enfant : <strong>1 part</strong></li>
              <li>Couple sans enfant : <strong>2 parts</strong></li>
              <li>+ 1er enfant : <strong>+0,5 part</strong></li>
              <li>+ 2e enfant : <strong>+0,5 part</strong></li>
              <li>+ 3e enfant et suivants : <strong>+1 part chacun</strong></li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Exemples</p>
            <ul className="text-xs text-slate-500 mt-2 space-y-1">
              <li>Celibataire : 1 part</li>
              <li>Couple + 1 enfant : 2,5 parts</li>
              <li>Couple + 2 enfants : 3 parts</li>
              <li>Couple + 3 enfants : 4 parts</li>
              <li>Parent isole + 2 enfants : 2,5 parts*</li>
            </ul>
            <p className="text-xs text-slate-400 mt-1">
              *Cas particulier non simule ici
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          L&apos;abattement forfaitaire de 10%
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Par defaut, l&apos;administration fiscale applique un abattement de
          10% sur les salaires et traitements pour tenir compte des frais
          professionnels (transport, repas, vetements). Cet abattement est
          plafonné a 14 171 EUR et ne peut pas etre inferieur a 495 EUR.
          Si vos frais reels sont superieurs a 10% de votre revenu, vous
          pouvez opter pour la deduction des frais reels (notamment via les
          indemnites kilometriques).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Taux marginal vs taux moyen
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Taux marginal</p>
            <p className="text-xs text-slate-500 mt-1">
              C&apos;est le taux de la tranche la plus elevee dans laquelle
              tombe votre revenu. Il s&apos;applique uniquement a la portion
              de revenu dans cette tranche, pas a l&apos;ensemble. Exemple :
              si votre taux marginal est 30%, seuls les revenus au-dessus de
              29 315 EUR sont taxes a 30%.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Taux moyen (effectif)</p>
            <p className="text-xs text-slate-500 mt-1">
              C&apos;est le rapport entre l&apos;impot paye et le revenu total.
              Il est toujours inferieur au taux marginal. C&apos;est le vrai
              indicateur de votre pression fiscale. Exemple : avec un taux
              marginal de 30%, votre taux moyen peut n&apos;etre que de 12%.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La decote : un allègement pour les petits revenus
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          La decote est un mecanisme qui reduit l&apos;impot des contribuables
          modestes. En 2026, si votre impot brut est inferieur a 1 929 EUR
          (celibataire) ou 3 191 EUR (couple), une decote vient reduire le
          montant a payer. Ce mecanisme permet une transition douce entre
          la non-imposition et l&apos;imposition.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le prelevement a la source (PAS)
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Depuis 2019, l&apos;impot est preleve directement sur votre salaire
          chaque mois par votre employeur. Le taux de prelevement est calcule
          par l&apos;administration fiscale et transmis a l&apos;employeur.
          Vous pouvez opter pour un taux individualise (si votre conjoint gagne
          beaucoup plus ou moins que vous) ou un taux neutre (pour ne pas
          reveler votre situation fiscale a votre employeur). La declaration
          annuelle reste obligatoire et permet de regulariser les eventuels
          trop-percu ou reste a payer.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Principales reductions et credits d&apos;impot
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Frais de garde d&apos;enfants :</strong> credit d&apos;impot
            de 50% des depenses, plafond 3 500 EUR/enfant (soit 1 750 EUR max).
          </li>
          <li>
            <strong>Dons aux associations :</strong> reduction de 66% du montant
            (75% pour les organismes d&apos;aide aux personnes en difficulte,
            plafond 1 000 EUR).
          </li>
          <li>
            <strong>Emploi a domicile :</strong> credit d&apos;impot de 50%,
            plafond 12 000 EUR de depenses (soit 6 000 EUR max).
          </li>
          <li>
            <strong>Investissement locatif (Pinel) :</strong> reduction de 9 a
            14% du montant investi, selon la duree de location.
          </li>
          <li>
            <strong>PER (Plan Epargne Retraite) :</strong> les versements sont
            deductibles du revenu imposable, dans la limite de 10% des revenus.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Calendrier fiscal 2026
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>
            <strong>Avril 2026 :</strong> ouverture de la declaration en ligne
            sur impots.gouv.fr.
          </li>
          <li>
            <strong>Mai-juin 2026 :</strong> date limite de depot (variable
            selon le departement).
          </li>
          <li>
            <strong>Ete 2026 :</strong> reception de l&apos;avis d&apos;imposition.
          </li>
          <li>
            <strong>Septembre 2026 :</strong> ajustement du taux de prelevement
            a la source si necessaire.
          </li>
        </ul>
      </section>
    </div>
  );
}
