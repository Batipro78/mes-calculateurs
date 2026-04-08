import type { Metadata } from "next";
import CalculateurRisqueCardio from "./CalculateurRisqueCardio";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Risque Cardiovasculaire 2026 - Score Framingham Gratuit",
  description:
    "Estimez votre risque cardiovasculaire sur 10 ans gratuitement. Score de Framingham simplifie : cholesterol, tension arterielle, tabac, diabete, antecedents. Resultats instantanes.",
  keywords:
    "calcul risque cardiovasculaire, score Framingham, risque cardiaque, facteurs risque cardiovasculaire, prevention cardiovasculaire, cholesterol HDL, hypertension, infarctus risque",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Risque Cardiovasculaire" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer son risque cardiovasculaire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le risque cardiovasculaire se calcule a partir de plusieurs facteurs : age, sexe, cholesterol total et HDL, tension arterielle systolique, tabagisme, diabete et antecedents familiaux. Le score de Framingham, developpe par la Framingham Heart Study, est l'outil de reference pour estimer le risque d'evenement cardiovasculaire majeur (infarctus, AVC) sur 10 ans.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les principaux facteurs de risque cardiovasculaire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les principaux facteurs de risque cardiovasculaire modifiables sont : le tabagisme (double le risque), l'hypertension arterielle (tension > 140 mmHg), un cholesterol LDL eleve (> 1,6 g/L), un HDL bas (< 0,4 g/L), le diabete de type 2, la sedentarite, l'obesite et le stress chronique. Les facteurs non modifiables incluent l'age, le sexe masculin et les antecedents familiaux.",
                },
              },
              {
                "@type": "Question",
                name: "Quand consulter un medecin pour son risque cardiovasculaire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Il est recommande de consulter un medecin si votre risque cardiovasculaire a 10 ans depasse 10%, si vous avez plusieurs facteurs de risque, si votre tension est superieure a 140/90 mmHg, si votre cholesterol total depasse 2,5 g/L, ou si vous etes fumeur avec d'autres facteurs de risque. Apres 50 ans, un bilan cardiovasculaire tous les 5 ans est recommande meme sans symptomes.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Risque Cardiovasculaire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ❤️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Risque Cardiovasculaire 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre risque cardiovasculaire sur 10 ans avec le score de Framingham simplifie. Analyse de vos facteurs de risque et conseils de prevention personnalises.
      </p>

      <CalculateurRisqueCardio />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le score de Framingham ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>score de Framingham</strong> est l&apos;outil de reference mondial pour estimer le risque cardiovasculaire. Developpe a partir de la celebre <strong>Framingham Heart Study</strong> — une etude epidemiologique longitudinale demarree en 1948 au Massachusetts — il predit la probabilite de subir un evenement cardiovasculaire majeur (infarctus du myocarde, AVC) dans les <strong>10 prochaines annees</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Notre calculateur utilise une version simplifiee de ce score, prenant en compte les principaux facteurs validés scientifiquement : age, sexe, taux de cholesterol (total et HDL), tension arterielle systolique, tabagisme, diabete et antecedents familiaux.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 7 facteurs evalues
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">Age et sexe</p>
            <p className="text-xs text-red-600 mt-1">Le risque augmente avec l&apos;age. Les hommes ont un risque plus eleve que les femmes avant la menopause.</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">Cholesterol total</p>
            <p className="text-xs text-orange-600 mt-1">Un taux &gt; 2 g/L (200 mg/dL) commence a augmenter le risque. Au-dela de 2,8 g/L, le risque est significativement eleve.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Cholesterol HDL</p>
            <p className="text-xs text-green-600 mt-1">Le HDL est le &quot;bon cholesterol&quot;. Un taux &ge; 60 mg/dL est protecteur. En dessous de 40 mg/dL, il devient un facteur de risque.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Tension arterielle</p>
            <p className="text-xs text-blue-600 mt-1">La tension optimale est &lt; 120 mmHg. Une hypertension (&ge; 140 mmHg) est un facteur de risque majeur d&apos;AVC et d&apos;infarctus.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-semibold text-slate-700 text-sm">Tabagisme</p>
            <p className="text-xs text-slate-600 mt-1">Le tabac est l&apos;un des plus puissants facteurs de risque : il double le risque cardiovasculaire et accelere l&apos;atherosclerose.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="font-semibold text-purple-700 text-sm">Diabete et antecedents</p>
            <p className="text-xs text-purple-600 mt-1">Le diabete de type 2 multiplie le risque cardiovasculaire par 2 a 4. Les antecedents familiaux (parent 1er degre) indiquent une predisposition genetique.</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Interpretation du risque cardiovasculaire
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Categorie</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Risque 10 ans</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Recommandation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span><span className="font-medium text-slate-700">Faible</span></span>
                </td>
                <td className="py-2.5 px-2 text-right text-green-600 font-semibold">&le; 5%</td>
                <td className="py-2.5 px-2 text-slate-600 text-xs hidden sm:table-cell">Prevention primaire, mode de vie sain</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span><span className="font-medium text-slate-700">Modere</span></span>
                </td>
                <td className="py-2.5 px-2 text-right text-yellow-600 font-semibold">6 - 10%</td>
                <td className="py-2.5 px-2 text-slate-600 text-xs hidden sm:table-cell">Bilan medical, correction des facteurs modifiables</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span><span className="font-medium text-slate-700">Eleve</span></span>
                </td>
                <td className="py-2.5 px-2 text-right text-orange-600 font-semibold">11 - 20%</td>
                <td className="py-2.5 px-2 text-slate-600 text-xs hidden sm:table-cell">Consultation cardiologique, traitement medicamenteux possible</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span><span className="font-medium text-slate-700">Tres eleve</span></span>
                </td>
                <td className="py-2.5 px-2 text-right text-red-600 font-semibold">&gt; 20%</td>
                <td className="py-2.5 px-2 text-slate-600 text-xs hidden sm:table-cell">Prise en charge medicale urgente, traitement intensif</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment reduire son risque cardiovasculaire ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li><strong>Arreter le tabac</strong> : reduit le risque de 50% en 1 an</li>
          <li><strong>Activite physique</strong> : 150 min/semaine d&apos;activite moderee reduit le risque de 30-35%</li>
          <li><strong>Alimentation</strong> : regime mediterraneen (huile d&apos;olive, poissons gras, legumes) protecteur</li>
          <li><strong>Controle de la tension</strong> : objectif &lt; 130/80 mmHg</li>
          <li><strong>Gestion du cholesterol</strong> : reduction des graisses saturees, statines si necessaire</li>
          <li><strong>Equilibre glycemique</strong> : HbA1c &lt; 7% pour les diabetiques</li>
          <li><strong>Gestion du stress</strong> : meditation, sommeil suffisant (7-8h/nuit)</li>
        </ul>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 font-semibold mb-1">Avertissement medical</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Cet outil est informatif et ne remplace pas un avis medical. Le score obtenu est une estimation simplifiee. Pour une evaluation precise de votre risque cardiovasculaire, consultez votre medecin traitant ou un cardiologue qui pourra realiser un bilan complet (ECG, epreuve d&apos;effort, echographie cardiaque, etc.).
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-risque-cardiovasculaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
