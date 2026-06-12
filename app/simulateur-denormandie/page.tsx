import type { Metadata } from "next";
import CalculateurDenormandie from "./CalculateurDenormandie";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-denormandie" },
  title: "Simulateur Denormandie 2026 - Reduction d'Impot Ancien + Outre-Mer",
  description:
    "Calculez votre reduction d'impot Denormandie 2026 : taux 12/18/21 % en metropole, 23/29/32 % en outre-mer. Dispositif proroge jusqu'au 31/12/2027. Simulation gratuite.",
  keywords:
    "simulateur Denormandie, reduction impot Denormandie, Denormandie 2026, investissement locatif ancien travaux, deficit foncier, outre-mer Denormandie, taux Denormandie",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que le dispositif Denormandie ?",
    a: "Le Denormandie est une reduction d'impot pour l'investissement locatif dans l'immobilier ANCIEN avec travaux. Il remplace le Pinel pour l'ancien (le Pinel neuf est ferme depuis le 31/12/2024). Le bien doit etre situe dans une commune du programme Action coeur de ville ou faisant l'objet d'une convention ORT (operation de revitalisation du territoire). Les travaux doivent representer au moins 25 % du cout total de l'operation.",
  },
  {
    q: "Quelles villes sont eligibles au Denormandie ?",
    a: "Les communes eligibles sont celles beneficiant du programme Action coeur de ville (environ 234 villes moyennes dont Amiens, Bethune, Arras, Auxerre, Boulogne-sur-Mer, Calais, Lens, Limoges, Mulhouse...) et celles disposant d'une convention ORT. Consultez le simulateur officiel sur service-public.fr ou le site action-coeur-de-ville.fr pour verifier si votre commune est eligible.",
  },
  {
    q: "Quels travaux sont pris en compte pour le Denormandie ?",
    a: "Les travaux doivent correspondre a l'une de ces categories : amelioration de la performance energetique du logement d'au moins 20 % (ou 30 % si chauffage electrique), creation de surface habitable nouvelle, modernisation ou assainissement, travaux de securite. Les travaux de construction, reconstruction ou agrandissement sont exclus. Les travaux doivent etre realises par des entreprises (pas en auto-construction).",
  },
  {
    q: "Quels sont les taux de reduction d'impot Denormandie ?",
    a: "En metropole : 12 % pour 6 ans, 18 % pour 9 ans, 21 % pour 12 ans. En outre-mer (DOM-COM) : 23 % pour 6 ans, 29 % pour 9 ans, 32 % pour 12 ans. Ces taux s'appliquent sur la base retenue (prix + travaux, plafonnes a 300 000 EUR et 5 500 EUR/m2). La reduction est repartie a parts egales chaque annee (sauf pour 12 ans : 9 ans de periode principale puis 1 %/an les 3 dernieres annees).",
  },
  {
    q: "Quelle est la difference entre le Denormandie et l'ancien dispositif Pinel ?",
    a: "Le Pinel neuf est definitvement ferme depuis le 31 decembre 2024. Le Denormandie le remplace pour l'investissement dans l'ANCIEN avec travaux. Differences cles : le Denormandie impose des travaux representant 25 % minimum du cout total (ce qui n'existait pas en Pinel), il cible les centres-villes degrades (communes Action coeur de ville / ORT) plutot que les zones tendues du Pinel, et ses taux en outre-mer sont plus eleves. Le Denormandie est prolong jusqu'au 31 decembre 2027.",
  },
  {
    q: "Quels sont les plafonds du dispositif Denormandie ?",
    a: "Trois plafonds s'appliquent : (1) La base de calcul est limitee a 300 000 EUR par an et a 5 500 EUR/m2 de surface habitable. (2) La reduction d'impot s'impute dans la limite du plafond global des niches fiscales de 10 000 EUR/an (en metropole). (3) Le logement doit etre loue nu a titre de residence principale du locataire, a un loyer et a des locataires respectant des plafonds de ressources selon la zone (similaires aux plafonds Pinel A, A bis, B1, B2).",
  },
  {
    q: "Jusqu'a quand peut-on investir en Denormandie ?",
    a: "Le dispositif Denormandie est proroge jusqu'au 31 decembre 2027, grace a l'article 42 de la loi n° 2024-322 du 9 avril 2024. L'acquisition (compromis signe) doit intervenir avant cette date. Il a egalement ete etendu aux coproprietes en grande difficulte, ce qui elargit le perimetre des biens eligibles. Apres 2027, l'avenir du dispositif n'est pas encore determine.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Simulateur Denormandie 2026"
        description="Calculez votre reduction d'impot Denormandie en metropole et outre-mer"
        category="FinanceApplication"
      />
      <Breadcrumb currentPage="Simulateur Denormandie" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏘️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur Denormandie 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre reduction d&apos;impot pour un investissement dans l&apos;ancien avec travaux, en metropole ou en outre-mer.
      </p>

      <CalculateurDenormandie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Le dispositif Denormandie : l&apos;investissement locatif dans l&apos;ancien proroge jusqu&apos;en 2027</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis la fermeture du <strong>Pinel neuf au 31 decembre 2024</strong>, le <strong>dispositif Denormandie</strong> est
          devenu le principal mecanisme de defiscalisation immobiliere ouvert aux particuliers en France.
          Il s&apos;adresse aux investisseurs qui achetent un logement ancien dans une ville moyenne en
          declin demographique ou commercial, s&apos;engagent a y realiser des travaux significatifs, puis le mettent
          en location nue pendant 6, 9 ou 12 ans.
          Grace a la loi n° 2024-322 du 9 avril 2024, le dispositif est <strong>proroge jusqu&apos;au 31 decembre 2027</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Quelles communes sont eligibles ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Seules les communes adherant au programme <strong>Action coeur de ville</strong> (environ 234 villes moyennes
          comme Amiens, Bethune, Calais, Lens, Limoges, Mulhouse, Perpignan, Saint-Quentin...) ou ayant conclu une
          <strong> convention ORT (operation de revitalisation du territoire)</strong> sont eligibles.
          Depuis 2024, le dispositif est aussi ouvert aux <strong>coproprietes en grande difficulte</strong>.
          Pour verifier votre commune, consultez le simulateur officiel sur service-public.fr.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Quels travaux sont comptabilises ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les travaux doivent couvrir au moins <strong>25 % du cout total de l&apos;operation</strong> (prix d&apos;acquisition + travaux).
          Sont retenus : amelioration de la performance energetique d&apos;au moins 20 % (ou 30 % si chauffage electrique),
          creation de surface habitable nouvelle, travaux de modernisation, d&apos;assainissement ou de securite.
          Les travaux de construction ou reconstruction sont exclus. Ils doivent etre realises par des professionnels.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Taux et plafonds en detail</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-50">
                <th className="text-left p-3 font-semibold text-slate-700 border border-indigo-100">Duree</th>
                <th className="text-center p-3 font-semibold text-slate-700 border border-indigo-100">Taux Metropole</th>
                <th className="text-center p-3 font-semibold text-slate-700 border border-indigo-100">Taux Outre-mer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-slate-700 border border-slate-100">6 ans</td>
                <td className="p-3 text-center font-bold text-indigo-700 border border-slate-100">12 %</td>
                <td className="p-3 text-center font-bold text-violet-700 border border-slate-100">23 %</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 text-slate-700 border border-slate-100">9 ans</td>
                <td className="p-3 text-center font-bold text-indigo-700 border border-slate-100">18 %</td>
                <td className="p-3 text-center font-bold text-violet-700 border border-slate-100">29 %</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-700 border border-slate-100">12 ans</td>
                <td className="p-3 text-center font-bold text-indigo-700 border border-slate-100">21 %</td>
                <td className="p-3 text-center font-bold text-violet-700 border border-slate-100">32 %</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed text-sm">
          La base de calcul est plafonnee a <strong>300 000 EUR</strong> par an et a <strong>5 500 EUR/m2</strong> de surface habitable.
          La reduction d&apos;impot s&apos;impute dans la limite du <strong>plafonnement global des niches fiscales de 10 000 EUR/an</strong> (en metropole).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemple chiffre complet</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Acquisition d&apos;un appartement a <strong>150 000 EUR</strong> + <strong>50 000 EUR de travaux</strong> (soit 25 % du total de 200 000 EUR, operation eligible) :
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-bold text-indigo-900 mb-2">Metropole - 9 ans</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Base retenue : 200 000 EUR</li>
              <li>Taux : 18 %</li>
              <li>Reduction totale : <strong>36 000 EUR</strong></li>
              <li>Soit : <strong>4 000 EUR/an</strong> d&apos;impot en moins</li>
            </ul>
          </div>
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">Outre-mer - 9 ans</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Base retenue : 200 000 EUR</li>
              <li>Taux : 29 %</li>
              <li>Reduction totale : <strong>58 000 EUR</strong></li>
              <li>Soit : <strong>6 444 EUR/an</strong> d&apos;impot en moins</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Avantages et points de vigilance</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-bold text-emerald-900 mb-2">Avantages</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>+ Seul dispositif de defiscalisation locative encore ouvert (Pinel ferme fin 2024)</li>
              <li>+ Taux majores en outre-mer (jusqu&apos;a 32 %)</li>
              <li>+ Valorisation du patrimoine via renovation</li>
              <li>+ Proroge jusqu&apos;au 31/12/2027</li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Points de vigilance</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>- Commune obligatoirement eligible (Action coeur de ville / ORT)</li>
              <li>- Travaux min. 25 % du cout total</li>
              <li>- Plafond niches fiscales 10 000 EUR/an</li>
              <li>- Loyers et ressources locataires plafonnees par zone</li>
            </ul>
          </div>
        </div>
      </section>

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode="La reduction d'impot Denormandie (article 199 novovicies du CGI) est calculee sur la base min(prix acquisition + travaux, 300 000 EUR). Les taux (12/18/21 % en metropole, 23/29/32 % en outre-mer selon la duree 6/9/12 ans) sont appliques conformement aux textes officiels. Pour 12 ans, la repartition annuelle distingue les 9 premieres annees (taux principal) des 3 dernieres (1 %/an). La prorogation au 31/12/2027 est issue de la loi n° 2024-322 du 9 avril 2024."
        sources={[
          { label: "Service-Public.fr - Dispositif Denormandie", url: "https://www.service-public.fr/particuliers/vosdroits/F34327" },
          { label: "BOFiP - Denormandie (article 199 novovicies CGI)", url: "https://bofip.impots.gouv.fr/bofip/11862-PGP.html" },
          { label: "Legifrance - Loi n° 2024-322 du 9 avril 2024 (prorogation)", url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049420680" },
        ]}
      />

      <RelatedCalculators currentSlug="/simulateur-denormandie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
