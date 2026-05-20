import type { Metadata } from "next";
import CalculAgeCorrigePrema from "./CalculAgeCorrigePrema";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-age-corrige-prema" },
  title: "Calcul Age Corrige Bebe Premature - Formule Pediatre",
  description:
    "Calculez l'age corrige d'un bebe ne prematurement. Age reel - semaines de prematurite. Recommandation de suivi jusqu'a 24 mois. Source : Societe Francaise de Neonatologie, AAP.",
  keywords:
    "age corrige, bebe premature, calcul age corrige, prematurite, age corrige prematurite, suivi bebe premature, semaines amenorrhee, neonatologie",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Age Corrige Bebe Premature" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu'est-ce que l'age corrige d'un bebe premature ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'age corrige correspond a l'age qu'aurait le bebe s'il etait ne a terme (40 SA). Formule : Age corrige = Age reel - semaines de prematurite. Il permet d'evaluer le developpement (motricite, langage, croissance) de maniere realiste, sans comparer un bebe ne a 28 SA a un bebe ne a 40 SA.",
                }
              },
              {
                "@type": "Question",
                name: "Jusqu'a quel age utiliser l'age corrige ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La Societe Francaise de Neonatologie et l'American Academy of Pediatrics recommandent d'utiliser l'age corrige jusqu'a 24 mois pour les grands et extremes prematures, jusqu'a 18 mois pour la prematurite moyenne, et 12 mois pour la prematurite tardive. Au-dela, l'age reel suffit pour evaluer le developpement.",
                }
              },
              {
                "@type": "Question",
                name: "Comment calculer les semaines de prematurite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les semaines de prematurite correspondent au nombre de semaines entre la date de naissance reelle et la date du terme prevu (DPA, soit 40 SA). Par exemple, un bebe ne 8 semaines avant la DPA est ne a 32 SA (40 - 8 = 32) et a 8 semaines de prematurite.",
                }
              },
              {
                "@type": "Question",
                name: "Quelles sont les categories de prematurite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Prematurite tardive (34-36 SA), prematurite moyenne (32-33 SA), grande prematurite (28-31 SA), extreme prematurite (avant 28 SA). Chaque categorie implique un suivi medical specifique. Plus le bebe est ne tot, plus l'age corrige doit etre utilise longtemps.",
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Age Corrige Premature" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🍼
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Age Corrige Bebe Premature
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez l&apos;age corrige de votre bebe ne prematurement. Age reel moins
        les semaines de prematurite, formule officielle pediatrique.
      </p>

      <CalculAgeCorrigePrema />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que l&apos;age corrige ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Lorsqu&apos;un bebe nait prematurement (avant 37 semaines d&apos;amenorrhee),
          son developpement doit etre evalue par rapport a la date a laquelle il
          aurait du naitre, pas par rapport a sa naissance reelle. C&apos;est ce
          qu&apos;on appelle <strong>l&apos;age corrige</strong>.
        </p>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
          <p className="font-mono text-pink-900 text-center text-lg">
            Age corrige = Age reel - Semaines de prematurite
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemple concret</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un bebe ne a 32 SA (donc 8 semaines avant le terme prevu a 40 SA). A
          6 mois de vie reelle (chronologique), son age corrige est :
        </p>
        <ul className="text-slate-600 space-y-2 mb-4 ml-4 list-disc">
          <li>Age reel : 6 mois (= 26 semaines de vie)</li>
          <li>Semaines de prematurite : 8 semaines</li>
          <li><strong>Age corrige : 26 - 8 = 18 semaines, soit environ 4 mois</strong></li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          Il faut donc s&apos;attendre aux acquisitions motrices et langagieres d&apos;un
          bebe de 4 mois, pas de 6 mois.
        </p>
      </section>

      <section className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          📚 Sources officielles
        </h2>
        <ul className="text-blue-800 space-y-3 leading-relaxed">
          <li>
            <strong>Societe Francaise de Neonatologie (SFN)</strong> : recommande
            l&apos;utilisation de l&apos;age corrige jusqu&apos;a 2 ans pour les grands
            et extremes prematures.
          </li>
          <li>
            <strong>American Academy of Pediatrics (AAP)</strong> : confirme cette
            recommandation et insiste sur le suivi neurodeveloppemental jusqu&apos;a
            24 mois minimum.
          </li>
          <li>
            <strong>Haute Autorite de Sante (HAS)</strong> : guide la prise en charge
            des nouveau-nes vulnerables, y compris les criteres de prematurite.
          </li>
        </ul>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Categories de prematurite
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La prematurite est classee selon le nombre de semaines d&apos;amenorrhee
          (SA) a la naissance :
        </p>

        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <p className="font-semibold text-yellow-900">Prematurite tardive</p>
            <p className="text-sm text-yellow-800">34-36 SA</p>
            <p className="text-xs text-yellow-700 mt-1">
              Pronostic generalement favorable. Correction jusqu&apos;a 12 mois.
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="font-semibold text-amber-900">Prematurite moyenne</p>
            <p className="text-sm text-amber-800">32-33 SA</p>
            <p className="text-xs text-amber-700 mt-1">
              Surveillance accrue. Correction jusqu&apos;a 18 mois.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <p className="font-semibold text-orange-900">Grande prematurite</p>
            <p className="text-sm text-orange-800">28-31 SA</p>
            <p className="text-xs text-orange-700 mt-1">
              Hospitalisation en neonatologie. Correction jusqu&apos;a 24 mois.
            </p>
          </div>
          <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
            <p className="font-semibold text-rose-900">Extreme prematurite</p>
            <p className="text-sm text-rose-800">avant 28 SA</p>
            <p className="text-xs text-rose-700 mt-1">
              Suivi neonatal intensif. Correction obligatoire 24 mois.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi corriger l&apos;age ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Comparer un bebe ne a 30 SA a un bebe ne a 40 SA n&apos;est pas equitable.
          Cela peut generer une inquietude injustifiee chez les parents si le bebe
          premature semble en retard, alors qu&apos;il suit en realite la trajectoire
          normale pour son age gestationnel.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Ce que l&apos;age corrige permet d&apos;evaluer
        </h3>
        <ul className="text-slate-600 space-y-2 mb-4 ml-4 list-disc">
          <li>Acquisitions motrices (tenir sa tete, ramper, marcher)</li>
          <li>Acquisitions langagieres (babillage, premiers mots)</li>
          <li>Courbes de croissance (taille, poids, perimetre cranien)</li>
          <li>Sommeil et rythmes biologiques</li>
          <li>Reactivite sociale et eveil</li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <p className="text-green-900 font-semibold mb-2">💚 Bon a savoir</p>
          <p className="text-green-800 text-sm">
            La plupart des bebes prematures rattrapent leur retard a 2 ans d&apos;age
            corrige. Apres 24 mois, on peut generalement se referer a l&apos;age reel.
          </p>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Quand utiliser ce calculateur ?
        </h2>

        <div className="space-y-4">
          <div className="border-l-4 border-pink-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Avant chaque consultation pediatrique</p>
            <p className="text-slate-600 text-sm mt-1">
              Pour calculer l&apos;age corrige actuel et evaluer le developpement
              en consequence.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Avant un bilan psychomoteur</p>
            <p className="text-slate-600 text-sm mt-1">
              Les bilans (Brunet-Lezine, Denver) doivent utiliser l&apos;age corrige
              pour rester valides chez le bebe premature.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Pour la diversification alimentaire</p>
            <p className="text-slate-600 text-sm mt-1">
              Generalement debutee a 4-6 mois d&apos;age corrige (pas reel) pour
              respecter la maturite digestive.
            </p>
          </div>

          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Pour le vaccinal</p>
            <p className="text-slate-600 text-sm mt-1">
              Les vaccins se font selon l&apos;age reel (pas corrige) car le systeme
              immunitaire suit le calendrier chronologique.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Disclaimer :</strong> Ce calcul est indicatif. Il est base sur les
          recommandations de la Societe Francaise de Neonatologie et de l&apos;American
          Academy of Pediatrics. Pour le suivi medical de votre enfant, consultez
          systematiquement votre pediatre ou neonatologue.
        </p>
      </div>

      <RelatedCalculators currentSlug="/calcul-age-corrige-prema" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
