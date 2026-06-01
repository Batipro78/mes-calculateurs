"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "mc_cookie_consent_v1";

type Choice = "all" | "necessary" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(choice: "all" | "necessary") {
  if (typeof window === "undefined") return;
  const granted = choice === "all";
  const params = {
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  };
  // Utiliser le vrai gtag (defini par le script consent-default) qui pousse
  // un objet `arguments` : un simple tableau pousse dans dataLayer n'est PAS
  // interprete comme une commande de consentement par gtag.js.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag!("consent", "update", params);
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
            Aidez-nous a garder ce site 100 % gratuit
          </p>
          <p className="text-slate-600 leading-relaxed">
            Acceptez les cookies pour nous permettre de mesurer l&apos;audience
            et d&apos;afficher quelques publicites discretes : c&apos;est ce
            qui finance le developpement de tous les calculateurs.{" "}
            <a
              href="/confidentialite"
              className="text-blue-600 hover:underline font-medium"
            >
              En savoir plus
            </a>
            .
          </p>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
