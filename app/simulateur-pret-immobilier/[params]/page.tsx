import type { Metadata } from "next";
import SimulateurPret from "../SimulateurPret";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MONTANTS = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000];
const DUREES = [15, 20, 25];

// Taux moyens 2026 par duree
const TAUX_PAR_DUREE: Record<number, number> = {
  15: 3.25,
  20: 3.40,
  25: 3.55,
};

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function calculerMensualite(montant: number, tauxAnnuel: number, dureeAnnees: number): number {
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const nbMois = dureeAnnees * 12;
  if (tauxMensuel === 0) return montant / nbMois;
  return (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nbMois));
}

function parseSlug(slug: string): { montant: number; duree: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-ans$/);
  if (!match) return null;
  return { montant: parseInt(match[1]), duree: parseInt(match[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const d of DUREES) {
      params.push({ params: `${m}-euros-${d}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, duree } = parsed;
  const taux = TAUX_PAR_DUREE[duree] || 3.40;
  const mensualite = calculerMensualite(montant, taux, duree);
  const coutTotal = mensualite * duree * 12;
  const coutInterets = coutTotal - montant;

  return {
    title: `Pret ${fmtInt(montant)} EUR sur ${duree} ans - Simulation 2026`,
    description: `Simulez un pret immobilier de ${fmtInt(montant)} EUR sur ${duree} ans au taux de ${taux}%. Mensualite : ${fmt(mensualite)} EUR. Cout total des interets : ${fmt(coutInterets)} EUR.`,
    keywords: `pret ${fmtInt(montant)} euros ${duree} ans, mensualite ${fmtInt(montant)}, credit immobilier ${fmtInt(montant)}, simulation pret ${duree} ans`,
    openGraph: {
      title: `Pret ${fmtInt(montant)} EUR sur ${duree} ans = ${fmt(mensualite)} EUR/mois`,
      description: `Mensualite de ${fmt(mensualite)} EUR pour un pret de ${fmtInt(montant)} EUR sur ${duree} ans a ${taux}%. Interets : ${fmt(coutInterets)} EUR.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, duree } = parsed;
  if (!MONTANTS.includes(montant) || !DUREES.includes(duree)) notFound();

  const taux = TAUX_PAR_DUREE[duree] || 3.40;
  const mensualite = calculerMensualite(montant, taux, duree);
  const coutTotal = mensualite * duree * 12;
  const coutInterets = coutTotal - montant;
  const pourcentageInterets = coutTotal > 0 ? (coutInterets / coutTotal) * 100 : 0;

  // Comparaison des durees pour ce montant
  const comparaisonDurees = DUREES.map((d) => {
    const t = TAUX_PAR_DUREE[d] || 3.40;
    const m = calculerMensualite(montant, t, d);
    const total = m * d * 12;
    const interets = total - montant;
    return { duree: d, taux: t, mensualite: m, coutTotal: total, interets, isCurrent: d === duree };
  });

  // Comparaison des montants pour cette duree
  const comparaisonMontants = MONTANTS.map((mt) => {
    const m = calculerMensualite(mt, taux, duree);
    const total = m * duree * 12;
    const interets = total - mt;
    return { montant: mt, mensualite: m, interets, isCurrent: mt === montant };
  });

  const breadcrumbLabel = `${fmtInt(montant)} EUR sur ${duree} ans`;

  // Liens proches
  const autresMontants = MONTANTS.filter((m) => m !== montant).slice(0, 4);
  const autresDurees = DUREES.filter((d) => d !== duree);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle mensualite pour un pret de ${fmtInt(montant)} EUR sur ${duree} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un pret immobilier de ${fmtInt(montant)} EUR sur ${duree} ans au taux moyen de ${taux}% (2026), la mensualite est de ${fmt(mensualite)} EUR. Le cout total du credit s'eleve a ${fmt(coutTotal)} EUR, dont ${fmt(coutInterets)} EUR d'interets.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien coutent les interets d'un pret de ${fmtInt(montant)} EUR sur ${duree} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les interets pour un pret de ${fmtInt(montant)} EUR sur ${duree} ans a ${taux}% s'elevent a ${fmt(coutInterets)} EUR, soit ${fmt(pourcentageInterets)}% du cout total du credit. Vous rembourserez au total ${fmt(coutTotal)} EUR.`,
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
        parentPage="Simulateur Pret Immobilier"
        parentHref="/simulateur-pret-immobilier"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Pret de {fmtInt(montant)} EUR sur {duree} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation detaillee d&apos;un pret immobilier de {fmtInt(montant)} EUR sur {duree} ans au taux moyen 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8">
        <p className="text-violet-200 mb-1">Mensualite</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(mensualite)} <span className="text-2xl font-semibold">EUR / mois</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-violet-200">Capital</p>
            <p className="font-semibold">{fmtInt(montant)} EUR</p>
          </div>
          <div>
            <p className="text-violet-200">Interets</p>
            <p className="font-semibold">{fmt(coutInterets)} EUR</p>
          </div>
          <div>
            <p className="text-violet-200">Cout total</p>
            <p className="font-semibold">{fmt(coutTotal)} EUR</p>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Taux applique</p>
          <p className="text-2xl font-extrabold text-violet-600">{taux}%</p>
          <p className="text-xs text-slate-400 mt-1">Taux moyen {duree} ans (2026)</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Nombre de mensualites</p>
          <p className="text-2xl font-extrabold text-slate-800">{duree * 12}</p>
          <p className="text-xs text-slate-400 mt-1">{duree} ans x 12 mois</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Part des interets</p>
          <p className="text-2xl font-extrabold text-amber-500">{fmt(pourcentageInterets)}%</p>
          <p className="text-xs text-slate-400 mt-1">Du cout total</p>
        </div>
      </div>

      {/* Barre visuelle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-8">
        <p className="text-xs font-medium text-slate-400 mb-3">Repartition du cout total</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-violet-500 to-purple-500"
            style={{ width: `${100 - pourcentageInterets}%` }}
          />
          <div
            className="bg-amber-300"
            style={{ width: `${pourcentageInterets}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-violet-600 font-medium">Capital ({fmt(100 - pourcentageInterets)}%)</span>
          <span className="text-amber-500 font-medium">Interets ({fmt(pourcentageInterets)}%)</span>
        </div>
      </div>

      {/* Comparaison des durees */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fmtInt(montant)} EUR : comparaison par duree
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout interets</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout total</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonDurees.map((row) => (
                <tr key={row.duree} className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}>
                  <td className="py-3 px-2 font-medium text-slate-700">{row.duree} ans</td>
                  <td className="py-3 px-2 text-right text-slate-600">{row.taux}%</td>
                  <td className="py-3 px-2 text-right font-bold text-violet-600">{fmt(row.mensualite)} EUR</td>
                  <td className="py-3 px-2 text-right text-amber-500">{fmt(row.interets)} EUR</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt(row.coutTotal)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison des montants */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Mensualites sur {duree} ans par montant emprunte
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Montant</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout interets</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonMontants.map((row) => (
                <tr key={row.montant} className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{fmtInt(row.montant)} EUR</span>
                    ) : (
                      <a href={`/simulateur-pret-immobilier/${row.montant}-euros-${duree}-ans`} className="text-slate-700 hover:text-violet-600 transition-colors">
                        {fmtInt(row.montant)} EUR
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {fmt(row.mensualite)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-amber-500">{fmt(row.interets)} EUR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Simulateur interactif
      </h2>
      <SimulateurPret />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte explicatif */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Emprunter {fmtInt(montant)} EUR sur {duree} ans en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un pret immobilier de <strong>{fmtInt(montant)} EUR</strong> sur <strong>{duree} ans</strong> au
          taux moyen de <strong>{taux}%</strong> (taux constate en 2026), votre mensualite sera
          de <strong>{fmt(mensualite)} EUR</strong>. Au total, vous rembourserez{" "}
          <strong>{fmt(coutTotal)} EUR</strong>, dont <strong>{fmt(coutInterets)} EUR d&apos;interets</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour pouvoir emprunter cette somme, votre taux d&apos;endettement ne doit pas depasser 35%
          de vos revenus nets. Cela signifie que vous devez gagner au minimum environ{" "}
          <strong>{fmt(mensualite / 0.35)} EUR net par mois</strong> (revenus du foyer).
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Conseils</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Comparez les offres de plusieurs banques pour obtenir le meilleur taux</li>
          <li>Un apport de 10 a 20% ameliore significativement votre taux</li>
          <li>Privilegiez une duree plus courte pour reduire le cout des interets</li>
          <li>N&apos;oubliez pas l&apos;assurance emprunteur (non incluse dans cette simulation)</li>
        </ul>
      </section>

      {/* Liens vers autres simulations */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {autresDurees.map((d) => (
            <a
              key={`d-${d}`}
              href={`/simulateur-pret-immobilier/${montant}-euros-${d}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {fmtInt(montant)} EUR sur {d} ans
            </a>
          ))}
          {autresMontants.map((m) => (
            <a
              key={`m-${m}`}
              href={`/simulateur-pret-immobilier/${m}-euros-${duree}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {fmtInt(m)} EUR sur {duree} ans
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-pret-immobilier" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
