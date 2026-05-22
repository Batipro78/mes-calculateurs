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
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wv9xuz01uo");`}
      </Script>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7951968617097687"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
