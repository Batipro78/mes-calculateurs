import type { Metadata } from "next";
import CalculateurDureeEntreDates from "../CalculateurDureeEntreDates";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const EVENEMENTS = [
  { slug: "noel-2026", label: "Noel 2026", date: new Date(2026, 11, 25) },
  { slug: "nouvel-an-2027", label: "Nouvel An 2027", date: new Date(2027, 0, 1) },
  { slug: "ete-2026", label: "Ete 2026", date: new Date(2026, 5, 21) },
  { slug: "14-juillet-2026", label: "14 Juillet 2026", date: new Date(2026, 6, 14) },
  { slug: "rentree-2026", label: "Rentree 2026", date: new Date(2026, 8, 1) },
  { slug: "toussaint-2026", label: "Toussaint 2026", date: new Date(2026, 10, 1) },
  { slug: "saint-valentin-2027", label: "Saint-Valentin 2027", date: new Date(2027, 1, 14) },
  { slug: "paques-2026", label: "Paques 2026", date: new Date(2026, 3, 5) },
  { slug: "halloween-2026", label: "Halloween 2026", date: new Date(2026, 9, 31) },
  { slug: "fete-musique-2026", label: "Fete de la Musique 2026", date: new Date(2026, 5, 21) },
];

function parseSlug(slug: string): { label: string; date: Date } | null {
  const ev = EVENEMENTS.find((e) => e.slug === slug);
  return ev ? { label: ev.label, date: ev.date } : null;
}

export function generateStaticParams() {
  return EVENEMENTS.map((e) => ({ params: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const today = new Date(2026, 3, 5); // date de reference pour le build
  const diff = Math.floor((parsed.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const abs = Math.abs(diff);
  return {
    title: `Combien de jours avant ${parsed.label} ? ${abs} jours`,
    description: `Il reste environ ${abs} jours avant ${parsed.label}. Compte a rebours en jours, semaines et mois. Calculez la duree exacte depuis aujourd'hui.`,
    keywords: `combien de jours avant ${parsed.label.toLowerCase()}, compte a rebours ${parsed.label.toLowerCase()}, jours restants ${parsed.label.toLowerCase()}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { label, date } = parsed;

  const today = new Date(2026, 3, 5);
  const diffMs = date.getTime() - today.getTime();
  const totalJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const abs = Math.abs(totalJours);
  const semaines = Math.floor(abs / 7);
  const mois = (abs / 30.44).toFixed(1);
  const futur = totalJours >= 0;

  const dateStr = date.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      <Breadcrumb currentPage={label} parentPage="Duree Entre Dates" parentHref="/calcul-duree-entre-dates" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-xl flex items-center justify-center text-xl shadow-sm">📆</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Compte a rebours : {label}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{dateStr}</p>

      <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg shadow-fuchsia-200/50 mb-8">
        <p className="text-fuchsia-200 text-sm mb-1">{futur ? "Il reste" : "C'etait il y a"}</p>
        <p className="text-5xl font-extrabold tracking-tight">{abs} <span className="text-2xl font-semibold">jours</span></p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-fuchsia-200">Semaines</p><p className="font-semibold text-lg">{semaines}</p></div>
          <div><p className="text-fuchsia-200">Mois</p><p className="font-semibold text-lg">{mois}</p></div>
          <div><p className="text-fuchsia-200">Heures</p><p className="font-semibold text-lg">{(abs * 24).toLocaleString("fr-FR")}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres evenements</h2>
        <div className="space-y-2">
          {EVENEMENTS.filter((e) => e.slug !== slug).map((e) => {
            const d = Math.floor((e.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return (
              <a key={e.slug} href={`/calcul-duree-entre-dates/${e.slug}`}
                className="flex justify-between items-center p-3 rounded-xl border border-slate-200 hover:border-fuchsia-300 hover:bg-fuchsia-50/50 transition-all">
                <span className="text-sm font-medium text-slate-700">{e.label}</span>
                <span className="text-sm font-bold text-fuchsia-600">{d >= 0 ? `${d} jours` : `il y a ${Math.abs(d)} j`}</span>
              </a>
            );
          })}
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur personnalise</h2>
      <CalculateurDureeEntreDates />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-duree-entre-dates" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
