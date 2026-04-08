import type { Metadata } from "next";
import CalculateurBesoinSommeil from "./CalculateurBesoinSommeil";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Besoin Sommeil 2026 - Heures de Sommeil par Age Gratuit",
  description:
    "Calculez vos besoins en sommeil selon votre age (NSF guidelines), activite physique et qualite de sommeil. Heures ideales, cycles de 90 min, heure de coucher et reveil optimaux. Gratuit et instantane.",
  keywords:
    "calcul besoin sommeil, heures de sommeil par age, besoin sommeil adulte, cycle sommeil 90 minutes, heure coucher ideal, sommeil paradoxal, sommeil profond, NSF guidelines, dette sommeil",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Besoin Sommeil" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien d'heures de sommeil faut-il par nuit selon l'age ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Selon la National Sleep Foundation (NSF), les besoins varient selon l'age : nouveau-nes (0-3 mois) : 14-17h ; nourrissons (4-11 mois) : 12-15h ; tout-petits (1-2 ans) : 11-14h ; enfants (3-5 ans) : 10-13h ; enfants d'age scolaire (6-13 ans) : 9-11h ; adolescents (14-17 ans) : 8-10h ; jeunes adultes et adultes (18-64 ans) : 7-9h ; seniors (65+) : 7-8h.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce qu'un cycle de sommeil et combien en faut-il ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un cycle de sommeil dure environ 90 minutes et comprend 4 phases : N1 (sommeil leger), N2 (sommeil leger consolide), N3 (sommeil profond) et REM (sommeil paradoxal ou reves). Un adulte enchai­ne 4 a 6 cycles par nuit. Il est conseille de programmer son reveil apres un cycle complet pour eviter la sensation de fatigue au reveil (inertie du sommeil).",
                },
              },
              {
                "@type": "Question",
                name: "Comment ameliorer la qualite de son sommeil ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour ameliorer la qualite du sommeil : maintenir des horaires reguliers (meme le week-end), eviter les ecrans 1h avant le coucher, garder la chambre fraiche (18-20 degres), eviter la cafeine apres 14h, pratiquer une activite physique reguliere (mais pas en soiree), ne pas manger trop lourd le soir, et s'exposer a la lumiere naturelle le matin pour regler son horloge biologique.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Besoin Sommeil" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Besoin Sommeil 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos besoins en sommeil selon votre age, niveau d&apos;activite et
        qualite de sommeil. Cycles de 90 min, heures ideales de coucher et de reveil.
      </p>

      <CalculateurBesoinSommeil />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Besoins en sommeil selon l&apos;age (NSF Guidelines)
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>National Sleep Foundation</strong> (NSF) publie des recommandations
          scientifiques sur les besoins en sommeil par tranche d&apos;age. Ces donnees,
          mises a jour en 2015 et confirmees depuis, constituent la reference mondiale
          en matiere de <strong>hygiene du sommeil</strong>.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Tranche d&apos;age</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Heures recommandees</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Ideal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Nouveau-nes (0-3 mois)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">14 – 17h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">15,5h</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Nourrissons (4-11 mois)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">12 – 15h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">13,5h</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Tout-petits (1-2 ans)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">11 – 14h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">12,5h</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Prescolaire (3-5 ans)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">10 – 13h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">11,5h</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Scolaire (6-13 ans)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">9 – 11h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">10h</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Adolescents (14-17 ans)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">8 – 10h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">9h</td>
              </tr>
              <tr className="border-b border-slate-100 bg-indigo-50/30">
                <td className="py-2.5 px-2 font-medium text-slate-700">Jeunes adultes (18-25 ans)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">7 – 9h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">8h</td>
              </tr>
              <tr className="border-b border-slate-100 bg-indigo-50/30">
                <td className="py-2.5 px-2 font-medium text-slate-700">Adultes (26-64 ans)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">7 – 9h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">8h</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Seniors (65 ans et +)</td>
                <td className="py-2.5 px-2 text-right text-slate-600">7 – 8h</td>
                <td className="py-2.5 px-2 text-right text-indigo-600 font-semibold hidden sm:table-cell">7,5h</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Les cycles de sommeil expliques
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un <strong>cycle de sommeil</strong> dure en moyenne <strong>90 minutes</strong> et
          se repete 4 a 6 fois par nuit. Chaque cycle comprend plusieurs phases successives :
        </p>

        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="font-semibold text-purple-700 text-sm">Sommeil leger (N1-N2)</p>
            <p className="text-xs text-purple-600 mt-1 leading-relaxed">
              Transition eveil-sommeil. La temperature corporelle baisse, les muscles se
              relaxent. Represente ~50% du temps total de sommeil.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-semibold text-indigo-700 text-sm">Sommeil profond (N3)</p>
            <p className="text-xs text-indigo-600 mt-1 leading-relaxed">
              Phase de recuperation physique : reparation tissus, production d&apos;hormones
              de croissance, renforcement immunitaire. Crucial avant 30 ans.
            </p>
          </div>
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
            <p className="font-semibold text-violet-700 text-sm">Sommeil paradoxal (REM)</p>
            <p className="text-xs text-violet-600 mt-1 leading-relaxed">
              Phase des reves. Consolidation de la memoire, regulation emotionnelle,
              creativite. S&apos;allonge au fil des cycles dans la nuit.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Conseils pour ameliorer son sommeil
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <span className="text-lg">⏰</span>
            <div>
              <p className="font-semibold text-slate-700 text-sm">Horaires reguliers</p>
              <p className="text-xs text-slate-500 mt-0.5">Se coucher et se lever a la meme heure, meme le week-end, synchronise l&apos;horloge biologique.</p>
            </div>
          </div>
          <div className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <span className="text-lg">📵</span>
            <div>
              <p className="font-semibold text-slate-700 text-sm">Pas d&apos;ecrans avant le coucher</p>
              <p className="text-xs text-slate-500 mt-0.5">La lumiere bleue des smartphones inhibe la melatonine. Arretez les ecrans 1h avant de dormir.</p>
            </div>
          </div>
          <div className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <span className="text-lg">🌡️</span>
            <div>
              <p className="font-semibold text-slate-700 text-sm">Chambre fraiche</p>
              <p className="text-xs text-slate-500 mt-0.5">18-20 degres est la temperature ideale. Le corps doit abaisser sa temperature pour s&apos;endormir.</p>
            </div>
          </div>
          <div className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <span className="text-lg">☕</span>
            <div>
              <p className="font-semibold text-slate-700 text-sm">Cafeine avant 14h</p>
              <p className="text-xs text-slate-500 mt-0.5">La cafeine a une demi-vie de 5-6h. Un cafe a 16h peut encore perturber l&apos;endormissement a 22h.</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-besoin-sommeil" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
