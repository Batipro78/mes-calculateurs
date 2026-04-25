export default function WebAppJsonLd({
  name,
  description,
  category,
  url,
}: {
  name: string;
  description?: string;
  category?: string;
  url?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    ...(description && { description }),
    ...(url && { url }),
    applicationCategory: category ?? "FinanceApplication",
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
