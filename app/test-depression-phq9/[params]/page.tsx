import type { Metadata } from "next";
import TestDepressionPhq9 from "../TestDepressionPhq9";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface VariantePhq9 {
  slug: string;
  titreH1: string;
  metaTitre: string;
  metaDescription: string;
  contexte: string;
  pointsCles: string[];
}

const VARIANTES: VariantePhq9[] = [
  {
    slug: "test-depression-en-ligne",
    titreH1: "Test de depression en ligne PHQ-9 (gratuit)",
    metaTitre: "Test Depression en Ligne PHQ-9 - Gratuit, Sans Inscription",
    metaDescription:
      "Test de depression en ligne base sur le PHQ-9 officiel. 9 questions, 5 minutes, resultat immediat avec interpretation et conseils. Anonyme, sans inscription.",
    contexte:
      "Realiser un test de depression en ligne est une premiere etape utile pour objectiver ses symptomes. Le PHQ-9 est l'outil scientifique le plus reconnu, utilise par les medecins du monde entier en consultation.",
    pointsCles: [
      "9 questions validees scientifiquement (Kroenke 2001)",
      "Calcul realise dans votre navigateur (donnees non envoyees)",
      "Resultat sur 5 niveaux (minimale a severe)",
      "Conseils personnalises selon votre score",
      "Numeros d'aide en cas de detresse",
    ],
  },
  {
    slug: "depression-saisonniere-test",
    titreH1: "Test depression saisonniere (hiver, TAS) avec PHQ-9",
    metaTitre: "Test Depression Saisonniere TAS - PHQ-9 Adapte Hiver",
    metaDescription:
      "La depression saisonniere (Trouble Affectif Saisonnier) touche 1 a 4% des Francais en hiver. Test PHQ-9 pour identifier vos symptomes en periode automne-hiver.",
    contexte:
      "Le Trouble Affectif Saisonnier (TAS) ou depression hivernale est lie au manque de lumiere naturelle. Symptomes typiques : fatigue, hypersomnie, prise de poids, envie de sucre, baisse d'energie a partir de novembre.",
    pointsCles: [
      "Symptomes recurrents en automne-hiver chaque annee",
      "Lie au manque de lumiere (melatonine, serotonine)",
      "Luminotherapie efficace dans 60 a 80% des cas",
      "Test PHQ-9 valide en periode d'exposition saisonniere",
      "Differencier blues hivernal d'une vraie depression",
    ],
  },
  {
    slug: "depression-post-partum-test",
    titreH1: "Test depression post-partum avec PHQ-9 (mamans)",
    metaTitre: "Test Depression Post-Partum - PHQ-9 Maman Apres Accouchement",
    metaDescription:
      "10 a 20% des mamans developpent une depression post-partum apres l'accouchement. Test PHQ-9 pour evaluer vos symptomes (utiliser aussi l'EPDS).",
    contexte:
      "La depression post-partum touche 10 a 20% des accouchees, dans les semaines ou mois suivant la naissance. Le PHQ-9 est utilisable, mais l'echelle EPDS (Edinburgh) est aussi specifiquement recommandee pour le post-partum.",
    pointsCles: [
      "Survient entre 2 semaines et 1 an apres l'accouchement",
      "Differencier du baby blues (transitoire, premiers jours)",
      "Symptomes : tristesse, anxiete, culpabilite, fatigue",
      "Consequences sur la mere et le lien mere-bebe",
      "Prise en charge precoce indispensable (TCC, medicaments)",
    ],
  },
  {
    slug: "depression-adolescent-test",
    titreH1: "Test depression adolescent (PHQ-A et PHQ-9)",
    metaTitre: "Test Depression Adolescent PHQ-A - Ado Lycee College",
    metaDescription:
      "10 a 15% des adolescents souffrent de depression. Test PHQ-9 adapte aux adolescents (PHQ-A) pour evaluer les symptomes a partir de 12 ans.",
    contexte:
      "La depression de l'adolescent est souvent atypique : irritabilite plus que tristesse, isolement social, baisse des resultats scolaires, troubles du sommeil. Le PHQ-A (version adaptee) est valide a partir de 12 ans.",
    pointsCles: [
      "Touche 10 a 15% des 12-18 ans en France",
      "Symptomes atypiques : irritabilite, retrait social",
      "Lien fort avec harcelement scolaire et reseaux sociaux",
      "Risque suicidaire : 2e cause de mortalite chez les 15-24 ans",
      "Consulter pediatre, medecin scolaire ou psychologue",
    ],
  },
  {
    slug: "test-depression-personnes-agees",
    titreH1: "Test depression personnes agees (PHQ-9 gerontologie)",
    metaTitre: "Test Depression Personne Agee - PHQ-9 Senior Gerontologie",
    metaDescription:
      "15 a 25% des personnes agees presentent une depression. Test PHQ-9 valide en gerontologie, complementaire de la GDS (Geriatric Depression Scale).",
    contexte:
      "La depression du sujet age est sous-diagnostiquee : confondue avec le vieillissement normal ou des problemes somatiques. Le PHQ-9 est valide chez les seniors, en complement de la GDS specifique.",
    pointsCles: [
      "Toucher 15 a 25% des plus de 65 ans",
      "Symptomes souvent corporels (douleurs, troubles du sommeil)",
      "Lie a l'isolement, deuils, perte d'autonomie",
      "Risque suicidaire eleve chez les hommes ages",
      "Combinaison medicamenteuse et soutien psychologique",
    ],
  },
  {
    slug: "depression-burnout-difference",
    titreH1: "Difference depression et burnout : tester avec PHQ-9 et MBI",
    metaTitre: "Depression vs Burnout - Test PHQ-9 + MBI Differencier",
    metaDescription:
      "Difference depression et burnout : symptomes, causes, traitements. Realiser le PHQ-9 ET le MBI permet de cibler la prise en charge adequate.",
    contexte:
      "Depression et burnout partagent des symptomes (fatigue, perte d'envie) mais different : le burnout est specifique au travail, la depression est globale. Le PHQ-9 et le MBI sont complementaires pour distinguer les deux.",
    pointsCles: [
      "Depression = trouble global de l'humeur",
      "Burnout = epuisement specifique au contexte professionnel",
      "Recuperation : depression necessite traitement complet",
      "Burnout peut s'ameliorer par changement de poste",
      "Comorbidite frequente : 50% des burnouts evoluent en depression",
    ],
  },
  {
    slug: "phq-9-validite-scientifique",
    titreH1: "Validite scientifique du PHQ-9 (sensibilite, specificite)",
    metaTitre: "Validite PHQ-9 - Sensibilite Specificite Etudes Scientifiques",
    metaDescription:
      "Le PHQ-9 a une sensibilite et specificite de 88% pour la depression majeure. Etudes scientifiques de validation : Kroenke 2001, meta-analyses 2013 et 2020.",
    contexte:
      "Le PHQ-9 est l'un des outils les plus etudies en psychiatrie : plus de 100 etudes de validation dans plus de 30 langues. Ses qualites psychometriques en font le standard mondial.",
    pointsCles: [
      "Sensibilite 88% (etude Kroenke 2001 - 6000 patients)",
      "Specificite 88% au seuil de 10",
      "Coefficient alpha de Cronbach 0,86 a 0,89",
      "Sensible au changement (suivi therapeutique)",
      "Valide dans plus de 30 langues et cultures",
    ],
  },
  {
    slug: "score-phq-9-interpretation",
    titreH1: "Interpretation du score PHQ-9 (5 niveaux detailles)",
    metaTitre: "Score PHQ-9 Interpretation - Que Veut Dire Mon Resultat",
    metaDescription:
      "Comprendre votre score PHQ-9 : 0-4 minimale, 5-9 legere, 10-14 moderee, 15-19 moderement severe, 20-27 severe. Recommandations par niveau.",
    contexte:
      "Le score total du PHQ-9 va de 0 a 27 (9 questions x 0 a 3 points). Les seuils Kroenke 2001 definissent 5 niveaux d'intensite, chacun avec des recommandations specifiques.",
    pointsCles: [
      "0-4 : surveillance simple (pas d'intervention)",
      "5-9 : surveillance + facteurs protecteurs",
      "10-14 : consultation medicale recommandee",
      "15-19 : prise en charge active (TCC + medicaments)",
      "20-27 : urgence medicale, traitement antidepresseur",
    ],
  },
  {
    slug: "phq-9-versus-beck-bdi",
    titreH1: "PHQ-9 vs echelle de Beck (BDI) : quel test choisir ?",
    metaTitre: "PHQ-9 vs Beck BDI - Comparaison Tests Depression",
    metaDescription:
      "Comparaison PHQ-9 et echelle de Beck (BDI-II) : 9 questions vs 21 questions, criteres DSM-5, sensibilite, contextes d'usage. Avantages et inconvenients.",
    contexte:
      "L'echelle de Beck (BDI-II) et le PHQ-9 sont les deux echelles de depression les plus utilisees. Le PHQ-9 est plus court (9 vs 21 questions) et aligne avec le DSM-5. Le BDI-II est historiquement plus utilise en recherche.",
    pointsCles: [
      "PHQ-9 : 9 questions, 5 minutes, gratuit, DSM-5",
      "BDI-II : 21 questions, 10 minutes, payant",
      "PHQ-9 : meilleur pour le depistage en soins primaires",
      "BDI-II : plus detaille pour le suivi clinique",
      "Sensibilite et specificite comparables (85 a 90%)",
    ],
  },
  {
    slug: "depression-anxiete-test-combine",
    titreH1: "Test combine depression et anxiete (PHQ-9 + GAD-7)",
    metaTitre: "Test Depression Anxiete PHQ-9 GAD-7 - Combine Validates",
    metaDescription:
      "60% des depressions s'accompagnent d'anxiete. Realiser PHQ-9 (depression) ET GAD-7 (anxiete generalisee) donne un panorama complet de votre etat.",
    contexte:
      "Depression et anxiete coexistent dans 60% des cas. Le PHQ-9 (depression) et le GAD-7 (anxiete generalisee, Spitzer 2006) sont developpes par la meme equipe et complementaires.",
    pointsCles: [
      "GAD-7 = test anxiete en 7 questions (echelle 0 a 3)",
      "Comorbidite depression-anxiete dans 60% des cas",
      "PHQ-9 + GAD-7 = 16 questions, 5 minutes",
      "Tests utilises en consultation generaliste",
      "Combinaison permet de cibler le traitement",
    ],
  },
  {
    slug: "depression-homme-test-symptomes",
    titreH1: "Depression chez l'homme : symptomes specifiques et PHQ-9",
    metaTitre: "Depression Homme - Symptomes Atypiques + Test PHQ-9",
    metaDescription:
      "Les hommes presentent des symptomes atypiques de depression : irritabilite, alcool, retrait, somatisation. Le PHQ-9 reste valide, mais l'expression masquee complique le diagnostic.",
    contexte:
      "Les hommes sont 2 fois moins diagnostiques que les femmes pour la depression, mais 3 fois plus suicidaires. L'expression masquee (alcool, agressivite, surinvestissement professionnel) cache souvent une depression.",
    pointsCles: [
      "Sous-diagnostic massif chez l'homme (1 pour 2 chez la femme)",
      "Symptomes atypiques : colere, agressivite, hyperactivite",
      "Strategies d'evitement : alcool, drogue, travail excessif",
      "Risque suicidaire 3 fois superieur a la femme",
      "Stigma fort de la sante mentale chez les hommes",
    ],
  },
  {
    slug: "phq-9-suivi-traitement",
    titreH1: "Utiliser le PHQ-9 pour suivre l'evolution sous traitement",
    metaTitre: "PHQ-9 Suivi Traitement - Evaluer Antidepresseur / TCC",
    metaDescription:
      "Le PHQ-9 est sensible au changement : utile pour suivre l'efficacite d'un antidepresseur ou d'une TCC. Repeter le test toutes les 2 a 4 semaines.",
    contexte:
      "Le PHQ-9 est l'echelle de reference pour mesurer la reponse au traitement de la depression. Une diminution de 5 points est consideree comme une reponse cliniquement significative.",
    pointsCles: [
      "Repeter le test toutes les 2 a 4 semaines de traitement",
      "Baisse de 5 points = reponse cliniquement significative",
      "Remission si score inferieur a 5",
      "Reponse partielle si baisse de 50% du score initial",
      "Echelle sensible aux antidepresseurs et a la TCC",
    ],
  },
];

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) return {};

  return {
    alternates: { canonical: `/test-depression-phq9/${slug}` },
    title: variante.metaTitre,
    description: variante.metaDescription,
    keywords: `${slug}, test depression, phq9, depression test, depression francais`,
    openGraph: {
      title: variante.metaTitre,
      description: variante.metaDescription,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const variante = VARIANTES.find((v) => v.slug === slug);
  if (!variante) notFound();

  const autresVariantes = VARIANTES.filter((v) => v.slug !== slug).slice(0, 6);

  return (
    <div>
      <Breadcrumb
        currentPage={variante.titreH1}
        parentPage="Test Depression PHQ-9"
        parentHref="/test-depression-phq9"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-pink-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {variante.titreH1}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Test Patient Health Questionnaire-9 (PHQ-9), outil de depistage de la
        depression valide scientifiquement et utilise en medecine generale.
      </p>

      <section className="mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-rose-900 mb-3">
          Contexte specifique
        </h2>
        <p className="text-rose-800 mb-4 leading-relaxed">
          {variante.contexte}
        </p>
        <p className="font-semibold text-rose-900 mb-2">
          A retenir :
        </p>
        <ul className="space-y-1 text-sm text-rose-800">
          {variante.pointsCles.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-600 mt-1">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <TestDepressionPhq9 />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres variantes du test PHQ-9
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {autresVariantes.map((v) => (
            <a
              key={v.slug}
              href={`/test-depression-phq9/${v.slug}`}
              className="block p-3 rounded-lg border border-slate-200 hover:border-rose-400 hover:bg-rose-50 transition"
            >
              <p className="font-semibold text-slate-800 text-sm">
                {v.titreH1}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Sources scientifiques
        </h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>
            <strong>Kroenke K., Spitzer R.L., Williams J.B.W. (2001).</strong>{" "}
            The PHQ-9: Validity of a Brief Depression Severity Measure.{" "}
            <em>Journal of General Internal Medicine</em>, 16(9), 606-613.
            Article fondateur du PHQ-9.
          </li>
          <li>
            <strong>OMS (2019).</strong> Classification internationale des
            maladies (CIM-11). Criteres diagnostiques de l&apos;episode
            depressif (6A70 a 6A73).
          </li>
          <li>
            <strong>INSERM (2017).</strong> Rapport &laquo; Depression : une
            maladie qui se soigne &raquo;. Validation et recommandations
            d&apos;usage du PHQ-9 en France.
          </li>
          <li>
            <strong>Sante publique France (2021).</strong> Barometre sante
            mentale. Prevalence depression en France et outils de depistage.
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/test-depression-phq9" />
    </div>
  );
}
