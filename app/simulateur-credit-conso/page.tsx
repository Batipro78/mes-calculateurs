import type { Metadata } from "next";
import SimulateurCreditConso from "./SimulateurCreditConso";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-credit-conso" },
  title: "Simulateur Credit a la Consommation 2026 - Calcul gratuit",
  description:
    "Calculez votre credit conso : mensualites, cout total, tableau d'amortissement. Taux moyens 2026, taux d'usure, taux d'endettement. Auto, travaux, voyage.",
  keywords:
    "credit consommation, simulateur credit conso, calcul mensualite, pret personnel, taux credit conso 2026, tableau amortissement, taux endettement",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Credit Conso" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le taux moyen d'un credit conso en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En Q1 2026, les taux moyens TAEG pour un pret personnel sont : 3,9% sur 12 mois, 4,3% sur 36 mois, 4,7% sur 60 mois et 6% sur 84 mois. Ces taux varient selon la duree, le montant et votre profil emprunteur.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le taux d'usure pour un credit conso en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Au Q1 2026, les taux d'usure (maximum legal) sont : 23,56% pour les credits ≤ 3 000 €, 15,87% pour les credits de 3 001 a 6 000 €, et 8,67% pour les credits > 6 000 €. Un taux depassant ces seuils est illegal.",
                },
              },
              {
                "@type": "Question",
                name: "Quel taux d'endettement maximum pour un credit conso ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le taux d'endettement maximum recommande est de 33 a 35% de vos revenus nets mensuels. Au-dela, les banques refusent generalement le credit. Ce taux inclut tous vos credits en cours (immobilier, conso, etc.) et votre loyer.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer la mensualite d'un credit conso ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La formule est : Mensualite = Capital x (Taux mensuel x (1 + Taux mensuel)^n) / ((1 + Taux mensuel)^n - 1), ou n = nombre de mois et Taux mensuel = Taux annuel / 12. Exemple : 10 000 € a 4,5% sur 60 mois = 186,43 €/mois.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Credit Conso" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💳
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Credit a la Consommation 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos mensualites, le cout total et le tableau d&apos;amortissement
        de votre credit conso. Taux moyens actualises Q1 2026.
      </p>

      <SimulateurCreditConso />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Credit a la consommation : guide complet 2026
        </h2>
        <p>
          Le <strong>credit a la consommation</strong> permet de financer des projets
          personnels (voiture, travaux, voyage...) avec un montant de 200 a 75 000 €
          remboursable sur 3 mois a 7 ans. Depuis juillet 2025, les taux ont baisse
          grace a la politique monetaire de la BCE (taux directeur a 2,15%).
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-blue-800 mb-2">Formule de calcul</h3>
          <p className="text-blue-700 text-sm mb-3">
            <strong>Mensualite = Capital x [i x (1+i)^n] / [(1+i)^n - 1]</strong>
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li><strong>Capital</strong> : montant emprunte (200 a 75 000 €)</li>
            <li><strong>i</strong> : taux mensuel (taux annuel / 12)</li>
            <li><strong>n</strong> : nombre de mois (12 a 84)</li>
            <li><strong>Cout total</strong> = (Mensualite x n) - Capital + Assurance</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Taux moyens credit conso Q1 2026
        </h2>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Duree</th>
                <th className="text-center p-3 font-semibold text-slate-700">Taux moyen TAEG</th>
                <th className="text-center p-3 font-semibold text-slate-700">Mensualite pour 10 000 €</th>
              </tr>
            </thead>
            <tbody>
              {[
                { d: "12 mois (1 an)", t: "3,9%", m: "851,58 €" },
                { d: "24 mois (2 ans)", t: "4,1%", m: "434,69 €" },
                { d: "36 mois (3 ans)", t: "4,3%", m: "296,58 €" },
                { d: "48 mois (4 ans)", t: "4,5%", m: "227,63 €" },
                { d: "60 mois (5 ans)", t: "4,7%", m: "186,76 €" },
                { d: "72 mois (6 ans)", t: "5,2%", m: "161,38 €" },
                { d: "84 mois (7 ans)", t: "6,0%", m: "146,09 €" },
              ].map((row) => (
                <tr key={row.d} className="border-b border-slate-100">
                  <td className="p-3 text-slate-700">{row.d}</td>
                  <td className="p-3 text-center font-bold">{row.t}</td>
                  <td className="p-3 text-center">{row.m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Taux d&apos;usure 2026 : les plafonds legaux
        </h2>
        <p>
          Le <strong>taux d&apos;usure</strong> est le taux maximum legal qu&apos;une banque
          peut appliquer. Il est fixe chaque trimestre par la Banque de France :
        </p>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Montant du credit</th>
                <th className="text-center p-3 font-semibold text-slate-700">Taux d&apos;usure max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3">≤ 3 000 €</td>
                <td className="p-3 text-center font-bold text-red-600">23,56%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">3 001 a 6 000 €</td>
                <td className="p-3 text-center font-bold text-orange-600">15,87%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">&gt; 6 000 €</td>
                <td className="p-3 text-center font-bold text-green-600">8,67%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Taux d&apos;endettement : la regle des 35%
        </h2>
        <p>
          Les banques appliquent strictement la regle des <strong>35% d&apos;endettement maximum</strong>.
          Ce ratio inclut tous vos credits en cours (immobilier, conso) ainsi que votre loyer.
          Au-dela de 35%, votre demande sera tres probablement refusee.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-amber-800 mb-2">Formule du taux d&apos;endettement</h3>
          <p className="text-amber-700 text-sm">
            <strong>Endettement = (Tous les credits + Loyer) / Revenu net mensuel x 100</strong>
          </p>
          <p className="text-amber-600 text-xs mt-2">
            Exemple : 800 € de credits + 600 € de loyer = 1 400 € / 3 000 € de revenu = 46,7% → refuse
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Types de credit conso
        </h2>
        <ul>
          <li><strong>Pret personnel</strong> : somme libre d&apos;utilisation, taux fixe, le plus courant</li>
          <li><strong>Credit affecte</strong> : lie a un achat precis (auto, travaux), taux souvent plus bas</li>
          <li><strong>Credit renouvelable</strong> : reserve d&apos;argent reconstituable, taux tres eleve (12-22%) — a eviter</li>
          <li><strong>LOA / LLD</strong> : location avec ou sans option d&apos;achat, pour vehicules</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Assurance emprunteur
        </h2>
        <p>
          L&apos;assurance est <strong>facultative</strong> pour un credit conso (contrairement
          a l&apos;immobilier). Le taux moyen est de <strong>0,25% a 0,90%</strong> du capital par an
          selon votre age. Depuis 2026, vous pouvez changer d&apos;assurance a tout moment
          sans frais (resiliation infra-annuelle).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Nouveautes 2026
        </h2>
        <ul>
          <li>Taux directeur BCE stable a 2,15% → taux conso en baisse</li>
          <li>A partir du 20 novembre 2026 : plafond releve a <strong>100 000 €</strong></li>
          <li>Encadrement des mini-credits et du BNPL (&quot;Buy Now Pay Later&quot;)</li>
          <li>Resiliation assurance a tout moment sans frais</li>
        </ul>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/simulateur-credit-conso" />
    </div>
  );
}
