import type { Metadata } from "next";
import CoutClimatisation from "./CoutClimatisation";
import { calculerCoutClim } from "./coutClimCalc";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/cout-climatisation" },
  title: "Cout d'une Climatisation 2026 : Prix par Jour, Mois et Modele",
  description:
    "Combien coute une climatisation ? Calculez le cout par jour, par mois et par ete selon le modele (mobile, split, reversible), la puissance et vos heures d'utilisation. Tarif EDF 2026.",
  keywords:
    "cout climatisation, combien coute une clim, prix clim par jour, consommation climatiseur, cout clim mois, climatiseur mobile cout, facture climatisation",
};

// Tableau comparatif : cout pour 8 h/jour au tarif EDF 2026.
const MODELES_TABLE = [
  { nom: "Mobile monobloc", froid: 2600, eer: 2.6 },
  { nom: "Split 9000 BTU (2,5 kW)", froid: 2500, eer: 3.4 },
  { nom: "Split 12000 BTU (3,5 kW)", froid: 3500, eer: 3.6 },
  { nom: "Reversible 18000 BTU (5 kW)", froid: 5000, eer: 3.8 },
  { nom: "Multi-split (7 kW)", froid: 7000, eer: 4.0 },
].map((m) => {
  const r = calculerCoutClim({ puissanceFroidW: m.froid, eer: m.eer, heuresJour: 8, prixKwh: 0.2516 });
  return { nom: m.nom, jour: r.coutJour, mois: r.coutMois };
});

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Combien coute une climatisation par jour ?",
    a: "Pour un split mural de 2,5 kW froid (9000 BTU, EER 3,4) utilise 8 heures par jour au tarif EDF 2026 (0,2516 EUR/kWh), comptez environ 1,50 EUR par jour. Un climatiseur mobile, moins efficace, revient plutot a 2 EUR par jour pour la meme duree. Le cout depend de la puissance, de l'efficacite (EER) et du nombre d'heures.",
  },
  {
    q: "Combien coute une clim par mois en ete ?",
    a: "En utilisant une clim split de 2,5 kW environ 8 heures par jour, la facture tourne autour de 45 EUR par mois. Pour un usage plus intensif (12 h/jour) ou un appareil plus puissant, elle peut depasser 80 a 100 EUR par mois. Sur un ete complet (3 mois), comptez en moyenne 130 a 300 EUR selon l'appareil et l'usage.",
  },
  {
    q: "Le climatiseur mobile coute-t-il plus cher qu'un split ?",
    a: "Oui, a confort egal. Le climatiseur mobile est moins efficace (EER souvent autour de 2,6 contre 3,4 a 4 pour un split) et son tuyau d'evacuation laisse rentrer de l'air chaud. Selon l'ADEME, un climatiseur mobile coute environ 140 EUR d'electricite par an, contre environ 8 EUR pour un simple ventilateur.",
  },
  {
    q: "Qu'est-ce que l'EER d'une climatisation ?",
    a: "L'EER (Energy Efficiency Ratio) est le rapport entre la puissance de froid produite et la puissance electrique consommee. Un EER de 3,4 signifie que l'appareil produit 3,4 kW de froid pour 1 kW d'electricite. Plus l'EER est eleve, moins la clim consomme. Le SEER est la version saisonniere, plus representative de l'usage reel.",
  },
  {
    q: "Comment reduire le cout de sa climatisation ?",
    a: "Reglez la temperature a 26 degres (passer de 23 a 26 degres divise la consommation par trois selon l'ADEME), fermez volets et fenetres en journee pour limiter les apports de chaleur, entretenez les filtres, ne climatisez que les pieces occupees et choisissez un modele classe A+++. Un bon dimensionnement evite aussi la surconsommation.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Cout Climatisation" />
      <Breadcrumb currentPage="Cout Climatisation" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💶
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Cout d&apos;une Climatisation 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Combien coute votre clim ? Estimez le prix par jour, par mois et par ete selon le modele, la puissance et
        vos heures d&apos;utilisation.
      </p>

      <CoutClimatisation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Cout moyen par type de climatiseur</h2>
        <p className="text-slate-600 mb-4 leading-relaxed text-sm">
          Estimation pour <strong>8 heures d&apos;utilisation par jour</strong> au tarif EDF 2026
          (0,2516 &euro;/kWh). Le cout reel varie selon la temperature de consigne et l&apos;isolation.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Modele</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Par jour</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Par mois</th>
              </tr>
            </thead>
            <tbody>
              {MODELES_TABLE.map((m) => (
                <tr key={m.nom} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{m.nom}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-sky-600">
                    {m.jour.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} &euro;
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {m.mois.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} &euro;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">De quoi depend le cout d&apos;une clim ?</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li><strong>La puissance froid</strong> (en W ou BTU) : plus elle est elevee, plus la consommation grimpe</li>
          <li><strong>L&apos;efficacite (EER / SEER)</strong> : un appareil A+++ consomme bien moins pour le meme froid</li>
          <li><strong>Le nombre d&apos;heures</strong> et la temperature de consigne : chaque degre de moins coute cher</li>
          <li><strong>Le prix du kWh</strong> : selon votre contrat et l&apos;option (Base ou Heures Creuses)</li>
          <li><strong>L&apos;isolation et l&apos;exposition</strong> du logement : une piece mal isolee fait tourner la clim en continu</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Avant d&apos;acheter : choisir la bonne puissance</h2>
        <p className="text-slate-600 leading-relaxed">
          Une clim surdimensionnee coute plus cher a l&apos;achat et a l&apos;usage, une clim trop faible tourne
          en continu sans rafraichir. Pour viser juste, utilisez notre{" "}
          <a href="/calcul-puissance-climatisation" className="text-sky-600 hover:underline font-medium">
            calcul de puissance de climatisation
          </a>
          . Et avant meme d&apos;allumer la clim, pensez aux gestes gratuits de notre guide{" "}
          <a href="/rafraichir-maison-sans-clim" className="text-cyan-600 hover:underline font-medium">
            rafraichir sa maison sans clim
          </a>
          .
        </p>
      </section>

      <HowToJsonLd
        name="Calculer le coût d'une climatisation"
        steps={[
          { name: "Relever la puissance", text: "Noter la puissance froid de la climatisation (en watts ou en BTU) et son coefficient d'efficacite EER." },
          { name: "Calculer la consommation", text: "Diviser la puissance froid par l'EER pour obtenir la puissance électrique, puis multiplier par le nombre d'heures d'utilisation." },
          { name: "Estimer le coût", text: "Multiplier la consommation en kilowattheures par le prix du kilowattheure de votre contrat." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Le cout est calcule a partir de la puissance electrique reellement consommee (puissance froid divisee par le coefficient d'efficacite EER), du nombre d'heures d'utilisation et du prix du kilowattheure. Les ordres de grandeur d'efficacite et de cout annuel s'appuient sur les donnees de l'ADEME.`}
        sources={[
          { label: "ADEME - Bien utiliser sa climatisation", url: "https://agirpourlatransition.ademe.fr" },
          { label: "Service-Public.fr - Energie et logement", url: "https://www.service-public.fr" },
        ]}
      />

      <RelatedCalculators currentSlug="/cout-climatisation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
