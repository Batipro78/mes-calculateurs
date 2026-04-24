import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurSalaireAlternant from "../CalculateurSalaireAlternant";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  calcSalaireAlternant,
  SMIC_BRUT,
  GRILLE_APPRENTISSAGE,
  GRILLE_PRO,
  LABELS_TRANCHE_APPRENTISSAGE,
  LABELS_TRANCHE_PRO,
  TRANCHES_AGE_APPRENTISSAGE,
  TRANCHES_AGE_PRO,
  getTrancheAge,
  type TypeContrat,
  type NiveauQualification,
} from "../calcSalaireAlternant";

// Ages pour les pages dynamiques
const AGES_APPRENTISSAGE = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const ANNEES = [1, 2, 3];
const AGES_PRO = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const NIVEAUX: NiveauQualification[] = ["infra-bac", "bac-plus"];
const NIVEAU_LABELS: Record<string, string> = { "infra-bac": "sans bac", "bac-plus": "bac ou plus" };
const NIVEAU_LABELS_COURT: Record<string, string> = { "infra-bac": "niveau-infra-bac", "bac-plus": "niveau-bac" };

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

type ParsedSlug =
  | { type: "apprentissage"; age: number; annee: number }
  | { type: "professionnalisation"; age: number; niveau: NiveauQualification };

