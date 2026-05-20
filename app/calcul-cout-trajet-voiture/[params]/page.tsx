import type { Metadata } from "next";
import CalculCoutTrajetVoiture from "../CalculCoutTrajetVoiture";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import {
  calculerCoutTrajet,
  getCarburantInfo,
  TRAJETS_POPULAIRES,
  type TypeCarburant,
} from "../coutTrajetCalc";

interface VarianteSlug {
  slug: string;
  // Soit trajet ville-ville, soit km-conso
  type: "trajet" | "kmconso";
  origine?: string;
  destination?: string;
  distanceKm: number;
  peages: number;
  consommation: number;
  carburant: TypeCarburant;
}

function buildVariantes(): VarianteSlug[] {
  const variantes: VarianteSlug[] = [];

  // Trajets ville-ville × essence/diesel/electrique
  for (const trajet of TRAJETS_POPULAIRES) {
    // Essence
    variantes.push({
      slug: `${trajet.slug}-essence`,
      type: "trajet",
      origine: trajet.origine,
      destination: trajet.destination,
      distanceKm: trajet.distanceKm,
      peages: trajet.peagesEstimes,
      consommation: 7,
      carburant: "essence",
    });
    // Diesel (uniquement pour quelques trajets pour pas trop gonfler)
    if (["paris-lyon", "paris-marseille", "paris-bordeaux"].includes(trajet.slug)) {
      variantes.push({
        slug: `${trajet.slug}-diesel`,
        type: "trajet",
        origine: trajet.origine,
        destination: trajet.destination,
        distanceKm: trajet.distanceKm,
        peages: trajet.peagesEstimes,
        consommation: 5.5,
        carburant: "diesel",
      });
    }
    // Electrique
    if (["paris-lyon", "paris-marseille", "paris-bordeaux", "marseille-nice"].includes(trajet.slug)) {
      variantes.push({
        slug: `${trajet.slug}-electrique`,
        type: "trajet",
        origine: trajet.origine,
        destination: trajet.destination,
        distanceKm: trajet.distanceKm,
        peages: trajet.peagesEstimes,
        consommation: 17,
        carburant: "electrique",
      });
    }
  }

  // Variantes km-conso generiques
  const kmConsoVariantes: Array<{ km: number; conso: number; carburant: TypeCarburant }> = [
    { km: 100, conso: 7, carburant: "essence" },
    { km: 500, conso: 7, carburant: "essence" },
    { km: 1000, conso: 7, carburant: "essence" },
  ];
  for (const v of kmConsoVariantes) {
    variantes.push({
      slug: `${v.km}km-${v.conso}L-${v.carburant}`,
      type: "kmconso",
      distanceKm: v.km,
      peages: 0,
      consommation: v.conso,
      carburant: v.carburant,
    });
  }

  return variantes;
}

const VARIANTES = buildVariantes();

