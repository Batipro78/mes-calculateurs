import type { Metadata } from "next";
import CalculateurCongesBE from "./CalculateurCongesBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/conges-payes",
    languages: {
      "fr-BE": "/be/conges-payes",
    },
  },
  title: "Calcul Congés Payés Belgique 2026 - Pécule de Vacances",
  description:
    "Calculez vos congés payés et pécule de vacances en Belgique : 20 jours/an, double pécule employé, pécule ouvrier. Conforme barèmes 2026.",
  keywords:
    "congés payés Belgique, pécule de vacances, double pécule, congés ouvrier employé, calcul pécule 2026",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Congés Payés Belgique"
        description="Calculateur de congés payés et pécule de vacances belge"
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
                name: "Combien de jours de congés payés en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En Belgique, le droit à congés annuels pour un salarié à temps plein est de 20 jours par an, soit 4 semaines. Ce droit s&apos;applique aux employés et aux ouvriers.",
                },
              },
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le double pécule pour les employés ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le double pécule est une allocation versée aux employés belges lors de leurs congés de vacances. Il représente 92 % du salaire mensuel brut, calculé sur la base des mois travaillés durant l&apos;exercice précédent. Par exemple, pour un employé ayant travaillé 12 mois : 2300 EUR × 92 % × (12/12) = 2116 EUR brut.",
                },
              },
              {
                "@type": "Question",
                name: "Différence entre pécule employé et ouvrier en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le pécule des employés est versé sous forme de double pécule (92 % du salaire mensuel). Le pécule des ouvriers est calculé différemment : 15,38 % de la rémunération annuelle brute, multiplié par 108 % (caisse de vacances), payé entre 2 mai et 30 juin.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le précompte sur le pécule en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le pécule de vacances en Belgique est soumis à un précompte d&apos;environ 17 %, taux exceptionnel applicable aux allocations de vacances. Cela signifie que le montant net reçu correspond à environ 83 % du pécule brut.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Congés Payés Belgique" parentPage="Belgique" parentHref="/be" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ☀️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Congés Payés Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos congés annuels et votre pécule de vacances. 20 jours/an, double pécule employé ou pécule ouvrier.
      </p>

      <CalculateurCongesBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Congés payés en Belgique : droits et calcul
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-yellow-600">20 jours</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Congés annuels
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Temps plein (4 semaines)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-yellow-600">92 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Double pécule
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Employés (versé avant congés)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-yellow-600">15,38 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Pécule ouvrier
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Ouvriers (caisse vacances +8%)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-yellow-600">~17 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Précompte
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Taux exceptionnel sur pécule
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Droit aux congés annuels
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          En Belgique, tout salarié à temps plein (employé ou ouvrier) a droit à
          <strong> 20 jours de congés payés par an</strong>, soit 4 semaines.
          Ce droit s&apos;applique dès la première année d&apos;emploi et ne peut
          pas être réduit sauf accord écrit.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Double pécule pour les employés
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Les <strong>employés belges</strong> reçoivent un double pécule versé
          avant les congés, égal à <strong>92 % du salaire mensuel brut</strong>,
          calculé en proportion des mois travaillés l&apos;année précédente. Formule
          : <strong>Salaire mensuel × 92 % × (mois travaillés / 12)</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed mb-3">
          Exemple : employé gagnant 2300 EUR/mois, ayant travaillé 9 mois l&apos;année
          précédente → 2300 × 0,92 × (9/12) = <strong>1587 EUR brut</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Pécule pour les ouvriers
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Les <strong>ouvriers belges</strong> reçoivent un pécule de vacances
          géré par une caisse de vacances (organisme tiers). Le montant =
          <strong> 15,38 % de la rémunération annuelle brute × 108 %</strong>,
          payé entre 2 mai et 30 juin. Le coefficient 1,08 représente le fonds
          caisse de vacances obligatoire en Belgique.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Précompte sur le pécule
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Le pécule (employé ou ouvrier) est soumis à un
          <strong> précompte d&apos;environ 17 %</strong>, taux exceptionnel
          appliqué spécifiquement aux allocations de vacances. Le montant net
          correspond donc à ~<strong>83 % du pécule brut</strong>.
        </p>
      </section>
    </div>
  );
}
