import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Calculateurs - Outils de calcul gratuits en ligne",
  description:
    "Calculateurs gratuits : salaire brut/net, TVA HT/TTC, pret immobilier, pourcentage et plus.",
};

const outils = [
  {
    titre: "Salaire Brut / Net",
    description:
      "Convertissez votre salaire brut en net et inversement. Cadre, non-cadre, fonction publique.",
    href: "/salaire-brut-net",
    icone: "💰",
    couleur: "from-blue-500 to-indigo-500",
    tag: "Populaire",
  },
  {
    titre: "Calcul TVA (HT / TTC)",
    description:
      "Calculez le montant HT, TTC et la TVA. Tous les taux : 20%, 10%, 5.5%, 2.1%.",
    href: "/calcul-tva",
    icone: "🧾",
    couleur: "from-emerald-500 to-teal-500",
    tag: "",
  },
  {
    titre: "Simulateur Pret Immobilier",
    description:
      "Calculez vos mensualites, le cout total et le tableau d'amortissement de votre credit.",
    href: "/simulateur-pret-immobilier",
    icone: "🏠",
    couleur: "from-violet-500 to-purple-500",
    tag: "",
  },
  {
    titre: "Calcul Pourcentage",
    description:
      "Pourcentage d'un nombre, augmentation, reduction, part en %. 4 modes de calcul.",
    href: "/calcul-pourcentage",
    icone: "📊",
    couleur: "from-orange-500 to-amber-500",
    tag: "",
  },
  {
    titre: "Calcul IMC",
    description:
      "Calculez votre Indice de Masse Corporelle. Interpretation OMS, poids ideal et jauge visuelle.",
    href: "/calcul-imc",
    icone: "⚖️",
    couleur: "from-rose-500 to-pink-500",
    tag: "",
  },
  {
    titre: "Frais de Notaire",
    description:
      "Estimez les frais de notaire pour votre achat immobilier. Ancien, neuf ou terrain. Detail complet.",
    href: "/frais-de-notaire",
    icone: "📋",
    couleur: "from-cyan-500 to-blue-500",
    tag: "",
  },
  {
    titre: "Consommation Electrique",
    description:
      "Calculez le cout de vos appareils electriques. 12 appareils predefinis, tarif EDF 2026.",
    href: "/calcul-consommation-electrique",
    icone: "⚡",
    couleur: "from-yellow-500 to-orange-500",
    tag: "",
  },
  {
    titre: "Calcul Age Exact",
    description:
      "Calculez votre age exact en annees, mois et jours. Jours vecus, prochain anniversaire, signe astro.",
    href: "/calcul-age",
    icone: "🎂",
    couleur: "from-pink-500 to-rose-500",
    tag: "",
  },
  {
    titre: "Indemnite Licenciement",
    description:
      "Calculez votre indemnite legale de licenciement ou rupture conventionnelle. Bareme 2026.",
    href: "/indemnite-licenciement",
    icone: "📄",
    couleur: "from-indigo-500 to-purple-500",
    tag: "Nouveau",
  },
];

const prochainement = [
  { titre: "Convertisseur Devises", icone: "💱" },
  { titre: "Calcul Surface Peinture", icone: "🎨" },
  { titre: "Simulateur Epargne", icone: "🏦" },
  { titre: "Calcul Heures de Travail", icone: "⏰" },
];

export default function Home() {
  return (
    <div>
      <section className="text-center mb-12">
        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
          100% gratuit &middot; Sans inscription
        </div>
        <h1 className="text-4xl font-extrabold mb-3 text-slate-800">
          Calculateurs en ligne
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Des outils simples et rapides pour vos calculs du quotidien. Resultats
          instantanes, aucune inscription requise.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {outils.map((outil) => (
          <a
            key={outil.href}
            href={outil.href}
            className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
          >
            {outil.tag && (
              <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
                {outil.tag}
              </span>
            )}
            <div
              className={`w-12 h-12 bg-gradient-to-br ${outil.couleur} rounded-xl flex items-center justify-center text-2xl shadow-sm`}
            >
              {outil.icone}
            </div>
            <h2 className="text-lg font-bold mt-4 text-slate-800 group-hover:text-blue-600 transition-colors">
              {outil.titre}
            </h2>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              {outil.description}
            </p>
            <div className="mt-4 text-sm font-medium text-blue-600 flex items-center gap-1">
              Calculer
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Prochainement
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {prochainement.map((item) => (
            <div
              key={item.titre}
              className="flex items-center gap-3 bg-white/60 border border-slate-200 rounded-xl px-4 py-3 opacity-60"
            >
              <span className="text-xl">{item.icone}</span>
              <span className="text-sm text-slate-500">{item.titre}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
