"use client";
import { useState } from "react";

interface Mention {
  id: number;
  label: string;
  description: string;
  categorie: "identite" | "contenu" | "prix" | "legal";
  status: "present" | "absent" | "na";
}

const MENTIONS_INIT: Mention[] = [
  { id: 1, label: "Date du devis", description: "Date a laquelle le devis est etabli", categorie: "identite", status: "absent" },
  { id: 2, label: "Numero du devis", description: "Numerotation chronologique unique", categorie: "identite", status: "absent" },
  { id: 3, label: "Nom et adresse de l'entreprise", description: "Raison sociale + adresse du siege", categorie: "identite", status: "absent" },
  { id: 4, label: "Numero SIRET", description: "14 chiffres identifiant l'etablissement", categorie: "identite", status: "absent" },
  { id: 5, label: "Forme juridique", description: "SARL, SAS, EI, auto-entrepreneur, etc.", categorie: "identite", status: "absent" },
  { id: 6, label: "Nom et adresse du client", description: "Identite complete du destinataire", categorie: "identite", status: "absent" },
  { id: 7, label: "Description detaillee des travaux", description: "Nature et etendue de chaque prestation", categorie: "contenu", status: "absent" },
  { id: 8, label: "Quantites et prix unitaires HT", description: "Detail poste par poste", categorie: "prix", status: "absent" },
  { id: 9, label: "Taux de TVA applicable(s)", description: "20%, 10%, 5,5% selon les travaux", categorie: "prix", status: "absent" },
  { id: 10, label: "Montant total HT et TTC", description: "Totaux hors taxe et toutes taxes comprises", categorie: "prix", status: "absent" },
  { id: 11, label: "Duree de validite du devis", description: "Combien de temps l'offre est valable", categorie: "legal", status: "absent" },
  { id: 12, label: "Conditions de paiement", description: "Echeancier, acompte, delais", categorie: "legal", status: "absent" },
  { id: 13, label: "Assurance decennale", description: "N° de police + nom assureur (obligatoire BTP)", categorie: "legal", status: "absent" },
  { id: 14, label: "Mention gestion des dechets", description: "Obligatoire pour travaux depuis 2021", categorie: "legal", status: "absent" },
  { id: 15, label: "Date de debut et duree des travaux", description: "Quand et combien de temps", categorie: "contenu", status: "absent" },
  { id: 16, label: "Signature du client", description: "\"Devis recu avant execution\" + signature", categorie: "legal", status: "absent" },
];

const CATEGORIES = [
  { id: "identite" as const, label: "Identite", emoji: "🏢" },
  { id: "contenu" as const, label: "Contenu", emoji: "📝" },
  { id: "prix" as const, label: "Prix", emoji: "💰" },
  { id: "legal" as const, label: "Legal", emoji: "⚖️" },
];

export default function VerificateurDevis() {
  const [mentions, setMentions] = useState<Mention[]>(MENTIONS_INIT);
  const [secteur, setSecteur] = useState<"btp" | "services" | "commerce">("btp");

  const toggleMention = (id: number) => {
    setMentions(mentions.map((m) => {
      if (m.id !== id) return m;
      if (m.status === "absent") return { ...m, status: "present" };
      if (m.status === "present") return { ...m, status: "na" };
      return { ...m, status: "absent" };
    }));
  };

  const mentionsActives = mentions.filter((m) => {
    if (secteur !== "btp" && (m.id === 13 || m.id === 14)) return false;
    return true;
  });

  const presentes = mentionsActives.filter((m) => m.status === "present").length;
  const na = mentionsActives.filter((m) => m.status === "na").length;
  const total = mentionsActives.length - na;
  const score = total > 0 ? presentes : 0;
  const pourcent = total > 0 ? Math.round((presentes / total) * 100) : 0;

  const verdict = pourcent >= 90 ? "conforme" : pourcent >= 60 ? "a corriger" : "non conforme";

  const reset = () => setMentions(MENTIONS_INIT);

  return (
    <div className="space-y-8">
      {/* Choix du secteur */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-700 mb-3">Type d&apos;activite</p>
        <div className="flex gap-2">
          {[
            { v: "btp" as const, label: "BTP / Travaux", desc: "16 mentions" },
            { v: "services" as const, label: "Services", desc: "14 mentions" },
            { v: "commerce" as const, label: "Commerce", desc: "14 mentions" },
          ].map((s) => (
            <button key={s.v} onClick={() => setSecteur(s.v)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${secteur === s.v ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 text-slate-600 hover:border-blue-300"}`}>
              <p>{s.label}</p>
              <p className="text-xs opacity-70">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Score en temps reel */}
      <div className={`rounded-2xl p-6 shadow-lg text-white ${
        verdict === "conforme" ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-200/50" :
        verdict === "a corriger" ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-200/50" :
        "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-200/50"
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80 mb-1">Score de conformite</p>
            <p className="text-5xl font-extrabold">{score}<span className="text-2xl font-semibold">/{total}</span></p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{pourcent}%</p>
            <p className="text-sm opacity-80 capitalize">{verdict}</p>
          </div>
        </div>
        {/* Barre de progression */}
        <div className="mt-4 w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div className="h-3 rounded-full bg-white/80 transition-all duration-500" style={{ width: `${pourcent}%` }} />
        </div>
      </div>

      {/* Checklist par categorie */}
      {CATEGORIES.map((cat) => {
        const catMentions = mentionsActives.filter((m) => m.categorie === cat.id);
        if (catMentions.length === 0) return null;
        const catPresentes = catMentions.filter((m) => m.status === "present").length;

        return (
          <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>{cat.emoji}</span> {cat.label}
              </h2>
              <span className="text-sm font-medium text-slate-400">{catPresentes}/{catMentions.length}</span>
            </div>
            <div className="space-y-2">
              {catMentions.map((m) => (
                <button
                  key={m.id}
                  onClick={() => toggleMention(m.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    m.status === "present" ? "bg-green-50 border border-green-200" :
                    m.status === "na" ? "bg-slate-50 border border-slate-200 opacity-50" :
                    "bg-red-50/50 border border-red-100 hover:border-red-200"
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    m.status === "present" ? "bg-green-100 text-green-600" :
                    m.status === "na" ? "bg-slate-200 text-slate-400" :
                    "bg-red-100 text-red-500"
                  }`}>
                    {m.status === "present" ? "\u2713" : m.status === "na" ? "—" : m.id}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${m.status === "na" ? "text-slate-400 line-through" : "text-slate-700"}`}>{m.label}</p>
                    <p className="text-xs text-slate-400">{m.description}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    m.status === "present" ? "bg-green-100 text-green-700" :
                    m.status === "na" ? "bg-slate-100 text-slate-400" :
                    "bg-red-100 text-red-600"
                  }`}>
                    {m.status === "present" ? "OK" : m.status === "na" ? "N/A" : "Manquant"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Legende + reset */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-xs text-slate-500">
          <span>Cliquez : <strong>Manquant</strong> → <strong className="text-green-600">OK</strong> → <strong className="text-slate-400">N/A</strong> → ...</span>
        </div>
        <button onClick={reset} className="text-xs text-slate-400 hover:text-red-500 transition-colors">
          Reinitialiser
        </button>
      </div>
    </div>
  );
}
