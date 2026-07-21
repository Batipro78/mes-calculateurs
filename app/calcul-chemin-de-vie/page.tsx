import type { Metadata } from "next";
import CalculCheminDeVie from "./CalculCheminDeVie";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-chemin-de-vie" },
  title:
    "Calcul Chemin de Vie Numérologie - 9 Nombres + Maîtres 11/22/33",
  description:
    "Calculez votre chemin de vie en numérologie pythagoricienne. Découvrez votre nombre de destinée (1-9 ou maîtres 11, 22, 33), votre personnalité, forces, faiblesses et métiers. Gratuit.",
  keywords:
    "chemin de vie, numérologie, nombre chemin de vie, numérologie pythagoricienne, nombre destinée, maître 11 22 33, calcul nombre vie, personnalité numérologie",
};

// Interpretations detaillees de chaque chemin de vie (prose en chaines JS).
const DETAILS: { n: string; titre: string; texte: string }[] = [
  {
    n: "1",
    titre: "Le Pionnier",
    texte:
      "Le chemin de vie 1 est celui du leader et de l'initiateur. Indépendance, volonté et capacité à ouvrir la voie sont vos grandes forces. Votre mission : oser entreprendre et assumer vos décisions. Vos défis : l'ego, l'impatience et la difficulté à demander de l'aide.",
  },
  {
    n: "2",
    titre: "Le Médiateur",
    texte:
      "Le 2 est le chemin de la coopération et de la sensibilité. Diplomate né, vous excellez dans l'écoute, le compromis et le travail en duo. Votre mission : créer du lien et apaiser les tensions. Vos défis : la dépendance affective, le manque de confiance et la tendance à vous effacer.",
  },
  {
    n: "3",
    titre: "L'Artiste",
    texte:
      "Le 3 incarne l'expression et la créativité. Communication, optimisme et imagination vous caractérisent. Votre mission : inspirer et transmettre la joie par l'art ou la parole. Vos défis : la dispersion, la superficialité et la difficulté à finir ce que vous commencez.",
  },
  {
    n: "4",
    titre: "Le Bâtisseur",
    texte:
      "Le 4 est le chemin du travail et de la stabilité. Rigueur, méthode et fiabilité sont vos atouts : vous construisez des bases solides. Votre mission : bâtir du durable, pas à pas. Vos défis : la rigidité, l'entêtement et la peur du changement.",
  },
  {
    n: "5",
    titre: "L'Aventurier",
    texte:
      "Le 5 est le chemin de la liberté et du mouvement. Curiosité, adaptabilité et goût de l'expérience vous animent. Votre mission : explorer, apprendre et embrasser le changement. Vos défis : l'instabilité, l'excès et la difficulté à tenir vos engagements.",
  },
  {
    n: "6",
    titre: "Le Protecteur",
    texte:
      "Le 6 est le chemin de l'amour et de la responsabilité. Dévouement, sens de la famille et besoin d'harmonie vous définissent. Votre mission : prendre soin et créer un foyer équilibré. Vos défis : le sacrifice de soi, le contrôle et la tendance à trop vouloir bien faire.",
  },
  {
    n: "7",
    titre: "Le Sage",
    texte:
      "Le 7 est le chemin de la réflexion et de la spiritualité. Analyse, intuition et quête de sens vous habitent. Votre mission : comprendre en profondeur et cultiver votre vie intérieure. Vos défis : l'isolement, la méfiance et la difficulté à s'ouvrir aux autres.",
  },
  {
    n: "8",
    titre: "Le Magnat",
    texte:
      "Le 8 est le chemin de la réussite et du pouvoir. Ambition, sens des affaires et capacité d'organisation vous portent vers les responsabilités. Votre mission : réussir matériellement tout en restant juste. Vos défis : le matérialisme, l'autoritarisme et le déséquilibre travail / vie privée.",
  },
  {
    n: "9",
    titre: "L'Humaniste",
    texte:
      "Le 9 est le chemin de l'altruisme et de l'idéal. Compassion, générosité et vision universelle vous caractérisent. Votre mission : servir une cause plus grande que vous. Vos défis : l'idéalisme déçu, la difficulté à lâcher prise et le don de soi excessif.",
  },
  {
    n: "11",
    titre: "Maître Intuitif",
    texte:
      "Nombre maître, le 11 amplifie le 2 : intuition exceptionnelle, inspiration et sensibilité spirituelle. Votre mission : éclairer et guider par votre vision. Vos défis : la nervosité, la pression intérieure et la difficulté à canaliser une énergie intense.",
  },
  {
    n: "22",
    titre: "Maître Bâtisseur",
    texte:
      "Nombre maître, le 22 amplifie le 4 : capacité à concrétiser de grands projets au service du collectif. Votre mission : transformer une vision en réalisation durable. Vos défis : la peur de l'échec et la pression d'un potentiel hors norme.",
  },
  {
    n: "33",
    titre: "Maître Enseignant",
    texte:
      "Nombre maître le plus rare, le 33 amplifie le 6 : amour inconditionnel, transmission et dévouement à l'humanité. Votre mission : enseigner et élever par l'exemple. Vos défis : la surcharge émotionnelle et l'oubli de ses propres besoins.",
  },
];

