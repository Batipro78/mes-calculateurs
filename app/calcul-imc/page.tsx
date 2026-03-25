import type { Metadata } from "next";
import CalculateurIMC from "./CalculateurIMC";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Calcul IMC 2026 - Indice de Masse Corporelle gratuit",
  description:
    "Calculez votre IMC (Indice de Masse Corporelle) gratuitement. Interpretez votre resultat selon les normes OMS : maigreur, normal, surpoids, obesite.",
  keywords:
    "calcul IMC, indice masse corporelle, calculer IMC, IMC femme, IMC homme, poids ideal, obesite, surpoids",
};

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu'est-ce que l'IMC ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'Indice de Masse Corporelle (IMC) est un indicateur utilise par l'Organisation Mondiale de la Sante (OMS) pour evaluer la corpulence d'une personne. Il se calcule en divisant le poids (en kg) par la taille (en metres) au carre."
                }
              },
              {
                "@type": "Question",
                name: "Comment calculer son IMC ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La formule de l'IMC est : IMC = Poids (kg) / Taille (m) x Taille (m). Un IMC entre 18.5 et 25 correspond a un poids normal selon la classification OMS."
                }
              },
              {
                "@type": "Question",
                name: "Quelles sont les limites de l'IMC ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'IMC ne distingue pas la masse grasse de la masse musculaire. Un sportif muscle peut avoir un IMC eleve sans etre en surpoids. L'IMC n'est pas adapte aux enfants, aux femmes enceintes et aux personnes agees de plus de 65 ans."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Calcul IMC" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul IMC 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre Indice de Masse Corporelle et interpretez votre resultat
        selon les normes de l&apos;OMS.
      </p>

      <CalculateurIMC />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que l&apos;IMC ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>Indice de Masse Corporelle</strong> (IMC) est un
          indicateur utilise par l&apos;Organisation Mondiale de la Sante (OMS)
          pour evaluer la corpulence d&apos;une personne. Il se calcule en
          divisant le poids (en kg) par la taille (en metres) au carre.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule</h3>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          IMC = Poids (kg) / Taille (m) x Taille (m)
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Classification OMS
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Maigreur</p>
            <p className="text-xs text-blue-500 mt-0.5">IMC &lt; 18,5</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="font-semibold text-emerald-700 text-sm">
              Poids normal
            </p>
            <p className="text-xs text-emerald-500 mt-0.5">
              18,5 &le; IMC &lt; 25
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Surpoids</p>
            <p className="text-xs text-amber-500 mt-0.5">
              25 &le; IMC &lt; 30
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">
              Obesite moderee
            </p>
            <p className="text-xs text-orange-500 mt-0.5">
              30 &le; IMC &lt; 35
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">
              Obesite severe
            </p>
            <p className="text-xs text-red-500 mt-0.5">
              35 &le; IMC &lt; 40
            </p>
          </div>
          <div className="bg-red-100 rounded-xl p-3 border border-red-200">
            <p className="font-semibold text-red-800 text-sm">
              Obesite morbide
            </p>
            <p className="text-xs text-red-600 mt-0.5">IMC &ge; 40</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Limites de l&apos;IMC</h3>
        <p className="text-slate-600 leading-relaxed">
          L&apos;IMC ne distingue pas la masse grasse de la masse musculaire. Un
          sportif muscle peut avoir un IMC eleve sans etre en surpoids.
          L&apos;IMC n&apos;est pas adapte aux enfants, aux femmes enceintes et
          aux personnes agees de plus de 65 ans. Consultez un medecin pour un
          bilan personnalise.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-imc" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
