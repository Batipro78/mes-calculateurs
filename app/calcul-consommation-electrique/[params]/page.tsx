import type { Metadata } from "next";
import CalculateurElectricite from "../CalculateurElectricite";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface Appareil {
  slug: string;
  nom: string;
  emoji: string;
  puissance: number;
  heuresDefaut: number;
}

const APPAREILS: Appareil[] = [
  { slug: "ampoule-led", nom: "Ampoule LED", emoji: "💡", puissance: 9, heuresDefaut: 5 },
  { slug: "televiseur", nom: "Televiseur", emoji: "📺", puissance: 120, heuresDefaut: 4 },
  { slug: "ordinateur-portable", nom: "Ordinateur portable", emoji: "💻", puissance: 50, heuresDefaut: 6 },
  { slug: "pc-gamer", nom: "PC Gamer", emoji: "🎮", puissance: 350, heuresDefaut: 4 },
  { slug: "ps5", nom: "PS5", emoji: "🎮", puissance: 200, heuresDefaut: 3 },
  { slug: "lave-linge", nom: "Lave-linge", emoji: "🧺", puissance: 1200, heuresDefaut: 1 },
  { slug: "lave-vaisselle", nom: "Lave-vaisselle", emoji: "🍽️", puissance: 1400, heuresDefaut: 1 },
  { slug: "radiateur-electrique", nom: "Radiateur electrique", emoji: "🔥", puissance: 1500, heuresDefaut: 8 },
  { slug: "refrigerateur", nom: "Refrigerateur", emoji: "❄️", puissance: 150, heuresDefaut: 24 },
  { slug: "four-electrique", nom: "Four electrique", emoji: "🍳", puissance: 2500, heuresDefaut: 1 },
  { slug: "micro-ondes", nom: "Micro-ondes", emoji: "📡", puissance: 1000, heuresDefaut: 0.5 },
  { slug: "plaque-induction", nom: "Plaque induction", emoji: "🍲", puissance: 2500, heuresDefaut: 1 },
  { slug: "climatisation", nom: "Climatisation", emoji: "❄️", puissance: 2000, heuresDefaut: 6 },
  { slug: "pompe-a-chaleur", nom: "Pompe a chaleur", emoji: "🌡️", puissance: 1500, heuresDefaut: 10 },
  { slug: "box-internet", nom: "Box internet", emoji: "📶", puissance: 15, heuresDefaut: 24 },
  { slug: "borne-recharge-ve", nom: "Borne recharge VE", emoji: "🚗", puissance: 7400, heuresDefaut: 4 },
];

const APPAREIL_SLUGS = APPAREILS.map((a) => a.slug);

const TARIF_BASE = 0.2516;

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function calculConso(puissance: number, heuresJour: number) {
  const consoJour = (puissance * heuresJour) / 1000; // kWh
  const consoMois = consoJour * 30;
  const consoAn = consoJour * 365;
  const coutJour = consoJour * TARIF_BASE;
  const coutMois = consoMois * TARIF_BASE;
  const coutAn = consoAn * TARIF_BASE;
  return { consoJour, consoMois, consoAn, coutJour, coutMois, coutAn };
}

function parseSlug(slug: string): { appareil: string } | null {
  if (APPAREIL_SLUGS.includes(slug)) return { appareil: slug };
  return null;
}

