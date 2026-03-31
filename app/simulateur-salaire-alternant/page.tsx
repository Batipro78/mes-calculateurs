import type { Metadata } from "next";
import CalculateurSalaireAlternant from "./CalculateurSalaireAlternant";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Simulateur Salaire Alternant 2026 - Apprentissage et Professionnalisation",
  description:
    "Calculez votre salaire en alternance gratuitement. Grilles officielles apprentissage et professionnalisation 2026, salaire brut et net, selon votre age et annee de contrat.",
  keywords:
    "salaire alternant, salaire apprenti 2026, simulateur alternance, grille remuneration apprentissage, contrat professionnalisation salaire, SMIC apprenti",
};

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel est le salaire d'un apprenti en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le salaire d'un apprenti en 2026 depend de son age et de son annee de contrat. Il varie de 27% du SMIC (492 EUR brut/mois pour un moins de 18 ans en 1ere annee) a 78% du SMIC (1 422 EUR brut pour un 21-25 ans en 3eme annee). Les 26 ans et plus touchent 100% du SMIC soit 1 823 EUR brut.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la difference entre apprentissage et professionnalisation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le contrat d'apprentissage concerne les 16-29 ans et mene a un diplome (CAP, BTS, licence, master). Le contrat de professionnalisation est ouvert a tous ages et vise une qualification professionnelle (CQP, titre RNCP). Les grilles de remuneration different : l'apprentissage depend de l'age et de l'annee, la professionnalisation de l'age et du niveau de diplome.",
                },
              },
              {
                "@type": "Question",
                name: "Le salaire d'un alternant est-il net ou brut ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les grilles officielles indiquent le salaire brut. Depuis mars 2025, les apprentis dont le salaire depasse 50% du SMIC (912 EUR) paient des cotisations (CSG, CRDS). En dessous de ce seuil, le brut est egal au net. Au-dessus, comptez environ 78% du brut en net.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce qui a change pour les alternants en mars 2025 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis le 1er mars 2025, le seuil d'exoneration de cotisations salariales est passe de 79% a 50% du SMIC pour les nouveaux contrats. Cela signifie que les apprentis gagnant plus de 912 EUR brut/mois paient desormais des charges (CSG 9,2% + CRDS 0,5% + cotisations). Impact : jusqu'a 115 EUR/mois de moins en net.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles aides complementaires pour les alternants ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les alternants peuvent beneficier de : l'aide au logement (APL/ALS), la prime d'activite (si plus de 18 ans et revenus suffisants), l'aide mobili-jeune (jusqu'a 100 EUR/mois pour le logement), le remboursement transport 50%, et le forfait repas CROUS. Certaines regions proposent aussi des aides au permis de conduire.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Salaire Alternant" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Salaire Alternant 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre salaire en apprentissage ou professionnalisation selon votre age,
        annee de contrat et qualification.
      </p>

      <CalculateurSalaireAlternant />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Grille de salaire en apprentissage 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le salaire d&apos;un <strong>apprenti</strong> est fixe en pourcentage du <strong>SMIC</strong> (1 823,03 EUR brut/mois en 2026).
          Il augmente avec l&apos;age et l&apos;annee de contrat. Voici la grille officielle :
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-indigo-50/50">
                <th className="text-left py-3 px-3 text-slate-600 font-semibold">Age de l&apos;apprenti</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">1ere annee</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">2eme annee</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">3eme annee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Moins de 18 ans</td>
                <td className="py-2.5 px-3 text-right text-slate-600">27% — 492 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">39% — 711 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">55% — 1 003 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">18-20 ans</td>
                <td className="py-2.5 px-3 text-right text-slate-600">43% — 784 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">51% — 930 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">67% — 1 221 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">21-25 ans</td>
                <td className="py-2.5 px-3 text-right text-slate-600">53% — 966 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">61% — 1 112 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">78% — 1 422 EUR</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-700">26 ans et plus</td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-700" colSpan={3}>100% — 1 823 EUR (SMIC integral)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Grille de salaire en professionnalisation 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>contrat de professionnalisation</strong> a une grille differente, basee sur l&apos;age
          et le <strong>niveau de qualification</strong> (inferieur au bac ou bac pro et plus).
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-purple-50/50">
                <th className="text-left py-3 px-3 text-slate-600 font-semibold">Age</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Sans Bac (&lt; niveau 4)</th>
                <th className="text-right py-3 px-3 text-slate-600 font-semibold">Bac pro ou + (&gt;= niveau 4)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Moins de 21 ans</td>
                <td className="py-2.5 px-3 text-right text-slate-600">55% — 1 003 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">65% — 1 185 EUR</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">21-25 ans</td>
                <td className="py-2.5 px-3 text-right text-slate-600">70% — 1 276 EUR</td>
                <td className="py-2.5 px-3 text-right text-slate-600">80% — 1 458 EUR</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-700">26 ans et plus</td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-700" colSpan={2}>100% — 1 823 EUR (SMIC integral)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Reforme mars 2025 : impact sur le salaire net
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis le <strong>1er mars 2025</strong>, les contrats d&apos;alternance signes a partir de cette date
          sont soumis a de nouvelles regles concernant les cotisations salariales :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>Le seuil d&apos;exoneration passe de <strong>79% a 50% du SMIC</strong></li>
          <li>Les alternants gagnant plus de <strong>912 EUR brut/mois</strong> paient des cotisations</li>
          <li>Application de la <strong>CSG (9,2%) et CRDS (0,5%)</strong> sur la part depassant le seuil</li>
          <li>Impact estime : jusqu&apos;a <strong>115 EUR/mois de moins</strong> en salaire net</li>
        </ul>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="font-semibold text-emerald-700 text-sm">Salaire &lt;= 50% du SMIC</p>
            <p className="text-2xl font-extrabold text-emerald-800 mt-1">Brut = Net</p>
            <p className="text-xs text-emerald-600 mt-1">Aucune cotisation prelevee</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-semibold text-amber-700 text-sm">Salaire &gt; 50% du SMIC</p>
            <p className="text-2xl font-extrabold text-amber-800 mt-1">~78% du brut</p>
            <p className="text-xs text-amber-600 mt-1">Cotisations sur la part au-dessus du seuil</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Apprentissage vs Professionnalisation : les differences
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Critere</th>
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Apprentissage</th>
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Professionnalisation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Age</td>
                <td className="py-2.5 px-3 text-slate-600">16-29 ans (sans limite si RQTH)</td>
                <td className="py-2.5 px-3 text-slate-600">16-25 ans + demandeurs d&apos;emploi 26+</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Objectif</td>
                <td className="py-2.5 px-3 text-slate-600">Diplome d&apos;Etat (CAP, BTS, licence, master)</td>
                <td className="py-2.5 px-3 text-slate-600">Qualification pro (CQP, titre RNCP)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Duree</td>
                <td className="py-2.5 px-3 text-slate-600">6 mois a 3 ans</td>
                <td className="py-2.5 px-3 text-slate-600">6 a 12 mois (24 si accord branche)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-3 font-medium text-slate-700">Temps en CFA/organisme</td>
                <td className="py-2.5 px-3 text-slate-600">25% minimum du temps</td>
                <td className="py-2.5 px-3 text-slate-600">15 a 25% du temps</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-700">Grille salariale</td>
                <td className="py-2.5 px-3 text-slate-600">Age + annee de contrat</td>
                <td className="py-2.5 px-3 text-slate-600">Age + niveau de qualification</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Aides complementaires pour les alternants
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-semibold text-indigo-700 text-sm">Aide au logement (APL/ALS)</p>
            <p className="text-xs text-indigo-600 mt-1">Jusqu&apos;a 300 EUR/mois selon la zone et le loyer. Simulez sur caf.fr.</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-semibold text-indigo-700 text-sm">Prime d&apos;activite</p>
            <p className="text-xs text-indigo-600 mt-1">Accessible des 18 ans si votre salaire net depasse 1 070 EUR/mois (78% du SMIC net).</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-semibold text-indigo-700 text-sm">Aide Mobili-Jeune</p>
            <p className="text-xs text-indigo-600 mt-1">Jusqu&apos;a 100 EUR/mois pour le logement, pour les moins de 30 ans en alternance.</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-semibold text-indigo-700 text-sm">Transport + repas</p>
            <p className="text-xs text-indigo-600 mt-1">50% du pass Navigo/abonnement rembourse. Tarif CROUS pour les repas (3,30 EUR).</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-8 mb-3">
          Questions frequentes
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-slate-700">Un apprenti paye-t-il des impots ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Les apprentis sont exoneres d&apos;impot sur le revenu jusqu&apos;a un plafond egal au SMIC annuel
              (environ 21 876 EUR en 2026). Au-dela, seule la part depassant ce seuil est imposable.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">L&apos;employeur peut-il payer plus que le minimum ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Oui, les grilles indiquent le <strong>minimum legal</strong>. L&apos;employeur ou la convention collective
              peuvent prevoir un salaire superieur. C&apos;est frequent dans les grandes entreprises et certains secteurs (banque, informatique).
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">L&apos;alternant a-t-il droit aux conges payes ?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Oui, <strong>5 semaines de conges payes</strong> par an (2,5 jours par mois travaille), comme tout salarie.
              Les apprentis de moins de 21 ans peuvent demander jusqu&apos;a 30 jours de conges (dont des non remuneres).
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-salaire-alternant" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
