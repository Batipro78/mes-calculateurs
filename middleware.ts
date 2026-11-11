import { NextRequest, NextResponse } from "next/server";

/**
 * Filtre anti-robots, deux règles.
 *
 * 1) Blocage géographique Asie (23/06/2026).
 *    ~70 % du "trafic" venait de datacenters asiatiques (Chine 34 %,
 *    Singapour 13 %, Hong Kong 10 %...), 100 % desktop, en crawl
 *    métronomique 24/7 = scrapers. On bloque tout le continent Asie.
 *
 * 2) États-Unis sans provenance (11/11/2026).
 *    Vercel Analytics sur 30 jours : 734 des 821 visiteurs US arrivent
 *    "direct" (sans moteur ni lien), 1 page chacun, sur des pages au hasard,
 *    avec un pic de 65 en une heure le 11/11. La partie /en n'a reçu
 *    qu'une dizaine de visiteurs US en 30 jours. Un humain qui vient d'un
 *    moteur (Bing, Google, DuckDuckGo...) ou d'un lien envoie un en-tête
 *    Referer : il passe. Les navigations internes aussi (Referrer-Policy
 *    strict-origin-when-cross-origin dans next.config.ts).
 *
 * SEO préservé : les bons crawlers (liste ALLOWED_BOTS) passent toujours,
 * quelle que soit leur géo. Les fichiers techniques (robots.txt, sitemaps,
 * ads.txt, llms.txt, images...) et /api ne sont jamais bloqués par la règle 2.
 *
 * Fail-open : si Vercel n'envoie pas les en-têtes géo (local/dev), rien
 * n'est bloqué.
 *
 * Réversible : vider BLOCKED_CONTINENTS / NO_REFERER_BLOCKED_COUNTRIES,
 * ou supprimer ce fichier, et push.
 */

const BLOCKED_CONTINENTS = new Set(["AS"]); // AS = Asie. Codes: AF, AN, AS, EU, NA, OC, SA

// Pays où une PAGE demandée sans provenance est bloquée (codes ISO 3166-1).
const NO_REFERER_BLOCKED_COUNTRIES = new Set(["US"]);

// Bots légitimes à ne JAMAIS bloquer, quelle que soit leur géo.
// NB : pas de baiduspider/yandexbot ici — ils crawlent depuis l'Asie et
// n'ont aucune valeur SEO pour un site FR ; les garder = porte ouverte
// aux scrapers qui spooferaient ces User-Agents depuis la Chine.
const ALLOWED_BOTS =
  /(googlebot|google-inspectiontool|googleother|google-extended|mediapartners-google|adsbot-google|storebot-google|google-site-verification|feedfetcher-google|chrome-lighthouse|bingbot|bingpreview|msnbot|adidxbot|applebot|duckduckbot|qwant|slurp|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-user|claude-searchbot|anthropic-ai|perplexitybot|perplexity-user|amazonbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot)/i;

// Paramètres de campagne : un lien d'appli ou de mail peut perdre le
// Referer mais garder ces marqueurs. On laisse passer.
const CAMPAIGN_PARAMS = ["utm_source", "gclid", "msclkid", "fbclid"];

function deny() {
  return new NextResponse("Access denied.", {
    status: 403,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

// Vrai si la requête est une PAGE demandée sans aucune provenance.
function isPageWithoutOrigin(req: NextRequest): boolean {
  if (req.method !== "GET" && req.method !== "HEAD") return false;
  if (req.headers.get("referer")) return false;

  const { pathname, searchParams } = req.nextUrl;
  if (CAMPAIGN_PARAMS.some((p) => searchParams.has(p))) return false;

  // Fichiers techniques et API : jamais bloqués ici.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/.well-known/") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return false;
  }
  return true;
}

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  if (ALLOWED_BOTS.test(ua)) {
    return NextResponse.next();
  }

  const continent = req.headers.get("x-vercel-ip-continent") ?? "";
  if (BLOCKED_CONTINENTS.has(continent)) {
    return deny();
  }

  const country = req.headers.get("x-vercel-ip-country") ?? "";
  if (NO_REFERER_BLOCKED_COUNTRIES.has(country) && isPageWithoutOrigin(req)) {
    return deny();
  }

  return NextResponse.next();
}

export const config = {
  // S'applique partout sauf les assets internes Next et le favicon,
  // pour ne pas gaspiller d'invocations sur les fichiers statiques.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
