import type { Metadata } from "next";
import CalculateurPrimeActivite from "./CalculateurPrimeActivite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Prime d'Activite 2026 - Simulateur CAF gratuit",
  description:
    "Calculez votre prime d'activite gratuitement. Montant forfaitaire, bonification, forfait logement. Bareme CAF 2026, seul ou en couple, avec enfants.",
  keywords:
    "prime activite, calcul prime activite, simulateur prime activite, CAF, montant prime activite, bareme 2026, bonification, forfait logement",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Prime d'Activite" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment est calculee la prime d'activite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La prime d'activite = Montant forfaitaire + 61% des revenus professionnels + Bonification individuelle - Ressources du foyer - Forfait logement. Le montant forfaitaire de base est de 633,21 EUR pour une personne seule en 2025.",
                },
              },
              {
                "@type": "Question",
                name: "Qui a droit a la prime d'activite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Toute personne de 18 ans ou plus, residant en France, exercant une activite professionnelle (salariee ou independante) avec des revenus modestes. Les etudiants et apprentis doivent gagner au moins 1 117 EUR net/mois pendant 3 mois consecutifs.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le plafond de revenus pour la prime d'activite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour une personne seule sans enfant, le plafond est d'environ 2 000 EUR net/mois. Pour un couple avec 2 enfants (mono-actif), il peut atteindre 3 450 EUR. Le montant diminue progressivement a mesure que les revenus augmentent.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que la bonification individuelle ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La bonification est un bonus accorde a chaque membre du foyer dont les revenus depassent 709 EUR/mois. Elle augmente progressivement jusqu'a un maximum de 173,22 EUR/mois pour un revenu egal ou superieur au SMIC net (1 442 EUR).",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Prime d'Activite" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Prime d&apos;Activite 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre prime d&apos;activite CAF : montant forfaitaire,
        bonification, forfait logement. Seul, en couple, avec enfants.
      </p>

      <CalculateurPrimeActivite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Comment est calculee la prime d&apos;activite ?
        </h2>
        <p>
          La <strong>prime d&apos;activite</strong> est une prestation versee par la CAF (ou MSA) pour completer les revenus des travailleurs modestes.
          Creee en 2016, elle remplace le RSA activite et la prime pour l&apos;emploi.
        </p>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-emerald-800 mb-2">Formule de calcul</h3>
          <p className="text-emerald-700 text-sm mb-3">
            <strong>Prime = Montant forfaitaire + 61% des revenus pro + Bonification - Ressources du foyer - Forfait logement</strong>
          </p>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>Montant forfaitaire de base : <strong>633,21 EUR/mois</strong> (personne seule, 2025)</li>
            <li>Part des revenus professionnels : <strong>61%</strong> du total des revenus d&apos;activite</li>
            <li>Bonification individuelle : jusqu&apos;a <strong>173,22 EUR</strong> par actif du foyer</li>
            <li>Seuil minimum de versement : <strong>15 EUR/mois</strong></li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Montant forfaitaire selon la composition du foyer
        </h2>

        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Composition</th>
                <th className="text-right p-3 font-semibold text-slate-700">Montant forfaitaire</th>
                <th className="text-right p-3 font-semibold text-slate-700">Majoration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 text-slate-700">Personne seule</td>
                <td className="p-3 text-right font-bold">633,21 EUR</td>
                <td className="p-3 text-right text-slate-500">Base</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="p-3 text-slate-700">Couple sans enfant</td>
                <td className="p-3 text-right font-bold">949,82 EUR</td>
                <td className="p-3 text-right text-slate-500">+50%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 text-slate-700">Seul + 1 enfant</td>
                <td className="p-3 text-right font-bold">949,82 EUR</td>
                <td className="p-3 text-right text-slate-500">+50%</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="p-3 text-slate-700">Couple + 1 enfant</td>
                <td className="p-3 text-right font-bold">1 139,78 EUR</td>
                <td className="p-3 text-right text-slate-500">+30%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 text-slate-700">Couple + 2 enfants</td>
                <td className="p-3 text-right font-bold">1 329,74 EUR</td>
                <td className="p-3 text-right text-slate-500">+30%</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="p-3 text-slate-700">Parent isole + 1 enfant</td>
                <td className="p-3 text-right font-bold">1 084,18 EUR</td>
                <td className="p-3 text-right text-slate-500">Majoration isolement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          La bonification individuelle
        </h2>
        <p>
          Chaque membre du foyer qui travaille peut recevoir une <strong>bonification individuelle</strong>.
          Elle demarre a partir de <strong>709 EUR net/mois</strong> (environ 0,5 SMIC) et atteint son maximum
          de <strong>173,22 EUR/mois</strong> a partir du SMIC net (environ 1 442 EUR).
        </p>
        <p>
          Dans un couple ou les deux travaillent au SMIC, la bonification totale peut atteindre
          <strong> 346,44 EUR/mois</strong> (173,22 x 2).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Le forfait logement
        </h2>
        <p>
          Si vous percevez une aide au logement (APL, ALS, ALF) ou si vous etes proprietaire sans remboursement de pret,
          un <strong>forfait logement</strong> est deduit de votre prime :
        </p>
        <ul>
          <li>1 personne : <strong>75,99 EUR</strong> (12% du forfaitaire)</li>
          <li>2 personnes : <strong>151,97 EUR</strong> (24% du forfaitaire)</li>
          <li>3 personnes et plus : <strong>188,62 EUR</strong> (29,78% du forfaitaire)</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Conditions d&apos;eligibilite
        </h2>
        <ul>
          <li>Avoir <strong>18 ans ou plus</strong></li>
          <li>Resider en <strong>France de maniere stable</strong> (au moins 9 mois/an)</li>
          <li>Exercer une <strong>activite professionnelle</strong> (salariee ou independante)</li>
          <li>Avoir des <strong>revenus modestes</strong> (environ &lt; 2 000 EUR net/mois pour une personne seule)</li>
          <li>Etudiants/apprentis : revenu &ge; <strong>1 117 EUR net/mois</strong> pendant 3 mois consecutifs</li>
          <li>Titre de sejour valide pour les etrangers (5 ans ou carte de resident)</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Exemples concrets
        </h2>

        <div className="grid md:grid-cols-2 gap-4 not-prose mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">Salarie au SMIC (seul)</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 1 400 EUR/mois, locataire</p>
            <p className="text-2xl font-black text-emerald-600">~245 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">Couple bi-actif + 2 enfants</h4>
            <p className="text-sm text-slate-600 mb-2">1 400 EUR + 1 200 EUR, locataires</p>
            <p className="text-2xl font-black text-emerald-600">~290 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">Temps partiel (seul)</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 900 EUR/mois, aide logement</p>
            <p className="text-2xl font-black text-emerald-600">~340 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">Parent isole + 1 enfant</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 1 200 EUR/mois, locataire</p>
            <p className="text-2xl font-black text-emerald-600">~520 EUR/mois</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Comment demander la prime d&apos;activite ?
        </h2>
        <ol>
          <li>Connectez-vous sur <strong>caf.fr</strong> (ou msa.fr pour le regime agricole)</li>
          <li>Rubrique &laquo; Mes services en ligne &raquo; &rarr; &laquo; Faire une demande de prestation &raquo;</li>
          <li>Remplissez le formulaire avec vos revenus des 3 derniers mois</li>
          <li>La CAF calcule et verse la prime le 5 de chaque mois</li>
          <li><strong>Declaration trimestrielle</strong> obligatoire pour maintenir le versement</li>
        </ol>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-prime-activite" />
    </div>
  );
}
