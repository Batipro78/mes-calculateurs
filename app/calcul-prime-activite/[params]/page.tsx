import type { Metadata } from "next";
import CalculateurPrimeActivite from "../CalculateurPrimeActivite";
import { calcPrimeActivite } from "../calcPrimeActivite";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const REVENUS = [800, 1000, 1200, 1400, 1600, 1800, 2000];
const SITUATIONS = ["seul", "couple"];
const ENFANTS_OPTIONS = [0, 1, 2, 3];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function situationLabel(s: string, enfants: number): string {
  const base = s === "couple" ? "couple" : "personne seule";
  if (enfants === 0) return base;
  return `${base}, ${enfants} enfant${enfants > 1 ? "s" : ""}`;
}

function parseSlug(slug: string): { revenu: number; situation: string; enfants: number } | null {
  // Format: seul-1200-euros ou couple-2-enfants-1400-euros
  const matchSeul = slug.match(/^seul-(\d+)-euros$/);
  if (matchSeul) return { revenu: parseInt(matchSeul[1]), situation: "seul", enfants: 0 };

  const matchCouple = slug.match(/^couple-(\d+)-euros$/);
  if (matchCouple) return { revenu: parseInt(matchCouple[1]), situation: "couple", enfants: 0 };

  const matchSeulEnfants = slug.match(/^seul-(\d+)-enfants?-(\d+)-euros$/);
  if (matchSeulEnfants) return { revenu: parseInt(matchSeulEnfants[2]), situation: "seul", enfants: parseInt(matchSeulEnfants[1]) };

  const matchCoupleEnfants = slug.match(/^couple-(\d+)-enfants?-(\d+)-euros$/);
  if (matchCoupleEnfants) return { revenu: parseInt(matchCoupleEnfants[2]), situation: "couple", enfants: parseInt(matchCoupleEnfants[1]) };

  return null;
}

