import type { Metadata } from "next";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

const SOURCES = [
  { label: "ADEME - Canicule : garder son logement frais", url: "https://agirpourlatransition.ademe.fr/particuliers/proteger-sante/periode-canicule/canicule-comment-garder-logement-frais" },
  { label: "Sante publique France - Vivre avec la chaleur", url: "https://www.vivre-avec-la-chaleur.fr" },
  { label: "Ministere de la Transition ecologique - Canicule, les bons gestes", url: "https://www.ecologie.gouv.fr/actualites/canicule-vagues-chaleur-bons-gestes-adopter" },
  { label: "Ameli.fr - Que faire en cas de canicule", url: "https://www.ameli.fr/assure/sante/themes/canicule-chaleur/que-faire" },
];

export const metadata: Metadata = {
  alternates: { canonical: "/rafraichir-maison-sans-clim" },
  title: "Rafraichir sa Maison sans Clim : 12 Astuces Efficaces 2026",
  description:
    "Comment garder sa maison fraiche sans climatisation pendant la canicule ? Volets, ventilation nocturne, bon usage du ventilateur, plantes : les gestes efficaces et fiables (sources ADEME, Sante publique France).",
  keywords:
    "rafraichir maison sans clim, garder maison fraiche canicule, refroidir piece sans climatisation, astuces canicule logement, ventilateur canicule, lutter chaleur maison",
};

const COMPARATIF = [
  { geste: "Fermer volets & fenetres en journee", effet: "Tres efficace", cout: "Gratuit", c: "text-emerald-600" },
  { geste: "Ventiler la nuit (courant d'air)", effet: "Tres efficace", cout: "Gratuit", c: "text-emerald-600" },
  { geste: "Protections solaires exterieures claires", effet: "Tres efficace", cout: "€€", c: "text-emerald-600" },
  { geste: "Ventilateur + peau humide", effet: "Ressenti -2 a -4 °C", cout: "~8 €/an", c: "text-sky-600" },
  { geste: "Linge humide / glace devant ventilateur", effet: "Modere", cout: "Gratuit", c: "text-sky-600" },
  { geste: "Reduire appareils & cuisson", effet: "Modere", cout: "Gratuit", c: "text-sky-600" },
  { geste: "Arbres caducs / pergola (sud-ouest)", effet: "Tres efficace (durable)", cout: "€€€", c: "text-emerald-600" },
  { geste: "Isolation toiture / combles", effet: "Tres efficace (durable)", cout: "€€€", c: "text-emerald-600" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment garder sa maison fraiche sans climatisation ?",
    a: "La regle de base : bloquer la chaleur avant qu'elle n'entre. Fermez volets, stores et fenetres des le milieu de matinee et tant qu'il fait plus chaud dehors que dedans, puis ouvrez en grand la nuit et tot le matin pour faire entrer l'air frais. On complete avec un ventilateur bien utilise, la reduction des sources de chaleur internes (four, appareils) et, a plus long terme, des protections solaires exterieures et de la vegetation. Plus vous rafraichissez votre logement avant la canicule, plus vous gagnez en confort (source ADEME).",
  },
  {
    q: "Faut-il ouvrir ou fermer les fenetres pendant la canicule ?",
    a: "Tant que la temperature exterieure est superieure a celle de votre logement, gardez les fenetres fermees, volets et rideaux tires sur les facades ensoleillees. Ouvrez en grand uniquement quand l'air exterieur devient plus frais que l'interieur : tard le soir, la nuit et tot le matin. Dans une maison a etages, ouvrir en bas et en haut cree un effet cheminee qui evacue l'air chaud.",
  },
  {
    q: "Le ventilateur est-il efficace pendant une canicule ?",
    a: "Le ventilateur ne refroidit pas l'air : il cree un courant d'air qui aide la transpiration a s'evaporer, soit une sensation de fraicheur d'environ 2 a 4 °C sur la peau. Il est tres utile jusqu'a environ 35 a 37 °C. Au-dela, surtout en air sec, l'OMS rappelle qu'il peut devenir contre-productif : il souffle de l'air plus chaud que la peau et accelere la deshydratation. Astuce : humidifiez votre peau et placez une bouteille d'eau congelee ou un linge humide devant l'appareil.",
  },
  {
    q: "Les plantes rafraichissent-elles vraiment un logement ?",
    a: "Oui, modestement. Par evapotranspiration, les plantes degagent de l'humidite et abaissent un peu la temperature ambiante. Leur plus grand atout est a l'exterieur : des arbres a feuilles caduques ou une pergola vegetalisee plantes au sud et a l'ouest font de l'ombre sur les murs et les fenetres l'ete, tout en laissant passer la lumiere l'hiver.",
  },
  {
    q: "Combien coute un ventilateur par rapport a une climatisation ?",
    a: "Selon l'ADEME, un ventilateur revient a environ 8 € d'electricite par an, contre environ 140 €/an pour un climatiseur mobile. Si vous utilisez une clim, reglez-la a 26 °C : passer de 23 a 26 °C divise la consommation par trois, et evite les ecarts thermiques brutaux avec l'exterieur.",
  },
  {
    q: "Quelle est la solution la plus efficace sur le long terme ?",
    a: "Empecher la chaleur d'atteindre le logement : isolation de la toiture et des combles (premiere source de surchauffe), volets ou stores exterieurs sur les fenetres exposees, protections solaires de couleur claire, et vegetalisation au sud et a l'ouest. Ces amenagements reduisent durablement la surchauffe, bien plus qu'aucune astuce ponctuelle.",
  },
];

