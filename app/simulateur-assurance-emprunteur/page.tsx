import type { Metadata } from "next";
import SimulateurAssuranceEmprunteur from "./SimulateurAssuranceEmprunteur";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import LeadCaptureForm from "../components/LeadCaptureForm";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-assurance-emprunteur" },
  title: "Simulateur Assurance Emprunteur 2026 - Cout et economie",
  description:
    "Calculez le cout de votre assurance de pret immobilier et comparez banque vs delegation (loi Lemoine 2022). Simulateur gratuit, economie jusqu'a 20 000 EUR.",
  keywords:
    "assurance emprunteur, simulateur assurance pret immobilier, cout assurance pret, delegation assurance emprunteur, loi Lemoine, economie assurance pret",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Combien coûte une assurance de prêt immobilier en 2026 ?",
    a: "Le taux moyen d'une assurance emprunteur souscrite chez la banque se situe entre 0,30 % et 0,60 % par an du capital initial en 2026, selon l'âge et le profil (fumeur/non-fumeur). En délégation (assurance externe), les taux tombent à 0,10 %-0,30 %. Pour un emprunt de 200 000 € sur 20 ans, cela représente environ 12 000-24 000 € chez la banque contre 4 000-12 000 € en délégation.",
  },
  {
    q: "Puis-je changer d'assurance emprunteur à tout moment ?",
    a: "Oui, depuis la loi Lemoine du 1er juin 2022, vous pouvez résilier votre assurance emprunteur à tout moment, sans frais et sans attendre une date anniversaire. La nouvelle assurance doit offrir des garanties équivalentes à l'ancienne. L'économie moyenne constatée est de 5 000 à 20 000 € sur la durée du prêt.",
  },
  {
    q: "L'assurance emprunteur est-elle obligatoire ?",
    a: "Légalement, non : aucune loi ne l'impose. En pratique, les banques l'exigent presque toujours pour accorder un prêt immobilier. Vous êtes en revanche libre de choisir l'assureur (délégation) : la banque ne peut pas vous imposer son contrat dès lors que les garanties sont équivalentes.",
  },
  {
    q: "Comment fonctionne la quotité d'assurance emprunteur ?",
    a: "La quotité représente le pourcentage du capital assuré par personne. Pour un emprunteur seul : 100 % (le prêt est couvert à 100 % en cas de décès/invalidité). Pour un couple : 100 % chacun (total 200 %) pour une protection maximale, ou 50/50 (total 100 %) pour réduire le coût. La quotité 200 % double le coût mais offre une sécurité totale : le survivant n'a plus de mensualités à payer.",
  },
  {
    q: "Quelles garanties sont obligatoires dans une assurance emprunteur ?",
    a: "Les banques exigent généralement : décès (DC), perte totale et irréversible d'autonomie (PTIA), invalidité permanente totale (IPT). L'incapacité temporaire de travail (ITT) est optionnelle pour les résidences secondaires mais obligatoire pour la résidence principale. La garantie perte d'emploi est optionnelle et peu recommandée (coûteuse avec de nombreuses exclusions).",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Assurance Emprunteur" description="Simulateur gratuit du cout de l'assurance de pret immobilier" category="FinanceApplication" />
      <Breadcrumb currentPage="Simulateur Assurance Emprunteur" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🛡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Assurance Emprunteur 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le cout de votre assurance de pret et l&apos;economie realisable avec la delegation (loi Lemoine).
      </p>

      <SimulateurAssuranceEmprunteur />

      <LeadCaptureForm
        nicheId="assurance-pret"
        titreOverride="Comparez les meilleures offres d'assurance emprunteur"
        couleur="#0d9488"
      />


      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Assurance emprunteur : tout comprendre en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>assurance emprunteur</strong> est exigee par les banques pour securiser un pret immobilier.
          Elle couvre le remboursement en cas de <strong>deces, invalidite ou incapacite de travail</strong> de l&apos;emprunteur.
          Son cout peut representer jusqu&apos;a <strong>30% du cout total du credit</strong>, soit souvent plusieurs dizaines
          de milliers d&apos;euros sur la duree du pret.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">La loi Lemoine : changez d&apos;assurance a tout moment</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis le <strong>1er juin 2022</strong>, la loi Lemoine permet de resilier son assurance emprunteur
          <strong> a tout moment</strong>, sans frais et sans date anniversaire a attendre. Il suffit de trouver une
          assurance externe (delegation) offrant des garanties equivalentes et de fournir la substitution a la banque.
          L&apos;economie moyenne est de <strong>5 000 a 20 000 EUR</strong> selon le profil et la duree restante du pret.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Taux indicatifs assurance emprunteur 2026</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-2 text-slate-500">Profil</th>
                <th className="text-right py-2 px-2 text-slate-500">Banque (%/an)</th>
                <th className="text-right py-2 px-2 text-slate-500">Delegation (%/an)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">20-35 ans, non-fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,34%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,10%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">35-50 ans, non-fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,40%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,15%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">50-65 ans, non-fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,55%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,25%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">35-50 ans, fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,60%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,28%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Comment reduire le cout de votre assurance ?</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li><strong>Comparer les delegations</strong> : 5-10 devis en parallele (April, Cardif, Malakoff, MetLife, Generali...)</li>
          <li><strong>Negocier la quotite</strong> en couple : 50/50 reduit le cout de moitie vs 100/100</li>
          <li><strong>Exclure la perte d&apos;emploi</strong> si vous etes fonctionnaire ou CDI stable</li>
          <li><strong>Choisir l&apos;invalidite sur capital restant</strong> du (vs capital initial) si age eleve</li>
          <li><strong>Arreter de fumer</strong> 2 ans avant souscription peut diviser le taux par 2</li>
        </ul>
      </section>

      <HowToJsonLd
        name="Simuler le coût de l'assurance emprunteur"
        steps={[
          { name: "Renseigner le capital et le taux", text: "Entrer le montant du pret immobilier, la durée en années et le taux annuel d'assurance (ex. 0,34 % chez la banque pour un emprunteur de 20-35 ans non-fumeur, ou 0,10 % en delegation)." },
          { name: "Definir la quotite", text: "Pour un emprunteur seul, la quotite est de 100 %. Pour un couple : 100 % chacun (protection totale, coût double) ou 50/50 (coût reduit de moitie mais couverture partielle) ; la quotite influence directement le montant des primes." },
          { name: "Comparer banque et delegation et lire l'économie", text: "Le simulateur calcule le coût total sur la durée du pret pour le taux banque (0,30-0,60 %/an) et pour le taux en delegation (0,10-0,30 %/an), puis affiche l'économie realisable grace à la loi Lemoine (resiliation à tout moment sans frais)." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/simulateur-assurance-emprunteur" />
    </div>
  );
}
