import type { Metadata } from "next";
import CalculDetteSommeil from "../CalculDetteSommeil";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface Variante {
  slug: string;
  titre: string;
  description: string;
  besoinIdeal: number;
  moyenneActuelle: number;
  jours: number;
  contexte: string;
}

const VARIANTES: Variante[] = [
  {
    slug: "dormir-5h-par-nuit-7-jours",
    titre: "Dormir 5h par nuit pendant 7 jours",
    description: "Évaluation de la dette de sommeil après une semaine à 5h de sommeil par nuit (besoin de 8h).",
    besoinIdeal: 8,
    moyenneActuelle: 5,
    jours: 7,
    contexte: "Très courte durée de sommeil sur une semaine complète",
  },
  {
    slug: "dormir-6h-par-nuit-7-jours",
    titre: "Dormir 6h par nuit pendant 7 jours",
    description: "Calcul de la dette de sommeil quand on dort 6h par nuit pendant une semaine (besoin de 8h).",
    besoinIdeal: 8,
    moyenneActuelle: 6,
    jours: 7,
    contexte: "Sommeil court fréquent chez les actifs",
  },
  {
    slug: "dormir-7h-par-nuit-7-jours",
    titre: "Dormir 7h par nuit pendant 7 jours",
    description: "Vérifiez si dormir 7h par nuit suffit selon votre besoin idéal de 8h sur une semaine.",
    besoinIdeal: 8,
    moyenneActuelle: 7,
    jours: 7,
    contexte: "Sommeil légèrement insuffisant",
  },
  {
    slug: "dormir-5h-par-nuit-14-jours",
    titre: "Dormir 5h par nuit pendant 14 jours",
    description: "Dette de sommeil accumulée après 2 semaines à 5h par nuit (besoin de 8h).",
    besoinIdeal: 8,
    moyenneActuelle: 5,
    jours: 14,
    contexte: "Sommeil très insuffisant sur 2 semaines",
  },
  {
    slug: "dormir-6h-par-nuit-14-jours",
    titre: "Dormir 6h par nuit pendant 14 jours",
    description: "Calcul de la dette de sommeil sur 2 semaines à 6h par nuit (besoin de 8h).",
    besoinIdeal: 8,
    moyenneActuelle: 6,
    jours: 14,
    contexte: "Sommeil court soutenu sur 2 semaines",
  },
  {
    slug: "dette-sommeil-semaine-charge",
    titre: "Dette de sommeil après une semaine chargée",
    description: "Simulation d'une semaine de stress professionnel avec variations de sommeil (5-7h).",
    besoinIdeal: 8,
    moyenneActuelle: 6,
    jours: 7,
    contexte: "Semaine pro intense, sommeil variable",
  },
  {
    slug: "dette-sommeil-jeune-parent",
    titre: "Dette de sommeil d'un jeune parent",
    description: "Estimation de la dette de sommeil pour un parent d'un nouveau-né (4-6h par nuit).",
    besoinIdeal: 8,
    moyenneActuelle: 5,
    jours: 14,
    contexte: "Sommeil fractionné post-naissance",
  },
  {
    slug: "dette-sommeil-etudiant-examens",
    titre: "Dette de sommeil pendant les examens",
    description: "Calcul de la dette pour un étudiant en révision (5-6h par nuit sur 2 semaines).",
    besoinIdeal: 8,
    moyenneActuelle: 5.5,
    jours: 14,
    contexte: "Période de révisions intensives",
  },
  {
    slug: "dette-sommeil-travailleur-nuit",
    titre: "Dette de sommeil travailleur de nuit",
    description: "Évaluation pour un travailleur posté de nuit qui dort 5-6h en journée.",
    besoinIdeal: 8,
    moyenneActuelle: 5.5,
    jours: 7,
    contexte: "Sommeil diurne fragmenté",
  },
  {
    slug: "dormir-4h-par-nuit-7-jours",
    titre: "Dormir 4h par nuit pendant 7 jours",
    description: "Dette de sommeil sévère après une semaine à seulement 4h par nuit.",
    besoinIdeal: 8,
    moyenneActuelle: 4,
    jours: 7,
    contexte: "Privation sévère de sommeil",
  },
  {
    slug: "besoin-9h-dormir-7h-7-jours",
    titre: "Besoin 9h, dormir 7h par nuit pendant 7 jours",
    description: "Si vous avez besoin de 9h de sommeil mais ne dormez que 7h, voici la dette accumulée.",
    besoinIdeal: 9,
    moyenneActuelle: 7,
    jours: 7,
    contexte: "Gros dormeur en sous-régime",
  },
  {
    slug: "besoin-7h-dormir-5h-7-jours",
    titre: "Besoin 7h, dormir 5h par nuit pendant 7 jours",
    description: "Calcul de la dette si votre besoin est de 7h et que vous ne dormez que 5h.",
    besoinIdeal: 7,
    moyenneActuelle: 5,
    jours: 7,
    contexte: "Petit dormeur en privation",
  },
  {
    slug: "dette-sommeil-10-jours",
    titre: "Dette de sommeil sur 10 jours",
    description: "Évaluation cumulée sur 10 jours avec une moyenne de 6h par nuit (besoin de 8h).",
    besoinIdeal: 8,
    moyenneActuelle: 6,
    jours: 10,
    contexte: "Période moyenne d'observation",
  },
  {
    slug: "dette-sommeil-12-jours",
    titre: "Dette de sommeil sur 12 jours",
    description: "Dette accumulée sur 12 jours à 6h de sommeil par nuit (besoin 8h).",
    besoinIdeal: 8,
    moyenneActuelle: 6,
    jours: 12,
    contexte: "Suivi prolongé du sommeil",
  },
  {
    slug: "rattraper-dette-sommeil-weekend",
    titre: "Rattraper la dette de sommeil le week-end",
    description: "Comment récupérer une dette accumulée en semaine avec un rattrapage le week-end.",
    besoinIdeal: 8,
    moyenneActuelle: 6.5,
    jours: 7,
    contexte: "Récupération hebdomadaire",
  },
  {
    slug: "sieste-20-minutes-recuperation",
    titre: "Sieste 20 minutes et récupération du sommeil",
    description: "Impact d'une sieste de 20 min sur la dette de sommeil légère à modérée.",
    besoinIdeal: 8,
    moyenneActuelle: 6.5,
    jours: 7,
    contexte: "Stratégie de sieste réparatrice",
  },
];