export default function Page() {
  return (
    <div>
      <Breadcrumb currentPage="Rafraichir sa maison sans clim" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌬️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Rafraichir sa maison sans clim</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Les gestes efficaces et fiables pour garder son logement frais pendant la canicule, sans climatisation.
        Sources : ADEME, Sante publique France, OMS.
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">La regle d&apos;or : bloquer la chaleur avant qu&apos;elle n&apos;entre</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Une fois la chaleur entree dans un logement, elle est tres difficile a evacuer. Tout l&apos;enjeu est donc
          de l&apos;<strong>empecher d&apos;entrer</strong>. L&apos;ADEME le resume ainsi : plus vous rafraichissez
          votre logement avant la canicule et plus vite vous bloquez les entrees de chaleur, plus vous gagnez en
          confort.
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li>Fermez <strong>volets, stores et rideaux</strong> des le milieu de matinee, sur les facades exposees au soleil</li>
          <li>Tant qu&apos;il fait <strong>plus chaud dehors que dedans</strong>, gardez les fenetres fermees</li>
          <li>Privilegiez des protections <strong>exterieures</strong> (volets, brise-soleil) : elles arretent le soleil avant la vitre, bien plus efficacement qu&apos;un store interieur</li>
          <li>Choisissez des protections de <strong>couleur claire</strong> (blanc, beige) : elles renvoient la lumiere au lieu de l&apos;absorber</li>
          <li><strong>Anticipez</strong> : rafraichissez au maximum la nuit precedant l&apos;arrivee de la chaleur</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Ventiler la nuit, fermer le jour</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le rafraichissement gratuit le plus puissant, c&apos;est l&apos;air frais de la nuit. Ouvrez en grand
          <strong> tard le soir, la nuit et tot le matin</strong>, quand l&apos;air exterieur est plus frais que
          l&apos;interieur, puis refermez avant que la chaleur ne remonte.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour maximiser le balayage de l&apos;air, creez un <strong>courant d&apos;air traversant</strong> en
          ouvrant des fenetres sur deux facades opposees. Dans une maison a etages, ouvrir <strong>en bas et en
          haut</strong> en meme temps cree un effet cheminee : l&apos;air chaud, plus leger, s&apos;echappe par le
          haut et aspire l&apos;air frais par le bas. Un ventilateur place pres d&apos;une fenetre ouverte la nuit
          accelere encore le renouvellement de l&apos;air.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bien utiliser son ventilateur</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un ventilateur <strong>ne refroidit pas l&apos;air</strong> : il cree un courant qui aide la sueur a
          s&apos;evaporer, soit environ <strong>2 a 4 &deg;C de fraicheur ressentie</strong> sur la peau. Pour qu&apos;il
          serve vraiment :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mb-4">
          <li><strong>Humidifiez votre peau</strong> (brumisateur, linge humide) : l&apos;effet rafraichissant est decuple</li>
          <li>Placez une <strong>bouteille d&apos;eau congelee</strong> ou un linge humide devant le ventilateur</li>
          <li>Ne le laissez tourner que dans une <strong>piece occupee</strong> : il rafraichit les personnes, pas la piece</li>
          <li>Ne l&apos;enfermez pas dans une piece chaude fermee : la chaleur de son moteur s&apos;accumule</li>
        </ul>
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 leading-relaxed">
          <strong>Limite importante :</strong> au-dela d&apos;environ <strong>35 a 37 &deg;C</strong>, surtout en air
          sec, l&apos;OMS rappelle que le ventilateur peut devenir contre-productif. Il souffle un air plus chaud que
          la peau et accelere la deshydratation. A ces temperatures, privilegiez le brumisateur, le linge humide et
          l&apos;ombre.
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Rafraichir l&apos;air avec de l&apos;eau</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;evaporation de l&apos;eau absorbe de la chaleur : c&apos;est un climatiseur naturel. Sante publique
          France recommande plusieurs gestes simples :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5">
          <li>Suspendre un <strong>linge humide</strong> (une serviette de bain) devant une fenetre ouverte, et le re-mouiller des qu&apos;il seche</li>
          <li>Placer un <strong>pain de glace ou un sac de glacons</strong> dans un courant d&apos;air, devant un ventilateur</li>
          <li>Etendre son <strong>linge a l&apos;interieur</strong> : en sechant, il humidifie et rafraichit l&apos;air</li>
          <li>Passer une serpillere : l&apos;eau qui s&apos;evapore du sol rafraichit la piece (et evite de remettre la poussiere en suspension)</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Reduire les sources de chaleur internes</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Chaque appareil allume rechauffe votre interieur. En periode de forte chaleur :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5">
          <li>Evitez le <strong>four et les plaques de cuisson</strong> : privilegiez les repas froids</li>
          <li>Eteignez les appareils non essentiels (ordinateur, console, TV) et coupez les <strong>veilles</strong></li>
          <li>Remplacez les ampoules chaudes par des <strong>LED</strong>, qui degagent tres peu de chaleur</li>
          <li>Decalez lave-linge et lave-vaisselle a la nuit, et faites-les secher a l&apos;air libre</li>
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Les solutions durables (avant l&apos;ete suivant)</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les vrais leviers, ceux qui transforment un logement etouffant en logement supportable, demandent un peu
          d&apos;investissement mais agissent chaque ete :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5">
          <li><strong>Isoler la toiture et les combles</strong> : c&apos;est la premiere source de surchauffe d&apos;une maison</li>
          <li>Installer des <strong>volets ou stores exterieurs</strong> (bannes, brise-soleil orientables) sur les fenetres au sud et a l&apos;ouest</li>
          <li>Planter des <strong>arbres a feuilles caduques</strong> devant les facades sud et ouest : ombre l&apos;ete, lumiere l&apos;hiver</li>
          <li>Installer une <strong>pergola vegetalisee</strong> et preferer terrasses en bois ou gravillons au beton, qui stocke la chaleur</li>
          <li>Opter pour des <strong>revetements clairs</strong> en facade et en toiture (les surfaces claires renvoient le soleil)</li>
        </ul>
      </section>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tableau recapitulatif : efficacite et cout</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Geste</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Effet</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout</th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIF.map((row) => (
                <tr key={row.geste} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{row.geste}</td>
                  <td className={`py-2.5 px-2 font-medium ${row.c}`}>{row.effet}</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{row.cout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Et si vous envisagez une climatisation ?</h2>
        <p className="text-slate-600 leading-relaxed">
          Si la chaleur reste insupportable, une clim peut se justifier. Reglez-la a <strong>26 &deg;C</strong> :
          selon l&apos;ADEME, passer de 23 a 26 &deg;C divise la consommation par trois. Evitez les climatiseurs
          mobiles (environ 140 &euro;/an contre 8 &euro; pour un ventilateur) et choisissez un modele classe A+++.
          Pour choisir la bonne puissance, utilisez notre{" "}
          <a href="/calcul-puissance-climatisation" className="text-sky-600 hover:underline font-medium">
            calcul de puissance de climatisation
          </a>
          , et verifiez la{" "}
          <a href="/calcul-temperature-ressentie" className="text-orange-600 hover:underline font-medium">
            temperature ressentie
          </a>{" "}
          chez vous.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Protegez aussi votre sante</h2>
        <p className="text-slate-600 leading-relaxed">
          Rafraichir son logement va de pair avec les bons gestes pour le corps : buvez regulierement sans attendre
          la soif (voir notre{" "}
          <a href="/calcul-consommation-eau" className="text-blue-600 hover:underline font-medium">
            calcul du besoin en eau
          </a>
          ), mouillez-vous la peau, restez dans la piece la plus fraiche et prenez des nouvelles des personnes
          agees ou isolees. En cas de malaise, de confusion ou de maux de tete intenses, appelez le 15 (SAMU).
        </p>
      </section>

      <HowToJsonLd
        name="Rafraichir sa maison sans climatisation"
        steps={[
          { name: "Bloquer le soleil", text: "Fermer volets, stores et rideaux des le milieu de matinee sur les facades exposees au soleil." },
          { name: "Fermer le jour", text: "Garder les fenetres fermees tant que l'air est plus chaud dehors que dedans." },
          { name: "Ventiler la nuit", text: "Ouvrir en grand la nuit et tot le matin pour faire entrer l'air frais, en creant un courant d'air traversant." },
          { name: "Reduire la chaleur interne", text: "Eviter le four et les appareils energivores, couper les veilles, utiliser des ampoules LED." },
          { name: "Rafraichir le ressenti", text: "Utiliser un ventilateur avec la peau humide, et placer un linge humide ou de la glace dans le courant d'air." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Sources officielles</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Cet article s&apos;appuie sur les recommandations officielles de l&apos;ADEME, de Sante publique
          France, du ministere de la Transition ecologique et de l&apos;OMS concernant la protection des
          logements et des personnes face aux fortes chaleurs.
        </p>
        <ul className="space-y-1.5 mb-5">
          {SOURCES.map((s, i) => (
            <li key={i} className="text-slate-600 text-sm flex gap-2">
              <span className="text-blue-500" aria-hidden="true">
                &#8226;
              </span>
              <a
                href={s.url}
                target="_blank"
                rel="noopener nofollow"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-400">
          Article informatif redige a partir de sources publiques officielles. Derniere mise a jour : juin 2026.
        </p>
      </section>

      <RelatedCalculators currentSlug="/rafraichir-maison-sans-clim" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
