import type { Metadata } from "next";
import CalculateurOctroiMer from "./CalculateurOctroiMer";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-octroi-de-mer" },
  title: "Calcul Octroi de Mer 2026 - Simulateur Import DOM (Reunion, Antilles...)",
  description:
    "Simulez l'octroi de mer sur vos importations en Guadeloupe, Martinique, Guyane, La Reunion ou Mayotte. Decomposition OM + OMR + TVA, cout rendu et majoration.",
  keywords:
    "octroi de mer, calcul octroi de mer, simulateur octroi de mer, taxe import DOM, octroi de mer La Reunion, octroi de mer Guadeloupe, OMR, loi 2004-639, reforme 2026",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que l'octroi de mer ?",
    a: "L'octroi de mer est une taxe indirecte frappant les marchandises introduites (importees) dans les cinq departements et regions d'outre-mer (DROM) : Guadeloupe, Martinique, Guyane, La Reunion et Mayotte. Il s'applique egalement a la production locale des entreprises dont le chiffre d'affaires annuel depasse 550 000 EUR. Base legale : loi n° 2004-639 du 2 juillet 2004, modifiee par la loi n° 2026-103 du 19 fevrier 2026 (reforme applicable au 1er juillet 2026).",
  },
  {
    q: "Qui paie l'octroi de mer ?",
    a: "Pour les marchandises importees : tout importateur, qu'il soit un professionnel ou un particulier (au-dela des franchises). Pour la production locale : les entreprises dont le chiffre d'affaires annuel est superieur a 550 000 EUR. En pratique, l'octroi de mer est repercute dans le prix de vente au consommateur final, ce qui explique pourquoi les prix dans les DOM sont structurellement plus eleves qu'en metropole.",
  },
  {
    q: "Comment connaitre le taux d'octroi de mer applicable a mon produit ?",
    a: "Les taux sont votes par chaque conseil regional ou collectivite unique (Martinique, Guyane) et varient selon la nomenclature douaniere (code NC a 8 chiffres) du produit. Ils sont compris entre 0 % et 60 % (voire 90 % pour les alcools et tabacs). Pour connaitre le taux exact : consultez la grille tarifaire de la collectivite concernee ou le tarif integre de la communaute (TARIC) sur le portail douane.gouv.fr.",
  },
  {
    q: "La TVA s'applique-t-elle en plus de l'octroi de mer ?",
    a: "Oui, en Guadeloupe, Martinique et La Reunion, la TVA s'applique au taux normal de 8,5 % (taux reduit 2,1 %) sur la valeur CAF de la marchandise. En revanche, l'octroi de mer n'entre PAS dans la base d'imposition de la TVA (articles 267 et 292 du Code general des impots). En Guyane et a Mayotte, la TVA n'est provisoirement pas applicable (taux 0 %).",
  },
  {
    q: "Quelle est la franchise pour les colis et voyageurs ?",
    a: "Pour les voyageurs arrivant d'un autre Etat membre de l'UE ou de metropole : franchise de 1 000 EUR de biens personnels. Pour les colis entre particuliers UE vers DOM : franchise de 400 EUR (22 EUR a Mayotte). En dessous de ces montants, l'octroi de mer n'est pas percu. Au-dela, il s'applique sur la totalite de la valeur ou uniquement sur la fraction excedentaire selon les cas.",
  },
  {
    q: "Pourquoi les prix sont-ils plus chers en outre-mer ?",
    a: "Plusieurs facteurs s'accumulent : l'octroi de mer lui-meme (parfois 10 a 30 % sur la valeur d'un produit), les couts de transport maritime (fret et assurance inclus dans la valeur CAF), la plus petite taille des marches (economies d'echelle reduites pour les distributeurs), et la TVA DOM (8,5 %). L'octroi de mer represente la recette fiscale principale des communes et collectivites d'outre-mer, soit environ 1,6 milliard EUR par an au total.",
  },
  {
    q: "Qu'est-ce que la reforme de l'octroi de mer de 2026 ?",
    a: "La loi n° 2026-103 du 19 fevrier 2026 modernise le dispositif de l'octroi de mer, applicable au 1er juillet 2026. Elle simplifie les procedures, renforce la transparence des taux et adapte le dispositif aux obligations europeennes. La derogation accordee par l'Union europeenne pour maintenir ce dispositif fiscal (incompatible avec le principe de libre-echange) doit etre renouvelee avant fin 2027.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Octroi de Mer 2026"
        description="Simulateur octroi de mer DOM - OM + OMR + TVA"
        category="FinanceApplication"
      />
      <Breadcrumb currentPage="Calcul Octroi de Mer" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏝️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Octroi de Mer 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulez l&apos;octroi de mer sur vos importations en Guadeloupe, Martinique, Guyane, La Reunion ou Mayotte.
      </p>

      <CalculateurOctroiMer />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">L&apos;octroi de mer : tout comprendre</h2>

        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>octroi de mer</strong> est la taxe douaniere emblematique des departements et regions d&apos;outre-mer
          (DROM) francais. Heritier de la fiscalite coloniale, il constitue aujourd&apos;hui la ressource fiscale principale
          des communes d&apos;outre-mer, representant environ <strong>1,6 milliard EUR par an</strong> pour les cinq territoires.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Qui est concerne ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Deux categories de redevables :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Importateurs</strong> : toute personne physique ou morale introduisant des marchandises dans un DROM, sans seuil de chiffre d&apos;affaires.</li>
          <li><strong>Producteurs locaux</strong> : entreprises dont le chiffre d&apos;affaires annuel est superieur a 550 000 EUR (seuil fixe par la loi 2004-639).</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Comment se calcule l&apos;octroi de mer ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le calcul repose sur la <strong>valeur CAF</strong> (Cout, Assurance, Fret) de la marchandise a la frontiere du territoire :
        </p>
        <ol className="list-decimal list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Octroi de mer (OM)</strong> = valeur CAF x taux OM (vote par la collectivite)</li>
          <li><strong>Octroi de mer regional (OMR)</strong> = valeur CAF x taux OMR (max legal 2,5 %)</li>
          <li><strong>TVA</strong> = valeur CAF x taux TVA (l&apos;OM n&apos;entre PAS dans la base TVA, articles 267 et 292 du CGI)</li>
          <li><strong>Cout rendu</strong> = valeur CAF + OM + OMR + TVA</li>
        </ol>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les taux d&apos;octroi de mer</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les taux sont <strong>votes par chaque conseil regional ou collectivite unique</strong> et varient selon la
          nomenclature douaniere (code NC) du produit. Ils s&apos;echelonnent generalement entre <strong>0 et 30 %</strong>
          pour la plupart des biens courants, avec un maximum legal de <strong>60 %</strong> (90 % pour les alcools et tabacs).
          Des majorations specifiques s&apos;appliquent a Mayotte. Les grilles tarifaires completes sont disponibles sur
          douane.gouv.fr.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemple chiffre complet</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Pour une marchandise a 1 000 EUR CAF importee a <strong>La Reunion</strong>, avec OM 12,5 %, OMR 2,5 %, TVA 8,5 % :
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <ul className="text-slate-700 space-y-1 text-sm">
            <li>Octroi de mer (12,5 %) : <strong>125 EUR</strong></li>
            <li>OMR (2,5 %) : <strong>25 EUR</strong></li>
            <li>TVA (8,5 % sur 1 000 EUR) : <strong>85 EUR</strong></li>
            <li className="font-bold border-t border-slate-200 pt-1 mt-1">Total taxes : <strong>235 EUR</strong></li>
            <li className="font-bold text-blue-700">Cout rendu La Reunion : <strong>1 235 EUR</strong> (majoration 23,5 %)</li>
          </ul>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Franchises applicables</h3>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="font-bold text-green-900 mb-2">Voyageurs</p>
            <p className="text-sm text-slate-700">Franchise de 1 000 EUR de biens personnels pour les voyageurs arrivant de metropole ou d&apos;un autre Etat membre de l&apos;UE.</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Colis entre particuliers (UE vers DOM)</p>
            <p className="text-sm text-slate-700">Franchise de 400 EUR (22 EUR a Mayotte). Au-dela, l&apos;octroi de mer est du sur la fraction excedentaire.</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Reforme 2026</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La <strong>loi n° 2026-103 du 19 fevrier 2026</strong>, applicable au 1er juillet 2026, modernise le dispositif
          de l&apos;octroi de mer : simplification des procedures, renforcement de la transparence tarifaire et adaptation
          aux obligations europeennes. La derogation accordee par l&apos;Union europeenne — qui autorise ce mecanisme
          fiscal derogant au principe de libre-echange pour soutenir les economies ultramarines — doit etre renouvelee
          avant fin 2027.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-amber-900 mb-1">Attention : estimation indicative</p>
          <p className="text-sm text-slate-700">
            Ce simulateur utilise les taux saisis manuellement. Les taux reels applicables dependent de la nomenclature
            douaniere exacte (code NC a 8 chiffres) de votre marchandise et des deliberations de chaque collectivite.
            Consultez la grille officielle sur douane.gouv.fr ou un transitaire agree.
          </p>
        </div>
      </section>

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode="L'octroi de mer (OM) est calcule en appliquant le taux vote par la collectivite sur la valeur CAF de la marchandise. L'OMR (octroi de mer regional) s'ajoute au meme assiette. La TVA DOM est calculee sur la valeur CAF uniquement, l'octroi de mer n'entrant pas dans la base TVA conformement aux articles 267 et 292 du Code general des impots. Base legale : loi n° 2004-639 du 2 juillet 2004, loi n° 2026-103 du 19 fevrier 2026."
        sources={[
          { label: "Douane.gouv.fr - Octroi de mer", url: "https://www.douane.gouv.fr/lexique/octroi-de-mer" },
          { label: "Legifrance - Loi n° 2004-639 du 2 juillet 2004", url: "https://www.legifrance.gouv.fr/loi/id/JORFTEXT000000625983" },
          { label: "Legifrance - Loi n° 2026-103 du 19 fevrier 2026", url: "https://www.legifrance.gouv.fr" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-octroi-de-mer" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
