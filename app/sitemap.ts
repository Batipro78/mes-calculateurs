import type { MetadataRoute } from "next";

const BASE_URL = "https://mes-calculateurs.vercel.app";

// Salaire Brut/Net
const SALAIRE_MONTANTS = [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3500, 3800, 4000, 4500, 5000];

// TVA
const TVA_MONTANTS = [50, 100, 150, 200, 300, 500, 1000, 2000, 5000, 10000];
const TVA_TAUX = ["20-pourcent", "10-pourcent", "5-5-pourcent"];

// Pourcentage
const POURC_POURCENTAGES = [5, 10, 15, 20, 25, 30, 50, 75];
const POURC_VALEURS = [100, 200, 500, 1000, 1500, 2000, 5000];

// Pret immobilier
const PRET_MONTANTS = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000];
const PRET_DUREES = [15, 20, 25];

// APL
const APL_ZONES = ["1", "2", "3"];
const APL_SITUATIONS = ["seul", "couple"];
const APL_ENFANTS = [0, 1, 2, 3, 4];

// Date Accouchement
const DPA_SEMAINES = Array.from({ length: 38 }, (_, i) => i + 4); // 4 SA a 41 SA

// Heures de Travail
const HT_HEURES = [20, 24, 28, 32, 35, 37, 39, 40, 42, 45, 48];
const HT_TAUX = [12, 13, 15, 18, 20, 25, 30];

// DCA
const DCA_MONTANTS = [50, 100, 150, 200, 300, 500, 1000];
const DCA_ACTIFS = ["sp500", "cac40", "bitcoin"];

// Micro-Entreprise
const MICRO_CA = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 77700];
const MICRO_ACTIVITES = ["services-bnc", "services-bic", "achat-revente", "liberal"];

// Taux Endettement
const ENDETT_REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000];
const ENDETT_CHARGES = [300, 500, 700, 900, 1000, 1200, 1500, 2000];

// Ovulation
const OVU_CYCLES = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
const OVU_SITUATIONS = ["conception", "regles-irregulieres", "apres-pilule", "allaitement"];

// Bombe Nucleaire
const NUKE_ARMES = ["hiroshima", "nagasaki", "tactique", "trident", "tn75", "sarmat", "b83", "tsar-bomba"];
const NUKE_VILLES = ["paris", "lyon", "marseille", "toulouse", "nice", "lille", "strasbourg", "bordeaux", "nantes", "rennes"];

// Pension Alimentaire
const PENSION_REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 5000];
const PENSION_ENFANTS = [1, 2, 3, 4];
const PENSION_GARDES = ["classique", "alternee", "reduit"];

// Garde Enfant
const GARDE_REVENUS = [20000, 30000, 40000, 50000, 60000, 80000];
const GARDE_ENFANTS = [1, 2, 3];
const GARDE_MODES = ["creche", "assistante-maternelle", "garde-domicile", "micro-creche"];

// Credit Conso
const CREDIT_MONTANTS = [3000, 5000, 10000, 15000, 20000, 30000, 50000];
const CREDIT_DUREES = [24, 36, 48, 60, 72];

// Bonus Ecologique
const BONUS_VEHICULES = ["renault-5", "peugeot-e208", "citroen-ec3", "dacia-spring", "tesla-model-3", "mg4", "renault-megane", "fiat-500e"];
const BONUS_RFR = ["revenu-modeste", "revenu-intermediaire", "revenu-standard"];

// Prime d'Activite
const PRIME_REVENUS = [800, 1000, 1200, 1400, 1600, 1800, 2000];
const PRIME_SITUATIONS = ["seul", "couple"];
const PRIME_ENFANTS = [0, 1, 2, 3];

// Retraite
const RETRAITE_ANNEES = [1960, 1962, 1964, 1965, 1968, 1970, 1975, 1980, 1985, 1990];
const RETRAITE_SALAIRES = [20000, 25000, 30000, 35000, 40000, 47100];

