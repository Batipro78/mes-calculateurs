"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import GoogleAnalytics from "./GoogleAnalytics";

export default function ConditionalScripts({ gaId }: { gaId: string | undefined }) {
  const pathname = usePathname();
  const isEmbed = pathname?.startsWith("/embed/") ?? false;

  if (isEmbed) return null;

  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7951968617097687"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
