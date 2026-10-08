import type { Metadata } from "next";
import CalculMentionBac from "./CalculMentionBac";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-mention-bac" },
  title: "Calcul Mention Bac 2027 : Assez Bien, Bien, Très Bien, Félicitations",
  description:
    "Calculez votre mention au baccalauréat selon votre moyenne /20. Barème du code de l'éducation : admis dès 10, Assez Bien 12, Bien 14, Très Bien 16, Félicitations du jury 18.",
  keywords:
    "mention bac, calcul mention baccalaureat, mention assez bien, mention bien, mention tres bien, felicitations jury bac, moyenne bac",
};

const FAQ_ITEMS: FaqItem[] = [
  { q: "Quel est le barème des mentions au baccalauréat ?", a: "Le code de l'éducation (articles D334-8 et D334-11) prévoit : admis dès 10/20, sans mention entre 10 et 11,99/20, Assez Bien de 12 à 13,99, Bien de 14 à 15,99, Très Bien à partir de 16 et Très Bien avec les félicitations du jury à partir de 18/20." },
  { q: "À partir de quelle moyenne obtient-on la mention Très Bien ?", a: "La mention Très Bien est attribuée à partir d'une moyenne de 16/20 au baccalauréat. À partir de 18/20, on obtient la mention Très Bien avec Félicitations du jury, qui est la distinction maximale." },
  { q: "Quels sont les avantages d'avoir une mention au bac ?", a: "Le code de l'éducation (article D334-11) précise que le diplôme porte la mention obtenue. Les effets d'une mention sur Parcoursup ou sur une aide financière dépendent des formations et des organismes : consultez parcoursup.fr et etudiant.gouv.fr, ce site ne les détaille pas." },
  { q: "Qu'est-ce que les Félicitations du jury au bac ?", a: "Les Félicitations du jury sont décernées à partir d'une moyenne de 18/20. C'est la distinction la plus haute du baccalauréat, qui s'ajoute à la mention Très Bien. Elles ne sont pas systématiques mais sont attribuées par le jury en reconnaissance d'excellents résultats." },
  { q: "Peut-on obtenir une mention après le rattrapage ?", a: "Non. Le code de l'éducation (article D334-8) précise que les candidats admis à l'issue du second groupe d'épreuves (le rattrapage) ne peuvent obtenir une mention. Pour avoir une mention, il faut donc une moyenne d'au moins 12/20 dès le premier groupe d'épreuves." },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Mention Bac" category="EducationalApplication" />
      <Breadcrumb currentPage="Calcul Mention Bac" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Mention Baccalauréat
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Selon votre moyenne au bac /20, calculez votre mention officielle.
        Barème du code de l'éducation et seuils des mentions.
      </p>

      <CalculMentionBac />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Barème des mentions au baccalauréat
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les mentions du baccalauréat général sont définies par l&apos;article D334-11 du code
          de l&apos;éducation. Elles sont
          attribuées en fonction de la moyenne générale obtenue à l&apos;examen.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="font-semibold text-slate-900">✅ Admis, sans mention</p>
            <p className="text-sm text-slate-700">Moyenne de 10 à 11,99/20</p>
            <p className="text-xs text-slate-600 mt-1">Bac obtenu, pas de mention en dessous de 12/20</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">🥉 Assez Bien</p>
            <p className="text-sm text-amber-800">Moyenne de 12 à 13,99/20</p>
            <p className="text-xs text-amber-700 mt-1">Mention portée sur le diplôme</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="font-semibold text-blue-900">🥈 Bien</p>
            <p className="text-sm text-blue-800">Moyenne de 14 à 15,99/20</p>
            <p className="text-xs text-blue-700 mt-1">Mention portée sur le diplôme</p>
          </div>
          <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
            <p className="font-semibold text-violet-900">🥇 Très Bien</p>
            <p className="text-sm text-violet-800">Moyenne de 16 à 17,99/20</p>
            <p className="text-xs text-violet-700 mt-1">Mention portée sur le diplôme</p>
          </div>
          <div className="bg-rose-50 rounded-lg p-3 border border-rose-200 sm:col-span-2">
            <p className="font-semibold text-rose-900">🏆 Très Bien avec Félicitations du jury</p>
            <p className="text-sm text-rose-800">Moyenne de 18 et plus /20</p>
            <p className="text-xs text-rose-700 mt-1">
              Distinction maximale du baccalauréat.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          🎯 Mentions et Parcoursup : ce que dit le ministère
        </h2>
        <p className="text-blue-800 mb-4 leading-relaxed">
          Selon le ministère de l&apos;Éducation nationale, les notes de bulletins de première et de terminale
          (1er et 2e trimestre ou 1er semestre), ainsi que les résultats aux épreuves anticipées, sont pris en
          compte dans Parcoursup. Le détail des critères de chaque formation figure sur parcoursup.fr : ce site
          ne l&apos;indique pas.
        </p>

        <h3 className="font-bold text-blue-900 mt-4 mb-2">Félicitations du jury</h3>
        <p className="text-blue-800 leading-relaxed">
          Les Félicitations du jury sont attribuées à partir de 18/20 de moyenne au bac.
          Elles constituent la distinction la plus prestigieuse et sont notamment regardées
          par les grandes écoles, classes préparatoires littéraires et programmes
          internationaux.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment est calculée la moyenne du bac ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Selon le ministère de l&apos;Éducation nationale, la note du baccalauréat général
          se calcule ainsi (à compter de la session 2027) :
        </p>
        <ul className="text-slate-600 space-y-2 mb-4 ml-4 list-disc">
          <li><strong>40% contrôle continu :</strong> moyennes annuelles des bulletins de première et de terminale en histoire-géographie, langues vivantes, enseignement scientifique, EPS et enseignement moral et civique, plus la spécialité abandonnée en première (coefficient 8)</li>
          <li><strong>60% épreuves finales :</strong> français (écrit et oral, passés en première), mathématiques (épreuve anticipée de première), philosophie, Grand oral et les deux spécialités de terminale</li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          La moyenne est la somme des points divisée par le total des coefficients (100 pour un élève sans option).
          La mention se lit sur cette moyenne.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Le rattrapage du bac
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si votre moyenne est d&apos;au moins 8 et inférieure à 10, vous pouvez vous présenter au
          second groupe d&apos;épreuves (le rattrapage). En dessous de 8, le candidat est ajourné.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-900 font-semibold mb-1">⚠️ À noter</p>
          <p className="text-amber-800 text-sm">
            Les candidats admis à l&apos;issue du second groupe d&apos;épreuves ne peuvent pas
            obtenir de mention. Pour avoir une mention Assez Bien ou plus, il faut obtenir
            au moins 12/20 dès le premier groupe d&apos;épreuves.
          </p>
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Source :</strong> articles D334-8 et D334-11 du code de l&apos;éducation
          (Légifrance), baccalauréat général.
        </p>
      </div>

      <HowToJsonLd
        name="Calculer sa mention au baccalaureat"
        steps={[
          { name: "Saisir sa moyenne générale sur 20", text: "Entrer la moyenne générale obtenue au baccalaureat, calculee sur 40 % de controle continu (moyennes annuelles des bulletins de 1ere et terminale) et 60 % d'epreuves finales (francais, mathematiques anticipees, philosophie, deux specialites, Grand oral)." },
          { name: "Comparer au barème officiel de l'Education Nationale", text: "Le simulateur applique les seuils des articles D334-8 et D334-11 du code de l'education : admis des 10 / 20 (sans mention jusqu'a 11,99), Assez Bien de 12 à 13,99, Bien de 14 à 15,99, Très Bien de 16 à 17,99." },
          { name: "Identifier la distinction maximale", text: "À partir de 18 / 20, la mention Très Bien avec Felicitations du jury est attribuee. C'est la distinction la plus haute du baccalaureat, la plus haute distinction du baccalaureat." },
          { name: "Savoir ou chercher les effets sur Parcoursup", text: "Les notes de bulletins de 1re et de terminale et les resultats aux epreuves anticipees sont pris en compte dans Parcoursup (education.gouv.fr). Les criteres de chaque formation sont sur parcoursup.fr." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-mention-bac" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
