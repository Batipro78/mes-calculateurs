import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CHEMINS } from "../cheminDeVieCalc";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";

const PAGES_DATA = [
  // 9 chemins
  {
    slug: "chemin-de-vie-1",
    nombre: 1,
    titre: "Chemin de Vie 1 - Le Pionnier",
    description:
      "Le Pionnier est le leader né, indépendant et créatif. Découvrez les caractéristiques, forces et défauts du chemin de vie 1 en numérologie.",
  },
  {
    slug: "chemin-de-vie-2",
    nombre: 2,
    titre: "Chemin de Vie 2 - Le Médiateur",
    description:
      "Le Médiateur est diplomate, sensible et coopératif. Explorez les traits du chemin de vie 2 en numérologie pythagoricienne.",
  },
  {
    slug: "chemin-de-vie-3",
    nombre: 3,
    titre: "Chemin de Vie 3 - L'Artiste",
    description:
      "L'Artiste est créatif, expressif et sociable. Découvrez votre destinée avec le chemin de vie 3.",
  },
  {
    slug: "chemin-de-vie-4",
    nombre: 4,
    titre: "Chemin de Vie 4 - Le Bâtisseur",
    description:
      "Le Bâtisseur est travailleur, organisé et stable. Apprenez les secrets du chemin de vie 4.",
  },
  {
    slug: "chemin-de-vie-5",
    nombre: 5,
    titre: "Chemin de Vie 5 - L'Aventurier",
    description:
      "L'Aventurier est libre, curieux et adaptable. Explorez les caractéristiques du chemin de vie 5.",
  },
  {
    slug: "chemin-de-vie-6",
    nombre: 6,
    titre: "Chemin de Vie 6 - Le Protecteur",
    description:
      "Le Protecteur est responsable, aimant et bienveillant. Découvrez votre mission avec le chemin de vie 6.",
  },
  {
    slug: "chemin-de-vie-7",
    nombre: 7,
    titre: "Chemin de Vie 7 - Le Sage",
    description:
      "Le Sage est spirituel, introspectif et mystique. Explorez la profondeur du chemin de vie 7.",
  },
  {
    slug: "chemin-de-vie-8",
    nombre: 8,
    titre: "Chemin de Vie 8 - Le Magnat",
    description:
      "Le Magnat aspire au pouvoir, au succès et à l'ambition. Découvrez le chemin de vie 8.",
  },
  {
    slug: "chemin-de-vie-9",
    nombre: 9,
    titre: "Chemin de Vie 9 - L'Humaniste",
    description:
      "L'Humaniste est altruiste, universel et idéaliste. Explorez votre destinée humanitaire avec le chemin de vie 9.",
  },
  // 3 maîtres
  {
    slug: "chemin-de-vie-11",
    nombre: 11,
    titre: "Chemin de Vie 11 - Maître Intuitif",
    description:
      "Le Maître Intuitif (11) possède une inspiration spirituelle exceptionnelle. Découvrez ce nombre maître rare.",
  },
  {
    slug: "chemin-de-vie-22",
    nombre: 22,
    titre: "Chemin de Vie 22 - Maître Bâtisseur",
    description:
      "Le Maître Bâtisseur (22) manifeste les rêves en réalité concrète. Explorez ce nombre maître puissant.",
  },
  {
    slug: "chemin-de-vie-33",
    nombre: 33,
    titre: "Chemin de Vie 33 - Maître Enseignant",
    description:
      "Le Maître Enseignant (33) est au service de l'humanité. Découvrez le nombre maître le plus élevé.",
  },
  // 4 articles
  {
    slug: "comment-calculer-chemin-de-vie",
    nombre: null,
    titre: "Comment Calculer Son Chemin de Vie ?",
    description:
      "Guide complet pour calculer votre chemin de vie en numérologie pythagoricienne. Étapes, exemples et explications détaillées.",
  },
  {
    slug: "nombre-maitre-numerologie",
    nombre: null,
    titre: "Nombres Maîtres en Numérologie : 11, 22, 33",
    description:
      "Découvrez les trois nombres maîtres de la numérologie : leurs significations, leurs caractéristiques et leur rareté.",
  },
  {
    slug: "numerologie-pythagore",
    nombre: null,
    titre: "Numérologie Pythagoricienne : Principes et Histoire",
    description:
      "Explorez les fondations de la numérologie pythagoricienne, ses origines et ses applications modernes.",
  },
  {
    slug: "chemin-de-vie-amour",
    nombre: null,
    titre: "Chemin de Vie et Amour : Compatibilité Numérologique",
    description:
      "Comment votre chemin de vie influence vos relations amoureuses. Compatibilité et harmonie entre les nombres.",
  },
];

