import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculCaloriesChienChat from "../CalculCaloriesChienChat";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  calculerDER,
  STADES_LABELS,
  ACTIVITE_LABELS,
  type Espece,
  type Stade,
  type Activite,
} from "../caloriesAnimauxCalc";

// Types et données statiques
const ESPECES: Espece[] = ["chien", "chat"];
const POIDS_CHIEN = [5, 10, 15, 20, 25, 30, 40];
const POIDS_CHAT = [3, 4, 5, 6, 8];
const STADES_CHIEN: string[] = ["adulte", "actif", "senior"];
const STADES_CHAT: string[] = ["adulte", "sterilise", "senior"];

/**
 * Types de slugs dynamiques générés
 */
type SlugType = "weight" | "activity" | "question";
type ParsedSlug = {
  type: SlugType;
  espece: Espece;
  poids?: number;
  stade?: Stade;
  activite?: Activite;
  question?: string;
};

/**
 * Parse un slug en structure utilisable
 * Formats supportés:
 * - chien-{X}kg-adulte
 * - chien-{X}kg-actif
 * - chat-{X}kg-adulte
 * - chat-{X}kg-sterilise
 * - combien-calories-chien-jour (questions)
 * - chiot-besoin-calories
 * - chat-sterilise-calories
 * - chien-perd-poids-calories
 */
function parseSlug(slug: string): ParsedSlug | null {
  // Format: chien-25kg-adulte
  const weightMatch = slug.match(/^(chien|chat)-(\d+)kg-(adulte|actif|normal|sedentaire|senior|sterilise)$/);
  if (weightMatch) {
    const espece = weightMatch[1] as Espece;
    const poids = parseInt(weightMatch[2]);
    const stadeRaw = weightMatch[3];

    // Normaliser stade
    let stade: Stade = "adulte";
    if (stadeRaw === "actif") stade = "adulte";
    else if (stadeRaw === "normal") stade = "adulte";
    else if (stadeRaw === "sterilise") stade = "adulte";
    else if (stadeRaw === "sedentaire") stade = "adulte";
    else if (stadeRaw === "senior") stade = "senior";

    return { type: "weight", espece, poids, stade };
  }

  // Questions: combien-calories-chien-jour, etc.
  const questionMatch = slug.match(
    /^(combien-calories-(?:chien|chat)-jour|(?:chiot|chaton)-besoin-calories|(?:chien|chat)-(?:sterilise|senior)-calories|(?:chien|chat)-perd-poids-calories|adulte-(?:chien|chat)-calories)$/
  );
  if (questionMatch) {
    return { type: "question", espece: "chien", question: slug };
  }

  return null;
}

/**
 * Génère les params statiques pour SSG
 */
export function generateStaticParams() {
  const params: { params: string }[] = [];

  // Variantes poids chien
  for (const poids of POIDS_CHIEN) {
    params.push({ params: `chien-${poids}kg-adulte` });
    params.push({ params: `chien-${poids}kg-actif` });
  }

  // Variantes poids chat
  for (const poids of POIDS_CHAT) {
    params.push({ params: `chat-${poids}kg-adulte` });
    params.push({ params: `chat-${poids}kg-sterilise` });
  }

  // Questions (6 types)
  const questions = [
    "combien-calories-chien-jour",
    "combien-calories-chat-jour",
    "chien-perd-poids-calories",
    "chat-sterilise-calories",
    "chiot-besoin-calories",
    "chat-senior-calories",
  ];
  for (const q of questions) {
    params.push({ params: q });
  }

  return params;
}

/**
 * Génère les métadonnées pour la page
 */
