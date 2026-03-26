import type { Metadata } from "next";
import CalculateurAge from "../CalculateurAge";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const ANNEES = Array.from({ length: 71 }, (_, i) => 1950 + i); // 1950-2020

interface GenerationInfo {
  nom: string;
  periode: string;
  description: string;
}

function getGeneration(annee: number): GenerationInfo {
  if (annee < 1946) return { nom: "Generation silencieuse", periode: "avant 1946", description: "Generation marquee par la guerre et l'apres-guerre." };
  if (annee <= 1964) return { nom: "Baby-boomers", periode: "1946-1964", description: "Generation de la croissance economique et du plein emploi." };
  if (annee <= 1980) return { nom: "Generation X", periode: "1965-1980", description: "Generation de la transition numerique et de l'independance." };
  if (annee <= 1996) return { nom: "Millennials (Gen Y)", periode: "1981-1996", description: "Generation d'Internet et des reseaux sociaux." };
  if (annee <= 2012) return { nom: "Generation Z", periode: "1997-2012", description: "Generation du smartphone et du numerique natif." };
  return { nom: "Generation Alpha", periode: "2013+", description: "Generation de l'intelligence artificielle." };
}

function parseSlug(slug: string): { annee: number } | null {
  const match = slug.match(/^ne-en-(\d{4})$/);
  if (!match) return null;
  const annee = parseInt(match[1]);
  return ANNEES.includes(annee) ? { annee } : null;
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function generateStaticParams() {
  return ANNEES.map((a) => ({ params: `ne-en-${a}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { annee } = parsed;
  const age = 2026 - annee;
  const gen = getGeneration(annee);

  return {
    title: `Ne(e) en ${annee} - Quel age ? ${age} ans en 2026`,
    description: `Personne nee en ${annee} : ${age} ans en 2026. ${gen.nom}. Calcul age exact en jours, semaines, mois. Prochain anniversaire, signe astrologique.`,
    keywords: `ne en ${annee} quel age, age ${annee}, ${age} ans annee naissance, generation ${annee}, calcul age ${annee}`,
    openGraph: {
      title: `Ne(e) en ${annee} = ${age} ans en 2026`,
      description: `Si vous etes ne(e) en ${annee}, vous avez ${age} ans en 2026. ${gen.nom} (${gen.periode}).`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { annee } = parsed;
  const age = 2026 - annee;
  const gen = getGeneration(annee);

  // Stats approximatives (basees sur 1er janvier de l'annee)
  const dateRef = new Date(2026, 2, 26); // 26 mars 2026
  const dateNaissance = new Date(annee, 0, 1);
  const totalJours = Math.floor((dateRef.getTime() - dateNaissance.getTime()) / (1000 * 60 * 60 * 24));
  const totalSemaines = Math.floor(totalJours / 7);
  const totalMois = age * 12 + 2;
  const totalHeures = totalJours * 24;

  const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].filter((d) => d !== annee);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel age a-t-on si on est ne en ${annee} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une personne nee en ${annee} a ${age} ans en 2026 (ou ${age - 1} ans si son anniversaire n'est pas encore passe). Elle fait partie de la ${gen.nom} (${gen.periode}).`,
        },
      },
      {
        "@type": "Question",
        name: `Combien de jours a vecu une personne nee en ${annee} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une personne nee le 1er janvier ${annee} a vecu environ ${fmtInt(totalJours)} jours, soit ${fmtInt(totalSemaines)} semaines ou ${fmtInt(totalHeures)} heures (au 26 mars 2026).`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`Ne(e) en ${annee}`} parentPage="Calcul Age" parentHref="/calcul-age" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎂
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Ne(e) en {annee} — Quel age ?
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Age exact, nombre de jours vecus et generation pour une personne nee en {annee}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-8 shadow-lg shadow-pink-200/50 mb-8">
        <p className="text-pink-200 mb-1">Ne(e) en {annee} =</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {age} <span className="text-2xl font-semibold">ans en 2026</span>
        </p>
        <p className="text-pink-200 mt-1">(ou {age - 1} ans si votre anniversaire n&apos;est pas encore passe)</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-pink-200">Jours vecus</p>
            <p className="font-semibold text-lg">~{fmtInt(totalJours)}</p>
          </div>
          <div>
            <p className="text-pink-200">Semaines</p>
            <p className="font-semibold text-lg">~{fmtInt(totalSemaines)}</p>
          </div>
          <div>
            <p className="text-pink-200">Mois</p>
            <p className="font-semibold text-lg">~{fmtInt(totalMois)}</p>
          </div>
          <div>
            <p className="text-pink-200">Heures</p>
            <p className="font-semibold text-lg">~{fmtInt(totalHeures)}</p>
          </div>
        </div>
      </div>

      {/* Generation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Generation</h2>
        <div className="bg-pink-50/50 rounded-xl p-4">
          <p className="font-bold text-pink-600 text-lg">{gen.nom}</p>
          <p className="text-sm text-slate-500">Periode : {gen.periode}</p>
          <p className="text-slate-600 mt-2">{gen.description}</p>
        </div>
      </div>

      {/* Tableau annees proches */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Ages par annee de naissance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Annee de naissance</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Age en 2026</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Generation</th>
              </tr>
            </thead>
            <tbody>
              {[annee - 5, annee - 4, annee - 3, annee - 2, annee - 1, annee, annee + 1, annee + 2, annee + 3, annee + 4, annee + 5]
                .filter((a) => a >= 1950 && a <= 2020)
                .map((a) => (
                  <tr key={a} className={`border-b border-slate-100 ${a === annee ? "bg-pink-50/50" : ""}`}>
                    <td className="py-2.5 px-2">
                      {a === annee ? (
                        <span className="font-bold text-pink-600">{a}</span>
                      ) : (
                        <a href={`/calcul-age/ne-en-${a}`} className="text-slate-700 hover:text-pink-600 transition-colors">
                          {a}
                        </a>
                      )}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-bold ${a === annee ? "text-pink-600" : "text-slate-700"}`}>
                      {2026 - a} ans
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500 text-xs">
                      {getGeneration(a).nom}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dates cles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Dates cles pour une personne nee en {annee}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Majorite (18 ans)</span>
            <span className="text-sm font-bold text-slate-800">{annee + 18}</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">30 ans</span>
            <span className="text-sm font-bold text-slate-800">{annee + 30}</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">40 ans</span>
            <span className="text-sm font-bold text-slate-800">{annee + 40}</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">50 ans</span>
            <span className="text-sm font-bold text-slate-800">{annee + 50}</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Retraite (64 ans)</span>
            <span className="text-sm font-bold text-slate-800">{annee + 64}</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">Esperance de vie (~83 ans)</span>
            <span className="text-sm font-bold text-slate-800">{annee + 83}</span>
          </div>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur d&apos;age interactif</h2>
      <CalculateurAge />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Quel age si on est ne en {annee} ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une personne <strong>nee en {annee}</strong> a <strong>{age} ans en 2026</strong> (ou {age - 1} ans si son anniversaire n&apos;est pas encore passe cette annee).
          Cela represente environ <strong>{fmtInt(totalJours)} jours</strong> ou <strong>{fmtInt(totalSemaines)} semaines</strong> de vie.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les personnes nees en {annee} font partie de la <strong>{gen.nom}</strong> ({gen.periode}). {gen.description}
        </p>
        <p className="text-slate-600 leading-relaxed">
          En France, une personne nee en {annee} a atteint la majorite en {annee + 18} et pourra partir a la retraite a 64 ans, soit en {annee + 64} (reforme 2023).
          L&apos;esperance de vie moyenne etant d&apos;environ 83 ans, l&apos;esperance statistique se situe autour de {annee + 83}.
        </p>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres annees de naissance</h2>
        <div className="flex flex-wrap gap-2">
          {decades.map((a) => (
            <a
              key={a}
              href={`/calcul-age/ne-en-${a}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/50 transition-all"
            >
              Ne(e) en {a}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-age" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
