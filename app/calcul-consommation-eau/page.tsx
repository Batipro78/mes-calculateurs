import type { Metadata } from "next";
import CalculateurConsommationEau from "./CalculateurConsommationEau";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-consommation-eau" },
  title: "Calcul Consommation Eau par Jour 2026 - Besoin Hydratation Gratuit",
  description:
    "Calculez votre besoin en eau quotidien gratuitement selon votre poids, activite physique et climat. Resultats instantanes en litres et verres. Repartition par moment de la journee.",
  keywords:
    "calcul consommation eau, besoin hydratation, eau par jour, combien boire eau, litre eau journalier, hydratation quotidienne, besoin eau corporel, eau poids kg",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Consommation Eau" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de litres d'eau faut-il boire par jour ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le besoin en eau varie selon le poids, l'activite physique et le climat. La formule de base est de 33 ml par kg de poids corporel. Pour une personne de 70 kg avec une activite moderee en climat tempere, le besoin est d'environ 2,8 litres par jour, soit environ 11 verres de 250 ml. Les femmes enceintes doivent ajouter 300 ml et les femmes qui allaitent 700 ml supplementaires.",
                },
              },
              {
                "@type": "Question",
                name: "La regle des 8 verres d'eau par jour est-elle valable ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La regle des 8 verres (2 litres) est une approximation valable pour une personne de 60 kg sedentaire en climat tempere. En realite, le besoin en eau depend du poids corporel (33 ml/kg), du niveau d'activite physique (jusqu'a +1,2 L pour un athlete), du climat (+0,5 a +1 L par forte chaleur) et de la grossesse ou l'allaitement. Un homme de 90 kg pratiquant un sport intensif aura besoin de 3,5 a 4 litres par jour.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les signes d'une mauvaise hydratation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les principaux signes de deshydratation sont : urine foncee (jaune fonce ou ambre), sensation de soif intense, maux de tete, fatigue et baisse de concentration, bouche seche, vertiges. Une baisse de seulement 1% de l'eau corporelle reduit les performances physiques de 10%. Une deshydratation de 2% affecte significativement les fonctions cognitives. Il est recommande de boire avant d'avoir soif, car la soif est un signal tardif.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Consommation Eau" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💧
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Consommation Eau 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre besoin exact en eau selon votre poids, activite physique
        et climat. Repartition optimale sur la journee.
      </p>

      <CalculateurConsommationEau />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi l&apos;hydratation est-elle essentielle ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le corps humain est compose a <strong>60 a 70 %</strong> d&apos;eau.
          L&apos;eau joue un role fondamental dans presque toutes les fonctions
          biologiques : regulation de la temperature corporelle, transport des
          nutriments, elimination des dechets, lubrification des articulations,
          et fonctionnement optimal du cerveau. Une hydratation insuffisante
          affecte les performances physiques et cognitives des les premiers signes
          de deficit.
        </p>
        <p className="text-slate-600 mb-6 leading-relaxed">
          L&apos;OMS recommande une consommation d&apos;eau adaptee au poids et aux
          conditions de vie. La formule de <strong>33 ml par kg de poids corporel</strong>{" "}
          est aujourd&apos;hui la reference la plus utilisee pour estimer les besoins
          de base, a laquelle s&apos;ajoutent des bonus selon l&apos;activite,
          le climat et les conditions particulieres.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Besoins en eau selon le poids (activite moderee, climat tempere)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Base (L)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Total moderement actif (L)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Verres (250 ml)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { poids: 50, base: 1.65, total: 2.15, verres: 9 },
                { poids: 60, base: 1.98, total: 2.48, verres: 10 },
                { poids: 70, base: 2.31, total: 2.81, verres: 12 },
                { poids: 80, base: 2.64, total: 3.14, verres: 13 },
                { poids: 90, base: 2.97, total: 3.47, verres: 14 },
                { poids: 100, base: 3.30, total: 3.80, verres: 16 },
              ].map((row) => (
                <tr key={row.poids} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">{row.poids} kg</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.base.toFixed(2).replace(".", ",")} L</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-blue-600">{row.total.toFixed(2).replace(".", ",")} L</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.verres} verres</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Signes d&apos;une mauvaise hydratation
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">Signes precoces</p>
            <ul className="text-xs text-red-600 mt-2 space-y-1 list-disc list-inside">
              <li>Soif intense</li>
              <li>Urine jaune fonce</li>
              <li>Bouche seche</li>
              <li>Fatigue inhabituelle</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-semibold text-orange-700 text-sm">Signes avances</p>
            <ul className="text-xs text-orange-600 mt-2 space-y-1 list-disc list-inside">
              <li>Maux de tete</li>
              <li>Baisse de concentration</li>
              <li>Vertiges, nausees</li>
              <li>Crampes musculaires</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="font-semibold text-blue-700 text-sm">Bon indicateur : couleur urine</p>
            <p className="text-xs text-blue-600 mt-2">
              Urine jaune pale = bien hydrate. Jaune fonce = boire plus.
              Incolore = peut-etre trop d&apos;eau (rare mais possible).
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">Hydratation optimale</p>
            <p className="text-xs text-green-600 mt-2">
              Buvez avant d&apos;avoir soif. La soif est un signal tardif.
              Espacez votre consommation sur toute la journee.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Facteurs augmentant les besoins en eau
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li>
            <strong>Activite physique intense</strong> : jusqu&apos;a +1,2 L/jour pour un
            athlete ou travailleur physique
          </li>
          <li>
            <strong>Chaleur et humidite</strong> : +0,5 a +1 L/jour en climat chaud
            ou tropical
          </li>
          <li>
            <strong>Grossesse</strong> : +300 ml/jour recommandes par l&apos;ANSES
          </li>
          <li>
            <strong>Allaitement</strong> : +700 ml/jour pour compenser la production
            de lait
          </li>
          <li>
            <strong>Maladie febrile</strong> : chaque degre de fievre au-dessus de
            37°C necessite 500 ml supplementaires
          </li>
          <li>
            <strong>Altitude</strong> : la respiration acceleree en altitude augmente
            les pertes hydriques
          </li>
        </ul>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-consommation-eau" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
