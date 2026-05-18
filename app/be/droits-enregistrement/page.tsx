import type { Metadata } from "next";
import CalculateurDroitsEnregistrement from "./CalculateurDroitsEnregistrement";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/droits-enregistrement",
    languages: {
      "fr-BE": "/be/droits-enregistrement",
    },
  },
  title: "Droits Enregistrement Belgique 2026 - Wallonie / Flandre / Bruxelles",
  description:
    "Calculez les droits d'enregistrement immobilier en Belgique. Taux Wallonie 3 %, Flandre 2 %, Bruxelles avec abattement 200 000 EUR pour habitation propre et unique. Baremes 2026.",
  keywords:
    "droits enregistrement belgique, frais notaire belgique, wallonie 3%, flandre 2%, bruxelles abattement, achat immobilier belge",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Droits d'Enregistrement Belgique"
        description="Calcul des droits d'enregistrement immobilier par region belge"
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
                name: "Combien coutent les droits d'enregistrement en Wallonie en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En Wallonie, depuis le 1er janvier 2025, le taux applicable a l'habitation propre et unique est fixe a 3 %. Pour les autres biens (investissement locatif, residence secondaire), le taux standard reste a 12,5 %. Les acheteurs d'une habitation unique beneficient en plus d'une exoneration sur la premiere tranche de 20 000 EUR.",
                },
              },
              {
                "@type": "Question",
                name: "Quel taux en Flandre en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis le 1er janvier 2025, le taux applicable a l'habitation propre et unique en Flandre est de 2 %. Pour les autres biens, le taux standard est de 12 %. Pour les biens necessitant une renovation energetique importante, le taux peut etre abaisse a 1 %.",
                },
              },
              {
                "@type": "Question",
                name: "Bruxelles offre-t-elle un abattement ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui. En Region Bruxelles-Capitale, le taux reste a 12,5 % mais l'acheteur d'une habitation propre et unique beneficie d'un abattement sur la premiere tranche de 200 000 EUR. Cela represente une economie de 25 000 EUR (200 000 EUR x 12,5 %). Conditions : le bien doit etre destine a devenir la residence principale et son prix ne doit pas depasser un certain seuil.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle difference entre droits d'enregistrement et frais de notaire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les droits d'enregistrement sont la part la plus importante des frais d'acquisition, mais ils sont reverses a la region (Wallonie, Flandre ou Bruxelles). Les frais de notaire au sens strict regroupent en plus les honoraires du notaire (baremes regules), les debours administratifs (cadastre, hypotheque) et la TVA sur les honoraires. Le total des frais d'acquisition represente environ 12 a 15 % du prix pour un investissement locatif, et 4 a 8 % pour une habitation propre et unique.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Droits d'enregistrement"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Droits d&apos;Enregistrement Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez les droits d&apos;enregistrement immobilier selon votre region
        et votre situation. Wallonie, Flandre, Bruxelles.
      </p>

      <CalculateurDroitsEnregistrement />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Taux par region (2026)
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="font-bold text-slate-800 mb-2">🟥🟨 Wallonie</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Habitation propre et unique : <strong>3 %</strong>
              <br />
              Autres biens : <strong>12,5 %</strong>
              <br />
              Abattement 1re tranche :{" "}
              <strong>20 000 EUR exoneres</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="font-bold text-slate-800 mb-2">🦁 Flandre</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Habitation propre et unique : <strong>2 %</strong>
              <br />
              Renovation energetique : <strong>1 %</strong>
              <br />
              Autres biens : <strong>12 %</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="font-bold text-slate-800 mb-2">🌸 Bruxelles</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Taux : <strong>12,5 %</strong>
              <br />
              Abattement habitation propre :
              <br />
              <strong>200 000 EUR exoneres</strong> (-25 000 EUR)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Exemple chiffre sur un bien a 300 000 EUR (habitation propre et unique)
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-700">8 400 EUR</p>
            <p className="text-xs font-semibold text-emerald-700 mt-1">
              Wallonie
            </p>
            <p className="text-xs text-emerald-600/70 mt-1">
              (300 000 - 20 000) x 3 %
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-700">6 000 EUR</p>
            <p className="text-xs font-semibold text-emerald-700 mt-1">
              Flandre
            </p>
            <p className="text-xs text-emerald-600/70 mt-1">
              300 000 x 2 %
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-700">12 500 EUR</p>
            <p className="text-xs font-semibold text-emerald-700 mt-1">
              Bruxelles
            </p>
            <p className="text-xs text-emerald-600/70 mt-1">
              (300 000 - 200 000) x 12,5 %
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Frais d&apos;acquisition totaux
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Au-dela des droits d&apos;enregistrement, prevoir egalement :
          honoraires du notaire (baremes regules, ~1 % du prix), debours
          administratifs (~500 a 1 500 EUR), TVA 21 % sur les honoraires, frais
          d&apos;inscription hypothecaire si pret. Le total des frais
          d&apos;acquisition represente generalement 4 a 8 % du prix pour
          l&apos;habitation propre, et 12 a 15 % pour un investissement.
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
