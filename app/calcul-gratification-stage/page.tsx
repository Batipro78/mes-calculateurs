import type { Metadata } from "next";
import CalculateurGratificationStage from "./CalculateurGratificationStage";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-gratification-stage" },
  title: "Calcul Gratification Stage 2026 - Montant Minimum et Total",
  description:
    "Calculez la gratification de stage 2026 : montant mensuel, total, minimum legal (4,35€/h). Stage obligatoire ou facultatif, exoneration charges.",
  keywords:
    "gratification stage 2026, calcul gratification stage, montant minimum stage, indemnite stage, stage remuneration, gratification obligatoire stage",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Comment se calcule la gratification minimale ?",
    paras: [
      "Le minimum légal correspond à 15 % du plafond horaire de la Sécurité sociale, multiplié par le nombre d'heures de présence effective du stagiaire. En 2026, cela représente 4,35 € par heure. Ce taux est revalorisé chaque année avec le plafond de la Sécurité sociale.",
      "Deux méthodes de versement existent. Au réel : on multiplie 4,35 € par le nombre exact d'heures effectuées dans le mois (qui varie selon les mois). Au lissé : on calcule une mensualité moyenne constante sur la base de 151,67 heures par mois pour un temps plein, soit environ 660 € par mois.",
    ],
  },
  {
    title: "Stage obligatoire ou facultatif : la règle des 2 mois",
    paras: [
      "La gratification devient obligatoire dès que la durée du stage dépasse 2 mois, consécutifs ou non, au cours d'une même année d'enseignement. En pratique, ce seuil correspond à plus de 44 jours de présence (sur une base de 7 heures par jour) ou plus de 308 heures.",
      "En dessous de ce seuil, l'organisme d'accueil n'est pas tenu de verser une gratification, mais il peut le faire volontairement. Le décompte se fait en heures de présence réelle, pas en jours calendaires.",
    ],
  },
  {
    title: "Les avantages en plus de la gratification",
    paras: [
      "Le stagiaire n'est pas un salarié, mais il bénéficie de plusieurs droits proches. L'organisme d'accueil doit prendre en charge 50 % de ses frais de transport en commun domicile-lieu de stage, comme pour les salariés.",
      "Le stagiaire a aussi accès au restaurant d'entreprise ou aux titres-restaurant dans les mêmes conditions que le personnel. Pour les stages de plus de 2 mois, la convention doit prévoir des autorisations d'absence ou des congés.",
    ],
  },
  {
    title: "La gratification est-elle imposable ?",
    paras: [
      "Bonne nouvelle pour les étudiants : la gratification de stage est exonérée d'impôt sur le revenu dans la limite du montant annuel du SMIC. Tant que le total perçu sur l'année reste sous ce plafond, il n'y a rien à déclarer.",
      "Cette exonération s'applique automatiquement. Seule la part éventuellement supérieure au SMIC annuel serait imposable, ce qui reste très rare pour un stage.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le montant minimum de la gratification de stage en 2026 ?",
    a: "En 2026, la gratification minimale est de 4,35 € par heure de présence effective (15 % du plafond horaire de la Sécurité sociale). Pour un stage à temps plein (35 h/semaine, soit 151,67 h/mois), cela représente environ 660 € par mois.",
  },
  {
    q: "À partir de quelle durée la gratification est-elle obligatoire ?",
    a: "La gratification est obligatoire dès que le stage dépasse 2 mois consécutifs ou non sur une même année d'enseignement (soit plus de 44 jours de présence effective, ou 308 heures). En dessous de cette durée, elle est facultative.",
  },
  {
    q: "La gratification de stage est-elle imposable ?",
    a: "Non, dans la grande majorité des cas. La gratification de stage est exonérée d'impôt sur le revenu dans la limite du montant annuel du SMIC. Seule la part dépassant ce plafond serait imposable, ce qui est rare.",
  },
  {
    q: "Le stagiaire a-t-il droit aux transports et aux tickets restaurant ?",
    a: "Oui. L'organisme d'accueil doit rembourser 50 % des frais de transport en commun, comme pour un salarié. Le stagiaire accède aussi au restaurant d'entreprise ou aux titres-restaurant dans les mêmes conditions que le personnel.",
  },
  {
    q: "La gratification de stage est-elle soumise à des cotisations sociales ?",
    a: "La gratification de stage est exonérée de cotisations sociales dans la limite du montant minimum légal (4,35 €/h en 2026). Au-delà de ce seuil, la partie excédentaire est soumise aux cotisations patronales et salariales dans les conditions de droit commun.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Gratification Stage" />
      <Breadcrumb currentPage="Gratification Stage" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🎓</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Gratification Stage 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez votre gratification de stage : montant mensuel, total et minimum legal.</p>
      <CalculateurGratificationStage />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Regles de la gratification de stage</h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-indigo-50/50 rounded-xl p-4">
            <p className="font-semibold text-indigo-700">Stage &le; 2 mois</p>
            <p className="text-sm text-slate-600">Gratification facultative</p>
          </div>
          <div className="bg-indigo-50/50 rounded-xl p-4">
            <p className="font-semibold text-indigo-700">Stage &gt; 2 mois</p>
            <p className="text-sm text-slate-600">Gratification obligatoire (min 4,35 &euro;/h)</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau par duree (35h/semaine, minimum legal)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensuel</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Total</th>
            </tr></thead>
            <tbody>
              {[1,2,3,4,5,6].map((m) => {
                const hMois = 35 * 52 / 12;
                const mensuel = 4.35 * hMois;
                return (
                  <tr key={m} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700">{m} mois</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-indigo-600">{mensuel.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} &euro;</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{(mensuel * m).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} &euro;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
        name="Calculer la gratification de stage"
        steps={[
          { name: "Saisir la durée du stage et le temps de travail hebdomadaire", text: "Entrer la date de debut, la date de fin et le nombre d'heures par semaine (ex. 35h). Le calculateur convertit automatiquement la durée en heures de presence effective." },
          { name: "Vérifier le seuil d'obligation légale", text: "Si la durée depasse 2 mois consecutifs ou non sur une même année d'enseignement (soit plus de 308 heures de presence), la gratification est obligatoire. En dessous, elle est facultative." },
          { name: "Appliquer le taux minimum légal 2026", text: "Gratification minimale 2026 = 4,35 EUR par heure de presence (15 % du plafond horaire de la Sécurité sociale). Pour un temps plein de 35h/semaine (151,67 h/mois), cela donne environ 660 EUR par mois." },
          { name: "Lire le montant mensuel et le total verse", text: "Le simulateur affiche la gratification mensuelle et le montant total sur la durée. La gratification est exoneree d'impôt dans la limite du SMIC annuel et exoneree de cotisations sociales jusqu'au minimum légal." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La gratification de stage est obligatoire au-dela de 2 mois de stage. Son minimum legal correspond a un pourcentage du plafond horaire de la Securite sociale par heure de presence. Le simulateur applique ce minimum en vigueur.`}
        sources={[
          { label: "Service-Public.fr - Gratification de stage", url: "https://www.service-public.fr/particuliers/vosdroits/F32131" },
          { label: "Legifrance - Code de l'education", url: "https://www.legifrance.gouv.fr" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-gratification-stage" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
