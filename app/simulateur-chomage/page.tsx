import type { Metadata } from "next";
import CalculateurChomage from "./CalculateurChomage";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";
import Visuel from "../components/Visuel";
import { fmtEUR as fmt } from "@/app/lib/fmt";
import { calculerARE } from "./chomageCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-chomage" },
  title: "Simulateur Chomage 2026 - Calcul Allocation ARE gratuit",
  description:
    "Calculez votre allocation chomage (ARE) gratuitement. Montant journalier, mensuel, duree d'indemnisation, degressivite. Regles Unedic en vigueur en octobre 2026.",
  keywords:
    "simulateur chomage, calcul allocation chomage, ARE, aide retour emploi, France Travail, Pole emploi, indemnite chomage, SJR, montant chomage",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment est calculee l'allocation chomage (ARE) ?",
    a: "A partir du Salaire Journalier de Reference (SJR). Le montant journalier est la formule la plus haute entre 57 % du SJR et 40,4 % du SJR + 13,18 EUR. Il ne peut pas depasser 75 % du SJR, ni 300,21 EUR brut par jour. Minimum : 32,13 EUR par jour (sauf si 75 % du SJR est deja plus bas).",
  },
  {
    q: "Combien de temps peut-on toucher le chomage ?",
    a: "La duree est egale a 75 % de la periode travaillee, dans la limite de 18 mois avant 55 ans, 22,5 mois a 55 et 56 ans, et 27 mois a partir de 57 ans. Il faut avoir travaille au moins 6 mois sur les 24 derniers mois (36 mois a partir de 55 ans). Apres une rupture conventionnelle individuelle dont la fin de contrat est au 1er septembre 2026 ou apres, le maximum est de 15 mois (moins de 55 ans) ou 20,5 mois (55 ans et plus).",
  },
  {
    q: "Qu'est-ce que la degressivite de l'ARE ?",
    a: "Pour les allocataires de moins de 55 ans dont l'allocation depasse 92,57 EUR par jour, l'ARE baisse de 30 % a partir du 7e mois d'indemnisation, sans descendre sous 92,57 EUR par jour. Si la fin de contrat ou la procedure de licenciement date d'avant le 1er avril 2025, la limite d'age est 57 ans.",
  },
  {
    q: "Quel est le montant minimum du chomage ?",
    a: "L'allocation minimale est de 32,13 EUR par jour, soit 963,90 EUR pour un mois de 30 jours. Elle n'est pas appliquee en cas de travail partiel, et un salaire tres bas donne 75 % du SJR si ce montant est plus petit.",
  },
  {
    q: "La rupture conventionnelle ouvre-t-elle droit au chomage ?",
    a: "Oui. Comme un licenciement, la rupture conventionnelle ouvre droit a l'ARE, contrairement a une demission classique (sauf demission consideree comme legitime).",
  },
  {
    q: "Quel pourcentage de mon salaire vais-je toucher ?",
    a: "Pour un salaire moyen (par exemple 2 500 EUR brut par mois), l'allocation brute represente environ 56 % du salaire brut. Le taux monte jusqu'a 75 % du SJR pour les tres petits salaires. Les retenues (CSG, CRDS, retraite complementaire) se deduisent ensuite.",
  },
];

