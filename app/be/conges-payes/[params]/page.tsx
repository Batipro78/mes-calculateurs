import { fmtEUR_BE as fmt } from "@/app/lib/fmt";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurCongesBE from "../CalculateurCongesBE";
import Breadcrumb from "../../../components/Breadcrumb";
import { type StatutTravailleur, calculerConges } from "../congesPayesBeCalc";

const BRUTS = [2000, 2500, 3000, 3500, 4000, 5000];
const STATUTS: StatutTravailleur[] = ["employe", "ouvrier"];
const MOIS = [6, 9, 12];

interface ParsedSlug {
  brut: number;
  statut: StatutTravailleur;
  mois: number;
}

function parseSlug(slug: string): ParsedSlug | null {
  const m = slug.match(/^(\d+)-euros-(employe|ouvrier)-(\d+)-mois$/);
  if (!m) return null;
  const brut = parseInt(m[1], 10);
  const statut = m[2] as StatutTravailleur;
  const mois = parseInt(m[3], 10);
  if (!BRUTS.includes(brut) || !STATUTS.includes(statut) || !MOIS.includes(mois)) {
    return null;
  }
  return { brut, statut, mois };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const b of BRUTS) {
    for (const s of STATUTS) {
      for (const m of MOIS) {
        params.push({ params: `${b}-euros-${s}-${m}-mois` });
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

  const { brut, statut, mois } = parsed;
  const result = calculerConges(brut, statut, mois);
  const statutLabel = statut === "employe" ? "employé" : "ouvrier";

  return {
    alternates: { canonical: `/be/conges-payes/${slug}` },
    title: `Pécule ${statutLabel} ${brut} EUR (${mois} mois) - Congés Belgique 2026`,
    description: `Pécule de vacances belge pour ${statutLabel} : ${brut} EUR/mois, ${mois} mois travaillés. Pécule brut = ${fmt(result.totalPecule)} EUR, net ≈ ${fmt(result.peculeNet)} EUR (après ~17% précompte).`,
    keywords: `pécule ${statutLabel} Belgique, congés ${brut} EUR, pécule ${mois} mois, vacances ${statutLabel}`,
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

  const { brut, statut, mois } = parsed;
  const result = calculerConges(brut, statut, mois);
  const statutLabel = statut === "employe" ? "employé" : "ouvrier";

  // Autres montants au même statut et mois
  const autresResultats = BRUTS.filter((b) => b !== brut).map((b) => ({
    brut: b,
    result: calculerConges(b, statut, mois),
  }));

  // Autres périodes au même brut et statut
  const autresMois = MOIS.filter((m) => m !== mois).map((m) => ({
    mois: m,
    result: calculerConges(brut, statut, m),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel pécule pour un ${statutLabel} belge à ${brut} EUR/mois ayant travaillé ${mois} mois ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${statutLabel} belge gagnant ${brut} EUR par mois et ayant travaillé ${mois} mois : pécule brut = ${fmt(result.totalPecule)} EUR, pécule net (après ~17% précompte) ≈ ${fmt(result.peculeNet)} EUR.`,
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
        currentPage={`${brut} EUR ${statutLabel} (${mois} mois)`}
        parentPage="Congés Payés Belgique"
        parentHref="/be/conges-payes"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ☀️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Pécule {statutLabel} {brut} EUR ({mois} mois)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul de pécule de vacances belge pour un {statutLabel} gagnant {brut} EUR/mois, ayant travaillé {mois} mois.
      </p>

      <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-2xl p-8 shadow-lg shadow-yellow-200/50 mb-8">
        <p className="text-yellow-100 mb-1">Pécule brut total</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(result.totalPecule)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-yellow-100 mt-2 text-sm">
          Net (après ~17% précompte) : {fmt(result.peculeNet)} EUR
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Détail du calcul
        </h2>
        <div className="space-y-4">
          {statut === "employe" ? (
            <>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Salaire mensuel brut</span>
                <span className="font-bold text-slate-800">{fmt(brut)} EUR</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Taux double pécule</span>
                <span className="font-bold text-slate-800">92 %</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Période (mois travaillés)</span>
                <span className="font-bold text-slate-800">{mois} / 12 mois</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-yellow-50 px-4 rounded-lg">
                <span className="font-semibold text-slate-700">Pécule brut</span>
                <span className="text-xl font-extrabold text-yellow-600">
                  {fmt(result.totalPecule)} EUR
                </span>
              </div>
              <div className="text-xs text-slate-400 px-4">
                Formule : {brut} × 0,92 × ({mois}/12) = {fmt(result.totalPecule)} EUR
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Salaire mensuel brut</span>
                <span className="font-bold text-slate-800">{fmt(brut)} EUR</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Rémunération annuelle brute</span>
                <span className="font-bold text-slate-800">{fmt(brut * 12)} EUR</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Taux pécule ouvrier</span>
                <span className="font-bold text-slate-800">15,38 %</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Caisse vacances (bonus)</span>
                <span className="font-bold text-slate-800">+8 % (×1,08)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Période (mois travaillés)</span>
                <span className="font-bold text-slate-800">{mois} / 12 mois</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-yellow-50 px-4 rounded-lg">
                <span className="font-semibold text-slate-700">Pécule brut</span>
                <span className="text-xl font-extrabold text-yellow-600">
                  {fmt(result.totalPecule)} EUR
                </span>
              </div>
              <div className="text-xs text-slate-400 px-4">
                Formule : ({brut} × 12) × 0,1538 × 1,08 × ({mois}/12) = {fmt(result.totalPecule)} EUR
              </div>
            </>
          )}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Précompte (~17%)</span>
              <span className="font-bold text-red-600">
                - {fmt(result.totalPecule - result.peculeNet)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center py-3 bg-green-50 px-4 rounded-lg">
              <span className="font-semibold text-slate-700">Pécule net (à recevoir)</span>
              <span className="text-xl font-extrabold text-green-600">
                {fmt(result.peculeNet)} EUR
              </span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Autres montants (même statut, même période)
      </h2>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Salaire mensuel
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Pécule brut
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Pécule net (~83%)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {autresResultats.map((item) => (
                <tr key={item.brut} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {fmt(item.brut)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {fmt(item.result.totalPecule)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-yellow-600">
                    {fmt(item.result.peculeNet)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={`/be/conges-payes/${item.brut}-euros-${statut}-${mois}-mois`}
                      className="text-yellow-600 hover:underline text-xs font-medium"
                    >
                      voir →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Autres périodes (même salaire, même statut)
      </h2>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {autresMois.map((item) => (
            <a
              key={item.mois}
              href={`/be/conges-payes/${brut}-euros-${statut}-${item.mois}-mois`}
              className="p-4 rounded-lg border border-slate-200 hover:border-yellow-300 hover:bg-yellow-50/50 transition-all cursor-pointer"
            >
              <p className="text-sm text-slate-400">Après {item.mois} mois</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">
                {fmt(item.result.totalPecule)} EUR
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Net : {fmt(item.result.peculeNet)} EUR
              </p>
            </a>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurCongesBE />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détails complets : {statutLabel} à {brut} EUR ({mois} mois)
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un <strong>{statutLabel}</strong> belge gagnant <strong>{fmt(brut)} EUR par mois</strong> et
          ayant travaillé <strong>{mois} mois</strong> durant l&apos;exercice, le montant
          du pécule de vacances s&apos;élève à <strong>{fmt(result.totalPecule)} EUR brut</strong>.
          Après déduction du précompte d&apos;environ 17 %, le montant net reçu est d&apos;environ{" "}
          <strong>{fmt(result.peculeNet)} EUR</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          {statut === "employe"
            ? `Le double pécule pour employés représente 92 % du salaire mensuel brut,
               ajusté à la période d'emploi effective. C'est une allocation versée avant
               les congés payés, garantie à tous les employés belges.`
            : `Le pécule pour ouvriers est géré via une caisse de vacances obligatoire et
               représente 15,38 % de la rémunération annuelle brute, majorée de 8 %.
               Ce montant est payé entre 2 mai et 30 juin de chaque année.`}
        </p>
      </section>
    </div>
  );
}
