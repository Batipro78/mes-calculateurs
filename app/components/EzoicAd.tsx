"use client";

import { useEffect } from "react";

interface EzoicAdProps {
  // Identifiant numerique du placeholder cree dans le dashboard Ezoic
  // (Monetization -> Mediation/Placeholders). Ex: 101, 102...
  placeholderId: number;
  className?: string;
}

/**
 * Encart publicitaire Ezoic (integration JavaScript "standalone").
 * Le script header est charge par ConditionalScripts quand
 * NEXT_PUBLIC_EZOIC_ENABLED === "true". Ici on rend le div placeholder
 * attendu par Ezoic puis on demande l'affichage de l'annonce.
 */
export default function EzoicAd({ placeholderId, className = "" }: EzoicAdProps) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.ezstandalone = w.ezstandalone || {};
    w.ezstandalone.cmd = w.ezstandalone.cmd || [];
    w.ezstandalone.cmd.push(function () {
      w.ezstandalone.showAds(placeholderId);
    });

    return () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        win.ezstandalone?.cmd?.push(function () {
          win.ezstandalone.destroyPlaceholders(placeholderId);
        });
      } catch {
        // Ezoic pas encore charge
      }
    };
  }, [placeholderId]);

  return (
    <div
      id={`ezoic-pub-ad-placeholder-${placeholderId}`}
      className={`ad-container overflow-hidden ${className}`}
    />
  );
}
