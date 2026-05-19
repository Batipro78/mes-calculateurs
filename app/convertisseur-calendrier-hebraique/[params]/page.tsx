import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ConvertisseurHebraique from "../ConvertisseurHebraique";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import AdSlot from "../../components/AdSlot";
import {
  gregorienVersHebraique,
  hebraiqueVersGregorien,
  calculerAgeHebraique,
  estAnneeEmbolismique,
} from "../hebraiqueCalc";

interface PageProps {
  params: Promise<{ params: string }>;
}

type SlugType =
  | "aujourd-hui"
  | "annee-heb"
  | "ne-en"
  | "date-gregorienne"
  | "special";

function parseSlug(slug: string): {
  type: SlugType;
  value: string;
  display: string;
} | null {
  // aujourd-hui-en-hebreu
  if (slug === "aujourd-hui-en-hebreu") {
    return {
      type: "aujourd-hui",
      value: slug,
      display: "Aujourd&apos;hui en hébraïque",
    };
  }

  // annee-{hebraique} : 5780, 5786, 5787, etc.
  if (slug.startsWith("annee-")) {
    const annee = slug.slice(6);
    if (/^\d{4}$/.test(annee)) {
      return {
        type: "annee-heb",
        value: annee,
        display: `Année hébraïque ${annee} en grégorien`,
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
        display: `Âge hébraïque pour quelqu&apos;un né en ${annee}`,
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
      display: `${jour} ${moisNom} ${annee} en hébraïque`,
    };
  }

  // Variantes nommées
  if (slug === "rosh-hashanah-2026") {
    return {
      type: "special",
      value: "rosh-hashanah-5786",
      display: "Rosh Hashanah 5786 (Nouvel An juif 2026)",
    };
  }
  if (slug === "yom-kippour-2026") {
    return {
      type: "special",
      value: "yom-kippour-5786",
      display: "Yom Kippour 5786 (2026)",
    };
  }
  if (slug === "pessah-2026-hebraique") {
    return {
      type: "special",
      value: "pessah-5786",
      display: "Pessah 5786 (Pâque juive 2026)",
    };
  }
  if (slug === "shavouot-2026-hebraique") {
    return {
      type: "special",
      value: "shavouot-5786",
      display: "Chavouot 5786 (Pentecôte juive 2026)",
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
  const baseUrl = "/convertisseur-calendrier-hebraique";

  if (type === "aujourd-hui") {
    return {
      title: `${display} - Convertisseur Hébraïque`,
      description:
        "Découvrez quelle est la date actuelle en calendrier hébraïque. Convertisseur instantané et gratuit.",
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "annee-heb") {
    return {
      title: `${display} - Convertisseur Hébraïque`,
      description: `Convertir l'année hébraïque ${parsed.value} en dates grégoriennes. Calendrier juif.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "ne-en") {
    return {
      title: `${display} - Convertisseur Calendrier Hébraïque`,
      description: `Calculer l'âge en années hébraïques pour quelqu'un né en ${parsed.value}. Différence calendrier lunaire et solaire.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "date-gregorienne") {
    return {
      title: `${display} - Convertisseur Hébraïque`,
      description: `Convertir le ${display} en calendrier hébraïque. Conversion instantanée et gratuite.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  if (type === "special") {
    return {
      title: `${display} - Convertisseur Hébraïque`,
      description: `${display}. Consultez les dates et horaires des fêtes juives.`,
      alternates: { canonical: `${baseUrl}/${parsed.value}` },
    };
  }

  return {};
}

export function generateStaticParams() {
  const slugs = [
    "aujourd-hui-en-hebreu",
    "annee-5780", "annee-5783", "annee-5784", "annee-5785",
    "annee-5786", "annee-5787", "annee-5788",
    "ne-en-1980", "ne-en-1985", "ne-en-1990", "ne-en-1995",
    "ne-en-2000", "ne-en-2005", "ne-en-2010",
    "1-janvier-2026", "1-juillet-2026", "31-decembre-2026",
    "rosh-hashanah-2026", "yom-kippour-2026", "pessah-2026-hebraique", "shavouot-2026-hebraique",
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
  let contenuDetail = "";

  if (type === "aujourd-hui") {
    const heb = gregorienVersHebraique(new Date());
    contenuDetail = `Aujourd'hui, ${new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })} correspond à ${heb.jour} ${heb.moisNom} ${heb.annee} dans le calendrier hébraïque (${heb.moisHebreu}).`;
  }

  if (type === "annee-heb") {
    const annee = parseInt(value, 10);
    const debut = hebraiqueVersGregorien(annee, 1, 1);
    const fin = hebraiqueVersGregorien(annee, 12, 30);
    const embol = estAnneeEmbolismique(annee);
    contenuDetail = `L'année hébraïque ${annee} s'étend du ${debut.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} au ${fin.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}. C&apos;est une année ${embol ? "embolismique (13 mois)" : "commune (12 mois)"}.`;
  }

  if (type === "ne-en") {
    const annee = parseInt(value, 10);
    const dateNaissance = new Date(annee, 0, 1);
    const age = calculerAgeHebraique(dateNaissance);
    contenuDetail = `Quelqu'un né en ${annee} a actuellement environ ${age.ans} ans en années hébraïques, ce qui équivaut à ${age.ansGregorien} ans en années grégoriennes. Le calendrier hébraïque est luni-solaire avec un cycle de 19 ans (Meton).`;
  }

  if (type === "date-gregorienne") {
    const parts = value.split("-");
    const jour = parseInt(parts[0], 10);
    const moisIndex = getMoisIndex(parts[1]);
    const annee = parseInt(parts[2], 10);
    if (moisIndex >= 0) {
      const date = new Date(annee, moisIndex, jour);
      const heb = gregorienVersHebraique(date);
      contenuDetail = `Le ${jour} ${parts[1]} ${annee} correspond à ${heb.jour} ${heb.moisNom} ${heb.annee} dans le calendrier hébraïque (${heb.moisHebreu}).`;
    }
  }

  if (type === "special") {
    if (value === "rosh-hashanah-5786") {
      const rosh = hebraiqueVersGregorien(5786, 1, 1);
      contenuDetail = `Rosh Hashanah 5786 (Nouvel An juif) débute le ${rosh.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })} en grégorien. C'est le premier jour de Tichri (automne).`;
    } else if (value === "yom-kippour-5786") {
      const yk = hebraiqueVersGregorien(5786, 1, 10);
      contenuDetail = `Yom Kippour 5786 est le ${yk.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })} en grégorien. C'est le jour du pardon, 10 Tichri.`;
    } else if (value === "pessah-5786") {
      const pessah = hebraiqueVersGregorien(5786, 7, 15);
      contenuDetail = `Pessah 5786 (Pâque juive) débute le ${pessah.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })} en grégorien. C'est le 15 Nissan (printemps).`;
    } else if (value === "shavouot-5786") {
      const shavouot = hebraiqueVersGregorien(5786, 8, 6);
      contenuDetail = `Chavouot 5786 (Pentecôte juive) est le ${shavouot.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })} en grégorien. C'est le 6 Iyar (printemps).`;
    }
  }

  return (
    <div>
      <Breadcrumb currentPage={display} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">{display}</h1>
      </div>

      <p className="text-slate-600 mb-8 ml-[52px]">{contenuDetail}</p>

      <ConvertisseurHebraique />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          ℹ️ À propos de cette page
        </h2>
        <p className="text-sm text-blue-900">
          Cette page spécialisée affiche des informations sur{" "}
          <strong>{display.toLowerCase()}</strong>. Utilisez le convertisseur
          ci-dessus pour d&apos;autres conversions ou calculs de dates
          hébraïques.
        </p>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-calendrier-hebraique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
