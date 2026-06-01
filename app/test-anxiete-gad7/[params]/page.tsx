import type { Metadata } from "next";
import TestAnxieteGAD7 from "../TestAnxieteGAD7";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface VarianteInfo {
  slug: string;
  titre: string;
  h1: string;
  description: string;
  keywords: string;
  contexte: string;
  conseil: string;
  emoji: string;
}

const VARIANTES: VarianteInfo[] = [
  {
    slug: "anxiete-travail",
    titre: "Test anxiete au travail",
    h1: "Test anxiete au travail (GAD-7)",
    description:
      "Evaluez votre anxiete liee au travail avec l'echelle GAD-7. Stress professionnel, burn-out, pression. Test rapide et anonyme.",
    keywords:
      "anxiete travail, stress professionnel, burn-out, GAD-7 entreprise, test stress travail",
    contexte:
      "L'anxiete liee au travail touche pres d'un actif sur trois en France. Le GAD-7 permet d'objectiver votre ressenti et de decider si une consultation est utile.",
    conseil:
      "Si votre score est superieur a 10, parlez-en a votre medecin du travail. La medecine du travail est gratuite, confidentielle et peut amorcer une prise en charge.",
    emoji: "💼",
  },
  {
    slug: "anxiete-etudiant",
    titre: "Test anxiete etudiant",
    h1: "Test anxiete etudiant (GAD-7)",
    description:
      "Test d'anxiete pour etudiants : examens, partiels, pression scolaire. Echelle GAD-7 validee, gratuit et anonyme.",
    keywords:
      "anxiete etudiant, stress examens, anxiete partiels, GAD-7 etudiant, depression etudiant",
    contexte:
      "Pres de 50% des etudiants declarent des symptomes d'anxiete reguliers. Le GAD-7 vous aide a evaluer si votre ressenti est dans la norme ou s'il merite une attention.",
    conseil:
      "Les BAPU (Bureaux d'Aide Psychologique Universitaire) proposent des consultations gratuites. Le 3114 est aussi disponible 24h/24.",
    emoji: "🎓",
  },
  {
    slug: "anxiete-generalisee",
    titre: "Test anxiete generalisee (TAG)",
    h1: "Test anxiete generalisee (TAG) - GAD-7",
    description:
      "Echelle GAD-7 specifique au trouble anxieux generalise. Depistage scientifique du TAG selon les criteres DSM-5.",
    keywords:
      "trouble anxieux generalise, TAG, anxiete generalisee, GAD-7 DSM-5, depistage TAG",
    contexte:
      "Le trouble anxieux generalise (TAG) touche environ 6% des adultes. Il se caracterise par des inquietudes excessives, persistantes et incontrolables sur plusieurs sujets de la vie quotidienne.",
    conseil:
      "Un score GAD-7 superieur ou egal a 10, associe a une duree de plus de 6 mois, oriente fortement vers un TAG. Une consultation est recommandee.",
    emoji: "🧠",
  },
  {
    slug: "anxiete-sociale",
    titre: "Test anxiete sociale",
    h1: "Test anxiete sociale (GAD-7)",
    description:
      "Anxiete sociale, phobie sociale, peur du regard des autres : evaluez votre niveau avec l'echelle GAD-7.",
    keywords:
      "anxiete sociale, phobie sociale, GAD-7, peur regard autres, timidite anxieuse",
    contexte:
      "L'anxiete sociale est differente de la timidite : elle entraine une souffrance et un evitement. Le GAD-7 evalue l'anxiete generale, qui est souvent associee.",
    conseil:
      "Pour la phobie sociale specifiquement, l'echelle LSAS (Liebowitz Social Anxiety Scale) est plus adaptee. Une TCC est tres efficace.",
    emoji: "👥",
  },
  {
    slug: "depistage-rapide",
    titre: "Depistage anxiete rapide",
    h1: "Depistage rapide anxiete (GAD-7, 2 minutes)",
    description:
      "Test de depistage rapide de l'anxiete en 2 minutes. Echelle GAD-7 internationale, 7 questions, score automatique.",
    keywords:
      "depistage anxiete rapide, test anxiete 2 minutes, GAD-7 rapide, auto-evaluation anxiete",
    contexte:
      "Le GAD-7 est concu pour etre rempli en 2 a 3 minutes. C'est l'outil de depistage de l'anxiete le plus utilise dans les soins primaires au monde.",
    conseil:
      "Refaites le test toutes les 2 semaines si vous suivez votre evolution. La variation du score est aussi un indicateur utile.",
    emoji: "⏱️",
  },
  {
    slug: "anxiete-adolescent",
    titre: "Test anxiete adolescent",
    h1: "Test anxiete pour adolescent (GAD-7)",
    description:
      "Test d'anxiete adapte aux adolescents. Echelle GAD-7 validee chez les jeunes de 13 a 18 ans.",
    keywords:
      "anxiete adolescent, GAD-7 adolescent, test anxiete jeune, depistage anxiete ado",
    contexte:
      "Le GAD-7 a ete valide chez les adolescents (etude Mossman 2017). Les seuils restent les memes que chez l'adulte.",
    conseil:
      "Maison des Adolescents (gratuit, anonyme) ou Fil Sante Jeunes 0 800 235 236 sont des ressources gratuites pour les ados.",
    emoji: "🧑‍🎓",
  },
  {
    slug: "anxiete-grossesse",
    titre: "Test anxiete grossesse",
    h1: "Test anxiete pendant la grossesse (GAD-7)",
    description:
      "Anxiete prenatale et grossesse : evaluez votre niveau avec le GAD-7. Specificites de l'anxiete chez la femme enceinte.",
    keywords:
      "anxiete grossesse, anxiete prenatale, GAD-7 femme enceinte, depression grossesse",
    contexte:
      "L'anxiete prenatale touche 10 a 15% des femmes enceintes. Elle est souvent sous-diagnostiquee et peut impacter le developpement du bebe.",
    conseil:
      "Parlez-en a votre sage-femme ou gynecologue. Des consultations psychologiques perinatales existent et sont remboursees.",
    emoji: "🤰",
  },
  {
    slug: "anxiete-post-partum",
    titre: "Test anxiete post-partum",
    h1: "Test anxiete post-partum (GAD-7)",
    description:
      "Anxiete apres l'accouchement : evaluez votre niveau avec le GAD-7. Different du baby blues, l'anxiete post-partum merite attention.",
    keywords:
      "anxiete post-partum, anxiete apres accouchement, depression post-partum, GAD-7 maman",
    contexte:
      "L'anxiete post-partum est souvent confondue avec le baby blues. Elle touche environ 10% des meres et peut persister plusieurs mois.",
    conseil:
      "Consultez rapidement votre medecin ou la PMI. Le dispositif des 1000 premiers jours propose un suivi specifique.",
    emoji: "👶",
  },
  {
    slug: "anxiete-confinement",
    titre: "Test anxiete confinement",
    h1: "Test anxiete liee au confinement (GAD-7)",
    description:
      "Anxiete liee au confinement, isolement, restrictions sanitaires : evaluez votre niveau avec le GAD-7.",
    keywords:
      "anxiete confinement, anxiete covid, anxiete isolement, GAD-7 pandemie",
    contexte:
      "Les periodes de confinement et de restrictions sanitaires ont augmente l'anxiete generalisee de 25% selon l'OMS.",
    conseil:
      "Maintenez un rythme de sommeil regulier, une activite physique meme breve, et un lien social meme a distance. Le 3114 reste disponible.",
    emoji: "🏠",
  },
  {
    slug: "anxiete-couple",
    titre: "Test anxiete dans le couple",
    h1: "Test anxiete dans le couple (GAD-7)",
    description:
      "Tensions, jalousie, peur de la separation : evaluez votre niveau d'anxiete liee au couple avec le GAD-7.",
    keywords:
      "anxiete couple, anxiete relationnelle, GAD-7 couple, peur separation",
    contexte:
      "L'anxiete dans le couple est souvent liee a un style d'attachement anxieux. Le GAD-7 mesure l'anxiete globale, qui peut s'exprimer dans la relation.",
    conseil:
      "Une therapie de couple ou individuelle peut aider. Les psychologues conventionnes Mon Soutien Psy sont remboursees.",
    emoji: "💑",
  },
  {
    slug: "anxiete-financiere",
    titre: "Test anxiete financiere",
    h1: "Test anxiete financiere (GAD-7)",
    description:
      "Inquietudes liees a l'argent, dettes, precarite : evaluez votre niveau d'anxiete financiere avec le GAD-7.",
    keywords:
      "anxiete financiere, stress argent, anxiete dettes, GAD-7 finances",
    contexte:
      "L'anxiete financiere touche pres de 40% des francais selon les enquetes. Elle peut entrainer un cercle vicieux entre anxiete et difficultes economiques.",
    conseil:
      "Les Points Conseil Budget (PCB) accompagnent gratuitement. CCAS et associations comme Crozole peuvent aussi aider.",
    emoji: "💰",
  },
  {
    slug: "anxiete-conducteur",
    titre: "Test anxiete au volant",
    h1: "Test anxiete au volant (GAD-7)",
    description:
      "Peur de conduire, amaxophobie, anxiete au volant : evaluez votre niveau d'anxiete generale avec le GAD-7.",
    keywords:
      "anxiete volant, peur conduire, amaxophobie, GAD-7 conduite",
    contexte:
      "La peur de conduire (amaxophobie) est une phobie specifique. Le GAD-7 mesure l'anxiete generale, qui peut etre coexistante.",
    conseil:
      "Des stages anti-stress au volant existent. Une TCC est tres efficace pour la phobie de conduire.",
    emoji: "🚗",
  },
  {
    slug: "anxiete-avion",
    titre: "Test anxiete avion",
    h1: "Test anxiete avion (GAD-7)",
    description:
      "Peur de l'avion, aerophobie : evaluez votre niveau d'anxiete generale avec le GAD-7.",
    keywords:
      "anxiete avion, peur avion, aerophobie, GAD-7 voyage",
    contexte:
      "L'aerophobie touche 20% de la population. Le GAD-7 mesure l'anxiete generale, qui peut etre associee.",
    conseil:
      "Air France et d'autres compagnies proposent des stages anti-stress aerien. La realite virtuelle est aussi tres efficace.",
    emoji: "✈️",
  },
  {
    slug: "anxiete-sante",
    titre: "Test hypocondrie / anxiete sante",
    h1: "Test anxiete liee a la sante (GAD-7)",
    description:
      "Hypocondrie, peur de la maladie, anxiete sante : evaluez votre niveau d'anxiete avec le GAD-7.",
    keywords:
      "anxiete sante, hypocondrie, peur maladie, GAD-7 sante, anxiete medicale",
    contexte:
      "L'anxiete sante (anciennement hypocondrie) est frequente. Elle est associee a une anxiete generalisee dans 60% des cas.",
    conseil:
      "Evitez de chercher sur internet (cyberchondrie). Une TCC specifique a l'anxiete sante est tres efficace.",
    emoji: "🏥",
  },
  {
    slug: "anxiete-burn-out",
    titre: "Test anxiete burn-out",
    h1: "Test anxiete et burn-out (GAD-7)",
    description:
      "Epuisement professionnel, burn-out : evaluez votre niveau d'anxiete avec le GAD-7. Complete par le MBI.",
    keywords:
      "anxiete burn-out, epuisement professionnel, GAD-7 burn-out, depistage burn-out",
    contexte:
      "Le burn-out comporte trois dimensions : epuisement, depersonnalisation, perte d'accomplissement. Il est souvent associe a une anxiete elevee.",
    conseil:
      "Le MBI (Maslach Burnout Inventory) est plus specifique au burn-out. Un arret de travail et une prise en charge psychologique sont souvent necessaires.",
    emoji: "🔥",
  },
];

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

