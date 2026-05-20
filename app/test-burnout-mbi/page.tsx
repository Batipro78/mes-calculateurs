import type { Metadata } from "next";
import TestBurnoutMbi from "./TestBurnoutMbi";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/test-burnout-mbi" },
  title: "Test Burnout MBI - 22 Questions Maslach (Gratuit, Validé)",
  description:
    "Test de burnout MBI officiel (Maslach Burnout Inventory) en 22 questions. Score sur 3 dimensions : épuisement, dépersonnalisation, accomplissement. Validation FR Dion & Tessier.",
  keywords:
    "test burnout, mbi, maslach burnout inventory, epuisement professionnel, test mbi gratuit, syndrome epuisement, burnout test francais, mbi-hss, depersonnalisation, accomplissement",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Test Burnout MBI"
        description="Test officiel Maslach Burnout Inventory en 22 questions"
        category="HealthApplication"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu'est-ce que le test MBI (Maslach Burnout Inventory) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le MBI est le questionnaire de référence mondiale pour évaluer le burnout, créé par Christina Maslach et Susan Jackson en 1981. Il mesure 3 dimensions sur 22 questions : l'épuisement émotionnel (9 items), la dépersonnalisation (5 items) et l'accomplissement personnel (8 items). Validé en français par Dion & Tessier en 1994.",
                },
              },
              {
                "@type": "Question",
                name: "Comment est calculé le score MBI ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chaque question est notée de 0 (Jamais) à 6 (Chaque jour). On additionne les scores par dimension. Épuisement émotionnel sur 54 (seuil élevé : 27+), Dépersonnalisation sur 30 (seuil élevé : 13+), Accomplissement personnel sur 48 (attention : score BAS de 33 ou moins indique un burnout). Le burnout est avéré si au moins 2 dimensions sont au niveau élevé simultanément.",
                },
              },
              {
                "@type": "Question",
                name: "Le test MBI remplace-t-il un diagnostic médical ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non. Le MBI est un outil d'auto-évaluation qui aide à identifier des signes de burnout, mais seul un médecin ou psychologue peut poser un diagnostic clinique. En cas de résultats élevés, consultez votre médecin du travail ou votre médecin traitant. Le burnout est reconnu par l'OMS comme phénomène lié au travail (CIM-11) depuis 2019.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les 3 piliers du burnout selon Maslach ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1) L'épuisement émotionnel : sentiment d'être vidé, fatigue chronique liée au travail. 2) La dépersonnalisation : cynisme, distance, déshumanisation des relations avec les collègues ou clients. 3) La réduction de l'accomplissement personnel : sentiment d'inefficacité et de perte de sens. Le burnout n'est pas un simple stress, c'est la conjonction de ces 3 dimensions.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Test Burnout MBI" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Test Burnout MBI - 22 questions
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Évaluez votre niveau d&apos;épuisement professionnel avec le Maslach
        Burnout Inventory (MBI), le test de référence mondial validé en français.
      </p>

      <TestBurnoutMbi />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le burnout ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>burnout</strong> (ou syndrome d&apos;épuisement professionnel)
          est un état d&apos;épuisement physique, émotionnel et mental causé par
          une exposition prolongée à des situations de travail stressantes. Depuis
          2019, l&apos;<strong>OMS</strong> le reconnaît officiellement dans la
          Classification internationale des maladies (CIM-11) comme un phénomène
          lié au travail.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Contrairement à un simple coup de fatigue, le burnout s&apos;installe
          progressivement et touche trois dimensions de la vie professionnelle.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 3 dimensions du MBI
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="font-bold text-red-900 mb-2">😩 Épuisement émotionnel</p>
            <p className="text-sm text-red-800">
              9 questions. Sentiment d&apos;être vidé, fatigue chronique,
              difficulté à se ressourcer. Score sur 54.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="font-bold text-orange-900 mb-2">😶 Dépersonnalisation</p>
            <p className="text-sm text-orange-800">
              5 questions. Cynisme, détachement, traitement des autres comme
              des objets. Score sur 30.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="font-bold text-blue-900 mb-2">📉 Accomplissement personnel</p>
            <p className="text-sm text-blue-800">
              8 questions. Sentiment d&apos;efficacité et d&apos;utilité. Attention
              : un score BAS indique un burnout. Score sur 48.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-violet-50 border border-violet-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-violet-900 mb-4 flex items-center gap-2">
          📚 Origine scientifique du MBI
        </h2>
        <p className="text-violet-800 mb-4 leading-relaxed">
          Le <strong>Maslach Burnout Inventory (MBI)</strong> a été développé en
          1981 par Christina Maslach et Susan E. Jackson à l&apos;Université de
          Californie. Publié dans le <em>Journal of Occupational Behavior</em>,
          il est devenu en 40 ans le standard mondial pour mesurer le burnout.
        </p>
        <p className="text-violet-800 mb-4 leading-relaxed">
          La version utilisée ici est le <strong>MBI-HSS</strong> (Human Services
          Survey), destinée aux métiers de la relation d&apos;aide
          (soignants, enseignants, travailleurs sociaux), mais applicable à
          tous les métiers en contact avec du public.
        </p>
        <div className="bg-white border border-violet-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-violet-900 mb-2">
            Validation française
          </p>
          <p className="text-sm text-violet-800">
            La traduction française a été validée scientifiquement par{" "}
            <strong>Dion G. &amp; Tessier R. (1994)</strong> dans la Revue
            canadienne des sciences du comportement, 26(2), 210-227. C&apos;est
            cette version qui est utilisée dans la plupart des études
            francophones depuis 30 ans.
          </p>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Seuils d&apos;interprétation officiels
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Dimension</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">Bas</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">Modéré</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">Élevé</th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">Score max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 text-slate-800 font-medium">Épuisement émotionnel</td>
                <td className="py-3 px-3 text-center text-green-700">0 à 17</td>
                <td className="py-3 px-3 text-center text-amber-700">18 à 26</td>
                <td className="py-3 px-3 text-center text-red-700">27+</td>
                <td className="py-3 px-3 text-center text-slate-600">54</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 text-slate-800 font-medium">Dépersonnalisation</td>
                <td className="py-3 px-3 text-center text-green-700">0 à 5</td>
                <td className="py-3 px-3 text-center text-amber-700">6 à 12</td>
                <td className="py-3 px-3 text-center text-red-700">13+</td>
                <td className="py-3 px-3 text-center text-slate-600">30</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-slate-800 font-medium">Accomplissement personnel</td>
                <td className="py-3 px-3 text-center text-red-700">0 à 33 (burnout)</td>
                <td className="py-3 px-3 text-center text-amber-700">34 à 38</td>
                <td className="py-3 px-3 text-center text-green-700">39+ (bon)</td>
                <td className="py-3 px-3 text-center text-slate-600">48</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Source : Maslach C. &amp; Jackson S.E. (1981). MBI-HSS manuel
          officiel. Attention à l&apos;échelle inversée de l&apos;accomplissement
          personnel.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Que faire en cas de burnout ?
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-violet-500 pl-4 py-2">
            <p className="font-bold text-slate-800">1. Consultez un professionnel</p>
            <p className="text-slate-600 text-sm mt-1">
              Médecin du travail, médecin traitant ou psychologue. Un arrêt
              maladie peut être nécessaire pour stopper l&apos;exposition au
              stress.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-bold text-slate-800">2. Identifiez les facteurs de risque</p>
            <p className="text-slate-600 text-sm mt-1">
              Surcharge, manque d&apos;autonomie, conflits, déséquilibre
              effort-récompense, manque de soutien. Le burnout est un problème
              organisationnel autant qu&apos;individuel.
            </p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-4 py-2">
            <p className="font-bold text-slate-800">3. Récupérez physiquement</p>
            <p className="text-slate-600 text-sm mt-1">
              Sommeil régulier, alimentation équilibrée, activité physique
              modérée, déconnexion numérique stricte du travail.
            </p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="font-bold text-slate-800">4. Préparez le retour</p>
            <p className="text-slate-600 text-sm mt-1">
              Reprise progressive, mi-temps thérapeutique, aménagement du
              poste. Sans changement des conditions de travail, le risque de
              rechute est élevé.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Disclaimer :</strong> Le MBI est un outil d&apos;auto-évaluation
          validé scientifiquement (Maslach &amp; Jackson 1981 ; Dion &amp; Tessier
          1994), mais il ne remplace pas un diagnostic médical. Si vous présentez
          des signes de burnout, consultez un professionnel de santé. En cas de
          détresse, le 3114 (numéro national de prévention du suicide) est joignable
          24h/24, 7j/7.
        </p>
      </div>

      <RelatedCalculators currentSlug="/test-burnout-mbi" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
