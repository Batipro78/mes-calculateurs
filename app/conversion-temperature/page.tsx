import type { Metadata } from "next";
import ConvertisseurTemperature from "./ConvertisseurTemperature";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Conversion Celsius Fahrenheit Kelvin - Convertisseur Temperature",
  description:
    "Convertissez les temperatures entre Celsius, Fahrenheit et Kelvin. Formules, tableau de correspondance et reperes pratiques. Gratuit et instantane.",
  keywords:
    "conversion celsius fahrenheit, convertir temperature, celsius en fahrenheit, fahrenheit en celsius, kelvin celsius, convertisseur temperature, tableau conversion temperature",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Conversion Temperature" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment convertir des Celsius en Fahrenheit ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour convertir des Celsius en Fahrenheit, multipliez la temperature en Celsius par 9/5 (ou 1,8) puis ajoutez 32. Formule : \u00b0F = \u00b0C \u00d7 9/5 + 32. Exemple : 20\u00b0C = 20 \u00d7 1,8 + 32 = 68\u00b0F.",
                },
              },
              {
                "@type": "Question",
                name: "Comment convertir des Fahrenheit en Celsius ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour convertir des Fahrenheit en Celsius, soustrayez 32 puis multipliez par 5/9. Formule : \u00b0C = (\u00b0F \u2212 32) \u00d7 5/9. Exemple : 68\u00b0F = (68 \u2212 32) \u00d7 5/9 = 20\u00b0C.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle temperature est la meme en Celsius et Fahrenheit ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La temperature de \u221240 est identique dans les deux echelles : \u221240\u00b0C = \u221240\u00b0F. C'est le seul point de croisement des deux echelles.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Conversion Temperature" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Conversion Temperature
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez instantanement entre Celsius, Fahrenheit et Kelvin. Formules et reperes pratiques.
      </p>

      <ConvertisseurTemperature />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment convertir les temperatures ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les trois echelles de temperature les plus utilisees sont le <strong>Celsius</strong> (utilise en France et dans la plupart du monde),
          le <strong>Fahrenheit</strong> (utilise aux Etats-Unis) et le <strong>Kelvin</strong> (utilise en sciences).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Formules de conversion
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">Celsius → Fahrenheit</p>
            <p className="text-sm text-slate-600">&deg;F = &deg;C &times; 9/5 + 32</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">Fahrenheit → Celsius</p>
            <p className="text-sm text-slate-600">&deg;C = (&deg;F &minus; 32) &times; 5/9</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">Celsius → Kelvin</p>
            <p className="text-sm text-slate-600">K = &deg;C + 273,15</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">Kelvin → Celsius</p>
            <p className="text-sm text-slate-600">&deg;C = K &minus; 273,15</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Tableau de correspondance rapide
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Celsius (&deg;C)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Fahrenheit (&deg;F)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Kelvin (K)</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Repere</th>
              </tr>
            </thead>
            <tbody>
              {[
                { c: -40, f: -40, k: 233.15, r: "Point de croisement C/F" },
                { c: -18, f: 0, k: 255.15, r: "Zero Fahrenheit" },
                { c: 0, f: 32, k: 273.15, r: "Gel de l'eau" },
                { c: 10, f: 50, k: 283.15, r: "Frais" },
                { c: 20, f: 68, k: 293.15, r: "Temperature ambiante" },
                { c: 30, f: 86, k: 303.15, r: "Journee chaude" },
                { c: 37, f: 98.6, k: 310.15, r: "Corps humain" },
                { c: 100, f: 212, k: 373.15, r: "Ebullition de l'eau" },
              ].map((row) => (
                <tr key={row.c} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-bold text-slate-700">{row.c}&deg;C</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-blue-600">{row.f}&deg;F</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.k} K</td>
                  <td className="py-2.5 px-2 text-slate-500 text-xs">{row.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Astuce de calcul mental
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Pour une estimation rapide de Celsius vers Fahrenheit : <strong>doublez la valeur et ajoutez 30</strong>.
          Exemple : 20&deg;C &asymp; 20 &times; 2 + 30 = 70&deg;F (valeur exacte : 68&deg;F). Cette methode est precise a &plusmn;3&deg;F pour les temperatures courantes (0 a 40&deg;C).
        </p>
      </section>

      <RelatedCalculators currentSlug="/conversion-temperature" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
