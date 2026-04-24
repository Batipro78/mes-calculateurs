import type { Metadata } from "next";
import CalculateurDPE from "./CalculateurDPE";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calculateur-dpe" },
  title: "Simulateur DPE 2026 - Diagnostic Performance Energetique Gratuit",
  description:
    "Simulez le DPE de votre logement gratuitement. Calculez la classe energetique (A a G), les emissions GES, le cout annuel et les economies possibles selon la surface, le chauffage et l'isolation.",
  keywords:
    "DPE, diagnostic performance energetique, classe energetique, simulateur DPE, calcul DPE, passoire thermique, DPE logement 2026, classe A B C D E F G",
  openGraph: {
    title: "Simulateur DPE 2026 - Diagnostic Performance Energetique Gratuit",
    description:
      "Estimez la classe energetique de votre logement (A a G), les emissions CO2 et le cout de chauffage annuel.",
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qu'est-ce que le DPE (Diagnostic de Performance Energetique) ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le DPE est un document obligatoire pour tout logement mis en vente ou en location en France depuis 2006. Il mesure la consommation d'energie d'un logement en kWh/m²/an et ses emissions de CO2 en kg/m²/an. Il attribue une note de A (tres performant, moins de 70 kWh/m²/an) a G (passoire thermique, plus de 420 kWh/m²/an). Depuis le 1er juillet 2021, le DPE est devenu opposable juridiquement.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles sont les classes DPE et leurs seuils de consommation ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les 7 classes DPE sont : A (moins de 70 kWh/m²/an), B (71 a 110 kWh/m²/an), C (111 a 180 kWh/m²/an), D (181 a 250 kWh/m²/an), E (251 a 330 kWh/m²/an), F (331 a 420 kWh/m²/an), G (plus de 420 kWh/m²/an). Les logements F et G sont appeles passoires thermiques. La classe A correspond aux batiments basse consommation (BBC) et passifs.",
        },
      },
      {
        "@type": "Question",
        name: "Quand les passoires energetiques seront-elles interdites a la location ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depuis le 1er janvier 2025, les logements classes G (plus de 420 kWh/m²/an) sont interdits a la location en France. Les logements classes F (331 a 420 kWh/m²/an) seront interdits a la location a partir du 1er janvier 2028. Les logements classes E le seront en 2034. Ces mesures visent a accelerer la renovation energetique du parc immobilier francais.",
        },
      },
    ],
  };

  return (
    <div>
      <WebAppJsonLd
        name="Simulateur DPE"
        description="Estimez la classe energetique de votre logement gratuitement"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage="Simulateur DPE"
        lastUpdated="8 avril 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur DPE 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez la classe energetique de votre logement (A a G), les emissions de CO₂ et le cout annuel de chauffage.
      </p>

      <CalculateurDPE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le DPE (Diagnostic de Performance Energetique) ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>Diagnostic de Performance Energetique (DPE)</strong> est un document officiel qui evalue la
          consommation d&apos;energie d&apos;un logement et son impact environnemental. Obligatoire depuis 2006 pour
          toute vente ou location, il est devenu <strong>opposable juridiquement</strong> depuis le 1er juillet 2021 :
          un acheteur ou locataire peut engager la responsabilite du vendeur ou bailleur en cas d&apos;erreur
          significative.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Il classe les logements de <strong>A</strong> (tres performant, moins de 70 kWh/m²/an) a <strong>G</strong>
          (passoire thermique, plus de 420 kWh/m²/an). Il prend en compte l&apos;isolation, le systeme de chauffage,
          la production d&apos;eau chaude, la ventilation et les apports solaires.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Les 7 classes energetiques DPE</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { classe: "A", range: "≤ 70 kWh/m²/an", label: "Tres performant", bg: "bg-[#009b6e]", text: "text-white" },
            { classe: "B", range: "71-110 kWh/m²/an", label: "Performant", bg: "bg-[#51b848]", text: "text-white" },
            { classe: "C", range: "111-180 kWh/m²/an", label: "Assez performant", bg: "bg-[#adcc40]", text: "text-slate-800" },
            { classe: "D", range: "181-250 kWh/m²/an", label: "Peu performant", bg: "bg-[#f4e435]", text: "text-slate-800" },
            { classe: "E", range: "251-330 kWh/m²/an", label: "Energivore", bg: "bg-[#f2a731]", text: "text-white" },
            { classe: "F", range: "331-420 kWh/m²/an", label: "Tres energivore", bg: "bg-[#e8732a]", text: "text-white" },
            { classe: "G", range: "> 420 kWh/m²/an", label: "Passoire thermique", bg: "bg-[#d63228]", text: "text-white" },
          ].map((item) => (
            <div key={item.classe} className={`${item.bg} ${item.text} rounded-xl p-3`}>
              <p className="text-2xl font-extrabold">{item.classe}</p>
              <p className="font-semibold text-sm mt-0.5">{item.label}</p>
              <p className="text-xs opacity-80 mt-0.5">{item.range}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-8 mb-3">
          2025-2034 : les interdictions de location pour les passoires energetiques
        </h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
          <ul className="space-y-2 text-slate-700 text-sm">
            <li className="flex gap-2">
              <span className="font-bold text-red-600 w-16 shrink-0">2025</span>
              <span>Interdiction de mettre en location les logements classes <strong>G</strong> (plus de 420 kWh/m²/an)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-orange-600 w-16 shrink-0">2028</span>
              <span>Interdiction de mettre en location les logements classes <strong>F</strong> (331-420 kWh/m²/an)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600 w-16 shrink-0">2034</span>
              <span>Interdiction de mettre en location les logements classes <strong>E</strong> (251-330 kWh/m²/an)</span>
            </li>
          </ul>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Impact du DPE sur le prix de l&apos;immobilier</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le DPE est devenu un critere majeur dans la valeur d&apos;un bien immobilier. Une etude des notaires de France
          (2023) montre qu&apos;un logement classe G se vend en moyenne <strong>13 a 19% moins cher</strong> qu&apos;un
          logement equivalent classe D dans la meme zone. A l&apos;inverse, un logement classe A ou B peut valoir 5 a
          15% de plus. Avec l&apos;interdiction progressive de louer les passoires, rembourser une renovation
          energetique peut s&apos;averer plus rentable que de decoter le prix de vente.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment ameliorer son DPE ? Les travaux les plus efficaces
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { titre: "Isolation des combles", gain: "25 a 30%", cout: "1 500 - 5 000 €", aide: "MaPrimeRenov'" },
            { titre: "Isolation des murs", gain: "20 a 25%", cout: "8 000 - 25 000 €", aide: "MaPrimeRenov'" },
            { titre: "Remplacement fenetres", gain: "10 a 15%", cout: "3 000 - 10 000 €", aide: "TVA 5,5%" },
            { titre: "Pompe a chaleur", gain: "50 a 70%", cout: "8 000 - 18 000 €", aide: "MaPrimeRenov' + CEE" },
          ].map((t) => (
            <div key={t.titre} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="font-semibold text-slate-800">{t.titre}</p>
              <p className="text-sm text-emerald-600 mt-1">Economie : {t.gain}</p>
              <p className="text-xs text-slate-500 mt-0.5">Cout : {t.cout}</p>
              <p className="text-xs text-blue-600 mt-0.5">Aide : {t.aide}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">Disclaimer</p>
          <p className="text-sm text-amber-700">
            Ce simulateur fournit une <strong>estimation indicative</strong> basee sur des parametres simplifies.
            Seul un <strong>diagnostiqueur certifie (RGE)</strong> peut etablir un DPE officiel valable pour une
            transaction immobiliere ou une demande d&apos;aide a la renovation. Le DPE officiel prend en compte
            des dizaines de parametres (orientation, ponts thermiques, systeme VMC, eau chaude sanitaire...).
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-4">Mis a jour le 8 avril 2026</p>
      </section>

      <RelatedCalculators currentSlug="/calculateur-dpe" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
