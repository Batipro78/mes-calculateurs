"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

// Si Ezoic est actif, on charge son script standalone a la place d'AdSense.
const EZOIC_ENABLED = process.env.NEXT_PUBLIC_EZOIC_ENABLED === "true";

export default function ConditionalScripts() {
  const pathname = usePathname();
  const isEmbed = pathname?.startsWith("/embed/") ?? false;

  if (isEmbed) return null;

  // Aucun script pub par defaut (AdSense abandonne). Le script Ezoic ne se
  // charge que si NEXT_PUBLIC_EZOIC_ENABLED === "true" (dormant pour l'instant).
  if (!EZOIC_ENABLED) return null;

  return (
    <>
      <Script
        id="ezoic-sa"
        src="//www.ezojs.com/ezoic/sa.min.js"
        strategy="afterInteractive"
      />
      <Script id="ezoic-init" strategy="afterInteractive">
        {`window.ezstandalone = window.ezstandalone || {}; ezstandalone.cmd = ezstandalone.cmd || [];`}
      </Script>
    </>
  );
}
