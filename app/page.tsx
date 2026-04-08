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
    titre: "Cout Kilometrique 2026",
    description:
      "Calculez votre indemnite kilometrique avec le bareme fiscal 2026. Puissance fiscale, electrique +20%.",
    href: "/calcul-cout-kilometrique",
    icone: "🚙",
    couleur: "from-sky-500 to-blue-600",
    tag: "Nouveau",
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
