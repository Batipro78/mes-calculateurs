import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateurs Auto & Vehicule Gratuits 2026 - Cout, Credit, Malus, Bonus",
  description: "Calculez le cout total de votre voiture, credit auto, malus ecologique, bonus ecologique, consommation essence, cout kilometrique. Simulateurs auto gratuits.",
  keywords: "simulateur auto, cout voiture, credit auto, malus ecologique, bonus ecologique, consommation essence, cout kilometrique, budget voiture 2026",
};

const calculateurs = [
  { slug: "/simulateur-cout-voiture", titre: "Cout Total Voiture", emoji: "🚗", desc: "Calculez le cout reel de possession d'une voiture : achat, assurance, entretien, carburant.", gradient: "from-blue-400 to-indigo-500" },
  { slug: "/simulateur-credit-auto", titre: "Credit Auto", emoji: "🚙", desc: "Simulez votre credit auto : mensualites, taux, duree et cout total du financement.", gradient: "from-indigo-400 to-purple-500" },
  { slug: "/calcul-malus-ecologique", titre: "Malus Ecologique 2026", emoji: "🚗", desc: "Calculez le montant du malus ecologique selon les emissions CO2 de votre vehicule.", gradient: "from-rose-400 to-red-500" },
  { slug: "/simulateur-bonus-ecologique", titre: "Bonus Ecologique Auto", emoji: "🚗", desc: "Estimez le bonus ecologique pour l'achat d'un vehicule electrique ou hybride.", gradient: "from-green-400 to-emerald-500" },
  { slug: "/calcul-consommation-essence", titre: "Consommation Essence", emoji: "⛽", desc: "Calculez votre consommation de carburant en L/100km et le cout de vos trajets.", gradient: "from-amber-400 to-orange-500" },
  { slug: "/calcul-cout-kilometrique", titre: "Cout Kilometrique", emoji: "🚙", desc: "Calculez le cout reel de vos trajets au kilometre, tous frais inclus.", gradient: "from-cyan-400 to-teal-500" },
  { slug: "/calcul-indemnites-kilometriques", titre: "Indemnites Kilometriques", emoji: "🚗", desc: "Calculez vos indemnites kilometriques selon le bareme fiscal 2026.", gradient: "from-teal-400 to-cyan-500" },
];

const faqData = [
  { question: "Comment calculer le cout reel d'une voiture ?", answer: "Le cout reel inclut : prix d'achat (ou mensualites de credit), assurance, carburant, entretien/revision, controle technique, stationnement, peages et depreciation. En moyenne, une voiture coute entre 5 000 et 10 000€ par an en France, soit 400 a 800€ par mois." },
  { question: "Quel est le malus ecologique en 2026 ?", answer: "En 2026, le malus ecologique s'applique a partir de 113 g/km de CO2. Le bareme est progressif : de quelques dizaines d'euros pour les faibles emissions jusqu'a 60 000€ pour les vehicules les plus polluants. Les vehicules electriques et hybrides rechargeables sont exoneres." },
  { question: "Comment calculer sa consommation d'essence ?", answer: "La formule est : (litres consommes / kilometres parcourus) x 100. Par exemple, si vous avez consomme 45 litres pour 600 km, votre consommation est de (45/600) x 100 = 7,5 L/100km. Faites le plein, notez le kilometrage, refaites le plein au prochain arret et appliquez la formule." },
  { question: "Le bonus ecologique est-il cumulable avec la prime a la conversion ?", answer: "Oui, le bonus ecologique est cumulable avec la prime a la conversion (anciennement prime a la casse). En 2026, le bonus peut atteindre 4 000€ pour un vehicule electrique neuf (sous conditions de revenus), et la prime a la conversion peut ajouter jusqu'a 6 000€ supplementaires." },
];

export default function SimulateursAuto() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Simulateurs Auto &amp; Vehicule Gratuits
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Cout de possession, credit auto, bonus et malus ecologique, consommation : tous les outils pour maitriser votre budget voiture.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {calculateurs.map((c) => (
          <a key={c.slug} href={c.slug} className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:-translate-y-1">
            <div className={`h-2 bg-gradient-to-r ${c.gradient}`} />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{c.emoji}</span>
                <h2 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{c.titre}</h2>
              </div>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <section className="prose prose-slate max-w-none mb-12">
        <h2>Maitrisez le budget de votre vehicule</h2>
        <p>Avant d'acheter, simulez le <a href="/simulateur-cout-voiture" className="text-blue-600 hover:underline">cout total de possession</a> et comparez avec un <a href="/simulateur-credit-auto" className="text-blue-600 hover:underline">credit auto</a>. Verifiez le <a href="/calcul-malus-ecologique" className="text-blue-600 hover:underline">malus ecologique</a> et decouvrez si vous etes eligible au <a href="/simulateur-bonus-ecologique" className="text-blue-600 hover:underline">bonus ecologique</a>.</p>
        <p>Pour vos frais professionnels, utilisez le <a href="/calcul-indemnites-kilometriques" className="text-blue-600 hover:underline">calcul des indemnites kilometriques</a> et declarez-les avec notre <a href="/simulateur-impot-revenu" className="text-blue-600 hover:underline">simulateur d'impot</a>.</p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance</a> — credit conso, epargne, impots</li>
          <li><a href="/simulateurs-emploi" className="text-blue-600 hover:underline">Simulateurs Emploi</a> — salaire, indemnites, frais reels</li>
          <li><a href="/convertisseurs" className="text-blue-600 hover:underline">Convertisseurs</a> — temperature, poids, longueur</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions frequentes</h2>
        <div className="space-y-4">
          {faqData.map((f, i) => (
            <details key={i} className="bg-white rounded-xl border border-slate-200 p-5 group">
              <summary className="font-semibold text-slate-800 cursor-pointer group-open:mb-3">{f.question}</summary>
              <p className="text-slate-600 text-sm">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
