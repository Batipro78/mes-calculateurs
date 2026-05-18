import type { Metadata } from "next";
import CalculateurATNBE from "./CalculateurATNBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/atn-voiture-societe",
    languages: {
      "fr-BE": "/be/atn-voiture-societe",
    },
  },
  title: "Calcul ATN Voiture de Société Belgique 2026",
  description:
    "Calculez l&apos;ATN (avantage de toute nature) voiture de société en Belgique 2026 : formule barèmes, CO2, dégressivité. Résultat instantané pour l&apos;impôt et la paie.",
  keywords:
    "ATN Belgique 2026, avantage toute nature voiture, calcul ATN, voiture de société, précompte professionnel, CO2 Belgique",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul ATN Voiture de Société Belgique"
        description="Calculateur d&apos;ATN (avantage de toute nature) voiture de société Belgique 2026"
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
                name: "Quelle est la formule de calcul de l&apos;ATN en Belgique 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ATN annuel = Valeur catalogue TTC × (6/7) × % CO2, avec % CO2 = clamp(5,5 + (CO2 - référence) × 0,1 ; 4 % ; 18 %). Le résultat est ensuite réduit par la dégressivité (−6 % par an, plancher 70 %), et enfin appliqué le minimum annuel obligatoire de 1 690 EUR.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les références CO2 en Belgique 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les références CO2 sont : 70 g/km pour essence, diesel, et LPG. Électrique = 4 % automatiquement. Un véhicule moins polluant que la référence bénéficie d&apos;un % CO2 réduit ; plus polluant augmente le %.",
                },
              },
              {
                "@type": "Question",
                name: "Comment s&apos;applique la dégressivité ATN ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Année 1 : 100 %. Années 2–6 : −6 % par an (94 %, 88 %, 82 %, 76 %, 70 %). Plancher : la valeur ne peut pas descendre sous 70 % de la valeur initiale. Au-delà de 6 ans, la dégressivité n&apos;augmente plus.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le minimum légal ATN Belgique 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le minimum annuel est 1 690 EUR, soit ≈141 EUR/mois. Même si la formule donne moins, l&apos;ATN est toujours au minimum 1 690 EUR/an. C&apos;est obligatoire pour tous les véhicules de société.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Calcul ATN Voiture de Société"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul ATN Voiture de Société Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez l&apos;avantage de toute nature (ATN) : barèmes officiels,
        dégressivité, minimum légal. Résultat intégré immédiatement au
        précompte professionnel.
      </p>

      <CalculateurATNBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Barèmes ATN Belgique 2026
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-600">4 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Électrique
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Taux fixe pour tous les véhicules électriques
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-600">4–18 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              CO2 variable
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Essence, diesel, LPG selon émissions
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-600">−6 % /an</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Dégressivité
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Plancher 70 %, max 6 ans
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-600">1 690 EUR</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Minimum annuel
            </p>
            <p className="text-xs text-slate-400 mt-1">
              ≈141 EUR/mois obligatoire
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Formule de calcul ATN
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>ATN annuel = Valeur catalogue TTC × (6/7) × % CO2 / 100</strong>
        </p>
        <p className="text-slate-600 leading-relaxed mb-3">
          Où <strong>% CO2</strong> est déterminé comme suit :
        </p>
        <ul className="text-slate-600 leading-relaxed space-y-2 mb-3 ml-4 list-disc">
          <li>
            <strong>Électrique :</strong> 4 % fixe
          </li>
          <li>
            <strong>Autres carburants :</strong> % CO2 = clamp(5,5 + (CO2
            mesuré − référence) × 0,1 ; min 4 % ; max 18 %)
          </li>
          <li>
            Références CO2 : essence/LPG = 70 g/km, diesel = 58 g/km
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Dégressivité et minimum obligatoire
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          La valeur catalogue est réduite selon l&apos;âge :
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-4 text-sm text-slate-700 font-mono">
          Année 1 : 100 % | Année 2 : 94 % | Année 3 : 88 % | Année 4 : 82 %
          | Année 5 : 76 % | Année 6 : 70 % (plancher)
        </div>
        <p className="text-slate-600 leading-relaxed">
          Enfin, l&apos;ATN calculé ne peut jamais être inférieur à{" "}
          <strong>1 690 EUR/an</strong> (≈141 EUR/mois). Cela s&apos;ajoute au
          salaire brut pour le calcul du précompte professionnel.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Impact sur le précompte professionnel
        </h3>
        <p className="text-slate-600 leading-relaxed">
          L&apos;ATN est traité comme un avantage en nature et s&apos;ajoute au
          salaire imposable. Le précompte professionnel augmente proportionnellement
          (≈33 % de l&apos;ATN en moyenne, soit ≈50 % d&apos;impact net pour
          l&apos;employé, selon la tranche fiscale personnelle).
        </p>
      </section>
    </div>
  );
}
