import type { Metadata } from "next";
import EstimateurChauffagiste from "../EstimateurChauffagiste";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { PRESTATIONS_CHAUFFAGISTE, REGIONS_SEO, parseSlugChauffagiste, generateAllSlugsChauffagiste, calculerPrixChauffagiste, calculerPrixChauffagisteCoef, fmtPrix } from "../calcChauffagiste";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

export function generateStaticParams() {
  const prestationSlugs = generateAllSlugsChauffagiste().map(s => ({ params: s }));
  const villeSlugs = getVillesSlugs().map(s => ({ params: s }));
  return [...prestationSlugs, ...villeSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) {
    return {
    alternates: { canonical: `/prix-chauffagiste/${slug}` },
      title: `Prix Chauffagiste a ${ville.nom} (${ville.departement}) - Tarifs 2026`,
      description: `Tous les prix chauffagiste a ${ville.nom} en 2026 : chaudiere gaz (${Math.round(3500 * ville.coefficient)}-${Math.round(7500 * ville.coefficient)} EUR), pompe a chaleur, chauffe-eau, entretien. Tarifs ${ville.nom} avec coefficient x${ville.coefficient.toFixed(2)}.`,
      keywords: `prix chauffagiste ${ville.nom.toLowerCase()}, tarif chauffagiste ${ville.nom.toLowerCase()}, cout chauffagiste ${ville.nom.toLowerCase()}, devis chauffagiste ${ville.nom.toLowerCase()} ${ville.departement}`,
    };
  }

  const parsed = parseSlugChauffagiste(slug);
  if (!parsed) return {};

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixChauffagiste(prestation.id, quantite, region.id)!;
  const qtyLabel = ` ${quantite} ${prestation.uniteLabel}`;

  return {
    alternates: { canonical: `/prix-chauffagiste/${slug}` },
    title: `Prix ${prestation.nom}${qtyLabel} ${region.nom} - ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} (2026)`,
    description: `Cout ${prestation.nom.toLowerCase()}${qtyLabel} en ${region.nom} : ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} TTC. Detail fournitures (${fmtPrix(r.fournituresMin)}-${fmtPrix(r.fournituresMax)}) et main d'oeuvre (${fmtPrix(r.mainOeuvreMin)}-${fmtPrix(r.mainOeuvreMax)}). Tarif chauffagiste 2026.`,
    keywords: `prix ${prestation.nom.toLowerCase()}, cout ${prestation.nom.toLowerCase()} ${region.nom.toLowerCase()}, tarif chauffagiste ${prestation.nom.toLowerCase()}, devis chauffagiste`,
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
        name: `Combien coute un chauffagiste a ${ville.nom} en 2026 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les tarifs chauffagiste a ${ville.nom} (${ville.departement}) varient selon la prestation : entretien chaudiere ${Math.round(100 * ville.coefficient)}-${Math.round(180 * ville.coefficient)} \u20ac, installation PAC air-eau ${Math.round(10000 * ville.coefficient).toLocaleString("fr-FR")}-${Math.round(18000 * ville.coefficient).toLocaleString("fr-FR")} \u20ac, depannage ${Math.round(110 * ville.coefficient)}-${Math.round(300 * ville.coefficient)} \u20ac. Coefficient de prix a ${ville.nom} : x${ville.coefficient.toFixed(2)}.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment trouver un bon chauffagiste a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour trouver un chauffagiste fiable a ${ville.nom}, demandez au moins 3 devis, verifiez la certification RGE (obligatoire pour les aides), l'assurance decennale et les avis clients. ${ville.nom} compte environ ${ville.population} habitants et une forte demande en chauffagistes qualifies.`,
        },
      },
      {
        "@type": "Question",
        name: `Les prix chauffagiste a ${ville.nom} sont-ils plus chers qu'ailleurs ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: ville.coefficient > 1.0
            ? `Oui, les prix a ${ville.nom} sont environ ${Math.round((ville.coefficient - 1) * 100)}% plus eleves que la moyenne nationale en raison du cout de la vie et de la forte demande. Le coefficient de prix pour ${ville.nom} est de x${ville.coefficient.toFixed(2)}.`
            : `Les prix a ${ville.nom} sont dans la moyenne nationale. Le coefficient de prix pour ${ville.nom} est de x${ville.coefficient.toFixed(2)}, ce qui correspond aux tarifs standards en province.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`Chauffagiste ${ville.nom}`} parentPage="Prix Chauffagiste" parentHref="/prix-chauffagiste" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"\ud83d\udd25"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Chauffagiste a {ville.nom} ({ville.departement}) &mdash; Tarifs 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tous les tarifs chauffagiste a {ville.nom} : installation, entretien, depannage. Coefficient de prix x{ville.coefficient.toFixed(2)}.
      </p>

      {/* Resume ville */}
      <div className="bg-gradient-to-br from-orange-600 to-red-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-200 mb-1">Tarifs chauffagiste a {ville.nom} ({ville.codePostal})</p>
        <p className="text-3xl font-extrabold tracking-tight mb-1">
          Coefficient de prix : x{ville.coefficient.toFixed(2)}
        </p>
        <p className="text-orange-200">
          {ville.coefficient > 1.0 ? `+${Math.round((ville.coefficient - 1) * 100)}% par rapport a la moyenne nationale` : "Prix dans la moyenne nationale"}
        </p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-orange-200">Ville</p>
            <p className="font-bold text-lg">{ville.nom}</p>
          </div>
          <div>
            <p className="text-orange-200">Departement</p>
            <p className="font-bold text-lg">{ville.departement}</p>
          </div>
          <div>
            <p className="text-orange-200">Population</p>
            <p className="font-bold text-lg">{ville.population} hab.</p>
          </div>
        </div>
      </div>

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix chauffagiste a {ville.nom} (2026)</h2>
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
              {PRESTATIONS_CHAUFFAGISTE.map(p => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className="text-slate-700">{p.nom}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.totalMin * ville.coefficient)} &euro;</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMax * ville.coefficient)} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outil interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Estimateur interactif</h2>
      <EstimateurChauffagiste />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Prix chauffagiste a {ville.nom} : ce qu&apos;il faut savoir
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom}</strong> ({ville.departement}), les tarifs des chauffagistes suivent un coefficient de <strong>x{ville.coefficient.toFixed(2)}</strong> par rapport aux prix de reference en province.
          {ville.coefficient > 1.0
            ? ` Cela represente une majoration de ${Math.round((ville.coefficient - 1) * 100)}%, liee a la forte demande et au cout de la vie dans l'agglomeration de ${ville.nom} (${ville.population} habitants).`
            : ` Les prix a ${ville.nom} sont dans la moyenne nationale, ce qui est avantageux pour les ${ville.gentile}.`
          }
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les prestations les plus demandees a <strong>{ville.nom}</strong> sont l&apos;<strong>entretien annuel de chaudiere</strong> ({Math.round(100 * ville.coefficient)}-{Math.round(180 * ville.coefficient)} &euro;), l&apos;<strong>installation de pompe a chaleur</strong> ({Math.round(2000 * ville.coefficient).toLocaleString("fr-FR")}-{Math.round(18000 * ville.coefficient).toLocaleString("fr-FR")} &euro;) et le <strong>depannage chauffage</strong> ({Math.round(110 * ville.coefficient)}-{Math.round(300 * ville.coefficient)} &euro;).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour obtenir le meilleur tarif a {ville.nom}, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de chauffagistes certifies <strong>RGE</strong> dans le {ville.departement}. La certification RGE est obligatoire pour beneficier des aides financieres (MaPrimeRenov&apos;, CEE, eco-PTZ).
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de <strong>renovation energetique</strong> a {ville.nom} (pompe a chaleur, chauffe-eau thermodynamique, plancher chauffant) beneficient d&apos;une <strong>TVA a 5,5%</strong> et sont eligibles a <strong>MaPrimeRenov&apos;</strong> (jusqu&apos;a 5 000 &euro;), aux <strong>CEE</strong> et a l&apos;eco-pret a taux zero (jusqu&apos;a 50 000 &euro;).
        </p>
      </section>

      {/* Autres villes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Prix chauffagiste dans d&apos;autres villes</h2>
        <div className="flex flex-wrap gap-2">
          {autresVilles.map(v => (
            <a
              key={v.slug}
              href={`/prix-chauffagiste/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50/50 transition-all"
            >
              {v.nom} ({v.departement})
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/prix-chauffagiste" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  // Check if it's a city page
  const ville = findVille(slug);
  if (ville) return <VillePage ville={ville} />;

  // Otherwise, parse as prestation page
  const parsed = parseSlugChauffagiste(slug);
  if (!parsed) notFound();

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixChauffagiste(prestation.id, quantite, region.id)!;
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
          text: `Le prix ${prestation.unite === "unite" ? "a l'" : "au "}${prestation.uniteLabel} pour ${prestation.nom.toLowerCase()} en ${region.nom} est de ${Math.round(prestation.totalMin * region.coefficient)} a ${Math.round(prestation.totalMax * region.coefficient)} \u20ac TTC, fournitures et main d'oeuvre incluses.`,
        },
      },
    ],
  };

  const autresQuantites = prestation.quantites.filter(q => q !== quantite);
  const autresRegions = REGIONS_SEO.filter(rg => rg.id !== region.id);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${prestation.nom}${qtyLabel}`} parentPage="Prix Chauffagiste" parentHref="/prix-chauffagiste" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {prestation.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix {prestation.nom}{qtyLabel} &mdash; {region.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation du cout pour {prestation.nom.toLowerCase()}{qtyLabel} en {region.nom}. Tarif chauffagiste 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-orange-600 to-red-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200/50 mb-8">
        <p className="text-orange-200 mb-1">{prestation.nom}{qtyLabel} en {region.nom}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtPrix(r.totalMin)} &mdash; {fmtPrix(r.totalMax)}
        </p>
        <p className="text-orange-200 mt-1">TTC &middot; Coefficient regional x{region.coefficient.toFixed(2)}</p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-orange-200">Fournitures min</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMin)}</p>
          </div>
          <div>
            <p className="text-orange-200">Fournitures max</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMax)}</p>
          </div>
          <div>
            <p className="text-orange-200">Main d&apos;oeuvre min</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMin)}</p>
          </div>
          <div>
            <p className="text-orange-200">Main d&apos;oeuvre max</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMax)}</p>
          </div>
        </div>
      </div>

      {/* Prix unitaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Prix {prestation.unite === "unite" ? "a l'" : "au "}{prestation.uniteLabel}</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMin * region.coefficient)} &euro;</p>
            <p className="text-xs text-slate-400">minimum / {prestation.uniteLabel}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-orange-700">{Math.round((prestation.totalMin + prestation.totalMax) / 2 * region.coefficient)} &euro;</p>
            <p className="text-xs text-slate-400">moyen / {prestation.uniteLabel}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMax * region.coefficient)} &euro;</p>
            <p className="text-xs text-slate-400">maximum / {prestation.uniteLabel}</p>
          </div>
        </div>
      </div>

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix chauffagiste en {region.nom} (2026)</h2>
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
              {PRESTATIONS_CHAUFFAGISTE.map(p => (
                <tr key={p.id} className={`border-b border-slate-100 ${p.id === prestation.id ? "bg-orange-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className={p.id === prestation.id ? "font-bold text-orange-700" : "text-slate-700"}>{p.nom}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.totalMin * region.coefficient)} &euro;</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMax * region.coefficient)} &euro;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outil interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Estimateur interactif</h2>
      <EstimateurChauffagiste />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {prestation.nom}{qtyLabel} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{prestation.nom.toLowerCase()}</strong>{qtyLabel} en <strong>{region.nom}</strong>, le budget a prevoir se situe entre <strong>{fmtPrix(r.totalMin)}</strong> et <strong>{fmtPrix(r.totalMax)}</strong> TTC en 2026.
          Ce prix comprend les fournitures ({fmtPrix(r.fournituresMin)} a {fmtPrix(r.fournituresMax)}) et la main d&apos;oeuvre du chauffagiste ({fmtPrix(r.mainOeuvreMin)} a {fmtPrix(r.mainOeuvreMax)}).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le coefficient regional de <strong>{region.nom}</strong> est de <strong>x{region.coefficient.toFixed(2)}</strong> par rapport au prix de base en province.
          Pour obtenir le meilleur tarif, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de chauffagistes certifies RGE dans votre region.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de <strong>renovation energetique</strong> (pompe a chaleur, chauffe-eau thermodynamique) beneficient d&apos;une <strong>TVA a 5,5%</strong> et sont eligibles a <strong>MaPrimeRenov&apos;</strong>, aux <strong>CEE</strong> et a l&apos;eco-pret a taux zero. Verifiez la certification RGE et l&apos;assurance decennale de votre artisan.
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
                href={`/prix-chauffagiste/${prestation.slug}-${q}${prestation.uniteSlug}-${region.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50/50 transition-all"
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
                href={`/prix-chauffagiste/${prestation.slug}-${quantite}${prestation.uniteSlug}-${rg.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50/50 transition-all"
              >
                {rg.nom}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/prix-chauffagiste" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
