import type { Metadata } from "next";
import CompatibiliteSignesAstro from "../CompatibiliteSignesAstro";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  calculerCompatibilite,
  getNomSigne,
  type Signe,
} from "../compatibiliteSignesCalc";

// 20 couples populaires en SEO
const VARIANTES = [
  "belier-lion",
  "belier-sagittaire",
  "lion-sagittaire",
  "taureau-cancer",
  "gemeaux-verseau",
  "scorpion-poissons",
  "cancer-scorpion",
  "vierge-taureau",
  "balance-gemeaux",
  "capricorne-vierge",
  "verseau-balance",
  "poissons-cancer",
  "belier-balance",
  "taureau-scorpion",
  "lion-verseau",
  "cancer-capricorne",
  "vierge-poissons",
  "gemeaux-sagittaire",
  "scorpion-taureau",
  "belier-cancer",
];

function parseSlug(slug: string): { signe1: Signe; signe2: Signe } | null {
  // Pattern: signe1-signe2 (ex: belier-lion)
  const match = slug.match(/^([a-z]+)-([a-z]+)$/);
  if (!match) return null;

  const signesMap: Record<string, Signe> = {
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

  const signe1 = signesMap[match[1]];
  const signe2 = signesMap[match[2]];

  if (!signe1 || !signe2) return null;

  return { signe1, signe2 };
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

  const resultat = calculerCompatibilite(parsed.signe1, parsed.signe2);
  const titre = `${resultat.signe1} ${resultat.signe2} - Compatibilité ${resultat.pourcentage}%`;
  const description = `Compatibilité amoureuse entre ${resultat.signe1} et ${resultat.signe2} : ${resultat.pourcentage}% compatible. ${resultat.niveau} - ${resultat.description}`;

  return {
    alternates: {
      canonical: `/compatibilite-signes-astrologiques/${slug}`,
    },
    title: titre,
    description,
    keywords: `${resultat.signe1.toLowerCase()} ${resultat.signe2.toLowerCase()} compatibilité, ${resultat.signe1} ${resultat.signe2} amour, couple ${resultat.signe1} ${resultat.signe2}`,
    openGraph: {
      title: titre,
      description,
    },
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  // Ceci ne se compilera pas sans resolution du Promise
  // Next.js 15 require l'async dans generateMetadata, pas dans le composant
  // On va laisser le composant non-async et afficher le selecteur direct
  return (
    <div>
      <Breadcrumb currentPage="Compatibilité Signes Astrologiques" />
      <CompatibiliteSignesAstro />
      <RelatedCalculators currentSlug="/compatibilite-signes-astrologiques" />
    </div>
  );
}
