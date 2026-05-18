import type { Metadata } from "next";
import CalculateurCapaciteBE from "./CalculateurCapaciteBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/calcul-capacite-emprunt",
    languages: {
      "fr-BE": "/be/calcul-capacite-emprunt",
      "fr-FR": "/calcul-capacite-emprunt",
    },
  },
  title: "Capacite d'Emprunt Belgique 2026 - Calcul avec Taux 33%",
  description:
    "Calculez votre capacite d'emprunt hypothecaire en Belgique. Taux endettement max 33 %, taux marche 2026, simulation par duree (15/20/25/30 ans). Avec ou sans apport.",
  keywords:
    "capacite emprunt belgique, combien emprunter belgique, taux endettement 33, simulation pret belge, achat immobilier belgique",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Capacite d'Emprunt Belgique"
        description="Combien pouvez-vous emprunter en Belgique selon vos revenus ?"
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
                name: "Quel taux d'endettement maximum en Belgique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les banques belges appliquent generalement un taux d'endettement maximum de 33 % des revenus nets mensuels (vs 35 % en France via le HCSF). Certaines banques peuvent monter a 38 % pour des profils avec hauts revenus ou un reste a vivre confortable. Le taux est calcule sur les revenus nets apres deduction des charges existantes (autres credits, pensions alimentaires).",
                },
              },
              {
                "@type": "Question",
                name: "Quel apport minimum pour un pret hypothecaire belge ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les banques belges exigent generalement un apport de 10 a 20 % du prix du bien + tous les frais d'acquisition (droits d'enregistrement, frais notaire, frais hypotheque). Sur un bien a 300 000 EUR, cela represente environ 50 000-70 000 EUR. Sans apport, les banques refusent presque toujours, sauf rares exceptions (profils tres aises, premier achat avec garanties).",
                },
              },
              {
                "@type": "Question",
                name: "Comment maximiser sa capacite d'emprunt ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plusieurs leviers : (1) augmenter la duree du pret (25-30 ans = mensualite plus basse), (2) reduire vos charges existantes (rembourser les credits en cours), (3) emprunter en couple (cumul des revenus), (4) avoir un apport eleve, (5) negocier un meilleur taux (passer par un courtier comme Immotheker, Hellosafe), (6) choisir un taux variable plafonne (mensualite initiale plus basse).",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Capacite d'Emprunt"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Capacite d&apos;Emprunt Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez combien vous pouvez emprunter en Belgique avec un taux
        d&apos;endettement max 33 % et les taux marche actuels.
      </p>

      <CalculateurCapaciteBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les regles du pret hypothecaire belge
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-600">33 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux endettement max
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Sur revenus nets (mensualite / revenus)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-600">10-20 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Apport minimum
            </p>
            <p className="text-xs text-slate-400 mt-1">
              + frais notaire + droits enregistrement
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-600">25 ans</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Duree typique
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Max 30 ans (limite par age)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment les banques calculent votre capacite ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          La formule est simple : <strong>mensualite maximale = 33 %</strong>{" "}
          de vos revenus nets mensuels (apres deduction des charges existantes
          : credits en cours, pensions alimentaires payees). A partir de cette
          mensualite, on calcule le capital empruntable selon la duree et le
          taux du moment.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Exemple : revenus 3 000 EUR/mois, sans charges → mensualite max
          990 EUR. Sur 25 ans au taux 3,25 % → capital max ~204 000 EUR.
          Avec un apport de 50 000 EUR → prix bien max ~254 000 EUR.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Frais d&apos;acquisition a prevoir
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Au-dela du prix d&apos;achat, prevoir : <strong>droits
          d&apos;enregistrement</strong> (2 % a 12,5 % selon region — voir notre{" "}
          <a
            href="/be/droits-enregistrement"
            className="text-blue-600 underline hover:text-blue-800"
          >
            calculateur dedie
          </a>
          ), honoraires notaire (~1 %), frais hypotheque (~1-2 %), TVA 21 %
          sur les honoraires. Comptez globalement 4-8 % pour une habitation
          propre unique, 12-15 % pour un investissement.
        </p>
      </section>
    </div>
  );
}