function parseSlug(
  slug: string
): (typeof PAGES_DATA[0]) | null {
  return PAGES_DATA.find((p) => p.slug === slug) || null;
}

export function generateStaticParams() {
  return PAGES_DATA.map((p) => ({ params: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const page = parseSlug(slug);
  if (!page) return {};
  return {
    alternates: { canonical: `/calcul-chemin-de-vie/${slug}` },
    title: page.titre,
    description: page.description,
    keywords: `${page.titre.toLowerCase()}, chemin de vie, numérologie, ${page.nombre ? `nombre ${page.nombre}` : ""}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const page = parseSlug(slug);
  if (!page) notFound();

  const chemin = page.nombre ? CHEMINS[page.nombre] : null;

  return (
    <div>
      <Breadcrumb
        currentPage={page.titre}
        parentPage="Chemin de Vie"
        parentHref="/calcul-chemin-de-vie"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔮
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {page.titre}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{page.description}</p>

      {chemin && (
        <div
          className={`rounded-2xl border-2 p-8 text-white shadow-lg bg-gradient-to-br mb-8 ${
            chemin.nombre === 1
              ? "from-red-600 to-orange-600 border-red-400"
              : chemin.nombre === 2
                ? "from-blue-400 to-cyan-500 border-blue-300"
                : chemin.nombre === 3
                  ? "from-yellow-500 to-orange-500 border-yellow-400"
                  : chemin.nombre === 4
                    ? "from-green-700 to-emerald-700 border-green-600"
                    : chemin.nombre === 5
                      ? "from-sky-500 to-blue-600 border-sky-400"
                      : chemin.nombre === 6
                        ? "from-pink-500 to-rose-500 border-pink-400"
                        : chemin.nombre === 7
                          ? "from-purple-700 to-indigo-800 border-purple-600"
                          : chemin.nombre === 8
                            ? "from-gray-900 to-gray-700 border-gray-800"
                            : chemin.nombre === 9
                              ? "from-white to-gray-100 text-slate-800 border-white"
                              : chemin.nombre === 11
                                ? "from-purple-600 to-indigo-700 border-purple-500"
                                : chemin.nombre === 22
                                  ? "from-gray-900 via-yellow-700 to-yellow-600 border-gray-800"
                                  : "from-yellow-300 to-white text-slate-800 border-yellow-200"
          }`}
        >
          <div className="text-center">
            <div className="text-6xl font-black mb-3">{chemin.nombre}</div>
            <div className="text-2xl font-bold mb-2">{chemin.nom}</div>
            {chemin.estMaitre && (
              <div className="inline-block bg-white bg-opacity-25 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                ✨ Nombre Maître
              </div>
            )}
            <p className="text-base opacity-95 leading-relaxed">
              {chemin.description}
            </p>
          </div>
        </div>
      )}

      {chemin && (
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-xl">💪</span> Force
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {chemin.force}
            </p>
          </div>

          <div className="bg-red-50 rounded-xl border border-red-200 p-6">
            <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span> Faiblesse
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {chemin.faiblesse}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span className="text-xl">💼</span> Métiers
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {chemin.metiers}
            </p>
          </div>
        </div>
      )}

      {chemin && (
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-2">🎨 Couleur</h3>
            <p className="text-sm text-slate-600">{chemin.couleur}</p>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-2">💎 Pierre</h3>
            <p className="text-sm text-slate-600">{chemin.pierre}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 12 chemins de vie
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PAGES_DATA.filter((p) => p.nombre !== null).map((p) => (
            <a
              key={p.slug}
              href={`/calcul-chemin-de-vie/${p.slug}`}
              className={`rounded-xl p-4 border transition hover:shadow-md ${
                p.slug === slug
                  ? "bg-purple-50 border-purple-300"
                  : "bg-slate-50 border-slate-200 hover:bg-purple-50"
              }`}
            >
              <p className="font-bold text-slate-800">{p.titre}</p>
              <p className="text-xs text-purple-600 font-semibold">
                #{p.nombre}
              </p>
            </a>
          ))}
        </div>
      </div>


      <RelatedCalculators currentSlug="/calcul-chemin-de-vie" />
    </div>
  );
}
