"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

// Identifiant editeur AdSense (public). Surchargeable via env si besoin.
const AD_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-7951968617097687";

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
    if (!slot) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch {
      // AdSense pas encore charge
    }
  }, [slot]);

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
