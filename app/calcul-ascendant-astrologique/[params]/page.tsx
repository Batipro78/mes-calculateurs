import type { Metadata } from "next";
import CalculateurAscendant from "../CalculateurAscendant";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SIGNES_DATA = [
  { slug: "belier", nom: "Belier", symbole: "\u2648", dates: "21 mars - 19 avril", element: "Feu", planete: "Mars", personnalite: "Leader ne, fonceur et passionne. Aime l'action, deteste attendre. Spontane et direct.", qualites: ["Courageux","Dynamique","Confiant","Enthousiaste"], defauts: ["Impatient","Impulsif","Agressif","Egocentrique"] },
  { slug: "taureau", nom: "Taureau", symbole: "\u2649", dates: "20 avril - 20 mai", element: "Terre", planete: "Venus", personnalite: "Stable, patient et sensuel. Aime le confort et la securite. Tres loyal et fiable.", qualites: ["Fiable","Patient","Determine","Sensuel"], defauts: ["Tetu","Possessif","Materialiste","Resistant au changement"] },
  { slug: "gemeaux", nom: "Gemeaux", symbole: "\u264A", dates: "21 mai - 20 juin", element: "Air", planete: "Mercure", personnalite: "Curieux, communicatif et adaptable. Adore apprendre et echanger. Esprit vif et humoristique.", qualites: ["Communicatif","Adaptable","Intellectuel","Drole"], defauts: ["Inconstant","Nerveux","Superficiel","Indecis"] },
  { slug: "cancer", nom: "Cancer", symbole: "\u264B", dates: "21 juin - 22 juillet", element: "Eau", planete: "Lune", personnalite: "Emotif, protecteur et attache a sa famille. Grande sensibilite et intuition remarquable.", qualites: ["Protecteur","Intuitif","Loyal","Empathique"], defauts: ["Susceptible","Lunatique","Possessif","Rancunier"] },
  { slug: "lion", nom: "Lion", symbole: "\u264C", dates: "23 juillet - 22 aout", element: "Feu", planete: "Soleil", personnalite: "Charismatique, genereux et theatral. Adore etre au centre de l'attention. Leader naturel.", qualites: ["Charismatique","Genereux","Creatif","Loyal"], defauts: ["Orgueilleux","Autoritaire","Dramatique","Vaniteux"] },
  { slug: "vierge", nom: "Vierge", symbole: "\u264D", dates: "23 aout - 22 septembre", element: "Terre", planete: "Mercure", personnalite: "Methodique, analytique et perfectionniste. Souci du detail et sens pratique hors pair.", qualites: ["Analytique","Fiable","Modeste","Pratique"], defauts: ["Perfectionniste","Critique","Anxieux","Timide"] },
  { slug: "balance", nom: "Balance", symbole: "\u264E", dates: "23 septembre - 22 octobre", element: "Air", planete: "Venus", personnalite: "Recherche l'harmonie et la beaute. Diplomate nee, deteste les conflits. Gout pour l'art.", qualites: ["Diplomate","Juste","Social","Esthetique"], defauts: ["Indecis","Superficiel","Dependant","Evite les conflits"] },
  { slug: "scorpion", nom: "Scorpion", symbole: "\u264F", dates: "23 octobre - 21 novembre", element: "Eau", planete: "Pluton", personnalite: "Intense, mysterieux et passionne. Volonte de fer, loyal mais ne pardonne pas la trahison.", qualites: ["Determine","Loyal","Perspicace","Passionne"], defauts: ["Jaloux","Rancunier","Manipulateur","Obsessionnel"] },
  { slug: "sagittaire", nom: "Sagittaire", symbole: "\u2650", dates: "22 novembre - 21 decembre", element: "Feu", planete: "Jupiter", personnalite: "Aventurier, optimiste et philosophe. Soif de liberte et de connaissance. Enthousiaste.", qualites: ["Optimiste","Aventurier","Honnete","Philosophe"], defauts: ["Imprudent","Impatient","Maladroit","Inconstant"] },
  { slug: "capricorne", nom: "Capricorne", symbole: "\u2651", dates: "22 decembre - 19 janvier", element: "Terre", planete: "Saturne", personnalite: "Ambitieux, discipline et responsable. Travaille dur, ne baisse jamais les bras. Perseverant.", qualites: ["Ambitieux","Discipline","Responsable","Patient"], defauts: ["Froid","Pessimiste","Rigide","Workaholic"] },
  { slug: "verseau", nom: "Verseau", symbole: "\u2652", dates: "20 janvier - 18 fevrier", element: "Air", planete: "Uranus", personnalite: "Original, independant et humaniste. Pense differemment, visionnaire. S'interesse au progres.", qualites: ["Original","Independant","Humaniste","Visionnaire"], defauts: ["Distant","Imprevisible","Rebelle","Detache"] },
  { slug: "poissons", nom: "Poissons", symbole: "\u2653", dates: "19 fevrier - 20 mars", element: "Eau", planete: "Neptune", personnalite: "Intuitif, creatif et empathique. Sensibilite artistique hors du commun. Reveur et compassionnel.", qualites: ["Intuitif","Creatif","Compassionnel","Adaptable"], defauts: ["Reveur","Naif","Fuyant","Influencable"] },
];

