"use client";

import { useState } from "react";
import {
  calcAudit,
  montantCarteParType,
  MOYENNE_BANQUE_TRAD,
  MOYENNE_BANQUE_LIGNE,
  type InputsAudit,
  type TypeCarte,
  type TypeBanque,
} from "./calcAuditFraisBancaires";

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const CARTE_LABELS: Record<TypeCarte, string> = {
  aucune: "Aucune carte",
  classic: "Visa/Mastercard Classic",
  premier: "Visa Premier / Gold",
  infinite: "Visa Infinite / Platinum",
};

const BANQUE_LABELS: Record<TypeBanque, string> = {
  traditionnelle: "Banque traditionnelle (Credit Agricole, BNP, SG, LBP...)",
  ligne: "Banque en ligne (Boursobank, Fortuneo, Hello Bank...)",
  neobanque: "Neobanque (Revolut, N26, Lydia...)",
  inconnue: "Je ne sais pas",
};

const PRESETS = [
  {
    label: "Profil moyen",
    emoji: "👤",
    inputs: {
      tenueCompte: 20,
      carte: "classic" as TypeCarte,
      virementsPayants: 10,
      commissionsIntervention: 24,
      rejetsCheque: 0,
      rejetsPrelevement: 0,
      agios: 30,
      gestionDigitale: 0,
      virementsInstantPremium: 0,
      assuranceLiee: 0,
      fraisDesolidarisation: 0,
      fraisEtranger: 0,
    },
  },
  {
    label: "Profil decouvert",
    emoji: "📉",
    inputs: {
      tenueCompte: 25,
      carte: "classic" as TypeCarte,
      virementsPayants: 15,
      commissionsIntervention: 80,
      rejetsCheque: 30,
      rejetsPrelevement: 60,
      agios: 80,
      gestionDigitale: 0,
      virementsInstantPremium: 0,
      assuranceLiee: 0,
      fraisDesolidarisation: 0,
      fraisEtranger: 0,
    },
  },
  {
    label: "Profil voyageur",
    emoji: "✈️",
    inputs: {
      tenueCompte: 25,
      carte: "premier" as TypeCarte,
      virementsPayants: 5,
      commissionsIntervention: 0,
      rejetsCheque: 0,
      rejetsPrelevement: 0,
      agios: 0,
      gestionDigitale: 3,
      virementsInstantPremium: 0,
      assuranceLiee: 0,
      fraisDesolidarisation: 0,
      fraisEtranger: 80,
    },
  },
];

