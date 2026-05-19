import type { Metadata } from "next";
import CalculAgeChienHumain from "../CalculAgeChienHumain";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerAgeChien, TAILLES_CHIEN, type TailleChien } from "../ageChienCalc";

const AGES = [1, 2, 3, 5, 7, 10, 12, 15];
const TAILLES: TailleChien[] = ["petit", "moyen", "grand", "geant"];

interface GenerationInfo {
  taille: TailleChien;
  nomTaille: string;
}

function getTailleInfo(taille: TailleChien): GenerationInfo {
  const info = TAILLES_CHIEN.find((t) => t.id === taille);
  return {
    taille,
    nomTaille: info?.nom || "",
  };
}

function parseSlug(slug: string): { age: number; taille: TailleChien } | null {
  const match = slug.match(/^(\d+)-ans-(petit-chien|chien-moyen|grand-chien|chien-geant)$/);
  if (!match) return null;

  const age = parseInt(match[1]);
  const tailleStr = match[2];
  const tailleMap: Record<string, TailleChien> = {
    "petit-chien": "petit",
    "chien-moyen": "moyen",
    "grand-chien": "grand",
    "chien-geant": "geant",
  };
  const taille = tailleMap[tailleStr];

  return AGES.includes(age) && TAILLES.includes(taille) ? { age, taille } : null;
}

