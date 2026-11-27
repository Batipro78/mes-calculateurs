// Worker Cloudflare de mescalculateurs.fr (remplace les routes /api de Next.js
// depuis le passage en site statique, 27/11/2026).
// Le reste du site = fichiers statiques de out/, servis par env.ASSETS.
// /api/leads et /api/indexnow : meme logique, memes codes et memes reponses
// que les anciennes app/api/leads/route.ts et app/api/indexnow/route.ts.

import { LEAD_NICHES } from "../app/lib/leads-config";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  BREVO_API_KEY?: string;
  LEADS_NOTIFY_EMAIL?: string;
  ADMIN_STATS_TOKEN?: string;
}

const json = (data: unknown, init?: ResponseInit) => Response.json(data, init);

/* ------------------------------------------------------------------ */
/* /api/leads (POST)                                                   */
/* ------------------------------------------------------------------ */

type LeadPayload = {
  nicheId?: string;
  ville?: string;
  departement?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  projet?: string;
  codePostal?: string;
  message?: string;
  consentement?: boolean;
  source?: string;
  website?: string; // honeypot : doit rester vide
};

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function isValidPhone(p: string) {
  // accepte 0X XX XX XX XX, +33..., espaces / points / tirets
  return /^[+0-9][0-9\s.\-]{7,18}$/.test(p);
}

// Echappement HTML : empeche l'injection de balises/liens dans l'email de notification.
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;"
      : c === "<" ? "&lt;"
        : c === ">" ? "&gt;"
          : c === '"' ? "&quot;"
            : "&#39;"
  );
}

// Rate-limit en memoire (best-effort, par instance du Worker). Premier rempart
// anti-flood, combine au honeypot.
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 5;
const rlHits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (rlHits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  rlHits.set(ip, arr);
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) {
      if (v.every((t) => now - t >= RL_WINDOW_MS)) rlHits.delete(k);
    }
  }
  return arr.length > RL_MAX;
}

const MAX = {
  nom: 100,
  email: 150,
  telephone: 30,
  codePostal: 10,
  projet: 200,
  message: 2000,
  ville: 100,
  departement: 100,
  source: 200,
  nicheId: 50,
};

