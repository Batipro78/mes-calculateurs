import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ConvertisseurHijri from "../ConvertisseurHijri";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  gregorienVersHijri,
  hijriVersGregorien,
  calculerAgeHijri,
  formatDateHijri,
  MethodeHijri,
} from "../hijriCalc";

interface PageProps {
  params: Promise<{ params: string }>;
}

type SlugType =
  | "aujourd-hui"
  | "annee-hijri"
  | "ne-en"
  | "date-gregorienne"
  | "special";

function parseSlug(slug: string): {
  type: SlugType;
  value: string;
  display: string;
} | null {
  // aujourd'hui-en-hijri
  if (slug === "aujourd-hui-en-hijri") {
    return {
      type: "aujourd-hui",
      value: slug,
      display: "Aujourd&apos;hui en hijri",
    };
  }

  // annee-{hijri} : 1445, 1446, 1447, etc.
  if (slug.startsWith("annee-")) {
    const annee = slug.slice(6);
    if (/^\d{3,4}$/.test(annee)) {
      return {
        type: "annee-hijri",
        value: annee,
        display: `Année hijri ${annee} AH en grégorien`,
      };
    }
  }

  // ne-en-{annee-gregorienne} : 1980, 1990, 2000, etc.
  if (slug.startsWith("ne-en-")) {
    const annee = slug.slice(6);
    if (/^\d{4}$/.test(annee)) {
      return {
        type: "ne-en",
        value: annee,
        display: `Âge hijri pour quelqu&apos;un né en ${annee}`,
      };
    }
  }

  // {jour}-{mois}-{annee} : 1-janvier-2026, 31-decembre-2026
  const dateMatch = slug.match(
    /^(\d{1,2})-(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)-(\d{4})$/
  );
  if (dateMatch) {
    const jour = dateMatch[1];
    const moisNom = dateMatch[2];
    const annee = dateMatch[3];
    return {
      type: "date-gregorienne",
      value: `${jour}-${moisNom}-${annee}`,
      display: `${jour} ${moisNom} ${annee} en hijri`,
    };
  }

  // Variantes nommées
  if (slug === "nouvelle-annee-hijri-2026") {
    return {
      type: "special",
      value: "nouvelle-annee-1447",
      display: "Nouvelle année 1447 AH",
    };
  }
  if (slug === "ramadan-2026-en-gregorien") {
    return {
      type: "special",
      value: "ramadan-1447",
      display: "Ramadan 1447 AH en grégorien",
    };
  }
  if (slug === "aid-2026-en-hijri") {
    return {
      type: "special",
      value: "aid-fitr-1447",
      display: "Aïd al-Fitr 1447 AH en grégorien",
    };
  }

  return null;
}

function getMoisIndex(moisNom: string): number {
  const moisMap: Record<string, number> = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };
  return moisMap[moisNom.toLowerCase()] ?? -1;
}

