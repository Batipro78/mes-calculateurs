"use client";

import { useEffect, useRef } from "react";
import EzoicAd from "./EzoicAd";

interface AdSlotProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

// Identifiant editeur AdSense (public). Surchargeable via env si besoin.
const AD_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-7951968617097687";

// Bascule Ezoic : si NEXT_PUBLIC_EZOIC_ENABLED === "true", tous les <AdSlot>
// affichent un encart Ezoic a la place d'AdSense (le script header est charge
// par ConditionalScripts). NEXT_PUBLIC_ est inline au build -> redeploy requis.
const EZOIC_ENABLED = process.env.NEXT_PUBLIC_EZOIC_ENABLED === "true";

// Mapping des 2 emplacements du site vers les IDs de placeholders Ezoic.
// A AJUSTER avec les vrais IDs crees dans le dashboard Ezoic.
//   1234567890 = encart dans le contenu  ;  0987654321 = encart bas de page
const EZOIC_PLACEHOLDER_MAP: Record<string, number> = {
  "1234567890": 101, // in-content
  "0987654321": 102, // footer
};

// Les deux placeholders historiques sont mappes vers les VRAIS emplacements
// definis en variables d'environnement Vercel :
//   1234567890 -> encart dans le contenu  (NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT)
//   0987654321 -> encart bas de page      (NEXT_PUBLIC_ADSENSE_SLOT_FOOTER)
// Tant qu'une variable n'est pas configuree, l'encart correspondant ne
// s'affiche pas (aucune requete pub avec un faux slot = conforme AdSense).
const SLOT_MAP: Record<string, string | undefined> = {
  "1234567890": process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT,
  "0987654321": process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
};

function resolveSlot(adSlot: string): string {
  // Placeholder connu -> vrai slot via env (ou "" si non configure)
  if (adSlot in SLOT_MAP) return SLOT_MAP[adSlot] || "";
  // Un vrai identifiant passe directement -> utilise tel quel
  return adSlot;
}

export default function AdSlot({
  adSlot,
  adFormat = "auto",
  className = "",
}: AdSlotProps) {
  const slot = resolveSlot(adSlot);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (EZOIC_ENABLED || !slot) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch {
      // AdSense pas encore charge
    }
  }, [slot]);

  // Mode Ezoic : on rend un encart Ezoic au lieu d'AdSense.
  if (EZOIC_ENABLED) {
    const placeholderId = EZOIC_PLACEHOLDER_MAP[adSlot] ?? 101;
    return <EzoicAd placeholderId={placeholderId} className={className} />;
  }

  // Aucun vrai emplacement configure -> on n'affiche rien.
  if (!slot) return null;

  return (
    <div ref={adRef} className={`ad-container overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
