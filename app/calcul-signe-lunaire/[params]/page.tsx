import type { Metadata } from "next";
import CalculSigneLunaire from "../CalculSigneLunaire";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SIGNES_DATA = [
  { slug: "lune-belier", nom: "Bélier", symbole: "♈", emotion: "Impulsive, ardente, combattive", description: "Emotions impulsives et indépendantes. Le Bélier lunaire agit sans réfléchir aux sentiments, vit l'émotion immédiatement. Relation dynamique avec la mère, parfois conflictuelle." },
  { slug: "lune-taureau", nom: "Taureau", symbole: "♉", emotion: "Stable, sensuelle, possessive", description: "Emotions stables, sensuelles et matérielles. Le Taureau lunaire a besoin de sécurité affective et de confort. Relation fusionnelle et durable avec la mère." },
  { slug: "lune-gemeaux", nom: "Gémeaux", symbole: "♊", emotion: "Changeante, intellectuelle, curieuse", description: "Emotions changeantes, intellectuelles et communicatives. Le Gémeaux lunaire analyse ses sentiments plutôt que de les vivre. Relation basée sur la communication." },
  { slug: "lune-cancer", nom: "Cancer", symbole: "♋", emotion: "Profonde, protectrice, intuitive", description: "Emotions profondes, nourricières et très sensibles. Cancer est le signe de domicile de la Lune. Lien émotionnel intense et primordial avec la mère." },
  { slug: "lune-lion", nom: "Lion", symbole: "♌", emotion: "Dramatique, généreuse, créative", description: "Emotions dramatiques, généreuses et créatives. Le Lion lunaire a besoin de reconnaissance affective et de se sentir aimé. Relation admirative." },
  { slug: "lune-vierge", nom: "Vierge", symbole: "♍", emotion: "Analytique, modeste, anxieuse", description: "Emotions analytiques, modestes et pratiques. La Vierge lunaire critique ses sentiments, doute de ses émotions. Mère critique ou perfectionniste." },
  { slug: "lune-balance", nom: "Balance", symbole: "♎", emotion: "Equilibrée, harmonieuse, diplomatique", description: "Emotions équilibrées, harmonieuses et sociales. La Balance lunaire cherche l'harmonie affective et déteste les conflits. Relation apaisée avec la mère." },
  { slug: "lune-scorpion", nom: "Scorpion", symbole: "♏", emotion: "Intense, mystérieuse, passionnelle", description: "Emotions intenses, mystérieuses et transformatrices. Le Scorpion lunaire vit ses sentiments en profondeur, avec passion. Relation complexe, souvent cachée." },
  { slug: "lune-sagittaire", nom: "Sagittaire", symbole: "♐", emotion: "Optimiste, libre, aventurière", description: "Emotions optimistes, libres et philosophiques. Le Sagittaire lunaire fuit les liens trop étroits, cherche l'indépendance émotionnelle. Relation basée sur la liberté." },
  { slug: "lune-capricorne", nom: "Capricorne", symbole: "♑", emotion: "Contenue, responsable, sérieuse", description: "Emotions contenues, responsables et matures. Le Capricorne lunaire contrôle ses sentiments, difficultés à exprimer ses émotions. Mère stricte ou distante." },
  { slug: "lune-verseau", nom: "Verseau", symbole: "♒", emotion: "Détachée, originale, humaniste", description: "Emotions détachées, originales et humanistes. Le Verseau lunaire intellectualise ses sentiments. Relation distante ou non-conforme avec la mère." },
  { slug: "lune-poissons", nom: "Poissons", symbole: "♓", emotion: "Empathique, fusionnelle, mystique", description: "Emotions empathiques, fusionnelles et mystiques. Le Poissons lunaire absorbe les émotions d'autrui. Relation fusionnelle et symbiotique avec la mère." },
  { slug: "lune-vs-soleil-astrologie", nom: "Lune vs Soleil - Astrologie", type: "faq" },
  { slug: "comment-calculer-signe-lunaire", nom: "Comment calculer votre signe lunaire", type: "faq" },
  { slug: "signe-lunaire-amour", nom: "Signe lunaire et amour", type: "faq" },
  { slug: "signe-lunaire-emotions", nom: "Signe lunaire et émotions", type: "faq" },
];

function parseSlug(slug: string): typeof SIGNES_DATA[0] | null {
  return SIGNES_DATA.find((s) => s.slug === slug) || null;
}

