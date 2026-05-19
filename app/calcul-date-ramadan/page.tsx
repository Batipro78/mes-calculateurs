import type { Metadata } from "next";
import CalculDateRamadan from "./CalculDateRamadan";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-date-ramadan" },
  title: "Date Ramadan 2026 - Aïd al-Fitr et Aïd al-Adha France",
  description:
    "Date de début du Ramadan 2026 (18 février), Aïd al-Fitr (20 mars), Aïd al-Adha (27 mai). Calendrier 2026-2030 avec compte à rebours. Confirmé par CFCM et Mosquée de Paris.",
  keywords:
    "date ramadan 2026, aid al fitr 2026, aid al adha, calendrier musulman france, ramadan 2027 2028 2029 2030, cfcm",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calendrier Ramadan - Date Aïd" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quelle est la date du Ramadan 2026 en France ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le Ramadan 2026 commence le mercredi 18 février 2026 en France, selon la confirmation de la CFCM et de la Mosquée de Paris. C&apos;est la date officielle pour le début du jeûne. L&apos;Aïd al-Fitr (Fête de la Rupture) sera célébré le vendredi 20 mars 2026.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre Aïd al-Fitr et Aïd al-Adha ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Aïd al-Fitr marque la fin du Ramadan (jeûne d&apos;un mois). Aïd al-Adha, 70 jours plus tard, commémore le sacrifice d&apos;Abraham et dure 3-4 jours. Les deux sont les fêtes les plus importantes de l&apos;Islam. En 2026, Aïd al-Fitr est le 20 mars et Aïd al-Adha le 27 mai.",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi la date du Ramadan change chaque année ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le calendrier musulman lunaire (Hijri) contient 354-355 jours, soit 11 jours de moins que l&apos;année solaire. Le Ramadan avance donc d&apos;environ 11 jours chaque année. Par exemple, Ramadan 2026 commence le 18 février, mais en 2027 ce sera le 8 février. C&apos;est pourquoi les dates varient.",
                },
              },
              {
                "@type": "Question",
                name: "Comment la CFCM et les mosquées déterminent-elles la date du Ramadan ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La date officielle du Ramadan en France est annoncée par la CFCM (Conseil Français du Culte Musulman) et la Mosquée de Paris, basée sur l&apos;observation du croissant lunaire ou des calculs astronomiques (tables Umm al-Qura). L&apos;annonce officielle se fait la veille du premier jour de Ramadan après confirmation par les autorités musulmanes.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calendrier Ramadan 2026-2030" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ☪️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calendrier Ramadan 2026-2030 - Dates Aïd
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Ramadan 2026, Aïd al-Fitr et Aïd al-Adha. Compte à rebours et calendrier 5 années.
      </p>

      <CalculDateRamadan />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Méthodes de détermination */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Méthodes de détermination des dates
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h3 className="font-bold text-slate-800 mb-3">Observation lunaire</h3>
            <p className="text-slate-600 leading-relaxed">
              Traditionnellement, le début du Ramadan et des Aïd est confirmé par
              l&apos;observation visuelle du croissant lunaire (hilal). En France, la
              CFCM et les mosquées locales annoncent la date officielle après
              observation ou calcul astronomique.
            </p>
          </div>
          <div className="border-l-4 border-teal-500 pl-4">
            <h3 className="font-bold text-slate-800 mb-3">
              Calcul astronomique (Umm al-Qura)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Le calendrier Umm al-Qura, officiel en Arabie Saoudite, utilise des tables
              astronomiques précises. Les dates 2026-2030 affichées sont basées sur ces
              estimations Umm al-Qura pour la France métropolitaine.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi les dates varient */}
      <section className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Pourquoi les dates varient selon les pays ?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bien que le calendrier islamique soit lunaire et identique partout, la date
          annoncée du Ramadan dépend de plusieurs facteurs :
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold">•</span>
            <span>
              <strong>Localisation du croissant lunaire</strong> : La visibilité du
              croissant varie selon la longitude et latitude.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold">•</span>
            <span>
              <strong>Critères religieux</strong> : Chaque pays (Arabie Saoudite, Égypte,
              France...) peut utiliser des seuils différents.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600 font-bold">•</span>
            <span>
              <strong>Décalage de ±1 jour possible</strong> : Entre la France et d&apos;autres
              régions, la date peut varier.
            </span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          En France, la CFCM et la Mosquée de Paris harmonisent les dates pour l&apos;ensemble du
          territoire.
        </p>
      </section>

      {/* Préparation Ramadan */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Conseils pour préparer le Ramadan
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-slate-800 mb-3">Suhoor (repas pré-aube)</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Le repas avant l&apos;aube (suhoor) est important pour sustenter le jeûne. Il est
              recommandé de manger 30 min avant l&apos;heure de début du jeûne avec des aliments
              riches en fibres et hydratation.
            </p>
            <a
              href="/calcul-macros"
              className="inline-block text-emerald-600 font-semibold hover:text-emerald-700"
            >
              → Calculer vos macros
            </a>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-3">Iftar (rupture du jeûne)</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              L&apos;iftar, le repas du soir, doit être équilibré. Commencez par des dattes
              et de l&apos;eau, puis attendez 30 min avant un repas complet pour faciliter la
              digestion.
            </p>
            <a
              href="/calcul-calories"
              className="inline-block text-emerald-600 font-semibold hover:text-emerald-700"
            >
              → Calculer vos calories
            </a>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-3">Zakat al-Fitr</h3>
            <p className="text-slate-600 leading-relaxed">
              L&apos;aumône rituelle (zakat) avant Aïd al-Fitr est obligatoire pour tout musulman.
              Elle est versée par personne, environ 5-10 EUR selon le pays, avant la prière.
            </p>
            <a
              href="/calcul-zakat-al-fitr"
              className="inline-block text-emerald-600 font-semibold hover:text-emerald-700 mt-3"
            >
              → Calculer la zakat al-fitr
            </a>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-3">Zakat al-Mal (2.5 %)</h3>
            <p className="text-slate-600 leading-relaxed">
              Si vous avez une certaine richesse, la zakat (aumône annuelle) de 2.5 % est due.
              Elle peut être versée avant ou pendant Ramadan.
            </p>
            <a
              href="/calcul-zakat"
              className="inline-block text-emerald-600 font-semibold hover:text-emerald-700 mt-3"
            >
              → Calculer la zakat
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>⚠️ Disclaimer :</strong> Les dates du Ramadan et des Aïd pour 2026 sont{" "}
          <strong>confirmées par la CFCM et la Mosquée de Paris</strong>. Les dates 2027-2030
          sont des <strong>estimations Umm al-Qura</strong> et susceptibles de varier de ±1 jour
          selon l&apos;observation officielle du croissant lunaire. La date définitive est
          annoncée la veille par les autorités musulmanes.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-date-ramadan" />
    </div>
  );
}
