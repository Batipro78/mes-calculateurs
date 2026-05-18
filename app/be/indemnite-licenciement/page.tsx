import type { Metadata } from "next";
import CalculateurIndemniteBE from "./CalculateurIndemniteBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/indemnite-licenciement",
    languages: {
      "fr-BE": "/be/indemnite-licenciement",
      "fr-FR": "/indemnite-licenciement",
    },
  },
  title: "Indemnite Licenciement Belgique 2026 - Calcul Preavis & Indemnite",
  description:
    "Calculez votre indemnite de licenciement belge selon le bareme officiel post-2014 (statut unifie). Preavis en semaines, indemnite brute incluant pecule + prime fin d'annee.",
  keywords:
    "indemnite licenciement belgique, preavis belge, statut unifie 2014, claeys, calcul indemnite rupture, semaines preavis belgique",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Indemnite Licenciement Belgique"
        description="Calcul du preavis et de l'indemnite de licenciement selon le statut unifie belge"
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
                name: "Comment se calcule l'indemnite de licenciement en Belgique en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis le 1er janvier 2014 (statut unifie ouvriers/employes), l'indemnite de licenciement equivaut a la remuneration que vous auriez percue pendant la duree du preavis non preste. La formule est : (salaire annuel + avantages) / 52 semaines x duree du preavis en semaines. Le preavis officiel varie de 1 semaine (< 3 mois d'anciennete) a plus de 60 semaines (20+ ans d'anciennete).",
                },
              },
              {
                "@type": "Question",
                name: "Combien de semaines de preavis selon l'anciennete ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bareme officiel : moins de 3 mois = 1 semaine ; 3-6 mois = 3 a 5 semaines ; 6-12 mois = 6-7 semaines ; 1-2 ans = 8-11 semaines ; 2-5 ans = 12-15 semaines ; 5-20 ans = 18 + (annees-5) x 3 semaines (donc 21 a 60 sem) ; au-dela de 20 ans = 62 + 1 semaine par annee supplementaire.",
                },
              },
              {
                "@type": "Question",
                name: "Quels avantages compter dans la remuneration ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La remuneration de reference inclut le salaire brut + tous les avantages contractuels : pecule de vacances (15,38 % du brut), prime de fin d'annee (13e mois), titres-repas (part employeur), assurance hospitalisation, voiture de societe (avantage de toute nature), bonus, etc. En pratique, on applique un facteur multiplicateur d'environ 1,16 a 1,30 selon les avantages.",
                },
              },
              {
                "@type": "Question",
                name: "La formule Claeys d'origine s'applique-t-elle encore ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Non, la formule Claeys (de 1991) qui calculait le preavis selon age + anciennete + remuneration n'est plus utilisee depuis le statut unifie de 2014. Pour les contrats commences AVANT le 1er janvier 2014, un calcul mixte est applique : Claeys pour la periode avant 2014 + bareme officiel pour la periode apres. Pour les contrats commences APRES le 1er janvier 2014, seul le bareme officiel s'applique.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Indemnite Licenciement"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📄
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indemnite Licenciement Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre indemnite de rupture selon le bareme officiel
        post-2014 (statut unifie ouvriers et employes).
      </p>

      <CalculateurIndemniteBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Bareme officiel des preavis (statut unifie)
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis le 1er janvier 2014, ouvriers et employes ont le meme bareme
          de preavis. Voici les durees applicables :
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-indigo-600">1-5 sem</p>
            <p className="text-xs text-slate-500 mt-1">
              0 a 6 mois d&apos;anciennete
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-indigo-600">6-11 sem</p>
            <p className="text-xs text-slate-500 mt-1">6 mois a 2 ans</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-indigo-600">12-18 sem</p>
            <p className="text-xs text-slate-500 mt-1">2 a 5 ans</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-indigo-600">21-60 sem</p>
            <p className="text-xs text-slate-500 mt-1">
              5 a 20 ans (+3 sem/an)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xl font-bold text-indigo-600">62-80+ sem</p>
            <p className="text-xs text-slate-500 mt-1">
              20+ ans (+1 sem/an)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Et apres impot ?
        </h3>
        <p className="text-slate-600 leading-relaxed">
          L&apos;indemnite de licenciement est soumise a un{" "}
          <strong>precompte professionnel exceptionnel</strong> dont le taux
          depend du montant (entre 16,50 % et 53,5 %). Elle est aussi soumise
          a l&apos;ONSS salariale 13,07 %. Globalement, comptez environ 40 a
          50 % de retenues sur le brut. Vous pouvez beneficier d&apos;une
          reduction d&apos;impot si vous reinvestissez dans une assurance vie
          ou une epargne pension.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Cas particuliers
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Le bareme officiel peut etre majore dans certains cas :{" "}
          <strong>licenciement abusif</strong> (indemnite supplementaire),{" "}
          <strong>mere enceinte ou en conge de maternite</strong> (protection
          renforcee), <strong>delegue syndical</strong> (indemnite de
          protection 2 a 4 ans de remuneration), conseiller en prevention,
          etc. En cas de litige, contactez votre syndicat ou un avocat
          specialise en droit du travail.
        </p>
      </section>
    </div>
  );
}
