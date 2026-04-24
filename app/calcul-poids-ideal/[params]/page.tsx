import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurPoidsIdeal from "../CalculateurPoidsIdeal";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcPoidsIdeal } from "../poidsIdealCalc";

const SEXES = ["homme", "femme"] as const;
const TAILLES = [155, 158, 160, 163, 165, 168, 170, 173, 175, 178, 180, 183, 185, 188, 190];
const AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60];

type Sexe = "homme" | "femme";

interface ParsedSlug {
  sexe: Sexe;
  taille: number;
  age: number;
}

function parseSlug(slug: string): ParsedSlug | null {
  const match = slug.match(/^(homme|femme)-(\d+)cm-(\d+)ans$/);
  if (!match) return null;
  return {
    sexe: match[1] as Sexe,
    taille: parseInt(match[2]),
    age: parseInt(match[3]),
  };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const sexe of SEXES) {
    for (const taille of TAILLES) {
      for (const age of AGES) {
        params.push({ params: `${sexe}-${taille}cm-${age}ans` });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { sexe, taille, age } = parsed;
  const result = calcPoidsIdeal(taille, age, sexe, "normal");
  const sexeLabel = sexe === "homme" ? "Homme" : "Femme";
  const sexeArticle = sexe === "homme" ? "un homme" : "une femme";

  return {
    alternates: { canonical: `/calcul-poids-ideal/${slug}` },
    title: `Poids ideal ${sexeLabel} ${taille} cm ${age} ans = ${fmt(result.moyenne)} kg (Lorentz, Devine, Creff)`,
    description: `Calcul du poids ideal pour ${sexeArticle} de ${taille} cm et ${age} ans. Lorentz : ${fmt(result.lorentz)} kg, Devine : ${fmt(result.devine)} kg, Creff : ${fmt(result.creff)} kg. Fourchette saine : ${fmt(result.fourchette.min)}–${fmt(result.fourchette.max)} kg.`,
    keywords: `poids ideal ${sexeLabel.toLowerCase()} ${taille} cm, poids ideal ${age} ans, poids ideal ${taille} cm, formule lorentz ${taille} cm`,
    openGraph: {
      title: `Poids ideal ${sexeLabel} ${taille} cm ${age} ans = ${fmt(result.moyenne)} kg`,
      description: `Lorentz : ${fmt(result.lorentz)} kg | Devine : ${fmt(result.devine)} kg | Creff : ${fmt(result.creff)} kg | Fourchette : ${fmt(result.fourchette.min)}–${fmt(result.fourchette.max)} kg`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { sexe, taille, age } = parsed;
  if (!SEXES.includes(sexe) || !TAILLES.includes(taille) || !AGES.includes(age)) notFound();

  const result = calcPoidsIdeal(taille, age, sexe, "normal");
  const sexeLabel = sexe === "homme" ? "Homme" : "Femme";
  const sexeArticle = sexe === "homme" ? "un homme" : "une femme";

  // Comparaison en variant la taille (meme sexe, meme age)
  const comparaisonTaille = TAILLES.map((t) => {
    const r = calcPoidsIdeal(t, age, sexe, "normal");
    return { taille: t, result: r, isCurrent: t === taille };
  });

  // Comparaison en variant l'age (meme sexe, meme taille)
  const comparaisonAge = AGES.map((a) => {
    const r = calcPoidsIdeal(taille, a, sexe, "normal");
    return { age: a, result: r, isCurrent: a === age };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le poids ideal pour ${sexeArticle} de ${taille} cm et ${age} ans ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${sexeArticle} de ${taille} cm et ${age} ans, le poids ideal moyen est de ${fmt(result.moyenne)} kg (morphologie normale). La formule de Lorentz donne ${fmt(result.lorentz)} kg, Devine ${fmt(result.devine)} kg, et Creff ${fmt(result.creff)} kg. La fourchette de poids sain (IMC 18,5–24,9) est de ${fmt(result.fourchette.min)} a ${fmt(result.fourchette.max)} kg.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle fourchette de poids est saine pour ${taille} cm ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une taille de ${taille} cm, la fourchette de poids sain recommandee par l'OMS (IMC entre 18,5 et 24,9) est de ${fmt(result.fourchette.min)} kg a ${fmt(result.fourchette.max)} kg. Le poids pour un IMC ideal de 22 est de ${fmt(result.imcIdeal)} kg.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment la morphologie influence-t-elle le poids ideal a ${taille} cm ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La morphologie (ossature) influe uniquement dans la formule de Creff. Pour une personne a ossature mince de ${taille} cm et ${age} ans, le poids Creff sera ${fmt(calcPoidsIdeal(taille, age, sexe, "mince").creff)} kg. Pour une ossature large : ${fmt(calcPoidsIdeal(taille, age, sexe, "large").creff)} kg. Les formules de Lorentz et Devine ne tiennent pas compte de la morphologie.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mes-calculateurs.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Calcul Poids Ideal", item: "https://mes-calculateurs.vercel.app/calcul-poids-ideal" },
      { "@type": "ListItem", position: 3, name: `${sexeLabel} ${taille} cm ${age} ans`, item: `https://mes-calculateurs.vercel.app/calcul-poids-ideal/${sexe}-${taille}cm-${age}ans` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${sexeLabel} ${taille} cm ${age} ans`}
        parentPage="Calcul Poids Ideal"
        parentHref="/calcul-poids-ideal"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Poids ideal : {sexeLabel} {taille} cm, {age} ans
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Poids ideal pour {sexeArticle} de {taille} cm et {age} ans — comparaison Lorentz, Devine, Creff.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <p className="text-white/80 mb-1">Poids ideal moyen</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(result.moyenne)} kg</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Sexe</p>
            <p className="font-semibold">{sexeLabel}</p>
          </div>
          <div>
            <p className="text-white/70">Taille</p>
            <p className="font-semibold">{taille} cm</p>
          </div>
          <div>
            <p className="text-white/70">Age</p>
            <p className="font-semibold">{age} ans</p>
          </div>
          <div>
            <p className="text-white/70">Fourchette saine</p>
            <p className="font-semibold">{fmt(result.fourchette.min)}–{fmt(result.fourchette.max)} kg</p>
          </div>
        </div>
      </div>

      {/* 3 formules cote a cote */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
          <p className="text-xs font-medium text-blue-500 mb-1">Formule de Lorentz</p>
          <p className="text-3xl font-extrabold text-blue-700">{fmt(result.lorentz)} <span className="text-base font-medium">kg</span></p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {sexe === "homme"
              ? `${taille}−100−(${taille}−150)/4`
              : `${taille}−100−(${taille}−150)/2,5`}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">
          <p className="text-xs font-medium text-emerald-500 mb-1">Formule de Devine</p>
          <p className="text-3xl font-extrabold text-emerald-700">{fmt(result.devine)} <span className="text-base font-medium">kg</span></p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {sexe === "homme"
              ? `50+2,3×(${taille}/2,54−60)`
              : `45,5+2,3×(${taille}/2,54−60)`}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
          <p className="text-xs font-medium text-amber-500 mb-1">Formule de Creff</p>
          <p className="text-3xl font-extrabold text-amber-700">{fmt(result.creff)} <span className="text-base font-medium">kg</span></p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            ({taille}−100+{age}/10)×0,9×1
          </p>
        </div>
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Tableau : variation par taille */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Poids ideal {sexeLabel} {age} ans selon la taille
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Taille</th>
                <th className="text-right py-3 px-2 text-blue-500 font-medium">Lorentz</th>
                <th className="text-right py-3 px-2 text-emerald-500 font-medium">Devine</th>
                <th className="text-right py-3 px-2 text-amber-500 font-medium">Creff</th>
                <th className="text-right py-3 px-2 text-violet-500 font-medium">Fourchette</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonTaille.map((row) => (
                <tr
                  key={row.taille}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{row.taille} cm</span>
                    ) : (
                      <a
                        href={`/calcul-poids-ideal/${sexe}-${row.taille}cm-${age}ans`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {row.taille} cm
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-blue-600" : "text-slate-500"}`}>
                    {fmt(row.result.lorentz)}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-emerald-600" : "text-slate-500"}`}>
                    {fmt(row.result.devine)}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-amber-600" : "text-slate-500"}`}>
                    {fmt(row.result.creff)}
                  </td>
                  <td className={`py-2.5 px-2 text-right text-xs ${row.isCurrent ? "font-bold text-violet-600" : "text-slate-400"}`}>
                    {fmt(row.result.fourchette.min)}–{fmt(row.result.fourchette.max)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau : variation par age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Poids ideal {sexeLabel} {taille} cm selon l&apos;age
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-right py-3 px-2 text-blue-500 font-medium">Lorentz</th>
                <th className="text-right py-3 px-2 text-emerald-500 font-medium">Devine</th>
                <th className="text-right py-3 px-2 text-amber-500 font-medium">Creff</th>
                <th className="text-right py-3 px-2 text-violet-500 font-medium">Moyenne</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonAge.map((row) => (
                <tr
                  key={row.age}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-violet-50/50" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-violet-600">{row.age} ans</span>
                    ) : (
                      <a
                        href={`/calcul-poids-ideal/${sexe}-${taille}cm-${row.age}ans`}
                        className="text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {row.age} ans
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-blue-600" : "text-slate-500"}`}>
                    {fmt(row.result.lorentz)}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-emerald-600" : "text-slate-500"}`}>
                    {fmt(row.result.devine)}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-amber-600" : "text-slate-500"}`}>
                    {fmt(row.result.creff)}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-violet-600" : "text-slate-700"}`}>
                    {fmt(row.result.moyenne)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Texte SEO */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Poids ideal {sexeLabel} {taille} cm {age} ans : analyse
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour {sexeArticle} de <strong>{taille} cm</strong> et <strong>{age} ans</strong>,
          le poids ideal moyen selon les trois formules de reference est de{" "}
          <strong>{fmt(result.moyenne)} kg</strong> (morphologie normale).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>fourchette de poids sain</strong> recommandee par l&apos;OMS
          (IMC entre 18,5 et 24,9) s&apos;etend de{" "}
          <strong>{fmt(result.fourchette.min)} kg</strong> a{" "}
          <strong>{fmt(result.fourchette.max)} kg</strong>.
          Le poids correspondant a un IMC ideal de 22 est de{" "}
          <strong>{fmt(result.imcIdeal)} kg</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les trois formules donnent des resultats legerement differents car
          elles ont ete etablies dans des contextes differents. La formule de
          Lorentz ({fmt(result.lorentz)} kg) est la plus simple, Devine (
          {fmt(result.devine)} kg) est utilisee en milieu hospitalier, et Creff (
          {fmt(result.creff)} kg) tient compte de l&apos;age et de la morphologie.
        </p>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      {/* Liens variantes */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres profils similaires</h2>
        <div className="flex flex-wrap gap-2">
          {TAILLES.filter((t) => t !== taille).slice(0, 5).map((t) => (
            <a
              key={`t-${t}`}
              href={`/calcul-poids-ideal/${sexe}-${t}cm-${age}ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {sexeLabel} {t} cm, {age} ans
            </a>
          ))}
          {AGES.filter((a) => a !== age).slice(0, 4).map((a) => (
            <a
              key={`a-${a}`}
              href={`/calcul-poids-ideal/${sexe}-${taille}cm-${a}ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {sexeLabel} {taille} cm, {a} ans
            </a>
          ))}
          <a
            href={`/calcul-poids-ideal/${sexe === "homme" ? "femme" : "homme"}-${taille}cm-${age}ans`}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
          >
            {sexe === "homme" ? "Femme" : "Homme"} {taille} cm, {age} ans
          </a>
        </div>
      </section>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurPoidsIdeal />

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-poids-ideal" />
    </div>
  );
}
