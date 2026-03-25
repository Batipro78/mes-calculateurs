import type { Metadata } from "next";
import CalculateurIK from "./CalculateurIK";
import AdSlot from "../components/AdSlot";

export const metadata: Metadata = {
  title:
    "Calcul Indemnites Kilometriques 2026 - Bareme fiscal IK gratuit",
  description:
    "Calculez vos indemnites kilometriques avec le bareme fiscal 2026. Voiture, moto, velo. Puissance fiscale, vehicule electrique (+20%), frais reels. Gratuit et instantane.",
  keywords:
    "indemnites kilometriques, bareme kilometrique 2026, calcul frais kilometriques, IK 2026, frais reels voiture, bareme fiscal km, indemnite deplacement professionnel, frais kilometriques impots, vehicule electrique IK",
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
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Indemnites Kilometriques
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos indemnites kilometriques avec le bareme fiscal 2026.
        Voiture, moto ou velo.
      </p>

      <CalculateurIK />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tout savoir sur les indemnites kilometriques en 2026
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Les indemnites kilometriques (IK) permettent aux salaries et aux
          professionnels d&apos;etre rembourses des frais engages lorsqu&apos;ils
          utilisent leur vehicule personnel pour des deplacements
          professionnels. Le bareme kilometrique est publie chaque annee par
          l&apos;administration fiscale et tient compte de la puissance fiscale
          du vehicule et du nombre de kilometres parcourus.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le bareme kilometrique 2026 (voitures)
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">Puissance</th>
                <th className="pb-2 text-slate-500 font-medium">Jusqu&apos;a 5 000 km</th>
                <th className="pb-2 text-slate-500 font-medium">5 001 a 20 000 km</th>
                <th className="pb-2 text-slate-500 font-medium">Plus de 20 000 km</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">3 CV et -</td>
                <td className="py-2">d x 0,529</td>
                <td className="py-2">(d x 0,316) + 1 065</td>
                <td className="py-2">d x 0,370</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">4 CV</td>
                <td className="py-2">d x 0,606</td>
                <td className="py-2">(d x 0,340) + 1 330</td>
                <td className="py-2">d x 0,407</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">5 CV</td>
                <td className="py-2">d x 0,636</td>
                <td className="py-2">(d x 0,357) + 1 395</td>
                <td className="py-2">d x 0,427</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">6 CV</td>
                <td className="py-2">d x 0,665</td>
                <td className="py-2">(d x 0,374) + 1 457</td>
                <td className="py-2">d x 0,447</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">7 CV et +</td>
                <td className="py-2">d x 0,697</td>
                <td className="py-2">(d x 0,394) + 1 515</td>
                <td className="py-2">d x 0,470</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-400 mt-2">
            d = distance parcourue en kilometres
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Qu&apos;est-ce qui est couvert par le bareme ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Le bareme kilometrique couvre l&apos;ensemble des frais lies a
          l&apos;utilisation du vehicule :
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Inclus dans le bareme</p>
            <ul className="text-xs text-slate-500 mt-2 space-y-1">
              <li>- Amortissement du vehicule (depreciation)</li>
              <li>- Carburant (essence, diesel, electrique)</li>
              <li>- Assurance automobile</li>
              <li>- Entretien et reparations courantes</li>
              <li>- Pneumatiques</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Deductibles en plus</p>
            <ul className="text-xs text-slate-500 mt-2 space-y-1">
              <li>- Frais de peage (autoroute)</li>
              <li>- Frais de stationnement professionnel</li>
              <li>- Interets d&apos;emprunt pour l&apos;achat du vehicule</li>
              <li>- Frais de GPS (usage professionnel)</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Majoration de 20% pour les vehicules electriques
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Depuis 2021, les proprietaires de vehicules 100% electriques
          beneficient d&apos;une <strong>majoration de 20%</strong> du montant
          calcule avec le bareme kilometrique. Cette mesure vise a encourager
          la transition vers la mobilite electrique. Attention : les vehicules
          hybrides ne sont pas concernes par cette majoration, seuls les
          vehicules entierement electriques y ont droit.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Frais reels ou deduction forfaitaire de 10% ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Lors de votre declaration de revenus, vous avez le choix entre la
          deduction forfaitaire de 10% (appliquee automatiquement) et la
          deduction des frais reels. Opter pour les frais reels avec le bareme
          kilometrique est interessant si vos deplacements domicile-travail
          sont importants (generalement au-dela de 30 km aller-retour) ou si
          vous avez de nombreux deplacements professionnels. Il faut comparer
          les deux options pour choisir la plus avantageuse.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Exemple de calcul detaille
        </h3>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-slate-700 font-medium mb-2">
            Situation : voiture 5 CV, 12 000 km/an
          </p>
          <p className="font-mono text-sm text-slate-600">
            Tranche : 5 001 a 20 000 km
          </p>
          <p className="font-mono text-sm text-slate-600">
            Formule : (12 000 x 0,357) + 1 395 = 5 679 EUR
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Soit 473,25 EUR/mois ou 0,47 EUR/km
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le forfait mobilites durables
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Pour les salaries qui utilisent un velo (classique ou electrique)
          pour leurs trajets domicile-travail, le forfait mobilites durables
          permet une prise en charge de <strong>0,25 EUR par kilometre</strong>,
          dans la limite de 200 EUR par an. Ce forfait est exonere d&apos;impot
          sur le revenu et de cotisations sociales. Il peut etre cumule avec
          la participation de l&apos;employeur aux abonnements de transport
          en commun.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Indemnites kilometriques pour les motos
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Les deux-roues motorises de plus de 50 cm&sup3; disposent de leur
          propre bareme, avec des tarifs inferieurs a ceux des voitures. Le
          bareme comporte 3 tranches de puissance (1-2 CV, 3-5 CV, plus de
          5 CV) et 3 tranches de distance. Les cyclomoteurs de moins de
          50 cm&sup3; ne sont pas couverts par ce bareme.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Conseils pratiques
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>
            <strong>Conservez vos justificatifs :</strong> carte grise (pour
            la puissance fiscale), factures de carburant et peages, attestation
            de l&apos;employeur.
          </li>
          <li>
            <strong>Calculez les deux options :</strong> comparez frais reels
            vs deduction 10% avant de declarer. Notre calculateur vous aide
            a estimer le montant des frais reels.
          </li>
          <li>
            <strong>Trajet domicile-travail :</strong> la distance deductible
            est limitee a 40 km (aller simple) sauf circonstances particulieres
            justifiees (mutation, conjoint travaillant dans une autre ville...).
          </li>
          <li>
            <strong>Covoiturage :</strong> si vous covoiturez, chaque passager
            peut aussi deduire ses frais (proportionnellement a sa part).
          </li>
        </ul>
      </section>

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
