import type { Metadata } from "next";
import CalculateurProduitEnCroix from "./CalculateurProduitEnCroix";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/produit-en-croix" },
  title: "Produit en Croix - Calculateur de Proportionnalite",
  description:
    "Calculez un produit en croix (regle de trois) en ligne. Trouvez la 4e valeur proportionnelle. Formule, exemples et calcul detaille. Gratuit.",
  keywords:
    "produit en croix, regle de trois, calcul proportionnalite, 4e proportionnelle, tableau de proportionnalite, produit en croix en ligne, calculer produit en croix",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Produit en Croix" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment faire un produit en croix ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le produit en croix permet de trouver une valeur inconnue dans une proportion. Si A/B = C/D et que D est inconnu, alors D = (B x C) / A. On \"croise\" les valeurs en diagonale : on multiplie les deux valeurs connues en diagonale et on divise par la troisieme valeur connue.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre produit en croix et regle de trois ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "C'est la meme chose. Le \"produit en croix\" est le nom mathematique de l'operation, la \"regle de trois\" est le nom courant. Les deux permettent de trouver une 4e valeur proportionnelle a partir de 3 valeurs connues.",
                },
              },
              {
                "@type": "Question",
                name: "Quand utiliser le produit en croix ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le produit en croix s'utilise dans tous les cas de proportionnalite : conversions d'unites, calculs de prix, recettes de cuisine, pourcentages, taux de change, dilutions chimiques, echelles de cartes, etc.",
                },
              },
            ],
          }),
        }}
      />
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

      <RelatedCalculators currentSlug="/produit-en-croix" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
