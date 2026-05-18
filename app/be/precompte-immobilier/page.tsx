import type { Metadata } from "next";
import CalculateurPrecompteImmobilier from "./CalculateurPrecompteImmobilier";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/precompte-immobilier",
    languages: {
      "fr-BE": "/be/precompte-immobilier",
    },
  },
  title: "Precompte Immobilier Belgique 2026 - Calcul par Region & Commune",
  description:
    "Calculez votre precompte immobilier belge 2026 a partir du revenu cadastral. Coefficient d'indexation 2,1763, taux regionaux Wallonie/Flandre/Bruxelles et centimes communaux.",
  keywords:
    "precompte immobilier, revenu cadastral, RC indexe, taxe fonciere belgique, centimes additionnels, wallonie flandre bruxelles",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Precompte Immobilier Belgique"
        description="Calcul du precompte immobilier annuel a partir du revenu cadastral"
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
                name: "Comment calcule-t-on le precompte immobilier en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le precompte immobilier se calcule selon la formule : RC indexe x taux regional x (1 + centimes communaux/100 + centimes provinciaux/100). Le RC indexe s'obtient en multipliant le revenu cadastral par le coefficient d'indexation (2,1763 pour 2026). Le taux regional est de 1,25 % en Wallonie et a Bruxelles, et de 2,5 % en Flandre. Les centimes additionnels varient fortement d'une commune a l'autre.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le coefficient d'indexation pour 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour 2026, le coefficient d'indexation officiel du revenu cadastral est de 2,1763. Cela signifie qu'un RC non indexe de 1 000 EUR correspond a un RC indexe de 2 176,30 EUR, base de calcul du precompte.",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi le precompte varie autant entre communes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les centimes additionnels communaux varient de 0 (Knokke-Heist) a plus de 4 000 dans certaines communes. Par exemple, Schaerbeek (3 590 centimes) prelève beaucoup plus que Bruges (750 centimes). Cette difference peut multiplier ou diviser par 3 votre precompte annuel pour un meme RC.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles reductions sont possibles ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plusieurs reductions sont prevues : habitation modeste (RC limite), personne handicapee dans le menage, enfants a charge (2 enfants ou plus dans le menage), grand invalide de guerre, bien improductif ou non meuble. Ces reductions sont automatiques si vous remplissez les conditions et que la region est informee.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Precompte immobilier"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏛️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Precompte Immobilier Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le precompte immobilier annuel a partir du revenu cadastral.
        Coefficient d&apos;indexation 2026 et centimes additionnels par
        commune.
      </p>

      <CalculateurPrecompteImmobilier />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment est calcule le precompte immobilier ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le precompte immobilier est un impot annuel paye par tout proprietaire
          d&apos;un bien immobilier en Belgique. Il se calcule en 3 etapes a
          partir du revenu cadastral, additionne au taux regional puis aux
          centimes additionnels communaux et provinciaux.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La formule de calcul
        </h3>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
          <p className="text-sm text-slate-700 font-mono leading-relaxed">
            <strong>Precompte total</strong> = RC indexe &times; taux regional
            &times; (1 + centimes communaux/100 + centimes provinciaux/100)
          </p>
          <p className="text-xs text-slate-500 mt-2">
            RC indexe = RC non indexe &times; 2,1763 (coefficient 2026)
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Taux regionaux 2026
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-amber-600">1,25 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Wallonie
            </p>
            <p className="text-xs text-slate-400 mt-1">
              + additionnels provinciaux
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-amber-600">2,5 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Flandre
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Pas de provinciaux
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-amber-600">1,25 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Bruxelles
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Pas de provinciaux
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Reductions possibles
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Plusieurs reductions peuvent s&apos;appliquer : habitation modeste
          (RC plafonne), <strong>2 enfants ou plus a charge</strong>, personne
          handicapee dans le menage, grand invalide de guerre. Pour les biens
          improductifs ou inoccupes, une remise est aussi possible mais sous
          conditions strictes.
        </p>
      </section>

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-3">
          Autres calculateurs belges
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <a
            href="/be/salaire-brut-net"
            className="text-sm text-blue-600 hover:underline"
          >
            Salaire brut/net belge
          </a>
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
        </div>
      </div>
    </div>
  );
}
