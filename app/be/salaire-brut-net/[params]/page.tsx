import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurSalaireBE from "../CalculateurSalaireBE";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  brutVersNetBE,
  netVersBrutBE,
  type SituationFamiliale,
} from "../salaireBeCalc";

const MONTANTS_BRUT = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000];
const MONTANTS_NET = [1200, 1500, 1800, 2000, 2300, 2500, 2800, 3000, 3500, 4000, 4500];
const SITUATIONS: { slug: string; value: SituationFamiliale; label: string }[] = [
  { slug: "isole", value: "isole", label: "Isole" },
  { slug: "marie-1-revenu", value: "marie-1-revenu", label: "Marie 1 revenu" },
  { slug: "marie-2-revenus", value: "marie-2-revenus", label: "Marie 2 revenus" },
];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-BE");
}

type Parsed =
  | { kind: "brut"; brut: number; situation: typeof SITUATIONS[number] }
  | { kind: "net"; net: number; situation: typeof SITUATIONS[number] };

function parseSlug(slug: string): Parsed | null {
  // net : "{net}-euros-net-{situation}"
  const netMatch = slug.match(/^(\d+)-euros-net-(.+)$/);
  if (netMatch) {
    const net = parseInt(netMatch[1], 10);
    const situation = SITUATIONS.find((s) => s.slug === netMatch[2]);
    if (!situation || !MONTANTS_NET.includes(net)) return null;
    return { kind: "net", net, situation };
  }
  // brut : "{brut}-euros-{situation}"
  const brutMatch = slug.match(/^(\d+)-euros-(.+)$/);
  if (brutMatch) {
    const brut = parseInt(brutMatch[1], 10);
    const situation = SITUATIONS.find((s) => s.slug === brutMatch[2]);
    if (!situation || !MONTANTS_BRUT.includes(brut)) return null;
    return { kind: "brut", brut, situation };
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const b of MONTANTS_BRUT) {
    for (const s of SITUATIONS) {
      params.push({ params: `${b}-euros-${s.slug}` });
    }
  }
  for (const n of MONTANTS_NET) {
    for (const s of SITUATIONS) {
      params.push({ params: `${n}-euros-net-${s.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.kind === "brut") {
    const res = brutVersNetBE(parsed.brut, parsed.situation.value, 0);
    return {
      alternates: { canonical: `/be/salaire-brut-net/${slug}` },
      title: `${parsed.brut} EUR brut en net Belgique - ${parsed.situation.label}`,
      description: `Un salaire brut belge de ${parsed.brut} EUR/mois (${parsed.situation.label}) donne environ ${fmt(res.netMensuel)} EUR net. ONSS 13,07 % + precompte progressif IPP 2026.`,
      keywords: `${parsed.brut} brut net belgique, salaire ${parsed.brut} belge, ONSS precompte`,
    };
  }
  const res = netVersBrutBE(parsed.net, parsed.situation.value, 0);
  return {
    alternates: { canonical: `/be/salaire-brut-net/${slug}` },
    title: `${parsed.net} EUR net en brut Belgique - ${parsed.situation.label}`,
    description: `Un salaire net belge de ${parsed.net} EUR/mois (${parsed.situation.label}) correspond a environ ${fmt(res.brutMensuel)} EUR brut. Inversion ONSS + precompte 2026.`,
    keywords: `${parsed.net} net brut belgique, salaire ${parsed.net} belge, calcul inverse`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const res =
    parsed.kind === "brut"
      ? brutVersNetBE(parsed.brut, parsed.situation.value, 0)
      : netVersBrutBE(parsed.net, parsed.situation.value, 0);

  const titreH1 =
    parsed.kind === "brut"
      ? `${parsed.brut} EUR brut en net Belgique`
      : `${parsed.net} EUR net en brut Belgique`;

  const breadcrumbLabel =
    parsed.kind === "brut"
      ? `${parsed.brut} EUR brut (${parsed.situation.label})`
      : `${parsed.net} EUR net (${parsed.situation.label})`;

  const valeurCible = parsed.kind === "brut" ? res.netMensuel : res.brutMensuel;
  const labelCible = parsed.kind === "brut" ? "Net mensuel" : "Brut mensuel";
  const sourceLabel = parsed.kind === "brut" ? `${parsed.brut} EUR brut` : `${parsed.net} EUR net`;

  // Comparaison entre les 3 situations familiales
  const comparaison = SITUATIONS.map((s) => ({
    situation: s,
    res:
      parsed.kind === "brut"
        ? brutVersNetBE(parsed.brut, s.value, 0)
        : netVersBrutBE(parsed.net, s.value, 0),
  }));

  // Liens vers montants proches
  const allMontants = parsed.kind === "brut" ? MONTANTS_BRUT : MONTANTS_NET;
  const idx = allMontants.indexOf(parsed.kind === "brut" ? parsed.brut : parsed.net);
  const proches = allMontants.filter((_, i) => Math.abs(i - idx) <= 2 && i !== idx);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:
          parsed.kind === "brut"
            ? `Combien fait ${parsed.brut} EUR brut en net en Belgique ?`
            : `Combien fait ${parsed.net} EUR net en brut en Belgique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            parsed.kind === "brut"
              ? `En Belgique, un salaire brut de ${parsed.brut} EUR/mois donne environ ${fmt(res.netMensuel)} EUR net pour un ${parsed.situation.label.toLowerCase()}, apres deduction de l'ONSS (13,07 % = ${fmt(res.onssMensuel)} EUR) et du precompte professionnel + additionnels communaux (${fmt(res.precompteMensuel)} EUR).`
              : `En Belgique, pour toucher ${parsed.net} EUR net par mois en tant que ${parsed.situation.label.toLowerCase()}, il faut un salaire brut d'environ ${fmt(res.brutMensuel)} EUR. La difference (${fmt(res.brutMensuel - parsed.net)} EUR) correspond a l'ONSS et au precompte.`,
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
        currentPage={breadcrumbLabel}
        parentPage="Salaire Brut/Net Belgique"
        parentHref="/be/salaire-brut-net"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{titreH1}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul detaille pour un {parsed.situation.label.toLowerCase()} en
        Belgique. Baremes IPP 2026.
      </p>

      <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-100 mb-1">
          {sourceLabel} = {labelCible}
        </p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(valeurCible)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-red-100 mt-2 text-sm">
          Situation : {parsed.situation.label} &middot; Ratio net/brut :{" "}
          {res.tauxGlobal.toFixed(1)} %
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Detail mensuel du calcul
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Brut mensuel</span>
            <span className="font-semibold text-slate-700">
              {fmt(res.brutMensuel)} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">- ONSS (13,07 %)</span>
            <span className="font-semibold text-rose-600">
              -{fmt(res.onssMensuel)} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">
              - Precompte + additionnels
            </span>
            <span className="font-semibold text-rose-600">
              -{fmt(res.precompteMensuel)} EUR
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-100">
            <span className="font-medium text-slate-600">Net mensuel</span>
            <span className="font-bold text-slate-800">
              {fmt(res.netMensuel)} EUR
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par situation familiale
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Situation
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Brut
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Net
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Lien
                </th>
              </tr>
            </thead>
            <tbody>
              {comparaison.map((c) => (
                <tr
                  key={c.situation.slug}
                  className={`border-b border-slate-100 ${
                    c.situation.slug === parsed.situation.slug
                      ? "bg-red-50/40"
                      : ""
                  }`}
                >
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    {c.situation.label}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {fmt(c.res.brutMensuel)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-red-600">
                    {fmt(c.res.netMensuel)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <a
                      href={
                        parsed.kind === "brut"
                          ? `/be/salaire-brut-net/${parsed.brut}-euros-${c.situation.slug}`
                          : `/be/salaire-brut-net/${parsed.net}-euros-net-${c.situation.slug}`
                      }
                      className="text-red-600 hover:underline text-xs font-medium"
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
        Calculateur interactif (ajustez enfants & situation)
      </h2>
      <CalculateurSalaireBE />


      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre ce calcul
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {parsed.kind === "brut" ? (
            <>
              Avec un salaire brut de <strong>{parsed.brut} EUR/mois</strong>{" "}
              en Belgique, un {parsed.situation.label.toLowerCase()} touche
              environ <strong>{fmt(res.netMensuel)} EUR net</strong>, soit{" "}
              <strong>{fmt(res.netAnnuel)} EUR net par an</strong>.
            </>
          ) : (
            <>
              Pour toucher <strong>{parsed.net} EUR net/mois</strong> en
              Belgique en tant que{" "}
              {parsed.situation.label.toLowerCase()}, il faut viser un brut
              d&apos;environ <strong>{fmt(res.brutMensuel)} EUR/mois</strong>,
              soit <strong>{fmt(res.brutAnnuel)} EUR brut annuel</strong>.
            </>
          )}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Le calcul applique : (1) l&apos;ONSS salariale de 13,07 % sur le brut,
          (2) les frais professionnels forfaitaires (30 % plafonnes a 6 070
          EUR/an), (3) le precompte progressif IPP 2026 (4 tranches : 25 % /
          40 % / 45 % / 50 %), (4) la reduction pour quotite exemptee
          ({fmt(res.quotiteExempteeAnnuel)} EUR/an), (5) les additionnels
          communaux (~7,5 % en moyenne).
        </p>
      </section>

      {proches.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-3">
            Autres montants {parsed.kind === "brut" ? "brut" : "net"} ({parsed.situation.label})
          </h3>
          <div className="flex flex-wrap gap-2">
            {proches.map((m) => (
              <a
                key={m}
                href={
                  parsed.kind === "brut"
                    ? `/be/salaire-brut-net/${m}-euros-${parsed.situation.slug}`
                    : `/be/salaire-brut-net/${m}-euros-net-${parsed.situation.slug}`
                }
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
              >
                {m} EUR {parsed.kind === "brut" ? "brut" : "net"}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
