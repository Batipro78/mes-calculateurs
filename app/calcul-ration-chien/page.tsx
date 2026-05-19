import type { Metadata } from "next";
import CalculRationChien from "./CalculRationChien";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-ration-chien" },
  title: "Calcul Ration Chien - BARF Croquettes Pâtée par Poids Gratuit",
  description:
    "Calculez la ration alimentaire journalière de votre chien selon la méthode (BARF, croquettes, pâtée), poids, âge et activité. Doses Royal Canin, répartition BARF 70/10/10/5/5.",
  keywords:
    "ration chien, barf chien, croquettes chien, dose croquettes chien, alimentation chien poids, ration journaliere chien, calories chien, pâtée chien, chien surpoids",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Ration Alimentaire Chien" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de grammes de croquettes par jour pour un chien ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La ration de croquettes dépend du poids, de l'activité et du stade de vie. Pour un chien adulte de 20 kg à activité normale, comptez environ 280 g/jour selon la table Royal Canin. Utilisez le calculateur ci-dessus en fonction de votre chien.",
                },
              },
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le régime BARF pour chiens ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "BARF (Biologically Appropriate Raw Food) est un régime à base d&apos;aliments crus : 70% viande, 10% os charnus, 10% légumes, 5% fruits, 5% suppléments. Pour un chien adulte sédentaire de 20 kg, cela correspond à environ 400 g de BARF par jour.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer la ration pour un chiot ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les chiots ont besoin de plus de calories (5% du poids corporel en BARF vs 2.5% pour un adulte). La fréquence des repas varie avec l&apos;âge : 4 repas jusqu&apos;à 4 mois, 3 repas de 4 à 6 mois, 2 repas après 6 mois. Utilisez le calculateur en sélectionnant l&apos;âge du chiot.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de repas par jour pour un chien ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les chiens adultes mangent généralement 2 repas par jour (petit-déjeuner et dîner). Les chiots : 4 repas (< 4 mois), 3 repas (4-6 mois), 2 repas (> 6 mois). Les chiens séniors : 2 repas adaptés à un métabolisme plus lent.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Ration Chien" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🐕
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Ration Chien
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la ration alimentaire journalière de votre chien selon la
        méthode : BARF, croquettes ou pâtée.
      </p>

      <CalculRationChien />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau Royal Canin - Ration croquettes adulte (activité normale)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-2 font-semibold text-slate-700">
                  Poids (kg)
                </th>
                <th className="text-right px-4 py-2 font-semibold text-slate-700">
                  Croquettes/jour (g)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { poids: 2, croquettes: 60 },
                { poids: 5, croquettes: 100 },
                { poids: 10, croquettes: 165 },
                { poids: 15, croquettes: 220 },
                { poids: 20, croquettes: 275 },
                { poids: 25, croquettes: 315 },
                { poids: 30, croquettes: 360 },
                { poids: 40, croquettes: 450 },
                { poids: 50, croquettes: 530 },
              ].map((row) => (
                <tr key={row.poids} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-700 font-medium">
                    {row.poids} kg
                  </td>
                  <td className="text-right px-4 py-3 text-slate-900 font-semibold">
                    {row.croquettes} g
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Source : Royal Canin. À ajuster selon métabolisme, condition physique et
          marque de croquettes (densité énergétique variable).
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Alimentation BARF pour chien - Répartition
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le régime <strong>BARF (Biologically Appropriate Raw Food)</strong> est une
          alimentation à base d&apos;aliments crus, inspirée du régime naturel des canidés
          sauvages. La répartition standard est :
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
          <li>
            <strong>70% viande</strong> : viande rouge, volaille, poisson (apport protéique)
          </li>
          <li>
            <strong>10% os charnus</strong> : os avec viande attachée pour calcium et
            phosphore
          </li>
          <li>
            <strong>10% légumes</strong> : carotte, courgette, brocoli, épinards (fibres)
          </li>
          <li>
            <strong>5% fruits</strong> : pomme, banane, pastèque (vitamines)
          </li>
          <li>
            <strong>5% suppléments</strong> : œuf, huile de poisson, levure de bière (oméga-3,
            santé peau)
          </li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          <strong>Exemple :</strong> Un chien de 20 kg en régime BARF (2.5% du poids) aura
          besoin de 500 g/jour : 350 g viande, 50 g os, 50 g légumes, 25 g fruits, 25 g
          suppléments.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Combien de repas par jour pour un chien ?
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-slate-700 mb-2">Chiot (0-12 mois)</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
              <li>0-2 mois : 4 repas/jour (allaitement naturel prioritaire)</li>
              <li>2-4 mois : 4 repas/jour</li>
              <li>4-6 mois : 3 repas/jour</li>
              <li>6-12 mois : 2 repas/jour (transition vers adulte)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-700 mb-2">Adulte (1-7 ans)</h3>
            <p className="text-slate-600 text-sm">
              <strong>2 repas/jour</strong> : petit-déjeuner et dîner, espacés de 12h.
              Certains chiens peuvent faire 1 repas/jour, mais 2 repas est recommandé.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-700 mb-2">Sénior (7+ ans)</h3>
            <p className="text-slate-600 text-sm">
              <strong>2 repas/jour</strong> de portions légèrement réduites (1.3-1.5 x métabolisme
              de base). Peut digérer moins bien → portions plus fréquentes aident.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Transition alimentaire progressive
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Tout changement d&apos;alimentation doit se faire progressivement sur 7-10 jours
          pour éviter troubles digestifs (diarrhée, vomissements) :
        </p>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="text-sm font-bold text-amber-700 min-w-fit">Jour 1-2</div>
            <p className="text-sm text-slate-600">75% ancienne nourriture + 25% nouvelle</p>
          </div>
          <div className="flex gap-4">
            <div className="text-sm font-bold text-amber-700 min-w-fit">Jour 3-4</div>
            <p className="text-sm text-slate-600">50% ancienne + 50% nouvelle</p>
          </div>
          <div className="flex gap-4">
            <div className="text-sm font-bold text-amber-700 min-w-fit">Jour 5-6</div>
            <p className="text-sm text-slate-600">25% ancienne + 75% nouvelle</p>
          </div>
          <div className="flex gap-4">
            <div className="text-sm font-bold text-amber-700 min-w-fit">Jour 7-10</div>
            <p className="text-sm text-slate-600">100% nouvelle nourriture</p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-amber-50 rounded-2xl border border-amber-200 p-8">
        <h3 className="font-bold text-amber-900 mb-3">⚠️ Disclaimer</h3>
        <p className="text-sm text-amber-800 leading-relaxed">
          Les quantités calculées sont <strong>indicatives</strong>. Chaque chien a un
          métabolisme unique. Ajustez les portions pour maintenir un poids stable et une
          condition physique idéale (côtes palpables, taille visible de dessus). En cas de
          maladie, gestation, allaitement ou condition particulière, <strong>consultez votre
          vétérinaire</strong> avant tout changement alimentaire.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-ration-chien" />
    </div>
  );
}
