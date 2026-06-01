import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurPensionAlimentaireBE from "../CalculateurPensionAlimentaireBE";
import { calculerPensionAlimentaireBE } from "../pensionAlimentaireBeCalc";
import Breadcrumb from "../../../components/Breadcrumb";

// Tableaux de valeurs possibles pour limiter les combinaisons
const REVENUS_P1 = [2000, 3000, 4000, 5000];
const REVENUS_P2 = [0, 1500, 2500, 3500];
const AGES = [5, 10, 15];
const ENFANTS = [1, 2, 3];

export async function generateStaticParams() {
  const params = [];
  for (const r1 of REVENUS_P1) {
    for (const r2 of REVENUS_P2) {
      for (const age of AGES) {
        for (const nbE of ENFANTS) {
          params.push({
            params: `${r1}-euros-${r2}-euros-${age}-ans-${nbE}-enfant`,
          });
        }
      }
    }
  }
  return params;
}

function parseParams(slug: string) {
  // Format: 3000-euros-2000-euros-10-ans-2-enfant
  const match = slug.match(
    /^(\d+)-euros-(\d+)-euros-(\d+)-ans-(\d+)-enfant$/
  );
  if (!match)
    return {
      revenusP1: null,
      revenusP2: null,
      age: null,
      nbEnfants: null,
    };

  return {
    revenusP1: parseInt(match[1]),
    revenusP2: parseInt(match[2]),
    age: parseInt(match[3]),
    nbEnfants: parseInt(match[4]),
  };
}

function isValidValue(r1: number, r2: number, age: number, nbE: number) {
  return (
    REVENUS_P1.includes(r1) &&
    REVENUS_P2.includes(r2) &&
    AGES.includes(age) &&
    ENFANTS.includes(nbE)
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const { revenusP1, revenusP2, age, nbEnfants } = parseParams(slug);

  if (
    revenusP1 === null ||
    revenusP2 === null ||
    age === null ||
    nbEnfants === null ||
    !isValidValue(revenusP1, revenusP2, age, nbEnfants)
  ) {
    notFound();
  }

  const resultat = calculerPensionAlimentaireBE(
    revenusP1,
    revenusP2,
    age,
    nbEnfants,
    true
  );

  const pensionFormatted = resultat.pensionAVerser.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return {
    title: `Pension ${pensionFormatted} EUR - ${revenusP1}€ P1, ${revenusP2}€ P2, ${age} ans, ${nbEnfants} enfant`,
    description: `Simulation pension alimentaire Belgique: Parent 1 ${revenusP1}EUR, Parent 2 ${revenusP2}EUR, enfant ${age} ans. Résultat: ${pensionFormatted}EUR/mois. Méthode Renard.`,
    alternates: {
      canonical: `/be/pension-alimentaire/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const { revenusP1, revenusP2, age, nbEnfants } = parseParams(slug);

  if (
    revenusP1 === null ||
    revenusP2 === null ||
    age === null ||
    nbEnfants === null ||
    !isValidValue(revenusP1, revenusP2, age, nbEnfants)
  ) {
    notFound();
  }

  const resultat = calculerPensionAlimentaireBE(
    revenusP1,
    revenusP2,
    age,
    nbEnfants,
    true
  );

  const pensionFormatted = resultat.pensionAVerser.toLocaleString("fr-BE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment est calculée cette pension alimentaire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Simulation selon la méthode Renard: Revenus Parent 1: ${revenusP1}EUR, Revenus Parent 2: ${revenusP2}EUR, Âge enfant: ${age} ans, Nombre enfants: ${nbEnfants}. Pension résultante: ${pensionFormatted}EUR.`,
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        currentPage={`${revenusP1}EUR - ${revenusP2}EUR - ${age} ans`}
        parentPage="Pension Alimentaire"
        parentHref="/be/pension-alimentaire"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👨‍👩‍👧
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulation: Pension{" "}
          <span className="text-pink-600">{pensionFormatted} EUR</span>
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Résultats pour Parent 1 ({revenusP1}EUR) et Parent 2 ({revenusP2}EUR),
        enfant de {age} ans ({nbEnfants} enfant).
      </p>

      <CalculateurPensionAlimentaireBE />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détails de cette simulation
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-400">Revenus Parent 1</p>
            <p className="text-2xl font-bold text-slate-800">
              {revenusP1.toLocaleString("fr-BE")}€
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-400">Revenus Parent 2</p>
            <p className="text-2xl font-bold text-slate-800">
              {revenusP2.toLocaleString("fr-BE")}€
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-400">Âge enfant</p>
            <p className="text-2xl font-bold text-slate-800">{age} ans</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-400">Nombre enfants</p>
            <p className="text-2xl font-bold text-slate-800">{nbEnfants}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200 p-6">
          <p className="text-sm text-pink-600 font-semibold mb-1">
            Pension à verser
          </p>
          <p className="text-4xl font-bold text-pink-700">{pensionFormatted}</p>
          <p className="text-sm text-pink-600 mt-2">EUR/mois (estimation)</p>
        </div>
      </section>

    </div>
  );
}
