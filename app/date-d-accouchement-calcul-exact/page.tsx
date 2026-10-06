import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Date d'accouchement : calcul exact ou estimation ? (2026)";
const DESCRIPTION =
  "Peut-on calculer la date d'accouchement de façon exacte ? Méthode (dernières règles, conception, échographie), SA ou semaines de grossesse, terme à 40 ou 41 SA, exemple chiffré.";

export const metadata: Metadata = {
  alternates: { canonical: "/date-d-accouchement-calcul-exact" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "date d'accouchement calcul exact, calcul de la date d'accouchement, calcul date accouchement avec date de conception, date terme accouchement calcul, accouchement à combien de SA, date prévue d'accouchement, semaines d'aménorrhée, échographie de datation",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/date-d-accouchement-calcul-exact",
  fil: "Date d'accouchement : calcul exact",
  emoji: "🤰",
  couleur: "from-purple-500 to-pink-500",
  h1: "Date d'accouchement : le calcul est-il exact ?",
  chapo:
    "Cet article s'adresse aux futures mères et aux futurs pères qui veulent savoir à quelle date le bébé est attendu, et à quel point cette date est fiable. Il explique comment elle se calcule, ce que veulent dire SA, terme et dépassement de terme, et pourquoi l'échographie du premier trimestre compte.",
  reponse:
    "Non : il n'existe pas de date d'accouchement exacte, seulement une date prévue. Pour des dernières règles le 20 janvier 2026, le calculateur du site donne le **mardi 27 octobre 2026**, soit 280 jours (40 semaines d'aménorrhée). Mais d'après ameli, la durée d'une grossesse **n'est pas fixe : elle varie entre 280 et 290 jours**, avec une moyenne de 284 jours. La naissance peut donc très bien tomber quelques jours avant ou après la date prévue. Le médecin ou la sage-femme confirme la date lors de l'échographie du premier trimestre.",
  sections: [
    {
      titre: "Pourquoi il n'existe pas de date exacte",
      paras: [
        "La date prévue d'accouchement est un calcul, pas une mesure. Elle part d'un repère (le début des dernières règles, la conception ou une échographie) et y ajoute une durée standard. Or, selon ameli, « la durée de la gestation n'est pas fixe » : elle varie entre 280 et 290 jours, soit entre 40 et 41,3 semaines d'aménorrhée, avec une durée moyenne de 284 jours.",
        "Ameli précise aussi que l'accouchement a lieu entre la 37e et la 42e semaine d'aménorrhée. La fenêtre est large : de 37 à 42 SA, soit de 3 semaines avant à 2 semaines après la date calculée à 40 SA. Nous n'avons pas trouvé, sur une page officielle française, de proportion de bébés nés exactement le jour prévu : mieux vaut ne retenir aucun pourcentage que d'en inventer un.",
      ],
      encadre:
        "Pour organiser votre congé maternité ou vos rendez-vous, la date prévue suffit. Pour toute décision médicale, c'est votre médecin ou votre sage-femme qui fait foi, pas un calculateur.",
    },
    {
      titre: "Calculer avec les dernières règles ou avec la date de conception",
      paras: [
        "Trois repères permettent de dater une grossesse. Le calculateur du site les propose tous les trois, et la méthode des dernières règles est la plus courante.",
      ],
      tableau: {
        colonnes: ["Repère connu", "Calcul", "Remarque"],
        lignes: [
          ["Premier jour des dernières règles", "+ 280 jours (40 SA)", "Suppose une ovulation vers le 14e jour du cycle"],
          ["Date de conception", "+ 266 jours (38 semaines)", "Équivaut à retirer 14 jours pour retrouver les dernières règles, puis à ajouter 280 jours"],
          ["Échographie de datation", "Selon la mesure de l'embryon", "Le calculateur demande les semaines d'aménorrhée trouvées à l'échographie"],
        ],
        texte: true,
      },
      suite: [
        "Pour la conception, l'écart de 14 jours vient de la définition donnée par ameli : les semaines de grossesse sont les semaines « estimées depuis la fécondation (14 jours après le premier jour des dernières règles en cas de cycles réguliers) ». Si votre cycle est plus long, l'ovulation a lieu plus tard et la date calculée à partir des règles tombe trop tôt. C'est la raison pour laquelle les professionnels se fient à l'échographie.",
        "Pour estimer la période de conception, vous pouvez utiliser le [calcul de la date d'ovulation](/calcul-ovulation).",
      ],
    },
    {
      titre: "Exemple chiffré : trois méthodes, une même date ou presque",
      paras: [
        "Prenons des dernières règles le 20 janvier 2026, avec un cycle de 28 jours, puis un deuxième cas où l'ovulation a eu lieu plus tard. Le calculateur du site ajoute 280 jours aux dernières règles, 266 jours à la conception, et retire à l'échographie ses semaines d'aménorrhée pour retrouver le début de grossesse.",
      ],
      etapes: [
        "**Dernières règles** : 20 janvier 2026 + 280 jours = **mardi 27 octobre 2026** (40 SA).",
        "**Conception** (ovulation au 14e jour, le 3 février 2026) : 3 février + 266 jours = **27 octobre 2026**, la même date.",
        "**Les 37 SA** (naissance considérée comme à terme) tombent 259 jours après les règles, soit le **6 octobre 2026**. À 41 SA (287 jours), on est le **3 novembre 2026**.",
        "**Cycle plus long** : si l'ovulation n'a eu lieu que le 10 février 2026, la conception est 7 jours plus tard. Le calcul à partir de cette conception donne le **3 novembre 2026**, soit 7 jours après la première date.",
      ],
      suite: [
        "Une échographie du premier trimestre faite le 14 avril 2026 qui mesure l'embryon à 11 SA donne un début de grossesse au 27 janvier 2026 (14 avril moins 77 jours) et une date prévue au 3 novembre 2026. C'est la date qui est alors retenue : calculée à partir des règles seules, elle aurait été 7 jours trop tôt pour ce cycle.",
        "Si vous avez des dernières règles précises et un cycle régulier de 28 jours, les deux méthodes concordent. Sinon, un écart d'une semaine est courant, et la datation par l'échographie sert à le corriger. Le calcul du calculateur ne gère que des semaines entières pour l'échographie : votre professionnel de santé peut donner une datation plus fine, en semaines et en jours.",
      ],
      visuel: {
        fichier: "date-accouchement-calcul-terme",
        alt: "Frise de la fin de grossesse pour des dernières règles le 20 janvier 2026 : 37 SA le 6 octobre, 40 SA (280 jours) le 27 octobre, 41 SA (287 jours) le 3 novembre, 41 SA + 6 jours le 9 novembre. La gestation observée va de 280 à 290 jours, avec une moyenne de 284 jours.",
        legende:
          "Les repères de fin de grossesse pour des dernières règles le 20 janvier 2026 : dates calculées comme le fait le calculateur du site, durées observées d'après ameli.fr, surveillance d'après la HAS.",
      },
    },
    {
      titre: "SA ou semaines de grossesse : quelle différence ?",
      paras: [
        "D'après ameli, l'âge d'une grossesse s'exprime de deux façons. Les **semaines d'aménorrhée (SA)** sont le nombre de semaines écoulées depuis le premier jour des dernières règles. Les **semaines de grossesse** sont le nombre de semaines estimées depuis la fécondation, soit 14 jours après le premier jour des dernières règles en cas de cycles réguliers.",
        "Les pages de l'Assurance Maladie et de la HAS citées ici comptent en SA. Le calculateur affiche les deux : les semaines de grossesse y sont égales aux SA moins 2. Pour suivre votre prise de poids semaine après semaine, voir le [calcul de la prise de poids pendant la grossesse](/calcul-prise-poids-grossesse).",
      ],
      tableau: {
        colonnes: ["Exemple", "SA (depuis les règles)", "Semaines de grossesse (depuis la fécondation)"],
        lignes: [
          ["Échographie du premier trimestre", "12 SA", "10 semaines"],
          ["Seuil du terme (ameli)", "37 SA", "35 semaines"],
          ["Date prévue (calculateur)", "40 SA", "38 semaines"],
        ],
      },
      encadre:
        "Quand on vous dit « vous en êtes à 12 SA », ce n'est pas 12 semaines depuis la conception : ajoutez 2 semaines pour passer des semaines de grossesse aux SA.",
    },
    {
      titre: "Le rôle de l'échographie de datation",
      paras: [
        "Ameli décrit la première échographie comme une échographie « de datation » : elle permet de dater précisément le début de la grossesse en mesurant l'embryon. Elle est réalisée entre 11 et 13 semaines d'aménorrhée + 6 jours, et elle fixe le terme de la grossesse.",
        "La Haute Autorité de santé (HAS) explique pourquoi c'est important : cette échographie « permet une détermination précise du terme » à partir de la mesure du fœtus, et sa pratique systématique « contribue à réduire la fréquence des termes considérés à tort comme dépassés ». Autrement dit, une date mal calée sur les dernières règles peut faire croire à un retard qui n'existe pas.",
      ],
    },
    {
      titre: "Terme, prématuré, dépassement : à quelles SA ?",
      paras: [
        "D'après ameli, un nouveau-né est dit à terme entre 37 et 41 semaines d'aménorrhée, et une naissance avant 37 SA définit la prématurité. En 2021, le taux de prématurité était de 7,0 % d'après la même page.",
        "Pour la suite après le terme, la HAS décrit un schéma de surveillance : si la femme n'a pas accouché à 41 SA + 0 jour, une surveillance du fœtus toutes les 48 heures est recommandée ; en l'absence d'accouchement, un déclenchement est recommandé à 41 SA + 6 jours. Un déclenchement est aussi possible dès 41 SA + 0 jour si le col est favorable et si la femme est d'accord.",
      ],
      tableau: {
        colonnes: ["Période", "Ce que disent les sources officielles"],
        lignes: [
          ["Avant 37 SA", "Naissance prématurée (ameli)"],
          ["De 37 à 41 SA", "Nouveau-né dit à terme (ameli)"],
          ["41 SA + 0 jour", "Surveillance du fœtus toutes les 48 heures si pas d'accouchement (HAS)"],
          ["41 SA + 6 jours", "Déclenchement recommandé en l'absence d'accouchement (HAS)"],
        ],
        texte: true,
      },
      suite: [
        "Reste la question du « terme » lui-même : 40 ou 41 SA ? Les pages officielles ouvertes pour cet article ne donnent pas une seule date de terme. Ameli indique la fourchette de 280 à 290 jours, et la HAS organise la surveillance autour de 41 SA. Le calculateur du site, lui, affiche la date à 40 SA (280 jours). Demandez à votre maternité quelle date de terme elle retient : c'est la sienne qui compte pour votre suivi.",
      ],
      encadre:
        "Passé 41 SA, la HAS recommande un suivi plus rapproché. Si vous approchez de la date prévue, votre maternité vous dit quand revenir. Si votre bébé naît prématurément, le [calcul de l'âge corrigé](/calcul-age-corrige-prema) aide à situer son développement.",
    },
  ],
  calculateur: {
    href: "/calcul-date-accouchement",
    nom: "Date d'accouchement",
    titre: "Calculez votre date prévue d'accouchement",
    texte:
      "Choisissez la méthode (dernières règles, date de conception ou échographie) : le calculateur donne la date prévue à 40 SA, vos semaines d'aménorrhée et de grossesse, le trimestre et la date de début du congé maternité.",
    bouton: "Ouvrir le calculateur de date d'accouchement",
  },
  faq: [
    {
      q: "Peut-on calculer la date d'accouchement exacte ?",
      a: "Non. On calcule une date prévue, pas une date exacte. Selon ameli, la durée de la grossesse varie entre 280 et 290 jours, avec une moyenne de 284 jours. La date prévue sert de repère pour le suivi et le congé maternité.",
    },
    {
      q: "Accouchement : à combien de SA ?",
      a: "D'après ameli, l'accouchement a lieu entre la 37e et la 42e semaine d'aménorrhée, et un nouveau-né est dit à terme entre 37 et 41 SA. Avant 37 SA, on parle de naissance prématurée.",
    },
    {
      q: "Comment calculer la date d'accouchement avec la date de conception ?",
      a: "Le calculateur du site ajoute 266 jours à la date de conception. Par exemple, une conception le 3 février 2026 donne le 27 octobre 2026. Si l'ovulation a eu lieu plus tard qu'au 14e jour du cycle, la date calculée à partir des règles tombe trop tôt, et c'est l'échographie du premier trimestre qui corrige la date.",
    },
    {
      q: "Pourquoi la date d'accouchement change-t-elle après l'échographie ?",
      a: "Parce que la première date vient souvent des dernières règles, qui supposent un cycle de 28 jours. L'échographie de datation mesure l'embryon, ce qui permet de dater plus précisément le début de la grossesse. Si l'écart est important, le professionnel de santé retient la date de l'échographie.",
    },
    {
      q: "Que se passe-t-il si je dépasse la date prévue ?",
      a: "Rien d'automatique à la date prévue elle-même. D'après la HAS, si l'accouchement n'a pas eu lieu à 41 SA + 0 jour, une surveillance du fœtus toutes les 48 heures est recommandée, et un déclenchement est recommandé à 41 SA + 6 jours. Votre maternité vous donne ses rendez-vous.",
    },
    {
      q: "La date prévue décide-t-elle de mon congé maternité ?",
      a: "Les dates du congé maternité sont déterminées à partir de la date présumée d'accouchement, d'après ameli. Pour un premier ou un deuxième enfant, le congé prénatal dure 6 semaines : dans l'exemple de cet article, il commencerait le 15 septembre 2026. En cas d'accouchement tardif, la durée du congé postnatal reste celle initialement prévue.",
    },
  ],
  sources: [
    {
      label: "Ameli.fr : grossesse, premiers signes et déroulement",
      url: "https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/premiers-symptomes-grossesse",
    },
    {
      label: "Ameli.fr : le programme de suivi et la première consultation",
      url: "https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/grossesse-soins-dentaires-dentiste-consultation",
    },
    {
      label: "Ameli.fr : comment se déroule un accouchement ?",
      url: "https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/accouchement",
    },
    {
      label: "Ameli.fr : difficultés à l'accouchement et à la naissance (prématurité)",
      url: "https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/difficultes-accouchement-naissance",
    },
    {
      label: "Ameli.fr : la durée du congé maternité d'une salariée",
      url: "https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-salariee",
    },
    {
      label: "HAS : déclenchement artificiel du travail à partir de 37 semaines d'aménorrhée",
      url: "https://www.has-sante.fr/jcms/c_666473/fr/declenchement-artificiel-du-travail-a-partir-de-37-semaines-d-amenorrhee",
    },
  ],
  datePublication: "2026-10-06",
  dateAffichee: "6 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
