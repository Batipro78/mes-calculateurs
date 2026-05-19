import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import WebAppJsonLd from "../../components/WebAppJsonLd";
import { DATES_2026_2030, formatDateFR, formatDateFRShort } from "../ramadanCalc";

interface PageProps {
  params: Promise<{
    params: string;
  }>;
}

const SLUG_PATTERNS = {
  ramadan: /^ramadan-(\d{4})$/,
  aidFitr: /^aid-al-fitr-(\d{4})$/,
  aidAdha: /^aid-al-adha-(\d{4})$/,
  joursAvantRamadan: /^combien-de-jours-avant-ramadan$/,
  joursAvantAid: /^combien-de-jours-avant-aid$/,
  calendrier: /^calendrier-musulman-(\d{4})$/,
};

export async function generateStaticParams() {
  const params = [];

  // Ramadan pages
  for (const dates of DATES_2026_2030) {
    params.push({ params: `ramadan-${dates.annee}` });
  }

  // Aïd al-Fitr pages
  for (const dates of DATES_2026_2030) {
    params.push({ params: `aid-al-fitr-${dates.annee}` });
  }

  // Aïd al-Adha pages
  for (const dates of DATES_2026_2030) {
    params.push({ params: `aid-al-adha-${dates.annee}` });
  }

  // Autres pages
  params.push({ params: "combien-de-jours-avant-ramadan" });
  params.push({ params: "combien-de-jours-avant-aid" });

  // Calendrier pages
  for (const dates of DATES_2026_2030) {
    params.push({ params: `calendrier-musulman-${dates.annee}` });
  }

  return params;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.params;

  // Ramadan
  const ramadanMatch = slug.match(SLUG_PATTERNS.ramadan);
  if (ramadanMatch) {
    const annee = parseInt(ramadanMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();
    return {
      title: `Ramadan ${annee} - Début le ${dates.ramadanDebut.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}`,
      description: `Ramadan ${annee} commence le ${formatDateFRShort(dates.ramadanDebut)}. Durée, Aïd al-Fitr le ${formatDateFRShort(dates.aidAlFitr)}. Estimation Umm al-Qura.`,
      alternates: { canonical: `/calcul-date-ramadan/ramadan-${annee}` },
    };
  }

  // Aïd al-Fitr
  const aidFitrMatch = slug.match(SLUG_PATTERNS.aidFitr);
  if (aidFitrMatch) {
    const annee = parseInt(aidFitrMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();
    return {
      title: `Aïd al-Fitr ${annee} - ${formatDateFRShort(dates.aidAlFitr)}`,
      description: `Aïd al-Fitr ${annee} le ${formatDateFR(dates.aidAlFitr)}. Fin du Ramadan, fête de la rupture du jeûne.`,
      alternates: { canonical: `/calcul-date-ramadan/aid-al-fitr-${annee}` },
    };
  }

  // Aïd al-Adha
  const aidAdhaMatch = slug.match(SLUG_PATTERNS.aidAdha);
  if (aidAdhaMatch) {
    const annee = parseInt(aidAdhaMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();
    return {
      title: `Aïd al-Adha ${annee} - ${formatDateFRShort(dates.aidAlAdha)}`,
      description: `Aïd al-Adha ${annee} le ${formatDateFR(dates.aidAlAdha)}. Fête du sacrifice 70 jours après Ramadan.`,
      alternates: { canonical: `/calcul-date-ramadan/aid-al-adha-${annee}` },
    };
  }

  // Combien de jours avant Ramadan
  if (slug === "combien-de-jours-avant-ramadan") {
    return {
      title: "Combien de jours avant Ramadan 2026 ?",
      description:
        "Compte à rebours : nombre de jours avant le prochain Ramadan 2026. Date début 18 février.",
      alternates: { canonical: "/calcul-date-ramadan/combien-de-jours-avant-ramadan" },
    };
  }

  // Combien de jours avant Aïd
  if (slug === "combien-de-jours-avant-aid") {
    return {
      title: "Combien de jours avant l'Aïd 2026 ?",
      description:
        "Compte à rebours : nombre de jours avant le prochain Aïd (al-Fitr ou al-Adha) en 2026.",
      alternates: { canonical: "/calcul-date-ramadan/combien-de-jours-avant-aid" },
    };
  }

  // Calendrier
  const calendrierMatch = slug.match(SLUG_PATTERNS.calendrier);
  if (calendrierMatch) {
    const annee = parseInt(calendrierMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();
    return {
      title: `Calendrier Musulman ${annee} - Ramadan, Aïd al-Fitr, Aïd al-Adha`,
      description: `Calendrier islamique ${annee} : Ramadan (${formatDateFRShort(dates.ramadanDebut)}), Aïd al-Fitr (${formatDateFRShort(dates.aidAlFitr)}), Aïd al-Adha (${formatDateFRShort(dates.aidAlAdha)}).`,
      alternates: { canonical: `/calcul-date-ramadan/calendrier-musulman-${annee}` },
    };
  }

  notFound();
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = params.params;

  // Ramadan
  const ramadanMatch = slug.match(SLUG_PATTERNS.ramadan);
  if (ramadanMatch) {
    const annee = parseInt(ramadanMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();

    return (
      <div>
        <WebAppJsonLd name={`Ramadan ${annee}`} />
        <Breadcrumb currentPage={`Ramadan ${annee}`} />

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Ramadan {annee}
        </h1>
        <p className="text-slate-600 mb-6">
          Début : <strong>{formatDateFR(dates.ramadanDebut)}</strong>
        </p>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 mb-8">
          <p className="text-slate-700 mb-4">
            Le Ramadan {annee} commence le{" "}
            <strong className="text-emerald-700">{formatDateFR(dates.ramadanDebut)}</strong>.
          </p>
          <p className="text-slate-700 mb-4">
            Aïd al-Fitr sera célébré le{" "}
            <strong className="text-emerald-700">{formatDateFRShort(dates.aidAlFitr)}</strong>.
          </p>
          {!dates.confirme && (
            <p className="text-sm text-amber-800 bg-amber-100 border border-amber-300 rounded px-3 py-2 mt-4">
              ⚠️ Cette date est une <strong>estimation Umm al-Qura</strong>. La date officielle
              sera annoncée par la CFCM et la Mosquée de Paris.
            </p>
          )}
        </div>

        <RelatedCalculators currentSlug="/calcul-date-ramadan" />
      </div>
    );
  }

  // Aïd al-Fitr
  const aidFitrMatch = slug.match(SLUG_PATTERNS.aidFitr);
  if (aidFitrMatch) {
    const annee = parseInt(aidFitrMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();

    return (
      <div>
        <WebAppJsonLd name={`Aïd al-Fitr ${annee}`} />
        <Breadcrumb currentPage={`Aïd al-Fitr ${annee}`} />

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Aïd al-Fitr {annee}
        </h1>
        <p className="text-slate-600 mb-6">
          Fête de la rupture du jeûne : <strong>{formatDateFR(dates.aidAlFitr)}</strong>
        </p>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-8 mb-8">
          <p className="text-slate-700 mb-4">
            Aïd al-Fitr {annee} est célébré le{" "}
            <strong className="text-teal-700">{formatDateFR(dates.aidAlFitr)}</strong>, marquant
            la fin du Ramadan et du jeûne.
          </p>
          <p className="text-slate-700 mb-4">
            Ramadan aura commencé le{" "}
            <strong className="text-teal-700">{formatDateFRShort(dates.ramadanDebut)}</strong>.
          </p>
          <p className="text-slate-700">
            C&apos;est une journée de célébration, de prières spéciales et de réunions familiales.
          </p>
        </div>

        <RelatedCalculators currentSlug="/calcul-date-ramadan" />
      </div>
    );
  }

  // Aïd al-Adha
  const aidAdhaMatch = slug.match(SLUG_PATTERNS.aidAdha);
  if (aidAdhaMatch) {
    const annee = parseInt(aidAdhaMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();

    return (
      <div>
        <WebAppJsonLd name={`Aïd al-Adha ${annee}`} />
        <Breadcrumb currentPage={`Aïd al-Adha ${annee}`} />

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Aïd al-Adha {annee}
        </h1>
        <p className="text-slate-600 mb-6">
          Fête du sacrifice : <strong>{formatDateFR(dates.aidAlAdha)}</strong>
        </p>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-8 mb-8">
          <p className="text-slate-700 mb-4">
            Aïd al-Adha {annee} est célébré le{" "}
            <strong className="text-orange-700">{formatDateFR(dates.aidAlAdha)}</strong>,
            commémorant le sacrifice du prophète Abraham.
          </p>
          <p className="text-slate-700 mb-4">
            Cette fête intervient environ 70 jours après la fin du Ramadan et est l&apos;une des
            deux plus grandes célébrations de l&apos;Islam.
          </p>
          <p className="text-slate-700">
            Aïd al-Adha dure généralement 3 à 4 jours et est marquée par des prières, des
            rassemblements et des repas en famille.
          </p>
        </div>

        <RelatedCalculators currentSlug="/calcul-date-ramadan" />
      </div>
    );
  }

  // Combien de jours avant Ramadan
  if (slug === "combien-de-jours-avant-ramadan") {
    const prochaineRamadan = DATES_2026_2030.find(
      (d) => d.ramadanDebut > new Date()
    ) || DATES_2026_2030[0];

    return (
      <div>
        <WebAppJsonLd name="Compte à rebours Ramadan" />
        <Breadcrumb currentPage="Combien de jours avant Ramadan" />

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Combien de jours avant Ramadan ?
        </h1>
        <p className="text-slate-600 mb-6">
          Compte à rebours jusqu&apos;au prochain Ramadan {prochaineRamadan.annee}.
        </p>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 mb-8">
          <p className="text-lg text-slate-700 mb-4">
            Ramadan {prochaineRamadan.annee} commence le{" "}
            <strong className="text-emerald-700">
              {formatDateFR(prochaineRamadan.ramadanDebut)}
            </strong>
            .
          </p>
          <p className="text-slate-700">
            Consultez le calculateur principal pour voir le compte à rebours en temps réel.
          </p>
        </div>

        <RelatedCalculators currentSlug="/calcul-date-ramadan" />
      </div>
    );
  }

  // Combien de jours avant Aïd
  if (slug === "combien-de-jours-avant-aid") {
    const prochaineRamadan = DATES_2026_2030.find(
      (d) => d.aidAlFitr > new Date()
    ) || DATES_2026_2030[0];

    return (
      <div>
        <WebAppJsonLd name="Compte à rebours Aïd" />
        <Breadcrumb currentPage="Combien de jours avant l&apos;Aïd" />

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Combien de jours avant l&apos;Aïd ?
        </h1>
        <p className="text-slate-600 mb-6">
          Compte à rebours jusqu&apos;au prochain Aïd al-Fitr {prochaineRamadan.annee}.
        </p>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-8 mb-8">
          <p className="text-lg text-slate-700 mb-4">
            Aïd al-Fitr {prochaineRamadan.annee} sera le{" "}
            <strong className="text-teal-700">
              {formatDateFR(prochaineRamadan.aidAlFitr)}
            </strong>
            .
          </p>
          <p className="text-slate-700">
            Consultez le calculateur principal pour voir le compte à rebours actualisé.
          </p>
        </div>

        <RelatedCalculators currentSlug="/calcul-date-ramadan" />
      </div>
    );
  }

  // Calendrier
  const calendrierMatch = slug.match(SLUG_PATTERNS.calendrier);
  if (calendrierMatch) {
    const annee = parseInt(calendrierMatch[1]);
    const dates = DATES_2026_2030.find((d) => d.annee === annee);
    if (!dates) notFound();

    return (
      <div>
        <WebAppJsonLd name={`Calendrier musulman ${annee}`} />
        <Breadcrumb currentPage={`Calendrier musulman ${annee}`} />

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Calendrier musulman {annee}
        </h1>
        <p className="text-slate-600 mb-6">
          Dates clés du calendrier islamique pour {annee}.
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Événement</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Jour</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-800">Ramadan</td>
                  <td className="py-3 px-4 text-slate-700">
                    {formatDateFRShort(dates.ramadanDebut)}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {dates.ramadanDebut.toLocaleDateString("fr-FR", { weekday: "long" })}
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-800">Aïd al-Fitr</td>
                  <td className="py-3 px-4 text-slate-700">
                    {formatDateFRShort(dates.aidAlFitr)}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {dates.aidAlFitr.toLocaleDateString("fr-FR", { weekday: "long" })}
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-800">Aïd al-Adha</td>
                  <td className="py-3 px-4 text-slate-700">
                    {formatDateFRShort(dates.aidAlAdha)}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {dates.aidAlAdha.toLocaleDateString("fr-FR", { weekday: "long" })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <RelatedCalculators currentSlug="/calcul-date-ramadan" />
      </div>
    );
  }

  notFound();
}
