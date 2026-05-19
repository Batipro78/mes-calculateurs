import type { Metadata } from "next";
import CalculDateBarMitzvah from "../CalculDateBarMitzvah";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerBarMitzvah, formatDateFR, type Sexe } from "../barMitzvahCalc";

// ~15 variantes SEO populaires
const VARIANTES = [
  // Années naissance 2010-2017 (garçons, Bar Mitzvah 2023-2030)
  "ne-en-2010-garcon",
  "ne-en-2011-garcon",
  "ne-en-2012-garcon",
  "ne-en-2013-garcon",
  "ne-en-2014-garcon",
  "ne-en-2015-garcon",
  // Années naissance 2011-2017 (filles, Bat Mitzvah 2023-2029)
  "ne-en-2012-fille",
  "ne-en-2013-fille",
  "ne-en-2014-fille",
  "ne-en-2015-fille",
  "ne-en-2016-fille",
  "ne-en-2017-fille",
  // Questions conceptuelles (3 variantes)
  "quand-bar-mitzvah-13-ans",
  "quand-bat-mitzvah-12-ans",
  "difference-bar-bat-mitzvah",
];

function parseSlug(slug: string): {
  type: string;
  anneeNaissance?: number;
  sexe?: Sexe;
} | null {
  // Né en YYYY garcon/fille
  const matchAnnee = slug.match(
    /^ne-en-(\d{4})-(garcon|fille)$/
  );
  if (matchAnnee) {
    return {
      type: "annee",
      anneeNaissance: parseInt(matchAnnee[1]),
      sexe: matchAnnee[2] as Sexe,
    };
  }

  // Questions (pas de metadata spéciales)
  const questions = [
    "quand-bar-mitzvah-13-ans",
    "quand-bat-mitzvah-12-ans",
    "difference-bar-bat-mitzvah",
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

  if (!parsed) {
    return {};
  }

  let title = "";
  let description = "";
  let keywords = "";

  switch (parsed.type) {
    case "annee": {
      const anneeNaissance = parsed.anneeNaissance || 2013;
      const sexe = parsed.sexe || "garcon";

      // Créer une date estimée (15 janvier de l'année naissance)
      const dateEstimee = new Date(anneeNaissance, 0, 15);

      // Calculer Bar/Bat Mitzvah
      const resultat = calculerBarMitzvah(dateEstimee, sexe);
      const dateBarMitzvah = formatDateFR(resultat.dateBarMitzvahGregorien);
      const anneeBarMitzvah = resultat.dateBarMitzvahGregorien.getFullYear();

      const typeStr = sexe === "garcon" ? "Bar Mitzvah" : "Bat Mitzvah";
      const ageStr = sexe === "garcon" ? "13 ans" : "12 ans";

      title = `${typeStr} enfant né en ${anneeNaissance} : ${ageStr} hébraïque, date ${anneeBarMitzvah}`;
      description = `Calcul ${typeStr} pour enfant né en ${anneeNaissance}. ${ageStr} révolus en calendrier hébraïque. Date estimée : ${dateBarMitzvah}.`;
      keywords = `${typeStr} ${anneeNaissance}, ${ageStr} hébraïque, majori religieuse juive, date ${typeStr}`;
      break;
    }

    case "question":
      if (slug === "quand-bar-mitzvah-13-ans") {
        title = "Quand Bar Mitzvah ? À quel âge ? 13 ans hébraïques";
        description =
          "Bar Mitzvah garçon à 13 ans révolus en calendrier hébraïque. Majorité religieuse juive. Consensus toutes obédiences.";
        keywords = "bar mitzvah, 13 ans, âge bar mitzvah, majorité religieuse";
      } else if (slug === "quand-bat-mitzvah-12-ans") {
        title = "Quand Bat Mitzvah ? À quel âge ? 12 ans hébraïques";
        description =
          "Bat Mitzvah fille à 12 ans révolus en calendrier hébraïque. Majorité religieuse juive. Consensus toutes obédiences.";
        keywords = "bat mitzvah, 12 ans, âge bat mitzvah, majorité religieuse";
      } else if (slug === "difference-bar-bat-mitzvah") {
        title = "Différence Bar Mitzvah vs Bat Mitzvah : âge, sexe, calendrier";
        description =
          "Bar Mitzvah (garçon 13 ans) vs Bat Mitzvah (fille 12 ans). Majorité religieuse juive en calendrier hébraïque. Consensus toutes obédiences.";
        keywords =
          "difference bar bat mitzvah, bar mitzvah fille garcon, 13 ans 12 ans";
      }
      break;

    default:
      return {};
  }

  return {
    alternates: { canonical: `/calcul-date-bar-mitzvah/${slug}` },
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
      <Breadcrumb currentPage="Calcul Date Bar/Bat Mitzvah" />
      <CalculDateBarMitzvah />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/calcul-date-bar-mitzvah" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
