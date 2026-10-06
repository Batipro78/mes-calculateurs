import type { Metadata } from "next";
import CalculateurPrimeActivite from "./CalculateurPrimeActivite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-prime-activite" },
  title: "Calcul Prime d'Activite 2026 - Simulateur CAF gratuit",
  description:
    "Calculez votre prime d'activite gratuitement. Montant forfaitaire, bonification, forfait logement. Bareme CAF 2026, seul ou en couple, avec enfants.",
  keywords:
    "prime activite, calcul prime activite, simulateur prime activite, CAF, montant prime activite, bareme 2026, bonification, forfait logement",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment est calculee la prime d'activite ?",
    a: "La prime d'activite = Montant forfaitaire + 59,85 % des revenus professionnels + Bonification individuelle - Ressources du foyer - Forfait logement. Le montant forfaitaire de base est de 638,28 EUR pour une personne seule depuis le 1er avril 2026.",
  },
  {
    q: "Qui a droit a la prime d'activite ?",
    a: "Toute personne de 18 ans ou plus, residant en France, exercant une activite professionnelle (salariee ou independante) avec des revenus modestes. Les etudiants et apprentis doivent gagner au moins 1 117 EUR net/mois pendant 3 mois consecutifs.",
  },
  {
    q: "Quel est le plafond de revenus pour la prime d'activite ?",
    a: "Pour une personne seule sans enfant, le plafond est d'environ 2 000 EUR net/mois. Pour un couple avec 2 enfants (mono-actif), il peut atteindre 3 450 EUR. Le montant diminue progressivement a mesure que les revenus augmentent.",
  },
  {
    q: "Qu'est-ce que la bonification individuelle ?",
    a: "La bonification est un bonus accorde a chaque membre du foyer dont les revenus depassent 709 EUR/mois. Elle augmente progressivement jusqu'a un maximum de 240,63 EUR/mois pour un revenu egal ou superieur a 1 658,76 EUR (montants CAF 2026).",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Prime d'Activite" />
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
            <strong>Prime = Montant forfaitaire + 59,85 % des revenus pro + Bonification - Ressources du foyer - Forfait logement</strong>
          </p>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>Montant forfaitaire de base : <strong>638,28 EUR/mois</strong> (personne seule, depuis le 1er avril 2026)</li>
            <li>Part des revenus professionnels : <strong>59,85 %</strong> du total des revenus d&apos;activite</li>
            <li>Bonification individuelle : jusqu&apos;a <strong>240,63 EUR</strong> par actif du foyer</li>
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
                <td className="p-3 text-right font-bold">638,28 EUR</td>
                <td className="p-3 text-right text-slate-500">Base</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="p-3 text-slate-700">Couple sans enfant</td>
                <td className="p-3 text-right font-bold">957,42 EUR</td>
                <td className="p-3 text-right text-slate-500">+50%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 text-slate-700">Seul + 1 enfant</td>
                <td className="p-3 text-right font-bold">957,42 EUR</td>
                <td className="p-3 text-right text-slate-500">+50%</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="p-3 text-slate-700">Couple + 1 enfant</td>
                <td className="p-3 text-right font-bold">1 148,90 EUR</td>
                <td className="p-3 text-right text-slate-500">+30%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 text-slate-700">Couple + 2 enfants</td>
                <td className="p-3 text-right font-bold">1 340,38 EUR</td>
                <td className="p-3 text-right text-slate-500">+30%</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="p-3 text-slate-700">Parent isole + 1 enfant</td>
                <td className="p-3 text-right font-bold">1 092,84 EUR</td>
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
          de <strong>240,63 EUR/mois</strong> a partir de 1 658,76 EUR net (environ 1,15 SMIC), depuis la reforme d&apos;avril 2026.
        </p>
        <p>
          Dans un couple ou les deux gagnent au moins 1 658,76 EUR net, la bonification totale atteint
          <strong> 481,26 EUR/mois</strong> (240,63 x 2). Au SMIC (1 442,40 EUR), elle est d&apos;environ 186 EUR par personne.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Le forfait logement
        </h2>
        <p>
          Si vous percevez une aide au logement (APL, ALS, ALF) ou si vous etes proprietaire sans remboursement de pret,
          un <strong>forfait logement</strong> est deduit de votre prime :
        </p>
        <ul>
          <li>1 personne : <strong>76,59 EUR</strong></li>
          <li>2 personnes : <strong>153,19 EUR</strong></li>
          <li>3 personnes et plus : <strong>189,57 EUR</strong> (montants CAF 2026)</li>
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
            <h4 className="font-bold text-slate-800 mb-2">Salarie seul, sans enfant</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 1 400 EUR/mois, sans aide au logement</p>
            <p className="text-2xl font-black text-emerald-600">~251 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">Couple bi-actif + 2 enfants</h4>
            <p className="text-sm text-slate-600 mb-2">1 400 EUR + 1 200 EUR, sans aide au logement</p>
            <p className="text-2xl font-black text-emerald-600">~596 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">Temps partiel (seul)</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 900 EUR/mois, aide logement</p>
            <p className="text-2xl font-black text-emerald-600">~249 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">Parent isole + 1 enfant</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 1 200 EUR/mois, sans aide au logement</p>
            <p className="text-2xl font-black text-emerald-600">~735 EUR/mois</p>
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

      <HowToJsonLd
        name="Calculer sa prime d'activité CAF"
        steps={[
          { name: "Saisir la composition du foyer", text: "Indiquer si l'on est seul, en couple, et le nombre d'enfants à charge. Le montant forfaitaire de base est de 638,28 EUR pour une personne seule (depuis le 1er avril 2026) ; il est majore de 50 % pour un couple sans enfant." },
          { name: "Entrer les revenus professionnels nets", text: "Saisir le total des revenus d'activité du foyer sur les 3 derniers mois. 59,85 % de ce montant s'ajoute au forfaitaire pour alimenter la prime." },
          { name: "Prendre en compte la bonification et le forfait logement", text: "La bonification individuelle atteint jusqu'à 240,63 EUR/mois par actif du foyer, atteints à partir de 1 658,76 EUR net. Si une aide au logement est percue, déduire le forfait logement (76,59 EUR pour 1 personne)." },
          { name: "Lire le montant mensuel estime", text: "Prime = forfaitaire + 59,85 % des revenus + bonification - ressources du foyer - forfait logement. En dessous de 15 EUR, la prime n'est pas versee. Declarer trimestriellement sur caf.fr pour maintenir le versement." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La prime d'activite est calculee par la CAF a partir des revenus d'activite du foyer, d'un montant forfaitaire selon la composition familiale et d'une bonification individuelle. Le simulateur applique les baremes CAF en vigueur.`}
        sources={[
          { label: "CAF - Prime d'activite", url: "https://www.caf.fr" },
          { label: "Service-Public.fr - Prime d'activite", url: "https://www.service-public.fr/particuliers/vosdroits/F2882" },
        ]}
      />


      <RelatedCalculators currentSlug="/calcul-prime-activite" />
    </div>
  );
}
