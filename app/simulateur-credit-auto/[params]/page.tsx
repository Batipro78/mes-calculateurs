import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SimulateurCreditAuto from "../SimulateurCreditAuto";
import { calcCreditAuto, TAUX_MOYENS } from "../creditAutoCalc";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";

const MONTANTS = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000];
const DUREES = [24, 36, 48, 60, 72];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function parseSlug(slug: string): { montant: number; duree: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-mois$/);
  if (!match) return null;
  return {
    montant: parseInt(match[1]),
    duree: parseInt(match[2]),
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const d of DUREES) {
      params.push({ params: `${m}-euros-${d}-mois` });
    }
  }
  return params;
}

type Props = { params: Promise<{ params: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, duree } = parsed;
  const taux = TAUX_MOYENS[duree] || 4.5;
  const res = calcCreditAuto(montant, duree, taux, 0);

  return {
    alternates: { canonical: `/simulateur-credit-auto/${slug}` },
    title: `Credit auto ${fmtInt(montant)} € sur ${duree} mois — Mensualite ${fmt(res.mensualite)} €`,
    description: `Simulez un credit auto de ${fmtInt(montant)} € sur ${duree} mois au taux moyen de ${taux}% (2026). Mensualite : ${fmt(res.mensualite)} €/mois. Cout du credit : ${fmt(res.coutCredit)} €. Simulation gratuite.`,
    keywords: `credit auto ${fmtInt(montant)} euros ${duree} mois, mensualite voiture ${fmtInt(montant)}€, pret automobile ${duree} mois, simulation credit auto 2026`,
    openGraph: {
      title: `Credit auto ${fmtInt(montant)} € sur ${duree} mois : ${fmt(res.mensualite)} €/mois`,
      description: `Mensualite ${fmt(res.mensualite)} € pendant ${duree} mois. Cout du credit : ${fmt(res.coutCredit)} €. Taux ${taux}% (moyenne 2026).`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, duree } = parsed;
  if (!MONTANTS.includes(montant) || !DUREES.includes(duree)) notFound();

  const taux = TAUX_MOYENS[duree] || 4.5;
  const res = calcCreditAuto(montant, duree, taux, 0);

  // Comparaison par montant (meme duree)
  const compMontants = MONTANTS.map((m) => {
    const t = TAUX_MOYENS[duree] || 4.5;
    const r = calcCreditAuto(m, duree, t, 0);
    return { montant: m, mensualite: r.mensualite, coutCredit: r.coutCredit, isCurrent: m === montant };
  });

  // Comparaison par duree (meme montant)
  const compDurees = DUREES.map((d) => {
    const t = TAUX_MOYENS[d] || 4.5;
    const r = calcCreditAuto(montant, d, t, 0);
    return { duree: d, taux: t, mensualite: r.mensualite, coutCredit: r.coutCredit, isCurrent: d === duree };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle mensualite pour un credit auto de ${fmtInt(montant)} € sur ${duree} mois ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un credit auto de ${fmtInt(montant)} € sur ${duree} mois au taux moyen de ${taux}% (2026), la mensualite est de ${fmt(res.mensualite)} €/mois (sans apport). Le cout total du credit est de ${fmt(res.coutCredit)} €, soit un montant total rembourse de ${fmt(res.coutTotal)} €.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le taux pour un credit auto de ${duree} mois en 2026 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En 2026, le taux moyen constate pour un credit auto sur ${duree} mois est de ${taux}% TAEG. Ce taux peut varier selon votre profil emprunteur, votre apport personnel et l'etablissement financier. Les concessionnaires proposent parfois des offres promotionnelles a taux reduit sur certains modeles.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment reduire le cout de mon credit auto de ${fmtInt(montant)} € ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un credit de ${fmtInt(montant)} €, plusieurs leviers permettent de reduire le cout : (1) augmenter votre apport personnel pour reduire le capital emprunte, (2) raccourcir la duree du credit (moins d'interets), (3) comparer les offres de plusieurs banques et courtiers, (4) negocier le taux avec votre banque en presentant un dossier solide (CDI, faible endettement).`,
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
        currentPage={`Credit ${fmtInt(montant)} € sur ${duree} mois`}
        parentPage="Simulateur Credit Auto"
        parentHref="/simulateur-credit-auto"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Credit auto {fmtInt(montant)} € sur {duree} mois
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation d&apos;un pret auto de {fmtInt(montant)} € rembourse sur{" "}
        {duree} mois au taux moyen de {taux}% TAEG (2026, sans apport).
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">
          Mensualite pour {fmtInt(montant)} € sur {duree} mois
        </p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(res.mensualite)} €
        </p>
        <p className="text-lg font-medium mt-1 text-white/80">/ mois pendant {duree} mois</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="text-white/70">Capital emprunte</p>
            <p className="text-2xl font-bold">{fmtInt(montant)} €</p>
          </div>
          <div>
            <p className="text-white/70">Taux</p>
            <p className="text-2xl font-bold">{taux} %</p>
          </div>
          <div>
            <p className="text-white/70">Cout du credit</p>
            <p className="text-2xl font-bold">{fmt(res.coutCredit)} €</p>
          </div>
          <div>
            <p className="text-white/70">Total rembourse</p>
            <p className="text-2xl font-bold">{fmt(res.coutTotal)} €</p>
          </div>
        </div>
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Comparaison par montant */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par montant sur {duree} mois
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Montant</th>
                <th className="text-center p-3 font-semibold text-slate-700">Mensualite</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout credit</th>
              </tr>
            </thead>
            <tbody>
              {compMontants.map((row) => (
                <tr
                  key={row.montant}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-blue-50" : ""}`}
                >
                  <td className="p-3">
                    {row.isCurrent ? (
                      <span className="font-bold text-blue-700">
                        {fmtInt(row.montant)} €
                      </span>
                    ) : (
                      <a
                        href={`/simulateur-credit-auto/${row.montant}-euros-${duree}-mois`}
                        className="text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        {fmtInt(row.montant)} €
                      </a>
                    )}
                  </td>
                  <td
                    className={`p-3 text-center font-bold ${row.isCurrent ? "text-blue-700" : "text-slate-700"}`}
                  >
                    {fmt(row.mensualite)} €
                  </td>
                  <td className="p-3 text-center text-red-600">
                    {fmt(row.coutCredit)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par duree */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(montant)} € : comparaison par duree
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Duree</th>
                <th className="text-center p-3 font-semibold text-slate-700">Taux</th>
                <th className="text-center p-3 font-semibold text-slate-700">Mensualite</th>
                <th className="text-center p-3 font-semibold text-slate-700">Cout credit</th>
              </tr>
            </thead>
            <tbody>
              {compDurees.map((row) => (
                <tr
                  key={row.duree}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-blue-50" : ""}`}
                >
                  <td className="p-3">
                    {row.isCurrent ? (
                      <span className="font-bold text-blue-700">
                        {row.duree} mois
                      </span>
                    ) : (
                      <a
                        href={`/simulateur-credit-auto/${montant}-euros-${row.duree}-mois`}
                        className="text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        {row.duree} mois
                      </a>
                    )}
                  </td>
                  <td className="p-3 text-center text-slate-600">{row.taux} %</td>
                  <td
                    className={`p-3 text-center font-bold ${row.isCurrent ? "text-blue-700" : "text-slate-700"}`}
                  >
                    {fmt(row.mensualite)} €
                  </td>
                  <td className="p-3 text-center text-red-600">
                    {fmt(row.coutCredit)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO texte */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Credit auto {fmtInt(montant)} € sur {duree} mois — Analyse
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un <strong>credit auto de {fmtInt(montant)} €</strong> rembourse sur{" "}
          <strong>{duree} mois</strong> au taux moyen de {taux}% TAEG (2026), la
          mensualite est de <strong>{fmt(res.mensualite)} €/mois</strong>. Le cout
          du credit s&apos;eleve a <strong>{fmt(res.coutCredit)} €</strong>, soit un
          montant total rembourse de <strong>{fmt(res.coutTotal)} €</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ce credit correspond a <strong>{res.tauxEndettement}%</strong> de taux
          d&apos;endettement sur la base d&apos;un salaire moyen de 2 500 €/mois.
          {res.tauxEndettement > 33
            ? " Ce taux depasse le seuil de 33% generalement accepte par les banques. Il est conseille d'augmenter l'apport ou de rallonger la duree."
            : " Ce taux est dans les limites acceptees par les etablissements financiers (moins de 33%)."}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour reduire le cout de ce credit, un <strong>apport personnel</strong>{" "}
          est recommande. Par exemple, avec 2 000 € d&apos;apport, la mensualite
          passerait a{" "}
          <strong>
            {fmt(calcCreditAuto(montant, duree, taux, 2000).mensualite)} €
          </strong>{" "}
          et le cout du credit a{" "}
          <strong>
            {fmt(calcCreditAuto(montant, duree, taux, 2000).coutCredit)} €
          </strong>.
        </p>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Simulateur interactif
      </h2>
      <SimulateurCreditAuto />

      <RelatedCalculators currentSlug="/simulateur-credit-auto" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
