import type { Metadata } from "next";
import CalculateurSalaireBE from "./CalculateurSalaireBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/salaire-brut-net",
    languages: {
      "fr-BE": "/be/salaire-brut-net",
      "fr-FR": "/salaire-brut-net",
    },
  },
  title: "Salaire Brut Net Belgique 2026 - Simulateur ONSS + Precompte",
  description:
    "Calculez votre salaire net belge a partir du brut (ou inversement). Cotisations ONSS 13,07 %, precompte professionnel par tranches IPP 2026, situation familiale et enfants a charge.",
  keywords:
    "salaire brut net belgique, calcul salaire belge, ONSS, precompte professionnel, simulateur salaire belgique 2026, IPP belgique",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Convertisseur Salaire Brut/Net Belgique"
        description="Simulateur de salaire belge avec ONSS et precompte professionnel"
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
                name: "Comment est calcule le salaire net en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le salaire net belge se calcule en 3 etapes : (1) deduction des cotisations ONSS de 13,07 % sur le brut, (2) deduction des frais professionnels forfaitaires (30 % du restant, plafonne a 6 070 EUR/an en 2026), (3) calcul du precompte professionnel selon les 4 tranches IPP : 25 % jusqu'a 16 320 EUR, 40 % jusqu'a 28 800 EUR, 45 % jusqu'a 49 840 EUR et 50 % au-dela. On retire ensuite la reduction sur la quotite exemptee (10 570 EUR isole) et les reductions pour enfants a charge. Les additionnels communaux (~7,5 % en moyenne) s'ajoutent au precompte federal.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les taux ONSS 2026 en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La cotisation ONSS salariale en 2026 reste fixee a 13,07 % du salaire brut pour la quasi-totalite des employes du secteur prive. Cette cotisation finance la securite sociale belge : pensions, soins de sante, allocations de chomage et incapacite.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la quotite exemptee 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour 2026, la quotite de revenu exemptee d'impot est d'environ 10 570 EUR par an pour un isole. Pour un couple marie avec un seul revenu, elle est majoree d'un supplement conjoint, portant le total a environ 14 570 EUR. Les enfants a charge ouvrent droit a des reductions d'impot supplementaires : environ 660 EUR pour 1 enfant, 1 740 EUR pour 2, 4 730 EUR pour 3 et plus.",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi un net different selon la commune ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chaque commune belge prelève des additionnels communaux qui s'ajoutent au precompte federal. La moyenne nationale est d'environ 7,5 %. Une commune comme Knokke-Heist (0 %) donne un net superieur a une commune comme Bruxelles (~7 %). Notre simulateur utilise la moyenne nationale a titre indicatif.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Salaire Brut/Net Belgique"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Salaire Brut / Net Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez votre salaire belge brut en net (et inversement) avec ONSS,
        precompte professionnel et tranches IPP 2026.
      </p>

      <CalculateurSalaireBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment passe-t-on du brut au net en Belgique ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le calcul du salaire net belge passe par plusieurs etapes obligatoires.
          Toutes les retenues sont reversees a la securite sociale (ONSS) ou au
          fisc (precompte professionnel et additionnels communaux).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 4 tranches d&apos;imposition (IPP 2026)
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-600">25 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              0 - 16 320 EUR
            </p>
            <p className="text-xs text-slate-400 mt-1">1re tranche</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-600">40 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              16 320 - 28 800 EUR
            </p>
            <p className="text-xs text-slate-400 mt-1">2e tranche</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-600">45 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              28 800 - 49 840 EUR
            </p>
            <p className="text-xs text-slate-400 mt-1">3e tranche</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-600">50 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              &gt; 49 840 EUR
            </p>
            <p className="text-xs text-slate-400 mt-1">Tranche marginale</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Cotisations ONSS et frais forfaitaires
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          La cotisation <strong>ONSS salariale</strong> est de 13,07 % du brut
          en 2026. Elle est prelevee avant le calcul de l&apos;impot. On deduit
          ensuite les <strong>frais professionnels forfaitaires</strong> (30 %
          du brut apres ONSS, plafonnes a 6 070 EUR/an), pour obtenir le
          revenu imposable.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Quotite exemptee et reductions
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Tout contribuable belge beneficie d&apos;une{" "}
          <strong>quotite exemptee</strong> de 10 570 EUR/an (isole). Pour un
          couple marie a un seul revenu, elle monte a environ 14 570 EUR. Les
          enfants a charge ouvrent droit a des reductions d&apos;impot
          supplementaires (660 EUR pour 1 enfant, 1 740 EUR pour 2, etc.).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Additionnels communaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Chaque commune belge ajoute ses propres centimes additionnels au
          precompte federal, generalement entre 0 % (Knokke-Heist) et 9 %. La
          moyenne nationale tourne autour de 7,5 % — c&apos;est cette valeur
          que nous utilisons par defaut.
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres calculateurs belges
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <a
            href="/be/calcul-tva"
            className="text-sm text-blue-600 hover:underline"
          >
            Calcul TVA Belgique
          </a>
          <a
            href="/be/droits-enregistrement"
            className="text-sm text-blue-600 hover:underline"
          >
            Droits d&apos;enregistrement
          </a>
          <a
            href="/be/precompte-immobilier"
            className="text-sm text-blue-600 hover:underline"
          >
            Precompte immobilier
          </a>
        </div>
      </div>
    </div>
  );
}
