import type { Metadata } from "next";
import CalculFetesCatholiques from "./CalculFetesCatholiques";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-fetes-catholiques" },
  title: "Calendrier Fêtes Catholiques 2026 - Pâques, Toussaint, Ascension",
  description:
    "Calendrier complet des fêtes catholiques : Pâques, Pentecôte, Ascension, Noël, Toussaint. Découvrez les dates mobiles et fixes de la liturgie romaine 2026.",
  keywords:
    "fetes catholiques 2026, calendrier fetes religieuses, paques pentecote ascension, fetes fixes catholiques, toussaint assomption, calendrier liturgique",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Comment calcule-t-on la date de Pâques ?",
    paras: [
      "Tout le calendrier mobile dépend de Pâques, et Pâques obéit à une règle fixée au concile de Nicée en 325 : c'est le premier dimanche qui suit la première pleine lune du printemps (la pleine lune tombant le ou après l'équinoxe du 21 mars).",
      "Concrètement, la date peut donc osciller entre le 22 mars au plus tôt et le 25 avril au plus tard. Le calcul précis, appelé comput ecclésiastique, combine le cycle lunaire (le « nombre d'or ») et le cycle solaire pour déterminer cette pleine lune dite pascale.",
      "Une fois Pâques connue, tout s'enchaîne : le Mercredi des Cendres tombe 46 jours avant, l'Ascension 39 jours après, la Pentecôte 49 jours après. C'est pour cela qu'on parle de fêtes mobiles : elles se déduisent toutes de la date de Pâques.",
    ],
  },
  {
    title: "La signification des grandes fêtes",
    paras: [
      "Noël (25 décembre) célèbre la naissance de Jésus. L'Épiphanie (6 janvier) commémore la visite des Rois mages et la manifestation du Christ aux nations.",
      "Pâques est le sommet de l'année chrétienne : la Résurrection du Christ, le troisième jour après sa mort sur la croix. Elle est précédée du Carême (40 jours de préparation) et de la Semaine sainte. L'Ascension marque la montée du Christ au ciel, et la Pentecôte la descente de l'Esprit Saint sur les apôtres, considérée comme la naissance de l'Église.",
      "L'Assomption (15 août) fête l'élévation de la Vierge Marie au ciel. La Toussaint (1er novembre) honore tous les saints, et précède le jour des défunts (2 novembre).",
    ],
  },
  {
    title: "Les temps forts de l'année liturgique",
    paras: [
      "L'année liturgique catholique ne suit pas l'année civile : elle commence quatre dimanches avant Noël, avec l'Avent, temps d'attente et de préparation.",
      "Vient ensuite le temps de Noël, puis une première période de Temps ordinaire. Le Carême ouvre la marche vers Pâques, suivi du Temps pascal qui s'étend jusqu'à la Pentecôte.",
      "Le reste de l'année forme le Temps ordinaire, qui se conclut par la fête du Christ Roi, juste avant le retour de l'Avent. Chaque temps a sa couleur liturgique : violet pour l'Avent et le Carême, blanc pour Noël et Pâques, vert pour le Temps ordinaire, rouge pour la Pentecôte.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce qu'une fête mobile en calendrier catholique ?",
    a: "Une fête mobile est une célébration dont la date change chaque année car elle dépend de la date de Pâques. Pâques est calculée selon le Concile de Nicée : premier dimanche après la pleine lune de printemps. Les fêtes mobiles incluent Mercredi des Cendres, Pentecôte, Ascension, etc.",
  },
  {
    q: "Quelles fêtes catholiques sont des jours fériés en France ?",
    a: "Six fêtes catholiques sont des jours fériés légaux en France : le lundi de Pâques, l'Ascension, le lundi de Pentecôte, l'Assomption (15 août), la Toussaint (1er novembre) et Noël (25 décembre). Attention : le 1er janvier est férié au titre du Jour de l'An civil, pas de la fête de Sainte Marie. L'Épiphanie (6 janvier) et l'Immaculée Conception (8 décembre) sont des solennités liturgiques importantes, mais ne sont pas des jours fériés. L'Alsace-Moselle bénéficie de deux fériés supplémentaires, le Vendredi saint et la Saint-Étienne (26 décembre).",
  },
  {
    q: "Pourquoi Pâques est-elle une fête mobile ?",
    a: "Pâques commémore la Résurrection du Christ, un événement basé sur le calendrier lunaire juif. Au Concile de Nicée (325), l'Église a fixé Pâques au premier dimanche après la première pleine lune de printemps. Cette règle produit des dates différentes selon les années.",
  },
  {
    q: "Quelle est la différence entre les fêtes mobiles et les fêtes fixes ?",
    a: "Les fêtes fixes ont toujours la même date (Noël le 25 décembre, Toussaint le 1er novembre). Les fêtes mobiles changent chaque année car elles dépendent de Pâques. Par exemple, Pâques peut tomber entre le 22 mars et le 25 avril.",
  },
  {
    q: "Quelle est la date de Pâques 2026 ?",
    a: "Pâques 2026 tombe le dimanche 5 avril 2026. Le lundi de Pâques (jour férié) est donc le 6 avril. L'Ascension sera le 14 mai et la Pentecôte le 24 mai (lundi de Pentecôte férié le 25 mai).",
  },
  {
    q: "Pourquoi Pâques catholique et Pâque orthodoxe ne tombent-elles pas le même jour ?",
    a: "Les deux suivent la même règle de Nicée, mais pas le même calendrier. L'Église catholique utilise le calendrier grégorien, tandis que les Églises orthodoxes calculent la pleine lune pascale sur l'ancien calendrier julien. L'écart entre les deux calendriers (13 jours aujourd'hui) décale souvent la date, parfois d'une à cinq semaines.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calendrier Fêtes Catholiques - Pâques, Pentecôte, Ascension" />
      <Breadcrumb currentPage="Calendrier Fêtes Catholiques" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⛪
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calendrier des Fêtes Catholiques
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez toutes les fêtes catholiques mobiles et fixes de l&apos;année. Pâques, Pentecôte, Ascension, Noël et bien d&apos;autres.
      </p>

      <CalculFetesCatholiques />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Fêtes mobiles</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Les fêtes mobiles sont célébrées à des dates qui changent chaque année, car elles sont calculées à partir de Pâques. Voici le calendrier complet des fêtes mobiles de 2026 à 2030.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Mercredi des Cendres</p>
            <p className="text-sm text-amber-800">46 jours avant Pâques - Début du Carême</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Dimanche des Rameaux</p>
            <p className="text-sm text-amber-800">7 jours avant Pâques - Entrée à Jérusalem</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Pâques</p>
            <p className="text-sm text-amber-800">Résurrection du Christ - Fête la plus importante</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Ascension</p>
            <p className="text-sm text-amber-800">39 jours après Pâques - Jeudi</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Pentecôte</p>
            <p className="text-sm text-amber-800">49 jours après Pâques - Descente de l&apos;Esprit Saint</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Fête-Dieu</p>
            <p className="text-sm text-amber-800">60 jours après Pâques - Corps du Christ</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Fêtes fixes</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Les fêtes fixes ont toujours la même date chaque année selon le calendrier grégorien. Voici les principales solennités et fêtes du calendrier liturgique romain.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">1er janvier</p>
            <p className="text-sm text-slate-700">Sainte Marie Mère de Dieu</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">6 janvier</p>
            <p className="text-sm text-slate-700">Épiphanie</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">2 février</p>
            <p className="text-sm text-slate-700">Chandeleur</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">25 mars</p>
            <p className="text-sm text-slate-700">Annonciation</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">24 juin</p>
            <p className="text-sm text-slate-700">Saint Jean-Baptiste</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">15 août</p>
            <p className="text-sm text-slate-700">Assomption de Marie</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">1er novembre</p>
            <p className="text-sm text-slate-700">Toussaint</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">8 décembre</p>
            <p className="text-sm text-slate-700">Immaculée Conception</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">25 décembre</p>
            <p className="text-sm text-slate-700">Noël</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Jours fériés religieux en France</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          En France, certaines fêtes catholiques sont déclarées jours fériés (non-travail obligatoire). Voici la liste complète.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-4 text-slate-600 font-medium">Fête</th>
                <th className="text-left py-3 px-4 text-slate-600 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-slate-600 font-medium">Date en 2026</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Sainte Marie Mère de Dieu</td>
                <td className="py-3 px-4 text-slate-600">Fixe</td>
                <td className="py-3 px-4 text-slate-600">1er janvier</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Pâques</td>
                <td className="py-3 px-4 text-slate-600">Mobile</td>
                <td className="py-3 px-4 text-slate-600">5 avril</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Lundi de Pâques</td>
                <td className="py-3 px-4 text-slate-600">Mobile</td>
                <td className="py-3 px-4 text-slate-600">6 avril</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Ascension</td>
                <td className="py-3 px-4 text-slate-600">Mobile</td>
                <td className="py-3 px-4 text-slate-600">14 mai</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Pentecôte (lundi)</td>
                <td className="py-3 px-4 text-slate-600">Mobile</td>
                <td className="py-3 px-4 text-slate-600">25 mai</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Assomption de Marie</td>
                <td className="py-3 px-4 text-slate-600">Fixe</td>
                <td className="py-3 px-4 text-slate-600">15 août</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Toussaint</td>
                <td className="py-3 px-4 text-slate-600">Fixe</td>
                <td className="py-3 px-4 text-slate-600">1er novembre</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-700">Noël</td>
                <td className="py-3 px-4 text-slate-600">Fixe</td>
                <td className="py-3 px-4 text-slate-600">25 décembre</td>
              </tr>
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

      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          Calendrier liturgique romain conforme au Missel romain. Les dates affichées correspondent au rite catholique romain. Pour les Églises orientales ou orthodoxes, certaines fêtes peuvent différer. <strong>Sources&nbsp;:</strong> Vatican.va, Conférence des évêques de France, Code de Droit Canonique.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-fetes-catholiques" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
