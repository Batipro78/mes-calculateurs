import type { Metadata } from "next";
import CalculateurHeuresTravail from "../CalculateurHeuresTravail";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const HEURES = [20, 24, 28, 32, 35, 37, 39, 40, 42, 45, 48];
const TAUX = [12, 13, 15, 18, 20, 25, 30];
const SMIC_HORAIRE = 11.88;

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseSlug(slug: string): { heures: number; taux: number } | null {
  const match = slug.match(/^(\d+)-heures-(\d+)-euros$/);
  if (!match) return null;
  return { heures: parseInt(match[1]), taux: parseInt(match[2]) };
}

function getRegimeLabel(h: number): string {
  if (h < 24) return "Temps partiel court";
  if (h < 35) return "Temps partiel";
  if (h === 35) return "Temps plein (duree legale)";
  if (h <= 39) return "Temps plein + heures sup";
  if (h <= 43) return "Regime intensif";
  return "Proche du maximum legal";
}

function calculerSalaire(heures: number, tauxHoraire: number) {
  const hNormales = Math.min(heures, 35);
  const hSup25 = Math.max(0, Math.min(heures, 43) - 35);
  const hSup50 = Math.max(0, heures - 43);

  const salaireNormal = hNormales * tauxHoraire;
  const salaireSup25 = hSup25 * tauxHoraire * 1.25;
  const salaireSup50 = hSup50 * tauxHoraire * 1.5;
  const salaireSemaine = salaireNormal + salaireSup25 + salaireSup50;
  const salaireMensuel = salaireSemaine * 4.33;
  const salaireAnnuel = salaireMensuel * 12;
  const heuresSupTotal = hSup25 + hSup50;

  return {
    hNormales,
    hSup25,
    hSup50,
    salaireNormal,
    salaireSup25,
    salaireSup50,
    salaireSemaine,
    salaireMensuel,
    salaireAnnuel,
    heuresSupTotal,
  };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const h of HEURES) {
    for (const t of TAUX) {
      params.push({ params: `${h}-heures-${t}-euros` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { heures, taux } = parsed;
  const calc = calculerSalaire(heures, taux);
  const regime = getRegimeLabel(heures);

  return {
    title: `${heures} heures/semaine a ${taux} EUR/h - Salaire ${fmt(calc.salaireMensuel)} EUR/mois | 2026`,
    description: `Calcul pour ${heures}h/semaine a ${taux} EUR/heure : ${fmt(calc.salaireSemaine)} EUR/semaine, ${fmt(calc.salaireMensuel)} EUR/mois brut. ${calc.heuresSupTotal > 0 ? `${calc.heuresSupTotal}h supplementaires majorees.` : ""} ${regime}. Simulation 2026.`,
    keywords: `${heures} heures semaine salaire, ${taux} euros heure, ${heures}h travail, salaire ${heures} heures, heures supplementaires ${heures}h`,
    openGraph: {
      title: `${heures}h/sem a ${taux} EUR/h = ${fmt(calc.salaireMensuel)} EUR/mois`,
      description: `Simulation : ${heures} heures par semaine a ${taux} EUR de l'heure = ${fmt(calc.salaireMensuel)} EUR brut mensuel.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { heures, taux } = parsed;
  if (!HEURES.includes(heures) || !TAUX.includes(taux)) notFound();

  const calc = calculerSalaire(heures, taux);
  const regime = getRegimeLabel(heures);
  const isTempsPartiel = heures < 35;
  const isHeuresSup = heures > 35;

  // Comparaison par heures pour ce taux
  const comparaisonHeures = HEURES.map((h) => {
    const c = calculerSalaire(h, taux);
    return { heures: h, ...c, isCurrent: h === heures };
  });

  // Comparaison par taux pour ces heures
  const comparaisonTaux = TAUX.map((t) => {
    const c = calculerSalaire(heures, t);
    return { taux: t, ...c, isCurrent: t === taux };
  });

  // Comparaison avec le SMIC
  const calcSmic = calculerSalaire(heures, SMIC_HORAIRE);
  const diffSmic = calc.salaireMensuel - calcSmic.salaireMensuel;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien gagne-t-on pour ${heures} heures par semaine a ${taux} EUR/h ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${heures} heures par semaine a ${taux} EUR de l'heure, le salaire brut est de ${fmt(calc.salaireSemaine)} EUR/semaine, soit ${fmt(calc.salaireMensuel)} EUR/mois (x4,33) et ${fmt(calc.salaireAnnuel)} EUR/an.${isHeuresSup ? ` Cela inclut ${fmt(calc.heuresSupTotal)} heures supplementaires majorees.` : ""}`,
        },
      },
      {
        "@type": "Question",
        name: `${heures} heures par semaine, est-ce legal ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: heures <= 48
            ? `Oui, ${heures} heures par semaine est legal en France. La duree legale est de 35h, mais on peut travailler jusqu'a 48h maximum (44h en moyenne sur 12 semaines). Au-dela de 35h, les heures sont majorees (+25% puis +50%).`
            : `${heures} heures depasse le maximum legal de 48h hebdomadaires en France. Cette situation n'est pas autorisee par le Code du travail.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${heures}h - ${taux} EUR/h`}
        parentPage="Heures de Travail"
        parentHref="/calcul-heures-travail"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⏰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {heures} heures/semaine a {taux} EUR/h
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation de salaire pour {heures}h hebdomadaires au taux de {taux} EUR de l&apos;heure — {regime}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-200 mb-1">Salaire mensuel brut</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(calc.salaireMensuel)} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className="text-amber-200 mt-2">{regime}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-amber-200">Semaine</p>
            <p className="font-semibold">{fmt(calc.salaireSemaine)} EUR</p>
          </div>
          <div>
            <p className="text-amber-200">Mensuel</p>
            <p className="font-semibold">{fmt(calc.salaireMensuel)} EUR</p>
          </div>
          <div>
            <p className="text-amber-200">Annuel</p>
            <p className="font-semibold">{fmtInt(Math.round(calc.salaireAnnuel))} EUR</p>
          </div>
        </div>
      </div>

      {/* Detail des heures */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Heures normales</p>
          <p className="text-2xl font-extrabold text-slate-800">{calc.hNormales}h</p>
          <p className="text-xs text-slate-400 mt-1">a {taux} EUR/h = {fmt(calc.salaireNormal)} EUR</p>
        </div>
        {calc.hSup25 > 0 && (
          <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm">
            <p className="text-sm text-amber-500 mb-1">Heures sup +25%</p>
            <p className="text-2xl font-extrabold text-amber-600">{calc.hSup25}h</p>
            <p className="text-xs text-slate-400 mt-1">a {fmt(taux * 1.25)} EUR/h = {fmt(calc.salaireSup25)} EUR</p>
          </div>
        )}
        {calc.hSup50 > 0 && (
          <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm">
            <p className="text-sm text-red-500 mb-1">Heures sup +50%</p>
            <p className="text-2xl font-extrabold text-red-600">{calc.hSup50}h</p>
            <p className="text-xs text-slate-400 mt-1">a {fmt(taux * 1.5)} EUR/h = {fmt(calc.salaireSup50)} EUR</p>
          </div>
        )}
        {isTempsPartiel && (
          <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm">
            <p className="text-sm text-blue-500 mb-1">Temps partiel</p>
            <p className="text-2xl font-extrabold text-blue-600">{Math.round((heures / 35) * 100)}%</p>
            <p className="text-xs text-slate-400 mt-1">d&apos;un temps plein 35h</p>
          </div>
        )}
      </div>

      {/* Comparaison SMIC */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Comparaison avec le SMIC 2026</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500">Au SMIC ({fmt(SMIC_HORAIRE)} EUR/h)</p>
            <p className="text-xl font-bold text-slate-800">{fmt(calcSmic.salaireMensuel)} EUR/mois</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-sm text-amber-600">A {taux} EUR/h ({diffSmic >= 0 ? "+" : ""}{fmt(diffSmic)} EUR)</p>
            <p className="text-xl font-bold text-amber-700">{fmt(calc.salaireMensuel)} EUR/mois</p>
          </div>
        </div>
      </div>

      {/* Comparaison par heures */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Salaire a {taux} EUR/h selon les heures
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Heures/sem</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Heures sup</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Salaire/mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Regime</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonHeures.map((row) => (
                <tr key={row.heures} className={`border-b border-slate-100 ${row.isCurrent ? "bg-amber-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-amber-600">{row.heures}h</span>
                    ) : (
                      <a href={`/calcul-heures-travail/${row.heures}-heures-${taux}-euros`} className="text-slate-700 hover:text-amber-600 transition-colors">
                        {row.heures}h
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.heuresSupTotal > 0 ? "text-amber-600 font-semibold" : "text-slate-400"}`}>
                    {row.heuresSupTotal > 0 ? `+${row.heuresSupTotal}h` : "-"}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-amber-600" : "text-slate-700"}`}>
                    {fmt(row.salaireMensuel)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-xs text-slate-500">
                    {getRegimeLabel(row.heures)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par taux */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Salaire pour {heures}h selon le taux horaire
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Taux horaire</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Semaine</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mois</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Annuel</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonTaux.map((row) => (
                <tr key={row.taux} className={`border-b border-slate-100 ${row.isCurrent ? "bg-amber-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-amber-600">{row.taux} EUR/h</span>
                    ) : (
                      <a href={`/calcul-heures-travail/${heures}-heures-${row.taux}-euros`} className="text-slate-700 hover:text-amber-600 transition-colors">
                        {row.taux} EUR/h
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "text-amber-600 font-bold" : "text-slate-600"}`}>
                    {fmt(row.salaireSemaine)} EUR
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-amber-600" : "text-slate-700"}`}>
                    {fmt(row.salaireMensuel)} EUR
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">
                    {fmtInt(Math.round(row.salaireAnnuel))} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurHeuresTravail />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Travailler {heures} heures par semaine a {taux} EUR/h en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec un contrat de <strong>{heures} heures par semaine</strong> et un taux horaire de{" "}
          <strong>{taux} EUR brut</strong>, le salaire hebdomadaire est de{" "}
          <strong>{fmt(calc.salaireSemaine)} EUR</strong>, soit{" "}
          <strong>{fmt(calc.salaireMensuel)} EUR brut par mois</strong> (coefficient 4,33).
          Sur une annee complete, cela represente <strong>{fmtInt(Math.round(calc.salaireAnnuel))} EUR brut</strong>.
        </p>
        {isHeuresSup && (
          <p className="text-slate-600 mb-4 leading-relaxed">
            Les <strong>{fmt(calc.heuresSupTotal)} heures supplementaires</strong> (au-dela de 35h)
            sont majorees : +25% pour les 8 premieres heures ({calc.hSup25}h a {fmt(taux * 1.25)} EUR/h)
            {calc.hSup50 > 0 && <>, puis +50% au-dela ({calc.hSup50}h a {fmt(taux * 1.5)} EUR/h)</>}.
            Ces majorations representent{" "}
            <strong>{fmt(calc.salaireSup25 + calc.salaireSup50 - calc.heuresSupTotal * taux)} EUR de plus</strong> par
            semaine qu&apos;au taux normal.
          </p>
        )}
        {isTempsPartiel && (
          <p className="text-slate-600 mb-4 leading-relaxed">
            Un contrat de <strong>{heures}h correspond a {Math.round((heures / 35) * 100)}% d&apos;un temps plein</strong>.
            Le minimum legal pour un temps partiel est de 24h/semaine (sauf derogation).
            Les heures complementaires (entre {heures}h et 35h) sont majorees de 10%.
          </p>
        )}
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Le SMIC comme reference</h3>
        <p className="text-slate-600 leading-relaxed">
          Le SMIC horaire brut est de {fmt(SMIC_HORAIRE)} EUR en 2026. Pour {heures}h/semaine au SMIC,
          le salaire mensuel serait de {fmt(calcSmic.salaireMensuel)} EUR brut.
          A {taux} EUR/h, vous gagnez{" "}
          <strong>{diffSmic >= 0 ? "+" : ""}{fmt(diffSmic)} EUR/mois par rapport au SMIC</strong>.
        </p>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations</h2>
        <div className="flex flex-wrap gap-2">
          {HEURES.filter((h) => h !== heures).slice(0, 5).map((h) => (
            <a
              key={`h-${h}`}
              href={`/calcul-heures-travail/${h}-heures-${taux}-euros`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              {h}h / {taux} EUR
            </a>
          ))}
          {TAUX.filter((t) => t !== taux).slice(0, 4).map((t) => (
            <a
              key={`t-${t}`}
              href={`/calcul-heures-travail/${heures}-heures-${t}-euros`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
            >
              {heures}h / {t} EUR
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-heures-travail" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
