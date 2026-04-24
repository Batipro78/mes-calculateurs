import type { Metadata } from "next";
import CalculateurPrestation from "./CalculateurPrestation";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-prestation-compensatoire" },
  title: "Calcul Prestation Compensatoire Divorce 2026 - Simulateur",
  description:
    "Calculez le montant estime de la prestation compensatoire en cas de divorce. 3 methodes (Depondt CA Paris, moyenne, esperance de vie). Article 271 Code civil.",
  keywords:
    "prestation compensatoire, calcul prestation compensatoire, divorce prestation, bareme Depondt, article 271 code civil, simulateur prestation divorce",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que la prestation compensatoire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La prestation compensatoire (art. 270 et 271 du Code civil) est une somme versee par un conjoint a l'autre lors d'un divorce, destinee a compenser la disparite creee dans les conditions de vie respectives par la rupture du mariage. Elle prend generalement la forme d'un capital (versement unique ou echelonne sur 8 ans max), ou plus rarement d'une rente viagere. Elle est distincte de la pension alimentaire (qui concerne les enfants).",
      },
    },
    {
      "@type": "Question",
      name: "Qui paye la prestation compensatoire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La prestation compensatoire est versee par le conjoint aux revenus/patrimoine plus eleves au conjoint aux revenus plus faibles, quel que soit son sexe ou le type de divorce (consentement mutuel, faute, alteration lien conjugal, acceptation). Elle est due meme en cas de divorce par consentement mutuel si les parties l'ont prevue dans leur convention. Le juge est libre de determiner le montant, meme si les epoux en avaient convenu un different.",
      },
    },
    {
      "@type": "Question",
      name: "Comment le juge calcule-t-il la prestation compensatoire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'article 271 du Code civil liste les criteres : duree du mariage, age et etat de sante des conjoints, qualification et situation professionnelle, consequences du choix professionnel fait pour l'education des enfants, patrimoine estime ou previsible, droits existants et previsibles (retraite notamment), situation respective en matiere de pensions de retraite. Il n'existe PAS de formule legale unique : le juge apprecie librement. Les avocats utilisent des baremes indicatifs (methode Depondt de la CA Paris, methodes ponderees) pour faire des propositions.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coute en moyenne une prestation compensatoire en France ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selon les statistiques du ministere de la Justice, le montant median d'une prestation compensatoire en France se situe autour de 30 000 EUR, mais la fourchette est tres large : de quelques milliers d'euros pour un mariage court avec revenus similaires, jusqu'a 500 000 EUR+ pour de longs mariages avec forte disparite. Les prestations superieures a 200 000 EUR representent environ 15% des cas. Dans 70% des cas, la prestation est versee sous forme de capital (pas de rente).",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Calcul Prestation Compensatoire" description="Simulateur prestation compensatoire divorce" category="LegalApplication" />
      <Breadcrumb currentPage="Calcul Prestation Compensatoire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Prestation Compensatoire Divorce</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation indicative selon 3 methodes utilisees par les avocats (Depondt CA Paris, moyenne, esperance de vie).
      </p>

      <CalculateurPrestation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">La prestation compensatoire en 2026</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>prestation compensatoire</strong> (art. 270 Code civil) a pour objet de <strong>compenser la disparite
          que le divorce cree dans les conditions de vie respectives</strong> des epoux. Elle n&apos;est pas automatique :
          elle doit etre demandee.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les criteres de l&apos;article 271 CC</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">Le juge prend en compte notamment :</p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>La <strong>duree du mariage</strong> (les longs mariages donnent lieu a des prestations plus elevees)</li>
          <li>L&apos;<strong>age et l&apos;etat de sante</strong> des conjoints</li>
          <li>Les <strong>qualifications et situation professionnelle</strong></li>
          <li>Les <strong>choix professionnels</strong> faits pour elever les enfants (interruption de carriere, temps partiel)</li>
          <li>Le <strong>patrimoine</strong> estime et previsible (y compris apres liquidation du regime matrimonial)</li>
          <li>Les <strong>droits a la retraite</strong> existants et previsibles</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les 3 methodes de calcul indicatives</h3>
        <div className="grid gap-4 sm:grid-cols-3 mb-4">
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
            <p className="font-bold text-violet-900 mb-2">Methode Depondt</p>
            <p className="text-sm text-slate-700">Reference CA Paris. Formule : (ecart annuel × duree × 0,4) / 2. Donne des montants modérés.</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
            <p className="font-bold text-violet-900 mb-2">Methode moyenne</p>
            <p className="text-sm text-slate-700">Formule simplifiee : ecart mensuel × 12 × (duree mariage × 0,5). Resultat median.</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
            <p className="font-bold text-violet-900 mb-2">Methode esperance de vie</p>
            <p className="text-sm text-slate-700">Prend en compte l&apos;age et l&apos;esperance de vie restante. Favorise les prestations plus longues.</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Forme de la prestation</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li><strong>Capital (70% des cas)</strong> : versement unique ou echelonne sur 8 ans maximum</li>
          <li><strong>Attribution de biens</strong> : transfert de propriete d&apos;un immeuble, de parts de societe, etc.</li>
          <li><strong>Rente viagere (rare)</strong> : uniquement si le creancier ne peut subvenir a ses besoins en raison de son age ou de son etat de sante</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-prestation-compensatoire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
