import type { Metadata } from "next";
import CalculKaffaraRamadan from "./CalculKaffaraRamadan";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-kaffara-ramadan" },
  title: "Calcul Kaffara Ramadan 2026 - Compensation jeûne rompu",
  description:
    "Calculez votre Kaffara ou Fidya pour Ramadan. Kaffara pour rupture volontaire (60 repas/jour). Fidya pour incapacité permanente (1 repas/jour). Prix 7–10 € selon sources caritatives France.",
  keywords:
    "kaffara ramadan, fidya, compensation jeûne rompu, rupture volontaire, personnes âgées, malades chroniques, 4 écoles sunnites",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que la Kaffara ?",
    a: "La Kaffara est une compensation obligatoire pour la rupture volontaire du jeûne Ramadan (par relation conjugale ou consommation intentionnelle). Elle consiste à nourrir 60 pauvres par jour rompu, ou à jeûner 60 jours consécutifs, ou à affranchir un esclave (caduc). Aujourd'hui, l'option pratiquée est de nourrir 60 pauvres (~540 € à 9 €/repas par jour).",
  },
  {
    q: "Quelle est la différence entre Kaffara et Fidya ?",
    a: "Kaffara = compensation pour rupture VOLONTAIRE du jeûne (60 repas/jour). Fidya = aide pour personnes âgées ou malades CHRONIQUES incapables de jeûner ET de rattraper les jours (1 repas/jour manqué). La Fidya est moins stricte que la Kaffara.",
  },
  {
    q: "Combien coûte la Kaffara en France 2026 ?",
    a: "Pour 1 jour rompu : 60 repas × 9 € (moyenne) = 540 €. Secours Islamique France, Islamic Relief France retiennent 7–10 €/repas. Pour 3 jours : 180 repas = ~1 620 €. Les montants varient selon les sources caritatives locales.",
  },
  {
    q: "À qui verser Kaffara et Fidya ?",
    a: "Aux pauvres et nécessiteux directement, ou via une mosquée, une association caritative musulmane (Secours Islamique, Human Appeal, etc.) ou des organismes humanitaires locaux. L'important est que l'argent serve à nourrir les plus pauvres.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Kaffara et Fidya - Compensation Ramadan" />
      <Breadcrumb currentPage="Calcul Kaffara et Fidya - Compensation Ramadan" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🕌
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
          Calcul Kaffara et Fidya — Compensation Ramadan
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre compensation pour rupture volontaire (Kaffara) ou incapacité (Fidya).
      </p>

      <CalculKaffaraRamadan />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Doctrine Kaffara — 3 options du consensus sunnite
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Option 1 */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-emerald-700 mb-3">Option 1 : Nourrir</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Nourrir <strong>60 pauvres</strong> pour chaque jour rompu volontairement.
            </p>
            <p className="text-xs text-slate-500">
              Approche pratique courante en France (7–10 €/repas).
            </p>
          </div>

          {/* Option 2 */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-emerald-700 mb-3">Option 2 : Jeûner</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Jeûner <strong>60 jours consécutifs</strong> pour chaque jour rompu.
            </p>
            <p className="text-xs text-slate-500">
              Applicable si vous avez les moyens physiques et spirituels.
            </p>
          </div>

          {/* Option 3 */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-emerald-700 mb-3">Option 3 : Affranchir</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Affranchir un <strong>esclave</strong> (si possible).
            </p>
            <p className="text-xs text-slate-500">
              Option historique, non applicable aujourd&apos;hui.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <p className="text-sm text-emerald-800">
            <strong>Consensus :</strong> Les 4 écoles juridiques sunnites (Hanafi, Maliki, Shafi&apos;i, Hanbali) reconnaissent
            ces trois options comme valides. La majorité des musulmans en France choisissent l&apos;option 1 (nourrir).
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Doctrine Fidya — Pour qui ?
        </h2>

        <p className="text-slate-600 mb-6 leading-relaxed">
          La <strong>Fidya</strong> s&apos;applique aux personnes qui <strong>ne peuvent pas jeûner ET ne peuvent pas rattraper</strong> les jours. Exemples :
        </p>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Bénéficiaires de Fidya :</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">→</span>
              <span>Personnes très âgées (80+ ans) sans espoir d&apos;amélioration</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">→</span>
              <span>Malades chroniques incurables (cancer terminal, insuffisance rénale, etc.)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">→</span>
              <span>Femmes enceintes ou allaitantes en danger permanent</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 bg-blue-50 rounded-xl border border-blue-200 p-4">
          <p className="text-sm text-blue-800">
            <strong>Important :</strong> Si vous pouvez rattraper les jours (Qada) plus tard, vous n&apos;êtes pas obligé de payer Fidya — rattraper suffit.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Montants orientatifs France 2026
        </h2>

        <p className="text-slate-600 mb-6 leading-relaxed">
          Selon <strong>Secours Islamique France, Islamic Relief France, Human Appeal</strong> :
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-emerald-50 rounded-xl p-4">
            <h3 className="font-semibold text-emerald-800 mb-2">Budget bas</h3>
            <p className="text-lg font-bold text-emerald-700 mb-1">7 € / repas</p>
            <p className="text-xs text-emerald-700">
              Kaffara 1 jour = 420 €
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4">
            <h3 className="font-semibold text-emerald-800 mb-2">Budget standard</h3>
            <p className="text-lg font-bold text-emerald-700 mb-1">9 € / repas</p>
            <p className="text-xs text-emerald-700">
              Kaffara 1 jour = 540 €
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Quand verser ?
        </h2>

        <p className="text-slate-600 mb-6 leading-relaxed">
          La Kaffara et la Fidya <strong>doivent être versées avant la fin du Ramadan</strong> (avant l&apos;Aïd al-Fitr de préférence, ou immédiatement après).
        </p>

        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
          <h3 className="font-semibold text-emerald-800 mb-3">Chronologie idéale :</h3>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li className="flex gap-2">
              <span>1.</span>
              <span>Dès la rupture volontaire reconnue, préparez le versement (Kaffara).</span>
            </li>
            <li className="flex gap-2">
              <span>2.</span>
              <span>Quelques jours avant l&apos;Aïd al-Fitr : versez à une mosquée ou association.</span>
            </li>
            <li className="flex gap-2">
              <span>3.</span>
              <span>Avant l&apos;Aïd : l&apos;argent doit être parti pour les pauvres.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          À qui verser ?
        </h2>

        <p className="text-slate-600 mb-6 leading-relaxed">
          Vous pouvez verser Kaffara et Fidya via :
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Via une mosquée</h3>
            <p className="text-sm text-slate-600">
              La plupart des mosquées FR collectent et distribuent aux familles en difficulté locale.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Via une association caritative</h3>
            <p className="text-sm text-slate-600">
              Secours Islamique France, Islamic Relief France, Human Appeal, etc.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Directement aux pauvres</h3>
            <p className="text-sm text-slate-600">
              Familles nécessiteuses de votre quartier ou entourage.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Repas collectifs</h3>
            <p className="text-sm text-slate-600">
              Organiser un repas commun pour les pauvres (particulièrement pendant Ramadan).
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-emerald-50 rounded-2xl border border-emerald-200 p-8">
        <p className="text-sm text-emerald-800 leading-relaxed">
          <strong>⚠️ Disclaimer :</strong> Les montants et doctrines présentés sont basés sur le consensus des 4 écoles sunnites
          (Hanafi, Maliki, Shafi&apos;i, Hanbali) et les sources caritatives françaises officielles (Secours Islamique, Islamic Relief France, Human Appeal).
          <strong> Pour un cas personnel, consultez un imam de confiance ou votre mosquée locale.</strong>
          Cette application est une aide au calcul, pas une fatwa.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-kaffara-ramadan" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
