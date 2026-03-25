import type { Metadata } from "next";
import CalculateurNotaire from "./CalculateurNotaire";
import AdSlot from "../components/AdSlot";

export const metadata: Metadata = {
  title: "Calcul Frais de Notaire 2026 - Simulateur gratuit",
  description:
    "Estimez les frais de notaire pour votre achat immobilier en 2026. Ancien, neuf, terrain. Calcul detaille : droits de mutation, emoluments, debours.",
  keywords:
    "frais de notaire, calcul frais notaire, simulateur frais notaire, frais acquisition, droits mutation, achat immobilier 2026",
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
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Frais de Notaire 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez les frais de notaire pour votre achat immobilier. Ancien, neuf
        ou terrain.
      </p>

      <CalculateurNotaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment sont calcules les frais de notaire ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les &quot;frais de notaire&quot; designent l&apos;ensemble des sommes
          versees au notaire lors d&apos;un achat immobilier. Contrairement a ce
          que l&apos;on croit, le notaire ne garde qu&apos;une petite partie :
          la majorite va a l&apos;Etat sous forme de taxes.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Decomposition des frais
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~80%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Droits de mutation
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Taxes reversees a l&apos;Etat et au departement
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~10%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Emoluments du notaire
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Remuneration reglee par l&apos;Etat (bareme fixe)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~10%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Debours et formalites
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Frais avances par le notaire (cadastre, etc.)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Ancien vs Neuf
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Dans l&apos;<strong>ancien</strong>, les frais sont d&apos;environ{" "}
          <strong>7 a 8%</strong> du prix du bien. Dans le{" "}
          <strong>neuf</strong>, ils sont reduits a environ{" "}
          <strong>2 a 3%</strong> car les droits de mutation sont remplaces par
          la TVA (deja incluse dans le prix).
        </p>
      </section>

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
