import type { Metadata } from "next";
import CalculateurElectricite from "./CalculateurElectricite";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Calcul Consommation Electrique 2026 - Estimez votre facture",
  description:
    "Calculez la consommation electrique de vos appareils et estimez le cout sur votre facture. Mode multi-appareils, comparaison Base vs HP/HC. Tarif EDF 2026. Outil gratuit.",
  keywords:
    "calcul consommation electrique, cout electricite, facture EDF, consommation appareil, kWh prix, tarif electricite 2026, heures pleines heures creuses, HP HC",
};

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment calculer la consommation electrique d'un appareil ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La consommation se calcule avec la formule : Puissance (en watts) x Duree d'utilisation (en heures) / 1000 = Consommation en kWh. Pour obtenir le cout, multipliez les kWh par le prix du kWh (environ 0,2516 EUR en tarif EDF Base 2026)."
                }
              },
              {
                "@type": "Question",
                name: "Quel est le prix du kWh en France en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le tarif reglemente EDF (Tarif Bleu) est d'environ 0,2516 EUR/kWh en option Base pour les particuliers (6 kVA). En option Heures Pleines / Heures Creuses, le tarif est de 0,27 EUR/kWh en HP et 0,2068 EUR/kWh en HC."
                }
              },
              {
                "@type": "Question",
                name: "Quels sont les appareils qui consomment le plus d'electricite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les appareils les plus energivores sont la borne de recharge pour vehicule electrique (7400 W), le four electrique et la plaque a induction (2500 W), la climatisation (2000 W), le seche-cheveux et l'aspirateur (1800 W), et le radiateur electrique (1500 W). Le refrigerateur, bien que peu puissant (150 W), consomme beaucoup car il fonctionne 24h/24."
                }
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre l'option Base et l'option Heures Pleines / Heures Creuses ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'option Base propose un tarif unique (0,2516 EUR/kWh) quelle que soit l'heure. L'option HP/HC propose un tarif plus cher en Heures Pleines (0,27 EUR/kWh, environ 16h/jour) et moins cher en Heures Creuses (0,2068 EUR/kWh, environ 8h la nuit). L'option HP/HC est avantageuse si vous pouvez decaler vos usages (lave-linge, lave-vaisselle, chauffe-eau) sur les heures creuses."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Consommation Electrique" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Consommation Electrique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez combien vous coutent vos appareils electriques. Mode multi-appareils,
        comparaison Base vs HP/HC. Tarifs EDF 2026.
      </p>

      <CalculateurElectricite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer sa consommation electrique ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La consommation electrique d&apos;un appareil se calcule en
          multipliant sa <strong>puissance</strong> (en watts) par sa{" "}
          <strong>duree d&apos;utilisation</strong> (en heures). Le resultat est
          en <strong>Wh</strong> (watt-heures) ou <strong>kWh</strong>{" "}
          (kilowatt-heures).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule</h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          Consommation (kWh) = Puissance (W) x Heures / 1000
          <br />
          Cout = Consommation (kWh) x Prix du kWh
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Consommation typique des appareils
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Ampoule LED</span>
            <span className="text-sm font-bold text-slate-800">7-10 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Televiseur</span>
            <span className="text-sm font-bold text-slate-800">50-200 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">PC Gamer</span>
            <span className="text-sm font-bold text-slate-800">300-500 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Lave-linge</span>
            <span className="text-sm font-bold text-slate-800">500-2000 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Radiateur electrique</span>
            <span className="text-sm font-bold text-slate-800">1000-2500 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Plaque induction</span>
            <span className="text-sm font-bold text-slate-800">2000-3000 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Borne recharge VE</span>
            <span className="text-sm font-bold text-slate-800">3700-7400 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Pompe a chaleur</span>
            <span className="text-sm font-bold text-slate-800">1000-2000 W</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Option Base vs Heures Pleines / Heures Creuses
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          En France, EDF propose deux options tarifaires principales :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-3">
          <li>
            <strong>Option Base</strong> : tarif unique de{" "}
            <strong>0,2516 EUR/kWh</strong>, quelle que soit l&apos;heure de la journee.
          </li>
          <li>
            <strong>Option HP/HC</strong> : tarif plus eleve en Heures Pleines
            (<strong>0,27 EUR/kWh</strong>, ~16h/jour) et reduit en Heures Creuses
            (<strong>0,2068 EUR/kWh</strong>, ~8h la nuit).
          </li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          L&apos;option HP/HC est avantageuse si vous pouvez programmer vos appareils
          energivores (lave-linge, lave-vaisselle, chauffe-eau, borne de recharge VE)
          pendant les heures creuses, generalement entre 22h et 6h du matin.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-consommation-electrique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