// Mobilisation
const MOBIL_AGES = [18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
const MOBIL_SEXES = ["homme", "femme"];
const MOBIL_PROFILS = ["reserviste", "ancien-militaire", "parent-isole", "profession-sante", "femme-enceinte", "etudiant", "double-nationalite"];

// Autonomie Financiere
const AUTO_EPARGNES = [2000, 5000, 10000, 15000, 20000, 30000, 50000];
const AUTO_ZONES = ["paris", "grande-ville", "ville-moyenne", "rural"];
const AUTO_SITUATIONS = ["seul", "couple", "famille"];

// Budget Survie
const BUDGET_ZONES = ["paris", "grande-ville", "ville-moyenne", "rural"];
const BUDGET_SITUATIONS = ["seul", "couple", "famille"];
const BUDGET_TRANSPORTS = ["transport-commun", "voiture"];

// Salaire Alternant
const ALT_AGES_APP = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const ALT_ANNEES = [1, 2, 3];
const ALT_AGES_PRO = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const ALT_NIVEAUX = ["niveau-infra-bac", "niveau-bac"];

// Capacite Emprunt
const EMPRUNT_REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000];
const EMPRUNT_DUREES = [15, 20, 25];

// Blackout
const BLACKOUT_LOGEMENTS = ["appartement", "maison"];
const BLACKOUT_CHAUFFAGES = ["tout-electrique", "gaz", "bois", "mixte"];
const BLACKOUT_PERSONNES = [1, 2, 3, 4, 5];

// Chomage
const CHOMAGE_SALAIRES = [1400, 1600, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000, 6000];
const CHOMAGE_MOIS = [6, 12, 18, 24];
const CHOMAGE_AGES = [25, 30, 35, 40, 45, 50, 53, 55, 60];

