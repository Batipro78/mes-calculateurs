import type { Metadata } from "next";
import CalculClassementTennisFFT from "../CalculClassementTennisFFT";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

// 20 variantes SEO populaires
const VARIANTES = [
  // Classements (12)
  "classement-nc",
  "classement-40",
  "classement-30-5",
  "classement-30-3",
  "classement-30",
  "classement-15-5",
  "classement-15-3",
  "classement-15",
  "classement-5-6",
  "classement-4-6",
  "classement-1-6",
  "classement-0",
  // Progressions (4)
  "progresser-de-nc-a-40",
  "progresser-de-40-a-30",
  "progresser-de-30-a-15",
  "progresser-de-15-a-5",
  // Questions (4)
  "meilleur-classement-amateur-tennis",
  "classement-pro-tennis-fft",
  "bilan-tennis-saison",
  "comment-monter-15-tennis",
];

function parseSlug(slug: string): { type: string; value: string } | null {
  // classement-nc, classement-40, etc.
  if (slug.startsWith("classement-")) {
    return { type: "classement", value: slug.replace("classement-", "") };
  }
  // progresser-de-nc-a-40, etc.
  if (slug.startsWith("progresser-")) {
    return { type: "progression", value: slug };
  }
  // questions
  if (
    slug === "meilleur-classement-amateur-tennis" ||
    slug === "classement-pro-tennis-fft" ||
    slug === "bilan-tennis-saison" ||
    slug === "comment-monter-15-tennis"
  ) {
    return { type: "question", value: slug };
  }
  return null;
}

