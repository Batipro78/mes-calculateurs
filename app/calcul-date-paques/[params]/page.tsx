import type { Metadata } from "next";
import CalculDatePaques from "../CalculDatePaques";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  getFetesAnnee,
  formatDateFR,
  type Tradition,
} from "../paquesCalc";

// ~25 variantes SEO populaires
const VARIANTES = [
  // Pâques années 2026-2035 (10 variantes)
  "paques-2026",
  "paques-2027",
  "paques-2028",
  "paques-2029",
  "paques-2030",
  "paques-2031",
  "paques-2032",
  "paques-2033",
  "paques-2034",
  "paques-2035",
  // Pâques orthodoxe (3 variantes)
  "paques-orthodoxe-2026",
  "paques-orthodoxe-2027",
  "paques-orthodoxe-2028",
  // Mercredi des Cendres (2 variantes)
  "mercredi-cendres-2026",
  "mercredi-cendres-2027",
  // Ascension (3 variantes)
  "ascension-2026",
  "ascension-2027",
  "ascension-2028",
  // Pentecôte (2 variantes)
  "pentecote-2026",
  "pentecote-2027",
  // Questions (5 variantes)
  "combien-de-jours-avant-paques",
  "combien-de-jours-avant-ascension",
  "paques-meeus-algorithme",
  "coincidence-paques-orthodoxe-catholique-2028",
  "pourquoi-paques-date-change",
];

function parseSlug(slug: string): {
  type: string;
  annee?: number;
  tradition?: Tradition;
} | null {
  // Pâques années: paques-2026
  const matchPaques = slug.match(/^paques-(\d{4})$/);
  if (matchPaques) {
    return {
      type: "paques",
      annee: parseInt(matchPaques[1]),
      tradition: "catholique",
    };
  }

  // Pâques orthodoxe: paques-orthodoxe-2026
  const matchPaquesOrtho = slug.match(/^paques-orthodoxe-(\d{4})$/);
  if (matchPaquesOrtho) {
    return {
      type: "paques",
      annee: parseInt(matchPaquesOrtho[1]),
      tradition: "orthodoxe",
    };
  }

  // Mercredi des Cendres: mercredi-cendres-2026
  const matchCendres = slug.match(/^mercredi-cendres-(\d{4})$/);
  if (matchCendres) {
    return {
      type: "cendres",
      annee: parseInt(matchCendres[1]),
      tradition: "catholique",
    };
  }

  // Ascension: ascension-2026
  const matchAscension = slug.match(/^ascension-(\d{4})$/);
  if (matchAscension) {
    return {
      type: "ascension",
      annee: parseInt(matchAscension[1]),
      tradition: "catholique",
    };
  }

  // Pentecôte: pentecote-2026
  const matchPentecote = slug.match(/^pentecote-(\d{4})$/);
  if (matchPentecote) {
    return {
      type: "pentecote",
      annee: parseInt(matchPentecote[1]),
      tradition: "catholique",
    };
  }

  // Questions (pas de metadata spéciales, juste contenu)
  const questions = [
    "combien-de-jours-avant-paques",
    "combien-de-jours-avant-ascension",
    "paques-meeus-algorithme",
    "coincidence-paques-orthodoxe-catholique-2028",
    "pourquoi-paques-date-change",
  ];
  if (questions.includes(slug)) {
    return {
      type: "question",
    };
  }

  return null;
}

export function generateStaticParams() {
  return VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed || !parsed.annee) {
    return {};
  }

  const fetes = getFetesAnnee(parsed.annee, parsed.tradition || "catholique");

  let title = "";
  let description = "";
  let keywords = "";
  let dateStr = "";

  switch (parsed.type) {
    case "paques":
      dateStr = formatDateFR(fetes.paques);
      if (parsed.tradition === "orthodoxe") {
        title = `Pâques orthodoxe ${parsed.annee} : ${dateStr}`;
        description = `Pâques orthodoxe en ${parsed.annee} est le ${dateStr}. Calendrier julien. Église orthodoxe.`;
        keywords = `paques orthodoxe ${parsed.annee}, date paques orthodoxe, calendrier julien`;
      } else {
        title = `Pâques ${parsed.annee} : ${dateStr}`;
        description = `Pâques catholique en ${parsed.annee} est le ${dateStr}. Calendrier grégorien. Église catholique et protestante.`;
        keywords = `paques ${parsed.annee}, date paques catholique, date paques 2026, pâques grégorien`;
      }
      break;

    case "cendres":
      dateStr = formatDateFR(fetes.cendres);
      title = `Mercredi des Cendres ${parsed.annee} : ${dateStr}`;
      description = `Le Mercredi des Cendres en ${parsed.annee} est le ${dateStr}. Début du Carême.`;
      keywords = `mercredi des cendres ${parsed.annee}, date mercredi cendres, careme`;
      break;

    case "ascension":
      dateStr = formatDateFR(fetes.ascension);
      title = `Ascension ${parsed.annee} : ${dateStr}`;
      description = `L&apos;Ascension en ${parsed.annee} est le ${dateStr}. 39 jours après Pâques.`;
      keywords = `ascension ${parsed.annee}, date ascension, ascension jeudi`;
      break;

    case "pentecote":
      dateStr = formatDateFR(fetes.pentecote);
      title = `Pentecôte ${parsed.annee} : ${dateStr}`;
      description = `La Pentecôte en ${parsed.annee} est le ${dateStr}. 49 jours après Pâques, Esprit Saint.`;
      keywords = `pentecote ${parsed.annee}, date pentecote, pentecote dimanche`;
      break;

    default:
      return {};
  }

  return {
    alternates: { canonical: `/calcul-date-paques/${slug}` },
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
    },
  };
}

export default function Page() {
  return (
    <div>
      <Breadcrumb currentPage="Date de Pâques" />
      <CalculDatePaques />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-date-paques" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
