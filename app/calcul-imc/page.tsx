import type { Metadata } from "next";
import CalculateurIMC from "./CalculateurIMC";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-imc" },
  title: "Calcul IMC 2026 - Indice de Masse Corporelle gratuit",
  description:
    "Calculez votre IMC (Indice de Masse Corporelle) gratuitement. Interpretez votre resultat selon les normes OMS : maigreur, normal, surpoids, obesite. Exemples et FAQ.",
  keywords:
    "calcul IMC, indice masse corporelle, calculer IMC, IMC femme, IMC homme, poids ideal, obesite, surpoids, IMC normal",
};

const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Comment interpreter votre IMC",
    paras: [
      "L'IMC situe votre poids par rapport a votre taille sur une echelle de reference. Un IMC entre 18,5 et 25 correspond a une corpulence normale selon l'Organisation Mondiale de la Sante. En dessous de 18,5, on parle de maigreur ; au-dessus de 25, de surpoids ; au-dessus de 30, d'obesite.",
      "Exemple concret : une personne de 1,70 m pesant 70 kg a un IMC de 70 / (1,70 x 1,70) = 24,2. Elle se situe donc dans la fourchette de poids normal.",
      "Pour cette meme taille de 1,70 m, la fourchette de poids consideree comme normale (IMC de 18,5 a 25) va d'environ 53 kg a 72 kg.",
    ],
  },
  {
    title: "IMC homme, femme, enfant : les nuances",
    paras: [
      "La formule de l'IMC est identique pour les hommes et les femmes. En revanche, a IMC egal, les femmes ont en moyenne une masse grasse un peu plus elevee que les hommes : l'indicateur reste une estimation de corpulence, pas une mesure exacte de la graisse.",
      "Pour les enfants et les adolescents, l'IMC s'interprete differemment, a l'aide de courbes de corpulence par age et par sexe figurant dans le carnet de sante. Les seuils adultes ne s'appliquent pas.",
      "Apres 65 ans, un IMC legerement plus eleve (jusqu'a 27 environ) est souvent considere comme protecteur. Demandez l'avis d'un professionnel de sante.",
    ],
  },
  {
    title: "Les limites de l'IMC et les indicateurs complementaires",
    paras: [
      "L'IMC ne distingue pas la masse grasse de la masse musculaire. Un sportif tres muscle peut afficher un IMC eleve sans exces de graisse.",
      "Le tour de taille complete utilement l'IMC : un tour de taille superieur a 88 cm chez la femme et 102 cm chez l'homme signale un exces de graisse abdominale, facteur de risque cardiovasculaire, meme avec un IMC normal.",
      "L'IMC est un point de depart, pas un diagnostic. Pour un bilan complet, un medecin prend aussi en compte votre composition corporelle, votre activite physique et vos antecedents.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que l'IMC ?",
    a: "L'Indice de Masse Corporelle est un indicateur de l'OMS qui evalue la corpulence en divisant le poids (kg) par la taille (m) au carre. Il situe votre poids par rapport a votre taille.",
  },
  {
    q: "Comment calculer son IMC ?",
    a: "La formule est : IMC = Poids (kg) / (Taille (m) x Taille (m)). Exemple : 70 kg pour 1,70 m donne 70 / (1,70 x 1,70) = 24,2, soit un poids normal.",
  },
  {
    q: "Quel est un IMC normal ?",
    a: "Selon l'OMS, un IMC compris entre 18,5 et 25 correspond a une corpulence normale. En dessous, c'est la maigreur ; entre 25 et 30, le surpoids ; au-dela de 30, l'obesite.",
  },
  {
    q: "L'IMC est-il different pour les hommes et les femmes ?",
    a: "La formule est la meme. A IMC egal, les femmes ont en moyenne un peu plus de masse grasse, mais les seuils d'interpretation restent identiques chez l'adulte.",
  },
  {
    q: "Quelles sont les limites de l'IMC ?",
    a: "Il ne distingue pas muscle et graisse, n'est pas adapte aux enfants, aux femmes enceintes ni aux personnes agees. Le tour de taille est un bon complement pour evaluer le risque.",
  },
  {
    q: "Quel poids pour ma taille ?",
    a: "Multipliez 18,5 et 25 par votre taille au carre. Pour 1,70 m, la fourchette normale va d'environ 53 kg a 72 kg.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul IMC" />
      <Breadcrumb currentPage="Calcul IMC" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul IMC 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre Indice de Masse Corporelle et interpretez votre resultat
        selon les normes de l&apos;OMS.
      </p>

      <CalculateurIMC />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          La formule et la classification OMS
        </h2>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 mb-6">
          IMC = Poids (kg) / Taille (m) x Taille (m)
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Maigreur</p>
            <p className="text-xs text-blue-500 mt-0.5">IMC &lt; 18,5</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="font-semibold text-emerald-700 text-sm">
              Poids normal
            </p>
            <p className="text-xs text-emerald-500 mt-0.5">
              18,5 &le; IMC &lt; 25
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Surpoids</p>
            <p className="text-xs text-amber-500 mt-0.5">
              25 &le; IMC &lt; 30
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">
              Obesite moderee
            </p>
            <p className="text-xs text-orange-500 mt-0.5">
              30 &le; IMC &lt; 35
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">
              Obesite severe
            </p>
            <p className="text-xs text-red-500 mt-0.5">
              35 &le; IMC &lt; 40
            </p>
          </div>
          <div className="bg-red-100 rounded-xl p-3 border border-red-200">
            <p className="font-semibold text-red-800 text-sm">
              Obesite morbide
            </p>
            <p className="text-xs text-red-600 mt-0.5">IMC &ge; 40</p>
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

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Completez avec le calcul de calories
        </h2>
        <p className="text-slate-600 leading-relaxed">
          L&apos;IMC vous indique si votre poids est adapte, mais pour savoir{" "}
          combien manger par jour, utilisez notre{" "}
          <a
            href="/calcul-calories"
            className="text-rose-600 hover:underline font-medium"
          >
            calculateur de calories (TDEE)
          </a>
          . Il estime vos besoins selon votre age, poids, taille et activite
          physique.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer son IMC"
        steps={[
          { name: "Mesurer", text: "Mesurer son poids en kilogrammes et sa taille en mètres." },
          { name: "Calculer", text: "Diviser le poids par la taille au carre, soit poids divise par (taille multipliee par taille)." },
          { name: "Interpréter", text: "Comparer le résultat à la classification de l'OMS : maigreur, corpulence normale, surpoids, obesite." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`L'IMC correspond au poids en kilogrammes divise par la taille en metres au carre. L'interpretation suit la classification de l'Organisation mondiale de la sante (maigreur, corpulence normale, surpoids, obesite). C'est un indicateur indicatif, a completer par d'autres mesures.`}
        sources={[
          { label: "OMS - Indice de masse corporelle", url: "https://www.who.int/fr" },
          { label: "Ameli.fr - Surpoids et obesite", url: "https://www.ameli.fr" },
        ]}
      />


      <RelatedCalculators currentSlug="/calcul-imc" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
