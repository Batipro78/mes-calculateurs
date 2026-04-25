interface BreadcrumbENProps {
  currentPage: string;
  parentPage?: string;
  parentHref?: string;
  lastUpdated?: string;
}

export default function BreadcrumbEN({ currentPage, parentPage, parentHref, lastUpdated = "April 2026" }: BreadcrumbENProps) {
  const items = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Home",
      item: "https://mescalculateurs.fr/en",
    },
  ];

  if (parentPage && parentHref) {
    items.push({
      "@type": "ListItem" as const,
      position: 2,
      name: parentPage,
      item: `https://mescalculateurs.fr${parentHref}`,
    });
    items.push({
      "@type": "ListItem" as const,
      position: 3,
      name: currentPage,
      item: "",
    });
  } else {
    items.push({
      "@type": "ListItem" as const,
      position: 2,
      name: currentPage,
      item: "",
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ item, ...rest }) =>
      item ? { ...rest, item } : rest
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          <li>
            <a href="/en" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          {parentPage && parentHref ? (
            <>
              <li>
                <a href={parentHref} className="hover:text-blue-600 transition-colors">
                  {parentPage}
                </a>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-slate-600 font-medium">{currentPage}</li>
            </>
          ) : (
            <li className="text-slate-600 font-medium">{currentPage}</li>
          )}
          <li className="ml-auto text-xs text-slate-400">
            Last updated: {lastUpdated}
          </li>
        </ol>
      </nav>
    </>
  );
}
