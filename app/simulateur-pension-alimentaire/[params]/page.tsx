import type { Metadata } from "next";
import SimulateurPensionAlimentaire from "../SimulateurPensionAlimentaire";
import { calcPensionAlimentaire, GARDE_LABELS, type TypeGarde } from "../calcPensionAlimentaire";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const REVENUS = [1500, 2000, 2500, 3000, 3500, 4000, 5000];
const ENFANTS_OPTIONS = [1, 2, 3, 4];
const GARDES: TypeGarde[] = ["classique", "alternee", "reduit"];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function makeSlug(revenu: number, enfants: number, garde: TypeGarde): string {
  return `${revenu}-euros-${enfants}-enfant${enfants > 1 ? "s" : ""}-${garde}`;
}

function parseSlug(slug: string): { revenu: number; enfants: number; garde: TypeGarde } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-enfants?-(classique|alternee|reduit)$/);
  if (!match) return null;
  return {
    revenu: parseInt(match[1]),
    enfants: parseInt(match[2]),
    garde: match[3] as TypeGarde,
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const rev of REVENUS) {
    for (const enf of ENFANTS_OPTIONS) {
      for (const g of GARDES) {
        params.push({ params: makeSlug(rev, enf, g) });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { revenu, enfants, garde } = parsed;
  const r = calcPensionAlimentaire(revenu, enfants, garde);

  return {
    alternates: { canonical: `/simulateur-pension-alimentaire/${slug}` },
    title: `Pension alimentaire ${fmtInt(revenu)} EUR, ${enfants} enfant${enfants > 1 ? "s" : ""}, ${GARDE_LABELS[garde].toLowerCase()} = ${fmt(r.pensionTotale)} EUR`,
    description: `Simulation pension alimentaire pour ${fmtInt(revenu)} EUR de revenu net, ${enfants} enfant${enfants > 1 ? "s" : ""} en ${GARDE_LABELS[garde].toLowerCase()} : ${fmt(r.pensionTotale)} EUR/mois total (${fmt(r.pensionParEnfant)} EUR par enfant). Bareme Justice 2026.`,
    keywords: `pension alimentaire ${fmtInt(revenu)} euros, pension ${enfants} enfant${enfants > 1 ? "s" : ""}, ${GARDE_LABELS[garde].toLowerCase()}, calcul pension alimentaire`,
    openGraph: {
      title: `${fmtInt(revenu)} EUR, ${enfants} enfant${enfants > 1 ? "s" : ""} → ${fmt(r.pensionTotale)} EUR de pension`,
      description: `Par enfant : ${fmt(r.pensionParEnfant)} EUR. Taux : ${(r.taux * 100).toFixed(1)}%. Reste a vivre : ${fmt(r.resteAVivre)} EUR.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { revenu, enfants, garde } = parsed;
  const r = calcPensionAlimentaire(revenu, enfants, garde);

  // Comparaison par revenu
  const compRevenus = REVENUS.map((rev) => {
    const sim = calcPensionAlimentaire(rev, enfants, garde);
    return { revenu: rev, ...sim };
  });

  // Comparaison par garde
  const compGardes = GARDES.map((g) => {
    const sim = calcPensionAlimentaire(revenu, enfants, g);
    return { ...sim, garde: g };
  });

  // Comparaison par enfants
  const compEnfants = ENFANTS_OPTIONS.map((enf) => {
    const sim = calcPensionAlimentaire(revenu, enf, garde);
    return { ...sim, enfants: enf };
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
                name: `Quelle pension alimentaire pour ${fmtInt(revenu)} EUR avec ${enfants} enfant${enfants > 1 ? "s" : ""} ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Pour un revenu de ${fmtInt(revenu)} EUR avec ${enfants} enfant${enfants > 1 ? "s" : ""} en ${GARDE_LABELS[garde].toLowerCase()}, la pension estimee est de ${fmt(r.pensionTotale)} EUR/mois (${fmt(r.pensionParEnfant)} EUR par enfant). Taux applique : ${(r.taux * 100).toFixed(1)}%.`,
                },
              },
            ],
          }),
        }}
      />

      <Breadcrumb currentPage={`Pension ${fmtInt(revenu)} EUR — ${enfants} enfant${enfants > 1 ? "s" : ""}`} />

      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
        Pension alimentaire : {fmtInt(revenu)} EUR, {enfants} enfant{enfants > 1 ? "s" : ""}, {GARDE_LABELS[garde].toLowerCase()}
      </h1>
      <p className="text-slate-500 mb-8">
        Estimation detaillee selon le bareme du Ministere de la Justice.
      </p>

      {/* Resultat */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white mb-8">
        <p className="text-lg font-medium opacity-90 mb-1">Pension alimentaire estimee</p>
        <p className="text-5xl font-black mb-2">
          {fmt(r.pensionTotale)} <span className="text-2xl">EUR/mois</span>
        </p>
        <p className="opacity-80">
          {fmt(r.pensionParEnfant)} EUR par enfant x {enfants} = {fmt(r.pensionTotale)} EUR
        </p>
      </div>

      {/* Detail */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Revenu net</span>
            <span className="font-bold">{fmt(r.revenuNet)} EUR</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Minimum vital (RSA)</span>
            <span className="font-bold text-red-600">- {fmt(r.minimumVital)} EUR</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 bg-slate-50 -mx-6 px-6">
            <span className="font-semibold text-slate-700">Revenu disponible</span>
            <span className="font-bold">{fmt(r.revenuDisponible)} EUR</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Taux ({GARDE_LABELS[garde]})</span>
            <span className="font-bold">{(r.taux * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Par enfant</span>
            <span className="font-bold">{fmt(r.pensionParEnfant)} EUR</span>
          </div>
          <div className="flex justify-between py-2 bg-indigo-50 -mx-6 px-6">
            <span className="font-bold text-indigo-800">Total ({enfants} enfant{enfants > 1 ? "s" : ""})</span>
            <span className="text-xl font-black text-indigo-700">{fmt(r.pensionTotale)} EUR</span>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 mt-2">
            <span className="text-slate-600">Reste a vivre</span>
            <span className="font-bold text-emerald-600">{fmt(r.resteAVivre)} EUR</span>
          </div>
        </div>
      </div>

      {/* Comparaison par revenu */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comparaison par revenu ({enfants} enfant{enfants > 1 ? "s" : ""}, {GARDE_LABELS[garde].toLowerCase()})
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 text-slate-500">Revenu</th>
              <th className="text-right py-2 text-slate-500">Par enfant</th>
              <th className="text-right py-2 text-slate-500">Total</th>
            </tr>
          </thead>
          <tbody>
            {compRevenus.map((c) => (
              <tr key={c.revenu} className={`border-b border-slate-50 ${c.revenu === revenu ? "bg-indigo-50 font-bold" : ""}`}>
                <td className="py-2">
                  <a href={`/simulateur-pension-alimentaire/${makeSlug(c.revenu, enfants, garde)}`} className="text-indigo-600 hover:underline">
                    {fmtInt(c.revenu)} EUR
                  </a>
                </td>
                <td className="py-2 text-right">{fmt(c.pensionParEnfant)} EUR</td>
                <td className="py-2 text-right font-bold text-indigo-600">{fmt(c.pensionTotale)} EUR</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparaison par garde */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comparaison par type de garde ({fmtInt(revenu)} EUR, {enfants} enfant{enfants > 1 ? "s" : ""})
        </h2>
        <div className="space-y-3">
          {compGardes.map((c) => (
            <a
              key={c.garde}
              href={`/simulateur-pension-alimentaire/${makeSlug(revenu, enfants, c.garde)}`}
              className={`flex justify-between items-center p-3 rounded-xl transition-colors ${
                c.garde === garde ? "bg-indigo-50 ring-1 ring-indigo-200" : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div>
                <p className="font-semibold text-slate-800">{GARDE_LABELS[c.garde]}</p>
                <p className="text-xs text-slate-500">{(c.taux * 100).toFixed(1)}% par enfant</p>
              </div>
              <p className="text-lg font-black text-indigo-600">{fmt(c.pensionTotale)} EUR</p>
            </a>
          ))}
        </div>
      </div>

      {/* Comparaison par enfants */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comparaison par nombre d&apos;enfants ({fmtInt(revenu)} EUR, {GARDE_LABELS[garde].toLowerCase()})
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 text-slate-500">Enfants</th>
              <th className="text-right py-2 text-slate-500">Par enfant</th>
              <th className="text-right py-2 text-slate-500">Total</th>
              <th className="text-right py-2 text-slate-500">Reste a vivre</th>
            </tr>
          </thead>
          <tbody>
            {compEnfants.map((c) => (
              <tr key={c.enfants} className={`border-b border-slate-50 ${c.enfants === enfants ? "bg-indigo-50 font-bold" : ""}`}>
                <td className="py-2">
                  <a href={`/simulateur-pension-alimentaire/${makeSlug(revenu, c.enfants, garde)}`} className="text-indigo-600 hover:underline">
                    {c.enfants} enfant{c.enfants > 1 ? "s" : ""}
                  </a>
                </td>
                <td className="py-2 text-right">{fmt(c.pensionParEnfant)} EUR</td>
                <td className="py-2 text-right font-bold text-indigo-600">{fmt(c.pensionTotale)} EUR</td>
                <td className="py-2 text-right text-emerald-600">{fmt(c.resteAVivre)} EUR</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-8">Simulateur interactif</h2>
      <SimulateurPensionAlimentaire />

      <RelatedCalculators currentSlug="/simulateur-pension-alimentaire" />
    </div>
  );
}