// Prose en chaines JS (guillemets doubles) pour eviter tout probleme d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Le chemin de vie, qu'est-ce que c'est ?",
    paras: [
      "Le chemin de vie est le nombre central de la numérologie. Calculé à partir de votre date de naissance, il décrit la grande orientation de votre existence : votre tempérament profond, vos talents naturels et les leçons que vous êtes amené à apprendre.",
      "Contrairement à d'autres nombres numérologiques calculés sur le nom, le chemin de vie ne change jamais : il vous accompagne de la naissance à la fin de la vie. C'est pour cela qu'on le considère comme le plus important de tous.",
    ],
  },
  {
    title: "Faut-il réduire les nombres maîtres 11, 22 et 33 ?",
    paras: [
      "C'est la question qui divise le plus en numérologie. Dans la méthode pythagoricienne classique, on ne réduit pas les nombres maîtres : un 11 reste 11, un 22 reste 22, un 33 reste 33. Ils sont vus comme des vibrations supérieures, plus exigeantes à vivre.",
      "Beaucoup de praticiens notent toutefois le double aspect : un 11 porte aussi l'énergie du 2 (11 = 1+1), un 22 celle du 4, un 33 celle du 6. Concrètement, une personne en nombre maître oscille entre le potentiel élevé du maître et la base plus terre-à-terre du nombre réduit.",
    ],
  },
  {
    title: "Un repère, pas une fatalité",
    paras: [
      "Le chemin de vie n'enferme personne dans une case. Il décrit des tendances et des terrains favorables, pas un destin écrit d'avance. Deux personnes ayant le même nombre peuvent mener des vies radicalement différentes selon leur éducation, leurs choix et leur environnement.",
      "L'intérêt réel est l'introspection : repérer ses forces pour les cultiver, et identifier ses défis récurrents pour mieux les apprivoiser. C'est un outil de développement personnel, à utiliser avec recul et sans s'y soumettre aveuglément.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer mon chemin de vie en numérologie ?",
    a: "Le chemin de vie se calcule en additionnant tous les chiffres de votre date de naissance (jour, mois, année) jusqu'à obtenir un chiffre unique entre 1 et 9, ou un nombre maître (11, 22, 33). Par exemple : 15 octobre 1990 = 1+5+1+0+1+9+9+0 = 26 = 2+6 = 8.",
  },
  {
    q: "Qu'est-ce qu'un nombre maître en numérologie ?",
    a: "Les nombres maîtres (11, 22, 33) ne sont pas réduits à un chiffre unique en numérologie pythagoricienne. Ils représentent des niveaux de conscience et de spiritualité élevés. Le 11 est l'inspiration spirituelle, le 22 est la manifestation concrète, et le 33 est le service à l'humanité.",
  },
  {
    q: "Que signifie chaque chemin de vie ?",
    a: "Chaque chemin de vie (1-9 + maîtres) révèle votre destinée, vos forces, vos faiblesses, et votre mission de vie. Le 1 est le pionnier, le 2 le médiateur, le 3 l'artiste, etc. Les maîtres apportent une dimension spirituelle supplémentaire.",
  },
  {
    q: "Comment utiliser mon chemin de vie au quotidien ?",
    a: "Votre chemin de vie peut vous aider à mieux comprendre votre personnalité, à identifier vos talents naturels, à choisir des carrières alignées avec votre destinée, et à surmonter vos défis. C'est un outil d'introspection et de développement personnel.",
  },
  {
    q: "Le chemin de vie et le signe astrologique, c'est pareil ?",
    a: "Non. Le signe astrologique dépend de la position des astres et se calcule sur votre seul jour/mois de naissance. Le chemin de vie est numérologique : il additionne tous les chiffres de votre date complète (jour, mois et année). Les deux approches sont indépendantes et peuvent se compléter, mais elles n'ont ni la même origine ni la même méthode.",
  },
  {
    q: "Peut-on avoir deux chemins de vie ?",
    a: "Non, le chemin de vie est unique et fixe : il découle de votre date de naissance, qui ne change pas. En revanche, la numérologie utilise d'autres nombres calculés sur votre nom (nombre d'expression, nombre intime), qui apportent un éclairage complémentaire mais ne remplacent pas le chemin de vie.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Chemin de Vie Numérologie" />
      <Breadcrumb currentPage="Chemin de Vie" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔮
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
          Calcul Chemin de Vie Numérologie
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Découvrez votre nombre de destinée (1-9 ou maîtres 11, 22, 33) selon la
        numérologie pythagoricienne. Entrez votre date de naissance pour révéler
        votre chemin de vie.
      </p>

      <CalculCheminDeVie />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Les 9 chemins de vie + 3 maîtres
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: 1,
              nom: "Le Pionnier",
              emoji: "🚀",
              trait: "Leader, indépendant, créatif",
            },
            {
              n: 2,
              nom: "Le Médiateur",
              emoji: "🤝",
              trait: "Diplomate, sensible, coopératif",
            },
            {
              n: 3,
              nom: "L'Artiste",
              emoji: "🎨",
              trait: "Créatif, expressif, sociable",
            },
            {
              n: 4,
              nom: "Le Bâtisseur",
              emoji: "🏗️",
              trait: "Travailleur, organisé, stable",
            },
            {
              n: 5,
              nom: "L'Aventurier",
              emoji: "🌍",
              trait: "Libre, curieux, adaptable",
            },
            {
              n: 6,
              nom: "Le Protecteur",
              emoji: "❤️",
              trait: "Famille, responsable, aimant",
            },
            {
              n: 7,
              nom: "Le Sage",
              emoji: "📖",
              trait: "Spirituel, introspectif, mystique",
            },
            {
              n: 8,
              nom: "Le Magnat",
              emoji: "💎",
              trait: "Pouvoir, succès, ambition",
            },
            {
              n: 9,
              nom: "L'Humaniste",
              emoji: "🌟",
              trait: "Altruiste, universel, idéaliste",
            },
            {
              n: 11,
              nom: "Maître Intuitif",
              emoji: "✨",
              trait: "Inspiration, vision spirituelle",
            },
            {
              n: 22,
              nom: "Maître Bâtisseur",
              emoji: "👑",
              trait: "Manifestation, réalisation",
            },
            {
              n: 33,
              nom: "Maître Enseignant",
              emoji: "🙏",
              trait: "Service à l'humanité, conscience",
            },
          ].map((c) => (
            <div
              key={c.n}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{c.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800">{c.nom}</p>
                  <p className="text-xs text-purple-600 font-semibold">#{c.n}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">{c.trait}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Signification détaillée de chaque chemin de vie
        </h2>
        <div className="space-y-4">
          {DETAILS.map((d) => (
            <div key={d.n} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-bold text-slate-800 mb-1">
                Chemin de vie {d.n} &mdash; {d.titre}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">{d.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          📐 Méthode Pythagoricienne
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700">
            La numérologie pythagoricienne réduit la date de naissance à un seul
            chiffre (de 1 à 9) ou à un nombre maître (11, 22, 33). Voici les
            étapes :
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>
              Écrivez votre date complète (jour + mois + année) en chiffres
            </li>
            <li>Additionnez tous les chiffres entre eux</li>
            <li>
              Si le résultat est un nombre à deux chiffres, additionnez à
              nouveau (exemple : 26 = 2+6 = 8)
            </li>
            <li>
              EXCEPTION : arrêtez si vous obtenez 11, 22 ou 33 (nombres maîtres)
            </li>
            <li>Le chiffre final est votre chemin de vie</li>
          </ol>

          <div className="bg-white rounded-xl p-6 border border-purple-200 mt-6">
            <h3 className="font-bold text-slate-800 mb-3">Exemple :</h3>
            <p className="text-sm text-slate-700 font-mono">
              Date : 15 octobre 1990
              <br />
              Calcul : 1 + 5 + 1 + 0 + 1 + 9 + 9 + 0 = 26
              <br />
              Réduit : 2 + 6 = 8
              <br />
              <strong>Résultat : Chemin de Vie 8 (Le Magnat)</strong>
            </p>
          </div>
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

      <section className="mt-12 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">⚠️ Disclaimer</h2>
        <p className="text-slate-700 text-sm leading-relaxed">
          Ce calculateur utilise les principes de la numérologie pythagoricienne
          à titre informatif et d'introspection personnelle. Les résultats
          doivent être considérés comme des outils de réflexion et de
          développement personnel, et non comme des vérités absolues ou des
          directives de vie. La numérologie fait partie des pratiques
          ésotériques et ne remplace en aucun cas un conseil professionnel
          (médical, juridique, financier).
        </p>
      </section>

      <HowToJsonLd
        name="Calculer son chemin de vie en numerologie pythagoricienne"
        steps={[
          { name: "Saisir la date de naissance complète", text: "Entrer le jour, le mois et l'année en chiffres. Tous les chiffres de la date seront additionnes, donc l'année entiere est nécessaire (ex : 1990 = 1+9+9+0)." },
          { name: "Additionner tous les chiffres de la date", text: "Sommer chaque chiffre du jour, du mois et de l'année. Exemple : 15/10/1990 = 1+5+1+0+1+9+9+0 = 26." },
          { name: "Reduire jusqu'au chiffre final et lire le profil", text: "Reduire le total en additionnant ses chiffres (26 = 2+6 = 8). Exception : s'arreter si le résultat intermediaire est 11, 22 ou 33 (nombres maitres). Le chiffre final (1 à 9 ou 11/22/33) est le chemin de vie." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentSlug="/calcul-chemin-de-vie" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
