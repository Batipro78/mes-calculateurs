import type { Metadata } from "next";
import CalculFetesCatholiques from "../CalculFetesCatholiques";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { getFetesAnnee, formatDateFR } from "../fetesCatholiquesCalc";

const VARIANTES = [
  "fetes-2026", "fetes-2027", "fetes-2028", "fetes-2029", "fetes-2030",
  "toussaint-2026", "toussaint-2027", "toussaint-2028",
  "assomption-2026", "assomption-2027", "assomption-2028",
  "avent-2026", "avent-2027", "avent-2028",
  "epiphanie-2026", "epiphanie-2027",
  "chandeleur-2026", "chandeleur-2027",
  "careme-2026", "careme-2027",
  "quand-tombe-noel-2026", "quand-tombe-paques-2026",
  "jours-feries-religieux-2026", "calendrier-liturgique-2026", "calendrier-liturgique-2027",
];

function parseSlug(slug: string): { type: string; annee?: number } | null {
  const matchFetes = slug.match(/^fetes-(\d{4})$/);
  if (matchFetes) return { type: "fetes", annee: parseInt(matchFetes[1]) };

  const matchToussaint = slug.match(/^toussaint-(\d{4})$/);
  if (matchToussaint) return { type: "toussaint", annee: parseInt(matchToussaint[1]) };

  const matchAssomption = slug.match(/^assomption-(\d{4})$/);
  if (matchAssomption) return { type: "assomption", annee: parseInt(matchAssomption[1]) };

  const matchAvent = slug.match(/^avent-(\d{4})$/);
  if (matchAvent) return { type: "avent", annee: parseInt(matchAvent[1]) };

  const matchEpiphanie = slug.match(/^epiphanie-(\d{4})$/);
  if (matchEpiphanie) return { type: "epiphanie", annee: parseInt(matchEpiphanie[1]) };

  const matchChandeleur = slug.match(/^chandeleur-(\d{4})$/);
  if (matchChandeleur) return { type: "chandeleur", annee: parseInt(matchChandeleur[1]) };

  const matchCareme = slug.match(/^careme-(\d{4})$/);
  if (matchCareme) return { type: "careme", annee: parseInt(matchCareme[1]) };

  const questions = ["quand-tombe-noel-2026", "quand-tombe-paques-2026", "jours-feries-religieux-2026", "calendrier-liturgique-2026", "calendrier-liturgique-2027"];
  if (questions.includes(slug)) return { type: "question" };

  return null;
}

export function generateStaticParams() {
  return VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed || !parsed.annee) return {};

  const fetes = getFetesAnnee(parsed.annee);
  let title = "", description = "", keywords = "";

  const toussaint = fetes.find((f) => f.nom === "Toussaint");
  const assomption = fetes.find((f) => f.nom === "Assomption");
  const avent = fetes.find((f) => f.nom === "1er Avent");
  const cendres = fetes.find((f) => f.nom === "Mercredi des Cendres");

  switch (parsed.type) {
    case "fetes":
      title = `Fêtes catholiques ${parsed.annee} - Calendrier complet`;
      description = `Calendrier complet des fêtes catholiques en ${parsed.annee}. Pâques, Toussaint, Ascension, Pentecôte.`;
      keywords = `fetes catholiques ${parsed.annee}, calendrier fetes`;
      break;
    case "toussaint":
      if (toussaint) {
        const dateStr = formatDateFR(toussaint.date);
        title = `Toussaint ${parsed.annee} : ${dateStr}`;
        description = `La Toussaint en ${parsed.annee} est le ${dateStr} (1er novembre).`;
        keywords = `toussaint ${parsed.annee}, 1er novembre`;
      }
      break;
    case "assomption":
      if (assomption) {
        const dateStr = formatDateFR(assomption.date);
        title = `Assomption ${parsed.annee} : ${dateStr}`;
        description = `L&apos;Assomption en ${parsed.annee} est le ${dateStr} (15 août).`;
        keywords = `assomption ${parsed.annee}, 15 aout`;
      }
      break;
    case "avent":
      if (avent) {
        const dateStr = formatDateFR(avent.date);
        title = `Avent ${parsed.annee} : ${dateStr}`;
        description = `L&apos;Avent en ${parsed.annee} commence le ${dateStr}.`;
        keywords = `avent ${parsed.annee}, premier avent`;
      }
      break;
    case "epiphanie":
      title = `Épiphanie ${parsed.annee}`;
      description = `L&apos;Épiphanie en ${parsed.annee} est le 6 janvier.`;
      keywords = `epiphanie ${parsed.annee}, 6 janvier`;
      break;
    case "chandeleur":
      title = `Chandeleur ${parsed.annee}`;
      description = `La Chandeleur en ${parsed.annee} est le 2 février.`;
      keywords = `chandeleur ${parsed.annee}, 2 fevrier`;
      break;
    case "careme":
      if (cendres) {
        const dateStr = formatDateFR(cendres.date);
        title = `Carême ${parsed.annee}`;
        description = `Le Carême en ${parsed.annee} commence le ${dateStr}.`;
        keywords = `careme ${parsed.annee}, mercredi cendres`;
      }
      break;
  }

  return {
    alternates: { canonical: `/calcul-fetes-catholiques/${slug}` },
    title,
    description,
    keywords,
    openGraph: { title, description },
  };
}

export default function Page() {
  return (
    <div>
      <Breadcrumb currentPage="Calendrier Fêtes Catholiques" />
      <CalculFetesCatholiques />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-fetes-catholiques" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
