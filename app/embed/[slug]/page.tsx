import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EMBEDS, findEmbed } from "../embeds";
import CalculateurIMC from "../../calcul-imc/CalculateurIMC";
import CalculateurPourcentage from "../../calcul-pourcentage/CalculateurPourcentage";
import CalculateurTVA from "../../calcul-tva/CalculateurTVA";
import CalculateurSalaire from "../../salaire-brut-net/CalculateurSalaire";
import SimulateurPret from "../../simulateur-pret-immobilier/SimulateurPret";
import CalculateurInteretCompose from "../../calcul-interet-compose/CalculateurInteretCompose";
import CalculateurNotaire from "../../frais-de-notaire/CalculateurNotaire";

export function generateStaticParams() {
  return EMBEDS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const embed = findEmbed(slug);
  if (!embed) return {};
  return {
    title: `${embed.title} — Widget embeddable`,
    description: `${embed.description}. Widget gratuit a integrer sur votre site via iframe.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/embed/${slug}` },
  };
}

function renderWidget(slug: string) {
  switch (slug) {
    case "imc":
      return <CalculateurIMC />;
    case "pourcentage":
      return <CalculateurPourcentage />;
    case "tva":
      return <CalculateurTVA />;
    case "salaire-brut-net":
      return <CalculateurSalaire />;
    case "pret-immobilier":
      return <SimulateurPret />;
    case "interet-compose":
      return <CalculateurInteretCompose />;
    case "frais-de-notaire":
      return <CalculateurNotaire />;
    default:
      return null;
  }
}

export default async function EmbedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const embed = findEmbed(slug);
  if (!embed) notFound();

  const widget = renderWidget(slug);
  if (!widget) notFound();

  return (
    <div data-embed="true">
      {widget}
      <p className="mt-4 text-xs text-slate-400 text-center">
        Widget fourni par{" "}
        <a
          href={`https://mescalculateurs.fr${embed.sourcePath}?utm_source=embed&utm_medium=iframe&utm_campaign=${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-700 underline"
        >
          mescalculateurs.fr
        </a>
      </p>
    </div>
  );
}