function getVariante(slug: string): VarianteInfo | null {
  return VARIANTES.find((v) => v.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const v = getVariante(slug);
  if (!v) return {};

  return {
    alternates: { canonical: `/test-anxiete-gad7/${slug}` },
    title: `${v.titre} - GAD-7 en ligne`,
    description: v.description,
    keywords: v.keywords,
    openGraph: {
      title: v.h1,
      description: v.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const v = getVariante(slug);
  if (!v) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Comment fonctionne le ${v.titre} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${v.contexte} L'echelle GAD-7 vous pose 7 questions sur les 2 dernieres semaines, notees chacune de 0 a 3. Le score total (0 a 21) est interprete en 4 niveaux : minimale (0-4), legere (5-9), moderee (10-14), severe (15-21).`,
        }
      },
      {
        "@type": "Question",
        name: "Le test est-il fiable et anonyme ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Le GAD-7 est valide scientifiquement (Spitzer 2006, sensibilite 89%). Le test est entierement anonyme et gratuit, aucune donnee n'est conservee.",
        }
      },
      {
        "@type": "Question",
        name: "Que faire apres le test ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: v.conseil,
        }
      }
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={v.titre}
        parentPage="Test GAD-7"
        parentHref="/test-anxiete-gad7"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {v.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{v.h1}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{v.description}</p>

      <section className="mb-8 bg-violet-50 border border-violet-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-violet-900 mb-2">Contexte</h2>
        <p className="text-violet-800 text-sm leading-relaxed">{v.contexte}</p>
      </section>

      <TestAnxieteGAD7 />


      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-3">
          Conseil pour cette situation
        </h2>
        <p className="text-blue-800 leading-relaxed">{v.conseil}</p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres tests d&apos;anxiete contextualises
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {VARIANTES.filter((other) => other.slug !== v.slug)
            .slice(0, 8)
            .map((other) => (
              <a
                key={other.slug}
                href={`/test-anxiete-gad7/${other.slug}`}
                className="block p-3 rounded-lg border border-slate-200 hover:border-violet-400 hover:bg-violet-50 transition"
              >
                <span className="text-lg mr-2">{other.emoji}</span>
                <strong>{other.titre}</strong>
              </a>
            ))}
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">A propos du GAD-7</h2>
        <p className="text-slate-600 leading-relaxed mb-3">
          Le GAD-7 (Generalized Anxiety Disorder 7-item scale) est l&apos;echelle
          d&apos;auto-evaluation de l&apos;anxiete la plus utilisee dans le monde.
          Developpee par Spitzer et al. en 2006, elle est recommandee par
          l&apos;OMS et la HAS francaise.
        </p>
        <p className="text-slate-600 text-sm">
          Sources : Spitzer RL et al., Arch Intern Med 2006 ; HAS guidelines ;
          OMS mhGAP ; validation francaise Micoulaud-Franchi 2016.
        </p>
      </section>

      <RelatedCalculators currentSlug="/test-anxiete-gad7" />
    </div>
  );
}