function parseSlug(slug: string): typeof SIGNES_DATA[0] | null {
  return SIGNES_DATA.find((s) => s.slug === slug) || null;
}

export function generateStaticParams() {
  return SIGNES_DATA.map((s) => ({ params: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const signe = parseSlug(slug);
  if (!signe) return {};
  return {
    alternates: { canonical: `/calcul-ascendant-astrologique/${slug}` },
    title: `${signe.symbole} ${signe.nom} — Personnalite, Ascendant, Qualites et Defauts`,
    description: `Tout sur le signe ${signe.nom} (${signe.dates}). Element ${signe.element}, planete ${signe.planete}. Personnalite, qualites, defauts et compatibilites.`,
    keywords: `${signe.nom.toLowerCase()} personnalite, signe ${signe.nom.toLowerCase()}, ${signe.nom.toLowerCase()} qualites defauts, ${signe.nom.toLowerCase()} ascendant, horoscope ${signe.nom.toLowerCase()}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const signe = parseSlug(slug);
  if (!signe) notFound();

  return (
    <div>
      <Breadcrumb currentPage={signe.nom} parentPage="Ascendant Astrologique" parentHref="/calcul-ascendant-astrologique" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-sm">{signe.symbole}</div>
        <h1 className="text-3xl font-extrabold text-slate-800">{signe.symbole} {signe.nom}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{signe.dates} &middot; {signe.element} &middot; {signe.planete}</p>

      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-purple-200/50 mb-8">
        <p className="text-purple-200 text-sm mb-1">Signe du zodiaque</p>
        <p className="text-5xl font-extrabold">{signe.symbole} {signe.nom}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-purple-200">Element</p><p className="font-semibold text-lg">{signe.element}</p></div>
          <div><p className="text-purple-200">Planete</p><p className="font-semibold text-lg">{signe.planete}</p></div>
          <div><p className="text-purple-200">Periode</p><p className="font-semibold text-lg">{signe.dates}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Personnalite du {signe.nom}</h2>
        <p className="text-slate-600 leading-relaxed">{signe.personnalite}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <h2 className="text-lg font-bold text-green-700 mb-3">Qualites</h2>
          <div className="space-y-2">
            {signe.qualites.map((q) => (
              <div key={q} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">+</span>
                {q}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <h2 className="text-lg font-bold text-red-600 mb-3">Points faibles</h2>
          <div className="space-y-2">
            {signe.defauts.map((d) => (
              <div key={d} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold">&minus;</span>
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les signes</h2>
        <div className="flex flex-wrap gap-2">
          {SIGNES_DATA.filter((s) => s.slug !== slug).map((s) => (
            <a key={s.slug} href={`/calcul-ascendant-astrologique/${s.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50/50 transition-all">
              {s.symbole} {s.nom}
            </a>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculez votre ascendant</h2>
      <CalculateurAscendant />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-ascendant-astrologique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