export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return {
      title: "Calcul Calories Chien Chat",
      description: "Calcul des besoins caloriques pour chiens et chats",
    };
  }

  if (parsed.type === "weight" && parsed.poids && parsed.stade) {
    const espece = parsed.espece === "chien" ? "Chien" : "Chat";
    const stadeLabel = STADES_LABELS[parsed.stade];

    // Calcul pour titre SEO
    const resultat = calculerDER({
      espece: parsed.espece,
      poidsKg: parsed.poids,
      stade: parsed.stade,
      activite: parsed.stade === "senior" ? "normal" : "normal",
      sterilise: parsed.stade === "adulte" ? false : true,
    });

    const title = `Besoin calorique ${espece} ${parsed.poids} kg ${stadeLabel} : ${Math.round(resultat.der)} kcal/jour`;
    const description = `${espece} ${parsed.poids} kg, ${stadeLabel} : DER ${Math.round(resultat.der)} kcal/jour, BER ${Math.round(resultat.ber)} kcal. Calcul gratuit.`;

    return {
      alternates: { canonical: `/calcul-calories-chien-chat/${slug}` },
      title,
      description,
      keywords: `calories ${espece.toLowerCase()} ${parsed.poids}kg, besoin energetique, BER DER`,
      openGraph: {
        title,
        description,
      },
    };
  }

  if (parsed.type === "question") {
    const questionTitles: Record<string, string> = {
      "combien-calories-chien-jour": "Combien de calories par jour pour un chien ?",
      "combien-calories-chat-jour": "Combien de calories par jour pour un chat ?",
      "chien-perd-poids-calories": "Calories pour faire maigrir un chien",
      "chat-sterilise-calories": "Calories chat stérilisé/castré",
      "chiot-besoin-calories": "Combien de calories pour un chiot ?",
      "chat-senior-calories": "Calories pour un chat sénior (âgé)",
    };

    const title = questionTitles[parsed.question || ""] || "Calcul Calories Chien Chat";

    return {
      alternates: { canonical: `/calcul-calories-chien-chat/${slug}` },
      title,
      description: `${title} - Calcul gratuit basé sur formules WSAVA et NRC.`,
      keywords: title.toLowerCase(),
    };
  }

  return {};
}

/**
 * Page dynamique - async + Promise<{ params: string }>
 */
export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  // Validation basique
  if (parsed.type === "weight") {
    if (!parsed.poids || !parsed.stade) notFound();
  }

  let breadcrumbLabel = slug;
  let pageTitle = "Calcul Calories";
  let pageDescription = "";

  if (parsed.type === "weight" && parsed.poids && parsed.stade) {
    const espece = parsed.espece === "chien" ? "Chien" : "Chat";
    breadcrumbLabel = `${espece} ${parsed.poids} kg`;
    pageTitle = `Besoin calorique ${espece} ${parsed.poids} kg`;
    pageDescription = `Calcul détaillé des besoins énergétiques pour ${espece.toLowerCase()} de ${parsed.poids} kg`;
  } else if (parsed.type === "question") {
    const questionLabels: Record<string, string> = {
      "combien-calories-chien-jour": "Combien de calories par jour chien ?",
      "combien-calories-chat-jour": "Combien de calories par jour chat ?",
      "chien-perd-poids-calories": "Chien en perte de poids",
      "chat-sterilise-calories": "Chat stérilisé/castré",
      "chiot-besoin-calories": "Besoin calorique chiot",
      "chat-senior-calories": "Chat sénior (âgé)",
    };
    breadcrumbLabel = questionLabels[parsed.question || ""] || slug;
    pageTitle = breadcrumbLabel;
    pageDescription = `Guide et calcul: ${breadcrumbLabel}`;
  }

  return (
    <div>
      <Breadcrumb
        currentPage={breadcrumbLabel}
        parentPage="Calcul Calories Chien Chat"
        parentHref="/calcul-calories-chien-chat"
      />

      <AdSlot adSlot="1234567890" />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* En-tête */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
            🐾 {pageTitle}
          </h1>
          {pageDescription && <p className="text-lg text-gray-700">{pageDescription}</p>}
        </div>

        {/* Composant calcul */}
        <div className="mb-12">
          <CalculCaloriesChienChat />
        </div>

        <AdSlot adSlot="1234567890" />

        {/* Contenu spécifique selon slug */}
        {parsed.type === "weight" && parsed.poids && parsed.stade && (
          <section className="mb-12 rounded-lg bg-blue-50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">
              Exemple : {parsed.espece === "chien" ? "Chien" : "Chat"} de {parsed.poids} kg
            </h2>
            <p className="text-gray-800">
              Pour un {parsed.espece} de {parsed.poids} kg au stade &quot;{STADES_LABELS[parsed.stade]}&quot;,
              le calcul automatique ci-dessus donne précisément le besoin énergétique. Ajustez selon
              l&apos;activité réelle et l&apos;état corporel observé.
            </p>
          </section>
        )}

        {parsed.type === "question" && (
          <section className="space-y-6">
            <div className="rounded-lg bg-green-50 p-6">
              <h2 className="mb-4 text-2xl font-bold text-green-900">
                Réponse détaillée
              </h2>
              <p className="text-gray-800">
                Utilisez le calculateur ci-dessus pour obtenir une réponse précise.
                Les besoins énergétiques varient selon l&apos;espèce, le poids, l&apos;âge, l&apos;activité et l&apos;état
                (stérilisé/castré). Les tableaux de la page principale vous donnent aussi les facteurs de référence.
              </p>
            </div>
          </section>
        )}

        <AdSlot adSlot="1234567890" />
      </div>

      <RelatedCalculators currentSlug="/calcul-calories-chien-chat" />
    </div>
  );
}
