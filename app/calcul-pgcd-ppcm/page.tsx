import type { Metadata } from "next";
import CalculateurPgcdPpcm from "./CalculateurPgcdPpcm";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-pgcd-ppcm" },
  title: "Calcul PGCD et PPCM - Algorithme d'Euclide",
  description:
    "Calculez le PGCD et le PPCM de deux nombres. Algorithme d'Euclide detaille, decomposition en facteurs premiers, verification. Gratuit.",
  keywords:
    "calcul pgcd, calcul ppcm, pgcd ppcm en ligne, algorithme euclide, plus grand commun diviseur, plus petit commun multiple, facteurs premiers, pgcd ppcm calculatrice",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "L'algorithme d'Euclide, étape par étape",
    paras: [
      "L'algorithme d'Euclide est la méthode la plus rapide pour trouver le PGCD. On divise le plus grand nombre par le plus petit, puis on remplace le grand par le petit et le petit par le reste, et on recommence jusqu'à obtenir un reste nul.",
      "Exemple avec 48 et 36 : 48 = 36 × 1 + 12 (reste 12). On continue avec 36 et 12 : 36 = 12 × 3 + 0 (reste 0). Le dernier reste non nul est 12 : c'est le PGCD de 48 et 36.",
      "L'avantage de cette méthode est qu'elle fonctionne même avec de très grands nombres, en quelques étapes seulement.",
    ],
  },
  {
    title: "La méthode par décomposition en facteurs premiers",
    paras: [
      "Autre approche : décomposer chaque nombre en produit de facteurs premiers. Par exemple, 36 = 2² × 3² et 48 = 2⁴ × 3.",
      "Le PGCD est le produit des facteurs communs, chacun à son plus petit exposant : ici 2² × 3 = 12. Le PPCM est le produit de tous les facteurs présents, chacun à son plus grand exposant : ici 2⁴ × 3² = 144.",
      "On vérifie avec la relation fondamentale : PGCD × PPCM = 12 × 144 = 1 728, et 48 × 36 = 1 728. Les deux résultats coïncident.",
    ],
  },
  {
    title: "À quoi servent le PGCD et le PPCM au quotidien ?",
    paras: [
      "Le PGCD sert surtout à simplifier les fractions : pour réduire 36/48, on divise haut et bas par leur PGCD (12), ce qui donne 3/4. Il aide aussi à partager des quantités en parts égales les plus grandes possibles.",
      "Le PPCM sert à trouver un dénominateur commun pour additionner des fractions, ou à résoudre des problèmes de cycles : deux feux qui clignotent à des rythmes différents, deux engrenages, ou la pose d'un carrelage sans découpe se calculent souvent avec un PPCM.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  { q: "Comment calculer le PGCD de deux nombres ?", a: "Le PGCD (Plus Grand Commun Diviseur) se calcule avec l'algorithme d'Euclide : on divise le plus grand nombre par le plus petit, puis on recommence avec le diviseur et le reste, jusqu'à obtenir un reste de 0. Le dernier diviseur non nul est le PGCD." },
  { q: "Comment calculer le PPCM ?", a: "Le PPCM (Plus Petit Commun Multiple) se calcule avec la formule : PPCM(a, b) = (a × b) ÷ PGCD(a, b). Il suffit donc de connaître le PGCD pour calculer le PPCM." },
  { q: "Comment calculer le PGCD avec la décomposition en facteurs premiers ?", a: "On décompose chaque nombre en facteurs premiers, puis on multiplie les facteurs communs à leur plus petit exposant. Exemple : 36 = 2² × 3² et 48 = 2⁴ × 3, donc PGCD = 2² × 3 = 12." },
  { q: "À quoi servent le PGCD et le PPCM ?", a: "Le PGCD sert à simplifier les fractions et à trouver des mesures communes. Le PPCM sert à trouver un dénominateur commun pour additionner des fractions, synchroniser des cycles ou calculer des périodicités." },
  { q: "Le PGCD peut-il être plus grand que les nombres ?", a: "Non. Le PGCD est toujours inférieur ou égal au plus petit des deux nombres, puisqu'il doit les diviser tous les deux. À l'inverse, le PPCM est toujours supérieur ou égal au plus grand des deux." },
  { q: "Qu'est-ce que deux nombres premiers entre eux ?", a: "Deux nombres sont premiers entre eux (ou copremiers) si leur PGCD est égal à 1. Cela ne signifie pas qu'ils sont des nombres premiers individuellement : par exemple, 8 et 9 sont premiers entre eux (PGCD = 1) mais ni l'un ni l'autre n'est un nombre premier." },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul PGCD PPCM" />
      <Breadcrumb currentPage="PGCD / PPCM" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🔢</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul PGCD et PPCM</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Trouvez le PGCD et le PPCM de deux nombres. Algorithme d&apos;Euclide detaille et facteurs premiers.</p>

      <CalculateurPgcdPpcm />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">PGCD et PPCM : explications</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="bg-purple-50/50 rounded-xl p-4">
            <p className="font-semibold text-purple-700 mb-1">PGCD</p>
            <p className="text-sm text-slate-600">Plus Grand Commun Diviseur : le plus grand nombre qui divise a et b sans reste.</p>
          </div>
          <div className="bg-purple-50/50 rounded-xl p-4">
            <p className="font-semibold text-purple-700 mb-1">PPCM</p>
            <p className="text-sm text-slate-600">Plus Petit Commun Multiple : le plus petit nombre qui est multiple de a et de b.</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Relation fondamentale</h3>
        <div className="bg-purple-50/50 rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-purple-700">PGCD(a, b) &times; PPCM(a, b) = a &times; b</p>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples courants</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">a, b</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">PGCD</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">PPCM</th>
            </tr></thead>
            <tbody>
              {[[12,18],[24,36],[15,20],[8,12],[100,75],[36,48]].map(([a,b]) => {
                const g = function pgcd(x: number, y: number): number { while(y){[x,y]=[y,x%y];} return x; }(a,b);
                return (
                  <tr key={`${a}-${b}`} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700">{a} et {b}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-purple-600">{g}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-700">{(a*b)/g}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections de contenu detaille (prose en chaines JS) */}
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

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-pgcd-ppcm" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
