import type { Metadata } from "next";
import EstimateurSolaire from "../EstimateurSolaire";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import LeadCaptureForm from "../../components/LeadCaptureForm";
import { notFound } from "next/navigation";
import { PRESTATIONS_SOLAIRE, REGIONS_SEO, parseSlugSolaire, generateAllSlugsSolaire, calculerPrixSolaire, fmtPrix } from "../solaireCalc";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

export function generateStaticParams() {
  const prestationSlugs = generateAllSlugsSolaire().map(s => ({ params: s }));
  const villeSlugs = getVillesSlugs().map(s => ({ params: s }));
  return [...prestationSlugs, ...villeSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) {
    return {
      alternates: { canonical: `/prix-panneaux-solaires/${slug}` },
      title: `Prix Panneaux Solaires a ${ville.nom} (${ville.departement}) - Tarifs 2026`,
      description: `Tous les prix panneaux solaires a ${ville.nom} en 2026 : installation 3 kWc (${Math.round(8000 * ville.coefficient).toLocaleString("fr-FR")}-${Math.round(12000 * ville.coefficient).toLocaleString("fr-FR")} EUR), 6 kWc, 9 kWc, batterie, solaire thermique. Tarifs ${ville.nom} avec coefficient x${ville.coefficient.toFixed(2)}.`,
      keywords: `prix panneaux solaires ${ville.nom.toLowerCase()}, tarif photovoltaique ${ville.nom.toLowerCase()}, cout installation solaire ${ville.nom.toLowerCase()}, devis panneaux solaires ${ville.nom.toLowerCase()} ${ville.departement}`,
    };
  }

  const parsed = parseSlugSolaire(slug);
  if (!parsed) return {};

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixSolaire(prestation.id, quantite, region.id)!;
  const qtyLabel = ` ${quantite} ${prestation.uniteLabel}`;

  return {
    alternates: { canonical: `/prix-panneaux-solaires/${slug}` },
    title: `Prix ${prestation.nom}${qtyLabel} ${region.nom} - ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} (2026)`,
    description: `Cout ${prestation.nom.toLowerCase()}${qtyLabel} en ${region.nom} : ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} TTC. Detail fournitures (${fmtPrix(r.fournituresMin)}-${fmtPrix(r.fournituresMax)}) et main d'oeuvre (${fmtPrix(r.mainOeuvreMin)}-${fmtPrix(r.mainOeuvreMax)}). Tarif photovoltaique 2026.`,
    keywords: `prix ${prestation.nom.toLowerCase()}, cout ${prestation.nom.toLowerCase()} ${region.nom.toLowerCase()}, tarif photovoltaique ${prestation.nom.toLowerCase()}, devis panneaux solaires`,
  };
}

