import type { Metadata } from "next";
import CalculateurGainPari from "../CalculateurGainPari";
import Breadcrumb from "../../components/Breadcrumb";
import WebAppJsonLd from "../../components/WebAppJsonLd";

function parseSlug(slug: string): {
  mise: number;
  cote: number;
  miseStr: string;
  coteStr: string;
} | null {
  // Pattern: {mise}-euros-cote-{cote}
  // Ex: 10-euros-cote-2-50
  const match = slug.match(/^(\d+)-euros-cote-([\d-]+)$/);
  if (!match) return null;

  const mise = parseInt(match[1], 10);
  const coteStr = match[2].replace(/-/g, "."); // "2-50" -> "2.50"
  const cote = parseFloat(coteStr);

  if (isNaN(mise) || isNaN(cote) || mise <= 0 || cote <= 0) {
    return null;
  }

  return {
    mise,
    cote,
    miseStr: mise.toString(),
    coteStr: cote.toFixed(2),
  };
}

export async function generateStaticParams() {
  const MISES = [1, 5, 10, 20, 50, 100, 500];
  const COTES = [
    "1.25",
    "1.50",
    "1.80",
    "2.00",
    "2.50",
    "3.00",
    "5.00",
    "10.00",
  ];

  const params = [];
  for (const mise of MISES) {
    for (const cote of COTES) {
      const coteSlug = cote.replace(".", "-"); // "2.50" -> "2-50"
      params.push({
        params: `${mise}-euros-cote-${coteSlug}`,
      });
    }
  }

  return params;
}

type Params = Promise<{ params: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return {
      title: "Calculateur Gain Pari Sportif",
    };
  }

  const title = `Gain pari ${parsed.miseStr} EUR cote ${parsed.coteStr} - Calculateur`;
  const description = `Calcul du gain de pari sportif : mise ${parsed.miseStr} EUR, cote ${parsed.coteStr}. Conversion formats cotes et probabilité implicite.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/calculateur-gain-pari/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return (
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Paramètres invalides
        </h1>
        <p className="text-slate-600 mt-4">
          Format attendu : {`{mise}-euros-cote-{cote}`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <WebAppJsonLd
        name="Calculateur Gain Pari Sportif"
        description={`Calcul gain pari ${parsed.miseStr} EUR cote ${parsed.coteStr}`}
      />
      <Breadcrumb
        currentPage={`Mise ${parsed.miseStr} EUR, cote ${parsed.coteStr}`}
        parentPage="Calculateur Gain Pari Sportif"
        parentHref="/calculateur-gain-pari"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Gain pari : {parsed.miseStr} EUR à {parsed.coteStr}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul instantané du gain avec conversion de cotes (décimale, fractionnelle, américaine).
      </p>

      <CalculateurGainPari />

    </div>
  );
}
