import type { Metadata } from "next";
import CalculateurCongesPayes from "../CalculateurCongesPayes";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SALAIRES = [1500, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000];
const MOIS_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseSlug(slug: string): { salaire: number; mois: number } | null {
  const match = slug.match(/^(\d+)-euros-(\d+)-mois$/);
  if (!match) return null;
  const salaire = parseInt(match[1]);
  const mois = parseInt(match[2]);
  if (mois < 1 || mois > 12) return null;
  return { salaire, mois };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const s of SALAIRES) {
    for (const m of [3, 6, 9, 12]) {
      slugs.push(`${s}-euros-${m}-mois`);
    }
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { salaire, mois } = parsed;
  const jours = Math.ceil(mois * 2.5);
  const indemnite = (salaire * mois) / 10;

  return {
    title: `Conges payes : ${salaire} \u20ac brut, ${mois} mois = ${jours} jours, ${fmt(indemnite)} \u20ac`,
    description: `Pour un salaire de ${salaire} \u20ac brut sur ${mois} mois : ${jours} jours de conges acquis, indemnite de ${fmt(indemnite)} \u20ac (methode 1/10e). Calcul detaille.`,
    keywords: `conges payes ${salaire} euros, conges ${mois} mois, indemnite conges payes ${salaire}, jours conges ${mois} mois`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { salaire, mois } = parsed;
  const jours = Math.ceil(mois * 2.5);
  const joursExacts = mois * 2.5;
  const totalBrut = salaire * mois;
  const indemniteDixieme = totalBrut / 10;
  const salaireJournalier = salaire / 21.67;
  const indemniteMainitien = salaireJournalier * jours;
  const indemniteRetenue = Math.max(indemniteDixieme, indemniteMainitien);
  const methodeRetenue = indemniteDixieme >= indemniteMainitien ? "1/10e" : "maintien";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de jours de conges pour ${mois} mois travailles ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${mois} mois travailles, vous acquerez ${jours} jours ouvrables de conges payes (${mois} x 2,5 = ${joursExacts} jours, arrondi au superieur).`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle indemnite de conges pour ${salaire} \u20ac brut sur ${mois} mois ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `L'indemnite est de ${fmt(indemniteRetenue)} \u20ac (methode du ${methodeRetenue}). Methode 1/10e : ${fmt(indemniteDixieme)} \u20ac. Methode maintien : ${fmt(indemniteMainitien)} \u20ac.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${salaire} \u20ac - ${mois} mois`} parentPage="Calcul Conges Payes" parentHref="/calcul-conges-payes" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Conges payes : {salaire.toLocaleString("fr-FR")} &euro; brut, {mois} mois
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Jours acquis, indemnite et comparaison des methodes pour {salaire.toLocaleString("fr-FR")} &euro; sur {mois} mois.
      </p>

      {/* Resultat */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-teal-200 mb-1">{salaire.toLocaleString("fr-FR")} &euro;/mois &times; {mois} mois</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {jours} <span className="text-2xl font-semibold">jours de CP</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-teal-200">Indemnite</p>
            <p className="font-semibold text-lg">{fmt(indemniteRetenue)} &euro;</p>
          </div>
          <div>
            <p className="text-teal-200">Methode</p>
            <p className="font-semibold text-lg">{methodeRetenue}</p>
          </div>
          <div>
            <p className="text-teal-200">Semaines</p>
            <p className="font-semibold text-lg">{(jours / 5).toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Comparaison methodes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Comparaison des methodes</h2>
        <div className="space-y-2">
          <div className={`rounded-xl p-4 flex justify-between items-center ${methodeRetenue === "1/10e" ? "bg-teal-50 ring-1 ring-teal-200" : "bg-slate-50"}`}>
            <div>
              <p className="text-sm font-semibold text-slate-700">Methode du 1/10e</p>
              <p className="text-xs text-slate-400">{fmt(totalBrut)} &euro; &divide; 10</p>
            </div>
            <p className="text-lg font-bold text-slate-800">{fmt(indemniteDixieme)} &euro;</p>
          </div>
          <div className={`rounded-xl p-4 flex justify-between items-center ${methodeRetenue === "maintien" ? "bg-teal-50 ring-1 ring-teal-200" : "bg-slate-50"}`}>
            <div>
              <p className="text-sm font-semibold text-slate-700">Maintien de salaire</p>
              <p className="text-xs text-slate-400">{fmt(salaireJournalier)} &euro;/jour &times; {jours} jours</p>
            </div>
            <p className="text-lg font-bold text-slate-800">{fmt(indemniteMainitien)} &euro;</p>
          </div>
        </div>
      </div>

      {/* Tableau par salaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Indemnite selon le salaire ({mois} mois)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Salaire brut</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Jours</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Indemnite (1/10e)</th>
              </tr>
            </thead>
            <tbody>
              {SALAIRES.map((s) => {
                const ind = (s * mois) / 10;
                return (
                  <tr key={s} className={`border-b border-slate-100 ${s === salaire ? "bg-teal-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {s === salaire ? (
                        <span className="font-bold text-teal-600">{s.toLocaleString("fr-FR")} &euro;</span>
                      ) : (
                        <a href={`/calcul-conges-payes/${s}-euros-${mois}-mois`} className="text-slate-700 hover:text-teal-600 transition-colors">
                          {s.toLocaleString("fr-FR")} &euro;
                        </a>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{jours} j</td>
                    <td className={`py-2.5 px-2 text-right font-bold ${s === salaire ? "text-teal-600" : "text-slate-700"}`}>
                      {fmt(ind)} &euro;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurCongesPayes />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Conges payes pour {salaire.toLocaleString("fr-FR")} &euro; brut sur {mois} mois
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec un salaire brut de <strong>{salaire.toLocaleString("fr-FR")} &euro;/mois</strong> et <strong>{mois} mois travailles</strong>,
          vous acquerez <strong>{jours} jours ouvrables de conges payes</strong>.
          L&apos;indemnite retenue est de <strong>{fmt(indemniteRetenue)} &euro;</strong> (methode du {methodeRetenue}).
        </p>
        <p className="text-slate-600 leading-relaxed">
          La periode de reference legale va du 1er juin N-1 au 31 mai N.
          L&apos;employeur est tenu de comparer les deux methodes et de retenir celle qui est la plus favorable au salarie.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {SALAIRES.filter((s) => s !== salaire).slice(0, 8).map((s) => (
            <a
              key={s}
              href={`/calcul-conges-payes/${s}-euros-${mois}-mois`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
            >
              {s.toLocaleString("fr-FR")} &euro;
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-conges-payes" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
