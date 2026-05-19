import type { Metadata } from "next";
import CalculKaffaraRamadan from "../CalculKaffaraRamadan";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerCompensation } from "../kaffaraCalc";

// 15 variantes SEO populaires (Kaffara + Fidya)
const VARIANTES = [
  "kaffara-1-jour",
  "kaffara-2-jours",
  "kaffara-3-jours",
  "kaffara-5-jours",
  "kaffara-7-jours",
  "kaffara-10-jours",
  "kaffara-15-jours",
  "kaffara-30-jours",
  "fidya-1-jour",
  "fidya-5-jours",
  "fidya-10-jours",
  "fidya-20-jours",
  "fidya-30-jours",
  "kaffara-rapport-conjugal-ramadan",
  "fidya-personne-agee",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): { type_compensation: "kaffara" | "fidya"; nb_jours: number; label_cas?: string; } | null {
  let match = slug.match(/^kaffara-(\d+)-jours?$/);
  if (match) {
    const [, nb] = match;
    return { type_compensation: "kaffara", nb_jours: parseInt(nb) };
  }

  match = slug.match(/^fidya-(\d+)-jours?$/);
  if (match) {
    const [, nb] = match;
    return { type_compensation: "fidya", nb_jours: parseInt(nb) };
  }

  if (slug === "kaffara-rapport-conjugal-ramadan") {
    return { type_compensation: "kaffara", nb_jours: 1, label_cas: "Rapport conjugal pendant Ramadan" };
  }

  if (slug === "fidya-personne-agee") {
    return { type_compensation: "fidya", nb_jours: 30, label_cas: "Personne très agee (30 jours/mois)" };
  }

  return null;
}

export function generateStaticParams() {
  return VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }>; }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const resultat = calculerCompensation({ type_compensation: parsed.type_compensation, nb_jours: parsed.nb_jours, prix_repas: 9 });
  const typeLabel = parsed.type_compensation === "kaffara" ? "Kaffara" : "Fidya";

  return {
    alternates: { canonical: `/calcul-kaffara-ramadan/${slug}` },
    title: `${typeLabel} ${parsed.nb_jours} jour${parsed.nb_jours > 1 ? "s" : ""} = ${fmt(resultat.total, 0)} € (9 €/repas)`,
    description: `${typeLabel} pour ${parsed.nb_jours} jour${parsed.nb_jours > 1 ? "s" : ""} = ${fmt(resultat.total, 0)} € a 9 €/repas. Compensation Ramadan selon 4 ecoles sunnites.`,
    keywords: `${parsed.type_compensation}, ramadan ${parsed.nb_jours} jours, compensation jeune rompu`,
    openGraph: { title: `${typeLabel} : ${fmt(resultat.total, 0)} € pour ${parsed.nb_jours} jour${parsed.nb_jours > 1 ? "s" : ""}` },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }>; }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const resultat = calculerCompensation({ type_compensation: parsed.type_compensation, nb_jours: parsed.nb_jours, prix_repas: 9 });
  const typeLabel = parsed.type_compensation === "kaffara" ? "Kaffara" : "Fidya";
  const totalStr = fmt(resultat.total, 0);
  const casLabel = parsed.label_cas || `${parsed.nb_jours} jour${parsed.nb_jours > 1 ? "s" : ""}`;

  const variations = [
    { label: `${parsed.nb_jours - 1} jour`, resultat: calculerCompensation({ type_compensation: parsed.type_compensation, nb_jours: Math.max(1, parsed.nb_jours - 1), prix_repas: 9 }), hidden: parsed.nb_jours <= 1 },
    { label: `${parsed.nb_jours + 1} jour${parsed.nb_jours + 1 !== 1 ? "s" : ""}`, resultat: calculerCompensation({ type_compensation: parsed.type_compensation, nb_jours: parsed.nb_jours + 1, prix_repas: 9 }) },
    { label: `${parsed.nb_jours + 3} jours`, resultat: calculerCompensation({ type_compensation: parsed.type_compensation, nb_jours: parsed.nb_jours + 3, prix_repas: 9 }) },
  ];

  return (
    <div>
      <Breadcrumb currentPage={`${typeLabel} ${casLabel}`} parentPage="Calcul Kaffara et Fidya" parentHref="/calcul-kaffara-ramadan" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-xl">🕌</div>
        <h1 className="text-3xl font-extrabold text-slate-800">{typeLabel} - {casLabel}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Prix 9 € par repas (moyenne France 2026)</p>

      <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-emerald-100 mb-1">Total {typeLabel} a verser</p>
        <p className="text-5xl font-extrabold">{totalStr} <span className="text-2xl">€</span></p>
        <p className="text-lg text-emerald-100 mt-3">{resultat.nb_repas_requis} repas × 9 €</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4"><p className="text-xs text-slate-500 mb-1">Jours concernes</p><p className="text-2xl font-bold">{parsed.nb_jours}</p></div>
          <div className="bg-slate-50 rounded-xl p-4"><p className="text-xs text-slate-500 mb-1">Repas par jour</p><p className="text-2xl font-bold text-emerald-700">{parsed.type_compensation === "kaffara" ? 60 : 1}</p></div>
          <div className="bg-slate-50 rounded-xl p-4"><p className="text-xs text-slate-500 mb-1">Par repas</p><p className="text-2xl font-bold text-emerald-700">9 €</p></div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Affiner votre calcul</h2>
      <CalculKaffaraRamadan />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-kaffara-ramadan" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
