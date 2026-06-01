import type { Metadata } from "next";
import CalculTempsTelechargement from "../CalculTempsTelechargement";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  calculerTempsTelechargement,
  JEUX_TAILLES,
  formatDuree,
} from "../tempsDlCalc";

// Variantes SEO populaires ~35 combinaisons
const VARIANTES = [
  // Taille × Débit standards (7 × 5 = 35 combos)
  // 5 Go
  "5go-en-8mbs",
  "5go-en-50mbs",
  "5go-en-100mbs",
  "5go-en-500mbs",
  "5go-en-1000mbs",
  // 10 Go
  "10go-en-8mbs",
  "10go-en-50mbs",
  "10go-en-100mbs",
  "10go-en-500mbs",
  "10go-en-1000mbs",
  // 30 Go
  "30go-en-50mbs",
  "30go-en-100mbs",
  "30go-en-500mbs",
  "30go-en-1000mbs",
  // 50 Go
  "50go-en-50mbs",
  "50go-en-100mbs",
  "50go-en-500mbs",
  "50go-en-1000mbs",
  // 100 Go
  "100go-en-50mbs",
  "100go-en-100mbs",
  "100go-en-500mbs",
  "100go-en-1000mbs",
  // 150 Go
  "150go-en-50mbs",
  "150go-en-100mbs",
  "150go-en-1000mbs",
  // 220 Go (CoD)
  "220go-en-50mbs",
  "220go-en-100mbs",
  "220go-en-1000mbs",
  // Variantes par jeu populaire
  "cyberpunk-en-100mbs",
  "gta5-en-100mbs",
  "fortnite-en-100mbs",
  "baldursgate3-en-100mbs",
  "starfield-en-100mbs",
  "cod-en-100mbs",
];

interface ParsedSlug {
  type: "taille-debit" | "jeu-debit";
  taille: number; // Go
  debit: number; // Mb/s
  jeuId?: string;
}

