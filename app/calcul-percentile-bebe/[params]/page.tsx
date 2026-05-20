import type { Metadata } from "next";
import CalculPercentileBebe from "../CalculPercentileBebe";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerPercentile, getMediane, type Sexe } from "../percentileBebeCalc";

interface Variante {
  slug: string;
  titre: string;
  sexe: Sexe;
  ageMois: number;
  poids: number;
  taille: number;
  contexte: string;
}

const VARIANTES: Variante[] = [
  {
    slug: "percentile-garcon-3-mois",
    titre: "Percentile d'un garçon de 3 mois",
    sexe: "garcon",
    ageMois: 3,
    poids: 6.4,
    taille: 61.4,
    contexte: "Bébé garçon à la médiane à 3 mois (OMS)",
  },
  {
    slug: "percentile-fille-3-mois",
    titre: "Percentile d'une fille de 3 mois",
    sexe: "fille",
    ageMois: 3,
    poids: 5.8,
    taille: 59.8,
    contexte: "Bébé fille à la médiane à 3 mois (OMS)",
  },
  {
    slug: "percentile-garcon-6-mois",
    titre: "Percentile d'un garçon de 6 mois",
    sexe: "garcon",
    ageMois: 6,
    poids: 7.9,
    taille: 67.6,
    contexte: "Bébé garçon à la médiane à 6 mois",
  },
  {
    slug: "percentile-fille-6-mois",
    titre: "Percentile d'une fille de 6 mois",
    sexe: "fille",
    ageMois: 6,
    poids: 7.3,
    taille: 65.7,
    contexte: "Bébé fille à la médiane à 6 mois",
  },
  {
    slug: "percentile-garcon-9-mois",
    titre: "Percentile d'un garçon de 9 mois",
    sexe: "garcon",
    ageMois: 9,
    poids: 8.9,
    taille: 72.0,
    contexte: "Bébé garçon à la médiane à 9 mois",
  },
  {
    slug: "percentile-fille-9-mois",
    titre: "Percentile d'une fille de 9 mois",
    sexe: "fille",
    ageMois: 9,
    poids: 8.2,
    taille: 70.1,
    contexte: "Bébé fille à la médiane à 9 mois",
  },
  {
    slug: "percentile-garcon-12-mois",
    titre: "Percentile d'un garçon de 12 mois",
    sexe: "garcon",
    ageMois: 12,
    poids: 9.6,
    taille: 75.7,
    contexte: "Bébé garçon à la médiane à 1 an",
  },
  {
    slug: "percentile-fille-12-mois",
    titre: "Percentile d'une fille de 12 mois",
    sexe: "fille",
    ageMois: 12,
    poids: 8.9,
    taille: 74.0,
    contexte: "Bébé fille à la médiane à 1 an",
  },
  {
    slug: "percentile-garcon-18-mois",
    titre: "Percentile d'un garçon de 18 mois",
    sexe: "garcon",
    ageMois: 18,
    poids: 10.9,
    taille: 82.3,
    contexte: "Bébé garçon à la médiane à 18 mois",
  },
  {
    slug: "percentile-fille-18-mois",
    titre: "Percentile d'une fille de 18 mois",
    sexe: "fille",
    ageMois: 18,
    poids: 10.2,
    taille: 80.7,
    contexte: "Bébé fille à la médiane à 18 mois",
  },
  {
    slug: "percentile-garcon-24-mois",
    titre: "Percentile d'un garçon de 24 mois",
    sexe: "garcon",
    ageMois: 24,
    poids: 12.2,
    taille: 87.8,
    contexte: "Bébé garçon à la médiane à 2 ans",
  },
  {
    slug: "percentile-fille-24-mois",
    titre: "Percentile d'une fille de 24 mois",
    sexe: "fille",
    ageMois: 24,
    poids: 11.5,
    taille: 86.4,
    contexte: "Bébé fille à la médiane à 2 ans",
  },
  {
    slug: "percentile-naissance-garcon",
    titre: "Percentile d'un garçon à la naissance",
    sexe: "garcon",
    ageMois: 0,
    poids: 3.35,
    taille: 49.9,
    contexte: "Nouveau-né garçon à la médiane (OMS)",
  },
  {
    slug: "percentile-naissance-fille",
    titre: "Percentile d'une fille à la naissance",
    sexe: "fille",
    ageMois: 0,
    poids: 3.23,
    taille: 49.1,
    contexte: "Nouveau-né fille à la médiane (OMS)",
  },
  {
    slug: "bebe-grand-percentile-90",
    titre: "Bébé au P90 (grand pour son âge)",
    sexe: "garcon",
    ageMois: 6,
    poids: 9.0,
    taille: 70.5,
    contexte: "Bébé garçon de 6 mois autour du P90",
  },
  {
    slug: "bebe-petit-percentile-10",
    titre: "Bébé au P10 (petit pour son âge)",
    sexe: "fille",
    ageMois: 6,
    poids: 6.5,
    taille: 63.5,
    contexte: "Bébé fille de 6 mois autour du P10",
  },
];

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

  const res = calculerPercentile(v.sexe, v.ageMois, v.poids, v.taille);

  return {
    alternates: { canonical: `/calcul-percentile-bebe/${slug}` },
    title: `${v.titre} - Poids P${res.percentilePoids.toFixed(0)} Taille P${res.percentileTaille.toFixed(0)}`,
    description: `${v.titre} : ${v.poids} kg, ${v.taille} cm. Percentile poids P${res.percentilePoids.toFixed(0)}, percentile taille P${res.percentileTaille.toFixed(0)} selon les courbes OMS 2006.`,
    keywords: `${v.titre.toLowerCase()}, percentile bebe ${v.ageMois} mois, courbe OMS ${v.sexe}, poids taille bebe`,
    openGraph: {
      title: v.titre,
      description: `Percentile selon les courbes OMS 2006 pour ${v.poids} kg et ${v.taille} cm à ${v.ageMois} mois.`,
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

  const res = calculerPercentile(v.sexe, v.ageMois, v.poids, v.taille);
  const mediane = getMediane(v.sexe, v.ageMois);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel percentile pour ${v.poids} kg et ${v.taille} cm à ${v.ageMois} mois ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Selon les courbes OMS 2006, un bébé ${v.sexe === "garcon" ? "garçon" : "fille"} de ${v.ageMois} mois pesant ${v.poids} kg et mesurant ${v.taille} cm se situe au percentile poids P${res.percentilePoids.toFixed(0)} et au percentile taille P${res.percentileTaille.toFixed(0)}.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle est la médiane à ${v.ageMois} mois pour un ${v.sexe === "garcon" ? "garçon" : "fille"} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `À ${v.ageMois} mois, la médiane OMS pour un ${v.sexe === "garcon" ? "garçon" : "fille"} est de ${mediane.poids} kg et ${mediane.taille} cm. C'est la valeur du percentile P50.`,
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
        parentPage="Percentile Bébé"
        parentHref="/calcul-percentile-bebe"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👶
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{v.titre}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{v.contexte}.</p>

      <section className="mb-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Résultat pour ce profil
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
            <p className="text-xs text-pink-700 font-medium">Percentile Poids</p>
            <p className="text-3xl font-bold text-pink-900 mt-1">
              P{res.percentilePoids.toFixed(0)}
            </p>
            <p className="text-xs text-pink-700 mt-1">
              {v.poids} kg • Médiane : {mediane.poids} kg
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-blue-700 font-medium">Percentile Taille</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">
              P{res.percentileTaille.toFixed(0)}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {v.taille} cm • Médiane : {mediane.taille} cm
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700">Sexe</span>
            <span className="font-semibold text-slate-800">
              {v.sexe === "garcon" ? "Garçon" : "Fille"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Âge</span>
            <span className="font-semibold text-slate-800">{v.ageMois} mois</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">IMC bébé</span>
            <span className="font-semibold text-slate-800">{res.imc} kg/m²</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Catégorie poids</span>
            <span className="font-semibold text-slate-800">{res.categoriePoids}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Catégorie taille</span>
            <span className="font-semibold text-slate-800">{res.categorieTaille}</span>
          </div>
        </div>
      </section>

      <CalculPercentileBebe />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres profils à explorer
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {VARIANTES.filter((x) => x.slug !== v.slug)
            .slice(0, 6)
            .map((autre) => (
              <a
                key={autre.slug}
                href={`/calcul-percentile-bebe/${autre.slug}`}
                className="block p-3 rounded-lg border border-slate-200 hover:border-pink-400 hover:bg-pink-50 transition"
              >
                <p className="font-semibold text-slate-800 text-sm">
                  {autre.titre}
                </p>
                <p className="text-xs text-slate-500 mt-1">{autre.contexte}</p>
              </a>
            ))}
        </div>
      </section>

      <div className="mt-8 bg-amber-50 border-2 border-amber-300 rounded-lg p-4 text-sm text-amber-900">
        <p className="font-bold mb-2">⚕️ Avertissement médical</p>
        <p>
          Cet outil est informatif. Seul un pédiatre peut interpréter la
          croissance globale de votre bébé. <strong>Sources :</strong> WHO
          Multicentre Growth Reference Study 2006.
        </p>
      </div>

      <RelatedCalculators currentSlug="/calcul-percentile-bebe" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
