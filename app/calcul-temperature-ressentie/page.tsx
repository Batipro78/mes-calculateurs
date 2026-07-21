import type { Metadata } from "next";
import TemperatureRessentie from "./TemperatureRessentie";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-temperature-ressentie" },
  title: "Temperature Ressentie & Humidex 2026 - Calcul Canicule",
  description:
    "Calculez la temperature ressentie selon la chaleur et l'humidite (indice Humidex). Niveau de danger canicule, effet reel d'un ventilateur, conseils. Gratuit.",
  keywords:
    "temperature ressentie, humidex, calcul canicule, indice de chaleur, ressenti chaleur humidite, danger canicule, ventilateur chaleur, coup de chaleur",
};

const ECHELLE = [
  { plage: "Moins de 30", label: "Confortable", desc: "Peu d'inconfort lie a la chaleur", cls: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { plage: "30 a 39", label: "Inconfort", desc: "Chaleur marquee, prudence", cls: "bg-amber-50 border-amber-200 text-amber-700" },
  { plage: "40 a 45", label: "Inconfort intense", desc: "Eviter les efforts, s'hydrater", cls: "bg-orange-50 border-orange-200 text-orange-700" },
  { plage: "46 a 53", label: "Danger", desc: "Risque de coup de chaleur", cls: "bg-red-50 border-red-200 text-red-700" },
  { plage: "54 et plus", label: "Danger extreme", desc: "Urgence, coup de chaleur probable", cls: "bg-red-100 border-red-300 text-red-900" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que la temperature ressentie ?",
    a: "La temperature ressentie est la temperature que percoit reellement le corps, qui differe de la temperature affichee par le thermometre. En ete, l'humidite la fait grimper : plus l'air est humide, moins la transpiration s'evapore, et plus on a chaud. C'est ce que mesure l'indice Humidex.",
  },
  {
    q: "Comment est calcule l'indice Humidex ?",
    a: "L'Humidex combine la temperature de l'air et l'humidite relative. La formule est Humidex = T + 0,5555 x (e - 10), ou e est la pression de vapeur d'eau calculee a partir de l'humidite. Par exemple, 34 degres avec 55 % d'humidite donne un Humidex d'environ 45, soit un inconfort intense.",
  },
  {
    q: "Un ventilateur fait-il vraiment baisser la temperature ?",
    a: "Non. Un ventilateur ne refroidit pas l'air de la piece (il le rechauffe meme tres legerement). Il cree un courant d'air qui aide la transpiration a s'evaporer, ce qui procure une sensation de fraicheur d'environ 3 a 4 degres sur la peau. Mais au-dela de 37 degres, l'air brasse devient plus chaud que la peau : le ventilateur n'aide plus et peut accentuer la deshydratation.",
  },
  {
    q: "A partir de quelle temperature ressentie y a-t-il un danger ?",
    a: "Un Humidex superieur a 40 signale un inconfort intense, et au-dela de 45-46 le risque de coup de chaleur devient serieux, surtout pour les personnes agees, les enfants et lors d'efforts physiques. A partir de 54, le danger est extreme. Suivez toujours les bulletins de vigilance de Meteo-France.",
  },
  {
    q: "Pourquoi a-t-on plus chaud quand il y a de l'humidite ?",
    a: "Le corps se refroidit en transpirant : la sueur s'evapore et evacue la chaleur. Quand l'air est deja sature en humidite, cette evaporation est freinee, la chaleur reste piegee dans le corps et la sensation d'etouffement augmente. C'est pourquoi 32 degres dans un air humide peuvent etre plus penibles que 36 degres dans un air sec.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd
        name="Calcul Temperature Ressentie"
        description="Calcul de la temperature ressentie (Humidex) et du niveau de danger canicule"
        category="HealthApplication"
      />
      <Breadcrumb currentPage="Temperature Ressentie" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Temperature Ressentie &amp; Humidex</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Quelle chaleur ressent vraiment votre corps ? Calcul selon la temperature et l&apos;humidite, avec le
        niveau de danger et l&apos;effet reel d&apos;un ventilateur.
      </p>

      <TemperatureRessentie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pourquoi le ressenti depasse le thermometre</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La temperature affichee par un thermometre ne dit pas tout. Ce que votre corps ressent depend aussi de
          l&apos;<strong>humidite de l&apos;air</strong>. Plus l&apos;air est humide, plus la transpiration
          s&apos;evapore difficilement : la chaleur reste piegee dans le corps et la sensation d&apos;etouffement
          monte. C&apos;est exactement ce que mesure l&apos;<strong>indice Humidex</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Resultat : 32 &deg;C dans un air lourd et humide peuvent etre plus eprouvants que 36 &deg;C dans un air
          sec. C&apos;est pourquoi, en periode de canicule, on parle de temperature <strong>ressentie</strong>{" "}
          plutot que de la seule temperature de l&apos;air.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Echelle de danger (Humidex)</h2>
        <div className="space-y-2">
          {ECHELLE.map((e) => (
            <div key={e.plage} className={`flex items-center gap-4 rounded-xl border p-3 ${e.cls}`}>
              <span className="font-bold text-sm w-20 shrink-0">{e.plage}</span>
              <div>
                <p className="font-semibold text-sm">{e.label}</p>
                <p className="text-xs opacity-80">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Le ventilateur : ce qu&apos;il fait vraiment</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Contrairement a une idee recue, un ventilateur <strong>ne refroidit pas l&apos;air</strong> d&apos;une
          piece : son moteur le rechauffe meme tres legerement. Ce qu&apos;il fait, c&apos;est creer un courant
          d&apos;air qui accelere l&apos;evaporation de la sueur, d&apos;ou une sensation de fraicheur
          d&apos;environ <strong>3 a 4 &deg;C</strong> sur la peau.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Mais ce benefice a une limite : <strong>au-dela d&apos;environ 37 &deg;C</strong>, l&apos;air brasse
          devient plus chaud que la peau. Le ventilateur souffle alors de la chaleur sur le corps et accelere la
          deshydratation au lieu de soulager. Dans ce cas, mieux vaut un <strong>brumisateur</strong>, un linge
          humide sur la nuque, des volets fermes et de l&apos;ombre.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bien se proteger pendant une canicule</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Fermer volets et fenetres en journee, aerer la nuit quand l&apos;air est plus frais</li>
          <li>Boire regulierement sans attendre la soif (voir notre <a href="/calcul-consommation-eau" className="text-orange-600 hover:underline font-medium">calcul du besoin en eau</a>)</li>
          <li>Eviter les efforts et les sorties aux heures les plus chaudes (11h-17h)</li>
          <li>Se mouiller le corps (douche tiede, brumisateur, linge humide)</li>
          <li>Prendre des nouvelles des personnes agees, isolees ou fragiles</li>
          <li>Ne jamais laisser un enfant ou un animal dans une voiture, meme quelques minutes</li>
        </ul>
        <p className="text-slate-500 text-sm leading-relaxed">
          En cas de malaise, de maux de tete intenses ou de confusion, appelez le 15 (SAMU). Cet outil est
          indicatif et ne remplace pas les bulletins de vigilance de Meteo-France.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer la température ressentie (indice Humidex)"
        steps={[
          { name: "Saisir la température de l'air en degrés Celsius", text: "Entrer la température affichee par le thermometre (air sec). L'indice Humidex est pertinent principalement au-dessus de 25 degrés Celsius en période de chaleur estivale." },
          { name: "Renseigner le taux d'humidite relative (%)", text: "Indiquer l'humidite relative de l'air (0 à 100%). Plus l'air est humide, moins la transpiration s'evapore et plus la chaleur reste piegee dans le corps. Un taux supérieur à 60% amplifie fortement la sensation de chaleur." },
          { name: "Lire l'indice Humidex et le niveau de danger", text: "Formule : Humidex = T + 0,5555 x (e - 10), ou e est la pression de vapeur d'eau. Exemple : 34 degrés C avec 55% d'humidite -> Humidex environ 45. Niveaux : moins de 30 = confortable ; 30-39 = inconfort ; 40-45 = inconfort intense ; 46-53 = danger (coup de chaleur) ; 54 et plus = danger extreme." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`La temperature ressentie est estimee via l'indice Humidex, qui combine la temperature de l'air et la pression de vapeur d'eau (calculee a partir de l'humidite relative). L'effet du ventilateur est un ordre de grandeur du refroidissement cutane par evaporation, sans effet au-dela d'environ 37 degres.`}
        sources={[
          { label: "Sante publique France - Canicule et chaleur", url: "https://www.santepubliquefrance.fr" },
          { label: "Meteo-France - Vigilance canicule", url: "https://meteofrance.com" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-temperature-ressentie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