function makeSlug(situation: string, enfants: number, revenu: number): string {
  if (enfants === 0) return `${situation}-${revenu}-euros`;
  return `${situation}-${enfants}-enfant${enfants > 1 ? "s" : ""}-${revenu}-euros`;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const sit of SITUATIONS) {
    for (const enf of ENFANTS_OPTIONS) {
      for (const rev of REVENUS) {
        params.push({ params: makeSlug(sit, enf, rev) });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { revenu, situation, enfants } = parsed;
  const conjoint = situation === "couple" ? Math.round(revenu * 0.8) : 0;
  const r = calcPrimeActivite(situation, enfants, false, revenu, conjoint, 0, true);

  const sitLabel = situationLabel(situation, enfants);

  return {
    title: `Prime d'activite ${sitLabel} a ${fmtInt(revenu)} EUR = ${r.eligible ? fmt(r.primeActivite) : "0"} EUR/mois`,
    description: `Simulation prime d'activite pour ${sitLabel} avec ${fmtInt(revenu)} EUR net/mois : ${r.eligible ? `${fmt(r.primeActivite)} EUR/mois estimes` : "non eligible"}. Forfaitaire : ${fmt(r.montantForfaitaire)} EUR. Bonification : ${fmt(r.bonification)} EUR.`,
    keywords: `prime activite ${fmtInt(revenu)} euros, prime activite ${situation}, calcul prime activite ${enfants} enfant${enfants > 1 ? "s" : ""}`,
    openGraph: {
      title: `${sitLabel}, ${fmtInt(revenu)} EUR → ${r.eligible ? fmt(r.primeActivite) : "0"} EUR de prime d'activite`,
      description: `Forfaitaire : ${fmt(r.montantForfaitaire)} EUR. Bonification : ${fmt(r.bonification)} EUR. Forfait logement : ${fmt(r.forfaitLogement)} EUR.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { revenu, situation, enfants } = parsed;
  const conjoint = situation === "couple" ? Math.round(revenu * 0.8) : 0;
  const r = calcPrimeActivite(situation, enfants, false, revenu, conjoint, 0, true);
  const sitLabel = situationLabel(situation, enfants);

  // Comparaison par revenus
  const comparaisonRevenus = REVENUS.map((rev) => {
    const conj = situation === "couple" ? Math.round(rev * 0.8) : 0;
    const sim = calcPrimeActivite(situation, enfants, false, rev, conj, 0, true);
    return { revenu: rev, prime: sim.primeActivite, eligible: sim.eligible };
  });

  // Comparaison par situation
  const comparaisonSituations = [
    { sit: "seul", enf: 0, label: "Seul(e)" },
    { sit: "seul", enf: 1, label: "Seul + 1 enfant" },
    { sit: "seul", enf: 2, label: "Seul + 2 enfants" },
    { sit: "couple", enf: 0, label: "Couple" },
    { sit: "couple", enf: 1, label: "Couple + 1 enfant" },
    { sit: "couple", enf: 2, label: "Couple + 2 enfants" },
  ].map((s) => {
    const conj = s.sit === "couple" ? Math.round(revenu * 0.8) : 0;
    const sim = calcPrimeActivite(s.sit, s.enf, false, revenu, conj, 0, true);
    return { ...s, prime: sim.primeActivite, eligible: sim.eligible };
  });

  // Liens vers autres pages
  const autresPages = REVENUS.filter((rev) => rev !== revenu)
    .slice(0, 4)
    .map((rev) => ({
      slug: makeSlug(situation, enfants, rev),
      label: `${fmtInt(rev)} EUR`,
    }));

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
                name: `Quelle prime d'activite pour ${sitLabel} a ${fmtInt(revenu)} EUR ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: r.eligible
                    ? `Pour ${sitLabel} avec ${fmtInt(revenu)} EUR net/mois, la prime d'activite estimee est de ${fmt(r.primeActivite)} EUR/mois, soit ${fmt(r.primeActivite * 12)} EUR/an.`
                    : `Pour ${sitLabel} avec ${fmtInt(revenu)} EUR net/mois : ${r.raisonIneligible}.`,
                },
              },
              {
                "@type": "Question",
                name: `Quel est le detail du calcul a ${fmtInt(revenu)} EUR ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Forfaitaire : ${fmt(r.montantForfaitaire)} EUR + 61% revenus : ${fmt(r.partRevenus)} EUR + Bonification : ${fmt(r.bonification)} EUR - Ressources : ${fmt(r.ressourcesFoyer)} EUR - Forfait logement : ${fmt(r.forfaitLogement)} EUR = ${fmt(r.primeActivite)} EUR.`,
                },
              },
            ],
          }),
        }}
      />

      <Breadcrumb currentPage={`Prime d'Activite — ${sitLabel}, ${fmtInt(revenu)} EUR`} />

      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
        Prime d&apos;activite : {sitLabel} a {fmtInt(revenu)} EUR/mois
      </h1>
      <p className="text-slate-500 mb-8">
        Estimation detaillee de la prime d&apos;activite pour un foyer {sitLabel} avec un revenu net de {fmtInt(revenu)} EUR par mois.
      </p>

      {/* Resultat principal */}
      <div className={`rounded-2xl p-8 text-center mb-8 ${r.eligible ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-slate-400 to-slate-500"} text-white`}>
        <p className="text-lg font-medium opacity-90 mb-1">Prime d&apos;activite estimee</p>
        <p className="text-5xl font-black mb-2">
          {r.eligible ? fmt(r.primeActivite) : "0,00"} <span className="text-2xl">EUR/mois</span>
        </p>
        {r.eligible ? (
          <p className="opacity-80">soit {fmt(r.primeActivite * 12)} EUR/an</p>
        ) : (
          <p className="opacity-80">{r.raisonIneligible}</p>
        )}
      </div>

      {/* Detail */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Montant forfaitaire ({sitLabel})</span>
            <span className="font-bold">+ {fmt(r.montantForfaitaire)} EUR</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">61% des revenus pro</span>
            <span className="font-bold">+ {fmt(r.partRevenus)} EUR</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Bonification individuelle</span>
            <span className="font-bold">+ {fmt(r.bonification)} EUR</span>
          </div>
          {situation === "couple" && (
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Bonification conjoint</span>
              <span className="font-bold">+ {fmt(r.bonificationConjoint)} EUR</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Ressources du foyer</span>
            <span className="font-bold text-red-600">- {fmt(r.ressourcesFoyer)} EUR</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Forfait logement</span>
            <span className="font-bold text-red-600">- {fmt(r.forfaitLogement)} EUR</span>
          </div>
          <div className="flex justify-between py-2 bg-emerald-50 -mx-6 px-6 rounded-b-xl">
            <span className="font-bold text-emerald-800">Prime nette</span>
            <span className="text-xl font-black text-emerald-700">{fmt(r.primeActivite)} EUR</span>
          </div>
        </div>
      </div>

      {/* Comparaison revenus */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comparaison par revenu ({situation === "couple" ? "couple" : "seul"}{enfants > 0 ? `, ${enfants} enfant${enfants > 1 ? "s" : ""}` : ""})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-slate-500">Revenu net</th>
                <th className="text-right py-2 text-slate-500">Prime estimee</th>
                <th className="text-right py-2 text-slate-500">Par an</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonRevenus.map((c) => (
                <tr key={c.revenu} className={`border-b border-slate-50 ${c.revenu === revenu ? "bg-emerald-50 font-bold" : ""}`}>
                  <td className="py-2">
                    <a href={`/calcul-prime-activite/${makeSlug(situation, enfants, c.revenu)}`} className="text-emerald-600 hover:underline">
                      {fmtInt(c.revenu)} EUR
                    </a>
                  </td>
                  <td className="py-2 text-right font-bold text-emerald-600">
                    {c.eligible ? `${fmt(c.prime)} EUR` : "Non eligible"}
                  </td>
                  <td className="py-2 text-right text-slate-500">
                    {c.eligible ? `${fmtInt(c.prime * 12)} EUR` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison situations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comparaison par situation a {fmtInt(revenu)} EUR
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-slate-500">Situation</th>
                <th className="text-right py-2 text-slate-500">Prime estimee</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonSituations.map((c) => (
                <tr key={c.label} className={`border-b border-slate-50 ${c.sit === situation && c.enf === enfants ? "bg-emerald-50 font-bold" : ""}`}>
                  <td className="py-2">
                    <a href={`/calcul-prime-activite/${makeSlug(c.sit, c.enf, revenu)}`} className="text-emerald-600 hover:underline">
                      {c.label}
                    </a>
                  </td>
                  <td className="py-2 text-right font-bold text-emerald-600">
                    {c.eligible ? `${fmt(c.prime)} EUR` : "Non eligible"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Simulateur interactif */}
      <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-8">Simulateur interactif</h2>
      <CalculateurPrimeActivite />

      {/* Liens internes */}
      <div className="mt-8 bg-slate-50 rounded-xl p-6">
        <h3 className="font-bold text-slate-800 mb-3">Autres simulations</h3>
        <div className="flex flex-wrap gap-2">
          {autresPages.map((p) => (
            <a
              key={p.slug}
              href={`/calcul-prime-activite/${p.slug}`}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>

      <RelatedCalculators currentSlug="/calcul-prime-activite" />
    </div>
  );
}
