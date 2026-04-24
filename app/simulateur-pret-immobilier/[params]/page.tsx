import type { Metadata } from "next";
import SimulateurPret from "../SimulateurPret";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

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
  for (const s of getVillesSlugs()) {
    params.push({ params: s });
  }
  return params;
}

// Prix median approximatif par ville (base 250k, ajuste par coefficient immobilier local)
function prixMedianVille(ville: Ville): number {
  return Math.round(250000 * ville.coefficient);
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) {
    const prixMedian = prixMedianVille(ville);
    const apport = Math.round(prixMedian * 0.1);
    const montantEmprunt = prixMedian - apport;
    const taux = TAUX_PAR_DUREE[20];
    const mensualite = calculerMensualite(montantEmprunt, taux, 20);
    return {
      alternates: { canonical: `/simulateur-pret-immobilier/${slug}` },
      title: `Simulateur pret immobilier a ${ville.nom} - Mensualite 2026`,
      description: `Simulez un pret immobilier a ${ville.nom} en 2026. Pour un bien de ${fmtInt(prixMedian)} EUR (prix median local), mensualite de ${fmt(mensualite)} EUR sur 20 ans au taux de ${taux}%. Exemples par montant.`,
      keywords: `pret immobilier ${ville.nom.toLowerCase()}, credit immobilier ${ville.nom.toLowerCase()}, simulation pret ${ville.nom.toLowerCase()}, mensualite ${ville.nom.toLowerCase()}, taux pret ${ville.nom.toLowerCase()}`,
      openGraph: {
        title: `Pret immobilier a ${ville.nom} - Mensualite ${fmt(mensualite)} EUR`,
        description: `Achat a ${ville.nom} (bien median ${fmtInt(prixMedian)} EUR) : mensualite ${fmt(mensualite)} EUR sur 20 ans.`,
      },
    };
  }

  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, duree } = parsed;
  const taux = TAUX_PAR_DUREE[duree] || 3.40;
  const mensualite = calculerMensualite(montant, taux, duree);
  const coutTotal = mensualite * duree * 12;
  const coutInterets = coutTotal - montant;

  return {
    alternates: { canonical: `/simulateur-pret-immobilier/${slug}` },
    title: `Pret ${fmtInt(montant)} EUR sur ${duree} ans - Simulation 2026`,
    description: `Simulez un pret immobilier de ${fmtInt(montant)} EUR sur ${duree} ans au taux de ${taux}%. Mensualite : ${fmt(mensualite)} EUR. Cout total des interets : ${fmt(coutInterets)} EUR.`,
    keywords: `pret ${fmtInt(montant)} euros ${duree} ans, mensualite ${fmtInt(montant)}, credit immobilier ${fmtInt(montant)}, simulation pret ${duree} ans`,
    openGraph: {
      title: `Pret ${fmtInt(montant)} EUR sur ${duree} ans = ${fmt(mensualite)} EUR/mois`,
      description: `Mensualite de ${fmt(mensualite)} EUR pour un pret de ${fmtInt(montant)} EUR sur ${duree} ans a ${taux}%. Interets : ${fmt(coutInterets)} EUR.`,
    },
  };
}