export function generateStaticParams() {
  return VARIANTES.map(slug => ({ params: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "classement") {
    const classement = parsed.value
      .replace(/-/g, "/")
      .replace(/nc/, "NC")
      .toUpperCase();
    return {
      alternates: { canonical: `/calcul-classement-tennis-fft/${slug}` },
      title: `Classement Tennis FFT ${classement} 2026 - Progression et Bilan`,
      description: `Guide complet classement tennis FFT ${classement}. Comment passer au classement suivant, nombre de victoires requises, adversaires a affronter.`,
      keywords: `classement ${classement} tennis, progresser ${classement}, bilan tennis, points fft`,
    };
  }

  if (parsed.type === "progression") {
    const match = parsed.value.match(/progresser-de-(.+)-a-(.+)/);
    if (match) {
      const [, from, to] = match;
      return {
        alternates: { canonical: `/calcul-classement-tennis-fft/${slug}` },
        title: `Progresser de ${from} à ${to} au Tennis FFT - Guide Complet`,
        description: `Comment progresser de classement ${from} à ${to} en tennis. Nombre de victoires, stratégie, adversaires à affronter, temps estimé.`,
        keywords: `progresser ${from} ${to} tennis, passer ${to}, classement tennis fft`,
      };
    }
  }

  if (parsed.type === "question") {
    const titles: Record<string, string> = {
      "meilleur-classement-amateur-tennis":
        "Quel est le Meilleur Classement Amateur en Tennis ?",
      "classement-pro-tennis-fft":
        "Classement Tennis Professionnel FFT - Comment Devenir Pro",
      "bilan-tennis-saison":
        "Calculer son Bilan de Saison Tennis - Points FFT",
      "comment-monter-15-tennis": "Comment Monter au 15 en Tennis - Guide Complet",
    };
    const descriptions: Record<string, string> = {
      "meilleur-classement-amateur-tennis":
        "Quel est le meilleur classement possible pour un amateur ? De NC à 1, guide complet des niveaux tennis FFT.",
      "classement-pro-tennis-fft":
        "Comprendre le classement professionnel FFT. Différences entre amateur et pro, comment passer pro au tennis.",
      "bilan-tennis-saison":
        "Calculer votre bilan de saison tennis selon V-E-2I-5G. Estimer votre progression FFT.",
      "comment-monter-15-tennis":
        "Combien de temps pour passer au 15 en tennis ? Stratégie, entrainement, adversaires.",
    };
    return {
      alternates: { canonical: `/calcul-classement-tennis-fft/${slug}` },
      title: titles[parsed.value] || "Classement Tennis FFT",
      description: descriptions[parsed.value] || "Guide classement tennis",
      keywords: `tennis, classement fft, ${parsed.value.replace(/-/g, " ")}`,
    };
  }

  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  let title = "";
  let description = "";
  let content = "";

  if (parsed.type === "classement") {
    const classement = parsed.value
      .replace(/-/g, "/")
      .replace(/nc/, "NC")
      .toUpperCase();
    title = `Classement Tennis ${classement}`;
    description = `Guide complet du classement ${classement} en tennis FFT. Progression, points, adversaires à affronter.`;

    content = `Ce classement correspond à un niveau ${classement === "NC" ? "débutant" : classement === "40" ? "confirmé" : classement === "30" || classement === "30/5" ? "bon amateur" : classement === "15" || classement === "15/5" ? "très bon amateur" : "d'élite"} en tennis français.`;
  } else if (parsed.type === "progression") {
    const match = parsed.value.match(/progresser-de-(.+)-a-(.+)/);
    if (match) {
      const [, from, to] = match;
      title = `Progresser de ${from.replace(/-/g, "/")} à ${to.replace(/-/g, "/")}`;
      description = `Comment passer du classement ${from} au ${to} en tennis. Nombre de victoires requises, temps estimé.`;
      content = `Pour progresser, vous devez accumuler des victoires, particulièrement contre des joueurs mieux classés. Consultez votre bilan annuel sur l'espace licencié FFT pour suivre votre progression.`;
    }
  } else if (parsed.type === "question") {
    const titles: Record<string, string> = {
      "meilleur-classement-amateur-tennis":
        "Quel est le Meilleur Classement Amateur en Tennis ?",
      "classement-pro-tennis-fft":
        "Classement Tennis Professionnel FFT - Devenir Pro",
      "bilan-tennis-saison": "Calculer son Bilan de Saison Tennis",
      "comment-monter-15-tennis": "Comment Monter au 15 en Tennis",
    };
    const contents: Record<string, string> = {
      "meilleur-classement-amateur-tennis":
        "Le meilleur classement amateur en tennis FFT va de 1 à 100 (élite). Très peu d'amateurs atteignent ces niveaux. La majorité reste entre 40 et 15.",
      "classement-pro-tennis-fft":
        "Les classements professionnels (ATP, WTA) sont différents du système FFT. Pour devenir pro, il faut franchir les niveaux amateurs FFT et accéder au circuit international.",
      "bilan-tennis-saison":
        "Le bilan de saison utilise la formule V-E-2I-5G : victoires, égalités, 2 items (défaites), et 5 gold wins. Votre progression dépend de ce bilan.",
      "comment-monter-15-tennis":
        "Pour passer au 15 depuis 30/5, comptez 3-6 mois intensifs. Il faut 5-7 victoires coup sur coup, idéalement contre 30/2 ou 30/1.",
    };
    title = titles[parsed.value] || "Classement Tennis FFT";
    content = contents[parsed.value] || "";
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: title,
        acceptedAnswer: {
          "@type": "Answer",
          text: content,
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
        currentPage={title}
        parentPage="Calcul Classement Tennis FFT"
        parentHref="/calcul-classement-tennis-fft"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{title}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{description}</p>

      {/* Contenu */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8">
        <p className="text-slate-600 leading-relaxed mb-6">{content}</p>
        <p className="text-sm text-slate-500 italic">
          Utilisez le calculateur ci-dessous pour estimer votre progression selon vos victoires et défaites.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Affiner votre calcul
      </h2>
      <CalculClassementTennisFFT />


      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h2 className="text-lg font-bold text-blue-900 mb-3">📊 À savoir</h2>
        <p className="text-sm text-blue-800 leading-relaxed">
          Le classement officiel FFT dépend aussi du calendrier annuel et d&apos;autres critères internes. Ce calculateur vous aide à estimer votre progression basée sur le bilan V-E-2I-5G. Pour un classement 100% officiel, consultez l&apos;espace licencié FFT.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-classement-tennis-fft" />
    </div>
  );
}
