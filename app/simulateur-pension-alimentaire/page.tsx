import type { Metadata } from "next";
import SimulateurPensionAlimentaire from "./SimulateurPensionAlimentaire";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Simulateur Pension Alimentaire 2026 - Calcul gratuit",
  description:
    "Calculez la pension alimentaire avec le bareme officiel du Ministere de la Justice. Garde classique, alternee ou reduite. 1 a 6 enfants.",
  keywords:
    "pension alimentaire, calcul pension alimentaire, simulateur pension alimentaire, bareme justice, garde alternee, garde classique, divorce, separation",
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
                name: "Comment est calculee la pension alimentaire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La pension alimentaire est calculee selon la table de reference du Ministere de la Justice : Pension par enfant = (Revenu net - 648 EUR de minimum vital) x Pourcentage selon le nombre d'enfants et le type de garde. Par exemple, pour 1 enfant en garde classique : 13,5% du revenu disponible.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le bareme de la pension alimentaire en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour 1 enfant : 18% (garde reduite), 13,5% (garde classique), 9% (garde alternee). Pour 2 enfants : 15,5%, 11,5%, 7,8%. Pour 3 enfants : 13,3%, 10%, 6,7%. Le pourcentage s'applique au revenu net moins 648 EUR de minimum vital.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que le minimum vital de 648 EUR ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le minimum vital correspond au montant du RSA socle pour une personne seule (648 EUR en 2025). Il est deduit du revenu net du debiteur avant d'appliquer le pourcentage, pour garantir un reste a vivre minimum.",
                },
              },
              {
                "@type": "Question",
                name: "La pension alimentaire est-elle obligatoire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, la pension alimentaire est une obligation legale prevue par l'article 371-2 du Code civil. Chaque parent doit contribuer a l'entretien et l'education des enfants a proportion de ses ressources. Elle est fixee par le juge aux affaires familiales ou par accord amiable.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Pension Alimentaire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👨‍👧
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Pension Alimentaire 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez le montant de la pension alimentaire selon le bareme officiel
        du Ministere de la Justice. Garde classique, alternee ou reduite.
      </p>

      <SimulateurPensionAlimentaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Comment est calculee la pension alimentaire ?
        </h2>
        <p>
          La <strong>pension alimentaire</strong> est une contribution financiere versee par un parent
          a l&apos;autre pour l&apos;entretien et l&apos;education des enfants apres une separation ou un divorce.
          Son montant est determine en fonction des revenus du debiteur, du nombre d&apos;enfants et du mode de garde.
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 my-6 not-prose">
          <h3 className="font-bold text-indigo-800 mb-2">Formule de calcul</h3>
          <p className="text-indigo-700 text-sm mb-3">
            <strong>Pension par enfant = (Revenu net mensuel - 648 EUR) x Pourcentage</strong>
          </p>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>Revenu net mensuel : salaire, pensions, allocations, revenus fonciers...</li>
            <li>Minimum vital deduit : <strong>648 EUR</strong> (RSA socle personne seule)</li>
            <li>Pourcentage : selon le nombre d&apos;enfants et le type de garde</li>
            <li>Pension totale = Pension par enfant x Nombre d&apos;enfants</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Table de reference du Ministere de la Justice
        </h2>
        <p>
          Le bareme officiel fixe un pourcentage par enfant selon 3 types d&apos;hebergement :
        </p>

        <div className="overflow-x-auto not-prose mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700">Enfants</th>
                <th className="text-center p-3 font-semibold text-slate-700">Droit de visite reduit</th>
                <th className="text-center p-3 font-semibold text-slate-700">Garde classique</th>
                <th className="text-center p-3 font-semibold text-slate-700">Garde alternee</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: 1, r: "18,0%", c: "13,5%", a: "9,0%" },
                { n: 2, r: "15,5%", c: "11,5%", a: "7,8%" },
                { n: 3, r: "13,3%", c: "10,0%", a: "6,7%" },
                { n: 4, r: "11,7%", c: "8,8%", a: "5,9%" },
                { n: 5, r: "10,6%", c: "8,0%", a: "5,3%" },
                { n: 6, r: "9,5%", c: "7,2%", a: "4,8%" },
              ].map((row) => (
                <tr key={row.n} className="border-b border-slate-100">
                  <td className="p-3 font-medium text-slate-700">{row.n} enfant{row.n > 1 ? "s" : ""}</td>
                  <td className="p-3 text-center">{row.r}</td>
                  <td className="p-3 text-center font-bold">{row.c}</td>
                  <td className="p-3 text-center">{row.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Les 3 types de garde
        </h2>
        <ul>
          <li>
            <strong>Droit de visite reduit</strong> : l&apos;enfant vit principalement chez le creancier
            (l&apos;autre parent le voit rarement, moins d&apos;un week-end sur deux). Pourcentage le plus eleve.
          </li>
          <li>
            <strong>Garde classique</strong> : le mode le plus courant. L&apos;enfant vit chez le creancier,
            avec un droit de visite un week-end sur deux et la moitie des vacances scolaires.
          </li>
          <li>
            <strong>Garde alternee</strong> : l&apos;enfant vit en alternance chez chaque parent (50/50).
            Le pourcentage est le plus faible car les charges sont partagees.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Exemples concrets
        </h2>

        <div className="grid md:grid-cols-2 gap-4 not-prose mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">1 enfant, garde classique</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 2 500 EUR/mois</p>
            <p className="text-xs text-slate-500 mb-1">(2 500 - 648) x 13,5% =</p>
            <p className="text-2xl font-black text-indigo-600">250,02 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">2 enfants, garde alternee</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 3 000 EUR/mois</p>
            <p className="text-xs text-slate-500 mb-1">(3 000 - 648) x 7,8% x 2 =</p>
            <p className="text-2xl font-black text-indigo-600">366,91 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">3 enfants, garde classique</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 4 000 EUR/mois</p>
            <p className="text-xs text-slate-500 mb-1">(4 000 - 648) x 10% x 3 =</p>
            <p className="text-2xl font-black text-indigo-600">1 005,60 EUR/mois</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-2">1 enfant, visite reduite</h4>
            <p className="text-sm text-slate-600 mb-2">Revenu net : 2 000 EUR/mois</p>
            <p className="text-xs text-slate-500 mb-1">(2 000 - 648) x 18% =</p>
            <p className="text-2xl font-black text-indigo-600">243,36 EUR/mois</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Ce que prend en compte le juge
        </h2>
        <p>
          La table de reference est <strong>indicative</strong>. Le juge aux affaires familiales peut
          s&apos;en ecarter en fonction de :
        </p>
        <ul>
          <li>Les <strong>besoins reels</strong> de l&apos;enfant (scolarite, activites, sante)</li>
          <li>Les <strong>revenus et charges</strong> des deux parents</li>
          <li>Le <strong>niveau de vie</strong> de la famille avant la separation</li>
          <li>Les <strong>frais exceptionnels</strong> (orthodontie, sport de haut niveau, handicap)</li>
          <li>La <strong>distance geographique</strong> entre les deux domiciles (frais de transport)</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Revalorisation annuelle
        </h2>
        <p>
          La pension alimentaire est generalement indexee sur l&apos;<strong>indice des prix a la consommation</strong> (INSEE).
          Le jugement prevoit une clause de revalorisation automatique chaque annee, souvent au 1er janvier.
          En cas de changement important de situation (perte d&apos;emploi, nouveau mariage, naissance),
          une revision peut etre demandee au juge.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          Fiscalite de la pension alimentaire
        </h2>
        <ul>
          <li><strong>Pour le debiteur</strong> : la pension alimentaire est deductible du revenu imposable (dans la limite fixee par le juge)</li>
          <li><strong>Pour le creancier</strong> : la pension recue est imposable et doit etre declaree aux impots</li>
          <li>En garde alternee : pas de pension deductible si le partage est equitable, mais chaque parent beneficie d&apos;une demi-part fiscale</li>
        </ul>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/simulateur-pension-alimentaire" />
    </div>
  );
}
