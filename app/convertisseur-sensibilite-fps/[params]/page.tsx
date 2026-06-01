import type { Metadata } from "next";
import ConvertisseurSensiFps from "../ConvertisseurSensiFps";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { Jeu, JEUX_LABELS, convertirSensibilite } from "../sensiFpsCalc";

// Variantes de conversions les plus recherchees
const CONVERSIONS_VARIANTES = [
  "valorant-vers-cs2",
  "cs2-vers-valorant",
  "apex-vers-valorant",
  "valorant-vers-apex",
  "fortnite-vers-valorant",
  "valorant-vers-fortnite",
  "cs2-vers-apex",
  "apex-vers-cs2",
  "overwatch-vers-valorant",
  "valorant-vers-overwatch",
  "r6-vers-cs2",
  "cs2-vers-r6",
  "fortnite-vers-cs2",
  "cs2-vers-fortnite",
  "apex-vers-cs2",
  "overwatch-vers-cs2",
  "r6-vers-valorant",
  "valorant-vers-r6",
  "apex-vers-fortnite",
  "fortnite-vers-apex",
  "overwatch-vers-apex",
  "apex-vers-overwatch",
  "r6-vers-fortnite",
  "fortnite-vers-r6",
  "overwatch-vers-r6",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function parseSlug(slug: string): { source: Jeu; cible: Jeu } | null {
  const match = slug.match(/^([a-z0-9]+)-vers-([a-z0-9]+)$/);
  if (!match) return null;

  const jeuMap: Record<string, Jeu> = {
    cs2: "cs2",
    valorant: "valorant",
    apex: "apex",
    fortnite: "fortnite",
    overwatch: "overwatch",
    r6: "r6",
  };

  const source = jeuMap[match[1]];
  const cible = jeuMap[match[2]];

  if (!source || !cible) return null;
  return { source, cible };
}

export function generateStaticParams() {
  return CONVERSIONS_VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { source, cible } = parsed;
  const sourceLabel = JEUX_LABELS[source];
  const cibleLabel = JEUX_LABELS[cible];

  return {
    alternates: { canonical: `/convertisseur-sensibilite-fps/${slug}` },
    title: `Convertir sensibilite ${sourceLabel} vers ${cibleLabel}`,
    description: `Convertissez votre sensibilite ${sourceLabel} en ${cibleLabel}. Calcul cm/360° et eDPI automatique. Exemples avec 0.5, 1.0, 2.0 sens.`,
    keywords: `convertir ${sourceLabel.toLowerCase()} ${cibleLabel.toLowerCase()}, sensibilite fps, cm/360 ${sourceLabel.toLowerCase()}`,
    openGraph: {
      title: `${sourceLabel} → ${cibleLabel}`,
      description: `Convertisseur sensibilite ${sourceLabel} vers ${cibleLabel}`,
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

  const { source, cible } = parsed;
  const sourceLabel = JEUX_LABELS[source];
  const cibleLabel = JEUX_LABELS[cible];

  // Exemples de conversions courants (DPI 800)
  const dpi = 800;
  const sensExemples = [0.5, 1.0, 1.5, 2.0, 3.0];
  const exemples = sensExemples.map((sens) =>
    convertirSensibilite(source, cible, sens, dpi)
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Comment convertir ${sourceLabel} en ${cibleLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Utilisez notre convertisseur. Entrez votre sensibilite ${sourceLabel}, votre DPI, et il calcule automatiquement la sensibilite ${cibleLabel} equivalente basee sur le cm/360° (distance physique pour faire un tour complet).`,
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi les sensibilites sont differentes entre jeux ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Chaque jeu a un coefficient de sensibilite (yaw) different. Pour conserver le meme geste physique (cm/360°), la sensibilite du jeu doit s&apos;adapter. C&apos;est pourquoi ${sourceLabel} et ${cibleLabel} ne sont pas identiques.`,
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
        currentPage={`${sourceLabel} → ${cibleLabel}`}
        parentPage="Convertisseur Sensibilite FPS"
        parentHref="/convertisseur-sensibilite-fps"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎯
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {sourceLabel} → {cibleLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez votre sensibilite {sourceLabel} en {cibleLabel}. Basee sur cm/360°.
      </p>

      {/* Tableau des conversions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Exemples de conversions (DPI {dpi})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Sens {sourceLabel}
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Sens {cibleLabel}
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  cm/360°
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  eDPI
                </th>
              </tr>
            </thead>
            <tbody>
              {exemples.map((ex, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-slate-100 hover:bg-slate-50 ${
                    idx === 1 ? "bg-teal-50/50" : ""
                  }`}
                >
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {fmt(ex.sensSource, 2)}
                  </td>
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {fmt(ex.sensCible, 2)}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">
                    {fmt(ex.cm360Source, 1)} cm
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {fmt(ex.edpiSource, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <ConvertisseurSensiFps />


      {/* Explication */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi cette conversion ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {sourceLabel} et {cibleLabel} utilisent des coefficients de sensibilite differents (yaw).
          Pour preserver votre geste physique (cm/360°), la sensibilite du jeu doit s&apos;adapter
          automatiquement.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>Exemple concret :</strong> Si vous jouez {sourceLabel} avec 1.0 sens a 32 cm/360°
          (standard pro), la conversion en {cibleLabel} ajustera la sensibilite pour obtenir le meme
          32 cm/360°, soit environ{" "}
          <strong>
            {fmt(convertirSensibilite(source, cible, 1.0, 800).sensCible, 2)}
          </strong>{" "}
          sens {cibleLabel}.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Votre <strong>muscle memory</strong> reste intact : meme deplacement physique = meme resultat
          en jeu, quel que soit le jeu FPS.
        </p>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-sensibilite-fps" />
    </div>
  );
}
