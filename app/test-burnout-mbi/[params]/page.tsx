import type { Metadata } from "next";
import TestBurnoutMbi from "../TestBurnoutMbi";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

// Variantes : metiers et thematiques liees au burnout
interface VarianteBurnout {
  slug: string;
  titreH1: string;
  metaTitre: string;
  metaDescription: string;
  contextePro: string;
  facteurs: string[];
}

const VARIANTES: VarianteBurnout[] = [
  {
    slug: "burnout-soignant",
    titreH1: "Test burnout pour soignants (infirmiers, aides-soignants)",
    metaTitre: "Test Burnout Soignant - MBI Officiel Infirmiers / Aides-Soignants",
    metaDescription:
      "Test MBI specifique aux soignants : infirmiers, aides-soignants, hospitaliers. 22 questions, score sur 3 dimensions. Validation FR Dion & Tessier.",
    contextePro:
      "Les soignants sont la population la plus exposee au burnout : surcharge, manque d'effectifs, confrontation a la souffrance et au deces. Une etude de la DREES estime que 30 a 40% des infirmiers presentent des signes de burnout.",
    facteurs: [
      "Sous-effectif chronique en hopital",
      "Charge emotionnelle (deces, annonces difficiles)",
      "Horaires en 12h, gardes de nuit",
      "Manque de reconnaissance institutionnelle",
      "Violences verbales de patients ou familles",
    ],
  },
  {
    slug: "burnout-enseignant",
    titreH1: "Test burnout pour enseignants (professeurs, instituteurs)",
    metaTitre: "Test Burnout Enseignant - MBI Profs / Instits (Gratuit)",
    metaDescription:
      "Test MBI Maslach adapte au contexte enseignant. 22 questions, 3 dimensions. Pour profs, instituteurs, professeurs des ecoles, enseignants du superieur.",
    contextePro:
      "L'enseignement cumule charge cognitive, gestion de classe, attentes institutionnelles et pression parentale. Le rapport Carcopino 2019 estime que 14% des enseignants francais sont en burnout severe.",
    facteurs: [
      "Classes surchargees et gestion de la discipline",
      "Sentiment d'inefficacite pedagogique",
      "Conflits avec parents d'eleves",
      "Reformes incessantes du systeme educatif",
      "Faible reconnaissance salariale et symbolique",
    ],
  },
  {
    slug: "burnout-manager",
    titreH1: "Test burnout pour managers et cadres",
    metaTitre: "Test Burnout Manager Cadre - MBI Pression Hierarchique",
    metaDescription:
      "Test MBI pour managers et cadres : pression hierarchique double, responsabilites equipe, charge mentale. 22 questions Maslach, validation francaise.",
    contextePro:
      "Les managers subissent une double pression : remontante (direction) et descendante (equipe). 38% des cadres declarent un haut niveau d'epuisement professionnel selon le barometre Malakoff Humanis 2024.",
    facteurs: [
      "Pression hierarchique permanente (objectifs, KPI)",
      "Conflits de loyaute entre direction et equipe",
      "Hyperconnexion (emails, slack hors heures)",
      "Reorganisations et plans sociaux a piloter",
      "Solitude du manager (peu de soutien pair)",
    ],
  },
  {
    slug: "burnout-medecin",
    titreH1: "Test burnout pour medecins et internes",
    metaTitre: "Test Burnout Medecin - MBI Praticiens / Internes en Medecine",
    metaDescription:
      "Test MBI pour medecins liberaux, hospitaliers, internes. Charge horaire extreme, responsabilite vitale, paperasse administrative. 22 questions.",
    contextePro:
      "Les medecins ont des taux de burnout records : 50% des medecins generalistes selon le CNOM 2023, et plus de 65% des internes. Le suicide chez les soignants est 2x superieur a la population generale.",
    facteurs: [
      "Heures de garde et de travail elevees (60h+/semaine)",
      "Responsabilite vitale (erreurs medicales)",
      "Paperasse administrative croissante",
      "Deserts medicaux et pression patientele",
      "Stigma de la consultation chez un confrere",
    ],
  },
  {
    slug: "burnout-aidant-familial",
    titreH1: "Test burnout pour aidants familiaux (parents, enfants d'aines)",
    metaTitre: "Test Burnout Aidant - MBI Adapte aux Aidants Familiaux",
    metaDescription:
      "Test MBI adapte aux aidants familiaux : conjoint, parent ou enfant d'une personne dependante. Charge invisible, 24h/24, isolement social.",
    contextePro:
      "11 millions d'aidants en France selon la DREES. Le burnout de l'aidant n'est pas le burnout au travail strict, mais le MBI reste valide pour mesurer l'epuisement, le retrait emotionnel et la perte de sens dans l'accompagnement.",
    facteurs: [
      "Charge mentale et physique 24h/24",
      "Isolement social progressif",
      "Culpabilite (de ne pas en faire assez ou de craquer)",
      "Renoncement professionnel ou financier",
      "Anticipation du deuil",
    ],
  },
  {
    slug: "burnout-commercial",
    titreH1: "Test burnout pour commerciaux et fonctions vente",
    metaTitre: "Test Burnout Commercial - MBI Vente / Comptes Clients",
    metaDescription:
      "Test MBI pour commerciaux, business developers, account managers. Objectifs trimestriels, refus repetes, pression resultats. 22 questions.",
    contextePro:
      "Les commerciaux subissent une pression quantitative (chiffres, quotas) ET qualitative (refus, abandons). Etudes 2023 : 32% des commerciaux B2B presentent des symptomes de burnout severes.",
    facteurs: [
      "Objectifs trimestriels ou mensuels eleves",
      "Taux de refus client eleve (8 sur 10 prospects)",
      "Variable de remuneration anxiogene",
      "Concurrence interne entre commerciaux",
      "Voyages frequents, vie de famille perturbee",
    ],
  },
  {
    slug: "burnout-entrepreneur",
    titreH1: "Test burnout pour entrepreneurs et fondateurs de startup",
    metaTitre: "Test Burnout Entrepreneur - MBI Fondateur / Startup",
    metaDescription:
      "Test MBI pour entrepreneurs, fondateurs, freelances. Charge mentale 24/7, solitude du dirigeant, instabilite financiere. 22 questions.",
    contextePro:
      "Les entrepreneurs cumulent solitude, instabilite financiere et identification totale au projet. Une etude Bpifrance 2023 estime que 17% des dirigeants de PME ont fait un burnout au cours des 12 derniers mois.",
    facteurs: [
      "Solitude decisionnelle (pas de pair, pas de boss)",
      "Identification totale projet = identite",
      "Instabilite financiere et trésorerie",
      "Hyperdisponibilite client, equipe, investisseurs",
      "Stigma de l'echec entrepreneurial",
    ],
  },
  {
    slug: "burnout-travail-social",
    titreH1: "Test burnout pour travailleurs sociaux (assistants sociaux, educateurs)",
    metaTitre: "Test Burnout Travail Social - MBI ASE / Educateurs",
    metaDescription:
      "Test MBI pour assistants sociaux, educateurs specialises, ASE, prevention. Confrontation a la misere, manque de moyens, dossiers lourds.",
    contextePro:
      "Le travail social est l'un des secteurs les plus touches : 45% des travailleurs sociaux en France presentent des signes de burnout. Les recents mouvements ASE et MECS denoncent les conditions de travail.",
    facteurs: [
      "Confrontation a la grande misere sociale",
      "Manque de moyens (places, financements)",
      "Charges de dossiers excessives (70 a 100 par travailleur)",
      "Violence subie (verbale, parfois physique)",
      "Conflits d'ethique avec la hierarchie",
    ],
  },
  {
    slug: "burnout-rh",
    titreH1: "Test burnout pour RH et gestionnaires de personnel",
    metaTitre: "Test Burnout RH - MBI DRH / Charges Recrutement",
    metaDescription:
      "Test MBI pour professionnels RH, DRH, charges de recrutement. Position d'absorption emotionnelle, conflits, licenciements, conformite.",
    contextePro:
      "Les RH sont en position d'absorption emotionnelle : ils ecoutent les plaintes des collaborateurs ET appliquent les decisions parfois difficiles (licenciements, restructurations). 28% des RH declarent un haut niveau d'epuisement.",
    facteurs: [
      "Ecoute permanente des plaintes salariees",
      "Annonces difficiles (licenciements, refus)",
      "Conformite reglementaire (RGPD, droit travail)",
      "Conflit d'allegeance direction / salaries",
      "Sous-effectif et pression administrative",
    ],
  },
  {
    slug: "burnout-tech-developpeur",
    titreH1: "Test burnout pour developpeurs et tech",
    metaTitre: "Test Burnout Developpeur - MBI Tech / SRE / DevOps",
    metaDescription:
      "Test MBI pour developpeurs, ingenieurs logiciels, SRE, devops. Astreintes, deadlines, tech debt, syndrome de l'imposteur.",
    contextePro:
      "L'industrie tech cumule deadlines aggressives, dette technique chronique et syndrome de l'imposteur. 42% des developpeurs declarent un burnout selon Stack Overflow Survey 2024.",
    facteurs: [
      "Astreintes et on-call permanents",
      "Dette technique et code legacy",
      "Syndrome de l'imposteur (techno qui evolue vite)",
      "Reorganisations equipes frequentes",
      "Pression deadlines vs qualite",
    ],
  },
  {
    slug: "test-mbi-en-ligne-gratuit",
    titreH1: "Test MBI Maslach en ligne gratuit (22 questions)",
    metaTitre: "Test MBI en Ligne Gratuit - 22 Questions Maslach Officiel",
    metaDescription:
      "Test MBI Maslach Burnout Inventory officiel en ligne, gratuit, sans inscription. 22 questions, 5 minutes, score immediat sur 3 dimensions.",
    contextePro:
      "Le MBI officiel est habituellement payant (manuel Mind Garden environ 25 euros par utilisation). Cette version respecte la traduction Dion & Tessier 1994 et fournit les seuils originaux Maslach & Jackson 1981.",
    facteurs: [
      "22 questions validees scientifiquement",
      "3 dimensions (EE, DP, AP)",
      "Echelle de frequence 0 a 6",
      "Resultats immediats et anonymes",
      "Aucune donnee stockee, calcul cote navigateur",
    ],
  },
  {
    slug: "epuisement-professionnel-symptomes",
    titreH1: "Symptomes d'epuisement professionnel : test MBI",
    metaTitre: "Symptomes Burnout - Test MBI Officiel Pour Vous Auto-Evaluer",
    metaDescription:
      "Reconnaitre les symptomes du burnout : fatigue chronique, cynisme, perte d'efficacite. Test MBI Maslach 22 questions pour identifier votre niveau.",
    contextePro:
      "Le burnout s'installe insidieusement. Les premiers signes sont souvent niees ou attribues au stress normal. Le MBI permet de quantifier objectivement l'epuisement avant qu'il ne devienne severe.",
    facteurs: [
      "Fatigue qui ne passe pas le week-end",
      "Irritabilite, cynisme envers collegues / clients",
      "Sentiment d'etre inefficace malgre les efforts",
      "Troubles du sommeil et reveils anxieux",
      "Perte de plaisir et detachement",
    ],
  },
  {
    slug: "burnout-fonction-publique",
    titreH1: "Test burnout pour agents de la fonction publique",
    metaTitre: "Test Burnout Fonctionnaire - MBI Agents Etat / Territoriaux",
    metaDescription:
      "Test MBI pour fonctionnaires : agents d'Etat, territoriaux, hospitaliers, enseignants. Reorganisations, politiques publiques, manque de moyens.",
    contextePro:
      "Les agents publics subissent les reformes en cascade, la depolitisation des metiers et la baisse d'effectifs. Le baromettre du bien-etre au travail 2024 indique 38% d'agents en epuisement moyen ou eleve.",
    facteurs: [
      "Reformes et reorganisations en cascade",
      "Manque de moyens financiers et humains",
      "Perte de sens (lien public)",
      "Burocratie et procedures complexes",
      "Rapport public ambigu (defiance citoyenne)",
    ],
  },
  {
    slug: "burnout-jeune-diplome",
    titreH1: "Test burnout pour jeunes diplomes et premiers emplois",
    metaTitre: "Test Burnout Jeune Diplome - MBI Premier Emploi / 25 ans",
    metaDescription:
      "Test MBI pour jeunes diplomes (22-30 ans), premiers emplois, debutants. Choc de la realite, exigences elevees, FOMO carriere.",
    contextePro:
      "Phenomene en hausse : 31% des jeunes actifs entre 25 et 35 ans declarent un burnout ou pre-burnout selon une etude Apec 2024. La generation Z cumule exigences eleves, FOMO et identification au travail.",
    facteurs: [
      "Choc realite vs etudes idealisees",
      "FOMO sur les reseaux sociaux",
      "Cumul stages, alternances, premier CDI",
      "Endettement etudiant et pression financiere",
      "Manque de reperes professionnels",
    ],
  },
  {
    slug: "burnout-femme-charge-mentale",
    titreH1: "Test burnout pour femmes avec charge mentale familiale",
    metaTitre: "Test Burnout Femme - MBI Charge Mentale Travail + Famille",
    metaDescription:
      "Test MBI pour femmes cumulant emploi et charge mentale familiale. Plus de 70% des taches domestiques restent assumees par les femmes en France.",
    contextePro:
      "Les femmes presentent 1,5 a 2 fois plus de signes de burnout que les hommes a metier equivalent (etude INRS 2023). La charge mentale (organisation, planification du foyer) amplifie l'epuisement professionnel.",
    facteurs: [
      "Double journee : travail + maison + enfants",
      "Charge mentale familiale (planifier, anticiper)",
      "Plafond de verre et inegalites salariales",
      "Maternite et retours de conge mal accompagnes",
      "Charge emotionnelle de la sphere privee",
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
    alternates: { canonical: `/test-burnout-mbi/${slug}` },
    title: variante.metaTitre,
    description: variante.metaDescription,
    keywords: `${slug}, test burnout, mbi, ${variante.titreH1.toLowerCase()}, epuisement professionnel`,
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
        parentPage="Test Burnout MBI"
        parentHref="/test-burnout-mbi"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {variante.titreH1}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Test Maslach Burnout Inventory (MBI) en 22 questions, adapte au
        contexte professionnel. Validation francaise officielle.
      </p>

      <section className="mb-8 bg-violet-50 border border-violet-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-violet-900 mb-3">
          Contexte specifique a votre profession
        </h2>
        <p className="text-violet-800 mb-4 leading-relaxed">
          {variante.contextePro}
        </p>
        <p className="font-semibold text-violet-900 mb-2">
          Facteurs de risque specifiques :
        </p>
        <ul className="space-y-1 text-sm text-violet-800">
          {variante.facteurs.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-violet-600 mt-1">•</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <TestBurnoutMbi />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres variantes du test MBI
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {autresVariantes.map((v) => (
            <a
              key={v.slug}
              href={`/test-burnout-mbi/${v.slug}`}
              className="block p-3 rounded-lg border border-slate-200 hover:border-violet-400 hover:bg-violet-50 transition"
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
          Sources scientifiques du test MBI
        </h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>
            <strong>Maslach C. &amp; Jackson S.E. (1981).</strong> The
            measurement of experienced burnout. <em>Journal of Occupational
            Behavior</em>, 2(2), 99-113. Article fondateur du MBI.
          </li>
          <li>
            <strong>Dion G. &amp; Tessier R. (1994).</strong> Validation de la
            traduction de l&apos;Inventaire d&apos;epuisement professionnel de
            Maslach et Jackson. <em>Revue canadienne des sciences du
            comportement</em>, 26(2), 210-227.
          </li>
          <li>
            <strong>OMS (2019).</strong> Classification internationale des
            maladies, CIM-11. Reconnaissance du burnout comme phenomene lie
            au travail (QD85).
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/test-burnout-mbi" />
    </div>
  );
}