function parseSlug(slug: string): ParsedSlug | null {
  // apprentissage-20-ans-2e-annee
  const matchApp = slug.match(/^apprentissage-(\d+)-ans-(\d)e-annee$/);
  if (matchApp) {
    return { type: "apprentissage", age: parseInt(matchApp[1]), annee: parseInt(matchApp[2]) };
  }
  // professionnalisation-22-ans-niveau-bac ou professionnalisation-22-ans-niveau-infra-bac
  const matchPro = slug.match(/^professionnalisation-(\d+)-ans-niveau-(infra-bac|bac)$/);
  if (matchPro) {
    return {
      type: "professionnalisation",
      age: parseInt(matchPro[1]),
      niveau: matchPro[2] === "bac" ? "bac-plus" : "infra-bac",
    };
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  // Apprentissage : ages x annees
  for (const age of AGES_APPRENTISSAGE) {
    for (const annee of ANNEES) {
      params.push({ params: `apprentissage-${age}-ans-${annee}e-annee` });
    }
  }
  // Professionnalisation : ages x niveaux
  for (const age of AGES_PRO) {
    for (const niveau of NIVEAUX) {
      params.push({ params: `professionnalisation-${age}-ans-${NIVEAU_LABELS_COURT[niveau]}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "apprentissage") {
    const r = calcSalaireAlternant("apprentissage", parsed.age, parsed.annee);
    const anneeLabel = parsed.annee === 1 ? "1ere" : `${parsed.annee}eme`;
    return {
    alternates: { canonical: `/simulateur-salaire-alternant/${slug}` },
      title: `Salaire apprenti ${parsed.age} ans en ${anneeLabel} annee 2026 = ${fmt(r.brut)} EUR brut`,
      description: `Salaire d'un apprenti de ${parsed.age} ans en ${anneeLabel} annee : ${fmt(r.brut)} EUR brut/mois (${r.pourcentageSmic}% du SMIC). Net estime : ${fmt(r.net)} EUR. Grille officielle apprentissage 2026.`,
      keywords: `salaire apprenti ${parsed.age} ans, apprentissage ${anneeLabel} annee salaire, remuneration apprenti 2026, SMIC apprenti ${parsed.age} ans`,
      openGraph: {
        title: `Apprenti ${parsed.age} ans, ${anneeLabel} annee → ${fmt(r.brut)} EUR brut/mois`,
        description: `${r.pourcentageSmic}% du SMIC. Net estime : ${fmt(r.net)} EUR/mois. Brut annuel : ${fmtInt(r.brutAnnuel)} EUR.`,
      },
    };
  } else {
    const r = calcSalaireAlternant("professionnalisation", parsed.age, 1, parsed.niveau);
    const niveauLabel = NIVEAU_LABELS[parsed.niveau];
    return {
    alternates: { canonical: `/simulateur-salaire-alternant/${slug}` },
      title: `Salaire pro ${parsed.age} ans ${niveauLabel} 2026 = ${fmt(r.brut)} EUR brut`,
      description: `Salaire en contrat de professionnalisation a ${parsed.age} ans (${niveauLabel}) : ${fmt(r.brut)} EUR brut/mois (${r.pourcentageSmic}% du SMIC). Net estime : ${fmt(r.net)} EUR. Grille officielle 2026.`,
      keywords: `salaire professionnalisation ${parsed.age} ans, contrat pro ${niveauLabel} salaire, remuneration professionnalisation 2026`,
      openGraph: {
        title: `Pro ${parsed.age} ans, ${niveauLabel} → ${fmt(r.brut)} EUR brut/mois`,
        description: `${r.pourcentageSmic}% du SMIC. Net estime : ${fmt(r.net)} EUR/mois. Brut annuel : ${fmtInt(r.brutAnnuel)} EUR.`,
      },
    };
  }
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  // Validation
  if (parsed.type === "apprentissage") {
    if (!AGES_APPRENTISSAGE.includes(parsed.age) || !ANNEES.includes(parsed.annee)) notFound();
  } else {
    if (!AGES_PRO.includes(parsed.age) || !NIVEAUX.includes(parsed.niveau)) notFound();
  }

  const r = parsed.type === "apprentissage"
    ? calcSalaireAlternant("apprentissage", parsed.age, parsed.annee)
    : calcSalaireAlternant("professionnalisation", parsed.age, 1, parsed.niveau);

  const anneeLabel = parsed.type === "apprentissage"
    ? (parsed.annee === 1 ? "1ere" : `${parsed.annee}eme`)
    : "";
  const niveauLabel = parsed.type === "professionnalisation" ? NIVEAU_LABELS[parsed.niveau] : "";

  const pageTitle = parsed.type === "apprentissage"
    ? `Salaire apprenti ${parsed.age} ans, ${anneeLabel} annee`
    : `Salaire pro ${parsed.age} ans, ${niveauLabel}`;

  // Comparaison par age
  const ages = parsed.type === "apprentissage" ? AGES_APPRENTISSAGE : AGES_PRO;
  const comparaisonAge = ages.map((a) => {
    const res = parsed.type === "apprentissage"
      ? calcSalaireAlternant("apprentissage", a, (parsed as { annee: number }).annee)
      : calcSalaireAlternant("professionnalisation", a, 1, (parsed as { niveau: NiveauQualification }).niveau);
    return { age: a, brut: res.brut, net: res.net, pct: res.pourcentageSmic, tranche: res.labelTranche, isCurrent: a === parsed.age };
  });

  // Comparaison par annee/niveau
  let comparaisonSecondaire: { label: string; brut: number; net: number; pct: number; isCurrent: boolean; slug: string }[] = [];
  if (parsed.type === "apprentissage") {
    comparaisonSecondaire = ANNEES.map((a) => {
      const res = calcSalaireAlternant("apprentissage", parsed.age, a);
      return {
        label: `${a === 1 ? "1ere" : `${a}eme`} annee`,
        brut: res.brut, net: res.net, pct: res.pourcentageSmic,
        isCurrent: a === parsed.annee,
        slug: `apprentissage-${parsed.age}-ans-${a}e-annee`,
      };
    });
  } else {
    comparaisonSecondaire = NIVEAUX.map((n) => {
      const res = calcSalaireAlternant("professionnalisation", parsed.age, 1, n);
      return {
        label: n === "infra-bac" ? "Sans bac" : "Bac pro ou +",
        brut: res.brut, net: res.net, pct: res.pourcentageSmic,
        isCurrent: n === parsed.niveau,
        slug: `professionnalisation-${parsed.age}-ans-${NIVEAU_LABELS_COURT[n]}`,
      };
    });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: parsed.type === "apprentissage"
          ? `Combien gagne un apprenti de ${parsed.age} ans en ${anneeLabel} annee ?`
          : `Combien gagne un alternant de ${parsed.age} ans en professionnalisation (${niveauLabel}) ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le salaire brut est de ${fmt(r.brut)} EUR/mois (${r.pourcentageSmic}% du SMIC). Le salaire net estime est de ${fmt(r.net)} EUR/mois. Sur un an, cela represente ${fmtInt(r.brutAnnuel)} EUR brut.`,
        },
      },
      {
        "@type": "Question",
        name: `Ce salaire est-il net ou brut ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: r.cotisations > 0
            ? `Le montant de ${fmt(r.brut)} EUR est le salaire brut. Apres deduction des cotisations (${fmt(r.cotisations)} EUR/mois), le net estime est de ${fmt(r.net)} EUR/mois. Les cotisations s'appliquent car le salaire depasse 50% du SMIC.`
            : `Le montant de ${fmt(r.brut)} EUR est le salaire brut, mais comme il est inferieur ou egal a 50% du SMIC, le brut est egal au net : aucune cotisation n'est prelevee.`,
        },
      },
    ],
  };

  // Jauge SMIC
  const pourcentageJauge = Math.min((r.brut / SMIC_BRUT) * 100, 100);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={pageTitle}
        parentPage="Simulateur Salaire Alternant"
        parentHref="/simulateur-salaire-alternant"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {pageTitle}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {parsed.type === "apprentissage"
          ? `Salaire en contrat d'apprentissage a ${parsed.age} ans, ${anneeLabel} annee — bareme 2026.`
          : `Salaire en contrat de professionnalisation a ${parsed.age} ans, ${niveauLabel} — bareme 2026.`}
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Salaire brut mensuel</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(r.brut)} EUR</p>
        <p className="text-lg font-medium mt-1">{r.pourcentageSmic}% du SMIC</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Net estime</p>
            <p className="font-semibold">{fmt(r.net)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Brut annuel</p>
            <p className="font-semibold">{fmtInt(r.brutAnnuel)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Net annuel</p>
            <p className="font-semibold">{fmtInt(r.netAnnuel)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Cotisations</p>
            <p className="font-semibold">{r.cotisations > 0 ? `${fmt(r.cotisations)} EUR` : "0 EUR"}</p>
          </div>
        </div>
      </div>

      {/* Jauge SMIC */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <p className="text-sm font-medium text-slate-500 mb-3">Position par rapport au SMIC (1 823 EUR brut)</p>
        <div className="relative h-5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            style={{ width: `${pourcentageJauge}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>0 EUR</span>
          <span className="font-bold text-indigo-600">{r.pourcentageSmic}%</span>
          <span>{fmtInt(SMIC_BRUT)} EUR</span>
        </div>
      </div>

      {/* Comparaison par age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Salaire selon l&apos;age ({parsed.type === "apprentissage" ? `${anneeLabel} annee` : niveauLabel})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Tranche</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">% SMIC</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Brut</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Net estime</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAge.map((row) => {
                const linkSlug = parsed.type === "apprentissage"
                  ? `apprentissage-${row.age}-ans-${(parsed as { annee: number }).annee}e-annee`
                  : `professionnalisation-${row.age}-ans-${NIVEAU_LABELS_COURT[(parsed as { niveau: NiveauQualification }).niveau]}`;
                return (
                  <tr key={row.age} className={`border-b border-slate-100 ${row.isCurrent ? "bg-indigo-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {row.isCurrent ? (
                        <span className="font-bold text-indigo-600">{row.age} ans</span>
                      ) : (
                        <a href={`/simulateur-salaire-alternant/${linkSlug}`} className="text-slate-700 hover:text-indigo-600 transition-colors">
                          {row.age} ans
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-xs ${row.isCurrent ? "text-indigo-600" : "text-slate-400"}`}>{row.tranche}</td>
                    <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-indigo-600" : "text-slate-500"}`}>{row.pct}%</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-indigo-600" : "text-slate-700"}`}>{fmt(row.brut)} EUR</td>
                    <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-indigo-600" : "text-slate-500"}`}>{fmt(row.net)} EUR</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par annee/niveau */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {parsed.type === "apprentissage"
            ? `Salaire par annee de contrat (${parsed.age} ans)`
            : `Salaire par niveau de qualification (${parsed.age} ans)`}
        </h2>
        <div className="space-y-2">
          {comparaisonSecondaire.map((row) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                row.isCurrent ? "bg-indigo-50 border-indigo-300" : "border-slate-100"
              }`}
            >
              <span className={`font-semibold text-sm ${row.isCurrent ? "text-indigo-700" : "text-slate-600"}`}>
                {row.isCurrent ? row.label : (
                  <a href={`/simulateur-salaire-alternant/${row.slug}`} className="hover:text-indigo-600 transition-colors">{row.label}</a>
                )}
                <span className={`ml-2 text-xs ${row.isCurrent ? "text-indigo-500" : "text-slate-400"}`}>({row.pct}%)</span>
              </span>
              <div className="text-right">
                <span className={`font-extrabold ${row.isCurrent ? "text-indigo-700" : "text-slate-700"}`}>{fmt(row.brut)} EUR</span>
                <span className={`text-xs ml-2 ${row.isCurrent ? "text-indigo-600" : "text-slate-400"}`}>net: {fmt(row.net)} EUR</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurSalaireAlternant />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {parsed.type === "apprentissage"
            ? `Tout savoir sur le salaire d'un apprenti de ${parsed.age} ans en ${anneeLabel} annee`
            : `Tout savoir sur le salaire en professionnalisation a ${parsed.age} ans (${niveauLabel})`}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {parsed.type === "apprentissage" ? (
            <>
              Un apprenti de <strong>{parsed.age} ans</strong> en <strong>{anneeLabel} annee</strong> de contrat
              percoit <strong>{r.pourcentageSmic}% du SMIC</strong>, soit <strong>{fmt(r.brut)} EUR brut/mois</strong> en 2026.
              {r.cotisations > 0
                ? ` Apres deduction des cotisations (${fmt(r.cotisations)} EUR), le salaire net est d'environ ${fmt(r.net)} EUR/mois.`
                : ` Ce salaire etant inferieur ou egal a 50% du SMIC, aucune cotisation n'est prelevee : le brut est egal au net.`}
            </>
          ) : (
            <>
              En <strong>contrat de professionnalisation</strong>, un alternant de <strong>{parsed.age} ans</strong> avec
              un niveau <strong>{niveauLabel}</strong> percoit <strong>{r.pourcentageSmic}% du SMIC</strong>,
              soit <strong>{fmt(r.brut)} EUR brut/mois</strong> en 2026.
              {r.cotisations > 0
                ? ` Apres cotisations (${fmt(r.cotisations)} EUR), le net estime est de ${fmt(r.net)} EUR/mois.`
                : ` Brut = net car le salaire est sous le seuil d'exoneration.`}
            </>
          )}
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Sur une annee complete, cela represente <strong>{fmtInt(r.brutAnnuel)} EUR brut</strong> (environ{" "}
          <strong>{fmtInt(r.netAnnuel)} EUR net</strong>). Ce montant est le minimum legal — l&apos;employeur
          ou la convention collective peuvent prevoir un salaire superieur.
        </p>
        <p className="text-slate-600 leading-relaxed">
          N&apos;oubliez pas les aides complementaires : <strong>APL/ALS</strong> (logement),{" "}
          <strong>prime d&apos;activite</strong> (si eligible), <strong>aide Mobili-Jeune</strong>,
          et le <strong>remboursement transport 50%</strong>.
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {/* Liens vers d'autres ages */}
          {ages.filter((a) => a !== parsed.age).slice(0, 5).map((a) => {
            const linkSlug = parsed.type === "apprentissage"
              ? `apprentissage-${a}-ans-${(parsed as { annee: number }).annee}e-annee`
              : `professionnalisation-${a}-ans-${NIVEAU_LABELS_COURT[(parsed as { niveau: NiveauQualification }).niveau]}`;
            return (
              <a
                key={`a-${a}`}
                href={`/simulateur-salaire-alternant/${linkSlug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
              >
                {a} ans
              </a>
            );
          })}
          {/* Lien vers l'autre type de contrat */}
          {parsed.type === "apprentissage" ? (
            <a
              href={`/simulateur-salaire-alternant/professionnalisation-${parsed.age}-ans-niveau-bac`}
              className="px-4 py-2 rounded-xl border border-purple-200 text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all"
            >
              Voir en pro
            </a>
          ) : (
            <a
              href={`/simulateur-salaire-alternant/apprentissage-${Math.min(parsed.age, 26)}-ans-1e-annee`}
              className="px-4 py-2 rounded-xl border border-indigo-200 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              Voir en apprentissage
            </a>
          )}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-salaire-alternant" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
