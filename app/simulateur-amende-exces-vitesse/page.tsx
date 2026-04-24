import type { Metadata } from "next";
import SimulateurAmende from "./SimulateurAmende";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-amende-exces-vitesse" },
  title: "Simulateur Amende Exces de Vitesse 2026 - Points et Suspension",
  description:
    "Calculez l'amende pour exces de vitesse 2026 : montant forfaitaire/minore/majore, points retires, suspension de permis. Bareme officiel Code de la route.",
  keywords:
    "amende exces vitesse, simulateur amende vitesse, bareme amende vitesse 2026, points permis, suspension permis, delit routier",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est l'amende pour 10 km/h au-dessus de la limite ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour un exces de vitesse inferieur a 20 km/h : en agglomeration (ville, zone 30, 50), amende forfaitaire 135 EUR (90 EUR minoree sous 15 jours, 375 EUR majoree), 1 point en moins. Hors agglomeration : amende 68 EUR (45 EUR minoree, 180 EUR majoree), 1 point en moins. L'infraction est une contravention de 4e (ville) ou 3e classe (route).",
      },
    },
    {
      "@type": "Question",
      name: "A partir de combien perd-on son permis pour exces de vitesse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La suspension de permis est possible a partir de 30 km/h au-dessus de la limite (retrait de 3 points + suspension jusqu'a 3 ans). A partir de 40 km/h, c'est 4 points retires avec suspension possible. Au-dela de 50 km/h, l'exces devient un DELIT : 1 500 EUR d'amende, 6 points retires, suspension OBLIGATOIRE de 3 ans, stage obligatoire, convocation au tribunal correctionnel, confiscation possible du vehicule en cas de recidive.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps pour payer une amende de radar automatique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "3 delais s'appliquent : amende MINOREE si paiement sous 15 jours (30 jours si paiement en ligne/telepaiement) — montant le plus bas ; amende FORFAITAIRE entre 15 et 45 jours — montant standard ; amende MAJOREE au-dela de 45 jours — montant le plus eleve (+177% de la forfaitaire). Exemple pour 135 EUR : 90 EUR minoree, 135 EUR forfaitaire, 375 EUR majoree.",
      },
    },
    {
      "@type": "Question",
      name: "Comment contester une amende d'exces de vitesse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour contester : envoyer une requete en exoneration dans les 45 jours via le site de l'ANTAI (antai.gouv.fr) ou par courrier recommande. Motifs valables : vehicule vendu avant l'infraction, usurpation de plaque, fausse identification du conducteur, photo non exploitable, vehicule de societe (designation du conducteur). La contestation suspend le paiement. Attention : une contestation rejetee peut entrainer une majoration.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Simulateur Amende Exces de Vitesse" description="Calcul amendes + points 2026" category="UtilitiesApplication" />
      <Breadcrumb currentPage="Simulateur Amende Exces de Vitesse" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur Amende Exces de Vitesse 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez l&apos;amende, les points retires et la suspension possible selon le depassement de vitesse.
      </p>

      <SimulateurAmende />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bareme des amendes 2026</h2>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-2 text-slate-500">Exces</th>
              <th className="text-right py-2 px-2 text-slate-500">Amende</th>
              <th className="text-right py-2 px-2 text-slate-500">Points</th>
              <th className="text-right py-2 px-2 text-slate-500">Suspension</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">&lt; 20 km/h (ville)</td><td className="py-2 px-2 text-right">135 EUR</td><td className="py-2 px-2 text-right">-1</td><td className="py-2 px-2 text-right">Non</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">&lt; 20 km/h (route)</td><td className="py-2 px-2 text-right">68 EUR</td><td className="py-2 px-2 text-right">-1</td><td className="py-2 px-2 text-right">Non</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">20 - 30 km/h</td><td className="py-2 px-2 text-right">135 EUR</td><td className="py-2 px-2 text-right">-2</td><td className="py-2 px-2 text-right">Non</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">30 - 40 km/h</td><td className="py-2 px-2 text-right">135 EUR</td><td className="py-2 px-2 text-right">-3</td><td className="py-2 px-2 text-right">Possible 3 ans</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">40 - 50 km/h</td><td className="py-2 px-2 text-right">135 EUR</td><td className="py-2 px-2 text-right">-4</td><td className="py-2 px-2 text-right">Possible 3 ans</td></tr>
            <tr className="border-b border-slate-100 bg-red-50"><td className="py-2 px-2 text-red-700 font-bold">&gt;= 50 km/h (DELIT)</td><td className="py-2 px-2 text-right text-red-700 font-bold">1 500 EUR</td><td className="py-2 px-2 text-right text-red-700 font-bold">-6</td><td className="py-2 px-2 text-right text-red-700 font-bold">OBLIGATOIRE 3 ans</td></tr>
          </tbody>
        </table>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les 3 montants d&apos;amende</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Minoree</strong> : paiement sous 15 jours (30 en ligne) — economie d&apos;environ 33%</li>
          <li><strong>Forfaitaire</strong> : paiement entre 15 et 45 jours — montant standard</li>
          <li><strong>Majoree</strong> : paiement apres 45 jours — x2,8 le montant forfaitaire</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Perdre des points : et apres ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le permis francais a <strong>12 points maximum</strong> (6 points en permis probatoire la 1ere annee).
          Quand le capital tombe a 0, le permis est <strong>invalide</strong> pour 6 mois, necessitant de repasser l&apos;examen.
          Recuperation : 1 point apres 6 mois sans infraction (exces &lt; 20 km/h), 2 ans sinon, 3 ans pour une infraction grave,
          ou via un <strong>stage de sensibilisation</strong> (4 points recuperes, max 1 fois/an, 150-250 EUR).
        </p>
      </section>

      <RelatedCalculators currentSlug="/simulateur-amende-exces-vitesse" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
