import type { Metadata } from "next";
import CalculRapportTailleTourDeTaille from "./CalculRapportTailleTourDeTaille";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-rapport-taille-tour-de-taille" },
  title: "Calcul WtHR - Rapport Taille / Tour de Taille | Risque Cardio",
  description:
    "Calculez votre WtHR (rapport taille/tour de taille) et mesurez votre risque cardiovasculaire. Meilleur que l'IMC pour détecter la graisse viscérale. Normes NHS, OMS, Harvard.",
  keywords:
    "WtHR, rapport taille tour de taille, waist to height ratio, graisse viscérale, risque cardiovasculaire, règle d'or OMS 0.5, alternative IMC, santé",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que le WtHR (Waist-to-Height Ratio) ?",
    a: "Le WtHR (rapport taille/tour de taille) est un indicateur de santé qui divise le tour de taille (en cm) par la taille (en cm). Il mesure la graisse viscérale (la plus dangereuse pour le coeur), contrairement à l'IMC qui ne distingue pas la masse grasse de la masse musculaire.",
  },
  {
    q: "Quelle est la différence entre WtHR et IMC ?",
    a: "L'IMC se base sur le poids total (sans distinguer muscle et graisse), tandis que le WtHR mesure spécifiquement la distribution des graisses, en particulier la graisse viscérale qui entoure les organes. Le WtHR est plus précis pour évaluer le risque cardiovasculaire chez tous les morphotypes.",
  },
  {
    q: "Comment bien mesurer son tour de taille ?",
    a: "Mesurez à mi-distance entre le bas de vos côtes et le haut de vos hanches, sans rentrer le ventre, en fin d'expiration normale. Utilisez un mètre souple et assurez-vous qu'il est bien horizontal. Cette mesure est plus fiable que le poids pour évaluer la santé.",
  },
  {
    q: "Pourquoi la règle d'or OMS est-elle 0.5 ?",
    a: "L'Organisation Mondiale de la Santé recommande un WtHR ≤ 0.5 (tour de taille ≤ moitié de la taille). Cette règle simple est universelle pour tous les âges et morphotypes. Un ratio > 0.5 signale un risque augmenté de maladie cardiovasculaire et de diabète type 2.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul WtHR" />
      <Breadcrumb currentPage="Calcul WtHR" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ❤️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul WtHR - Rapport Taille / Tour de Taille
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Mesurez votre risque cardiovasculaire en calculant votre rapport taille/tour
        de taille selon les normes NHS, OMS et Harvard.
      </p>

      <CalculRapportTailleTourDeTaille />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Section: Qu'est-ce que le WtHR */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le WtHR (Waist-to-Height Ratio) ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>WtHR</strong> (Waist-to-Height Ratio) est un indicateur de
          santé qui mesure le <strong>rapport entre votre tour de taille et votre
          taille</strong>. Contrairement à l&apos;IMC, il évalue spécifiquement la
          distribution des graisses, en particulier la{" "}
          <strong>graisse viscérale</strong> (celle qui entoure les organes vitaux).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule</h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          WtHR = Tour de taille (cm) / Taille (cm)
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Classification NHS UK 2022 — Hommes
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Sous-poids</p>
            <p className="text-xs text-blue-500 mt-0.5">WtHR &lt; 0.43</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="font-semibold text-emerald-700 text-sm">Sain</p>
            <p className="text-xs text-emerald-500 mt-0.5">0.43 - 0.52</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Surpoids</p>
            <p className="text-xs text-amber-500 mt-0.5">0.53 - 0.57</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">Obésité</p>
            <p className="text-xs text-orange-500 mt-0.5">0.58 - 0.62</p>
          </div>
          <div className="bg-red-100 rounded-xl p-3 border border-red-200">
            <p className="font-semibold text-red-800 text-sm">Obésité morbide</p>
            <p className="text-xs text-red-600 mt-0.5">WtHR &gt; 0.63</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Classification NHS UK 2022 — Femmes
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Sous-poids</p>
            <p className="text-xs text-blue-500 mt-0.5">WtHR &lt; 0.42</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="font-semibold text-emerald-700 text-sm">Sain</p>
            <p className="text-xs text-emerald-500 mt-0.5">0.42 - 0.48</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Surpoids</p>
            <p className="text-xs text-amber-500 mt-0.5">0.49 - 0.53</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">Obésité</p>
            <p className="text-xs text-orange-500 mt-0.5">0.54 - 0.57</p>
          </div>
          <div className="bg-red-100 rounded-xl p-3 border border-red-200">
            <p className="font-semibold text-red-800 text-sm">Obésité morbide</p>
            <p className="text-xs text-red-600 mt-0.5">WtHR &gt; 0.58</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Classification — Enfants (5-18 ans)
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Pour les enfants, un seul seuil universel s&apos;applique :
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Sous-poids</p>
            <p className="text-xs text-blue-500 mt-0.5">WtHR &lt; 0.45</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="font-semibold text-emerald-700 text-sm">Sain</p>
            <p className="text-xs text-emerald-500 mt-0.5">WtHR ≤ 0.5</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">Surpoids/Obésité</p>
            <p className="text-xs text-orange-500 mt-0.5">WtHR &gt; 0.5</p>
          </div>
        </div>
      </section>

      {/* Section: Pourquoi WtHR > IMC */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi le WtHR est meilleur que l&apos;IMC
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-bold text-blue-700 mb-2">❌ IMC : limites</p>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Ne distingue pas muscle et graisse</li>
              <li>• Sportifs musclés surestimés</li>
              <li>• Ignore la distribution des graisses</li>
              <li>• Moins fiable pour risque cardio</li>
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="font-bold text-emerald-700 mb-2">✓ WtHR : avantages</p>
            <ul className="text-sm text-emerald-600 space-y-1">
              <li>• Mesure la graisse viscérale directement</li>
              <li>• Adapté aux sportifs et musclés</li>
              <li>• Prédit risque cardio mieux que l&apos;IMC</li>
              <li>• Valable pour tous les morphotypes</li>
            </ul>
          </div>
        </div>
        <p className="text-slate-600 mt-4 leading-relaxed">
          La <strong>graisse viscérale</strong> (celle qui entoure le foie, les reins,
          le pancréas) augmente le risque d&apos;inflammation chronique, de
          diabète type 2 et de maladie cardiovasculaire. Le WtHR en est un meilleur
          indicateur que l&apos;IMC.
        </p>
      </section>

      {/* Section: Comment mesurer */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment bien mesurer son tour de taille
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-slate-600 mb-6">
          <li>
            <strong>Trouvez le bon endroit</strong> : à mi-distance entre le bas de
            vos côtes et le haut de vos hanches (généralement au niveau du nombril,
            mais pas toujours).
          </li>
          <li>
            <strong>Utilisez un mètre souple</strong>, pas une règle. Déroulez-le
            autour de votre taille, horizontalement.
          </li>
          <li>
            <strong>Ne rentrez pas le ventre</strong> — mesurez en position normale,
            en fin d&apos;expiration (respiration relâchée).
          </li>
          <li>
            <strong>Assurez-vous que le mètre est bien serré</strong> (ni trop lâche,
            ni trop serré) : il doit glisser sans forcer.
          </li>
          <li>
            <strong>Lisez au millimètre près</strong> et arrondissez au cm entier si
            nécessaire.
          </li>
        </ol>
        <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3 border border-amber-200">
          <strong>Conseil :</strong> Mesurez le soir plutôt que le matin (le tour de
          taille varie légèrement en fonction de la digestion et de l&apos;hydratation).
          Répétez 2-3 fois et prenez la moyenne.
        </p>
      </section>

      {/* Section: Règle d'or OMS */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          La règle d&apos;or OMS : WtHR ≤ 0.5
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;Organisation Mondiale de la Santé recommande une règle très simple
          et universelle :
        </p>
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200 mb-6">
          <p className="text-center text-2xl font-bold text-emerald-700">
            Tour de taille ≤ Moitié de la taille
          </p>
          <p className="text-center text-lg font-semibold text-emerald-600 mt-2">
            WtHR ≤ 0.5
          </p>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          Par exemple : une personne de 170 cm devrait avoir un tour de taille ≤ 85 cm.
          Une personne de 160 cm devrait avoir un tour de taille ≤ 80 cm.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Cette règle s&apos;applique à <strong>tous les adultes</strong> (sexes confondus) et
          à la plupart des enfants. Elle a été validée par de nombreuses études
          épidémiologiques comme un bon indicateur de risque cardiovasculaire.
        </p>
      </section>

      {/* Section: Sources et références */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Sources et références</h2>
        <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
          <li>
            <strong>NHS UK (2022)</strong> : Waist-to-height ratio guidelines for
            cardiovascular risk assessment
          </li>
          <li>
            <strong>Organisation Mondiale de la Santé (OMS)</strong> : Waist
            circumference and waist-hip ratio report of a WHO expert consultation
          </li>
          <li>
            <strong>Harvard Health Publishing</strong> : Why waist-to-height ratio is
            better than BMI for health assessment
          </li>
          <li>
            <strong>European Heart Journal</strong> : Waist-to-height ratio as a
            predictor of mortality and cardiovascular disease
          </li>
        </ul>
        <p className="text-xs text-slate-400 mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
          Ce calcul est fourni à titre informatif et ne constitue pas un diagnostic
          médical. Consultez votre médecin ou un professionnel de santé pour une
          évaluation personnalisée de votre risque cardiovasculaire.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-rapport-taille-tour-de-taille" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
