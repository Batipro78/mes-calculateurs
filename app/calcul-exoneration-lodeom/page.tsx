import type { Metadata } from "next";
import CalculateurLodeom from "./CalculateurLodeom";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-exoneration-lodeom" },
  title: "Calcul Exoneration LODEOM 2026 - Cotisations Patronales Outre-Mer",
  description:
    "Simulez l'exoneration LODEOM 2026 pour vos salaries en Guadeloupe, Martinique, Guyane ou La Reunion. 3 baremes : competitivite, renforcee, innovation. Calcul du coefficient et de l'economie de cotisations patronales.",
  keywords:
    "exoneration LODEOM, calcul LODEOM 2026, cotisations patronales outre-mer, exoneration DOM, baremes LODEOM, LODEOM competitivite, LODEOM renforcee, LODEOM innovation",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que l'exoneration LODEOM ?",
    a: "La LODEOM (Loi pour le Developpement Economique de l'Outre-Mer) est un dispositif d'exoneration de cotisations patronales destine aux employeurs situes en Guadeloupe, Martinique, Guyane et La Reunion. Elle permet de reduire le cout du travail dans ces territoires en exonerant partiellement ou totalement certaines cotisations patronales (assurance maladie, allocations familiales, accidents du travail, retraite, FNAL...) selon le niveau de remuneration du salarie et le secteur d'activite de l'entreprise.",
  },
  {
    q: "Quels territoires sont couverts par la LODEOM ?",
    a: "Les territoires DOM couverts sont la Guadeloupe, la Martinique, la Guyane et La Reunion. Saint-Barthelemy et Saint-Martin appliquent des baremes specifiques avec un taux T de 0,2111 (non couverts par ce simulateur). Mayotte integre le dispositif progressivement a partir du 1er juillet 2026 selon les dispositions de la LFSS 2026.",
  },
  {
    q: "Quel bareme LODEOM choisir pour mon entreprise ?",
    a: "Trois baremes coexistent. Le bareme Competitivite (droit commun) s'applique a tous les employeurs DOM : exoneration totale jusqu'a 1,3 SMIC, puis degressive jusqu'a 2,2 SMIC. Le bareme Competitivite renforcee est reserve aux PME de moins de 250 salaries avec un chiffre d'affaires inferieur a 50 millions d'euros, dans des secteurs prioritaires (industrie, agro-nutrition, environnement, energies renouvelables, NTIC, tourisme et hotellerie...) et en Guyane elargie. Il offre une exoneration totale jusqu'a 2 SMIC, puis degressive jusqu'a 2,7 SMIC. Le bareme Innovation et croissance concerne les salaries concourant a des projets innovants ou de R&D (NTIC) : exoneration totale jusqu'a 1,7 SMIC avec un palier fixe jusqu'a 2,5 SMIC, puis degressif jusqu'a 3,5 SMIC.",
  },
  {
    q: "Comment est calcule le coefficient LODEOM ?",
    a: "Pour le bareme Competitivite, si la remuneration est inferieure ou egale a 1,3 SMIC, le coefficient est egal a T (exoneration totale). Entre 1,3 et 2,2 SMIC, il est egal a 1,3 x T / 0,9 x (2,2 x SMIC / rem - 1). Au-dela de 2,2 SMIC, il est nul. Le coefficient est arrondi a 4 decimales. L'exoneration annuelle est ensuite egale au coefficient multiplie par la remuneration annuelle brute du salarie. T est 0,3201 pour les entreprises de moins de 11 salaries (FNAL 0,10 %) et 0,3241 pour 11 salaries et plus (FNAL 0,50 %).",
  },
  {
    q: "Peut-on cumuler la LODEOM avec la reduction generale de cotisations ?",
    a: "Non, la LODEOM et la reduction generale degressive de cotisations patronales (anciennement reduction Fillon) ne se cumulent pas. L'employeur doit choisir le dispositif le plus avantageux pour chaque salarie. En pratique, la LODEOM est presque toujours plus favorable pour les employeurs DOM eligibles, car ses plafonds (2 SMIC en renforcee, 3,5 SMIC en innovation) sont bien superieurs au plafond de 1,6 SMIC de la reduction generale.",
  },
  {
    q: "Qu'est-ce qui change avec la reforme 2026 pour la LODEOM ?",
    a: "La LFSS 2026 a reorganise le paysage des allegements de charges en creant une reduction generale degressive unique, remplacant la reduction Fillon classique. L'articulation avec la LODEOM est desormais codifiee : cumul interdit, l'employeur choisit le plus avantageux. Par ailleurs, Mayotte entre progressivement dans le dispositif LODEOM a compter du 1er juillet 2026. Les baremes et seuils (1,3 / 2,2 SMIC pour le droit commun ; 2 / 2,7 pour la renforcee ; 1,7 / 3,5 pour l'innovation) restent inchanges.",
  },
  {
    q: "Quel est le traitement LODEOM pour Mayotte ?",
    a: "Mayotte integre progressivement le dispositif LODEOM a partir du 1er juillet 2026, conformement aux mesures de la LFSS 2026 de convergence sociale des departements et regions d'outre-mer. Les entreprises mayottaises doivent se rapprocher de l'Urssaf de Mayotte pour connaitre les modalites d'application exactes et le calendrier de montee en charge des baremes applicables a leur situation.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Exoneration LODEOM"
        description="Simulateur exoneration cotisations patronales LODEOM 2026 Outre-Mer"
        category="FinanceApplication"
      />
      <Breadcrumb currentPage="Calcul Exoneration LODEOM" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌴
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Exoneration LODEOM 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez l&apos;exoneration de cotisations patronales pour vos salaries en Outre-Mer (Guadeloupe, Martinique, Guyane, La Reunion).
      </p>

      <CalculateurLodeom />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          LODEOM 2026 : l&apos;exoneration cle des employeurs d&apos;Outre-Mer
        </h2>

        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>LODEOM</strong> (Loi pour le Developpement Economique de l&apos;Outre-Mer)
          permet aux employeurs de <strong>Guadeloupe, Martinique, Guyane et La Reunion</strong> de
          beneficier d&apos;une exoneration partielle ou totale des cotisations patronales, ce qui
          reduit significativement le cout du travail dans ces territoires. Au 1er janvier 2026, les
          baremes restent inchanges mais la reforme de la reduction generale (LFSS 2026) clarifie
          l&apos;articulation : le cumul est interdit, l&apos;employeur choisit le mecanisme le plus avantageux.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Qui peut beneficier de la LODEOM ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Tout employeur prive etabli dans un DOM (Guadeloupe, Martinique, Guyane, La Reunion) peut
          beneficier du bareme Competitivite, sous reserve d&apos;etre a jour de ses obligations declaratives
          et de paiement aupres de l&apos;Urssaf. Les baremes Competitivite renforcee et Innovation et
          croissance sont reserves a certaines entreprises et certains salaries selon des conditions
          strictes d&apos;effectif, de chiffre d&apos;affaires et de secteur d&apos;activite.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les 3 baremes LODEOM en detail</h3>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-bold text-blue-900 mb-2">Competitivite</p>
            <p className="text-sm text-slate-700 mb-2">Tous les employeurs DOM (droit commun)</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Exo totale jusqu&apos;a <strong>1,3 SMIC</strong></li>
              <li>Degressive de 1,3 a <strong>2,2 SMIC</strong></li>
              <li>Nulle au-dela de 2,2 SMIC</li>
            </ul>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-900 mb-2">Competitivite renforcee</p>
            <p className="text-sm text-slate-700 mb-2">PME moins de 250 sal., CA inferieur a 50 M EUR, secteurs prioritaires</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Exo totale jusqu&apos;a <strong>2 SMIC</strong></li>
              <li>Degressive de 2 a <strong>2,7 SMIC</strong></li>
              <li>Nulle au-dela de 2,7 SMIC</li>
            </ul>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <p className="font-bold text-violet-900 mb-2">Innovation et croissance</p>
            <p className="text-sm text-slate-700 mb-2">Salaries sur projets innovants, NTIC, R&amp;D</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Exo totale jusqu&apos;a <strong>1,7 SMIC</strong></li>
              <li>Palier fixe de 1,7 a 2,5 SMIC</li>
              <li>Degressive de 2,5 a <strong>3,5 SMIC</strong></li>
              <li>Nulle au-dela de 3,5 SMIC</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Le taux T et le FNAL</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le taux T represente la somme des taux de cotisations couverts par l&apos;exoneration.
          Il vaut <strong>0,3201</strong> pour les entreprises de <strong>moins de 11 salaries</strong>
          (FNAL a 0,10 %) et <strong>0,3241</strong> pour les entreprises de
          <strong> 11 salaries et plus</strong> (FNAL a 0,50 %). La difference de 0,004 point est
          due au taux majoree du FNAL (Fonds National d&apos;Aide au Logement) appliquee aux
          employeurs de plus de 50 salaries en metropole et ramene a 0,50 % dans les DOM.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemple chiffre complet</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un salarie en Martinique, salaire mensuel brut 2 500 EUR, bareme Competitivite renforcee,
          entreprise de moins de 11 salaries (T = 0,3201) :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Remuneration annuelle : 2 500 x 12 = <strong>30 000 EUR</strong></li>
          <li>SMIC annuel 2026 : 1 823,03 x 12 = <strong>21 876,36 EUR</strong></li>
          <li>Ratio : 30 000 / 21 876,36 = <strong>1,371 SMIC</strong></li>
          <li>1,371 est inferieur a 2 SMIC : zone d&apos;exoneration <strong>totale</strong></li>
          <li>Coefficient = T = <strong>0,3201</strong></li>
          <li>Exoneration annuelle = 0,3201 x 30 000 = <strong>9 603 EUR</strong></li>
          <li>Exoneration mensuelle = 9 603 / 12 = <strong>800,25 EUR</strong></li>
          <li>Soit <strong>32 % du salaire brut exonere</strong></li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Sans la LODEOM, l&apos;employeur aurait paye l&apos;integralite de ces 9 603 EUR en cotisations
          supplementaires chaque annee. Sur 5 ans, cela represente plus de 48 000 EUR d&apos;economie.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Saint-Barthelemy, Saint-Martin et Mayotte
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Saint-Barthelemy et Saint-Martin disposent de leurs propres baremes LODEOM avec un taux T
          de 0,2111, inferieur a celui des DOM classiques. Ces collectivites ont un statut fiscal
          particulier et les employeurs doivent se rapprocher de l&apos;Urssaf competente pour ces
          territoires. Mayotte integre progressivement le dispositif LODEOM a partir du
          <strong> 1er juillet 2026</strong> dans le cadre de la convergence sociale prevue par
          la LFSS 2026.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          LODEOM et reduction generale 2026 : que choisir ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis la LFSS 2026, la reduction generale degressive unique (qui remplace l&apos;ancienne
          reduction Fillon) et la LODEOM ne se cumulent pas. L&apos;employeur doit comparer les deux
          et retenir celui qui est le plus avantageux pour chaque salarie. En pratique, pour les
          salaries remuneres entre 1 et 2,5 SMIC en DOM, la LODEOM est quasi systematiquement
          plus avantageuse car son plafond depasse celui de la reduction generale (1,6 SMIC).
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
          <p className="font-semibold text-amber-900 mb-1">Avertissement</p>
          <p className="text-sm text-slate-700">
            Ce simulateur fournit une estimation indicative. Le calcul officiel et opposable
            s&apos;effectue via mon-entreprise.urssaf.fr et la declaration DSN. L&apos;eligibilite
            sectorielle au bareme renforcee doit etre verifiee aupres de l&apos;Urssaf. Les
            conditions (effectif, CA, secteur) peuvent evoluer.
          </p>
        </div>
      </section>

      <HowToJsonLd
        name="Calculer l'exonération LODEOM"
        steps={[
          { name: "Choisir le barème et la taille de l'entreprise", text: "Sélectionner le barème applicable : Competitivite (droit commun), Competitivite renforcee (PME secteurs prioritaires) ou Innovation et croissance (salariés R&D/NTIC). Le taux T = 0,3201 pour moins de 11 salariés, T = 0,3241 pour 11 salariés et plus." },
          { name: "Saisir le salaire mensuel brut", text: "Entrer le salaire mensuel brut du salarié. Le simulateur calcule le ratio remuneration annuelle / SMIC annuel 2026 (base 1 823,03 EUR/mois soit 21 876 EUR/an)." },
          { name: "Appliquer la formule du coefficient degressif", text: "Si le ratio est inférieur au seuil d'exonération totale (ex. 1,3 SMIC en Competitivite), coefficient = T. En zone degressive, formule : 1,3 x T / 0,9 x (2,2 x SMIC / rem - 1). Au-dela du plafond, coefficient = 0." },
          { name: "Lire l'exonération mensuelle et annuelle", text: "Exonération annuelle = coefficient x remuneration annuelle brute. Exonération mensuelle = exonération annuelle / 12. Ce montant se deduit des cotisations patronales versees à l'Urssaf." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode="Le simulateur applique les baremes LODEOM en vigueur au 1er janvier 2026 tels que publies par l'Urssaf et LégiSocial. Le coefficient est calcule selon les formules reglementaires et arrondi a 4 decimales. L'exoneration est le produit du coefficient par la remuneration annuelle brute. Les seuils sont exprimes en multiples du SMIC mensuel brut 2026 (1 823,03 EUR)."
        sources={[
          {
            label: "Urssaf — Exoneration LODEOM (baremes officiels)",
            url: "https://www.urssaf.fr/accueil/employeur/beneficier-exonerations/exonerations-zonees/exoneration-lodeom.html",
          },
          {
            label: "LégiSocial — Baremes LODEOM 2026",
            url: "https://www.legisocial.fr",
          },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-exoneration-lodeom" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
