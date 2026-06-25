"use client";

import { useState } from "react";
import {
  calculerClim,
  type Isolation,
  type Exposition,
} from "./climatisationCalc";

const TARIF_BASE = 0.2516; // EUR/kWh, tarif EDF Bleu 2026
const EER_DEFAUT = 3.2;

function fmt(n: number, dec = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

const ISOLATIONS: { val: Isolation; label: string; desc: string }[] = [
  { val: "bonne", label: "Bonne", desc: "Recent / bien isole / double vitrage" },
  { val: "standard", label: "Standard", desc: "Logement classique" },
  { val: "faible", label: "Faible", desc: "Ancien / mal isole / simple vitrage" },
];

const EXPOSITIONS: { val: Exposition; label: string; desc: string }[] = [
  { val: "ombragee", label: "Ombragee", desc: "Nord / peu de soleil" },
  { val: "mixte", label: "Mixte", desc: "Ensoleillement moyen" },
  { val: "ensoleillee", label: "Ensoleillee", desc: "Sud / plein soleil" },
];

export default function PuissanceClimatisation() {
  const [surface, setSurface] = useState("25");
  const [hauteur, setHauteur] = useState("2.5");
  const [isolation, setIsolation] = useState<Isolation>("standard");
  const [exposition, setExposition] = useState<Exposition>("mixte");
  const [sousToit, setSousToit] = useState(false);
  const [occupants, setOccupants] = useState("2");
  const [heuresJour, setHeuresJour] = useState("8");

  const r = calculerClim({
    surface: parseFloat(surface) || 0,
    hauteur: parseFloat(hauteur) || 0,
    isolation,
    exposition,
    sousToit,
    occupants: parseInt(occupants) || 0,
    heuresJour: parseFloat(heuresJour) || 0,
    prixKwh: TARIF_BASE,
    eer: EER_DEFAUT,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Surface + hauteur */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="surface" className="block text-sm font-medium text-slate-600 mb-2">
              Surface de la piece
            </label>
            <div className="relative">
              <input
                id="surface"
                type="number"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-xl font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                min="0"
                step="1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                m&sup2;
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="hauteur" className="block text-sm font-medium text-slate-600 mb-2">
              Hauteur sous plafond
            </label>
            <div className="relative">
              <input
                id="hauteur"
                type="number"
                value={hauteur}
                onChange={(e) => setHauteur(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-xl font-semibold pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                min="0"
                step="0.1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">m</span>
            </div>
          </div>
        </div>

        {/* Isolation */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Isolation du logement</label>
          <div className="grid grid-cols-3 gap-2">
            {ISOLATIONS.map((iso) => (
              <button
                key={iso.val}
                onClick={() => setIsolation(iso.val)}
                className={`px-2 py-2.5 rounded-xl text-xs font-semibold border-2 text-left transition-colors ${
                  isolation === iso.val
                    ? "bg-sky-50 border-sky-400 text-sky-800"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {iso.label}
                <span className="block text-[10px] font-normal text-slate-400 mt-0.5 leading-tight">
                  {iso.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Exposition */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Exposition au soleil</label>
          <div className="grid grid-cols-3 gap-2">
            {EXPOSITIONS.map((ex) => (
              <button
                key={ex.val}
                onClick={() => setExposition(ex.val)}
                className={`px-2 py-2.5 rounded-xl text-xs font-semibold border-2 text-left transition-colors ${
                  exposition === ex.val
                    ? "bg-sky-50 border-sky-400 text-sky-800"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {ex.label}
                <span className="block text-[10px] font-normal text-slate-400 mt-0.5 leading-tight">
                  {ex.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Occupants + heures */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="occupants" className="block text-sm font-medium text-slate-600 mb-2">
              Occupants reguliers
            </label>
            <input
              id="occupants"
              type="number"
              value={occupants}
              onChange={(e) => setOccupants(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label htmlFor="heures" className="block text-sm font-medium text-slate-600 mb-2">
              Utilisation par jour
            </label>
            <div className="relative">
              <input
                id="heures"
                type="number"
                value={heuresJour}
                onChange={(e) => setHeuresJour(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                min="0"
                max="24"
                step="1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">h/j</span>
            </div>
          </div>
        </div>

        {/* Sous les toits */}
        <button
          onClick={() => setSousToit(!sousToit)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
            sousToit
              ? "bg-orange-50 border-orange-300 text-orange-800"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <span>Piece sous les toits / dernier etage</span>
          <span
            className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              sousToit ? "bg-orange-400" : "bg-slate-300"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                sousToit ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-sky-200/50">
          <p className="text-sm text-sky-100 mb-1">Puissance de clim conseillee</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {fmt(r.recommandeW / 1000, 1)} <span className="text-lg font-semibold">kW</span>
          </p>
          <div className="h-px bg-white/20 my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-sky-100">En BTU/h</span>
            <span className="font-semibold">{fmt(r.puissanceBTU)} BTU</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-sky-100">Volume a refroidir</span>
            <span className="font-semibold">{fmt(r.volume)} m&sup3;</span>
          </div>
        </div>

        {/* Cout */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center">
            <p className="text-xs text-slate-400 mb-1">Par jour</p>
            <p className="text-base font-extrabold text-slate-800">{fmt(r.coutJour, 2)} &euro;</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center">
            <p className="text-xs text-slate-400 mb-1">Par mois</p>
            <p className="text-base font-extrabold text-slate-800">{fmt(r.coutMois, 0)} &euro;</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center">
            <p className="text-xs text-slate-400 mb-1">Ete (3 mois)</p>
            <p className="text-base font-extrabold text-slate-800">{fmt(r.coutEte, 0)} &euro;</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600 mb-3">Detail</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Puissance froid calculee</span>
              <span className="font-semibold text-slate-800">{fmt(r.puissanceW)} W</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Conso electrique</span>
              <span className="font-semibold text-slate-800">{fmt(r.consoJourKwh, 1)} kWh/jour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tarif applique</span>
              <span className="font-semibold text-slate-800">{TARIF_BASE} &euro;/kWh</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs text-emerald-800 leading-relaxed">
          <strong>Confort &amp; sante :</strong> reglez votre clim a environ <strong>26 &deg;C</strong> et
          ne descendez pas a plus de 5 a 7 &deg;C sous la temperature exterieure. Un ecart trop grand
          fatigue l&apos;organisme et fait exploser la facture.
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-400 leading-relaxed">
          Estimation indicative (calcul basee sur le volume, l&apos;isolation et l&apos;exposition,
          EER {EER_DEFAUT}, tarif EDF Bleu 2026). Un professionnel affinera selon les ouvertures et le
          nombre de pieces.
        </div>
      </div>
    </div>
  );
}
