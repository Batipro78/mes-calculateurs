import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mes-calculateurs.vercel.app"),
  title: {
    default: "Mes Calculateurs - Outils de calcul gratuits en ligne",
    template: "%s | Mes Calculateurs",
  },
  description:
    "Calculateurs gratuits en ligne : salaire brut/net, TVA HT/TTC, pret immobilier, pourcentage, IMC et plus. Simples, rapides et 100% gratuits.",
  keywords:
    "calculateur, salaire brut net, calcul TVA, simulateur pret, outils gratuits",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: "Mes Calculateurs - Outils de calcul gratuits en ligne",
    description:
      "Calculateurs gratuits : salaire brut/net, TVA, pret immobilier et plus.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-900 antialiased">
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
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Mes Calculateurs &mdash; Tous
                droits reserves.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <a
                  href="/salaire-brut-net"
                  className="hover:text-slate-600 transition-colors"
                >
                  Salaire Brut/Net
                </a>
                <a
                  href="/calcul-tva"
                  className="hover:text-slate-600 transition-colors"
                >
                  Calcul TVA
                </a>
                <span className="text-slate-200">|</span>
                <a
                  href="/mentions-legales"
                  className="hover:text-slate-600 transition-colors"
                >
                  Mentions legales
                </a>
                <a
                  href="/confidentialite"
                  className="hover:text-slate-600 transition-colors"
                >
                  Confidentialite
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
