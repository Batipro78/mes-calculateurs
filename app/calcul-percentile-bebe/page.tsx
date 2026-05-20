import type { Metadata } from "next";
import CalculPercentileBebe from "./CalculPercentileBebe";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-percentile-bebe" },
  title: "Calcul Percentile Bébé - Poids et Taille selon courbes OMS 2006",
  description:
    "Estimez le percentile de poids et taille de votre bébé (0 à 24 mois) selon les courbes OMS 2006. Méthode LMS officielle. P3, P10, P50, P85, P97 + IMC bébé + interprétation.",
  keywords:
    "percentile bebe, courbe poids bebe, courbe taille bebe, OMS bebe, percentile poids, percentile taille, IMC bebe, courbe croissance bebe, P50 bebe",
  openGraph: {
    title: "Calcul Percentile Bébé - Courbes OMS 2006",
    description:
      "Calculez le percentile de poids et taille de votre bébé selon les normes OMS.",
  },
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Percentile Bébé"
        category="HealthApplication"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment est calculé le percentile d'un bébé ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le percentile est calculé selon la méthode LMS (Lambda Mu Sigma) recommandée par l'OMS. À partir de l'âge et du sexe du bébé, on calcule un Z-score (écart à la médiane), puis on le convertit en percentile via la loi normale. Le P50 correspond à la médiane, P3 et P97 aux limites basse et haute de la normalité.",
                },
              },
              {
                "@type": "Question",
                name: "Que signifie le percentile P50 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le P50 (50e percentile) correspond à la médiane : 50% des bébés du même âge et sexe ont une valeur inférieure, 50% une valeur supérieure. C'est le repère central des courbes OMS. Être au P50 ne signifie pas être 'meilleur' ou 'normal' — la normale s'étend du P3 au P97.",
                },
              },
              {
                "@type": "Question",
                name: "Mon bébé est en P10, faut-il s'inquiéter ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non, le P10 reste dans la normale selon les courbes OMS (la normale = P3 à P97). Ce qui importe le plus est la régularité de la courbe individuelle : un bébé qui suit son percentile dans le temps est en bonne santé, même s'il est à P10 ou P90. Une cassure brutale de courbe doit en revanche être évaluée par un pédiatre.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les sources de ces courbes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ces percentiles utilisent les courbes OMS 2006 (Multicentre Growth Reference Study), construites sur plus de 8500 enfants en bonne santé, allaités, dans 6 pays. Elles sont la référence internationale pour le suivi des nourrissons de 0 à 5 ans et sont utilisées dans le carnet de santé français depuis 2018.",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi l'IMC bébé est différent de l'IMC adulte ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'IMC bébé (poids/taille²) se lit toujours sur une courbe OMS adaptée à l'âge et au sexe, jamais comme une valeur fixe. Les seuils adultes (18.5, 25, 30) ne s'appliquent pas. Pour un bébé, c'est le percentile d'IMC qui compte (P3 à P97).",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Percentile Bébé" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👶
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Percentile Bébé (OMS 2006)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le percentile de poids et taille de votre bébé (0-24 mois)
        selon les courbes OMS officielles. Méthode LMS, P3 à P97.
      </p>

      <CalculPercentileBebe />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre les percentiles
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les percentiles permettent de situer la mesure de votre bébé
          (poids, taille) par rapport à une population de référence du même
          âge et sexe. Les courbes utilisées sont celles de l&apos;
          <strong>Organisation Mondiale de la Santé (OMS)</strong>, mises
          à jour en 2006 et intégrées au carnet de santé français.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 mt-6">
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="font-semibold text-red-900">P3 (très bas)</p>
            <p className="text-sm text-red-800">
              3% des bébés sont en dessous. Suivi médical recommandé.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <p className="font-semibold text-orange-900">P10 (bas)</p>
            <p className="text-sm text-orange-800">
              Normale basse. Suivi habituel suffisant.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="font-semibold text-green-900">P50 (médiane)</p>
            <p className="text-sm text-green-800">
              50% des bébés au-dessus, 50% en dessous. Repère central.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <p className="font-semibold text-yellow-900">P85 / P90 (haut)</p>
            <p className="text-sm text-yellow-800">
              Normale haute. Suivi habituel suffisant.
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="font-semibold text-red-900">P97 (très haut)</p>
            <p className="text-sm text-red-800">
              3% des bébés au-dessus. Suivi médical recommandé.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="font-semibold text-blue-900">P3 à P97 = normale</p>
            <p className="text-sm text-blue-800">
              95% des bébés en bonne santé sont dans cette plage.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-pink-50 border border-pink-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-pink-900 mb-4">
          Ce qui compte vraiment : la courbe individuelle
        </h2>
        <p className="text-pink-800 mb-4 leading-relaxed">
          Une mesure isolée ne suffit pas à juger la croissance d&apos;un
          bébé. Ce qui compte, c&apos;est la <strong>régularité</strong> de
          sa courbe individuelle sur plusieurs mois.
        </p>
        <ul className="text-pink-800 space-y-2 mb-4 ml-4 list-disc">
          <li>
            Un bébé à P10 qui suit sa courbe est en bonne santé.
          </li>
          <li>
            Un bébé à P90 qui suit sa courbe est en bonne santé.
          </li>
          <li>
            Une cassure brutale (passage de P50 à P10 par exemple) doit
            être évaluée par un pédiatre.
          </li>
        </ul>
        <p className="text-pink-800 leading-relaxed">
          Le pédiatre prend en compte le poids, la taille, le périmètre
          crânien, l&apos;âge gestationnel, l&apos;alimentation et
          l&apos;histoire familiale pour interpréter la croissance globale.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Méthode LMS de l&apos;OMS
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La méthode LMS (Lambda Mu Sigma) transforme une mesure en Z-score
          puis en percentile. Elle est utilisée par l&apos;OMS, les CDC
          américains et la France pour les courbes de croissance.
        </p>
        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm mb-4">
          <p>Z = ((mesure / M)^L - 1) / (L × S)</p>
          <p className="mt-2 text-xs text-slate-500">
            où L = Lambda (asymétrie), M = Mu (médiane), S = Sigma (coefficient
            de variation). Les paramètres L, M et S varient selon l&apos;âge
            et le sexe.
          </p>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          Le Z-score est ensuite converti en percentile via la loi normale
          centrée réduite. Un Z = 0 correspond au P50 (médiane), Z = -2
          environ au P2.3, Z = 2 environ au P97.7.
        </p>
      </section>

      <div className="mt-8 bg-amber-50 border-2 border-amber-300 rounded-lg p-4 text-sm text-amber-900">
        <p className="font-bold mb-2">⚕️ Avertissement médical</p>
        <p>
          Ce calculateur est un outil informatif basé sur les courbes
          OMS 2006. Il ne remplace en aucun cas l&apos;avis d&apos;un
          pédiatre ou d&apos;un professionnel de santé. La croissance
          d&apos;un bébé doit être interprétée dans son ensemble (carnet
          de santé, périmètre crânien, antécédents familiaux,
          alimentation). En cas de doute, consultez votre pédiatre.
        </p>
        <p className="mt-2 text-xs">
          <strong>Sources :</strong> WHO Multicentre Growth Reference
          Study 2006 (Organisation Mondiale de la Santé).
        </p>
      </div>

      <RelatedCalculators currentSlug="/calcul-percentile-bebe" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
