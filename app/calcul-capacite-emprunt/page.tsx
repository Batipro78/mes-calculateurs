import type { Metadata } from "next";
import CalculCapaciteEmprunt from "./CalculCapaciteEmprunt";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Calcul Capacite d'Emprunt 2026 - Simulateur gratuit en ligne",
  description:
    "Calculez votre capacite d'emprunt immobilier en 2026. Simulateur gratuit selon vos revenus, charges, apport et duree. Regles HCSF, taux d'endettement 35%, comparatif 15/20/25 ans.",
  keywords:
    "capacite emprunt, combien emprunter, simulateur emprunt immobilier, calcul capacite emprunt 2026, taux endettement, HCSF, pret immobilier, mensualite maximale",
};

const faqData = [
  {
    question: "Comment calculer sa capacite d'emprunt immobilier ?",
    answer:
      "La capacite d'emprunt se calcule en appliquant le taux d'endettement maximum de 35% (regle HCSF) a vos revenus nets mensuels, apres deduction des charges existantes. La mensualite maximale est ensuite convertie en capital empruntable selon le taux d'interet et la duree du pret.",
  },
  {
    question: "Quel est le taux d'endettement maximum en 2026 ?",
    answer:
      "Le Haut Conseil de Stabilite Financiere (HCSF) fixe le taux d'endettement maximum a 35% des revenus nets, assurance emprunteur comprise. Les banques disposent d'une enveloppe derogatoire de 20% pour certains profils, dont 6% reserves aux primo-accedants.",
  },
  {
    question: "Quelle est la duree maximale d'un pret immobilier ?",
    answer:
      "La duree maximale est de 25 ans selon les regles HCSF. Une exception est possible a 27 ans en cas d'achat en VEFA (Vente en l'Etat Futur d'Achevement) ou de construction, avec un differe de remboursement de 2 ans maximum.",
  },
  {
    question: "L'apport personnel est-il obligatoire ?",
    answer:
      "L'apport personnel n'est pas legalement obligatoire, mais les banques demandent generalement un apport d'au moins 10% du prix du bien pour couvrir les frais de notaire et de garantie. Un apport plus important ameliore votre dossier et peut vous obtenir un meilleur taux.",
  },
  {
    question: "Comment augmenter sa capacite d'emprunt ?",
    answer:
      "Plusieurs leviers existent : rembourser les credits en cours pour reduire les charges, emprunter a deux (co-emprunteur), allonger la duree du pret, negocier un meilleur taux d'interet, choisir une assurance emprunteur externe moins chere (loi Lemoine), ou augmenter votre apport personnel.",
  },
];

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            🏠
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              Calcul Capacite d&apos;Emprunt 2026
            </h1>
            <p className="text-slate-500 text-sm">
              Combien pouvez-vous emprunter pour votre projet immobilier ?
            </p>
          </div>
        </div>
      </section>

      <CalculCapaciteEmprunt />

      {/* Contenu SEO */}
      <section className="mt-12 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Comment calculer sa capacite d&apos;emprunt immobilier ?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La capacite d&apos;emprunt represente le montant maximum que vous pouvez emprunter aupres d&apos;une banque pour financer votre projet immobilier. Elle depend de vos revenus, de vos charges existantes, de la duree du pret et du taux d&apos;interet.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-blue-800 mb-2">Formule de calcul :</p>
            <p className="text-sm text-blue-700 font-mono">
              Mensualite max = (Revenus nets - Charges) x 35%
            </p>
            <p className="text-sm text-blue-700 font-mono mt-1">
              Capital max = Mensualite x [(1 - (1 + taux)^(-n)) / taux]
            </p>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Le taux d&apos;endettement de 35% est une regle imposee par le HCSF (Haut Conseil de Stabilite Financiere) depuis janvier 2022, confirmee pour 2026. Ce taux inclut l&apos;assurance emprunteur.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Regles HCSF 2026 pour le credit immobilier
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Critere</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Valeur</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-2 font-medium text-slate-800">Taux d&apos;endettement max</td>
                  <td className="py-3 px-2 text-blue-600 font-bold">35%</td>
                  <td className="py-3 px-2 text-slate-500">Assurance incluse</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-2 font-medium text-slate-800">Duree maximale</td>
                  <td className="py-3 px-2 text-blue-600 font-bold">25 ans</td>
                  <td className="py-3 px-2 text-slate-500">27 ans si VEFA ou construction</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-2 font-medium text-slate-800">Derogations</td>
                  <td className="py-3 px-2 text-blue-600 font-bold">20%</td>
                  <td className="py-3 px-2 text-slate-500">Dont 6% pour primo-accedants</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-slate-800">Reste a vivre</td>
                  <td className="py-3 px-2 text-blue-600 font-bold">700-1 500 €</td>
                  <td className="py-3 px-2 text-slate-500">Variable selon les banques</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Taux immobiliers moyens en avril 2026
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux moyen</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Meilleur taux</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-2 text-slate-800 font-medium">15 ans</td>
                  <td className="py-3 px-2 text-right text-slate-800 font-semibold">3,20%</td>
                  <td className="py-3 px-2 text-right text-green-600 font-semibold">2,80%</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-2 text-slate-800 font-medium">20 ans</td>
                  <td className="py-3 px-2 text-right text-slate-800 font-semibold">3,35%</td>
                  <td className="py-3 px-2 text-right text-green-600 font-semibold">3,00%</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-slate-800 font-medium">25 ans</td>
                  <td className="py-3 px-2 text-right text-slate-800 font-semibold">3,45%</td>
                  <td className="py-3 px-2 text-right text-green-600 font-semibold">3,15%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Sources : CAFPI, Meilleurtaux. Taux hors assurance, pour un profil standard. Mis a jour en avril 2026.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            5 conseils pour augmenter sa capacite d&apos;emprunt
          </h2>
          <div className="space-y-4">
            {[
              { num: "1", title: "Remboursez vos credits en cours", desc: "Chaque credit rembourse libere de la capacite d'endettement. Un credit auto de 300 €/mois = 60 000 € de capacite d'emprunt en moins sur 20 ans." },
              { num: "2", title: "Empruntez a deux", desc: "Un co-emprunteur double potentiellement vos revenus declares et donc votre capacite d'emprunt." },
              { num: "3", title: "Allongez la duree", desc: "Passer de 20 a 25 ans augmente votre capacite d'environ 20%, mais le cout total du credit augmente aussi." },
              { num: "4", title: "Negociez le taux et l'assurance", desc: "Faire jouer la concurrence entre banques et utiliser la loi Lemoine pour choisir une assurance externe peut economiser des dizaines de milliers d'euros." },
              { num: "5", title: "Augmentez votre apport", desc: "Un apport de 20% ou plus rassure les banques et peut vous obtenir un meilleur taux, ce qui augmente indirectement votre capacite." },
            ].map((conseil) => (
              <div key={conseil.num} className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {conseil.num}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{conseil.title}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{conseil.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Questions frequentes
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <details key={i} className="group">
                <summary className="cursor-pointer text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors py-2">
                  {faq.question}
                </summary>
                <p className="text-sm text-slate-500 leading-relaxed mt-1 pb-2 pl-4 border-l-2 border-blue-200">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-capacite-emprunt" />
    </div>
  );
}
