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
  {
    titre: "Convertisseur Devises",
    description:
      "Convertissez entre 14 devises : Euro, Dollar, Livre, Dirham, Dinar, Franc CFA et plus.",
    href: "/convertisseur-devises",
    icone: "💱",
    couleur: "from-sky-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Surface Peinture",
    description:
      "Calculez la surface a peindre, la quantite de peinture et le budget. Murs, plafond, ouvertures.",
    href: "/calcul-surface-peinture",
    icone: "🎨",
    couleur: "from-fuchsia-500 to-pink-500",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Epargne",
    description:
      "Simulez votre epargne : Livret A, LEP, assurance-vie. Interets composes et evolution annuelle.",
    href: "/simulateur-epargne",
    icone: "🏦",
    couleur: "from-emerald-500 to-green-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Heures de Travail",
    description:
      "Comptez vos heures de travail, planning semaine, heures supplementaires et estimation de salaire.",
    href: "/calcul-heures-travail",
    icone: "⏰",
    couleur: "from-amber-500 to-orange-500",
    tag: "Nouveau",
  },
  {
    titre: "Indemnites Kilometriques",
    description:
      "Calculez vos indemnites kilometriques avec le bareme fiscal 2026. Voiture, moto, velo, vehicule electrique.",
    href: "/calcul-indemnites-kilometriques",
    icone: "🚗",
    couleur: "from-teal-500 to-cyan-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Impot Revenu",
    description:
      "Estimez votre impot 2026 : tranches, quotient familial, decote, taux marginal et moyen. Bareme officiel.",
    href: "/simulateur-impot-revenu",
    icone: "🏛️",
    couleur: "from-red-500 to-rose-600",
    tag: "Nouveau",
  },
  {
    titre: "Date d'Accouchement",
    description:
      "Calculez votre DPA, semaines d'amenorrhee, trimestre et dates cles. 3 methodes de calcul.",
    href: "/calcul-date-accouchement",
    icone: "🤰",
    couleur: "from-purple-500 to-pink-500",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur DCA",
    description:
      "Simulez un investissement passe sur le S&P 500, CAC 40 ou Bitcoin. Combien auriez-vous gagne ?",
    href: "/simulateur-dca",
    icone: "📈",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Calculateur Inflation",
    description:
      "Combien devriez-vous gagner aujourd'hui pour vivre comme avant ? Le voleur silencieux de votre argent.",
    href: "/calculateur-inflation",
    icone: "📉",
    couleur: "from-red-500 to-orange-500",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Calories (TDEE)",
    description:
      "Calculez vos besoins caloriques journaliers, metabolisme de base, objectifs perte/prise de poids et macronutriments.",
    href: "/calcul-calories",
    icone: "🔥",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Chomage (ARE)",
    description:
      "Estimez votre allocation chomage : montant journalier, mensuel, duree d'indemnisation, degressivite. Bareme 2026.",
    href: "/simulateur-chomage",
    icone: "📋",
    couleur: "from-sky-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Micro-Entreprise",
    description:
      "Calculez vos charges URSSAF, impot et revenu net en auto-entrepreneur. ACRE, versement liberatoire, 5 activites.",
    href: "/simulateur-micro-entreprise",
    icone: "🏢",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Taux d'Endettement",
    description:
      "Calculez votre taux d'endettement, reste a vivre et capacite d'emprunt. Seuil 33%, regles HCSF, conseils.",
    href: "/calcul-taux-endettement",
    icone: "🏦",
    couleur: "from-blue-500 to-indigo-500",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Ovulation",
    description:
      "Calculez votre date d'ovulation et votre fenetre de fertilite. Calendrier fertile, prochaines regles, conseils conception.",
    href: "/calcul-ovulation",
    icone: "🌸",
    couleur: "from-pink-500 to-rose-500",
    tag: "Nouveau",
  },
  {
    titre: "Suis-je Mobilisable ?",
    description:
      "Testez si vous seriez mobilise en cas de guerre en France. Age, sante, experience, profession : votre categorie de mobilisation.",
    href: "/simulateur-mobilisation",
    icone: "🪖",
    couleur: "from-slate-700 to-slate-900",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Bombe Nucleaire",
    description:
      "Visualisez l'impact d'une bombe nucleaire sur une carte. Zones de souffle, radiation, brulures. De Hiroshima a la Tsar Bomba.",
    href: "/simulateur-bombe-nucleaire",
    icone: "☢️",
    couleur: "from-red-600 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Prime d'Activite",
    description:
      "Estimez votre prime d'activite CAF. Montant forfaitaire, bonification, forfait logement. Seul, en couple, avec enfants. Bareme 2026.",
    href: "/calcul-prime-activite",
    icone: "💰",
    couleur: "from-emerald-500 to-teal-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Retraite",
    description:
      "Estimez votre pension de retraite : base + complementaire AGIRC-ARRCO. Reforme 2023, decote, surcote, age legal par generation.",
    href: "/simulateur-retraite",
    icone: "🏖️",
    couleur: "from-teal-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Budget Bunker",
    description:
      "Calculez le budget pour un bunker : taille, autonomie, provisions, equipements. De 1 a 20 personnes, 2 semaines a 2 ans.",
    href: "/simulateur-bunker",
    icone: "🛡️",
    couleur: "from-amber-600 to-orange-700",
    tag: "Nouveau",
  },
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

    </div>
  );
}
