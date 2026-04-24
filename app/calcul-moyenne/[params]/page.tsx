import type { Metadata } from "next";
import CalculateurMoyenne from "../CalculateurMoyenne";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MOYENNES = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const BAREMES = [10, 20, 100];

function parseSlug(slug: string): { moyenne: number; bareme: number } | null {
  const match = slug.match(/^(\d+)-sur-(\d+)$/);
  if (!match) return null;
  const moyenne = parseInt(match[1]);
  const bareme = parseInt(match[2]);
  if (!BAREMES.includes(bareme)) return null;
  const maxMoy = bareme === 100 ? 100 : 20;
  if (moyenne < 0 || moyenne > maxMoy) return null;
  return { moyenne, bareme };
}

function getMention(moyenne: number, bareme: number): { mention: string; couleur: string } {
  const sur20 = bareme === 20 ? moyenne : (moyenne / bareme) * 20;
  if (sur20 >= 16) return { mention: "Tres bien", couleur: "text-green-600" };
  if (sur20 >= 14) return { mention: "Bien", couleur: "text-blue-600" };
  if (sur20 >= 12) return { mention: "Assez bien", couleur: "text-cyan-600" };
  if (sur20 >= 10) return { mention: "Passable", couleur: "text-amber-600" };
  return { mention: "Insuffisant", couleur: "text-red-500" };
}

