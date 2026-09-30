import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Comment reconnaître un burn-out ? Signes et démarches";
const DESCRIPTION =
  "Signes du burn-out décrits par la HAS et l'INRS, différence avec la dépression, rôle du test MBI et professionnels à consulter. Sans diagnostic.";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-reconnaitre-un-burn-out" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment reconnaître un burn out, signes épuisement professionnel, burn out symptômes, qui consulter burn out, test burn out travail, MBI",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/test-burnout-mbi/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const ARTICLE: ArticleData = {
  slug: "/comment-reconnaitre-un-burn-out",
  fil: "Reconnaître un burn-out",
  emoji: "🧠",
  couleur: "from-violet-600 to-purple-700",
  h1: "Comment reconnaître un burn-out ?",
  chapo:
    "Cet article s'adresse à toute personne qui se sent épuisée par son travail et se demande si c'est un burn-out. Il reprend ce que disent la Haute Autorité de santé (HAS), l'INRS et l'OMS ; il ne remplace pas un avis médical.",
  reponse:
    "Selon l'INRS, le burn-out (ou syndrome d'épuisement professionnel) est « un ensemble de réactions consécutives à des situations de stress professionnel chronique ». Il se reconnaît à trois dimensions : **épuisement émotionnel**, **dépersonnalisation ou cynisme**, et **sentiment de non-accomplissement personnel** au travail. Seul un professionnel de santé peut faire le point sur votre situation : parlez-en à votre médecin traitant ou à votre médecin du travail. Un questionnaire comme le [test burnout MBI](/test-burnout-mbi) peut aider à repérer des signes, sans poser de diagnostic.",
  sections: [
    {
      titre: "Ce qu'est le burn-out selon les organismes officiels",
      paras: [
        "L'OMS définit le burn-out comme « un syndrome conceptualisé comme résultant d'un stress chronique au travail qui n'a pas été géré avec succès » (traduction de sa définition anglaise). Elle précise qu'il est inclus dans la 11e révision de la Classification internationale des maladies (CIM-11) comme **phénomène professionnel**, et non comme une maladie.",
        "La HAS le décrit comme un « épuisement physique, émotionnel et mental qui résulte d'un investissement prolongé dans des situations de travail exigeantes sur le plan émotionnel ». Elle ajoute que le syndrome d'épuisement professionnel « n'est pas une maladie caractérisée ».",
        "L'OMS précise aussi que le terme concerne le contexte professionnel et ne doit pas servir à décrire des expériences dans d'autres domaines de la vie.",
      ],
    },
    {
      titre: "Les signes décrits par la HAS et l'INRS",
      paras: [
        "Ces deux organismes regroupent les manifestations par familles. Le tableau ci-dessous reprend quelques exemples cités par chacun ; ce n'est pas une liste complète et elle ne permet pas de conclure seul.",
      ],
      tableau: {
        texte: true,
        colonnes: ["Famille", "Exemples cités par la HAS", "Exemples cités par l'INRS"],
        lignes: [
          [
            "Émotionnels",
            "anxiété, tristesse, irritabilité",
            "sentiment de vide, d'impuissance, perte de confiance en soi",
          ],
          [
            "Cognitifs",
            "troubles de la mémoire, de l'attention, de la concentration",
            "difficulté de concentration, indécision",
          ],
          [
            "Comportementaux",
            "repli sur soi, isolement social, comportement agressif",
            "repli, isolement, agressivité",
          ],
          [
            "Motivationnels",
            "désengagement, baisse de motivation, doutes professionnels",
            "attitude négative envers le travail",
          ],
          [
            "Physiques",
            "asthénie (fatigue intense), troubles du sommeil, lombalgies, céphalées",
            "fatigue généralisée, maux de tête",
          ],
        ],
      },
    },
    {
      titre: "Burn-out et dépression : ce que disent l'INRS et la HAS",
      paras: [
        "L'INRS écrit que le burn-out « n'est donc pas une maladie psychiatrique à proprement parler, mais plutôt une spirale dangereuse qui peut conduire à la dépression ». Il ajoute qu'au départ, il ne s'exprime que dans la sphère professionnelle, alors que la dépression touche tous les aspects de la vie.",
        "De son côté, la HAS indique que la démarche diagnostique consiste à repérer d'éventuelles pathologies sous-jacentes : un trouble de l'adaptation, un trouble anxieux, un trouble dépressif ou un état de stress post-traumatique. C'est une raison de plus pour ne pas s'auto-diagnostiquer. Pour l'autre versant, vous pouvez aussi essayer le [test de dépression PHQ-9](/test-depression-phq9) ou le [test d'anxiété GAD-7](/test-anxiete-gad7), toujours comme simple repère.",
      ],
    },
    {
      titre: "Le rôle d'un test comme le MBI",
      paras: [
        "La HAS cite le Maslach Burnout Inventory (MBI) et le Copenhagen Burnout Inventory (CBI) : ces questionnaires permettent d'évaluer le syndrome d'épuisement professionnel, « mais ils n'ont pas été construits comme des instruments d'évaluation individuelle ». Elle ajoute qu'ils peuvent éventuellement servir d'outil pour guider un entretien avec le patient.",
        "Le test du site est une auto-évaluation en 22 questions, notées de 0 à 6, réparties en trois dimensions : épuisement émotionnel (9 questions), dépersonnalisation (5) et accomplissement personnel (8). Il aide à repérer des signes et à préparer un échange avec un médecin. Quel que soit le niveau affiché à la fin du [test burnout MBI](/test-burnout-mbi), il ne pose pas de diagnostic : c'est un point de départ pour en parler avec un professionnel de santé.",
      ],
    },
    {
      titre: "Qui consulter",
      liste: [
        "**Le médecin traitant** : selon la HAS, il coordonne la prise en charge, prescrit si nécessaire un traitement et adresse éventuellement le patient à un psychiatre.",
        "**Le médecin du travail** : la HAS indique que l'analyse des conditions de travail se fait prioritairement avec lui, et qu'un salarié peut demander à le voir à tout moment, y compris pendant un arrêt de travail.",
        "**Une équipe pluridisciplinaire** : l'INRS explique qu'un accompagnement associant médecin traitant, spécialiste (psychologue, psychiatre) et médecin du travail s'avère souvent nécessaire.",
      ],
      encadre:
        "La HAS précise que le risque suicidaire doit être particulièrement évalué. Si vous êtes en détresse ou avez des pensées suicidaires, appelez le **3114**, le numéro national de prévention du suicide : il est accessible 24h/24 et 7j/7, gratuitement, en France entière.",
    },
    {
      titre: "Que faire si vous vous reconnaissez",
      paras: [
        "Il n'y a pas de calcul ici, mais une démarche en quelques étapes, à adapter avec un professionnel.",
      ],
      etapes: [
        "Notez ce que vous ressentez, par famille (émotions, concentration, comportement, motivation, corps), et depuis quand.",
        "Faites le [test burnout MBI](/test-burnout-mbi) pour mettre des mots sur ce que vous ressentez, en gardant en tête qu'il s'agit d'un repère et non d'un diagnostic.",
        "Prenez rendez-vous avec votre médecin traitant ou votre médecin du travail et apportez vos notes.",
        "Selon l'INRS, la prise en charge passe par un temps de repos (arrêt maladie) ; un traitement médicamenteux et un accompagnement psychologique peuvent être nécessaires. La HAS précise que la durée de l'arrêt est adaptée à l'évolution du trouble et du contexte socioprofessionnel.",
        "Préparez la reprise avec l'équipe médicale : l'INRS parle d'une reprise progressive et d'un travail de reconstruction de l'identité professionnelle.",
      ],
    },
    {
      titre: "Prévenir : les pistes de l'INRS",
      paras: [
        "L'INRS recommande d'agir sur le travail lui-même : veiller à ne pas surcharger certains postes, favoriser le soutien social et éviter les conflits éthiques autour de la qualité du travail. Pour repérer un déséquilibre en amont, le [score de stress](/calcul-score-stress) ou le [calcul de dette de sommeil](/calcul-dette-sommeil) peuvent servir de points de départ, sans valeur de diagnostic.",
      ],
    },
  ],
  calculateur: {
    href: "/test-burnout-mbi",
    nom: "Test burnout MBI",
    titre: "Faire le test burnout MBI",
    texte:
      "22 questions notées de 0 à 6 pour repérer des signes sur trois dimensions. Un repère pour préparer un échange avec un médecin, pas un diagnostic.",
    bouton: "Faire le test MBI",
  },
  faq: [
    {
      q: "Comment savoir si l'on fait un burn-out ?",
      a:
        "Vous pouvez comparer votre situation aux trois dimensions décrites par l'INRS, ou passer un questionnaire d'auto-évaluation. Seul un professionnel de santé peut en juger : parlez-en à votre médecin traitant ou à votre médecin du travail.",
    },
    {
      q: "Qui peut diagnostiquer un burn-out ?",
      a:
        "Un médecin. La HAS indique que le médecin traitant coordonne la prise en charge et qu'un psychiatre peut être sollicité, notamment pour réaliser un diagnostic ou prendre en charge un trouble sévère. Elle rappelle aussi qu'il faut repérer d'éventuels troubles associés, comme un trouble dépressif ou anxieux.",
    },
    {
      q: "Combien de temps dure un burn-out ?",
      a:
        "Les pages de la HAS et de l'INRS consultées ne donnent pas de durée type. La HAS dit que la durée d'un arrêt de travail est adaptée à l'évolution du trouble et du contexte socioprofessionnel. L'INRS indique que la reprise du travail est à envisager progressivement.",
    },
    {
      q: "Depuis quand le burn-out est-il reconnu ?",
      a:
        "L'OMS l'a inclus dans la 11e révision de la Classification internationale des maladies, comme phénomène professionnel. La page de l'OMS qui l'annonce est datée du 28 mai 2019. L'OMS précise qu'il n'est pas classé comme une maladie.",
    },
    {
      q: "Comment éviter le burn-out ?",
      a:
        "L'INRS met l'accent sur l'organisation du travail : éviter de surcharger certains postes, favoriser le soutien social, éviter les conflits éthiques autour de la qualité du travail. Il évoque aussi la prévention des facteurs de risque avec le service de prévention et santé au travail.",
    },
  ],
  sources: [
    {
      label: "HAS : Repérage et prise en charge cliniques du syndrome d'épuisement professionnel ou burnout",
      url: "https://www.has-sante.fr/jcms/c_2769318/fr/reperage-et-prise-en-charge-cliniques-du-syndrome-d-epuisement-professionnel-ou-burnout",
    },
    {
      label: "INRS : Épuisement professionnel, ce qu'il faut retenir",
      url: "https://www.inrs.fr/risques/epuisement-burnout/ce-qu-il-faut-retenir.html",
    },
    {
      label: "INRS : Épuisement professionnel ou burnout, foire aux questions",
      url: "https://www.inrs.fr/risques/epuisement-burnout/faq.html",
    },
    {
      label: "OMS : Burn-out an occupational phenomenon (ICD)",
      url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
    },
    {
      label: "3114 : numéro national de prévention du suicide",
      url: "https://3114.fr/",
    },
  ],
  datePublication: "2026-09-30",
  dateAffichee: "30 septembre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
