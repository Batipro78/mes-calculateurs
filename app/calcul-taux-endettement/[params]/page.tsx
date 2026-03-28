import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurEndettement from "../CalculateurEndettement";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";

const REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000];
const CHARGES = [300, 500, 700, 900, 1000, 1200, 1500, 2000];

function parseSlug(slug: string): { revenus: number; charges: number } | null {
  const match = slug.match(/^(\d+)-euros-revenus-(\d+)-euros-charges$/);
  if (!match) return null;
  const revenus = parseInt(match[1]);
  const charges = parseInt(match[2]);
  if (!REVENUS.includes(revenus) || !CHARGES.includes(charges)) return null;
  return { revenus, charges };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
}

export async function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const r of REVENUS) {
    for (const c of CHARGES) {
      if (c < r) {
        params.push({ params: `${r}-euros-revenus-${c}-euros-charges` });
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

  const taux = ((parsed.charges / parsed.revenus) * 100).toFixed(1);

  return {
    title: `Taux d'Endettement : ${fmt(parsed.revenus)} EUR de revenus, ${fmt(parsed.charges)} EUR de charges = ${taux}%`,
    description: `Avec ${fmt(parsed.revenus)} EUR de revenus mensuels et ${fmt(parsed.charges)} EUR de charges, votre taux d'endettement est de ${taux}%. ${Number(taux) <= 33 ? "Vous respectez le seuil bancaire de 33%." : "Vous depassez le seuil bancaire de 33%."}`,
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

  const { revenus, charges } = parsed;
  const taux = (charges / revenus) * 100;
  const resteAVivre = revenus - charges;
  const capacite33 = Math.max(0, revenus * 0.33 - charges);

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
                name: `Quel est le taux d'endettement pour ${fmt(revenus)} EUR de revenus et ${fmt(charges)} EUR de charges ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Le taux d'endettement est de ${taux.toFixed(1)}% (${fmt(charges)} / ${fmt(revenus)} x 100). ${taux <= 33 ? `Ce taux est inferieur au seuil de 33% impose par les banques. Vous pouvez encore supporter une mensualite supplementaire de ${fmt(Math.round(capacite33))} EUR.` : `Ce taux depasse le seuil de 33% impose par les banques. Il faudrait reduire vos charges de ${fmt(Math.round(charges - revenus * 0.33))} EUR pour respecter ce seuil.`}`,
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage={`${fmt(revenus)} EUR / ${fmt(charges)} EUR`}
        parentPage="Taux d'Endettement"
        parentHref="/calcul-taux-endettement"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Taux d&apos;Endettement : {fmt(revenus)} EUR / {fmt(charges)} EUR
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Avec <strong>{fmt(revenus)} EUR</strong> de revenus et{" "}
        <strong>{fmt(charges)} EUR</strong> de charges, votre taux est de{" "}
        <strong>{taux.toFixed(1)}%</strong>.
      </p>

      <CalculateurEndettement initialRevenus={revenus} initialCharges={charges} />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Analyse pour {fmt(revenus)} EUR de revenus
        </h2>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className={`rounded-xl p-4 border text-center ${taux <= 33 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
            <p className="text-sm text-slate-600 font-medium">Taux d&apos;endettement</p>
            <p className={`text-3xl font-extrabold mt-1 ${taux <= 33 ? "text-green-700" : "text-red-700"}`}>
              {taux.toFixed(1)}%
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
            <p className="text-sm text-slate-600 font-medium">Reste a vivre</p>
            <p className="text-3xl font-extrabold text-blue-700 mt-1">{fmt(resteAVivre)} EUR</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <p className="text-sm text-slate-600 font-medium">Capacite restante</p>
            <p className="text-3xl font-extrabold text-slate-700 mt-1">{fmt(Math.round(capacite33))} EUR</p>
            <p className="text-xs text-slate-400">avant 33%</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Taux selon le niveau de charges (pour {fmt(revenus)} EUR de revenus)
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Charges/mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Reste a vivre</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {CHARGES.filter((c) => c < revenus).map((c) => {
                const t = (c / revenus) * 100;
                const isCurrent = c === charges;
                return (
                  <tr key={c} className={`border-b border-slate-100 ${isCurrent ? "bg-blue-50 font-bold" : ""}`}>
                    <td className="py-2.5 px-2 text-slate-700">
                      {isCurrent ? (
                        <span className="text-blue-600">{fmt(c)} EUR (actuel)</span>
                      ) : (
                        <a href={`/calcul-taux-endettement/${revenus}-euros-revenus-${c}-euros-charges`} className="text-blue-600 hover:underline">
                          {fmt(c)} EUR
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-bold ${t <= 25 ? "text-green-600" : t <= 33 ? "text-amber-600" : t <= 40 ? "text-orange-600" : "text-red-600"}`}>
                      {t.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{fmt(revenus - c)} EUR</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">
                      {t <= 25 ? "Excellent" : t <= 33 ? "OK" : t <= 40 ? "Eleve" : "Critique"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Taux selon le niveau de revenus (pour {fmt(charges)} EUR de charges)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Revenus/mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Reste a vivre</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {REVENUS.filter((r) => r > charges).map((r) => {
                const t = (charges / r) * 100;
                const isCurrent = r === revenus;
                return (
                  <tr key={r} className={`border-b border-slate-100 ${isCurrent ? "bg-blue-50 font-bold" : ""}`}>
                    <td className="py-2.5 px-2 text-slate-700">
                      {isCurrent ? (
                        <span className="text-blue-600">{fmt(r)} EUR (actuel)</span>
                      ) : (
                        <a href={`/calcul-taux-endettement/${r}-euros-revenus-${charges}-euros-charges`} className="text-blue-600 hover:underline">
                          {fmt(r)} EUR
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-bold ${t <= 25 ? "text-green-600" : t <= 33 ? "text-amber-600" : t <= 40 ? "text-orange-600" : "text-red-600"}`}>
                      {t.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{fmt(r - charges)} EUR</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">
                      {t <= 25 ? "Excellent" : t <= 33 ? "OK" : t <= 40 ? "Eleve" : "Critique"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-taux-endettement" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
