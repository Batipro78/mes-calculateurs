import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { calcFactureGaz, CONSOMMATIONS_TYPIQUES } from "../factureGazCalc";

const USAGES = ["cuisson", "eau-chaude", "chauffage-50m2", "chauffage-80m2", "chauffage-120m2"];
const ZONES = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone6"];

const USAGE_LABELS: Record<string, string> = {
  cuisson: "Cuisson",
  "eau-chaude": "Eau chaude sanitaire",
  "chauffage-50m2": "Chauffage 50 m²",
  "chauffage-80m2": "Chauffage 80 m²",
  "chauffage-120m2": "Chauffage 120 m²",
};

const ZONE_LABELS: Record<string, string> = {
  zone1: "Zone 1",
  zone2: "Zone 2",
  zone3: "Zone 3",
  zone4: "Zone 4",
  zone5: "Zone 5",
  zone6: "Zone 6",
};

const ZONE_VILLES: Record<string, string> = {
  zone1: "Paris, Ile-de-France, Nord",
  zone2: "Lyon, Bordeaux, Rennes",
  zone3: "Marseille, Toulouse, Nantes",
  zone4: "Strasbourg, Metz, Reims",
  zone5: "Montpellier, Nice, Grenoble",
  zone6: "Clermont-Ferrand, Limoges, Poitiers",
};

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Slug format: {usage}-{zone} e.g. "chauffage-80m2-zone2"
function parseSlug(slug: string): { usage: string; zone: string } | null {
  const match = slug.match(/^(.+)-(zone[1-6])$/);
  if (!match) return null;
  const usage = match[1];
  const zone = match[2];
  if (!USAGES.includes(usage) || !ZONES.includes(zone)) return null;
  return { usage, zone };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const usage of USAGES) {
    for (const zone of ZONES) {
      params.push({ params: `${usage}-${zone}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { usage, zone } = parsed;
  const consommationKwh = CONSOMMATIONS_TYPIQUES[usage] ?? 13000;
  const resultat = calcFactureGaz(consommationKwh, zone, usage, "tarif-reglemente");
  const usageLabel = USAGE_LABELS[usage] ?? usage;
  const zoneLabel = ZONE_LABELS[zone] ?? zone;

  return {
    alternates: { canonical: `/simulateur-facture-gaz/${slug}` },
    title: `Facture Gaz ${usageLabel} ${zoneLabel} 2026 - Estimation gratuite`,
    description: `Estimation de la facture de gaz pour ${usageLabel.toLowerCase()} en ${zoneLabel} (${ZONE_VILLES[zone]}). Facture mensuelle : ${fmt(resultat.factureMensuelle)} EUR, annuelle : ${fmt(resultat.factureAnnuelle)} EUR. Tarif GRDF Q1 2026.`,
    keywords: `facture gaz ${usageLabel.toLowerCase()}, gaz naturel ${zoneLabel}, prix gaz ${zone}, tarif GRDF ${zone}, simulation facture gaz 2026`,
    openGraph: {
      title: `Facture Gaz ${usageLabel} ${zoneLabel} : ${fmt(resultat.factureAnnuelle)} EUR/an`,
      description: `${usageLabel} au gaz en ${zoneLabel} (${ZONE_VILLES[zone]}) : ${fmt(resultat.factureMensuelle)} EUR/mois soit ${fmt(resultat.factureAnnuelle)} EUR/an au tarif GRDF 2026.`,
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
  const consommationKwh = CONSOMMATIONS_TYPIQUES[usage] ?? 13000;
  const resultat = calcFactureGaz(consommationKwh, zone, usage, "tarif-reglemente");
  const usageLabel = USAGE_LABELS[usage] ?? usage;
  const zoneLabel = ZONE_LABELS[zone] ?? zone;

  // Comparaison par zone (meme usage)
  const comparaisonZones = ZONES.map((z) => {
    const r = calcFactureGaz(consommationKwh, z, usage, "tarif-reglemente");
    return {
      zone: z,
      label: ZONE_LABELS[z],
      villes: ZONE_VILLES[z],
      prixKwh: r.prixKwh,
      factureMensuelle: r.factureMensuelle,
      factureAnnuelle: r.factureAnnuelle,
      isCurrent: z === zone,
      slug: `${usage}-${z}`,
    };
  });

  // Comparaison par usage (meme zone)
  const comparaisonUsages = USAGES.map((u) => {
    const conso = CONSOMMATIONS_TYPIQUES[u] ?? 13000;
    const r = calcFactureGaz(conso, zone, u, "tarif-reglemente");
    return {
      usage: u,
      label: USAGE_LABELS[u] ?? u,
      consommationKwh: conso,
      factureMensuelle: r.factureMensuelle,
      factureAnnuelle: r.factureAnnuelle,
      isCurrent: u === usage,
      slug: `${u}-${zone}`,
    };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coute le gaz pour ${usageLabel.toLowerCase()} en ${zoneLabel} en 2026 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour ${usageLabel.toLowerCase()} en ${zoneLabel} (${ZONE_VILLES[zone]}), la facture de gaz est estimee a ${fmt(resultat.factureMensuelle)} EUR par mois, soit ${fmt(resultat.factureAnnuelle)} EUR par an, pour une consommation de ${consommationKwh.toLocaleString("fr-FR")} kWh/an au tarif GRDF Q1 2026 (${resultat.prixKwh} EUR/kWh).`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le prix du kWh de gaz en ${zoneLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En ${zoneLabel} (${ZONE_VILLES[zone]}), le prix du kWh de gaz naturel au tarif reglemente GRDF Q1 2026 est de ${resultat.prixKwh} EUR/kWh hors abonnement. La facture inclut egalement un abonnement annuel de ${resultat.abonnementAnnuel} EUR pour l'usage ${usageLabel.toLowerCase()}, plus les taxes (CTA, TVA, TICGN).`,
        },
      },
      {
        "@type": "Question",
        name: `Comment reduire sa facture de gaz pour ${usageLabel.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour reduire votre facture de gaz pour ${usageLabel.toLowerCase()}, vous pouvez : comparer les offres des fournisseurs alternatifs, ameliorer l'isolation de votre logement, entretenir votre installation annuellement, programmer la temperature selon vos horaires, et envisager des solutions alternatives comme le chauffe-eau thermodynamique ou la pompe a chaleur.`,
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
        currentPage={`${usageLabel} — ${zoneLabel}`}
        parentPage="Simulateur Facture Gaz"
        parentHref="/simulateur-facture-gaz"
        lastUpdated="8 avril 2026"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔥
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Facture Gaz — {usageLabel} · {zoneLabel}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation de la facture de gaz pour{" "}
        <strong>{usageLabel.toLowerCase()}</strong> en{" "}
        <strong>{zoneLabel}</strong> ({ZONE_VILLES[zone]}). Tarif GRDF Q1 2026.
        Mis a jour le 8 avril 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-100 mb-1">
          Facture mensuelle estimee — {usageLabel} · {zoneLabel}
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
            <p className="text-orange-100">Prix kWh</p>
            <p className="font-semibold">{resultat.prixKwh} EUR</p>
          </div>
          <div>
            <p className="text-orange-100">Taxes/TVA</p>
            <p className="font-semibold">
              {fmt(resultat.tva55 + resultat.tva20 + resultat.ctaMensuelle + resultat.ticgn)} EUR/mois
            </p>
          </div>
        </div>
      </div>

      {/* Detail de la facture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Detail de la facture mensuelle
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
              { label: "Abonnement", mensuel: resultat.abonnementMensuel, color: "text-blue-600" },
              { label: "Consommation (kWh)", mensuel: resultat.consommationMensuelle, color: "text-orange-600" },
              { label: "CTA", mensuel: resultat.ctaMensuelle, color: "text-purple-600" },
              { label: "TVA 5,5%", mensuel: resultat.tva55, color: "text-emerald-600" },
              { label: "TVA 20%", mensuel: resultat.tva20, color: "text-amber-600" },
              { label: "TICGN", mensuel: resultat.ticgn, color: "text-pink-600" },
            ].map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <td className="py-2.5 px-3 text-slate-600">{row.label}</td>
                <td className={`py-2.5 px-3 text-right font-semibold ${row.color}`}>
                  {fmt(row.mensuel)} EUR
                </td>
                <td className="py-2.5 px-3 text-right text-slate-500">
                  {fmt(row.mensuel * 12)} EUR
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
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Comparaison par zone (meme usage) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {usageLabel} : comparaison par zone tarifaire GRDF
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Zone</th>
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Villes</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Prix kWh</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Mensuel</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Annuel</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonZones.map((row) => (
                <tr
                  key={row.zone}
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
                  <td className="py-2.5 px-3 text-slate-400 text-xs">{row.villes}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">
                    {row.prixKwh.toLocaleString("fr-FR", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} EUR
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
      </div>

      {/* Comparaison par usage (meme zone) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {zoneLabel} : comparaison par type d&apos;usage
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
      </div>

      {/* Comparaison fournisseurs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison fournisseurs — {usageLabel} · {zoneLabel}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 text-slate-500 font-medium">Fournisseur</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Prix kWh</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Facture annuelle</th>
                <th className="text-right py-3 px-3 text-slate-500 font-medium">Ecart</th>
              </tr>
            </thead>
            <tbody>
              {resultat.comparaisonFournisseurs.map((f, i) => {
                const ref = resultat.comparaisonFournisseurs[0].factureAnnuelle;
                const diff = f.factureAnnuelle - ref;
                return (
                  <tr
                    key={f.nom}
                    className={`border-b border-slate-100 ${i === 0 ? "bg-orange-50/50" : ""}`}
                  >
                    <td className={`py-2.5 px-3 font-medium ${i === 0 ? "text-orange-700" : "text-slate-700"}`}>
                      {f.nom}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {f.prixKwh.toLocaleString("fr-FR", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} EUR
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold ${i === 0 ? "text-orange-700" : "text-slate-700"}`}>
                      {fmt(f.factureAnnuelle)} EUR
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {i === 0 ? (
                        <span className="text-slate-400 text-xs">Reference</span>
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
          * Les prix des fournisseurs alternatifs sont indicatifs. Verifiez les offres actuelles sur energie-info.fr.
        </p>
      </div>

      {/* Liens vers autres combinaisons */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Autres simulations — {usageLabel}
        </h2>
        <div className="flex flex-wrap gap-2">
          {comparaisonZones
            .filter((r) => !r.isCurrent)
            .map((r) => (
              <a
                key={r.slug}
                href={`/simulateur-facture-gaz/${r.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
              >
                {usageLabel} · {r.label}
              </a>
            ))}
        </div>
        <h2 className="text-lg font-bold text-slate-800 mt-6 mb-4">
          Autres usages — {zoneLabel}
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
                {r.label} · {zoneLabel}
              </a>
            ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-facture-gaz" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
