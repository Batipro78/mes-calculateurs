import type { Metadata } from "next";
import Script from "next/script";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://mescalculateurs.fr"),
  title: {
    default: "Mes Calculateurs - Outils de calcul gratuits en ligne",
    template: "%s | Mes Calculateurs",
  },
  description:
    "Calculateurs gratuits en ligne : salaire brut/net, TVA HT/TTC, pret immobilier, pourcentage, IMC et plus. Simples, rapides et 100% gratuits.",
  keywords:
    "calculateur, salaire brut net, calcul TVA, simulateur pret immobilier, calcul pourcentage, calcul IMC, frais de notaire, consommation electrique, indemnite licenciement, convertisseur devises, simulateur epargne, impot revenu, outils gratuits",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: "Mes Calculateurs - Outils de calcul gratuits en ligne",
    description:
      "Calculateurs gratuits : salaire brut/net, TVA, pret immobilier, IMC, pourcentage et plus. 100% gratuit, sans inscription.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mes Calculateurs - Outils de calcul gratuits en ligne",
    description:
      "Calculateurs gratuits : salaire brut/net, TVA, pret immobilier et plus.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google6de3ee45d7bcc37f",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mes Calculateurs",
  url: "https://mescalculateurs.fr",
  description:
    "Calculateurs gratuits en ligne : salaire brut/net, TVA, pret immobilier, pourcentage, IMC et plus.",
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://mescalculateurs.fr/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7951968617097687" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-900 antialiased">
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7951968617097687"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
                MC
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800">
                  Mes Calculateurs
                </span>
                <p className="text-xs text-slate-400 -mt-0.5">
                  Gratuit &middot; Simple &middot; Rapide
                </p>
              </div>
            </a>
            <nav className="hidden sm:flex items-center gap-1 text-sm">
              <a
                href="/salaire-brut-net"
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Salaire
              </a>
              <a
                href="/calcul-tva"
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                TVA
              </a>
              <a
                href="/simulateur-pret-immobilier"
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Pret Immo
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Finance</h3>
                <div className="flex flex-col gap-1.5 text-sm text-slate-400">
                  <a href="/calculateurs-finance" className="hover:text-slate-600 transition-colors">Tous les calculateurs</a>
                  <a href="/simulateur-pret-immobilier" className="hover:text-slate-600 transition-colors">Pret Immobilier</a>
                  <a href="/frais-de-notaire" className="hover:text-slate-600 transition-colors">Frais de Notaire</a>
                  <a href="/simulateur-impot-revenu" className="hover:text-slate-600 transition-colors">Impot Revenu</a>
                  <a href="/calcul-tva" className="hover:text-slate-600 transition-colors">Calcul TVA</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Emploi</h3>
                <div className="flex flex-col gap-1.5 text-sm text-slate-400">
                  <a href="/simulateurs-emploi" className="hover:text-slate-600 transition-colors">Tous les simulateurs</a>
                  <a href="/salaire-brut-net" className="hover:text-slate-600 transition-colors">Salaire Brut/Net</a>
                  <a href="/simulateur-chomage" className="hover:text-slate-600 transition-colors">Chomage</a>
                  <a href="/indemnite-licenciement" className="hover:text-slate-600 transition-colors">Licenciement</a>
                  <a href="/simulateur-retraite" className="hover:text-slate-600 transition-colors">Retraite</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Sante</h3>
                <div className="flex flex-col gap-1.5 text-sm text-slate-400">
                  <a href="/calculateurs-sante-famille" className="hover:text-slate-600 transition-colors">Tous les calculateurs</a>
                  <a href="/calcul-imc" className="hover:text-slate-600 transition-colors">Calcul IMC</a>
                  <a href="/calcul-calories" className="hover:text-slate-600 transition-colors">Calories</a>
                  <a href="/calcul-ovulation" className="hover:text-slate-600 transition-colors">Ovulation</a>
                  <a href="/calcul-date-accouchement" className="hover:text-slate-600 transition-colors">Accouchement</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Travaux</h3>
                <div className="flex flex-col gap-1.5 text-sm text-slate-400">
                  <a href="/prix-travaux-maison" className="hover:text-slate-600 transition-colors">Tous les prix</a>
                  <a href="/prix-electricien" className="hover:text-slate-600 transition-colors">Electricien</a>
                  <a href="/prix-plombier" className="hover:text-slate-600 transition-colors">Plombier</a>
                  <a href="/prix-macon" className="hover:text-slate-600 transition-colors">Macon</a>
                  <a href="/prix-chauffagiste" className="hover:text-slate-600 transition-colors">Chauffagiste</a>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Mes Calculateurs &mdash; Tous
                droits reserves.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <a href="/embed" className="hover:text-slate-600 transition-colors">Widgets</a>
                <a href="/mentions-legales" className="hover:text-slate-600 transition-colors">Mentions legales</a>
                <a href="/confidentialite" className="hover:text-slate-600 transition-colors">Confidentialite</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
