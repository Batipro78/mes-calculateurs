import type { Metadata } from "next";
import CalculRationChien from "../CalculRationChien";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerRation, type Methode, type Activite, type Stade } from "../rationChienCalc";

const POIDS = [5, 10, 15, 20, 25, 30, 40];
const METHODES: Methode[] = ["croquettes", "barf"];
const AGES_CHIOTS = [3, 6, 9];

type Slug = {
  type: "chien-poids-methode" | "chiot-age" | "senior" | "faq";
  poids?: number;
  methode?: Methode;
  age?: number;
  faqSlug?: string;
};

function parseSlug(slug: string): Slug | null {
  // chien-5kg-croquettes
  const m1 = slug.match(/^chien-(\d+)kg-(croquettes|barf)$/);
  if (m1) {
    return {
      type: "chien-poids-methode",
      poids: parseInt(m1[1]),
      methode: m1[2] as Methode,
    };
  }

  // chiot-3-mois
  const m2 = slug.match(/^chiot-(\d+)-mois$/);
  if (m2) {
    return {
      type: "chiot-age",
      age: parseInt(m2[1]),
    };
  }

  // chien-senior-20kg
  const m3 = slug.match(/^chien-senior-(\d+)kg$/);
  if (m3) {
    return {
      type: "senior",
      poids: parseInt(m3[1]),
    };
  }

  // FAQ slugs
  const faqSlugs = [
    "combien-grammes-croquettes-chien",
    "combien-viande-barf-chien",
    "chien-perd-du-poids",
    "chien-prend-du-poids",
    "transition-croquettes-barf",
  ];
  if (faqSlugs.includes(slug)) {
    return {
      type: "faq",
      faqSlug: slug,
    };
  }

  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  // chien-{poids}kg-{methode} : 7 poids × 2 méthodes = 14
  for (const poids of POIDS) {
    for (const methode of METHODES) {
      params.push({ params: `chien-${poids}kg-${methode}` });
    }
  }

  // chiot-{age}-mois : 3 âges = 3
  for (const age of AGES_CHIOTS) {
    params.push({ params: `chiot-${age}-mois` });
  }

  // chien-senior-{poids}kg : 3 poids = 3
  for (const poids of [10, 20, 30]) {
    params.push({ params: `chien-senior-${poids}kg` });
  }

  // FAQ slugs : 5
  const faqSlugs = [
    "combien-grammes-croquettes-chien",
    "combien-viande-barf-chien",
    "chien-perd-du-poids",
    "chien-prend-du-poids",
    "transition-croquettes-barf",
  ];
  for (const faqSlug of faqSlugs) {
    params.push({ params: faqSlug });
  }

  return params;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "chien-poids-methode" && parsed.poids && parsed.methode) {
    const resultat = calculerRation({
      poids: parsed.poids,
      methode: parsed.methode,
      activite: "normal",
      stade: "adulte",
    });

    const methodeName = parsed.methode === "croquettes" ? "croquettes" : "BARF";
    const title = `Ration ${methodeName} chien ${parsed.poids} kg : ${fmt(resultat.quantiteTotal)} g/jour`;
    const description = `Besoin alimentaire pour un chien adulte de ${parsed.poids} kg en ${methodeName} : ${fmt(resultat.quantiteTotal)} g/jour. Activité normale, 2 repas/jour.`;

    return {
      alternates: { canonical: `/calcul-ration-chien/${slug}` },
      title,
      description,
      keywords: `ration ${methodeName} chien ${parsed.poids}kg, croquettes chien ${parsed.poids}, poids chien`,
      openGraph: {
        title,
        description,
      },
    };
  }

  if (parsed.type === "chiot-age" && parsed.age) {
    const resultat = calculerRation({
      poids: 15, // poids moyen pour illustration
      methode: "croquettes",
      activite: "normal",
      stade: "chiot",
      ageChiot: parsed.age,
    });

    const title = `Ration chiot ${parsed.age} mois : ${fmt(resultat.quantiteTotal)} g/jour`;
    const description = `Besoin alimentaire pour un chiot de ${parsed.age} mois (poids ~15 kg) : ${fmt(resultat.quantiteTotal)} g/jour. ${resultat.conseil}.`;

    return {
      alternates: { canonical: `/calcul-ration-chien/${slug}` },
      title,
      description,
      keywords: `chiot ${parsed.age} mois, ration chiot, croquettes chiot`,
      openGraph: { title, description },
    };
  }

  if (parsed.type === "senior" && parsed.poids) {
    const resultat = calculerRation({
      poids: parsed.poids,
      methode: "croquettes",
      activite: "sedentaire",
      stade: "senior",
    });

    const title = `Ration chien sénior ${parsed.poids} kg : ${fmt(resultat.quantiteTotal)} g/jour`;
    const description = `Besoin alimentaire pour un chien sénior de ${parsed.poids} kg : ${fmt(resultat.quantiteTotal)} g/jour. Métabolisme ralenti, nutrition adaptée.`;

    return {
      alternates: { canonical: `/calcul-ration-chien/${slug}` },
      title,
      description,
      keywords: `chien senior ${parsed.poids}kg, vieux chien, ration senior`,
      openGraph: { title, description },
    };
  }

  // FAQ pages
  if (parsed.type === "faq" && parsed.faqSlug) {
    const faqTitles: Record<string, string> = {
      "combien-grammes-croquettes-chien": "Combien de grammes de croquettes par jour pour un chien ?",
      "combien-viande-barf-chien": "Combien de viande BARF pour un chien ?",
      "chien-perd-du-poids": "Mon chien perd du poids : comment ajuster sa ration ?",
      "chien-prend-du-poids": "Mon chien prend du poids : comment réduire la ration ?",
      "transition-croquettes-barf": "Transition croquettes vers BARF : comment procéder ?",
    };

    const faqDescriptions: Record<string, string> = {
      "combien-grammes-croquettes-chien":
        "Guide complet pour calculer la bonne quantité de croquettes adaptée au poids, âge et activité de votre chien.",
      "combien-viande-barf-chien":
        "Quantité de viande BARF à donner selon le poids du chien. Répartition 70% viande, 10% os, 10% légumes, 5% fruits, 5% suppléments.",
      "chien-perd-du-poids":
        "Si votre chien maigrit, augmentez progressivement sa ration de 10-15%. Consultez un vétérinaire si la perte persiste.",
      "chien-prend-du-poids":
        "Pour un chien en surpoids, réduisez la ration de 15-20% et augmentez l'exercice. Ration surpoids : 1.5% du poids en BARF.",
      "transition-croquettes-barf":
        "Transition progressive sur 7-10 jours : jour 1-2 (75/25), jour 3-4 (50/50), jour 5-6 (25/75), jour 7-10 (100%). Évite troubles digestifs.",
    };

    const title = faqTitles[parsed.faqSlug] || "Ration chien";
    const description = faqDescriptions[parsed.faqSlug] || "Calculateur ration chien";

    return {
      alternates: { canonical: `/calcul-ration-chien/${slug}` },
      title,
      description,
      keywords: `chien, ration, alimentation`,
      openGraph: { title, description },
    };
  }

  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  // Valider les paramètres selon le type
  if (parsed.type === "chien-poids-methode") {
    if (!parsed.poids || !POIDS.includes(parsed.poids) || !parsed.methode) {
      notFound();
    }
  } else if (parsed.type === "chiot-age") {
    if (!parsed.age || !AGES_CHIOTS.includes(parsed.age)) {
      notFound();
    }
  } else if (parsed.type === "senior") {
    if (!parsed.poids || ![10, 20, 30].includes(parsed.poids)) {
      notFound();
    }
  }

  // Générer contenu spécifique au type
  let pageTitle = "Ration Chien";
  let pageDescription = "";
  let content = null;

  if (parsed.type === "chien-poids-methode" && parsed.poids && parsed.methode) {
    const resultat = calculerRation({
      poids: parsed.poids,
      methode: parsed.methode,
      activite: "normal",
      stade: "adulte",
    });

    const methodeName =
      parsed.methode === "croquettes"
        ? "Croquettes"
        : parsed.methode === "barf"
          ? "BARF"
          : "Pâtée";

    pageTitle = `Ration ${methodeName} Chien ${parsed.poids} kg`;
    pageDescription = `Besoin alimentaire pour un chien adulte de ${parsed.poids} kg : ${fmt(resultat.quantiteTotal)} g de ${methodeName.toLowerCase()} par jour.`;

    content = (
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Ration {methodeName} pour chien {parsed.poids} kg
        </h2>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 mb-6">
          <p className="text-slate-600 mb-2">Activité : Normal</p>
          <p className="text-slate-600 mb-4">Stade : Adulte</p>
          <div className="text-4xl font-extrabold text-amber-700 mb-2">
            {fmt(resultat.quantiteTotal)} g/jour
          </div>
          <p className="text-amber-700">
            En {resultat.methode === "croquettes" ? "croquettes" : "BARF"} • 2 repas/jour
          </p>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Un chien adulte de {parsed.poids} kg avec une activité normale a besoin d&apos;environ{" "}
          <strong>{fmt(resultat.quantiteTotal)} g</strong> de {methodeName.toLowerCase()} par jour,
          répartis en 2 repas (matin et soir).
        </p>
        {resultat.repartitionBARF && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">Répartition BARF (70/10/10/5/5)</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>
                <strong>Viande (70%)</strong> : {fmt(resultat.repartitionBARF.viande)} g
              </li>
              <li>
                <strong>Os charnus (10%)</strong> : {fmt(resultat.repartitionBARF.os)} g
              </li>
              <li>
                <strong>Légumes (10%)</strong> : {fmt(resultat.repartitionBARF.legumes)} g
              </li>
              <li>
                <strong>Fruits (5%)</strong> : {fmt(resultat.repartitionBARF.fruits)} g
              </li>
              <li>
                <strong>Suppléments (5%)</strong> : {fmt(resultat.repartitionBARF.supplements)} g
              </li>
            </ul>
          </div>
        )}
      </section>
    );
  } else if (parsed.type === "chiot-age" && parsed.age) {
    pageTitle = `Ration Chiot ${parsed.age} Mois`;
    pageDescription = `Besoin alimentaire pour un chiot de ${parsed.age} mois.`;

    const ageInter = Math.min(parsed.age, 12);
    const poidsEstime = parsed.age < 4 ? 8 : parsed.age < 6 ? 12 : 15;
    const resultat = calculerRation({
      poids: poidsEstime,
      methode: "croquettes",
      activite: "normal",
      stade: "chiot",
      ageChiot: parsed.age,
    });

    content = (
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Ration Chiot {parsed.age} Mois
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 mb-6">
          <p className="text-slate-600 mb-2">Poids estimé : ~{poidsEstime} kg</p>
          <div className="text-3xl font-extrabold text-blue-700 mb-2">
            {fmt(resultat.quantiteTotal)} g/jour
          </div>
          <p className="text-blue-700 font-medium">{resultat.conseil}</p>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Les chiots ont des besoins énergétiques élevés pour la croissance. À {parsed.age} mois,
          votre chiot a besoin d&apos;environ <strong>{fmt(resultat.quantiteTotal)} g</strong> de
          croquettes par jour, répartis en {resultat.nbreRepas} repas.
        </p>
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="font-bold text-amber-900 mb-3">Progression par âge</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>
              <strong>0-2 mois</strong> : allaitement maternel + croquettes spéciales chiot
            </li>
            <li>
              <strong>2-4 mois</strong> : 4 repas/jour (25% ration adulte × 2.0)
            </li>
            <li>
              <strong>4-6 mois</strong> : 3 repas/jour (croissance active)
            </li>
            <li>
              <strong>6-12 mois</strong> : 2 repas/jour (transition vers adulte)
            </li>
          </ul>
        </div>
      </section>
    );
  } else if (parsed.type === "senior" && parsed.poids) {
    pageTitle = `Ration Chien Sénior ${parsed.poids} kg`;
    pageDescription = `Ration adaptée pour un chien sénior de ${parsed.poids} kg.`;

    const resultat = calculerRation({
      poids: parsed.poids,
      methode: "croquettes",
      activite: "sedentaire",
      stade: "senior",
    });

    content = (
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Ration Chien Sénior {parsed.poids} kg
        </h2>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 mb-6">
          <p className="text-slate-600 mb-2">Âge : 7+ ans</p>
          <div className="text-4xl font-extrabold text-purple-700 mb-2">
            {fmt(resultat.quantiteTotal)} g/jour
          </div>
          <p className="text-purple-700">
            Activité réduite • 2 repas/jour • Métabolisme ralenti
          </p>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Les chiens séniors ont un métabolisme plus lent et moins d&apos;activité. La ration
          doit être réduite de 20-30% par rapport à un adulte. Pour {parsed.poids} kg, comptez
          environ <strong>{fmt(resultat.quantiteTotal)} g/jour</strong> en croquettes sénior
          (moins grasses, plus digestibles).
        </p>
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-900 mb-3">Conseils sénior</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>✓ Croquettes sénior spéciales : digestion plus facile</li>
            <li>✓ Suppléments glucosamine pour les articulations</li>
            <li>✓ Protéines de qualité pour préserver la masse musculaire</li>
            <li>✓ Portions réparties en 2 repas (meilleure digestion)</li>
            <li>✓ Activité physique modérée et régulière (promenades courtes)</li>
          </ul>
        </div>
      </section>
    );
  } else if (parsed.type === "faq" && parsed.faqSlug) {
    const faqTitles: Record<string, string> = {
      "combien-grammes-croquettes-chien": "Combien de grammes de croquettes par jour ?",
      "combien-viande-barf-chien": "Combien de viande BARF pour un chien ?",
      "chien-perd-du-poids": "Mon chien perd du poids : comment ajuster sa ration ?",
      "chien-prend-du-poids": "Mon chien prend du poids : comment réduire sa ration ?",
      "transition-croquettes-barf": "Comment passer des croquettes au BARF ?",
    };

    pageTitle = faqTitles[parsed.faqSlug];

    content = (
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{pageTitle}</h2>

        {parsed.faqSlug === "combien-grammes-croquettes-chien" && (
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              La quantité de croquettes dépend du <strong>poids</strong>, de l&apos;
              <strong>activité</strong> et du <strong>stade de vie</strong> du chien.
            </p>
            <p>
              <strong>Exemple :</strong> Un chien adulte de 20 kg à activité normale consomme
              environ 280 g de croquettes/jour (2 repas de 140 g).
            </p>
            <p>
              Utilisez le calculateur en haut pour obtenir une ration personnalisée selon votre
              chien. Ajustez si le chien maigrit (augmentez) ou prend du poids (diminuez).
            </p>
          </div>
        )}

        {parsed.faqSlug === "combien-viande-barf-chien" && (
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              En régime BARF, la quantité totale est de <strong>2-3% du poids corporel</strong>.
              La viande représente 70% de cette ration.
            </p>
            <p>
              <strong>Exemple :</strong> Un chien de 20 kg en BARF (2.5%) = 500 g/jour, dont 350 g
              de viande, 50 g d&apos;os, 50 g de légumes, 25 g de fruits, 25 g de suppléments.
            </p>
            <p>
              Types de viande : poulet, bœuf, agneau, poisson. Varier pour éviter carences. À
              donner brute ou légèrement décongélée (jamais refroidi au réfrigérateur, risque
              bactéries).
            </p>
          </div>
        )}

        {parsed.faqSlug === "chien-perd-du-poids" && (
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Si votre chien maigrit malgré une ration normale, <strong>augmentez la portion de
              10-15%</strong> et observez après 1-2 semaines.
            </p>
            <p>
              Si la perte de poids persiste, consultez un vétérinaire (problème digestif, parasites,
              maladie).
            </p>
            <p>
              Vérifiez aussi la qualité des croquettes (densité énergétique) et l&apos;exercice
              (augmentation d&apos;activité = plus de calories nécessaires).
            </p>
          </div>
        )}

        {parsed.faqSlug === "chien-prend-du-poids" && (
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Si votre chien prend du poids, <strong>réduisez la ration de 15-20%</strong> et
              augmentez l&apos;exercice (promenades plus longues, jeux).
            </p>
            <p>
              Stade surpoids : utiliser 1.5% du poids en BARF au lieu de 2.5%. Pour croquettes,
              utiliser croquettes &quot;light&quot; ou réduire portion.
            </p>
            <p>
              Évitez les friandises ou récompenses caloriques. Consultez un vétérinaire si
              l&apos;obésité persiste (risque : diabète, arthrite, insuffisance cardiaque).
            </p>
          </div>
        )}

        {parsed.faqSlug === "transition-croquettes-barf" && (
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Tout changement alimentaire doit être progressif sur <strong>7-10 jours</strong> pour
              éviter diarrhée et vomissements.
            </p>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="font-bold text-amber-900 mb-2">Progression jour par jour :</p>
              <ul className="space-y-1 text-sm">
                <li>Jour 1-2 : 75% croquettes + 25% BARF</li>
                <li>Jour 3-4 : 50% croquettes + 50% BARF</li>
                <li>Jour 5-6 : 25% croquettes + 75% BARF</li>
                <li>Jour 7-10 : 100% BARF</li>
              </ul>
            </div>
            <p>
              Si diarrhée : revenir à proportion précédente et progresser plus lentement. Certains
              chiens demandent 14-21 jours pour s&apos;adapter.
            </p>
          </div>
        )}
      </section>
    );
  }

  return (
    <div>
      <Breadcrumb currentPage={pageTitle} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🐕
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{pageTitle}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{pageDescription}</p>

      {content}

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-ration-chien" />
    </div>
  );
}