function calculDette(v: Variante) {
  const total = v.moyenneActuelle * v.jours;
  const ideal = v.besoinIdeal * v.jours;
  const dette = Math.max(0, ideal - total);
  return {
    total: Math.round(total * 10) / 10,
    ideal,
    dette: Math.round(dette * 10) / 10,
  };
}

function niveauDette(dette: number): { label: string; emoji: string; color: string } {
  if (dette <= 0) return { label: "Pas de dette", emoji: "✅", color: "green" };
  if (dette < 5) return { label: "Dette légère", emoji: "😴", color: "yellow" };
  if (dette <= 10) return { label: "Dette modérée", emoji: "😪", color: "orange" };
  return { label: "Dette sévère", emoji: "⚠️", color: "red" };
}

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const v = VARIANTES.find((x) => x.slug === slug);
  if (!v) return {};

  const calc = calculDette(v);

  return {
    alternates: { canonical: `/calcul-dette-sommeil/${slug}` },
    title: `${v.titre} - Dette ${calc.dette}h`,
    description: `${v.description} Dette calculée : ${calc.dette}h. ${v.contexte}.`,
    keywords: `${v.titre.toLowerCase()}, dette sommeil, ${v.moyenneActuelle}h par nuit, ${v.jours} jours`,
    openGraph: {
      title: v.titre,
      description: v.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const v = VARIANTES.find((x) => x.slug === slug);
  if (!v) notFound();

  const calc = calculDette(v);
  const niveau = niveauDette(calc.dette);
  const colorMap: Record<string, string> = {
    green: "bg-green-50 border-green-200 text-green-900",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
    orange: "bg-orange-50 border-orange-200 text-orange-900",
    red: "bg-red-50 border-red-200 text-red-900",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle dette de sommeil pour ${v.moyenneActuelle}h par nuit sur ${v.jours} jours ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec un besoin de ${v.besoinIdeal}h et ${v.moyenneActuelle}h dormies par nuit pendant ${v.jours} jours, la dette de sommeil cumulée est de ${calc.dette}h, soit un niveau ${niveau.label.toLowerCase()}.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment récupérer cette dette ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: calc.dette < 5
            ? "Une dette légère se rattrape en 1 à 2 nuits de sommeil prolongé ou par des siestes courtes de 20 minutes."
            : calc.dette <= 10
              ? "Une dette modérée demande 1 à 2 semaines de récupération avec week-ends prolongés (+1 à 2h) et siestes courtes."
              : "Une dette sévère nécessite plusieurs semaines de récupération et un avis médical recommandé.",
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
        currentPage={v.titre}
        parentPage="Dette de Sommeil"
        parentHref="/calcul-dette-sommeil"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          😴
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{v.titre}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{v.description}</p>

      <section className="mb-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Résultat pour ce scénario
        </h2>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <p className="text-xs text-indigo-700 font-medium">Besoin total</p>
            <p className="text-2xl font-bold text-indigo-900 mt-1">{calc.ideal}h</p>
            <p className="text-xs text-indigo-700">{v.besoinIdeal}h × {v.jours} jours</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-700 font-medium">Dormi total</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{calc.total}h</p>
            <p className="text-xs text-slate-700">{v.moyenneActuelle}h × {v.jours} jours</p>
          </div>
          <div className={`rounded-lg p-4 border-2 ${colorMap[niveau.color]}`}>
            <p className="text-xs font-medium">Dette</p>
            <p className="text-2xl font-bold mt-1">
              {niveau.emoji} {calc.dette}h
            </p>
            <p className="text-xs">{niveau.label}</p>
          </div>
        </div>

        <p className="text-sm text-slate-600">
          <strong>Contexte :</strong> {v.contexte}.
        </p>
      </section>

      <CalculDetteSommeil />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres scénarios à explorer
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {VARIANTES.filter((x) => x.slug !== v.slug)
            .slice(0, 6)
            .map((autre) => (
              <a
                key={autre.slug}
                href={`/calcul-dette-sommeil/${autre.slug}`}
                className="block p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition"
              >
                <p className="font-semibold text-slate-800 text-sm">
                  {autre.titre}
                </p>
                <p className="text-xs text-slate-500 mt-1">{autre.contexte}</p>
              </a>
            ))}
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Sources :</strong> American Academy of Sleep Medicine (AASM),
          INSERM. Ce calcul est indicatif et ne remplace pas un avis médical.
        </p>
      </div>

      <RelatedCalculators currentSlug="/calcul-dette-sommeil" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
