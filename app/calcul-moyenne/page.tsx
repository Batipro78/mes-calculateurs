import type { Metadata } from "next";
import CalculateurMoyenne from "./CalculateurMoyenne";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-moyenne" },
  title: "Calcul Moyenne Ponderee - Notes, Coefficients, Bareme",
  description:
    "Calculez votre moyenne ponderee avec coefficients. Baremes /20, /10, /100. Notes scolaires, concours, examens. Gratuit et instantane.",
  keywords:
    "calcul moyenne, moyenne ponderee, calculer sa moyenne, notes coefficients, moyenne scolaire, calcul moyenne bac, moyenne avec coefficient, calculatrice moyenne",
};

const FAQ_ITEMS: FaqItem[] = [
  { q: "Comment calculer une moyenne ponderee ?", a: "Pour calculer une moyenne ponderee, multipliez chaque note par son coefficient, additionnez les resultats, puis divisez par la somme des coefficients. Formule : Moyenne = (note1 x coef1 + note2 x coef2 + ...) / (coef1 + coef2 + ...)." },
  { q: "Quelle est la difference entre moyenne simple et moyenne ponderee ?", a: "Une moyenne simple additionne toutes les notes et divise par leur nombre (chaque note a le meme poids). Une moyenne ponderee attribue un coefficient a chaque note, donnant plus de poids aux matieres importantes. Au bac, par exemple, les matieres de specialite ont un coefficient plus eleve." },
  { q: "Comment calculer sa moyenne du bac ?", a: "La moyenne du bac se calcule en multipliant chaque note par son coefficient officiel, puis en divisant par la somme des coefficients (total = 100). Les specialites comptent coefficient 16, la philosophie coefficient 8, le grand oral coefficient 10." },
  { q: "Comment arrondir une moyenne scolaire ?", a: "Par convention scolaire, les moyennes sont generalement arrondies au centieme (ex : 13,64/20). Certains etablissements arondissent au dixieme (13,6) ou a l'entier inferieur (13). Pour les concours et le bac, l'arrondi officiel se fait au centieme." },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Moyenne" />
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

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Convertir et interpreter sa moyenne</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une moyenne n&apos;a de sens que rapportee a son bareme. Savoir passer d&apos;une echelle a l&apos;autre
          evite bien des erreurs, notamment quand on compare des notes ou qu&apos;on vise une mention.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Passer d&apos;un bareme a l&apos;autre</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>De /20 vers /10</strong> : divisez par 2 (14/20 = 7/10)</li>
          <li><strong>De /20 vers un pourcentage</strong> : multipliez par 5 (14/20 = 70 %)</li>
          <li><strong>De /20 vers /100</strong> : multipliez par 5 (14/20 = 70/100)</li>
          <li><strong>Regle generale</strong> : note ramenee = note &times; (nouveau bareme &divide; ancien bareme)</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Moyenne simple ou ponderee ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>moyenne arithmetique</strong> traite toutes les notes sur un pied d&apos;egalite : utile pour
          un bulletin sans coefficients. La <strong>moyenne ponderee</strong> donne plus de poids aux matieres a
          fort coefficient : c&apos;est elle qui compte au bac, aux concours et dans la plupart des examens. Une
          tres bonne note dans une matiere a faible coefficient pese donc beaucoup moins qu&apos;une note correcte
          dans une specialite.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les seuils de mention</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { m: "Passable", s: "10 a 12" },
            { m: "Assez bien", s: "12 a 14" },
            { m: "Bien", s: "14 a 16" },
            { m: "Tres bien", s: "16 et +" },
          ].map((item) => (
            <div key={item.m} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.m}</p>
              <p className="text-xs text-slate-500">Moyenne {item.s} / 20</p>
            </div>
          ))}
        </div>
        <p className="text-slate-600 leading-relaxed mt-4">
          Au bac, ces seuils s&apos;appliquent a la moyenne generale ponderee par les coefficients officiels. Une
          mention &laquo; Tres bien avec felicitations du jury &raquo; recompense en plus les moyennes
          exceptionnelles (souvent 18/20 et plus).
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-moyenne" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
