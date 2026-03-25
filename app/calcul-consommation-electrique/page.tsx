import type { Metadata } from "next";
import CalculateurElectricite from "./CalculateurElectricite";

export const metadata: Metadata = {
  title: "Calcul Consommation Electrique 2026 - Estimez votre facture",
  description:
    "Calculez la consommation electrique de vos appareils et estimez le cout sur votre facture. Puissance, duree, tarif EDF 2026. Outil gratuit.",
  keywords:
    "calcul consommation electrique, cout electricite, facture EDF, consommation appareil, kWh prix, tarif electricite 2026",
};

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <a
          href="/"
          className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
        >
          &larr; Tous les calculateurs
        </a>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Consommation Electrique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez combien vous coute un appareil electrique par jour, mois et an.
        Tarifs EDF 2026.
      </p>

      <CalculateurElectricite />

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
            <span className="text-sm text-slate-600">Ordinateur portable</span>
            <span className="text-sm font-bold text-slate-800">30-65 W</span>
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
            <span className="text-sm text-slate-600">Four electrique</span>
            <span className="text-sm font-bold text-slate-800">2000-3000 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Refrigerateur</span>
            <span className="text-sm font-bold text-slate-800">100-400 W</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Seche-cheveux</span>
            <span className="text-sm font-bold text-slate-800">1000-2200 W</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Prix du kWh en 2026
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Le tarif reglemente EDF (Tarif Bleu) est d&apos;environ{" "}
          <strong>0,2516 EUR/kWh</strong> en option Base pour les particuliers
          (6 kVA). Ce tarif est fixe par les pouvoirs publics et mis a jour
          regulierement.
        </p>
      </section>
    </div>
  );
}
