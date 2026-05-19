import type { Metadata } from "next";
import CalculZakat from "../CalculZakat";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerZakat, type EcoleNisab } from "../zakatCalc";

// 25 variantes SEO populaires
const VARIANTES = [
  // Patrimoines progressifs (majoritaire, nisab or)
  "5000-euros",
  "10000-euros",
  "15000-euros",
  "20000-euros",
  "25000-euros",
  "30000-euros",
  "40000-euros",
  "50000-euros",
  "75000-euros",
  "100000-euros",
  "150000-euros",
  "200000-euros",

  // Variantes avec école explicite
  "10000-euros-majoritaire",
  "25000-euros-hanafite",
  "50000-euros-majoritaire",
  "100000-euros-hanafite",

  // Variantes épargne seule
  "5000-euros-epargne",
  "10000-euros-epargne",
  "25000-euros-epargne",

  // Comparatifs nisab
  "nisab-or-actuel",
  "nisab-argent-actuel",

  // Cas spéciaux
  "calcul-zakat-avec-bijoux",
  "zakat-dettes-court-terme",
  "hawl-annee-lunaire",
  "zakat-crypto-avis-ecfr",
];

function fmt(n: number, digits = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

interface ParsedSlug {
  patrimoine?: number;
  ecole?: EcoleNisab;
  epargne?: boolean;
  nisab?: "or" | "argent";
  special?: string;
}

function parseSlug(slug: string): ParsedSlug | null {
  // Format: 5000-euros
  const match1 = slug.match(/^(\d+)-euros$/);
  if (match1) {
    return { patrimoine: parseFloat(match1[1]), ecole: "or" };
  }

  // Format: 10000-euros-majoritaire ou 10000-euros-hanafite
  const match2 = slug.match(/^(\d+)-euros-(majoritaire|hanafite)$/);
  if (match2) {
    return { patrimoine: parseFloat(match2[1]), ecole: match2[2] as EcoleNisab };
  }

  // Format: 5000-euros-epargne
  const match3 = slug.match(/^(\d+)-euros-epargne$/);
  if (match3) {
    return { patrimoine: parseFloat(match3[1]), ecole: "or", epargne: true };
  }

  // Format: nisab-or-actuel ou nisab-argent-actuel
  const match4 = slug.match(/^nisab-(or|argent)-actuel$/);
  if (match4) {
    return { nisab: match4[1] as "or" | "argent" };
  }

  // Format special: calcul-zakat-avec-bijoux, etc.
  const specialCases = [
    "calcul-zakat-avec-bijoux",
    "zakat-dettes-court-terme",
    "hawl-annee-lunaire",
    "zakat-crypto-avis-ecfr",
  ];
  if (specialCases.includes(slug)) {
    return { special: slug };
  }

  return null;
}

export function generateStaticParams() {
  return VARIANTES.map((slug) => ({ params: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  // Valeurs par défaut pour calcul
  const PRIX_OR_DEFAULT = 125;
  const PRIX_ARGENT_DEFAULT = 2.57;

  // Cas spécial: nisab
  if (parsed.nisab) {
    const nisab_or = NISAB_OR_GRAMMES * PRIX_OR_DEFAULT;
    const nisab_argent = NISAB_ARGENT_GRAMMES * PRIX_ARGENT_DEFAULT;
    const nisabValue =
      parsed.nisab === "or" ? nisab_or : nisab_argent;
    const ecole = parsed.nisab === "or" ? "majoritaire" : "hanafite";
    return {
      alternates: { canonical: `/calcul-zakat/${slug}` },
      title: `Nisab ${parsed.nisab} actuel 2026 = ${fmt(nisabValue, 2)} € - Zakat`,
      description: `Nisab ${parsed.nisab} aujourd'hui : ${fmt(nisabValue, 2)} €. Seuil minimum pour zakatable selon école ${ecole}.`,
      keywords: `nisab ${parsed.nisab} 2026, zakat nisab actuel, seuil zakat`,
    };
  }

  // Cas spéciaux textuels
  if (parsed.special) {
    const titles: Record<string, string> = {
      "calcul-zakat-avec-bijoux": "Bijoux zakatables - Hanafite vs Maliki/Chafii/Hanbali",
      "zakat-dettes-court-terme": "Dettes court terme et Zakat - Calcul déductibles",
      "hawl-annee-lunaire": "Hawl (année lunaire) - Condition Zakat",
      "zakat-crypto-avis-ecfr": "Cryptomonnaies et Zakat - Avis ECFR/AAOIFI",
    };
    const descriptions: Record<string, string> = {
      "calcul-zakat-avec-bijoux":
        "Calcul Zakat avec bijoux : Hanafite oui, Maliki/Chafii non si portés usage habituel.",
      "zakat-dettes-court-terme":
        "Dettes court terme (12 mois) déductibles. Pas prêts long terme.",
      "hawl-annee-lunaire":
        "Hawl : patrimoine ≥ nisab pendant 1 année lunaire (354j) pour Zakat.",
      "zakat-crypto-avis-ecfr":
        "Cryptomonnaies zakatables selon ECFR/AAOIFI. Valeur EUR calcul.",
    };
    return {
      alternates: { canonical: `/calcul-zakat/${slug}` },
      title: (titles[parsed.special] || "Zakat") + " - Calcul 2026",
      description: descriptions[parsed.special] || "Calcul Zakat.",
      keywords: parsed.special.replace(/-/g, ", "),
    };
  }

  // Cas patrimoine
  if (parsed.patrimoine) {
    const zakat = parsed.patrimoine * 0.025;
    const epargneLabel = parsed.epargne ? " (épargne)" : "";
    const ecoleLabel =
      parsed.ecole === "or" ? "majoritaire (nisab or)" : "hanafite (nisab argent)";
    return {
      alternates: { canonical: `/calcul-zakat/${slug}` },
      title: `Zakat ${fmt(parsed.patrimoine, 0)}€${epargneLabel} = ${fmt(zakat, 2)}€ (école ${ecoleLabel})`,
      description: `Calcul Zakat pour patrimoine ${fmt(parsed.patrimoine, 0)}€${epargneLabel}. Zakat due : ${fmt(zakat, 2)}€ selon école ${ecoleLabel}.`,
      keywords: `zakat ${fmt(parsed.patrimoine, 0)} euros, calcul zakat ${parsed.ecole}, aumone ${fmt(zakat, 2)} euros`,
    };
  }

  return {};
}

// Constantes
const NISAB_OR_GRAMMES = 85;
const NISAB_ARGENT_GRAMMES = 595;

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const PRIX_OR_DEFAULT = 125;
  const PRIX_ARGENT_DEFAULT = 2.57;

  // Calcul pour affichage
  let pageTitle = "Zakat al-Mal";
  let pageDescription = "";
  let emphasizedValue = "";

  if (parsed.nisab) {
    const nisab_or = NISAB_OR_GRAMMES * PRIX_OR_DEFAULT;
    const nisab_argent = NISAB_ARGENT_GRAMMES * PRIX_ARGENT_DEFAULT;
    const nisabValue =
      parsed.nisab === "or" ? nisab_or : nisab_argent;
    const ecole = parsed.nisab === "or" ? "majoritaire" : "hanafite";
    pageTitle = `Nisab ${parsed.nisab} actuel`;
    pageDescription = `Le nisab ${parsed.nisab} aujourd'hui est de ${fmt(nisabValue, 2)}€ selon école ${ecole}.`;
    emphasizedValue = fmt(nisabValue, 2) + " €";
  } else if (parsed.special) {
    const specialTitles: Record<string, string> = {
      "calcul-zakat-avec-bijoux": "Bijoux et Zakat",
      "zakat-dettes-court-terme": "Dettes court terme",
      "hawl-annee-lunaire": "Hawl (année lunaire)",
      "zakat-crypto-avis-ecfr": "Cryptomonnaies",
    };
    pageTitle = specialTitles[parsed.special] || "Zakat";
    pageDescription =
      "Page d'information sur " + pageTitle.toLowerCase() + ".";
  } else if (parsed.patrimoine) {
    const zakat = parsed.patrimoine * 0.025;
    const epargneLabel = parsed.epargne ? " en épargne" : "";
    pageTitle = `Zakat pour ${fmt(parsed.patrimoine, 0)}€${epargneLabel}`;
    pageDescription = `Avec un patrimoine de ${fmt(parsed.patrimoine, 0)}€${epargneLabel}, votre Zakat est ${fmt(zakat, 2)}€.`;
    emphasizedValue = fmt(zakat, 2) + " €";
  }

  return (
    <div>
      <Breadcrumb currentPage={pageTitle} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🕋
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
          {pageTitle}
        </h1>
      </div>
      {pageDescription && (
        <p className="text-slate-500 mb-8 ml-[52px]">{pageDescription}</p>
      )}

      {emphasizedValue && (
        <div className="mb-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 p-6">
          <p className="text-sm text-emerald-700 mb-2">Résultat clé</p>
          <p className="text-4xl font-extrabold text-emerald-700">
            {emphasizedValue}
          </p>
        </div>
      )}

      <CalculZakat />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Tableau comparatif patrimoines */}
      {parsed.patrimoine && (
        <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Comparaison d&apos;autres patrimoines
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Patrimoine
                  </th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Zakat (2,5%)
                  </th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Nisab Or
                  </th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">
                    Zakatable ?
                  </th>
                </tr>
              </thead>
              <tbody>
                {[5000, 10000, 25000, 50000, 100000, 150000, 200000].map(
                  (p) => {
                    const z = p * 0.025;
                    const nisab = NISAB_OR_GRAMMES * PRIX_OR_DEFAULT;
                    const eligible = p >= nisab;
                    return (
                      <tr
                        key={p}
                        className={
                          p === parsed.patrimoine
                            ? "bg-emerald-50 border-b border-slate-100 font-semibold"
                            : "border-b border-slate-100"
                        }
                      >
                        <td className="py-3 px-4 text-slate-800">
                          {fmt(p, 0)} €
                        </td>
                        <td className="py-3 px-4 text-slate-800">
                          {fmt(z, 2)} €
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {fmt(nisab, 2)} €
                        </td>
                        <td className="py-3 px-4">
                          {eligible ? (
                            <span className="text-emerald-600 font-semibold">
                              ✓ Oui
                            </span>
                          ) : (
                            <span className="text-slate-400">✗ Non</span>
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/calcul-zakat" />
    </div>
  );
}
