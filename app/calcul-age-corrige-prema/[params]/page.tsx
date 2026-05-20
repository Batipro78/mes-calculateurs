import type { Metadata } from "next";
import CalculAgeCorrigePrema from "../CalculAgeCorrigePrema";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface Variante {
  saNaissance: number;
  ageReelMois: number;
  nomSlug: string;
}

const VARIANTES: Variante[] = [
  { saNaissance: 24, ageReelMois: 6, nomSlug: "ne-a-24sa-6-mois" },
  { saNaissance: 25, ageReelMois: 12, nomSlug: "ne-a-25sa-12-mois" },
  { saNaissance: 26, ageReelMois: 6, nomSlug: "ne-a-26sa-6-mois" },
  { saNaissance: 27, ageReelMois: 12, nomSlug: "ne-a-27sa-12-mois" },
  { saNaissance: 28, ageReelMois: 6, nomSlug: "ne-a-28sa-6-mois" },
  { saNaissance: 28, ageReelMois: 18, nomSlug: "ne-a-28sa-18-mois" },
  { saNaissance: 29, ageReelMois: 9, nomSlug: "ne-a-29sa-9-mois" },
  { saNaissance: 30, ageReelMois: 6, nomSlug: "ne-a-30sa-6-mois" },
  { saNaissance: 30, ageReelMois: 12, nomSlug: "ne-a-30sa-12-mois" },
  { saNaissance: 31, ageReelMois: 6, nomSlug: "ne-a-31sa-6-mois" },
  { saNaissance: 32, ageReelMois: 6, nomSlug: "ne-a-32sa-6-mois" },
  { saNaissance: 32, ageReelMois: 12, nomSlug: "ne-a-32sa-12-mois" },
  { saNaissance: 33, ageReelMois: 6, nomSlug: "ne-a-33sa-6-mois" },
  { saNaissance: 34, ageReelMois: 6, nomSlug: "ne-a-34sa-6-mois" },
  { saNaissance: 34, ageReelMois: 12, nomSlug: "ne-a-34sa-12-mois" },
  { saNaissance: 35, ageReelMois: 6, nomSlug: "ne-a-35sa-6-mois" },
  { saNaissance: 36, ageReelMois: 6, nomSlug: "ne-a-36sa-6-mois" },
  { saNaissance: 36, ageReelMois: 12, nomSlug: "ne-a-36sa-12-mois" },
];

function getNiveau(sa: number): string {
  if (sa < 28) return "extreme prematurite";
  if (sa < 32) return "grande prematurite";
  if (sa < 34) return "prematurite moyenne";
  if (sa < 37) return "prematurite tardive";
  return "ne a terme";
}

function getDescriptionNiveau(sa: number): string {
  if (sa < 28) return "Suivi neonatal intensif requis, correction jusqu'a 24 mois.";
  if (sa < 32) return "Hospitalisation en neonatologie, correction jusqu'a 24 mois.";
  if (sa < 34) return "Risque modere, correction jusqu'a 18 mois.";
  if (sa < 37) return "Surveillance recommandee, correction jusqu'a 12 mois.";
  return "Pas de correction necessaire.";
}

function parseSlug(slug: string): Variante | null {
  return VARIANTES.find((v) => v.nomSlug === slug) || null;
}

