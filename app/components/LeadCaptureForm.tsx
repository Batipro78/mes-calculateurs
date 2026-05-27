"use client";

import { useState, type FormEvent } from "react";
import { LEAD_NICHES, type LeadNiche } from "../lib/leads-config";

type Props = {
  nicheId: keyof typeof LEAD_NICHES;
  ville?: string;
  departement?: string;
  /** override de l'accroche (titre du bloc) */
  titreOverride?: string;
  /** couleur dominante en hex (defaut: orange) */
  couleur?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadCaptureForm({ nicheId, ville, departement, titreOverride, couleur = "#ea580c" }: Props) {
  const niche: LeadNiche = LEAD_NICHES[nicheId];
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (!niche) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      nicheId,
      ville: ville ?? "",
      departement: departement ?? "",
      nom: String(formData.get("nom") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      telephone: String(formData.get("telephone") || "").trim(),
      projet: String(formData.get("projet") || "").trim(),
      codePostal: String(formData.get("codePostal") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      consentement: formData.get("consentement") === "on",
      source: typeof window !== "undefined" ? window.location.pathname : "",
    };

    if (!payload.nom || !payload.email || !payload.telephone) {
      setStatus("error");
      setErrorMsg("Merci de remplir le nom, l'email et le telephone.");
      return;
    }
    if (!payload.consentement) {
      setStatus("error");
      setErrorMsg("Merci de cocher le consentement RGPD.");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `HTTP ${res.status}`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur reseau");
    }
  }

  const titre = titreOverride
    ?? (ville
        ? `Obtenez 3 devis gratuits a ${ville} pour : ${niche.label.toLowerCase()}`
        : `Obtenez 3 devis gratuits pour : ${niche.label.toLowerCase()}`);

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-6 md:p-8 my-8 border"
        style={{ background: `${couleur}10`, borderColor: `${couleur}40` }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl shrink-0"
            style={{ background: couleur }}
          >
            ✓
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Demande envoyee. Merci !</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Vous allez recevoir un appel ou un email sous 48h d&apos;artisans certifies RGE
              {ville ? ` a ${ville}` : ""}. Aucun frais. Aucun engagement.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 md:p-8 my-8 border bg-white shadow-sm"
      style={{ borderColor: `${couleur}30` }}
    >
      <div className="flex items-start gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl shrink-0"
          style={{ background: couleur }}
        >
          {niche.emoji}
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">{titre}</h3>
          <p className="text-sm text-slate-500 mt-1">
            Recevez 3 devis d&apos;artisans certifies RGE en 48h. Gratuit, sans engagement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          name="nom"
          required
          autoComplete="name"
          placeholder="Nom et prenom *"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm bg-white"
        />
        <input
          name="email"
          required
          type="email"
          autoComplete="email"
          placeholder="Email *"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm bg-white"
        />
        <input
          name="telephone"
          required
          type="tel"
          autoComplete="tel"
          placeholder="Telephone *"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm bg-white"
        />
        <input
          name="codePostal"
          required
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          placeholder={`Code postal${ville ? ` (${ville})` : ""} *`}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm bg-white"
        />
      </div>

      <select
        name="projet"
        required
        defaultValue=""
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm bg-white mb-3"
      >
        <option value="" disabled>{niche.champProjet} *</option>
        {niche.optionsProjet.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      <textarea
        name="message"
        rows={2}
        placeholder="Precisions (facultatif)"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm bg-white mb-3 resize-none"
      />

      <label className="flex items-start gap-2 text-xs text-slate-600 mb-4 cursor-pointer">
        <input type="checkbox" name="consentement" className="mt-0.5 cursor-pointer" />
        <span>
          J&apos;accepte d&apos;etre recontacte par des partenaires certifies RGE pour mon projet et que mes donnees soient traitees conformement au RGPD. Voir la <a href="/confidentialite" className="underline">politique de confidentialite</a>.
        </span>
      </label>

      {errorMsg && (
        <p className="text-sm text-rose-600 mb-3">⚠ {errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-6 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-40 transition hover:opacity-90"
        style={{ background: couleur }}
      >
        {status === "submitting" ? "Envoi en cours…" : "Recevoir mes 3 devis gratuits"}
      </button>

      <p className="text-[11px] text-slate-400 mt-3">
        Service gratuit. Vos donnees ne sont jamais revendues. Vous recevez uniquement les devis demandes.
      </p>
    </form>
  );
}
