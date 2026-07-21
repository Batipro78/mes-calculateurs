import type { Metadata } from "next";
import { FAQSchema, WebAppSchema } from "@/lib/jsonld";
import CalculAgeChatHumain from "./CalculAgeChatHumain";
import RelatedCalculators from "@/app/components/RelatedCalculators";
import HowToJsonLd from "@/app/components/HowToJsonLd";

export const metadata: Metadata = {
  title: "Calcul Âge Chat en Années Humaines | Formule AAFP Vétérinaire",
  description:
    "Convertissez l'âge de votre chat en équivalent humain avec la formule AAFP. Découvrez la phase de vie, les conseils santé et l'espérance de vie selon l'environnement.",
  keywords:
    "âge chat humain, conversion âge chat, mon chat quel âge, formule AAFP, phase de vie chat, espérance de vie chat, chat senior, chaton",
  alternates: {
    canonical: "https://mescalculateurs.fr/calcul-age-chat-humain",
  },
};

const faqItems = [
  {
    question: "Comment convertir l'âge du chat en années humaines ?",
    answer:
      "La formule AAFP (American Association of Feline Practitioners) : la 1ère année du chat = 15 ans humains, la 2ème année = +9 ans (total 24 ans), puis +4 ans par année supplémentaire. Par exemple, un chat de 5 ans = 24 + (3 × 4) = 36 ans humains.",
  },
  {
    question: "Pourquoi 1 an de chat n'égale pas 7 ans humains ?",
    answer:
      "La formule « 1 an = 7 ans » est un mythe. Un chaton d'un an a déjà atteint sa maturité sexuelle et adulte (15 ans humains), pas 7. La 2ème année ajoute 9 ans supplémentaires. Cette courbe reflète la croissance rapide des chatons puis le ralentissement du vieillissement à l'âge adulte.",
  },
  {
    question: "Combien de temps vit un chat en moyenne ?",
    answer:
      "Un chat d'intérieur vit en moyenne 13-17 ans (15-16 ans généralement). Un chat d'extérieur vit beaucoup moins : 5-7 ans en moyenne, en raison des risques accidents, maladies et prédateurs. Un chat mixte intérieur/extérieur vit environ 12 ans.",
  },
  {
    question: "Mon chat est senior : quels soins spécifiques ?",
    answer:
      "Un chat sénior (7-10 ans) nécessite un suivi biannuel chez le vétérinaire, dépistage des maladies rénales et thyroïdiennes, une alimentation adaptée senior, et surveillance du poids. Super-sénior (11-14 ans) : suivi renforcé tous les 6 mois et aménagement du cadre de vie pour le confort.",
  },
];

