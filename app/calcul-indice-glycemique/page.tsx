import type { Metadata } from "next";
import CalculateurIndiceGlycemique from "./CalculateurIndiceGlycemique";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import { ALIMENTS } from "./indiceGlycemiqueCalc";

export const metadata: Metadata = {
  title: "Indice Glycemique des Aliments 2026 - Tableau IG et Charge Glycemique",
  description:
    "Tableau complet de l'indice glycemique (IG) et de la charge glycemique (CG) de plus de 40 aliments. Comparez les IG des fruits, feculents, cereales, boissons. Outil gratuit pour diabetiques et sportifs.",
  keywords:
    "indice glycemique, tableau IG aliments, charge glycemique, IG bas moyen eleve, aliments diabete, indice glycemique fruits, feculents IG, IG riz pain pates",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que l'indice glycemique (IG) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'indice glycemique (IG) est une mesure de 0 a 100 qui indique la rapidite avec laquelle un aliment fait monter la glycemie (taux de sucre dans le sang) apres ingestion. Un IG bas (<=55) provoque une montee lente et progressive, favorable au controle du poids et de la glycemie. Un IG eleve (>=70) entraine un pic glycemique rapide suivi d'une hypoglycemie reactive.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la difference entre indice glycemique et charge glycemique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'indice glycemique (IG) mesure la qualite des glucides d'un aliment, independamment de la quantite. La charge glycemique (CG) = (IG x glucides par portion) / 100 tient compte a la fois de la qualite ET de la quantite. Par exemple, la carotte a un IG de 47 mais sa CG par portion est seulement de 4, car elle contient peu de glucides. La CG est un indicateur plus pertinent pour la pratique alimentaire.",
      },
    },
    {
      "@type": "Question",
      name: "Comment utiliser le tableau de l'indice glycemique pour mieux manger ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour controler votre glycemie et votre energie, privilegiez les aliments a IG bas (<= 55) : legumineuses, la plupart des fruits, legumes, cereales completes. Associez les aliments a IG eleve avec des proteines et des fibres pour reduire leur impact glycemique. La charge glycemique de la journee entiere devrait rester inferieure a 80-100 pour maintenir une glycemie stable.",
      },
    },
  ],
};

// Summary table data
const IG_SUMMARY = [
  { categorie: "Legumineuses", exemples: "Lentilles (32), Haricots rouges (24), Pois chiches (33)", niveau: "Bas" },
  { categorie: "Fruits frais", exemples: "Pomme (36), Peche (42), Orange (43), Banane (51)", niveau: "Bas a moyen" },
  { categorie: "Cereales completes", exemples: "Flocons d'avoine (55), Pates completes (42), Riz complet (50)", niveau: "Bas a moyen" },
  { categorie: "Pains et feculents", exemples: "Pain complet (51), Riz basmati (58), Riz blanc (73), Baguette (95)", niveau: "Moyen a eleve" },
  { categorie: "Sucres et confiseries", exemples: "Chocolat noir 70% (22), Miel (61), Sucre blanc (68)", niveau: "Variable" },
  { categorie: "Boissons sucrees", exemples: "Jus de pomme (44), Coca-Cola (63)", niveau: "Moyen a eleve" },
];

