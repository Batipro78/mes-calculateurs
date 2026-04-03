import type { Metadata } from "next";
import CalculateurBudgetSurvie from "./CalculateurBudgetSurvie";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calculateur Budget Survie 2026 - Budget minimum pour vivre en France",
  description:
    "Calculez le budget minimum pour vivre en France en 2026. Logement, alimentation, transport par zone (Paris, grande ville, province, rural). Comparaison RSA, SMIC, seuil de pauvrete.",
  keywords:
    "budget minimum vivre france, cout de la vie france 2026, budget survie, combien pour vivre, budget mensuel minimum, RSA, SMIC, seuil pauvrete",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calculateur Budget Survie" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le budget minimum pour vivre seul en France en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le budget minimum pour vivre seul en France en 2026 varie de 900 EUR/mois en zone rurale a plus de 1 800 EUR/mois a Paris. En ville moyenne, comptez environ 1 100-1 200 EUR/mois (logement, alimentation, transport, energie, sante). Le RSA (647 EUR) ne couvre que la moitie de ce budget.",
                },
              },
              {
                "@type": "Question",
                name: "Le RSA suffit-il pour vivre ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non, le RSA de 647 EUR/mois pour une personne seule est largement insuffisant. Meme en zone rurale, le budget minimum est d'environ 900 EUR. Il manque au minimum 250 a 1 150 EUR selon la zone. Les aides complementaires (APL, CSS, prime d'activite) peuvent combler partiellement ce deficit.",
                },
              },
              {
                "@type": "Question",
                name: "Peut-on vivre avec le SMIC en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le SMIC net de 1 443 EUR/mois permet de couvrir le budget minimum en zone rurale et en ville moyenne pour une personne seule. A Paris ou en grande ville, c'est tres juste. Pour un couple ou une famille, le SMIC seul est insuffisant sans aides complementaires.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le seuil de pauvrete en France ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le seuil de pauvrete en France est d'environ 1 288 EUR/mois pour une personne seule (60% du revenu median). En 2023, 15,4% de la population (9,8 millions de personnes) vivait sous ce seuil. Ce montant couvre a peine le budget minimum en ville moyenne.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le poste de depense le plus important ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le logement est le poste le plus lourd : il represente 40 a 55% du budget total. A Paris, un studio coute en moyenne 1 050 EUR/mois. En zone rurale, comptez 380 EUR. L'alimentation arrive en 2eme position (15-25%), suivie du transport.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calculateur Budget Survie" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧮
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calculateur Budget Survie 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le budget minimum pour vivre en France selon votre zone, situation et mode de transport.
        Comparaison avec le RSA, le SMIC et le seuil de pauvrete.
      </p>

      <CalculateurBudgetSurvie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Combien faut-il pour vivre en France en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>budget minimum pour vivre en France</strong> depend enormement de la localisation geographique,
          de la composition du foyer et du mode de transport. En 2026, avec l&apos;inflation et la hausse des loyers,
          les ecarts se creusent entre Paris et la province.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Budget moyen par zone (personne seule)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-red-50/50">
                <th className="text-left py-3 px-3 text-slate-600 font-semibold">Zone</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Budget/mois</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Budget/an</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Dont loyer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Paris / IDF</td>
                <td className="py-2.5 px-3 text-right font-bold text-red-600">~1 800 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">~21 600 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-500">1 050 EUR (58%)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Grande ville</td>
                <td className="py-2.5 px-3 text-right font-bold text-orange-600">~1 250 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">~15 000 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-500">650 EUR (52%)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Ville moyenne</td>
                <td className="py-2.5 px-3 text-right font-bold text-amber-600">~1 080 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">~12 960 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-500">480 EUR (44%)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-700">Zone rurale</td>
                <td className="py-2.5 px-3 text-right font-bold text-emerald-600">~920 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">~11 040 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-500">380 EUR (41%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Revenus de reference en France 2026</h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">RSA (personne seule)</p>
            <p className="text-2xl font-extrabold text-red-800 mt-1">647 EUR</p>
            <p className="text-xs text-red-600 mt-1">Insuffisant partout en France</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Seuil de pauvrete</p>
            <p className="text-2xl font-extrabold text-amber-800 mt-1">1 288 EUR</p>
            <p className="text-xs text-amber-600 mt-1">15,4% de la population (9,8M)</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="font-semibold text-emerald-700 text-sm">SMIC net</p>
            <p className="text-2xl font-extrabold text-emerald-800 mt-1">1 443 EUR</p>
            <p className="text-xs text-emerald-600 mt-1">Suffisant en province (seul)</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Le logement : le poste qui ecrase tout</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le logement represente <strong>40 a 58%</strong> du budget minimum selon la zone. C&apos;est le facteur
          principal qui explique les ecarts de cout de la vie. A Paris, un studio coute en moyenne <strong>1 050 EUR/mois</strong>,
          contre <strong>380 EUR</strong> en zone rurale — presque 3 fois moins.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>aides au logement (APL/ALS)</strong> peuvent reduire ce poste de 100 a 300 EUR/mois selon
          les revenus et la zone. La <strong>CSS (Complementaire Sante Solidaire)</strong> peut supprimer le cout
          de la mutuelle pour les foyers modestes.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Aides pour reduire le budget</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">APL / ALS</p>
            <p className="text-xs text-blue-600 mt-1">100 a 300 EUR/mois selon la zone et les revenus. Reduisent directement le loyer.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Prime d&apos;activite</p>
            <p className="text-xs text-blue-600 mt-1">Jusqu&apos;a 595 EUR/mois pour les travailleurs a revenus modestes (au SMIC).</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">CSS (ex-CMU-C)</p>
            <p className="text-xs text-blue-600 mt-1">Mutuelle gratuite ou a 1 EUR/jour pour les foyers sous le plafond (~810 EUR/mois seul).</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Cheque energie</p>
            <p className="text-xs text-blue-600 mt-1">48 a 277 EUR/an selon les revenus pour payer les factures d&apos;energie.</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-8 mb-3">Questions frequentes</h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-slate-700">Comment reduire son budget alimentation ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Les banques alimentaires, le CCAS, les epiceries solidaires et les applis anti-gaspi (Too Good To Go)
              permettent de reduire ce poste de 30 a 50%. Cuisiner soi-meme revient en moyenne 2 a 3 fois moins cher que les plats prepares.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Vaut-il mieux une voiture ou les transports en commun ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              En ville, les transports en commun coutent 45 a 91 EUR/mois contre 200 a 300 EUR pour une voiture
              (carburant + assurance + entretien). En zone rurale, la voiture est souvent indispensable mais reste un
              poste de depense majeur. Le velo est l&apos;option la plus economique.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Ce budget inclut-il les loisirs ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Non, ce calculateur estime le <strong>budget minimum de survie</strong> : les depenses incompressibles
              pour se loger, se nourrir, se deplacer et se soigner. Les loisirs, vacances, sorties et epargne ne sont
              pas inclus. Pour un budget &quot;confortable&quot;, ajoutez 200 a 400 EUR/mois.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calculateur-budget-survie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