export function generateStaticParams() {
  return APPAREILS.map((a) => ({ params: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const appareil = APPAREILS.find((a) => a.slug === slug);
  if (!appareil) return {};

  const calc = calculConso(appareil.puissance, appareil.heuresDefaut);

  return {
    alternates: { canonical: `/calcul-consommation-electrique/${slug}` },
    title: `Consommation ${appareil.nom} - Combien ca coute en electricite ? (2026)`,
    description: `Consommation electrique d'un ${appareil.nom} (${fmtInt(appareil.puissance)}W) : ${fmt(calc.consoAn)} kWh/an soit ${fmt(calc.coutAn)} EUR/an au tarif EDF 2026 (${TARIF_BASE} EUR/kWh). Cout par jour, mois et an.`,
    keywords: `consommation ${appareil.nom}, cout electricite ${appareil.nom}, combien consomme ${appareil.nom}, ${appareil.nom} kWh, watt ${appareil.nom}`,
    openGraph: {
      title: `${appareil.nom} : ${fmt(calc.coutAn)} EUR/an d'electricite`,
      description: `Un ${appareil.nom} (${fmtInt(appareil.puissance)}W, ${appareil.heuresDefaut}h/jour) coute ${fmt(calc.coutAn)} EUR/an soit ${fmt(calc.coutMois)} EUR/mois.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const appareil = APPAREILS.find((a) => a.slug === slug);
  if (!appareil) notFound();

  const calc = calculConso(appareil.puissance, appareil.heuresDefaut);

  // Comparaison avec differentes durees d'utilisation
  const heuresVariantes = [1, 2, 4, 6, 8, 10, 12, 24].filter((h) => h !== appareil.heuresDefaut);
  const comparaisonHeures = [appareil.heuresDefaut, ...heuresVariantes].sort((a, b) => a - b).map((h) => {
    const c = calculConso(appareil.puissance, h);
    return { heures: h, ...c, isCurrent: h === appareil.heuresDefaut };
  });

  // Comparaison tous appareils
  const comparaisonAppareils = APPAREILS.map((a) => {
    const c = calculConso(a.puissance, a.heuresDefaut);
    return { slug: a.slug, nom: a.nom, emoji: a.emoji, puissance: a.puissance, coutAn: c.coutAn, consoAn: c.consoAn, isCurrent: a.slug === slug };
  }).sort((a, b) => b.coutAn - a.coutAn);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien consomme un ${appareil.nom} en electricite ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Un ${appareil.nom} de ${fmtInt(appareil.puissance)} watts utilise ${appareil.heuresDefaut}h par jour consomme ${fmt(calc.consoAn)} kWh par an, soit un cout de ${fmt(calc.coutAn)} EUR/an au tarif EDF 2026 (${TARIF_BASE} EUR/kWh). Par mois cela revient a ${fmt(calc.coutMois)} EUR.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien coute un ${appareil.nom} par mois en electricite ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec une utilisation de ${appareil.heuresDefaut}h/jour, un ${appareil.nom} coute environ ${fmt(calc.coutMois)} EUR par mois en electricite, soit ${fmt(calc.coutJour)} EUR par jour.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={appareil.nom}
        parentPage="Consommation Electrique"
        parentHref="/calcul-consommation-electrique"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {appareil.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Consommation {appareil.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Combien coute un {appareil.nom} ({fmtInt(appareil.puissance)}W) en electricite ? Cout jour, mois et an — tarif EDF 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-yellow-100 mb-1">Cout annuel ({appareil.nom})</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(calc.coutAn)} <span className="text-2xl font-semibold">EUR / an</span>
        </p>
        <p className="text-yellow-100 mt-2">{fmt(calc.consoAn)} kWh/an ({appareil.heuresDefaut}h/jour)</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-yellow-100">Par jour</p>
            <p className="font-semibold">{fmt(calc.coutJour)} EUR</p>
          </div>
          <div>
            <p className="text-yellow-100">Par mois</p>
            <p className="font-semibold">{fmt(calc.coutMois)} EUR</p>
          </div>
          <div>
            <p className="text-yellow-100">Puissance</p>
            <p className="font-semibold">{fmtInt(appareil.puissance)} W</p>
          </div>
          <div>
            <p className="text-yellow-100">Tarif EDF</p>
            <p className="font-semibold">{TARIF_BASE} EUR/kWh</p>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Formule de calcul</h2>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-1">
          <p>Conso/jour = {fmtInt(appareil.puissance)}W x {appareil.heuresDefaut}h / 1000 = {fmt(calc.consoJour)} kWh</p>
          <p>Conso/an = {fmt(calc.consoJour)} x 365 = {fmt(calc.consoAn)} kWh</p>
          <p>Cout/an = {fmt(calc.consoAn)} x {TARIF_BASE} = {fmt(calc.coutAn)} EUR</p>
        </div>
      </div>

      {/* Comparaison par heures */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {appareil.nom} : cout selon la duree d&apos;utilisation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Heures/jour</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">kWh/an</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout/mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout/an</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonHeures.map((row) => (
                <tr key={row.heures} className={`border-b border-slate-100 ${row.isCurrent ? "bg-amber-50/50" : ""}`}>
                  <td className={`py-2.5 px-2 font-medium ${row.isCurrent ? "font-bold text-amber-600" : "text-slate-700"}`}>
                    {row.heures}h
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.consoAn)}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.coutMois)} EUR</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-amber-600" : "text-slate-700"}`}>
                    {fmt(row.coutAn)} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classement appareils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Classement par cout annuel (tous appareils)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Appareil</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Puissance</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">kWh/an</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout/an</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAppareils.map((row) => (
                <tr key={row.slug} className={`border-b border-slate-100 ${row.isCurrent ? "bg-amber-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-amber-600">{row.emoji} {row.nom}</span>
                    ) : (
                      <a href={`/calcul-consommation-electrique/${row.slug}`} className="text-slate-700 hover:text-amber-600 transition-colors">
                        {row.emoji} {row.nom}
                      </a>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmtInt(row.puissance)} W</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(row.consoAn)}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-amber-600" : "text-slate-700"}`}>
                    {fmt(row.coutAn)} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurElectricite />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Combien coute un {appareil.nom} en electricite ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un <strong>{appareil.nom}</strong> d&apos;une puissance de <strong>{fmtInt(appareil.puissance)} watts</strong>,
          utilise <strong>{appareil.heuresDefaut} heures par jour</strong>, consomme environ{" "}
          <strong>{fmt(calc.consoAn)} kWh par an</strong>. Au tarif EDF 2026 de {TARIF_BASE} EUR/kWh,
          cela represente un cout de <strong>{fmt(calc.coutAn)} EUR par an</strong>,
          soit <strong>{fmt(calc.coutMois)} EUR par mois</strong>.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Conseils pour reduire la consommation</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Choisissez des appareils avec une bonne classe energetique (A, B)</li>
          <li>Eteignez completement les appareils en veille (multiprise avec interrupteur)</li>
          <li>Comparez les tarifs Base vs HP/HC selon vos habitudes</li>
          <li>Utilisez les heures creuses pour les appareils gourmands</li>
        </ul>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres appareils</h2>
        <div className="flex flex-wrap gap-2">
          {APPAREILS.filter((a) => a.slug !== slug).map((a) => (
            <a
              key={a.slug}
              href={`/calcul-consommation-electrique/${a.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              {a.emoji} {a.nom}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-consommation-electrique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
