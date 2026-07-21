import type { Metadata } from "next";
import ConvertisseurAllureCourse from "./ConvertisseurAllureCourse";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import { formatAllure, predireTempsCourse } from "./allureCourseCalc";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseur-allure-course" },
  title:
    "Convertisseur allure course a pied - min/km vers km/h et temps marathon",
  description:
    "Convertissez votre allure de course (min/km ↔ km/h ↔ min/mile). Predisez votre temps sur 5km, 10km, semi-marathon et marathon.",
  keywords:
    "allure course, convertisseur min/km, calcul vitesse course, temps marathon, prediction course a pied, allure jogging, tempo running",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment convertir l'allure min/km en km/h ?",
    a: "Pour convertir une allure en vitesse : Vitesse (km/h) = 60 / Allure (min/km). Par exemple, une allure de 5 min/km = 60 / 5 = 12 km/h. Une allure de 6 min/km = 60 / 6 = 10 km/h.",
  },
  {
    q: "Quel temps pour courir un marathon a 5 min/km ?",
    a: "A une allure de 5 min/km sur une distance de 42.195 km (marathon), le temps total est : 5 min/km × 42.195 km ≈ 3 heures 31 minutes. Cela correspond a une vitesse moyenne de 12 km/h.",
  },
  {
    q: "Quelle est la difference entre allure et vitesse ?",
    a: "L'allure est le temps necessaire pour parcourir 1 km (exprime en minutes:secondes). La vitesse est la distance parcourue en 1 heure (exprimee en km/h). Ce sont deux facons inverses de mesurer la meme chose. Une allure rapide = une vitesse elevee.",
  },
  {
    q: "Quelle allure pour un coureur debutant ?",
    a: "Pour les debutants en course a pied, une allure typique est entre 7 et 8 min/km (7.5 a 8.5 km/h). Les coureurs amateurs experimentees se situent entre 5 et 6 min/km (10 a 12 km/h). Les coureurs confirmes et athletes visent des allures de 4 a 5 min/km (12 a 15 km/h).",
  },
];

export default function Page() {
  // Allures courantes pour le tableau de reference
  const allures = [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0];

  const tableauAllures = allures.map((allure) => {
    const kmh = Math.round((60 / allure) * 100) / 100;
    const pred5 = predireTempsCourse(allure, 5);
    const pred10 = predireTempsCourse(allure, 10);
    const predSemi = predireTempsCourse(allure, 21.0975);
    const predMarathon = predireTempsCourse(allure, 42.195);
    return {
      allure: formatAllure(allure),
      kmh,
      temps5km: pred5.formatte,
      temps10km: pred10.formatte,
      tempsSemi: predSemi.formatte,
      tempsMarathon: predMarathon.formatte,
    };
  });

  return (
    <div>
      <WebAppJsonLd name="Convertisseur Allure Course a Pied" />
      <Breadcrumb currentPage="Convertisseur Allure Course" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏃
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur Allure Course a Pied
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez entre allure (min/km), vitesse (km/h) et allure par mile.
        Predisez vos temps sur 5km, 10km, semi-marathon et marathon.
      </p>

      <ConvertisseurAllureCourse />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau de reference des allures courantes
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Consultez ce tableau pour voir les equivalences entre allure (min/km),
          vitesse (km/h) et temps estimes sur distances populaires.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Allure (min/km)
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Vitesse (km/h)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  5 km
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  10 km
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Semi (21 km)
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Marathon (42 km)
                </th>
              </tr>
            </thead>
            <tbody>
              {tableauAllures.map((row) => (
                <tr
                  key={row.allure}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {row.allure}
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    {row.kmh.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    km/h
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.temps5km}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.temps10km}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.tempsSemi}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">
                    {row.tempsMarathon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Allures par niveau de coureur
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Debutant</h3>
            <p className="text-sm font-mono text-slate-700 mb-2">7:00 - 8:30</p>
            <p className="text-xs text-slate-500">
              Vitesse : 7 - 8.5 km/h
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Amateur</h3>
            <p className="text-sm font-mono text-slate-700 mb-2">5:30 - 7:00</p>
            <p className="text-xs text-slate-500">
              Vitesse : 8.5 - 11 km/h
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Confirme</h3>
            <p className="text-sm font-mono text-slate-700 mb-2">4:00 - 5:30</p>
            <p className="text-xs text-slate-500">
              Vitesse : 11 - 15 km/h
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Elite</h3>
            <p className="text-sm font-mono text-slate-700 mb-2">&lt; 4:00</p>
            <p className="text-xs text-slate-500">
              Vitesse : &gt; 15 km/h
            </p>
          </div>
        </div>
      </section>

      <HowToJsonLd
        name="Convertir une allure de course et predire ses temps de competition"
        steps={[
          { name: "Saisir l'allure en min/km", text: "Entrer l'allure cible en minutes et secondes par kilomètre (ex. 5:00 min/km). Le convertisseur accepte aussi une entree en km/h ou en min/mile." },
          { name: "Calculer la vitesse équivalente en km/h", text: "Formule : vitesse (km/h) = 60 / allure (min/km). Une allure de 5:00 min/km donne 60 / 5 = 12 km/h. Une allure de 6:00 min/km = 10 km/h." },
          { name: "Predire les temps sur les distances de competition", text: "Temps = allure (min/km) x distance (km). Ex. : 5:00 min/km sur 42,195 km (marathon) = 3 h 30 min ; sur 10 km = 50 min ; sur 21,0975 km (semi) = 1 h 45 min." },
          { name: "Situer son profil de coureur", text: "Debutant : 7:00 à 8:30 min/km (7 à 8,5 km/h). Amateur : 5:30 à 7:00 min/km. Confirme : 4:00 à 5:30 min/km. Elite : moins de 4:00 min/km (plus de 15 km/h)." },
        ]}
      />
      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/convertisseur-allure-course" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
