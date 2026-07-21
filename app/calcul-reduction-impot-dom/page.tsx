import type { Metadata } from "next";
import CalculateurReductionDom from "./CalculateurReductionDom";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-reduction-impot-dom" },
  title: "Reduction d'Impot DOM 2026 - Refaction 30 % / 40 % (Antilles, Reunion, Guyane)",
  description:
    "Calculez la reduction d'impot automatique pour les residents des DOM : 30 % plafonnee a 2 450 EUR (Guadeloupe, Martinique, Reunion), 40 % plafonnee a 4 050 EUR (Guyane, Mayotte). Simulateur 2026.",
  keywords:
    "reduction impot DOM, refaction outre-mer, impot Reunion, impot Guadeloupe, impot Martinique, impot Guyane, impot Mayotte, article 197 CGI, fiscalite outre-mer",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que la refaction d'impot dans les DOM ?",
    a: "La refaction DOM est une reduction d'impot automatique prevue a l'article 197-I-3 du Code general des impots. Elle s'applique aux contribuables fiscalement domicilies dans un departement d'outre-mer au 31 decembre de l'annee d'imposition. Le taux est de 30 % pour la Guadeloupe, la Martinique et La Reunion (plafond 2 450 EUR), et de 40 % pour la Guyane et Mayotte (plafond 4 050 EUR). Ce n'est pas une case a cocher : elle est appliquee automatiquement par l'administration fiscale des lors que votre adresse de residence principale est dans un DOM.",
  },
  {
    q: "Qui a droit a la reduction d'impot dans les DOM ?",
    a: "Tout contribuable dont le domicile fiscal se trouve dans un departement d'outre-mer au 31 decembre de l'annee d'imposition. Attention : Saint-Martin, Saint-Barthelemy, la Polynesie francaise, la Nouvelle-Caledonie, Saint-Pierre-et-Miquelon et Wallis-et-Futuna ont leurs propres regimes fiscaux specifiques et ne beneficient pas de cette refaction. Seuls les cinq DOM (Guadeloupe, Martinique, La Reunion, Guyane, Mayotte) sont concernes.",
  },
  {
    q: "Faut-il demander la refaction DOM dans sa declaration d'impot ?",
    a: "Non, aucune demarche n'est necessaire. La reduction est appliquee automatiquement par l'administration fiscale en fonction de votre adresse de residence principale indiquee dans votre declaration de revenus. Si vous avez demenage en cours d'annee entre la metropole et un DOM (ou inversement), la refaction s'applique uniquement si vous etes domicilie dans le DOM au 31 decembre de l'annee d'imposition.",
  },
  {
    q: "Quels sont les plafonds de la refaction DOM ?",
    a: "Le plafond est de 2 450 EUR pour la Guadeloupe, la Martinique et La Reunion (taux 30 %), et de 4 050 EUR pour la Guyane et Mayotte (taux 40 %). Le plafond mord a partir d'un impot bareme d'environ 8 167 EUR pour la zone a 30 % et 10 125 EUR pour la zone a 40 %. Ces plafonds sont inchanges depuis l'imposition des revenus 2018 (loi de finances 2019).",
  },
  {
    q: "Mayotte beneficie-t-elle du taux de 30 % ou de 40 % ?",
    a: "Mayotte beneficie du taux de 40 % avec un plafond de 4 050 EUR, au meme titre que la Guyane. C'est le taux le plus avantageux, reserve aux DOM les plus eloignes et ayant les niveaux de vie les plus contraints. La Guadeloupe, la Martinique et La Reunion beneficient du taux de 30 % (plafond 2 450 EUR).",
  },
  {
    q: "La refaction DOM se cumule-t-elle avec d'autres avantages fiscaux outre-mer ?",
    a: "Oui. La refaction DOM est une reduction d'impot appliquee sur l'impot resultant du bareme progressif, apres la decote et avant les autres reductions et credits d'impot classiques (Pinel, Girardin, dons, etc.). Elle ne fait pas obstacle au benefice d'autres dispositifs d'investissement outre-mer. En pratique, un resident DOM peut cumuler la refaction automatique avec, par exemple, une reduction Girardin, ce qui peut amener l'impot final tres proche de zero.",
  },
  {
    q: "Quelle est la difference entre une reduction d'impot et un abattement sur le revenu ?",
    a: "C'est une erreur frequente : la refaction DOM est une REDUCTION D'IMPOT, pas un abattement sur le revenu. Un abattement s'applique sur le revenu imposable avant calcul du bareme (il reduit la base), tandis qu'une reduction d'impot s'applique directement sur l'impot calcule (elle reduit le montant a payer). Concretement, si votre impot bareme est de 3 000 EUR a La Reunion, la refaction de 30 % reduit directement cet impot de 900 EUR, vous laissant 2 100 EUR a payer — et non 900 EUR de revenus en moins.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Reduction d'Impot DOM"
        description="Simulateur de refaction d'impot pour les residents des departements d'outre-mer (DOM)"
        category="FinanceApplication"
      />
      <Breadcrumb currentPage="Reduction d'Impot DOM" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏝
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Reduction d&apos;Impot DOM 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la refaction automatique de 30 % ou 40 % pour les residents des departements d&apos;outre-mer.
      </p>

      <CalculateurReductionDom />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          La refaction DOM : une reduction d&apos;impot automatique pour les residents outre-mer
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les contribuables domicilies dans un <strong>departement d&apos;outre-mer</strong> (DOM)
          beneficient d&apos;une reduction d&apos;impot automatique, appelee <strong>refaction DOM</strong>,
          prevue a l&apos;<strong>article 197-I-3 du Code general des impots</strong> (CGI).
          Cette reduction s&apos;applique directement sur l&apos;impot calcule selon le bareme progressif,
          apres la decote et avant les autres reductions et credits d&apos;impot.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Deux zones, deux taux</h3>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="font-bold text-blue-900 mb-2">Zone 30 % — plafond 2 450 EUR</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Guadeloupe</li>
              <li>Martinique</li>
              <li>La Reunion</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              Plafond atteint au-dela de 8 167 EUR d&apos;impot bareme
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-bold text-emerald-900 mb-2">Zone 40 % — plafond 4 050 EUR</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Guyane</li>
              <li>Mayotte</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              Plafond atteint au-dela de 10 125 EUR d&apos;impot bareme
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemples chiffres</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            Impot bareme <strong>3 000 EUR</strong> a <strong>La Reunion</strong> :
            reduction = 3 000 x 30 % = <strong>900 EUR</strong>, impot final = <strong>2 100 EUR</strong>
            (plafond non atteint)
          </li>
          <li>
            Impot bareme <strong>12 000 EUR</strong> en <strong>Guadeloupe</strong> :
            reduction theorique = 3 600 EUR, mais plafonnee a <strong>2 450 EUR</strong>,
            impot final = <strong>9 550 EUR</strong>
          </li>
          <li>
            Impot bareme <strong>12 000 EUR</strong> en <strong>Guyane</strong> :
            reduction theorique = 4 800 EUR, mais plafonnee a <strong>4 050 EUR</strong>,
            impot final = <strong>7 950 EUR</strong>
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Qui est concerne ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La refaction s&apos;applique a tout contribuable dont le <strong>domicile fiscal</strong> se trouve
          dans un DOM au <strong>31 decembre de l&apos;annee d&apos;imposition</strong>.
          Elle est appliquee <strong>automatiquement</strong> par l&apos;administration fiscale
          en fonction de l&apos;adresse declaree : aucune demarche particuliere n&apos;est requise.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Attention : <strong>Saint-Martin, Saint-Barthelemy, la Polynesie francaise,
          la Nouvelle-Caledonie et Wallis-et-Futuna</strong> ne sont pas des DOM au sens fiscal.
          Ces collectivites ont leurs propres regimes d&apos;imposition et ne beneficient pas
          de la refaction prevue a l&apos;article 197-I-3 du CGI.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Mecanisme : reduction d&apos;impot, pas abattement</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une erreur courante consiste a confondre la refaction DOM avec un abattement sur le revenu imposable.
          Ce sont deux mecanismes distincts :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-1">Abattement sur le revenu</p>
            <p className="text-sm text-slate-700">
              Reduit la <em>base imposable</em> avant calcul du bareme.
              Plus efficace pour les hauts revenus (joue sur la progressivite).
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="font-bold text-blue-900 mb-1">Reduction d&apos;impot DOM (refaction)</p>
            <p className="text-sm text-slate-700">
              Reduit directement l&apos;<em>impot calcule</em> apres le bareme.
              Plafonnee, automatique, appliquee avant les autres reductions.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Cumul avec d&apos;autres dispositifs outre-mer</h3>
        <p className="text-slate-600 leading-relaxed">
          La refaction DOM se cumule parfaitement avec les autres dispositifs fiscaux outre-mer :
          reduction Girardin (investissement productif ou logement social), loi Pinel Outre-Mer,
          ou encore les credits d&apos;impot classiques. Elle s&apos;applique en premier sur l&apos;impot bareme,
          puis les autres reductions viennent s&apos;y ajouter. Dans certains profils (investissement Girardin
          important), l&apos;impot final peut etre reduit a zero.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer la réduction d'impôt DOM (réfaction outre-mer)"
        steps={[
          { name: "Sélectionner le département d'outre-mer", text: "Choisir parmi Guadeloupe, Martinique, La Reunion (taux 30 %, plafond 2 450 EUR) ou Guyane, Mayotte (taux 40 %, plafond 4 050 EUR). La réfaction s'applique au domicile fiscal au 31 décembre de l'année d'imposition." },
          { name: "Saisir l'impôt barème avant réfaction", text: "Entrer le montant d'impôt calcule selon le barème progressif, après décote et avant les autres réductions. Ce chiffre figure sur l'avis d'imposition." },
          { name: "Appliquer le calcul de réfaction", text: "Réduction = minimum entre (taux x impôt barème) et le plafond. Ex. 3 000 EUR d'impôt à La Reunion : 3 000 x 30 % = 900 EUR de réduction (plafond 2 450 EUR non atteint)." },
          { name: "Lire l'impôt final après réfaction", text: "Impôt après réfaction = impôt barème - réduction. Ex. 3 000 - 900 = 2 100 EUR. La réfaction est appliquee automatiquement par l'administration fiscale ; aucune demarche n'est requise." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode="La refaction DOM est calculee conformement a l'article 197-I-3 du CGI : taux de 30 % (plafond 2 450 EUR) pour la Guadeloupe, la Martinique et La Reunion, taux de 40 % (plafond 4 050 EUR) pour la Guyane et Mayotte. Le simulateur applique la formule : reduction = min(taux x impot bareme, plafond), puis deduit la reduction de l'impot bareme pour obtenir l'impot apres refaction. Plafonds issus de la loi de finances pour 2019, inchanges depuis (imposition des revenus 2018 et suivants)."
        sources={[
          {
            label: "BOFiP BOI-IR-LIQ-20-30-10 — Reduction d'impot outre-mer (art. 197 CGI)",
            url: "https://bofip.impots.gouv.fr/bofip/4618-PGP.html",
          },
          {
            label: "Impots.gouv.fr — Domicile fiscal et imposition des revenus",
            url: "https://www.impots.gouv.fr/particulier/questions/puis-je-beneficier-dune-reduction-dimpot-si-jhabite-dans-un-dom",
          },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-reduction-impot-dom" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
