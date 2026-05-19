import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
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
    titre: "Masse Grasse",
    description:
      "Calculez votre taux de masse grasse avec la methode US Navy. Masse grasse, masse maigre, categorie.",
    href: "/calcul-masse-grasse",
    icone: "🏋️",
    couleur: "from-violet-500 to-purple-500",
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
    titre: "Calcul Poids Ideal",
    description:
      "Calculez votre poids ideal avec les formules de Lorentz, Devine et Creff. Fourchette de poids sain, comparaison homme/femme.",
    href: "/calcul-poids-ideal",
    icone: "⚖️",
    couleur: "from-violet-500 to-purple-600",
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
    titre: "Simulateur Pension Alimentaire",
    description:
      "Calculez la pension alimentaire avec le bareme officiel du Ministere de la Justice. Garde classique, alternee ou reduite. 1 a 6 enfants.",
    href: "/simulateur-pension-alimentaire",
    icone: "👨‍👧",
    couleur: "from-indigo-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Bonus Ecologique Auto",
    description:
      "Calculez votre bonus ecologique 2026 pour l'achat d'une voiture electrique. Bareme officiel selon vos revenus. Surbonus batterie europeenne. Jusqu'a 7 700 €.",
    href: "/simulateur-bonus-ecologique",
    icone: "🚗",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Cout Garde Enfant",
    description:
      "Comparez le cout reel : creche, assistante maternelle, garde a domicile, micro-creche. Aides CAF (CMG), credit d'impot 50%. Bareme 2026.",
    href: "/calcul-cout-garde-enfant",
    icone: "👶",
    couleur: "from-pink-500 to-rose-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Credit Conso",
    description:
      "Calculez votre credit conso : mensualites, cout total, tableau d'amortissement. Taux 2026 actualises. Auto, travaux, voyage.",
    href: "/simulateur-credit-conso",
    icone: "💳",
    couleur: "from-blue-500 to-indigo-600",
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
  {
    titre: "Simulateur Salaire Alternant",
    description:
      "Calculez votre salaire en apprentissage ou professionnalisation. Grilles officielles 2026, brut/net, selon age et annee de contrat.",
    href: "/simulateur-salaire-alternant",
    icone: "🎓",
    couleur: "from-indigo-500 to-purple-500",
    tag: "Nouveau",
  },
  {
    titre: "Calculateur Budget Survie",
    description:
      "Estimez le budget minimum pour vivre en France. Par zone (Paris, grande ville, province, rural), situation et transport. Comparaison RSA, SMIC.",
    href: "/calculateur-budget-survie",
    icone: "🧮",
    couleur: "from-red-500 to-orange-500",
    tag: "Nouveau",
  },
  {
    titre: "Calculateur Autonomie Financiere",
    description:
      "Combien de temps pouvez-vous vivre avec votre epargne ? Duree d'autonomie par zone, situation et revenus complementaires (RSA, ARE).",
    href: "/calculateur-autonomie",
    icone: "⏳",
    couleur: "from-amber-500 to-red-500",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Blackout",
    description:
      "Etes-vous pret pour une coupure d'electricite ? Score d'autonomie, vulnerabilites et budget d'equipement par niveau.",
    href: "/simulateur-blackout",
    icone: "🔦",
    couleur: "from-slate-700 to-slate-900",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Facture Gaz",
    description:
      "Estimez votre facture de gaz naturel : cuisson, eau chaude, chauffage. Tarifs GRDF Q1 2026 par zone. Comparaison fournisseurs.",
    href: "/simulateur-facture-gaz",
    icone: "🔥",
    couleur: "from-orange-500 to-red-500",
    tag: "Nouveau",
  },
  {
    titre: "Capacite d'Emprunt",
    description:
      "Combien pouvez-vous emprunter ? Simulateur selon vos revenus, charges et la duree souhaitee. Regles HCSF 2026.",
    href: "/calcul-capacite-emprunt",
    icone: "🏠",
    couleur: "from-blue-600 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Prix Macon 2026",
    description:
      "Estimez le prix d'un macon : mur parpaings, dalle beton, terrasse, facade, demolition. Tarifs par region, fournitures + main d'oeuvre.",
    href: "/prix-macon",
    icone: "🧱",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Prix Peintre 2026",
    description:
      "Estimez le prix d'un peintre : murs, plafond, facade, boiseries, papier peint. Tarifs par region, fournitures + main d'oeuvre.",
    href: "/prix-peintre",
    icone: "🎨",
    couleur: "from-violet-500 to-purple-600",
    tag: "",
  },
  {
    titre: "Prix Electricien 2026",
    description:
      "Estimez le prix d'un electricien : prises, tableau, renovation, VMC, borne IRVE, volets. Tarifs par region.",
    href: "/prix-electricien",
    icone: "⚡",
    couleur: "from-blue-500 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Prix Plombier 2026",
    description:
      "Estimez le prix d'un plombier : robinet, WC, chauffe-eau, douche, debouchage, chaudiere, salle de bain. Tarifs par region.",
    href: "/prix-plombier",
    icone: "🔧",
    couleur: "from-cyan-500 to-teal-600",
    tag: "",
  },
  {
    titre: "Prix Couvreur 2026",
    description:
      "Estimez le prix d'un couvreur : reparation, renovation toiture, demoussage, isolation sarking, Velux, gouttiere, charpente. Tarifs par region.",
    href: "/prix-couvreur",
    icone: "🪜",
    couleur: "from-red-700 to-amber-600",
    tag: "",
  },
  {
    titre: "Prix Chauffagiste 2026",
    description:
      "Estimez le prix d'un chauffagiste : chaudiere gaz, pompe a chaleur, chauffe-eau, plancher chauffant, radiateur, entretien, depannage. Tarifs par region.",
    href: "/prix-chauffagiste",
    icone: "🔥",
    couleur: "from-orange-600 to-red-500",
    tag: "Nouveau",
  },
  {
    titre: "Conversion Temperature",
    description:
      "Convertissez entre Celsius, Fahrenheit et Kelvin. Formules, tableau de correspondance et reperes pratiques.",
    href: "/conversion-temperature",
    icone: "🌡️",
    couleur: "from-blue-500 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Conversion Poids (kg/lbs)",
    description:
      "Convertissez entre kilogrammes, livres, onces, grammes et stones. Tableau et equivalences.",
    href: "/conversion-poids",
    icone: "⚖️",
    couleur: "from-emerald-500 to-teal-600",
    tag: "Nouveau",
  },
  {
    titre: "Pension de Reversion",
    description:
      "Calculez votre pension de reversion : regime general (54%) et AGIRC-ARRCO (60%). Plafond de ressources, age minimum.",
    href: "/calcul-pension-reversion",
    icone: "💜",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Surface Cercle",
    description:
      "Calculez la surface, le perimetre et le diametre d'un cercle. A partir du rayon, diametre ou perimetre.",
    href: "/calcul-surface-cercle",
    icone: "⭕",
    couleur: "from-blue-500 to-cyan-600",
    tag: "Nouveau",
  },
  {
    titre: "Volume Cylindre",
    description:
      "Calculez le volume d'un cylindre. Rayon, hauteur, surface laterale, conversion en litres.",
    href: "/calcul-volume-cylindre",
    icone: "🛢️",
    couleur: "from-teal-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Racine Carree",
    description:
      "Calculez la racine carree de n'importe quel nombre. Carres parfaits, racine cubique, verification.",
    href: "/calcul-racine-carree",
    icone: "√",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Ascendant Astrologique",
    description:
      "Decouvrez votre signe, ascendant et personnalite. Date et heure de naissance, qualites, defauts, element.",
    href: "/calcul-ascendant-astrologique",
    icone: "♈",
    couleur: "from-purple-500 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Gratification Stage 2026",
    description:
      "Calculez votre gratification de stage : montant mensuel, total, minimum legal. Obligatoire ou facultatif.",
    href: "/calcul-gratification-stage",
    icone: "🎓",
    couleur: "from-indigo-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Droits de Succession",
    description:
      "Calculez les droits de succession. Bareme par lien de parente, abattements, exoneration conjoint.",
    href: "/calcul-droits-succession",
    icone: "⚖️",
    couleur: "from-slate-700 to-slate-900",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Cout Total Voiture 2026",
    description:
      "Calculez le vrai cout de votre voiture : carburant, assurance, entretien, depreciation, CT. Thermique vs electrique.",
    href: "/simulateur-cout-voiture",
    icone: "🚗",
    couleur: "from-blue-600 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Cout Kilometrique 2026",
    description:
      "Calculez votre indemnite kilometrique avec le bareme fiscal 2026. Puissance fiscale, electrique +20%.",
    href: "/calcul-cout-kilometrique",
    icone: "🚙",
    couleur: "from-sky-500 to-blue-600",
    tag: "",
  },
  {
    titre: "Verificateur de Devis 2026",
    description:
      "Deposez votre devis — l'IA verifie les 16 mentions obligatoires. Conformite legale en quelques secondes.",
    href: "/verificateur-devis",
    icone: "📋",
    couleur: "from-blue-600 to-indigo-700",
    tag: "Nouveau",
  },
  {
    titre: "Interet Compose",
    description:
      "Calculez les interets composes. Capital initial, versements mensuels, taux, duree. Tableau d'evolution annuel.",
    href: "/calcul-interet-compose",
    icone: "📈",
    couleur: "from-cyan-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Malus Ecologique 2026",
    description:
      "Calculez le malus ecologique de votre vehicule. Malus CO2 et malus au poids. Bareme officiel 2026.",
    href: "/calcul-malus-ecologique",
    icone: "🚗",
    couleur: "from-rose-500 to-red-600",
    tag: "Nouveau",
  },
  {
    titre: "PGCD / PPCM",
    description:
      "Calculez le PGCD et le PPCM de deux nombres. Algorithme d'Euclide detaille et facteurs premiers.",
    href: "/calcul-pgcd-ppcm",
    icone: "🔢",
    couleur: "from-purple-500 to-violet-600",
    tag: "Nouveau",
  },
  {
    titre: "Duree Entre Deux Dates",
    description:
      "Calculez la duree entre deux dates en jours, semaines, mois. Jours ouvres et compte a rebours.",
    href: "/calcul-duree-entre-dates",
    icone: "📆",
    couleur: "from-fuchsia-500 to-pink-600",
    tag: "Nouveau",
  },
  {
    titre: "Plus-Value Immobiliere",
    description:
      "Calculez la plus-value immobiliere et l'impot. Abattements par duree de detention, IR 19%, PS 17,2%. Bareme 2026.",
    href: "/calcul-plus-value-immobiliere",
    icone: "🏡",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Rentabilite Locative",
    description:
      "Calculez la rentabilite brute et nette de votre investissement locatif. Charges, taxe fonciere, vacance.",
    href: "/calcul-rentabilite-locative",
    icone: "🏢",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Revenus Fonciers",
    description:
      "Simulez l'imposition de vos loyers. Comparez micro-foncier (30%) vs regime reel, deficit foncier, TMI 2026.",
    href: "/calcul-revenus-fonciers",
    icone: "🏘️",
    couleur: "from-indigo-500 to-violet-600",
    tag: "Nouveau",
  },
  {
    titre: "Consommation Essence",
    description:
      "Calculez le cout de votre trajet en carburant. Distance, consommation, prix du litre. Cout au km.",
    href: "/calcul-consommation-essence",
    icone: "⛽",
    couleur: "from-red-500 to-rose-600",
    tag: "Nouveau",
  },
  {
    titre: "Jours Ouvres 2026",
    description:
      "Comptez les jours ouvres entre deux dates. Calendrier 2026 complet avec jours feries.",
    href: "/calcul-jours-ouvres",
    icone: "📅",
    couleur: "from-indigo-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Moyenne",
    description:
      "Calculez votre moyenne ponderee avec coefficients. Baremes /20, /10, /100. Notes scolaires, bac, examens.",
    href: "/calcul-moyenne",
    icone: "🎓",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Produit en Croix",
    description:
      "Calculez un produit en croix (regle de trois). Trouvez la 4e valeur proportionnelle. Formule et exemples.",
    href: "/produit-en-croix",
    icone: "✖️",
    couleur: "from-sky-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Conges Payes",
    description:
      "Calculez vos jours de conges acquis et votre indemnite. Methode 1/10e vs maintien, temps partiel. Bareme 2026.",
    href: "/calcul-conges-payes",
    icone: "🏖️",
    couleur: "from-teal-500 to-cyan-600",
    tag: "Nouveau",
  },
  {
    titre: "Conversion Longueur (cm/pouces)",
    description:
      "Convertissez entre centimetres, pouces, pieds, metres et millimetres. Tailles, ecrans et bricolage.",
    href: "/conversion-longueur",
    icone: "📏",
    couleur: "from-orange-500 to-amber-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Metabolisme de Base (BMR)",
    description:
      "Calculez votre metabolisme de base avec Mifflin-St Jeor et Harris-Benedict. TDEE par niveau d'activite.",
    href: "/calcul-metabolisme-base",
    icone: "🔥",
    couleur: "from-orange-500 to-red-500",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Proteines par Jour",
    description:
      "Estimez vos besoins en proteines selon votre poids, activite et objectif. Sources alimentaires et repartition.",
    href: "/calcul-proteines",
    icone: "🥩",
    couleur: "from-red-500 to-rose-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Besoin Sommeil",
    description:
      "Calculez vos heures de sommeil ideales selon votre age et activite. Cycles de 90 min, heure de coucher et reveil optimaux.",
    href: "/calcul-besoin-sommeil",
    icone: "🌙",
    couleur: "from-indigo-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Macros Nutrition",
    description:
      "Repartition proteines, glucides et lipides selon vos calories et objectif. 5 profils : maintien, perte, prise, seche, cetogene.",
    href: "/calcul-macros",
    icone: "🥗",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Consommation Eau",
    description:
      "Calculez votre besoin en eau quotidien selon votre poids, activite physique et climat. Repartition optimale sur la journee.",
    href: "/calcul-consommation-eau",
    icone: "💧",
    couleur: "from-blue-500 to-cyan-500",
    tag: "Nouveau",
  },
  {
    titre: "Indice Glycemique des Aliments",
    description:
      "Tableau IG et charge glycemique de plus de 40 aliments. Comparez fruits, feculents, cereales. Outil indispensable pour diabetiques et sportifs.",
    href: "/calcul-indice-glycemique",
    icone: "🌿",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Age Metabolique",
    description:
      "Estimez votre age biologique vs votre age reel. BMR, activite, tour de taille, habitudes de vie.",
    href: "/calcul-age-metabolique",
    icone: "🧬",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Risque Cardiovasculaire",
    description:
      "Evaluez votre risque cardiaque a 10 ans (score Framingham). Cholesterol, tension, tabac, diabete.",
    href: "/calcul-risque-cardiovasculaire",
    icone: "❤️",
    couleur: "from-red-600 to-rose-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur DPE 2026",
    description:
      "Estimez la classe energetique de votre logement (A a G). Consommation kWh/m²/an, emissions CO2, cout annuel et economies possibles selon le chauffage et l'isolation.",
    href: "/calculateur-dpe",
    icone: "🏠",
    couleur: "from-emerald-500 to-green-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Credit Auto 2026",
    description:
      "Calculez vos mensualites de credit auto. Taux moyens 2026, 8 vehicules predefinis, tableau d'amortissement.",
    href: "/simulateur-credit-auto",
    icone: "🚙",
    couleur: "from-blue-500 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Score Stress",
    description:
      "Evaluez votre niveau de stress avec le test PSS-10. 10 questions, score sur 40, interpretation et conseils personnalises.",
    href: "/calcul-score-stress",
    icone: "🧠",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Electrique vs Thermique",
    description:
      "Comparez le cout total d'une voiture electrique vs thermique. Achat, carburant, entretien, depreciation sur 1 a 10 ans.",
    href: "/simulateur-electrique-vs-thermique",
    icone: "⚡",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Vignette Crit'Air",
    description:
      "Determinez votre vignette Crit'Air selon votre vehicule, carburant et date d'immatriculation. Restrictions ZFE incluses.",
    href: "/calcul-vignette-critair",
    icone: "🚗",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Remboursement Mutuelle",
    description:
      "Calculez le remboursement Securite Sociale + mutuelle. 10 types d'actes, 3 niveaux de garantie, reste a charge.",
    href: "/calcul-remboursement-mutuelle",
    icone: "🏥",
    couleur: "from-cyan-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Allocation Familiale CAF",
    description:
      "Estimez vos allocations familiales, complement familial et ARS. Baremes CAF 2026 selon vos revenus.",
    href: "/calcul-allocation-familiale",
    icone: "👨‍👩‍👧‍👦",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Taxe Fonciere",
    description:
      "Estimez votre taxe fonciere selon la surface, le type de bien et la ville. Taux communaux 2026 des grandes villes.",
    href: "/calcul-taxe-fonciere",
    icone: "🏠",
    couleur: "from-amber-500 to-yellow-600",
    tag: "",
  },
  {
    titre: "Assurance Emprunteur",
    description:
      "Calculez le cout de votre assurance de pret et l'economie avec la delegation (loi Lemoine 2022).",
    href: "/simulateur-assurance-emprunteur",
    icone: "🛡",
    couleur: "from-indigo-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Rendement SCPI",
    description:
      "Simulez le rendement net de votre investissement en SCPI. TDVM, frais d'entree, fiscalite revenus fonciers.",
    href: "/simulateur-rendement-scpi",
    icone: "🏢",
    couleur: "from-teal-500 to-cyan-600",
    tag: "Nouveau",
  },
  {
    titre: "Rente Viagere",
    description:
      "Convertissez votre capital en rente viagere a vie. Taux de conversion selon age, fiscalite abattement.",
    href: "/simulateur-rente-viagere",
    icone: "🏦",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul IFI",
    description:
      "Impot sur la Fortune Immobiliere 2026. Bareme officiel, abattement residence principale 30%, decote.",
    href: "/calcul-ifi",
    icone: "🏛",
    couleur: "from-rose-500 to-pink-600",
    tag: "",
  },
  {
    titre: "Simulateur IS",
    description:
      "Calculez l'Impot sur les Societes 2026. Taux reduit PME 15% jusqu'a 42 500 EUR, taux normal 25%.",
    href: "/simulateur-impot-societe",
    icone: "🏦",
    couleur: "from-blue-500 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Amende Exces de Vitesse",
    description:
      "Amende, points et suspension selon depassement. Bareme officiel Code de la route 2026.",
    href: "/simulateur-amende-exces-vitesse",
    icone: "🚨",
    couleur: "from-red-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "LOA vs LLD",
    description:
      "Comparez Location avec Option d'Achat vs Location Longue Duree : cout total, rachat, avantages.",
    href: "/simulateur-loa-lld",
    icone: "🚘",
    couleur: "from-sky-500 to-blue-600",
    tag: "",
  },
  {
    titre: "Indice Inflammation Alimentaire",
    description:
      "Evaluez le score inflammatoire de votre alimentation (DII). Questionnaire + recommandations.",
    href: "/calcul-indice-inflammation",
    icone: "🥗",
    couleur: "from-emerald-500 to-red-500",
    tag: "Nouveau",
  },
  {
    titre: "Prestation Compensatoire Divorce",
    description:
      "Estimez le montant de la prestation compensatoire en cas de divorce. 3 methodes (Depondt, moyenne, esperance).",
    href: "/calcul-prestation-compensatoire",
    icone: "⚖️",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Prise de Poids Grossesse",
    description:
      "Evaluez votre prise de poids pendant la grossesse selon votre IMC. Recommandations IOM officielles.",
    href: "/calcul-prise-poids-grossesse",
    icone: "🤰",
    couleur: "from-pink-500 to-rose-600",
    tag: "",
  },
  {
    titre: "Amortissement LMNP",
    description:
      "Calculez l'amortissement LMNP regime reel et l'economie fiscale vs micro-BIC. Bien + mobilier.",
    href: "/calcul-amortissement-lmnp",
    icone: "🏠",
    couleur: "from-teal-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Dividendes",
    description:
      "Fiscalite dividendes 2026 : PFU (flat tax 30%) vs bareme progressif avec abattement 40%.",
    href: "/simulateur-dividendes",
    icone: "💎",
    couleur: "from-violet-500 to-purple-600",
    tag: "Nouveau",
  },
  {
    titre: "Calculateur Gain Pari Sportif",
    description:
      "Calcul mathematique du gain potentiel selon la cote (decimale/fractionnelle/americaine). Outil neutre.",
    href: "/calculateur-gain-pari",
    icone: "🎯",
    couleur: "from-slate-700 to-slate-900",
    tag: "Nouveau",
  },
  {
    titre: "Calculateur Pari Combine",
    description:
      "Cote totale = produit des cotes. Calcul gain combine 2 a 10 selections. Probabilite implicite.",
    href: "/calculateur-pari-combine",
    icone: "🔗",
    couleur: "from-indigo-600 to-purple-700",
    tag: "Nouveau",
  },
  {
    titre: "Convertisseur Cote / Probabilite",
    description:
      "Conversion entre cotes decimales, fractionnelles, americaines et probabilites implicites. Marge bookmaker.",
    href: "/convertisseur-cote-probabilite",
    icone: "📊",
    couleur: "from-teal-600 to-cyan-700",
    tag: "Nouveau",
  },
  {
    titre: "Convertisseur Sensibilite FPS",
    description:
      "Conversion sensibilite souris entre CS2, Valorant, Apex, Fortnite, Overwatch, R6. Calcul eDPI et cm/360°.",
    href: "/convertisseur-sensibilite-fps",
    icone: "🎯",
    couleur: "from-teal-600 to-cyan-700",
    tag: "Nouveau",
  },
  {
    titre: "Convertisseur Allure Course",
    description:
      "Allure min/km ↔ km/h ↔ min/mile. Prediction temps sur 5km, 10km, semi-marathon et marathon.",
    href: "/convertisseur-allure-course",
    icone: "🏃",
    couleur: "from-emerald-600 to-teal-700",
    tag: "Nouveau",
  },
  {
    titre: "Calcul FFMI Musculation",
    description:
      "Indice de masse maigre normalise (formule Kouri). Niveau musculaire et limite naturelle.",
    href: "/calcul-ffmi",
    icone: "💪",
    couleur: "from-violet-600 to-purple-700",
    tag: "Nouveau",
  },
  {
    titre: "Convertisseur Monnaie Jeu",
    description:
      "V-bucks, RP LoL, Apex coins, Robux, COD Points, FIFA Points en euros. Taux officiels.",
    href: "/convertisseur-monnaie-jeu",
    icone: "🎮",
    couleur: "from-fuchsia-600 to-pink-700",
    tag: "Nouveau",
  },
  {
    titre: "Calcul VMA Running",
    description:
      "Test Cooper / demi-Cooper, zones cardiaques Karvonen, allures cibles 65-110% VMA.",
    href: "/calcul-vma",
    icone: "🏃",
    couleur: "from-emerald-600 to-teal-700",
    tag: "Nouveau",
  },
  {
    titre: "Calcul 1RM Musculation",
    description:
      "5 formules (Brzycki, Epley, Lander, Lombardi, O'Connor) + tableau % de 1RM par reps.",
    href: "/calcul-1rm",
    icone: "🏋️",
    couleur: "from-violet-600 to-purple-700",
    tag: "Nouveau",
  },
  {
    titre: "Calories Brulees par Sport",
    description:
      "Formule METs : 40+ sports (course, velo, natation, foot, muscu, yoga, HIIT...).",
    href: "/calcul-calories-sport",
    icone: "🔥",
    couleur: "from-orange-500 to-red-500",
    tag: "Nouveau",
  },
  {
    titre: "Convertisseur FOV Jeux",
    description:
      "HFOV ↔ VFOV + conversion entre ratios 4:3, 16:9, 16:10, 21:9, 32:9. FOV par jeu (CS2, Valorant, Apex).",
    href: "/calcul-fov-jeu",
    icone: "🎯",
    couleur: "from-teal-600 to-cyan-700",
    tag: "Nouveau",
  },
  {
    titre: "Temps de Telechargement",
    description:
      "Mb/s en Mo/s, presets jeux (CoD 220Go, Cyberpunk 70Go, Fortnite 30Go) et FAI (ADSL/Fibre).",
    href: "/calcul-temps-telechargement",
    icone: "⬇️",
    couleur: "from-cyan-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Zakat al-Mal",
    description:
      "Aumone legale annuelle 2,5% sur patrimoine. Nisab or/argent au choix, ecoles hanafite et majoritaire. Conforme ECFR/CFCM.",
    href: "/calcul-zakat",
    icone: "🕋",
    couleur: "from-emerald-600 to-green-700",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Zakat al-Fitr 2026",
    description:
      "Aumone fin Ramadan par personne du foyer. Montants officiels Mosquee de Paris (7€) et CFCM (9€).",
    href: "/calcul-zakat-al-fitr",
    icone: "📿",
    couleur: "from-emerald-600 to-green-700",
    tag: "Nouveau",
  },
  {
    titre: "Convertisseur Hijri Gregorien",
    description:
      "Date musulmane vers gregorienne et inverse. Methodes TIC et Umm al-Qura. Calcul age en annees lunaires.",
    href: "/convertisseur-calendrier-hijri",
    icone: "🌙",
    couleur: "from-teal-600 to-emerald-700",
    tag: "Nouveau",
  },
  {
    titre: "Date Ramadan 2026 + Aid",
    description:
      "Date debut Ramadan 18 fevrier 2026, Aid al-Fitr 20 mars, Aid al-Adha 27 mai. Calendrier 2026-2030.",
    href: "/calcul-date-ramadan",
    icone: "☪️",
    couleur: "from-emerald-600 to-teal-700",
    tag: "Nouveau",
  },
  {
    titre: "Date Paques 2026",
    description:
      "Calcul Paques catholique (Meeus) et orthodoxe + Cendres, Ascension, Pentecote, toutes les fetes mobiles.",
    href: "/calcul-date-paques",
    icone: "🕊️",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Signe Astrologique Chinois",
    description:
      "12 animaux et 5 elements (Bois, Feu, Terre, Metal, Eau). Cycle 60 ans, ajustement Nouvel An lunaire.",
    href: "/signe-astrologique-chinois",
    icone: "🐉",
    couleur: "from-rose-600 to-red-700",
    tag: "Nouveau",
  },
  {
    titre: "Calendrier Fetes Catholiques",
    description:
      "Toutes les fetes : Paques, Toussaint, Assomption, Ascension, Pentecote, Avent. Mobiles et fixes.",
    href: "/calcul-fetes-catholiques",
    icone: "⛪",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul Kaffara Ramadan",
    description:
      "Compensation jeune rompu : 60 repas/jour (Kaffara) ou 1 repas/jour manque (Fidya). Sources Secours Islamique.",
    href: "/calcul-kaffara-ramadan",
    icone: "🕌",
    couleur: "from-emerald-600 to-green-700",
    tag: "Nouveau",
  },
  {
    titre: "Convertisseur Calendrier Hebraique",
    description:
      "Date hebraique vers gregorienne. 12 mois + Adar II. Cycle Meton 19 ans. Calcul age hebraique.",
    href: "/convertisseur-calendrier-hebraique",
    icone: "✡️",
    couleur: "from-blue-600 to-indigo-700",
    tag: "Nouveau",
  },
  {
    titre: "Date Bar / Bat Mitzvah",
    description:
      "Calcul date Bar Mitzvah (garcon 13 ans hebreu) ou Bat Mitzvah (fille 12 ans hebreu). Consensus rabbinique.",
    href: "/calcul-date-bar-mitzvah",
    icone: "📜",
    couleur: "from-blue-600 to-indigo-700",
    tag: "Nouveau",
  },
  {
    titre: "Calcul FTP Cyclisme",
    description:
      "Test 20 min, W/kg, VAM, tableau niveau cycliste (Pass'Cyclisme, Cat 1-3 FFC, Pro). Sources Coggan.",
    href: "/calcul-ftp-cyclisme",
    icone: "🚴",
    couleur: "from-orange-500 to-red-600",
    tag: "Nouveau",
  },
  {
    titre: "Handicap Golf WHS",
    description:
      "Index officiel FFGolf 2026 : 8 meilleurs differentiels sur 20 cartes. Handicap de jeu. WHS officiel.",
    href: "/calcul-handicap-golf-whs",
    icone: "⛳",
    couleur: "from-green-600 to-emerald-700",
    tag: "Nouveau",
  },
  {
    titre: "Allure Natation + SWOLF",
    description:
      "Allure min/100m, prediction 200m a 3800m (Ironman). SWOLF par niveau. Triathlon FR.",
    href: "/calcul-allure-natation",
    icone: "🏊",
    couleur: "from-cyan-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Classement Tennis FFT",
    description:
      "Estimer son nouveau classement FFT (NC a -30). Bilan V-E-2I-5G. 1 million de licencies FFT.",
    href: "/calcul-classement-tennis-fft",
    icone: "🎾",
    couleur: "from-yellow-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "WtHR Rapport Taille / Tour de Taille",
    description:
      "Alternative a l'IMC, mesure la graisse viscerale. Regle d'or OMS = 0.5. Sources NHS UK 2022, Harvard.",
    href: "/calcul-rapport-taille-tour-de-taille",
    icone: "❤️",
    couleur: "from-rose-500 to-pink-600",
    tag: "Nouveau",
  },
  {
    titre: "Age Chien en Annees Humaines",
    description:
      "Formule AVMA officielle + etude Wang 2019 (ADN). Conversion par taille du chien (petit/moyen/grand/geant).",
    href: "/calcul-age-chien-humain",
    icone: "🐕",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Age Chat en Annees Humaines",
    description:
      "Formule AAFP officielle, 6 phases de vie (chaton, junior, adulte, senior, super-senior, venerable).",
    href: "/calcul-age-chat-humain",
    icone: "🐱",
    couleur: "from-orange-400 to-amber-600",
    tag: "Nouveau",
  },
  {
    titre: "Ration Chien (BARF, Croquettes)",
    description:
      "Dose journaliere par poids, activite, age. BARF 2-3% du poids, croquettes Royal Canin, patee.",
    href: "/calcul-ration-chien",
    icone: "🍖",
    couleur: "from-amber-500 to-orange-600",
    tag: "Nouveau",
  },
  {
    titre: "Calories Chien Chat (BER, DER)",
    description:
      "Besoin energetique quotidien selon formule WSAVA. BER 70 x poids^0.75, facteurs activite et stade.",
    href: "/calcul-calories-chien-chat",
    icone: "🐾",
    couleur: "from-orange-500 to-red-500",
    tag: "Nouveau",
  },
  {
    titre: "Dose Medicament Chien Chat",
    description:
      "Vermifuge (Milbemax, Drontal), anti-puces (Frontline, Bravecto, Stronghold). Sources Vidal, ANSES.",
    href: "/calcul-dose-medicament-animaux",
    icone: "💊",
    couleur: "from-blue-500 to-cyan-600",
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

      <nav className="mb-10">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Explorer par categorie</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/calculateurs-finance", label: "Finance & Impots", emoji: "💰" },
            { href: "/calculateurs-immobilier", label: "Immobilier", emoji: "🏠" },
            { href: "/simulateurs-emploi", label: "Emploi & Salaire", emoji: "💼" },
            { href: "/calculateurs-sante-famille", label: "Sante & Famille", emoji: "❤️" },
            { href: "/calculateurs-nutrition", label: "Nutrition", emoji: "🥗" },
            { href: "/simulateurs-auto", label: "Auto & Vehicule", emoji: "🚗" },
            { href: "/prix-travaux-maison", label: "Prix Travaux", emoji: "🔧" },
            { href: "/calculateurs-mathematiques", label: "Mathematiques", emoji: "📊" },
            { href: "/convertisseurs", label: "Convertisseurs", emoji: "🔄" },
          ].map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all"
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Par pays</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="/be"
            className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-red-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-600 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
              🇧🇪
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                Calculateurs Belgique
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Salaire brut/net, TVA 21 %, droits d&apos;enregistrement,
                precompte immobilier. Baremes 2026.
              </p>
            </div>
          </a>
          <a
            href="/en"
            className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
              🇺🇸
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                English calculators
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Nuclear bomb, blackout, bunker, survival budget, draft. US
                edition.
              </p>
            </div>
          </a>
        </div>
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
