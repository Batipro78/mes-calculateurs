// Visuel original d'une page (schema, graphique de bareme) : un vrai fichier
// image dans public/images/, fabrique par `npm run visuels`, avec sa legende
// visible et son balisage ImageObject pour les moteurs d'images.
export default function Visuel({
  fichier,
  alt,
  legende,
  className = "my-8",
}: {
  fichier: string;
  alt: string;
  legende: string;
  className?: string;
}) {
  const src = `/images/${fichier}.webp`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `https://mescalculateurs.fr${src}`,
    name: alt,
    caption: legende,
    width: 1200,
    height: 630,
    inLanguage: "fr-FR",
    creator: {
      "@type": "Organization",
      name: "Mes Calculateurs",
      url: "https://mescalculateurs.fr",
    },
    creditText: "Mes Calculateurs",
  };

  return (
    <figure className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href={src} target="_blank" rel="noopener" aria-label="Agrandir l'image">
        <img
          src={src}
          alt={alt}
          width={1200}
          height={630}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-2xl border border-slate-200 shadow-sm"
        />
      </a>
      <figcaption className="text-sm text-slate-500 mt-3 text-center">
        {legende}
      </figcaption>
    </figure>
  );
}
