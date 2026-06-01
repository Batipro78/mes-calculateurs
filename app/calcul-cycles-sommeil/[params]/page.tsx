import type { Metadata } from "next";
import CalculCyclesSommeil from "../CalculCyclesSommeil";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  calculerCyclesSommeil,
  formatDuree,
  DUREE_ENDORMISSEMENT_MINUTES,
  type ModeCalcul,
} from "../cyclesSommeilCalc";

interface VarianteInfo {
  slug: string;
  mode: ModeCalcul;
  heure: string;
  titre: string;
  description: string;
}

// 16 variantes : 8 heures de reveil + 8 heures d'endormissement
const VARIANTES: VarianteInfo[] = [
  // Reveil
  {
    slug: "reveil-6h",
    mode: "reveil",
    heure: "06:00",
    titre: "Se reveiller a 6h",
    description: "Heure de coucher ideale pour se reveiller a 6h00 du matin",
  },
  {
    slug: "reveil-6h30",
    mode: "reveil",
    heure: "06:30",
    titre: "Se reveiller a 6h30",
    description: "Heure de coucher ideale pour se reveiller a 6h30",
  },
  {
    slug: "reveil-7h",
    mode: "reveil",
    heure: "07:00",
    titre: "Se reveiller a 7h",
    description: "Heure de coucher ideale pour se reveiller a 7h00",
  },
  {
    slug: "reveil-7h30",
    mode: "reveil",
    heure: "07:30",
    titre: "Se reveiller a 7h30",
    description: "Heure de coucher ideale pour se reveiller a 7h30",
  },
  {
    slug: "reveil-8h",
    mode: "reveil",
    heure: "08:00",
    titre: "Se reveiller a 8h",
    description: "Heure de coucher ideale pour se reveiller a 8h00",
  },
  {
    slug: "reveil-8h30",
    mode: "reveil",
    heure: "08:30",
    titre: "Se reveiller a 8h30",
    description: "Heure de coucher ideale pour se reveiller a 8h30",
  },
  {
    slug: "reveil-5h30",
    mode: "reveil",
    heure: "05:30",
    titre: "Se reveiller a 5h30",
    description: "Heure de coucher ideale pour un reveil matinal a 5h30",
  },
  {
    slug: "reveil-9h",
    mode: "reveil",
    heure: "09:00",
    titre: "Se reveiller a 9h",
    description: "Heure de coucher ideale pour un reveil tardif a 9h00",
  },
  // Endormissement
  {
    slug: "coucher-22h",
    mode: "endormissement",
    heure: "22:00",
    titre: "Se coucher a 22h",
    description: "Heure de reveil ideale si vous vous endormez a 22h00",
  },
  {
    slug: "coucher-22h30",
    mode: "endormissement",
    heure: "22:30",
    titre: "Se coucher a 22h30",
    description: "Heure de reveil ideale si vous vous endormez a 22h30",
  },
  {
    slug: "coucher-23h",
    mode: "endormissement",
    heure: "23:00",
    titre: "Se coucher a 23h",
    description: "Heure de reveil ideale si vous vous endormez a 23h00",
  },
  {
    slug: "coucher-23h30",
    mode: "endormissement",
    heure: "23:30",
    titre: "Se coucher a 23h30",
    description: "Heure de reveil ideale si vous vous endormez a 23h30",
  },
  {
    slug: "coucher-minuit",
    mode: "endormissement",
    heure: "00:00",
    titre: "Se coucher a minuit",
    description: "Heure de reveil ideale si vous vous endormez a minuit",
  },
  {
    slug: "coucher-1h",
    mode: "endormissement",
    heure: "01:00",
    titre: "Se coucher a 1h",
    description: "Heure de reveil ideale si vous vous endormez a 1h du matin",
  },
  {
    slug: "coucher-21h",
    mode: "endormissement",
    heure: "21:00",
    titre: "Se coucher a 21h",
    description: "Heure de reveil ideale si vous vous endormez tot a 21h00",
  },
  {
    slug: "coucher-21h30",
    mode: "endormissement",
    heure: "21:30",
    titre: "Se coucher a 21h30",
    description: "Heure de reveil ideale si vous vous endormez a 21h30",
  },
];

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