async function handleLeads(req: Request, env: Env): Promise<Response> {
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return json(
      { error: "Trop de demandes, reessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return json({ error: "JSON invalide" }, { status: 400 });
  }

  // Honeypot : un bot remplit ce champ cache, un humain non. On simule un succes.
  if ((body.website ?? "").trim() !== "") {
    return json({ ok: true });
  }

  const nom = (body.nom ?? "").trim();
  const email = (body.email ?? "").trim();
  const telephone = (body.telephone ?? "").trim();
  const codePostal = (body.codePostal ?? "").trim();
  const projet = (body.projet ?? "").trim();
  const nicheId = (body.nicheId ?? "").trim();
  const ville = (body.ville ?? "").trim();
  const departement = (body.departement ?? "").trim();
  const message = (body.message ?? "").trim();
  const source = (body.source ?? "").trim();

  if (!nom || !email || !telephone || !codePostal || !projet || !nicheId) {
    return json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  // Limites de longueur (anti-abus / anti-payload geant).
  if (
    nom.length > MAX.nom ||
    email.length > MAX.email ||
    telephone.length > MAX.telephone ||
    codePostal.length > MAX.codePostal ||
    projet.length > MAX.projet ||
    message.length > MAX.message ||
    ville.length > MAX.ville ||
    departement.length > MAX.departement ||
    source.length > MAX.source ||
    nicheId.length > MAX.nicheId
  ) {
    return json({ error: "Champ trop long" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return json({ error: "Email invalide" }, { status: 400 });
  }
  if (!isValidPhone(telephone)) {
    return json({ error: "Telephone invalide" }, { status: 400 });
  }
  if (!body.consentement) {
    return json({ error: "Consentement RGPD requis" }, { status: 400 });
  }

  const niche = LEAD_NICHES[nicheId];
  const nicheLabel = niche?.label ?? nicheId;
  const cplEstime = niche ? `${niche.cplEstime.min}-${niche.cplEstime.max} EUR` : "n/a";
  const partenaires = niche?.partenairesCibles.join(", ") ?? "n/a";

  // Notification Brevo (envoi email a Fethi avec le lead)
  const brevoKey = env.BREVO_API_KEY;
  const notifyEmail = env.LEADS_NOTIFY_EMAIL ?? "ameur.fethi78@gmail.com";

  if (brevoKey) {
    const subject = `[Lead ${nicheLabel}] ${nom} - ${ville || codePostal}`;
    const html = `
      <h2>Nouveau lead - ${esc(nicheLabel)}</h2>
      <p><strong>Source :</strong> ${esc(source || "n/a")}</p>
      <p><strong>Ville :</strong> ${esc(ville || "n/a")} (${esc(departement)}) - CP ${esc(codePostal)}</p>
      <hr/>
      <p><strong>Nom :</strong> ${esc(nom)}</p>
      <p><strong>Email :</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p><strong>Telephone :</strong> <a href="tel:${esc(telephone)}">${esc(telephone)}</a></p>
      <p><strong>Projet :</strong> ${esc(projet)}</p>
      ${message ? `<p><strong>Message :</strong> ${esc(message)}</p>` : ""}
      <hr/>
      <p><em>CPL marche estime : ${esc(cplEstime)}</em></p>
      <p><em>Partenaires cibles : ${esc(partenaires)}</em></p>
    `.trim();

    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": brevoKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "MesCalculateurs Leads", email: "noreply@mescalculateurs.fr" },
          to: [{ email: notifyEmail, name: "Fethi" }],
          replyTo: { email, name: nom },
          subject,
          htmlContent: html,
        }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error("[leads] Brevo error:", res.status, txt);
        // On ne renvoie pas une erreur au client - on a quand meme capte le lead
      }
    } catch (err) {
      console.error("[leads] Brevo fetch failed:", err);
    }
  } else {
    // Pas de cle Brevo : on log SANS donnees personnelles (RGPD).
    console.warn(`[leads] BREVO_API_KEY absent, lead non envoye (niche=${nicheId})`);
  }

  return json({ ok: true });
}

/* ------------------------------------------------------------------ */
/* /api/indexnow (GET) : pousse toutes les adresses des sitemaps       */
/* ------------------------------------------------------------------ */

const HOST = "mescalculateurs.fr";
const KEY = "8f4d3c2b1a9e8f7d6c5b4a3e2d1c9b8a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const CHUNK = 10000;

async function fetchAllUrls(sitemapIndexUrl: string): Promise<string[]> {
  const indexRes = await fetch(sitemapIndexUrl, { method: "GET" });
  if (!indexRes.ok) {
    throw new Error(
      `Failed to fetch sitemap index ${sitemapIndexUrl}: ${indexRes.status}`
    );
  }
  const indexXml = await indexRes.text();
  const sitemapUrls = [
    ...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map((m) => m[1].trim());

  const all: string[] = [];
  for (const sitemapUrl of sitemapUrls) {
    const res = await fetch(sitemapUrl, { method: "GET" });
    if (!res.ok) {
      console.warn(`Skipping ${sitemapUrl}: HTTP ${res.status}`);
      continue;
    }
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      m[1].trim()
    );
    all.push(...urls);
  }
  return all;
}

async function handleIndexNow(req: Request, env: Env): Promise<Response> {
  const token = req.headers.get("x-admin-token");
  const expectedToken = env.ADMIN_STATS_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const sitemapIndex = `https://${HOST}/sitemap-index.xml`;
    const urls = await fetchAllUrls(sitemapIndex);

    let totalOk = 0;
    let totalFail = 0;

    for (let i = 0; i < urls.length; i += CHUNK) {
      const batch = urls.slice(i, i + CHUNK);
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: HOST,
          key: KEY,
          keyLocation: KEY_LOCATION,
          urlList: batch,
        }),
      });

      const ok = res.ok || res.status === 202;
      if (ok) {
        totalOk += batch.length;
      } else {
        totalFail += batch.length;
        console.warn(
          `Batch ${Math.floor(i / CHUNK) + 1} failed: HTTP ${res.status}`
        );
      }
    }

    return json(
      {
        pushed: totalOk,
        failed: totalFail,
        status: "ok",
        totalUrls: urls.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("IndexNow push error:", error);
    return json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */

const methodNotAllowed = (allow: string) =>
  new Response(null, { status: 405, headers: { allow } });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/leads") {
      return request.method === "POST"
        ? handleLeads(request, env)
        : methodNotAllowed("POST");
    }

    if (pathname === "/api/indexnow") {
      return request.method === "GET" || request.method === "HEAD"
        ? handleIndexNow(request, env)
        : methodNotAllowed("GET, HEAD");
    }

    return env.ASSETS.fetch(request);
  },
};
