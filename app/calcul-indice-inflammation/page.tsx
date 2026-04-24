import type { Metadata } from "next";
import CalculateurInflammation from "./CalculateurInflammation";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-indice-inflammation" },
  title: "Calcul Indice Inflammation Alimentaire 2026 - DII Score",
  description:
    "Evaluez le niveau inflammatoire de votre alimentation. Questionnaire base sur le Dietary Inflammatory Index (DII). Score anti/pro-inflammatoire + recommandations personnalisees.",
  keywords:
    "indice inflammation, DII, Dietary Inflammatory Index, alimentation anti inflammatoire, score inflammation, regime anti inflammatoire",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que l'inflammation chronique liee a l'alimentation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'inflammation chronique de bas grade est une reponse immunitaire prolongee qui, contrairement a l'inflammation aigue (utile pour lutter contre une infection), persiste pendant des mois ou des annees. Elle est favorisee par une alimentation riche en sucres raffines, graisses trans, viandes transformees et ultra-transformes. Elle est associee a un risque accru de maladies cardiovasculaires, diabete type 2, arthrite, depression et certains cancers.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les aliments les plus anti-inflammatoires ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les meilleurs aliments anti-inflammatoires sont : poissons gras (saumon, sardines, maquereau) riches en omega-3 EPA/DHA, legumes verts (epinards, brocolis, kale), fruits rouges (myrtilles, framboises, grenades), huile d'olive extra vierge, noix et graines (noix, amandes, chia, lin), curcuma et gingembre, the vert, legumineuses (lentilles, pois chiches), ail et oignon, chocolat noir 70%+.",
      },
    },
    {
      "@type": "Question",
      name: "Quels aliments favorisent l'inflammation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les principaux aliments pro-inflammatoires sont : sucres raffines (bonbons, sodas, patisseries industrielles), viandes transformees (saucisson, jambon blanc industriel, bacon), fritures, plats ultra-transformes et fast-food, graisses trans (margarines, viennoiseries industrielles), alcool en exces, pain blanc et cereales raffinees. L'accumulation de ces aliments dans l'alimentation quotidienne est particulierement problematique.",
      },
    },
    {
      "@type": "Question",
      name: "Comment adopter un regime anti-inflammatoire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Principes cles : 1) 5-7 portions de legumes et fruits par jour (dont legumes verts et fruits rouges), 2) Poissons gras 2-3 fois/semaine, 3) Remplacer les viandes rouges/charcuterie par volailles, legumineuses ou oeufs, 4) Huile d'olive comme principale source de matiere grasse, 5) Noix et graines en collation (30g/jour), 6) Limiter sucres ajoutes et produits transformes, 7) The vert et infusions a la place des sodas, 8) Epices anti-inflammatoires (curcuma, gingembre, cannelle). Le regime mediterraneen est le modele de reference.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Calcul Indice Inflammation" description="Dietary Inflammatory Index questionnaire" category="HealthApplication" />
      <Breadcrumb currentPage="Calcul Indice Inflammation" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🥗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Indice Inflammation Alimentaire</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Evaluez le caractere pro ou anti-inflammatoire de votre alimentation en 2 minutes.
      </p>

      <CalculateurInflammation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comprendre l&apos;inflammation alimentaire</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>inflammation chronique de bas grade</strong> est silencieuse mais deletere. A la difference de
          l&apos;inflammation aigue (utile face a une blessure ou infection), elle persiste et favorise le vieillissement
          cellulaire, les maladies cardiovasculaires, le diabete de type 2, certains cancers, et meme la depression.
        </p>

        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>Dietary Inflammatory Index (DII)</strong> developpe par Nitin Shivappa et l&apos;Universite de Caroline du Sud
          en 2014 permet d&apos;evaluer l&apos;impact inflammatoire d&apos;une alimentation. Cet outil a ete valide par plus de
          200 etudes montrant qu&apos;un score DII eleve correle avec le risque de maladies chroniques.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Le &quot;top 10&quot; des aliments anti-inflammatoires</h3>
        <ol className="list-decimal list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Poissons gras</strong> (saumon, sardine, maquereau) - omega-3 EPA/DHA</li>
          <li><strong>Baies rouges</strong> (myrtilles, framboises, grenade) - polyphenols</li>
          <li><strong>Curcuma</strong> + poivre noir - curcumine (anti-inflammatoire puissant)</li>
          <li><strong>Legumes crucifers</strong> (brocoli, chou kale, chou-fleur) - sulforaphane</li>
          <li><strong>Huile d&apos;olive extra vierge</strong> - oleocanthal</li>
          <li><strong>Noix et graines</strong> (noix, amandes, chia, lin) - omega-3 vegetaux</li>
          <li><strong>The vert</strong> (matcha) - EGCG antioxydant</li>
          <li><strong>Ail</strong> - allicine</li>
          <li><strong>Chocolat noir</strong> 70%+ - flavonoides</li>
          <li><strong>Tomates cuites</strong> (coulis, sauce) - lycopene biodisponible</li>
        </ol>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Le regime mediterraneen comme reference</h3>
        <p className="text-slate-600 leading-relaxed">
          De nombreuses etudes ont demontre que le regime mediterraneen (riche en legumes, fruits, huile d&apos;olive,
          poissons, noix, cereales completes, legumineuses) reduit le score DII et diminue de 30% le risque d&apos;evenements
          cardiovasculaires (etude PREDIMED). C&apos;est la reference scientifique en matiere d&apos;alimentation
          anti-inflammatoire.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-indice-inflammation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
