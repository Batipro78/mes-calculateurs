import type { Metadata } from "next";
import SimulateurISOCBE from "./SimulateurISOCBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/simulateur-isoc",
    languages: {
      "fr-BE": "/be/simulateur-isoc",
    },
  },
  title: "Simulateur Impôt des Sociétés (ISOC) Belgique 2026",
  description:
    "Calculez votre ISOC Belgique instantanément : taux normal 25%, taux réduit PME 20%. Conditions PME, détail par tranche, économie vs taux normal.",
  keywords:
    "ISOC Belgique, impôt des sociétés, taux ISOC 25%, PME 20%, calculateur ISOC",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Simulateur ISOC Belgique"
        description="Calculateur d'impôt des sociétés belge 25% / 20% PME"
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
                name: "Quel est le taux normal de l'ISOC en Belgique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le taux normal de l'impôt des sociétés (ISOC) en Belgique est de 25% sur la totalité du bénéfice imposable. Ce taux s'applique à toutes les sociétés qui ne remplissent pas les conditions pour bénéficier du taux réduit PME.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les conditions pour bénéficier du taux réduit PME de 20% ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour bénéficier du taux réduit PME de 20% en Belgique, l'entreprise doit : être une PME au sens du code du droit économique, avoir un dirigeant rémunéré au minimum 50 000 EUR brut par an (à partir de l'exercice 2026), avoir un actionnariat majoritaire de personnes physiques, ne pas être une société financière, et avoir des avantages non-monétaires (ATN) forfaitaires ne dépassant pas 20% de la rémunération du dirigeant.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la rémunération minimale du dirigeant pour la PME en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis l'exercice d'imposition 2026, la rémunération minimale du dirigeant pour bénéficier du taux réduit PME de 20% est de 50 000 EUR brut par an (anciennement 45 000 EUR jusqu'en 2025).",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre le taux ISOC PME belge et le taux français (IR) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'ISOC belge ne doit pas être confondu avec l'impôt sur le revenu (IR) français. L'ISOC belge s'applique aux sociétés (SARL, SPRL, SA) avec des taux de 25% (normal) ou 20% (PME). Le régime français utilise l'impôt sur les sociétés (IS) à 25% ou 19% pour micro-entreprise. Les deux régimes ont des calculs, seuils et conditions différents.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Simulateur ISOC Belgique"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💼
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur ISOC Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez l&apos;impôt des sociétés (ISOC) belge instantanément : taux
        normal 25%, taux réduit PME 20%. Résultat en temps réel.
      </p>

      <SimulateurISOCBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          L&apos;impôt des sociétés (ISOC) en Belgique (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-600">25 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux normal
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Toutes les sociétés sans conditions particulières
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-green-600">20 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux réduit PME
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Sur 1ère tranche 100 000 EUR (conditions requises)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment fonctionne l&apos;ISOC belge ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          <strong>Taux normal (25%) :</strong> S&apos;applique à toutes les
          sociétés. L&apos;impôt est calculé comme Bénéfice × 25%.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          <strong>Taux réduit PME (20%) :</strong> Les PME bénéficiant du taux
          réduit paient 20% sur la première tranche de 100 000 EUR de bénéfice,
          puis 25% au-delà. Par exemple : pour 150 000 EUR, l&apos;impôt = (100
          000 × 20%) + (50 000 × 25%) = 20 000 + 12 500 = 32 500 EUR.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Conditions pour bénéficier du taux réduit PME (2026)
        </h3>
        <ul className="text-slate-600 space-y-2 mb-4 list-disc list-inside">
          <li>
            Être une PME au sens du code du droit économique belge
          </li>
          <li>
            Rémunération annuelle brute du dirigeant ≥ <strong>50 000 EUR</strong> (condition renforcée depuis 2026)
          </li>
          <li>
            Actionnariat majoritaire détenu par des personnes physiques
          </li>
          <li>Ne pas être une société financière</li>
          <li>
            Avantages non-monétaires (ATN) forfaitaires ≤ 20% de la rémunération
            du dirigeant (nouveau en 2026)
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Changements ISOC 2026
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Deux changements importants en 2026 : la rémunération minimale du
          dirigeant pour les PME passe de 45 000 EUR à <strong>50 000 EUR</strong>, et
          une nouvelle limite d&apos;ATN forfaitaires de <strong>20% de la rémunération</strong> est
          introduite. Les taux ISOC (25% normal, 20% PME réduit) restent inchangés.
        </p>
      </section>
    </div>
  );
}