function parseSlug(slug: string): VarianteSlug | null {
  return VARIANTES.find((v) => v.slug === slug) || null;
}

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const info = getCarburantInfo(parsed.carburant);
  const resultat = calculerCoutTrajet(
    parsed.distanceKm,
    parsed.consommation,
    info.prixMoyen,
    parsed.peages,
    parsed.carburant,
  );

  const titre =
    parsed.type === "trajet" && parsed.origine && parsed.destination
      ? `Cout trajet ${parsed.origine}-${parsed.destination} en ${info.nom.toLowerCase()}`
      : `Cout trajet ${parsed.distanceKm} km, ${parsed.consommation} ${info.unite}/100 (${info.nom})`;

  const desc =
    parsed.type === "trajet" && parsed.origine && parsed.destination
      ? `Trajet ${parsed.origine}-${parsed.destination} (${parsed.distanceKm} km) en ${info.nom.toLowerCase()} : cout total ${resultat.coutTotal.toFixed(2)} € (carburant + peages). Prix moyens France 2026.`
      : `Trajet de ${parsed.distanceKm} km avec une consommation de ${parsed.consommation} ${info.unite}/100 km en ${info.nom.toLowerCase()} = ${resultat.coutTotal.toFixed(2)} € au prix moyen ${info.prixMoyen} €/${info.unite}.`;

  return {
    alternates: { canonical: `/calcul-cout-trajet-voiture/${slug}` },
    title: titre,
    description: desc,
    keywords: `cout ${parsed.origine || parsed.distanceKm + "km"} ${parsed.destination || ""}, prix essence ${parsed.distanceKm} km, ${info.nom.toLowerCase()} trajet`,
    openGraph: {
      title: titre,
      description: `Cout total : ${resultat.coutTotal.toFixed(2)} € en ${info.nom.toLowerCase()}.`,
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

  const info = getCarburantInfo(parsed.carburant);
  const resultat = calculerCoutTrajet(
    parsed.distanceKm,
    parsed.consommation,
    info.prixMoyen,
    parsed.peages,
    parsed.carburant,
  );

  const titreH1 =
    parsed.type === "trajet" && parsed.origine && parsed.destination
      ? `${parsed.origine} - ${parsed.destination} en ${info.nom.toLowerCase()}`
      : `Trajet de ${parsed.distanceKm} km en ${info.nom.toLowerCase()}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coute ce trajet en ${info.nom.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${parsed.distanceKm} km avec une consommation de ${parsed.consommation} ${info.unite}/100 et un prix de ${info.prixMoyen} €/${info.unite}, le cout total est de ${resultat.coutTotal.toFixed(2)} € (carburant : ${resultat.coutCarburant.toFixed(2)} € + peages : ${parsed.peages.toFixed(2)} €). Le cout par km est de ${(resultat.coutParKm * 100).toFixed(1)} centimes.`,
        }
      },
      {
        "@type": "Question",
        name: `Combien de ${info.unite} consommes pour ce trajet ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${resultat.carburantConsomme} ${info.unite} de ${info.nom.toLowerCase()} (calcul : ${parsed.distanceKm} × ${parsed.consommation} / 100). Empreinte CO2 : ${resultat.emissionsCO2.toFixed(1)} kg.`,
        }
      },
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Breadcrumb currentPage={titreH1} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {titreH1}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Cout total : <strong>{resultat.coutTotal.toFixed(2)} €</strong> ({resultat.coutCarburant.toFixed(2)} € carburant + {parsed.peages.toFixed(2)} € peages). Soit {(resultat.coutParKm * 100).toFixed(1)} centimes par km.
      </p>

      <CalculCoutTrajetVoiture />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Detail du calcul
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">Cout total aller</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">{resultat.coutTotal.toFixed(2)} €</p>
            <p className="text-sm text-blue-700 mt-1">carburant + peages</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700 font-medium">Aller-retour estime</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{resultat.coutAllerRetour.toFixed(2)} €</p>
            <p className="text-sm text-slate-600 mt-1">{(resultat.coutAllerRetour / 2).toFixed(2)} € par sens</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700">Distance</span>
            <span className="font-semibold text-slate-800">{parsed.distanceKm} km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Type carburant</span>
            <span className="font-semibold text-slate-800">{info.nom}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Consommation</span>
            <span className="font-semibold text-slate-800">{parsed.consommation} {info.unite}/100 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Prix unitaire</span>
            <span className="font-semibold text-slate-800">{info.prixMoyen.toFixed(2)} €/{info.unite}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Carburant total consomme</span>
            <span className="font-semibold text-slate-800">{resultat.carburantConsomme} {info.unite}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Peages</span>
            <span className="font-semibold text-slate-800">{parsed.peages.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between border-t border-slate-300 pt-2">
            <span className="text-slate-700">Cout par km</span>
            <span className="font-semibold text-slate-800">{resultat.coutParKm.toFixed(3)} €</span>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-green-900 mb-4">Empreinte carbone</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700">Emissions CO2 du trajet</p>
            <p className="text-3xl font-bold text-green-900 mt-1">{resultat.emissionsCO2.toFixed(1)} kg</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700">Equivalent arbres / an</p>
            <p className="text-3xl font-bold text-green-900 mt-1">{resultat.arbresEquivalents.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comparaison avec autres modes</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚗</span>
              <p className="font-semibold text-blue-900 text-sm">Voiture {info.nom.toLowerCase()}</p>
            </div>
            <p className="text-xl font-bold text-blue-900">{resultat.coutTotal.toFixed(2)} €</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚆</span>
              <p className="font-semibold text-slate-800 text-sm">Train (estimation)</p>
            </div>
            <p className="text-xl font-bold text-slate-800">{resultat.prixTrainEstime.toFixed(2)} €</p>
          </div>
          {resultat.prixAvionEstime > 0 && (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✈️</span>
                <p className="font-semibold text-slate-800 text-sm">Avion (low cost)</p>
              </div>
              <p className="text-xl font-bold text-slate-800">{resultat.prixAvionEstime.toFixed(2)} €</p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Autres variantes</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {VARIANTES.filter((v) => v.slug !== slug)
            .slice(0, 10)
            .map((v) => {
              const i = getCarburantInfo(v.carburant);
              const r = calculerCoutTrajet(v.distanceKm, v.consommation, i.prixMoyen, v.peages, v.carburant);
              const label =
                v.type === "trajet" && v.origine && v.destination
                  ? `${v.origine}-${v.destination} (${i.nom.toLowerCase()})`
                  : `${v.distanceKm} km, ${v.consommation} ${i.unite}/100 (${i.nom.toLowerCase()})`;
              return (
                <a
                  key={v.slug}
                  href={`/calcul-cout-trajet-voiture/${v.slug}`}
                  className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition text-sm"
                >
                  <strong>{label}</strong> = {r.coutTotal.toFixed(2)} €
                </a>
              );
            })}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-cout-trajet-voiture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
