import type { Metadata } from "next";
import CalculateurMalus from "../CalculateurMalus";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const CO2_VALS = [100, 110, 113, 114, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 170, 180, 190, 200, 210, 220];

function calculerMalus(co2: number): number {
  if (co2 <= 113) return 0;
  if (co2 === 114) return 50;
  if (co2 <= 120) return 50 + (co2 - 114) * 25;
  if (co2 <= 130) return 200 + (co2 - 120) * 50;
  if (co2 <= 140) return 700 + (co2 - 130) * 80;
  if (co2 <= 150) return 1500 + (co2 - 140) * 150;
  if (co2 <= 160) return 3000 + (co2 - 150) * 250;
  if (co2 <= 170) return 5500 + (co2 - 160) * 400;
  if (co2 <= 180) return 9500 + (co2 - 170) * 600;
  if (co2 <= 190) return 15500 + (co2 - 180) * 800;
  if (co2 <= 200) return 23500 + (co2 - 190) * 1000;
  if (co2 <= 210) return 33500 + (co2 - 200) * 1200;
  return Math.min(70000, 45500 + (co2 - 210) * 1500);
}

function fmtInt(n: number): string { return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }); }

function parseSlug(slug: string): { co2: number } | null {
  const match = slug.match(/^(\d+)-g-co2$/);
  if (!match) return null;
  return { co2: parseInt(match[1]) };
}

export function generateStaticParams() {
  return CO2_VALS.map((c) => ({ params: `${c}-g-co2` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const malus = calculerMalus(parsed.co2);
  return {
    alternates: { canonical: `/calcul-malus-ecologique/${slug}` },
    title: `Malus ecologique ${parsed.co2} g CO2/km = ${fmtInt(malus)} \u20ac (2026)`,
    description: `Un vehicule emettant ${parsed.co2} g de CO2/km est soumis a un malus de ${fmtInt(malus)} \u20ac en 2026. Bareme officiel et detail du calcul.`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { co2 } = parsed;
  const malus = calculerMalus(co2);

  return (
    <div>
      <Breadcrumb currentPage={`${co2} g CO2`} parentPage="Malus Ecologique" parentHref="/calcul-malus-ecologique" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🚗</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Malus ecologique : {co2} g CO2/km</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Montant du malus 2026 pour un vehicule emettant {co2} g de CO2 par km.</p>

      <div className={`rounded-2xl p-8 shadow-lg text-white mb-8 ${malus === 0 ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-200/50" : "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-200/50"}`}>
        <p className={`text-sm mb-1 ${malus === 0 ? "text-green-200" : "text-rose-200"}`}>{co2} g CO2/km</p>
        <p className="text-5xl font-extrabold tracking-tight">{malus === 0 ? "Pas de malus" : `${fmtInt(malus)} \u20ac`}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Malus par niveau d&apos;emission</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">CO2 (g/km)</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Malus 2026</th>
            </tr></thead>
            <tbody>
              {CO2_VALS.map((c) => {
                const m = calculerMalus(c);
                return (
                  <tr key={c} className={`border-b border-slate-100 ${c === co2 ? "bg-rose-50/50" : ""}`}>
                    <td className="py-2.5 px-2">{c === co2 ? <span className="font-bold text-rose-600">{c} g</span> : <a href={`/calcul-malus-ecologique/${c}-g-co2`} className="text-slate-700 hover:text-rose-600">{c} g</a>}</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${c === co2 ? "text-rose-600" : m === 0 ? "text-green-600" : "text-slate-700"}`}>{m === 0 ? "0 \u20ac" : `${fmtInt(m)} \u20ac`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur complet</h2>
      <CalculateurMalus />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Malus pour {co2} g CO2/km en 2026</h2>
        <p className="text-slate-600 leading-relaxed">
          Un vehicule emettant <strong>{co2} g de CO2/km</strong> est soumis a un malus de <strong>{fmtInt(malus)} &euro;</strong> en 2026.
          {malus === 0 && ` Ce vehicule est sous le seuil de declenchement (114 g/km). Aucun malus a payer.`}
          {malus > 0 && malus <= 1000 && " C'est un malus modere. Privilegiez un vehicule sous 113 g/km pour l'eviter."}
          {malus > 1000 && malus <= 10000 && " C'est un malus significatif. Envisagez un vehicule hybride ou electrique."}
          {malus > 10000 && " C'est un malus tres eleve. Le plafond 2026 est fixe a 70 000 \u20ac."}
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-malus-ecologique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
