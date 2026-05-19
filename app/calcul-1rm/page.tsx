import type { Metadata } from "next";
import Calcul1RM from "./Calcul1RM";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-1rm" },
  title: "Calcul 1RM - 5 formules (Brzycki, Epley, Lander, Lombardi, O'Connor)",
  description:
    "Calculez votre 1 Rep Max (1RM) avec les 5 formules : Brzycki, Epley, Lander, Lombardi, O&apos;Connor. Estimez votre charge maximale et vos poids de travail par objectif musculation.",
  keywords:
    "calcul 1rm, one rep max, brzycki, epley, lander, lombardi, oconnor, charge maximale musculation, powerlifting, pourcentage 1rm, tableau charges",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul 1RM - One Rep Max" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le 1RM ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le 1RM (1 Rep Max) est la charge maximale qu&apos;une personne peut soulever correctement en une seule répétition. C&apos;est la référence absolue en musculation et powerlifting pour mesurer la force. Le 1RM ne doit généralement pas être testé régulièrement pour des raisons de sécurité et de récupération.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle formule de 1RM est la plus précise ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La formule de Brzycki est la plus utilisée et généralement considérée comme la plus fiable pour la musculation et le powerlifting. Elle donne souvent les meilleurs résultats. Cependant, chaque formule a ses variantes : Epley est aussi populaire, tandis que Lander et Lombardi sont plus spécialisées. La moyenne des 5 formules offre une estimation plus robuste.",
                },
              },
              {
                "@type": "Question",
                name: "Comment utiliser le 1RM pour programmer l&apos;entraînement ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une fois votre 1RM connu ou estimé, vous pouvez déterminer les charges de travail selon vos objectifs : Force (85-100% 1RM), Hypertrophie (65-85% 1RM), Endurance (40-65% 1RM). Cet outil génère les charges pour 1-20 répétitions et leurs pourcentages correspondants. N&apos;augmentez pas d&apos;un coup les charges sans progressivité.",
                },
              },
              {
                "@type": "Question",
                name: "Faut-il tester son 1RM réel en salle ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tester son vrai 1RM comporte des risques de blessure et de surmenage. Il est préférable de l&apos;estimer via ce calculateur à partir de charges plus légères et plus de répétitions. Si vous testez votre 1RM, faites-le avec un partenaire, correctement échauffé, et en fin de bloc d&apos;entraînement. Les tests ne sont pas nécessaires fréquemment.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul 1RM - One Rep Max" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏋️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul 1RM - One Rep Max
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre charge maximale avec 5 formules éprouvées et calculez vos charges de travail par répétition.
      </p>

      <Calcul1RM />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 5 formules expliquées
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Plusieurs formules mathématiques ont été développées pour estimer le 1RM à partir d&apos;une charge plus légère et d&apos;un nombre de répétitions. Chacune a ses forces et faiblesses.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2 text-sm">Brzycki</h3>
            <p className="text-xs text-slate-600 mb-3">
              La plus populaire en musculation et powerlifting.
            </p>
            <code className="text-xs bg-slate-50 p-2 rounded block text-slate-700">
              1RM = poids / (1.0278 - 0.0278 × reps)
            </code>
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2 text-sm">Epley</h3>
            <p className="text-xs text-slate-600 mb-3">
              Aussi fiable que Brzycki, plus simple.
            </p>
            <code className="text-xs bg-slate-50 p-2 rounded block text-slate-700">
              1RM = poids × (1 + reps/30)
            </code>
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2 text-sm">Lander</h3>
            <p className="text-xs text-slate-600 mb-3">
              Équation plus complexe, moins courante.
            </p>
            <code className="text-xs bg-slate-50 p-2 rounded block text-slate-700">
              1RM = (100 × poids) / (101.3 - 2.67 × reps)
            </code>
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2 text-sm">Lombardi</h3>
            <p className="text-xs text-slate-600 mb-3">
              Formule exponentielle, moins fiable.
            </p>
            <code className="text-xs bg-slate-50 p-2 rounded block text-slate-700">
              1RM = poids × reps^0.10
            </code>
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2 text-sm">O&apos;Connor</h3>
            <p className="text-xs text-slate-600 mb-3">
              Linéaire, moins précise pour reps élevées.
            </p>
            <code className="text-xs bg-slate-50 p-2 rounded block text-slate-700">
              1RM = poids × (1 + 0.025 × reps)
            </code>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourcentages de 1RM par objectif
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Selon votre objectif d&apos;entraînement, vous devez vous entraîner dans une zone de pourcentage 1RM spécifique. Voici les recommandations générales :
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-3">Force maximale</h3>
            <div className="space-y-2 text-sm text-amber-800">
              <p><span className="font-semibold">85-100% 1RM</span></p>
              <p><span className="font-semibold">1-5 reps</span></p>
              <p className="text-xs text-amber-700 mt-2">Très lourd, peu de reps. À réserver aux expérimentés avec partenaire.</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="font-bold text-emerald-900 mb-3">Hypertrophie</h3>
            <div className="space-y-2 text-sm text-emerald-800">
              <p><span className="font-semibold">65-85% 1RM</span></p>
              <p><span className="font-semibold">6-12 reps</span></p>
              <p className="text-xs text-emerald-700 mt-2">Zone idéale pour la prise de muscle. Bon équilibre charge/volume.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3">Endurance musculaire</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><span className="font-semibold">40-65% 1RM</span></p>
              <p><span className="font-semibold">13+ reps</span></p>
              <p className="text-xs text-blue-700 mt-2">Charges plus légères, plus de reps. Moins exigeant articulairement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-orange-50 rounded-2xl border border-orange-200 p-8">
        <h2 className="text-xl font-bold text-orange-900 mb-4">
          ⚠️ Précautions importantes
        </h2>
        <div className="space-y-4 text-slate-700">
          <p>
            <span className="font-semibold">S&apos;échauffer correctement</span> : Ne jamais débuter avec votre charge de travail. Effectuez 5-10 min de cardio léger, puis des séries progressives d&apos;échauffement.
          </p>
          <p>
            <span className="font-semibold">Avoir un partenaire</span> : Particulièrement pour les charges lourdes ou les tests 1RM. Une tierce personne peut intervenir en cas de problème.
          </p>
          <p>
            <span className="font-semibold">Respecter la technique</span> : Une mauvaise exécution augmente le risque de blessure et fausse l&apos;estimation. La technique doit être impeccable.
          </p>
          <p>
            <span className="font-semibold">Ne pas tester souvent le vrai 1RM</span> : Estimez-le plutôt que de le tester. Si vous le testez, attendez au moins 2-3 semaines entre les tests pour la récupération du système nerveux.
          </p>
          <p>
            <span className="font-semibold">Progressivité</span> : Augmentez graduellement (2.5-5 kg par semaine). Les sauts de charge importants causent des blessures chroniques.
          </p>
        </div>
      </section>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-1rm" />
    </div>
  );
}
