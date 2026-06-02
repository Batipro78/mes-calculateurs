import type { Metadata } from "next";
import CalculAgeChienHumain from "./CalculAgeChienHumain";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-age-chien-humain" },
  title: "Calcul Âge Chien en Années Humaines - Formule AVMA",
  description:
    "Convertissez l'âge de votre chien en années humaines. Formule AVMA vétérinaire + étude Wang 2019 (ADN méthylation). Petit, moyen, grand ou géant chien.",
  keywords:
    "age chien humain, convertir age chien, mon chien quel age, calcul age chien, formule AVMA, wang 2019, esperance vie chien, age chien en ans humains",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer l'âge d'un chien en années humaines ?",
    a: "La formule AVMA (American Veterinary Medical Association) est : la 1ère année du chien = 15 ans humains, la 2ème année = +9 ans (total 24), puis à partir de 3 ans, on ajoute +4 à +7 ans par année selon la taille (petit, moyen, grand ou géant). Par exemple, un chien moyen de 5 ans = 15 + 9 + 5×5 = 49 ans humains.",
  },
  {
    q: "Pourquoi pas 1 an = 7 ans humains ?",
    a: "C'est un mythe ancien. La réalité est que les chiens se développent beaucoup plus vite la première année (croissance osseuse, maturité sexuelle). L'AVMA a mis à jour cette formule en utilisant des données biologiques modernes. Un chien d'1 an = 15 ans humains (pas 7), car il atteint déjà la puberté et la majorité de sa croissance.",
  },
  {
    q: "L'âge d'un chien change-t-il selon sa taille ?",
    a: "Oui, absolument. Les petits chiens (≤10 kg) vivent plus longtemps (14-16 ans) et vieillissent plus lentement (+4 ans humains par année après 2 ans). Les chiens géants (>45 kg) vivent moins longtemps (8-10 ans) et vieillissent plus vite (+7 ans humains par année). Cela reflète les différences biologiques entre les races.",
  },
  {
    q: "Quelle est l'espérance de vie moyenne d'un chien ?",
    a: "L'espérance de vie varie selon la taille : petit chien 14-16 ans, chien moyen 12-14 ans, grand chien 10-12 ans, chien géant 8-10 ans. Ces moyennes peuvent varier selon la race, la génétique et la qualité des soins vétérinaires.",
  },
  {
    q: "Qu'est-ce que l'étude Wang 2019 sur l'âge des chiens ?",
    a: "En 2019, des chercheurs ont publié dans Cell Systems une formule basée sur la méthylation de l'ADN : âge humain = 16 × ln(âge chien) + 31. Elle modélise le vieillissement biologique plus précisément. Pour un Labrador de 5 ans, cela donne environ 56 ans humains, contre 44 ans avec la formule AVMA.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Âge Chien" />
      <Breadcrumb currentPage="Âge Chien" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🐕
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Âge Chien en Années Humaines
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez en vrai l&apos;âge de votre compagnon. Formule AVMA officielle,
        calcul adapté à la taille + étude scientifique Wang 2019.
      </p>

      <CalculAgeChienHumain />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi pas 1 an = 7 ans humains ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          C&apos;est l&apos;une des idées les plus répandues sur l&apos;âge des
          chiens, mais c&apos;est un <strong>mythe</strong>. Cette règle simpliste
          date d&apos;avant que nous comprenions vraiment la biologie canine. En
          réalité, <strong>un chien d&apos;1 an = 15 ans humains</strong>, pas 7.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Pourquoi cette différence ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La première année d&apos;un chien est bien plus intense qu&apos;une année
          humaine. En 12 mois, un chiot :
        </p>
        <ul className="text-slate-600 space-y-2 mb-4 ml-4 list-disc">
          <li>Grandit jusqu&apos;à sa taille adulte (croissance osseuse rapide)</li>
          <li>Atteint la puberté et la maturité sexuelle</li>
          <li>Développe ses dents adultes</li>
          <li>Gagne son indépendance comportementale</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Tout cela se produirait en bien plus de 7 ans chez un enfant humain. C&apos;est
          pourquoi <strong>l&apos;AVMA a estimé cette 1ère année à 15 ans humains</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La 2ème année = +9 ans (total 24 ans)
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          À 2 ans, votre chien a atteint sa maturation quasi-complète. Les années
          suivantes, le vieillissement ralentit et dépend de sa <strong>taille</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          À partir de 3 ans : variation selon la taille
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">Petit chien (≤10 kg)</p>
            <p className="text-sm text-amber-800">+4 ans humains par année</p>
            <p className="text-xs text-amber-700 mt-1">Ex : 5 ans = 39 ans humain</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <p className="font-semibold text-orange-900">Moyen (10-25 kg)</p>
            <p className="text-sm text-orange-800">+5 ans humains par année</p>
            <p className="text-xs text-orange-700 mt-1">Ex : 5 ans = 44 ans humain</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="font-semibold text-red-900">Grand (25-45 kg)</p>
            <p className="text-sm text-red-800">+6 ans humains par année</p>
            <p className="text-xs text-red-700 mt-1">Ex : 5 ans = 49 ans humain</p>
          </div>
          <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
            <p className="font-semibold text-rose-900">Géant (plus de 45 kg)</p>
            <p className="text-sm text-rose-800">+7 ans humains par année</p>
            <p className="text-xs text-rose-700 mt-1">Ex : 5 ans = 54 ans humain</p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          🧬 Étude scientifique Wang 2019
        </h2>
        <p className="text-blue-800 mb-4 leading-relaxed">
          En 2019, Trey Idso et ses collègues ont publié une étude révolutionnaire
          dans <strong>Cell Systems</strong> analysant la méthylation de l&apos;ADN
          pour comparer le vieillissement des chiens et des humains.
        </p>

        <h3 className="font-bold text-blue-900 mt-4 mb-2">La formule : 16 × ln(âge) + 31</h3>
        <p className="text-blue-800 mb-4 leading-relaxed">
          Cette formule log-linéaire modélise le vieillissement biologique plus
          précisément que la règle AVMA simple. Elle s&apos;applique particulièrement
          bien aux Labrador.
        </p>

        <div className="bg-white border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-mono text-blue-900">
            Exemple pour un Labrador de 5 ans :
          </p>
          <p className="text-sm text-blue-800 mt-1">
            16 × ln(5) + 31 = 16 × 1.609 + 31 = <strong>56 ans humain</strong>
          </p>
        </div>

        <p className="text-blue-800 leading-relaxed">
          <strong>Différence avec AVMA :</strong> Pour les jeunes chiens, Wang donne
          des ages plus élevés (chiot d&apos;1 an ≈ 31 ans humain vs 15 ans AVMA).
          À partir de 7-8 ans, les deux méthodes convergent. C&apos;est un bon
          complément scientifique à la méthode AVMA pratique.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Espérance de vie par taille
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les chiens de petite taille vivent globalement plus longtemps que les
          chiens géants. Cela s&apos;explique par les différences métaboliques et
          les problèmes génétiques propres à chaque catégorie.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="font-bold text-green-900 mb-2">🐕 Petit chien</p>
            <p className="text-2xl font-bold text-green-700 mb-1">14-16 ans</p>
            <p className="text-sm text-green-800">Exemples : Chihuahua, Yorkshire, Bichon</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="font-bold text-blue-900 mb-2">🐕 Chien moyen</p>
            <p className="text-2xl font-bold text-blue-700 mb-1">12-14 ans</p>
            <p className="text-sm text-blue-800">Exemples : Bulldog, Cocker, Beagle</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="font-bold text-purple-900 mb-2">🐕‍🦺 Grand chien</p>
            <p className="text-2xl font-bold text-purple-700 mb-1">10-12 ans</p>
            <p className="text-sm text-purple-800">Exemples : Labrador, Berger Allemand</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="font-bold text-red-900 mb-2">🐕‍🦺 Chien géant</p>
            <p className="text-2xl font-bold text-red-700 mb-1">8-10 ans</p>
            <p className="text-sm text-red-800">Exemples : Saint-Bernard, Dogue, Mastiff</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mt-6 leading-relaxed">
          Ces chiffres sont des moyennes. Chaque chien est unique et l&apos;espérance
          de vie dépend aussi de la génétique, de la race, des soins vétérinaires et
          du mode de vie (alimentation, exercice, stress).
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Soins selon l&apos;âge de votre chien
        </h2>

        <div className="space-y-4">
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Chiot (0-1 an)</p>
            <p className="text-slate-600 text-sm mt-1">
              Vaccins réguliers, déparasitage, socialisation, alimentation spéciale
              chiot riche en calcium et phosphore.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Adulte (1-7 ans)</p>
            <p className="text-slate-600 text-sm mt-1">
              Entretien dentaire régulier, exercice quotidien, alimentation équilibrée,
              visite annuelle chez le vétérinaire, rappel vaccinal.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Senior (7+ ans)</p>
            <p className="text-slate-600 text-sm mt-1">
              Bilan gériatrique annuel, alimentation adaptée (moins riche en calories),
              exercice doux, surveillance des problèmes articulaires et dentaires.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-900 font-semibold mb-2">💚 Conseil général</p>
          <p className="text-green-800 text-sm">
            Consultez votre vétérinaire au moins une fois par an, plus souvent après
            7 ans. Un suivi régulier peut détecter des problèmes avant qu&apos;ils ne
            deviennent graves et prolonger la vie de votre compagnon.
          </p>
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Disclaimer :</strong> Ce calcul est indicatif et basé sur les formules
          de l&apos;AVMA (American Veterinary Medical Association) et l&apos;étude Wang
          et al. 2019 publiée dans Cell Systems. Pour des conseils spécifiques sur la
          santé de votre chien, consultez votre vétérinaire.
        </p>
      </div>

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-age-chien-humain" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
