import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurATNBE from "../CalculateurATNBE";
import AdSlot from "../../../components/AdSlot";
import Breadcrumb from "../../../components/Breadcrumb";
import { calculerATN, TypeCarburant } from "../atnVoitureBeCalc";

const VALEURS = [20000, 30000, 40000, 50000, 70000];
const CO2S = [0, 100, 120, 150, 180];
const CARBURANTS: TypeCarburant[] = ["essence", "diesel", "electrique"];

function fmt(n: number): string {
  return n.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

function parseSlug(slug: string): {
  valeur: number;
  co2: number;
  carburant: TypeCarburant;
} | null {
  const m = slug.match(/^(\d+)-euros-(\d+)g-(.+)$/);
  if (!m) return null;

  const valeur = parseInt(m[1], 10);
  const co2 = parseInt(m[2], 10);
  const carburant = m[3] as TypeCarburant;

  if (
    !VALEURS.includes(valeur) ||
    !CO2S.includes(co2) ||
    !CARBURANTS.includes(carburant)
  ) {
    return null;
  }

  // Si électrique, CO2 doit être 0
  if (carburant === "electrique" && co2 !== 0) {
    return null;
  }

  return { valeur, co2, carburant };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  for (const valeur of VALEURS) {
    for (const carburant of CARBURANTS) {
      if (carburant === "electrique") {
        // Électrique : CO2 = 0 uniquement
        params.push({ params: `${valeur}-euros-0g-electrique` });
      } else {
        // Essence, diesel, lpg : tous les CO2 sauf 0
        for (const co2 of CO2S.filter((c) => c !== 0)) {
          params.push({ params: `${valeur}-euros-${co2}g-${carburant}` });
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { valeur, co2, carburant } = parsed;
  const resultat = calculerATN(valeur, co2, carburant, 2);

  const carburantLabel =
    carburant === "essence"
      ? "essence"
      : carburant === "diesel"
        ? "diesel"
        : "électrique";

  return {
    alternates: { canonical: `/be/atn-voiture-societe/${slug}` },
    title: `ATN ${fmtInt(valeur)} EUR ${carburantLabel} ${co2}g/km – Belgique 2026`,
    description: `Calcul ATN voiture de société ${carburantLabel} : valeur catalogue ${fmtInt(valeur)} EUR, CO2 ${co2} g/km → ATN annuel ${fmt(resultat.atnAnnuel)} EUR, mensuel ${fmt(resultat.atnMensuel)} EUR.`,
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

  const { valeur, co2, carburant } = parsed;

  // Calcul à 2 ans (défaut)
  const resultat = calculerATN(valeur, co2, carburant, 2);

  const carburantLabel =
    carburant === "essence"
      ? "essence"
      : carburant === "diesel"
        ? "diesel"
        : "électrique";

  // Comparaison avec autres âges
  const autresAges = [0, 1, 3, 4, 5, 6].map((age) => ({
    age,
    resultat: calculerATN(valeur, co2, carburant, age),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est l'ATN annuel pour une voiture de société ${carburantLabel} ${fmtInt(valeur)} EUR ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une valeur catalogue ${fmtInt(valeur)} EUR, carburant ${carburantLabel}, CO2 ${co2} g/km, âge 2 ans : ATN annuel = ${fmt(resultat.atnAnnuel)} EUR (${fmt(resultat.atnMensuel)} EUR/mois).`,
        },
      },
    ],
  };

  const impactNetMensuel = resultat.atnMensuel * 0.5;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${fmtInt(valeur)} EUR ${carburantLabel}`}
        parentPage="Calcul ATN Voiture de Société"
        parentHref="/be/atn-voiture-societe"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          ATN Voiture {carburantLabel} – {fmtInt(valeur)} EUR
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Valeur catalogue {fmtInt(valeur)} EUR, {carburantLabel}, CO2 {co2}
        {carburant !== "electrique" ? " g/km" : ""}.
      </p>

      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-100 mb-1">ATN annuel (âge 2 ans)</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat.atnAnnuel)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-orange-100 mt-2 text-sm">
          {fmt(resultat.atnMensuel)} EUR/mois | Impact net ≈ {fmt(impactNetMensuel)} EUR/mois
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          ATN selon l&apos;âge du véhicule
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Âge
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Dégressivité
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  ATN annuel
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  ATN mensuel
                </th>
              </tr>
            </thead>
            <tbody>
              {autresAges.map((row) => (
                <tr
                  key={row.age}
                  className={row.age === 2 ? "bg-orange-50" : "border-b border-slate-100"}
                >
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {row.age} ans
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {row.age === 0 ? "100 %" : row.age <= 6 ? `${(100 - 6 * row.age).toFixed(0)} %` : "70 % (plancher)"}
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-orange-600">
                    {fmt(row.resultat.atnAnnuel)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">
                    {fmt(row.resultat.atnMensuel)} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Dégressivité −6 % par an, plancher 70 %. Au-delà de 6 ans, pas d&apos;augmentation.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif (tous les paramètres)
      </h2>
      <CalculateurATNBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détail du calcul ATN
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>Voiture {carburantLabel}</strong> – Valeur catalogue TTC :{" "}
          <strong>{fmt(valeur)} EUR</strong> – CO2 : <strong>{co2} g/km</strong> (référence {carburant === "diesel" ? "58" : "70"} g/km) – Âge : <strong>2 ans</strong>
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-4 text-sm space-y-2">
          <div>
            <strong>Étape 1 – % CO2 :</strong> {resultat.pctCO2.toFixed(1)} % (clamp 4 %–18 %)
          </div>
          <div>
            <strong>Étape 2 – Valeur décotée :</strong> {fmt(resultat.valeurDecotee)} EUR (−{(6 * 2).toFixed(0)} % dégressivité)
          </div>
          <div>
            <strong>Étape 3 – ATN brut :</strong> {fmt(resultat.valeurDecotee)} × (6/7) × {resultat.pctCO2.toFixed(1)} % = {fmt((resultat.valeurDecotee * (6 / 7) * (resultat.pctCO2 / 100)))} EUR
          </div>
          <div>
            <strong>Étape 4 – Application du minimum :</strong> max({fmt((resultat.valeurDecotee * (6 / 7) * (resultat.pctCO2 / 100)))}, 1 690) = <strong>{fmt(resultat.atnAnnuel)} EUR</strong>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          <strong>ATN mensuel :</strong> {fmt(resultat.atnAnnuel)} / 12 = <strong>{fmt(resultat.atnMensuel)} EUR</strong>. Cet ATN s&apos;ajoute au salaire imposable pour le calcul du précompte professionnel (impact net ≈ {fmt(impactNetMensuel)} EUR/mois pour l&apos;employé).
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres valeurs catalogue ({carburantLabel})
        </h3>
        <div className="flex flex-wrap gap-2">
          {VALEURS.filter((v) => v !== valeur).map((v) => {
            const otherCarburant = carburant === "electrique" ? "electrique" : carburant;
            const otherCo2 =
              otherCarburant === "electrique" ? 0 : co2 !== 0 ? co2 : 120;
            return (
              <a
                key={v}
                href={`/be/atn-voiture-societe/${v}-euros-${otherCo2}g-${otherCarburant}`}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
              >
                {fmtInt(v)} EUR
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
