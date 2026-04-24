import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurRisqueCardio from "../CalculateurRisqueCardio";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcRisqueCardio } from "../risqueCardioCalc";
import type { Sexe } from "../risqueCardioCalc";

const SEXES = ["homme", "femme"] as const;
const AGES = [30, 35, 40, 45, 50, 55, 60, 65, 70];
const PROFILS = ["sans-facteur", "fumeur", "diabetique", "hypertension", "cholesterol-eleve"] as const;

type ProfilType = (typeof PROFILS)[number];

interface ProfilConfig {
  tabac: boolean;
  diabete: boolean;
  antecedents: boolean;
  cholesterolTotal: number;
  cholesterolHDL: number;
  tensionSystolique: number;
  label: string;
  description: string;
}

function getProfilConfig(profil: ProfilType): ProfilConfig {
  switch (profil) {
    case "sans-facteur":
      return {
        tabac: false, diabete: false, antecedents: false,
        cholesterolTotal: 185, cholesterolHDL: 55, tensionSystolique: 115,
        label: "Sans facteur de risque",
        description: "Cholesterol optimal, tension normale, pas de tabac ni diabete",
      };
    case "fumeur":
      return {
        tabac: true, diabete: false, antecedents: false,
        cholesterolTotal: 210, cholesterolHDL: 48, tensionSystolique: 125,
        label: "Fumeur",
        description: "Tabagisme actif avec bilan lipidique normal",
      };
    case "diabetique":
      return {
        tabac: false, diabete: true, antecedents: false,
        cholesterolTotal: 215, cholesterolHDL: 45, tensionSystolique: 132,
        label: "Diabetique",
        description: "Diabete de type 2 avec tension legerement elevee",
      };
    case "hypertension":
      return {
        tabac: false, diabete: false, antecedents: false,
        cholesterolTotal: 205, cholesterolHDL: 50, tensionSystolique: 155,
        label: "Hypertension",
        description: "Hypertension arterielle stade 1 (155 mmHg)",
      };
    case "cholesterol-eleve":
      return {
        tabac: false, diabete: false, antecedents: false,
        cholesterolTotal: 275, cholesterolHDL: 38, tensionSystolique: 128,
        label: "Cholesterol eleve",
        description: "Hypercholesterolemie avec HDL bas",
      };
  }
}

