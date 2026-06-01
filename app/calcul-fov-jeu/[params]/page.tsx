import type { Metadata } from "next";
import CalculFovJeu from "../CalculFovJeu";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  Ratio,
  RATIOS_LABELS,
  convertirFovRatiosHorplus,
} from "../fovJeuCalc";

// Variantes principales : conversions FOV les plus recherchees
const FOV_VARIANTES = [
  // FOV 90 - conversions populaires
  "fov-90-16-9-vers-21-9",
  "fov-90-21-9-vers-16-9",
  "fov-90-4-3-vers-16-9",
  "fov-90-16-9-vers-4-3",

  // FOV 103 (Valorant/Overwatch)
  "fov-103-16-9-vers-21-9",
  "fov-103-21-9-vers-16-9",
  "fov-103-16-9-vers-16-10",

  // FOV 110 (Apex, pros highFOV)
  "fov-110-16-9-vers-21-9",
  "fov-110-21-9-vers-16-9",
  "fov-110-16-9-vers-16-10",

  // FOV 80 (Fortnite, low FOV)
  "fov-80-16-9-vers-21-9",
  "fov-80-21-9-vers-16-9",
  "fov-80-16-10-vers-16-9",

  // FOV 100 (mid standard)
  "fov-100-16-9-vers-21-9",
  "fov-100-21-9-vers-16-9",
  "fov-100-4-3-vers-21-9",

  // FOV 106 (pro CS2)
  "fov-106-16-9-vers-21-9",
  "fov-106-21-9-vers-16-9",
  "fov-106-16-10-vers-21-9",

  // FOV 120 (ultra-wide prep)
  "fov-120-21-9-vers-16-9",
  "fov-120-32-9-vers-21-9",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(
  slug: string
): {
  fov: number;
  ratioSource: Ratio;
  ratioCible: Ratio;
} | null {
  const match = slug.match(
    /^fov-(\d+(?:\.\d+)?)-(\d+)-(\d+)-vers-(\d+)-(\d+)$/
  );
  if (!match) return null;

  const fov = parseFloat(match[1]);

  // Construire les ratios depuis les numeros
  const ratioSourceStr = `${match[2]}:${match[3]}`;
  const ratioCibleStr = `${match[4]}:${match[5]}`;

  const ratioMap: Record<string, Ratio> = {
    "4:3": "4:3",
    "5:4": "5:4",
    "16:10": "16:10",
    "16:9": "16:9",
    "21:9": "21:9",
    "32:9": "32:9",
  };

  const ratioSource = ratioMap[ratioSourceStr] as Ratio | undefined;
  const ratioCible = ratioMap[ratioCibleStr] as Ratio | undefined;

  if (!ratioSource || !ratioCible || fov <= 0) return null;
  return { fov, ratioSource, ratioCible };
}

export function generateStaticParams() {
  return FOV_VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { fov, ratioSource, ratioCible } = parsed;
  const ratioSourceLabel = RATIOS_LABELS[ratioSource];
  const ratioCibleLabel = RATIOS_LABELS[ratioCible];

  const resultat = convertirFovRatiosHorplus(fov, ratioSource, ratioCible);

  return {
    alternates: { canonical: `/calcul-fov-jeu/${slug}` },
    title: `FOV ${fov}° en ${ratioSourceLabel} = ${fmt(resultat.fovCible)}° en ${ratioCibleLabel}`,
    description: `Convertisseur FOV : ${fov}° sur ${ratioSourceLabel} equivalent a ${fmt(resultat.fovCible)}° sur ${ratioCibleLabel} (Hor+ scaling). Formule trigonometrique precise.`,
    keywords: `fov conversion, ${fov} fov, ${ratioSourceLabel.toLowerCase()}, ${ratioCibleLabel.toLowerCase()}, convertisseur fov, jeu video fov`,
    openGraph: {
      title: `FOV ${fov}° : ${ratioSourceLabel} → ${ratioCibleLabel}`,
      description: `${fov}° FOV sur ${ratioSourceLabel} = ${fmt(resultat.fovCible)}° sur ${ratioCibleLabel}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { fov, ratioSource, ratioCible } = parsed;
  const ratioSourceLabel = RATIOS_LABELS[ratioSource];
  const ratioCibleLabel = RATIOS_LABELS[ratioCible];

  const resultat = convertirFovRatiosHorplus(fov, ratioSource, ratioCible);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `A quoi correspond ${fov}° FOV sur ${ratioCibleLabel} quand on vient de ${ratioSourceLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Si vous jouez avec ${fov}° FOV sur ${ratioSourceLabel}, le FOV equivalent sur ${ratioCibleLabel} est ${fmt(resultat.fovCible)}° (Hor+ scaling standard). Cela maintient la meme vision horizontale peripherique, avec un VFOV adapte au nouveau ratio.`,
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi la conversion n&apos;est pas juste une multiplication ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le FOV est un angle, pas une distance. La conversion entre ratios utilise trigonometrie (tan/atan) pour rester precis. Une multiplication simple ignorerait la nature logarithmique des angles et donnerait des resultats inexacts.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`FOV ${fov}° : ${ratioSourceLabel} → ${ratioCibleLabel}`}
        parentPage="Convertisseur FOV Jeux Video"
        parentHref="/calcul-fov-jeu"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎮
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          FOV {fov}° : {ratioSourceLabel} → {ratioCibleLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Conversion FOV precise entre ratios d&apos;écran. Hor+ scaling (standard).
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl p-8 shadow-lg shadow-teal-200/50 mb-8">
        <p className="text-sm text-teal-100 mb-2">Conversion FOV (Hor+ scaling)</p>
        <div className="grid gap-4 md:grid-cols-3 items-center">
          <div>
            <p className="text-xs text-teal-100 mb-1">Source</p>
            <p className="text-3xl font-extrabold">{fov}°</p>
            <p className="text-xs text-teal-100 mt-1">{ratioSourceLabel}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">=</p>
          </div>
          <div>
            <p className="text-xs text-teal-100 mb-1">Cible</p>
            <p className="text-3xl font-extrabold">{fmt(resultat.fovCible, 2)}°</p>
            <p className="text-xs text-teal-100 mt-1">{ratioCibleLabel}</p>
          </div>
        </div>
      </div>

      {/* Explication rapide */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Pourquoi cette conversion ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Quand vous passez d&apos;un ratio d&apos;écran a un autre, votre FOV doit s&apos;adapter pour maintenir
          la meme experience visuelle. Avec <strong>Hor+ scaling</strong> (le mode standard des jeux
          modernes) :
        </p>
        <ul className="space-y-3 text-slate-600 mb-4">
          <li className="flex gap-3">
            <span className="text-teal-600 font-bold">↑ HFOV</span>
            <span>
              augmente de facon proportionnelle au ratio (vous voyez plus a gauche-droite)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-600 font-bold">↔ VFOV</span>
            <span>
              s&apos;adapte automatiquement pour rester coherent (hauteur moins affectee)
            </span>
          </li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          <strong>Exemple :</strong> Si vous jouez a {fov}° FOV sur {ratioSourceLabel}, passer a{" "}
          {ratioCibleLabel} augmente votre HFOV a {fmt(resultat.fovCible, 2)}° pour garder une vision
          coherente. Vos ennemis ont la meme taille au centre, mais vous voyez plus sur les cotes.
        </p>
      </div>

      {/* Tableau de comparaison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Impact sur la vision
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Ratio / Metric
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  {ratioSourceLabel}
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  {ratioCibleLabel}
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Diff
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-teal-50/50">
                <td className="py-3 px-2 font-bold text-slate-700">HFOV</td>
                <td className="py-3 px-2 text-right text-slate-700">{fov}°</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  {fmt(resultat.fovCible, 2)}°
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  +{fmt(resultat.fovCible - fov, 2)}°
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Note : VFOV s&apos;ajuste automatiquement selon le ratio. Hor+ scaling conserve la vision
          horizontale peripherique.
        </p>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Convertisseur interactif
      </h2>
      <CalculFovJeu />


      {/* Guide utilisateur */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Quand utiliser cette conversion ?
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Vous changez de moniteur ou vous jouez sur plusieurs resolutions / ratios ? Voici quand
          vous en avez besoin :
        </p>

        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 bg-teal-50/30 p-4 rounded">
            <h3 className="font-bold text-slate-800 mb-2">
              Passage 16:9 → 21:9 (moniteur ultra-wide)
            </h3>
            <p className="text-slate-600 text-sm">
              Vous aviez un moniteur 16:9 avec {fov}° FOV. En changeant pour 21:9, la plupart des jeux
              modernes augmenteront votre FOV a {fmt(resultat.fovCible, 2)}° automatiquement (Hor+
              scaling) pour maintenir une vision coherente. Verifiez dans les parametres du jeu.
            </p>
          </div>

          <div className="border-l-4 border-cyan-500 bg-cyan-50/30 p-4 rounded">
            <h3 className="font-bold text-slate-800 mb-2">
              Passage 16:9 → 4:3 (retro / competitive strict)
            </h3>
            <p className="text-slate-600 text-sm">
              Certains joueurs competitifs utilisent 4:3 pour des ennemis plus larges. Notre conversion
              vous montre quel FOV 4:3 donner pour conserver l&apos;experience.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 bg-indigo-50/30 p-4 rounded">
            <h3 className="font-bold text-slate-800 mb-2">
              Migration entre jeux avec FOV different
            </h3>
            <p className="text-slate-600 text-sm">
              Vous jouez CS2 a {fov}° sur 16:9, mais en passant a Valorant qui utilise une echelle
              differente, utilisez cette conversion pour trouver le FOV equivalent qui vous redonne les
              memes sensations visuelles.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-fov-jeu" />
    </div>
  );
}