function VillePretPage({ ville }: { ville: Ville }) {
  const prixMedian = prixMedianVille(ville);
  const apport = Math.round(prixMedian * 0.1);
  const montantEmprunt = prixMedian - apport;

  // Tableau par tranche de prix adaptee a la ville
  const brackets = [
    Math.round(prixMedian * 0.5),
    Math.round(prixMedian * 0.7),
    prixMedian,
    Math.round(prixMedian * 1.3),
    Math.round(prixMedian * 1.7),
  ];

  const autresVilles = VILLES.filter((v) => v.slug !== ville.slug).slice(0, 12);

  const tauxRef = TAUX_PAR_DUREE[20];
  const mensualiteRef = calculerMensualite(montantEmprunt, tauxRef, 20);
  const interetsRef = mensualiteRef * 20 * 12 - montantEmprunt;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le budget necessaire pour acheter a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${ville.nom}, le prix median d'un bien est estime a ${fmtInt(prixMedian)} EUR en 2026. Avec un apport de 10% (${fmtInt(apport)} EUR), il faut emprunter ${fmtInt(montantEmprunt)} EUR. Sur 20 ans au taux de ${tauxRef}%, cela represente une mensualite de ${fmt(mensualiteRef)} EUR.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel salaire pour emprunter a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une mensualite de ${fmt(mensualiteRef)} EUR (pret median a ${ville.nom}), la regle du taux d'endettement a 35% impose un salaire net de ${fmtInt(Math.round(mensualiteRef / 0.35))} EUR/mois minimum. Les banques peuvent etre plus souples selon le reste a vivre et la situation.`,
        },
      },
      {
        "@type": "Question",
        name: `Les taux de pret sont-ils differents a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les taux de pret immobilier sont nationaux : a ${ville.nom} comme partout en France, comptez environ ${TAUX_PAR_DUREE[15]}% sur 15 ans, ${TAUX_PAR_DUREE[20]}% sur 20 ans, et ${TAUX_PAR_DUREE[25]}% sur 25 ans en 2026. Ce qui varie, c'est le montant emprunte selon les prix locaux.`,
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
        currentPage={`Pret immobilier a ${ville.nom}`}
        parentPage="Simulateur Pret Immobilier"
        parentHref="/simulateur-pret-immobilier"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Pret immobilier a {ville.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation de pret immobilier a {ville.nom} ({ville.departement}) — taux 2026 et exemples par montant.
      </p>

      {/* Resultat median */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-200 mb-1">Mensualite mediane a {ville.nom} (20 ans, {tauxRef}%)</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(mensualiteRef)} <span className="text-2xl font-semibold">EUR/mois</span>
        </p>
        <p className="text-blue-200 mt-2">
          Pour un bien de {fmtInt(prixMedian)} EUR avec {fmtInt(apport)} EUR d&apos;apport
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-200">Prix median local</p>
            <p className="font-semibold">{fmtInt(prixMedian)} EUR</p>
          </div>
          <div>
            <p className="text-blue-200">Montant emprunte</p>
            <p className="font-semibold">{fmtInt(montantEmprunt)} EUR</p>
          </div>
          <div>
            <p className="text-blue-200">Cout interets</p>
            <p className="font-semibold">{fmt(interetsRef)} EUR</p>
          </div>
        </div>
      </div>

      {/* Tableau par tranche a cette ville */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Mensualite de pret a {ville.nom} — par montant (20 ans)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prix du bien</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Emprunt (10% apport)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite 20 ans</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Simulation</th>
              </tr>
            </thead>
            <tbody>
              {brackets.map((p) => {
                const ap = Math.round(p * 0.1);
                const em = p - ap;
                const mens = calculerMensualite(em, tauxRef, 20);
                const nearest = MONTANTS.reduce((prev, curr) => Math.abs(curr - em) < Math.abs(prev - em) ? curr : prev, MONTANTS[0]);
                return (
                  <tr key={p} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700 font-medium">{fmtInt(p)} EUR</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{fmtInt(em)} EUR</td>
                    <td className="py-2.5 px-2 text-right font-bold text-blue-600">{fmt(mens)} EUR</td>
                    <td className="py-2.5 px-2 text-right">
                      <a href={`/simulateur-pret-immobilier/${nearest}-euros-20-ans`} className="text-blue-600 hover:underline text-xs font-medium">
                        voir {fmtInt(nearest)} EUR &rarr;
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <SimulateurPret />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO localise */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Acheter a {ville.nom} en 2026 : quel pret immobilier ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom}</strong> ({ville.departement}), le prix median d&apos;un bien immobilier est estime a
          <strong> {fmtInt(prixMedian)} EUR</strong> en 2026. Pour financer un tel achat, les {ville.gentile} doivent
          generalement apporter <strong>10% du prix</strong> ({fmtInt(apport)} EUR) et emprunter le reste,
          soit <strong>{fmtInt(montantEmprunt)} EUR</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Aux taux de 2026 ({TAUX_PAR_DUREE[15]}% sur 15 ans, {TAUX_PAR_DUREE[20]}% sur 20 ans, {TAUX_PAR_DUREE[25]}% sur 25 ans),
          voici les mensualites typiques a {ville.nom} :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Sur 15 ans</strong> : {fmt(calculerMensualite(montantEmprunt, TAUX_PAR_DUREE[15], 15))} EUR/mois</li>
          <li><strong>Sur 20 ans</strong> : {fmt(mensualiteRef)} EUR/mois (recommande)</li>
          <li><strong>Sur 25 ans</strong> : {fmt(calculerMensualite(montantEmprunt, TAUX_PAR_DUREE[25], 25))} EUR/mois</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Quel salaire pour emprunter a {ville.nom} ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La regle du taux d&apos;endettement a 35% impose, pour une mensualite de {fmt(mensualiteRef)} EUR,
          un salaire net de <strong>{fmtInt(Math.round(mensualiteRef / 0.35))} EUR/mois minimum</strong> (soit environ
          {" "}{fmtInt(Math.round(mensualiteRef / 0.35 * 12))} EUR par an).
          Certaines banques peuvent etre plus souples si le reste a vivre est suffisant.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">N&apos;oubliez pas les frais de notaire a {ville.nom}</h3>
        <p className="text-slate-600 leading-relaxed">
          En plus du pret, prevoyez environ <strong>7 a 8%</strong> du prix d&apos;achat dans l&apos;ancien pour les
          <a href={`/frais-de-notaire/${ville.slug}`} className="text-blue-600 hover:underline"> frais de notaire a {ville.nom}</a>.
          Pour un bien de {fmtInt(prixMedian)} EUR, cela represente environ {fmtInt(Math.round(prixMedian * 0.075))} EUR
          qui viennent s&apos;ajouter a l&apos;apport personnel.
        </p>
      </section>

      {/* Autres villes */}
      {autresVilles.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pret immobilier dans d&apos;autres villes</h2>
          <div className="flex flex-wrap gap-2">
            {autresVilles.map((v) => (
              <a
                key={v.slug}
                href={`/simulateur-pret-immobilier/${v.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
              >
                {v.nom}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/simulateur-pret-immobilier" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) return <VillePretPage ville={ville} />;

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
