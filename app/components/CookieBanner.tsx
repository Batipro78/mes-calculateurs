"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "mc_cookie_consent_v1";

type Choice = "all" | "necessary" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function applyConsent(choice: "all" | "necessary") {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: choice === "all" ? "granted" : "denied",
      analytics_storage: choice === "all" ? "granted" : "denied",
      ad_user_data: choice === "all" ? "granted" : "denied",
      ad_personalization: choice === "all" ? "granted" : "denied",
    },
  ]);
}

export default function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isEmbed = pathname?.startsWith("/embed/") ?? false;

  useEffect(() => {
    if (isEmbed) return;
    let stored: Choice = null;
    try {
      stored = (localStorage.getItem(STORAGE_KEY) as Choice) || null;
    } catch {
      stored = null;
    }
    if (!stored) {
      setVisible(true);
    } else {
      applyConsent(stored);
    }
    function onOpen() {
      setVisible(true);
    }
    window.addEventListener("open-cookie-banner", onOpen);
    return () => window.removeEventListener("open-cookie-banner", onOpen);
  }, [isEmbed]);

  function choose(c: "all" | "necessary") {
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // localStorage indisponible, on continue quand meme pour la session
    }
    applyConsent(c);
    setVisible(false);
  }

  if (!visible || isEmbed) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Bandeau de consentement cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t-2 border-slate-200 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 text-sm text-slate-700">
          <p className="font-semibold text-slate-800 mb-1">
            Cookies et vie privee
          </p>
          <p className="text-slate-600 leading-relaxed">
            Nous utilisons des cookies pour mesurer l&apos;audience (Google
            Analytics) et afficher des publicites (Google AdSense). Aucune
            donnee n&apos;est collectee sans votre accord. Consultez notre{" "}
            <a
              href="/confidentialite"
              className="text-blue-600 hover:underline font-medium"
            >
              politique de confidentialite
            </a>
            .
          </p>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
