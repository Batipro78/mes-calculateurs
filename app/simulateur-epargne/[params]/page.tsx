import type { Metadata } from "next";
import SimulateurEpargne from "../SimulateurEpargne";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const CAPITAUX = [1000, 2000, 5000, 10000, 15000, 20000, 30000, 50000, 100000];

const PLACEMENTS_MAP: Record<string, { label: string; taux: number; desc: string }> = {
  "livret-a": { label: "Livret A", taux: 2.4, desc: "Net d'impot" },
  "ldds": { label: "LDDS", taux: 2.4, desc: "Net d'impot" },
  "lep": { label: "LEP", taux: 3.5, desc: "Sous conditions de revenus" },
  "assurance-vie": { label: "Assurance-vie (fonds euro)", taux: 2.5, desc: "Rendement moyen 2025" },
  "pel": { label: "PEL (depuis 2024)", taux: 2.25, desc: "Taux fixe a l'ouverture" },
};

const PLACEMENT_SLUGS = Object.keys(PLACEMENTS_MAP);

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function simulerEpargne(capital: number, taux: number, dureeAnnees: number, mensuel: number = 0) {
  const tauxMensuel = taux / 100 / 12;
  const nbMois = dureeAnnees * 12;
  let capitalFinal = capital;
  let totalVersements = capital;
  const evolutionAnnuelle: { annee: number; capital: number; versements: number; interets: number }[] = [];

  for (let m = 1; m <= nbMois; m++) {
    capitalFinal = capitalFinal * (1 + tauxMensuel) + mensuel;
    totalVersements += mensuel;

    if (m % 12 === 0) {
      evolutionAnnuelle.push({
        annee: m / 12,
        capital: capitalFinal,
        versements: totalVersements,
        interets: capitalFinal - totalVersements,
      });
    }
  }

  return {
    capitalFinal,
    totalVersements,
    totalInterets: capitalFinal - totalVersements,
    evolutionAnnuelle,
  };
}

