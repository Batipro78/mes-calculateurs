import type { Metadata } from "next";
import SimulateurBonusEcologique from "../SimulateurBonusEcologique";
import {
  calcBonusEcologique,
  TRANCHE_LABELS,
  type BatterieEU,
} from "../calcBonusEcologique";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const VEHICULES = [
  { slug: "renault-5", nom: "Renault 5 E-Tech", prix: 25000, poids: 1450, battEU: "oui" as BatterieEU },
  { slug: "peugeot-e208", nom: "Peugeot e-208", prix: 33500, poids: 1530, battEU: "oui" as BatterieEU },
  { slug: "citroen-ec3", nom: "Citroen e-C3", prix: 23300, poids: 1416, battEU: "oui" as BatterieEU },
  { slug: "dacia-spring", nom: "Dacia Spring", prix: 18900, poids: 1050, battEU: "non" as BatterieEU },
  { slug: "tesla-model-3", nom: "Tesla Model 3", prix: 39990, poids: 1760, battEU: "oui" as BatterieEU },
  { slug: "mg4", nom: "MG4", prix: 27990, poids: 1655, battEU: "non" as BatterieEU },
  { slug: "renault-megane", nom: "Renault Megane E-Tech", prix: 37200, poids: 1636, battEU: "oui" as BatterieEU },
  { slug: "fiat-500e", nom: "Fiat 500e", prix: 29900, poids: 1320, battEU: "oui" as BatterieEU },
];

const RFR_OPTIONS = [
  { slug: "revenu-modeste", label: "revenus modestes", rfr: 14000 },
  { slug: "revenu-intermediaire", label: "revenus intermediaires", rfr: 22000 },
  { slug: "revenu-standard", label: "revenus superieurs", rfr: 35000 },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const v of VEHICULES) {
    for (const r of RFR_OPTIONS) {
      params.push({ params: `${v.slug}-${r.slug}` });
    }
  }
  return params;
}

type Props = { params: Promise<{ params: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { params: slug } = await params;
  const parts = slug.split("-");

  // Find matching vehicle
  const vehicule = VEHICULES.find((v) => slug.startsWith(v.slug));
  const rfr = RFR_OPTIONS.find((r) => slug.endsWith(r.slug));

  if (!vehicule || !rfr) return {};

  const sim = calcBonusEcologique(vehicule.prix, vehicule.poids, rfr.rfr, "electrique", vehicule.battEU);

  return {
    title: `Bonus ecologique ${vehicule.nom} 2026 — ${rfr.label} : ${fmt(sim.bonusTotal)} €`,
    description: `Simulez le bonus ecologique pour une ${vehicule.nom} (${fmt(vehicule.prix)} €) avec des ${rfr.label}. Bonus : ${fmt(sim.bonusTotal)} €. Cout reel : ${fmt(vehicule.prix - sim.bonusTotal)} €.`,
  };
}

export default async function Page({ params }: Props) {
  const { params: slug } = await params;

  const vehicule = VEHICULES.find((v) => slug.startsWith(v.slug));
  const rfr = RFR_OPTIONS.find((r) => slug.endsWith(r.slug));

  if (!vehicule || !rfr) notFound();

  const sim = calcBonusEcologique(vehicule.prix, vehicule.poids, rfr.rfr, "electrique", vehicule.battEU);

  // Comparaison par vehicule pour ce RFR
  const compVehicules = VEHICULES.map((v) => {
    const s = calcBonusEcologique(v.prix, v.poids, rfr.rfr, "electrique", v.battEU);
    return { ...s, nom: v.nom, prix: v.prix };
  });

  // Comparaison par RFR pour ce vehicule
  const compRFR = RFR_OPTIONS.map((r) => {
    const s = calcBonusEcologique(vehicule.prix, vehicule.poids, r.rfr, "electrique", vehicule.battEU);
    return { ...s, label: r.label };
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Quel bonus ecologique pour une ${vehicule.nom} en 2026 ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Avec des ${rfr.label} (RFR ~${fmt(rfr.rfr)} €/part), le bonus ecologique pour une ${vehicule.nom} est de ${fmt(sim.bonusTotal)} € (${fmt(sim.bonusBase)} € de base${sim.surbonus > 0 ? ` + ${fmt(sim.surbonus)} € de surbonus batterie EU` : ""}). Le cout reel passe de ${fmt(vehicule.prix)} € a ${fmt(vehicule.prix - sim.bonusTotal)} €.`,
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage={`Bonus ${vehicule.nom}`} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Bonus ecologique {vehicule.nom} — {rfr.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation du bonus ecologique 2026 pour une {vehicule.nom} a{" "}
        {fmt(vehicule.prix)} € avec des {rfr.label}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-green-700 mb-1">
            Votre bonus ecologique pour la {vehicule.nom}
          </div>
          <div className="text-5xl font-black text-green-700">
            {fmt(sim.bonusTotal)} €
          </div>
          <div className="text-sm text-green-600 mt-1">
            {TRANCHE_LABELS[sim.trancheRFR]}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Prix catalogue</div>
            <div className="text-xl font-bold text-slate-800">{fmt(vehicule.prix)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Bonus base</div>
            <div className="text-xl font-bold text-green-700">{fmt(sim.bonusBase)} €</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Surbonus EU</div>
            <div className="text-xl font-bold text-green-700">
              {sim.surbonus > 0 ? `+${fmt(sim.surbonus)} €` : "—"}
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Cout reel</div>
            <div className="text-xl font-bold text-green-800">
              {fmt(vehicule.prix - sim.bonusTotal)} €
            </div>
          </div>
        </div>
      </div>

      <SimulateurBonusEcologique />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Comparaison vehicules */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison des modeles ({rfr.label})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Modele</th>
                <th className="text-center p-3 font-semibold text-slate-700">Prix</th>
                <th className="text-center p-3 font-semibold text-slate-700">Bonus total</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout reel</th>
              </tr>
            </thead>
            <tbody>
              {compVehicules.map((v) => (
                <tr
                  key={v.nom}
                  className={`border-b border-slate-100 ${v.nom === vehicule.nom ? "bg-green-50 font-bold" : ""}`}
                >
                  <td className="p-3 text-slate-700">{v.nom}</td>
                  <td className="p-3 text-center">{fmt(v.prix)} €</td>
                  <td className="p-3 text-center text-green-600">-{fmt(v.bonusTotal)} €</td>
                  <td className="p-3 text-center font-bold">{fmt(v.prix - v.bonusTotal)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par RFR */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Bonus {vehicule.nom} selon vos revenus
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Tranche</th>
                <th className="text-center p-3 font-semibold text-slate-700">Bonus base</th>
                <th className="text-center p-3 font-semibold text-slate-700">Surbonus EU</th>
                <th className="text-center p-3 font-semibold text-slate-700">Total</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout reel</th>
              </tr>
            </thead>
            <tbody>
              {compRFR.map((r) => (
                <tr
                  key={r.label}
                  className={`border-b border-slate-100 ${r.label === rfr.label ? "bg-green-50 font-bold" : ""}`}
                >
                  <td className="p-3 text-slate-700 capitalize">{r.label}</td>
                  <td className="p-3 text-center">{fmt(r.bonusBase)} €</td>
                  <td className="p-3 text-center text-green-600">
                    {r.surbonus > 0 ? `+${fmt(r.surbonus)} €` : "—"}
                  </td>
                  <td className="p-3 text-center font-bold text-green-700">{fmt(r.bonusTotal)} €</td>
                  <td className="p-3 text-center">{fmt(vehicule.prix - r.bonusTotal)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/simulateur-bonus-ecologique" />
    </div>
  );
}