export function generateStaticParams() {
  const params: Array<{ params: string }> = [];

  // petit-chien : 1, 2, 3, 5, 7, 10, 12, 15
  for (const age of AGES) {
    params.push({ params: `${age}-ans-petit-chien` });
  }

  // chien-moyen : 1, 3, 5, 7, 10, 12
  for (const age of [1, 3, 5, 7, 10, 12]) {
    params.push({ params: `${age}-ans-chien-moyen` });
  }

  // grand-chien : 1, 3, 5, 7, 9, 11
  for (const age of [1, 3, 5, 7, 9, 11]) {
    params.push({ params: `${age}-ans-grand-chien` });
  }

  // chien-geant : 1, 3, 5, 7, 9
  for (const age of [1, 3, 5, 7, 9]) {
    params.push({ params: `${age}-ans-chien-geant` });
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { age, taille } = parsed;
  const tailleInfo = getTailleInfo(taille);
  const resultat = calculerAgeChien(age, taille);

  return {
    alternates: { canonical: `/calcul-age-chien-humain/${slug}` },
    title: `Chien de ${age} ans : ${resultat.ageHumainAVMA} ans humain (${tailleInfo.nomTaille})`,
    description: `Un ${tailleInfo.nomTaille} de ${age} ans = ${resultat.ageHumainAVMA} ans humains selon la formule AVMA. Espérance de vie : ${resultat.esperanceVie}. Formule vétérinaire officielle.`,
    keywords: `${age} ans chien, chien de ${age} ans quel age humain, ${tailleInfo.nomTaille} ${age} ans, age chien ${age}, conversion age chien`,
    openGraph: {
      title: `Chien ${age} ans = ${resultat.ageHumainAVMA} ans humain`,
      description: `Âge humain exact d'un ${tailleInfo.nomTaille} de ${age} ans. Formule AVMA vétérinaire.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { age, taille } = parsed;
  const tailleInfo = getTailleInfo(taille);
  const resultat = calculerAgeChien(age, taille);
  const chienInfos = TAILLES_CHIEN.find((t) => t.id === taille)!;

  // Autres tailles pour variantes
  const autresTourismeTailles = TAILLES.filter((t) => t !== taille);
  const decadesLinks = autresTourismeTailles.map((t) => ({
    age,
    taille: t,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Un chien ${tailleInfo.nomTaille} de ${age} ans, quel âge humain ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Selon la formule AVMA, un ${tailleInfo.nomTaille} de ${age} ans = ${resultat.ageHumainAVMA} ans humains. L'espérance de vie pour cette taille est ${resultat.esperanceVie}.`,
        }
      },
      {
        "@type": "Question",
        name: `Pourquoi l'âge change selon la taille du chien ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les petits chiens vivent plus longtemps (14-16 ans) et vieillissent plus lentement que les chiens géants (8-10 ans). Cela reflète les différences métaboliques et génétiques entre les races.`,
        }
      },
      {
        "@type": "Question",
        name: `Formule scientifique Wang 2019 pour ${age} ans ${tailleInfo.nomTaille}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Selon l'étude Wang et al. 2019 (méthylation ADN), la formule 16 × ln(${age}) + 31 = ${resultat.ageHumainWang} ans humains. Cette méthode scientifique complète la formule AVMA pratique.`,
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
      <Breadcrumb currentPage={`Chien ${age} ans`} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {chienInfos.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Chien de {age} ans : {resultat.ageHumainAVMA} ans humains
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Un {tailleInfo.nomTaille} ({chienInfos.poidsKg}) de {age} ans = {resultat.ageHumainAVMA}{" "}
        ans humains. Espérance de vie : {resultat.esperanceVie}.
      </p>

      <CalculAgeChienHumain />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détails pour un {tailleInfo.nomTaille} de {age} ans
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <p className="text-sm text-amber-700 font-medium">Méthode AVMA</p>
            <p className="text-3xl font-bold text-amber-900 mt-1">{resultat.ageHumainAVMA}</p>
            <p className="text-sm text-amber-700 mt-1">ans humains (officielle)</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">Étude Wang 2019</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">{resultat.ageHumainWang}</p>
            <p className="text-sm text-blue-700 mt-1">ans humains (ADN méthylation)</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700">Catégorie</span>
            <span className="font-semibold text-slate-800">{tailleInfo.nomTaille}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Poids</span>
            <span className="font-semibold text-slate-800">{chienInfos.poidsKg}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Exemples de races</span>
            <span className="font-semibold text-slate-800">{chienInfos.exemples}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Espérance de vie</span>
            <span className="font-semibold text-slate-800">{resultat.esperanceVie}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Coefficient âge/an (à partir 3 ans)</span>
            <span className="font-semibold text-slate-800">+{chienInfos.ajoutAnnuel} ans/an</span>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comparaison avec autres tailles ({age} ans)
        </h2>
        <div className="space-y-3">
          {decadesLinks.map((link) => {
            const res = calculerAgeChien(link.age, link.taille);
            const info = TAILLES_CHIEN.find((t) => t.id === link.taille)!;
            return (
              <a
                key={link.taille}
                href={`/calcul-age-chien-humain/${link.age}-ans-${link.taille === "petit" ? "petit-chien" : link.taille === "moyen" ? "chien-moyen" : link.taille === "grand" ? "grand-chien" : "chien-geant"}`}
                className="block p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition"
              >
                <span className="text-lg mr-2">{info.emoji}</span>
                <strong>{info.nom}</strong> ({info.poidsKg}) : {res.ageHumainAVMA} ans
              </a>
            );
          })}
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Formule AVMA expliquée
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour un {tailleInfo.nomTaille} de {age} ans, voici le calcul détaillé :
        </p>

        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm mb-4 space-y-1">
          <div>1ère année du chien = 15 ans humains</div>
          <div>2ème année du chien = +9 ans (= 24 ans total à 2 ans)</div>
          {age > 2 && (
            <div>
              Années suivantes ({age - 2} ans × +{chienInfos.ajoutAnnuel}) = +{(age - 2) * chienInfos.ajoutAnnuel}
            </div>
          )}
          <div className="border-t border-slate-300 pt-1 font-bold">
            Total = {resultat.ageHumainAVMA} ans humains
          </div>
        </div>

        <p className="text-slate-600 text-sm">
          Cette formule tient compte du fait que les {tailleInfo.nomTaille}s vieillissent
          à un rythme différent (+{chienInfos.ajoutAnnuel} ans/an après 2 ans) par rapport aux autres tailles.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-age-chien-humain" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
