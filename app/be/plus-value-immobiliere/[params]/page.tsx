import type { Metadata } from "next";
import CalculateurPlusValueBE from "../CalculateurPlusValueBE";
import Breadcrumb from "../../../components/Breadcrumb";
import { calculerPlusValueBE, type TypeBien } from "../plusValueImmoBeCalc";

// Paramètres pour les pages dynamiques
const PRIX_ACHATS = [150000, 200000, 250000, 300000];
const PRIX_VENTES = [180000, 250000, 300000, 400000];
const DUREES = [2, 4, 6, 10];
const TYPES: TypeBien[] = [
  "habitation-principale",
  "bati-investissement",
  "non-bati-terrain",
];

export function generateStaticParams() {
  const params: {
    params: string;
  }[] = [];

  for (const prixAchat of PRIX_ACHATS) {
    for (const prixVente of PRIX_VENTES) {
      // Ne générer que si prixVente > prixAchat
      if (prixVente <= prixAchat) continue;

      for (const duree of DUREES) {
        for (const typeCode of ["habitation", "bati", "terrain"]) {
          const slug = `${prixAchat}-euros-${prixVente}-euros-${duree}-ans-${typeCode}`;
          params.push({ params: slug });
        }
      }
    }
  }

  return params;
}

function parseSlug(slug: string): {
  prixAchat: number;
  prixVente: number;
  duree: number;
  type: TypeBien;
} | null {
  // Format: {prixAchat}-euros-{prixVente}-euros-{duree}-ans-{type}
  const match = slug.match(
    /^(\d+)-euros-(\d+)-euros-(\d+)-ans-(habitation|bati|terrain)$/
  );

  if (!match) return null;

  const prixAchat = parseInt(match[1]);
  const prixVente = parseInt(match[2]);
  const duree = parseInt(match[3]);
  const typeCode = match[4];

  let type: TypeBien;
  if (typeCode === "habitation") {
    type = "habitation-principale";
  } else if (typeCode === "bati") {
    type = "bati-investissement";
  } else if (typeCode === "terrain") {
    type = "non-bati-terrain";
  } else {
    return null;
  }

  return { prixAchat, prixVente, duree, type };
}

export async function generateMetadata(props: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await props.params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return { title: "Plus-Value Immobilière" };
  }

  const typeLabel =
    parsed.type === "habitation-principale"
      ? "habitation principale"
      : parsed.type === "bati-investissement"
        ? "bien bâti"
        : "terrain";

  const title = `Plus-Value ${parsed.prixVente}€ - ${parsed.prixAchat}€ (${parsed.duree} ans) | ${typeLabel}`;
  const description = `Calcul plus-value immobilière Belgique : achat ${parsed.prixAchat}€, vente ${parsed.prixVente}€, ${parsed.duree} ans détention (${typeLabel}). Taxe instantanée.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/be/plus-value-immobiliere/${slug}`,
      languages: {
        "fr-BE": `/be/plus-value-immobiliere/${slug}`,
      },
    },
  };
}

export default async function DynamicPage(props: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await props.params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return <div>Page non trouvée</div>;
  }

  const resultat = calculerPlusValueBE(
    parsed.prixAchat,
    parsed.prixVente,
    parsed.prixAchat * 0.125, // Frais forfaitaires 12.5%
    0, // Pas de travaux par défaut
    parsed.duree,
    parsed.type
  );

  const typeLabel =
    parsed.type === "habitation-principale"
      ? "habitation principale"
      : parsed.type === "bati-investissement"
        ? "bien bâti"
        : "terrain";

  return (
    <div>
      <Breadcrumb
        currentPage={`Plus-Value ${parsed.prixVente}€`}
        parentPage="Plus-Value Immobilière"
        parentHref="/be/plus-value-immobiliere"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Plus-Value Immobilière : {parsed.prixVente.toLocaleString(
            "fr-BE"
          )} EUR
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Achat {parsed.prixAchat.toLocaleString("fr-BE")} EUR • Vente{" "}
        {parsed.prixVente.toLocaleString("fr-BE")} EUR • {parsed.duree} ans
        détention • {typeLabel}
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="text-xs font-medium text-slate-400">Prix d&apos;achat</p>
            <p className="text-xl font-bold text-slate-800 mt-1">
              {parsed.prixAchat.toLocaleString("fr-BE")} EUR
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Prix de vente</p>
            <p className="text-xl font-bold text-slate-800 mt-1">
              {parsed.prixVente.toLocaleString("fr-BE")} EUR
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Durée</p>
            <p className="text-xl font-bold text-slate-800 mt-1">
              {parsed.duree} ans
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Type</p>
            <p className="text-xl font-bold text-slate-800 mt-1">{typeLabel}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Taux</p>
            <p className="text-xl font-bold text-slate-800 mt-1">
              {(resultat.taux * 100).toFixed(1)} %
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-2xl p-6 shadow-lg shadow-purple-200/50">
          <p className="text-sm text-purple-100 mb-1">Plus-value nette</p>
          <p className="text-3xl font-extrabold">
            {resultat.plusValueNette.toLocaleString("fr-BE")} EUR
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Plus-value brute</p>
          <p className="text-2xl font-bold text-slate-800">
            {resultat.plusValueBrute.toLocaleString("fr-BE")} EUR
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-medium text-slate-400 mb-1">Impôt à payer</p>
          <p className="text-2xl font-bold text-red-600">
            {resultat.impotPlusValue.toLocaleString("fr-BE")} EUR
          </p>
        </div>
      </div>


      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détail du calcul
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Prix de vente</span>
            <span className="font-semibold text-slate-800">
              {parsed.prixVente.toLocaleString("fr-BE")} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">- Prix d&apos;achat</span>
            <span className="font-semibold text-slate-800">
              -{parsed.prixAchat.toLocaleString("fr-BE")} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">- Frais d&apos;acquisition (12.5%)</span>
            <span className="font-semibold text-slate-800">
              -{(parsed.prixAchat * 0.125).toLocaleString("fr-BE")} EUR
            </span>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex justify-between font-bold">
            <span className="text-slate-800">= Plus-value brute</span>
            <span className="text-slate-800">
              {resultat.plusValueBrute.toLocaleString("fr-BE")} EUR
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">
              - Impôt ({(resultat.taux * 100).toFixed(1)}%)
            </span>
            <span className="font-semibold text-red-600">
              -{resultat.impotPlusValue.toLocaleString("fr-BE")} EUR
            </span>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex justify-between font-bold text-lg">
            <span className="text-slate-800">= Plus-value nette</span>
            <span className="text-purple-600">
              {resultat.plusValueNette.toLocaleString("fr-BE")} EUR
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700 leading-relaxed mb-8">
        <p className="font-semibold mb-2">Infos importantes</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Frais d&apos;acquisition estimés à 12.5% du prix d&apos;achat.</li>
          <li>Travaux déductibles uniquement avec factures à l&apos;appui.</li>
          <li>
            Consulter un notaire pour une analyse précise de votre situation.
          </li>
        </ul>
      </div>

      <CalculateurPlusValueBE />
    </div>
  );
}
