import type { Metadata } from "next";
import CalculateurProteines from "./CalculateurProteines";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Proteines par Jour 2026 - Besoin Protidique Gratuit",
  description:
    "Calculez votre besoin en proteines journalier gratuitement. Adapte a votre poids, niveau d'activite et objectif (maintien, perte de poids, prise de masse). Formule g/kg.",
  keywords:
    "calcul proteines, besoin en proteines, apport protidique journalier, proteines par jour, proteines musculation, proteines perte de poids, g par kg, calcul proteine journalier",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Apport Proteines Journalier" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de proteines par jour faut-il manger ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les besoins en proteines dependent du poids et de l'activite physique. Pour une personne sedentaire, 0,8g par kg de poids corporel suffit. Une personne active a besoin de 1,0 a 1,4g/kg, un sportif de 1,4 a 1,8g/kg et un pratiquant de musculation de 1,8 a 2,2g/kg.",
                },
              },
              {
                "@type": "Question",
                name: "Les proteines font-elles grossir ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non, les proteines ne font pas grossir si elles ne creent pas de surplus calorique. Chaque gramme de proteine apporte 4 kcal, soit autant que les glucides. Elles sont meme benefiques pour la perte de poids car elles augmentent la satiete, preservent la masse musculaire et ont un fort effet thermique (le corps brule plus de calories pour les digerer).",
                },
              },
              {
                "@type": "Question",
                name: "Quels aliments sont les meilleures sources de proteines ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les meilleures sources de proteines sont : le blanc de poulet (31g/100g), le thon (26g/100g), les amandes (21g/100g), le saumon (20g/100g), les oeufs (13g/100g), les lentilles (9g/100g), le tofu (8g/100g) et le fromage blanc 0% (8g/100g). La viande, le poisson, les oeufs et les produits laitiers sont des proteines completes (tous les acides amines essentiels).",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Proteines" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💪
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Apport Proteines 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre besoin en proteines journalier selon votre poids, votre
        activite physique et votre objectif.
      </p>

      <CalculateurProteines />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi les proteines sont-elles essentielles ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>proteines</strong> sont les briques fondamentales du corps humain. Elles
          constituent les muscles, les enzymes, les hormones et les anticorps. Un apport
          suffisant en proteines est indispensable pour{" "}
          <strong>reparer et construire les tissus musculaires</strong>, maintenir le systeme
          immunitaire et assurer de nombreuses fonctions metaboliques.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Contrairement aux glucides et aux lipides, le corps ne stocke pas les proteines :
          elles doivent etre apportees <strong>quotidiennement</strong> par l&apos;alimentation.
          Un deficit proteique entraine une fonte musculaire (catabolisme), une fatigue chronique
          et un systeme immunitaire affaibli.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Besoins en proteines selon l&apos;activite physique
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Profil</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Exemples</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Besoins</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Sedentaire</td>
                <td className="py-2.5 px-2 text-slate-500">Travail de bureau, peu d&apos;exercice</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">0,8 – 1,0 g/kg</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Actif</td>
                <td className="py-2.5 px-2 text-slate-500">Sport 2-4x/semaine</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,0 – 1,4 g/kg</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Sportif</td>
                <td className="py-2.5 px-2 text-slate-500">Entrainement regulier et intense</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,4 – 1,8 g/kg</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Musculation</td>
                <td className="py-2.5 px-2 text-slate-500">Prise de masse, halteres</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,8 – 2,2 g/kg</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Endurance</td>
                <td className="py-2.5 px-2 text-slate-500">Marathon, triathlon, cyclisme</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">1,2 – 1,6 g/kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Meilleures sources alimentaires de proteines
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">Viandes maigres</p>
            <p className="text-xs text-orange-600 mt-1">Poulet : 31g/100g</p>
            <p className="text-xs text-orange-600">Dinde : 28g/100g</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Poissons</p>
            <p className="text-xs text-blue-600 mt-1">Thon : 26g/100g</p>
            <p className="text-xs text-blue-600">Saumon : 20g/100g</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Legumineuses</p>
            <p className="text-xs text-green-600 mt-1">Lentilles : 9g/100g</p>
            <p className="text-xs text-green-600">Pois chiches : 9g/100g</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <p className="font-semibold text-yellow-700 text-sm">Produits laitiers</p>
            <p className="text-xs text-yellow-600 mt-1">Fromage blanc : 8g/100g</p>
            <p className="text-xs text-yellow-600">Oeufs : 13g/100g</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Conseils pratiques pour atteindre son quota
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Repartissez les proteines sur 3 repas</strong> — le corps assimile mieux
            les proteines en plusieurs prises (30-40g max par repas selon les etudes).
          </li>
          <li>
            <strong>Privilegiez les proteines completes</strong> (viande, poisson, oeufs, produits laitiers)
            qui contiennent tous les acides amines essentiels.
          </li>
          <li>
            <strong>Combinez les proteines vegetales</strong> (legumineuses + cereales) pour obtenir
            un profil en acides amines complet si vous etes vegetarien.
          </li>
          <li>
            <strong>Apres l&apos;entrainement</strong>, consommez 20-40g de proteines dans les 2 heures
            pour optimiser la synthese musculaire.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Proteines et perte de poids
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Augmenter les proteines lors d&apos;un regime est recommande car elles{" "}
          <strong>preservent la masse musculaire</strong> tout en reduisant les calories totales.
          Elles ont aussi un fort{" "}
          <a href="/calcul-calories" className="text-purple-600 hover:underline font-medium">
            effet thermique
          </a>{" "}
          : le corps brule 20 a 30% des calories proteiques pour les digerer, contre seulement
          5-10% pour les glucides. Combinez notre calculateur de proteines avec le{" "}
          <a href="/calcul-calories" className="text-purple-600 hover:underline font-medium">
            calcul de calories
          </a>{" "}
          pour une approche nutritionnelle complete.
        </p>

        <p className="text-xs text-slate-400 mt-6">Mis a jour le 8 avril 2026</p>
      </section>

      <RelatedCalculators currentSlug="/calcul-proteines" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
