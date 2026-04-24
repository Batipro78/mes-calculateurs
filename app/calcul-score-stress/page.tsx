import type { Metadata } from "next";
import ScoreStress from "./ScoreStress";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-score-stress" },
  title: "Calcul Score Stress 2026 - Test PSS-10 Gratuit en Ligne",
  description:
    "Evaluez votre niveau de stress avec le test PSS-10 (Perceived Stress Scale). 10 questions, resultats instantanes, conseils personnalises. Gratuit et anonyme.",
  keywords:
    "calcul score stress, PSS-10, test stress, niveau stress, stress percu, echelle stress, evaluation stress, gestion stress, bien-etre mental, stress travail",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Score Stress - PSS-10" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu'est-ce que le score PSS-10 et comment mesure-t-il le stress ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le PSS-10 (Perceived Stress Scale) est l'echelle de reference mondiale pour mesurer le stress percu. Developpe en 1983 par Sheldon Cohen, ce questionnaire de 10 questions evalue la frequence a laquelle vous avez ressenti du stress au cours du dernier mois, sur une echelle de 0 (jamais) a 4 (tres souvent). Le score total va de 0 a 40 : 0-13 = stress faible, 14-26 = stress modere, 27-40 = stress eleve.",
                },
              },
              {
                "@type": "Question",
                name: "A quelle frequence faut-il evaluer son niveau de stress ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Il est recommande d'evaluer son niveau de stress tous les 1 a 3 mois, ou lors de changements importants dans votre vie (nouveau travail, demenagement, evenements familiaux). Un suivi regulier permet de detecter une augmentation progressive du stress et d'agir avant qu'il ne devienne chronique.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les methodes les plus efficaces pour reduire le stress ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les methodes les plus efficaces scientifiquement prouvees sont : la coherence cardiaque (5 min, 3 fois/jour), la meditation de pleine conscience (10-20 min/jour), l'activite physique reguliere (150 min/semaine), la therapie cognitive-comportementale (TCC), et un sommeil suffisant (7-8h/nuit). La combinaison de plusieurs approches donne les meilleurs resultats.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Score Stress" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Score Stress 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Evaluez votre niveau de stress avec le test PSS-10, l&apos;echelle de reference mondiale. 10 questions, resultats instantanes et conseils personnalises.
      </p>

      <ScoreStress />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le score PSS-10 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>PSS-10</strong> (Perceived Stress Scale) est l&apos;outil psychometrique le plus utilise au monde pour mesurer le <strong>stress percu</strong>. Developpe en 1983 par les chercheurs <strong>Sheldon Cohen, Tom Kamarck et Robin Mermelstein</strong>, il a ete valide dans plus de 30 langues et utilise dans des milliers d&apos;etudes scientifiques.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Contrairement aux mesures physiologiques (cortisol, frequence cardiaque), le PSS-10 evalue votre <strong>perception subjective</strong> du stress : a quel point vous sentez-vous deborde, en perte de controle ou incapable de gerer les evenements de votre vie ? Cette approche est consideree comme plus predictive de l&apos;impact reel du stress sur la sante.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 3 niveaux de stress
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="font-semibold text-green-700 text-sm">Stress faible (0-13)</p>
            <p className="text-xs text-green-600 mt-1">
              Vous gerez bien les situations stressantes. Votre equilibre emotionnel est bon. Continuez vos bonnes habitudes de vie et restez vigilant en periode de changement.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="font-semibold text-yellow-700 text-sm">Stress modere (14-26)</p>
            <p className="text-xs text-yellow-600 mt-1">
              Certaines situations vous depassent parfois. Ce niveau est courant mais peut devenir problematique s&apos;il persiste. Des techniques de relaxation et une meilleure organisation peuvent aider.
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <p className="font-semibold text-red-700 text-sm">Stress eleve (27-40)</p>
            <p className="text-xs text-red-600 mt-1">
              Vous ressentez frequemment un sentiment d&apos;etre submerge. Ce niveau de stress peut affecter votre sante physique et mentale. Une consultation professionnelle est recommandee.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment reduire son stress ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li><strong>Coherence cardiaque</strong> : 5 minutes de respiration controlee (inspirer 5s, expirer 5s), 3 fois par jour — effet prouve sur le cortisol</li>
          <li><strong>Activite physique</strong> : 150 min/semaine d&apos;exercice modere (marche rapide, velo, natation) reduit le stress de 20 a 30%</li>
          <li><strong>Meditation de pleine conscience</strong> : 10 a 20 min/jour, efficacite demontree sur le stress, l&apos;anxiete et la depression</li>
          <li><strong>Sommeil</strong> : 7 a 8 heures par nuit, coucher a heures regulieres, pas d&apos;ecran 1h avant</li>
          <li><strong>Alimentation</strong> : reduire cafe, alcool et sucre. Privilegier omega-3, magnesium et vitamines B</li>
          <li><strong>Organisation</strong> : planifier ses taches, apprendre a deleguer, fixer des limites claires entre travail et vie personnelle</li>
          <li><strong>Relations sociales</strong> : maintenir des liens de qualite — le soutien social est l&apos;un des meilleurs amortisseurs de stress</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Quand consulter un professionnel ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li>Score PSS-10 superieur a 27 de maniere persistante (plus de 2 mois)</li>
          <li>Troubles du sommeil frequents (insomnies, reveils nocturnes)</li>
          <li>Symptomes physiques recurrents (maux de tete, douleurs musculaires, troubles digestifs)</li>
          <li>Irritabilite excessive, difficulte a se concentrer, perte de motivation</li>
          <li>Consommation accrue d&apos;alcool, tabac ou medicaments pour &quot;tenir le coup&quot;</li>
          <li>Sentiment d&apos;epuisement professionnel (burnout) ou de detachement emotionnel</li>
          <li>Pensees negatives persistantes ou sentiment de desespoir</li>
        </ul>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 font-semibold mb-1">Avertissement</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Ce test est un outil d&apos;auto-evaluation informatif base sur l&apos;echelle PSS-10 validee scientifiquement. Il ne constitue pas un diagnostic medical ni psychologique. Pour une evaluation approfondie de votre etat de stress, consultez un professionnel de sante qualifie (medecin, psychologue, psychiatre). En cas d&apos;urgence, appelez le 3114 (numero national de prevention du suicide).
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 23 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-score-stress" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