export default function AuditFraisBancaires() {
  const [tenueCompte, setTenueCompte] = useState(20);
  const [carte, setCarte] = useState<TypeCarte>("classic");
  const [carteCustom, setCarteCustom] = useState(false);
  const [carteMontantCustom, setCarteMontantCustom] = useState(95);
  const [virementsPayants, setVirementsPayants] = useState(0);
  const [commissionsIntervention, setCommissionsIntervention] = useState(0);
  const [rejetsCheque, setRejetsCheque] = useState(0);
  const [rejetsPrelevement, setRejetsPrelevement] = useState(0);
  const [agios, setAgios] = useState(0);
  const [gestionDigitale, setGestionDigitale] = useState(0);
  const [virementsInstantPremium, setVirementsInstantPremium] = useState(0);
  const [assuranceLiee, setAssuranceLiee] = useState(0);
  const [fraisDesolidarisation, setFraisDesolidarisation] = useState(0);
  const [fraisEtranger, setFraisEtranger] = useState(0);
  const [typeBanque, setTypeBanque] = useState<TypeBanque>("traditionnelle");
  const [revenuMensuel, setRevenuMensuel] = useState(2500);
  const [fragiliteFinanciere, setFragiliteFinanciere] = useState(false);
  const [showAvance, setShowAvance] = useState(false);

  const carteMontant = carteCustom ? carteMontantCustom : montantCarteParType(carte);

  const inputs: InputsAudit = {
    tenueCompte,
    carte,
    carteMontant,
    virementsPayants,
    commissionsIntervention,
    rejetsCheque,
    rejetsPrelevement,
    agios,
    gestionDigitale,
    virementsInstantPremium,
    assuranceLiee,
    fraisDesolidarisation,
    fraisEtranger,
    typeBanque,
    revenuMensuel,
    fragiliteFinanciere,
  };

  const r = calcAudit(inputs);

  function appliquerPreset(p: (typeof PRESETS)[number]) {
    setTenueCompte(p.inputs.tenueCompte);
    setCarte(p.inputs.carte);
    setCarteCustom(false);
    setVirementsPayants(p.inputs.virementsPayants);
    setCommissionsIntervention(p.inputs.commissionsIntervention);
    setRejetsCheque(p.inputs.rejetsCheque);
    setRejetsPrelevement(p.inputs.rejetsPrelevement);
    setAgios(p.inputs.agios);
    setGestionDigitale(p.inputs.gestionDigitale);
    setVirementsInstantPremium(p.inputs.virementsInstantPremium);
    setAssuranceLiee(p.inputs.assuranceLiee);
    setFraisDesolidarisation(p.inputs.fraisDesolidarisation);
    setFraisEtranger(p.inputs.fraisEtranger);
  }

  // Couleur du score d'abus
  let scoreColor = "text-green-600";
  let scoreBg = "from-green-50 to-emerald-50 border-green-300";
  if (r.scoreAbus > 60) {
    scoreColor = "text-red-700";
    scoreBg = "from-red-50 to-rose-50 border-red-400";
  } else if (r.scoreAbus > 30) {
    scoreColor = "text-orange-600";
    scoreBg = "from-orange-50 to-amber-50 border-orange-300";
  }

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Pre-remplir avec un profil
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => appliquerPreset(p)}
              className="text-left p-3 rounded-xl border-2 border-slate-200 hover:border-blue-400 bg-white transition-all"
            >
              <div className="text-xl mb-1">{p.emoji}</div>
              <div className="font-bold text-slate-800 text-sm">{p.label}</div>
              <div className="text-slate-500 text-xs">Cliquer pour pre-remplir</div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          Vos frais bancaires
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Indiquez le total annuel de chaque type de frais. Si vous ne savez pas, regardez votre <strong>recapitulatif annuel des frais</strong> envoye chaque janvier (obligatoire depuis 2014).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Type de banque */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Type de banque actuelle
            </label>
            <select
              value={typeBanque}
              onChange={(e) => setTypeBanque(e.target.value as TypeBanque)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm"
            >
              {(Object.keys(BANQUE_LABELS) as TypeBanque[]).map((b) => (
                <option key={b} value={b}>{BANQUE_LABELS[b]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Frais de tenue de compte (€/an)
            </label>
            <div className="relative">
              <input
                type="number"
                value={tenueCompte}
                onChange={(e) => setTenueCompte(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Moyenne 2026 : 20,60 €</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Carte bancaire
              <button
                onClick={() => setCarteCustom(!carteCustom)}
                className="ml-2 text-xs text-blue-600 hover:underline"
              >
                {carteCustom ? "Tarif moyen" : "Personnaliser"}
              </button>
            </label>
            {carteCustom ? (
              <div className="relative">
                <input
                  type="number"
                  value={carteMontantCustom}
                  onChange={(e) => setCarteMontantCustom(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€/an</span>
              </div>
            ) : (
              <select
                value={carte}
                onChange={(e) => setCarte(e.target.value as TypeCarte)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm"
              >
                {(Object.keys(CARTE_LABELS) as TypeCarte[]).map((c) => (
                  <option key={c} value={c}>
                    {CARTE_LABELS[c]} {c !== "aucune" && `(${fmtInt(montantCarteParType(c))} €/an)`}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Commissions d&apos;intervention (€/an)
            </label>
            <div className="relative">
              <input
                type="number"
                value={commissionsIntervention}
                onChange={(e) => setCommissionsIntervention(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">8 €/op max, plafond 80 €/mois (20 € si fragilite)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Agios / decouvert (€/an)
            </label>
            <div className="relative">
              <input
                type="number"
                value={agios}
                onChange={(e) => setAgios(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Frais de gestion digitale (€/mois)
              <span className="ml-2 text-xs text-red-600 font-bold">⚠ NOUVEAU 2026</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={gestionDigitale}
                onChange={(e) => setGestionDigitale(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€/mois</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Etait gratuit avant 2026. Beaucoup facturent 2 a 5 €/mois.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Revenu net mensuel
            </label>
            <div className="relative">
              <input
                type="number"
                value={revenuMensuel}
                onChange={(e) => setRevenuMensuel(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Pour la recommandation banque</p>
          </div>

          {/* Bouton avance */}
          <div className="md:col-span-2">
            <button
              onClick={() => setShowAvance(!showAvance)}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              {showAvance ? "▼ Masquer les frais avances" : "▶ Afficher les frais avances (rejets, etranger, assurance liee...)"}
            </button>
          </div>

          {showAvance && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Virements payants (€/an)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={virementsPayants}
                    onChange={(e) => setVirementsPayants(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Virements occasionnels guichet/agence (~5 € par op)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Virements instantanes payants (€/an)
                  <span className="ml-2 text-xs text-red-600 font-bold">⚠ ILLEGAL</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={virementsInstantPremium}
                    onChange={(e) => setVirementsInstantPremium(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Doivent etre gratuits depuis le 9/1/2025 (loi UE)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Frais de rejet de cheque (€/an)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rejetsCheque}
                    onChange={(e) => setRejetsCheque(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">30 € max si ≤ 50 €, 50 € max si &gt; 50 €</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Frais de rejet de prelevement (€/an)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rejetsPrelevement}
                    onChange={(e) => setRejetsPrelevement(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">20 € max par rejet</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Assurance liee aux moyens de paiement (€/mois)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={assuranceLiee}
                    onChange={(e) => setAssuranceLiee(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€/mois</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Souvent inutile (deja couvert par carte premium)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Frais de desolidarisation (€/an)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={fraisDesolidarisation}
                    onChange={(e) => setFraisDesolidarisation(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Compte joint, env. 30 €</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Frais a l&apos;etranger (€/an)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={fraisEtranger}
                    onChange={(e) => setFraisEtranger(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-lg border border-slate-300 p-2.5 pr-8 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
                </div>
              </div>

              <div className="flex items-center md:col-span-2">
                <input
                  type="checkbox"
                  id="fragilite"
                  checked={fragiliteFinanciere}
                  onChange={(e) => setFragiliteFinanciere(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="fragilite" className="ml-2 text-sm text-slate-700">
                  Je suis en situation de <strong>fragilite financiere</strong> (plafond commissions a 20 €/mois)
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Resultat principal */}
      <div className={`rounded-2xl border-2 shadow-sm p-6 bg-gradient-to-br ${scoreBg}`}>
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-slate-700 mb-1">
            Vous payez chaque annee
          </div>
          <div className={`text-5xl font-black ${scoreColor}`}>
            {fmt(r.totalAnnuel)} €
          </div>
          <div className="text-sm text-slate-600 mt-1">
            soit {fmt(r.totalMensuel)} €/mois de frais bancaires
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Moyenne nationale</div>
            <div className="text-xl font-bold text-slate-700">{MOYENNE_BANQUE_TRAD} €/an</div>
            <div className={`text-sm font-medium mt-1 ${
              r.excedentVsMoyenne > 0 ? "text-red-600" : "text-green-600"
            }`}>
              {r.excedentVsMoyenne > 0 ? "+" : ""}{fmt(r.excedentVsMoyenne)} € vs moyenne
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Banque en ligne</div>
            <div className="text-xl font-bold text-slate-700">{MOYENNE_BANQUE_LIGNE} €/an</div>
            <div className="text-sm font-medium text-green-600 mt-1">
              Economie : {fmt(Math.max(0, r.excedentVsBanqueLigne))} €/an
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Score d&apos;abus</div>
            <div className={`text-xl font-bold ${scoreColor}`}>{r.scoreAbus}/100</div>
            <div className="text-sm text-slate-600 mt-1">
              {r.scoreAbus < 30 ? "Tarifs corrects" : r.scoreAbus < 60 ? "A surveiller" : "Tarifs abusifs"}
            </div>
          </div>
        </div>

        {/* Jauge */}
        <div className="bg-white/70 rounded-xl p-4">
          <div className="flex justify-between text-xs text-slate-600 mb-2">
            <span>0 €</span>
            <span>{MOYENNE_BANQUE_LIGNE} € (banque ligne)</span>
            <span>{MOYENNE_BANQUE_TRAD} € (moyenne)</span>
            <span>500 €</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 relative overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all ${
                r.totalAnnuel > 400 ? "bg-red-500" :
                r.totalAnnuel > MOYENNE_BANQUE_TRAD ? "bg-orange-500" :
                r.totalAnnuel > 100 ? "bg-yellow-500" :
                "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, (r.totalAnnuel / 500) * 100)}%` }}
            />
            <div className="absolute top-0 left-[7%] w-0.5 h-3 bg-green-700" title="Banque en ligne" />
            <div className="absolute top-0 left-[43%] w-0.5 h-3 bg-orange-700" title="Moyenne" />
          </div>
        </div>
      </div>

      {/* Alertes */}
      {r.alertes.length > 0 && (
        <div className="space-y-3">
          {r.alertes.map((a, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border-2 ${
                a.type === "rouge"
                  ? "bg-red-50 border-red-300"
                  : a.type === "orange"
                  ? "bg-orange-50 border-orange-300"
                  : "bg-blue-50 border-blue-300"
              }`}
            >
              <div className={`font-bold mb-1 ${
                a.type === "rouge" ? "text-red-800" :
                a.type === "orange" ? "text-orange-800" :
                "text-blue-800"
              }`}>
                {a.type === "rouge" ? "🚨 " : a.type === "orange" ? "⚠️ " : "ℹ️ "}{a.titre}
              </div>
              <p className={`text-sm ${
                a.type === "rouge" ? "text-red-700" :
                a.type === "orange" ? "text-orange-700" :
                "text-blue-700"
              }`}>
                {a.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Frais caches detectes */}
      {r.fraisCachesDetectes.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            🔍 Frais caches 2026 detectes ({r.fraisCachesDetectes.length})
          </h2>
          <div className="space-y-3">
            {r.fraisCachesDetectes.map((f, i) => (
              <div key={i} className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{f.emoji}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800">{f.nom}</h3>
                      <span className="font-bold text-red-700">{fmt(f.montantAnnuel)} €/an</span>
                    </div>
                    <p className="text-sm text-slate-700">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ventilation */}
      {r.ventilation.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Ou va votre argent ?
          </h2>
          <div className="space-y-3">
            {r.ventilation.map((v, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{v.categorie}</span>
                  <span className="font-bold text-slate-800">{fmt(v.montant)} € ({v.pourcentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${v.couleur}`}
                    style={{ width: `${v.pourcentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projection */}
      {r.excedentVsBanqueLigne > 0 && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-red-800 mb-4">
            💸 Combien vous allez perdre si vous ne changez rien
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Sur 1 an</div>
              <div className="text-2xl font-black text-red-700">{fmt(r.excedentVsBanqueLigne)} €</div>
            </div>
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Sur 5 ans</div>
              <div className="text-2xl font-black text-red-700">{fmtInt(r.perte5Ans)} €</div>
            </div>
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Sur 10 ans</div>
              <div className="text-2xl font-black text-red-700">{fmtInt(r.perte10Ans)} €</div>
            </div>
          </div>
          <p className="text-xs text-red-700 mt-3 text-center">
            Calcule sur la base d&apos;une banque en ligne a 35 €/an. Sans tenir compte de l&apos;inflation ni des hausses tarifaires annuelles.
          </p>
        </div>
      )}

      {/* Recommandation banque */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-300 shadow-sm p-6">
        <h2 className="text-lg font-bold text-emerald-800 mb-4">
          🏆 Notre recommandation pour votre profil
        </h2>
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{r.banqueRecommandee.emoji}</div>
            <div>
              <h3 className="font-bold text-xl text-slate-800">{r.banqueRecommandee.nom}</h3>
              <p className="text-sm text-slate-500">{r.banqueRecommandee.type}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-500">Frais annuels</div>
              <div className="text-lg font-bold text-emerald-700">{fmt(r.banqueRecommandee.fraisAnnuelsEstimes)} €</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-500">Economie</div>
              <div className="text-lg font-bold text-emerald-700">{fmt(r.banqueRecommandee.economieAnnuelle)} €/an</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-500">Prime offerte</div>
              <div className="text-sm font-bold text-emerald-700">{r.banqueRecommandee.prime}</div>
            </div>
          </div>
          <p className="text-sm text-slate-700">
            <strong>Pourquoi ?</strong> {r.banqueRecommandee.pourquoi}
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Recommandation basee sur votre profil. Comparez toujours plusieurs offres avant de changer de banque.
        </p>
      </div>

      {/* Conseils */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="font-bold text-blue-800 mb-3">💡 3 actions immediates pour reduire vos frais</h3>
        <ol className="space-y-2 text-sm text-blue-900 list-decimal list-inside">
          <li><strong>Demandez le recapitulatif annuel des frais</strong> a votre banque (envoye automatiquement en janvier).</li>
          <li><strong>Contestez les frais abusifs</strong> par lettre recommandee. La banque a 2 mois pour repondre. En cas de refus, saisissez le mediateur bancaire (gratuit).</li>
          <li><strong>Utilisez la mobilite bancaire</strong> : depuis 2017, votre nouvelle banque s&apos;occupe gratuitement du transfert de tous vos virements et prelevements. C&apos;est automatique en 22 jours.</li>
        </ol>
      </div>
    </div>
  );
}
