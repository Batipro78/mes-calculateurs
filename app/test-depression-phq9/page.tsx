import type { Metadata } from "next";
import TestDepressionPhq9 from "./TestDepressionPhq9";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/test-depression-phq9" },
  title: "Test Depression PHQ-9 - 9 Questions Validées (Gratuit)",
  description:
    "Test de dépression PHQ-9 officiel en 9 questions (Patient Health Questionnaire). Score 0-27, interprétation 5 niveaux. Validé OMS, Kroenke 2001, utilisé en médecine générale.",
  keywords:
    "test depression, phq-9, phq9, patient health questionnaire, test depression en ligne, test depression gratuit, depression majeure, kroenke 2001, depression scale, dépistage dépression",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Test Depression PHQ-9"
        description="Patient Health Questionnaire-9 en français, test de dépression validé"
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
                name: "Qu'est-ce que le test PHQ-9 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le PHQ-9 (Patient Health Questionnaire-9) est un test de dépistage de la dépression en 9 questions, développé par Kroenke, Spitzer et Williams en 2001. Il est utilisé dans le monde entier en médecine générale et reconnu par l'OMS. Chaque question est notée de 0 à 3, le score total varie de 0 à 27. Plus le score est élevé, plus la dépression est sévère.",
                },
              },
              {
                "@type": "Question",
                name: "Comment interpréter mon score PHQ-9 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les seuils officiels Kroenke 2001 sont : 0-4 dépression minimale ou absente, 5-9 dépression légère, 10-14 dépression modérée, 15-19 dépression modérément sévère, 20-27 dépression sévère. Un score de 10 ou plus a une sensibilité de 88% et une spécificité de 88% pour le diagnostic de dépression majeure.",
                },
              },
              {
                "@type": "Question",
                name: "Le PHQ-9 remplace-t-il un diagnostic médical ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non. Le PHQ-9 est un outil de dépistage et d'auto-évaluation, pas un outil de diagnostic. Seul un médecin (généraliste, psychiatre) ou un psychologue peut poser un diagnostic clinique de dépression majeure. Cependant, le PHQ-9 aide à objectiver vos symptômes et oriente vers la nécessité ou non d'une consultation.",
                },
              },
              {
                "@type": "Question",
                name: "Que faire si la question 9 (pensées suicidaires) est positive ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Si vous avez répondu autre chose que 'Jamais' à la question 9 (pensées de mort ou d'auto-agression), c'est un signal d'alarme important. Appelez immédiatement le 3114 (numéro national de prévention du suicide, gratuit, 24h/24) ou consultez votre médecin ou les urgences. Ces pensées sont sérieuses et méritent une aide professionnelle.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Test Depression PHQ-9" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-pink-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Test Dépression PHQ-9 (9 questions)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Évaluez votre niveau de dépression avec le Patient Health
        Questionnaire-9, le test de dépistage le plus utilisé au monde en
        médecine.
      </p>

      <TestDepressionPhq9 />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que le PHQ-9 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>Patient Health Questionnaire-9 (PHQ-9)</strong> est un
          questionnaire d&apos;auto-évaluation de la dépression en 9 questions,
          développé en 2001 par Kurt Kroenke, Robert Spitzer et Janet Williams,
          en collaboration avec Pfizer Inc. Il est devenu le standard mondial
          pour le dépistage de la dépression en soins primaires.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Il correspond directement aux 9 critères diagnostiques de
          l&apos;épisode dépressif majeur dans le <strong>DSM-5</strong> (manuel
          diagnostique de référence en psychiatrie) et la <strong>CIM-11</strong>{" "}
          de l&apos;OMS.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Pourquoi 9 questions ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les 9 items couvrent les 9 symptômes cardinaux de la dépression :
          anhédonie, humeur triste, troubles du sommeil, fatigue, troubles de
          l&apos;appétit, dévalorisation, troubles de la concentration, agitation
          ou ralentissement, et pensées de mort. Le test prend moins de 5
          minutes à compléter.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Performance</h3>
        <p className="text-slate-600 leading-relaxed">
          Un score de 10 ou plus a une <strong>sensibilité de 88%</strong> et une{" "}
          <strong>spécificité de 88%</strong> pour le diagnostic de dépression
          majeure (étude Kroenke 2001 sur 6000 patients). C&apos;est l&apos;un
          des outils de dépistage les plus performants.
        </p>
      </section>

      <section className="mt-12 bg-rose-50 border border-rose-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-rose-900 mb-4">
          Les 5 niveaux de dépression PHQ-9
        </h2>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex justify-between items-start mb-1">
              <p className="font-bold text-green-900">Minimale (0-4)</p>
              <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
                Pas d&apos;intervention
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Symptômes inexistants ou très légers. Aucune prise en charge
              nécessaire.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-200">
            <div className="flex justify-between items-start mb-1">
              <p className="font-bold text-yellow-900">Légère (5-9)</p>
              <span className="text-xs font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Surveillance
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Quelques symptômes dépressifs. Surveillance et activités
              protectrices recommandées.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="flex justify-between items-start mb-1">
              <p className="font-bold text-orange-900">Modérée (10-14)</p>
              <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
                Consultation
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Signes nets de dépression. Une consultation médicale ou
              psychologique est recommandée. TCC souvent efficace.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="flex justify-between items-start mb-1">
              <p className="font-bold text-red-900">Modérément sévère (15-19)</p>
              <span className="text-xs font-mono bg-red-100 text-red-800 px-2 py-1 rounded">
                Urgent
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Symptômes importants. Traitement actif nécessaire (psychothérapie
              + médicaments souvent indiqués).
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-300">
            <div className="flex justify-between items-start mb-1">
              <p className="font-bold text-red-900">Sévère (20-27)</p>
              <span className="text-xs font-mono bg-red-100 text-red-800 px-2 py-1 rounded">
                Urgence
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Prise en charge médicale immédiate nécessaire. Traitement
              antidépresseur quasi-systématique avec suivi rapproché.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Symptômes de la dépression majeure
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Selon le DSM-5, le diagnostic de dépression majeure nécessite la
          présence d&apos;au moins 5 des 9 symptômes suivants pendant au moins
          2 semaines, dont obligatoirement l&apos;humeur triste OU
          l&apos;anhédonie :
        </p>
        <ol className="space-y-2 text-sm text-slate-700 ml-6 list-decimal">
          <li>Humeur dépressive (tristesse, vide intérieur)</li>
          <li>Anhédonie (perte d&apos;intérêt ou de plaisir)</li>
          <li>Modification significative du poids ou de l&apos;appétit</li>
          <li>Troubles du sommeil (insomnie ou hypersomnie)</li>
          <li>Agitation ou ralentissement psychomoteur</li>
          <li>Fatigue ou perte d&apos;énergie</li>
          <li>Sentiment de dévalorisation ou de culpabilité excessive</li>
          <li>Difficultés de concentration ou indécision</li>
          <li>Pensées de mort récurrentes ou idées suicidaires</li>
        </ol>
        <p className="text-slate-600 text-sm mt-4 italic">
          Le PHQ-9 reprend exactement ces 9 critères, ce qui en fait un outil
          puissant et aligné avec les standards diagnostiques internationaux.
        </p>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          La dépression en France
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-3xl font-bold text-blue-700">10%</p>
            <p className="text-sm text-blue-800 mt-1">
              de la population générale touchée chaque année
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-3xl font-bold text-purple-700">2x</p>
            <p className="text-sm text-purple-800 mt-1">
              plus de femmes que d&apos;hommes diagnostiquées
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-3xl font-bold text-orange-700">50%</p>
            <p className="text-sm text-orange-800 mt-1">
              des cas ne consultent pas
            </p>
          </div>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Source : Santé publique France, Baromètre 2021. La dépression reste
          sous-diagnostiquée car beaucoup de personnes n&apos;identifient pas
          leurs symptômes ou hésitent à consulter par crainte de la stigmatisation.
          Le PHQ-9 permet une première démarche objective.
        </p>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          📞 Ressources d&apos;aide immédiate
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-white rounded-lg p-4">
            <p className="font-bold text-blue-900">3114</p>
            <p className="text-sm text-blue-800 mt-1">
              Numéro national de prévention du suicide. Gratuit, anonyme, 24h/24
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-bold text-blue-900">15 - SAMU</p>
            <p className="text-sm text-blue-800 mt-1">
              Urgences médicales et psychiatriques
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-bold text-blue-900">SOS Amitié</p>
            <p className="text-sm text-blue-800 mt-1">
              09 72 39 40 50 - Écoute 24h/24
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-bold text-blue-900">Suicide Écoute</p>
            <p className="text-sm text-blue-800 mt-1">
              01 45 39 40 00 - Écoute 24h/24
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Disclaimer :</strong> Ce test est un outil d&apos;auto-évaluation
          basé sur le PHQ-9 (Kroenke, Spitzer &amp; Williams, 2001), validé
          scientifiquement et utilisé en médecine générale en France. Il ne
          remplace pas un avis médical. En cas de symptômes dépressifs persistants,
          consultez votre médecin généraliste ou un psychologue. En cas de
          détresse aiguë, appelez le 3114.
        </p>
      </div>

      <RelatedCalculators currentSlug="/test-depression-phq9" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
