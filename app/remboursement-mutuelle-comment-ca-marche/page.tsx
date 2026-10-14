import type { Metadata } from "next";
import ArticleGuide, { ArticleData } from "../components/ArticleGuide";

const TITRE = "Remboursement mutuelle : comment savoir ce qu'elle rembourse ?";
const DESCRIPTION =
  "La mutuelle rembourse un pourcentage de la base de remboursement (BR), pas le prix payé. 100 % BR, 200 % BR, dépassements, participation forfaitaire de 2 € : tout expliqué avec un exemple chiffré.";

export const metadata: Metadata = {
  alternates: { canonical: "/remboursement-mutuelle-comment-ca-marche" },
  title: TITRE,
  description: DESCRIPTION,
  keywords:
    "comment savoir ce que la mutuelle rembourse, comprendre base de remboursement mutuelle, explication base de remboursement mutuelle, remboursement mutuelle comment calculer, mutuelle qui rembourse bien, comment fonctionne le remboursement mutuelle, comment se faire rembourser mutuelle, comprendre les remboursements de mutuelle",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Mes Calculateurs",
    title: TITRE,
    description: DESCRIPTION,
  },
};

const ARTICLE: ArticleData = {
  slug: "/remboursement-mutuelle-comment-ca-marche",
  fil: "Remboursement mutuelle",
  emoji: "🩺",
  couleur: "from-teal-500 to-emerald-600",
  h1: "Remboursement mutuelle : comment savoir ce qu'elle rembourse ?",
  chapo:
    "Cet article s'adresse à tous ceux qui regardent leur tableau de garanties sans comprendre. Il explique la base de remboursement, le ticket modérateur, ce que veulent dire 100 %, 200 % ou 300 % de la BR, les dépassements d'honoraires et les sommes que la mutuelle ne rembourse jamais.",
  reponse:
    "Votre mutuelle ne rembourse pas le prix que vous avez payé : elle rembourse un **pourcentage de la base de remboursement** (BR), le tarif de référence de l'Assurance Maladie. Pour une consultation de généraliste, la base est de **30 €** : la Sécurité sociale en rembourse 70 % (21 €) et il reste le **ticket modérateur** de 9 €, que la mutuelle peut prendre en charge. « **100 % BR** » veut dire que la mutuelle couvre ce ticket modérateur ; « **200 % BR** » veut dire que la Sécurité sociale et la mutuelle remboursent ensemble jusqu'à 2 fois la base, soit 60 €. Au-delà, les dépassements d'honoraires restent à votre charge. Enfin, la **participation forfaitaire de 2 €** (consultations chez un médecin) et les **franchises** (1 € par boîte de médicaments) ne sont pas remboursées par un contrat responsable.",
  sections: [
    {
      titre: "Le principe : la Sécurité sociale paie d'abord, la mutuelle complète",
      paras: [
        "Quand vous vous faites soigner, le remboursement se fait en deux temps. L'Assurance Maladie (la Sécurité sociale) rembourse sa part, puis votre complémentaire santé (la mutuelle) peut compléter, selon le contrat que vous avez choisi. Trois mots reviennent dans tous les tableaux de garanties.",
      ],
      liste: [
        "**La base de remboursement (BR)** : le tarif sur lequel l'Assurance Maladie calcule son remboursement, aussi appelé tarif de responsabilité. Ce n'est pas forcément ce que le professionnel vous facture.",
        "**Le taux de remboursement** : le pourcentage de la base que paie l'Assurance Maladie. Par exemple 70 % pour une consultation chez un médecin.",
        "**Le ticket modérateur (TM)** : la partie de la base qui reste à votre charge une fois que l'Assurance Maladie a remboursé sa part. Il est par exemple de 30 % pour les consultations médicales, de 35 % pour certains médicaments, de 45 % pour les transports. C'est ce que la mutuelle prend en charge en premier.",
      ],
      suite: [
        "Exemple pour une consultation chez un généraliste conventionné de secteur 1 : la base est de 30 €, l'Assurance Maladie rembourse 70 %, soit 21 €, et le ticket modérateur est de 9 € (30 %). Votre mutuelle peut vous rembourser ces 9 €, en partie ou en totalité.",
      ],
      encadre:
        "Le ticket modérateur n'existe pas dans tous les cas. Il est supprimé par exemple pour les soins prévus dans le protocole d'une affection de longue durée (ALD) exonérante, pour les femmes enceintes à partir du 1er jour du 6e mois de grossesse, et il est entièrement pris en charge pour les bénéficiaires de la Complémentaire santé solidaire. Sur certains actes chers (tarif d'au moins 120 €), il est remplacé par une participation forfaitaire de 32 € : voir la page ameli « Le forfait à 32 euros ».",
    },
    {
      titre: "Les taux de la Sécurité sociale : combien rembourse-t-elle ?",
      paras: [
        "Voici les taux du régime général pour les soins les plus courants, d'après le tableau récapitulatif d'ameli. Ils s'appliquent à la base de remboursement, pas au prix payé.",
      ],
      tableau: {
        colonnes: ["Soin", "Taux de la Sécurité sociale"],
        lignes: [
          ["Consultation chez un médecin (généraliste ou spécialiste)", "70 %"],
          ["Consultation chez un chirurgien-dentiste", "60 %"],
          ["Prothèses dentaires (couronnes, bridges, dentiers)", "60 %"],
          ["Auxiliaires médicaux (infirmier, masseur-kinésithérapeute...)", "60 %"],
          ["Médicaments : service médical rendu majeur ou important", "65 %"],
          ["Médicaments : service médical rendu modéré / faible", "30 % / 15 %"],
          ["Analyses de biologie médicale", "60 %"],
          ["Radiologie, échographie, IRM, scanner", "70 %"],
          ["Lunettes (optique)", "60 %"],
          ["Hospitalisation (hôpital ou clinique conventionnée)", "80 %"],
          ["Frais de transport", "55 %"],
        ],
        texte: true,
      },
      suite: [
        "Ce sont les taux dans le cas courant. Ils sont différents si vous êtes en ALD, enceinte, bénéficiaire de la Complémentaire santé solidaire ou affilié au régime local d'Alsace-Moselle. Si vous ne passez pas par votre médecin traitant (hors parcours de soins coordonnés), vous êtes moins bien remboursé.",
      ],
    },
    {
      titre: "Pourquoi la base n'est pas le prix que vous payez",
      paras: [
        "Les médecins n'ont pas tous le même secteur, et la base de remboursement en dépend. Le calcul se fait toujours sur la base, jamais sur le prix facturé.",
      ],
      liste: [
        "**Secteur 1** : le médecin applique le tarif fixé par convention avec l'Assurance Maladie. Pour un généraliste, c'est 30 €. Pour un spécialiste consulté sur avis du médecin traitant (hors pédiatre, psychiatre, neurologue, gériatre, gynécologue médical et spécialiste de médecine physique et de réadaptation), c'est 31,50 €.",
        "**Secteur 2** : le médecin fixe librement ses honoraires. Le montant du dépassement n'est pas remboursé par l'Assurance Maladie.",
        "**Secteur 2 avec Optam** (option de pratique tarifaire maîtrisée) : le médecin s'engage à modérer ses dépassements, et l'Assurance Maladie vous rembourse sur la base du secteur 1, donc la même base que si le dépassement n'existait pas.",
        "**Secteur 2 sans Optam** : la base est plus basse, 23 € pour une consultation chez un généraliste.",
      ],
      suite: [
        "Exemple donné par service-public.fr : chez un généraliste adhérent à l'Optam, la base est de 30 €. Si la consultation coûte 35 €, vous êtes remboursé de 19 € (et non de plus), car le calcul se fait à partir de 30 € et non de 35 €, après la déduction du forfait de 2 €. Le dentaire, l'optique et les audioprothèses suivent la même logique : la base est souvent très inférieure au prix réel (2,84 € pour une monture de lunettes, par exemple).",
      ],
    },
    {
      titre: "100 %, 200 %, 300 % de la BR : ce que ça veut dire",
      paras: [
        "Dans un tableau de garanties, le remboursement peut être indiqué en pourcentage de la BR ou en euros. Service-public.fr donne la lecture : une garantie à 150 % du tarif conventionnel (Assurance maladie incluse) signifie que votre remboursement total, Assurance maladie et complémentaire santé ensemble, peut atteindre 50 % de plus que le tarif conventionnel. Une prestation « à hauteur de 200 € » signifie que la mutuelle rembourse au maximum 200 € en plus de ce que verse l'Assurance Maladie.",
        "Pour une consultation de base 30 €, cela donne (calcul de notre part à partir de cette règle) : **100 % BR = 30 €** au total, soit seulement le ticket modérateur en plus de la Sécurité sociale ; **200 % BR = 60 €** au total ; **300 % BR = 90 €** au total. La mutuelle paie la différence entre ce plafond et ce que la Sécurité sociale a déjà remboursé.",
        "Retenez deux limites. Le total ne dépasse jamais ce que vous avez réellement payé. Et le pourcentage s'applique à la base, pas au prix : 300 % de 31,50 € font 94,50 €, même si le médecin demande 120 €. Pour refaire ces calculs de pourcentage à la main, le [calculateur de pourcentage](/calcul-pourcentage) peut aider.",
      ],
      encadre:
        "Vérifiez dans votre tableau que le pourcentage est bien exprimé « Sécurité sociale incluse », comme dans l'exemple de service-public.fr. Si vous avez un doute sur la lecture d'un poste, demandez un exemple chiffré à votre mutuelle.",
    },
    {
      titre: "Les dépassements d'honoraires : qui les paie ?",
      paras: [
        "Un dépassement d'honoraires, c'est la part du prix qui dépasse la base de remboursement. Les dépassements d'honoraires ne sont jamais pris en charge par l'Assurance Maladie. Ils peuvent éventuellement être pris en charge par votre complémentaire santé, si le contrat que vous avez souscrit le prévoit.",
        "C'est donc là que les garanties se différencient. Avec 100 % BR, la mutuelle ne couvre en principe aucun dépassement. Avec 200 % ou 300 % BR, elle en couvre une partie, jusqu'au plafond du contrat. Attention aux médecins de secteur 2 qui n'adhèrent pas à l'Optam : l'article R871-2 du code de la sécurité sociale prévoit, pour un contrat responsable, que la prise en charge de leurs dépassements est limitée, dans la double limite de 100 % du tarif de responsabilité et du montant pris en charge pour les médecins adhérents minoré de 20 % du tarif de responsabilité. Ils sont donc moins bien couverts : lisez votre tableau de garanties. Service-public.fr précise que les dépassements d'honoraires et la majoration du ticket modérateur liés au non-respect du parcours de soins ne sont pas obligatoirement pris en charge par un contrat responsable.",
        "Chez le dentiste, le professionnel doit fixer ses honoraires avec tact et mesure et vous remettre un devis écrit avant une prothèse. Transmettez ce devis à votre mutuelle : elle vous indique le montant de votre remboursement avant les soins.",
      ],
    },
    {
      titre: "Ce que la mutuelle ne rembourse jamais : participation forfaitaire et franchises",
      paras: [
        "Même avec la meilleure garantie, certaines sommes restent à votre charge. L'Assurance Maladie les retient sur son remboursement, et un contrat responsable ne peut pas les rembourser.",
      ],
      liste: [
        "**Participation forfaitaire de 2 €** : due par les personnes de plus de 18 ans pour toute consultation ou acte réalisé par un médecin, pour les examens de radiologie et pour les analyses de biologie médicale. Elle ne peut pas dépasser 8 € par jour. Elle n'est pas demandée chez le chirurgien-dentiste, ni pour les soins des auxiliaires médicaux.",
        "**Franchise médicale** : 1 € par boîte de médicaments, 1 € par acte paramédical (infirmier, kinésithérapeute...), 4 € par transport sanitaire. Elle ne s'applique pas aux médicaments ni aux actes délivrés au cours d'une hospitalisation.",
        "**Plafonds** : le total de la franchise médicale est plafonné à 70 € par an, et la participation forfaitaire aussi, par personne et par année civile.",
        "**Qui en est dispensé** : les moins de 18 ans, les bénéficiaires de la Complémentaire santé solidaire ou de l'aide médicale de l'État et les femmes enceintes du 1er jour du 6e mois de grossesse jusqu'au 12e jour après l'accouchement.",
        "**Forfait hospitalier** : 23 € par jour en hôpital ou en clinique depuis le 1er mars 2026 (17 € par jour en psychiatrie). Il n'est pas remboursé par l'Assurance Maladie, mais un contrat responsable le prend en charge à 100 %, sans limitation de durée.",
      ],
      suite: [
        "Exemple de service-public.fr : consultation à 30 € chez un généraliste de secteur 1. L'Assurance maladie rembourse 19 € après le forfait de 2 €. Avec une complémentaire responsable, la mutuelle prend en charge 30 % de 30 €, soit 9 €. Il reste donc 2 € à votre charge, la participation forfaitaire non remboursable.",
      ],
    },
    {
      titre: "Exemple chiffré : une consultation à 50 €",
      paras: [
        "Prenons un généraliste de secteur 2 adhérent à l'Optam, qui facture 50 € (l'adhésion à l'Optam et le prix de 50 € sont des hypothèses de notre part pour l'exemple). Voici le calcul étape par étape, le même que celui du [calculateur de remboursement mutuelle](/calcul-remboursement-mutuelle).",
      ],
      etapes: [
        "Base de remboursement : 30 € (secteur 1, Optam). Prix facturé : 50 €. Dépassement : 50 − 30 = 20 €.",
        "La Sécurité sociale rembourse 70 % de 30 € = 21 €, puis retient la participation forfaitaire de 2 € : elle verse 19 €.",
        "Le ticket modérateur est de 30 % de 30 € = 9 €.",
        "Mutuelle à 100 % BR : plafond total de 30 €. Elle ajoute 30 − 21 = 9 € (le ticket modérateur). Reste à charge : 50 − 19 − 9 = 22 €, soit 2 € de participation forfaitaire et 20 € de dépassement.",
        "Mutuelle à 200 % BR : plafond total de 60 €, mais le prix n'est que de 50 €. Elle ajoute 50 − 21 = 29 €. Reste à charge : 50 − 19 − 29 = 2 €, la participation forfaitaire.",
      ],
      tableau: {
        colonnes: ["Garantie de la mutuelle", "Plafond total (Sécu comprise)", "Mutuelle paie", "Reste à charge"],
        lignes: [
          ["100 % BR", "30 €", "9 €", "22 €"],
          ["150 % BR", "45 €", "24 €", "7 €"],
          ["200 % BR", "60 € (limité au prix : 50 €)", "29 €", "2 €"],
          ["300 % BR", "90 € (limité au prix : 50 €)", "29 €", "2 €"],
        ],
        texte: true,
      },
      suite: [
        "Sur cette consultation, passer de 100 % à 200 % BR fait économiser 20 €, tout le dépassement. Au-delà de 200 %, cela ne change plus rien : le plafond dépasse déjà le prix. Avec un dépassement plus fort, la différence se voit davantage : chez un spécialiste adhérent à l'Optam, consulté sur avis du médecin traitant, qui facture 80 € pour une base de 31,50 €, le même calcul laisse 50,50 € à votre charge à 100 % BR, 19 € à 200 % BR et 2 € à 300 % BR.",
      ],
      visuel: {
        fichier: "mutuelle-qui-paie-quoi-consultation",
        alt: "Qui paie quoi pour une consultation à 50 € chez un généraliste de secteur 2 adhérent à l'Optam (base de remboursement 30 €) : avec une mutuelle à 100 % de la base, la Sécurité sociale paie 19 €, la mutuelle 9 €, et il reste 22 € à payer (2 € de participation forfaitaire et 20 € de dépassement) ; avec une mutuelle à 200 %, la mutuelle paie 29 € et il reste 2 € (la participation forfaitaire).",
        legende:
          "Calcul du calculateur du site pour une consultation à 50 € (hypothèse de notre part : généraliste de secteur 2 adhérent à l'Optam). Les garanties 100 % et 200 % BR sont des niveaux types, pas un contrat précis.",
      },
    },
    {
      titre: "Le 100 % Santé : un reste à charge de zéro sur un panier de soins",
      paras: [
        "Depuis le 1er janvier 2021, l'offre 100 % Santé est accessible à tous les Français qui ont une complémentaire santé responsable (près de 95 % des contrats du marché, selon la Sécurité sociale) ou la Complémentaire santé solidaire. Les équipements de ce panier sont pris en charge intégralement par la Sécurité sociale et la mutuelle.",
      ],
      liste: [
        "**Dentaire** : le panier 100 % Santé comprend des couronnes (notamment en céramique), des bridges et des dentiers. Il existe aussi un panier à tarifs maîtrisés (prix plafonnés, reste à charge possible) et un panier à tarifs libres.",
        "**Optique** : une monture à 30 € maximum, et des verres de classe A (la classe B est à prix libre). Selon service-public.fr, les prix limites de vente sont de 30 € pour la monture et, pour des verres simples, de 42,50 € par verre. Les lunettes peuvent être renouvelées tous les 2 ans à partir de 16 ans.",
        "**Aides auditives** : les appareils de classe I ont un prix plafonné à 950 € par oreille. La prise en charge ne peut être renouvelée qu'après 4 ans.",
      ],
      suite: [
        "Les contrats responsables acceptent le tiers payant (vous n'avancez pas les frais) sur les équipements et les soins du panier 100 % Santé. Hors de ce panier, le reste à charge dépend de votre contrat : c'est là qu'il faut lire les garanties de près.",
      ],
    },
    {
      titre: "Comment savoir ce que VOTRE mutuelle rembourse",
      paras: [
        "Le niveau et la nature des prestations varient selon les contrats. Pour savoir ce que votre mutuelle rembourse, procédez dans cet ordre :",
      ],
      etapes: [
        "Ouvrez le tableau de garanties de votre contrat et repérez, pour chaque poste, si la garantie est en pourcentage de la BR ou en euros.",
        "Vérifiez que le pourcentage inclut la Sécurité sociale (« Assurance maladie incluse »).",
        "Pour un soin cher (prothèse dentaire, lunettes, aide auditive), demandez le devis du professionnel et transmettez-le à votre mutuelle : elle chiffre le remboursement avant les soins.",
        "Retirez de votre calcul la participation forfaitaire, les franchises et le prix au-dessus du plafond : c'est votre reste à charge.",
      ],
      suite: [
        "Service-public.fr renvoie vers des exemples de calcul de remboursement sur le site de l'Unocam. Testez aussi votre cas dans le [calculateur de remboursement mutuelle](/calcul-remboursement-mutuelle). Pour la cure thermale, qui fait partie des recherches du moment : elle doit être prescrite par un médecin et motivée par une affection de la liste des 12 orientations thérapeutiques d'ameli, avec une demande de prise en charge à faire à votre caisse avant le départ. Les taux de l'Assurance Maladie sont de 70 % pour les honoraires médicaux, 65 % pour l'hydrothérapie et l'hébergement et 55 % pour le transport. La thalassothérapie, elle, n'est pas prise en charge.",
      ],
    },
  ],
  calculateur: {
    href: "/calcul-remboursement-mutuelle",
    nom: "Remboursement mutuelle",
    titre: "Calculez ce que la Sécu et la mutuelle remboursent",
    texte:
      "Choisissez un soin, entrez le prix payé et le niveau de garantie (100 %, 200 % ou 300 % de la BR) : le calculateur donne la part de la Sécurité sociale, celle de la mutuelle et votre reste à charge, participation forfaitaire comprise.",
    bouton: "Ouvrir le calculateur de remboursement mutuelle",
  },
  faq: [
    {
      q: "Comment savoir ce que la mutuelle rembourse ?",
      a: "Lisez le tableau de garanties de votre contrat : chaque soin y est remboursé en pourcentage de la base de remboursement (BR) ou en euros. Vérifiez que le pourcentage inclut la Sécurité sociale, et demandez un devis à votre mutuelle pour un soin cher. Le niveau des prestations varie selon les contrats (service-public.fr).",
    },
    {
      q: "Comprendre la base de remboursement d'une mutuelle : c'est quoi ?",
      a: "C'est le tarif sur lequel l'Assurance Maladie calcule son remboursement, aussi appelé tarif de responsabilité. Pour une consultation de généraliste en secteur 1, elle est de 30 €. Si le médecin facture plus, la différence est un dépassement d'honoraires, que l'Assurance Maladie ne rembourse jamais.",
    },
    {
      q: "Remboursement mutuelle : comment calculer ?",
      a: "Étape 1 : la Sécurité sociale rembourse son taux (70 % pour une consultation) de la base. Étape 2 : elle retient la participation forfaitaire de 2 € ou la franchise. Étape 3 : la mutuelle ajoute la différence entre son plafond (100 %, 200 % ou 300 % de la base) et ce que la Sécurité sociale a remboursé, dans la limite du prix payé. Votre reste à charge est le prix payé moins ces deux remboursements.",
    },
    {
      q: "Que veulent dire 100 %, 200 % et 300 % de la BR ?",
      a: "C'est le plafond du remboursement total, Sécurité sociale comprise, en multiple de la base de remboursement. Pour une base de 30 € : 100 % BR = 30 €, 200 % BR = 60 €, 300 % BR = 90 €. La mutuelle paie la différence entre ce plafond et le remboursement de la Sécurité sociale.",
    },
    {
      q: "La mutuelle rembourse-t-elle la participation forfaitaire et les franchises ?",
      a: "Non, pas dans le cadre d'un contrat responsable : la participation forfaitaire de 2 € est retenue par l'Assurance Maladie et la mutuelle ne peut pas la rembourser, et il en va de même pour la franchise médicale (1 € par boîte de médicaments ou par acte paramédical, 4 € par transport sanitaire).",
    },
    {
      q: "La mutuelle rembourse-t-elle les dépassements d'honoraires ?",
      a: "Seulement si votre contrat le prévoit, et jusqu'au plafond de la garantie. L'Assurance Maladie ne les rembourse jamais. Un contrat à 100 % BR n'en couvre en principe aucun ; avec 200 % ou 300 % BR, vous êtes couvert jusqu'à 2 ou 3 fois la base, Sécurité sociale comprise. Exception : les dépassements des médecins qui n'adhèrent pas à l'Optam sont moins bien couverts par un contrat responsable (code de la sécurité sociale, article R871-2) ; lisez votre tableau de garanties.",
    },
    {
      q: "Mutuelle qui rembourse bien : comment la reconnaître ?",
      a: "Ce site ne classe pas les mutuelles. Comparez les garanties poste par poste, pour les soins dont vous avez vraiment besoin (dentaire, optique, spécialistes...), et regardez si elles sont en pourcentage de la BR ou en euros. Une garantie à 300 % BR ne sert que si vos médecins pratiquent des dépassements : testez avec un exemple chiffré dans le calculateur.",
    },
    {
      q: "Comment se faire rembourser par la mutuelle ?",
      a: "Les modalités dépendent de votre contrat : renseignez-vous auprès de votre mutuelle. Avec le tiers payant, vous êtes dispensé d'avancer la part de l'Assurance Maladie, et les contrats responsables acceptent le tiers payant sur les soins du panier 100 % Santé.",
    },
  ],
  sources: [
    {
      label: "ameli.fr : Qu'est-ce que le ticket modérateur ?",
      url: "https://www.ameli.fr/assure/remboursements/reste-charge/ticket-moderateur",
    },
    {
      label: "ameli.fr : La participation forfaitaire de 2 €",
      url: "https://www.ameli.fr/assure/remboursements/reste-charge/participation-forfaitaire-2-euros",
    },
    {
      label: "ameli.fr : La franchise médicale",
      url: "https://www.ameli.fr/assure/remboursements/reste-charge/franchise-medicale",
    },
    {
      label: "ameli.fr : Le forfait hospitalier",
      url: "https://www.ameli.fr/assure/remboursements/reste-charge/forfait-hospitalier",
    },
    {
      label: "ameli.fr : Le forfait à 32 euros",
      url: "https://www.ameli.fr/assure/remboursements/reste-charge/forfait-32-euros",
    },
    {
      label: "ameli.fr : Tableaux récapitulatifs des taux de remboursement",
      url: "https://www.ameli.fr/assure/remboursements/rembourse/tableau-recapitulatif-taux-remboursement",
    },
    {
      label: "ameli.fr : Consultations en métropole, vos remboursements",
      url: "https://www.ameli.fr/assure/remboursements/rembourse/consultations-telemedecine/metropole",
    },
    {
      label: "ameli.fr : Les règles de remboursement de l'Assurance Maladie",
      url: "https://www.ameli.fr/assure/remboursements/rembourse/les-regles-de-remboursement-de-l-assurance-maladie",
    },
    {
      label: "ameli.fr : Prothèses dentaires et 100 % Santé dentaire",
      url: "https://www.ameli.fr/assure/remboursements/rembourse/soins-protheses-dentaires-optique-audition/consultations-soins-protheses-dentaires/protheses-dentaires",
    },
    {
      label: "ameli.fr : Lunettes et lentilles",
      url: "https://www.ameli.fr/assure/remboursements/rembourse/soins-protheses-dentaires-optique-audition/lunettes-lentilles",
    },
    {
      label: "ameli.fr : Prothèses auditives",
      url: "https://www.ameli.fr/assure/remboursements/rembourse/soins-protheses-dentaires-optique-audition/protheses-auditives",
    },
    {
      label: "ameli.fr : Cure thermale",
      url: "https://www.ameli.fr/assure/remboursements/rembourse/cure-thermale",
    },
    {
      label: "service-public.fr : Couverture maladie complémentaire (mutuelle)",
      url: "https://www.service-public.fr/particuliers/vosdroits/F20314",
    },
    {
      label: "service-public.fr : Quels sont les tarifs d'un médecin ?",
      url: "https://www.service-public.fr/particuliers/vosdroits/F17042",
    },
    {
      label: "Légifrance : code de la sécurité sociale, article R871-2 (contrat responsable)",
      url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000052861614",
    },
    {
      label: "Sécurité sociale : 100 % Santé, des soins pour tous",
      url: "https://www.securite-sociale.fr/home/dossiers/galerie-dossiers/tous-les-dossiers/100-sante--des-soins-pour-tous-1.html",
    },
  ],
  datePublication: "2026-10-14",
  dateAffichee: "14 octobre 2026",
};

export default function Page() {
  return <ArticleGuide article={ARTICLE} />;
}
