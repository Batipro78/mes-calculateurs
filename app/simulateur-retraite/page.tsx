import type { Metadata } from "next";
import SimulateurRetraite from "./SimulateurRetraite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";
import Visuel from "../components/Visuel";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-retraite" },
  title: "Simulateur Retraite 2026 - Calcul pension, age legal, decote",
  description:
    "Calculez votre retraite gratuitement : pension brute et nette, age legal (reforme 2023 suspendue jusqu'en 2028), decote/surcote, complementaire AGIRC-ARRCO, taux de remplacement. Bareme 2026.",
  keywords:
    "simulateur retraite, calcul pension retraite, age legal retraite 2026, reforme retraite, decote retraite, surcote, AGIRC-ARRCO, taux remplacement, trimestres retraite",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est l'age legal de la retraite en 2026 ?",
    a: "La reforme de 2023 relevait l'age legal de 62 a 64 ans, mais ce relevement est suspendu jusqu'en 2028 par la loi de financement de la Securite sociale pour 2026. Pour un depart a partir du 1er septembre 2026, l'age legal depend de votre annee de naissance : 62 ans (nes avant septembre 1961), 62 ans et 9 mois (1963 et 1964), 63 ans (nes d'avril a decembre 1965), 63 ans et 9 mois (1968), puis 64 ans pour les nes en 1969 et apres. L'age du taux plein automatique reste fixe a 67 ans.",
  },
  {
    q: "Comment est calculee la pension de retraite ?",
    a: "La pension de base = Salaire Annuel Moyen (25 meilleures annees) x Taux de liquidation (50% au taux plein) x (Trimestres cotises / Trimestres requis). A cela s'ajoute la retraite complementaire AGIRC-ARRCO basee sur les points accumules.",
  },
  {
    q: "Qu'est-ce que la decote et la surcote ?",
    a: "La decote reduit le taux de 50 % de 0,625 % par trimestre manquant : 49,375 % pour 1 trimestre manquant, 37,5 % pour 20 trimestres ou plus. La surcote augmente la pension de 1,25 % par trimestre travaille apres l'age legal et au-dela de la duree du taux plein. Attendre 67 ans supprime automatiquement toute decote.",
  },
  {
    q: "Combien de trimestres faut-il pour le taux plein ?",
    a: "Le nombre de trimestres requis depend de votre annee de naissance : 167 (1958 a 1960), 168 ou 169 (1961), 169 (1962), 170 (1963 et 1964, et nes de janvier a mars 1965), 171 (nes d'avril a decembre 1965) et 172 trimestres (1966 et apres), soit 43 ans de cotisation.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Retraite" />
      <Breadcrumb currentPage="Simulateur Retraite" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Retraite 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre pension de retraite : regime general + complementaire
        AGIRC-ARRCO, avec les regles en vigueur apres la suspension de la reforme 2023.
      </p>

      <SimulateurRetraite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer sa retraite en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Votre pension de retraite se compose de deux parties : la <strong>retraite
          de base</strong> (regime general de la Securite sociale) et la <strong>retraite
          complementaire</strong> (AGIRC-ARRCO pour les salaries du prive). La reforme
          des retraites de 2023 a modifie l&apos;age legal et le nombre de trimestres requis, puis la loi de
          financement de la Securite sociale pour 2026 l&apos;a suspendue jusqu&apos;en 2028.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule de la retraite de base</h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          Pension = SAM x Taux x (Trimestres cotises / Trimestres requis)
        </div>
        <ul className="list-disc list-inside text-slate-600 mt-3 space-y-1.5">
          <li><strong>SAM</strong> : Salaire Annuel Moyen des 25 meilleures annees (plafonne au plafond de la Securite sociale : 48 060 EUR en 2026)</li>
          <li><strong>Taux</strong> : 50% au taux plein, reduit par la decote ou augmente par la surcote</li>
          <li><strong>Proratisation</strong> : ratio trimestres cotises / trimestres requis (plafonne a 100%)</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Age legal et trimestres requis pour un depart depuis le 1er septembre 2026</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La reforme de 2023 relevait l&apos;age legal de <strong>62 a 64 ans</strong>, a raison de
          3 mois par generation. Ce relevement est <strong>suspendu jusqu&apos;en 2028</strong> : les generations
          1964 a 1968 partent un trimestre plus tot que prevu, et seuls les nes a partir de 1969 sont a 64 ans
          (service-public.gouv.fr). Le calculateur raisonne par annee de naissance ; pour 1961 et 1965, annees
          coupees en deux, il retient les nes en fin d&apos;annee.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Annee de naissance</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Age legal</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Trimestres requis</th>
              </tr>
            </thead>
            <tbody>
              {[
                { annee: "1958 a 1960", age: "62 ans", trim: "167" },
                { annee: "1961 (janvier a aout)", age: "62 ans", trim: "168" },
                { annee: "1961 (septembre a decembre)", age: "62 ans 3 mois", trim: "169" },
                { annee: "1962", age: "62 ans 6 mois", trim: "169" },
                { annee: "1963", age: "62 ans 9 mois", trim: "170" },
                { annee: "1964", age: "62 ans 9 mois", trim: "170" },
                { annee: "1965 (janvier a mars)", age: "62 ans 9 mois", trim: "170" },
                { annee: "1965 (avril a decembre)", age: "63 ans", trim: "171" },
                { annee: "1966", age: "63 ans 3 mois", trim: "172" },
                { annee: "1967", age: "63 ans 6 mois", trim: "172" },
                { annee: "1968", age: "63 ans 9 mois", trim: "172" },
                { annee: "1969 et apres", age: "64 ans", trim: "172" },
              ].map((row) => (
                <tr key={row.annee} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">{row.annee}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.age}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-700">{row.trim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Decote et surcote</h3>
        <div className="grid gap-3 sm:grid-cols-2 mt-3">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">Decote (depart anticipe)</p>
            <p className="text-xs text-red-600 mt-1">Taux de 50 % reduit de 0,625 % par trimestre manquant (49,375 % pour 1 trimestre)</p>
            <p className="text-xs text-red-600">Maximum 20 trimestres : taux de 37,5 %</p>
            <p className="text-xs text-red-600 font-bold mt-1">Disparait automatiquement a 67 ans</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Surcote (depart differe)</p>
            <p className="text-xs text-green-600 mt-1">Pension majoree de 1,25 % par trimestre supplementaire</p>
            <p className="text-xs text-green-600">Apres l&apos;age legal ET au-dela de la duree du taux plein</p>
            <p className="text-xs text-green-600 font-bold mt-1">Pas de limite de surcote, a vie</p>
          </div>
        </div>

        <Visuel
          fichier="simulateur-retraite-trimestres-decote-surcote"
          alt="Pension de base brute par mois selon le nombre de trimestres et l'âge de départ, pour une personne née en 1970 avec un salaire annuel moyen de 35 000 € : 164 trimestres à 64 ans, 1 251 € ; 168 trimestres à 64 ans, 1 353 € ; 172 trimestres à 64 ans, 1 458 € ; 176 trimestres à 65 ans, 1 531 € ; 180 trimestres à 66 ans, 1 604 €. La décote baisse la pension avec 8 et 4 trimestres manquants, la surcote la relève de 5 % et de 10 %."
          legende="Resultats du simulateur pour une personne nee en 1970, avec un salaire annuel moyen de 35 000 EUR : la decote baisse la pension quand il manque des trimestres a 64 ans, la surcote la releve quand on travaille apres 64 ans au-dela de la duree du taux plein. Pension de base brute par mois, sans la complementaire."
          className="mt-6"
        />
        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          Pour comprendre la surcote pas a pas (conditions, duree, exemple chiffre et revalorisation des pensions),
          lisez{" "}
          <a href="/surcote-retraite-comment-est-elle-calculee" className="text-blue-600 hover:underline font-medium">
            Surcote retraite : comment est-elle calculee ?
          </a>
          .
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La retraite complementaire AGIRC-ARRCO</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Chaque annee de cotisation genere des <strong>points de retraite</strong>. Au moment
          du depart, vos points sont multiplies par la <strong>valeur du point</strong> (1,4386 EUR
          depuis le 1er novembre 2024, inchangee au 1er novembre 2025) pour determiner votre pension
          complementaire annuelle. La valeur applicable au 1er novembre 2026 sera fixee par le conseil
          d&apos;administration de l&apos;Agirc-Arrco : le calculateur garde 1,4386 EUR tant qu&apos;elle n&apos;est pas publiee.
        </p>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Le calculateur estime les points de facon simplifiee : il suppose que votre salaire annuel moyen a ete
          votre salaire toute la carriere, avec une cotisation de 7,87 % jusqu&apos;au plafond de la Securite
          sociale (48 060 EUR en 2026), dont seule la part sans l&apos;appel de 127 % donne des points, et un point
          achete 20,1877 EUR. Si vous partez avant 67 ans sans le taux plein, la complementaire est reduite
          (de 1 % par trimestre manquant jusqu&apos;a 12 trimestres, puis 1,25 %, soit 22 % au maximum).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">De la pension brute a la pension nette</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La pension de retraite est soumise a des prelevements sociaux :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prelevement</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">CSG (taux normal)</td>
                <td className="py-2 px-2 text-right font-medium text-slate-700">8,3%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">CRDS</td>
                <td className="py-2 px-2 text-right font-medium text-slate-700">0,5%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">Casa</td>
                <td className="py-2 px-2 text-right font-medium text-slate-700">0,3%</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="py-2 px-2 font-bold text-slate-800">Total</td>
                <td className="py-2 px-2 text-right font-extrabold text-slate-800">9,1%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Le taux de CSG peut etre reduit (6,6% ou 3,8%) ou nul selon votre revenu fiscal de reference.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples concrets</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">SMIC toute carriere</p>
            <p className="text-xs text-amber-600 mt-1">SAM : 20 000 EUR, 172 trim., ne en 1970, depart a 64 ans</p>
            <p className="text-xs text-amber-600 font-bold">environ 1 106 EUR net/mois</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Cadre moyen</p>
            <p className="text-xs text-amber-600 mt-1">SAM : 40 000 EUR, 172 trim., ne en 1970, depart a 64 ans</p>
            <p className="text-xs text-amber-600 font-bold">environ 2 084 EUR net/mois</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Carriere incomplete (130 trim.)</p>
            <p className="text-xs text-amber-600 mt-1">SAM : 30 000 EUR, ne en 1970, depart a 64 ans, decote</p>
            <p className="text-xs text-amber-600 font-bold">environ 1 014 EUR net/mois</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Cadre sup (plafond)</p>
            <p className="text-xs text-amber-600 mt-1">SAM : 48 060 EUR, 172 trim., ne en 1970, depart a 64 ans</p>
            <p className="text-xs text-amber-600 font-bold">environ 2 504 EUR net/mois</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Comment connaitre ses trimestres ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Rendez-vous sur <strong>info-retraite.fr</strong> pour acceder a votre releve de
          carriere. Ce document detaille vos trimestres valides, vos revenus et une estimation
          officielle de votre pension. Vous recevez aussi un <strong>Estimation Indicative
          Globale (EIG)</strong> a 55 et 60 ans.
        </p>
      </section>

      <HowToJsonLd
        name="Simuler sa retraite"
        steps={[
          { name: "Saisir l'année de naissance et le salaire annuel moyen", text: "Renseigner l'année de naissance (determine l'âge légal, de 62 à 64 ans, et les trimestres requis, de 166 à 172, selon les regles en vigueur depuis la suspension de la reforme 2023), le salaire annuel moyen des 25 meilleures années (plafonne à 48 060 EUR en 2026) et le nombre de trimestres cotises." },
          { name: "Appliquer le taux de liquidation et la proratisation", text: "Pension de base = SAM x taux x (trimestres cotises / trimestres requis). Le taux plein est de 50% ; la décote le reduit de 0,625% par trimestre manquant (49,375% pour 1 trimestre, max 20 trimestres, taux de 37,5%) ; la surcote majore la pension de 1,25% par trimestre supplémentaire accompli après l'âge légal et au-delà de la durée du taux plein." },
          { name: "Ajouter la complémentaire AGIRC-ARRCO", text: "Multiplier les points accumules par la valeur du point (1,4386 EUR depuis le 1er novembre 2024) pour obtenir la pension complémentaire annuelle." },
          { name: "Lire la pension nette mensuelle", text: "Déduire les prelevements sociaux (CSG 8,3% + CRDS 0,5% + Casa 0,3% = 9,1% au total, plus 1% de cotisation d'assurance maladie sur la complémentaire) de la pension brute totale (base + complémentaire) pour obtenir la pension nette." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La pension de retraite de base se calcule a partir du salaire annuel moyen, du taux (lie a la duree d'assurance) et de la duree validee, completee par la retraite AGIRC-ARRCO (points). L'age legal et la duree requise sont ceux en vigueur depuis la suspension de la reforme 2023 (loi de financement de la Securite sociale pour 2026).`}
        sources={[
          { label: "Info-retraite.fr - Service public des retraites", url: "https://www.info-retraite.fr" },
          { label: "L'Assurance retraite - Calcul de la pension", url: "https://www.lassuranceretraite.fr" },
          { label: "Service-Public.fr - Retraite", url: "https://www.service-public.fr/particuliers/vosdroits/N379" },
          { label: "Service-Public.fr - Surcote du salarie du secteur prive", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19643" },
          { label: "Service-Public.fr - Decote du salarie", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19666" },
          { label: "Service-Public.fr - Suspension de la reforme des retraites", url: "https://www.service-public.gouv.fr/particuliers/actualites/A18825" },
          { label: "Agirc-Arrco - Parametres et chiffres du regime", url: "https://www.agirc-arrco.fr/nous-connaitre/nos-etudes-et-publications/documentation-institutionnelle/parametres-et-donnees-statistiques/" },
        ]}
      />


      <RelatedCalculators currentSlug="/simulateur-retraite" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
