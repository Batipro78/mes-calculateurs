interface CTAMonDevisMinuteProps {
  // Permet d'adapter le tracking UTM selon la page d'origine
  campaign: string;
  // Accroche optionnelle pour coller au contexte de la page
  variant?: "devis" | "facture" | "generique";
  // Lien de fond optionnel vers un guide MonDevisMinute : utile au lecteur,
  // et cree du maillage vers des pages de contenu plutot que vers la seule
  // page d'accueil.
  guide?: { href: string; label: string };
}

// CTA reutilisable vers MonDevisMinute (SaaS devis/factures + IA vocale).
// Cible l'artisan (utilisateur de la plateforme) : branding complet autorise.
// Lien sortant avec tracking UTM pour mesurer l'apport de mescalculateurs.
//
// NB : on pointe vers le domaine AVEC www, qui est la version reellement
// servie. Sans www, chaque lien passait par une redirection 307 inutile.
export default function CTAMonDevisMinute({
  campaign,
  variant = "devis",
  guide,
}: CTAMonDevisMinuteProps) {
  const base = "https://www.mondevisminute.com";
  const utm = `utm_source=mescalculateurs&utm_medium=referral&utm_campaign=${campaign}`;
  const url = `${base}/?${utm}`;

  const accroche =
    variant === "facture"
      ? "Et si vous arrêtiez de refaire vos factures à la main ?"
      : "Et si vous arrêtiez de refaire vos devis à la main ?";

  return (
    <section className="mt-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-12 h-12 shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl items-center justify-center text-2xl shadow-sm">
          🎙️
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800 mb-2">{accroche}</h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            <strong>MonDevisMinute</strong> est l&apos;application des artisans du
            bâtiment : <strong>dictez votre devis à la voix</strong> sur le
            chantier et l&apos;IA le rédige pour vous en 30 secondes (mentions
            légales, TVA, totaux). Transformez-le en facture en 1 clic,
            envoyez-le par email, suivez vos paiements.
          </p>
          <ul className="text-sm text-slate-600 space-y-1 mb-5">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Devis &amp; factures
              conformes 2026 (mentions obligatoires pré-remplies)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Dictée vocale : 10x plus
              rapide qu&apos;à la main
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Essai gratuit 14 jours,
              sans carte bancaire
            </li>
          </ul>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Essayer MonDevisMinute gratuitement
            <svg
              className="w-4 h-4"
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
          </a>

          {guide && (
            <p className="mt-4 text-sm text-slate-600">
              À lire aussi :{" "}
              <a
                href={`${base}${guide.href}?${utm}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900"
              >
                {guide.label}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
