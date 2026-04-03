import type { Metadata } from "next";
import CalculateurHeuresTravail from "./CalculateurHeuresTravail";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title:
    "Calcul Heures de Travail 2026 - Compteur d'heures gratuit en ligne",
  description:
    "Calculez vos heures de travail : journee, semaine complete, heures supplementaires. Compteur avec pause, majoration et estimation de salaire. Gratuit et instantane.",
  keywords:
    "calcul heures travail, compteur heures, heures supplementaires, calcul temps de travail, planning horaires, heures travaillees semaine, 35 heures, majoration heures sup, calcul salaire horaire",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Heures de Travail" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quelle est la duree legale du travail en France ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La duree legale du travail en France est de 35 heures par semaine, soit 151,67 heures par mois. Au-dela de 35 heures, les heures travaillees sont des heures supplementaires majorees de 25% (de la 36e a la 43e heure) puis de 50% (a partir de la 44e heure)."
                }
              },
              {
                "@type": "Question",
                name: "Comment sont calculees les heures supplementaires ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les heures supplementaires sont majorees par rapport au taux horaire normal : +25% pour les 8 premieres heures (de la 36e a la 43e heure), puis +50% au-dela (a partir de la 44e heure). Le contingent annuel est de 220 heures par salarie, sauf accord d'entreprise."
                }
              },
              {
                "@type": "Question",
                name: "Quel est le SMIC horaire en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le SMIC horaire brut est de 11,88 EUR en 2026, soit un SMIC mensuel brut de 1 801,80 EUR pour 35 heures par semaine (151,67 heures mensualisees). Aucun salarie ne peut etre remunere en dessous de ce seuil."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Heures de Travail" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⏰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Heures de Travail
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comptez vos heures de travail, gerez votre planning hebdomadaire et
        calculez vos heures supplementaires.
      </p>

      <CalculateurHeuresTravail />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer ses heures de travail ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le calcul des heures de travail est essentiel pour verifier votre
          fiche de paie, suivre votre temps de travail ou calculer vos heures
          supplementaires. La formule de base est simple : heure de fin moins
          heure de debut, moins le temps de pause. Par exemple, si vous
          travaillez de 9h00 a 17h30 avec 1h de pause, vous travaillez
          7h30 effectives.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La duree legale du travail en France
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          En France, la duree legale du travail est fixee a <strong>35 heures
          par semaine</strong> depuis les lois Aubry de 1998-2000. Cette duree
          s&apos;applique a tous les salaries, sauf exceptions prevues par la
          loi ou les conventions collectives. Au-dela de 35 heures, les heures
          travaillees sont considerees comme des heures supplementaires et
          donnent lieu a une majoration de salaire ou a un repos compensateur.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les heures supplementaires : comment ca marche ?
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              De la 36e a la 43e heure
            </p>
            <p className="text-amber-600 font-bold text-lg">+25%</p>
            <p className="text-xs text-slate-500 mt-1">
              Les 8 premieres heures supplementaires sont majorees de 25%.
              Exemple : si votre taux horaire est de 12 EUR, chaque heure
              sup est payee 15 EUR.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              A partir de la 44e heure
            </p>
            <p className="text-amber-600 font-bold text-lg">+50%</p>
            <p className="text-xs text-slate-500 mt-1">
              Au-dela de 43 heures, la majoration passe a 50%.
              Exemple : votre taux de 12 EUR passe a 18 EUR de l&apos;heure.
            </p>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          Attention : une convention collective peut prevoir des taux de
          majoration differents (minimum 10%). Le contingent annuel d&apos;heures
          supplementaires est fixe a 220 heures par salarie et par an, sauf
          accord d&apos;entreprise.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les durees maximales de travail
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">Limite</th>
                <th className="pb-2 text-slate-500 font-medium">Duree</th>
                <th className="pb-2 text-slate-500 font-medium">Condition</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">Journaliere</td>
                <td className="py-2">10 heures</td>
                <td className="py-2">Sauf derogation (12h max)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">Hebdomadaire absolue</td>
                <td className="py-2">48 heures</td>
                <td className="py-2">Ne peut etre depassee</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">Hebdomadaire moyenne</td>
                <td className="py-2">44 heures</td>
                <td className="py-2">Sur 12 semaines consecutives</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Repos quotidien</td>
                <td className="py-2">11 heures</td>
                <td className="py-2">Entre 2 journees de travail</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le temps de pause obligatoire
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le Code du travail prevoit une pause minimale de <strong>20 minutes
          consecutives</strong> des que le temps de travail quotidien atteint
          6 heures. Cette pause n&apos;est generalement pas remuneree, sauf
          disposition contraire de la convention collective. En pratique, la
          plupart des entreprises accordent 1 heure de pause dejeuner, ce qui
          inclut la pause legale de 20 minutes.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Heures decimales vs heures-minutes
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Pour la paie, les heures sont souvent exprimees en decimales :
          7h30 = 7,50 heures, 7h45 = 7,75 heures, 7h15 = 7,25 heures.
          La conversion est simple : divisez les minutes par 60. Exemple :
          45 minutes / 60 = 0,75. Notre calculateur effectue cette conversion
          automatiquement.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les differents regimes horaires
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>35 heures :</strong> la duree legale. 7 heures par jour
            sur 5 jours, ou 8 heures sur 4 jours + 1/2 journee.
          </li>
          <li>
            <strong>39 heures :</strong> regime tres courant. Les 4 heures
            supplementaires sont majorees a +25% chaque semaine, ou compensees
            par des RTT (environ 23 jours/an).
          </li>
          <li>
            <strong>Temps partiel :</strong> toute duree inferieure a 35 heures.
            Minimum legal de 24 heures/semaine sauf derogation. Les heures
            complementaires (entre la duree contractuelle et 35h) sont majorees
            de 10%.
          </li>
          <li>
            <strong>Forfait jours :</strong> pour les cadres autonomes.
            Pas de decompte horaire, mais un maximum de 218 jours travailles
            par an. Les jours supplementaires sont compenses par des jours
            de repos (RTT).
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le SMIC horaire en 2026
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Le SMIC (Salaire Minimum Interprofessionnel de Croissance) horaire
          brut est de <strong>11,88 EUR</strong> en 2026, soit un SMIC mensuel
          brut de 1 801,80 EUR pour 35 heures (151,67 heures mensualisees).
          Aucun salarie ne peut etre remunere en dessous de ce seuil, quelle
          que soit la forme du contrat (CDI, CDD, interim, alternance).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Conseils pour bien comptabiliser ses heures
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>
            <strong>Notez vos heures quotidiennement :</strong> ne vous fiez
            pas a votre memoire. Utilisez une application, un tableur ou notre
            calculateur.
          </li>
          <li>
            <strong>Verifiez votre fiche de paie :</strong> comparez les heures
            declarees avec vos releves personnels. Les erreurs sont frequentes.
          </li>
          <li>
            <strong>Conservez vos preuves :</strong> en cas de litige, les
            tribunaux acceptent les releves manuscrits du salarie si
            l&apos;employeur ne peut pas produire de pointage.
          </li>
          <li>
            <strong>Connaissez votre convention collective :</strong> elle peut
            prevoir des majorations plus favorables, des pauses plus longues
            ou des jours de repos supplementaires.
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-heures-travail" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
