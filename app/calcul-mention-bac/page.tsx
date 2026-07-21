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
  title: "Calcul Mention Bac 2026 : Passable, Assez Bien, Bien, Très Bien",
  description:
    "Calculez votre mention au baccalauréat selon votre moyenne /20. Barème officiel Éducation Nationale : Passable 10, Assez Bien 12, Bien 14, Très Bien 16, Félicitations 18+.",
  keywords:
    "mention bac, calcul mention baccalaureat, mention assez bien, mention bien, mention tres bien, felicitations jury bac, moyenne bac, parcoursup mention",
};

const FAQ_ITEMS: FaqItem[] = [
  { q: "Quel est le barème des mentions au baccalauréat ?", a: "Le barème officiel du Ministère de l'Education Nationale (article D334-4 du code de l'éducation) est : Passable de 10 à 11,99/20, Assez Bien de 12 à 13,99, Bien de 14 à 15,99, Très Bien de 16 à 17,99, et Très Bien avec Félicitations du jury à partir de 18/20." },
  { q: "À partir de quelle moyenne obtient-on la mention Très Bien ?", a: "La mention Très Bien est attribuée à partir d'une moyenne de 16/20 au baccalauréat. À partir de 18/20, on obtient la mention Très Bien avec Félicitations du jury, qui est la distinction maximale." },
  { q: "Quels sont les avantages d'avoir une mention au bac ?", a: "Les mentions valorisent le dossier Parcoursup et le CV. À partir de 16/20 (mention Très Bien), certaines formations sélectives attribuent 1 point bonus. Les mentions Très Bien peuvent aussi ouvrir droit à la bourse au mérite. Une mention Bien ou Très Bien est un atout pour intégrer une classe préparatoire ou une grande école." },
  { q: "Qu'est-ce que les Félicitations du jury au bac ?", a: "Les Félicitations du jury sont décernées à partir d'une moyenne de 18/20. C'est la distinction la plus haute du baccalauréat, qui s'ajoute à la mention Très Bien. Elles ne sont pas systématiques mais sont attribuées par le jury en reconnaissance d'excellents résultats." },
  { q: "Peut-on obtenir une mention après le rattrapage ?", a: "Non. Si le bac est obtenu grâce au rattrapage (oral de contrôle), la mention attribuée est uniquement 'Passable', quelle que soit la note obtenue à l'oral. Pour prétendre à une mention Assez Bien ou supérieure, il faut obtenir au moins 12/20 dès les épreuves du premier groupe." },
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
        Barème Éducation Nationale + points bonus Parcoursup.
      </p>

      <CalculMentionBac />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Barème des mentions au baccalauréat
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les mentions du baccalauréat sont définies par l&apos;article D334-4 du code
          de l&apos;éducation (Ministère de l&apos;Éducation Nationale). Elles sont
          attribuées en fonction de la moyenne générale obtenue à l&apos;examen.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="font-semibold text-slate-900">✅ Passable</p>
            <p className="text-sm text-slate-700">Moyenne de 10 à 11,99/20</p>
            <p className="text-xs text-slate-600 mt-1">Bac obtenu, sans mention particulière</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">🥉 Assez Bien</p>
            <p className="text-sm text-amber-800">Moyenne de 12 à 13,99/20</p>
            <p className="text-xs text-amber-700 mt-1">Valorisation CV et Parcoursup</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="font-semibold text-blue-900">🥈 Bien</p>
            <p className="text-sm text-blue-800">Moyenne de 14 à 15,99/20</p>
            <p className="text-xs text-blue-700 mt-1">Atout important pour les écoles sélectives</p>
          </div>
          <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
            <p className="font-semibold text-violet-900">🥇 Très Bien</p>
            <p className="text-sm text-violet-800">Moyenne de 16 à 17,99/20</p>
            <p className="text-xs text-violet-700 mt-1">+1 point Parcoursup, bourse au mérite possible</p>
          </div>
          <div className="bg-rose-50 rounded-lg p-3 border border-rose-200 sm:col-span-2">
            <p className="font-semibold text-rose-900">🏆 Très Bien avec Félicitations du jury</p>
            <p className="text-sm text-rose-800">Moyenne de 18 et plus /20</p>
            <p className="text-xs text-rose-700 mt-1">
              Distinction maximale, bourse au mérite à l&apos;échelon supérieur, valorisation grandes écoles.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          🎯 Mentions et Parcoursup
        </h2>
        <p className="text-blue-800 mb-4 leading-relaxed">
          Depuis la réforme du bac, les mentions ne sont plus directement utilisées dans
          le calcul Parcoursup pour la majorité des formations (qui regardent les notes
          de contrôle continu). Toutefois, certaines formations sélectives (CPGE, écoles
          d&apos;ingénieurs post-bac, IFSI) valorisent encore explicitement les mentions
          Bien et Très Bien.
        </p>

        <h3 className="font-bold text-blue-900 mt-4 mb-2">Bourse au mérite</h3>
        <p className="text-blue-800 mb-4 leading-relaxed">
          La bourse au mérite (Crous) est attribuée aux bacheliers boursiers ayant obtenu
          la mention Très Bien. Le montant varie selon l&apos;échelon de bourse étudiante
          de base (jusqu&apos;à 900€ supplémentaires par an).
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
          Depuis la réforme 2021, la moyenne du baccalauréat général et technologique
          se calcule ainsi :
        </p>
        <ul className="text-slate-600 space-y-2 mb-4 ml-4 list-disc">
          <li><strong>40% contrôle continu :</strong> moyennes du livret scolaire (1ère et terminale)</li>
          <li><strong>60% épreuves finales :</strong> Français (écrit + oral en 1ère), Philosophie, Grand Oral, 2 spécialités, Enseignement scientifique ou Mathématiques</li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          Pour le bac professionnel, la pondération diffère selon le diplôme préparé.
          La mention finale est calculée sur la moyenne pondérée de l&apos;ensemble.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Le rattrapage du bac
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si votre moyenne est comprise entre 8 et 9,99/20, vous pouvez passer le
          rattrapage (épreuves orales de contrôle). Vous choisissez 2 matières dans lesquelles
          vous repassez un oral, et la meilleure des deux notes (oral ou écrit initial) est
          conservée.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-900 font-semibold mb-1">⚠️ À noter</p>
          <p className="text-amber-800 text-sm">
            Une mention obtenue après le rattrapage n&apos;est pas attribuée : on obtient
            uniquement la mention Passable si le rattrapage est réussi. Pour avoir une
            mention Assez Bien ou plus, il faut obtenir au moins 12/20 dès le premier tour.
          </p>
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Source :</strong> Article D334-4 du code de l&apos;éducation, Ministère
          de l&apos;Éducation Nationale (education.gouv.fr). Les seuils des mentions sont
          identiques pour le bac général, technologique et professionnel. La bourse au
          mérite est gérée par le CROUS (etudiant.gouv.fr).
        </p>
      </div>

      <HowToJsonLd
        name="Calculer sa mention au baccalaureat"
        steps={[
          { name: "Saisir sa moyenne générale sur 20", text: "Entrer la moyenne générale obtenue au baccalaureat, calculee sur 40 % de controle continu (livret scolaire de 1ere et terminale) et 60 % d'epreuves finales (ecrites + Grand oral)." },
          { name: "Comparer au barème officiel de l'Education Nationale", text: "Le simulateur applique les seuils de l'article D334-4 du code de l'education : Passable de 10 à 11,99 / 20, Assez Bien de 12 à 13,99, Bien de 14 à 15,99, Très Bien de 16 à 17,99." },
          { name: "Identifier la distinction maximale", text: "À partir de 18 / 20, la mention Très Bien avec Felicitations du jury est attribuee. C'est la distinction la plus haute du baccalaureat, particulierement valorisee par les CPGE et grandes ecoles." },
          { name: "Lire les effets sur Parcoursup et la bourse au merite", text: "La mention Très Bien ouvre droit à la bourse au merite CROUS pour les boursiers. Certaines formations selectives (CPGE, IFSI, ecoles d'ingenieurs post-bac) valorisent explicitement les mentions Bien et Très Bien dans leurs critères Parcoursup." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-mention-bac" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
