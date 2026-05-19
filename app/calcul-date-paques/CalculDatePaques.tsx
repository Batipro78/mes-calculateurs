"use client";

import { useState } from "react";
import {
  getFetesAnnee,
  formatDateFR,
  formatDateCourte,
  joursAvantPaques,
  type Tradition,
} from "./paquesCalc";

export default function CalculDatePaques() {
  const currentYear = new Date().getFullYear();
  const [annee, setAnnee] = useState<string>(currentYear.toString());
  const [tradition, setTradition] = useState<Tradition>("catholique");

  const anneeNum = parseInt(annee) || currentYear;
  const fetes = getFetesAnnee(anneeNum, tradition);
  const { jours: joursRestants } = joursAvantPaques(anneeNum);

  // Tableau des fêtes avec labels
  const listeFetes = [
    {
      label: "Mercredi des Cendres",
      date: fetes.cendres,
      desc: "Début du Carême (46 j avant Pâques)",
    },
    {
      label: "Dimanche des Rameaux",
      date: fetes.rameaux,
      desc: "Entrée de Jésus à Jérusalem (7 j avant)",
    },
    {
      label: "Jeudi Saint",
      date: fetes.jeudiSaint,
      desc: "Dernière Cène (3 j avant)",
    },
    {
      label: "Vendredi Saint",
      date: fetes.vendrediSaint,
      desc: "Crucifixion (2 j avant)",
    },
    {
      label: "Samedi Saint",
      date: fetes.samediSaint,
      desc: "Vigile pascale (1 j avant)",
    },
    {
      label: "Pâques",
      date: fetes.paques,
      desc: "Résurrection du Christ",
      highlight: true,
    },
    {
      label: "Lundi de Pâques",
      date: fetes.lundiPaques,
      desc: "Jour après Pâques (1 j après)",
    },
    {
      label: "Ascension",
      date: fetes.ascension,
      desc: "Ascension de Jésus (39 j après)",
    },
    {
      label: "Pentecôte",
      date: fetes.pentecote,
      desc: "Descente de l&apos;Esprit Saint (49 j après)",
    },
    {
      label: "Lundi de Pentecôte",
      date: fetes.lundiPentecote,
      desc: "Jour après Pentecôte (50 j après)",
    },
    {
      label: "Sainte-Trinité",
      date: fetes.trinite,
      desc: "Fête de la Sainte-Trinité (56 j après)",
    },
    {
      label: "Fête-Dieu",
      date: fetes.feteDieu,
      desc: "Corps du Christ (60 j après)",
    },
    {
      label: "Sacré-Cœur",
      date: fetes.sacreCoeur,
      desc: "Fête du Sacré-Cœur (68 j après)",
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Formulaire - 1 col */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Année
          </label>
          <input
            type="number"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            min="1900"
            max="2099"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-slate-500 mt-1">1900 - 2099</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Tradition
          </label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setTradition("catholique")}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                tradition === "catholique"
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-150"
              }`}
            >
              Catholique (Grégorienne)
            </button>
            <button
              onClick={() => setTradition("orthodoxe")}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                tradition === "orthodoxe"
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-150"
              }`}
            >
              Orthodoxe (Julienne)
            </button>
          </div>
        </div>

        {/* Compte à rebours */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
            Compte à rebours
          </p>
          <p className="text-2xl font-bold text-amber-900">
            {joursRestants > 0 ? joursRestants : 0}
            <span className="text-sm ml-1 font-medium">jours</span>
          </p>
          <p className="text-xs text-amber-700 mt-2">
            {joursRestants > 0
              ? `avant Pâques ${anneeNum}`
              : "Pâques est passée"}
          </p>
        </div>
      </div>

      {/* Résultats - 2 cols */}
      <div className="lg:col-span-2">
        {/* Pâques en gros */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <p className="text-sm uppercase tracking-wider font-semibold opacity-90">
            Pâques {anneeNum}
          </p>
          <h2 className="text-4xl font-bold mt-2">
            {formatDateFR(fetes.paques)}
          </h2>
          <p className="text-amber-100 mt-2 text-sm">
            {tradition === "catholique"
              ? "Calendrier grégorien (Église catholique & protestante)"
              : "Calendrier julien (Église orthodoxe)"}
          </p>
        </div>

        {/* Tableau des fêtes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Toutes les fêtes chrétiennes mobiles {anneeNum}
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Fête
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Date
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium text-xs">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {listeFetes.map((fete, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-slate-100 transition-colors ${
                    fete.highlight
                      ? "bg-amber-50 hover:bg-amber-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td
                    className={`py-3 px-2 font-semibold ${
                      fete.highlight
                        ? "text-amber-700"
                        : "text-slate-700"
                    }`}
                  >
                    {fete.label}
                  </td>
                  <td className="py-3 px-2 text-slate-600 font-mono">
                    {formatDateCourte(fete.date)}
                  </td>
                  <td className="py-3 px-2 text-slate-500 text-xs">
                    {fete.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