function parseSlug(slug: string): { capital: number; placement: string } | null {
  const match = slug.match(/^(\d+)-euros-(.+)$/);
  if (!match) return null;
  return { capital: parseInt(match[1]), placement: match[2] };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const c of CAPITAUX) {
    for (const p of PLACEMENT_SLUGS) {
      params.push({ params: `${c}-euros-${p}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { capital, placement } = parsed;
  const placementInfo = PLACEMENTS_MAP[placement];
  if (!placementInfo) return {};

  const durees = [1, 5, 10];
  const sim10 = simulerEpargne(capital, placementInfo.taux, 10);

  return {
    alternates: { canonical: `/simulateur-epargne/${slug}` },
    title: `${fmtInt(capital)} EUR sur ${placementInfo.label} - Combien ca rapporte ? (2026)`,
    description: `Combien rapportent ${fmtInt(capital)} EUR places sur un ${placementInfo.label} a ${placementInfo.taux}% ? Apres 10 ans : ${fmt(sim10.capitalFinal)} EUR (+${fmt(sim10.totalInterets)} EUR d'interets). Simulation 2026.`,
    keywords: `${fmtInt(capital)} euros ${placementInfo.label}, combien rapporte ${fmtInt(capital)} euros, ${placementInfo.label} ${fmtInt(capital)} euros, placement ${fmtInt(capital)} euros`,
    openGraph: {
      title: `${fmtInt(capital)} EUR sur ${placementInfo.label} = ${fmt(sim10.capitalFinal)} EUR apres 10 ans`,
      description: `Simulation : ${fmtInt(capital)} EUR places sur un ${placementInfo.label} a ${placementInfo.taux}% rapportent ${fmt(sim10.totalInterets)} EUR d'interets en 10 ans.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { capital, placement } = parsed;
  if (!CAPITAUX.includes(capital) || !PLACEMENTS_MAP[placement]) notFound();

  const placementInfo = PLACEMENTS_MAP[placement];
  const taux = placementInfo.taux;

  // Simulations pour differentes durees
  const DUREES = [1, 2, 3, 5, 8, 10, 15, 20];
  const simParDuree = DUREES.map((d) => {
    const sim = simulerEpargne(capital, taux, d);
    return { duree: d, ...sim };
  });

  // Simulation principale (10 ans)
  const sim10 = simulerEpargne(capital, taux, 10);

  // Comparaison par placement pour ce capital
  const comparaisonPlacements = PLACEMENT_SLUGS.map((pSlug) => {
    const p = PLACEMENTS_MAP[pSlug];
    const sim = simulerEpargne(capital, p.taux, 10);
    return { slug: pSlug, label: p.label, taux: p.taux, capitalFinal: sim.capitalFinal, interets: sim.totalInterets, isCurrent: pSlug === placement };
  });

  // Comparaison par capital pour ce placement
  const comparaisonCapitaux = CAPITAUX.map((c) => {
    const sim = simulerEpargne(c, taux, 10);
    return { capital: c, capitalFinal: sim.capitalFinal, interets: sim.totalInterets, isCurrent: c === capital };
  });

  const partInterets = sim10.capitalFinal > 0 ? (sim10.totalInterets / sim10.capitalFinal) * 100 : 0;
  const autresCapitaux = CAPITAUX.filter((c) => c !== capital);
  const autresPlacements = PLACEMENT_SLUGS.filter((p) => p !== placement);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien rapportent ${fmtInt(capital)} EUR sur un ${placementInfo.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${fmtInt(capital)} EUR places sur un ${placementInfo.label} au taux de ${taux}% rapportent ${fmt(sim10.totalInterets)} EUR d'interets en 10 ans (sans versement supplementaire). Le capital atteint ${fmt(sim10.capitalFinal)} EUR. Taux en vigueur en 2026.`,
        },
      },
      {
        "@type": "Question",
        name: `${fmtInt(capital)} EUR sur un ${placementInfo.label} pendant 5 ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Apres 5 ans, ${fmtInt(capital)} EUR places sur un ${placementInfo.label} a ${taux}% deviennent ${fmt(simParDuree.find((s) => s.duree === 5)?.capitalFinal || 0)} EUR, soit ${fmt(simParDuree.find((s) => s.duree === 5)?.totalInterets || 0)} EUR d'interets gagnes.`,
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
        currentPage={`${fmtInt(capital)} EUR - ${placementInfo.label}`}
        parentPage="Simulateur Epargne"
        parentHref="/simulateur-epargne"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {fmtInt(capital)} EUR sur {placementInfo.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Combien rapportent {fmtInt(capital)} EUR places sur un {placementInfo.label} a {taux}% ? Simulation 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl p-8 shadow-lg shadow-emerald-200/50 mb-8">
        <p className="text-emerald-200 mb-1">Capital apres 10 ans ({placementInfo.label} a {taux}%)</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(sim10.capitalFinal)} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-emerald-200 mt-2">+{fmt(sim10.totalInterets)} EUR d&apos;interets gagnes</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-emerald-200">Capital initial</p>
            <p className="font-semibold">{fmtInt(capital)} EUR</p>
          </div>
          <div>
            <p className="text-emerald-200">Taux</p>
            <p className="font-semibold">{taux}% / an</p>
          </div>
          <div>
            <p className="text-emerald-200">Rendement</p>
            <p className="font-semibold">+{fmt(partInterets)}%</p>
          </div>
        </div>
      </div>

      {/* Cartes detail */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Apres 1 an</p>
          <p className="text-2xl font-extrabold text-emerald-600">+{fmt(simParDuree[0].totalInterets)} EUR</p>
          <p className="text-xs text-slate-400 mt-1">soit {fmt(simParDuree[0].totalInterets / 12)} EUR/mois</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Apres 5 ans</p>
          <p className="text-2xl font-extrabold text-emerald-600">+{fmt(simParDuree.find((s) => s.duree === 5)?.totalInterets || 0)} EUR</p>
          <p className="text-xs text-slate-400 mt-1">Interets composes</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Apres 20 ans</p>
          <p className="text-2xl font-extrabold text-emerald-600">+{fmt(simParDuree.find((s) => s.duree === 20)?.totalInterets || 0)} EUR</p>
          <p className="text-xs text-slate-400 mt-1">Interets composes</p>
        </div>
      </div>

      {/* Barre visuelle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-8">
        <p className="text-xs font-medium text-slate-400 mb-3">Repartition apres 10 ans</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div
            className="bg-emerald-200"
            style={{ width: `${100 - partInterets}%` }}
          />
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-500"
            style={{ width: `${partInterets}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-slate-500 font-medium">Capital : {fmtInt(capital)} EUR ({fmt(100 - partInterets)}%)</span>
          <span className="text-emerald-600 font-medium">Interets : {fmt(sim10.totalInterets)} EUR ({fmt(partInterets)}%)</span>
        </div>
      </div>

      {/* Evolution par duree */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Evolution de {fmtInt(capital)} EUR sur {placementInfo.label} ({taux}%)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Capital final</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Interets gagnes</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Rendement</th>
              </tr>
            </thead>
            <tbody>
              {simParDuree.map((row) => (
                <tr key={row.duree} className={`border-b border-slate-100 ${row.duree === 10 ? "bg-emerald-50/50" : ""}`}>
                  <td className="py-3 px-2 font-medium text-slate-700">{row.duree} an{row.duree > 1 ? "s" : ""}</td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">{fmt(row.capitalFinal)} EUR</td>
                  <td className="py-3 px-2 text-right font-bold text-emerald-600">+{fmt(row.totalInterets)} EUR</td>
                  <td className="py-3 px-2 text-right text-slate-600">{capital > 0 ? fmt((row.totalInterets / capital) * 100) : "0"}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par placement */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(capital)} EUR : comparaison des placements (10 ans)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Placement</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Capital final</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Interets</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonPlacements.map((row) => (
                <tr key={row.slug} className={`border-b border-slate-100 ${row.isCurrent ? "bg-emerald-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-emerald-600">{row.label}</span>
                    ) : (
                      <a href={`/simulateur-epargne/${capital}-euros-${row.slug}`} className="text-slate-700 hover:text-emerald-600 transition-colors">
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.taux}%</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-emerald-600" : "text-slate-700"}`}>
                    {fmt(row.capitalFinal)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-emerald-600">+{fmt(row.interets)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par capital */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {placementInfo.label} : comparaison par capital (10 ans)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Capital</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Capital final</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Interets</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonCapitaux.map((row) => (
                <tr key={row.capital} className={`border-b border-slate-100 ${row.isCurrent ? "bg-emerald-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-emerald-600">{fmtInt(row.capital)} EUR</span>
                    ) : (
                      <a href={`/simulateur-epargne/${row.capital}-euros-${placement}`} className="text-slate-700 hover:text-emerald-600 transition-colors">
                        {fmtInt(row.capital)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-emerald-600" : "text-slate-700"}`}>
                    {fmt(row.capitalFinal)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-emerald-600">+{fmt(row.interets)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Simulateur interactif
      </h2>
      <SimulateurEpargne />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte explicatif */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Placer {fmtInt(capital)} EUR sur un {placementInfo.label} en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En placant <strong>{fmtInt(capital)} EUR</strong> sur un <strong>{placementInfo.label}</strong> au
          taux de <strong>{taux}%</strong> (taux en vigueur en 2026), vous gagnez{" "}
          <strong>{fmt(simParDuree[0].totalInterets)} EUR d&apos;interets la premiere annee</strong>.
          Apres 10 ans, grace aux interets composes, votre capital atteint{" "}
          <strong>{fmt(sim10.capitalFinal)} EUR</strong>, soit{" "}
          <strong>{fmt(sim10.totalInterets)} EUR d&apos;interets cumules</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {placementInfo.desc}. Les interets sont calcules par quinzaine et capitalises
          chaque annee (interets composes), ce qui signifie que vos interets generent
          eux-memes des interets.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Conseils</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Ouvrez un LEP si vous y etes eligible (taux superieur au Livret A)</li>
          <li>Combinez plusieurs livrets pour optimiser votre epargne</li>
          <li>Les interets composes sont plus puissants sur le long terme</li>
          <li>Le plafond du Livret A est de 22 950 EUR (hors interets)</li>
        </ul>
      </section>

      {/* Liens vers autres simulations */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {autresPlacements.map((p) => (
            <a
              key={p}
              href={`/simulateur-epargne/${capital}-euros-${p}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
            >
              {fmtInt(capital)} EUR - {PLACEMENTS_MAP[p].label}
            </a>
          ))}
          {autresCapitaux.slice(0, 6).map((c) => (
            <a
              key={c}
              href={`/simulateur-epargne/${c}-euros-${placement}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
            >
              {fmtInt(c)} EUR - {placementInfo.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-epargne" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
