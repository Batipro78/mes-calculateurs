import type { Metadata } from "next";
import CalculateurMoyenne from "./CalculateurMoyenne";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Moyenne Ponderee - Notes, Coefficients, Bareme",
  description:
    "Calculez votre moyenne ponderee avec coefficients. Baremes /20, /10, /100. Notes scolaires, concours, examens. Gratuit et instantane.",
  keywords:
    "calcul moyenne, moyenne ponderee, calculer sa moyenne, notes coefficients, moyenne scolaire, calcul moyenne bac, moyenne avec coefficient, calculatrice moyenne",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Moyenne" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer une moyenne ponderee ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour calculer une moyenne ponderee, multipliez chaque note par son coefficient, additionnez les resultats, puis divisez par la somme des coefficients. Formule : Moyenne = (note1 x coef1 + note2 x coef2 + ...) / (coef1 + coef2 + ...).",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre moyenne simple et moyenne ponderee ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une moyenne simple additionne toutes les notes et divise par leur nombre (chaque note a le meme poids). Une moyenne ponderee attribue un coefficient a chaque note, donnant plus de poids aux matieres importantes. Au bac, par exemple, les matieres de specialite ont un coefficient plus eleve.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer sa moyenne du bac ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La moyenne du bac se calcule en multipliant chaque note par son coefficient officiel, puis en divisant par la somme des coefficients (total = 100). Les specialites comptent coefficient 16, la philosophie coefficient 8, le grand oral coefficient 10.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Moyenne" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul de Moyenne Ponderee
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre moyenne avec coefficients. Ajoutez autant de notes que necessaire, choisissez le bareme.
      </p>

      <CalculateurMoyenne />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer sa moyenne ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>moyenne ponderee</strong> tient compte du coefficient de chaque note.
          Plus le coefficient est eleve, plus la note a d&apos;impact sur le resultat final.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Formule</h3>
        <div className="bg-violet-50/50 rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-violet-700">
            Moyenne = &Sigma;(note &times; coefficient) &divide; &Sigma;(coefficients)
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemple concret</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Matiere</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Note /20</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Coefficient</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Note &times; Coef</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 text-slate-700">Maths</td>
                <td className="py-2.5 px-2 text-right font-semibold">14</td>
                <td className="py-2.5 px-2 text-right">5</td>
                <td className="py-2.5 px-2 text-right font-semibold text-violet-600">70</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 text-slate-700">Francais</td>
                <td className="py-2.5 px-2 text-right font-semibold">12</td>
                <td className="py-2.5 px-2 text-right">4</td>
                <td className="py-2.5 px-2 text-right font-semibold text-violet-600">48</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 text-slate-700">Sport</td>
                <td className="py-2.5 px-2 text-right font-semibold">16</td>
                <td className="py-2.5 px-2 text-right">2</td>
                <td className="py-2.5 px-2 text-right font-semibold text-violet-600">32</td>
              </tr>
              <tr className="bg-violet-50/50">
                <td className="py-2.5 px-2 font-bold text-slate-800">Total</td>
                <td className="py-2.5 px-2"></td>
                <td className="py-2.5 px-2 text-right font-bold">11</td>
                <td className="py-2.5 px-2 text-right font-bold text-violet-600">150</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 mt-3">
          Moyenne = 150 &divide; 11 = <strong>13,64/20</strong>
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Coefficients du Bac 2026</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { m: "Specialite 1", c: 16 },
            { m: "Specialite 2", c: 16 },
            { m: "Philosophie", c: 8 },
            { m: "Grand oral", c: 10 },
            { m: "Francais ecrit", c: 5 },
            { m: "Francais oral", c: 5 },
            { m: "Histoire-geo", c: 6 },
            { m: "LV1", c: 6 },
            { m: "LV2", c: 6 },
            { m: "Enseignement scientifique", c: 6 },
            { m: "EPS", c: 6 },
            { m: "EMC", c: 2 },
          ].map((item) => (
            <div key={item.m} className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
              <span className="text-sm text-slate-600">{item.m}</span>
              <span className="text-sm font-bold text-slate-800">Coef {item.c}</span>
            </div>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-moyenne" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
