import type { Metadata } from "next";
import SimulateurAssuranceEmprunteur from "./SimulateurAssuranceEmprunteur";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-assurance-emprunteur" },
  title: "Simulateur Assurance Emprunteur 2026 - Cout et economie",
  description:
    "Calculez le cout de votre assurance de pret immobilier et comparez banque vs delegation (loi Lemoine 2022). Simulateur gratuit, economie jusqu'a 20 000 EUR.",
  keywords:
    "assurance emprunteur, simulateur assurance pret immobilier, cout assurance pret, delegation assurance emprunteur, loi Lemoine, economie assurance pret",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coute une assurance de pret immobilier en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le taux moyen d'une assurance emprunteur souscrite chez la banque se situe entre 0,30% et 0,60% par an du capital initial en 2026, selon l'age et le profil (fumeur/non-fumeur). En delegation (assurance externe), les taux tombent a 0,10%-0,30%. Pour un emprunt de 200 000 EUR sur 20 ans, cela represente environ 12 000-24 000 EUR chez la banque contre 4 000-12 000 EUR en delegation.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je changer d'assurance emprunteur a tout moment ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, depuis la loi Lemoine du 1er juin 2022, vous pouvez resilier votre assurance emprunteur a tout moment, sans frais et sans attendre une date anniversaire. La nouvelle assurance doit offrir des garanties equivalentes a l'ancienne. L'economie moyenne constatee est de 5 000 a 20 000 EUR sur la duree du pret.",
      },
    },
    {
      "@type": "Question",
      name: "Comment fonctionne la quotite d'assurance emprunteur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La quotite represente le pourcentage du capital assure par personne. Pour un emprunteur seul : 100% (le pret est couvert a 100% en cas de deces/invalidite). Pour un couple : 100% chacun (total 200%) pour une protection maximale, ou 50/50 (total 100%) pour reduire le cout. La quotite 200% double le cout mais offre une securite totale : le survivant n'a plus de mensualites a payer.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles garanties sont obligatoires dans une assurance emprunteur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les banques exigent generalement : deces (DC), perte totale et irreversible d'autonomie (PTIA), invalidite permanente totale (IPT). L'incapacite temporaire de travail (ITT) est optionnelle pour les residences secondaires mais obligatoire pour la residence principale. La garantie perte d'emploi est optionnelle et peu recommandee (couteuse avec de nombreuses exclusions).",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <WebAppJsonLd name="Simulateur Assurance Emprunteur" description="Simulateur gratuit du cout de l'assurance de pret immobilier" category="FinanceApplication" />
      <Breadcrumb currentPage="Simulateur Assurance Emprunteur" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🛡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Assurance Emprunteur 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le cout de votre assurance de pret et l&apos;economie realisable avec la delegation (loi Lemoine).
      </p>

      <SimulateurAssuranceEmprunteur />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Assurance emprunteur : tout comprendre en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>assurance emprunteur</strong> est exigee par les banques pour securiser un pret immobilier.
          Elle couvre le remboursement en cas de <strong>deces, invalidite ou incapacite de travail</strong> de l&apos;emprunteur.
          Son cout peut representer jusqu&apos;a <strong>30% du cout total du credit</strong>, soit souvent plusieurs dizaines
          de milliers d&apos;euros sur la duree du pret.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">La loi Lemoine : changez d&apos;assurance a tout moment</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis le <strong>1er juin 2022</strong>, la loi Lemoine permet de resilier son assurance emprunteur
          <strong> a tout moment</strong>, sans frais et sans date anniversaire a attendre. Il suffit de trouver une
          assurance externe (delegation) offrant des garanties equivalentes et de fournir la substitution a la banque.
          L&apos;economie moyenne est de <strong>5 000 a 20 000 EUR</strong> selon le profil et la duree restante du pret.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Taux indicatifs assurance emprunteur 2026</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-2 text-slate-500">Profil</th>
                <th className="text-right py-2 px-2 text-slate-500">Banque (%/an)</th>
                <th className="text-right py-2 px-2 text-slate-500">Delegation (%/an)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">20-35 ans, non-fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,34%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,10%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">35-50 ans, non-fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,40%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,15%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">50-65 ans, non-fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,55%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,25%</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-2 text-slate-700">35-50 ans, fumeur</td>
                <td className="py-2 px-2 text-right text-slate-600">0,60%</td>
                <td className="py-2 px-2 text-right font-bold text-indigo-600">0,28%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Comment reduire le cout de votre assurance ?</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li><strong>Comparer les delegations</strong> : 5-10 devis en parallele (April, Cardif, Malakoff, MetLife, Generali...)</li>
          <li><strong>Negocier la quotite</strong> en couple : 50/50 reduit le cout de moitie vs 100/100</li>
          <li><strong>Exclure la perte d&apos;emploi</strong> si vous etes fonctionnaire ou CDI stable</li>
          <li><strong>Choisir l&apos;invalidite sur capital restant</strong> du (vs capital initial) si age eleve</li>
          <li><strong>Arreter de fumer</strong> 2 ans avant souscription peut diviser le taux par 2</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/simulateur-assurance-emprunteur" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
