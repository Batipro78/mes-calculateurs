import type { Metadata } from "next";
import type { ReactNode } from "react";
import CalculDoseMedicamentAnimaux from "../CalculDoseMedicamentAnimaux";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import WebAppJsonLd from "../../components/WebAppJsonLd";
import { calculerDose } from "../doseMedicamentCalc";
import type { Animal, Medicament } from "../doseMedicamentCalc";

interface DynamicPageParams {
  params: Promise<{ params: string }>;
}

// ========== generateStaticParams ==========
export async function generateStaticParams() {
  return [
    // Milbemax chien
    { params: "milbemax-chien-5kg" },
    { params: "milbemax-chien-10kg" },
    { params: "milbemax-chien-15kg" },
    { params: "milbemax-chien-20kg" },
    { params: "milbemax-chien-25kg" },

    // Frontline chien
    { params: "frontline-chien-10kg" },
    { params: "frontline-chien-20kg" },
    { params: "frontline-chien-30kg" },
    { params: "frontline-chien-40kg" },

    // Bravecto chien
    { params: "bravecto-chien-10kg" },
    { params: "bravecto-chien-20kg" },
    { params: "bravecto-chien-30kg" },
    { params: "bravecto-chien-40kg" },

    // Milbemax chat
    { params: "milbemax-chat-3kg" },
    { params: "milbemax-chat-5kg" },
    { params: "milbemax-chat-7kg" },

    // Stronghold chat
    { params: "stronghold-chat-3kg" },
    { params: "stronghold-chat-5kg" },

    // Questions/guides
    { params: "combien-fois-vermifuger-chien" },
    { params: "combien-fois-vermifuger-chat" },
    { params: "frontline-vs-bravecto" },
    { params: "vermifuge-chiot" },
  ];
}

// ========== parseSlug ==========
function parseSlug(slug: string): {
  medicament?: Medicament;
  animal?: Animal;
  poids?: number;
  guide?: string;
} {
  // Pattern: "medicament-animal-XXkg"
  const dosageMatch = slug.match(/^(\w+)-(chien|chat)-(\d+(?:\.\d+)?)kg$/);
  if (dosageMatch) {
    return {
      medicament: dosageMatch[1] as Medicament,
      animal: dosageMatch[2] as Animal,
      poids: parseFloat(dosageMatch[3]),
    };
  }

  // Pattern: "guide-slug"
  if (slug.includes("vermifuger") || slug.includes("bravecto") || slug.includes("chiot")) {
    return { guide: slug };
  }

  return {};
}

// ========== generateMetadata ==========
export async function generateMetadata({
  params,
}: DynamicPageParams): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (parsed.medicament && parsed.animal && parsed.poids) {
    const medName = parsed.medicament.charAt(0).toUpperCase() + parsed.medicament.slice(1);
    const animalName = parsed.animal === "chien" ? "Chien" : "Chat";
    const title = `Dose ${medName} ${animalName} ${parsed.poids}kg : Calcul Posologie`;
    const description = `Dose exacte de ${medName} pour un ${animalName} de ${parsed.poids} kg. Formule vétérinaire officielle AMM française. Recommandations posologie.`;

    return {
      title,
      description,
      alternates: {
        canonical: `/calcul-dose-medicament-animaux/${slug}`,
      },
    };
  }

  if (parsed.guide === "combien-fois-vermifuger-chien") {
    return {
      title: "Calendrier Vermifugation Chien : Quand Vermifuger",
      description:
        "Fréquence vermifugation chien : chiots 1x/mois, adulte 4x/an, senior 2x/an. Guide complet.",
      alternates: {
        canonical: `/calcul-dose-medicament-animaux/${slug}`,
      },
    };
  }

  if (parsed.guide === "combien-fois-vermifuger-chat") {
    return {
      title: "Calendrier Vermifugation Chat : Fréquence",
      description:
        "Vermifuger un chat : chitons 1x/mois, adulte 2x/an, intérieur 1x/an minimum.",
      alternates: {
        canonical: `/calcul-dose-medicament-animaux/${slug}`,
      },
    };
  }

  if (parsed.guide === "frontline-vs-bravecto") {
    return {
      title: "Frontline vs Bravecto : Lequel Choisir pour Mon Chien ?",
      description:
        "Comparaison Frontline (1 mois, OTC) vs Bravecto (3 mois, prescription). Avantages, prix, efficacité tiques.",
      alternates: {
        canonical: `/calcul-dose-medicament-animaux/${slug}`,
      },
    };
  }

  if (parsed.guide === "vermifuge-chiot") {
    return {
      title: "Vermifuge Chiot : Quand Commencer, Quelle Fréquence ?",
      description:
        "Vermifugation chiot : à partir de 2 semaines, tous les mois jusqu'à 6 mois. Dosages sécurisés.",
      alternates: {
        canonical: `/calcul-dose-medicament-animaux/${slug}`,
      },
    };
  }

  return {
    title: "Calcul Dose Médicament Animaux",
    description: "Calculateur de dose pour vermifuges et anti-puces chien chat.",
  };
}

