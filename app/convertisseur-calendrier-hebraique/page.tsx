import type { Metadata } from "next";
import ConvertisseurHebraique from "./ConvertisseurHebraique";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import { MOIS_HEBRAIQUES } from "./hebraiqueCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseur-calendrier-hebraique" },
  title:
    "Convertisseur Calendrier Hébraïque ↔ Grégorien - Date juive instantanée",
  description:
    "Convertissez entre calendrier hébraïque (juif) et grégorien. Calcul de l&apos;âge en années hébraïques. Cycle Meton, années embolismiques, 13 mois. Gratuit et précis.",
  keywords:
    "calendrier hébraïque, calendrier juif, convertisseur date juive, calendrier hébreu, age hebraique, mois hebraiques, cycle meton, annee embolismique",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Calendrier Hébraïque ↔ Grégorien" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le calendrier hébraïque ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le calendrier hébraïque (ou calendrier juif) est un calendrier luni-solaire utilisé depuis l&apos;Antiquité pour déterminer les dates des fêtes religieuses juives (Rosh Hashanah, Yom Kippour, Pessah, Chavouot, etc.). Il compte 12 mois en année commune et 13 mois en année embolismique (Adar II). L&apos;année hébraïque commence avec Tichri (septembre-octobre). L&apos;année 1 correspondrait à la création du monde selon la tradition juive.",
                },
              },
              {
                "@type": "Question",
                name: "Qu&apos;est-ce qu&apos;une année embolismique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une année embolismique (ou année intercalaire) est une année hébraïque qui contient 13 mois au lieu de 12. Elle comprend deux mois d&apos;Adar : Adar I et Adar II. Cela se produit 7 fois tous les 19 ans (cycle Meton) pour synchroniser le calendrier lunaire avec les saisons. L&apos;année hébraïque courante est 5786, qui est une année embolismique.",
                },
              },
              {
                "@type": "Question",
                name: "Comment fonctionne le cycle Meton de 19 ans ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le cycle Meton est un cycle astronomique de 19 ans qui synchronise les calendriers lunaires et solaires. Sur 19 années hébraïques, 7 années sont embolismiques (ont 13 mois) et 12 sont communes (12 mois). Cela assure que Pessah (Pâque juive) tombe toujours au printemps et que les fêtes restent alignées avec les saisons. Les années embolismiques du cycle sont : 3, 6, 8, 11, 14, 17, et 19.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre le calendrier hébraïque et le grégorien ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le calendrier hébraïque est luni-solaire (combine la Lune et le Soleil) avec un cycle de 19 ans. Le calendrier grégorien est purement solaire avec un cycle de 400 ans. Une année hébraïque moyenne = 365,2422 jours (très proche du grégorien), mais l&apos;année est composée de mois lunaires de 29-30 jours. Le début de l&apos;année hébraïque (Rosh Hashanah) tombe entre le 5 septembre et le 25 octobre en grégorien.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Convertisseur Calendrier Hébraïque ↔ Grégorien" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur Calendrier Hébraïque ↔ Grégorien
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre calendrier hébraïque (juif) et grégorien. Calcul
        âge en années hébraïques. Cycle Meton et années embolismiques.
      </p>

      <ConvertisseurHebraique />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 12 mois du calendrier hébraïque
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le calendrier hébraïque compte 12 mois en année commune (13 en année
          embolismique). L&apos;année commence avec Tichri (automne).
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
                  Hébreu
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Saison
                </th>
              </tr>
            </thead>
            <tbody>
              {MOIS_HEBRAIQUES.map((mois, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-slate-100 hover:bg-slate-50 ${
                    mois.nom.includes("Adar") ? "bg-indigo-50/50" : ""
                  }`}
                >
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {mois.ordre}
                    {mois.nom.includes("Adar II") && " (emb.)"}
                  </td>
                  <td className="py-3 px-2 text-slate-700">{mois.nom}</td>
                  <td className="py-3 px-2 text-slate-600 font-medium">
                    {mois.hebreu}
                  </td>
                  <td className="py-3 px-2 text-slate-600">{mois.saison}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-sm text-indigo-900">
            <strong>Adar II (אדר ב) :</strong> n&apos;existe que durant les années
            embolismiques. En année commune, il n&apos;y a qu&apos;un seul Adar.
            Le cycle Meton de 19 ans détermine quand Adar II apparaît.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Le cycle Meton : synchroniser le calendrier lunaire et solaire
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le cycle Meton est un découverte astronomique du Ve siècle avant notre
          ère. Il prouve que 19 années solaires = 235 mois lunaires
          approximativement. Cela permet de synchroniser les deux systèmes.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">
              Sur 19 années hébraïques :
            </h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>✓ 12 années communes (12 mois)</li>
              <li>✓ 7 années embolismiques (13 mois)</li>
              <li>✓ Total : 235 mois lunaires</li>
              <li>✓ Alignement parfait avec les saisons</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">
              Années embolismiques du cycle :
            </h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>3e, 6e, 8e, 11e, 14e, 17e, 19e années</li>
              <li>Formule : (année × 7 + 1) mod 19 &lt; 7</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <strong>Exemple :</strong> Pessah (Pâque) doit toujours tomber au
            printemps (Nissan = mars-avril). Le cycle Meton garantit cela en
            ajoutant Adar II tous les 2-3 ans pour décaler les fêtes lunaires
            et les aligner avec les saisons solaires.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Différence luni-solaire : pourquoi 13 mois certaines années ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le calendrier hébraïque combine les cycles lunaires (mois = phase de
          lune) et solaires (années = saisons). Sans correction, les fêtes se
          déplaceraient graduellement dans les saisons.
        </p>
        <div className="bg-slate-50 rounded-xl p-6 mb-4 border border-slate-200">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">12</div>
              <div className="text-sm text-slate-600">mois lunaires</div>
              <div className="text-xs text-slate-500 mt-1">(année commune)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">≈</div>
              <div className="text-sm text-slate-600">354 jours</div>
              <div className="text-xs text-slate-500 mt-1">VS 365 j (solaire)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">+13</div>
              <div className="text-sm text-slate-600">mois (Adar II)</div>
              <div className="text-xs text-slate-500 mt-1">tous les 2-3 ans</div>
            </div>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          <strong>Résultat :</strong> L&apos;année hébraïque moyenne (sur 19 ans)
          = 365,2422 jours, identique à l&apos;année grégorienne. Cela garantit
          que Rosh Hashanah (Nouvel An) tombe toujours entre le 5 septembre et
          le 25 octobre, et que Pessah reste au printemps.
        </p>
      </section>

      <section className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-red-900 mb-3">⚠️ Disclaimer</h2>
        <p className="text-sm text-red-900 leading-relaxed">
          La date hébraïque convertie par cet outil est basée sur le calcul
          astronomique Hillel II (accepté par toutes les obédiences juives).
          Pour les dates religieuses officielles ou les célébrations, consultez
          votre rabbin ou votre communauté juive locale, car le début exact
          d&apos;une fête peut varier selon les coutumes. Cet outil est
          informatif et éducatif.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          ℹ️ Sources et références
        </h2>
        <ul className="text-sm text-slate-700 space-y-2 ml-4">
          <li>• Hebcal.com — Convertisseur calendrier hébraïque en ligne</li>
          <li>• Chabad.org — Base de données fêtes juives et dates</li>
          <li>• MyJewishLearning.com — Explications sur le calendrier juif</li>
          <li>• Algorithme Hillel II — Standard international pour conversions</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-calendrier-hebraique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
