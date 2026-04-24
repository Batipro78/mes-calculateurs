import type { Metadata } from "next";
import SimulateurSCPI from "./SimulateurSCPI";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-rendement-scpi" },
  title: "Simulateur Rendement SCPI 2026 - Revenu net + fiscalite",
  description:
    "Calculez le rendement net de votre investissement en SCPI en 2026. TDVM moyen 4,8%, frais d'entree, fiscalite revenus fonciers (TMI + 17,2% PS). Simulateur gratuit.",
  keywords:
    "rendement SCPI, calcul SCPI, simulateur SCPI, TDVM SCPI 2026, fiscalite SCPI, revenu SCPI, rendement net SCPI",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le rendement moyen d'une SCPI en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le TDVM (Taux de Distribution sur Valeur de Marche) moyen des SCPI en 2025-2026 est d'environ 4,52% selon l'ASPIM, avec les meilleures SCPI autour de 5,5-6,5%. Ce rendement ne tient pas compte des frais d'entree (8-12%) ni de la fiscalite (TMI + 17,2% de prelevements sociaux sur les revenus fonciers). Le rendement NET pour un contribuable TMI 30% tourne donc autour de 2,3-3,5%.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la fiscalite des revenus SCPI ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les revenus distribues par une SCPI sont imposes comme des revenus fonciers : ils s'ajoutent a votre revenu imposable dans la tranche marginale d'imposition (TMI) et sont egalement soumis a 17,2% de prelevements sociaux. Pour un TMI 30%, cela fait un taux global de 47,2% sur les revenus bruts. Le regime micro-foncier (abattement 30%) n'est possible que si les revenus fonciers totaux sont inferieurs a 15 000 EUR/an.",
      },
    },
    {
      "@type": "Question",
      name: "Les SCPI sont-elles un bon investissement en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les SCPI offrent un rendement regulier sans gestion directe, mais avec plusieurs risques : frais d'entree eleves (8-12% pouvant necessiter 2-3 ans pour etre amortis), liquidite limitee (delai de revente 1-6 mois), risque de baisse de la valeur des parts (cas 2023-2024 avec -10 a -17% pour certaines SCPI de bureaux), fiscalite lourde pour les hauts TMI. Elles restent interessantes pour diversifier un patrimoine sans contrainte de gestion, mais a detenir 10+ ans.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on investir en SCPI via une assurance-vie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, de nombreuses SCPI sont accessibles en unite de compte dans une assurance-vie. L'avantage majeur : la fiscalite bien plus douce (pas de TMI sur les revenus generes a l'interieur du contrat, abattement 4 600 EUR / 9 200 EUR apres 8 ans a la sortie). Inconvenient : seul environ 85% du TDVM est reverse (l'assureur prend 12-15%), et il faut payer les frais de gestion du contrat (0,5-1%/an).",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Simulateur Rendement SCPI" description="Calculateur du rendement net des SCPI" category="FinanceApplication" />
      <Breadcrumb currentPage="Simulateur Rendement SCPI" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏢
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur Rendement SCPI 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le revenu net de votre investissement en SCPI apres frais d&apos;entree et fiscalite foncière.
      </p>

      <SimulateurSCPI />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comprendre le rendement d&apos;une SCPI</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une <strong>SCPI</strong> (Societe Civile de Placement Immobilier) permet d&apos;investir dans l&apos;immobilier
          locatif sans contrainte de gestion. Vous achetez des <strong>parts</strong>, la societe de gestion achete et loue
          des immeubles (bureaux, commerces, logements, sante), et redistribue les loyers sous forme de dividendes.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Le TDVM : indicateur cle</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>TDVM (Taux de Distribution sur Valeur de Marche)</strong> represente les dividendes annuels
          divises par le prix de la part. <strong>Moyenne 2025-2026 : 4,52%</strong> selon l&apos;ASPIM. Les meilleures
          SCPI montent a 5,5-6,5% (notamment les SCPI europeennes et les SCPI de sante/logistique).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Fiscalite : le gros point noir</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les revenus SCPI en direct sont imposes comme <strong>revenus fonciers</strong> :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Impot sur le revenu</strong> : a votre TMI (0%, 11%, 30%, 41%, 45%)</li>
          <li><strong>Prelevements sociaux</strong> : +17,2%</li>
          <li>Pour un TMI 30% : impot global = <strong>47,2%</strong> sur les revenus bruts</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>Solutions pour reduire l&apos;impot</strong> : investir via une assurance-vie, une SCPI europeenne
          (fiscalite du pays source), un demembrement (nue-propriete), ou une SCI a l&apos;IS.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les 3 types de SCPI</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li><strong>SCPI de rendement</strong> (90% du marche) : immobilier d&apos;entreprise, TDVM 4-6,5%</li>
          <li><strong>SCPI fiscales</strong> : Pinel, Malraux, Denormandie — reduction d&apos;impot en echange d&apos;un rendement plus faible</li>
          <li><strong>SCPI de plus-value</strong> : pari sur la revalorisation des parts (pas de dividendes)</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/simulateur-rendement-scpi" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