// Calories
const CAL_SEXES = ["homme", "femme"];
const CAL_AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60];
const CAL_POIDS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const CAL_ACTIVITES = ["sedentaire", "actif", "sportif"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/salaire-brut-net`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-tva`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-pret-immobilier`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-pourcentage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-imc`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/frais-de-notaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-consommation-electrique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/indemnite-licenciement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-age`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/convertisseur-devises`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-surface-peinture`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-epargne`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-heures-travail`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-indemnites-kilometriques`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-impot-revenu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-date-accouchement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-dca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateur-inflation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-apl`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-calories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-chomage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-micro-entreprise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-taux-endettement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-ovulation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-pension-alimentaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-cout-garde-enfant`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-credit-conso`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-bonus-ecologique`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-prime-activite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-retraite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-mobilisation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-bombe-nucleaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateur-autonomie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculateur-budget-survie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-salaire-alternant`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calcul-capacite-emprunt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur-blackout`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pages dynamiques Salaire Brut/Net
  const salairePages: MetadataRoute.Sitemap = [];
  for (const m of SALAIRE_MONTANTS) {
    salairePages.push({
      url: `${BASE_URL}/salaire-brut-net/${m}-euros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    salairePages.push({
      url: `${BASE_URL}/salaire-brut-net/${m}-euros-net`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques TVA
  const tvaPages: MetadataRoute.Sitemap = [];
  for (const m of TVA_MONTANTS) {
    for (const t of TVA_TAUX) {
      tvaPages.push({
        url: `${BASE_URL}/calcul-tva/${m}-euros-ht-${t}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
      tvaPages.push({
        url: `${BASE_URL}/calcul-tva/${m}-euros-ttc-${t}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Pourcentage
  const pourcentagePages: MetadataRoute.Sitemap = [];
  for (const p of POURC_POURCENTAGES) {
    for (const v of POURC_VALEURS) {
      pourcentagePages.push({
        url: `${BASE_URL}/calcul-pourcentage/${p}-pourcent-de-${v}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Pret Immobilier
  const pretPages: MetadataRoute.Sitemap = [];
  for (const m of PRET_MONTANTS) {
    for (const d of PRET_DUREES) {
      pretPages.push({
        url: `${BASE_URL}/simulateur-pret-immobilier/${m}-euros-${d}-ans`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques APL
  const aplPages: MetadataRoute.Sitemap = [];
  for (const z of APL_ZONES) {
    for (const s of APL_SITUATIONS) {
      for (const n of APL_ENFANTS) {
        aplPages.push({
          url: `${BASE_URL}/simulateur-apl/zone-${z}-${s}-${n}-enfant${n !== 1 ? "s" : ""}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Date Accouchement
  const dpaPages: MetadataRoute.Sitemap = [];
  for (const sa of DPA_SEMAINES) {
    dpaPages.push({
      url: `${BASE_URL}/calcul-date-accouchement/enceinte-de-${sa}-semaines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques Heures de Travail
  const heuresPages: MetadataRoute.Sitemap = [];
  for (const h of HT_HEURES) {
    for (const t of HT_TAUX) {
      heuresPages.push({
        url: `${BASE_URL}/calcul-heures-travail/${h}-heures-${t}-euros`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques DCA
  const dcaPages: MetadataRoute.Sitemap = [];
  for (const m of DCA_MONTANTS) {
    for (const a of DCA_ACTIFS) {
      dcaPages.push({
        url: `${BASE_URL}/simulateur-dca/${m}-euros-par-mois-${a}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Calories
  const caloriesPages: MetadataRoute.Sitemap = [];
  for (const sexe of CAL_SEXES) {
    const taille = sexe === "homme" ? 175 : 165;
    for (const age of CAL_AGES) {
      for (const poids of CAL_POIDS) {
        for (const activite of CAL_ACTIVITES) {
          caloriesPages.push({
            url: `${BASE_URL}/calcul-calories/${sexe}-${poids}kg-${taille}cm-${age}ans-${activite}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    }
  }

  // Pages dynamiques Micro-Entreprise
  const microPages: MetadataRoute.Sitemap = [];
  for (const ca of MICRO_CA) {
    for (const act of MICRO_ACTIVITES) {
      microPages.push({
        url: `${BASE_URL}/simulateur-micro-entreprise/${ca}-euros-${act}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Chomage
  const chomagePages: MetadataRoute.Sitemap = [];
  for (const s of CHOMAGE_SALAIRES) {
    for (const m of CHOMAGE_MOIS) {
      for (const a of CHOMAGE_AGES) {
        chomagePages.push({
          url: `${BASE_URL}/simulateur-chomage/${s}-euros-${m}-mois-${a}-ans`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Taux Endettement
  const endettementPages: MetadataRoute.Sitemap = [];
  for (const r of ENDETT_REVENUS) {
    for (const c of ENDETT_CHARGES) {
      if (c < r) {
        endettementPages.push({
          url: `${BASE_URL}/calcul-taux-endettement/${r}-euros-revenus-${c}-euros-charges`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Ovulation
  const ovulationPages: MetadataRoute.Sitemap = [];
  for (const c of OVU_CYCLES) {
    ovulationPages.push({
      url: `${BASE_URL}/calcul-ovulation/cycle-${c}-jours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const s of OVU_SITUATIONS) {
    ovulationPages.push({
      url: `${BASE_URL}/calcul-ovulation/ovulation-et-${s}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques Bombe Nucleaire
  const nukePages: MetadataRoute.Sitemap = [];
  for (const arme of NUKE_ARMES) {
    for (const ville of NUKE_VILLES) {
      nukePages.push({
        url: `${BASE_URL}/simulateur-bombe-nucleaire/${arme}-sur-${ville}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Pension Alimentaire
  const pensionPages: MetadataRoute.Sitemap = [];
  for (const rev of PENSION_REVENUS) {
    for (const enf of PENSION_ENFANTS) {
      for (const g of PENSION_GARDES) {
        pensionPages.push({
          url: `${BASE_URL}/simulateur-pension-alimentaire/${rev}-euros-${enf}-enfant${enf > 1 ? "s" : ""}-${g}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Garde Enfant
  const gardePages: MetadataRoute.Sitemap = [];
  for (const r of GARDE_REVENUS) {
    for (const e of GARDE_ENFANTS) {
      for (const m of GARDE_MODES) {
        gardePages.push({
          url: `${BASE_URL}/calcul-cout-garde-enfant/${r}-euros-${e}-enfant${e > 1 ? "s" : ""}-${m}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Credit Conso
  const creditPages: MetadataRoute.Sitemap = [];
  for (const m of CREDIT_MONTANTS) {
    for (const d of CREDIT_DUREES) {
      creditPages.push({
        url: `${BASE_URL}/simulateur-credit-conso/${m}-euros-${d}-mois`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Bonus Ecologique
  const bonusPages: MetadataRoute.Sitemap = [];
  for (const v of BONUS_VEHICULES) {
    for (const r of BONUS_RFR) {
      bonusPages.push({
        url: `${BASE_URL}/simulateur-bonus-ecologique/${v}-${r}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Prime d'Activite
  const primeActivitePages: MetadataRoute.Sitemap = [];
  for (const sit of PRIME_SITUATIONS) {
    for (const enf of PRIME_ENFANTS) {
      for (const rev of PRIME_REVENUS) {
        const slug = enf === 0
          ? `${sit}-${rev}-euros`
          : `${sit}-${enf}-enfant${enf > 1 ? "s" : ""}-${rev}-euros`;
        primeActivitePages.push({
          url: `${BASE_URL}/calcul-prime-activite/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Retraite
  const retraitePages: MetadataRoute.Sitemap = [];
  for (const a of RETRAITE_ANNEES) {
    for (const s of RETRAITE_SALAIRES) {
      retraitePages.push({
        url: `${BASE_URL}/simulateur-retraite/ne-en-${a}-${s}-euros`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Mobilisation
  const mobilisationPages: MetadataRoute.Sitemap = [];
  for (const sexe of MOBIL_SEXES) {
    for (const age of MOBIL_AGES) {
      mobilisationPages.push({
        url: `${BASE_URL}/simulateur-mobilisation/${sexe}-${age}-ans`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  for (const profil of MOBIL_PROFILS) {
    mobilisationPages.push({
      url: `${BASE_URL}/simulateur-mobilisation/${profil}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pages dynamiques Autonomie Financiere
  const autonomiePages: MetadataRoute.Sitemap = [];
  for (const e of AUTO_EPARGNES) {
    for (const z of AUTO_ZONES) {
      for (const s of AUTO_SITUATIONS) {
        autonomiePages.push({
          url: `${BASE_URL}/calculateur-autonomie/${e}-euros-${z}-${s}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Budget Survie
  const budgetSurviePages: MetadataRoute.Sitemap = [];
  for (const z of BUDGET_ZONES) {
    for (const s of BUDGET_SITUATIONS) {
      for (const t of BUDGET_TRANSPORTS) {
        budgetSurviePages.push({
          url: `${BASE_URL}/calculateur-budget-survie/${z}-${s}-${t}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Pages dynamiques Salaire Alternant
  const alternantPages: MetadataRoute.Sitemap = [];
  for (const age of ALT_AGES_APP) {
    for (const annee of ALT_ANNEES) {
      alternantPages.push({
        url: `${BASE_URL}/simulateur-salaire-alternant/apprentissage-${age}-ans-${annee}e-annee`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  for (const age of ALT_AGES_PRO) {
    for (const niveau of ALT_NIVEAUX) {
      alternantPages.push({
        url: `${BASE_URL}/simulateur-salaire-alternant/professionnalisation-${age}-ans-${niveau}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Capacite Emprunt
  const empruntPages: MetadataRoute.Sitemap = [];
  for (const r of EMPRUNT_REVENUS) {
    for (const d of EMPRUNT_DUREES) {
      empruntPages.push({
        url: `${BASE_URL}/calcul-capacite-emprunt/${r}-euros-${d}-ans`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Pages dynamiques Blackout
  const blackoutPages: MetadataRoute.Sitemap = [];
  for (const l of BLACKOUT_LOGEMENTS) {
    for (const c of BLACKOUT_CHAUFFAGES) {
      for (const n of BLACKOUT_PERSONNES) {
        blackoutPages.push({
          url: `${BASE_URL}/simulateur-blackout/${l}-${c}-${n}-personnes`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return [
    ...staticPages,
    ...salairePages,
    ...tvaPages,
    ...pourcentagePages,
    ...pretPages,
    ...aplPages,
    ...dpaPages,
    ...heuresPages,
    ...dcaPages,
    ...caloriesPages,
    ...chomagePages,
    ...microPages,
    ...ovulationPages,
    ...endettementPages,
    ...pensionPages,
    ...gardePages,
    ...creditPages,
    ...bonusPages,
    ...primeActivitePages,
    ...retraitePages,
    ...mobilisationPages,
    ...nukePages,
    ...alternantPages,
    ...budgetSurviePages,
    ...autonomiePages,
    ...blackoutPages,
    ...empruntPages,
  ];
}
