import type { Metadata } from "next";
import CalculCoteArgusVoiture from "../CalculCoteArgusVoiture";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerCoteArgus, type Carburant } from "../coteArgusCalc";

interface VarianteVoiture {
  slug: string;
  marque: string;
  modele: string;
  annee: number;
  prixNeuf: number;
  kilometrage: number;
  carburant: Carburant;
}

const VARIANTES: VarianteVoiture[] = [
  { slug: "renault-clio-2020", marque: "Renault", modele: "Clio V", annee: 2020, prixNeuf: 17500, kilometrage: 75000, carburant: "essence" },
  { slug: "peugeot-208-2019", marque: "Peugeot", modele: "208 II", annee: 2019, prixNeuf: 18900, kilometrage: 85000, carburant: "essence" },
  { slug: "citroen-c3-2018", marque: "Citroën", modele: "C3 III", annee: 2018, prixNeuf: 16800, kilometrage: 100000, carburant: "essence" },
  { slug: "renault-megane-2019", marque: "Renault", modele: "Mégane IV", annee: 2019, prixNeuf: 24500, kilometrage: 90000, carburant: "diesel" },
  { slug: "peugeot-308-2020", marque: "Peugeot", modele: "308 II", annee: 2020, prixNeuf: 26900, kilometrage: 72000, carburant: "diesel" },
  { slug: "dacia-sandero-2021", marque: "Dacia", modele: "Sandero III", annee: 2021, prixNeuf: 12500, kilometrage: 55000, carburant: "essence" },
  { slug: "renault-captur-2020", marque: "Renault", modele: "Captur II", annee: 2020, prixNeuf: 22500, kilometrage: 78000, carburant: "essence" },
  { slug: "peugeot-3008-2018", marque: "Peugeot", modele: "3008 II", annee: 2018, prixNeuf: 32500, kilometrage: 110000, carburant: "diesel" },
  { slug: "volkswagen-golf-2019", marque: "Volkswagen", modele: "Golf VII", annee: 2019, prixNeuf: 26800, kilometrage: 88000, carburant: "essence" },
  { slug: "ford-fiesta-2018", marque: "Ford", modele: "Fiesta VII", annee: 2018, prixNeuf: 16500, kilometrage: 95000, carburant: "essence" },
  { slug: "toyota-yaris-2020", marque: "Toyota", modele: "Yaris IV", annee: 2020, prixNeuf: 19500, kilometrage: 70000, carburant: "hybride" },
  { slug: "toyota-corolla-2021", marque: "Toyota", modele: "Corolla XII", annee: 2021, prixNeuf: 25900, kilometrage: 50000, carburant: "hybride" },
  { slug: "renault-zoe-2020", marque: "Renault", modele: "Zoé II", annee: 2020, prixNeuf: 24500, kilometrage: 65000, carburant: "electrique" },
  { slug: "tesla-model-3-2021", marque: "Tesla", modele: "Model 3", annee: 2021, prixNeuf: 49900, kilometrage: 60000, carburant: "electrique" },
  { slug: "bmw-serie-1-2019", marque: "BMW", modele: "Série 1 F40", annee: 2019, prixNeuf: 32000, kilometrage: 90000, carburant: "essence" },
  { slug: "audi-a3-2018", marque: "Audi", modele: "A3 III Sportback", annee: 2018, prixNeuf: 35500, kilometrage: 105000, carburant: "diesel" },
  { slug: "mercedes-classe-a-2019", marque: "Mercedes", modele: "Classe A W177", annee: 2019, prixNeuf: 33900, kilometrage: 92000, carburant: "essence" },
  { slug: "fiat-500-2020", marque: "Fiat", modele: "500", annee: 2020, prixNeuf: 14500, kilometrage: 60000, carburant: "essence" },
  { slug: "nissan-qashqai-2019", marque: "Nissan", modele: "Qashqai II", annee: 2019, prixNeuf: 27800, kilometrage: 95000, carburant: "diesel" },
  { slug: "hyundai-tucson-2020", marque: "Hyundai", modele: "Tucson III", annee: 2020, prixNeuf: 28500, kilometrage: 80000, carburant: "diesel" },
];

function findVariante(slug: string): VarianteVoiture | null {
  return VARIANTES.find((v) => v.slug === slug) || null;
}

