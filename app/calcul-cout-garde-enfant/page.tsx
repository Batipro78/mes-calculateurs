import type { Metadata } from "next";
import SimulateurGardeEnfant from "./SimulateurGardeEnfant";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-cout-garde-enfant" },
  title: "Calcul Cout Garde Enfant 2026 - Creche, Nounou, Micro-creche",
  description:
    "Comparez le cout reel de la garde d'enfant : creche, assistante maternelle, garde a domicile, micro-creche. Aides CAF (CMG), credit d'impot 50%. Bareme 2026.",
  keywords:
    "cout garde enfant, tarif creche, assistante maternelle prix, garde a domicile cout, micro-creche tarif, CMG CAF, credit impot garde enfant, PAJE 2026",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Cout Garde Enfant" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien coute une creche en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le tarif d'une creche municipale varie de 0,50 € a 5,26 € par heure selon vos revenus et le nombre d'enfants a charge. Il est calcule avec un taux d'effort : 0,0619% des revenus annuels divise par 12 pour 1 enfant. Pour un foyer gagnant 36 000 €/an avec 1 enfant, le tarif est d'environ 1,86 €/h soit ~340 €/mois pour 40h/semaine.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le prix d'une assistante maternelle en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le tarif de reference d'une assistante maternelle est de 4,91 €/h en 2026 (minimum 3,79 €/h brut). Pour 40h/semaine, cela represente environ 850 €/mois avant aides. Avec le CMG (Complement de libre choix du Mode de Garde) et le credit d'impot 50%, le cout net peut descendre a 300-500 €/mois selon vos revenus.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles aides pour la garde d'enfant en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les principales aides sont : 1) Le CMG (jusqu'a 517 €/mois de prise en charge des cotisations pour enfant 0-3 ans), 2) Le credit d'impot de 50% (plafond 3 500 €/enfant/an hors domicile, soit 1 750 € max de credit), 3) La PAJE allocation de base (~198 €/mois sous conditions de revenus). Ces aides sont cumulables.",
                },
              },
              {
                "@type": "Question",
                name: "Quel mode de garde est le moins cher ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La creche municipale est generalement la moins chere grace au bareme CAF progressif (tarif selon revenus). Pour les revenus modestes, elle coute 50-150 €/mois. L'assistante maternelle est intermediaire (300-500 €/mois net apres aides). La garde a domicile est la plus chere (800-1 500 €/mois net) mais peut etre rentable si vous faites garder 2+ enfants simultanement.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Cout Garde Enfant" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👶
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Cout Garde Enfant 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Comparez le cout reel des 4 modes de garde : creche, assistante
        maternelle, garde a domicile et micro-creche. Aides CAF et credit
        d&apos;impot inclus.
      </p>

      <SimulateurGardeEnfant />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Combien coute la garde d&apos;enfant en 2026 ?
        </h2>
        <p>
          Le cout de la <strong>garde d&apos;enfant</strong> varie enormement selon le mode choisi,
          vos revenus et les aides dont vous beneficiez. En 2026, un foyer depense en moyenne
          entre <strong>150 € et 1 500 €/mois</strong> apres aides. Notre simulateur compare
          les 4 principaux modes pour trouver le plus adapte a votre budget.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Les 4 modes de garde compares
        </h2>

        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Mode</th>
                <th className="text-center p-3 font-semibold text-slate-700">Tarif horaire</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout brut/mois</th>
                <th className="text-center p-3 font-semibold text-slate-700">Aides</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">🏫 Creche municipale</td>
                <td className="p-3 text-center">0,50 - 5,26 €</td>
                <td className="p-3 text-center">90 - 950 €</td>
                <td className="p-3 text-center text-green-600">Tarif CAF + credit impot</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">👩‍🍼 Assistante maternelle</td>
                <td className="p-3 text-center">~4,91 €</td>
                <td className="p-3 text-center">~850 €</td>
                <td className="p-3 text-center text-green-600">CMG + credit impot</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">🏠 Garde a domicile</td>
                <td className="p-3 text-center">~18 € (charges incluses)</td>
                <td className="p-3 text-center">~2 200 €</td>
                <td className="p-3 text-center text-green-600">CMG + credit impot</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium">🧒 Micro-creche</td>
                <td className="p-3 text-center">8 - 9,50 €</td>
                <td className="p-3 text-center">~1 500 €</td>
                <td className="p-3 text-center text-green-600">CMG + credit impot</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Le bareme creche CAF 2026
        </h2>
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-pink-800 mb-2">Formule du tarif horaire</h3>
          <p className="text-pink-700 text-sm mb-3">
            <strong>Tarif/h = Taux d&apos;effort x Revenus annuels / 12</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-pink-700">
            <div>
              <strong>Taux d&apos;effort :</strong>
              <ul className="mt-1 space-y-1">
                <li>1 enfant : 0,0619%</li>
                <li>2 enfants : 0,0516%</li>
                <li>3 enfants : 0,0413%</li>
                <li>4+ enfants : 0,0310%</li>
              </ul>
            </div>
            <div>
              <strong>Limites :</strong>
              <ul className="mt-1 space-y-1">
                <li>Tarif min : 0,50 €/h</li>
                <li>Tarif max : 5,26 €/h</li>
                <li>Revenus plancher : 801 €/mois</li>
                <li>Revenus plafond : 8 500 €/mois</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Le CMG (Complement de libre choix du Mode de Garde)
        </h2>
        <p>
          Le <strong>CMG</strong> est verse par la CAF pour les parents qui font garder leur enfant
          par une assistante maternelle, une garde a domicile ou une micro-creche. Depuis la
          reforme de septembre 2025, le calcul est base sur les <strong>heures reellement effectuees</strong>.
        </p>
        <ul>
          <li><strong>Enfant 0-3 ans</strong> : jusqu&apos;a 517 €/mois de prise en charge des cotisations</li>
          <li><strong>Enfant 3-6 ans</strong> : montant reduit (environ 50%)</li>
          <li><strong>Pas de CMG en creche</strong> : le tarif CAF est deja subventionne</li>
          <li>Le montant depend de vos revenus (plus ils sont bas, plus l&apos;aide est elevee)</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Le credit d&apos;impot 50%
        </h2>
        <p>
          Tous les modes de garde ouvrent droit a un <strong>credit d&apos;impot de 50%</strong>
          des depenses engagees (apres deduction des aides CAF) :
        </p>
        <ul>
          <li><strong>Hors domicile</strong> (creche, assmat, micro-creche) : plafond 3 500 €/enfant/an → credit max <strong>1 750 €/enfant</strong></li>
          <li><strong>A domicile</strong> : plafond 12 000 €/an → credit max <strong>6 000 €</strong></li>
          <li>Condition : enfant de moins de 6 ans au 1er janvier</li>
          <li>C&apos;est un <strong>credit</strong> (pas une deduction) : rembourse meme si vous ne payez pas d&apos;impot</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Conseils pour reduire le cout
        </h2>
        <ul>
          <li><strong>Creche municipale</strong> : la moins chere pour les revenus modestes/moyens, mais places limitees</li>
          <li><strong>Garde partagee</strong> : une nounou a domicile pour 2 familles = cout divise par 2</li>
          <li><strong>Assistante maternelle</strong> : bon compromis qualite/prix avec le CMG</li>
          <li><strong>CESU prefinance</strong> : votre employeur peut vous en fournir (exonere d&apos;impot)</li>
          <li><strong>Cumulez les aides</strong> : CMG + credit impot + PAJE = economie maximale</li>
        </ul>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-cout-garde-enfant" />
    </div>
  );
}
