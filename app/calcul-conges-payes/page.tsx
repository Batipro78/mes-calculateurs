import type { Metadata } from "next";
import CalculateurCongesPayes from "./CalculateurCongesPayes";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-conges-payes" },
  title: "Calcul Congés Payés 2026 : Indemnité 1/10e vs Maintien",
  description:
    "Calculez vos congés payés 2026 : jours acquis, deux méthodes d'indemnité comparées. Temps partiel, CDD, rupture inclus. Simulateur gratuit.",
  keywords:
    "calcul conges payes, jours conges payes, indemnite conges payes, conges payes 2026, 2.5 jours par mois, methode dixieme, calcul cp, solde conges payes",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Combien de jours de conges payes par mois ?",
    a: "Un salarie acquiert 2,5 jours ouvrables de conges payes par mois de travail effectif, soit 30 jours ouvrables (5 semaines) pour une annee complete. En jours ouvres, cela correspond a environ 2,08 jours/mois soit 25 jours par an.",
  },
  {
    q: "Comment est calculee l'indemnite de conges payes ?",
    a: "L'employeur doit comparer deux methodes et retenir la plus favorable au salarie : 1) La methode du 1/10e : 1/10e de la remuneration brute totale percue pendant la periode de reference. 2) La methode du maintien de salaire : le salaire que le salarie aurait percu s'il avait continue a travailler.",
  },
  {
    q: "Quelle est la periode de reference des conges payes ?",
    a: "La periode de reference legale va du 1er juin de l'annee precedente au 31 mai de l'annee en cours. Certaines conventions collectives peuvent prevoir une periode differente (ex: annee civile du 1er janvier au 31 decembre).",
  },
  {
    q: "Les conges payes sont-ils les memes en CDD et en CDI ?",
    a: "Les droits a conges payes sont identiques : 2,5 jours ouvrables par mois travaille. La difference est qu'en fin de CDD, l'employeur verse une indemnite compensatrice de conges payes equivalente a 10 % du salaire brut total si les conges n'ont pas ete pris. En CDI, les conges sont pris pendant la relation de travail.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Conges Payes" />
      <Breadcrumb currentPage="Calcul Conges Payes" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Conges Payes 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos jours de conges acquis et votre indemnite. Comparaison des 2 methodes legales.
      </p>

      <CalculateurCongesPayes />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment sont calcules les conges payes ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Tout salarie a droit a <strong>2,5 jours ouvrables de conges payes par mois de travail effectif</strong>,
          soit <strong>30 jours ouvrables</strong> (5 semaines) pour une annee complete. Les jours sont arrondis au nombre entier superieur.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Les 2 methodes de calcul de l&apos;indemnite</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-teal-50/50 rounded-xl p-4">
            <p className="font-semibold text-teal-700 mb-2">Methode du 1/10e</p>
            <p className="text-sm text-slate-600 mb-2">
              1/10e de la remuneration brute totale percue pendant la periode de reference.
            </p>
            <p className="text-xs text-slate-500">
              Formule : Salaire brut annuel &divide; 10
            </p>
          </div>
          <div className="bg-teal-50/50 rounded-xl p-4">
            <p className="font-semibold text-teal-700 mb-2">Maintien de salaire</p>
            <p className="text-sm text-slate-600 mb-2">
              Le salaire que le salarie aurait percu s&apos;il avait continue a travailler.
            </p>
            <p className="text-xs text-slate-500">
              Formule : Salaire journalier &times; jours de CP pris
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-3">
          L&apos;employeur doit retenir la <strong>methode la plus favorable</strong> au salarie.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau recapitulatif</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Mois travailles</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Jours acquis</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Semaines</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                <tr key={m} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{m} mois</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-teal-600">{Math.ceil(m * 2.5)} jours</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{(m * 2.5 / 5).toFixed(1)} sem.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Cas particuliers</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { cas: "Temps partiel", detail: "Memes droits que le temps plein (2,5 j/mois)" },
            { cas: "CDD", detail: "Indemnite compensatrice = 10% du salaire brut total" },
            { cas: "Maladie", detail: "Ne donne pas droit a conges (sauf accident du travail)" },
            { cas: "Maternite", detail: "Assimilee a du travail effectif" },
            { cas: "Conges sans solde", detail: "N'ouvre pas de droits a conges payes" },
            { cas: "RTT", detail: "Ne sont pas des conges payes (regime different)" },
          ].map((item) => (
            <div key={item.cas} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.cas}</p>
              <p className="text-xs text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Poser ses conges payes : les regles a connaitre</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Acquerir des conges est une chose, les poser en est une autre. Au-dela du calcul du nombre de jours,
          plusieurs regles encadrent la prise effective des conges et peuvent meme vous faire gagner des jours
          supplementaires.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Periode de prise et ordre des departs</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>conge principal</strong> (jusqu&apos;a 24 jours ouvrables) se prend en principe entre le
          1er mai et le 31 octobre, avec au moins <strong>12 jours ouvrables continus</strong> sur cette periode.
          C&apos;est l&apos;employeur qui fixe l&apos;ordre des departs (selon l&apos;anciennete, la situation
          familiale, l&apos;activite chez d&apos;autres employeurs), mais il doit respecter un{" "}
          <strong>delai de prevenance d&apos;un mois</strong> et ne peut plus modifier les dates moins de 30 jours
          avant le depart, sauf circonstances exceptionnelles.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Le fractionnement peut rapporter des jours</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si vous posez une partie de votre conge principal <strong>en dehors</strong> de la periode du 1er mai au
          31 octobre, la loi accorde des <strong>jours de fractionnement</strong> : 1 jour supplementaire pour 3 a
          5 jours pris hors periode, et 2 jours pour 6 jours ou plus. La 5e semaine et les jours conventionnels
          n&apos;ouvrent pas ce droit.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Que deviennent les conges non pris ?</h3>
        <p className="text-slate-600 leading-relaxed">
          En principe, les conges non pris au terme de la periode (souvent le 31 mai) sont <strong>perdus</strong>,
          sauf accord de report avec l&apos;employeur ou disposition conventionnelle plus favorable. Toutefois,
          si vous n&apos;avez pas pu les prendre a cause d&apos;un <strong>arret maladie</strong>, d&apos;un conge
          maternite ou d&apos;un accident du travail, leur report est obligatoire. En cas de depart de
          l&apos;entreprise, les conges acquis et non pris vous sont verses sous forme d&apos;indemnite
          compensatrice.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Le salarie acquiert 2,5 jours ouvrables de conges payes par mois travaille (30 jours par an). L'indemnite retient le plus favorable entre la regle du dixieme de la remuneration annuelle et le maintien de salaire. Le simulateur applique ces regles.`}
        sources={[
          { label: "Service-Public.fr - Conges payes", url: "https://www.service-public.fr/particuliers/vosdroits/F2258" },
          { label: "Legifrance - Code du travail", url: "https://www.legifrance.gouv.fr" },
        ]}
      />


      <RelatedCalculators currentSlug="/calcul-conges-payes" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
