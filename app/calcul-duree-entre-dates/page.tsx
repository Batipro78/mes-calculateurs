import type { Metadata } from "next";
import CalculateurDureeEntreDates from "./CalculateurDureeEntreDates";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-duree-entre-dates" },
  title: "Calcul Duree Entre Deux Dates - Jours, Semaines, Mois",
  description:
    "Calculez la duree entre deux dates en jours, semaines, mois et annees. Jours ouvres, heures, minutes. Compte a rebours evenements.",
  keywords:
    "calcul duree entre deux dates, nombre de jours entre deux dates, combien de jours entre, calculer jours, difference entre dates, compte a rebours",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer le nombre de jours entre deux dates ?",
    a: "Soustrayez la date de début de la date de fin. Chaque mois a un nombre de jours différent (28-31), donc le calcul exact tient compte du calendrier. Notre outil fait ce calcul automatiquement et donne le résultat en jours, semaines, mois et années.",
  },
  {
    q: "Comment calculer les jours ouvrés entre deux dates ?",
    a: "Les jours ouvrés sont les jours du lundi au vendredi, hors jours fériés. Pour les compter, on parcourt chaque jour de la période et on exclut les samedis, dimanches et jours fériés.",
  },
  {
    q: "Quelle est la différence entre jours ouvrés et jours ouvrables ?",
    a: "Les jours ouvrés sont du lundi au vendredi (5 jours/semaine), hors jours fériés. Les jours ouvrables incluent aussi le samedi (6 jours/semaine), hors jours fériés. En droit du travail français, les congés payés sont souvent décomptés en jours ouvrables.",
  },
  {
    q: "Comment calculer une date d'échéance à partir d'aujourd'hui ?",
    a: "Entrez la date du jour comme date de début et ajoutez le nombre de jours souhaités. Par exemple, pour un préavis de 30 jours à compter du 1er juin 2026, la date d'échéance est le 1er juillet 2026 (ou le 3 juillet si on exclut les week-ends).",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Duree Entre Deux Dates" />
      <Breadcrumb currentPage="Duree Entre Deux Dates" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-xl flex items-center justify-center text-xl shadow-sm">📆</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Duree Entre Deux Dates</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez la duree exacte en jours, semaines, mois et annees. Jours ouvres inclus.</p>

      <CalculateurDureeEntreDates />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">A quoi sert ce calculateur ?</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ce calculateur permet de connaitre la <strong>duree exacte entre deux dates</strong> : en jours calendaires,
          jours ouvres, semaines, mois et annees. Utile pour :
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { u: "Delais de preavis", d: "Calcul exact du nombre de jours ouvres" },
            { u: "Grossesse", d: "Nombre de jours/semaines depuis une date" },
            { u: "Projet / deadline", d: "Jours restants avant une echeance" },
            { u: "Age exact", d: "Duree precise depuis une date de naissance" },
            { u: "Contrat / bail", d: "Duree d'un contrat en mois/annees" },
            { u: "Vacances", d: "Compte a rebours avant le depart" },
          ].map((item) => (
            <div key={item.u} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.u}</p>
              <p className="text-xs text-slate-500">{item.d}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Nombre de jours par mois</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { m: "Janvier", j: 31 }, { m: "Fevrier", j: "28/29" }, { m: "Mars", j: 31 }, { m: "Avril", j: 30 },
            { m: "Mai", j: 31 }, { m: "Juin", j: 30 }, { m: "Juillet", j: 31 }, { m: "Aout", j: 31 },
            { m: "Septembre", j: 30 }, { m: "Octobre", j: 31 }, { m: "Novembre", j: 30 }, { m: "Decembre", j: 31 },
          ].map((item) => (
            <div key={item.m} className="bg-slate-50 rounded-lg p-2 text-center text-xs">
              <p className="text-slate-500">{item.m}</p>
              <p className="font-bold text-slate-700">{item.j} j</p>
            </div>
          ))}
        </div>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-duree-entre-dates" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
