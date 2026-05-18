import type { Metadata } from "next";
import SimulateurPretBE from "./SimulateurPretBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/simulateur-pret-immobilier",
    languages: {
      "fr-BE": "/be/simulateur-pret-immobilier",
      "fr-FR": "/simulateur-pret-immobilier",
    },
  },
  title: "Simulateur Pret Hypothecaire Belgique 2026 - Taux & Mensualite",
  description:
    "Simulez votre pret hypothecaire en Belgique : mensualite, cout total, interets. Taux moyens marche BE 2026 (3,05 % sur 20 ans, 3,25 % sur 25 ans). Gratuit.",
  keywords:
    "simulateur pret hypothecaire belgique, credit immobilier belge, taux pret belgique 2026, mensualite hypothecaire, calcul mensualite",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Simulateur Pret Hypothecaire Belgique"
        description="Calcul des mensualites et cout total d'un pret immobilier belge"
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
                name: "Quel est le taux moyen d'un pret hypothecaire en Belgique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En mai 2026, les taux moyens du marche belge sont de 3,05 % sur 20 ans, 3,25 % sur 25 ans et 3,45 % sur 30 ans (taux fixes). Les meilleurs profils peuvent obtenir des taux a partir de 2,85 %. La tendance est a la stabilisation, voire a une legere baisse, selon les courtiers comme Immotheker et Meilleurtaux.be.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle duree choisir pour un pret hypothecaire belge ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La duree typique en Belgique est de 25 ans, qui permet de garder une mensualite raisonnable tout en limitant le cout total. Pour reduire le cout total des interets, privilegiez 20 ans si vos revenus le permettent. La duree maximale acceptee par la plupart des banques belges est 30 ans, mais souvent limitee a un age maximum (65-70 ans) a l'echeance.",
                },
              },
              {
                "@type": "Question",
                name: "Y a-t-il une difference avec un pret immobilier francais ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui : (1) les taux belges sont generalement plus eleves de 0,3 a 0,5 % qu'en France, (2) le taux d'endettement maximum accepte par les banques belges est de 33 % (vs 35 % HCSF en France), (3) l'apport minimum demande tourne autour de 10-20 % du prix + frais (vs souvent 10 % en France), (4) l'assurance solde restant du remplace l'assurance emprunteur francaise.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Simulateur Pret Hypothecaire"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Pret Hypothecaire Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre mensualite, le cout total et les interets de votre
        credit hypothecaire belge. Taux moyens marche mai 2026.
      </p>

      <SimulateurPretBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Taux moyens marche BE 2026
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-violet-600">2,85 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">10 ans</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-violet-600">3,00 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">15 ans</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-violet-600">3,05 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">20 ans</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-violet-600">3,25 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">25 ans</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-violet-600">3,45 %</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">30 ans</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Specificites du pret hypothecaire belge
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Le credit hypothecaire belge se distingue du francais sur plusieurs
          points : (1) <strong>taux d&apos;endettement plafonne a 33 %</strong>{" "}
          des revenus nets (vs 35 % en France), (2) <strong>apport minimum
          de 10 a 20 %</strong> + frais notaire generalement exiges,
          (3) <strong>assurance solde restant du</strong> obligatoire (couvre
          le capital restant en cas de deces), (4) <strong>droits
          d&apos;enregistrement</strong> a la place des frais de notaire
          francais (calculables via notre{" "}
          <a
            href="/be/droits-enregistrement"
            className="text-violet-600 underline hover:text-violet-800"
          >
            calculateur dedie
          </a>
          ).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Choisir entre taux fixe et taux variable
        </h3>
        <p className="text-slate-600 leading-relaxed">
          En Belgique, le <strong>taux fixe</strong> est largement dominant
          (95 % des prets) : il offre une stabilite totale sur toute la duree.
          Le <strong>taux variable</strong> (revisable tous les 1, 3, 5 ou 10
          ans) peut etre attractif en debut de pret, mais expose a un risque
          de hausse. La loi belge encadre strictement la variation : maximum
          +/-3 % sur la duree du pret pour un taux variable.
        </p>
      </section>
    </div>
  );
}
