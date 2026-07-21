import type { Metadata } from "next";
import ConvertisseurLongueur from "./ConvertisseurLongueur";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/conversion-longueur" },
  title: "Conversion cm en Pouces et Pieds - Convertisseur Longueur",
  description:
    "Convertissez entre centimetres, pouces (inches), pieds (feet), metres et millimetres. Tableau de correspondance taille et equivalences. Gratuit.",
  keywords:
    "conversion cm en pouces, cm en inches, pouces en cm, pieds en cm, conversion longueur, taille en pieds, convertisseur taille, tableau conversion cm pouces",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Combien de cm dans un pouce ?",
    a: "1 pouce (inch) = 2,54 centimetres exactement. C'est une definition officielle depuis 1959. Pour convertir des pouces en cm, multipliez par 2,54.",
  },
  {
    q: "Combien de cm dans un pied ?",
    a: "1 pied (foot) = 30,48 centimetres = 12 pouces. Pour convertir des pieds en cm, multipliez par 30,48. Exemple : 6 pieds = 182,88 cm.",
  },
  {
    q: "Comment convertir sa taille en pieds et pouces ?",
    a: "Divisez votre taille en cm par 2,54 pour obtenir le total en pouces. Divisez ensuite par 12 : le quotient = pieds, le reste = pouces. Exemple : 175 cm = 68,9 pouces = 5 pieds 8,9 pouces (5'9\").",
  },
  {
    q: "A quoi servent les pouces dans la vie courante ?",
    a: "Les pouces sont utilises pour mesurer les diagonales d'ecrans (TV, smartphones, moniteurs), les tuyaux et visseries en bricolage, et les tailles de vetements aux Etats-Unis et au Royaume-Uni. Un ecran de 55 pouces fait 139,7 cm de diagonale.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Conversion Longueur" />
      <Breadcrumb currentPage="Conversion Longueur" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📏
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Conversion Longueur (cm / pouces / pieds)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez instantanement entre centimetres, pouces, pieds, metres et millimetres.
      </p>

      <ConvertisseurLongueur />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment convertir les longueurs ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le systeme <strong>metrique</strong> (metres, centimetres) est utilise en France et dans la quasi-totalite du monde.
          Le systeme <strong>imperial</strong> (pouces, pieds) est utilise aux Etats-Unis et au Royaume-Uni.
          La conversion entre ces systemes est frequente pour les tailles, les ecrans, le bricolage et les voyages.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Equivalences cles</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">cm → pouces</p>
            <p className="text-sm text-slate-600">Divisez par 2,54</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">pouces → cm</p>
            <p className="text-sm text-slate-600">Multipliez par 2,54</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">cm → pieds</p>
            <p className="text-sm text-slate-600">Divisez par 30,48</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 mb-1">pieds → cm</p>
            <p className="text-sm text-slate-600">Multipliez par 30,48</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tableau taille humaine (cm → pieds/pouces)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">cm</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Pieds/Pouces</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Pouces</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Metres</th>
              </tr>
            </thead>
            <tbody>
              {[150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200].map((cm) => {
                const totalIn = cm / 2.54;
                const ft = Math.floor(totalIn / 12);
                const inR = Math.round(totalIn % 12);
                return (
                  <tr key={cm} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 font-bold text-slate-700">{cm} cm</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-orange-600">{ft}&apos;{inR}&quot;</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{totalIn.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}&quot;</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{(cm / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} m</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Tailles d&apos;ecran en pouces</h3>
        <p className="text-slate-600 leading-relaxed">
          Les ecrans (TV, moniteurs, smartphones) sont mesures en pouces sur la diagonale.
          Un ecran de <strong>55 pouces</strong> fait 139,7 cm de diagonale.
          Un ecran de <strong>27 pouces</strong> fait 68,6 cm. Un smartphone de <strong>6,5 pouces</strong> fait 16,5 cm.
        </p>
      </section>

      <HowToJsonLd
        name="Convertir une longueur entre système metrique et imperial"
        steps={[
          { name: "Saisir la valeur et choisir l'unité source", text: "Entrer la mesure (ex. 175) et sélectionner l'unité d'entree parmi centimetres, pouces, pieds, mètres ou millimetres." },
          { name: "Appliquer la formule de conversion", text: "Le convertisseur applique les facteurs exacts : 1 pouce = 2,54 cm ; 1 pied = 30,48 cm. Pour 175 cm en pouces : 175 / 2,54 = 68,9 pouces." },
          { name: "Identifier la taille en pieds et pouces", text: "Diviser le total en pouces par 12 : le quotient = pieds, le reste = pouces. Ex. : 175 cm = 68,9 pouces = 5 pieds 8,9 pouces soit 5'9''." },
          { name: "Lire les équivalents dans toutes les unités", text: "Le résultat s'affiche simultanement en centimetres, pouces, pieds, mètres et millimetres. Un ecran de 55 pouces mesure par exemple 139,7 cm de diagonale." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/conversion-longueur" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
