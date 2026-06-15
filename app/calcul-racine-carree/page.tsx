import type { Metadata } from "next";
import CalculateurRacineCarree from "./CalculateurRacineCarree";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-racine-carree" },
  title: "Calcul Racine Carree - Racine Cubique, Carres Parfaits",
  description:
    "Calculez la racine carrée de n'importe quel nombre. Racine cubique, carrés parfaits, méthode par encadrement et exemples. Gratuit.",
  keywords:
    "racine carree, calcul racine carree, racine carree en ligne, carre parfait, racine cubique, calculer racine, racine carree de, tableau racines carrees",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Qu'est-ce qu'une racine carrée ?",
    paras: [
      "La racine carrée d'un nombre n, notée √n, est le nombre positif qui, multiplié par lui-même, redonne n. C'est l'opération inverse de la mise au carré. Par exemple, √144 = 12 parce que 12 × 12 = 144.",
      "Quand n n'est pas un carré parfait, le résultat est un nombre à virgule, souvent infini et non périodique (on dit qu'il est irrationnel). Ainsi √2 ≈ 1,41421 et ne s'arrête jamais. La racine carrée n'est définie, dans les nombres réels, que pour les nombres positifs ou nuls.",
    ],
  },
  {
    title: "Calculer une racine carrée à la main, par encadrement",
    paras: [
      "Sans calculatrice, on peut estimer une racine carrée en l'encadrant entre deux carrés parfaits. Pour √50 : on sait que 7² = 49 et 8² = 64. Donc √50 est compris entre 7 et 8, et plutôt proche de 7 puisque 50 est proche de 49. Une bonne estimation est 7,07.",
      "Pour affiner, on teste : 7,1² = 50,41 (un peu trop), 7,07² = 49,98 (presque pile). Cette méthode d'encadrement donne rapidement une valeur approchée correcte à la décimale près.",
    ],
  },
  {
    title: "Carré parfait, racine carrée et racine cubique",
    paras: [
      "Un carré parfait est un entier dont la racine carrée est elle-même un entier : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100... Les reconnaître permet de simplifier beaucoup de calculs.",
      "La racine cubique, notée ³√n, est différente : c'est le nombre x tel que x³ = n. Par exemple ³√27 = 3 car 3 × 3 × 3 = 27. Contrairement à la racine carrée, la racine cubique existe aussi pour les nombres négatifs (³√−8 = −2).",
    ],
  },
  {
    title: "À quoi servent les racines carrées ?",
    paras: [
      "La racine carrée est partout en géométrie : le théorème de Pythagore permet de trouver la longueur de l'hypoténuse d'un triangle rectangle (c = √(a² + b²)), et le côté d'un carré se déduit de son aire (côté = √aire).",
      "Elle est aussi essentielle en statistiques, où l'écart-type est la racine carrée de la variance, et en finance, où la volatilité s'exprime souvent comme une racine carrée. On la retrouve enfin en physique, en informatique et dans de nombreuses formules d'ingénierie.",
    ],
  },
  {
    title: "Quelques propriétés utiles",
    paras: [
      "La racine d'un produit est le produit des racines : √(a × b) = √a × √b. De même pour un quotient : √(a ÷ b) = √a ÷ √b. Ces règles servent à simplifier, par exemple √18 = √(9 × 2) = 3√2.",
      "Attention en revanche : la racine d'une somme n'est pas la somme des racines. √(a + b) est différent de √a + √b. C'est une erreur classique à éviter.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer une racine carrée ?",
    a: "La racine carrée de n est le nombre qui, multiplié par lui-même, donne n. Exemple : √144 = 12 car 12 × 12 = 144. Pour les nombres qui ne sont pas des carrés parfaits, le résultat est décimal : √2 ≈ 1,414213.",
  },
  {
    q: "Combien fait la racine carrée de 2 ?",
    a: "√2 vaut environ 1,41421. C'est un nombre irrationnel : ses décimales sont infinies et ne se répètent jamais. On ne peut donc l'écrire exactement qu'avec le symbole √2.",
  },
  {
    q: "Comment calculer une racine carrée sans calculatrice ?",
    a: "On encadre le nombre entre deux carrés parfaits. Pour √50 : 7² = 49 et 8² = 64, donc √50 est entre 7 et 8, proche de 7. En testant 7,07² ≈ 49,98, on obtient une bonne approximation : √50 ≈ 7,07.",
  },
  {
    q: "Peut-on calculer la racine carrée d'un nombre négatif ?",
    a: "Pas dans les nombres réels : aucun nombre réel élevé au carré ne donne un résultat négatif. Il faut alors passer par les nombres complexes, où √−1 est noté i. La racine cubique, elle, accepte les nombres négatifs.",
  },
  {
    q: "Qu'est-ce qu'un carré parfait ?",
    a: "Un carré parfait est un entier dont la racine carrée est aussi un entier. Les premiers carrés parfaits sont : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256...",
  },
  {
    q: "Quelle est la différence entre racine carrée et racine cubique ?",
    a: "La racine carrée d'un nombre n est le nombre x tel que x² = n. La racine cubique est le nombre x tel que x³ = n. Exemple : la racine cubique de 27 est 3 (car 3³ = 27). La notation est ³√n. La racine cubique existe pour les nombres négatifs (³√−8 = −2), contrairement à la racine carrée.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Racine Carree" />
      <Breadcrumb currentPage="Racine Carree" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">&radic;</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Racine Carree</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Racine carree, cubique, verification et carres parfaits.</p>
      <CalculateurRacineCarree />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tableau des racines carrees</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">n</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&radic;n</th>
              <th className="text-left py-3 px-2 text-slate-500 font-medium">n</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&radic;n</th>
            </tr></thead>
            <tbody>
              {Array.from({ length: 13 }, (_, i) => i + 1).map((n) => (
                <tr key={n} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{n}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-amber-600">{Math.sqrt(n).toLocaleString("fr-FR", { maximumFractionDigits: 4 })}</td>
                  <td className="py-2.5 px-2 text-slate-700">{n * n}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-amber-600">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Les 20 premiers carres parfaits</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 20 }, (_, i) => (i + 1) * (i + 1)).map((n) => (
            <span key={n} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">{n}</span>
          ))}
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

      <RelatedCalculators currentSlug="/calcul-racine-carree" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