export function generateStaticParams() {
  return SIGNES_DATA.map((s) => ({ params: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const data = parseSlug(slug);
  if (!data) return {};

  if (data.type === "faq") {
    return {
      alternates: { canonical: `/calcul-signe-lunaire/${slug}` },
      title: `${data.nom} - Signe Lunaire Astrologie`,
      description: `Découvrez ${data.nom.toLowerCase()} en astrologie lunaire. Guide complet et gratuit.`,
    };
  }

  return {
    alternates: { canonical: `/calcul-signe-lunaire/${slug}` },
    title: `${data.symbole} Lune en ${data.nom} — Émotions, Inconscient, Relation à la Mère`,
    description: `Tout sur la Lune en ${data.nom} (${data.emotion}). Signification astrologique, émotions, inconscient, relation maternelle et psychologie.`,
    keywords: `lune en ${data.nom.toLowerCase()}, signe lunaire ${data.nom.toLowerCase()}, ${data.nom.toLowerCase()} emotions, lune en astrologie`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const data = parseSlug(slug);
  if (!data) notFound();

  // Pages FAQ
  if (data.type === "faq") {
    return (
      <div>
        <Breadcrumb currentPage={data.nom} parentPage="Signe Lunaire" parentHref="/calcul-signe-lunaire" />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8">🌙 {data.nom}</h1>

        {slug === "lune-vs-soleil-astrologie" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Lune vs Soleil en Astrologie</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Le Soleil et la Lune sont deux astres fondamentaux en astrologie, représentant deux aspects opposés mais complémentaires de votre personnalité.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <p className="text-3xl mb-2">☉</p>
                  <h3 className="font-bold text-slate-800 mb-2">Soleil</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Identité consciente</li>
                    <li>• Essence profonde</li>
                    <li>• Volonté et ambition</li>
                    <li>• Créativité et énergie</li>
                    <li>• Ce que vous montrez</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                  <p className="text-3xl mb-2">☽</p>
                  <h3 className="font-bold text-slate-800 mb-2">Lune</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Monde émotionnel</li>
                    <li>• Inconscient profond</li>
                    <li>• Sensibilité et intuition</li>
                    <li>• Besoins affectifs</li>
                    <li>• Ce que vous cachez</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {slug === "comment-calculer-signe-lunaire" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Comment Calculer votre Signe Lunaire</h2>
              <p>
                Le calcul du signe lunaire repose sur le cycle orbital de la Lune autour de la Terre. Contrairement au Soleil qui est le même pour tous une journée entière, la Lune change de signe environ tous les 2,3 jours.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Les étapes du calcul</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Déterminer votre date de naissance exacte</li>
                <li>Obtenir votre heure de naissance précise (idéalement depuis l'acte de naissance)</li>
                <li>Calculer le nombre de jours écoulés depuis une date de référence astrologique</li>
                <li>Convertir en degrés zodiacaux (la Lune progresse d'environ 13,176° par jour)</li>
                <li>Diviser par 30° pour obtenir le signe lunaire (0-11)</li>
              </ol>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Pourquoi l&apos;heure est cruciale</h3>
              <p>
                Sans l&apos;heure exacte de naissance, le calcul ne peut être qu&apos;approximatif. Une différence de quelques heures peut changer votre signe lunaire. C&apos;est pourquoi il est important d&apos;obtenir votre certificat de naissance officiel.
              </p>
            </div>
          </div>
        )}

        {slug === "signe-lunaire-amour" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Signe Lunaire et Amour</h2>
              <p>
                Votre signe lunaire influence profondément votre manière d&apos;aimer et vos besoins affectifs dans une relation. Tandis que votre Soleil décrit comment vous aimez consciemment, votre Lune révèle vos besoins émotionnels cachés.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Quelques exemples</h3>
              <ul className="space-y-2">
                <li><strong>Lune Cancer :</strong> Cherche l&apos;engagement profond, la fusion émotionnelle, la sécurité</li>
                <li><strong>Lune Gémeaux :</strong> Préfère la communication, l&apos;échange intellectuel, la légèreté</li>
                <li><strong>Lune Scorpion :</strong> Désire l&apos;intensité, la passion, la transformation mutuelle</li>
                <li><strong>Lune Verseau :</strong> Valorise l&apos;indépendance, l&apos;amitié, l&apos;originalité</li>
              </ul>
            </div>
          </div>
        )}

        {slug === "signe-lunaire-emotions" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Signe Lunaire et Émotions</h2>
              <p>
                Votre signe lunaire est le gouverneur de votre monde émotionnel. Il détermine comment vous ressentez, traitez et exprimez (ou cachez) vos émotions au quotidien.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Styles émotionnels par signe</h3>
              <ul className="space-y-2">
                <li><strong>Feu (Bélier, Lion, Sagittaire) :</strong> Emotions ardentes, énergiques, exprimées avec liberté</li>
                <li><strong>Terre (Taureau, Vierge, Capricorne) :</strong> Emotions stables, rationnalisées, difficiles à partager</li>
                <li><strong>Air (Gémeaux, Balance, Verseau) :</strong> Emotions intellectualisées, analysées, parfois superficielles</li>
                <li><strong>Eau (Cancer, Scorpion, Poissons) :</strong> Emotions profondes, intuitives, intensément vécues</li>
              </ul>
            </div>
          </div>
        )}

        <RelatedCalculators currentSlug="/calcul-signe-lunaire" />
      </div>
    );
  }

  // Pages signes lunaires
  return (
    <div>
      <Breadcrumb currentPage={data.nom} parentPage="Signe Lunaire" parentHref="/calcul-signe-lunaire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-indigo-800 rounded-xl flex items-center justify-center text-2xl shadow-sm">
          {data.symbole}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {data.symbole} Lune en {data.nom}
        </h1>
      </div>

      <div className="bg-gradient-to-br from-slate-700 to-indigo-800 text-white rounded-2xl p-8 shadow-lg shadow-slate-500/20 mb-8">
        <p className="text-slate-300 text-sm mb-2">Signe lunaire</p>
        <p className="text-5xl font-extrabold mb-6">{data.symbole} {data.nom}</p>
        <div className="h-px bg-white/20 mb-4" />
        <p className="text-slate-100 text-lg font-semibold mb-4">{data.emotion}</p>
        <p className="text-slate-200 leading-relaxed">{data.description}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Signification astrologique complète</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Avoir la Lune en {data.nom} signifie que la Lune occupait ce signe au moment exact de votre naissance. Cela influence profondément votre monde émotionnel intérieur, vos réactions instinctives et votre relation au nourricier/protecteur (symbolisé par la mère en astrologie traditionnelle).
          </p>
          <p>
            Cette position lunaire teinte également votre mémoire émotionnelle, vos habitudes psychologiques et la manière dont vous recherchez la sécurité affective au cours de votre vie.
          </p>
        </div>
      </div>

      <CalculSigneLunaire />


      <RelatedCalculators currentSlug="/calcul-signe-lunaire" />
    </div>
  );
}
