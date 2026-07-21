import type { Metadata } from "next";
import SigneAstrologiqueChinois from "./SigneAstrologiqueChinois";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/signe-astrologique-chinois" },
  title: "Signe Astrologique Chinois - Animal et Élément selon Année de Naissance",
  description:
    "Découvrez votre signe astrologique chinois et élément Wu Xing selon votre date de naissance. Rat, Buffle, Tigre, Dragon, Serpent, Cheval, Chèvre, Singe, Coq, Chien, Cochon. Compatibilité amoureuse.",
  keywords:
    "signe astrologique chinois, animal chinois, element wu xing, nouvel an chinois, horoscope chinois, zodiaque chinois, compatibilite astrologique",
};

// Prose en chaines JS (guillemets doubles) pour eviter tout probleme
// d'echappement d'apostrophes au build.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "La légende de la Grande Course : pourquoi cet ordre ?",
    paras: [
      "L'ordre des 12 animaux n'est pas arbitraire : il vient d'une légende célèbre, celle de la Grande Course. L'Empereur de Jade aurait convoqué tous les animaux et décidé que les douze premiers arrivés donneraient leur nom à une année, dans leur ordre d'arrivée.",
      "Le Rat, petit mais rusé, se fit porter sur le dos du Buffle pour traverser la rivière, puis sauta juste avant la ligne d'arrivée pour finir premier. Le Buffle termina deuxième, suivi du Tigre et du Lapin. Le Dragon, pourtant capable de voler, n'arriva que cinquième car il s'était arrêté pour aider des villageois.",
      "La légende explique aussi pourquoi le Chat ne figure pas dans le zodiaque chinois : le Rat aurait oublié (ou volontairement négligé) de le réveiller le jour de la course. C'est, dit-on, l'origine de l'inimitié entre le chat et le rat.",
    ],
  },
  {
    title: "Le cycle de 60 ans (Jia Zi) expliqué simplement",
    paras: [
      "Beaucoup pensent que le zodiaque chinois se limite à 12 animaux qui reviennent tous les 12 ans. En réalité, la tradition combine deux roues qui tournent ensemble : les 12 branches terrestres (les animaux) et les 10 troncs célestes (les 5 éléments, chacun en version yin et yang).",
      "Comme ces deux roues n'ont pas le même nombre de crans, il faut 60 ans pour qu'une combinaison animal + élément + polarité revienne exactement à l'identique. C'est ce qu'on appelle le cycle sexagésimal, ou Jia Zi.",
      "Concrètement : vous n'êtes pas seulement « Cheval », vous êtes « Cheval de Feu », « Cheval de Bois », etc. Un Cheval de Feu ne revient donc que tous les 60 ans. C'est pour cela que l'année de naissance complète (animal + élément) est bien plus précise que l'animal seul.",
    ],
  },
  {
    title: "Les triades de compatibilité (San He)",
    paras: [
      "L'astrologie chinoise regroupe les 12 animaux en 4 triades de 3 signes qui s'entendent naturellement. Les animaux d'une même triade partagent une façon de voir le monde et forment souvent des couples ou des amitiés solides.",
      "Triade 1 — les bâtisseurs : Rat, Dragon, Singe. Intelligents, ambitieux et orientés vers l'action, ils avancent vite et se stimulent mutuellement.",
      "Triade 2 — les penseurs : Buffle, Serpent, Coq. Patients, réfléchis et déterminés, ils valorisent la constance et la fiabilité.",
      "Triade 3 — les protecteurs : Tigre, Cheval, Chien. Indépendants, loyaux et idéalistes, ils défendent leurs proches et leurs convictions.",
      "Triade 4 — les diplomates : Lapin, Chèvre, Cochon. Sensibles, calmes et bienveillants, ils recherchent l'harmonie et fuient les conflits.",
    ],
  },
  {
    title: "Les oppositions à connaître (Liu Chong)",
    paras: [
      "À l'inverse des triades, chaque animal a un signe « opposé », situé exactement à six places de lui sur la roue. Ces paires sont réputées plus difficiles, car les deux signes ont des tempéraments contraires.",
      "Les six oppositions classiques sont : Rat et Cheval, Buffle et Chèvre, Tigre et Singe, Lapin et Coq, Dragon et Chien, Serpent et Cochon.",
      "Une opposition ne condamne pas une relation : elle indique simplement des différences de rythme et de valeurs qui demandent plus d'efforts et de communication pour être surmontées.",
    ],
  },
  {
    title: "Yin, Yang et le cycle des 5 éléments",
    paras: [
      "Chaque animal porte une polarité fixe : les animaux de rang impair (Rat, Tigre, Dragon, Cheval, Singe, Chien) sont yang (énergie active, extérieure) et ceux de rang pair (Buffle, Lapin, Serpent, Chèvre, Coq, Cochon) sont yin (énergie réceptive, intérieure).",
      "Les 5 éléments, eux, suivent deux cycles. Le cycle d'engendrement : le Bois nourrit le Feu, le Feu produit la Terre (cendres), la Terre engendre le Métal, le Métal porte l'Eau, et l'Eau fait pousser le Bois.",
      "Le cycle de domination, lui, décrit les tensions : le Bois épuise la Terre, la Terre absorbe l'Eau, l'Eau éteint le Feu, le Feu fait fondre le Métal, et le Métal coupe le Bois. Comprendre votre élément aide à situer vos forces et vos points de friction.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quand change le signe astrologique chinois ?",
    a: "Le signe astrologique chinois change au Nouvel An lunaire (entre janvier et février), pas au 1er janvier. Par exemple, si vous êtes né le 10 février 2024, vous appartenez à l'année 2023 (Lapin d'Eau), car le Nouvel An lunaire 2024 tombe le 10 février.",
  },
  {
    q: "Qu'est-ce que le cycle 60 ans en astrologie chinoise ?",
    a: "Le cycle 60 ans combine les 12 animaux du zodiaque avec les 5 éléments Wu Xing (Bois, Feu, Terre, Métal, Eau). Cette combinaison (12 × 5) crée 60 combinaisons uniques qui se répètent tous les 60 ans. Par exemple, le Rat de Métal revient tous les 60 ans.",
  },
  {
    q: "Quels sont les 12 animaux du zodiaque chinois ?",
    a: "Les 12 animaux du zodiaque chinois dans l'ordre sont : Rat, Buffle, Tigre, Lapin, Dragon, Serpent, Cheval, Chèvre, Singe, Coq, Chien et Cochon. Cet ordre est immuable depuis plus de 2000 ans.",
  },
  {
    q: "Comment fonctionne la compatibilité entre signes chinois ?",
    a: "L'astrologie chinoise repose sur les 'triades de compatibilité'. Chaque animal a une triade de 3 signes avec lesquels il s'entend naturellement. Par exemple, le Rat s'entend bien avec le Dragon et le Singe. Cette harmonie est basée sur les cycles lunaires et les éléments.",
  },
  {
    q: "Pourquoi le chat ne fait-il pas partie du zodiaque chinois ?",
    a: "Selon la légende de la Grande Course, le Rat n'a pas réveillé le Chat le jour où l'Empereur de Jade classait les animaux. Le Chat est arrivé trop tard et n'a pas obtenu de place. C'est l'explication traditionnelle de son absence, et de la rivalité entre le chat et le rat. À noter : le zodiaque vietnamien remplace le Lapin par le Chat.",
  },
  {
    q: "Quel est mon élément en astrologie chinoise ?",
    a: "Votre élément dépend du dernier chiffre de votre année lunaire de naissance : 0-1 = Métal, 2-3 = Eau, 4-5 = Bois, 6-7 = Feu, 8-9 = Terre. Combiné à votre animal, il précise votre profil. Notre calculateur le détermine automatiquement à partir de votre date de naissance.",
  },
  {
    q: "Quel animal est compatible avec le mien ?",
    a: "Le plus simple est de regarder votre triade. Rat, Dragon et Singe forment une triade ; Buffle, Serpent et Coq une autre ; Tigre, Cheval et Chien une troisième ; Lapin, Chèvre et Cochon la dernière. Les signes d'une même triade s'entendent naturellement, tandis que votre signe opposé (à 6 places sur la roue) demande plus d'efforts.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Signe Astrologique Chinois - Animal et Élément Wu Xing" />
      <Breadcrumb currentPage="Signe Astrologique Chinois" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-red-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🐉
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Signe Astrologique Chinois - Animal et Élément Wu Xing
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez votre animal chinois et votre élément selon votre date de
        naissance. Calcul basé sur le Nouvel An lunaire.
      </p>

      <SigneAstrologiqueChinois />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 12 animaux du zodiaque chinois
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le zodiaque chinois compte 12 animaux qui se succèdent dans un cycle
          immuable depuis plus de 2000 ans. Chaque animal représente des traits
          de caractère spécifiques.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Animal
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Emoji
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Traits principaux
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Rat", emoji: "🐀", traits: "Sociable, intelligent, curieux" },
                { name: "Buffle", emoji: "🐂", traits: "Travailleur, patient, fiable" },
                { name: "Tigre", emoji: "🐯", traits: "Courageux, charismatique, généreux" },
                { name: "Lapin", emoji: "🐰", traits: "Diplomate, paisible, élégant" },
                { name: "Dragon", emoji: "🐉", traits: "Charismatique, ambitieux, visionnaire" },
                { name: "Serpent", emoji: "🐍", traits: "Sage, intuitif, mystérieux" },
                { name: "Cheval", emoji: "🐴", traits: "Indépendant, énergique, optimiste" },
                { name: "Chèvre", emoji: "🐐", traits: "Artistique, gentille, créative" },
                { name: "Singe", emoji: "🐵", traits: "Intelligent, malicieux, adaptable" },
                { name: "Coq", emoji: "🐓", traits: "Honnête, perfectionniste, fier" },
                { name: "Chien", emoji: "🐕", traits: "Loyal, juste, protecteur" },
                { name: "Cochon", emoji: "🐷", traits: "Sincère, généreux, optimiste" },
              ].map((animal) => (
                <tr key={animal.name} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-semibold text-slate-700">
                    {animal.name}
                  </td>
                  <td className="py-3 px-2 text-2xl">{animal.emoji}</td>
                  <td className="py-3 px-2 text-slate-600 text-sm">
                    {animal.traits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 5 éléments Wu Xing
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Chaque animal chinois est associé à un élément. Cette combinaison (12
          animaux × 5 éléments) crée un cycle de 60 années uniques.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            {
              name: "Bois",
              emoji: "🌿",
              color: "from-green-600 to-emerald-700",
              traits: "Croissance, création, flexibilité",
            },
            {
              name: "Feu",
              emoji: "🔥",
              color: "from-red-600 to-orange-700",
              traits: "Passion, dynamisme, transformation",
            },
            {
              name: "Terre",
              emoji: "🌍",
              color: "from-amber-600 to-yellow-700",
              traits: "Stabilité, fiabilité, sagesse",
            },
            {
              name: "Métal",
              emoji: "⚙️",
              color: "from-slate-500 to-gray-700",
              traits: "Rigueur, clarté, force",
            },
            {
              name: "Eau",
              emoji: "💧",
              color: "from-blue-600 to-cyan-700",
              traits: "Sagesse, communication, adaptabilité",
            },
          ].map((element) => (
            <div
              key={element.name}
              className={`bg-gradient-to-br ${element.color} rounded-xl p-4 text-white`}
            >
              <p className="text-3xl mb-2">{element.emoji}</p>
              <h3 className="font-bold mb-2">{element.name}</h3>
              <p className="text-sm opacity-90">{element.traits}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Dates du Nouvel An lunaire 2024-2035
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le signe chinois change le jour du Nouvel An lunaire. Voici les dates
          de changement pour les années à venir.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Année
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Date Nouvel An Lunaire
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Animal
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Élément
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { year: 2024, date: "10 février", animal: "Dragon", element: "Bois" },
                { year: 2025, date: "29 janvier", animal: "Serpent", element: "Bois" },
                { year: 2026, date: "17 février", animal: "Cheval", element: "Feu" },
                { year: 2027, date: "6 février", animal: "Chèvre", element: "Feu" },
                { year: 2028, date: "26 janvier", animal: "Singe", element: "Terre" },
                { year: 2029, date: "13 février", animal: "Coq", element: "Terre" },
                { year: 2030, date: "3 février", animal: "Chien", element: "Métal" },
                { year: 2031, date: "23 janvier", animal: "Cochon", element: "Métal" },
                { year: 2032, date: "11 février", animal: "Rat", element: "Eau" },
                { year: 2033, date: "31 janvier", animal: "Buffle", element: "Eau" },
                { year: 2034, date: "19 février", animal: "Tigre", element: "Bois" },
                { year: 2035, date: "8 février", animal: "Lapin", element: "Bois" },
              ].map((nyc) => (
                <tr key={nyc.year} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-slate-700">{nyc.year}</td>
                  <td className="py-3 px-2 text-slate-600">{nyc.date}</td>
                  <td className="py-3 px-2 font-semibold text-slate-700">
                    {nyc.animal}
                  </td>
                  <td className="py-3 px-2 text-slate-600">{nyc.element}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections de contenu detaille (prose en chaines JS) */}
      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.paras.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          Calcul basé sur l&apos;astrologie traditionnelle chinoise et la
          classification des éléments Wu Xing. Les dates du Nouvel An lunaire
          peuvent varier légèrement selon les calendriers régionaux. Le signe
          chinois change à la date officielle du Nouvel An lunaire, pas le 1er
          janvier.
          <br />
          <strong>Sources:</strong> Tradition luni-solaire chinoise, Wikipedia,
          chine.in
        </p>
      </section>

      <HowToJsonLd
        name="Trouver son signe astrologique chinois et son élément"
        steps={[
          { name: "Entrer la date de naissance complète", text: "Saisir le jour, le mois et l'année de naissance. Le signe change au Nouvel An lunaire (entre le 21 janvier et le 20 février), pas le 1er janvier. Ex : naissance le 5 février 2000 -> signe 1999 (Lapin de Terre) car le Nouvel An 2000 tombait ce même jour." },
          { name: "Identifier l'animal du zodiaque", text: "Le calculateur determine l'un des 12 animaux (Rat, Buffle, Tigre, Lapin, Dragon, Serpent, Cheval, Chevre, Singe, Coq, Chien, Cochon) en tenant compte de la date exacte du Nouvel An lunaire de l'année de naissance." },
          { name: "Identifier l'élément Wu Xing", text: "L'élément (Bois, Feu, Terre, Metal, Eau) depend du dernier chiffre de l'année lunaire : 4-5=Bois, 6-7=Feu, 8-9=Terre, 0-1=Metal, 2-3=Eau. Ex : année 1994 -> Chien de Bois. La combinaison animal + élément ne revient qu'une fois tous les 60 ans." },
          { name: "Lire la compatibilite et le profil", text: "Le résultat indique la triade de compatibilite (ex : Rat, Dragon et Singe s'entendent naturellement), le signe oppose (Rat oppose à Cheval) et les traits associes à l'animal et à l'élément pour une lecture complète du profil." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/signe-astrologique-chinois" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}