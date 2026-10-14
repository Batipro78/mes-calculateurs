import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcFactureGaz, CONSOMMATIONS_TYPIQUES, MOIS_GRILLE } from "../factureGazCalc";

const USAGES = ["cuisson", "eau-chaude", "chauffage-50m2", "chauffage-80m2", "chauffage-120m2"];
const USAGE_LABELS: Record<string, string> = {
  cuisson: "Cuisson",
  "eau-chaude": "Eau chaude sanitaire",
  "chauffage-50m2": "Chauffage 50 m²",
  "chauffage-80m2": "Chauffage 80 m²",
  "chauffage-120m2": "Chauffage 120 m²",
};

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Slug format: {usage}-zone1 e.g. "chauffage-80m2-zone1".
// Il n'y a pas de zones de prix : les anciennes adresses zone2 a zone6 renvoient vers la page zone1.
function parseSlug(slug: string): { usage: string; zone: string } | null {
  const match = slug.match(/^(.+)-(zone[1-6])$/);
  if (!match) return null;
  const usage = match[1];
  const zone = match[2];
  if (!USAGES.includes(usage)) return null;
  return { usage, zone };
}

export function generateStaticParams() {
  return USAGES.map((usage) => ({ params: `${usage}-zone1` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { usage } = parsed;
  const consommationKwh = CONSOMMATIONS_TYPIQUES[usage] ?? 13000;
  const resultat = calcFactureGaz(consommationKwh, "moyenne", usage);
  const usageLabel = USAGE_LABELS[usage] ?? usage;

  return {
    alternates: { canonical: `/simulateur-facture-gaz/${usage}-zone1` },
    title: `Facture de gaz ${usageLabel} (${MOIS_GRILLE}) : estimation`,
    description: `Estimation de la facture de gaz pour ${usageLabel.toLowerCase()} avec le prix repère de la CRE (${MOIS_GRILLE}) : ${fmt(resultat.factureMensuelle)} EUR par mois, ${fmt(resultat.factureAnnuelle)} EUR par an pour ${consommationKwh.toLocaleString("fr-FR")} kWh.`,
    keywords: `facture gaz ${usageLabel.toLowerCase()}, prix repère gaz CRE, prix kWh gaz ${MOIS_GRILLE}, simulation facture gaz`,
    openGraph: {
      title: `Facture de gaz ${usageLabel} : ${fmt(resultat.factureAnnuelle)} EUR/an`,
      description: `${usageLabel} au gaz : ${fmt(resultat.factureMensuelle)} EUR/mois soit ${fmt(resultat.factureAnnuelle)} EUR/an avec le prix repère de la CRE (${MOIS_GRILLE}).`,
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

  const { usage, zone } = parsed;
  if (zone !== "zone1") permanentRedirect(`/simulateur-facture-gaz/${usage}-zone1`);

  const consommationKwh = CONSOMMATIONS_TYPIQUES[usage] ?? 13000;
  const resultat = calcFactureGaz(consommationKwh, "moyenne", usage);
  const usageLabel = USAGE_LABELS[usage] ?? usage;

  // Comparaison par usage (meme prix moyen)
  const comparaisonUsages = USAGES.map((u) => {
    const conso = CONSOMMATIONS_TYPIQUES[u] ?? 13000;
    const r = calcFactureGaz(conso, "moyenne", u);
    return {
      usage: u,
      label: USAGE_LABELS[u] ?? u,
      consommationKwh: conso,
      factureMensuelle: r.factureMensuelle,
      factureAnnuelle: r.factureAnnuelle,
      isCurrent: u === usage,
      slug: `${u}-zone1`,
    };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coûte le gaz pour ${usageLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec le prix repère de vente de gaz de la CRE (${MOIS_GRILLE}), la facture est estimée à ${fmt(resultat.factureMensuelle)} EUR par mois, soit ${fmt(resultat.factureAnnuelle)} EUR par an, pour ${consommationKwh.toLocaleString("fr-FR")} kWh par an. Le prix repère change chaque mois et reste indicatif : chaque fournisseur fixe librement ses prix.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le prix du kWh de gaz pour ${usageLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le prix repère moyen de la CRE (${MOIS_GRILLE}) est de ${fmt(resultat.prixKwh, 5)} EUR le kWh TTC, hors abonnement. L'abonnement annuel de ce repère est de ${fmt(resultat.abonnementAnnuel)} EUR TTC.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment réduire sa facture de gaz pour ${usageLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Baisser le chauffage de 1 °C représente environ 7 % de consommation en moins selon le ministère de la Transition écologique et l'ADEME. Vous pouvez aussi faire entretenir votre chaudière, mieux isoler le logement et comparer les offres sur le comparateur du Médiateur national de l'énergie.`,
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
        currentPage={usageLabel}
        parentPage="Simulateur Facture Gaz"
        parentHref="/simulateur-facture-gaz"
        lastUpdated="14 octobre 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔥
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Facture de gaz : {usageLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation de la facture de gaz pour{" "}
        <strong>{usageLabel.toLowerCase()}</strong> avec le prix repère de vente de gaz de la CRE
        (grille d&apos;{MOIS_GRILLE}, zone GRDF). Ce prix change chaque mois. Mis à jour le 14 octobre 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-100 mb-1">
          Facture mensuelle estimée — {usageLabel}
        </p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(resultat.factureMensuelle)}{" "}
          <span className="text-2xl font-semibold">EUR / mois</span>
        </p>
        <p className="text-orange-100 mt-2">
          Soit {fmt(resultat.factureAnnuelle)} EUR/an pour{" "}
          {consommationKwh.toLocaleString("fr-FR")} kWh/an
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-orange-100">Abonnement</p>
            <p className="font-semibold">{fmt(resultat.abonnementMensuel)} EUR/mois</p>
          </div>
          <div>
            <p className="text-orange-100">Consommation</p>
            <p className="font-semibold">{fmt(resultat.consommationMensuelle)} EUR/mois</p>
          </div>
          <div>
            <p className="text-orange-100">Prix kWh TTC</p>
            <p className="font-semibold">{resultat.prixKwh.toLocaleString("fr-FR", { minimumFractionDigits: 5 })} EUR</p>
          </div>
          <div>
            <p className="text-orange-100">Taxes et TVA</p>
            <p className="font-semibold">
              {fmt(resultat.tva + resultat.ctaMensuelle + resultat.ticgn)} EUR/mois
            </p>
          </div>
        </div>
      </div>

      {/* Detail de la facture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Détail de la facture mensuelle
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-3 text-slate-500 font-medium">Poste</th>
              <th className="text-right py-3 px-3 text-slate-500 font-medium">Mensuel</th>
              <th className="text-right py-3 px-3 text-slate-500 font-medium">Annuel</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Abonnement (hors taxes)", mensuel: resultat.abonnementMensuel, annuel: resultat.annuel.abonnement, color: "text-blue-600" },
              { label: "Consommation (kWh, hors taxes)", mensuel: resultat.consommationMensuelle, annuel: resultat.annuel.consommation, color: "text-orange-600" },
              { label: "CTA", mensuel: resultat.ctaMensuelle, annuel: resultat.annuel.cta, color: "text-purple-600" },
              { label: "TICGN", mensuel: resultat.ticgn, annuel: resultat.annuel.ticgn, color: "text-pink-600" },
              { label: "TVA 20%", mensuel: resultat.tva, annuel: resultat.annuel.tva, color: "text-amber-600" },
            ].map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-slate-600">{row.label}</td>
                <td className={`py-2.5 px-3 text-right font-semibold ${row.color}`}>
                  {fmt(row.mensuel)} EUR
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500">
                  {fmt(row.annuel)} EUR
                </td>
              </tr>
            ))}
            <tr className="bg-orange-50/50">
              <td className="py-3 px-3 font-bold text-slate-700">Total</td>
              <td className="py-3 px-3 text-right font-extrabold text-orange-600">
                {fmt(resultat.factureMensuelle)} EUR
              </td>
              <td className="py-3 px-3 text-right font-extrabold text-orange-600">
                {fmt(resultat.factureAnnuelle)} EUR
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-400 mt-3">
          CTA : contribution tarifaire d&apos;acheminement. TICGN : taxe intérieure de consommation sur le gaz naturel.
          Source : prix repère de vente de gaz de la CRE, grille d&apos;{MOIS_GRILLE}. Montants arrondis au centime.
        </p>
      </div>

      {/* Comparaison par usage */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par type d&apos;usage (prix repère moyen)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Usage</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Conso kWh/an</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Mensuel</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Annuel</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonUsages.map((row) => (
                <tr
                  key={row.usage}
                  className={`border-b border-slate-100 ${row.isCurrent ? "bg-orange-50/50" : ""}`}
                >
                  <td className={`py-2.5 px-3 font-medium ${row.isCurrent ? "text-orange-700" : "text-slate-700"}`}>
                    {row.isCurrent ? (
                      <span className="font-bold">{row.label}</span>
                    ) : (
                      <a
                        href={`/simulateur-facture-gaz/${row.slug}`}
                        className="hover:text-orange-600 transition-colors"
                      >
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600">
                    {row.consommationKwh.toLocaleString("fr-FR")}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600">
                    {fmt(row.factureMensuelle)} EUR
                  </td>
                  <td className={`py-2.5 px-3 text-right font-bold ${row.isCurrent ? "text-orange-600" : "text-slate-700"}`}>
                    {fmt(row.factureAnnuelle)} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Les consommations en kWh sont des ordres de grandeur choisis par ce simulateur, pas des valeurs officielles :
          reprenez celle de votre facture.
        </p>
      </div>

      {/* Fourchette du prix repere */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Fourchette du prix repère de la CRE — {usageLabel}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Niveau de prix</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Prix kWh TTC</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Facture annuelle</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Écart avec le prix moyen</th>
              </tr>
            </thead>
            <tbody>
              {resultat.comparaisonNiveaux.map((f, i) => {
                const ref = resultat.comparaisonNiveaux[1].factureAnnuelle;
                const diff = f.factureAnnuelle - ref;
                return (
                  <tr
                    key={f.nom}
                    className={`border-b border-slate-100 ${i === 1 ? "bg-orange-50/50" : ""}`}
                  >
                    <td className={`py-2.5 px-3 font-medium ${i === 1 ? "text-orange-700" : "text-slate-700"}`}>
                      {f.nom}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {f.prixKwh.toLocaleString("fr-FR", { minimumFractionDigits: 5, maximumFractionDigits: 5 })} EUR
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold ${i === 1 ? "text-orange-700" : "text-slate-700"}`}>
                      {fmt(f.factureAnnuelle)} EUR
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {i === 1 ? (
                        <span className="text-slate-400 text-xs">Référence</span>
                      ) : (
                        <span className={`text-xs font-semibold ${diff < 0 ? "text-green-600" : "text-red-500"}`}>
                          {diff > 0 ? "+" : ""}{fmt(diff)} EUR
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          * Fourchette publiée par la CRE pour la zone GRDF. Ce ne sont pas des offres de fournisseurs : comparez les
          offres sur energie-info.fr, le site du Médiateur national de l&apos;énergie.
        </p>
      </div>

      {/* Liens vers autres usages */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Autres usages
        </h2>
        <div className="flex flex-wrap gap-2">
          {comparaisonUsages
            .filter((r) => !r.isCurrent)
            .map((r) => (
              <a
                key={r.slug}
                href={`/simulateur-facture-gaz/${r.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
              >
                {r.label}
              </a>
            ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-facture-gaz" />
    </div>
  );
}
