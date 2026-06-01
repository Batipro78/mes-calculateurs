import type { Metadata } from "next";
import CalculSigneZodiaque from "../CalculSigneZodiaque";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calculerSigne, SIGNES, ELEMENTS_INFO, MODES_INFO } from "../signeZodiaqueCalc";

// ~20 variantes SEO populaires
const VARIANTES = [
  // 12 signes
  "signe-belier",
  "signe-taureau",
  "signe-gemeaux",
  "signe-cancer",
  "signe-lion",
  "signe-vierge",
  "signe-balance",
  "signe-scorpion",
  "signe-sagittaire",
  "signe-capricorne",
  "signe-verseau",
  "signe-poissons",
  // 4 éléments
  "element-feu",
  "element-terre",
  "element-air",
  "element-eau",
  // 3 modes
  "mode-cardinal",
  "mode-fixe",
  "mode-mutable",
  // Questions populaires
  "signe-juin",
  "signe-juillet",
];

function parseSlug(slug: string): {
  type: string;
  signeId?: string;
  signeName?: string;
  element?: string;
  mode?: string;
  month?: number;
} | null {
  // Signes: signe-belier, signe-taureau
  const matchSigne = slug.match(/^signe-([a-z]+)$/);
  if (matchSigne) {
    const signeSlug = matchSigne[1];
    const signesMap: Record<string, string> = {
      belier: "belier",
      taureau: "taureau",
      gemeaux: "gemeaux",
      cancer: "cancer",
      lion: "lion",
      vierge: "vierge",
      balance: "balance",
      scorpion: "scorpion",
      sagittaire: "sagittaire",
      capricorne: "capricorne",
      verseau: "verseau",
      poissons: "poissons",
    };

    if (signesMap[signeSlug]) {
      const info = SIGNES[signeSlug as keyof typeof SIGNES];
      return {
        type: "signe",
        signeId: signeSlug,
        signeName: info.nom,
      };
    }
  }

  // Éléments: element-feu, element-terre
  const matchElement = slug.match(/^element-([a-z]+)$/);
  if (matchElement) {
    const elementSlug = matchElement[1];
    const elementsMap: Record<string, string> = {
      feu: "Feu",
      terre: "Terre",
      air: "Air",
      eau: "Eau",
    };

    if (elementsMap[elementSlug]) {
      return {
        type: "element",
        element: elementsMap[elementSlug],
      };
    }
  }

  // Modes: mode-cardinal, mode-fixe, mode-mutable
  const matchMode = slug.match(/^mode-([a-z]+)$/);
  if (matchMode) {
    const modeSlug = matchMode[1];
    const modesMap: Record<string, string> = {
      cardinal: "Cardinal",
      fixe: "Fixe",
      mutable: "Mutable",
    };

    if (modesMap[modeSlug]) {
      return {
        type: "mode",
        mode: modesMap[modeSlug],
      };
    }
  }

  // Mois: signe-juin, signe-juillet
  const matchMonth = slug.match(/^signe-([a-z]+)$/);
  if (matchMonth) {
    const monthSlug = matchMonth[1];
    const monthsMap: Record<string, number> = {
      janvier: 1,
      fevrier: 2,
      mars: 3,
      avril: 4,
      mai: 5,
      juin: 6,
      juillet: 7,
      aout: 8,
      septembre: 9,
      octobre: 10,
      novembre: 11,
      decembre: 12,
    };

    if (monthsMap[monthSlug]) {
      return {
        type: "mois",
        month: monthsMap[monthSlug],
      };
    }
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
    case "signe": {
      title = `Signe Zodiaque ${parsed.signeName} - Traits et Caractéristiques`;
      description = `Découvrez le signe zodiaque ${parsed.signeName}. Traits de caractère, élément, planète dominante, pierres et compatibilités astrologiques.`;
      keywords = `signe ${parsed.signeName?.toLowerCase()}, signe zodiaque ${parsed.signeName?.toLowerCase()}, traits ${parsed.signeName?.toLowerCase()}, astrologie`;
      break;
    }

    case "element": {
      const signesAvecElement = Object.values(SIGNES).filter(
        (s) => s.element === parsed.element
      );
      const signesNames = signesAvecElement.map((s) => s.nom).join(", ");
      title = `Élément ${parsed.element} en Astrologie - Signes Zodiaque`;
      description = `L&apos;élément ${parsed.element} regroupe les signes : ${signesNames}. Découvrez les traits et caractéristiques de cet élément astrologique.`;
      keywords = `element ${parsed.element?.toLowerCase()}, zodiaque, astrologie, signes ${parsed.element?.toLowerCase()}`;
      break;
    }

    case "mode": {
      const modeInfo = MODES_INFO[parsed.mode as keyof typeof MODES_INFO];
      title = `Mode ${parsed.mode} - Signes Zodiaque ${modeInfo.signes.join(", ")}`;
      description = `Le mode ${parsed.mode} en astrologie : ${modeInfo.traits.slice(0, 2).join(", ")}. Signes : ${modeInfo.signes.join(", ")}.`;
      keywords = `mode ${parsed.mode?.toLowerCase()}, astrologie, zodiaque, ${parsed.mode?.toLowerCase()}`;
      break;
    }

    case "mois": {
      const monthNames = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ];
      const dateTest = new Date(2024, parsed.month! - 1, 15);
      const signeResult = calculerSigne(dateTest);
      title = `Quel signe zodiaque en ${monthNames[parsed.month! - 1]} ?`;
      description = `Découvrez les signes zodiaque en ${monthNames[parsed.month! - 1]}. Changements de signe, traits et caractéristiques.`;
      keywords = `signe ${monthNames[parsed.month! - 1]}, zodiaque ${monthNames[parsed.month! - 1]}, astrologie`;
      break;
    }

    default:
      return {};
  }

  return {
    alternates: { canonical: `/calcul-signe-zodiaque/${slug}` },
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  await params;
  return (
    <div>
      <Breadcrumb currentPage="Calcul Signe Zodiaque" />
      <CalculSigneZodiaque />
      <RelatedCalculators currentSlug="/calcul-signe-zodiaque" />
    </div>
  );
}
