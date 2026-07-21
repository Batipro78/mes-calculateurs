import type { Metadata } from "next";
import CalculDetteSommeil from "./CalculDetteSommeil";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-dette-sommeil" },
  title: "Calcul Dette de Sommeil - Cumul 7 à 14 jours (AASM, INSERM)",
  description:
    "Calculez votre dette de sommeil cumulée sur 7 à 14 jours. Évaluation légère, modérée ou sévère + conseils récupération (sieste 20 min, weekend +1h). Sources AASM et INSERM.",
  keywords:
    "dette de sommeil, calcul dette sommeil, cumul sommeil, manque de sommeil, fatigue chronique, recuperation sommeil, sieste reparatrice, AASM, INSERM",
  openGraph: {
    title: "Calcul Dette de Sommeil - 7 à 14 jours",
    description:
      "Évaluez votre dette de sommeil cumulée et obtenez des conseils de récupération.",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer ma dette de sommeil ?",
    a: "La dette de sommeil se calcule en soustrayant le total des heures dormies sur une période (7 à 14 jours) du total des heures idéales (besoin par nuit × nombre de jours). Exemple : besoin de 8h/nuit sur 7 jours = 56h idéales. Si vous avez dormi 49h au total, la dette est de 7h.",
  },
  {
    q: "Combien de temps faut-il pour récupérer une dette de sommeil ?",
    a: "Selon l'American Academy of Sleep Medicine (AASM), une dette légère (moins de 5h) se rattrape en 1 à 2 nuits prolongées ou avec des siestes de 20 minutes. Une dette modérée (5 à 10h) demande 1 à 2 semaines de récupération. Une dette sévère (plus de 10h) peut nécessiter plusieurs semaines et un avis médical.",
  },
  {
    q: "La sieste aide-t-elle à rattraper la dette de sommeil ?",
    a: "Oui. Une sieste courte de 20 minutes (avant 15h) améliore la vigilance et réduit partiellement la dette de sommeil sans perturber le sommeil nocturne. Les siestes longues (plus de 30 min) sont moins recommandées car elles provoquent une inertie du sommeil et désynchronisent l'horloge biologique.",
  },
  {
    q: "Peut-on rattraper le sommeil le week-end ?",
    a: "Partiellement. Dormir 1 à 2 heures de plus le week-end aide à réduire la dette accumulée en semaine, mais ne compense pas totalement les effets à long terme (immunité, mémoire, métabolisme). L'INSERM recommande surtout une régularité du coucher plutôt que des compensations massives le week-end.",
  },
  {
    q: "Quels sont les risques d'une dette de sommeil sévère ?",
    a: "Une dette de sommeil sévère (plus de 10h cumulées) augmente le risque d'accidents (multiplié par 4 en voiture en cas de somnolence), affaiblit le système immunitaire, dérègle le métabolisme du glucose, augmente le risque cardiovasculaire et perturbe l'humeur. Une consultation médicale est recommandée si la dette persiste.",
  },
  {
    q: "Quel est le besoin de sommeil selon l'âge ?",
    a: "Selon l'AASM : nourrissons (4-12 mois) 12-16h, enfants (6-12 ans) 9-12h, adolescents (13-18 ans) 8-10h, adultes (18-60 ans) 7-9h, seniors (+65 ans) 7-8h. Ces besoins varient selon les individus : certains adultes fonctionnent bien avec 6h, d'autres ont besoin de 9h.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Dette de Sommeil"
        category="HealthApplication"
      />
      <Breadcrumb currentPage="Dette de Sommeil" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          😴
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Dette de Sommeil
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Évaluez votre dette de sommeil accumulée sur 7 à 14 jours et recevez
        des conseils de récupération basés sur l&apos;AASM et l&apos;INSERM.
      </p>

      <CalculDetteSommeil />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que la dette de sommeil ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La dette de sommeil correspond à la différence cumulée entre votre
          besoin de sommeil idéal et le temps réellement dormi sur plusieurs
          jours. Selon l&apos;
          <strong>American Academy of Sleep Medicine (AASM)</strong> et l&apos;
          <strong>INSERM</strong>, un adulte a besoin de 7 à 9 heures de
          sommeil par nuit pour fonctionner de manière optimale.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Lorsque vous dormez moins que votre besoin physiologique pendant
          plusieurs nuits consécutives, vous accumulez une dette. Cette dette
          a des effets mesurables sur :
        </p>
        <ul className="text-slate-600 space-y-2 mb-4 ml-4 list-disc">
          <li>La vigilance et les performances cognitives (attention, mémoire)</li>
          <li>L&apos;humeur et la régulation émotionnelle</li>
          <li>Le système immunitaire</li>
          <li>Le métabolisme du glucose et la prise de poids</li>
          <li>Le risque cardiovasculaire (à long terme)</li>
        </ul>
      </section>

      <section className="mt-12 bg-indigo-50 border border-indigo-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">
          Les niveaux de dette de sommeil
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="font-bold text-green-900 mb-1">✅ Pas de dette (0h)</p>
            <p className="text-sm text-green-800">
              Vous dormez suffisamment. Maintenez vos habitudes : coucher et
              lever réguliers, chambre fraîche (18-19°C).
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-200">
            <p className="font-bold text-yellow-900 mb-1">
              😴 Légère (moins de 5h)
            </p>
            <p className="text-sm text-yellow-800">
              Récupération possible en 1 à 2 nuits prolongées ou par siestes
              courtes de 20 minutes.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <p className="font-bold text-orange-900 mb-1">
              😪 Modérée (5 à 10h)
            </p>
            <p className="text-sm text-orange-800">
              Effets cognitifs notables. Récupération sur 1 à 2 semaines
              avec week-ends prolongés (+1 à 2h) et siestes.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <p className="font-bold text-red-900 mb-1">
              ⚠️ Sévère (plus de 10h)
            </p>
            <p className="text-sm text-red-800">
              Risque pour la santé. Consultation médicale recommandée et
              routine stricte sur 2 à 4 semaines minimum.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Stratégies de récupération validées
        </h2>

        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <p className="font-bold text-slate-800">La sieste de 20 minutes</p>
            <p className="text-slate-600 text-sm mt-1">
              Programmée avant 15h, elle améliore la vigilance sans provoquer
              d&apos;inertie du sommeil. Idéale en complément d&apos;une nuit
              insuffisante.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Le rattrapage week-end</p>
            <p className="text-slate-600 text-sm mt-1">
              Dormir 1 à 2 heures de plus le samedi et le dimanche aide à
              réduire la dette accumulée. Attention à ne pas dépasser pour ne
              pas dérégler le rythme circadien.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-bold text-slate-800">L&apos;hygiène du sommeil</p>
            <p className="text-slate-600 text-sm mt-1">
              Horaires réguliers, pas d&apos;écran 1h avant le coucher, pas
              de caféine après 14h, chambre fraîche et sombre. La régularité
              prime sur la quantité ponctuelle.
            </p>
          </div>

          <div className="border-l-4 border-rose-500 pl-4 py-2">
            <p className="font-bold text-slate-800">Exposition à la lumière du jour</p>
            <p className="text-slate-600 text-sm mt-1">
              30 minutes de lumière naturelle le matin resynchronisent
              l&apos;horloge biologique et facilitent l&apos;endormissement
              le soir.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
        <p>
          <strong>Sources :</strong> American Academy of Sleep Medicine (AASM)
          - Recommandations sur la durée du sommeil chez l&apos;adulte ;
          INSERM (Institut national de la santé et de la recherche médicale)
          - Dossier d&apos;information Sommeil. Ce calculateur est indicatif
          et ne remplace pas un avis médical. Si la dette persiste ou
          s&apos;accompagne de troubles, consultez un médecin du sommeil.
        </p>
      </div>

      <HowToJsonLd
        name="Calculer sa dette de sommeil cumulee sur 7 à 14 jours"
        steps={[
          { name: "Saisir le besoin de sommeil personnel et la période", text: "Indiquer le besoin quotidien en heures de sommeil (7 à 9h pour un adulte selon l'AASM) et choisir la période d'evaluation : 7 ou 14 jours consecutifs." },
          { name: "Entrer les heures reellement dormies chaque nuit", text: "Renseigner pour chaque nuit le nombre d'heures dormies. Le deficit nocturne = besoin - heures dormies (nul si l'on a dormi plus que le besoin). Les deficits s'accumulent nuit après nuit." },
          { name: "Lire la dette cumulee et le niveau de severite", text: "La dette totale est la somme des deficits nocturnes. Inférieure à 5h : dette legere, recuperation en 1 à 2 nuits. De 5 à 10h : moderee, recuperation en 1 à 2 semaines avec siestes de 20 min. Supérieure à 10h : severe, consultation medicale recommandee." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-dette-sommeil" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
