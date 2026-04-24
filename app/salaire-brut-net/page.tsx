import type { Metadata } from "next";
import CalculateurSalaire from "./CalculateurSalaire";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/salaire-brut-net" },
  title: "Calcul Salaire Brut Net 2026 - Simulateur gratuit",
  description:
    "Calculez votre salaire net a partir du brut (ou inversement) en 2026. Cadre, non-cadre, fonction publique. Simulateur gratuit et precis.",
  keywords:
    "salaire brut net, calcul salaire, simulateur salaire, brut en net, net en brut, salaire cadre, salaire non cadre",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Salaire Brut/Net" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment est calcule le salaire net ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le salaire net est obtenu en deduisant les cotisations sociales salariales du salaire brut. Ces cotisations financent la securite sociale, la retraite, l'assurance chomage et d'autres prestations sociales."
                }
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre salaire brut et salaire net ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le salaire brut est le montant avant deduction des cotisations. Le salaire net (avant impot) est ce que vous recevez sur votre compte bancaire, avant le prelevement a la source de l'impot sur le revenu."
                }
              },
              {
                "@type": "Question",
                name: "Quels sont les taux de cotisations en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les taux de cotisations salariales sont d'environ 22% pour les non-cadres, 25% pour les cadres et 15% pour la fonction publique."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Salaire Brut / Net" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Salaire Brut / Net 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez instantanement votre salaire brut en net ou net en brut.
        Taux 2026.
      </p>

      <CalculateurSalaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment est calcule le salaire net ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le salaire net est obtenu en deduisant les cotisations sociales
          salariales du salaire brut. Ces cotisations financent la securite
          sociale, la retraite, l&apos;assurance chomage et d&apos;autres
          prestations sociales.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Taux de cotisations appliques (2026)
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Non-cadre</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~22%</p>
            <p className="text-xs text-slate-400 mt-1">Secteur prive</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Cadre</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~25%</p>
            <p className="text-xs text-slate-400 mt-1">Secteur prive</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700">Fonction publique</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">~15%</p>
            <p className="text-xs text-slate-400 mt-1">Etat / Territorial</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Brut vs Net : la difference
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Le <strong>salaire brut</strong> est le montant avant deduction des
          cotisations. Le <strong>salaire net</strong> (avant impot) est ce que
          vous recevez sur votre compte bancaire, avant le prelevement a la
          source de l&apos;impot sur le revenu.
        </p>
      </section>

      <RelatedCalculators currentSlug="/salaire-brut-net" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
