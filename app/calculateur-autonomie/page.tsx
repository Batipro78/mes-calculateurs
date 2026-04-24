import type { Metadata } from "next";
import CalculateurAutonomie from "./CalculateurAutonomie";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calculateur-autonomie" },
  title: "Calculateur Autonomie Financiere 2026 - Combien de temps avec mon epargne ?",
  description:
    "Calculez combien de temps vous pouvez vivre avec votre epargne. Budget minimum par zone, situation et revenus complementaires. Duree d'autonomie en mois et jours.",
  keywords:
    "autonomie financiere, combien de temps avec mon epargne, calculateur autonomie, vivre sans travailler, duree epargne, budget survie autonomie, independance financiere",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calculateur Autonomie Financiere" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de temps puis-je vivre avec 10 000 EUR d'epargne ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Avec 10 000 EUR d'epargne et un budget minimum de survie, vous pouvez tenir entre 5 mois (a Paris, seul) et 11 mois (en zone rurale). Ce calcul depend de votre zone, situation familiale et mode de transport. Les aides sociales (RSA, APL) peuvent allonger significativement cette duree.",
                },
              },
              {
                "@type": "Question",
                name: "Combien faut-il pour vivre 1 an sans travailler ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour vivre 1 an sans revenu en France, il faut entre 11 000 EUR (zone rurale, seul, budget minimum) et 24 000 EUR (Paris, seul). En couple, comptez 15 000 a 33 000 EUR. Ces montants correspondent au strict minimum (loyer, alimentation, charges). Ajoutez 20-30% pour un budget plus confortable.",
                },
              },
              {
                "@type": "Question",
                name: "Les aides sociales sont-elles incluses dans le calcul ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le calculateur permet d'ajouter des revenus complementaires (RSA, ARE, APL, freelance, etc.) qui reduisent le budget a financer par l'epargne. Sans revenu, seule l'epargne est utilisee. Avec le RSA (647 EUR/mois), l'autonomie peut etre doublee voire triplee.",
                },
              },
              {
                "@type": "Question",
                name: "Comment allonger sa duree d'autonomie ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour etirer votre epargne : 1) Demenagez en zone moins chere (rural = -50% vs Paris). 2) Utilisez les transports en commun ou le velo. 3) Demandez les aides (RSA, APL, CSS). 4) Reduisez l'alimentation (epiceries solidaires, cuisine maison). 5) Sous-louez une chambre ou passez en colocation.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calculateur Autonomie" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⏳
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calculateur d&apos;Autonomie Financiere 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Combien de temps pouvez-vous tenir avec votre epargne ? Estimez votre duree d&apos;autonomie
        selon votre capital, zone de vie et revenus complementaires.
      </p>

      <CalculateurAutonomie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Combien de temps peut-on vivre sans travailler ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Que ce soit entre deux emplois, en reconversion professionnelle, apres un licenciement ou pour
          un projet personnel, connaitre sa <strong>duree d&apos;autonomie financiere</strong> est essentiel.
          Ce calculateur croise votre epargne avec le <strong>budget minimum de survie</strong> en France
          pour estimer combien de mois vous pouvez tenir.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Epargne necessaire pour 1 an (personne seule)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-amber-50/50">
                <th className="text-left py-3 px-3 text-slate-600 font-semibold">Zone</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Budget/mois</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Pour 6 mois</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Pour 1 an</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Pour 2 ans</th>
              </tr>
            </thead>
            <tbody>
              {[
                { zone: "Paris / IDF", budget: 1800 },
                { zone: "Grande ville", budget: 1250 },
                { zone: "Ville moyenne", budget: 1080 },
                { zone: "Zone rurale", budget: 920 },
              ].map((row) => (
                <tr key={row.zone} className="border-b border-slate-100">
                  <td className="py-2.5 px-3 font-medium text-slate-700">{row.zone}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">~{row.budget.toLocaleString("fr-FR")} EUR</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{(row.budget * 6).toLocaleString("fr-FR")} EUR</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-700">{(row.budget * 12).toLocaleString("fr-FR")} EUR</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{(row.budget * 24).toLocaleString("fr-FR")} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Situations courantes</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Entre deux emplois</p>
            <p className="text-xs text-amber-600 mt-1">
              Prevoyez 3 a 6 mois de budget minimum. Avec l&apos;ARE (chomage), votre epargne dure 2 a 3 fois plus longtemps.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Reconversion / formation</p>
            <p className="text-xs text-amber-600 mt-1">
              Budget 6 a 18 mois. Verifiez vos droits CPF, AREF (ARE en formation), et les aides regionales.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Creation d&apos;entreprise</p>
            <p className="text-xs text-amber-600 mt-1">
              Prevoyez 12 a 24 mois sans revenu. L&apos;ACRE et le maintien de l&apos;ARE sont possibles en parallele.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Annee sabbatique</p>
            <p className="text-xs text-amber-600 mt-1">
              Budget 12 mois minimum. En France : 11 000-24 000 EUR. A l&apos;etranger (Asie du Sud-Est) : 6 000-10 000 EUR.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Astuces pour etirer son epargne</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li><strong>Demenager en zone moins chere</strong> : rural = -50% de loyer vs Paris</li>
          <li><strong>Colocation / sous-location</strong> : divise le loyer par 2</li>
          <li><strong>Transport doux</strong> : velo = quasi gratuit vs 250 EUR/mois en voiture</li>
          <li><strong>Aides sociales</strong> : RSA (647 EUR) + APL (jusqu&apos;a 300 EUR) = 950 EUR de revenus sans emploi</li>
          <li><strong>Alimentation solidaire</strong> : banque alimentaire, Too Good To Go, epiceries sociales</li>
          <li><strong>Micro-revenus</strong> : freelance, petits boulots, vente d&apos;objets, location Airbnb d&apos;une chambre</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-8 mb-3">Questions frequentes</h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-slate-700">Faut-il un fonds d&apos;urgence ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Oui, les experts recommandent <strong>3 a 6 mois de depenses</strong> en epargne de precaution.
              C&apos;est le minimum pour absorber un imprevivu (perte d&apos;emploi, panne, sante) sans s&apos;endetter.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">L&apos;inflation est-elle prise en compte ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ce calcul est base sur les prix 2026. Pour une autonomie de plus d&apos;un an, ajoutez 2 a 3% par an
              pour l&apos;inflation. Sur 2 ans, cela represente environ 5% de budget supplementaire.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calculateur-autonomie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
