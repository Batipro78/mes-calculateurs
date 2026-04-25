import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcCoutVoiture, PRESETS_VEHICULES } from "../coutVoitureCalc";

const TYPES = ["citadine", "berline", "suv", "electrique", "utilitaire"] as const;
const KM_ANNUELS = [5000, 10000, 15000, 20000, 25000, 30000];
const DUREES = [3, 5, 7, 10];

const PRIX_CARBURANT_DEFAULT: Record<string, number> = {
  citadine: 1.85,
  berline: 1.85,
  suv: 1.85,
  electrique: 1,
  utilitaire: 1.85,
};

const TYPE_LABELS: Record<string, string> = {
  citadine: "Citadine (Clio)",
  berline: "Berline (308)",
  suv: "SUV (3008)",
  electrique: "Electrique (e-208)",
  utilitaire: "Utilitaire (Kangoo)",
};

type TypeSlug = typeof TYPES[number];

function fmt(n: number, dec = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

function getPresetIndex(type: TypeSlug): number {
  return TYPES.indexOf(type);
}

function calcForType(type: TypeSlug, km: number, duree: number) {
  const idx = getPresetIndex(type);
  const preset = PRESETS_VEHICULES[idx];
  const pc = PRIX_CARBURANT_DEFAULT[type];
  return calcCoutVoiture(
    preset.prixAchat,
    km,
    preset.consommation,
    pc,
    preset.assuranceAnnuelle,
    preset.entretienAnnuel,
    duree
  );
}

function parseSlug(slug: string): { type: TypeSlug; km: number; duree: number } | null {
  const match = slug.match(/^([a-z]+)-(\d+)km-(\d+)ans$/);
  if (!match) return null;
  const type = match[1] as TypeSlug;
  const km = parseInt(match[2]);
  const duree = parseInt(match[3]);
  if (!TYPES.includes(type)) return null;
  if (!KM_ANNUELS.includes(km)) return null;
  if (!DUREES.includes(duree)) return null;
  return { type, km, duree };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const type of TYPES) {
    for (const km of KM_ANNUELS) {
      for (const duree of DUREES) {
        slugs.push(`${type}-${km}km-${duree}ans`);
      }
    }
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { type, km, duree } = parsed;
  const result = calcForType(type, km, duree);
  const label = TYPE_LABELS[type];
  return {
    alternates: { canonical: `/simulateur-cout-voiture/${slug}` },
    title: `Cout ${label} : ${fmt(km)} km/an pendant ${duree} ans = ${fmt(result.coutTotal)} €`,
    description: `Cout total d'une ${label} pour ${fmt(km)} km/an sur ${duree} ans : ${fmt(result.coutTotal)} € soit ${fmt(result.coutMensuel)} €/mois ou ${result.coutKilometre.toFixed(2)} €/km. Detail complet : carburant, assurance, entretien, depreciation.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { type, km, duree } = parsed;
  const result = calcForType(type, km, duree);
  const label = TYPE_LABELS[type];
  const preset = PRESETS_VEHICULES[getPresetIndex(type)];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le cout total d'une ${label} pour ${fmt(km)} km/an ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une ${label} parcourant ${fmt(km)} km par an sur ${duree} ans, le cout total est de ${fmt(result.coutTotal)} €, soit ${fmt(result.coutMensuel)} €/mois ou ${result.coutKilometre.toFixed(2)} €/km. Ce montant inclut l'achat, le carburant (${fmt(result.carburantTotal)} €), l'assurance (${fmt(result.assuranceTotal)} €), l'entretien (${fmt(result.entretienTotal)} €), les controles techniques (${fmt(result.controleTotal)} €), moins la valeur de revente (${fmt(result.valeurRevente)} €).`,
        },
      },
      {
        "@type": "Question",
        name: `Combien vaut une ${label} apres ${duree} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une ${label} achetee ${fmt(preset.prixAchat)} € vaut environ ${fmt(result.valeurRevente)} € apres ${duree} ans, soit une depreciation de ${fmt(result.decote)} € (${((result.decote / preset.prixAchat) * 100).toFixed(0)}% du prix d'achat). La depreciation est calculee avec un taux de 15% par an.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le cout carburant d'une ${label} pour ${fmt(km)} km/an ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec une consommation de ${preset.consommation} ${type === "electrique" ? "€/100km" : "L/100km"}, une ${label} parcourant ${fmt(km)} km par an depense environ ${fmt(result.carburantAnnuel)} € de carburant par an, soit ${fmt(result.carburantTotal)} € sur ${duree} ans.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://mescalculateurs.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Simulateur Cout Voiture",
        item: "https://mescalculateurs.fr/simulateur-cout-voiture",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${label} - ${fmt(km)} km/an - ${duree} ans`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${label} - ${fmt(km)} km/an`}
        parentPage="Simulateur Cout Voiture"
        parentHref="/simulateur-cout-voiture"
        lastUpdated="8 avril 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {label} &mdash; {fmt(km)} km/an &mdash; {duree} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Cout total de possession detaille pour ce profil d&apos;utilisation.
      </p>

      {/* Hero result */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-200 mb-2">
          {label} &middot; {fmt(km)} km/an &middot; {duree} an{duree > 1 ? "s" : ""}
        </p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(result.coutTotal)} <span className="text-2xl font-semibold">€</span>
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/15 rounded-xl p-4">
            <p className="text-blue-200 text-xs mb-1">Par mois</p>
            <p className="text-2xl font-bold">{fmt(result.coutMensuel)} €</p>
          </div>
          <div className="bg-white/15 rounded-xl p-4">
            <p className="text-blue-200 text-xs mb-1">Par kilometre</p>
            <p className="text-2xl font-bold">{result.coutKilometre.toFixed(2)} €</p>
          </div>
          <div className="bg-white/15 rounded-xl p-4">
            <p className="text-blue-200 text-xs mb-1">Valeur revente</p>
            <p className="text-2xl font-bold">{fmt(result.valeurRevente)} €</p>
          </div>
        </div>
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Comparison table 1: vary type, same km + duree */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par type de vehicule ({fmt(km)} km/an, {duree} ans)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Vehicule</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Prix achat</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Cout total</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">/mois</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">/km</th>
              </tr>
            </thead>
            <tbody>
              {TYPES.map((t) => {
                const r = calcForType(t, km, duree);
                const p = PRESETS_VEHICULES[getPresetIndex(t)];
                const isCurrent = t === type;
                return (
                  <tr
                    key={t}
                    className={`border-b border-slate-100 transition-colors ${isCurrent ? "bg-blue-50/60" : "hover:bg-slate-50"}`}
                  >
                    <td className="py-2.5 px-3">
                      {isCurrent ? (
                        <span className="font-bold text-blue-700">{TYPE_LABELS[t]}</span>
                      ) : (
                        <a
                          href={`/simulateur-cout-voiture/${t}-${km}km-${duree}ans`}
                          className="text-slate-700 hover:text-blue-600 transition-colors"
                        >
                          {TYPE_LABELS[t]}
                        </a>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{fmt(p.prixAchat)} €</td>
                    <td className={`py-2.5 px-3 text-right font-bold ${isCurrent ? "text-blue-700" : "text-slate-700"}`}>
                      {fmt(r.coutTotal)} €
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{fmt(r.coutMensuel)} €</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">{r.coutKilometre.toFixed(2)} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison table 2: vary km, same type + duree */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Cout selon le kilométrage annuel ({label}, {duree} ans)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Km/an</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Carburant total</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Cout total</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">/mois</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">/km</th>
              </tr>
            </thead>
            <tbody>
              {KM_ANNUELS.map((k) => {
                const r = calcForType(type, k, duree);
                const isCurrent = k === km;
                return (
                  <tr
                    key={k}
                    className={`border-b border-slate-100 transition-colors ${isCurrent ? "bg-blue-50/60" : "hover:bg-slate-50"}`}
                  >
                    <td className="py-2.5 px-3">
                      {isCurrent ? (
                        <span className="font-bold text-blue-700">{fmt(k)} km/an</span>
                      ) : (
                        <a
                          href={`/simulateur-cout-voiture/${type}-${k}km-${duree}ans`}
                          className="text-slate-700 hover:text-blue-600 transition-colors"
                        >
                          {fmt(k)} km/an
                        </a>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{fmt(r.carburantTotal)} €</td>
                    <td className={`py-2.5 px-3 text-right font-bold ${isCurrent ? "text-blue-700" : "text-slate-700"}`}>
                      {fmt(r.coutTotal)} €
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{fmt(r.coutMensuel)} €</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">{r.coutKilometre.toFixed(2)} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <RelatedCalculators currentSlug="/simulateur-cout-voiture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