// Memes salaires que le visuel scripts/visuels/chomage-allocation-mensuelle-selon-salaire.mjs
const SALAIRES_VISUEL = [1500, 2000, 2500, 3000, 4000, 6000];
const euro0 = (n: number) => Math.round(n).toLocaleString("fr-FR");
const LIGNES_VISUEL = SALAIRES_VISUEL.map((s) => ({ salaire: s, ...calculerARE(s, 24, 35) }));
const ALT_VISUEL = `Allocation chômage brute par mois selon le salaire brut, pour 24 mois travaillés à 35 ans : ${LIGNES_VISUEL.map((l) => `${euro0(l.salaire)} € brut donnent ${euro0(l.areMois)} € par mois`).join(", ")}`;
const EXEMPLES = [1800, 2000, 3000, 4000].map((s) => ({ salaire: s, ...calculerARE(s, 24, 35) }));

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Chomage ARE" />
      <Breadcrumb currentPage="Simulateur Chomage" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Chomage 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre allocation chomage (ARE) : montant journalier, mensuel,
        duree d&apos;indemnisation et degressivite.
      </p>

      <CalculateurChomage />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment est calculee l&apos;allocation chomage en 2026 ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>Allocation d&apos;aide au Retour a l&apos;Emploi (ARE)</strong> est
          versee par <strong>France Travail</strong> (anciennement Pole emploi) aux
          demandeurs d&apos;emploi ayant suffisamment travaille. Le montant depend de vos
          salaires bruts des 24 derniers mois (36 mois a partir de 55 ans). Les regles
          ci-dessous sont celles de l&apos;Unedic en vigueur au 14 octobre 2026. Les
          allocations n&apos;ont pas ete revalorisees au 1er juillet 2026 : la partie fixe
          reste a 13,18 EUR et l&apos;allocation minimale a 32,13 EUR par jour.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Etape 1 : Le Salaire Journalier de Reference (SJR)</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Le <strong>SJR</strong> est la base de calcul de l&apos;ARE. On additionne les
          salaires bruts de la periode de reference (primes comprises, indemnites de rupture
          exclues), puis on divise par le nombre de <strong>jours calendaires</strong> compris
          entre le premier et le dernier jour d&apos;emploi, jours non travailles inclus (ceux-ci
          sont comptes dans la limite de 70 % des jours travailles).
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          SJR = salaire de reference / nombre de jours calendaires de la periode
        </div>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed">
          Le simulateur suppose le meme salaire brut chaque mois et un emploi continu :
          24 mois font alors 730 jours (365 / 12 = 30,4 jours par mois).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Etape 2 : Le montant journalier</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          France Travail calcule deux montants et retient <strong>le plus eleve</strong> :
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 space-y-2">
          <p><strong>Formule 1</strong> : 57 % du SJR</p>
          <p><strong>Formule 2</strong> : 40,4 % du SJR + 13,18 EUR (partie fixe)</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 mt-4">
          <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
            <p className="font-semibold text-sky-700 text-sm">Minimum</p>
            <p className="text-2xl font-extrabold text-sky-800 mt-1">32,13 EUR/jour</p>
            <p className="text-xs text-sky-600 mt-1">963,90 EUR pour 30 jours</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
            <p className="font-semibold text-sky-700 text-sm">Plafond</p>
            <p className="text-2xl font-extrabold text-sky-800 mt-1">75 % du SJR</p>
            <p className="text-xs text-sky-600 mt-1">jamais plus, meme avec la partie fixe</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
            <p className="font-semibold text-sky-700 text-sm">Maximum</p>
            <p className="text-2xl font-extrabold text-sky-800 mt-1">300,21 EUR/jour</p>
            <p className="text-xs text-sky-600 mt-1">brut, soit 9 006,30 EUR pour 30 jours</p>
          </div>
        </div>

        <Visuel
          fichier="chomage-allocation-mensuelle-selon-salaire"
          alt={ALT_VISUEL}
          legende="Calcul du simulateur pour 24 mois travailles a salaire constant, 35 ans. Montants bruts, avant CSG, CRDS et retraite complementaire. Pour 6 000 EUR, la degressivite fait baisser l'allocation de 30 % a partir du 7e mois (jamais sous 92,57 EUR par jour)."
          className="mt-6"
        />
        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          Pour comprendre chaque etape avec un exemple complet, les differes et l&apos;effet
          d&apos;une indemnite de licenciement ou de conges payes, lisez{" "}
          <a href="/chomage-comment-est-calcule-le-montant" className="text-blue-600 hover:underline font-medium">
            Chomage : comment est calcule le montant ?
          </a>
          .
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Duree d&apos;indemnisation</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La duree correspond aux jours de la periode travaillee, multiplies par un
          coefficient de <strong>0,75</strong>, avec un minimum de 182 jours (6 mois) et un
          maximum qui depend de l&apos;age a la fin du contrat :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Age</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Condition</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Duree max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Moins de 55 ans</td>
                <td className="py-2.5 px-2 text-slate-500">130 jours (6 mois) travailles sur 24 mois</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">18 mois (548 jours)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">55 et 56 ans</td>
                <td className="py-2.5 px-2 text-slate-500">130 jours (6 mois) travailles sur 36 mois</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">22,5 mois (685 jours) ; 27 mois (822 jours) en cas de formation</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">57 ans et plus</td>
                <td className="py-2.5 px-2 text-slate-500">130 jours (6 mois) travailles sur 36 mois</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">27 mois (822 jours)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Rupture conventionnelle individuelle (fin de contrat a partir du 1er septembre 2026)</td>
                <td className="py-2.5 px-2 text-slate-500">memes conditions</td>
                <td className="py-2.5 px-2 text-right font-bold text-slate-700">15 mois avant 55 ans, 20,5 mois a partir de 55 ans</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La degressivite</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Pour les allocataires de <strong>moins de 55 ans</strong> dont l&apos;allocation depasse{" "}
          <strong>92,57 EUR par jour</strong> (environ 4 940 EUR de salaire brut mensuel), l&apos;ARE
          est reduite de <strong>30 %</strong> a partir du 7e mois d&apos;indemnisation, sans
          descendre sous 92,57 EUR par jour. Si la fin de contrat ou la procedure de
          licenciement date d&apos;avant le 1er avril 2025, la limite d&apos;age est 57 ans.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exemples concrets</h3>
        <p className="text-slate-500 text-sm mb-3">24 mois travailles, salaire brut constant, 35 ans, montants bruts.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXEMPLES.map((e) => (
            <div key={e.salaire} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="font-semibold text-blue-700 text-sm">Salaire {euro0(e.salaire)} EUR brut/mois</p>
              <p className="text-xs text-blue-600 mt-1">SJR = {fmt(e.sjr)} EUR → ARE = {fmt(e.areJour)} EUR/j</p>
              <p className="text-xs text-blue-600 font-bold">{fmt(e.areMois)} EUR/mois ({e.tauxRemplacement.toFixed(1).replace(".", ",")} % du salaire brut)</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Conditions pour toucher le chomage</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Avoir travaille au moins <strong>130 jours ou 910 heures (6 mois)</strong> sur les 24 derniers mois (36 mois a partir de 55 ans)</li>
          <li>Etre inscrit comme demandeur d&apos;emploi a France Travail</li>
          <li>Etre involontairement prive d&apos;emploi (la rupture conventionnelle et certaines demissions legitimes ouvrent aussi un droit)</li>
          <li>Etre apte au travail et resider dans un territoire couvert par l&apos;assurance chomage</li>
          <li>Rechercher activement un emploi</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Quand l&apos;allocation est-elle versee ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Apres un <strong>delai d&apos;attente de 7 jours</strong>, auquel peuvent s&apos;ajouter des
          differes (indemnites de conges payes, indemnites de rupture superieures au minimum
          legal). Ensuite, l&apos;allocation est versee chaque mois, en debut de mois suivant,
          apres votre actualisation (du 28 au 15 du mois suivant). Elle est calculee sur 30 jours
          par mois. Ce simulateur ne calcule pas les differes.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer son allocation chomage (ARE)"
        steps={[
          { name: "Calculer le Salaire Journalier de Référence (SJR)", text: "SJR = somme des salaires bruts des 24 derniers mois (36 à partir de 55 ans) divisée par le nombre de jours calendaires de la période ; ex. 2 000 EUR brut/mois pendant 24 mois = 48 000 EUR / 730 jours = 65,75 EUR/jour." },
          { name: "Appliquer les deux formules et retenir la plus avantageuse", text: "France Travail calcule : formule 1 = 57 % du SJR ; formule 2 = 40,4 % du SJR + 13,18 EUR ; il retient la plus élevée des deux. Le minimum est 32,13 EUR/jour, l'allocation ne peut pas dépasser 75 % du SJR, ni 300,21 EUR brut par jour." },
          { name: "Vérifier la durée d'indemnisation", text: "Elle est égale à 75 % de la période travaillée, plafonnée à 18 mois avant 55 ans, 22,5 mois à 55 et 56 ans, et 27 mois à partir de 57 ans (condition minimale : 6 mois travaillés sur les 24 ou 36 derniers mois). Après une rupture conventionnelle individuelle dont la fin de contrat est au 1er septembre 2026 ou après : 15 mois avant 55 ans, 20,5 mois à partir de 55 ans." },
          { name: "Identifier la degressivite eventuelle", text: "Si l'allocation dépasse 92,57 EUR par jour et que l'allocataire a moins de 55 ans, elle baisse de 30 % à partir du 7e mois d'indemnisation, sans descendre sous 92,57 EUR par jour." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`L'allocation d'aide au retour a l'emploi (ARE) se calcule a partir du salaire journalier de reference. Le simulateur applique les regles Unedic en vigueur au 14 octobre 2026 : 57 % du SJR ou 40,4 % du SJR + 13,18 EUR, minimum 32,13 EUR par jour, plafond de 75 % du SJR, maximum 300,21 EUR par jour, coefficient 0,75 sur la duree, degressivite au 7e mois. Hypothese : meme salaire brut chaque mois, emploi continu.`}
        sources={[
          { label: "France Travail - Le paiement de l'allocation chomage", url: "https://www.francetravail.fr/candidat/vos-droits-et-demarches/vos-demarches-aupres-de-pole-emp/le-paiement-des-allocations.html" },
          { label: "Unedic - Quel sera le montant de mon allocation chomage ?", url: "https://www.unedic.org/l-assurance-chomage-et-vous/demandeur-d-emploi-ou-salarie/mon-indemnisation/quel-sera-le-montant-de-mon-allocation-chomage" },
          { label: "Unedic - Fiche ARE", url: "https://www.unedic.org/la-reglementation/fiches-thematiques/allocation-d-aide-au-retour-a-l-emploi-are" },
          { label: "Unedic - Pas de revalorisation au 1er juillet 2026", url: "https://www.unedic.org/actualites/allocations-dassurance-chomage-pas-de-revalorisation-au-1er-juillet-2026" },
          { label: "Service-Public.fr - Allocation chomage (ARE)", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N178" },
        ]}
      />


      <RelatedCalculators currentSlug="/simulateur-chomage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