function parseSlug(slug: string): { sexe: Sexe; age: number; profil: ProfilType } | null {
  const match = slug.match(/^(homme|femme)-(\d+)ans-(sans-facteur|fumeur|diabetique|hypertension|cholesterol-eleve)$/);
  if (!match) return null;
  return {
    sexe: match[1] as Sexe,
    age: parseInt(match[2]),
    profil: match[3] as ProfilType,
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const sexe of SEXES) {
    for (const age of AGES) {
      for (const profil of PROFILS) {
        params.push({ params: `${sexe}-${age}ans-${profil}` });
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

  const { sexe, age, profil } = parsed;
  const config = getProfilConfig(profil);
  const res = calcRisqueCardio(age, sexe, config.cholesterolTotal, config.cholesterolHDL, config.tensionSystolique, config.tabac, config.diabete, config.antecedents);
  const sexeLabel = sexe === "homme" ? "homme" : "femme";
  const profilLabel = config.label.toLowerCase();

  return {
    alternates: { canonical: `/calcul-risque-cardiovasculaire/${slug}` },
    title: `Risque cardiovasculaire ${sexe} ${age} ans ${profilLabel} — ${res.risquePourcentage} a 10 ans`,
    description: `Risque cardiovasculaire a 10 ans pour un ${sexeLabel} de ${age} ans ${profilLabel} : ${res.risquePourcentage} (${config.description}). Score Framingham : ${res.score}/30. Categorie : ${res.categorie}. Calcul gratuit.`,
    keywords: `risque cardiovasculaire ${sexe} ${age} ans, score Framingham ${sexe}, risque cardiaque ${profilLabel}, prevention cardiovasculaire ${age} ans`,
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

  const { sexe, age, profil } = parsed;
  if (!SEXES.includes(sexe) || !AGES.includes(age) || !PROFILS.includes(profil)) {
    notFound();
  }

  const config = getProfilConfig(profil);
  const res = calcRisqueCardio(age, sexe, config.cholesterolTotal, config.cholesterolHDL, config.tensionSystolique, config.tabac, config.diabete, config.antecedents);
  const sexeLabel = sexe === "homme" ? "homme" : "femme";

  // Comparatif selon l'age (meme sexe + profil)
  const comparatifAge = AGES.map((a) => {
    const r = calcRisqueCardio(a, sexe, config.cholesterolTotal, config.cholesterolHDL, config.tensionSystolique, config.tabac, config.diabete, config.antecedents);
    return { age: a, score: r.score, risque: r.risquePourcentage, categorie: r.categorie, isCurrent: a === age };
  });

  // Comparatif selon le profil (meme sexe + age)
  const comparatifProfil = PROFILS.map((p) => {
    const c = getProfilConfig(p);
    const r = calcRisqueCardio(age, sexe, c.cholesterolTotal, c.cholesterolHDL, c.tensionSystolique, c.tabac, c.diabete, c.antecedents);
    return { profil: p, label: c.label, score: r.score, risque: r.risquePourcentage, categorie: r.categorie, isCurrent: p === profil };
  });

  function categorieColor(c: string): string {
    if (c === "faible") return "text-green-600";
    if (c === "modere") return "text-yellow-600";
    if (c === "eleve") return "text-orange-600";
    return "text-red-600";
  }

  function categorieGradient(c: string): string {
    if (c === "faible") return "from-green-500 to-emerald-600";
    if (c === "modere") return "from-yellow-500 to-amber-500";
    if (c === "eleve") return "from-orange-500 to-orange-600";
    return "from-red-600 to-rose-600";
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le risque cardiovasculaire d'un ${sexeLabel} de ${age} ans ${config.label.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${sexeLabel} de ${age} ans avec le profil "${config.label}" (${config.description}), le risque cardiovasculaire a 10 ans est estime a ${res.risquePourcentage} selon le score de Framingham simplifie. Le score obtenu est de ${res.score}/30, ce qui correspond a un risque de categorie "${res.categorie}".`,
        },
      },
      {
        "@type": "Question",
        name: `Comment evolue le risque cardiaque d'un ${sexeLabel} ${config.label.toLowerCase()} selon l'age ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le risque cardiovasculaire augmente avec l'age. Pour un ${sexeLabel} ${config.label.toLowerCase()}, le risque passe de ${comparatifAge[0].risque} a 30 ans a ${comparatifAge[comparatifAge.length - 1].risque} a 70 ans. A ${age} ans, il est de ${res.risquePourcentage}.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelles sont les mesures de prevention pour un ${sexeLabel} de ${age} ans a risque cardiovasculaire ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un ${sexeLabel} de ${age} ans avec un risque cardiovasculaire de categorie "${res.categorie}", les mesures prioritaires sont : ${res.conseils[0]}${res.conseils.length > 1 ? " " + res.conseils[1] : ""}`,
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
        currentPage={`${sexe === "homme" ? "Homme" : "Femme"} ${age} ans — ${config.label}`}
        parentPage="Risque Cardiovasculaire"
        parentHref="/calcul-risque-cardiovasculaire"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ❤️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Risque Cardiovasculaire — {sexe === "homme" ? "Homme" : "Femme"} {age} ans, {config.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-6 ml-[52px]">
        {config.description}. Score Framingham : {res.score}/30 — Risque a 10 ans : {res.risquePourcentage}.
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Disclaimer medical */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <p className="text-xs text-amber-800 font-semibold mb-1">Avertissement medical important</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Cet outil est informatif et ne remplace pas un avis medical. Les estimations sont basees sur un score simplifie et des valeurs de reference. Consultez votre medecin pour une evaluation complete et personnalisee.
        </p>
      </div>

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${categorieGradient(res.categorie)} rounded-2xl p-8 text-white shadow-xl mb-8`}>
        <p className="text-white/80 text-sm font-medium mb-1">
          Risque cardiovasculaire a 10 ans — {sexeLabel}, {age} ans, {config.label}
        </p>
        <p className="text-6xl font-extrabold tracking-tight">{res.risquePourcentage}</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-white/70 text-xs">Score Framingham</p>
            <p className="text-2xl font-bold mt-1">{res.score} / 30</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-white/70 text-xs">Categorie</p>
            <p className="text-xl font-bold mt-1 capitalize">{res.categorie.replace("-", " ")}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 col-span-2 sm:col-span-1">
            <p className="text-white/70 text-xs">Profil</p>
            <p className="text-xl font-bold mt-1">{config.label}</p>
          </div>
        </div>
      </div>

      {/* Comparatif selon l'age */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Evolution du risque selon l&apos;age — {sexe} {config.label}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Score</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Risque 10 ans</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Categorie</th>
              </tr>
            </thead>
            <tbody>
              {comparatifAge.map((row) => (
                <tr
                  key={row.age}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-red-50 font-semibold" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-red-600">{row.age} ans</span>
                    ) : (
                      <a
                        href={`/calcul-risque-cardiovasculaire/${sexe}-${row.age}ans-${profil}`}
                        className="text-slate-700 hover:text-red-600 transition-colors"
                      >
                        {row.age} ans
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-red-600" : "text-slate-700"}`}>
                    {row.score}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${categorieColor(row.categorie)}`}>
                    {row.risque}
                  </td>
                  <td className={`py-2.5 px-2 text-right capitalize hidden sm:table-cell ${categorieColor(row.categorie)}`}>
                    {row.categorie.replace("-", " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparatif selon le profil */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison des profils — {sexe}, {age} ans
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Profil</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Score</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Risque 10 ans</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Categorie</th>
              </tr>
            </thead>
            <tbody>
              {comparatifProfil.map((row) => (
                <tr
                  key={row.profil}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-red-50 font-semibold" : ""}`}
                >
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-red-600">{row.label}</span>
                    ) : (
                      <a
                        href={`/calcul-risque-cardiovasculaire/${sexe}-${age}ans-${row.profil}`}
                        className="text-slate-700 hover:text-red-600 transition-colors"
                      >
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-red-600" : "text-slate-700"}`}>
                    {row.score}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${categorieColor(row.categorie)}`}>
                    {row.risque}
                  </td>
                  <td className={`py-2.5 px-2 text-right capitalize hidden sm:table-cell ${categorieColor(row.categorie)}`}>
                    {row.categorie.replace("-", " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Facteurs de risque */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Analyse des facteurs de risque
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {res.facteurs.map((f) => {
            const border = f.statut === "bon" ? "border-green-200 bg-green-50" : f.statut === "attention" ? "border-yellow-200 bg-yellow-50" : "border-red-200 bg-red-50";
            const badge = f.statut === "bon" ? "bg-green-100 text-green-700" : f.statut === "attention" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
            const badgeLabel = f.statut === "bon" ? "Bon" : f.statut === "attention" ? "A surveiller" : "Risque";
            return (
              <div key={f.nom} className={`rounded-xl border p-4 ${border}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">{f.nom}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge}`}>{badgeLabel}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{f.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conseils */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recommandations</h2>
        <ul className="space-y-3">
          {res.conseils.map((c, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="mt-0.5 w-6 h-6 shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xs">
                {i + 1}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Texte SEO */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Risque cardiovasculaire : {sexe} {age} ans, {config.label}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un{sexe === "femme" ? "e" : ""} <strong>{sexeLabel}</strong> de{" "}
          <strong>{age} ans</strong> avec le profil &quot;{config.label}&quot; ({config.description}),
          le score de Framingham simplifie est de <strong>{res.score} points sur 30</strong>.
          Ce score correspond a un risque cardiovasculaire a 10 ans de{" "}
          <strong>{res.risquePourcentage}</strong>, classe en categorie{" "}
          <strong className={categorieColor(res.categorie)}>{res.categorie.replace("-", " ")}</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ce calcul prend en compte l&apos;age ({age} ans){config.tabac ? ", le tabagisme actif" : ""}{config.diabete ? ", le diabete" : ""}{config.antecedents ? ", les antecedents familiaux" : ""}, le cholesterol total ({config.cholesterolTotal} mg/dL), le HDL ({config.cholesterolHDL} mg/dL) et la tension systolique ({config.tensionSystolique} mmHg).
        </p>
        <p className="text-slate-600 leading-relaxed">
          {res.categorie === "faible"
            ? "Avec ce profil favorable, l'objectif est de maintenir ces bons indicateurs sur le long terme en preservant un mode de vie sain."
            : res.categorie === "modere"
              ? "Un bilan medical et une correction des facteurs modifiables sont recommandes pour prevenir l'evolution vers un risque eleve."
              : "Une consultation medicale est fortement recommandee pour une prise en charge adaptee et une reduction des facteurs de risque."}
        </p>
        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      {/* CTA */}
      <div className="text-center mb-8">
        <a
          href="/calcul-risque-cardiovasculaire"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-200 transition-all"
        >
          Calculer avec mes valeurs reelles
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurRisqueCardio />

      <RelatedCalculators currentSlug="/calcul-risque-cardiovasculaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