function generateMetadataForSlug(parsed: ReturnType<typeof parseSlug>): Metadata {
  if (!parsed) {
    return {};
  }

  const { type, display } = parsed;
  const baseUrl = "/convertisseur-calendrier-hijri";

  if (type === "aujourd-hui") {
    return {
      title: `${display} - Convertisseur Hijri`,
      description:
        "Découvrez quelle est la date actuelle en calendrier hijri. Convertisseur instantané et gratuit.",
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "annee-hijri") {
    return {
      title: `${display} - Convertisseur Hijri`,
      description: `Convertir l'année hijri ${parsed.value} AH en dates grégoriennes. Calendrier lunaire islamique.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "ne-en") {
    return {
      title: `${display} - Convertisseur Calendrier Hijri`,
      description: `Calculer l'âge en années hijri pour quelqu'un né en ${parsed.value}. Différence entre calendrier lunaire et solaire.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "date-gregorienne") {
    return {
      title: `${display} - Convertisseur Hijri`,
      description: `Convertir le ${display} en calendrier hijri. Conversion instantanée et gratuite.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "special") {
    return {
      title: `${display} - Convertisseur Hijri`,
      description: `${display}. Consultez le calendrier islamique et les dates religieuses.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  return {};
}

export function generateStaticParams() {
  const slugs = [
    "aujourd-hui-en-hijri",
    "annee-1444", "annee-1445", "annee-1446", "annee-1447",
    "annee-1448", "annee-1449", "annee-1450",
    "ne-en-1980", "ne-en-1985", "ne-en-1990", "ne-en-1995",
    "ne-en-2000", "ne-en-2005", "ne-en-2010",
    "1-janvier-2026", "1-juillet-2026", "31-decembre-2026",
    "nouvelle-annee-hijri-2026", "ramadan-2026-en-gregorien", "aid-2026-en-hijri",
  ];
  return slugs.map((s) => ({ params: s }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  return generateMetadataForSlug(parsed);
}

export default async function Page({ params }: PageProps) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { type, value, display } = parsed;
  const methode: MethodeHijri = "tic";
  let contenuDetail = "";

  if (type === "aujourd-hui") {
    const hijri = gregorienVersHijri(new Date(), methode);
    contenuDetail = `Aujourd'hui, ${new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })} correspond à ${hijri.jour} ${hijri.moisNom} ${hijri.annee} AH (calendrier hijri).`;
  }

  if (type === "annee-hijri") {
    const annee = parseInt(value, 10);
    // Première date : 1er Mouharram
    const debut = hijriVersGregorien(annee, 1, 1, methode);
    // Dernière date : 30 Dhou al-Hijja
    const fin = hijriVersGregorien(annee, 12, 30, methode);
    contenuDetail = `L'année hijri ${annee} AH s'étend du ${debut.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} au ${fin.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}. C'est une année lunaire de 354-355 jours.`;
  }

  if (type === "ne-en") {
    const annee = parseInt(value, 10);
    const dateNaissance = new Date(annee, 0, 1);
    const age = calculerAgeHijri(dateNaissance);
    contenuDetail = `Quelqu'un né en ${annee} a actuellement environ ${age.ans} ans en années hijri (lunaires), ce qui équivaut à ${age.ansGregorien} ans en années grégoriennes. La différence vient de la durée différente de l'année lunaire (354 j) vs solaire (365 j).`;
  }

  if (type === "date-gregorienne") {
    const parts = value.split("-");
    const jour = parseInt(parts[0], 10);
    const moisIndex = getMoisIndex(parts[1]);
    const annee = parseInt(parts[2], 10);
    if (moisIndex >= 0) {
      const date = new Date(annee, moisIndex, jour);
      const hijri = gregorienVersHijri(date, methode);
      contenuDetail = `Le ${jour} ${parts[1]} ${annee} correspond à ${hijri.jour} ${hijri.moisNom} ${hijri.annee} AH dans le calendrier hijri.`;
    }
  }

  if (type === "special") {
    if (value === "nouvelle-annee-1447") {
      const debut = hijriVersGregorien(1447, 1, 1, methode);
      contenuDetail = `L'année hijri 1447 commence le ${debut.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })} (Nouvel An Islamic / Hijra).`;
    } else if (value === "ramadan-1447") {
      const debut = hijriVersGregorien(1447, 9, 1, methode);
      const fin = hijriVersGregorien(1447, 9, 30, methode);
      contenuDetail = `Ramadan 1447 AH s'étend du ${debut.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
      })} au ${fin.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })} (calendrier grégorien).`;
    } else if (value === "aid-fitr-1447") {
      const aid = hijriVersGregorien(1447, 10, 1, methode);
      contenuDetail = `L'Aïd al-Fitr 1447 AH est estimé au ${aid.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })} (sous réserve de l'observation officielle de la nouvelle lune).`;
    }
  }

  return (
    <div>
      <Breadcrumb currentPage={display} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌙
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{display}</h1>
      </div>

      <p className="text-slate-600 mb-8 ml-[52px]">{contenuDetail}</p>

      <ConvertisseurHijri />


      <section className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          ℹ️ À propos de cette page
        </h2>
        <p className="text-sm text-blue-900">
          Cette page spécialisée affiche des informations sur{" "}
          <strong>{display.toLowerCase()}</strong>. Utilisez le convertisseur
          ci-dessus pour d&apos;autres conversions ou calculs de dates
          islamiques.
        </p>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-calendrier-hijri" />
    </div>
  );
}
