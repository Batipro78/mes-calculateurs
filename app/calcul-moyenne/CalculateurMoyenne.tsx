"use client";
import { useState } from "react";

interface Note {
  id: number;
  valeur: string;
  coefficient: string;
  matiere: string;
}

let nextId = 1;

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CalculateurMoyenne() {
  const [notes, setNotes] = useState<Note[]>([
    { id: nextId++, valeur: "", coefficient: "1", matiere: "" },
    { id: nextId++, valeur: "", coefficient: "1", matiere: "" },
    { id: nextId++, valeur: "", coefficient: "1", matiere: "" },
  ]);
  const [bareme, setBareme] = useState<number>(20);

  const addNote = () => {
    setNotes([...notes, { id: nextId++, valeur: "", coefficient: "1", matiere: "" }]);
  };

  const removeNote = (id: number) => {
    if (notes.length > 1) setNotes(notes.filter((n) => n.id !== id));
  };

  const updateNote = (id: number, field: keyof Note, value: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, [field]: value } : n)));
  };

  const notesValides = notes.filter((n) => {
    const v = parseFloat(n.valeur.replace(",", "."));
    const c = parseFloat(n.coefficient.replace(",", "."));
    return !isNaN(v) && !isNaN(c) && c > 0;
  });

  const totalPondere = notesValides.reduce((acc, n) => {
    const v = parseFloat(n.valeur.replace(",", "."));
    const c = parseFloat(n.coefficient.replace(",", "."));
    return acc + v * c;
  }, 0);

  const totalCoeff = notesValides.reduce((acc, n) => {
    return acc + parseFloat(n.coefficient.replace(",", "."));
  }, 0);

  const moyenne = totalCoeff > 0 ? totalPondere / totalCoeff : null;
  const moyenneSur20 = moyenne !== null && bareme !== 20 ? (moyenne / bareme) * 20 : null;

  const noteMin = notesValides.length > 0 ? Math.min(...notesValides.map((n) => parseFloat(n.valeur.replace(",", ".")))) : null;
  const noteMax = notesValides.length > 0 ? Math.max(...notesValides.map((n) => parseFloat(n.valeur.replace(",", ".")))) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">Vos notes</h2>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Bareme :</label>
            <select
              value={bareme}
              onChange={(e) => setBareme(parseInt(e.target.value))}
              className="border border-slate-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none bg-white"
            >
              <option value={20}>/20</option>
              <option value={10}>/10</option>
              <option value={100}>/100</option>
              <option value={5}>/5</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {notes.map((note, i) => (
            <div key={note.id} className="flex items-center gap-2">
              <span className="text-xs text-slate-400 w-5 shrink-0">{i + 1}</span>
              <input
                type="text"
                placeholder="Matiere"
                value={note.matiere}
                onChange={(e) => updateNote(note.id, "matiere", e.target.value)}
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder={`/${bareme}`}
                value={note.valeur}
                onChange={(e) => updateNote(note.id, "valeur", e.target.value)}
                className="w-20 border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-center focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder="Coef"
                value={note.coefficient}
                onChange={(e) => updateNote(note.id, "coefficient", e.target.value)}
                className="w-16 border border-slate-300 rounded-lg px-2 py-2.5 text-sm text-center focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              />
              <button
                onClick={() => removeNote(note.id)}
                className="text-slate-300 hover:text-red-400 transition-colors p-1"
                aria-label="Supprimer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addNote}
          className="mt-4 w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-400 hover:border-violet-300 hover:text-violet-500 transition-all"
        >
          + Ajouter une note
        </button>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {moyenne !== null ? (
          <>
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg shadow-violet-200/50">
              <p className="text-violet-200 text-sm mb-1">Moyenne ponderee</p>
              <p className="text-4xl font-extrabold tracking-tight">
                {fmt(moyenne)} <span className="text-xl font-semibold">/{bareme}</span>
              </p>
              {moyenneSur20 !== null && (
                <p className="text-violet-200 text-sm mt-1">Soit {fmt(moyenneSur20)}/20</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Notes</p>
                <p className="text-lg font-bold text-slate-800">{notesValides.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Min</p>
                <p className="text-lg font-bold text-slate-800">{noteMin !== null ? fmt(noteMin) : "-"}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-xs text-slate-400">Max</p>
                <p className="text-lg font-bold text-slate-800">{noteMax !== null ? fmt(noteMax) : "-"}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Total coefficients</p>
              <p className="text-lg font-bold text-slate-800">{fmt(totalCoeff)}</p>
              <p className="text-xs text-slate-400 mt-2">Total pondere</p>
              <p className="text-lg font-bold text-slate-800">{fmt(totalPondere)}</p>
            </div>

            {/* Jauge visuelle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Progression</p>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    moyenne / bareme >= 0.5 ? "bg-gradient-to-r from-violet-500 to-purple-500" : "bg-gradient-to-r from-red-400 to-orange-400"
                  }`}
                  style={{ width: `${Math.min(100, (moyenne / bareme) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 text-right">{((moyenne / bareme) * 100).toFixed(0)}%</p>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm">Entrez au moins une note pour voir le resultat</p>
          </div>
        )}

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 mb-2">Formule</p>
          <p className="text-sm text-slate-600">
            Moyenne = &Sigma;(note &times; coef) &divide; &Sigma;(coef)
          </p>
        </div>
      </div>
    </div>
  );
}
