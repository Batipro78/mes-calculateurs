import type { Metadata } from "next";
import PuissanceClimatisation from "./PuissanceClimatisation";
import { calculerClim } from "./climatisationCalc";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-puissance-climatisation" },
  title: "Calcul Puissance Climatisation 2026 - BTU / kW pour X m2 + cout",
  description:
    "Quelle puissance de clim (BTU / kW) pour une piece de X m2 ? Calcul selon surface, isolation, exposition et etage, plus l'estimation du cout d'utilisation. Gratuit.",
  keywords:
    "puissance climatisation, quelle clim pour m2, calcul BTU climatisation, kW clim, dimensionnement climatisation, cout climatisation, clim canicule, climatiseur puissance",
};

// Tableau de reference : piece standard, plafond 2,5 m, exposition mixte, 2 occupants.
const SURFACES = [10, 15, 20, 25, 30, 40, 50];
const TABLE = SURFACES.map((s) => {
  const r = calculerClim({
    surface: s,
    hauteur: 2.5,
    isolation: "standard",
    exposition: "mixte",
    sousToit: false,
    occupants: 2,
    heuresJour: 0,
    prixKwh: 0,
    eer: 3.2,
  });
  return { surface: s, kw: r.recommandeW / 1000, btu: Math.round(r.puissanceBTU / 100) * 100 };
});

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quelle puissance de climatisation pour 20 m2 ?",
    a: "Pour une piece de 20 m2 avec une hauteur sous plafond standard (2,5 m), une isolation correcte et une exposition moyenne, il faut compter environ 2 200 W de puissance froid (environ 7 500 BTU) ; en pratique, on choisit le modele commercial juste au-dessus, autour de 2,5 kW. Ce chiffre augmente si la piece est sous les toits, plein sud ou mal isolee.",
  },
  {
    q: "Comment calculer la puissance d'une clim en BTU ?",
    a: "La regle usuelle est d'environ 100 W de puissance froid par m2 pour un plafond de 2,5 m et une isolation standard. On convertit ensuite les watts en BTU/h en multipliant par 3,412. Exemple : 2 000 W = environ 6 824 BTU/h. Il faut majorer pour les pieces sous les toits, tres ensoleillees ou mal isolees.",
  },
  {
    q: "De combien de degres une climatisation refroidit-elle une piece ?",
    a: "Une climatisation correctement dimensionnee peut maintenir une piece autour de 26 degres meme par 35 a 40 degres exterieurs. Pour des raisons de confort, de sante et de consommation, il est deconseille de descendre a plus de 5 a 7 degres sous la temperature exterieure. Une clim sous-dimensionnee, elle, n'atteindra jamais la consigne.",
  },
  {
    q: "Combien coute une climatisation par jour ?",
    a: "Pour une clim de 2,5 kW froid (EER 3,2) utilisee 8 heures par jour au tarif EDF 2026 (0,2516 EUR/kWh), comptez environ 1,60 EUR par jour, soit a peu pres 48 EUR par mois. Le cout depend surtout de la puissance, du nombre d'heures et de la temperature de consigne.",
  },
  {
    q: "Une clim trop puissante, est-ce un probleme ?",
    a: "Oui. Une clim surdimensionnee refroidit trop vite, s'arrete et redemarre sans cesse (cycles courts), ce qui use l'appareil, deshumidifie mal l'air et consomme plus. A l'inverse, une clim sous-dimensionnee tourne en continu sans jamais atteindre la consigne. Un bon dimensionnement est la cle.",
  },
  {
    q: "Climatisation mobile ou split mural : quelle difference de puissance ?",
    a: "A puissance affichee egale, un climatiseur mobile (monobloc) est moins efficace qu'un split mural, car le tuyau d'evacuation laisse entrer de l'air chaud. Pour un resultat equivalent, prevoyez une puissance superieure d'environ 20 a 30 % avec un modele mobile.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Puissance Climatisation" />
      <Breadcrumb currentPage="Puissance Climatisation" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ❄️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Puissance Climatisation 2026</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Quelle puissance de clim (kW / BTU) pour votre piece ? Dimensionnement selon surface, isolation et
        exposition, avec estimation du cout.
      </p>

      <PuissanceClimatisation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comment dimensionner sa climatisation ?</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Bien dimensionner sa climatisation est essentiel : <strong>trop faible</strong>, elle n&apos;arrive
          jamais a rafraichir ; <strong>trop puissante</strong>, elle s&apos;use vite et consomme pour rien. La
          regle de base est d&apos;environ <strong>100 W de puissance froid par m&sup2;</strong> pour un plafond
          standard de 2,5 m et une isolation correcte, puis on ajuste selon plusieurs facteurs.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Les facteurs qui augmentent le besoin</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Mauvaise isolation</strong> ou simple vitrage : jusqu&apos;a +25 %</li>
          <li><strong>Exposition plein sud</strong> ou grandes baies vitrees : +10 a +20 %</li>
          <li><strong>Piece sous les toits</strong> ou dernier etage : +15 %</li>
          <li><strong>Occupants nombreux</strong> et appareils degageant de la chaleur : +100 W environ par personne au-dela de 2</li>
          <li><strong>Plafond haut</strong> : le calcul se fait sur le volume, pas seulement la surface</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Puissance conseillee selon la surface</h2>
        <p className="text-slate-600 mb-4 leading-relaxed text-sm">
          Reperes pour une piece standard (plafond 2,5 m, isolation correcte, exposition moyenne, 2 occupants).
          A majorer selon votre situation.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Surface</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Puissance (kW)</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">En BTU/h</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row) => (
                <tr key={row.surface} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-700">{row.surface} m&sup2;</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-sky-600">
                    {row.kw.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kW
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {row.btu.toLocaleString("fr-FR")} BTU
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">De combien de degres refroidit-on vraiment ?</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          On imagine souvent qu&apos;une clim &laquo; descend la temperature de X degres &raquo;. En realite, une
          clim bien dimensionnee <strong>maintient une temperature de consigne</strong> (par exemple 26 &deg;C),
          meme quand il fait 35 a 40 &deg;C dehors. Le nombre de degres &laquo; gagnes &raquo; depend donc de la
          temperature exterieure et de la consigne choisie.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour le confort, la sante et la facture, l&apos;<strong>ecart conseille est de 5 a 7 &deg;C maximum</strong>{" "}
          sous la temperature exterieure. Descendre la piece a 19 &deg;C quand il fait 38 &deg;C dehors provoque
          des chocs thermiques et double presque la consommation. La bonne pratique : viser 26 &deg;C, fermer
          volets et fenetres en journee, et n&apos;allumer la clim que dans les pieces occupees.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer la puissance de sa climatisation"
        steps={[
          { name: "Mesurer le volume", text: "Multiplier la surface de la piece par la hauteur sous plafond pour obtenir le volume en metres cubes." },
          { name: "Appliquer le ratio", text: "Compter environ 100 watts de puissance froid par metre carre pour une isolation standard et un plafond de 2,5 metres." },
          { name: "Ajuster", text: "Majorer selon l'isolation, l'exposition au soleil, l'etage sous les toits et le nombre d'occupants." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La puissance froid est estimee a partir du volume de la piece (environ 100 W/m2 pour un plafond de 2,5 m et une isolation standard), majore selon l'isolation, l'exposition, l'etage et le nombre d'occupants. Le cout est estime via le coefficient d'efficacite (EER) et le tarif de l'electricite.`}
        sources={[
          { label: "ADEME - Se rafraichir sans (trop) consommer", url: "https://www.ademe.fr" },
          { label: "Service-Public.fr - Climatisation et reglementation", url: "https://www.service-public.fr" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-puissance-climatisation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