export function generateStaticParams() {
  const slugs: string[] = [];
  for (const m of MOYENNES) {
    slugs.push(`${m}-sur-20`);
  }
  for (const m of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    slugs.push(`${m}-sur-10`);
  }
  for (const m of [25, 30, 40, 50, 60, 70, 75, 80, 85, 90, 95, 100]) {
    slugs.push(`${m}-sur-100`);
  }
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { moyenne, bareme } = parsed;
  const { mention } = getMention(moyenne, bareme);
  const sur20 = bareme === 20 ? moyenne : ((moyenne / bareme) * 20).toFixed(1);

  return {
    alternates: { canonical: `/calcul-moyenne/${slug}` },
    title: `Moyenne de ${moyenne}/${bareme} — ${mention}${bareme !== 20 ? ` (${sur20}/20)` : ""}`,
    description: `Une moyenne de ${moyenne}/${bareme} correspond a la mention "${mention}". ${bareme !== 20 ? `Equivalence : ${sur20}/20.` : ""} Conseils pour ameliorer sa moyenne et coefficients du bac.`,
    keywords: `moyenne ${moyenne} sur ${bareme}, ${moyenne}/${bareme} mention, ameliorer sa moyenne, moyenne bac, note ${moyenne}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { moyenne, bareme } = parsed;
  const { mention, couleur } = getMention(moyenne, bareme);
  const sur20 = bareme === 20 ? moyenne : (moyenne / bareme) * 20;
  const pourcent = ((moyenne / bareme) * 100).toFixed(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${moyenne}/${bareme} c'est quelle mention ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une moyenne de ${moyenne}/${bareme} (soit ${sur20.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}/20) correspond a la mention "${mention}". ${sur20 >= 10 ? "La moyenne est au-dessus de la moyenne." : "La moyenne est en dessous du seuil de validation (10/20)."}`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${moyenne}/${bareme}`} parentPage="Calcul Moyenne" parentHref="/calcul-moyenne" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Moyenne de {moyenne}/{bareme}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Interpretation, mention et equivalences pour une moyenne de {moyenne} sur {bareme}.
      </p>

      {/* Resultat */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8">
        <p className="text-violet-200 mb-1">Moyenne {moyenne}/{bareme}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {pourcent}<span className="text-2xl font-semibold">%</span>
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-violet-200">Sur 20</p>
            <p className="font-semibold text-lg">{sur20.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}/20</p>
          </div>
          <div>
            <p className="text-violet-200">Mention</p>
            <p className="font-semibold text-lg">{mention}</p>
          </div>
          <div>
            <p className="text-violet-200">Statut</p>
            <p className="font-semibold text-lg">{sur20 >= 10 ? "Valide" : "Non valide"}</p>
          </div>
        </div>
      </div>

      {/* Echelle des mentions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Echelle des mentions</h2>
        <div className="space-y-2">
          {[
            { label: "Tres bien", min: "16/20", range: "80-100%", color: "bg-green-100 text-green-700", active: sur20 >= 16 },
            { label: "Bien", min: "14/20", range: "70-79%", color: "bg-blue-100 text-blue-700", active: sur20 >= 14 && sur20 < 16 },
            { label: "Assez bien", min: "12/20", range: "60-69%", color: "bg-cyan-100 text-cyan-700", active: sur20 >= 12 && sur20 < 14 },
            { label: "Passable", min: "10/20", range: "50-59%", color: "bg-amber-100 text-amber-700", active: sur20 >= 10 && sur20 < 12 },
            { label: "Insuffisant", min: "<10/20", range: "<50%", color: "bg-red-100 text-red-700", active: sur20 < 10 },
          ].map((m) => (
            <div key={m.label} className={`rounded-xl p-3 flex justify-between items-center ${m.active ? m.color + " ring-2 ring-offset-1 ring-current" : "bg-slate-50 text-slate-500"}`}>
              <span className="text-sm font-semibold">{m.label}</span>
              <span className="text-xs">{m.min} ({m.range})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau equivalences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tableau des moyennes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Moyenne /20</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Pourcentage</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mention</th>
              </tr>
            </thead>
            <tbody>
              {MOYENNES.map((m) => {
                const { mention: men, couleur: col } = getMention(m, 20);
                const isActive = m === Math.round(sur20);
                return (
                  <tr key={m} className={`border-b border-slate-100 ${isActive ? "bg-violet-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {isActive ? (
                        <span className="font-bold text-violet-600">{m}/20</span>
                      ) : (
                        <a href={`/calcul-moyenne/${m}-sur-20`} className="text-slate-700 hover:text-violet-600 transition-colors">{m}/20</a>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{((m / 20) * 100).toFixed(0)}%</td>
                    <td className={`py-2.5 px-2 text-right font-semibold ${col}`}>{men}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurMoyenne />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Moyenne de {moyenne}/{bareme} — C&apos;est bien ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une moyenne de <strong>{moyenne}/{bareme}</strong> correspond a <strong>{pourcent}%</strong> de reussite,
          soit <strong>{sur20.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}/20</strong>.
          C&apos;est une moyenne qualifiee de &quot;<strong className={couleur}>{mention}</strong>&quot;.
        </p>
        <p className="text-slate-600 leading-relaxed">
          {sur20 >= 16 && "Felicitations ! C'est une excellente moyenne qui ouvre les portes des meilleures formations. Au bac, cela donne la mention Tres bien."}
          {sur20 >= 14 && sur20 < 16 && "C'est une tres bonne moyenne. Au bac, cela correspond a la mention Bien. Continuez sur cette lancee !"}
          {sur20 >= 12 && sur20 < 14 && "C'est une bonne moyenne, au-dessus de la mediane. Au bac, cela donne la mention Assez bien."}
          {sur20 >= 10 && sur20 < 12 && "La moyenne est validee mais sans mention. Pour progresser, concentrez-vous sur les matieres a fort coefficient."}
          {sur20 < 10 && "La moyenne est en dessous du seuil de validation. Pour remonter, ciblez les matieres avec les plus gros coefficients — c'est la ou chaque point gagne compte le plus."}
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres moyennes</h2>
        <div className="flex flex-wrap gap-2">
          {MOYENNES.filter((m) => m !== Math.round(sur20)).map((m) => (
            <a
              key={m}
              href={`/calcul-moyenne/${m}-sur-20`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {m}/20
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-moyenne" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