function parseSlug(slug: string): ParsedSlug | null {
  // Pattern: "100go-en-100mbs"
  const match1 = slug.match(/^(\d+)go-en-(\d+)mbs$/);
  if (match1) {
    return {
      type: "taille-debit",
      taille: parseInt(match1[1]),
      debit: parseInt(match1[2]),
    };
  }

  // Pattern: "cyberpunk-en-100mbs"
  const match2 = slug.match(/^([a-z0-9-]+)-en-(\d+)mbs$/);
  if (match2) {
    const jeuId = match2[1];
    const jeu = JEUX_TAILLES.find((j) => j.id === jeuId);
    if (jeu) {
      return {
        type: "jeu-debit",
        taille: jeu.taille_go,
        debit: parseInt(match2[2]),
        jeuId: jeuId,
      };
    }
  }

  return null;
}

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function generateStaticParams() {
  return VARIANTES.map((variante) => ({ params: variante }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const resultat = calculerTempsTelechargement(
    parsed.taille,
    "Go",
    parsed.debit,
    "Mb/s"
  );

  let title: string;
  let description: string;
  let canonical: string;

  if (parsed.type === "taille-debit") {
    title = `${parsed.taille} Go à ${parsed.debit} Mb/s : ${resultat.reelFormat}`;
    description = `Temps pour télécharger ${parsed.taille} Go à ${parsed.debit} Mb/s. Théorique: ${resultat.theoriqueFormat}, réel: ${resultat.reelFormat}.`;
    canonical = `/calcul-temps-telechargement/${slug}`;
  } else {
    const jeu = JEUX_TAILLES.find((j) => j.id === parsed.jeuId);
    title = `${jeu?.nom} (${parsed.taille}Go) à ${parsed.debit} Mb/s : ${resultat.reelFormat}`;
    description = `Combien de temps pour télécharger ${jeu?.nom} (${parsed.taille}Go) à ${parsed.debit} Mb/s? Réponse: ${resultat.reelFormat}.`;
    canonical = `/calcul-temps-telechargement/${slug}`;
  }

  return {
    alternates: { canonical },
    title,
    description,
    openGraph: {
      title,
      description,
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

  const resultat = calculerTempsTelechargement(
    parsed.taille,
    "Go",
    parsed.debit,
    "Mb/s"
  );

  let titre: string;
  let soustitre: string;
  const jeu = parsed.jeuId
    ? JEUX_TAILLES.find((j) => j.id === parsed.jeuId)
    : null;

  if (parsed.type === "jeu-debit" && jeu) {
    titre = `${jeu.emoji} ${jeu.nom} (${parsed.taille}Go) à ${parsed.debit} Mb/s`;
    soustitre = `Temps de téléchargement estimé`;
  } else {
    titre = `${parsed.taille} Go à ${parsed.debit} Mb/s`;
    soustitre = `Temps de téléchargement exact`;
  }

  // Tableau: autres débits pour cette taille
  const autrDebits = [8, 25, 50, 100, 500, 1000];

  // FAQ JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: titre,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${parsed.taille}Go à ${parsed.debit} Mb/s = ${resultat.reelFormat} (réel estimé avec overhead réseau).`,
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
        currentPage={titre}
        parentPage="Calcul Temps Telechargement"
        parentHref="/calcul-temps-telechargement"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {jeu?.emoji || "⏱️"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{titre}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{soustitre}</p>

      {/* Résultats principaux */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {/* Théorique */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-200/50">
          <p className="text-sm text-blue-100 mb-1">Temps théorique</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {resultat.theoriqueFormat}
          </p>
          <p className="text-xs text-blue-200 mt-2">Sans overhead réseau</p>
        </div>

        {/* Réel */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg shadow-red-200/50">
          <p className="text-sm text-red-100 mb-1">Temps réel estimé</p>
          <p className="text-4xl font-extrabold tracking-tight">
            {resultat.reelFormat}
          </p>
          <p className="text-xs text-red-200 mt-2">Avec overhead ~10%</p>
        </div>
      </div>

      {/* Tableau autres débits */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Temps avec d&apos;autres débits ({parsed.taille}Go)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Débit
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Théorique
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Réel estimé
                </th>
              </tr>
            </thead>
            <tbody>
              {autrDebits.map((debitTest) => {
                const resTest = calculerTempsTelechargement(
                  parsed.taille,
                  "Go",
                  debitTest,
                  "Mb/s"
                );
                const isActive = debitTest === parsed.debit;
                return (
                  <tr
                    key={debitTest}
                    className={`border-b border-slate-100 hover:bg-slate-50 ${
                      isActive ? "bg-cyan-50" : ""
                    }`}
                  >
                    <td
                      className={`py-3 px-2 font-medium ${
                        isActive ? "text-cyan-700" : "text-slate-700"
                      }`}
                    >
                      {debitTest} Mb/s
                    </td>
                    <td className="py-3 px-2 text-right text-slate-600">
                      {resTest.theoriqueFormat}
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-semibold ${
                        isActive ? "text-cyan-700" : "text-slate-800"
                      }`}
                    >
                      {resTest.reelFormat}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau autres jeux (si jeu actuel) */}
      {parsed.type === "jeu-debit" && jeu && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Temps pour d&apos;autres jeux à {parsed.debit} Mb/s
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">
                    Jeu
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Taille
                  </th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">
                    Temps
                  </th>
                </tr>
              </thead>
              <tbody>
                {JEUX_TAILLES.slice(0, 8).map((j) => {
                  const res = calculerTempsTelechargement(
                    j.taille_go,
                    "Go",
                    parsed.debit,
                    "Mb/s"
                  );
                  const isActive = j.id === parsed.jeuId;
                  return (
                    <tr
                      key={j.id}
                      className={`border-b border-slate-100 hover:bg-slate-50 ${
                        isActive ? "bg-cyan-50" : ""
                      }`}
                    >
                      <td
                        className={`py-3 px-2 font-medium ${
                          isActive ? "text-cyan-700" : "text-slate-700"
                        }`}
                      >
                        {j.emoji} {j.nom}
                      </td>
                      <td className="py-3 px-2 text-right text-slate-600">
                        {j.taille_go} Go
                      </td>
                      <td
                        className={`py-3 px-2 text-right font-semibold ${
                          isActive ? "text-cyan-700" : "text-slate-800"
                        }`}
                      >
                        {res.reelFormat}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Calculateur interactif
      </h2>
      <CalculTempsTelechargement />


      <RelatedCalculators currentSlug="/calcul-temps-telechargement" />
    </div>
  );
}
