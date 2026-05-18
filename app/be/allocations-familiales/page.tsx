import type { Metadata } from "next";
import CalculateurAllocationsBE from "./CalculateurAllocationsBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/allocations-familiales",
    languages: {
      "fr-BE": "/be/allocations-familiales",
      "fr-FR": "/allocations-familiales",
    },
  },
  title: "Allocations Familiales Belgique 2026 - Calculateur Wallonie Flandre Bruxelles",
  description:
    "Calculez vos allocations familiales en Belgique 2026 : Wallonie, Flandre, Bruxelles. Montants par enfant, prime de naissance, montant annuel. Simulation gratuite et instantanee.",
  keywords:
    "allocations familiales Belgique, allocations Wallonie, Groeipakket Flandre, allocations Bruxelles, FAMIWAL, Famiris, prime naissance",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Allocations Familiales Belgique"
        description="Calculateur d&apos;allocations familiales pour Wallonie, Flandre et Bruxelles"
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
                name: "Quels sont les montants des allocations familiales en Belgique 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les allocations familiales varient selon la region : Wallonie (FAMIWAL) : 167,68 EUR pour le 1er et 2e enfant, 250,93 EUR a partir du 3e enfant. Flandre (Groeipakket) : montants par age (0-5 ans : 173,55 EUR, 6-11 ans : 194,57 EUR, 12-17 ans : 248,74 EUR). Bruxelles (Famiris) : 167,68 EUR uniforme par enfant.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les differences entre les regions belges pour les allocations familiales ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Wallonie applique un systeme par rang (montants differents selon l&apos;ordre de naissance). Flandre applique un systeme par age de l&apos;enfant. Bruxelles applique un montant uniforme quel que soit le rang ou l&apos;age. La Wallonie favorise les familles nombreuses (montant plus eleve a partir du 3e enfant), tandis que la Flandre favorise les enfants plus ages.",
                },
              },
              {
                "@type": "Question",
                name: "Comment est calculee l&apos;allocation pour le 3e enfant en Wallonie ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En Wallonie, le 3e enfant et les suivants ouvrent droit a 250,93 EUR par mois au lieu de 167,68 EUR pour les deux premiers. C&apos;est une augmentation substantielle pour les familles nombreuses.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les primes de naissance en Belgique 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La prime de naissance est versee une fois par enfant ne : 1 100 EUR en Wallonie et Bruxelles, 1 144 EUR en Flandre (Groeipakket).",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Allocations Familiales Belgique"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👨‍👩‍👧‍👦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Allocations Familiales Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculateur gratuit pour Wallonie, Flandre et Bruxelles. Montants,
        primes de naissance et simulation annuelle.
      </p>

      <CalculateurAllocationsBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les allocations familiales en Belgique (2026)
        </h2>
        <div className="grid gap-4 mb-6 lg:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-xl font-bold text-cyan-600 mb-1">Wallonie</p>
            <p className="font-semibold text-slate-700 text-sm mb-2">FAMIWAL</p>
            <div className="space-y-1 text-xs text-slate-600">
              <p>1er & 2e enfant : 167,68 EUR/mois</p>
              <p className="font-semibold">3e+ enfant : 250,93 EUR/mois</p>
              <p className="mt-2 text-blue-600 font-medium">
                Prime naissance : 1 100 EUR
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-xl font-bold text-cyan-600 mb-1">Flandre</p>
            <p className="font-semibold text-slate-700 text-sm mb-2">
              Groeipakket
            </p>
            <div className="space-y-1 text-xs text-slate-600">
              <p>0-5 ans : 173,55 EUR/mois</p>
              <p>6-11 ans : 194,57 EUR/mois</p>
              <p>12-17 ans : 248,74 EUR/mois</p>
              <p className="mt-2 text-blue-600 font-medium">
                Prime naissance : 1 144 EUR
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-xl font-bold text-cyan-600 mb-1">Bruxelles</p>
            <p className="font-semibold text-slate-700 text-sm mb-2">Famiris</p>
            <div className="space-y-1 text-xs text-slate-600">
              <p className="font-semibold">
                Uniforme : 167,68 EUR/mois par enfant
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Quel que soit le rang ou l&apos;age
              </p>
              <p className="mt-2 text-blue-600 font-medium">
                Prime naissance : 1 100 EUR
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment fonctionne le systeme belge ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          La Belgique versee des allocations familiales a chaque famille avec
          enfants a charge (jusqua 25 ans dans la plupart des cas). Les montants
          et le calcul dependent de la region de residence et du systeme
          applicable (Wallonie, Flandre ou Bruxelles).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Quelle est la difference entre les regions ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>Wallonie (FAMIWAL) :</strong> systeme par rang de naissance.
          Les deux premiers enfants ouvrent droit au meme montant, et le 3e
          enfant et suivants ouvrent droit a un montant augmente. C&apos;est un
          systeme qui favorise les familles nombreuses.
        </p>
        <p className="text-slate-600 leading-relaxed mb-3">
          <strong>Flandre (Groeipakket) :</strong> systeme par age de
          l&apos;enfant. Le montant augmente avec l&apos;age de l&apos;enfant,
          ce qui reflete les couts croissants pour l&apos;education et les
          loisirs. Les adolescents (12-17 ans) recoivent le montant le plus
          eleve.
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>Bruxelles (Famiris) :</strong> systeme uniforme. Tous les
          enfants, quel que soit leur rang ou age, ouvrent droit au meme
          montant. C&apos;est un systeme plus egalitaire.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Prime de naissance
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Chaque naissance ouvre droit a une prime versee une seule fois. La
          Wallonie et Bruxelles versent 1 100 EUR par enfant ne, tandis que la
          Flandre verse 1 144 EUR. Cette prime aide les families a couvrir les
          frais lies a l&apos;arrivee d&apos;un nouvel enfant.
        </p>
      </section>
    </div>
  );
}
