import type { Metadata } from "next";
import CalculateurLMNP from "./CalculateurLMNP";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-amortissement-lmnp" },
  title: "Calcul Amortissement LMNP 2026 - Regime Reel vs Micro-BIC",
  description:
    "Simulez l'amortissement de votre LMNP en regime reel. Calculez l'economie d'impot vs micro-BIC. Amortissement bien (30 ans) + mobilier (7 ans).",
  keywords:
    "amortissement LMNP, calcul LMNP reel, LMNP micro-BIC, regime reel LMNP, fiscalite LMNP, amortissement meuble non professionnel",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que l'amortissement en LMNP ?",
    a: "En LMNP (Location Meublee Non Professionnelle) regime reel, l'amortissement consiste a deduire chaque annee une fraction de la valeur du bien et du mobilier de vos revenus locatifs, comme le ferait une entreprise. Le bien immobilier (hors terrain) s'amortit typiquement sur 25 a 40 ans, le mobilier sur 5 a 10 ans. Cet amortissement est une charge non decaissable qui reduit le resultat fiscal et donc l'impot, tout en preservant votre tresorerie reelle.",
  },
  {
    q: "LMNP micro-BIC ou reel : lequel choisir ?",
    a: "Micro-BIC : abattement forfaitaire de 50% sur les loyers (71% si meuble de tourisme classe), simple mais souvent moins avantageux. Regime reel : vous deduisez les charges reelles + l'amortissement, ce qui efface souvent totalement l'impot sur les loyers. Regle simple : le reel est quasi TOUJOURS plus avantageux des que vos charges reelles (taxes, copro, interets, amortissement) depassent 50% des loyers (soit quasi tous les cas). Obligation de comptabilite en reel (logiciel ou expert-comptable).",
  },
  {
    q: "Quelle duree d'amortissement pour un bien LMNP ?",
    a: "Duree d'amortissement indicative LMNP (usage comptable francais) : Bien immobilier (hors terrain, non amortissable) : 25-40 ans (30 ans standard). Mobilier : 5-10 ans (lit, canape, table). Electromenager : 5-7 ans. Decoration/Linge : 5 ans. Gros oeuvre de renovation : 15-25 ans. Chaque composant peut etre amorti separement (methode dite 'par composants'). Un expert-comptable optimise la decomposition pour maximiser l'amortissement.",
  },
  {
    q: "L'amortissement peut-il creer un deficit fiscal en LMNP ?",
    a: "Non, en LMNP, l'amortissement ne peut PAS creer de deficit : il est plafonne au montant du resultat imposable (apres deduction des charges). La fraction non utilisee d'amortissement est reportable sans limite de temps, ce qui est tres avantageux : elle s'applique sur les benefices futurs. Contrairement au LMP (Loueur Meuble Professionnel), le deficit LMNP ne peut pas etre impute sur le revenu global.",
  },
  {
    q: "Quel est l'impact de l'amortissement LMNP sur la plus-value a la revente ?",
    a: "La regle a change avec la loi de finances pour 2025 : pour les ventes realisees depuis 2025, les amortissements deduits sont desormais reintegres dans le calcul de la plus-value de revente en LMNP (comme c'etait deja le cas en LMP), ce qui augmente la base imposable. Des exceptions subsistent pour certaines residences services (etudiantes, seniors, EHPAD). Avant 2025, ces amortissements n'etaient pas reintegres, ce qui constituait un avantage majeur du statut.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Amortissement LMNP" description="Simulateur LMNP regime reel" category="FinanceApplication" />
      <Breadcrumb currentPage="Calcul Amortissement LMNP" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Amortissement LMNP</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulez l&apos;amortissement LMNP regime reel et l&apos;economie fiscale vs micro-BIC.
      </p>

      <CalculateurLMNP />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">LMNP reel : le meilleur regime pour l&apos;immobilier locatif meuble</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>LMNP au reel</strong> est souvent le regime fiscal le plus avantageux pour un investissement locatif meuble.
          Grace a l&apos;<strong>amortissement comptable</strong>, vous pouvez souvent reduire votre imposition sur les loyers
          a ZERO pendant plusieurs annees, sans perdre de tresorerie reelle.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Comment calculer l&apos;amortissement ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">3 etapes :</p>
        <ol className="list-decimal list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Decomposer</strong> le prix d&apos;acquisition : terrain (non amortissable, ~10-20%), bien (amortissable), mobilier (amortissable plus rapidement)</li>
          <li><strong>Choisir les durees d&apos;amortissement</strong> : 30 ans pour le bien, 7 ans pour le mobilier (durees usuelles)</li>
          <li><strong>Calculer l&apos;annuite</strong> : valeur / duree = amortissement annuel deductible</li>
        </ol>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Exemple concret</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Bien a 200 000 EUR (dont 30 000 terrain) + 10 000 EUR mobilier, loyers 12 000 EUR/an, charges 3 500 EUR/an, TMI 30% :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Amortissement bien : 160 000 / 30 ans = <strong>5 333 EUR/an</strong></li>
          <li>Amortissement mobilier : 10 000 / 7 ans = <strong>1 429 EUR/an</strong></li>
          <li>Total amortissement : <strong>6 762 EUR/an</strong></li>
          <li>Resultat imposable : 12 000 - 3 500 - 6 762 = <strong>1 738 EUR</strong></li>
          <li>Impot annuel : 1 738 × (30% + 17,2%) = <strong>820 EUR</strong></li>
          <li>Micro-BIC : (12 000 × 50%) × 47,2% = <strong>2 832 EUR</strong></li>
          <li><strong>Gain avec le reel : ~2 000 EUR/an</strong></li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Avantages & limites</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-bold text-emerald-900 mb-2">Avantages</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>+ Reduction massive de l&apos;impot sur loyers</li>
              <li>+ Preservation de la tresorerie</li>
              <li>+ Report illimite des amortissements non utilises</li>
              <li>+ Statut LMNP accessible (loyers &lt; 23 000 EUR)</li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Limites</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>- Comptabilite obligatoire (expert-comptable conseille)</li>
              <li>- Cout comptable : 300-1 000 EUR/an</li>
              <li>- L&apos;amortissement ne cree pas de deficit</li>
              <li>- Impact sur plus-value en cas de revente</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Demarrer en LMNP reel : obligations et actualite 2026</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le regime reel offre de gros avantages fiscaux, mais il impose un cadre comptable plus strict que le
          micro-BIC. Voici l&apos;essentiel pour se lancer sans erreur.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les obligations a respecter</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Obtenir un numero SIRET en declarant l&apos;activite de loueur en meuble (formulaire P0i, dans les 15 jours suivant le debut de location)</li>
          <li>Tenir une comptabilite commerciale : amortissements, immobilisations, compte de resultat</li>
          <li>Teletransmettre chaque annee la liasse fiscale (formulaires 2031 et 2033) au service des impots</li>
          <li>Reporter le resultat sur la declaration de revenus (regime BIC, et non revenus fonciers)</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le recours a un <strong>expert-comptable specialise</strong> (300 a 1 000 &euro;/an) est vivement
          conseille ; ces honoraires sont eux-memes deductibles des loyers.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Nouveaute importante : reforme 2025</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La loi de finances pour 2025 a modifie un avantage historique du LMNP : pour les ventes realisees
          depuis 2025, <strong>les amortissements deduits sont desormais reintegres dans le calcul de la
          plus-value</strong> de revente (la base taxable augmente donc d&apos;autant). Certaines residences
          services (etudiantes, seniors, EHPAD) restent exonerees de cette reintegration. L&apos;avantage annuel
          de l&apos;amortissement reste entier ; c&apos;est surtout la fiscalite de sortie qui change.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">LMNP ou LMP : ou est la frontiere ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Vous restez en <strong>LMNP</strong> tant que vos recettes locatives meublees sont inferieures a
          23 000 &euro;/an, ou qu&apos;elles ne depassent pas les autres revenus d&apos;activite du foyer. Au-dela
          de ces deux seuils, vous basculez en <strong>LMP</strong> (Loueur Meuble Professionnel), avec des
          regles sociales et fiscales differentes (cotisations sociales, mais deficits imputables sur le revenu
          global).
        </p>
      </section>

      <HowToJsonLd
        name="Calculer l'amortissement LMNP en régime réel"
        steps={[
          { name: "Saisir le prix d'acquisition et la part terrain", text: "Entrer le prix total du bien, la part terrain non amortissable (typiquement 10 à 20%) et la valeur du mobilier. Seule la valeur hors terrain est amortissable." },
          { name: "Choisir les durées d'amortissement", text: "Appliquer 30 ans pour le bien immobilier (usage courant) et 7 ans pour le mobilier. L amortissement annuel = valeur amortissable / durée. Ex : 170 000 EUR / 30 = 5 667 EUR/an." },
          { name: "Comparer régime réel et micro-BIC", text: "En régime réel : résultat imposable = loyers - charges - amortissement. En micro-BIC : abattement forfaitaire de 50% sur les loyers. Retenir le régime qui reduit le plus l'impôt." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`En location meublee non professionnelle (LMNP) au regime reel, l'amortissement du bien et du mobilier se deduit des loyers, ce qui reduit fortement l'imposition. Le simulateur estime l'amortissement deductible et l'impact fiscal selon les composants amortis.`}
        sources={[
          { label: "Impots.gouv.fr - Location meublee (BIC)", url: "https://www.impots.gouv.fr/particulier/location-meublee" },
          { label: "Service-Public.fr - Location meublee", url: "https://www.service-public.fr/particuliers/vosdroits/F32744" },
        ]}
      />


      <RelatedCalculators currentSlug="/calcul-amortissement-lmnp" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
