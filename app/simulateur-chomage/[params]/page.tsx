import type { Metadata } from "next";
import CalculateurChomage from "../CalculateurChomage";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SALAIRES = [1400, 1600, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000, 6000];
const MOIS_TRAVAILLES = [6, 12, 18, 24];
const AGES = [25, 30, 35, 40, 45, 50, 53, 55, 60];

const PART_FIXE = 13.18;

function calcARE(salaire: number, mois: number, age: number) {
  const sjr = (salaire * mois) / (mois * 30);
  const methode1 = sjr * 0.574;
  const methode2 = sjr * 0.404 + PART_FIXE;
  let areJour = Math.max(methode1, methode2);
  areJour = Math.max(areJour, 31.59);
  areJour = Math.min(areJour, 274.80);
  if (sjr <= 0) areJour = 0;

  let dureeMax: number;
  if (age < 53) dureeMax = Math.min(mois, 18);
  else if (age < 55) dureeMax = Math.min(mois, 22.5);
  else dureeMax = Math.min(mois, 27);

  const isDegressif = salaire > 4965 && age < 57;
  const areApresDegressivite = areJour * 0.7;

  return { sjr, methode1, methode2, areJour, areMois: areJour * 30, dureeMax, dureeMaxJours: Math.round(dureeMax * 30), montantTotal: areJour * Math.round(dureeMax * 30), tauxRemplacement: salaire > 0 ? ((areJour * 30) / salaire) * 100 : 0, isDegressif, areApresDegressivite };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function parseSlug(slug: string): { salaire: number; mois: number; age: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-mois-(\d+)-ans$/);
  if (!match) return null;
  return { salaire: parseInt(match[1]), mois: parseInt(match[2]), age: parseInt(match[3]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const s of SALAIRES) {
    for (const m of MOIS_TRAVAILLES) {
      for (const a of AGES) {
        params.push({ params: `${s}-euros-${m}-mois-${a}-ans` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { salaire, mois, age } = parsed;
  const r = calcARE(salaire, mois, age);

  return {
    title: `Chomage ${salaire.toLocaleString("fr-FR")} EUR brut = ${fmt(r.areMois)} EUR/mois | ${r.dureeMax} mois`,
    description: `Allocation chomage pour un salaire de ${salaire.toLocaleString("fr-FR")} EUR brut, ${mois} mois travailles, ${age} ans : ${fmt(r.areMois)} EUR/mois (${fmt(r.areJour)} EUR/jour). Duree : ${r.dureeMax} mois. SJR : ${fmt(r.sjr)} EUR.`,
    keywords: `chomage ${salaire} euros, allocation chomage ${salaire} euros brut, ARE ${salaire} euros, simulation chomage ${age} ans`,
    openGraph: {
      title: `${salaire.toLocaleString("fr-FR")} EUR brut → ${fmt(r.areMois)} EUR/mois de chomage`,
      description: `ARE : ${fmt(r.areJour)} EUR/jour. Duree max : ${r.dureeMax} mois. Total estime : ${fmtInt(r.montantTotal)} EUR.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { salaire, mois, age } = parsed;
  if (!SALAIRES.includes(salaire) || !MOIS_TRAVAILLES.includes(mois) || !AGES.includes(age)) notFound();

  const r = calcARE(salaire, mois, age);

  // Comparaison par salaire
  const comparaisonSalaire = SALAIRES.map((s) => {
    const res = calcARE(s, mois, age);
    return { salaire: s, areJour: res.areJour, areMois: res.areMois, taux: res.tauxRemplacement, isCurrent: s === salaire };
  });

  // Comparaison par duree
  const comparaisonMois = MOIS_TRAVAILLES.map((m) => {
    const res = calcARE(salaire, m, age);
    return { mois: m, dureeMax: res.dureeMax, montantTotal: res.montantTotal, isCurrent: m === mois };
  });

  // Comparaison par age
  const comparaisonAge = AGES.map((a) => {
    const res = calcARE(salaire, mois, a);
    return { age: a, dureeMax: res.dureeMax, areMois: res.areMois, montantTotal: res.montantTotal, isCurrent: a === age };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de chomage pour ${salaire.toLocaleString("fr-FR")} EUR brut ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un salaire brut de ${salaire.toLocaleString("fr-FR")} EUR/mois, l'allocation chomage est estimee a ${fmt(r.areMois)} EUR/mois (${fmt(r.areJour)} EUR/jour). Le SJR est de ${fmt(r.sjr)} EUR. Le taux de remplacement est de ${r.tauxRemplacement.toFixed(1)}%.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de temps de chomage a ${age} ans avec ${mois} mois de travail ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${age} ans avec ${mois} mois travailles, la duree d'indemnisation maximale est de ${r.dureeMax} mois (${r.dureeMaxJours} jours). Le montant total estime est de ${fmtInt(r.montantTotal)} EUR.`,
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
        currentPage={`${salaire.toLocaleString("fr-FR")} EUR - ${age} ans`}
        parentPage="Simulateur Chomage"
        parentHref="/simulateur-chomage"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Chomage : {salaire.toLocaleString("fr-FR")} EUR brut, {age} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Allocation ARE pour {salaire.toLocaleString("fr-FR")} EUR brut/mois, {mois} mois travailles, {age} ans.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Allocation chomage estimee (ARE)</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(r.areMois)} EUR</p>
        <p className="text-lg font-medium mt-1">par mois</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Par jour</p>
            <p className="font-semibold">{fmt(r.areJour)} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Taux</p>
            <p className="font-semibold">{r.tauxRemplacement.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-white/70">Duree</p>
            <p className="font-semibold">{r.dureeMax} mois</p>
          </div>
          <div>
            <p className="text-white/70">Total</p>
            <p className="font-semibold">{fmtInt(r.montantTotal)} EUR</p>
          </div>
        </div>
      </div>

      {/* Detail du calcul */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Salaire brut mensuel</span>
            <span className="font-medium text-slate-700">{salaire.toLocaleString("fr-FR")} EUR</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Periode de reference</span>
            <span className="font-medium text-slate-700">{mois} mois ({mois * 30} jours)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">SJR</span>
            <span className="font-bold text-slate-800">{fmt(r.sjr)} EUR</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex justify-between">
            <span className="text-slate-500">57,4% du SJR</span>
            <span className="text-slate-700">{fmt(r.methode1)} EUR/j</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">40,4% SJR + 13,18 EUR</span>
            <span className="text-slate-700">{fmt(r.methode2)} EUR/j</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-slate-600">ARE journaliere retenue</span>
            <span className="text-sky-700">{fmt(r.areJour)} EUR</span>
          </div>
        </div>
      </div>

      {r.isDegressif && (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-amber-800 mb-2">Degressivite applicable</h2>
          <p className="text-sm text-amber-700 leading-relaxed">
            Votre salaire depasse 4 965 EUR brut. Apres 6 mois, votre ARE sera reduite de 30% :
          </p>
          <p className="text-2xl font-extrabold text-amber-800 mt-2">{fmt(r.areApresDegressivite * 30)} EUR/mois</p>
        </div>
      )}

      {/* Comparaison par salaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          ARE selon le salaire brut ({mois} mois, {age} ans)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Salaire brut</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">ARE/jour</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">ARE/mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonSalaire.map((row) => (
                <tr key={row.salaire} className={`border-b border-slate-100 ${row.isCurrent ? "bg-sky-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-sky-600">{row.salaire.toLocaleString("fr-FR")} EUR</span>
                    ) : (
                      <a href={`/simulateur-chomage/${row.salaire}-euros-${mois}-mois-${age}-ans`} className="text-slate-700 hover:text-sky-600 transition-colors">
                        {row.salaire.toLocaleString("fr-FR")} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-sky-600" : "text-slate-500"}`}>{fmt(row.areJour)}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-sky-600" : "text-slate-700"}`}>{fmt(row.areMois)}</td>
                  <td className={`py-2.5 px-2 text-right text-sm ${row.isCurrent ? "text-sky-600" : "text-slate-500"}`}>{row.taux.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Duree selon l&apos;age ({salaire.toLocaleString("fr-FR")} EUR, {mois} mois)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Duree max</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total estime</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAge.map((row) => (
                <tr key={row.age} className={`border-b border-slate-100 ${row.isCurrent ? "bg-sky-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-sky-600">{row.age} ans</span>
                    ) : (
                      <a href={`/simulateur-chomage/${salaire}-euros-${mois}-mois-${row.age}-ans`} className="text-slate-700 hover:text-sky-600 transition-colors">
                        {row.age} ans
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-sky-600" : "text-slate-700"}`}>{row.dureeMax} mois</td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-sky-600" : "text-slate-500"}`}>{fmtInt(row.montantTotal)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par mois travailles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Duree selon les mois travailles ({salaire.toLocaleString("fr-FR")} EUR, {age} ans)
        </h2>
        <div className="space-y-2">
          {comparaisonMois.map((row) => (
            <div key={row.mois} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${row.isCurrent ? "bg-sky-50 border-sky-300" : "border-slate-100"}`}>
              <span className={`font-semibold text-sm ${row.isCurrent ? "text-sky-700" : "text-slate-600"}`}>
                {row.isCurrent ? `${row.mois} mois` : (
                  <a href={`/simulateur-chomage/${salaire}-euros-${row.mois}-mois-${age}-ans`} className="hover:text-sky-600 transition-colors">{row.mois} mois travailles</a>
                )}
              </span>
              <div className="text-right">
                <span className={`font-extrabold ${row.isCurrent ? "text-sky-700" : "text-slate-700"}`}>{row.dureeMax} mois</span>
                <span className={`text-xs ml-2 ${row.isCurrent ? "text-sky-600" : "text-slate-400"}`}>({fmtInt(row.montantTotal)} EUR)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <CalculateurChomage />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Chomage pour {salaire.toLocaleString("fr-FR")} EUR brut : combien et combien de temps ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un salaire brut de <strong>{salaire.toLocaleString("fr-FR")} EUR/mois</strong>, apres{" "}
          <strong>{mois} mois</strong> de travail, a <strong>{age} ans</strong>,
          l&apos;allocation chomage (ARE) est estimee a <strong>{fmt(r.areMois)} EUR/mois</strong>{" "}
          ({fmt(r.areJour)} EUR/jour), soit un taux de remplacement de <strong>{r.tauxRemplacement.toFixed(1)}%</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La duree maximale d&apos;indemnisation est de <strong>{r.dureeMax} mois</strong> ({r.dureeMaxJours} jours).
          Le montant total estime sur toute la periode est de <strong>{fmtInt(r.montantTotal)} EUR</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Le SJR (Salaire Journalier de Reference) est de <strong>{fmt(r.sjr)} EUR</strong>.
          France Travail retient la methode la plus avantageuse : 57,4% du SJR ({fmt(r.methode1)} EUR)
          ou 40,4% du SJR + 13,18 EUR ({fmt(r.methode2)} EUR).
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {SALAIRES.filter((s) => s !== salaire).slice(0, 6).map((s) => (
            <a
              key={`s-${s}`}
              href={`/simulateur-chomage/${s}-euros-${mois}-mois-${age}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
            >
              {s.toLocaleString("fr-FR")} EUR brut
            </a>
          ))}
          {AGES.filter((a) => a !== age).slice(0, 4).map((a) => (
            <a
              key={`a-${a}`}
              href={`/simulateur-chomage/${salaire}-euros-${mois}-mois-${a}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
            >
              {salaire.toLocaleString("fr-FR")} EUR, {a} ans
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-chomage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
