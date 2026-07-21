import type { Metadata } from "next";
import CalculDateBarMitzvah from "./CalculDateBarMitzvah";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-date-bar-mitzvah" },
  title: "Calcul Date Bar/Bat Mitzvah - 13 ans hébraïque garçon, 12 ans fille",
  description:
    "Calculez la date de Bar Mitzvah (13 ans hébraïques) ou Bat Mitzvah (12 ans hébraïques). Majorité religieuse juive en calendrier hébraïque. Consensus toutes obédiences.",
  keywords:
    "date bar mitzvah, date bat mitzvah, 13 ans hébraïque, 12 ans hébraïque, majorité religieuse juive, calendrier hébraïque, bar mitzvah garçon, bat mitzvah fille",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quelle est la différence entre Bar Mitzvah et Bat Mitzvah ?",
    a: "Bar Mitzvah (garçon) marque la majorité religieuse à 13 ans révolus en années hébraïques. Bat Mitzvah (fille) la marque à 12 ans révolus. Cette distinction est commune à toutes les obédiences juives (orthodoxe, libérale, massorti, réformée). Le mot hébreu « bar » signifie « fils de » et « bat » signifie « fille de ».",
  },
  {
    q: "Pourquoi les Bar/Bat Mitzvah sont calculés en années hébraïques ?",
    a: "Le calendrier hébraïque est luni-solaire et est utilisé par la Torah et la tradition juive depuis l'Antiquité. L'âge religieux juif se compte en années hébraïques, pas grégoriennes. C'est pourquoi la date de Bar/Bat Mitzvah ne coïncide généralement pas avec l'anniversaire grégorien (décalage de 1-2 mois).",
  },
  {
    q: "Comment la date de Bar/Bat Mitzvah est-elle calculée ?",
    a: "On convertit la date de naissance grégorienne en calendrier hébraïque, on ajoute 13 ans (garçon) ou 12 ans (fille) à l'année hébraïque, puis on convertit cette nouvelle date hébraïque en calendrier grégorien. Le jour et le mois hébraïques restent identiques.",
  },
  {
    q: "Toutes les obédiences juives sont-elles d'accord sur ces âges ?",
    a: "Oui, le consensus est universel : 13 ans pour les garçons, 12 ans pour les filles. Cela s'applique pour l'orthodoxie, le courant libéral/réforme, le massorti et toutes les autres obédiences. C'est une majorité religieuse selon la Torah et reconnue par tous. Pour les cas particuliers (Adar I/II, conversion), consultez un rabbin.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Date Bar/Bat Mitzvah - Majorité Religieuse Juive" />
      <Breadcrumb currentPage="Calcul Date Bar/Bat Mitzvah" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📜
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Date Bar/Bat Mitzvah
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Majorité religieuse juive (13 ans hébraïque garçon, 12 ans fille).
        Calendrier hébraïque luni-solaire. Consensus toutes obédiences.
      </p>

      <CalculDateBarMitzvah />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Doctrine Bar/Bat Mitzvah
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          La majorité religieuse juive (Bar Mitzvah pour les garçons, Bat
          Mitzvah pour les filles) est définie par la Torah et reconnue par{" "}
          <strong>toutes les obédiences juives</strong> (orthodoxe, libérale,
          massorti, réformée). Ces âges marquent la responsabilité de l&apos;enfant
          devant les commandements religieux.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="font-bold text-blue-900 mb-2">Bar Mitzvah (Garçon)</p>
            <p className="text-sm text-blue-800">
              <strong>13 ans révolus</strong> en années hébraïques. Moment où
              l&apos;enfant devient responsable devant la Torah et devient
              « fils du Commandement » (« bar mitzvah »).
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="font-bold text-indigo-900 mb-2">
              Bat Mitzvah (Fille)
            </p>
            <p className="text-sm text-indigo-800">
              <strong>12 ans révolus</strong> en années hébraïques. Moment où
              l&apos;enfant devient responsable devant la Torah et devient
              « fille du Commandement » (« bat mitzvah »).
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Bar vs Bat Mitzvah
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Les deux termes hébreux désignent la majorité religieuse, avec une
          différence d&apos;âge selon le sexe. Cette distinction reflète une
          tradition ancienne et est appliquée uniformément dans toutes les
          communautés juives.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Bar Mitzvah</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Sexe&nbsp;:</strong> Garçon
              </li>
              <li>
                <strong>Âge religieux&nbsp;:</strong> 13 ans hébraïques révolus
              </li>
              <li>
                <strong>Date grégorienne&nbsp;:</strong> Généralement 1-2 mois
                après l&apos;anniversaire (décalage calendrier)
              </li>
              <li>
                <strong>Signification&nbsp;:</strong> « Fils du Commandement »
              </li>
              <li>
                <strong>Reconnaissance&nbsp;:</strong> Toutes obédiences
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Bat Mitzvah</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Sexe&nbsp;:</strong> Fille
              </li>
              <li>
                <strong>Âge religieux&nbsp;:</strong> 12 ans hébraïques révolus
              </li>
              <li>
                <strong>Date grégorienne&nbsp;:</strong> Généralement 1-2 mois
                après l&apos;anniversaire (décalage calendrier)
              </li>
              <li>
                <strong>Signification&nbsp;:</strong> « Fille du Commandement »
              </li>
              <li>
                <strong>Reconnaissance&nbsp;:</strong> Toutes obédiences
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Préparation et célébration
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          La préparation à la Bar/Bat Mitzvah commence généralement 1-2 ans
          avant la date officielle. L&apos;enfant reçoit une formation religieuse
          intensive (Torah, hebreu, liturgie) et apprend à diriger une partie de
          la prière de la synagogue (haftarah).
        </p>
        <div className="grid gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="font-semibold text-blue-900 mb-2">
              ✡️ Étapes typiques
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                <strong>1-2 ans avant&nbsp;:</strong> Inscription à une école
                juive ou cours de préparation.
              </li>
              <li>
                <strong>Apprentissage&nbsp;:</strong> Torah, Haftarah, prières,
                hebreu biblique.
              </li>
              <li>
                <strong>Discours&nbsp;:</strong> L&apos;enfant prépare un discours
                personnel sur sa responsabilité.
              </li>
              <li>
                <strong>Cérémonie&nbsp;:</strong> Lecture publique à la synagogue.
              </li>
              <li>
                <strong>Réception&nbsp;:</strong> Célébration familiale et
                communautaire.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi le calendrier hébraïque ?
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          La tradition juive utilise le calendrier hébraïque luni-solaire depuis
          l&apos;Antiquité. C&apos;est le calendrier prescrit par la Torah pour les
          fêtes religieuses et les commandements. L&apos;âge d&apos;une personne se
          compte donc en années hébraïques, d&apos;où le décalage avec l&apos;anniversaire
          grégorien.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">Calendrier hébraïque</p>
            <p className="text-sm text-slate-700">
              Luni-solaire, 354-355 jours (années régulières), 383-384 jours
              (années de Adar II). Années de Adar I ou II selon besoin.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">Calendrier grégorien</p>
            <p className="text-sm text-slate-700">
              Solaire, 365-366 jours. Utilisé dans la vie civile moderne en
              Occident depuis 1582.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">Conséquence</p>
            <p className="text-sm text-slate-700">
              1 année hébraïque ≈ 0.983 années grégoriennes. D&apos;où un décalage
              de 1-2 mois en général.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-blue-800 leading-relaxed mb-4">
          <strong>Consensus rabbinique toutes obédiences</strong> : Bar Mitzvah
          (garçon) à 13 ans hébraïques révolus, Bat Mitzvah (fille) à 12 ans
          hébraïques révolus. Cette règle s&apos;applique universellement dans
          l&apos;orthodoxie, le courant libéral/réforme, le mouvement massorti et
          toutes les autres obédiences juives.
        </p>
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Sources&nbsp;:</strong> Torah (Pentateuque), Talmud
          (enseignements rabbiniques), Torah-Box, Chabad.org, Chiourim.com,
          consensus rabbinique universel.
          <br />
          <strong>Cas particuliers&nbsp;:</strong> Adar I ou Adar II, conversions,
          ou questions spécifiques : consultez un rabbin de votre communauté.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer la date de Bar ou Bat Mitzvah en calendrier gregorien"
        steps={[
          { name: "Saisir la date de naissance et le sexe de l'enfant", text: "Entrer la date de naissance gregorienne de l'enfant et choisir le sexe : garcon pour un Bar Mitzvah (majorite à 13 ans hebraiques), fille pour une Bat Mitzvah (majorite à 12 ans hebraiques)." },
          { name: "Convertir la date de naissance en calendrier hebraique", text: "La date gregorienne est convertie en date hebraique (calendrier luni-solaire). Le jour et le mois hebraiques de naissance constituent la référence pour la date de majorite religieuse." },
          { name: "Ajouter 13 ou 12 ans hebraiques et reconvertir", text: "Pour un garcon, 13 années hebraiques sont ajoutees ; pour une fille, 12 années. Le jour et le mois hebraiques restent identiques. La date resultante est reconvertie en gregorien, avec un decalage habituel de 1 à 2 mois." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-date-bar-mitzvah" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
