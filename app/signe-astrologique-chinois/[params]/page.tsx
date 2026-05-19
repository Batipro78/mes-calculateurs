import type { Metadata } from "next";
import SigneAstrologiqueChinois from "../SigneAstrologiqueChinois";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calculerSigneChinois, formatAnneeChinoise } from "../signeChinoisCalc";

// ~27 variantes SEO populaires
const VARIANTES = [
  // Années (14 variantes)
  "annee-1970",
  "annee-1975",
  "annee-1980",
  "annee-1985",
  "annee-1990",
  "annee-1995",
  "annee-2000",
  "annee-2005",
  "annee-2010",
  "annee-2015",
  "annee-2020",
  "annee-2024",
  "annee-2025",
  "annee-2026",
  // Signes animaux (12 variantes)
  "signe-rat",
  "signe-buffle",
  "signe-tigre",
  "signe-lapin",
  "signe-dragon",
  "signe-serpent",
  "signe-cheval",
  "signe-chevre",
  "signe-singe",
  "signe-coq",
  "signe-chien",
  "signe-cochon",
  // Nouvel An lunaire (2 variantes)
  "nouvel-an-chinois-2026",
  "nouvel-an-chinois-2027",
];

function parseSlug(slug: string): {
  type: string;
  annee?: number;
  animal?: string;
} | null {
  // Années: annee-1970, annee-2026
  const matchAnnee = slug.match(/^annee-(\d{4})$/);
  if (matchAnnee) {
    return {
      type: "annee",
      annee: parseInt(matchAnnee[1]),
    };
  }

  // Signes: signe-rat, signe-dragon
  const matchSigne = slug.match(/^signe-([a-z-]+)$/);
  if (matchSigne) {
    const animalSlug = matchSigne[1];
    const animals: Record<string, string> = {
      rat: "Rat",
      buffle: "Buffle",
      tigre: "Tigre",
      lapin: "Lapin",
      dragon: "Dragon",
      serpent: "Serpent",
      cheval: "Cheval",
      chevre: "Chèvre",
      singe: "Singe",
      coq: "Coq",
      chien: "Chien",
      cochon: "Cochon",
    };
    if (animals[animalSlug]) {
      return {
        type: "signe",
        animal: animals[animalSlug],
      };
    }
  }

  // Nouvel An: nouvel-an-chinois-2026
  const matchNewYear = slug.match(/^nouvel-an-chinois-(\d{4})$/);
  if (matchNewYear) {
    return {
      type: "nouvel-an",
      annee: parseInt(matchNewYear[1]),
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
      const date = new Date(`${parsed.annee}-01-01`);
      const resultat = calculerSigneChinois(date);
      title = `Signe Chinois ${parsed.annee} : ${resultat.combinaison}`;
      description = `Découvrez le signe astrologique chinois de l&apos;année ${parsed.annee} : ${resultat.combinaison}. Animal ${resultat.animal}, élément ${resultat.element}.`;
      keywords = `signe chinois ${parsed.annee}, animal chinois ${parsed.annee}, ${resultat.animal} ${resultat.element}`;
      break;
    }

    case "signe": {
      title = `Signe Chinois ${parsed.animal} - Traits et Compatibilité`;
      description = `Tout sur le signe astrologique chinois ${parsed.animal}. Traits de caractère, compatibilité amoureuse, années associées.`;
      keywords = `signe chinois ${parsed.animal}, animal ${parsed.animal!.toLowerCase()}, zodiaque chinois, compatibilite ${parsed.animal!.toLowerCase()}`;
      break;
    }

    case "nouvel-an": {
      const anneeStr = formatAnneeChinoise(parsed.annee!);
      title = `Nouvel An Lunaire ${parsed.annee} : ${anneeStr}`;
      description = `Le Nouvel An lunaire en ${parsed.annee} annonce l&apos;année du ${anneeStr}. Date de changement de signe chinois.`;
      keywords = `nouvel an chinois ${parsed.annee}, nouvel an lunaire ${parsed.annee}, ${anneeStr}`;
      break;
    }

    default:
      return {};
  }

  return {
    alternates: { canonical: `/signe-astrologique-chinois/${slug}` },
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
      <Breadcrumb currentPage="Signe Astrologique Chinois" />
      <SigneAstrologiqueChinois />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <RelatedCalculators currentSlug="/signe-astrologique-chinois" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}