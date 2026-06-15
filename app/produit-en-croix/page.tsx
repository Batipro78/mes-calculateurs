import type { Metadata } from "next";
import CalculateurProduitEnCroix from "./CalculateurProduitEnCroix";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/produit-en-croix" },
  title: "Produit en Croix - Calculateur de Proportionnalite",
  description:
    "Calculez un produit en croix (regle de trois) en ligne. Trouvez la 4e valeur proportionnelle. Formule, exemples et calcul detaille. Gratuit.",
  keywords:
    "produit en croix, regle de trois, calcul proportionnalite, 4e proportionnelle, tableau de proportionnalite, produit en croix en ligne, calculer produit en croix",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Attention : proportionnalité directe ou inverse ?",
    paras: [
      "Le produit en croix ne fonctionne que pour des grandeurs directement proportionnelles : quand l'une augmente, l'autre augmente dans le même rapport (plus de kilos, plus de prix). C'est le cas le plus fréquent.",
      "Mais certaines situations sont inversement proportionnelles : plus il y a d'ouvriers, moins le travail prend de temps. Là, le produit en croix classique donne un résultat faux. Exemple : si 2 ouvriers montent un mur en 6 h, 3 ouvriers ne mettront pas 9 h mais moins. On écrit 2 × 6 = 3 × t, donc t = 12 ÷ 3 = 4 h.",
      "Avant d'appliquer un produit en croix, posez-vous donc toujours la question : si je double une quantité, l'autre double-t-elle aussi (direct) ou est-elle divisée par deux (inverse) ?",
    ],
  },
  {
    title: "Le produit en croix pour calculer un pourcentage",
    paras: [
      "Un pourcentage est une proportion sur 100, donc le produit en croix s'y prête parfaitement. Pour trouver 15 % de 80 : on pose x / 80 = 15 / 100, d'où x = (80 × 15) ÷ 100 = 12.",
      "Dans l'autre sens, pour savoir quel pourcentage représente 12 sur 80 : on pose 12 / 80 = x / 100, d'où x = (12 × 100) ÷ 80 = 15 %.",
    ],
  },
  {
    title: "Méthode alternative : passer par l'unité",
    paras: [
      "On peut aussi raisonner sans croiser, en passant par une seule unité. Si 3 kg coûtent 12 €, alors 1 kg coûte 12 ÷ 3 = 4 €, et 5 kg coûtent donc 4 × 5 = 20 €.",
      "Cette méthode « par l'unité » donne le même résultat que le produit en croix. Elle est souvent plus intuitive pour vérifier un calcul ou l'expliquer à un enfant.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment faire un produit en croix ?",
    a: "Le produit en croix permet de trouver une valeur inconnue dans une proportion. Si A/B = C/D et que D est inconnu, alors D = (B × C) ÷ A. On « croise » les valeurs en diagonale : on multiplie les deux valeurs connues en diagonale et on divise par la troisième valeur connue.",
  },
  {
    q: "Quelle est la différence entre produit en croix et règle de trois ?",
    a: "C'est la même chose. Le « produit en croix » est le nom mathématique de l'opération, la « règle de trois » est le nom courant. Les deux permettent de trouver une 4e valeur proportionnelle à partir de 3 valeurs connues.",
  },
  {
    q: "Le produit en croix marche-t-il pour les proportions inverses ?",
    a: "Non, pas directement. Le produit en croix suppose une proportionnalité directe. Pour une situation inversement proportionnelle (plus d'ouvriers = moins de temps), il faut poser l'égalité des produits : a × b = c × d. Exemple : 2 ouvriers en 6 h donnent 3 ouvriers en 4 h (2 × 6 = 3 × 4).",
  },
  {
    q: "Comment calculer un pourcentage avec un produit en croix ?",
    a: "Un pourcentage est une proportion sur 100. Pour 15 % de 80 : x / 80 = 15 / 100, donc x = (80 × 15) ÷ 100 = 12. Pour savoir quel pourcentage fait 12 sur 80 : 12 / 80 = x / 100, donc x = 15 %.",
  },
  {
    q: "Quand utiliser le produit en croix ?",
    a: "Le produit en croix s'utilise dans tous les cas de proportionnalité directe : conversions d'unités, calculs de prix, recettes de cuisine, pourcentages, taux de change, dilutions chimiques, échelles de cartes, etc.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Produit en Croix" />
      <Breadcrumb currentPage="Produit en Croix" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Produit en Croix (Regle de Trois)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Trouvez la 4e valeur proportionnelle. Entrez 3 valeurs connues, le resultat est instantane.
      </p>

      <CalculateurProduitEnCroix />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne le produit en croix ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>produit en croix</strong> (ou <strong>regle de trois</strong>) permet de trouver une valeur inconnue
          dans un rapport de proportionnalite. Si deux rapports sont egaux (A/B = C/D), on peut trouver n&apos;importe
          laquelle des 4 valeurs a partir des 3 autres.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Formule</h3>
        <div className="bg-sky-50/50 rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-sky-700">
            Si A / B = C / D alors D = (B &times; C) / A
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples pratiques</h3>
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-2">Prix au kilo</p>
            <p className="text-sm text-slate-600">
              Si 3 kg coutent 12 &euro;, combien coutent 5 kg ?<br />
              D = (12 &times; 5) / 3 = <strong>20 &euro;</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-2">Recette de cuisine</p>
            <p className="text-sm text-slate-600">
              Si une recette pour 4 personnes demande 300 g de farine, combien pour 6 personnes ?<br />
              D = (300 &times; 6) / 4 = <strong>450 g</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-2">Conversion devises</p>
            <p className="text-sm text-slate-600">
              Si 1 &euro; = 1,08 $, combien valent 50 &euro; ?<br />
              D = (1,08 &times; 50) / 1 = <strong>54 $</strong>
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Astuce</h3>
        <p className="text-slate-600 leading-relaxed">
          Pour verifier votre resultat, divisez les deux rapports : A&divide;B et C&divide;D doivent donner le meme nombre.
          Si ce n&apos;est pas le cas, il y a une erreur dans les valeurs.
        </p>
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
      <RelatedCalculators currentSlug="/produit-en-croix" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
