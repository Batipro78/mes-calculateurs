import type { Metadata } from "next";
import CalculateurTVA from "./CalculateurTVA";

export const metadata: Metadata = {
  title: "Calcul TVA 2026 - Convertisseur HT / TTC gratuit",
  description:
    "Calculez la TVA, le montant HT et TTC instantanement. Tous les taux francais : 20%, 10%, 5.5%, 2.1%. Outil gratuit et precis.",
  keywords:
    "calcul TVA, HT TTC, convertisseur TVA, taux TVA France, TVA 20%, TVA 10%, TVA 5.5%",
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
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul TVA &mdash; HT / TTC 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre HT et TTC avec tous les taux de TVA francais.
        Resultat instantane.
      </p>

      <CalculateurTVA />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les taux de TVA en France (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">20%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux normal
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Biens et services courants
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">10%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux intermediaire
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Restauration, transports, travaux
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">5,5%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux reduit
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Alimentation, energie, livres
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">2,1%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux super reduit
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Medicaments, presse, spectacles
            </p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment calculer la TVA ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>HT vers TTC :</strong> Montant TTC = Montant HT x (1 + taux
          TVA). Par exemple, pour 100 EUR HT avec une TVA a 20% : 100 x 1.20 =
          120 EUR TTC.
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>TTC vers HT :</strong> Montant HT = Montant TTC / (1 + taux
          TVA). Par exemple, pour 120 EUR TTC avec une TVA a 20% : 120 / 1.20 =
          100 EUR HT.
        </p>
      </section>
    </div>
  );
}
