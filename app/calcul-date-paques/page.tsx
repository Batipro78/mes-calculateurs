import type { Metadata } from "next";
import CalculDatePaques from "./CalculDatePaques";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-date-paques" },
  title: "Date de Pâques 2026 - Cendres, Ascension, Pentecôte",
  description:
    "Calculez la date de Pâques pour n'importe quelle année (catholique ou orthodoxe). Découvrez les dates de toutes les fêtes chrétiennes mobiles : Mercredi des Cendres, Ascension, Pentecôte, Sacré-Cœur.",
  keywords:
    "date paques 2026, calcul paques meeus, paques orthodoxe, ascension pentecote, mercredi cendres, fetes chretiennes mobiles, paques catholique",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Pourquoi la date de Pâques change-t-elle chaque année ?",
    a: "Pâques est une fête mobile basée sur le calendrier lunaire. Selon le Concile de Nicée (325 ap. J.-C.), Pâques est fixée au premier dimanche après la pleine lune qui suit l'équinoxe de printemps (21 mars). Cette règle produit des dates différentes selon les années.",
  },
  {
    q: "Quelle est la différence entre Pâques catholique et Pâques orthodoxe ?",
    a: "Pâques catholique suit le calendrier grégorien (algorithme Meeus), tandis que Pâques orthodoxe suit le calendrier julien (13 jours de décalage en 1900-2099). Cette différence explique pourquoi les deux traditions ne célèbrent pas toujours Pâques à la même date. Par exemple, en 2028, elles coïncident.",
  },
  {
    q: "Comment fonctionne l'algorithme Meeus pour calculer Pâques ?",
    a: "L'algorithme Meeus/Jones/Butcher utilise des opérations modulo sur l'année pour déterminer la pleine lune pascale, puis trouve le premier dimanche après. C'est une formule purement calculatoire (sans tables) valable de 1583 à 4099 pour le calendrier grégorien. Elle remplace les anciennes tables lunaires des églises médiévales.",
  },
  {
    q: "En quelles années Pâques catholique et Pâques orthodoxe coïncident-elles ?",
    a: "Pâques coïncide certaines années, comme 2025 et 2028. C'est une coïncidence rare due aux décalages entre calendriers grégorien et julien. En 2026, Pâques catholique est le 5 avril, tandis que Pâques orthodoxe est le 12 avril.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Date de Pâques - Cendres, Ascension, Pentecôte" />
      <Breadcrumb currentPage="Date de Pâques - Cendres, Ascension, Pentecôte" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🕊️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Date de Pâques - Fêtes Chrétiennes Mobiles
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez Pâques (catholique ou orthodoxe) et découvrez toutes les fêtes
        chrétiennes de l&apos;année.
      </p>

      <CalculDatePaques />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Concile de Nicée (325 ap. J.-C.)
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          La règle de calcul de Pâques a été définie au Concile de Nicée par
          les pères de l&apos;Église primitive. Elle repose sur trois
          éléments&nbsp;:
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Équinoxe vernal</p>
            <p className="text-sm text-amber-800">
              Fixé au 21 mars (jour de l&apos;égalité jour/nuit).
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Pleine lune pascale</p>
            <p className="text-sm text-amber-800">
              Première pleine lune après l&apos;équinoxe vernal.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="font-bold text-amber-900 mb-2">Premier dimanche</p>
            <p className="text-sm text-amber-800">
              Premier dimanche après la pleine lune pascale = Pâques.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Catholique vs Orthodoxe
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Les deux traditions chrétiennes n&apos;utilisent pas le même calendrier
          pour calculer Pâques. Cela explique les décalages observés.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">
              Église Catholique
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Calendrier&nbsp;:</strong> Grégorien (1582 à présent)
              </li>
              <li>
                <strong>Algorithme&nbsp;:</strong> Meeus/Jones/Butcher (formule)
              </li>
              <li>
                <strong>Depuis&nbsp;:</strong> 1900 jusqu&apos;à 2099
              </li>
              <li>
                <strong>Églises&nbsp;:</strong> Catholique, protestante, anglicane
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">
              Église Orthodoxe
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Calendrier&nbsp;:</strong> Julien (avant 1582)
              </li>
              <li>
                <strong>Algorithme&nbsp;:</strong> Calcul lunaire julien + décalage
              </li>
              <li>
                <strong>Décalage&nbsp;:</strong> +13 jours en période 1900-2099
              </li>
              <li>
                <strong>Églises&nbsp;:</strong> Orthodoxe, certaines églises
                orientales
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-6 italic">
          <strong>Coïncidences&nbsp;:</strong> Certaines années comme 2025 et
          2028, les deux traditions célèbrent Pâques à la même date. Ces
          coïncidences sont rares et imprévisibles.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Algorithme Meeus
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          L&apos;algorithme Meeus/Jones/Butcher est la méthode moderne pour
          calculer Pâques grégorienne sans tables lunaires. Voici le
          pseudocode simplifié&nbsp;:
        </p>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-sm">
          <pre className="text-slate-300 font-mono leading-relaxed">
            {`a = année % 19
b = année / 100
c = année % 100
d = b / 4
e = b % 4
f = (b + 8) / 25
g = (b - f + 1) / 3
h = (19 * a + b - d - g + 15) % 30
i = c / 4
k = c % 4
l = (32 + 2 * e + 2 * i - h - k) % 7
m = (a + 11 * h + 22 * l) / 451
mois = (h + l - 7 * m + 114) / 31
jour = (h + l - 7 * m + 114) % 31 + 1

→ mois et jour donnent la date de Pâques`}
          </pre>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Source&nbsp;:{" "}
          <a
            href="https://en.wikipedia.org/wiki/Computus"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-amber-600 hover:text-amber-700"
          >
            Wikipedia - Computus
          </a>
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Dates Pâques 2026-2030
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Voici les dates complètes des Pâques catholiques et orthodoxes pour
          les 5 années à venir.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Année
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Cendres
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Pâques Catholique
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Pâques Orthodoxe
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Ascension
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Pentecôte
                </th>
              </tr>
            </thead>
            <tbody>
              {[2026, 2027, 2028, 2029, 2030].map((annee) => {
                const fetesC = require("./paquesCalc").getFetesAnnee(
                  annee,
                  "catholique"
                );
                const fetesO = require("./paquesCalc").getFetesAnnee(
                  annee,
                  "orthodoxe"
                );
                const fmt = (d: Date) =>
                  `${d.getDate()} ${["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"][d.getMonth()]}`;

                return (
                  <tr key={annee} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 font-bold text-slate-700">
                      {annee}
                    </td>
                    <td className="py-3 px-2 text-slate-600">{fmt(fetesC.cendres)}</td>
                    <td className="py-3 px-2 font-semibold text-amber-700">
                      {fmt(fetesC.paques)}
                    </td>
                    <td className="py-3 px-2 font-semibold text-orange-700">
                      {fmt(fetesO.paques)}
                    </td>
                    <td className="py-3 px-2 text-slate-600">
                      {fmt(fetesC.ascension)}
                    </td>
                    <td className="py-3 px-2 text-slate-600">
                      {fmt(fetesC.pentecote)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Disclaimer</h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          Les dates affichées pour Pâques catholique et protestante correspondent
          à l&apos;algorithme Meeus (calendrier grégorien). Sélectionnez
          &apos;Orthodoxe&apos; pour Pâques orthodoxe (calendrier julien). Ces
          calculs sont valides de 1900 à 2099.
          <br />
          <strong>Sources&nbsp;:</strong> Concile de Nicée (325), Vatican,
          Conférence des évêques de France, Wikipedia - Computus.
        </p>
      </section>

      <HowToJsonLd
        name="Calculer la date de Paques catholique ou orthodoxe et les fetes mobiles"
        steps={[
          { name: "Saisir l'année et choisir la tradition chretienne", text: "Entrer l'année souhaitee (valide de 1900 à 2099) et sélectionner catholique (calendrier gregorien, algorithme Meeus) ou orthodoxe (calendrier julien, decalage de +13 jours en période 1900-2099)." },
          { name: "Appliquer l'algorithme Meeus pour Paques gregorienne", text: "L algorithme Meeus/Jones/Butcher applique des operations modulo sur l'année pour déterminer la pleine lune pascale : première pleine lune après l'equinoxe du 21 mars, puis calcule le premier dimanche suivant." },
          { name: "Lire toutes les fetes mobiles derivees de Paques", text: "À partir de Paques : Mercredi des Cendres = Paques - 46 jours, Ascension = Paques + 39 jours, Pentecote = Paques + 49 jours. Pour Paques orthodoxe, la même regle s'applique au calendrier julien." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-date-paques" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
