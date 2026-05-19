"use client";

import { useState } from "react";
import { calculerZakat, type EcoleNisab, type InputZakat } from "./zakatCalc";

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function CalculZakat() {
  const [ecole, setEcole] = useState<EcoleNisab>("or");
  const [cash, setCash] = useState<string>("5000");
  const [or_grammes, setOrGrammes] = useState<string>("0");
  const [argent_grammes, setArgentGrammes] = useState<string>("0");
  const [prix_or_eur_g, setPrixOrEurG] = useState<string>("125");
  const [prix_argent_eur_g, setPrixArgentEurG] = useState<string>("2.57");
  const [actions_valeur, setActionsValeur] = useState<string>("0");
  const [scpi_valeur, setScpiValeur] = useState<string>("0");
  const [crypto_valeur, setCryptoValeur] = useState<string>("0");
  const [epargne_assurance, setEpargneAssurance] = useState<string>("0");
  const [inventaire_pro, setInventairePro] = useState<string>("0");
  const [creances, setCreances] = useState<string>("0");
  const [bijoux_valeur, setBijouValeur] = useState<string>("0");
  const [bijoux_inclure, setBijouInclure] = useState<boolean>(false);
  const [dettes_court_terme, setDettesCourt] = useState<string>("0");
  const [hawl, setHawl] = useState<boolean>(true);

  const input: InputZakat = {
    cash: parseFloat(cash) || 0,
    or_grammes: parseFloat(or_grammes) || 0,
    argent_grammes: parseFloat(argent_grammes) || 0,
    prix_or_eur_g: parseFloat(prix_or_eur_g) || 0,
    prix_argent_eur_g: parseFloat(prix_argent_eur_g) || 0,
    actions_valeur: parseFloat(actions_valeur) || 0,
    scpi_valeur: parseFloat(scpi_valeur) || 0,
    crypto_valeur: parseFloat(crypto_valeur) || 0,
    epargne_assurance: parseFloat(epargne_assurance) || 0,
    inventaire_pro: parseFloat(inventaire_pro) || 0,
    creances: parseFloat(creances) || 0,
    bijoux_valeur: parseFloat(bijoux_valeur) || 0,
    bijoux_inclure,
    dettes_court_terme: parseFloat(dettes_court_terme) || 0,
    ecole,
  };

  const resultat = calculerZakat(input);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire - 3 cols */}
      <div className="lg:col-span-3 space-y-8">
        {/* Ecole - Choix nisab */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-600 mb-3">
            Ecole et nisab
          </label>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setEcole("or")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                ecole === "or"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Majoritaire (nisab or)
            </button>
            <button
              onClick={() => setEcole("argent")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                ecole === "argent"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Hanafite (nisab argent)
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Majoritaire: Maliki, Chafii, Hanbali, ECFR. Hanafite: ecole historique.
          </p>
        </div>

        {/* Section Cours du jour */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Cours du jour</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="prix_or" className="block text-sm font-medium text-slate-600 mb-2">
                Prix or (€/g)
              </label>
              <div className="relative">
                <input
                  id="prix_or"
                  type="number"
                  value={prix_or_eur_g}
                  onChange={(e) => setPrixOrEurG(e.target.value)}
                  placeholder="ex: 125"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label htmlFor="prix_argent" className="block text-sm font-medium text-slate-600 mb-2">
                Prix argent (€/g)
              </label>
              <div className="relative">
                <input
                  id="prix_argent"
                  type="number"
                  value={prix_argent_eur_g}
                  onChange={(e) => setPrixArgentEurG(e.target.value)}
                  placeholder="ex: 2.57"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                  step="0.01"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Cours indicatifs. Consultez{" "}
            <a href="https://or.fr/cours/or" target="_blank" rel="noopener noreferrer" className="underline text-emerald-600">
              or.fr/cours/or
            </a>{" "}
            et{" "}
            <a href="https://or.fr/cours/argent" target="_blank" rel="noopener noreferrer" className="underline text-emerald-600">
              or.fr/cours/argent
            </a>
            .
          </p>
        </div>

        {/* Section Mon patrimoine */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Mon patrimoine</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="cash" className="block text-sm font-medium text-slate-600 mb-2">
                Cash et comptes (€)
              </label>
              <input
                id="cash"
                type="number"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
            <div>
              <label htmlFor="epargne" className="block text-sm font-medium text-slate-600 mb-2">
                Épargne et assurance-vie (€)
              </label>
              <input
                id="epargne"
                type="number"
                value={epargne_assurance}
                onChange={(e) => setEpargneAssurance(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="or_g" className="block text-sm font-medium text-slate-600 mb-2">
                Or détenu (grammes)
              </label>
              <input
                id="or_g"
                type="number"
                value={or_grammes}
                onChange={(e) => setOrGrammes(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="1"
              />
            </div>
            <div>
              <label htmlFor="argent_g" className="block text-sm font-medium text-slate-600 mb-2">
                Argent détenu (grammes)
              </label>
              <input
                id="argent_g"
                type="number"
                value={argent_grammes}
                onChange={(e) => setArgentGrammes(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="actions" className="block text-sm font-medium text-slate-600 mb-2">
                Actions et parts (€)
              </label>
              <input
                id="actions"
                type="number"
                value={actions_valeur}
                onChange={(e) => setActionsValeur(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
            <div>
              <label htmlFor="scpi" className="block text-sm font-medium text-slate-600 mb-2">
                SCPI (€)
              </label>
              <input
                id="scpi"
                type="number"
                value={scpi_valeur}
                onChange={(e) => setScpiValeur(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="crypto" className="block text-sm font-medium text-slate-600 mb-2">
                Cryptomonnaies (€)
              </label>
              <input
                id="crypto"
                type="number"
                value={crypto_valeur}
                onChange={(e) => setCryptoValeur(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
            <div>
              <label htmlFor="inventaire" className="block text-sm font-medium text-slate-600 mb-2">
                Inventaire commercial (€)
              </label>
              <input
                id="inventaire"
                type="number"
                value={inventaire_pro}
                onChange={(e) => setInventairePro(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="creances" className="block text-sm font-medium text-slate-600 mb-2">
                Créances recouvrables (€)
              </label>
              <input
                id="creances"
                type="number"
                value={creances}
                onChange={(e) => setCreances(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
            <div>
              <label htmlFor="bijoux" className="block text-sm font-medium text-slate-600 mb-2">
                Valeur bijoux (€)
              </label>
              <input
                id="bijoux"
                type="number"
                value={bijoux_valeur}
                onChange={(e) => setBijouValeur(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                step="100"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bijoux_inclure}
                onChange={(e) => setBijouInclure(e.target.checked)}
                className="w-5 h-5 accent-emerald-600"
              />
              <span className="text-sm font-medium text-slate-700">
                Inclure les bijoux portés dans le calcul
              </span>
            </label>
            <p className="text-xs text-slate-500 mt-2 ml-8">
              Hanafite: oui (toujours). Autres: non si portés a usage habituel.
            </p>
          </div>
        </div>

        {/* Section Dettes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Mes dettes</h3>
          <div>
            <label htmlFor="dettes" className="block text-sm font-medium text-slate-600 mb-2">
              Dettes court terme (€) — payables 12 prochains mois
            </label>
            <input
              id="dettes"
              type="number"
              value={dettes_court_terme}
              onChange={(e) => setDettesCourt(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
              step="100"
            />
            <p className="text-xs text-slate-400 mt-2">
              Factures, loyers, impôts dus, mensualités crédit. PAS les prêts long terme.
            </p>
          </div>
        </div>

        {/* Section Hawl */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Hawl (année lunaire)</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hawl}
              onChange={(e) => setHawl(e.target.checked)}
              className="w-5 h-5 accent-emerald-600"
            />
            <span className="text-sm font-medium text-slate-700">
              Je possède ce patrimoine depuis au moins 1 année lunaire (354 jours)
            </span>
          </label>
          <p className="text-xs text-slate-500 mt-3">
            La Zakat ne s&apos;applique que si le patrimoine ≥ nisab pendant toute une année lunaire.
          </p>
        </div>
      </div>

      {/* Resultats - 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        {resultat.patrimoine_net > 0 ? (
          <>
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-6 shadow-lg shadow-emerald-200/50">
              <p className="text-sm text-emerald-100 mb-1">Votre Zakat annuelle</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(resultat.zakat, 2)}{" "}
                <span className="text-lg font-semibold">€</span>
              </p>
              {!hawl && (
                <p className="text-xs text-emerald-100 mt-2 italic">
                  ⚠️ Hawl non respecté — Zakat non encore due
                </p>
              )}
              {!resultat.eligible && (
                <p className="text-xs text-emerald-100 mt-2 italic">
                  ⚠️ Patrimoine &lt; nisab — pas de Zakat due
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Patrimoine brut</p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmt(resultat.patrimoine_brut, 2)} €
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Moins dettes court terme</p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmt(input.dettes_court_terme, 2)} €
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Patrimoine net</p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmt(resultat.patrimoine_net, 2)} €
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    Nisab {resultat.ecole === "or" ? "or" : "argent"} actuel
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmt(resultat.nisab_applique, 2)} €
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Statut</p>
                  <p className={`text-lg font-bold ${resultat.eligible && hawl ? "text-emerald-600" : "text-slate-500"}`}>
                    {resultat.eligible && hawl ? "✓ Zakatable" : "✗ Non zakatable"}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-400">
              Entrez votre patrimoine pour calculer
            </p>
          </div>
        )}

        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs text-emerald-700 leading-relaxed">
          Calcul conforme avis ECFR/CFCM. Consulter un imam pour situation complexe.
        </div>
      </div>

      {/* Tableau comparatif nisab */}
      <div className="lg:col-span-5 mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Nisab comparé</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Ecole</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Matière</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Quantité</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Nisab €</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 font-semibold text-slate-800">Majoritaire</td>
                <td className="py-3 px-2 text-slate-600">Or 24k</td>
                <td className="py-3 px-2 text-slate-600">85 g</td>
                <td className="py-3 px-2 font-semibold text-slate-800">
                  {fmt(resultat.nisab_or, 2)} €
                </td>
                <td className="py-3 px-2 text-slate-500">Maliki, Chafii, Hanbali, ECFR</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="py-3 px-2 font-semibold text-slate-800">Hanafite</td>
                <td className="py-3 px-2 text-slate-600">Argent</td>
                <td className="py-3 px-2 text-slate-600">595 g</td>
                <td className="py-3 px-2 font-semibold text-slate-800">
                  {fmt(resultat.nisab_argent, 2)} €
                </td>
                <td className="py-3 px-2 text-slate-500">Ecole historique, nisab bas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
