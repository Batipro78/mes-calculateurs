import type { Metadata } from "next";
import ConvertisseurPoids from "./ConvertisseurPoids";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/conversion-poids" },
  title: "Conversion kg en Livres (lbs) et Onces - Convertisseur Poids",
  description:
    "Convertissez entre kilogrammes, livres (lbs), onces (oz), grammes et stones. Tableau de correspondance et equivalences. Gratuit et instantane.",
  keywords:
    "conversion kg en livres, kg en lbs, livres en kg, conversion poids, onces en grammes, stones en kg, convertisseur poids, tableau conversion poids",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Conversion Poids" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de livres dans un kilogramme ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1 kilogramme = 2,20462 livres (lbs). Pour convertir des kg en livres, multipliez par 2,20462. Exemple : 70 kg = 154,32 lbs.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de kg dans une livre ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1 livre (lb) = 0,45359 kg. Pour convertir des livres en kg, multipliez par 0,45359. Exemple : 150 lbs = 68,04 kg.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre une livre et une once ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1 livre = 16 onces. La livre (pound/lb) est une unite de poids du systeme imperial. 1 once (oz) = 28,35 grammes.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Conversion Poids" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Conversion Poids (kg / livres / oz)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez instantanement entre kilogrammes, livres, onces, grammes et stones.
      </p>

      <ConvertisseurPoids />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment convertir les poids ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>kilogramme</strong> (kg) est l&apos;unite de masse du Systeme international, utilisee en France et dans la plupart du monde.
          La <strong>livre</strong> (pound/lb) est utilisee aux Etats-Unis et au Royaume-Uni. Le <strong>stone</strong> (14 livres) est courant au Royaume-Uni pour le poids corporel.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Equivalences cles</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">kg → livres</p>
            <p className="text-sm text-slate-600">Multipliez par 2,20462</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">livres → kg</p>
            <p className="text-sm text-slate-600">Multipliez par 0,45359</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">kg → onces</p>
            <p className="text-sm text-slate-600">Multipliez par 35,274</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">kg → stones</p>
            <p className="text-sm text-slate-600">Divisez par 6,350</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau de correspondance rapide</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">kg</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Livres (lbs)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Onces (oz)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Stones</th>
              </tr>
            </thead>
            <tbody>
              {[1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((kg) => (
                <tr key={kg} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-bold text-slate-700">{kg} kg</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-emerald-600">{(kg * 2.20462).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} lbs</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{(kg * 35.274).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} oz</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{(kg / 6.35029).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} st</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Astuce de calcul mental</h3>
        <p className="text-slate-600 leading-relaxed">
          Pour estimer rapidement des kg en livres : <strong>doublez le nombre et ajoutez 10%</strong>.
          Exemple : 70 kg &asymp; 70 &times; 2 + 7 = 147 lbs (valeur exacte : 154,3 lbs). Moins precis mais utile en voyage.
        </p>
      </section>

      <RelatedCalculators currentSlug="/conversion-poids" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
