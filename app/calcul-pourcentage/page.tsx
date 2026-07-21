import type { Metadata } from "next";
import CalculateurPourcentage from "./CalculateurPourcentage";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-pourcentage" },
  title: "Calcul Pourcentage 2026 - Calculateur gratuit en ligne",
  description:
    "Calculez un pourcentage facilement : pourcentage d'un nombre, augmentation, reduction, part. Formules, exemples concrets, astuces de calcul mental et FAQ.",
  keywords:
    "calcul pourcentage, pourcentage d'un nombre, calculer pourcentage, augmentation pourcentage, reduction pourcentage, remise pourcentage, points de pourcentage",
};

const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Les 4 calculs de pourcentage les plus utiles",
    paras: [
      "Pourcentage d'un nombre : pour trouver X % de Y, multipliez Y par X puis divisez par 100. Exemple : 20 % de 150 = 150 x 20 / 100 = 30.",
      "Part en pourcentage : pour savoir quelle proportion represente une partie dans un total, faites (partie / total) x 100. Exemple : 30 sur 120 = 25 %.",
      "Augmentation en pourcentage : ((valeur d'arrivee - valeur de depart) / valeur de depart) x 100. Exemple : passer de 80 a 100 represente +25 %.",
      "Reduction ou remise : prix final = prix x (1 - remise / 100). Exemple : un article a 80 EUR avec 25 % de remise revient a 80 x 0,75 = 60 EUR.",
    ],
  },
  {
    title: "Le piege des hausses et baisses successives",
    paras: [
      "Une baisse de 20 % suivie d'une hausse de 20 % ne ramene PAS au prix de depart. Sur 100 EUR : -20 % donne 80 EUR, puis +20 % donne 96 EUR. On perd 4 EUR.",
      "Pour cumuler deux variations, on multiplie les coefficients, on ne les additionne pas. -20 % puis +20 % equivaut a 0,80 x 1,20 = 0,96, soit -4 % au total.",
      "Meme logique pour deux remises successives de 30 % et 10 % : le prix est multiplie par 0,70 puis par 0,90 = 0,63, soit une remise reelle de 37 %, et non 40 %.",
    ],
  },
  {
    title: "Pourcentage et points de pourcentage : ne pas confondre",
    paras: [
      "Passer d'un taux de 4 % a 6 % est une hausse de 2 points de pourcentage, mais une augmentation de 50 % en valeur relative (2 / 4 = 50 %).",
      "Cette distinction est essentielle pour lire correctement un taux d'interet, un taux de chomage ou une part de marche.",
    ],
  },
  {
    title: "Astuces de calcul mental",
    paras: [
      "10 % d'un nombre : decalez la virgule d'un rang. 10 % de 240 = 24.",
      "5 % : c'est la moitie de 10 %. 5 % de 240 = 12.",
      "1 % : decalez la virgule de deux rangs. 1 % de 240 = 2,4.",
      "Astuce de symetrie : X % de Y est toujours egal a Y % de X. Ainsi 18 % de 50 = 50 % de 18 = 9.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer un pourcentage d'un nombre ?",
    a: "Multipliez le nombre par le pourcentage puis divisez par 100. Exemple : 20 % de 150 = 150 x 20 / 100 = 30.",
  },
  {
    q: "Comment calculer une augmentation en pourcentage ?",
    a: "Utilisez ((valeur d'arrivee - valeur de depart) / valeur de depart) x 100. Passer de 80 a 100 donne ((100 - 80) / 80) x 100 = +25 %.",
  },
  {
    q: "Comment calculer une remise ou une reduction ?",
    a: "Prix final = prix x (1 - remise / 100). Un article a 80 EUR avec -25 % revient a 80 x 0,75 = 60 EUR.",
  },
  {
    q: "Une baisse puis une hausse du meme pourcentage annulent-elles l'effet ?",
    a: "Non. -20 % puis +20 % sur 100 EUR donnent 96 EUR, pas 100. On multiplie les coefficients (0,80 x 1,20 = 0,96), soit -4 % au total.",
  },
  {
    q: "Quelle difference entre pourcentage et point de pourcentage ?",
    a: "Passer de 4 % a 6 %, c'est +2 points de pourcentage mais +50 % en valeur relative (2 / 4). Les deux notions ne sont pas interchangeables.",
  },
  {
    q: "Comment trouver quel pourcentage represente un nombre par rapport a un autre ?",
    a: "Faites (partie / total) x 100. Exemple : 30 sur 120 = (30 / 120) x 100 = 25 %.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Pourcentage" />
      <Breadcrumb currentPage="Calcul Pourcentage" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Pourcentage
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tous les calculs de pourcentage en un seul outil. Resultat instantane.
      </p>

      <CalculateurPourcentage />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les formules en un coup d&apos;oeil
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Pourcentage d&apos;un nombre
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              X% de Y = Y x (X / 100)
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 20% de 150 = 150 x 0.20 = 30
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Augmentation en %
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              ((Nouveau - Ancien) / Ancien) x 100
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 80 → 100 = +25%
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Reduction / Remise
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Prix final = Prix x (1 - Remise / 100)
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 80 EUR - 25% = 60 EUR
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Part en pourcentage
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              (Partie / Total) x 100
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 30 sur 120 = 25%
            </p>
          </div>
        </div>
      </section>

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
        name="Calculer un pourcentage"
        steps={[
          { name: "Pourcentage d'un nombre", text: "Pour calculer X pour cent d'un nombre, multiplier le nombre par X puis diviser par 100." },
          { name: "Hausse ou baisse", text: "Pour une augmentation de X pour cent, multiplier par (1 plus X/100) ; pour une réduction, multiplier par (1 moins X/100)." },
          { name: "Part en pourcentage", text: "Pour savoir quel pourcentage représente une part, diviser la part par le total puis multiplier par 100." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-pourcentage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
