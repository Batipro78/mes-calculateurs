// Helpers JSON-LD (utilisés par certains calcs)

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function WebAppSchema(name: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    publisher: {
      "@type": "Organization",
      name: "Mes Calculateurs",
      url: "https://mescalculateurs.fr",
    },
  };
}
