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

  return [
    ...staticPages,
    ...salairePages,
    ...tvaPages,
    ...pourcentagePages,
    ...pretPages,
  ];
}
