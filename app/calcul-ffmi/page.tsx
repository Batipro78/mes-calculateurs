import type { Metadata } from "next";
import CalculFFMI from "./CalculFFMI";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-ffmi" },
  title: "Calcul FFMI - Indice de masse maigre normalisé",
  description:
    "Calculez votre FFMI (Fat-Free Mass Index) selon la formule de Kouri. Évaluez votre niveau musculaire naturel et la limite naturelle. Outil gratuit pour les sportifs.",
  keywords:
    "ffmi, calcul ffmi, indice masse maigre, limite naturelle musculation, kouri, fat free mass index, musculation naturel",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul FFMI - Indice de masse maigre" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le FFMI ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le FFMI (Fat-Free Mass Index) est un indice qui mesure votre masse musculaire relative a votre taille, independamment de votre poids. Contrairement a l&apos;IMC, il ne compte que la masse maigre (muscle, os, organes). La formule normalisee de Kouri est FFMI = FFMI brut + 6.1 × (1.8 - Taille). Cet indice permet d&apos;evaluer le potentiel musculaire naturel.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la limite naturelle du FFMI ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Selon le chercheur Eric Kouri, la limite naturelle du FFMI pour les hommes est environ 25 points. Au-dela, la probabilite de prise de steroides anabolisants augmente considerablement. Pour les femmes, la limite est decalee vers le bas (environ 19-20 points). Ces limites sont des estimations basees sur des etudes scientifiques.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre FFMI et IMC ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L&apos;IMC (Indice de Masse Corporelle) utilise le poids total et ne distingue pas le muscle de la graisse. Deux personnes avec le meme IMC peuvent avoir des compositions corporelles tres differentes. Le FFMI, lui, ne mesure que la masse maigre, ce qui le rend beaucoup plus pertinent pour evaluer le developpement musculaire et le potentiel naturel.",
                },
              },
              {
                "@type": "Question",
                name: "Un FFMI de 25 c&apos;est naturel ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un FFMI de 25 est a la limite. Selon les etudes de Kouri, ~25 est considere comme la limite superieure pour la majorite des athletes naturels. Au-dela, le FFMI entre dans une zone tres rare ou la probabilite d&apos;assistance (steroides) augmente fortement. Quelques individus exceptionnels peuvent naturellement depasser 25, mais c&apos;est rare.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul FFMI - Indice de masse maigre" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💪
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul FFMI - Indice de masse maigre
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Évaluez votre FFMI selon Kouri et découvrez votre potentiel musculaire naturel.
      </p>

      <CalculFFMI />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Échelle FFMI complète
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Voici l&apos;interprétation complete du FFMI pour les hommes et les femmes. Plus le FFMI augmente, plus le potentiel musculaire naturel est exploité.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Échelle FFMI - Hommes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">
                      Niveau
                    </th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">
                      FFMI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Maigre
                    </td>
                    <td className="py-3 px-2 text-slate-600">&lt; 18</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Moyen
                    </td>
                    <td className="py-3 px-2 text-slate-600">18 - 19</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Intermédiaire
                    </td>
                    <td className="py-3 px-2 text-slate-600">19 - 21</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Avancé
                    </td>
                    <td className="py-3 px-2 text-slate-600">21 - 23</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Très avancé
                    </td>
                    <td className="py-3 px-2 text-slate-600">23 - 25</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 bg-orange-50/50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Limite naturelle
                    </td>
                    <td className="py-3 px-2 text-slate-600">25 - 26,5</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-red-50/50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Probablement assisté
                    </td>
                    <td className="py-3 px-2 text-slate-600">&gt; 26,5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-4">Échelle FFMI - Femmes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">
                      Niveau
                    </th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">
                      FFMI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Maigre
                    </td>
                    <td className="py-3 px-2 text-slate-600">&lt; 15</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Moyen
                    </td>
                    <td className="py-3 px-2 text-slate-600">15 - 16</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Intermédiaire
                    </td>
                    <td className="py-3 px-2 text-slate-600">16 - 17</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Avancée
                    </td>
                    <td className="py-3 px-2 text-slate-600">17 - 18</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Très avancée
                    </td>
                    <td className="py-3 px-2 text-slate-600">18 - 19</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 bg-orange-50/50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Limite naturelle
                    </td>
                    <td className="py-3 px-2 text-slate-600">19 - 20</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-red-50/50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      Probablement assistée
                    </td>
                    <td className="py-3 px-2 text-slate-600">&gt; 20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Formule de calcul
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Masse maigre (kg)
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              Masse maigre = Poids × (1 − MG%)
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : 80 kg à 15% MG = 80 × 0,85 = 68 kg
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              FFMI brut
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              FFMI brut = Masse maigre / Taille²
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : 68 / 1,80² = 20,99
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 md:col-span-2">
            <h3 className="font-bold text-slate-800 mb-2">
              FFMI normalisé (formule Kouri)
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              FFMI = FFMI brut + 6,1 × (1,8 − Taille)
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : 20,99 + 6,1 × (1,8 − 1,80) = 20,99
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          FFMI de sportifs célèbres
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Quelques références pour situer votre niveau. Ces estimations sont basées sur des données publiques et peuvent varier.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Athlète
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Sport / Statut
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  FFMI estimé
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  Arnold Schwarzenegger
                </td>
                <td className="py-3 px-2 text-slate-600">Mr Olympia (années 70)</td>
                <td className="py-3 px-2 text-right font-bold text-red-600">
                  ~28
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  Frank Zane
                </td>
                <td className="py-3 px-2 text-slate-600">Mr Olympia (années 70s, naturel réputé)</td>
                <td className="py-3 px-2 text-right font-bold text-orange-600">
                  ~25
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  Homme entraîné moyen
                </td>
                <td className="py-3 px-2 text-slate-600">Musculation naturelle (3-5 ans)</td>
                <td className="py-3 px-2 text-right font-bold text-emerald-600">
                  19 - 21
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  Homme sédentaire
                </td>
                <td className="py-3 px-2 text-slate-600">Peu d&apos;exercice</td>
                <td className="py-3 px-2 text-right font-bold text-slate-500">
                  ~16 - 18
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-ffmi" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
