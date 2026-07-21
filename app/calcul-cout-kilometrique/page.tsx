import type { Metadata } from "next";
import CalculateurCoutKm from "./CalculateurCoutKm";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-cout-kilometrique" },
  title: "Calcul Cout Kilometrique 2026 - Bareme Fiscal IK",
  description:
    "Calculez votre coût kilométrique avec le barème fiscal 2026. Indemnités km par puissance fiscale, distance, véhicule électrique (+20 %). Barème officiel.",
  keywords:
    "cout kilometrique, bareme kilometrique 2026, indemnite kilometrique, calcul IK, frais kilometriques, bareme fiscal voiture, cout km vehicule",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Comment utiliser le barème kilométrique ?",
    paras: [
      "Le barème se lit en croisant deux informations : la puissance fiscale de votre véhicule (en CV, indiquée sur la carte grise au repère P.6) et le nombre de kilomètres parcourus à titre professionnel dans l'année.",
      "On choisit la ligne correspondant aux CV et la colonne correspondant à la distance annuelle, puis on applique la formule, où « d » est la distance professionnelle en kilomètres.",
      "Exemple : pour un véhicule de 5 CV ayant parcouru 8 000 km professionnels, on utilise la colonne 5 001–20 000 km : 8 000 × 0,357 + 1 395 = 4 251 € d'indemnités déductibles.",
    ],
  },
  {
    title: "Ce que couvre (et ne couvre pas) le barème",
    paras: [
      "Le barème est forfaitaire : il intègre déjà le carburant, l'assurance, l'entretien et les réparations, les pneumatiques et la dépréciation du véhicule. Vous n'avez donc pas à additionner ces dépenses séparément.",
      "En revanche, certains frais ne sont pas couverts et restent déductibles en plus, sur justificatifs : les péages d'autoroute, les frais de stationnement (parking), et les intérêts d'emprunt si le véhicule a été acheté à crédit.",
    ],
  },
  {
    title: "Qui peut utiliser le barème kilométrique ?",
    paras: [
      "Les salariés qui choisissent de déduire leurs frais réels au lieu de l'abattement forfaitaire de 10 % peuvent l'utiliser pour leurs trajets domicile-travail et leurs déplacements professionnels.",
      "Les professionnels imposés dans la catégorie des bénéfices non commerciaux (BNC) peuvent aussi l'appliquer. À noter : la déduction forfaitaire de 10 % et les frais réels ne se cumulent pas, il faut choisir l'option la plus avantageuse.",
    ],
  },
  {
    title: "Voiture électrique : une majoration de 20 %",
    paras: [
      "Pour encourager les véhicules propres, le montant obtenu avec le barème est majoré de 20 % lorsque le véhicule est 100 % électrique. Notre calculateur applique automatiquement cette majoration si vous l'indiquez.",
      "Les barèmes évoluant chaque année avec la loi de finances, vérifiez toujours les coefficients en vigueur sur impots.gouv.fr avant votre déclaration.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment fonctionne le barème kilométrique ?",
    a: "Le barème kilométrique fiscal permet de déduire les frais de déplacement professionnel de ses impôts. Il prend en compte la puissance fiscale du véhicule et la distance annuelle parcourue. Il couvre le carburant, l'assurance, l'entretien et la dépréciation.",
  },
  {
    q: "Comment calculer ses indemnités kilométriques ?",
    a: "Repérez la ligne de votre puissance fiscale (CV) et la colonne de votre distance annuelle, puis appliquez la formule en remplaçant « d » par vos kilomètres professionnels. Exemple : 5 CV et 8 000 km donnent 8 000 × 0,357 + 1 395 = 4 251 €.",
  },
  {
    q: "Le barème couvre-t-il les péages et le parking ?",
    a: "Non. Le barème couvre le carburant, l'assurance, l'entretien et la dépréciation, mais pas les péages ni le stationnement. Ces frais peuvent être déduits en plus, sur justificatifs.",
  },
  {
    q: "Les véhicules électriques ont-ils un avantage ?",
    a: "Oui, les véhicules électriques bénéficient d'une majoration de 20 % sur le barème kilométrique. Cela encourage l'utilisation de véhicules propres pour les trajets professionnels.",
  },
  {
    q: "Faut-il des justificatifs pour les frais kilométriques ?",
    a: "Oui. En cas de contrôle, vous devez pouvoir justifier la réalité et le caractère professionnel des trajets : motif, destination, fréquence et distance. Conservez un relevé de vos déplacements et la carte grise du véhicule.",
  },
  {
    q: "Peut-on cumuler les indemnités kilométriques et les frais réels ?",
    a: "Les indemnités kilométriques font partie de la déduction des frais réels. Vous devez choisir entre la déduction forfaitaire (10 %) et les frais réels (incluant les IK). Les frais réels sont avantageux si vos dépenses dépassent 10 % de votre revenu imposable.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Cout Kilometrique" />
      <Breadcrumb currentPage="Cout Kilometrique" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🚙</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Cout Kilometrique 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez votre indemnite kilometrique avec le bareme fiscal officiel 2026.</p>
      <CalculateurCoutKm />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bareme kilometrique 2026 (voiture)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">CV fiscaux</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&le; 5 000 km</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">5 001-20 000</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">&gt; 20 000</th>
            </tr></thead>
            <tbody>
              {[
                { cv: "3 CV", a: "d x 0,529", b: "d x 0,316 + 1065", c: "d x 0,370" },
                { cv: "4 CV", a: "d x 0,606", b: "d x 0,340 + 1330", c: "d x 0,407" },
                { cv: "5 CV", a: "d x 0,636", b: "d x 0,357 + 1395", c: "d x 0,427" },
                { cv: "6 CV", a: "d x 0,665", b: "d x 0,374 + 1457", c: "d x 0,447" },
                { cv: "7+ CV", a: "d x 0,697", b: "d x 0,394 + 1515", c: "d x 0,470" },
              ].map((r) => (
                <tr key={r.cv} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-700">{r.cv}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600 text-xs">{r.a}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600 text-xs">{r.b}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600 text-xs">{r.c}</td>
                </tr>
              ))}
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

      <HowToJsonLd
        name="Calculer l'indemnité kilometrique avec le barème fiscal 2026"
        steps={[
          { name: "Relever la puissance fiscale sur la carte grise", text: "Consulter la carte grise du véhicule au repere P.6 pour obtenir les chevaux fiscaux (CV). Ce chiffre determine la ligne du barème parmi les tranches 3 CV, 4 CV, 5 CV, 6 CV ou 7 CV et plus." },
          { name: "Totaliser les kilomètres professionnels annuels", text: "Additionner tous les km parcourus à titre professionnel dans l'année (domicile-travail + deplacements pro). La tranche distance (inférieure à 5 000 km, 5 001 à 20 000 km ou supérieure à 20 000 km) fixe la formule." },
          { name: "Appliquer la formule du barème", text: "Exemple pour 5 CV et 8 000 km (tranche 5 001 à 20 000 km) : 8 000 x 0,357 + 1 395 = 4 251 EUR d'indemnités deductibles. Pour la tranche inférieure à 5 000 km : 8 000 x 0,636 = 5 088 EUR." },
          { name: "Majorer de 20% pour véhicule 100% électrique", text: "Si le véhicule est 100% électrique, multiplier le résultat du barème par 1,20. Cette majoration s'applique à toutes les tranches et puissances pour encourager les véhicules propres." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-cout-kilometrique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
