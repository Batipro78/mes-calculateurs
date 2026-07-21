import type { Metadata } from "next";
import CalculateurRentabilite from "./CalculateurRentabilite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-rentabilite-locative" },
  title: "Calcul Rentabilite Locative - Brute et Nette 2026",
  description:
    "Calculez la rentabilite locative brute et nette de votre investissement immobilier. Charges, taxe fonciere, vacance locative. Simulateur gratuit.",
  keywords:
    "calcul rentabilite locative, rentabilite brute nette, rendement locatif, investissement immobilier rentabilite, simulateur rentabilite locative, rendement immobilier 2026",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Rentabilité brute, nette et nette-nette : trois niveaux",
    paras: [
      "La rentabilité brute est la plus simple : loyer annuel divisé par le prix d'achat. C'est un indicateur rapide pour comparer des biens, mais il est optimiste car il ignore toutes les dépenses.",
      "La rentabilité nette déduit les charges réelles : taxe foncière, charges de copropriété non récupérables, assurance propriétaire non occupant, frais de gestion et vacance locative. Elle reflète le rendement avant impôt.",
      "La rentabilité nette-nette va plus loin en déduisant la fiscalité : impôt sur les revenus fonciers et prélèvements sociaux de 17,2 %. C'est le chiffre le plus honnête, celui qui correspond à ce qui reste réellement dans votre poche.",
    ],
  },
  {
    title: "Le cash-flow : l'indicateur qui compte au quotidien",
    paras: [
      "Au-delà du pourcentage, c'est le cash-flow qui détermine si un investissement vous coûte ou vous rapporte chaque mois. Cash-flow = loyers encaissés − (mensualité de crédit + charges + impôts).",
      "Un cash-flow positif signifie que le bien s'autofinance et génère un revenu complémentaire. Un cash-flow négatif impose un effort d'épargne mensuel : ce n'est pas forcément un mauvais choix si la plus-value à la revente est attendue, mais il faut pouvoir l'assumer.",
    ],
  },
  {
    title: "Ce qui réduit la rentabilité réelle",
    paras: [
      "Une rentabilité brute affichée à 6 % peut facilement tomber à 3 % net-net une fois tout pris en compte. Les principaux postes qui grignotent le rendement sont la vacance locative (un mois sans locataire représente déjà plus de 8 % du loyer annuel), les charges non récupérables et les frais de gestion si vous passez par une agence (souvent 6 à 8 % des loyers).",
      "S'ajoutent l'entretien et les travaux, la taxe foncière, et surtout la fiscalité : les revenus fonciers s'ajoutent à votre revenu imposable et subissent 17,2 % de prélèvements sociaux. Toujours raisonner en net-net avant d'investir.",
    ],
  },
  {
    title: "Comment améliorer sa rentabilité locative",
    paras: [
      "Plusieurs leviers existent. Le premier est le prix d'achat : chaque euro négocié améliore mécaniquement le rendement. Le choix de la ville compte aussi, certaines offrant un bien meilleur rapport prix/loyer que les grandes métropoles tendues.",
      "Côté exploitation, la location meublée (statut LMNP) offre une fiscalité souvent plus avantageuse grâce à l'amortissement du bien. La colocation ou la location de courte durée peuvent augmenter les loyers, au prix d'une gestion plus active. Enfin, un bon emplacement limite la vacance, qui est l'ennemie n°1 de la rentabilité.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer la rentabilite locative brute ?",
    a: "Rentabilite brute = (loyer annuel / prix d'achat total) x 100. Exemple : loyer 800 €/mois, achat 200 000 € => (9 600 / 200 000) x 100 = 4,8%. C'est un indicateur rapide mais ne tient pas compte des charges.",
  },
  {
    q: "Comment calculer la rentabilite locative nette ?",
    a: "Rentabilite nette = ((loyer annuel - charges - taxe fonciere) / investissement total) x 100. L'investissement total inclut le prix d'achat, les frais de notaire et les travaux. C'est l'indicateur le plus fiable.",
  },
  {
    q: "Quelle est une bonne rentabilite locative ?",
    a: "En France, la rentabilite nette moyenne se situe entre 3% et 5%. Au-dessus de 5% net, c'est considere comme bon. Au-dessus de 7%, c'est excellent. En dessous de 3%, c'est faible sauf si la plus-value attendue compense.",
  },
  {
    q: "Faut-il inclure les frais de notaire dans le calcul ?",
    a: "Oui. Pour obtenir une rentabilite nette realiste, l'investissement total doit inclure le prix d'achat, les frais de notaire (7 a 8% dans l'ancien, 2 a 3% dans le neuf) et les travaux eventuels. Ne pas les inclure surestime la rentabilite.",
  },
  {
    q: "Qu'est-ce que la rentabilité nette-nette ?",
    a: "C'est la rentabilité après impôts. On part de la rentabilité nette de charges, puis on déduit l'impôt sur les revenus fonciers et les prélèvements sociaux de 17,2 %. C'est l'indicateur le plus réaliste, car il correspond à ce qui reste vraiment après toutes les dépenses et la fiscalité.",
  },
  {
    q: "Qu'est-ce que le cash-flow d'un investissement locatif ?",
    a: "Le cash-flow est la somme qui reste chaque mois après avoir payé la mensualité de crédit, les charges et les impôts avec les loyers encaissés. S'il est positif, le bien s'autofinance et rapporte. S'il est négatif, il demande un effort d'épargne mensuel.",
  },
  {
    q: "La location meublée est-elle plus rentable ?",
    a: "Souvent oui, principalement grâce à la fiscalité. En meublé non professionnel (LMNP) au régime réel, l'amortissement du bien et du mobilier permet de réduire fortement, voire d'annuler, l'impôt sur les loyers pendant plusieurs années. Les loyers d'un meublé sont aussi généralement plus élevés, au prix d'une gestion plus active.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Rentabilite Locative" />
      <Breadcrumb currentPage="Rentabilite Locative" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏢
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Rentabilite Locative 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la rentabilite brute et nette de votre investissement locatif. Charges, taxe fonciere, vacance.
      </p>

      <CalculateurRentabilite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comment calculer la rentabilite locative ?</h2>

        <h3 className="font-bold text-slate-800 mt-4 mb-3">Formules</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-amber-50/50 rounded-xl p-4">
            <p className="font-semibold text-amber-700 mb-1">Rentabilite brute</p>
            <p className="text-sm text-slate-600">(Loyer annuel &divide; Prix d&apos;achat) &times; 100</p>
          </div>
          <div className="bg-amber-50/50 rounded-xl p-4">
            <p className="font-semibold text-amber-700 mb-1">Rentabilite nette</p>
            <p className="text-sm text-slate-600">(Loyer net &divide; Invest. total) &times; 100</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Echelle de rentabilite</h3>
        <div className="space-y-2">
          {[
            { label: "Excellente", range: "> 7%", color: "bg-green-100 text-green-700" },
            { label: "Bonne", range: "5% - 7%", color: "bg-emerald-100 text-emerald-700" },
            { label: "Moyenne", range: "3% - 5%", color: "bg-amber-100 text-amber-700" },
            { label: "Faible", range: "< 3%", color: "bg-red-100 text-red-700" },
          ].map((r) => (
            <div key={r.label} className={`rounded-xl p-3 flex justify-between items-center ${r.color}`}>
              <span className="text-sm font-semibold">{r.label}</span>
              <span className="text-xs">{r.range}</span>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Rentabilite moyenne par ville (2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Ville</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Renta brute moy.</th>
            </tr></thead>
            <tbody>
              {[
                { v: "Paris", r: "2,5% - 3,5%" }, { v: "Lyon", r: "3% - 4,5%" }, { v: "Marseille", r: "4% - 6%" },
                { v: "Bordeaux", r: "3% - 4,5%" }, { v: "Lille", r: "4,5% - 6,5%" }, { v: "Toulouse", r: "3,5% - 5%" },
                { v: "Saint-Etienne", r: "6% - 10%" }, { v: "Mulhouse", r: "7% - 12%" },
              ].map((item) => (
                <tr key={item.v} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{item.v}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-amber-600">{item.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections de contenu detaille (prose en chaines JS) */}
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
        name="Calculer la rentabilité locative brute et nette"
        steps={[
          { name: "Saisir le prix d'achat total et le loyer mensuel", text: "Entrer le prix d'acquisition complet (prix + frais de notaire 7-8 % dans l'ancien + travaux eventuels) et le loyer mensuel hors charges locataires." },
          { name: "Calculer la rentabilité brute", text: "Rentabilité brute = (loyer annuel / investissement total) x 100. Ex. 800 EUR/mois sur 200 000 EUR : (9 600 / 200 000) x 100 = 4,8 %." },
          { name: "Déduire les charges pour obtenir la rentabilité nette", text: "Soustraire la taxe fonciere, les charges de copropriete non recuperables, l'assurance PNO, les frais de gestion et la vacance locative estimée. Un mois de vacance représente déjà 8,3 % du loyer annuel." },
          { name: "Lire le cash-flow mensuel", text: "Cash-flow = loyers encaisses - (mensualité credit + charges + impôts). S'il est positif, le bien s'autofinance. Une rentabilité nette supérieure à 5 % est consideree bonne en France." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La rentabilite brute correspond au loyer annuel divise par le prix d'achat, multiplie par 100. La rentabilite nette deduit charges, taxe fonciere et frais ; la nette-nette integre la fiscalite. Le simulateur calcule ces trois niveaux.`}
        sources={[
          { label: "Service-Public.fr - Imposition des revenus locatifs", url: "https://www.service-public.fr/particuliers/vosdroits/F1989" },
          { label: "ANIL - Information sur le logement", url: "https://www.anil.org" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-rentabilite-locative" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
