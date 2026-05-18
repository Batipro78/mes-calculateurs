import type { Metadata } from "next";
import CalculateurSuccessionBE from "./CalculateurSuccessionBE";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/be/droits-succession",
    languages: { "fr-BE": "/be/droits-succession" },
  },
  title: "Droits de Succession Belgique 2026 - Wallonie/Flandre/Bruxelles",
  description:
    "Calculez les droits de succession en Belgique en ligne directe (parents/enfants). Baremes 2026 par region : Wallonie (3-30%), Flandre (3-27%), Bruxelles (3-30%).",
  keywords:
    "droits succession belgique, succession wallonie, succession flandre, succession bruxelles, heritage belgique, calcul succession 2026",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Droits de Succession Belgique"
        description="Simulateur des droits de succession par region belge"
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
                name: "Combien coutent les droits de succession en Belgique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les droits de succession en ligne directe (parents/enfants) varient de 3 % a 30 % en Wallonie et Bruxelles, et de 3 % a 27 % en Flandre. Les bareme sont progressifs : la premiere tranche est de 3 % jusqu'a 12 500 EUR en Wallonie, 50 000 EUR en Flandre et Bruxelles. Au-dela de 500 000 EUR, le taux maximal s'applique. Des abattements legaux reduisent la base taxable : 12 500 EUR (Wallonie), 15 000 EUR (Bruxelles), 50 000 EUR sur le mobilier (Flandre).",
                },
              },
              {
                "@type": "Question",
                name: "Quelle region est la plus avantageuse ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour les petites successions, Bruxelles est la plus avantageuse (premiere tranche de 50 000 EUR a 3 %, contre seulement 12 500 EUR en Wallonie). Pour les successions moyennes/grandes, c'est plus nuance : la Flandre saute directement a 9 % entre 50 000 et 250 000 EUR (vs 5-14 % en Wallonie). Au-dela de 250 000 EUR, la Flandre devient la plus chere (27 % directement, vs 18-24 % progressif ailleurs).",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les taux pour les freres et soeurs ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les taux sont beaucoup plus eleves : de 20 a 65 % en Wallonie, 25 a 65 % en Flandre, et 35 a 65 % a Bruxelles. Pour les personnes sans lien de parente, les taux peuvent atteindre 80 % en Wallonie et Bruxelles (vs 55 % en Flandre). Anticiper via une donation entre vifs ou un testament peut considerablement reduire la facture.",
                },
              },
              {
                "@type": "Question",
                name: "Reformes a venir en 2026-2028 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Reforme wallonne 2028 : entre parents et enfants, le taux maximal passera de 30 % a 15 %. Entre personnes sans lien, de 80 % a 40 %. Reforme Flandre 2026 : exoneration partenaire survivant sur mobilier passe de 50 000 a 75 000 EUR. La Region bruxelloise a porte la periode suspecte de 3 a 5 ans pour les donations.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage="Droits de Succession"
        parentPage="Belgique"
        parentHref="/be"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Droits de Succession Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez les droits de succession en ligne directe selon votre region.
        Baremes officiels 2026.
      </p>

      <CalculateurSuccessionBE />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Baremes par region (ligne directe)
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="font-bold text-slate-800 mb-2">🟥🟨 Wallonie</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              9 tranches de <strong>3 %</strong> a <strong>30 %</strong>
              <br />
              Premiere tranche : 3 % jusqu&apos;a 12 500 EUR
              <br />
              Taux max : 30 % au-dela de 500 000 EUR
              <br />
              Abattement : <strong>12 500 EUR</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="font-bold text-slate-800 mb-2">🦁 Flandre</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              3 tranches de <strong>3 %</strong> a <strong>27 %</strong>
              <br />
              Premiere tranche : 3 % jusqu&apos;a 50 000 EUR
              <br />
              Taux max : 27 % au-dela de 250 000 EUR
              <br />
              Exoneration mobilier : <strong>50 000 EUR</strong>
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5">
            <p className="font-bold text-slate-800 mb-2">🌸 Bruxelles</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              6 tranches de <strong>3 %</strong> a <strong>30 %</strong>
              <br />
              Premiere tranche : 3 % jusqu&apos;a 50 000 EUR
              <br />
              Taux max : 30 % au-dela de 500 000 EUR
              <br />
              Abattement : <strong>15 000 EUR</strong>
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment reduire les droits ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Plusieurs strategies legales permettent de reduire significativement
          les droits de succession en Belgique : (1){" "}
          <strong>donations de son vivant</strong> aux enfants (taux fixes
          generalement de 3 % en Wallonie, 3-7 % en Flandre, 3-7 % a
          Bruxelles), (2) <strong>assurance vie avec beneficiaire designe</strong>{" "}
          (parfois hors succession), (3) <strong>achat scinde
          usufruit/nue-propriete</strong> avec les enfants, (4){" "}
          <strong>societes patrimoniales</strong> (montages plus complexes).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Reforme wallonne 2028
        </h3>
        <p className="text-slate-600 leading-relaxed">
          A partir de 2028, la Region wallonne reduira drastiquement les taux
          de succession : <strong>15 % maximum</strong> en ligne directe (vs
          30 % aujourd&apos;hui) et <strong>40 % maximum</strong> entre
          personnes sans lien (vs 80 %). Une opportunite a anticiper si vous
          residez en Wallonie.
        </p>
      </section>
    </div>
  );
}