// ========== Page Component ==========
export default async function Page({ params }: DynamicPageParams) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  let pageTitle = "";
  let pageDescription = "";
  let customContent: ReactNode = null;

  // ===== DOSAGE PAGE =====
  if (parsed.medicament && parsed.animal && parsed.poids) {
    try {
      const resultat = calculerDose(parsed.animal, parsed.medicament, parsed.poids);
      pageTitle = `Dose ${resultat.medicament} - ${resultat.animal} ${parsed.poids}kg`;
      pageDescription = `Dose exacte : ${resultat.quantite}. ${resultat.posologie}`;
    } catch (err) {
      pageTitle = `Calcul Dose ${parsed.medicament}`;
      pageDescription = "Erreur calcul dosage";
    }
  }

  // ===== GUIDE: Combien fois vermifuger chien =====
  else if (parsed.guide === "combien-fois-vermifuger-chien") {
    pageTitle = "Calendrier Vermifugation Chien";
    pageDescription =
      "À quelle fréquence vermifuger un chien ? Chiots, adultes, seniors : calendrier complet.";
    customContent = (
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Fréquence de Vermifugation selon l&apos;Âge
          </h2>
          <ul className="space-y-3 text-gray-800">
            <li>
              <strong>Chiot (0-6 mois)</strong> : 1 fois par mois (à partir de
              2 semaines)
            </li>
            <li>
              <strong>Chiot (6-12 mois)</strong> : tous les 3 mois (tous les
              trimestres)
            </li>
            <li>
              <strong>Chien adulte (1-7 ans)</strong> : 4 fois par an (1 fois
              tous les 3 mois)
            </li>
            <li>
              <strong>Chien senior (plus de 7 ans)</strong> : 2-4 fois par an selon
              l&apos;exposition à des risques
            </li>
            <li>
              <strong>Chien vivant à la campagne/extérieur</strong> : 4 fois
              par an minimum
            </li>
            <li>
              <strong>Chienne gestante</strong> : consultation vétérinaire
              obligatoire
            </li>
          </ul>
        </div>
        <p className="text-sm text-gray-600">
          Ces recommandations visent à prévenir les infestations parasitaires
          et protéger votre chien contre les vers ronds et plats. Utilisez
          l&apos;outil de calcul ci-dessus pour obtenir la dose exacte selon le
          poids.
        </p>
      </div>
    );
  }

  // ===== GUIDE: Combien fois vermifuger chat =====
  else if (parsed.guide === "combien-fois-vermifuger-chat") {
    pageTitle = "Calendrier Vermifugation Chat";
    pageDescription =
      "Fréquence vermifugation chat : chitons, adultes, seniors. Calendrier recommandé.";
    customContent = (
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Fréquence de Vermifugation Chat selon l&apos;Âge
          </h2>
          <ul className="space-y-3 text-gray-800">
            <li>
              <strong>Chaton (0-6 mois)</strong> : 1 fois par mois (à partir de
              2 semaines d&apos;âge)
            </li>
            <li>
              <strong>Chat adulte (1-7 ans)</strong> : 2 fois par an (tous les
              6 mois)
            </li>
            <li>
              <strong>Chat senior (plus de 7 ans)</strong> : 1-2 fois par an selon
              l&apos;état de santé
            </li>
            <li>
              <strong>Chat d&apos;intérieur</strong> : 1 fois par an (risque
              réduit)
            </li>
            <li>
              <strong>Chat d&apos;extérieur/semi-liberté</strong> : 2 fois par
              an minimum
            </li>
            <li>
              <strong>Chattes gestante/allaitante</strong> : consultation
              vétérinaire
            </li>
          </ul>
        </div>
        <p className="text-sm text-gray-600">
          Les chats, surtout les chatons et chats d&apos;extérieur, sont
          exposés aux parasites. Respectez la fréquence recommandée pour leur
          bien-être.
        </p>
      </div>
    );
  }

  // ===== GUIDE: Frontline vs Bravecto =====
  else if (parsed.guide === "frontline-vs-bravecto") {
    pageTitle = "Frontline vs Bravecto : Comparaison";
    pageDescription =
      "Frontline ou Bravecto pour mon chien ? Prix, efficacité, durée, avantages inconvénients.";
    customContent = (
      <div className="space-y-6">
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Critère</th>
                <th className="px-4 py-3 text-left font-bold">Frontline</th>
                <th className="px-4 py-3 text-left font-bold">Bravecto</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">Matière active</td>
                <td className="px-4 py-3">Fipronil</td>
                <td className="px-4 py-3">Fluralaner</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">Durée</td>
                <td className="px-4 py-3">1 mois</td>
                <td className="px-4 py-3">3 mois</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">Format</td>
                <td className="px-4 py-3">Spot-on (pipette)</td>
                <td className="px-4 py-3">Comprimé ou spot-on</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">Ordonnance</td>
                <td className="px-4 py-3">Non (OTC)</td>
                <td className="px-4 py-3">Oui (prescription)</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">Efficacité tiques</td>
                <td className="px-4 py-3">Bonne</td>
                <td className="px-4 py-3">Excellente (résistance)</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">Prix (approx)</td>
                <td className="px-4 py-3">15-25€ / pipette</td>
                <td className="px-4 py-3">50-70€ / 3 mois</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">Praticité</td>
                <td className="px-4 py-3">Mensuel (moins pratique)</td>
                <td className="px-4 py-3">Trimestriel (plus pratique)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
          <h3 className="font-bold text-green-900 mb-3">
            ✓ Quel choisir ?
          </h3>
          <p className="text-sm text-gray-800">
            <strong>Frontline</strong> si : budget réduit, chien adulte sans
            souci, pas d&apos;ordonnance. <br />
            <strong>Bravecto</strong> si : chien exposé aux tiques résistantes,
            praticité mensuelle importante, ou protection maximale recherchée.
            Consulter votre vétérinaire pour adapter au profil de votre animal.
          </p>
        </div>
      </div>
    );
  }

  // ===== GUIDE: Vermifuge chiot =====
  else if (parsed.guide === "vermifuge-chiot") {
    pageTitle = "Vermifuge Chiot : Guide Complet";
    pageDescription =
      "Vermifuger un chiot : à quel âge, quelle fréquence, quel produit ? Guide sécurité.";
    customContent = (
      <div className="space-y-6">
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-orange-900 mb-4">
            Vermifugation du Chiot : Guide Complet
          </h2>
          <ul className="space-y-3 text-gray-800">
            <li>
              <strong>À partir de 2 semaines</strong> : première vermifugation
              possible (certains produits)
            </li>
            <li>
              <strong>Tous les mois (4-6 semaines)</strong> : jusqu&apos;à 6
              mois d&apos;âge
            </li>
            <li>
              <strong>Tous les 3 mois</strong> : de 6 à 12 mois
            </li>
            <li>
              <strong>Puis 4 fois par an</strong> : à partir d&apos;1 an
              (adulte)
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">
            💊 Quels Produits pour Chiots ?
          </h3>
          <p className="text-sm text-gray-800 mb-3">
            Les chiots nécessitent des dosages spécifiques :
          </p>
          <ul className="space-y-2 text-sm text-gray-800">
            <li>
              <strong>Milbemax chaton</strong> (0.5-2 kg) : 1 comprimé petit
            </li>
            <li>
              <strong>Drontal puppy</strong> (spécial chiot) : dosage par poids
            </li>
            <li>
              <strong>Anti-puces</strong> : pas avant 8-10 semaines selon le
              produit
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
          <h3 className="font-bold text-amber-900 mb-3">⚠️ Précautions Chiots</h3>
          <ul className="space-y-2 text-sm text-gray-800">
            <li>
              • Ne jamais dépasser la dose recommandée (risque d&apos;surdosage)
            </li>
            <li>
              • Vérifier l&apos;âge minimum sur la notice (souvent 2-6 semaines)
            </li>
            <li>
              • Consulter vétérinaire si naissance avant le traitement
            </li>
            <li>
              • Éviter vermifuge si chiot malade ou affaibli (report conseillé)
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <WebAppJsonLd name="Calcul Dose Médicament Animaux" />
      <Breadcrumb
        currentPage={pageTitle || "Dose Médicament"}
        parentPage="Calcul Dose Médicament"
        parentHref="/calcul-dose-medicament-animaux"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {pageTitle || "Calcul Dose Médicament"}
        </h1>
      </div>
      {pageDescription && (
        <p className="text-slate-500 mb-8 ml-[52px]">{pageDescription}</p>
      )}

      {/* Afficher le contenu personnalisé ou le formulaire standard */}
      {customContent ? (
        <div className="mt-8">{customContent}</div>
      ) : (
        <CalculDoseMedicamentAnimaux />
      )}

      <RelatedCalculators currentSlug="/calcul-dose-medicament-animaux" />
    </div>
  );
}
