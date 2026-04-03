import type { Metadata } from "next";
import SimulateurBlackout from "./SimulateurBlackout";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Simulateur Blackout 2026 - Etes-vous pret pour une panne electrique ?",
  description:
    "Evaluez votre autonomie en cas de coupure d'electricite. Score de preparation, duree d'autonomie estimee et budget d'equipement par niveau. Gratuit.",
  keywords:
    "simulateur blackout, panne electricite, coupure courant, autonomie blackout, preparation panne, kit survie electricite, groupe electrogene, station solaire",
  openGraph: {
    title: "Simulateur Blackout - Etes-vous pret ?",
    description:
      "Score d'autonomie, vulnerabilites et budget d'equipement pour survivre a une panne electrique.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien de temps dure une coupure d'electricite en France ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La duree moyenne d'une coupure en France est de 1 a 4 heures pour une panne locale. Les evenements meteorologiques (tempete, inondation) peuvent provoquer des coupures de 24 a 72 heures. Un blackout national majeur pourrait durer 1 a 2 semaines selon le scenario RTE.",
      },
    },
    {
      "@type": "Question",
      name: "Que faire en premier lors d'une panne d'electricite ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1) Verifier si la panne est locale (disjoncteur) ou generale (voisins). 2) Allumer une lampe torche. 3) Ne pas ouvrir le congelateur/frigo. 4) Debrancher les appareils sensibles. 5) Ecouter la radio pour les consignes officielles.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coute un kit de survie pour une panne electrique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un kit essentiel coute environ 100 EUR (lampes, radio, powerbank, reserves eau et nourriture 3 jours). Un kit confort avec rechaud et station solaire revient a 500 EUR. L'autonomie complete avec groupe electrogene monte a 1 500 EUR environ.",
      },
    },
    {
      "@type": "Question",
      name: "Un logement tout-electrique est-il dangereux en cas de blackout ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un logement tout-electrique perd immediatement le chauffage, la cuisine et l'eau chaude lors d'une coupure. C'est la configuration la plus vulnerable. Un chauffage au gaz ou au bois et une plaque gaz apportent une autonomie significative sans electricite.",
      },
    },
    {
      "@type": "Question",
      name: "Station solaire portable ou groupe electrogene : que choisir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La station solaire (500-1500 EUR) est silencieuse, sans carburant et ideale pour recharger appareils et alimenter un frigo quelques heures. Le groupe electrogene (300-1200 EUR) offre plus de puissance et d'autonomie mais necessite du carburant, fait du bruit et ne peut pas etre utilise en interieur.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Blackout" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb currentPage="Simulateur Blackout" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-2xl shadow-sm">
          🔦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Blackout
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[60px]">
        Evaluez votre autonomie en cas de panne electrique et le budget pour vous preparer.
      </p>

      <SimulateurBlackout />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Panne electrique en France : les chiffres
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En France, chaque foyer subit en moyenne <strong>50 minutes de coupure par an</strong> (source Enedis 2024).
          Mais les evenements extremes se multiplient : la tempete Ciaran (novembre 2023) a prive
          <strong> 1,2 million de foyers</strong> d&apos;electricite, certains pendant plus de 5 jours.
        </p>
        <p className="text-slate-600 mb-6 leading-relaxed">
          RTE (gestionnaire du reseau) alerte regulierement sur les risques de tension en hiver,
          avec des scenarios de delestage tournant. Etes-vous pret ?
        </p>

        {/* Tableau impact par type de logement */}
        <h3 className="text-lg font-bold text-slate-700 mb-3">
          Impact d&apos;une coupure selon votre logement
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Poste</th>
                <th className="text-center py-3 px-3 text-slate-500 font-medium">Tout electrique</th>
                <th className="text-center py-3 px-3 text-slate-500 font-medium">Gaz + elec</th>
                <th className="text-center py-3 px-3 text-slate-500 font-medium">Bois / Gaz</th>
              </tr>
            </thead>
            <tbody>
              {[
                { poste: "🌡️ Chauffage", elec: "Arret immediat", mixte: "OK (gaz)", bois: "OK (bois/gaz)" },
                { poste: "🍽️ Cuisine", elec: "Impossible", mixte: "OK (gaz)", bois: "OK (gaz/bois)" },
                { poste: "🚿 Eau chaude", elec: "Quelques heures (cumulus)", mixte: "OK (gaz)", bois: "OK" },
                { poste: "🧊 Frigo", elec: "~4h avant perte", mixte: "~4h", bois: "~4h" },
                { poste: "❄️ Congelateur", elec: "~24h si ferme", mixte: "~24h", bois: "~24h" },
                { poste: "💡 Eclairage", elec: "Aucun", mixte: "Aucun", bois: "Aucun" },
                { poste: "📱 Telephone", elec: "Batterie ~12h", mixte: "~12h", bois: "~12h" },
              ].map((row) => (
                <tr key={row.poste} className="border-b border-slate-100">
                  <td className="py-2.5 px-3 font-medium text-slate-700">{row.poste}</td>
                  <td className="py-2.5 px-3 text-center text-red-600 font-medium">{row.elec}</td>
                  <td className="py-2.5 px-3 text-center text-amber-600">{row.mixte}</td>
                  <td className="py-2.5 px-3 text-center text-emerald-600">{row.bois}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Guide par niveau */}
        <h3 className="text-lg font-bold text-slate-700 mb-3">
          3 niveaux de preparation
        </h3>
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {[
            {
              niveau: "🎒 Essentiel",
              budget: "~100 EUR",
              duree: "24-72h",
              items: ["Lampes torche + bougies", "Radio a piles", "Powerbank", "Reserve eau 3 jours", "Nourriture seche 3 jours", "Couvertures de survie"],
              color: "border-amber-300 bg-amber-50",
            },
            {
              niveau: "🏠 Confort",
              budget: "~500 EUR",
              duree: "3-7 jours",
              items: ["Kit essentiel complet", "Rechaud camping gaz", "Reserve alimentaire 7 jours", "Station solaire 500Wh"],
              color: "border-blue-300 bg-blue-50",
            },
            {
              niveau: "🏰 Autonome",
              budget: "~1 500 EUR",
              duree: "1-2 semaines+",
              items: ["Kit confort complet", "Station 1000Wh ou groupe electrogene", "Panneaux solaires portables", "Reserves 2 semaines"],
              color: "border-emerald-300 bg-emerald-50",
            },
          ].map((n) => (
            <div key={n.niveau} className={`rounded-xl border-2 ${n.color} p-4`}>
              <p className="font-bold text-slate-800 mb-1">{n.niveau}</p>
              <p className="text-lg font-extrabold text-slate-700">{n.budget}</p>
              <p className="text-xs text-slate-500 mb-3">Autonomie : {n.duree}</p>
              <ul className="space-y-1">
                {n.items.map((item) => (
                  <li key={item} className="text-xs text-slate-600 flex gap-1.5">
                    <span className="text-slate-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Checklist rapide */}
        <h3 className="text-lg font-bold text-slate-700 mb-3">
          Checklist : les 10 reflexes en cas de coupure
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 mb-8">
          <li>Verifier votre disjoncteur (panne locale ou generale ?)</li>
          <li>Allumer une lampe torche ou des bougies (attention au feu)</li>
          <li>Ne PAS ouvrir le frigo ni le congelateur</li>
          <li>Debrancher les appareils sensibles (PC, TV) pour eviter la surtension au retour</li>
          <li>Allumer la radio pour les consignes officielles</li>
          <li>Economiser la batterie du telephone (mode avion si pas de reseau)</li>
          <li>Utiliser l&apos;eau chaude du cumulus tant qu&apos;elle est disponible</li>
          <li>Regrouper la famille dans une seule piece pour conserver la chaleur</li>
          <li>Surveiller les personnes vulnerables (personnes agees, bebes)</li>
          <li>Signaler la panne sur le site Enedis ou au 09 72 67 50 + n° departement</li>
        </ol>

        <h3 className="text-lg font-bold text-slate-700 mb-3">
          Station solaire vs Groupe electrogene
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Critere</th>
                <th className="text-center py-3 px-3 text-slate-500 font-medium">Station solaire</th>
                <th className="text-center py-3 px-3 text-slate-500 font-medium">Groupe electrogene</th>
              </tr>
            </thead>
            <tbody>
              {[
                { critere: "Prix", solaire: "400-1 500 EUR", groupe: "300-1 200 EUR" },
                { critere: "Bruit", solaire: "Silencieux", groupe: "60-80 dB" },
                { critere: "Carburant", solaire: "Aucun (soleil)", groupe: "Essence/GPL" },
                { critere: "Usage interieur", solaire: "Oui", groupe: "Non (CO toxique)" },
                { critere: "Puissance", solaire: "500-2 000 Wh", groupe: "2 000-5 000 W" },
                { critere: "Autonomie", solaire: "Illimitee (avec panneaux)", groupe: "Selon stock carburant" },
                { critere: "Entretien", solaire: "Aucun", groupe: "Regulier (vidange, bougie)" },
                { critere: "Ideal pour", solaire: "Appareils, frigo, eclairage", groupe: "Tout (chauffage inclus)" },
              ].map((row) => (
                <tr key={row.critere} className="border-b border-slate-100">
                  <td className="py-2 px-3 font-medium text-slate-700">{row.critere}</td>
                  <td className="py-2 px-3 text-center text-slate-600">{row.solaire}</td>
                  <td className="py-2 px-3 text-center text-slate-600">{row.groupe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Questions frequentes</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-700 mb-1">Combien de temps dure une coupure en moyenne ?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              La majorite des coupures durent 1 a 4 heures. Les evenements meteorologiques majeurs
              (tempetes, verglas) peuvent provoquer des coupures de plusieurs jours. Le record recent
              en France : 5 jours apres la tempete Ciaran en Bretagne (novembre 2023).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-1">Mon logement tout-electrique est-il a risque ?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Oui, c&apos;est la configuration la plus vulnerable. Vous perdez simultanement le chauffage,
              la cuisine et l&apos;eau chaude. Investir dans un rechaud gaz de camping et des couvertures
              de survie est le minimum recommande (moins de 50 EUR).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-1">Combien de temps le frigo reste-t-il froid ?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un frigo ferme conserve le froid environ 4 heures. Un congelateur plein peut tenir
              jusqu&apos;a 48 heures, 24 heures s&apos;il est a moitie plein. Regle d&apos;or : ne pas ouvrir la porte.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-1">L&apos;eau courante fonctionne-t-elle pendant un blackout ?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              En general oui, car le reseau d&apos;eau est sous pression gravitaire. Mais en cas de blackout
              prolonge, les stations de pompage peuvent s&apos;arreter. En immeuble, la pression peut baisser
              aux etages eleves. Avoir une reserve de 6L par personne et par jour est recommande.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-1">Quel est le minimum a avoir chez soi ?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Le kit essentiel (~100 EUR) : lampes torche, radio a piles, powerbank, 3 jours de reserves
              d&apos;eau (6L/pers/jour) et de nourriture seche (conserves, barres energetiques), couvertures
              de survie. Ce kit couvre 90% des coupures courantes.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-blackout" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
