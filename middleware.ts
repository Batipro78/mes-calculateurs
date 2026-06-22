import { NextRequest, NextResponse } from "next/server";

/**
 * Blocage géographique anti-scraping.
 *
 * Constat (Vercel Analytics, 23/06/2026) : ~70 % du "trafic" venait de
 * datacenters asiatiques (Chine 34 %, Singapour 13 %, Hong Kong 10 %...),
 * 100 % desktop, en crawl métronomique 24/7 = scrapers, sans valeur et
 * polluant les stats. On bloque tout le continent Asie.
 *
 * SEO préservé : Googlebot / Bingbot / GPTBot / ClaudeBot / PerplexityBot
 * crawlent depuis des datacenters US/EU (continent NA/EU), donc ne sont pas
 * concernés. En ceinture+bretelles, on laisse aussi passer ces User-Agents
 * même s'ils venaient d'Asie.
 *
 * Réversible : supprimer ce fichier (ou vider BLOCKED_CONTINENTS) et push.
 */

const BLOCKED_CONTINENTS = new Set(["AS"]); // AS = Asie. Codes: AF, AN, AS, EU, NA, OC, SA

// Bots légitimes à ne JAMAIS bloquer, quelle que soit leur géo.
// NB : pas de baiduspider/yandexbot ici — ils crawlent depuis l'Asie et
// n'ont aucune valeur SEO pour un site FR ; les garder = porte ouverte
// aux scrapers qui spooferaient ces User-Agents depuis la Chine.
const ALLOWED_BOTS =
  /(googlebot|google-inspectiontool|bingbot|bingpreview|applebot|duckduckbot|gptbot|oai-searchbot|chatgpt-user|claudebot|anthropic-ai|perplexitybot|amazonbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot)/i;

export function middleware(req: NextRequest) {
  const continent = req.headers.get("x-vercel-ip-continent") ?? "";

  if (!BLOCKED_CONTINENTS.has(continent)) {
    return NextResponse.next();
  }

  // Géo bloquée : on épargne quand même les bons crawlers (sécurité SEO).
  const ua = req.headers.get("user-agent") ?? "";
  if (ALLOWED_BOTS.test(ua)) {
    return NextResponse.next();
  }

  return new NextResponse("Access denied.", {
    status: 403,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  // S'applique partout sauf les assets internes Next et le favicon,
  // pour ne pas gaspiller d'invocations sur les fichiers statiques.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