const totalAliments = ALIMENTS.length;
const alimentsIGBas = ALIMENTS.filter((a) => a.ig <= 55).length;
const alimentsIGMoyen = ALIMENTS.filter((a) => a.ig > 55 && a.ig <= 69).length;
const alimentsIGEleve = ALIMENTS.filter((a) => a.ig >= 70).length;

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Tableau Indice Glycemique des Aliments" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb currentPage="Indice Glycemique des Aliments" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌿
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indice Glycemique des Aliments 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tableau complet de l&apos;indice glycemique (IG) et de la charge glycemique (CG) de{" "}
        {totalAliments} aliments courants — fruits, feculents, cereales, boissons et plus.
      </p>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <p className="text-3xl font-extrabold text-green-700">{alimentsIGBas}</p>
          <p className="text-xs font-semibold text-green-600 mt-1">IG Bas (&le;55)</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
          <p className="text-3xl font-extrabold text-yellow-700">{alimentsIGMoyen}</p>
          <p className="text-xs font-semibold text-yellow-600 mt-1">IG Moyen (56–69)</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
          <p className="text-3xl font-extrabold text-red-700">{alimentsIGEleve}</p>
          <p className="text-xs font-semibold text-red-600 mt-1">IG Eleve (&ge;70)</p>
        </div>
      </div>

      <CalculateurIndiceGlycemique />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que l&apos;indice glycemique (IG) ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>indice glycemique</strong> est une echelle de 0 a 100 qui mesure
          la vitesse d&apos;absorption des glucides d&apos;un aliment dans le sang.
          Il a ete developpe dans les annees 1980 par le Dr David Jenkins a l&apos;Universite
          de Toronto pour aider les diabetiques a mieux gerer leur alimentation.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un aliment a <strong>IG bas (&le;55)</strong> libere son sucre lentement,
          ce qui evite les pics d&apos;insuline et maintient une energie stable.
          Un aliment a <strong>IG eleve (&ge;70)</strong> provoque une montee rapide
          de la glycemie, suivie d&apos;une baisse brutale qui peut causer fatigue et fringales.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Qu&apos;est-ce que la charge glycemique (CG) ?
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La <strong>charge glycemique</strong> (CG) est un indicateur plus complet que l&apos;IG car
          elle tient compte a la fois de la qualite des glucides (IG) et de la quantite consommee.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 mb-4">
          CG = (IG x glucides par portion en grammes) / 100
        </div>
        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">CG Faible : &le;10</p>
            <p className="text-xs text-green-600 mt-1">Impact glycemique minimal. Ideal pour la gestion du diabete et le controle du poids.</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <p className="font-semibold text-yellow-700 text-sm">CG Moyenne : 11–19</p>
            <p className="text-xs text-yellow-600 mt-1">Impact modere. A consommer en quantite raisonnable, surtout si objectif glycemique strict.</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">CG Elevee : &ge;20</p>
            <p className="text-xs text-red-600 mt-1">Impact glycemique fort. A limiter ou associer a des proteines et fibres pour reduire l&apos;effet.</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Tableau IG par categorie d&apos;aliments
        </h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Categorie</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Exemples (IG)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Niveau IG</th>
              </tr>
            </thead>
            <tbody>
              {IG_SUMMARY.map((row) => (
                <tr key={row.categorie} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">{row.categorie}</td>
                  <td className="py-2.5 px-2 text-slate-500 hidden sm:table-cell text-xs">{row.exemples}</td>
                  <td className="py-2.5 px-2 text-right text-xs font-semibold text-slate-600">{row.niveau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment utiliser l&apos;IG au quotidien ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Diabete de type 2</strong> : privilegier les aliments a IG bas pour limiter les pics glycemiques et reduire les besoins en insuline.
          </li>
          <li>
            <strong>Perte de poids</strong> : les aliments a IG bas sont plus rassasiants et limitent les fringales. Associer proteines + fibres + IG bas.
          </li>
          <li>
            <strong>Sport et performance</strong> : consommer des aliments a IG moyen a eleve avant et apres l&apos;effort pour recharger le glycogene rapidement.
          </li>
          <li>
            <strong>Energie stable</strong> : eviter les aliments a IG tres eleve a jeun (baguette, corn flakes) pour eviter les coups de barre de la matinee.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Facteurs qui modifient l&apos;indice glycemique
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-semibold text-slate-700 text-sm">Cuisson</p>
            <p className="text-xs text-slate-500 mt-1">Plus un aliment est cuit (surtout les pates, le riz), plus son IG augmente. Les pates al dente ont un IG inferieur aux pates trop cuites.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-semibold text-slate-700 text-sm">Maturite des fruits</p>
            <p className="text-xs text-slate-500 mt-1">Une banane mure a un IG de 62, contre 51 pour une banane pas trop mure. Plus le fruit est mur, plus l&apos;amidon est transforme en sucres simples.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-semibold text-slate-700 text-sm">Association alimentaire</p>
            <p className="text-xs text-slate-500 mt-1">Associer un aliment a IG eleve avec des fibres, proteines ou graisses reduit son impact glycemique global sur le repas.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-semibold text-slate-700 text-sm">Traitement industriel</p>
            <p className="text-xs text-slate-500 mt-1">Les aliments transformes et raffines ont generalement un IG plus eleve. Le pain de mie industriel depasse souvent IG 85.</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-indice-glycemique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
