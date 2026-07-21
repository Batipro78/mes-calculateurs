import type { Metadata } from "next";
import CalculFTPCyclisme from "./CalculFTPCyclisme";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-ftp-cyclisme" },
  title:
    "Calcul FTP Cyclisme - W/kg, VAM, Niveau Cycliste, Test 20 Minutes",
  description:
    "Calculez votre FTP (Functional Threshold Power) via test 20 minutes. Déterminez vos watts par kilo (W/kg), votre niveau cycliste FFC et votre VAM (Vitesse Ascensionnelle Moyenne).",
  keywords:
    "calcul ftp cyclisme, watts par kilo, test 20 minutes, ftp watts, vam cyclisme, niveau cycliste pro, functional threshold power, w/kg strava, ffc catégorie",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que le FTP (Functional Threshold Power) ?",
    a: "Le FTP est la puissance maximale (en watts) qu'un cycliste peut maintenir pendant 1 heure. Il se calcule à partir d'un test de 20 minutes : FTP = puissance moyenne test 20 min × 0,95. Le FTP est la métrique clé pour calibrer les zones d'entraînement avec un capteur de puissance.",
  },
  {
    q: "Comment faire le test FTP 20 minutes ?",
    a: "Échauffement : 15 min progressif. Sortie : 2 séries de 2 min max (récupération 2 min entre). Puis 20 min à puissance maximale soutenable (effort homogène). Cool-down : 5 min endurance. Enregistrez la puissance moyenne des 20 min et appliquez la formule FTP = puissance × 0,95.",
  },
  {
    q: "Qu'est-ce que le W/kg (watts par kilo) ?",
    a: "Le W/kg est le FTP divisé par le poids corporel. C'est l'indicateur de puissance relative en montée. Plus le W/kg est élevé, plus le grimpeur est puissant. Un grimpeur Cat 1 FFC produit typiquement 4,5-5,0 W/kg, un pro World Tour 6,2+. Le W/kg est indépendant du poids, d'où son utilité pour comparer les cyclistes.",
  },
  {
    q: "Qu'est-ce que la VAM (Vitesse Ascensionnelle Moyenne) ?",
    a: "La VAM mesure la vitesse de montée en mètres par heure : VAM = (dénivelé m × 60) / temps minutes. Une VAM de 1200 m/h signifie que le cycliste gagne 1200 mètres d'altitude par heure de montée. C'est un bon indicateur sur Strava pour évaluer les performances en col.",
  },
  {
    q: "À quelle fréquence faire un test FTP ?",
    a: "Il est recommandé de faire un test FTP tous les 8 à 12 semaines. Un test trop fréquent est fatiguant et peu pertinent (les adaptations sont progressives). Un test tous les 2-3 mois permet de recalibrer les zones d'entraînement et de mesurer la progression.",
  },
];

