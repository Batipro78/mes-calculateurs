import type { Metadata } from "next";
import CalculFTPCyclisme from "../CalculFTPCyclisme";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerFTP, calculerVAM, fmt, type Sexe } from "../ftpCyclismeCalc";

// FTP watts populaires
const FTP_WATTS = [
  150, 175, 200, 225, 250, 275, 300, 325, 350, 400,
];

// W/kg ratios (hommes)
const WPKS = ["2-5", "3", "3-5", "4", "4-5", "5"];

// VAM populaires (m/h)
const VAMS = [800, 1000, 1200, 1400, 1600];

// Questions courantes
const QUESTIONS = [
  "test-20-minutes-cyclisme",
  "niveau-cycliste-pro",
  "niveau-cycliste-amateur",
  "comment-ameliorer-ftp",
];

function parseSlug(slug: string): {
  type: "ftp" | "wpk" | "vam" | "question";
  value: string;
} | null {
  // Format : ftp-250-watts
  let match = slug.match(/^ftp-(\d+)-watts$/);
  if (match) {
    return { type: "ftp", value: match[1] };
  }

  // Format : watts-kg-3 ou watts-kg-3-5
  match = slug.match(/^watts-kg-([\d\-]+)$/);
  if (match) {
    return { type: "wpk", value: match[1] };
  }

  // Format : vam-1200
  match = slug.match(/^vam-(\d+)$/);
  if (match) {
    return { type: "vam", value: match[1] };
  }

  // Questions
  if (
    QUESTIONS.includes(slug)
  ) {
    return { type: "question", value: slug };
  }

  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];

  // FTP en watts
  FTP_WATTS.forEach((ftp) => {
    params.push({ params: `ftp-${ftp}-watts` });
  });

  // W/kg
  WPKS.forEach((wpk) => {
    params.push({ params: `watts-kg-${wpk}` });
  });

  // VAM
  VAMS.forEach((vam) => {
    params.push({ params: `vam-${vam}` });
  });

  // Questions
  QUESTIONS.forEach((question) => {
    params.push({ params: question });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (parsed === null) return {};

  const { type, value } = parsed;
  let title = "";
  let description = "";
  let keywords = "";

  if (type === "ftp") {
    const ftp = parseInt(value);
    // Exemple : 250W à 75kg → 3,33 W/kg
    const wpk = (ftp * 0.95) / 75;
    title = `FTP ${ftp} watts - ${fmt(wpk, 2)} W/kg : niveau cycliste`;
    description = `FTP ${ftp} watts à 75kg = ${fmt(wpk, 2)} W/kg. Découvrez votre niveau cycliste FFC et vos zones d'entraînement à la puissance.`;
    keywords = `ftp ${ftp} watts, ${fmt(wpk, 2)} w/kg, niveau cycliste, puissance cyclisme, capteur puissance`;
  } else if (type === "wpk") {
    const wpkStr = value.replace("-", ".");
    title = `${wpkStr} W/kg cyclisme - Niveau ${wpkStr === "5" ? "Élite" : wpkStr === "4" ? "Cat 1" : "Cat 3"}`;
    description = `${wpkStr} W/kg (watts par kilo) en cyclisme. Niveau cycliste, références FFC, progression FTP. Calcul personnel et comparaison standards.`;
    keywords = `${wpkStr} w/kg, watts par kilo, cyclisme, ffc, grimpeur, puissance relative`;
  } else if (type === "vam") {
    const vamNum = parseInt(value);
    const niveauVAM =
      vamNum < 800
        ? "cyclotouriste"
        : vamNum < 1000
          ? "amateur"
          : vamNum < 1200
            ? "avancé"
            : vamNum < 1400
              ? "Cat 3"
              : vamNum < 1600
                ? "Cat 1"
                : vamNum < 1800
                  ? "pro"
                  : "pro world tour";
    title = `VAM ${vamNum} m/h - Vitesse ascensionnelle ${niveauVAM}`;
    description = `VAM ${vamNum} m/h (vitesse ascensionnelle moyenne) en cyclisme. Niveau ${niveauVAM}. Strava segments, montée en col, progression.`;
    keywords = `vam ${vamNum}, vitesse ascensionnelle, strava, segments col, cyclisme montée, puissance grimpeur`;
  } else if (type === "question") {
    const questions: Record<string, { title: string; desc: string }> = {
      "test-20-minutes-cyclisme": {
        title: "Test FTP 20 minutes cyclisme - Comment le faire",
        desc: "Guide complet du test FTP 20 minutes. Échauffement, effort, calcul puissance. Professionnel et amateur.",
      },
      "niveau-cycliste-pro": {
        title: "Niveau cycliste professionnel - FTP, W/kg, VAM pro",
        desc: "Critères W/kg, FTP et VAM pour atteindre le niveau professionnel. Pro Continental vs World Tour.",
      },
      "niveau-cycliste-amateur": {
        title: "Niveau cycliste amateur FFC - Cat 3, Cat 2, Cat 1",
        desc: "Standards FTP et W/kg pour chaque catégorie amateur FFC. Cat 5 à Cat 1, progression cyclisme.",
      },
      "comment-ameliorer-ftp": {
        title: "Comment augmenter son FTP en cyclisme",
        desc: "Entraînement, nutrition, récupération pour progresser en FTP. Plans cyclisme, capteur puissance.",
      },
    };
    const q = questions[value] || { title: value, desc: value };
    title = q.title;
    description = q.desc;
    keywords = `${value}, ftp, cyclisme, puissance, w/kg`;
  }

  return {
    alternates: { canonical: `/calcul-ftp-cyclisme/${slug}` },
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default function Page({
  params,
}: {
  params: { params: string };
}) {
  const parsed = parseSlug(params.params);
  if (parsed === null) {
    notFound();
  }

  const { type, value } = parsed;

  let pageTitle = "";
  let pageDesc = "";
  let heading = "";
  let content = null;

  if (type === "ftp") {
    const ftp = parseInt(value);
    const wpk75 = (ftp * 0.95) / 75;
    pageTitle = `FTP ${ftp} watts - Niveau et W/kg`;
    pageDesc = `FTP ${ftp}W = ${fmt(wpk75, 2)} W/kg à 75kg`;
    heading = `FTP ${ftp} watts`;

    content = (
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <p className="text-slate-600 mb-4">
          Un FTP de <strong>{ftp} watts</strong> correspond à une puissance maximale 1h.
        </p>
        <p className="text-slate-600 mb-4">
          À <strong>75 kg</strong>, cela représente{" "}
          <strong>{fmt(wpk75, 2)} W/kg</strong>.
        </p>
        <p className="text-slate-600">
          Utilisez le calculateur principal pour adapter à votre poids réel et
          sexe.
        </p>
      </div>
    );
  } else if (type === "wpk") {
    const wpkStr = value;
    pageTitle = `${wpkStr} W/kg - Niveau cycliste`;
    pageDesc = `Puissance relative ${wpkStr} watts par kilo`;
    heading = `${wpkStr} W/kg en cyclisme`;

    content = (
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <p className="text-slate-600 mb-4">
          <strong>{wpkStr} watts par kilo</strong> est un excellent indicateur de votre
          niveau cycliste.
        </p>
        <p className="text-slate-600 mb-4">
          Ce ratio permet de comparer les cyclistes indépendamment de leur poids :
          un grimpeur léger et un coureur lourd peuvent être comparés équitablement.
        </p>
        <p className="text-slate-600">
          Utilisez le calculateur pour convertir votre FTP et poids en W/kg précis.
        </p>
      </div>
    );
  } else if (type === "vam") {
    const vamNum = parseInt(value);
    const temps = Math.round((1000 * 60) / (vamNum / 60));
    pageTitle = `VAM ${vamNum} m/h - Performance montée`;
    pageDesc = `Vitesse ascensionnelle moyenne ${vamNum} mètres par heure`;
    heading = `VAM ${vamNum} m/h`;

    content = (
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <p className="text-slate-600 mb-4">
          Une VAM de <strong>{vamNum} m/h</strong> signifie que vous gagnez
          <strong> {vamNum} mètres d&apos;altitude par heure</strong>.
        </p>
        <p className="text-slate-600 mb-4">
          Par exemple : 1000 m de dénivelé en {temps} minutes ≈ {vamNum} m/h.
        </p>
        <p className="text-slate-600">
          Populaire sur Strava pour évaluer les performances en col et comparer les
          grimpeurs sur les segments montée.
        </p>
      </div>
    );
  } else if (type === "question") {
    const questions: Record<string, { title: string; content: string }> = {
      "test-20-minutes-cyclisme": {
        title: "Comment faire le test FTP 20 minutes ?",
        content: `
          <h3 class="font-bold text-slate-800 mb-3">Protocole complet</h3>
          <ol class="list-decimal list-inside space-y-2 text-slate-600">
            <li><strong>Échauffement (15 min) :</strong> Progression progressive, cœur préparé.</li>
            <li><strong>2 min max :</strong> Sortie du cadre, décrassage.</li>
            <li><strong>Récupération (2 min) :</strong> Légère endurance.</li>
            <li><strong>2 min max :</strong> Deuxième sortie décrassage.</li>
            <li><strong>20 min max :</strong> Effort homogène à puissance maximale soutenable.</li>
            <li><strong>Cool-down (5 min) :</strong> Retour à la normal.</li>
          </ol>
          <p class="text-slate-600 mt-4">Enregistrez la puissance moyenne des 20 min et appliquez : FTP = puissance × 0,95.</p>
        `,
      },
      "niveau-cycliste-pro": {
        title: "Quel W/kg pour être professionnel ?",
        content: `
          <div class="space-y-4 text-slate-600">
            <p><strong>Pro Continental :</strong> 5,5 - 6,2 W/kg</p>
            <p><strong>Pro World Tour :</strong> 6,2+ W/kg (Pogacar ~6,5, Vingegaard ~6,4)</p>
            <p><strong>Notes :</strong> Le W/kg professionnel varie selon la spécialité (grimpeur > sprinteur). Les chiffres ci-dessus sont des grimpeurs élites.</p>
          </div>
        `,
      },
      "niveau-cycliste-amateur": {
        title: "Niveaux cycliste FFC - Cat 5 à Cat 1",
        content: `
          <div class="space-y-2 text-slate-600">
            <p><strong>Cat 5 :</strong> 2,5 - 3,0 W/kg (Pass'Cyclisme D2)</p>
            <p><strong>Cat 4 :</strong> 3,0 - 3,5 W/kg (Pass'Cyclisme D1)</p>
            <p><strong>Cat 3 :</strong> 3,5 - 4,0 W/kg</p>
            <p><strong>Cat 2 :</strong> 4,0 - 4,5 W/kg</p>
            <p><strong>Cat 1 / Élite :</strong> 4,5 - 5,5 W/kg</p>
            <p class="text-sm text-slate-500 mt-4">Standards Coggan + FFC officielle.</p>
          </div>
        `,
      },
      "comment-ameliorer-ftp": {
        title: "Progresser en FTP - Entraînement et nutrition",
        content: `
          <div class="space-y-4 text-slate-600">
            <p><strong>Entraînement :</strong> Privilégier seuil (85-90% FTP) et VO2max (100-110% FTP). 3-4 séances capteur par semaine.</p>
            <p><strong>Test régulier :</strong> Tous les 8-12 semaines pour tracker progression.</p>
            <p><strong>Nutrition :</strong> Hydratation, glucides, protéines. Aide à la récupération.</p>
            <p><strong>Sommeil :</strong> 7-9h par nuit pour optimiser adaptation.</p>
            <p><strong>Progression réaliste :</strong> +1% FTP/mois est très solide.</p>
          </div>
        `,
      },
    };

    const q = questions[value] || {
      title: value,
      content: "<p>Question non trouvée.</p>",
    };
    pageTitle = q.title;
    pageDesc = q.title;
    heading = q.title;

    content = (
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div
          dangerouslySetInnerHTML={{ __html: q.content }}
          className="prose prose-sm max-w-none text-slate-600"
        />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb currentPage={pageTitle} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🚴
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{heading}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{pageDesc}</p>

      {content}

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <CalculFTPCyclisme />

      <AdSlot adSlot="0987654321" adFormat="horizontal" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-ftp-cyclisme" />
    </div>
  );
}