export function generateStaticParams() {
  return VARIANTES.map((v) => ({ params: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const v = findVariante(slug);
  if (!v) return {};

  const resultat = calculerCoteArgus(v.prixNeuf, v.annee, v.kilometrage, "bon", v.carburant);

  return {
    alternates: { canonical: `/calcul-cote-argus-voiture/${slug}` },
    title: `Cote ${v.marque} ${v.modele} ${v.annee} : ~${resultat.estimationFinale.toLocaleString("fr-FR")} €`,
    description: `Estimation indicative de la cote d'une ${v.marque} ${v.modele} de ${v.annee} avec ${v.kilometrage.toLocaleString("fr-FR")} km : environ ${resultat.estimationFinale.toLocaleString("fr-FR")} €. Calcul informatif (pas la cote Argus officielle).`,
    keywords: `cote ${v.marque} ${v.modele}, prix ${v.marque} ${v.modele} ${v.annee}, valeur ${v.marque} ${v.modele} occasion, ${v.marque.toLowerCase()} ${v.modele.toLowerCase()} ${v.annee}`,
    openGraph: {
      title: `Cote ${v.marque} ${v.modele} ${v.annee} occasion`,
      description: `Estimation valeur ~${resultat.estimationFinale.toLocaleString("fr-FR")} € pour une ${v.marque} ${v.modele} de ${v.annee}.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const v = findVariante(slug);
  if (!v) notFound();

  const resultat = calculerCoteArgus(v.prixNeuf, v.annee, v.kilometrage, "bon", v.carburant);
  const autresVariantes = VARIANTES.filter((x) => x.slug !== slug).slice(0, 6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle est la cote estimée d'une ${v.marque} ${v.modele} ${v.annee} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `L'estimation indicative pour une ${v.marque} ${v.modele} de ${v.annee} avec ${v.kilometrage.toLocaleString("fr-FR")} km en bon état est d'environ ${resultat.estimationFinale.toLocaleString("fr-FR")} €. Pour la cote Argus officielle, consultez largus.fr.`,
        }
      },
      {
        "@type": "Question",
        name: `Quelle décote subit une ${v.marque} ${v.modele} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sur ${resultat.ageVoiture} ans, la décote totale estimée est de ${resultat.decotePourcent}% par rapport au prix neuf (${v.prixNeuf.toLocaleString("fr-FR")} €). La décote applique les règles standards : -25% la 1ère année, -15% les années 2-5, -10% au-delà.`,
        }
      }
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
      <Breadcrumb currentPage={`${v.marque} ${v.modele} ${v.annee}`} parentPage="Cote Voiture" parentHref="/calcul-cote-argus-voiture" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Cote {v.marque} {v.modele} {v.annee}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation indicative pour une {v.marque} {v.modele} de {v.annee} avec {v.kilometrage.toLocaleString("fr-FR")} km :
        environ <strong>{resultat.estimationFinale.toLocaleString("fr-FR")} €</strong>.
      </p>

      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-8">
        <p className="text-sm text-red-900">
          <strong>⚠️ Ceci n&apos;est PAS la cote Argus officielle.</strong> Estimation indicative à but
          informatif. Pour la cote officielle, consultez{" "}
          <a href="https://www.largus.fr" target="_blank" rel="noopener noreferrer" className="underline font-semibold">largus.fr</a>.
        </p>
      </div>

      <CalculCoteArgusVoiture />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détail estimation : {v.marque} {v.modele} {v.annee}
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">Estimation indicative</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">{resultat.estimationFinale.toLocaleString("fr-FR")} €</p>
            <p className="text-sm text-blue-700 mt-1">en bon état général</p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-sm text-red-700 font-medium">Décote totale</p>
            <p className="text-3xl font-bold text-red-900 mt-1">-{resultat.decotePourcent}%</p>
            <p className="text-sm text-red-700 mt-1">vs prix neuf ({v.prixNeuf.toLocaleString("fr-FR")} €)</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700">Marque / Modèle</span>
            <span className="font-semibold text-slate-800">{v.marque} {v.modele}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Année</span>
            <span className="font-semibold text-slate-800">{v.annee} ({resultat.ageVoiture} ans)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Carburant</span>
            <span className="font-semibold text-slate-800 capitalize">{v.carburant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Kilométrage</span>
            <span className="font-semibold text-slate-800">
              {v.kilometrage.toLocaleString("fr-FR")} km
              {resultat.kilometrageNormal && " (dans la moyenne)"}
              {!resultat.kilometrageNormal && v.kilometrage > resultat.kilometrageMoyen && " (élevé)"}
              {!resultat.kilometrageNormal && v.kilometrage < resultat.kilometrageMoyen && " (faible)"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Prix neuf catalogue</span>
            <span className="font-semibold text-slate-800">{v.prixNeuf.toLocaleString("fr-FR")} €</span>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres modèles populaires
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {autresVariantes.map((x) => {
            const r = calculerCoteArgus(x.prixNeuf, x.annee, x.kilometrage, "bon", x.carburant);
            return (
              <a
                key={x.slug}
                href={`/calcul-cote-argus-voiture/${x.slug}`}
                className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition"
              >
                <p className="font-semibold text-slate-800">
                  🚗 {x.marque} {x.modele} {x.annee}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  ~{r.estimationFinale.toLocaleString("fr-FR")} € ({x.kilometrage.toLocaleString("fr-FR")} km)
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre la cote de votre {v.marque} {v.modele}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La {v.marque} {v.modele} de {v.annee} suit les règles standards de décote du
          marché français. Avec {resultat.ageVoiture} ans d&apos;âge, le véhicule a déjà
          perdu environ {resultat.decotePourcent}% de sa valeur d&apos;origine.
        </p>

        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm mb-4 space-y-1">
          <div>Prix neuf : {v.prixNeuf.toLocaleString("fr-FR")} €</div>
          <div>- Décote sur {resultat.ageVoiture} ans = {(v.prixNeuf - resultat.valeurApresDecoteAge).toLocaleString("fr-FR")} €</div>
          <div>× Ajustement carburant ({v.carburant}) = ×{resultat.multCarburant.toFixed(2)}</div>
          <div>× Ajustement kilométrage = ×{resultat.multKm.toFixed(2)}</div>
          <div className="border-t border-slate-300 pt-1 font-bold">
            = Estimation finale : {resultat.estimationFinale.toLocaleString("fr-FR")} €
          </div>
        </div>

        <p className="text-slate-600 text-sm">
          Ces chiffres sont indicatifs. La cote réelle dépendra de l&apos;état exact, des
          options, de l&apos;historique d&apos;entretien et de la demande locale au moment
          de la vente.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-cote-argus-voiture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
