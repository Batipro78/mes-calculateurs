import type { Metadata } from "next";
import TaxeFonciere from "../TaxeFonciere";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";
import { TAUX_VILLES, calculerTaxeFonciere } from "../taxeFonciereCalc";

// Taux approximatifs pour les villes qui ne sont pas dans TAUX_VILLES (moyenne nationale ~35%)
const DEFAULT_TAUX = 35;

function tauxPourVille(ville: Ville): number {
  // TAUX_VILLES utilise les noms capitalises, VILLES utilise slugs lowercase
  return TAUX_VILLES[ville.nom] ?? DEFAULT_TAUX;
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function generateStaticParams() {
  return getVillesSlugs().map((s) => ({ params: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const ville = findVille(slug);
  if (!ville) return {};

  const taux = tauxPourVille(ville);
  const estimation = calculerTaxeFonciere({
    valeurLocative: null,
    surface: 70,
    typeBien: "appartement",
    ville: ville.nom,
    tauxCustom: taux,
    neuf: false,
  });
  const taxe70 = estimation ? Math.round(estimation.taxeAnnuelle) : 0;

  return {
    alternates: { canonical: `/calcul-taxe-fonciere/${slug}` },
    title: `Calcul taxe fonciere a ${ville.nom} - Taux ${taux}% (2026)`,
    description: `Calculez la taxe fonciere a ${ville.nom} en 2026. Taux global applique : ${taux}%. Pour un appartement de 70m2, comptez environ ${fmt(taxe70)} EUR/an. Simulateur par surface et type de bien.`,
    keywords: `taxe fonciere ${ville.nom.toLowerCase()}, taux taxe fonciere ${ville.nom.toLowerCase()}, calcul taxe fonciere ${ville.nom.toLowerCase()}, taxe fonciere ${ville.departement}, impot local ${ville.nom.toLowerCase()}`,
    openGraph: {
      title: `Taxe fonciere a ${ville.nom} - Taux ${taux}% en 2026`,
      description: `Appartement 70m2 a ${ville.nom} : environ ${fmt(taxe70)} EUR de taxe fonciere. Taux global ${taux}%. Simulateur gratuit.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const ville = findVille(slug);
  if (!ville) notFound();

  const taux = tauxPourVille(ville);
  const estimationConnue = TAUX_VILLES[ville.nom] !== undefined;

  // Estimations pour 3 tailles typiques
  const surfaces = [50, 70, 100];
  const estimations = surfaces.map((s) => {
    const resApp = calculerTaxeFonciere({
      valeurLocative: null,
      surface: s,
      typeBien: "appartement",
      ville: ville.nom,
      tauxCustom: taux,
      neuf: false,
    });
    const resMaison = calculerTaxeFonciere({
      valeurLocative: null,
      surface: s,
      typeBien: "maison",
      ville: ville.nom,
      tauxCustom: taux,
      neuf: false,
    });
    return {
      surface: s,
      taxeApp: resApp ? Math.round(resApp.taxeAnnuelle) : 0,
      taxeMaison: resMaison ? Math.round(resMaison.taxeAnnuelle) : 0,
    };
  });

  const ref = estimations[1]; // 70m2
  const autresVilles = VILLES.filter((v) => v.slug !== ville.slug).slice(0, 12);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coute la taxe fonciere a ${ville.nom} en 2026 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${ville.nom}, le taux global de taxe fonciere (commune + intercommunalite + departement + taxes speciales) est${estimationConnue ? "" : " estime a"} ${taux}% en 2026. Pour un appartement de 70m2, cela represente environ ${fmt(ref.taxeApp)} EUR par an. Pour une maison de 70m2, environ ${fmt(ref.taxeMaison)} EUR.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment est calculee la taxe fonciere a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La taxe fonciere a ${ville.nom} est calculee a partir de la valeur locative cadastrale du bien, revalorisee chaque annee (x1.035 en 2026), puis reduite d'un abattement de 50% pour obtenir la base imposable. Le taux communal global de ${ville.nom} (${taux}%) est ensuite applique a cette base.`,
        },
      },
      {
        "@type": "Question",
        name: `Peut-on etre exonere de taxe fonciere a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, les constructions neuves beneficient d'une exoneration de 2 ans a ${ville.nom}. D'autres cas existent : personnes agees de plus de 75 ans avec revenus modestes, beneficiaires de l'ASPA/AAH, et certains logements sociaux. Il faut deposer une demande aupres du centre des impots local.`,
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
        currentPage={`Taxe fonciere a ${ville.nom}`}
        parentPage="Calcul Taxe Fonciere"
        parentHref="/calcul-taxe-fonciere"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏛
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Taxe fonciere a {ville.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calcul de la taxe fonciere a {ville.nom} ({ville.departement}) — taux global {taux}% en 2026
        {estimationConnue ? "" : " (estimation)"}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-100 mb-1">Taxe fonciere estimee a {ville.nom} (appartement 70m2)</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(ref.taxeApp)} <span className="text-2xl font-semibold">EUR/an</span>
        </p>
        <p className="text-amber-100 mt-2">
          Soit environ {fmt(Math.round(ref.taxeApp / 12))} EUR par mois
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-amber-100">Taux global</p>
            <p className="font-semibold">{taux}%</p>
          </div>
          <div>
            <p className="text-amber-100">Maison 70m2</p>
            <p className="font-semibold">{fmt(ref.taxeMaison)} EUR/an</p>
          </div>
          <div>
            <p className="text-amber-100">Departement</p>
            <p className="font-semibold">{ville.departement}</p>
          </div>
        </div>
      </div>

      {/* Tableau par surface */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Taxe fonciere a {ville.nom} — par type de bien
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Surface</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Appartement</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Maison</th>
              </tr>
            </thead>
            <tbody>
              {estimations.map((e) => (
                <tr key={e.surface} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700 font-medium">{e.surface} m2</td>
                  <td className="py-2.5 px-2 text-right font-bold text-amber-600">{fmt(e.taxeApp)} EUR/an</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmt(e.taxeMaison)} EUR/an</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <TaxeFonciere />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO localise */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          La taxe fonciere a {ville.nom} en 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom}</strong> ({ville.departement}), le taux global de taxe fonciere s&apos;eleve a
          <strong> {taux}%</strong> en 2026{estimationConnue ? "" : " (estimation basee sur la moyenne nationale en attendant la confirmation du taux local)"}.
          Ce taux regroupe les contributions de la commune, de l&apos;intercommunalite, du departement et des taxes speciales additionnelles.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour les {ville.gentile}, cela donne les estimations suivantes :
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li><strong>Appartement 50 m2</strong> : environ {fmt(estimations[0].taxeApp)} EUR/an</li>
          <li><strong>Appartement 70 m2</strong> : environ {fmt(ref.taxeApp)} EUR/an (reference)</li>
          <li><strong>Appartement 100 m2</strong> : environ {fmt(estimations[2].taxeApp)} EUR/an</li>
          <li><strong>Maison 100 m2</strong> : environ {fmt(estimations[2].taxeMaison)} EUR/an</li>
        </ul>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Comment est calculee la taxe fonciere a {ville.nom} ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le calcul repose sur la <strong>valeur locative cadastrale</strong> du bien, estimee par les services fiscaux.
          Cette valeur est :
        </p>
        <ol className="list-decimal list-inside text-slate-600 space-y-1 mb-4">
          <li>Revalorisee chaque annee par un coefficient (x1,035 en 2026)</li>
          <li>Reduite d&apos;un abattement forfaitaire de 50% → <em>base imposable</em></li>
          <li>Multipliee par le taux global de {ville.nom} ({taux}%) → <em>taxe annuelle</em></li>
        </ol>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Exonerations possibles a {ville.nom}
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Construction neuve : <strong>exoneration de 2 ans</strong> (sur demande)</li>
          <li>Personnes de plus de 75 ans avec revenus modestes</li>
          <li>Beneficiaires de l&apos;ASPA, de l&apos;AAH ou de l&apos;ASI</li>
          <li>Certains travaux d&apos;economie d&apos;energie (temporaire)</li>
        </ul>
      </section>

      {/* Autres villes */}
      {autresVilles.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Taxe fonciere dans d&apos;autres villes</h2>
          <div className="flex flex-wrap gap-2">
            {autresVilles.map((v) => (
              <a
                key={v.slug}
                href={`/calcul-taxe-fonciere/${v.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
              >
                {v.nom}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/calcul-taxe-fonciere" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
