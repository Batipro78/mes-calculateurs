import type { Metadata } from "next";
import TestAnxieteGAD7 from "./TestAnxieteGAD7";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/test-anxiete-gad7" },
  title: "Test Anxiete GAD-7 en ligne - Score, Interpretation, Niveau",
  description:
    "Test GAD-7 (Generalized Anxiety Disorder) en ligne et gratuit. 7 questions, score 0-21, interpretation (minimale, legere, moderee, severe). Echelle validee Spitzer 2006 / HAS.",
  keywords:
    "test anxiete, GAD-7, generalized anxiety disorder, echelle anxiete, depistage anxiete, score anxiete, test psychologique gratuit, Spitzer 2006, HAS, anxiete generalisee",
  openGraph: {
    title: "Test Anxiete GAD-7 (Generalized Anxiety Disorder)",
    description:
      "Auto-evaluation gratuite de l'anxiete sur 7 questions. Score, niveau et recommandations selon le bareme international.",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que le test GAD-7 ?",
    a: "Le GAD-7 (Generalized Anxiety Disorder 7) est une echelle d'auto-evaluation composee de 7 questions, developpee par Spitzer et collegues en 2006. Chaque question est notee de 0 a 3, pour un score total de 0 a 21. C'est l'un des outils de depistage de l'anxiete les plus utilises dans le monde, recommande par la HAS en France.",
  },
  {
    q: "Comment interpreter mon score GAD-7 ?",
    a: "Les seuils valides sont : 0-4 anxiete minimale, 5-9 anxiete legere, 10-14 anxiete moderee, 15-21 anxiete severe. Un score superieur ou egal a 10 a une sensibilite de 89% et une specificite de 82% pour le trouble anxieux generalise.",
  },
  {
    q: "Le test GAD-7 est-il fiable ?",
    a: "Oui. Valide scientifiquement en 2006 par Spitzer et al. dans Archives of Internal Medicine sur plus de 2700 patients, le GAD-7 est utilise par l'Organisation mondiale de la sante et recommande par la Haute Autorite de Sante francaise. Sa version francaise a ete validee. Toutefois, il s'agit d'un outil de depistage et non d'un outil diagnostique.",
  },
  {
    q: "Que faire si mon score est eleve ?",
    a: "Un score superieur a 10 doit conduire a consulter un medecin generaliste ou un psychologue. Une prise en charge peut etre proposee : therapie cognitivo-comportementale (TCC), suivi psychologique, parfois traitement medicamenteux. En cas de souffrance importante, contactez le 3114 (prevention suicide) ou le 15.",
  },
  {
    q: "GAD-7 ou PHQ-9 : quelle difference ?",
    a: "Le GAD-7 evalue l'anxiete generalisee, tandis que le PHQ-9 (Patient Health Questionnaire 9) evalue la depression. Les deux echelles ont ete developpees par la meme equipe (Spitzer, Kroenke, Williams) et sont souvent utilisees en complement dans les soins primaires.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Test GAD-7 anxiete"
        category="HealthApplication"
      />
      <Breadcrumb currentPage="Test Anxiete GAD-7" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Test Anxiete GAD-7
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Auto-evaluation gratuite de votre niveau d&apos;anxiete sur 7 questions.
        Echelle internationale Spitzer 2006, validee par l&apos;OMS et la HAS.
      </p>

      <TestAnxieteGAD7 />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le GAD-7 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>GAD-7</strong> (Generalized Anxiety Disorder 7-item scale)
          est une echelle d&apos;auto-evaluation de l&apos;anxiete generalisee
          developpee en 2006 par <strong>Robert L. Spitzer</strong> et ses
          collegues a la Columbia University. Publiee dans <em>Archives of
          Internal Medicine</em>, elle est devenue l&apos;un des outils de
          depistage les plus utilises au monde dans les soins primaires.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le test comporte <strong>7 questions</strong> portant sur les deux
          dernieres semaines. Chaque reponse est notee de 0 (jamais) a 3
          (presque tous les jours), pour un score total compris entre{" "}
          <strong>0 et 21 points</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Reconnaissance internationale
        </h3>
        <ul className="text-slate-600 space-y-2 ml-4 list-disc">
          <li>
            Utilise par l&apos;<strong>Organisation Mondiale de la Sante (OMS)</strong> dans le programme mhGAP.
          </li>
          <li>
            Recommande par la <strong>HAS (Haute Autorite de Sante)</strong>{" "}
            en France pour le depistage en medecine generale.
          </li>
          <li>
            Valide en langue francaise (Micoulaud-Franchi et al., 2016).
          </li>
          <li>
            Sensibilite 89%, specificite 82% au seuil de 10 (Spitzer 2006).
          </li>
        </ul>
      </section>

      <section className="mt-12 bg-violet-50 border border-violet-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-violet-900 mb-4">
          Comprendre les 4 niveaux d&apos;anxiete
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="font-bold text-green-900 mb-1">Score 0-4 : Minimale</p>
            <p className="text-sm text-green-800">
              Anxiete absente ou tres faible. Pas de prise en charge necessaire.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="font-bold text-yellow-900 mb-1">Score 5-9 : Legere</p>
            <p className="text-sm text-yellow-800">
              Surveillance recommandee. Techniques de relaxation, hygiene de vie.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="font-bold text-orange-900 mb-1">Score 10-14 : Moderee</p>
            <p className="text-sm text-orange-800">
              Consultation conseillee. TCC, suivi psychologique souvent benefiques.
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="font-bold text-red-900 mb-1">Score 15-21 : Severe</p>
            <p className="text-sm text-red-800">
              Prise en charge medicale necessaire. Consultation rapide recommandee.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Limites du test GAD-7
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le GAD-7 est un <strong>outil de depistage</strong>, pas un outil
          diagnostique. Un score eleve ne signifie pas necessairement que vous
          souffrez d&apos;un trouble anxieux generalise au sens clinique. Seul
          un professionnel de sante (medecin, psychiatre, psychologue) peut
          poser un diagnostic apres entretien clinique.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A l&apos;inverse, un score faible n&apos;exclut pas la presence
          d&apos;autres troubles : depression, trouble panique, phobies, stress
          post-traumatique, etc. Si vous ressentez une souffrance, parlez-en a
          votre medecin meme si votre score GAD-7 est bas.
        </p>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Quand consulter ?
        </h2>
        <p className="text-blue-800 mb-4 leading-relaxed">
          Une consultation est recommandee si :
        </p>
        <ul className="text-blue-800 space-y-2 ml-4 list-disc mb-4">
          <li>Votre score GAD-7 est superieur ou egal a 10.</li>
          <li>Vos inquietudes persistent depuis plus de 6 mois.</li>
          <li>Votre anxiete impacte votre travail, votre vie sociale ou familiale.</li>
          <li>Vous evitez certaines situations a cause de votre anxiete.</li>
          <li>
            Vous avez des symptomes physiques : palpitations, troubles du
            sommeil, tensions musculaires, troubles digestifs.
          </li>
          <li>Vous avez des pensees noires ou des idees suicidaires.</li>
        </ul>
        <div className="bg-white border border-blue-300 rounded-lg p-4">
          <p className="text-blue-900 font-semibold mb-2">Numeros d&apos;urgence</p>
          <ul className="text-blue-800 text-sm space-y-1">
            <li><strong>3114</strong> - Numero national de prevention du suicide (gratuit, 24h/24)</li>
            <li><strong>15</strong> - SAMU - Urgences medicales</li>
            <li><strong>SOS Amitie</strong> - 09 72 39 40 50 (24h/24)</li>
            <li><strong>Fil Sante Jeunes</strong> - 0 800 235 236 (gratuit)</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Sources scientifiques
        </h2>
        <ul className="text-slate-600 space-y-3 text-sm">
          <li>
            <strong>Spitzer RL, Kroenke K, Williams JBW, Lowe B.</strong> A brief
            measure for assessing generalized anxiety disorder: the GAD-7.
            <em> Archives of Internal Medicine</em>, 2006;166(10):1092-1097.
          </li>
          <li>
            <strong>Haute Autorite de Sante (HAS).</strong> Recommandations sur
            la prise en charge du trouble anxieux generalise en soins primaires.
          </li>
          <li>
            <strong>Organisation Mondiale de la Sante (OMS).</strong> mhGAP
            Intervention Guide - Module sur les troubles anxieux.
          </li>
          <li>
            <strong>Micoulaud-Franchi JA, et al.</strong> Validation de la
            version francaise du GAD-7. 2016.
          </li>
        </ul>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Disclaimer :</strong> Ce test est un outil de depistage informatif.
          Il ne constitue pas un diagnostic medical. Les resultats ne remplacent
          pas une consultation avec un professionnel de sante. En cas de
          souffrance, contactez votre medecin ou les numeros d&apos;urgence.
        </p>
      </div>

      <HowToJsonLd
        name="Évaluer son niveau d'anxiete avec le GAD-7"
        steps={[
          { name: "Répondre aux 7 questions sur les 2 dernieres semaines", text: "Pour chacune des 7 questions, sélectionner la fréquence : 0 = Jamais, 1 = Quelques jours, 2 = Plus de la moitie des jours, 3 = Presque tous les jours. Les questions portent sur la nervosite, les inquietudes incontrolables, les tensions, l'irritabilite, la peur et les troubles du sommeil." },
          { name: "Calculer le score total (0 à 21)", text: "Additionner les 7 reponses. Le score total varie de 0 (aucune anxiete) à 21 (anxiete maximale)." },
          { name: "Interpréter le score selon les 4 niveaux valides (Spitzer 2006)", text: "0-4 : anxiete minimale, pas de prise en charge nécessaire ; 5-9 : legere, surveillance et relaxation recommandees ; 10-14 : moderee, consultation conseillee (TCC souvent efficace) ; 15-21 : severe, prise en charge medicale recommandee. Au seuil de 10, la sensibilité est de 89% et la specificite de 82% pour le trouble anxieux generalise." },
          { name: "Agir selon le résultat", text: "Un score de 10 ou plus justifie une consultation aupres d'un medecin generaliste ou d'un psychologue. En cas de souffrance immediate ou de pensees noires, appeler le 3114 (prevention suicide, gratuit, 24h/24) ou le 15." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/test-anxiete-gad7" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
