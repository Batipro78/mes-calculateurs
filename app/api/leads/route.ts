import { NextResponse } from "next/server";
import { LEAD_NICHES } from "../../lib/leads-config";

export const runtime = "nodejs";

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

// Rate-limit en memoire (best-effort, par instance serverless). Premier rempart
// anti-flood ; pour une protection forte multi-instances il faudrait un store
// partage (ex: Upstash). Suffisant ici combine au honeypot.
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

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes, reessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  // Honeypot : un bot remplit ce champ cache, un humain non. On simule un succes.
  if ((body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
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
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
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
    return NextResponse.json({ error: "Champ trop long" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }
  if (!isValidPhone(telephone)) {
    return NextResponse.json({ error: "Telephone invalide" }, { status: 400 });
  }
  if (!body.consentement) {
    return NextResponse.json({ error: "Consentement RGPD requis" }, { status: 400 });
  }

  const niche = LEAD_NICHES[nicheId];
  const nicheLabel = niche?.label ?? nicheId;
  const cplEstime = niche ? `${niche.cplEstime.min}-${niche.cplEstime.max} EUR` : "n/a";
  const partenaires = niche?.partenairesCibles.join(", ") ?? "n/a";

  // Notification Brevo (envoi email a Fethi avec le lead)
  const brevoKey = process.env.BREVO_API_KEY;
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL ?? "ameur.fethi78@gmail.com";

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

  return NextResponse.json({ ok: true });
}
