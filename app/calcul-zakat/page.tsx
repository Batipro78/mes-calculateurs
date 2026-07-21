import type { Metadata } from "next";
import CalculZakat from "./CalculZakat";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-zakat" },
  title: "Calcul Zakat al-Mal 2026 - Aumône légale annuelle",
  description:
    "Calculez votre Zakat al-Mal selon les écoles majoritaire (nisab or) ou hanafite (nisab argent). Cours or et argent à jour. Conforme avis ECFR/CFCM.",
  keywords:
    "calcul zakat, zakat al mal, aumone musulmane, nisab or argent, hanafite majoritaire, ecfr cfcm, coran 9:60",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que la Zakat al-Mal ?",
    a: "La Zakat al-Mal est l'aumone legale dans l'Islam. Elle consiste a donner 2,5% de son patrimoine net annuel aux personnes eligibles (pauvres, endettes, voyageurs, etc.). Fondee sur le Coran 9:60 et les hadiths Boukhari/Mouslim.",
  },
  {
    q: "Quel nisab choisir : or ou argent ?",
    a: "Deux ecoles : Majoritaire (Maliki, Chafii, Hanbali, ECFR) utilise le nisab or (85g), plus eleve. Hanafite utilise le nisab argent (595g), seuil bas. Le choix depend de votre ecole de reference ou de votre ijtihad personnel. Consultez la Mosquee de Paris ou l'ECFR pour votre situation.",
  },
  {
    q: "Les bijoux portes sont-ils zakatables ?",
    a: "Avis divergents : Hanafite disent oui (toujours). Maliki, Chafii, Hanbali disent non si portes a usage habituel (mariage, fete). Consultez votre imam ou le calculateur propose cette flexibilite.",
  },
  {
    q: "Comment calculer les dettes dans la Zakat ?",
    a: "SEULEMENT les dettes court terme (payables dans 12 prochains mois) : factures, loyers, impots dus, mensualites credit, salaires d'employes. PAS les prets immobiliers long terme ni hypotheques. Deductibles du patrimoine brut avant calcul.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Zakat al-Mal" />
      <Breadcrumb currentPage="Calcul Zakat al-Mal" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🕋
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
          Calcul Zakat al-Mal - Aumône légale annuelle
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez les 2,5% de Zakat sur votre patrimoine selon votre école (nisab or/argent).
      </p>

      <CalculZakat />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Doctrine et écoles */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Écoles juridiques et Zakat</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-slate-500 font-medium">École</th>
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Pays/Région</th>
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Nisab Privilégié</th>
                <th className="text-left py-3 px-4 text-slate-500 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-semibold text-slate-800">Hanafite</td>
                <td className="py-3 px-4 text-slate-600">Turquie, Levant, Asie centrale</td>
                <td className="py-3 px-4 text-slate-600">Argent (595g) — seuil bas</td>
                <td className="py-3 px-4 text-slate-500">Bijoux portes : zakatable</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-800">Maliki</td>
                <td className="py-3 px-4 text-slate-600">Afrique du Nord (Maroc, Algerie)</td>
                <td className="py-3 px-4 text-slate-600">Or (85g) — seuil eleve</td>
                <td className="py-3 px-4 text-slate-500">Bijoux d&apos;usage : non zakatable</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-semibold text-slate-800">Chafii</td>
                <td className="py-3 px-4 text-slate-600">Égypte, Yémen, Asie du Sud-Est</td>
                <td className="py-3 px-4 text-slate-600">Or (85g)</td>
                <td className="py-3 px-4 text-slate-500">Bijoux portés : non zakatable</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-800">Hanbali</td>
                <td className="py-3 px-4 text-slate-600">Arabie Saoudite</td>
                <td className="py-3 px-4 text-slate-600">Or (85g)</td>
                <td className="py-3 px-4 text-slate-500">Rigueur. Bijoux : non zakatable</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-600 mt-6 leading-relaxed">
          <strong>France (ECFR, Mosquée de Paris):</strong> Suit l&apos;avis majoritaire (nisab or). Recommande le nisab or sauf demande expresse selon Hanafite.
        </p>
      </section>

      {/* Biens zakatables */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Biens zakatables à inclure dans le calcul</h2>
        <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Liquidités:</strong> Cash, comptes courants, livrets épargne (CEL, LEP, etc.)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Or et argent:</strong> Or détenu (en grammes × cours), argent monétaire</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Actions et parts:</strong> Valeur de marche actuelle (CAC 40, Euronext, etc.)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>SCPI et immobilier financier:</strong> Valeur liquidative ou estimation</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Cryptomonnaies:</strong> Valeur EUR au moment du calcul (avis ECFR/AAOIFI)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Assurance-vie:</strong> Valeur de rachat (provisions</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Inventaire commercial:</strong> Stock (commerçants, artisans, services)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Créances recouvrables:</strong> Prêts accordés, factures clients sûres</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
            <span><strong>Bijoux (selon école):</strong> Hanafite: tous. Maliki/Chafii: sauf portés à usage habituel</span>
          </li>
        </ul>
      </section>

      {/* Biens NON zakatables */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Biens NON zakatables</h2>
        <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-slate-400 font-bold flex-shrink-0">✗</span>
            <span><strong>Résidence principale:</strong> Maison/appartement où vous vivez</span>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 font-bold flex-shrink-0">✗</span>
            <span><strong>Voiture personnelle:</strong> Véhicule pour trajets personnels/familiaux</span>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 font-bold flex-shrink-0">✗</span>
            <span><strong>Meubles et mobilier:</strong> Lits, tables, chaises, armoires de la maison</span>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 font-bold flex-shrink-0">✗</span>
            <span><strong>Vêtements et chaussures:</strong> Habits du quotidien, même de valeur</span>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 font-bold flex-shrink-0">✗</span>
            <span><strong>Outils et instruments de travail:</strong> Equip. de l&apos;artisan, ordinateur pro (déductible avant Zakat si fatwa)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 font-bold flex-shrink-0">✗</span>
            <span><strong>Terrains agricoles et bâtisses non louées:</strong> Sauf si objectif commercial/revente</span>
          </li>
        </ul>
      </section>

      {/* Hawl */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Hawl - L&apos;année lunaire</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          La <strong>Hawl</strong> (حول) est la condition d&apos;une année lunaire complète (354 jours). La Zakat n&apos;est due que si :
        </p>
        <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="font-bold text-emerald-600 flex-shrink-0">1.</span>
            <span>Votre patrimoine ≥ nisab au moment du commencement de la Hawl</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-emerald-600 flex-shrink-0">2.</span>
            <span>Il reste ≥ nisab après 1 année lunaire (variations acceptées si retour à nisab)</span>
          </li>
        </ul>
        <p className="text-slate-600 text-sm leading-relaxed mt-4">
          <strong>Exemple:</strong> Si vous aviez 15 000 € le 15 juin 2024 (≥ nisab), la Hawl expire le 15 juin 2025 (354j). Vous payez Zakat 2,5% × patrimoine actuel le 15 juin 2025.
        </p>
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 mt-4">
          <p className="text-xs text-slate-500">
            Les années varient. Certains musulmans unissent leur Hawl fin Ramadan (date uniforme). Consultez votre imam pour savoir comment appliquer.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 bg-red-50 rounded-2xl border border-red-200 p-8">
        <h2 className="text-xl font-bold text-red-900 mb-4">⚠️ Disclaimer important</h2>
        <p className="text-red-800 text-sm leading-relaxed mb-4">
          Ce calculateur suit l&apos;avis <strong>majoritaire contemporain</strong> et la position de l&apos;<strong>ECFR (Conseil Européen de la Fatwa et de la Recherche)</strong>. Les cours or/argent sont <strong>indicatifs</strong> et actualisés quotidiennement.
        </p>
        <p className="text-red-800 text-sm leading-relaxed mb-4">
          <strong>Pour votre situation personnelle complexe</strong> (créances douteuses, dettes spéciales, Hawl multiple, bijoux familiaux, succession, etc.), <strong>consultez obligatoirement un imam qualifié</strong> ou votre mosquée locale (Mosquée de Paris, CFCM, fédérations régionales).
        </p>
        <p className="text-red-800 text-sm leading-relaxed">
          <strong>Sources:</strong> Coran 9:60, hadiths Boukhari n°1386 et Mouslim n°979, fatwas Al-Azhar, avis ECFR 2018-2026, CFCM, Islamic Relief France.
        </p>
      </section>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <HowToJsonLd
        name="Calculer sa Zakat al-Mal"
        steps={[
          { name: "Inventorier les biens zakatables", text: "Lister les actifs zakatables : liquidites (cash, livrets), or en grammes x cours du jour, argent, actions (valeur de marche), cryptomonnaies (valeur EUR), assurance-vie (valeur de rachat), stocks commerciaux, creances recouvrables. Ne pas inclure la residence principale, la voiture personnelle, les meubles ni les vetements." },
          { name: "Déduire les dettes court terme", text: "Soustraire uniquement les dettes exigibles dans les 12 prochains mois : factures en cours, loyers dus, impôts à payer, mensualités de credit, salaires d'employes. Ne pas déduire les prets immobiliers à long terme ni les hypotheques." },
          { name: "Vérifier le nisab et la hawl", text: "Comparer le patrimoine net au nisab de son ecole : 85 g d'or (ecole majoritaire Maliki / Chafii / Hanbali / ECFR) ou 595 g d'argent (ecole hanafite). La Zakat est due uniquement si le patrimoine est reste supérieur au nisab pendant une année lunaire complète (hawl = 354 jours)." },
          { name: "Appliquer le taux de 2,5 pct", text: "Zakat = patrimoine net x 2,5 / 100. Exemple : patrimoine net de 20 000 EUR (ecole or, nisab atteint) donne 20 000 x 0,025 = 500 EUR de Zakat à verser aux 8 catégories d'eligibles (Coran 9:60)." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-zakat" />
    </div>
  );
}
