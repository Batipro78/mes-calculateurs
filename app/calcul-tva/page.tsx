import type { Metadata } from "next";
import CalculateurTVA from "./CalculateurTVA";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-tva" },
  title: "Calcul TVA 2026 - Convertisseur HT / TTC gratuit",
  description:
    "Calculez la TVA, le montant HT et TTC instantanement. Tous les taux francais : 20%, 10%, 5.5%, 2.1%. Formules, exemples chiffres, cas particuliers et FAQ.",
  keywords:
    "calcul TVA, HT TTC, convertisseur TVA, taux TVA France, TVA 20%, TVA 10%, TVA 5.5%, calculer la TVA, formule TVA",
};

// Toute la prose est en chaines JS (pas de texte JSX) pour eviter les
// problemes d'echappement (apostrophes, < >) au build.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Comment calculer la TVA : formules et exemples",
    paras: [
      "Le calcul de la TVA repose sur deux operations simples. Pour passer d'un prix hors taxes (HT) a un prix toutes taxes comprises (TTC), on multiplie le montant HT par 1 + le taux. Pour faire l'inverse, du TTC vers le HT, on divise le montant TTC par 1 + le taux.",
      "Exemple 1 (HT vers TTC, taux 20 %) : un produit a 100 EUR HT coute 100 x 1,20 = 120 EUR TTC. La TVA s'eleve donc a 20 EUR.",
      "Exemple 2 (TTC vers HT, taux 20 %) : une facture de 120 EUR TTC correspond a 120 / 1,20 = 100 EUR HT, soit 20 EUR de TVA.",
      "Exemple 3 (taux reduit 5,5 %) : un achat de 105,50 EUR TTC revient a 105,50 / 1,055 = 100 EUR HT. Le montant de TVA est de 5,50 EUR.",
      "Pour trouver uniquement le montant de TVA quand vous connaissez le HT, multipliez le HT par le taux : 100 EUR HT x 20 % = 20 EUR de TVA. Quand vous ne connaissez que le TTC, le montant de TVA est simplement la difference entre le TTC et le HT.",
    ],
  },
  {
    title: "Quel taux de TVA pour quel produit ou service ?",
    paras: [
      "Taux normal a 20 % : c'est le taux par defaut. Il s'applique a la grande majorite des biens et services (electronique, vetements, prestations de services, meubles, etc.).",
      "Taux intermediaire a 10 % : restauration, transports de voyageurs, hebergement hotelier, travaux d'amelioration et d'entretien d'un logement de plus de 2 ans, et certains produits agricoles.",
      "Taux reduit a 5,5 % : produits alimentaires de premiere necessite, energie (gaz, electricite sous conditions), livres, equipements pour personnes handicapees, travaux de renovation energetique, et billetterie de certains spectacles.",
      "Taux super reduit a 2,1 % : medicaments rembourses par la Securite sociale, presse, et certaines representations theatrales.",
    ],
  },
  {
    title: "HT, TTC et TVA : les definitions",
    paras: [
      "HT (hors taxes) : le prix du bien ou du service avant ajout de la TVA. C'est la base sur laquelle la taxe est calculee.",
      "TTC (toutes taxes comprises) : le prix final paye par le consommateur, TVA incluse. C'est ce montant qui figure sur le ticket de caisse.",
      "TVA (taxe sur la valeur ajoutee) : un impot indirect sur la consommation. L'entreprise la collecte aupres du client pour le compte de l'Etat, puis la reverse a l'administration fiscale.",
    ],
  },
  {
    title: "Cas particuliers a connaitre",
    paras: [
      "Franchise en base de TVA : certains professionnels, notamment les micro-entrepreneurs, ne facturent pas de TVA tant que leur chiffre d'affaires reste sous les seuils en vigueur. La mention « TVA non applicable, article 293 B du CGI » doit alors figurer sur leurs factures. Les seuils evoluant regulierement, verifiez les montants a jour sur impots.gouv.fr.",
      "Autoliquidation dans le BTP : en cas de sous-traitance dans le batiment, le sous-traitant facture en HT et c'est l'entreprise principale qui declare et paie la TVA. Le sous-traitant indique « autoliquidation » sur sa facture.",
      "Travaux dans un logement ancien : les travaux d'amelioration ou d'entretien dans un logement acheve depuis plus de 2 ans beneficient du taux de 10 %, et les travaux de renovation energetique du taux de 5,5 %, sous reserve d'une attestation remise a l'artisan.",
    ],
  },
  {
    title: "Erreurs frequentes a eviter",
    paras: [
      "Confondre une remise et la TVA : la TVA se calcule toujours sur le prix HT apres remise commerciale, pas avant.",
      "Appliquer le mauvais taux : un meme professionnel peut facturer plusieurs taux selon la nature des prestations (par exemple 10 % sur la main d'oeuvre et 20 % sur certaines fournitures).",
      "Calculer le HT en retirant simplement 20 % du TTC : c'est faux. Retirer 20 % de 120 EUR donne 96 EUR, alors que le vrai HT est 100 EUR. Il faut diviser par 1,20, pas soustraire 20 %.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quels sont les taux de TVA en France en 2026 ?",
    a: "La France applique 4 taux : 20 % (taux normal), 10 % (taux intermediaire pour la restauration, les transports et certains travaux), 5,5 % (taux reduit pour l'alimentation, l'energie et les livres) et 2,1 % (taux super reduit pour les medicaments rembourses et la presse).",
  },
  {
    q: "Comment calculer la TVA a partir du prix HT ?",
    a: "Multipliez le montant HT par le taux pour obtenir la TVA, puis ajoutez-la au HT pour le TTC. Exemple a 20 % : 100 EUR HT x 1,20 = 120 EUR TTC, soit 20 EUR de TVA.",
  },
  {
    q: "Comment retrouver le prix HT a partir du TTC ?",
    a: "Divisez le montant TTC par 1 + le taux. Pour un TTC de 120 EUR a 20 % : 120 / 1,20 = 100 EUR HT. Attention, il ne faut pas simplement soustraire 20 % du TTC.",
  },
  {
    q: "Le taux de TVA est-il le meme pour tous les produits ?",
    a: "Non. Le taux depend de la nature du bien ou du service : 20 % par defaut, mais 10 %, 5,5 % ou 2,1 % pour des categories specifiques comme la restauration, l'alimentation ou les medicaments.",
  },
  {
    q: "Un auto-entrepreneur doit-il facturer la TVA ?",
    a: "Pas tant qu'il reste sous les seuils de la franchise en base de TVA. Dans ce cas, il facture en HT avec la mention « TVA non applicable, article 293 B du CGI ». Au-dela des seuils, il devient redevable de la TVA.",
  },
  {
    q: "Quelle est la difference entre HT et TTC ?",
    a: "Le HT (hors taxes) est le prix avant TVA ; le TTC (toutes taxes comprises) est le prix final paye par le client, TVA incluse. La TVA est la difference entre les deux.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul TVA HT/TTC" />
      <Breadcrumb currentPage="Calcul TVA" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul TVA &mdash; HT / TTC 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre HT et TTC avec tous les taux de TVA francais.
        Resultat instantane.
      </p>

      <CalculateurTVA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Tableau des taux */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les taux de TVA en France (2026)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">20%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux normal
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Biens et services courants
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">10%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux intermediaire
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Restauration, transports, travaux
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">5,5%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux reduit
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Alimentation, energie, livres
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-emerald-600">2,1%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Taux super reduit
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Medicaments, presse, spectacles
            </p>
          </div>
        </div>
      </section>

      {/* Sections de contenu detaille (prose en chaines JS) */}
      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.paras.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <HowToJsonLd
        name="Calculer la TVA"
        steps={[
          { name: "Choisir le taux", text: "Choisir le taux de TVA applicable : 20 %, 10 %, 5,5 % ou 2,1 %." },
          { name: "Calculer la TVA", text: "Pour obtenir la TVA a partir d'un prix HT, multiplier le montant HT par le taux (par exemple HT multiplie par 0,20)." },
          { name: "Obtenir le TTC", text: "Ajouter la TVA au montant HT pour obtenir le prix TTC, ou diviser le TTC par (1 plus le taux) pour retrouver le HT." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      {/* Sources officielles */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-800 mb-2">
          Sources officielles
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Taux et regles de TVA :{" "}
          <a
            href="https://www.impots.gouv.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-emerald-600 hover:underline"
          >
            impots.gouv.fr
          </a>{" "}
          et{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-emerald-600 hover:underline"
          >
            service-public.fr
          </a>
          . Les seuils et taux sont susceptibles d&apos;evoluer ; verifiez
          toujours la valeur en vigueur a la date de votre operation.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-tva" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
