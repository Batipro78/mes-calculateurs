import type { Metadata } from "next";
import CalculateurSurfacePeinture from "./CalculateurSurfacePeinture";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-surface-peinture" },
  title:
    "Calcul Surface Peinture 2026 - Estimez la quantite de peinture necessaire",
  description:
    "Calculez la surface a peindre et la quantite de peinture necessaire. Murs, plafond, ouvertures deduites. Estimez votre budget peinture gratuitement.",
  keywords:
    "calcul surface peinture, quantite peinture, surface mur a peindre, combien de peinture, calculer peinture, surface peinture piece, nombre de litres peinture, budget peinture, peinture m2",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Surface Peinture" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer la surface a peindre d'une piece ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Mesurez chaque mur (largeur x hauteur), additionnez les surfaces, deduisez les ouvertures (portes et fenetres), puis ajoutez le plafond si necessaire. Multipliez le total par le nombre de couches pour obtenir la surface totale a peindre."
                }
              },
              {
                "@type": "Question",
                name: "Combien de litres de peinture faut-il pour une piece ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Divisez la surface totale a peindre (en m2, couches incluses) par le rendement de la peinture (generalement 10 a 12 m2/L pour une peinture acrylique). Pour une chambre de 12 m2 avec 2 couches, comptez environ 4 a 8 litres de peinture."
                }
              },
              {
                "@type": "Question",
                name: "Combien de couches de peinture faut-il appliquer ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En general, 2 couches sont necessaires pour un resultat uniforme. Prevoyez 3 couches si vous passez d'une couleur foncee a une couleur claire, sur un mur neuf (platre, enduit) ou avec une peinture de qualite moyenne."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Surface Peinture" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Surface Peinture
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la surface a peindre, la quantite de peinture et le budget
        estime pour votre projet.
      </p>

      <CalculateurSurfacePeinture />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer la surface a peindre ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Avant de commencer vos travaux de peinture, il est essentiel de
          calculer precisement la surface a peindre pour acheter la bonne
          quantite de peinture et eviter le gaspillage ou les allers-retours
          en magasin. Le calcul se fait en trois etapes : mesurer les murs,
          deduire les ouvertures (portes et fenetres), puis ajuster selon le
          nombre de couches necessaires.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les formules de base
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Surface d&apos;un mur
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Largeur (m) x Hauteur (m) = Surface (m&sup2;)
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 5m x 2.5m = 12.5 m&sup2;
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Surface nette
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Surface murs - Ouvertures + Plafond
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 50 m&sup2; - 5 m&sup2; + 20 m&sup2; = 65 m&sup2;
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Quantite de peinture
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Surface totale / Rendement (m&sup2;/L)
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 130 m&sup2; / 10 m&sup2;/L = 13 litres
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Surface totale (avec couches)
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Surface nette x Nombre de couches
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ex : 65 m&sup2; x 2 couches = 130 m&sup2;
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Dimensions standard des ouvertures
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Pour faciliter vos calculs, voici les dimensions moyennes couramment
          utilisees en France :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">Ouverture</th>
                <th className="pb-2 text-slate-500 font-medium">Largeur</th>
                <th className="pb-2 text-slate-500 font-medium">Hauteur</th>
                <th className="pb-2 text-slate-500 font-medium">Surface</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2">Porte standard</td>
                <td className="py-2">0.90 m</td>
                <td className="py-2">2.10 m</td>
                <td className="py-2 font-semibold">1.89 m&sup2;</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2">Porte-fenetre</td>
                <td className="py-2">1.40 m</td>
                <td className="py-2">2.15 m</td>
                <td className="py-2 font-semibold">3.01 m&sup2;</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2">Fenetre standard</td>
                <td className="py-2">1.20 m</td>
                <td className="py-2">1.20 m</td>
                <td className="py-2 font-semibold">1.44 m&sup2;</td>
              </tr>
              <tr>
                <td className="py-2">Velux / Fenetre de toit</td>
                <td className="py-2">0.78 m</td>
                <td className="py-2">0.98 m</td>
                <td className="py-2 font-semibold">0.76 m&sup2;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Quel rendement par type de peinture ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Le rendement d&apos;une peinture correspond au nombre de metres carres
          que l&apos;on peut couvrir avec un litre de peinture. Ce rendement est
          toujours indique sur le pot de peinture, mais voici les valeurs
          moyennes :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Peinture acrylique (phase aqueuse) :</strong> 10 a 12 m&sup2;/L.
            La plus courante pour les murs interieurs. Sechage rapide, peu
            d&apos;odeur, nettoyage a l&apos;eau.
          </li>
          <li>
            <strong>Peinture glycero (phase solvant) :</strong> 10 a 14 m&sup2;/L.
            Plus resistante, recommandee pour les pieces humides (cuisine,
            salle de bain) et les boiseries.
          </li>
          <li>
            <strong>Sous-couche / Primaire :</strong> 7 a 10 m&sup2;/L. Indispensable
            sur les surfaces neuves, poreuses ou pour changer de couleur
            radicalement.
          </li>
          <li>
            <strong>Peinture plafond :</strong> 8 a 10 m&sup2;/L. Generalement plus
            epaisse pour limiter les eclaboussures et couvrir en une couche.
          </li>
          <li>
            <strong>Lasure bois :</strong> 8 a 12 m&sup2;/L. Pour proteger et
            decorer les boiseries (volets, bardage, charpente).
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Combien de couches appliquer ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          En regle generale, 2 couches sont necessaires pour un resultat
          uniforme et opaque. Cependant, certaines situations demandent 3
          couches : passage d&apos;une couleur foncee a une couleur claire,
          mur neuf (platre, enduit), ou utilisation d&apos;une peinture de
          qualite moyenne. Avec une peinture haut de gamme monocouche, une
          seule couche peut suffire, mais le resultat est rarement aussi
          satisfaisant qu&apos;avec deux couches fines.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Conseils pour economiser de la peinture
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Preparez bien le support :</strong> un mur propre, sec et
            lisse necessite moins de peinture qu&apos;un mur poreux ou abime.
          </li>
          <li>
            <strong>Utilisez une sous-couche :</strong> elle reduit
            l&apos;absorption du mur et ameliore l&apos;adherence de la peinture
            de finition.
          </li>
          <li>
            <strong>Appliquez des couches fines :</strong> deux couches fines
            couvrent mieux et consomment moins qu&apos;une couche epaisse.
          </li>
          <li>
            <strong>Choisissez le bon outil :</strong> le rouleau consomme
            environ 20% de plus que le pistolet airless, mais le pinceau en
            consomme encore davantage.
          </li>
          <li>
            <strong>Prevoyez 10 a 15% de marge :</strong> pour les pertes,
            retouches et zones difficiles d&apos;acces.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Budget moyen pour peindre une piece
        </h3>
        <p className="text-slate-600 leading-relaxed">
          En France, le prix de la peinture varie de 5 EUR/L (entree de gamme)
          a 40 EUR/L (haut de gamme). Pour une chambre standard de 12 m&sup2;
          (environ 40 m&sup2; de murs + plafond), comptez entre 4 et 8 litres
          de peinture en 2 couches, soit un budget de 20 a 320 EUR selon la
          qualite choisie. Si vous faites appel a un peintre professionnel,
          le tarif moyen se situe entre 20 et 40 EUR/m&sup2; fournitures et
          main d&apos;oeuvre incluses.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-surface-peinture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
