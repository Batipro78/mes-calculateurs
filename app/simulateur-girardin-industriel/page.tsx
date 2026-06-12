import type { Metadata } from "next";
import CalculateurGirardin from "./CalculateurGirardin";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-girardin-industriel" },
  title: "Simulateur Girardin Industriel 2026 - Reduction d'Impot Outre-Mer",
  description:
    "Calculez votre gain Girardin industriel 2026 : apport a verser, reduction d'impot obtenue, rendement net. Plafond 18 000 EUR, dispositif valable jusqu'en 2029.",
  keywords:
    "Girardin industriel, simulateur Girardin, reduction impot outre-mer, 199 undecies B, defiscalisation DOM-TOM, plafond niches fiscales, Girardin 2026",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "C'est quoi le Girardin industriel ?",
    a: "Le Girardin industriel est un dispositif de defiscalisation cree par l'article 199 undecies B du Code general des impots. Il permet a un investisseur de financer l'acquisition de materiel productif (machines, equipements) loue pendant 5 ans a des exploitants en outre-mer. En echange, l'investisseur obtient une reduction d'impot SUPERIEURE a son apport des l'annee suivante. C'est un investissement dit 'one-shot' et 'a fonds perdus' : l'investisseur ne recupere pas son capital, mais il recoit plus d'avantage fiscal qu'il n'a investi.",
  },
  {
    q: "Combien rapporte le Girardin industriel ?",
    a: "Le rendement d'une operation Girardin industriel est exprime en pourcentage et correspond a l'ecart entre l'apport verse et la reduction d'impot obtenue. Exemple : un rendement de 10 % signifie que pour 10 000 EUR apportes, vous obtenez 11 000 EUR de reduction d'impot, soit un gain net de 1 000 EUR. Les rendements proposes par les monteurs serieux varient generalement entre 7 % et 14 % selon le risque, la taille de l'operation et les garanties accordees.",
  },
  {
    q: "Quels sont les risques du Girardin industriel ?",
    a: "Le principal risque est la requalification fiscale : si l'exploitant ultramarin cesse son activite avant les 5 ans de location obligatoires, l'administration fiscale peut remettre en cause la reduction d'impot. L'investisseur devrait alors rembourser la reduction obtenue, majoree de penalites. Pour se proteger, il est indispensable de choisir un monteur dispose d'une garantie de bonne fin fiscale et financiere (G3F) avec un historique long (10 ans ou plus), et de ne jamais viser une reduction superieure a son impot reel.",
  },
  {
    q: "Quel est le plafond du Girardin industriel ?",
    a: "Le Girardin industriel beneficie d'un plafond specifique de 18 000 EUR par an pour les niches fiscales outre-mer. Ce plafond s'applique non pas a la totalite de la reduction, mais a la seule part NON retrocedee a l'exploitant local. Pour une operation 'de plein droit' (retrocession 56 %), la part comptee dans le plafond est de 44 % de la reduction, ce qui donne une reduction maximale d'environ 40 909 EUR. Pour une operation 'avec agrement' (retrocession 66 %), la part comptee est 34 %, soit une reduction maximale d'environ 52 941 EUR.",
  },
  {
    q: "Quand faut-il investir en Girardin industriel ?",
    a: "L'investissement doit etre realise avant le 31 decembre de l'annee N pour que la reduction s'impute sur l'impot du sur les revenus de cette meme annee N, paye en N+1. Par exemple, un investissement fait avant le 31 decembre 2026 reduit l'impot a payer en septembre 2027. Le dispositif est prorogu jusqu'au 31 decembre 2029 (loi de finances 2024).",
  },
  {
    q: "Qui peut profiter du Girardin industriel ?",
    a: "Tout contribuable fiscalement domicilie en France metropolitaine et soumis a l'impot sur le revenu peut investir en Girardin industriel. Il faut avoir un impot suffisant pour que l'operation soit interessante : en dessous de 3 000 EUR d'impot annuel, l'avantage net est trop faible pour justifier les frais et contraintes. Le dispositif est particulierement adapte aux contribuables dans les tranches a 30 %, 41 % ou 45 %.",
  },
  {
    q: "Quelle difference entre Girardin 'de plein droit' et 'avec agrement' ?",
    a: "Une operation 'de plein droit' concerne des programmes dont le montant total est inferieur a 300 000 EUR. La retrocession minimale a l'exploitant local est de 56 % de l'avantage fiscal. La part comptee dans le plafond de niches (18 000 EUR) est donc de 44 % de la reduction. Une operation 'avec agrement' depasse 300 000 EUR et necessite une autorisation prealable de l'administration. La retrocession monte a 66 %, ce qui abaisse la part dans le plafond a 34 % et permet d'atteindre une reduction maximale plus elevee (environ 52 941 EUR).",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Simulateur Girardin Industriel 2026"
        description="Calculateur de reduction d'impot Girardin industriel outre-mer"
        category="FinanceApplication"
      />
      <Breadcrumb currentPage="Simulateur Girardin Industriel" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏝️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Simulateur Girardin Industriel 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre gain Girardin : apport, reduction d&apos;impot et rendement net en quelques secondes.
      </p>

      <CalculateurGirardin />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Girardin industriel : reduction d&apos;impot one-shot en outre-mer</h2>

        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>Girardin industriel</strong> (article 199 undecies B du CGI) est un mecanisme de
          defiscalisation qui permet a un contribuable metropolitain de financer l&apos;acquisition de
          materiel productif (engins de chantier, equipements agricoles, materiel medical, vehicules
          utilitaires...) destine a etre loue pendant cinq ans a des entreprises implantees dans les
          departements et collectivites d&apos;outre-mer (DOM-COM). En echange de cet apport en capital,
          l&apos;investisseur obtient une <strong>reduction d&apos;impot superieure a son apport</strong> des
          l&apos;annee suivante. C&apos;est ce que les praticiens appellent un investissement
          <em> a fonds perdus</em> : vous ne recuperez pas votre capital, mais l&apos;avantage fiscal net
          compense largement la mise initiale.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemple chiffre complet</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Vous avez 10 000 EUR d&apos;impot a payer et vous investissez dans une operation Girardin
          de plein droit avec un rendement de 10 % :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Apport verse en 2026 : <strong>9 091 EUR</strong></li>
          <li>Reduction d&apos;impot obtenue en 2027 : <strong>10 000 EUR</strong></li>
          <li>Gain net immediat : <strong>909 EUR</strong> (equivalent a un placement a 10 % sur 1 an)</li>
          <li>Part comptee dans le plafond niches (44 %) : <strong>4 400 EUR</strong>, bien en dessous des 18 000 EUR</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Sur le plan comptable, l&apos;investisseur depense 9 091 EUR et recoit 10 000 EUR de reduction : il
          economise 909 EUR net. La performance est identique a un produit financier affichant 10 % de
          rendement annuel brut, mais sans risque de marche.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Plafonnement : 18 000 EUR et calcul de la reduction maximale</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le Girardin industriel beneficie d&apos;un <strong>plafond specifique de 18 000 EUR</strong> par foyer
          fiscal, distinct du plafond general de 10 000 EUR applicable aux autres niches fiscales.
          Ce plafond s&apos;applique uniquement a la <em>part non retrocedee</em> a l&apos;exploitant ultramarin :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Operation de plein droit</strong> (retrocession 56 %) : 44 % de la reduction entre dans le plafond — reduction max. environ <strong>40 909 EUR</strong></li>
          <li><strong>Operation avec agrement</strong> (retrocession 66 %) : 34 % de la reduction entre dans le plafond — reduction max. environ <strong>52 941 EUR</strong></li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Calendrier et duree du dispositif</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;investissement doit etre effectue avant le <strong>31 decembre de l&apos;annee N</strong>. La
          reduction s&apos;impute sur l&apos;impot du au titre des revenus de cette meme annee N, paye en
          septembre N+1. Le dispositif a ete prorogu par la loi de finances 2024
          jusqu&apos;au <strong>31 decembre 2029</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2 text-red-700">Risques : ne pas negliger les garanties</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-2">
            Le Girardin industriel est un investissement a risque. Le danger principal est
            la <strong>requalification fiscale</strong> : si l&apos;exploitant local cesse son activite avant
            la fin de la periode de location de 5 ans, l&apos;administration fiscale peut remettre en
            cause l&apos;avantage accorde. L&apos;investisseur doit alors rembourser la reduction, majoree
            de penalites et interets de retard — ce qui peut transformer un gain modeste en perte
            nette importante.
          </p>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            <li>Exiger une <strong>garantie de bonne fin fiscale et financiere (G3F)</strong> aupres du monteur</li>
            <li>Privilegier les monteurs avec un historique de plus de 10 ans sans sinistre</li>
            <li>Ne jamais viser une reduction superieure a votre impot reel</li>
            <li>Consulter un conseiller en gestion de patrimoine (CGP) independant</li>
            <li>Verifier que le monteur est inscrit a l&apos;ORIAS ou agere AMF</li>
          </ul>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Qui peut investir ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Tout contribuable domicilie fiscalement en France et soumis a l&apos;impot sur le revenu peut
          investir en Girardin industriel. Le dispositif est particulierement pertinent pour les foyers
          acquittant plus de 5 000 EUR d&apos;impot annuel. En dessous de ce seuil, les frais
          de montage et le risque residuel rendent l&apos;operation peu interessante.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Le simulateur calcule l'apport optimal en fonction de l'impot declare et du rendement propose par l'operation. La reduction d'impot est plafonnee au minimum entre l'impot reel et le maximum autorise par le plafond de niches outre-mer de 18 000 EUR (art. 199 undecies B CGI). L'apport est deduit par la formule : Apport = Reduction / (1 + rendement / 100). Le gain net est la difference entre la reduction et l'apport.`}
        sources={[
          {
            label: "BOFiP - Article 199 undecies B (Girardin industriel)",
            url: "https://bofip.impots.gouv.fr/bofip/6724-PGP.html",
          },
          {
            label: "Legifrance - Article 199 undecies B du CGI",
            url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006308032",
          },
          {
            label: "Loi de finances 2024 - Prorogation du dispositif jusqu'en 2029",
            url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048847702",
          },
        ]}
      />

      <RelatedCalculators currentSlug="/simulateur-girardin-industriel" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
