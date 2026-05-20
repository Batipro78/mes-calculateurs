import type { Metadata } from "next";
import { FAQSchema, WebAppSchema } from "@/lib/jsonld";
import CalculAgeChatHumain from "../CalculAgeChatHumain";
import RelatedCalculators from "@/app/components/RelatedCalculators";
import { calculerAgeChat } from "../ageChatCalc";

type PageProps = {
  params: Promise<{ params: string }>;
};

export async function generateStaticParams() {
  const slugs = [
    "1-an-chat",
    "2-ans-chat",
    "3-ans-chat",
    "5-ans-chat",
    "7-ans-chat",
    "10-ans-chat",
    "12-ans-chat",
    "15-ans-chat",
    "18-ans-chat",
    "20-ans-chat",
    "3-mois-chaton",
    "6-mois-chaton",
    "9-mois-chaton",
    "chat-interieur-5-ans",
    "chat-interieur-10-ans",
    "chat-interieur-15-ans",
    "chat-exterieur-5-ans",
    "chat-exterieur-10-ans",
    "combien-de-temps-vit-chat",
    "chat-1-an-en-humain",
    "chat-15-ans-en-humain",
    "chat-vieux-soins",
    "chat-senior-soins",
    "chat-chaton-developpement",
    "chat-super-senior",
  ];

  return slugs.map((slug) => ({
    params: slug,
  }));
}

function parseSlug(slug: string): { age: number; environnement?: "interieur" | "exterieur"; type: string } {
  const anneeMatch = slug.match(/^(\d+)-ans?-chat$/);
  if (anneeMatch) return { age: parseInt(anneeMatch[1]), type: "annee" };

  const moisMatch = slug.match(/^(\d+)-mois-chaton$/);
  if (moisMatch) return { age: parseInt(moisMatch[1]) / 12, type: "mois" };

  const envMatch = slug.match(/^chat-(interieur|exterieur)-(\d+)-ans?$/);
  if (envMatch) {
    return {
      age: parseInt(envMatch[2]),
      environnement: envMatch[1] as "interieur" | "exterieur",
      type: "environnement",
    };
  }

  return { age: 3, type: "general" };
}

function getMetatagsForSlug(slug: string) {
  const { age, environnement, type } = parseSlug(slug);

  let title = "Calcul Âge Chat en Années Humaines";
  let description = "Convertissez l&apos;âge de votre chat en équivalent humain avec la formule AAFP.";

  if (type === "annee") {
    const resultat = calculerAgeChat(age);
    title = `Chat de ${age} an${age > 1 ? "s" : ""} : ${resultat.ageHumain} ans humain - Calcul AAFP`;
    description = `Un chat de ${age} an${age > 1 ? "s" : ""} équivaut à ${resultat.ageHumain} ans humains. Phase: ${resultat.phaseInfo.nom}. Conseils santé et espérance de vie.`;
  } else if (type === "mois") {
    const resultat = calculerAgeChat(age);
    title = `Chaton de ${Math.round(age * 12)} mois : ${resultat.ageHumain} ans humain`;
    description = `Un chaton de ${Math.round(age * 12)} mois équivaut à ${resultat.ageHumain} ans humains. Découvrez la phase de vie et les soins nécessaires.`;
  } else if (type === "environnement") {
    const resultat = calculerAgeChat(age, environnement);
    const envLabel = environnement === "interieur" ? "d&apos;intérieur" : "d&apos;extérieur";
    title = `Chat ${envLabel} de ${age} ans : ${resultat.ageHumain} ans humain`;
    description = `Chat ${envLabel} de ${age} ans = ${resultat.ageHumain} ans humains. Espérance de vie : ${resultat.esperanceVieRestante}`;
  } else if (slug === "combien-de-temps-vit-chat") {
    title = "Combien de temps vit un chat ? Espérance de vie et phases";
    description = "Découvrez l&apos;espérance de vie d&apos;un chat: 13-17 ans d&apos;intérieur, 5-7 ans d&apos;extérieur.";
  } else if (slug === "chat-1-an-en-humain") {
    title = "Chat de 1 an en équivalent humain : 15 ans";
    description = "Un chat d&apos;1 an équivaut à 15 ans humains selon la formule AAFP.";
  } else if (slug === "chat-15-ans-en-humain") {
    const resultat = calculerAgeChat(15);
    title = `Chat de 15 ans : ${resultat.ageHumain} ans humain - Vénérable`;
    description = `Un chat de 15 ans équivaut à ${resultat.ageHumain} ans humains.`;
  }

  return { title, description };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { params: slug } = await params;
  const { title, description } = getMetatagsForSlug(slug);

  return {
    title,
    description,
    keywords: "âge chat, conversion, calculer âge, phase de vie, sénior, chaton, espérance de vie, AAFP",
    alternates: {
      canonical: `https://mescalculateurs.fr/calcul-age-chat-humain/${slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { params: slug } = await params;
  const { age, environnement, type } = parseSlug(slug);
  const { title, description } = getMetatagsForSlug(slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">
            🐱 {title.split(" | ")[0]}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <CalculAgeChatHumain />

        <RelatedCalculators currentSlug="/calcul-age-chat-humain" />

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-sm text-gray-700">
          <p className="font-semibold mb-2">⚠️ Disclaimer</p>
          <p>
            Ce calcul s&apos;appuie sur les recommandations AAFP et International Cat Care. Consultez votre vétérinaire pour des conseils spécifiques à votre chat.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WebAppSchema("Calcul Âge Chat", `https://mescalculateurs.fr/calcul-age-chat-humain/${slug}`)),
        }}
      />
    </main>
  );
}
