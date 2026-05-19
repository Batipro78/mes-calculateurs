import type { Metadata } from "next";
import ConvertisseurHijri from "./ConvertisseurHijri";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import { MOIS_HIJRI } from "./hijriCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseur-calendrier-hijri" },
  title:
    "Convertisseur Calendrier Hijri ↔ Grégorien - Date musulmane instantanée",
  description:
    "Convertissez entre calendrier hégirien (islamique) et grégorien. Méthodes TIC et Umm al-Qura. Calcul âge en années lunaires. Gratuit et précis.",
  keywords:
    "calendrier hijri, convertisseur hegire, date musulmane, age hijri, umm al qura, calendrier islamique, hijri gregorien, calendrier lunaire",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Calendrier Hijri ↔ Grégorien" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le calendrier hijri ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le calendrier hijri (ou calendrier islamique/hégirien) est un calendrier lunaire utilisé par les musulmans pour déterminer les dates des fêtes religieuses (Ramadan, Aïd al-Fitr, Aïd al-Adha, Hajj). Il compte 12 mois lunaires de 29 ou 30 jours, pour un total de 354 ou 355 jours par année. L&apos;année 1 AH correspond à l&apos;Hégire (émigration du Prophète Muhammad de La Mecque à Médine) en 622 EC.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre TIC (tabulaire) et Umm al-Qura ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "TIC (Tabular Islamic Calendar) est une méthode mathématique tabulaire, régulière et immuable. Umm al-Qura est la méthode officielle de l&apos;Arabie Saoudite, basée sur des observations et des tables officielles. Les deux peuvent différer de ±1 jour selon la date. Pour les dates religieuses officielles, consultez votre mosquée ou l&apos;autorité religieuse locale.",
                },
              },
              {
                "@type": "Question",
                name: "Comment calculer mon âge en années hijri (lunaires) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Saisissez votre date de naissance dans le convertisseur, puis sélectionnez &quot;Calculer mon âge hijri&quot;. L&apos;outil convertit votre date de naissance en hijri et calcule la différence avec la date hijri actuelle. Vous obtiendrez votre âge en années, mois et jours lunaires. Par exemple, quelqu&apos;un né en 1990 aura ~33 ans grégoririen mais ~34 ans hijri car l&apos;année lunaire est 11 jours plus courte.",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi l&apos;année hijri a-t-elle 354 jours au lieu de 365 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le calendrier hijri est lunaire : il suit les phases de la Lune, avec 12 mois de 29-30 jours. Une année lunaire complète = 354-355 jours environ. C&apos;est 11 jours de moins qu&apos;une année grégorienne (solaire). Cette différence fait que les dates hijri avancent d&apos;~11 jours chaque année grégorienne. Par exemple, Ramadan 1447 commence fin avril/début mai 2026, mais Ramadan 1448 commence début avril 2027.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Convertisseur Calendrier Hijri ↔ Grégorien" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur Calendrier Hijri ↔ Grégorien
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre calendrier hégirien (islamique) et grégorien. Calcul
        âge en années lunaires. Méthodes TIC et Umm al-Qura.
      </p>

      <ConvertisseurHijri />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 12 mois du calendrier hijri
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le calendrier hijri compte 12 mois lunaires. Quatre d&apos;entre eux sont
          considérés comme sacrés dans l&apos;islam.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  N°
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Nom (FR)
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Arabe
                </th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium">
                  Jours
                </th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {MOIS_HIJRI.map((mois, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-slate-100 hover:bg-slate-50 ${
                    mois.sacre ? "bg-amber-50/50" : ""
                  }`}
                >
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-2 text-slate-700">{mois.nom}</td>
                  <td className="py-3 px-2 text-slate-600">{mois.arabe}</td>
                  <td className="py-3 px-2 text-center font-semibold text-slate-800">
                    {mois.jours}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {mois.sacre ? (
                      <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Sacré
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">Ordinaire</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-900">
            <strong>Mois sacrés :</strong> Mouharram (1er), Rajab (7e), Dhou
            al-Qa&apos;da (11e), Dhou al-Hijja (12e). Durante ces mois,
            certaines actions sont interdites ou découragées. Dhou al-Hijja est
            aussi le mois du Hajj (pèlerinage annuel).
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          TIC vs Umm al-Qura : quelle méthode choisir ?
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">TIC (Tabulaire)</h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>✓ Méthode mathématique standard et régulière</li>
              <li>✓ Indépendante des observations astronomiques</li>
              <li>✓ Immuable et prédictible</li>
              <li>✓ Utilisée mondialement dans les logiciels</li>
              <li>⚠ Peut différer de ±1 jour selon contexte</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">Umm al-Qura</h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>✓ Méthode officielle de l&apos;Arabie Saoudite</li>
              <li>✓ Basée sur des observations et tables officielles</li>
              <li>✓ Autorité pour le Hajj et les dates religieuses SA</li>
              <li>✓ Plus proche des observations astronomiques</li>
              <li>⚠ Peut différer de TIC de ±1 jour</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <strong>Important :</strong> Pour les dates religieuses officielles
            (Ramadan, Aïd, Hajj), consultez votre mosquée, votre imam ou
            l&apos;autorité religieuse locale. La date peut varier selon
            l&apos;observation de la nouvelle lune.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi l&apos;année hijri a-t-elle 354 jours ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le calendrier hijri est un calendrier lunaire. Chaque mois débute avec
          la nouvelle lune et dure environ 29,5 jours (arrondi à 29 ou 30).
        </p>
        <div className="bg-slate-50 rounded-xl p-6 mb-4 border border-slate-200">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700">12</div>
              <div className="text-sm text-slate-600">mois lunaires</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700">×</div>
              <div className="text-sm text-slate-600"></div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700">29,5</div>
              <div className="text-sm text-slate-600">jours/mois</div>
            </div>
          </div>
          <div className="border-t border-slate-300 mt-4 pt-4 text-center">
            <div className="text-2xl font-bold text-teal-700">= 354 jours</div>
            <div className="text-xs text-slate-500 mt-2">
              (vs 365 jours pour l&apos;année grégorienne)
            </div>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          <strong>Conséquence :</strong> Chaque année, le calendrier hijri
          &quot;décale&quot; de ~11 jours par rapport au calendrier grégorien.
          Cela signifie que Ramadan, par exemple, avance de ~11 jours chaque
          année grégorienne. Une personne vit 33 années grégoriennes équivalent
          à ~34 années hijri.
        </p>
      </section>

      <section className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-red-900 mb-3">⚠️ Disclaimer</h2>
        <p className="text-sm text-red-900 leading-relaxed">
          La date hijri convertie par cet outil peut varier de ±1 jour selon la
          méthode utilisée (TIC, Umm al-Qura, observations locales). Pour les
          dates religieuses officielles (début de Ramadan, Aïd, Hajj), veuillez
          consulter votre mosquée, votre imam ou l&apos;autorité religieuse de
          votre pays. Ce convertisseur est un outil éducatif et informatif,
          basé sur des calculs mathématiques.
        </p>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-calendrier-hijri" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
