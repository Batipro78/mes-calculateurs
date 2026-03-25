import type { Metadata } from "next";
import SimulateurPret from "./SimulateurPret";
import AdSlot from "../components/AdSlot";

export const metadata: Metadata = {
  title: "Simulateur Pret Immobilier 2026 - Calcul mensualite gratuit",
  description:
    "Simulez votre pret immobilier gratuitement. Calculez vos mensualites, le cout total du credit et le tableau d'amortissement. Taux 2026 mis a jour.",
  keywords:
    "simulateur pret immobilier, calcul mensualite, credit immobilier, taux pret, tableau amortissement, emprunt immobilier 2026",
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
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Pret Immobilier 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos mensualites, le cout total et visualisez votre tableau
        d&apos;amortissement.
      </p>

      <SimulateurPret />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne un pret immobilier ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un pret immobilier est un emprunt contracte aupres d&apos;une banque
          pour financer l&apos;achat d&apos;un bien immobilier. Vous remboursez
          chaque mois une <strong>mensualite</strong> composee d&apos;une part
          de <strong>capital</strong> et d&apos;une part
          d&apos;<strong>interets</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Taux moyens en 2026
        </h3>
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">10 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,10%</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">15 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,25%</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">20 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,40%</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">25 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,55%</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          La formule de calcul
        </h3>
        <p className="text-slate-600 leading-relaxed mb-2">
          La mensualite est calculee avec la formule d&apos;annuite constante :
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          Mensualite = Capital x (taux / 12) / (1 - (1 + taux / 12)^(-nb mois))
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Conseils pour votre emprunt
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>
            Votre taux d&apos;endettement ne doit pas depasser <strong>35%</strong> de
            vos revenus nets
          </li>
          <li>
            La duree maximale recommandee est de <strong>25 ans</strong>
          </li>
          <li>
            Un apport de <strong>10 a 20%</strong> du prix ameliore votre taux
          </li>
          <li>
            Comparez toujours le <strong>cout total du credit</strong>, pas
            seulement la mensualite
          </li>
        </ul>
      </section>

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
