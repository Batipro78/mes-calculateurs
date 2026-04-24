import type { Metadata } from "next";
import SimulateurMobilisation from "../SimulateurMobilisation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

// --- Profils par age + sexe ---
const AGES = [18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
const SEXES = [
  { slug: "homme", label: "homme", article: "un homme" },
  { slug: "femme", label: "femme", article: "une femme" },
] as const;

// --- Profils specifiques ---
const PROFILS = [
  {
    slug: "reserviste",
    titre: "Reserviste",
    description: "Decouvrez si un reserviste est mobilisable en cas de guerre en France. Regles, priorite, rappel sous les drapeaux.",
    keywords: "reserviste mobilisable, mobilisation reserviste, rappel reserviste guerre, reserve militaire France",
    intro: "En tant que reserviste, vous avez deja un lien contractuel avec les armees. En cas de mobilisation generale, vous faites partie des premiers appeles.",
    contenu: {
      titre: "Mobilisation des reservistes en France",
      paragraphes: [
        "Les reservistes operationnels sont lies par un contrat d'engagement a servir dans la reserve (ESR). En cas de mobilisation, ils sont rappeles en priorite, juste apres les forces d'active. La reserve operationnelle compte environ 40 000 personnes en France.",
        "La reserve comprend deux composantes : la reserve operationnelle (RO1 — sous contrat, et RO2 — anciens militaires soumis a l'obligation de disponibilite pendant 5 ans) et la reserve citoyenne (benevoles sans obligation de service arme).",
        "Depuis la loi de programmation militaire 2024-2030, l'objectif est d'atteindre 105 000 reservistes operationnels d'ici 2030. Le rappel des reservistes peut etre decide par decret en conseil des ministres, sans vote du Parlement.",
      ],
    },
  },
  {
    slug: "ancien-militaire",
    titre: "Ancien militaire",
    description: "Un ancien militaire est-il mobilisable en cas de guerre ? Obligation de disponibilite, rappel, regles du Code de la defense.",
    keywords: "ancien militaire mobilisable, rappel ancien militaire, obligation disponibilite, mobilisation veterant",
    intro: "Les anciens militaires restent soumis a une obligation de disponibilite pendant 5 ans apres leur depart des armees. Ils constituent la reserve operationnelle de deuxieme niveau (RO2).",
    contenu: {
      titre: "Rappel des anciens militaires",
      paragraphes: [
        "Apres avoir quitte l'armee, tout ancien militaire est automatiquement verse dans la reserve operationnelle de deuxieme niveau (RO2) pour une duree de 5 ans. Pendant cette periode, il peut etre rappele par decret en cas de crise majeure.",
        "Au-dela de ces 5 ans, l'ancien militaire n'a plus d'obligation legale specifique, mais reste mobilisable au meme titre que tout citoyen en cas de mobilisation generale (18-72 ans). Son experience militaire en fait cependant un profil prioritaire.",
        "Les anciens officiers generaux restent mobilisables jusqu'a 67 ans, les officiers superieurs jusqu'a 62 ans, et les sous-officiers jusqu'a 52 ans dans le cadre de la reserve.",
      ],
    },
  },
  {
    slug: "parent-isole",
    titre: "Parent isole",
    description: "Un parent isole est-il mobilisable en cas de guerre en France ? Exemptions, report, droits des familles monoparentales.",
    keywords: "parent isole mobilisable, mere celibataire guerre, pere solo mobilisation, exemption familiale guerre",
    intro: "La situation de parent isole est un facteur pris en compte lors d'une mobilisation. L'Etat ne peut pas laisser des enfants sans aucun parent.",
    contenu: {
      titre: "Mobilisation et familles monoparentales",
      paragraphes: [
        "Le Code de la defense ne prevoit pas explicitement d'exemption pour les parents isoles. Cependant, dans la pratique, les commissions de mobilisation prennent en compte la situation familiale pour accorder des reports ou des exemptions.",
        "Un parent isole avec des enfants mineurs a charge aurait de fortes chances d'obtenir un report de mobilisation, voire une exemption, afin d'assurer la protection de ses enfants. C'est un principe du droit international humanitaire.",
        "En cas de mobilisation, des dispositifs d'accueil d'urgence pour les enfants seraient mis en place par l'Etat. Neanmoins, le maintien d'au moins un parent aupres des enfants mineurs est generalement considere comme prioritaire.",
      ],
    },
  },
  {
    slug: "profession-sante",
    titre: "Professionnel de sante",
    description: "Un medecin, infirmier ou aide-soignant est-il mobilisable en cas de guerre ? Affectation civile ou militaire, regles specifiques.",
    keywords: "medecin mobilisable guerre, infirmier mobilisation, professionnel sante armee, service sante armees",
    intro: "Les professionnels de sante ont un role crucial en temps de guerre. Ils peuvent etre mobilises au sein du service de sante des armees ou maintenus en poste civil.",
    contenu: {
      titre: "Les soignants face a la mobilisation",
      paragraphes: [
        "Les professionnels de sante (medecins, infirmiers, pharmaciens, aides-soignants) sont dans une situation particuliere : ils sont a la fois mobilisables comme tout citoyen et indispensables au fonctionnement du systeme de sante civil.",
        "En cas de mobilisation, une partie des soignants serait affectee au service de sante des armees (SSA) pour soigner les blesses militaires. L'autre partie serait maintenue en poste civil pour assurer les soins a la population. La repartition serait decidee par les autorites.",
        "Fait notable : le ministere de la Sante a demande aux hopitaux francais de se preparer a un scenario de conflit majeur d'ici mars 2026, prevoyant la prise en charge de plusieurs milliers de blesses sur des periodes de 10 a 180 jours. Cela montre que le systeme de sante est considere comme un pilier de la defense nationale.",
      ],
    },
  },
  {
    slug: "femme-enceinte",
    titre: "Femme enceinte",
    description: "Une femme enceinte est-elle mobilisable en cas de guerre en France ? Exemptions medicales, protection des femmes enceintes.",
    keywords: "femme enceinte mobilisable, grossesse mobilisation guerre, exemption femme enceinte, protection maternite guerre",
    intro: "La grossesse constitue un motif d'exemption medicale de mobilisation. Les femmes enceintes sont protegees par le droit national et international.",
    contenu: {
      titre: "Protection des femmes enceintes en cas de conflit",
      paragraphes: [
        "Une femme enceinte serait exemptee de mobilisation pour raison medicale. La grossesse est consideree comme un etat de sante incompatible avec le service militaire. Cette protection s'applique pendant toute la duree de la grossesse et les semaines suivant l'accouchement.",
        "Les Conventions de Geneve (article 14 et 17 de la IVe Convention) prevoient une protection speciale pour les femmes enceintes en temps de guerre, tant civiles que combattantes. Le droit francais s'inscrit dans cette logique.",
        "Apres l'accouchement, la mere beneficierait egalement d'un report de mobilisation pour s'occuper du nouveau-ne, d'autant plus si elle est parent isole ou si le conjoint est lui-meme mobilise.",
      ],
    },
  },
  {
    slug: "etudiant",
    titre: "Etudiant",
    description: "Un etudiant est-il mobilisable en cas de guerre en France ? Age, report, sursis pour etudes, regles en vigueur.",
    keywords: "etudiant mobilisable guerre, mobilisation etudiant, sursis etudes mobilisation, jeune mobilisable France",
    intro: "Les etudiants de 18 ans et plus sont juridiquement mobilisables. Cependant, des sursis ont historiquement ete accordes pour les etudes.",
    contenu: {
      titre: "Etudiants et mobilisation",
      paragraphes: [
        "Tout etudiant de 18 ans ou plus est mobilisable au regard du Code de la defense. Le statut d'etudiant ne constitue pas en soi une exemption legale. Cependant, lors des conflits precedents, des reports ou sursis ont ete accordes pour permettre de terminer des etudes, notamment dans des domaines strategiques.",
        "Les etudiants en medecine, en sciences ou en ingenierie pourraient etre orientes vers des postes de soutien technique ou scientifique plutot que vers le combat. L'armee a besoin de competences diversifiees, pas uniquement de combattants.",
        "Pour les etudiants ages de 18 a 25 ans, le nouveau service militaire volontaire de 2026 offre une alternative : 10 mois de service remunere a 800 euros/mois, sans envoi a l'etranger. C'est une option distincte de la mobilisation generale.",
      ],
    },
  },
  {
    slug: "double-nationalite",
    titre: "Double nationalite",
    description: "Mobilisation et double nationalite : quelle armee vous appelle ? Regles pour les binationaux en cas de guerre en France.",
    keywords: "double nationalite mobilisable, binational guerre France, mobilisation deux nationalites, quel pays mobilise",
    intro: "Les binationaux francais sont soumis aux obligations militaires francaises lorsqu'ils resident en France. Mais la question se complique si l'autre pays est aussi en conflit.",
    contenu: {
      titre: "Binationaux face a la mobilisation",
      paragraphes: [
        "Un citoyen franco-etranger residant en France est soumis aux obligations du Code de la defense francais, y compris la mobilisation. La double nationalite ne constitue pas une exemption. Vous etes considere comme francais a part entiere sur le territoire.",
        "Si l'autre pays de nationalite est egalement en conflit, la situation se complique. En droit international, c'est generalement le pays de residence qui prevaut. La Convention de La Haye de 1930 prevoit qu'un binational ne peut pas etre mobilise par deux pays simultanement.",
        "En pratique, les binationaux residant a l'etranger pourraient etre mobilises via les consulats francais, mais leur rappel effectif dependrait de la cooperation du pays de residence. Les binationaux dont l'autre nationalite est celle d'un pays ennemi pourraient faire l'objet de mesures specifiques (affectation a des postes non-sensibles).",
      ],
    },
  },
] as const;

type ParsedParams =
  | { type: "age-sexe"; age: number; sexe: (typeof SEXES)[number] }
  | { type: "profil"; profil: (typeof PROFILS)[number] };

function parseSlug(slug: string): ParsedParams | null {
  // Profils specifiques
  const profil = PROFILS.find((p) => p.slug === slug);
  if (profil) return { type: "profil", profil };

  // Age + sexe : "homme-25-ans" ou "femme-40-ans"
  const match = slug.match(/^(homme|femme)-(\d+)-ans$/);
  if (match) {
    const sexe = SEXES.find((s) => s.slug === match[1]);
    const age = parseInt(match[2]);
    if (sexe && AGES.includes(age)) {
      return { type: "age-sexe", age, sexe };
    }
  }
  return null;
}

function getCategorie(age: number, sexe: string) {
  let label: string;
  let couleur: string;
  let description: string;

  if (age < 18 || age > 72) {
    return { label: "Non mobilisable", couleur: "bg-green-100 text-green-800", description: age < 18 ? "Mineur(e), non concerne(e) par la mobilisation." : "Au-dela de la limite d'age de 72 ans." };
  }

  if (age <= 35) {
    label = "Mobilisation probable";
    couleur = "bg-orange-100 text-orange-800";
    description = `A ${age} ans, ${sexe === "homme" ? "un homme" : "une femme"} se situe dans la tranche d'age prioritaire (18-35 ans) pour la mobilisation. Sans experience militaire, vous seriez appele(e) en deuxieme vague, apres les reservistes et anciens militaires.`;
  } else if (age <= 50) {
    label = "Mobilisation possible";
    couleur = "bg-yellow-100 text-yellow-800";
    description = `A ${age} ans, ${sexe === "homme" ? "un homme" : "une femme"} pourrait etre mobilise(e) en cas de besoin important. La tranche 36-50 ans est appelee en renfort apres les 18-35 ans.`;
  } else if (age <= 60) {
    label = "Mobilisation peu probable";
    couleur = "bg-yellow-100 text-yellow-800";
    description = `A ${age} ans, la mobilisation serait reservee a des postes de soutien et logistique. La priorite va aux tranches d'age inferieures.`;
  } else {
    label = "Mobilisation tres peu probable";
    couleur = "bg-green-100 text-green-800";
    description = `A ${age} ans, vous approchez de la limite de 72 ans. Une mobilisation ne concernerait que des postes non-combattants en dernier recours.`;
  }
  return { label, couleur, description };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  // Pages age + sexe
  for (const sexe of SEXES) {
    for (const age of AGES) {
      params.push({ params: `${sexe.slug}-${age}-ans` });
    }
  }

  // Pages profils specifiques
  for (const profil of PROFILS) {
    params.push({ params: profil.slug });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "age-sexe") {
    const { age, sexe } = parsed;
    const cat = getCategorie(age, sexe.slug);
    return {
    alternates: { canonical: `/simulateur-mobilisation/${slug}` },
      title: `Mobilisation ${sexe.label} de ${age} ans - Suis-je mobilisable ? 2026`,
      description: `${sexe.label === "homme" ? "Un homme" : "Une femme"} de ${age} ans est-${sexe.label === "homme" ? "il" : "elle"} mobilisable en cas de guerre en France ? ${cat.label}. Simulateur gratuit base sur le Code de la defense.`,
      keywords: `mobilisation ${sexe.label} ${age} ans, ${sexe.label} ${age} ans mobilisable, guerre France ${age} ans, conscription ${age} ans`,
    };
  }

  return {
    alternates: { canonical: `/simulateur-mobilisation/${slug}` },
    title: `${parsed.profil.titre} mobilisable ? - Simulateur mobilisation 2026`,
    description: parsed.profil.description,
    keywords: parsed.profil.keywords,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  if (parsed.type === "age-sexe") {
    const { age, sexe } = parsed;
    const cat = getCategorie(age, sexe.slug);

    // Ages proches pour les liens internes
    const autresAges = AGES.filter((a) => a !== age).slice(0, 6);

    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `${sexe.label === "homme" ? "Un homme" : "Une femme"} de ${age} ans est-${sexe.label === "homme" ? "il" : "elle"} mobilisable en cas de guerre ?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: cat.description,
                  },
                },
              ],
            }),
          }}
        />

        <Breadcrumb
          currentPage={`${sexe.label === "homme" ? "Homme" : "Femme"} ${age} ans`}
          parentPage="Simulateur Mobilisation"
          parentHref="/simulateur-mobilisation"
        />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
            🪖
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Mobilisation {sexe.label} de {age} ans
          </h1>
        </div>
        <p className="text-slate-500 mb-8 ml-[52px]">
          {sexe.label === "homme" ? "Un homme" : "Une femme"} de {age} ans
          est-{sexe.label === "homme" ? "il" : "elle"} mobilisable en cas de
          guerre en France ?
        </p>

        {/* Resultat principal */}
        <div
          className={`rounded-2xl border-2 p-8 mb-8 ${cat.couleur}`}
        >
          <h2 className="text-2xl font-extrabold mb-2">{cat.label}</h2>
          <p className="text-sm leading-relaxed">{cat.description}</p>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Ce que dit la loi pour {sexe.article} de {age} ans
          </h2>
          {age >= 18 && age <= 72 ? (
            <>
              <p className="text-slate-600 leading-relaxed mb-4">
                Selon le Code de la defense, tout citoyen francais age de 18 a 72
                ans peut etre mobilise en cas de menace grave pour la nation. A{" "}
                <strong>{age} ans</strong>, vous etes donc juridiquement
                mobilisable.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                En pratique, la mobilisation suit un ordre de priorite :{" "}
                <strong>forces d&apos;active</strong> (militaires professionnels), puis{" "}
                <strong>reservistes</strong>, puis <strong>anciens militaires</strong>,
                puis les civils par tranche d&apos;age croissante. Les 18-35 ans sont
                appeles avant les 36-50 ans, qui precedent les 51-72 ans.
              </p>
              <p className="text-slate-600 leading-relaxed">
                {sexe.slug === "femme"
                  ? "Depuis 1997, les femmes sont integrees dans l'armee francaise et sont mobilisables au meme titre que les hommes. Dans la pratique historique, les femmes sont souvent affectees en priorite a des postes de soutien (sante, logistique, communication)."
                  : "Les hommes constituent traditionnellement la majorite des effectifs mobilises. A " + age + " ans, un homme en bonne sante et sans exemption particuliere serait parmi les profils mobilises " + (age <= 35 ? "en priorite." : age <= 50 ? "en deuxieme vague." : "pour des postes de soutien.")}
              </p>
            </>
          ) : (
            <p className="text-slate-600 leading-relaxed">
              {age < 18
                ? "Les mineurs ne sont pas mobilisables. Le Code de la defense fixe la limite inferieure a 18 ans."
                : "A " + age + " ans, vous depassez la limite de 72 ans fixee par le Code de la defense pour la mobilisation generale."}
            </p>
          )}
        </div>

        {/* Avertissement */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-8">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Avertissement :</strong> Ce simulateur est un outil informatif.
            Il ne constitue pas un avis juridique officiel. Seules les autorites
            militaires determinent qui est mobilise en cas de conflit.
          </p>
        </div>

        {/* Calculateur interactif */}
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Testez votre profil complet
        </h2>
        <SimulateurMobilisation />

        <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

        {/* Liens vers autres ages */}
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Autres ages — {sexe.label === "homme" ? "Homme" : "Femme"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {autresAges.map((a) => (
              <a
                key={a}
                href={`/simulateur-mobilisation/${sexe.slug}-${a}-ans`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all"
              >
                {sexe.label === "homme" ? "Homme" : "Femme"} {a} ans
              </a>
            ))}
          </div>
        </section>

        {/* Liens profils specifiques */}
        <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Situations specifiques
          </h2>
          <div className="flex flex-wrap gap-2">
            {PROFILS.map((p) => (
              <a
                key={p.slug}
                href={`/simulateur-mobilisation/${p.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all"
              >
                {p.titre}
              </a>
            ))}
          </div>
        </section>

        <RelatedCalculators currentSlug="/simulateur-mobilisation" />
        <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
      </div>
    );
  }

  // --- Page profil specifique ---
  const { profil } = parsed;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `${profil.titre} : suis-je mobilisable en cas de guerre ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: profil.intro,
                },
              },
            ],
          }),
        }}
      />

      <Breadcrumb
        currentPage={profil.titre}
        parentPage="Simulateur Mobilisation"
        parentHref="/simulateur-mobilisation"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🪖
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {profil.titre} : suis-je mobilisable ?
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{profil.intro}</p>

      {/* Contenu detaille */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {profil.contenu.titre}
        </h2>
        {profil.contenu.paragraphes.map((p, i) => (
          <p key={i} className="text-slate-600 leading-relaxed mb-4 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      {/* Avertissement */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Avertissement :</strong> Ce simulateur est un outil informatif
          base sur les textes legislatifs en vigueur. Il ne constitue pas un avis
          juridique officiel.
        </p>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Testez votre profil complet
      </h2>
      <SimulateurMobilisation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Autres profils */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Autres situations
        </h2>
        <div className="flex flex-wrap gap-2">
          {PROFILS.filter((p) => p.slug !== profil.slug).map((p) => (
            <a
              key={p.slug}
              href={`/simulateur-mobilisation/${p.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all"
            >
              {p.titre}
            </a>
          ))}
        </div>
      </section>

      {/* Liens par age */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Mobilisation par age
        </h2>
        <div className="flex flex-wrap gap-2">
          {AGES.slice(0, 8).map((a) => (
            <a
              key={a}
              href={`/simulateur-mobilisation/homme-${a}-ans`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all"
            >
              Homme {a} ans
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-mobilisation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