function calculAgeCorrigeMois(sa: number, ageReelMois: number): number {
  const semainesPrematurite = 40 - sa;
  const ageReelSemaines = ageReelMois * 4.345;
  const ageCorrigeSemaines = Math.max(0, ageReelSemaines - semainesPrematurite);
  return Math.round((ageCorrigeSemaines / 4.345) * 10) / 10;
}

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.nomSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const ageCorrigeMois = calculAgeCorrigeMois(parsed.saNaissance, parsed.ageReelMois);
  const niveau = getNiveau(parsed.saNaissance);

  return {
    alternates: { canonical: `/calcul-age-corrige-prema/${slug}` },
    title: `Bebe ne a ${parsed.saNaissance} SA, ${parsed.ageReelMois} mois : age corrige ${ageCorrigeMois} mois`,
    description: `Calcul age corrige pour un bebe ne a ${parsed.saNaissance} SA (${niveau}) ayant ${parsed.ageReelMois} mois de vie reelle. Age corrige = ${ageCorrigeMois} mois. Suivi pediatrique recommande.`,
    keywords: `bebe ${parsed.saNaissance} SA, age corrige ${parsed.ageReelMois} mois, ${niveau}, premature ${parsed.saNaissance} semaines, calcul age corrige`,
    openGraph: {
      title: `Bebe ${parsed.saNaissance} SA, ${parsed.ageReelMois} mois = ${ageCorrigeMois} mois corriges`,
      description: `${niveau} : age corrige et recommandations pediatriques.`,
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

  const semainesPrematurite = 40 - parsed.saNaissance;
  const ageCorrigeMois = calculAgeCorrigeMois(parsed.saNaissance, parsed.ageReelMois);
  const niveau = getNiveau(parsed.saNaissance);
  const descriptionNiveau = getDescriptionNiveau(parsed.saNaissance);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel age corrige pour un bebe ne a ${parsed.saNaissance} SA ayant ${parsed.ageReelMois} mois ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Un bebe ne a ${parsed.saNaissance} SA (${semainesPrematurite} semaines de prematurite) ayant ${parsed.ageReelMois} mois de vie reelle a un age corrige d'environ ${ageCorrigeMois} mois. ${descriptionNiveau}`,
        }
      },
      {
        "@type": "Question",
        name: `Que signifie ${parsed.saNaissance} SA ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${parsed.saNaissance} SA signifie ${parsed.saNaissance} semaines d'amenorrhee, soit ${parsed.saNaissance} semaines depuis le premier jour des dernieres regles. Un bebe a terme nait entre 37 et 42 SA, 40 SA en moyenne. Ne a ${parsed.saNaissance} SA = ${niveau}.`,
        }
      },
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Breadcrumb currentPage={`Ne ${parsed.saNaissance} SA, ${parsed.ageReelMois} mois`} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🍼
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Bebe ne a {parsed.saNaissance} SA, {parsed.ageReelMois} mois
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Age corrige : <strong>{ageCorrigeMois} mois</strong>. {niveau.charAt(0).toUpperCase() + niveau.slice(1)} ({semainesPrematurite} semaines de prematurite).
      </p>

      <CalculAgeCorrigePrema />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Resultats detailles
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700 font-medium">Age reel</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{parsed.ageReelMois}</p>
            <p className="text-sm text-slate-600 mt-1">mois chronologiques</p>
          </div>

          <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
            <p className="text-sm text-pink-700 font-medium">Age corrige</p>
            <p className="text-3xl font-bold text-pink-900 mt-1">{ageCorrigeMois}</p>
            <p className="text-sm text-pink-700 mt-1">mois corriges</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700">Age gestationnel naissance</span>
            <span className="font-semibold text-slate-800">{parsed.saNaissance} SA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Semaines de prematurite</span>
            <span className="font-semibold text-slate-800">{semainesPrematurite} semaines</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Categorie</span>
            <span className="font-semibold text-slate-800">{niveau}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Difference age reel / corrige</span>
            <span className="font-semibold text-slate-800">
              {Math.round((parsed.ageReelMois - ageCorrigeMois) * 10) / 10} mois
            </span>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Recommandations pour ce cas
        </h2>
        <p className="text-blue-800 mb-4 leading-relaxed">
          {descriptionNiveau}
        </p>
        <p className="text-blue-800 leading-relaxed">
          Pour evaluer le developpement (acquisitions motrices, langage, croissance),
          utilisez <strong>l&apos;age corrige de {ageCorrigeMois} mois</strong>, pas
          l&apos;age reel de {parsed.ageReelMois} mois. Pour les vaccins en revanche,
          le calendrier suit l&apos;age reel.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres variantes
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {VARIANTES.filter((v) => v.nomSlug !== slug)
            .slice(0, 8)
            .map((v) => {
              const ac = calculAgeCorrigeMois(v.saNaissance, v.ageReelMois);
              return (
                <a
                  key={v.nomSlug}
                  href={`/calcul-age-corrige-prema/${v.nomSlug}`}
                  className="block p-3 rounded-lg border border-slate-200 hover:border-pink-400 hover:bg-pink-50 transition text-sm"
                >
                  <strong>{v.saNaissance} SA, {v.ageReelMois} mois</strong> = {ac} mois corriges
                </a>
              );
            })}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-age-corrige-prema" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
