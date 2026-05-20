import type { Metadata } from "next";
import CalculCyclesSommeil from "./CalculCyclesSommeil";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-cycles-sommeil" },
  title: "Calcul Cycles de Sommeil - Heure de Coucher et de Reveil Ideale",
  description:
    "Calculez votre heure d'endormissement ou de reveil ideale selon les cycles de sommeil de 90 minutes. 5 propositions horaires (4 a 7 cycles). Sources INSERM, National Sleep Foundation.",
  keywords:
    "cycles sommeil, calcul cycle sommeil, heure coucher ideale, heure reveil, 90 minutes sommeil, dormir mieux, sommeil REM, INSERM sommeil, National Sleep Foundation",
  openGraph: {
    title: "Calcul Cycles de Sommeil (90 min) - Heure ideale",
    description:
      "Trouvez votre heure de coucher ou de reveil optimale grace aux cycles de 90 minutes. Calculateur gratuit base sur les recherches INSERM.",
  },
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Cycles de Sommeil"
        category="HealthApplication"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de temps dure un cycle de sommeil ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un cycle de sommeil dure en moyenne 90 minutes (entre 80 et 110 minutes selon les individus). Il enchaine 4 phases : sommeil leger N1, sommeil leger N2, sommeil profond N3, puis sommeil paradoxal (REM). Une nuit complete enchaine generalement 4 a 6 cycles.",
                }
              },
              {
                "@type": "Question",
                name: "Combien de cycles faut-il par nuit ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La National Sleep Foundation recommande 7 a 9 heures de sommeil pour un adulte, soit environ 5 cycles (7h30) en moyenne. 4 cycles (6h) est le minimum, 6 cycles (9h) convient bien aux jeunes adultes et adolescents. Moins de 4 cycles cree une dette de sommeil.",
                }
              },
              {
                "@type": "Question",
                name: "Pourquoi viser un multiple de 90 minutes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Se reveiller en fin de cycle, lorsque le sommeil est leger, est beaucoup moins desagreable que se reveiller en plein sommeil profond. C'est ce qu'on appelle l'inertie du sommeil. En calant son reveil sur un multiple de 90 minutes, on augmente la probabilite de se reveiller en phase de transition.",
                }
              },
              {
                "@type": "Question",
                name: "Combien de temps pour s'endormir en moyenne ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le temps moyen d'endormissement (latence) chez un adulte est de 14 minutes selon l'INSERM. En dessous de 5 minutes, cela peut indiquer une dette de sommeil. Au-dela de 30 minutes, cela peut etre un signe d'insomnie. Le calculateur prend cette latence en compte par defaut.",
                }
              },
              {
                "@type": "Question",
                name: "Cycle de 90 minutes : est-ce universel ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non. La duree d'un cycle varie de 80 a 110 minutes selon les individus, l'age et meme la nuit. Les 90 minutes sont une moyenne statistique. Pour determiner votre cycle personnel, un test polysomnographique en laboratoire de sommeil est necessaire.",
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Cycles de Sommeil" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Cycles de Sommeil
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Trouvez votre heure de coucher ou de reveil ideale grace aux cycles de
        90 minutes. Reveil en douceur, sommeil reparateur. Base sur les
        recherches INSERM et National Sleep Foundation.
      </p>

      <CalculCyclesSommeil />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce qu&apos;un cycle de sommeil ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un cycle de sommeil dure environ <strong>90 minutes</strong> (entre 80
          et 110 minutes selon les individus). Pendant une nuit, vous enchainez
          generalement <strong>4 a 6 cycles</strong> consecutifs.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Chaque cycle se compose de 4 phases distinctes :
        </p>
        <ul className="text-slate-600 space-y-3 ml-4 list-disc">
          <li>
            <strong>N1 - Endormissement</strong> (5-10 min) : transition entre
            l&apos;eveil et le sommeil. Sensible aux bruits.
          </li>
          <li>
            <strong>N2 - Sommeil leger</strong> (~45 min) : phase la plus longue,
            ralentissement de l&apos;activite cerebrale.
          </li>
          <li>
            <strong>N3 - Sommeil profond</strong> (~20 min) : reparation
            physique, secretion d&apos;hormone de croissance. Tres difficile a
            reveiller.
          </li>
          <li>
            <strong>REM - Sommeil paradoxal</strong> (~15 min) : reves, memoire,
            apprentissage. Activite cerebrale proche de l&apos;eveil.
          </li>
        </ul>
        <p className="text-slate-600 mt-4 leading-relaxed">
          La proportion de sommeil profond domine en debut de nuit, tandis que
          le sommeil paradoxal (REM) est plus long en fin de nuit. C&apos;est
          pourquoi un reveil trop precoce vous prive surtout de REM, qui est
          critique pour la memoire et l&apos;humeur.
        </p>
      </section>

      <section className="mt-12 bg-indigo-50 border border-indigo-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">
          La regle des 90 minutes
        </h2>
        <p className="text-indigo-800 mb-4 leading-relaxed">
          Le principe est simple : se reveiller en <strong>fin de cycle</strong>{" "}
          (en sommeil leger ou en transition) est beaucoup moins desagreable que
          se reveiller en plein sommeil profond. C&apos;est ce qu&apos;on
          appelle l&apos;<strong>inertie du sommeil</strong>.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white border border-indigo-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-indigo-600">4 cycles</p>
            <p className="text-sm text-indigo-900 font-semibold">6 heures</p>
            <p className="text-xs text-indigo-700 mt-1">Minimum adulte</p>
          </div>
          <div className="bg-white border border-indigo-200 rounded-lg p-4 ring-2 ring-indigo-400">
            <p className="text-2xl font-bold text-indigo-600">5 cycles</p>
            <p className="text-sm text-indigo-900 font-semibold">7h30</p>
            <p className="text-xs text-indigo-700 mt-1">Optimal adulte</p>
          </div>
          <div className="bg-white border border-indigo-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-indigo-600">6 cycles</p>
            <p className="text-sm text-indigo-900 font-semibold">9 heures</p>
            <p className="text-xs text-indigo-700 mt-1">Ado, recuperation</p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Combien d&apos;heures de sommeil par age ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Selon la <strong>National Sleep Foundation</strong> (2015), les
          besoins en sommeil varient selon l&apos;age :
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Tranche d&apos;age</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Heures recommandees</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Cycles equivalents</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 text-slate-700">Nouveau-ne (0-3 mois)</td>
                <td className="py-3 px-3 text-slate-800 font-medium">14-17 h</td>
                <td className="py-3 px-3 text-slate-600">cycles plus courts (~50 min)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 text-slate-700">Enfant (6-13 ans)</td>
                <td className="py-3 px-3 text-slate-800 font-medium">9-11 h</td>
                <td className="py-3 px-3 text-slate-600">6 a 7 cycles</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 text-slate-700">Adolescent (14-17 ans)</td>
                <td className="py-3 px-3 text-slate-800 font-medium">8-10 h</td>
                <td className="py-3 px-3 text-slate-600">5 a 6 cycles</td>
              </tr>
              <tr className="border-b border-slate-100 bg-indigo-50">
                <td className="py-3 px-3 text-slate-700 font-semibold">Adulte (18-64 ans)</td>
                <td className="py-3 px-3 text-slate-800 font-medium">7-9 h</td>
                <td className="py-3 px-3 text-slate-600">5 a 6 cycles</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 text-slate-700">Senior (65+ ans)</td>
                <td className="py-3 px-3 text-slate-800 font-medium">7-8 h</td>
                <td className="py-3 px-3 text-slate-600">4 a 5 cycles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-emerald-900 mb-4">
          Conseils pour mieux dormir
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <p className="font-semibold text-emerald-900 mb-1">Horaires reguliers</p>
            <p className="text-sm text-emerald-800">
              Se coucher et se lever a la meme heure, meme le week-end, stabilise
              le rythme circadien.
            </p>
          </div>
          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <p className="font-semibold text-emerald-900 mb-1">Pas d&apos;ecrans avant 22h</p>
            <p className="text-sm text-emerald-800">
              La lumiere bleue retarde la secretion de melatonine.
            </p>
          </div>
          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <p className="font-semibold text-emerald-900 mb-1">Chambre fraiche</p>
            <p className="text-sm text-emerald-800">
              Temperature ideale : 16-19 degres C. Le corps doit baisser sa
              temperature pour s&apos;endormir.
            </p>
          </div>
          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <p className="font-semibold text-emerald-900 mb-1">Eviter cafeine apres 14h</p>
            <p className="text-sm text-emerald-800">
              La demi-vie de la cafeine est de 5h. A 14h, il en reste encore 25%
              a minuit.
            </p>
          </div>
          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <p className="font-semibold text-emerald-900 mb-1">Sport en journee</p>
            <p className="text-sm text-emerald-800">
              30 min de sport ameliore la qualite du sommeil. Eviter dans les 3h
              avant le coucher.
            </p>
          </div>
          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <p className="font-semibold text-emerald-900 mb-1">Alcool : faux ami</p>
            <p className="text-sm text-emerald-800">
              L&apos;alcool aide a s&apos;endormir mais fragmente le sommeil et
              supprime le REM.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Sources scientifiques
        </h2>
        <ul className="text-slate-600 space-y-3 text-sm">
          <li>
            <strong>INSERM (Institut national de la sante et de la recherche
            medicale).</strong> Dossier d&apos;information sur le sommeil et ses
            troubles.
          </li>
          <li>
            <strong>National Sleep Foundation.</strong> Hirshkowitz M, et al.
            National Sleep Foundation&apos;s sleep time duration recommendations.
            <em> Sleep Health</em>, 2015;1(1):40-43.
          </li>
          <li>
            <strong>Carskadon MA, Dement WC.</strong> Normal Human Sleep: An
            Overview. <em>Principles and Practice of Sleep Medicine</em>, 6th ed.
          </li>
          <li>
            <strong>Reseau Morphee.</strong> Reseau francais d&apos;information
            sur le sommeil et ses troubles.
          </li>
        </ul>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Disclaimer :</strong> Ce calculateur fournit des estimations
          basees sur la moyenne statistique (cycle de 90 min, latence 14 min).
          Les cycles individuels varient. En cas de troubles du sommeil
          persistants, consultez votre medecin ou un centre du sommeil.
        </p>
      </div>

      <RelatedCalculators currentSlug="/calcul-cycles-sommeil" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
