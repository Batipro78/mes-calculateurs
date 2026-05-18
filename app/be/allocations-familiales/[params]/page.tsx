import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurAllocationsBE from "../CalculateurAllocationsBE";
import AdSlot from "../../../components/AdSlot";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  calculerAllocationsBE,
  RegionBE,
} from "../allocationsFamilialesBeCalc";

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
  region: RegionBE;
  nbEnfants: number;
  ageMoyen: number;
} | null {
  const m = slug.match(/^(wallonie|flandre|bruxelles)-(\d+)-enfants-(\d+)-ans$/);
  if (!m) return null;
  const region = m[1] as RegionBE;
  const nbEnfants = parseInt(m[2], 10);
  const ageMoyen = parseInt(m[3], 10);
  if (nbEnfants < 1 || nbEnfants > 4 || ![3, 8, 12, 15].includes(ageMoyen))
    return null;
  return { region, nbEnfants, ageMoyen };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  const regions: RegionBE[] = ["wallonie", "flandre", "bruxelles"];
  const nbEnfantsOptions = [1, 2, 3, 4];
  const ageMoyens = [3, 8, 12, 15];

  for (const region of regions) {
    for (const nbEnfants of nbEnfantsOptions) {
      for (const ageMoyen of ageMoyens) {
        params.push({
          params: `${region}-${nbEnfants}-enfants-${ageMoyen}-ans`,
        });
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

  const { region, nbEnfants, ageMoyen } = parsed;
  const ageEnfants = Array.from({ length: nbEnfants }, () => ageMoyen);
  const resultat = calculerAllocationsBE(region, ageEnfants);

  const regionLabels: Record<RegionBE, string> = {
    wallonie: "Wallonie",
    flandre: "Flandre",
    bruxelles: "Bruxelles",
  };

  return {
    alternates: { canonical: `/be/allocations-familiales/${slug}` },
    title: `Allocations Familiales ${regionLabels[region]} ${nbEnfants} enfants - 2026`,
    description: `Allocations familiales ${regionLabels[region]} pour ${nbEnfants} enfants (${ageMoyen} ans) : ${fmt(resultat.montantMensuel)} EUR/mois, ${fmt(resultat.montantAnnuel)} EUR/an, prime naissance ${fmt(resultat.primeNaissanceTotal)} EUR.`,
    keywords: `allocations familiales ${region}, ${nbEnfants} enfants, ${ageMoyen} ans, Belgique 2026`,
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

  const { region, nbEnfants, ageMoyen } = parsed;
  const ageEnfants = Array.from({ length: nbEnfants }, () => ageMoyen);
  const resultat = calculerAllocationsBE(region, ageEnfants);

  const regionLabels: Record<RegionBE, string> = {
    wallonie: "Wallonie",
    flandre: "Flandre",
    bruxelles: "Bruxelles",
  };

  const regionSources: Record<RegionBE, string> = {
    wallonie: "FAMIWAL",
    flandre: "Groeipakket",
    bruxelles: "Famiris",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien d&apos;allocations familiales pour ${nbEnfants} enfants de ${ageMoyen} ans en ${regionLabels[region]} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En ${regionLabels[region]}, ${nbEnfants} enfant(s) de ${ageMoyen} ans ouvre(nt) droit a ${fmt(resultat.montantMensuel)} EUR par mois d&apos;allocations familiales, soit ${fmt(resultat.montantAnnuel)} EUR par an. Prime de naissance : ${fmt(resultat.primeNaissanceTotal)} EUR au total.`,
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
        currentPage={`${nbEnfants} enfants - ${regionLabels[region]}`}
        parentPage="Allocations Familiales Belgique"
        parentHref="/be/allocations-familiales"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👨‍👩‍👧‍👦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Allocations Familiales {regionLabels[region]} - {nbEnfants} enfant(s)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation pour {nbEnfants} enfant(s) de {ageMoyen} ans en{" "}
        {regionLabels[region]} ({regionSources[region]}).
      </p>

      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-cyan-200/50 mb-8">
        <p className="text-cyan-100 mb-1">Allocation mensuelle</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat.montantMensuel)}{" "}
          <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-cyan-100 mt-2 text-sm">
          {nbEnfants} enfant(s) de {ageMoyen} ans en {regionLabels[region]}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Detail des allocations
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Montant mensuel</span>
              <span className="text-lg font-bold text-cyan-600">
                {fmt(resultat.montantMensuel)} EUR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Montant annuel</span>
              <span className="text-lg font-bold text-cyan-600">
                {fmt(resultat.montantAnnuel)} EUR
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                Montant par enfant
              </span>
              <span className="text-sm font-bold text-slate-800">
                {fmt(resultat.montantMensuel / nbEnfants)} EUR/mois
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Prime de naissance
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Par enfant</span>
              <span className="text-base font-bold text-blue-600">
                {fmt(resultat.primeNaissance)} EUR
              </span>
            </div>
            <div className="h-px bg-blue-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                Total ({nbEnfants} enfant(s))
              </span>
              <span className="text-lg font-extrabold text-blue-600">
                {fmt(resultat.primeNaissanceTotal)} EUR
              </span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculateurAllocationsBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {nbEnfants} enfant(s) en {regionLabels[region]} - Detail complet
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{nbEnfants} enfant(s) de {ageMoyen} ans</strong> en{" "}
          <strong>{regionLabels[region]}</strong>, les allocations familiales
          s&apos;elevent a <strong>{fmt(resultat.montantMensuel)} EUR par mois</strong>,
          soit <strong>{fmt(resultat.montantAnnuel)} EUR par an</strong>. La{" "}
          <strong>prime de naissance</strong> est de{" "}
          <strong>{fmt(resultat.primeNaissanceTotal)} EUR</strong> au total (
          {fmt(resultat.primeNaissance)} EUR par enfant).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Montants par enfant
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Enfant
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Age
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Montant mensuel
                </th>
              </tr>
            </thead>
            <tbody>
              {resultat.ageEnfants.map((age, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">
                    Enfant {i + 1}
                  </td>
                  <td className="py-2.5 px-2 text-slate-600">{age} ans</td>
                  <td className="py-2.5 px-2 text-right font-bold text-cyan-600">
                    {fmt(resultat.montantParEnfant[i])} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          A propos de {regionLabels[region]}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {region === "wallonie"
            ? "La Wallonie verse les allocations familiales via FAMIWAL. Le systeme est base sur le rang de naissance : les deux premiers enfants ouvrent droit au meme montant, et a partir du 3e enfant le montant augmente de facon significative pour favoriser les familles nombreuses."
            : region === "flandre"
              ? "La Flandre verse les allocations familiales via Groeipakket (le paquet de croissance). Le systeme est base sur l&apos;age de l&apos;enfant : le montant augmente progressivement avec l&apos;age pour couvrir les frais croissants de l&apos;education et des loisirs. Les adolescents recoivent le montant le plus eleve."
              : "Bruxelles verse les allocations familiales via Famiris. Le systeme est uniforme : tous les enfants ouvrent droit au meme montant quel que soit le rang ou l&apos;age, ce qui reflete une approche plus egalitaire."}
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres simulations {regionLabels[region]}
        </h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            n !== nbEnfants && (
              <a
                key={n}
                href={`/be/allocations-familiales/${region}-${n}-enfants-${ageMoyen}-ans`}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all"
              >
                {n} enfant{n > 1 ? "s" : ""}
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
