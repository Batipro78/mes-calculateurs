import type { Metadata } from "next";
import SimulateurChomageBE from "./SimulateurChomageBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/simulateur-chomage",
    languages: {
      "fr-BE": "/be/simulateur-chomage",
      "fr-FR": "/simulateur-chomage",
    },
  },
  title: "Simulateur Chomage Belgique 2026 - ONEM Allocations Reforme",
  description:
    "Calculez vos allocations de chomage ONEM en Belgique (reforme 2026). Taux degressifs 65 %/60 %/40 %, duree max 24 mois, plafond brut. Simulateur gratuit par situation familiale.",
  keywords:
    "chomage belgique, ONEM 2026, allocation chomage degressive, reforme assurance chomage, simulateur chomage belge, 24 mois",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Simulateur Chomage Belgique"
        description="Calcul des allocations de chomage ONEM selon la reforme 2026"
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
                name: "Comment fonctionne le chomage ONEM en Belgique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis la reforme du 1er mars 2026, les allocations de chomage sont limitees a 24 mois maximum (12 mois de base + jusqu'a 12 mois supplementaires selon le passe professionnel). Les taux sont degressifs : 65 % du brut plafonne les 3 premiers mois, 55-60 % du mois 4 au mois 12, puis degression progressive jusqu'a 40 % entre les mois 13 et 24.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le plafond du brut pris en compte ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'ONEM applique un plafond journalier d'environ 92 EUR (mai 2026), soit environ 2 392 EUR/mois pour 26 jours travailles. Au-dela, le brut est tronque a ce plafond. Un salaire de 5 000 EUR brut donne donc la meme allocation qu'un salaire de 2 400 EUR.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les conditions pour beneficier du chomage ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Il faut etre involontairement au chomage (licencie pour motif non grave, fin de CDD non renouvele), avoir travaille suffisamment de jours sur les annees passees (entre 312 et 624 jours selon l'age), s'inscrire comme demandeur d'emploi aupres du Forem (Wallonie), VDAB (Flandre) ou Actiris (Bruxelles), et chercher activement un emploi.",
                },
              },
              {
                "@type": "Question",
                name: "Quoi de neuf avec la reforme 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Principal changement : la duree maximale du chomage complet est plafonnee a 24 mois (avant : illimite). Le but est d'inciter au retour rapide sur le marche du travail, avec un accompagnement renforce des chercheurs d'emploi. Les chomeurs ayant epuise leurs droits basculent sur le CPAS (revenu d'integration) sous conditions de ressources.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Simulateur Chomage"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Chomage Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos allocations ONEM selon la reforme du 1er mars 2026. Taux
        degressifs et duree limitee a 24 mois.
      </p>

      <SimulateurChomageBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les phases d&apos;indemnisation (reforme 2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-700">65 %</p>
            <p className="font-semibold text-emerald-700 text-sm mt-1">
              Mois 1 a 3
            </p>
            <p className="text-xs text-emerald-600/70 mt-1">
              Tous statuts (du brut plafonne)
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-2xl font-bold text-amber-700">55-60 %</p>
            <p className="font-semibold text-amber-700 text-sm mt-1">
              Mois 4 a 12
            </p>
            <p className="text-xs text-amber-600/70 mt-1">
              60 % chef de famille, 55 % autres
            </p>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
            <p className="text-2xl font-bold text-rose-700">40 %</p>
            <p className="font-semibold text-rose-700 text-sm mt-1">
              Mois 13 a 24
            </p>
            <p className="text-xs text-rose-600/70 mt-1">
              Degressivite progressive (forfait final)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Apres les 24 mois : que se passe-t-il ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Avec la reforme du <strong>1er mars 2026</strong>, les allocations
          chomage sont plafonnees a 24 mois maximum. Apres epuisement, vous
          basculez sur le <strong>CPAS</strong> (revenu d&apos;integration sociale)
          si vous remplissez les conditions de ressources. Le but de la reforme
          est d&apos;inciter au retour rapide sur le marche du travail.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Cas particuliers
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Certains profils beneficient de regles specifiques :{" "}
          <strong>chomage temporaire</strong> (raisons economiques, intempéries),{" "}
          <strong>chomage pour cas de force majeure</strong>,{" "}
          <strong>chomage avec complement d&apos;entreprise (RCC)</strong>{" "}
          (anciennement prepension), et <strong>credit-temps</strong>. Pour
          ces cas, consultez le Forem (Wallonie), le VDAB (Flandre) ou Actiris
          (Bruxelles).
        </p>
      </section>
    </div>
  );
}
