import type { Metadata } from "next";
import CalculateurSalaire from "./CalculateurSalaire";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/salaire-brut-net" },
  title: "Calcul Salaire Brut Net 2026 - Simulateur gratuit",
  description:
    "Calculez votre salaire net a partir du brut (ou inversement) en 2026. Cadre, non-cadre, fonction publique. Methode, exemples, net avant/apres impot et FAQ.",
  keywords:
    "salaire brut net, calcul salaire, simulateur salaire, brut en net, net en brut, salaire cadre, salaire non cadre, net imposable, net social",
};

const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Du brut au net : ce que retient l'employeur",
    paras: [
      "Le salaire brut est le montant inscrit en haut de votre fiche de paie et dans votre contrat. Le salaire net, lui, est ce qui arrive reellement sur votre compte. Entre les deux, l'employeur preleve les cotisations sociales salariales : assurance maladie, retraite de base et complementaire, assurance chomage, CSG et CRDS.",
      "Ces cotisations representent en moyenne environ 22 % du brut pour un non-cadre du prive, 25 % pour un cadre (qui cotise davantage a la retraite complementaire et a la prevoyance), et environ 15 % dans la fonction publique. Ces taux sont indicatifs : le pourcentage exact depend de votre convention collective, de votre niveau de remuneration et de la mutuelle d'entreprise.",
      "Regle rapide pour estimer : multipliez votre brut par 0,78 pour un non-cadre et par 0,75 pour un cadre. Par exemple, 2 500 EUR brut donnent environ 1 950 EUR net pour un non-cadre.",
    ],
  },
  {
    title: "Net avant impot, net a payer, net imposable, net social",
    paras: [
      "Net avant impot : le salaire net une fois les cotisations retirees, mais avant l'impot sur le revenu.",
      "Net a payer (ou net a payer apres impot) : le montant reellement verse, une fois le prelevement a la source de l'impot deduit. C'est la somme qui figure tout en bas de la fiche de paie.",
      "Net imposable : la base sur laquelle est calcule l'impot. Il est legerement superieur au net avant impot, car une partie de la CSG/CRDS n'est pas deductible et s'y ajoute.",
      "Montant net social : une ligne obligatoire sur la fiche de paie depuis 2024. Il sert de reference pour le calcul de certaines aides sociales (RSA, prime d'activite) et peut differer du net a payer.",
    ],
  },
  {
    title: "Ce qui fait varier votre net",
    paras: [
      "Statut cadre ou non-cadre : un cadre a un taux de cotisation plus eleve, donc un net plus faible a brut egal, mais une meilleure couverture retraite et prevoyance.",
      "Primes et 13e mois : ils sont soumis aux memes cotisations que le salaire de base ; un 13e mois augmente donc le brut annuel mais subit aussi les charges.",
      "Heures supplementaires : elles beneficient d'une reduction de cotisations et d'une exoneration d'impot dans certaines limites, ce qui ameliore leur rendement net.",
      "Mutuelle, tickets restaurant, prevoyance : la part salariale de ces dispositifs est retiree du brut et influence le net final.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment passer rapidement du brut au net ?",
    a: "En estimation, multipliez le brut par 0,78 pour un non-cadre et par 0,75 pour un cadre. Exemple : 2 500 EUR brut font environ 1 950 EUR net pour un non-cadre. Le calculateur ci-dessus donne un resultat plus precis selon votre statut.",
  },
  {
    q: "Quelle est la difference entre salaire brut et salaire net ?",
    a: "Le brut est le montant avant deduction des cotisations sociales. Le net est ce que vous recevez sur votre compte, apres cotisations et apres le prelevement a la source de l'impot sur le revenu.",
  },
  {
    q: "Quels sont les taux de cotisations en 2026 ?",
    a: "A titre indicatif, environ 22 % du brut pour un non-cadre du prive, 25 % pour un cadre et 15 % dans la fonction publique. Le taux exact depend de la convention collective et du niveau de salaire.",
  },
  {
    q: "Pourquoi mon net imposable est-il superieur a mon net a payer ?",
    a: "Parce qu'une partie de la CSG et de la CRDS n'est pas deductible fiscalement et s'ajoute a la base imposable. Le net imposable sert au calcul de l'impot, le net a payer est ce que vous touchez.",
  },
  {
    q: "Un cadre gagne-t-il moins net qu'un non-cadre a brut egal ?",
    a: "Oui, legerement, car le cadre cotise davantage (retraite complementaire, prevoyance). En contrepartie, sa protection sociale et sa retraite future sont meilleures.",
  },
  {
    q: "Le prelevement a la source change-t-il mon salaire brut ?",
    a: "Non. Le brut et le net avant impot ne changent pas. Le prelevement a la source ne fait que retirer l'impot directement sur le net, au lieu de le payer l'annee suivante.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Salaire Brut/Net" />
      <Breadcrumb currentPage="Salaire Brut / Net" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Salaire Brut / Net 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez instantanement votre salaire brut en net ou net en brut.
        Taux 2026.
      </p>

      <CalculateurSalaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Taux de cotisations appliques (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Non-cadre</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~22%</p>
            <p className="text-xs text-slate-400 mt-1">Secteur prive</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Cadre</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~25%</p>
            <p className="text-xs text-slate-400 mt-1">Secteur prive</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Fonction publique</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~15%</p>
            <p className="text-xs text-slate-400 mt-1">Etat / Territorial</p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.paras.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <HowToJsonLd
        name="Convertir un salaire brut en net"
        steps={[
          { name: "Partir du brut", text: "Partir du salaire brut, mensuel ou annuel." },
          { name: "Deduire les cotisations", text: "Deduire les cotisations sociales salariales : environ 22 pour cent pour un non-cadre, 25 pour cent pour un cadre." },
          { name: "Net a payer", text: "Le resultat est le salaire net ; soustraire le prelevement a la source pour obtenir le net a payer." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode="Le salaire net est obtenu en deduisant du salaire brut les cotisations sociales salariales (Securite sociale, retraite, chomage, CSG/CRDS), soit environ 22 % pour un non-cadre et 25 % pour un cadre. Le net avant impot devient le net a payer apres prelevement a la source. Les taux appliques sont ceux en vigueur fixes par l'URSSAF."
        sources={[
          { label: "URSSAF - Taux de cotisations sociales", url: "https://www.urssaf.fr/accueil/taux-baremes.html" },
          { label: "Service-Public.fr - Bulletin de paie et salaire", url: "https://www.service-public.fr/particuliers/vosdroits/F559" },
          { label: "Impots.gouv.fr - Prelevement a la source", url: "https://www.impots.gouv.fr/particulier/le-prelevement-la-source" },
        ]}
      />

      <VillesLinks baseSlug="/salaire-brut-net" title="Salaire brut/net par ville" color="emerald" />
      <RelatedCalculators currentSlug="/salaire-brut-net" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
