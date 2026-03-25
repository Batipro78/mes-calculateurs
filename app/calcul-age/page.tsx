import type { Metadata } from "next";
import CalculateurAge from "./CalculateurAge";
import AdSlot from "../components/AdSlot";

export const metadata: Metadata = {
  title: "Calculer son Age Exact - Date de naissance, jours, heures",
  description:
    "Calculez votre age exact en annees, mois et jours a partir de votre date de naissance. Nombre de jours vecus, prochain anniversaire, signe astrologique. Gratuit.",
  keywords:
    "calculer son age, calcul age exact, age en jours, combien de jours ai-je vecu, date de naissance age, prochain anniversaire, signe astrologique",
};

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <a
          href="/"
          className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
        >
          &larr; Tous les calculateurs
        </a>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎂
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calculer son Age Exact
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Decouvrez votre age exact en annees, mois et jours. Nombre de jours
        vecus, prochain anniversaire et signe astrologique.
      </p>

      <CalculateurAge />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer son age exact ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Calculer son age exact ne se resume pas a soustraire l&apos;annee de
          naissance de l&apos;annee en cours. Pour obtenir un resultat precis en{" "}
          <strong>annees, mois et jours</strong>, il faut prendre en compte les
          mois et jours ecoules depuis votre dernier anniversaire. Notre outil
          effectue ce calcul automatiquement a partir de votre date de
          naissance.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Pourquoi calculer son age en jours ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Savoir combien de <strong>jours vous avez vecu</strong> est une
          statistique fascinante. Par exemple, une personne de 30 ans a vecu
          environ <strong>10 950 jours</strong>. A 40 ans, on depasse les{" "}
          <strong>14 600 jours</strong>. Certaines personnes celebrent meme
          leurs &quot;anniversaires&quot; en jours ronds (10 000 jours, 20 000
          jours...).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Ages cles et reperes
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Majorite civile</span>
            <span className="text-sm font-bold text-slate-800">18 ans</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Permis de conduire</span>
            <span className="text-sm font-bold text-slate-800">17 ans (conduite accompagnee des 15 ans)</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Droit de vote</span>
            <span className="text-sm font-bold text-slate-800">18 ans</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Age legal de retraite</span>
            <span className="text-sm font-bold text-slate-800">64 ans (reforme 2023)</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Retraite taux plein</span>
            <span className="text-sm font-bold text-slate-800">67 ans</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Esperance de vie (France)</span>
            <span className="text-sm font-bold text-slate-800">~83 ans</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment fonctionne le calcul ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le calcul prend votre <strong>date de naissance</strong> et la compare
          a la <strong>date du jour</strong>. Il soustrait les annees, puis
          ajuste les mois et jours en tenant compte du nombre de jours dans
          chaque mois (28, 29, 30 ou 31). Le resultat donne votre age exact
          ainsi que des conversions en mois, semaines, jours et heures.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 12 signes du zodiaque
        </h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { s: "\u2648 Belier", d: "21 mars - 19 avril" },
            { s: "\u2649 Taureau", d: "20 avril - 20 mai" },
            { s: "\u264A Gemeaux", d: "21 mai - 20 juin" },
            { s: "\u264B Cancer", d: "21 juin - 22 juillet" },
            { s: "\u264C Lion", d: "23 juillet - 22 aout" },
            { s: "\u264D Vierge", d: "23 aout - 22 sept." },
            { s: "\u264E Balance", d: "23 sept. - 22 oct." },
            { s: "\u264F Scorpion", d: "23 oct. - 21 nov." },
            { s: "\u2650 Sagittaire", d: "22 nov. - 21 dec." },
            { s: "\u2651 Capricorne", d: "22 dec. - 19 janv." },
            { s: "\u2652 Verseau", d: "20 janv. - 18 fev." },
            { s: "\u2653 Poissons", d: "19 fev. - 20 mars" },
          ].map((z) => (
            <div
              key={z.s}
              className="bg-slate-50 rounded-xl p-2.5 flex justify-between items-center text-sm"
            >
              <span className="text-slate-700 font-medium">{z.s}</span>
              <span className="text-slate-400 text-xs">{z.d}</span>
            </div>
          ))}
        </div>
      </section>

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