function VillePage({ ville }: { ville: Ville }) {
  const autresVilles = VILLES.filter(v => v.slug !== ville.slug).slice(0, 12);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coute une installation photovoltaique a ${ville.nom} en 2026 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les tarifs panneaux solaires a ${ville.nom} (${ville.departement}) varient selon la puissance : installation 3 kWc ${Math.round(8000 * ville.coefficient).toLocaleString("fr-FR")}-${Math.round(12000 * ville.coefficient).toLocaleString("fr-FR")} €, installation 6 kWc ${Math.round(14000 * ville.coefficient).toLocaleString("fr-FR")}-${Math.round(20000 * ville.coefficient).toLocaleString("fr-FR")} €, batterie 5 kWh ${Math.round(5000 * ville.coefficient).toLocaleString("fr-FR")}-${Math.round(8000 * ville.coefficient).toLocaleString("fr-FR")} €. Coefficient de prix a ${ville.nom} : x${ville.coefficient.toFixed(2)}.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment trouver un bon installateur photovoltaique a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour trouver un installateur solaire fiable a ${ville.nom}, demandez au moins 3 devis, verifiez la certification RGE QualiPV (obligatoire pour la prime a l'autoconsommation et la TVA reduite), l'assurance decennale et les avis clients. ${ville.nom} compte environ ${ville.population} habitants et une demande croissante en installations photovoltaiques.`,
        },
      },
      {
        "@type": "Question",
        name: `Les prix panneaux solaires a ${ville.nom} sont-ils plus chers qu'ailleurs ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: ville.coefficient > 1.0
            ? `Oui, les prix a ${ville.nom} sont environ ${Math.round((ville.coefficient - 1) * 100)}% plus eleves que la moyenne nationale en raison du cout de la vie, de la logistique et de la forte demande. Le coefficient de prix pour ${ville.nom} est de x${ville.coefficient.toFixed(2)}.`
            : `Les prix a ${ville.nom} sont dans la moyenne nationale. Le coefficient de prix pour ${ville.nom} est de x${ville.coefficient.toFixed(2)}, ce qui correspond aux tarifs standards en province.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`Panneaux solaires ${ville.nom}`} parentPage="Prix Panneaux Solaires" parentHref="/prix-panneaux-solaires" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"☀️"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Panneaux Solaires a {ville.nom} ({ville.departement}) &mdash; Tarifs 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tous les tarifs panneaux solaires a {ville.nom} : installation, batterie, solaire thermique, audit. Coefficient de prix x{ville.coefficient.toFixed(2)}.
      </p>

      {/* Resume ville */}
      <div className="bg-gradient-to-br from-amber-400 to-yellow-500 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-50 mb-1">Tarifs panneaux solaires a {ville.nom} ({ville.codePostal})</p>
        <p className="text-3xl font-extrabold tracking-tight mb-1">
          Coefficient de prix : x{ville.coefficient.toFixed(2)}
        </p>
        <p className="text-amber-50">
          {ville.coefficient > 1.0 ? `+${Math.round((ville.coefficient - 1) * 100)}% par rapport a la moyenne nationale` : "Prix dans la moyenne nationale"}
        </p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-amber-50">Ville</p>
            <p className="font-bold text-lg">{ville.nom}</p>
          </div>
          <div>
            <p className="text-amber-50">Departement</p>
            <p className="font-bold text-lg">{ville.departement}</p>
          </div>
          <div>
            <p className="text-amber-50">Population</p>
            <p className="font-bold text-lg">{ville.population} hab.</p>
          </div>
        </div>
      </div>

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix panneaux solaires a {ville.nom} (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prestation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Unite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Prix min</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Prix max</th>
              </tr>
            </thead>
            <tbody>
              {PRESTATIONS_SOLAIRE.map(p => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className="text-slate-700">{p.nom}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.totalMin * ville.coefficient).toLocaleString("fr-FR")} &euro;</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMax * ville.coefficient).toLocaleString("fr-FR")} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outil interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Estimateur interactif</h2>
      <EstimateurSolaire />

      {/* Formulaire de capture lead */}
      <LeadCaptureForm
        nicheId="panneaux-solaires"
        ville={ville.nom}
        departement={ville.departement}
      />


      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Prix panneaux solaires a {ville.nom} : ce qu&apos;il faut savoir
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom}</strong> ({ville.departement}), les tarifs des installateurs photovoltaiques suivent un coefficient de <strong>x{ville.coefficient.toFixed(2)}</strong> par rapport aux prix de reference en province.
          {ville.coefficient > 1.0
            ? ` Cela represente une majoration de ${Math.round((ville.coefficient - 1) * 100)}%, liee a la forte demande et au cout de la vie dans l'agglomeration de ${ville.nom} (${ville.population} habitants).`
            : ` Les prix a ${ville.nom} sont dans la moyenne nationale, ce qui est avantageux pour les ${ville.gentile}.`
          }
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les prestations les plus demandees a <strong>{ville.nom}</strong> sont l&apos;<strong>installation photovoltaique 3 kWc</strong> ({Math.round(8000 * ville.coefficient).toLocaleString("fr-FR")}-{Math.round(12000 * ville.coefficient).toLocaleString("fr-FR")} &euro;), l&apos;<strong>installation 6 kWc</strong> ({Math.round(14000 * ville.coefficient).toLocaleString("fr-FR")}-{Math.round(20000 * ville.coefficient).toLocaleString("fr-FR")} &euro;) et la <strong>pose de batterie domestique</strong> ({Math.round(5000 * ville.coefficient).toLocaleString("fr-FR")}-{Math.round(13000 * ville.coefficient).toLocaleString("fr-FR")} &euro;).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour obtenir le meilleur tarif a {ville.nom}, nous vous recommandons de <strong>comparer au moins 3 devis</strong> d&apos;installateurs certifies <strong>RGE QualiPV</strong> dans le {ville.departement}. La certification RGE QualiPV est obligatoire pour beneficier des aides (prime a l&apos;autoconsommation, TVA reduite, eco-PTZ).
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les installations <strong>photovoltaiques en autoconsommation</strong> a {ville.nom} beneficient d&apos;une <strong>TVA reduite a 10%</strong> (≤ 3 kWc), de la <strong>prime a l&apos;autoconsommation</strong> (~80 &euro;/kWc pour 3 kWc), du <strong>tarif d&apos;achat du surplus</strong> garanti 20 ans par EDF OA et de l&apos;eco-pret a taux zero (jusqu&apos;a 50 000 &euro;).
        </p>
      </section>

      {/* Autres villes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Prix panneaux solaires dans d&apos;autres villes</h2>
        <div className="flex flex-wrap gap-2">
          {autresVilles.map(v => (
            <a
              key={v.slug}
              href={`/prix-panneaux-solaires/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 transition-all"
            >
              {v.nom} ({v.departement})
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/prix-panneaux-solaires" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  // Check if it's a city page
  const ville = findVille(slug);
  if (ville) return <VillePage ville={ville} />;

  // Otherwise, parse as prestation page
  const parsed = parseSlugSolaire(slug);
  if (!parsed) notFound();

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixSolaire(prestation.id, quantite, region.id)!;
  const qtyLabel = ` ${quantite} ${prestation.uniteLabel}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coute ${prestation.nom.toLowerCase()}${qtyLabel} en ${region.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le prix pour ${prestation.nom.toLowerCase()}${qtyLabel} en ${region.nom} est estime entre ${fmtPrix(r.totalMin)} et ${fmtPrix(r.totalMax)} TTC en 2026. Cela inclut les fournitures (${fmtPrix(r.fournituresMin)} a ${fmtPrix(r.fournituresMax)}) et la main d'oeuvre (${fmtPrix(r.mainOeuvreMin)} a ${fmtPrix(r.mainOeuvreMax)}).`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le prix ${prestation.unite === "unite" ? "a l'" : "au "}${prestation.uniteLabel} pour ${prestation.nom.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le prix ${prestation.unite === "unite" ? "a l'" : "au "}${prestation.uniteLabel} pour ${prestation.nom.toLowerCase()} en ${region.nom} est de ${Math.round(prestation.totalMin * region.coefficient).toLocaleString("fr-FR")} a ${Math.round(prestation.totalMax * region.coefficient).toLocaleString("fr-FR")} € TTC, fournitures et main d'oeuvre incluses.`,
        },
      },
    ],
  };

  const autresQuantites = prestation.quantites.filter(q => q !== quantite);
  const autresRegions = REGIONS_SEO.filter(rg => rg.id !== region.id);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${prestation.nom}${qtyLabel}`} parentPage="Prix Panneaux Solaires" parentHref="/prix-panneaux-solaires" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {prestation.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix {prestation.nom}{qtyLabel} &mdash; {region.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation du cout pour {prestation.nom.toLowerCase()}{qtyLabel} en {region.nom}. Tarif photovoltaique 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-amber-400 to-yellow-500 text-white rounded-2xl p-8 shadow-lg shadow-amber-200/50 mb-8">
        <p className="text-amber-50 mb-1">{prestation.nom}{qtyLabel} en {region.nom}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtPrix(r.totalMin)} &mdash; {fmtPrix(r.totalMax)}
        </p>
        <p className="text-amber-50 mt-1">TTC &middot; Coefficient regional x{region.coefficient.toFixed(2)}</p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-amber-50">Fournitures min</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMin)}</p>
          </div>
          <div>
            <p className="text-amber-50">Fournitures max</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMax)}</p>
          </div>
          <div>
            <p className="text-amber-50">Main d&apos;oeuvre min</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMin)}</p>
          </div>
          <div>
            <p className="text-amber-50">Main d&apos;oeuvre max</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMax)}</p>
          </div>
        </div>
      </div>

      {/* Prix unitaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Prix {prestation.unite === "unite" ? "a l'" : "au "}{prestation.uniteLabel}</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMin * region.coefficient).toLocaleString("fr-FR")} &euro;</p>
            <p className="text-xs text-slate-400">minimum / {prestation.uniteLabel}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-amber-700">{Math.round((prestation.totalMin + prestation.totalMax) / 2 * region.coefficient).toLocaleString("fr-FR")} &euro;</p>
            <p className="text-xs text-slate-400">moyen / {prestation.uniteLabel}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMax * region.coefficient).toLocaleString("fr-FR")} &euro;</p>
            <p className="text-xs text-slate-400">maximum / {prestation.uniteLabel}</p>
          </div>
        </div>
      </div>

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix panneaux solaires en {region.nom} (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prestation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Unite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Prix min</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Prix max</th>
              </tr>
            </thead>
            <tbody>
              {PRESTATIONS_SOLAIRE.map(p => (
                <tr key={p.id} className={`border-b border-slate-100 ${p.id === prestation.id ? "bg-amber-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className={p.id === prestation.id ? "font-bold text-amber-700" : "text-slate-700"}>{p.nom}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.totalMin * region.coefficient).toLocaleString("fr-FR")} &euro;</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMax * region.coefficient).toLocaleString("fr-FR")} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outil interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Estimateur interactif</h2>
      <EstimateurSolaire />


      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {prestation.nom}{qtyLabel} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{prestation.nom.toLowerCase()}</strong>{qtyLabel} en <strong>{region.nom}</strong>, le budget a prevoir se situe entre <strong>{fmtPrix(r.totalMin)}</strong> et <strong>{fmtPrix(r.totalMax)}</strong> TTC en 2026.
          Ce prix comprend les fournitures ({fmtPrix(r.fournituresMin)} a {fmtPrix(r.fournituresMax)}) et la main d&apos;oeuvre de l&apos;installateur ({fmtPrix(r.mainOeuvreMin)} a {fmtPrix(r.mainOeuvreMax)}).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le coefficient regional de <strong>{region.nom}</strong> est de <strong>x{region.coefficient.toFixed(2)}</strong> par rapport au prix de base en province.
          Pour obtenir le meilleur tarif, nous vous recommandons de <strong>comparer au moins 3 devis</strong> d&apos;installateurs photovoltaiques certifies RGE QualiPV dans votre region.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les <strong>installations photovoltaiques en autoconsommation</strong> beneficient d&apos;une <strong>TVA reduite a 10%</strong> (≤ 3 kWc), de la <strong>prime a l&apos;autoconsommation</strong> (~80 &euro;/kWc pour 3 kWc) et du tarif d&apos;achat du surplus par EDF OA garanti 20 ans. Verifiez la certification RGE QualiPV et l&apos;assurance decennale de votre installateur.
        </p>
      </section>

      {/* Autres quantites */}
      {autresQuantites.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Autres quantites &mdash; {prestation.nom} en {region.nom}</h2>
          <div className="flex flex-wrap gap-2">
            {autresQuantites.map(q => (
              <a
                key={q}
                href={`/prix-panneaux-solaires/${prestation.slug}-${q}${prestation.uniteSlug}-${region.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 transition-all"
              >
                {q} {prestation.uniteLabel}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Autres regions */}
      {autresRegions.length > 0 && (
        <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Autres regions &mdash; {prestation.nom}{qtyLabel}</h2>
          <div className="flex flex-wrap gap-2">
            {autresRegions.map(rg => (
              <a
                key={rg.id}
                href={`/prix-panneaux-solaires/${prestation.slug}-${quantite}${prestation.uniteSlug}-${rg.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 transition-all"
              >
                {rg.nom}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/prix-panneaux-solaires" />
    </div>
  );
}
