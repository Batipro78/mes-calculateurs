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
};

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function isValidPhone(p: string) {
  // accepte 0X XX XX XX XX, +33..., espaces / points / tirets
  return /^[+0-9][0-9\s.\-]{7,18}$/.test(p);
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const nom = (body.nom ?? "").trim();
  const email = (body.email ?? "").trim();
  const telephone = (body.telephone ?? "").trim();
  const codePostal = (body.codePostal ?? "").trim();
  const projet = (body.projet ?? "").trim();
  const nicheId = (body.nicheId ?? "").trim();

  if (!nom || !email || !telephone || !codePostal || !projet || !nicheId) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
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
    const subject = `[Lead ${nicheLabel}] ${nom} - ${body.ville || codePostal}`;
    const html = `
      <h2>Nouveau lead - ${nicheLabel}</h2>
      <p><strong>Source :</strong> ${body.source || "n/a"}</p>
      <p><strong>Ville :</strong> ${body.ville || "n/a"} (${body.departement || ""}) - CP ${codePostal}</p>
      <hr/>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Telephone :</strong> <a href="tel:${telephone}">${telephone}</a></p>
      <p><strong>Projet :</strong> ${projet}</p>
      ${body.message ? `<p><strong>Message :</strong> ${body.message}</p>` : ""}
      <hr/>
      <p><em>CPL marche estime : ${cplEstime}</em></p>
      <p><em>Partenaires cibles : ${partenaires}</em></p>
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
    console.warn("[leads] BREVO_API_KEY absent, lead non envoye par email :", {
      nicheId, nom, email, telephone, ville: body.ville, codePostal, projet,
    });
  }

  return NextResponse.json({ ok: true });
}