export default async function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">
            🐱 Âge Chat en Années Humaines
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez l&apos;équivalent en années humaines de votre chat en utilisant la formule scientifique AAFP. Conseil
            santé et phase de vie personnalisés.
          </p>
        </div>

        {/* Composant calculateur */}
        <CalculAgeChatHumain />

        {/* Section "Pourquoi la formule AAFP" */}
        <section className="bg-white rounded-lg border-2 border-orange-200 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Comment fonctionne la formule AAFP ?</h2>
          <div className="space-y-4">
            <div className="bg-orange-50 rounded p-4 border-l-4 border-orange-500">
              <p className="text-sm font-semibold text-gray-900 mb-2">📅 Année 1</p>
              <p className="text-sm text-gray-700">
                <strong>1 an de chat = 15 ans humains</strong>. C&apos;est la période de croissance la plus rapide. Le chaton
                atteint sa maturité sexuelle et physique.
              </p>
            </div>
            <div className="bg-orange-50 rounded p-4 border-l-4 border-orange-500">
              <p className="text-sm font-semibold text-gray-900 mb-2">📅 Année 2</p>
              <p className="text-sm text-gray-700">
                <strong>+9 ans (total 24 ans à 2 ans)</strong>. La croissance ralentit, le chat devient jeune adulte.
              </p>
            </div>
            <div className="bg-orange-50 rounded p-4 border-l-4 border-orange-500">
              <p className="text-sm font-semibold text-gray-900 mb-2">📅 Année 3+</p>
              <p className="text-sm text-gray-700">
                <strong>+4 ans par année supplémentaire</strong>. À 5 ans : 24 + (3 × 4) = 36 ans humains.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details key={idx} className="group border-2 border-gray-200 rounded-lg">
                <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-900 group-open:bg-orange-50 group-open:text-orange-900">
                  {item.question}
                </summary>
                <div className="px-6 py-4 bg-orange-50 text-gray-700 border-t-2 border-gray-200">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Conseils par phase */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-300 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Conseils santé par phase de vie</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded p-4 border-l-4 border-amber-400">
              <p className="font-semibold text-amber-900 mb-2">🐱 Chaton (0-6 mois)</p>
              <p className="text-sm text-gray-700">Vaccinations, vermifugation, socialisation, premiers jouets.</p>
            </div>
            <div className="bg-white rounded p-4 border-l-4 border-orange-400">
              <p className="font-semibold text-orange-900 mb-2">😺 Junior (6 mois - 2 ans)</p>
              <p className="text-sm text-gray-700">Stérilisation/castration, alimentation adulte, jeux actifs.</p>
            </div>
            <div className="bg-white rounded p-4 border-l-4 border-red-400">
              <p className="font-semibold text-red-900 mb-2">🐈 Adulte (3-6 ans)</p>
              <p className="text-sm text-gray-700">Bilan annuel, surveillance poids, alimentation équilibrée.</p>
            </div>
            <div className="bg-white rounded p-4 border-l-4 border-amber-600">
              <p className="font-semibold text-amber-900 mb-2">😻 Sénior (7-10 ans)</p>
              <p className="text-sm text-gray-700">Bilan biannuel, dépistage maladies rénales/thyroïde.</p>
            </div>
            <div className="bg-white rounded p-4 border-l-4 border-orange-700">
              <p className="font-semibold text-orange-900 mb-2">😸 Super-Sénior (11-14 ans)</p>
              <p className="text-sm text-gray-700">Suivi tous les 6 mois, alimentation senior adaptée.</p>
            </div>
            <div className="bg-white rounded p-4 border-l-4 border-gray-600">
              <p className="font-semibold text-gray-900 mb-2">🐱‍👴 Vénérable (15+ ans)</p>
              <p className="text-sm text-gray-700">Suivi mensuel/trimestriel, confort physique prioritaire.</p>
            </div>
          </div>
        </section>

        {/* HowTo JSON-LD */}
        <HowToJsonLd
          name="Estimer l'âge d'un chat en années humaines"
          steps={[
            { name: "Saisir l'âge du chat", text: "Indiquer l'âge du chat en années. L'outil applique la formule officielle AAFP (American Association of Feline Practitioners)." },
            { name: "Appliquer la formule AAFP", text: "Année 1 du chat = 15 ans humains. Année 2 = +9 ans (total 24 ans). À partir de l'année 3, chaque année supplémentaire ajoute 4 ans humains. Exemple : un chat de 5 ans = 24 + (3 x 4) = 36 ans humains." },
            { name: "Identifier la phase de vie et les conseils santé", text: "Le résultat associe l'âge humain équivalent à une phase de vie (chaton, junior, adulte, senior, super-senior, vénérable) avec des recommandations vétérinaires spécifiques à chaque stade." },
          ]}
        />

        {/* Related calculators */}
        <RelatedCalculators currentSlug="/calcul-age-chat-humain" />

        {/* Footer disclaimer */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-sm text-gray-700">
          <p className="font-semibold mb-2">⚠️ Disclaimer</p>
          <p>
            Ce calcul s&apos;appuie sur les formules recommandées par l&apos;AAFP (American Association of Feline Practitioners)
            et International Cat Care. Il s&apos;agit d&apos;une estimation basée sur des moyennes statistiques. Chaque chat
            vieillit à son propre rythme selon sa génétique, sa race, son mode de vie et ses soins vétérinaires. Pour des
            conseils spécifiques sur la santé et le bien-être de votre chat, consultez votre vétérinaire.
          </p>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WebAppSchema("Calcul Âge Chat", "https://mescalculateurs.fr/calcul-age-chat-humain")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQSchema(faqItems)),
        }}
      />
    </main>
  );
}
