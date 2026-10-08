import type { Metadata } from "next";
import SimulateurAmende from "./SimulateurAmende";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import Visuel from "../components/Visuel";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-amende-exces-vitesse" },
  title: "Simulateur Amende Excès de Vitesse 2026 - Points et Suspension",
  description:
    "Calculez l'amende pour excès de vitesse : vitesse retenue après la marge du radar, montant minoré, forfaitaire et majoré, points retirés, peines possibles.",
  keywords:
    "amende excès vitesse, simulateur amende vitesse, barème amende vitesse 2026, vitesse retenue radar, points permis, suspension permis, délit routier",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quelle est l'amende pour 10 km/h au-dessus de la limite ?",
    a: "Pour un excès retenu de 5 à 19 km/h : 68 € (minorée 45 €, majorée 180 €) si la limite est supérieure à 50 km/h, 135 € (minorée 90 €, majorée 375 €) si elle est de 50 km/h ou moins. Dans les deux cas, 1 point est retiré. Sous 5 km/h d'excès retenu, l'amende est la même mais aucun point n'est retiré.",
  },
  {
    q: "À partir de combien risque-t-on de perdre son permis pour excès de vitesse ?",
    a: "À partir de 30 km/h d'excès retenu, le juge peut prononcer une suspension du permis jusqu'à 3 ans (3 points retirés, 4 points à partir de 40 km/h). À partir de 50 km/h, l'excès est un délit : 6 points, amende forfaitaire délictuelle de 300 €, ou jusqu'à 3 750 € et 3 mois de prison devant le tribunal correctionnel si vous la refusez. Suspension, annulation et confiscation du véhicule sont possibles, mais décidées par le juge.",
  },
  {
    q: "Combien de temps pour payer une amende de radar automatique ?",
    a: "Le montant est minoré si vous payez dans les 15 jours (30 jours en télépaiement), forfaitaire dans les 45 jours (60 jours en télépaiement), puis majoré. Exemple pour une amende de 135 € : 90 € minorée, 135 € forfaitaire, 375 € majorée.",
  },
  {
    q: "Qu'est-ce que la vitesse retenue ?",
    a: "C'est la vitesse mesurée par le radar moins la marge technique : 5 km/h en dessous de 100 km/h, 5 % à partir de 100 km/h. L'excès est calculé sur cette vitesse retenue. Exemple : 140 km/h mesurés sur autoroute donnent 133 km/h retenus, soit 3 km/h d'excès, donc 68 € et aucun point.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Amende Excès de Vitesse" description="Calcul amendes + points 2026" category="UtilitiesApplication" />
      <Breadcrumb currentPage="Simulateur Amende Excès de Vitesse" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur Amende Excès de Vitesse 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez l&apos;amende, les points retirés et les peines possibles selon la vitesse mesurée par le radar.
      </p>

      <SimulateurAmende />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Barème des amendes 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-2 text-slate-500">Excès retenu</th>
                <th className="text-right py-2 px-2 text-slate-500">Amende</th>
                <th className="text-right py-2 px-2 text-slate-500">Points</th>
                <th className="text-right py-2 px-2 text-slate-500">Peines possibles</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-2">&lt; 5 km/h</td><td className="py-2 px-2 text-right">68 € ou 135 €</td><td className="py-2 px-2 text-right">0</td><td className="py-2 px-2 text-right">Non</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-2">5 à 19 km/h (limite &gt; 50)</td><td className="py-2 px-2 text-right">68 €</td><td className="py-2 px-2 text-right">-1</td><td className="py-2 px-2 text-right">Non</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-2">5 à 19 km/h (limite ≤ 50)</td><td className="py-2 px-2 text-right">135 €</td><td className="py-2 px-2 text-right">-1</td><td className="py-2 px-2 text-right">Non</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-2">20 à 29 km/h</td><td className="py-2 px-2 text-right">135 €</td><td className="py-2 px-2 text-right">-2</td><td className="py-2 px-2 text-right">Non</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-2">30 à 39 km/h</td><td className="py-2 px-2 text-right">135 €</td><td className="py-2 px-2 text-right">-3</td><td className="py-2 px-2 text-right">Suspension 3 ans max.</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-2">40 à 49 km/h</td><td className="py-2 px-2 text-right">135 €</td><td className="py-2 px-2 text-right">-4</td><td className="py-2 px-2 text-right">Suspension 3 ans max.</td></tr>
              <tr className="border-b border-slate-100 bg-red-50"><td className="py-2 px-2 text-red-700 font-bold">≥ 50 km/h (délit)</td><td className="py-2 px-2 text-right text-red-700 font-bold">300 € (jusqu&apos;à 3 750 €)</td><td className="py-2 px-2 text-right text-red-700 font-bold">-6</td><td className="py-2 px-2 text-right text-red-700 font-bold">Suspension, confiscation</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">La vitesse retenue</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le radar retranche une marge technique de la vitesse qu&apos;il a mesurée : <strong>5 km/h</strong> en dessous de 100 km/h,
          <strong> 5 %</strong> à partir de 100 km/h (source : ANTAI). Le calculateur applique cette marge, puis arrondit à l&apos;entier inférieur
          quand le résultat n&apos;est pas rond. Les voitures-radars de nouvelle génération ont une marge de 10 km/h ou 10 %, que ce calculateur n&apos;applique pas.
        </p>

        <Visuel
          fichier="vitesse-mesuree-vitesse-retenue-radar"
          alt="Tableau de la vitesse mesurée, de la vitesse retenue après la marge du radar, de l'amende et des points : limite 50 km/h et 56 mesurés donnent 51 retenus, 0 point et 135 € ; limite 80 et 93 mesurés donnent 88 retenus, 1 point et 68 € ; limite 90 et 120 mesurés donnent 114 retenus, 2 points et 135 € ; limite 130 et 140 mesurés donnent 133 retenus, 0 point et 68 € ; limite 130 et 160 mesurés donnent 152 retenus, 2 points et 135 € ; limite 130 et 190 mesurés donnent 180 retenus, 6 points et 300 € (délit)"
          legende="De la vitesse mesurée à l'amende : marge technique de l'ANTAI (5 km/h sous 100 km/h, 5 % au-dessus), amende et points d'après service-public.fr, calculés avec ce simulateur."
          className="mt-2 mb-6"
        />

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les 3 montants d&apos;amende</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Minorée</strong> : paiement sous 15 jours (30 en télépaiement), par exemple 90 € au lieu de 135 €</li>
          <li><strong>Forfaitaire</strong> : paiement sous 45 jours (60 en télépaiement), montant standard</li>
          <li><strong>Majorée</strong> : paiement après ces délais, par exemple 375 € pour une amende de 135 €</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Perdre des points : et après ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le permis français a <strong>12 points maximum</strong> (6 points pour un permis probatoire de moins d&apos;un an).
          Si le solde tombe à zéro, le permis est invalidé et vous devez passer un contrôle médical avant de repasser le permis.
          Récupération automatique : <strong>6 mois</strong> si vous ne perdez qu&apos;1 point (excès de 5 à 19 km/h, quelle que soit la limite),
          <strong> 3 ans</strong> si le dossier contient une infraction de 4e classe ou un délit (excès de 20 km/h ou plus),
          à condition de ne commettre aucune nouvelle infraction. Un <strong>stage de sensibilisation</strong> permet de
          récupérer jusqu&apos;à 4 points, 1 fois par an au maximum, pour 200 € en moyenne.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour le détail, lisez l&apos;article <a href="/exces-de-vitesse-combien-de-points-et-d-amende" className="text-blue-600 hover:underline font-medium">excès de vitesse : combien de points et d&apos;amende</a>.
        </p>
      </section>

      <HowToJsonLd
        name="Simuler une amende pour excès de vitesse"
        steps={[
          { name: "Saisir la vitesse mesurée et la limite", text: "Entrer la vitesse mesurée par le radar et choisir la vitesse maximale autorisée sur la route (zone 30, 50, 80, 90, 110 ou 130 km/h)." },
          { name: "Lire la vitesse retenue", text: "Le simulateur retranche la marge technique du radar (5 km/h sous 100 km/h, 5 % à partir de 100 km/h) pour obtenir la vitesse retenue et l'excès." },
          { name: "Lire l'amende et les points retirés", text: "Il affiche l'amende minorée, forfaitaire et majorée (par exemple 135 € pour un excès de 20 à 49 km/h) et les points retirés, jusqu'à 6 points et 300 € pour un excès d'au moins 50 km/h, qui est un délit." },
          { name: "Repérer le délai de paiement", text: "Payer dans les 15 jours (30 en télépaiement) donne le montant minoré, par exemple 90 € au lieu de 135 € ; au-delà de 45 jours (60 en télépaiement), l'amende est majorée, par exemple 375 €. Pour un délit : 250 € sous 15 jours, 300 €, puis 600 € en cas de retard." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/simulateur-amende-exces-vitesse" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
