"use client";

import { useState } from "react";

type Mode = "regles" | "conception" | "echo";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function diffDays(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(d: Date): string {
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TRIMESTRES = [
  { nom: "1er trimestre", debut: 0, fin: 13, desc: "Semaines 1 a 13" },
  { nom: "2e trimestre", debut: 14, fin: 27, desc: "Semaines 14 a 27" },
  { nom: "3e trimestre", debut: 28, fin: 41, desc: "Semaines 28 a 41" },
];

const SIGNES_ASTRO = [
  { signe: "Capricorne", debut: [12, 22], fin: [1, 19], emoji: "♑" },
  { signe: "Verseau", debut: [1, 20], fin: [2, 18], emoji: "♒" },
  { signe: "Poissons", debut: [2, 19], fin: [3, 20], emoji: "♓" },
  { signe: "Belier", debut: [3, 21], fin: [4, 19], emoji: "♈" },
  { signe: "Taureau", debut: [4, 20], fin: [5, 20], emoji: "♉" },
  { signe: "Gemeaux", debut: [5, 21], fin: [6, 20], emoji: "♊" },
  { signe: "Cancer", debut: [6, 21], fin: [7, 22], emoji: "♋" },
  { signe: "Lion", debut: [7, 23], fin: [8, 22], emoji: "♌" },
  { signe: "Vierge", debut: [8, 23], fin: [9, 22], emoji: "♍" },
  { signe: "Balance", debut: [9, 23], fin: [10, 22], emoji: "♎" },
  { signe: "Scorpion", debut: [10, 23], fin: [11, 21], emoji: "♏" },
  { signe: "Sagittaire", debut: [11, 22], fin: [12, 21], emoji: "♐" },
];

function getSigneAstro(date: Date): { signe: string; emoji: string } {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  for (const s of SIGNES_ASTRO) {
    const [dm, dd] = s.debut;
    const [fm, fd] = s.fin;
    if (dm <= fm) {
      if ((m === dm && d >= dd) || (m === fm && d <= fd) || (m > dm && m < fm))
        return { signe: s.signe, emoji: s.emoji };
    } else {
      if ((m === dm && d >= dd) || (m === fm && d <= fd) || m > dm || m < fm)
        return { signe: s.signe, emoji: s.emoji };
    }
  }
  return { signe: "Capricorne", emoji: "♑" };
}

export default function CalculateurDPA() {
  const [mode, setMode] = useState<Mode>("regles");

  const today = new Date();
  const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [dateRegles, setDateRegles] = useState(defaultDate);
  const [dateConception, setDateConception] = useState(defaultDate);
  const [dateEcho, setDateEcho] = useState(defaultDate);
  const [semainesEcho, setSemainesEcho] = useState("12");

  // Calcul DPA selon le mode
  let dateDebutGrossesse: Date;
  let dpa: Date;

  if (mode === "regles") {
    dateDebutGrossesse = new Date(dateRegles);
    dpa = addDays(dateDebutGrossesse, 280); // 40 semaines
  } else if (mode === "conception") {
    const conception = new Date(dateConception);
    dateDebutGrossesse = addDays(conception, -14); // 2 semaines avant = DDR estimee
    dpa = addDays(conception, 266); // 38 semaines apres conception
  } else {
    const echo = new Date(dateEcho);
    const sEcho = parseInt(semainesEcho) || 12;
    dateDebutGrossesse = addDays(echo, -(sEcho * 7));
    dpa = addDays(dateDebutGrossesse, 280);
  }

  const joursEcoules = diffDays(dateDebutGrossesse, today);
  const semainesAmenorrhee = Math.max(0, Math.floor(joursEcoules / 7));
  const joursReste = Math.max(0, 7 - (joursEcoules % 7 || 7));
  const semainesGrossesse = Math.max(0, semainesAmenorrhee - 2);
  const joursRestants = Math.max(0, diffDays(today, dpa));
  const progression = Math.min(100, Math.max(0, (joursEcoules / 280) * 100));

  // Trimestre actuel
  const trimestreIdx = semainesAmenorrhee < 14 ? 0 : semainesAmenorrhee < 28 ? 1 : 2;

  // Dates cles
  const dateConge = addDays(dpa, -42); // 6 semaines avant
  const datePremierTrimestre = addDays(dateDebutGrossesse, 13 * 7);
  const dateDeuxiemeTrimestre = addDays(dateDebutGrossesse, 27 * 7);

  // Signe astro du bebe
  const signe = getSigneAstro(dpa);

  const MODES: { id: Mode; label: string; desc: string }[] = [
    { id: "regles", label: "Dernieres regles", desc: "Date des dernieres regles" },
    { id: "conception", label: "Conception", desc: "Date de conception estimee" },
    { id: "echo", label: "Echographie", desc: "Datation par echographie" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Methode de calcul
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  mode === m.id
                    ? "border-purple-500 bg-purple-50/50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-sm font-bold text-slate-800">
                  {m.label}
                </span>
                <span className="block text-xs text-slate-400">{m.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {mode === "regles" && (
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Date des dernieres regles (DDR)
            </label>
            <input
              type="date"
              value={dateRegles}
              onChange={(e) => setDateRegles(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              Premier jour de vos dernieres regles (methode de Naegele : +280 jours)
            </p>
          </div>
        )}

        {mode === "conception" && (
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Date estimee de conception
            </label>
            <input
              type="date"
              value={dateConception}
              onChange={(e) => setDateConception(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              Generalement autour du 14e jour du cycle (ovulation)
            </p>
          </div>
        )}

        {mode === "echo" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Date de l&apos;echographie
              </label>
              <input
                type="date"
                value={dateEcho}
                onChange={(e) => setDateEcho(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Semaines d&apos;amenorrhee a l&apos;echographie
              </label>
              <input
                type="number"
                value={semainesEcho}
                onChange={(e) => setSemainesEcho(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                min="4"
                max="40"
              />
            </div>
          </div>
        )}

        {/* Barre de progression */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-500">Progression</span>
            <span className="font-bold text-purple-600">
              {Math.round(progression)}%
            </span>
          </div>
          <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-700"
              style={{ width: `${progression}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Conception</span>
            <span>1er trim.</span>
            <span>2e trim.</span>
            <span>3e trim.</span>
            <span>DPA</span>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg shadow-purple-200/50">
          <p className="text-sm text-purple-100 mb-1">
            Date prevue d&apos;accouchement
          </p>
          <p className="text-2xl font-extrabold tracking-tight capitalize">
            {formatDate(dpa)}
          </p>
          <p className="text-sm text-purple-200 mt-2">
            {signe.emoji} Signe astrologique : {signe.signe}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-4">
            Ou en etes-vous ?
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                Semaines d&apos;amenorrhee (SA)
              </span>
              <span className="text-lg font-bold text-slate-800">
                {semainesAmenorrhee} SA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                Semaines de grossesse (SG)
              </span>
              <span className="text-lg font-bold text-slate-800">
                {semainesGrossesse} SG
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Mois de grossesse</span>
              <span className="font-bold text-slate-800">
                {Math.floor(semainesGrossesse / 4.33)} mois
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Trimestre actuel</span>
              <span className="font-bold text-purple-600">
                {TRIMESTRES[trimestreIdx].nom}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Jours restants</span>
              <span className="font-bold text-slate-800">
                {joursRestants} jours
              </span>
            </div>
          </div>
        </div>

        {/* Dates cles */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Dates cles
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Fin 1er trimestre</span>
              <span className="text-sm font-semibold text-slate-700">
                {formatDateShort(datePremierTrimestre)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Fin 2e trimestre</span>
              <span className="text-sm font-semibold text-slate-700">
                {formatDateShort(dateDeuxiemeTrimestre)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Debut conge maternite</span>
              <span className="text-sm font-semibold text-purple-600">
                {formatDateShort(dateConge)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">DPA</span>
              <span className="text-sm font-extrabold text-slate-800">
                {formatDateShort(dpa)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl border border-purple-200 p-4">
          <p className="text-xs text-purple-700">
            La date prevue d&apos;accouchement est une estimation. Seulement
            5% des bebes naissent a la date prevue. La plupart naissent entre
            38 et 42 semaines d&apos;amenorrhee. Consultez votre medecin ou
            sage-femme pour un suivi personnalise.
          </p>
        </div>
      </div>
    </div>
  );
}
