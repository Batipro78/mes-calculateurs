import type { Metadata } from "next";
import CalculateurJoursOuvres from "./CalculateurJoursOuvres";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-jours-ouvres" },
  title: "Calcul Jours Ouvres 2026 - Nombre de Jours Travailles",
  description:
    "Calculez le nombre de jours ouvres entre deux dates. Calendrier 2026 avec jours feries, week-ends. Par mois et par periode. Gratuit.",
  keywords:
    "calcul jours ouvres, jours ouvres 2026, nombre jours travailles, jours ouvres entre deux dates, calendrier jours ouvres, jours feries 2026, jours ouvrables",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Jours Ouvres" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de jours ouvres en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'annee 2026 compte environ 253 jours ouvres (lundi-vendredi hors jours feries). Ce nombre peut varier legerement selon les conventions collectives qui peuvent ajouter des jours feries locaux.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle difference entre jour ouvre et jour ouvrable ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un jour ouvre = lundi a vendredi (5 jours). Un jour ouvrable = lundi a samedi (6 jours). Les conges payes se comptent en jours ouvrables (30/an) ou ouvres (25/an). Les delais legaux utilisent souvent les jours ouvrables.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de jours feries en 2026 en France ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La France compte 11 jours feries legaux en 2026. Certains tombent un week-end et ne reduisent donc pas les jours ouvres.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Jours Ouvres" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📅
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Jours Ouvres 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comptez les jours ouvres entre deux dates ou par mois. Jours feries 2026 inclus.
      </p>

      <CalculateurJoursOuvres />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Jours ouvres en France</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>jours ouvres</strong> sont les jours normalement travailles : <strong>du lundi au vendredi</strong>,
          hors jours feries. Ils sont utilises pour le calcul des delais de preavis, les RTT, et la planification.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Les 11 jours feries 2026</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { d: "Jeudi 1er janvier", n: "Jour de l'an" },
            { d: "Lundi 6 avril", n: "Lundi de Paques" },
            { d: "Vendredi 1er mai", n: "Fete du travail" },
            { d: "Vendredi 8 mai", n: "Victoire 1945" },
            { d: "Jeudi 14 mai", n: "Ascension" },
            { d: "Lundi 25 mai", n: "Lundi de Pentecote" },
            { d: "Mardi 14 juillet", n: "Fete nationale" },
            { d: "Samedi 15 aout", n: "Assomption" },
            { d: "Dimanche 1er novembre", n: "Toussaint" },
            { d: "Mercredi 11 novembre", n: "Armistice" },
            { d: "Vendredi 25 decembre", n: "Noel" },
          ].map((jf) => (
            <div key={jf.n} className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
              <span className="text-sm text-slate-600">{jf.n}</span>
              <span className="text-xs text-slate-400">{jf.d}</span>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Ouvre vs Ouvrable vs Calendaire</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Type</th>
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Jours inclus</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Par semaine</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Par an (~)</th>
            </tr></thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-indigo-600">Ouvre</td>
                <td className="py-2.5 px-2 text-slate-600">Lun-Ven hors feries</td>
                <td className="py-2.5 px-2 text-right">5</td>
                <td className="py-2.5 px-2 text-right font-bold">~253</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-slate-700">Ouvrable</td>
                <td className="py-2.5 px-2 text-slate-600">Lun-Sam hors feries</td>
                <td className="py-2.5 px-2 text-right">6</td>
                <td className="py-2.5 px-2 text-right font-bold">~303</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-slate-700">Calendaire</td>
                <td className="py-2.5 px-2 text-slate-600">Tous les jours</td>
                <td className="py-2.5 px-2 text-right">7</td>
                <td className="py-2.5 px-2 text-right font-bold">365</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-jours-ouvres" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
