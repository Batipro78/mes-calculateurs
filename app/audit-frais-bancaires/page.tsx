import type { Metadata } from "next";
import AuditFraisBancaires from "./AuditFraisBancaires";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/audit-frais-bancaires" },
  title: "Audit Frais Bancaires 2026 - Detectez les abus en 1 minute",
  description:
    "Verifiez si votre banque vous fait payer trop cher. Detection des frais caches 2026 (gestion digitale, virements instantanes, assurance liee). Comparez avec la moyenne et trouvez la meilleure banque selon votre profil.",
  keywords:
    "frais bancaires, audit frais bancaires, frais caches banque 2026, commission intervention, agios, banque moins chere, comparateur banque, frais abusifs, mediateur bancaire",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le montant moyen des frais bancaires en France en 2026 ?",
    a: "En 2026, les Francais paient en moyenne 215 € par an de frais bancaires en banque traditionnelle, contre seulement 35 € par an en banque en ligne. La difference s'explique principalement par les frais de tenue de compte, de carte et les commissions d'intervention.",
  },
  {
    q: "Quels sont les nouveaux frais caches 2026 ?",
    a: "Depuis 2026, 15 nouveaux types de frais sont apparus : frais de gestion digitale (2-5 €/mois pour l'application), virements instantanes 'premium' (illegaux depuis le 9 janvier 2025 selon la loi UE), assurances liees aux moyens de paiement souvent inutiles, et frais de desolidarisation pouvant atteindre 100 €.",
  },
  {
    q: "Quel est le plafond legal des commissions d'intervention ?",
    a: "La commission d'intervention est plafonnee a 8 € par operation et 80 € par mois (soit 960 €/an maximum). Pour les clients en situation de fragilite financiere, le plafond est reduit a 4 € par operation et 20 € par mois (240 €/an).",
  },
  {
    q: "Comment contester des frais bancaires abusifs ?",
    a: "Envoyez d'abord une lettre recommandee avec accuse de reception au service client de votre banque. Elle a 2 mois pour repondre. En cas de refus, saisissez gratuitement le mediateur bancaire de l'etablissement. En dernier recours, vous pouvez signaler a la DGCCRF ou saisir le tribunal judiciaire.",
  },
  {
    q: "Combien peut-on economiser en changeant de banque ?",
    a: "En passant d'une banque traditionnelle a une banque en ligne, l'economie moyenne est de 180 €/an, soit 900 € sur 5 ans et 1 800 € sur 10 ans. Boursobank, Fortuneo, Hello Bank et Monabanq proposent en plus des primes d'ouverture allant de 80 a 220 €.",
  },
  {
    q: "Qu'est-ce que le droit a la mobilite bancaire ?",
    a: "Depuis la loi Macron de 2017, changer de banque est gratuit et automatise. La nouvelle banque se charge de transférer tous vos virements et prelevements en 22 jours ouvres maximum. Vous n'avez qu'a signer un mandat de mobilite bancaire dans votre nouvelle banque.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Audit Frais Bancaires" />
      <Breadcrumb currentPage="Audit Frais Bancaires" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔍
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Audit Frais Bancaires 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Detectez en 1 minute les frais abusifs et caches que vous paye a votre banque. Comparez avec la moyenne nationale et trouvez la banque la moins chere selon votre profil.
      </p>

      <AuditFraisBancaires />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Frais bancaires en France : la verite chiffree pour 2026
        </h2>
        <p>
          Les <strong>frais bancaires</strong> represente un poste de depense souvent
          sous-estime. En 2026, les Francais paient <strong>215 € par an</strong> en
          moyenne dans une banque traditionnelle, contre seulement <strong>35 € par an</strong>
          dans une banque en ligne. Une difference de <strong>180 € par an</strong>, soit
          <strong> 1 800 € sur 10 ans</strong>, qui s&apos;explique par des tarifs souvent opaques
          et des frais nouveaux apparus en 2026.
        </p>

        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-red-800 mb-2">
            🚨 Les 4 frais caches 2026 a surveiller absolument
          </h3>
          <ul className="text-sm text-red-900 space-y-2">
            <li><strong>Frais de gestion digitale (2 a 5 €/mois)</strong> : l&apos;acces a l&apos;application mobile etait gratuit avant 2026. Beaucoup de banques le facturent desormais.</li>
            <li><strong>Virements instantanes &quot;premium&quot; (0,80 a 1,50 € par op)</strong> : depuis le 9 janvier 2025, ils doivent etre gratuits dans toute l&apos;UE. Si vous payez encore, c&apos;est <strong>illegal</strong>.</li>
            <li><strong>Assurance liee aux moyens de paiement</strong> : souvent souscrite sans le savoir, fait double emploi avec votre carte premium.</li>
            <li><strong>Frais de desolidarisation (jusqu&apos;a 100 €)</strong> : pour cloturer un compte joint, certaines banques abusent.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Plafonds legaux des frais bancaires en 2026
        </h2>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Type de frais</th>
                <th className="text-center p-3 font-semibold text-slate-700">Plafond legal 2026</th>
                <th className="text-center p-3 font-semibold text-slate-700">Client fragile</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3">Commission d&apos;intervention</td>
                <td className="p-3 text-center font-bold">8 €/op, 80 €/mois</td>
                <td className="p-3 text-center text-emerald-600 font-bold">4 €/op, 20 €/mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Rejet de cheque ≤ 50 €</td>
                <td className="p-3 text-center font-bold">30 € max</td>
                <td className="p-3 text-center text-emerald-600 font-bold">30 € max</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Rejet de cheque &gt; 50 €</td>
                <td className="p-3 text-center font-bold">50 € max</td>
                <td className="p-3 text-center text-emerald-600 font-bold">50 € max</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Rejet de prelevement</td>
                <td className="p-3 text-center font-bold">20 € max</td>
                <td className="p-3 text-center text-emerald-600 font-bold">20 € max</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Virement instantane SEPA</td>
                <td className="p-3 text-center text-emerald-600 font-bold">GRATUIT (loi UE)</td>
                <td className="p-3 text-center text-emerald-600 font-bold">GRATUIT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Tarifs moyens 2026 par type de frais
        </h2>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Frais</th>
                <th className="text-center p-3 font-semibold text-slate-700">Banque traditionnelle</th>
                <th className="text-center p-3 font-semibold text-slate-700">Banque en ligne</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3">Tenue de compte</td>
                <td className="p-3 text-center">20,60 €/an</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 €</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Carte Visa Classic</td>
                <td className="p-3 text-center">94,80 €/an</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 €</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Carte Visa Premier / Gold</td>
                <td className="p-3 text-center">165,60 €/an</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 € (sous conditions)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Virement guichet</td>
                <td className="p-3 text-center">5 € / op</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 € (en ligne)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">Frais de gestion digitale</td>
                <td className="p-3 text-center text-red-600 font-bold">2-5 €/mois</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 €</td>
              </tr>
              <tr className="border-b border-slate-100 bg-blue-50">
                <td className="p-3 font-bold">TOTAL MOYEN</td>
                <td className="p-3 text-center font-bold">215 €/an</td>
                <td className="p-3 text-center text-emerald-600 font-bold">35 €/an</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Comment contester des frais bancaires abusifs en 4 etapes
        </h2>
        <ol className="space-y-3">
          <li>
            <strong>Demandez le recapitulatif annuel des frais</strong> : envoye par votre banque chaque mois de janvier (obligatoire depuis 2014). Il liste tous les frais factures sur l&apos;annee precedente.
          </li>
          <li>
            <strong>Envoyez une lettre recommandee avec accuse de reception</strong> au service reclamations de votre banque. Citez les operations contestees, les dates, les montants. La banque a 15 jours ouvrables pour accuser reception et 2 mois pour repondre.
          </li>
          <li>
            <strong>Saisissez le mediateur bancaire</strong> en cas de refus : c&apos;est gratuit. Vous trouvez ses coordonnees sur le site de votre banque ou sur lemediateur.fr. Le mediateur a 90 jours pour rendre son avis.
          </li>
          <li>
            <strong>Signalez a la DGCCRF</strong> via SignalConso, ou saisissez le tribunal judiciaire en dernier recours. La DGCCRF a deja epinglé deux banques en 2026 pour frais injustifies.
          </li>
        </ol>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Mobilite bancaire : changer de banque sans effort
        </h2>
        <p>
          Depuis la <strong>loi Macron de 2017</strong>, changer de banque est devenu tres simple :
          la nouvelle banque s&apos;occupe gratuitement du transfert de TOUS vos virements et
          prelevements. La procedure prend <strong>22 jours ouvres maximum</strong> et est
          totalement automatique.
        </p>
        <ul>
          <li>Vous remplissez un mandat de mobilite bancaire dans votre nouvelle banque</li>
          <li>Elle contacte vos creanciers (impots, employeur, assurances...) pour les informer du changement</li>
          <li>L&apos;ancien compte n&apos;est PAS automatiquement clos : c&apos;est a vous de le faire</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Statut de fragilite financiere : un plafond divisé par 4
        </h2>
        <p>
          Si vous etes considere comme client en <strong>fragilite financiere</strong>
          (plus de 5 incidents/mois, decouvert prolonge, surendettement), vous beneficiez
          de plafonds reduits :
        </p>
        <ul>
          <li>Commissions d&apos;intervention plafonnees a <strong>20 €/mois</strong> (au lieu de 80 €)</li>
          <li>Souscription a une <strong>offre client fragile</strong> obligatoire (3 €/mois maximum)</li>
          <li>Plafonnement des frais d&apos;incidents a <strong>25 €/mois</strong></li>
        </ul>
        <p>
          La banque doit vous proposer ce statut automatiquement, mais en pratique vous
          devez souvent en faire la demande. <strong>N&apos;hesitez pas a la reclamer par ecrit.</strong>
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Top 5 des banques en ligne 2026
        </h2>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Banque</th>
                <th className="text-center p-3 font-semibold text-slate-700">Frais/an</th>
                <th className="text-center p-3 font-semibold text-slate-700">Prime</th>
                <th className="text-left p-3 font-semibold text-slate-700">Profil ideal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-bold">🥇 Boursobank</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 €</td>
                <td className="p-3 text-center">jusqu&apos;a 220 €</td>
                <td className="p-3">Tous profils, sans condition</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-bold">🥈 Fortuneo</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 €</td>
                <td className="p-3 text-center">jusqu&apos;a 150 €</td>
                <td className="p-3">Revenus &gt; 1 200 €/mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-bold">🥉 Hello Bank</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 €</td>
                <td className="p-3 text-center">80 €</td>
                <td className="p-3">Soutien BNP, decouvert souple</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-bold">Monabanq</td>
                <td className="p-3 text-center">36 €/an</td>
                <td className="p-3 text-center">160 €</td>
                <td className="p-3">Profils atypiques, interdits bancaires</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-bold">BforBank</td>
                <td className="p-3 text-center text-emerald-600 font-bold">0 €</td>
                <td className="p-3 text-center">160 €</td>
                <td className="p-3">Epargne et investissement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Sources et references
        </h2>
        <ul className="text-sm">
          <li><a href="https://www.tarifs-bancaires.gouv.fr/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Comparateur officiel tarifs-bancaires.gouv.fr</a></li>
          <li><a href="https://www.economie.gouv.fr/particuliers/gerer-mon-argent/gerer-mon-budget-et-mon-epargne/tout-savoir-sur-les-frais-bancaires" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Tout savoir sur les frais bancaires - economie.gouv.fr</a></li>
          <li><a href="https://www.banque-france.fr/fr/a-votre-service/particuliers/connaitre-pratiques-bancaires-assurance/compte-frais/les-frais-bancaires" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Les frais bancaires - Banque de France</a></li>
          <li><a href="https://www.moneyvox.fr/tarif-bancaire/banques-moins-cheres.php" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Classement banques moins cheres - MoneyVox</a></li>
        </ul>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <HowToJsonLd
        name="Auditer ses frais bancaires"
        steps={[
          { name: "Saisir les frais fixes annuels", text: "Renseigner le montant annuel de tenue de compte et le type de carte bancaire (Classic, Premier ou Infinite). Ces frais constituent la base de l'audit." },
          { name: "Ajouter les frais d'incidents", text: "Indiquer le nombre de commissions d'intervention, de rejets de cheque et de rejets de prelevement sur l'année. Les commissions d'intervention sont plafonnees à 8 EUR par operation et 80 EUR par mois." },
          { name: "Inclure les frais caches 2026", text: "Saisir les eventuels frais de gestion digitale (2 à 5 EUR/mois), virements instantanes premium (illegaux depuis janvier 2025 selon la loi UE), assurance liee aux moyens de paiement et frais de desolidarisation." },
          { name: "Comparer au barème de référence", text: "Le total annuel est compare à la moyenne nationale (215 EUR en banque traditionnelle, 35 EUR en banque en ligne). Les depassements des plafonds légaux sont signales comme potentiellement abusifs." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`L'outil compare vos frais bancaires (tenue de compte, incidents, commissions d'intervention) aux plafonds legaux et aux moyennes du marche. Les commissions d'intervention sont plafonnees par la reglementation.`}
        sources={[
          { label: "Service-Public.fr - Frais bancaires", url: "https://www.service-public.fr/particuliers/vosdroits/F2818" },
          { label: "Banque de France - Tarifs bancaires", url: "https://www.banque-france.fr" },
        ]}
      />


      <RelatedCalculators currentSlug="/audit-frais-bancaires" />
    </div>
  );
}