function getVariante(slug: string): VarianteInfo | null {
  return VARIANTES.find((v) => v.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const v = getVariante(slug);
  if (!v) return {};

  const resultat = calculerCyclesSommeil(v.mode, v.heure, true);
  const propOptimale = resultat?.propositions.find((p) => p.cycles === 5);

  let metaDesc = v.description;
  if (propOptimale) {
    if (v.mode === "reveil") {
      metaDesc = `Pour vous reveiller a ${v.heure}, couchez-vous a ${propOptimale.heure} (5 cycles, 7h30 de sommeil). Calcul base sur cycles de 90 min INSERM.`;
    } else {
      metaDesc = `Si vous vous endormez a ${v.heure}, reveillez-vous a ${propOptimale.heure} pour 5 cycles complets (7h30). Methode INSERM National Sleep Foundation.`;
    }
  }

  return {
    alternates: { canonical: `/calcul-cycles-sommeil/${slug}` },
    title: `${v.titre} : a quelle heure ${v.mode === "reveil" ? "se coucher" : "se reveiller"} ?`,
    description: metaDesc,
    keywords: `${v.titre.toLowerCase()}, heure ${v.mode === "reveil" ? "coucher" : "reveil"}, cycles sommeil ${v.heure}, dormir cycle 90 min`,
    openGraph: {
      title: v.titre,
      description: metaDesc,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const v = getVariante(slug);
  if (!v) notFound();

  const resultat = calculerCyclesSommeil(v.mode, v.heure, true);
  if (!resultat) notFound();

  const propositionsAffichables = resultat!.propositions.filter(
    (p) => p.cycles >= 4 && p.cycles <= 6
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${v.titre} : a quelle heure ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${v.mode === "reveil" ? `vous reveiller a ${v.heure}` : `un endormissement a ${v.heure}`}, voici les ${v.mode === "reveil" ? "heures de coucher" : "heures de reveil"} optimales : ${propositionsAffichables.map((p) => `${p.heure} (${formatDuree(p.dureeSommeilMinutes)}, ${p.cycles} cycles)`).join(" ; ")}. Le temps moyen pour s'endormir (${DUREE_ENDORMISSEMENT_MINUTES} min) est inclus.`,
        }
      },
      {
        "@type": "Question",
        name: "Pourquoi viser un multiple de 90 minutes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Se reveiller en fin de cycle de sommeil (et non en plein sommeil profond) reduit l'inertie matinale. Un cycle dure environ 90 min et alterne sommeil leger, sommeil profond et sommeil paradoxal (REM).",
        }
      },
      {
        "@type": "Question",
        name: "Combien d'heures de sommeil sont recommandees ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La National Sleep Foundation recommande 7 a 9 heures pour un adulte, soit 5 cycles (7h30) en moyenne.",
        }
      }
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={v.titre}
        parentPage="Cycles de Sommeil"
        parentHref="/calcul-cycles-sommeil"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {v.mode === "reveil" ? "⏰" : "🌙"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {v.titre} :{" "}
          {v.mode === "reveil"
            ? "heure de coucher ideale"
            : "heure de reveil ideale"}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{v.description}</p>

      {/* Tableau resume au-dessus du calc */}
      <section className="mb-8 bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {v.mode === "reveil" ? "Heures de coucher conseillees" : "Heures de reveil ideales"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {propositionsAffichables.map((p) => (
            <div
              key={p.cycles}
              className={`rounded-xl p-4 border ${
                p.cycles === 5
                  ? "bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <p className="text-3xl font-bold text-slate-800">{p.heure}</p>
              <p className="text-sm text-slate-700 font-medium mt-1">
                {p.cycles} cycles
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {formatDuree(p.dureeSommeilMinutes)} de sommeil
              </p>
              {p.cycles === 5 && (
                <p className="text-xs text-indigo-700 font-semibold mt-2">
                  RECOMMANDE
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Calcul base sur cycles de 90 min + {DUREE_ENDORMISSEMENT_MINUTES} min
          de latence d&apos;endormissement (moyenne INSERM).
        </p>
      </section>

      <CalculCyclesSommeil />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Detail du calcul pour {v.heure}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {v.mode === "reveil"
            ? `Pour vous reveiller a ${v.heure}, le calculateur retranche, depuis ${v.heure} :`
            : `Si vous vous endormez a ${v.heure}, le calculateur ajoute, a partir de ${v.heure} :`}
        </p>
        <ul className="text-slate-600 space-y-2 ml-4 list-disc">
          <li>
            Un nombre de cycles complets (1 cycle = 90 minutes), soit{" "}
            <strong>
              {propositionsAffichables.map((p) => `${p.cycles} cycles = ${formatDuree(p.dureeSommeilMinutes)}`).join(", ")}
            </strong>
            .
          </li>
          <li>
            {DUREE_ENDORMISSEMENT_MINUTES} min de latence d&apos;endormissement
            (moyenne adulte selon l&apos;INSERM).
          </li>
        </ul>
        <p className="text-slate-600 leading-relaxed mt-4">
          La proposition <strong>5 cycles (7h30 de sommeil)</strong> correspond
          au sommeil optimal recommande par la National Sleep Foundation pour un
          adulte de 18 a 64 ans.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres horaires similaires
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {VARIANTES.filter((other) => other.slug !== v.slug && other.mode === v.mode)
            .slice(0, 6)
            .map((other) => (
              <a
                key={other.slug}
                href={`/calcul-cycles-sommeil/${other.slug}`}
                className="block p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition"
              >
                <strong>{other.titre}</strong>
                <p className="text-xs text-slate-500 mt-1">{other.description}</p>
              </a>
            ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-cycles-sommeil" />
    </div>
  );
}