export default function Page() {
  // Tableau W/kg homme
  const niveauxWpkHomme = [
    { wpk: 2.3, niveau: "Loisir / Débutant" },
    { wpk: 2.8, niveau: "Catégorie 5 (Pass'Cyclisme D2)" },
    { wpk: 3.3, niveau: "Catégorie 4 (Pass'Cyclisme D1)" },
    { wpk: 3.8, niveau: "Catégorie 3 (FFC)" },
    { wpk: 4.3, niveau: "Catégorie 2 (FFC)" },
    { wpk: 4.8, niveau: "Catégorie 1 (FFC)" },
    { wpk: 5.3, niveau: "Élite / Amateur très avancé" },
    { wpk: 5.9, niveau: "Pro Continental" },
    { wpk: 6.4, niveau: "Pro World Tour (Pogacar ~6,5)" },
  ];

  // Tableau W/kg femme
  const niveauxWpkFemme = [
    { wpk: 1.6, niveau: "Loisir / Débutant" },
    { wpk: 2.1, niveau: "Catégorie 5 (Pass'Cyclisme D2)" },
    { wpk: 2.6, niveau: "Catégorie 4 (Pass'Cyclisme D1)" },
    { wpk: 3.1, niveau: "Catégorie 3 (FFC)" },
    { wpk: 3.6, niveau: "Catégorie 2 (FFC)" },
    { wpk: 4.1, niveau: "Catégorie 1 (FFC)" },
    { wpk: 4.6, niveau: "Élite / Pro Continental" },
    { wpk: 5.2, niveau: "Pro World Tour" },
  ];

  // Tableau VAM
  const niveauxVAM = [
    { vam: 800, niveau: "Cyclotouriste" },
    { vam: 900, niveau: "Amateur entraîné" },
    { vam: 1100, niveau: "Pass'Cyclisme avancé" },
    { vam: 1300, niveau: "Cat 2-3 FFC" },
    { vam: 1500, niveau: "Cat 1-Élite" },
    { vam: 1700, niveau: "Pro" },
    { vam: 1900, niveau: "Pro World Tour en col HC" },
  ];

  return (
    <div>
      <WebAppJsonLd name="Calcul FTP Cyclisme et W/kg" />
      <Breadcrumb currentPage="Calcul FTP Cyclisme" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚴
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul FTP Cyclisme - W/kg et VAM
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre FTP (Functional Threshold Power) via test 20 minutes.
        Déterminez votre puissance relative (W/kg), votre niveau FFC et votre VAM
        en montée.
      </p>

      <CalculFTPCyclisme />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Guide test FTP */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Guide du test FTP 20 minutes
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">Échauffement</h3>
            <p className="text-sm text-slate-600 mb-4">
              15 minutes progressives pour monter en régime. Cœur préparé, jambes
              chaudes.
            </p>
            <p className="text-xs font-mono text-orange-600">
              Intensité : 50-70% FTP estimé
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">Effort 20 min max</h3>
            <p className="text-sm text-slate-600 mb-4">
              2 séries de 2 min max avant (décrassage), puis 20 min homogène à
              puissance maximale.
            </p>
            <p className="text-xs font-mono text-orange-600">
              Puissance : stable, effort maîtrisé
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">Cool-down</h3>
            <p className="text-sm text-slate-600 mb-4">
              5 minutes faciles pour revenir à la normale. Récupération passive.
            </p>
            <p className="text-xs font-mono text-orange-600">
              Intensité : 50-60% FTP
            </p>
          </div>
        </div>
      </section>

      {/* Tableau W/kg Homme */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau W/kg - Homme
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Consultez la puissance relative (W/kg) pour identifier votre niveau FFC
          et vos objectifs d&apos;entraînement.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  W/kg
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Catégorie / Niveau
                </th>
              </tr>
            </thead>
            <tbody>
              {niveauxWpkHomme.map((ref, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-orange-600">
                    {ref.wpk}
                  </td>
                  <td className="py-3 px-2 text-slate-700">{ref.niveau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tableau W/kg Femme */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau W/kg - Femme
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Standards féminins (décalage ~0,7 W/kg vs hommes). 4,5 W/kg femme = pro.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  W/kg
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Catégorie / Niveau
                </th>
              </tr>
            </thead>
            <tbody>
              {niveauxWpkFemme.map((ref, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-red-600">
                    {ref.wpk}
                  </td>
                  <td className="py-3 px-2 text-slate-700">{ref.niveau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tableau VAM */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau VAM - Vitesse Ascensionnelle Moyenne
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          VAM en mètres par heure pour évaluer votre performance en montée. Populaire
          sur Strava pour les segments de col.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  VAM (m/h)
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Niveau de performance
                </th>
              </tr>
            </thead>
            <tbody>
              {niveauxVAM.map((ref, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-emerald-600">
                    {ref.vam}
                  </td>
                  <td className="py-3 px-2 text-slate-700">{ref.niveau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Explications détaillées */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Explications et bonnes pratiques
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 mb-2">
              Formule FTP et facteur 0,95
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Le FTP (puissance 1h théorique) est estimé par FTP = puissance moyenne 20min × 0,95.
              Ce coefficient 0,95 tient compte de la fatigue accumulée durant un test maximum et
              projette la puissance soutenable 1h complète. La plupart des cyclistes ne peuvent
              pas maintenir 20 min max aussi longtemps que 1h, d&apos;où cet ajustement.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">
              W/kg vs FTP absolu
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Le FTP absolu (300 watts) dépend du poids. Un cycliste léger (60 kg) à 300W
              produit 5,0 W/kg (très performant), tandis qu&apos;un lourd (90 kg) produit 3,3 W/kg
              (Cat 3). Le W/kg nivelle le terrain et permet de comparer les grimpeurs indépendamment
              du poids.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">
              VAM et escalade
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              La VAM est l&apos;indicateur de montée pur. Un col de 1000 m franchi en 50 min = VAM
              1200 m/h. À 2000 m d&apos;altitude positive, vous pouvez situer votre niveau Strava
              et comparer avec les KOM (King of the Mountain). Attention : les VAM très élevées
              (1800+) concernent les pro sur col HC.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">
              Progression FTP et entraînement
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pour progresser en FTP, privilégier les entraînements au seuil (85-90% FTP) et le VO2max
              (100-110% FTP). Test FTP recommandé tous les 8-12 semaines. Une augmentation de +1% FTP
              par mois est solide. Associer à un poids stable ou en baisse pour optimiser le W/kg.
            </p>
          </div>
        </div>
      </section>

      <HowToJsonLd
        name="Calculer son FTP et ses watts par kilo en cyclisme"
        steps={[
          { name: "Realiser le test FTP 20 minutes", text: "Après 15 min d'echauffement et 2 sprints de 2 min, pedaler 20 min à puissance maximale soutenue et homogene. Enregistrer la puissance moyenne avec un capteur de puissance ou un home-trainer connecte." },
          { name: "Saisir la puissance moyenne du test et le poids corporel", text: "Entrer la puissance moyenne du test 20 min (watts) et le poids corporel en kg. Le FTP est calcule par FTP = puissance moyenne x 0,95 (le coefficient 0,95 compense la fatigue supplémentaire sur 1 heure complète)." },
          { name: "Lire le W/kg et le niveau FFC correspondant", text: "W/kg = FTP / poids corporel. Situer dans le tableau : 2,3 W/kg = debutant, 3,3 W/kg = Cat 4, 4,3 W/kg = Cat 2 FFC, 5,3 W/kg = Elite. Pogacar atteint environ 6,5 W/kg." },
          { name: "Consulter la VAM estimée pour les segments en montee", text: "La Vitesse Ascensionnelle Moyenne (VAM) est calculee à partir du FTP. Une VAM de 1 200 m/h correspond à un amateur confirme, 1 700 m/h à un pro. Utile pour analyser les segments Strava en col." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-ftp-cyclisme" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />

      {/* Disclaimer */}
      <p className="mt-12 text-xs text-slate-500 border-t border-slate-200 pt-6">
        Calcul basé sur les standards de puissance cyclisme d&apos;Andrew Coggan{" "}
        <em>(Training and Racing with a Power Meter)</em>. Sources officielles :{" "}
        <strong>Toutpourmasante.fr</strong>, <strong>incept-sport.com</strong>,{" "}
        <strong>FFC</strong>, <strong>Strava</strong>.
      </p>
    </div>
  );
}
