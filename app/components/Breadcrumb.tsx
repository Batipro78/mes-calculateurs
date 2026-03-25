interface BreadcrumbProps {
  currentPage: string;
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://mes-calculateurs.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentPage,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          <li>
            <a href="/" className="hover:text-blue-600 transition-colors">
              Accueil
            </a>
          </li>
          <li>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li className="text-slate-600 font-medium">{currentPage}</li>
        </ol>
      </nav>
    </>
  );
}
