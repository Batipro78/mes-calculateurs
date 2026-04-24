import type { Metadata } from "next";
import CalculateurGrossesse from "./CalculateurGrossesse";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-prise-poids-grossesse" },
  title: "Calcul Prise de Poids Grossesse 2026 - Recommandations IOM",
  description:
    "Calculez la prise de poids recommandee pendant votre grossesse selon votre IMC. Bareme officiel Institute of Medicine (IOM). Courbe semaine par semaine.",
  keywords:
    "prise de poids grossesse, calcul poids grossesse, IMC grossesse, kilos grossesse, prise poids enceinte, courbe poids grossesse",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien de kilos doit-on prendre pendant la grossesse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les recommandations de l'Institute of Medicine (IOM) 2009, reconnues internationalement, dependent de l'IMC avant grossesse : IMC < 18,5 (maigreur) : 12,5 a 18 kg ; IMC 18,5-25 (corpulence normale) : 11,5 a 16 kg ; IMC 25-30 (surpoids) : 7 a 11,5 kg ; IMC >= 30 (obesite) : 5 a 9 kg. Pour une grossesse gemellaire, ajouter environ 5 kg aux valeurs ci-dessus.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se repartit la prise de poids au fil des semaines ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Repartition typique : 1er trimestre (0-14 SA) : 1-2 kg (souvent peu voire perte due aux nausees). 2e trimestre (14-28 SA) : 4-6 kg. 3e trimestre (28 SA a l'accouchement) : 4-6 kg. La prise de poids s'accelere surtout a partir de 20 SA. Regle simple : environ 350-400 g par semaine au 2e et 3e trimestre.",
      },
    },
    {
      "@type": "Question",
      name: "Que faire si je prends trop de poids pendant ma grossesse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si la prise de poids depasse les recommandations : consultez votre sage-femme ou gynecologue pour ecarter un diabete gestationnel ou une retention d'eau. Ne faites JAMAIS de regime restrictif pendant la grossesse. Conseils : manger 3 repas + 2 collations equilibrees, privilegier legumes/proteines, eviter sucres rapides et plats transformes, marcher 30 min/jour, bien s'hydrater. L'excedent de poids augmente le risque de diabete gestationnel, hypertension et accouchement difficile.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi une prise de poids trop faible est-elle problematique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une prise de poids insuffisante (surtout avec un IMC initialement bas) augmente le risque de retard de croissance intra-uterin, de bebe de petit poids a la naissance (< 2,5 kg), d'accouchement premature et de difficultes d'allaitement. Si vous prenez peu de poids malgre une alimentation normale, consultez rapidement. Des nausees severes et persistantes (hyperemesis gravidarum) peuvent necessiter un traitement.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WebAppJsonLd name="Calcul Prise de Poids Grossesse" description="Calculateur poids grossesse IOM" category="HealthApplication" />
      <Breadcrumb currentPage="Calcul Prise de Poids Grossesse" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🤰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Prise de Poids Grossesse</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Evaluez votre prise de poids selon les recommandations officielles (IOM 2009) en fonction de votre IMC.
      </p>

      <CalculateurGrossesse />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Prise de poids grossesse : les reperes IOM</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>recommandations de l&apos;Institute of Medicine (IOM) 2009</strong>, adoptees par la Haute Autorite
          de Sante francaise, sont la reference internationale. Elles dependent de l&apos;IMC avant grossesse car le corps
          s&apos;adapte differemment selon la corpulence de depart.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Bareme selon IMC avant grossesse</h3>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-2 text-slate-500">Categorie IMC</th>
              <th className="text-right py-2 px-2 text-slate-500">Grossesse simple</th>
              <th className="text-right py-2 px-2 text-slate-500">Grossesse gemellaire</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">Maigreur (&lt; 18,5)</td><td className="py-2 px-2 text-right">12,5 - 18 kg</td><td className="py-2 px-2 text-right">15 - 20 kg</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">Normal (18,5 - 25)</td><td className="py-2 px-2 text-right">11,5 - 16 kg</td><td className="py-2 px-2 text-right">16,8 - 24,5 kg</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">Surpoids (25 - 30)</td><td className="py-2 px-2 text-right">7 - 11,5 kg</td><td className="py-2 px-2 text-right">14 - 22,7 kg</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-2">Obesite (&gt;= 30)</td><td className="py-2 px-2 text-right">5 - 9 kg</td><td className="py-2 px-2 text-right">11,3 - 19 kg</td></tr>
          </tbody>
        </table>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">A quoi sert la prise de poids ?</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">Repartition approximative des ~12 kg pris en grossesse simple (IMC normal) :</p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Bebe</strong> : 3,2 - 3,5 kg</li>
          <li><strong>Placenta</strong> : 0,6 - 0,7 kg</li>
          <li><strong>Liquide amniotique</strong> : 0,8 - 1 kg</li>
          <li><strong>Uterus</strong> : 1 kg (multiplie par 10 pendant la grossesse)</li>
          <li><strong>Seins</strong> : 0,4 - 0,5 kg</li>
          <li><strong>Sang et fluides</strong> : 1,5 - 2 kg</li>
          <li><strong>Reserves graisseuses maternelles</strong> : 2 - 3 kg (pour l&apos;allaitement)</li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">Signes d&apos;alerte</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li><strong>Prise &gt; 1 kg/semaine</strong> apres 20 SA : peut signaler du diabete gestationnel ou retention d&apos;eau</li>
          <li><strong>Perte de poids</strong> sauf premier trimestre (nausees) : consultez</li>
          <li><strong>Prise nulle plusieurs semaines</strong> au 3e trimestre : surveillance foetale</li>
          <li><strong>Gonflements</strong> brutaux (pieds, mains, visage) + prise rapide : suspicion de preeclampsie, URGENCE</li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-prise-poids-grossesse" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
