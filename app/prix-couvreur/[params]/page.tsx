import type { Metadata } from "next";
import EstimateurCouvreur from "../EstimateurCouvreur";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { PRESTATIONS_COUVREUR, REGIONS_SEO, parseSlugCouvreur, generateAllSlugsCouvreur, calculerPrixCouvreur, fmtPrix } from "../calcCouvreur";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

export function generateStaticParams() {
  const prestationSlugs = generateAllSlugsCouvreur().map(s => ({ params: s }));
  const villeSlugs = getVillesSlugs().map(s => ({ params: s }));
  return [...prestationSlugs, ...villeSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) {
    return {
    alternates: { canonical: `/prix-couvreur/${slug}` },
      title: `Prix Couvreur a ${ville.nom} (${ville.departement}) - Tarifs 2026`,
      description: `Tous les prix couvreur a ${ville.nom} en 2026 : reparation toiture, renovation, demoussage, isolation. Tarifs ${ville.nom} avec coefficient x${ville.coefficient.toFixed(2)}.`,
      keywords: `prix couvreur ${ville.nom.toLowerCase()}, tarif couvreur ${ville.nom.toLowerCase()}, cout toiture ${ville.nom.toLowerCase()}, devis couvreur ${ville.nom.toLowerCase()} ${ville.departement}`,
    };
  }

  const parsed = parseSlugCouvreur(slug);
  if (!parsed) return {};

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixCouvreur(prestation.id, quantite, region.id)!;
  const qtyLabel = ` ${quantite} ${prestation.uniteLabel}`;

  return {
    alternates: { canonical: `/prix-couvreur/${slug}` },
    title: `Prix ${prestation.nom}${qtyLabel} ${region.nom} - ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} (2026)`,
    description: `Cout ${prestation.nom.toLowerCase()}${qtyLabel} en ${region.nom} : ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} TTC. Detail fournitures (${fmtPrix(r.fournituresMin)}-${fmtPrix(r.fournituresMax)}) et main d'oeuvre (${fmtPrix(r.mainOeuvreMin)}-${fmtPrix(r.mainOeuvreMax)}). Tarif couvreur 2026.`,
    keywords: `prix ${prestation.nom.toLowerCase()}, cout ${prestation.nom.toLowerCase()} ${region.nom.toLowerCase()}, tarif couvreur ${prestation.nom.toLowerCase()}, devis couvreur`,
  };
}

function VillePage({ ville }: { ville: Ville }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le prix couvreur a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les tarifs couvreur a ${ville.nom} (${ville.departement}) avec coefficient x${ville.coefficient.toFixed(2)} varient selon la prestation. Reparation toiture : ${Math.round(40 * ville.coefficient)}-${Math.round(120 * ville.coefficient)} EUR/m2. Renovation toiture : ${Math.round(70 * ville.coefficient)}-${Math.round(200 * ville.coefficient)} EUR/m2. Isolation combles : ${Math.round(25 * ville.coefficient)}-${Math.round(70 * ville.coefficient)} EUR/m2.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien coute une reparation toiture a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une reparation de toiture a ${ville.nom} coute environ ${Math.round(40 * ville.coefficient)}-${Math.round(120 * ville.coefficient)} EUR/m2 TTC. Le prix depend de la surface, du type de travaux et de l'etat du toit. Assurez-vous que votre artisan dispose de l'assurance decennale.`,
        },
      },
      {
        "@type": "Question",
        name: `Est-ce que l'isolation des combles beneficie d'aides a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, l'isolation des combles a ${ville.nom} (cout : ${Math.round(25 * ville.coefficient)}-${Math.round(70 * ville.coefficient)} EUR/m2) beneficie d'une TVA a 5,5% et est eligible a MaPrimeRenov'. Votre artisan doit disposer de la qualification RGE pour beneficier de ces aides.`,
        },
      },
    ],
  };

  const autresVilles = VILLES.filter(v => v.slug !== ville.slug).slice(0, 12);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`Couvreur ${ville.nom}`} parentPage="Prix Couvreur" parentHref="/prix-couvreur" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-amber-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Couvreur &mdash; {ville.nom} ({ville.departement})
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tous les tarifs couvreur a {ville.nom} en 2026. Coefficient regional x{ville.coefficient.toFixed(2)}.
      </p>

      {/* Coefficient regional */}
      <div className="bg-gradient-to-br from-red-700 to-amber-600 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-200 mb-1">Coefficient regional</p>
        <p className="text-5xl font-extrabold tracking-tight">
          x{ville.coefficient.toFixed(2)}
        </p>
        <p className="text-red-200 mt-1">{ville.nom} &middot; {ville.departement}</p>
        <div className="h-px bg-white/20 my-5" />
        <p className="text-sm">
          Ce coefficient s&apos;applique a tous les tarifs de base. Les villes en Ile-de-France, Alpes et Cote d&apos;Azur ont des coefficients plus eleves.
        </p>
      </div>

      {/* Tableau prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix couvreur a {ville.nom} (2026)</h2>
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
              {PRESTATIONS_COUVREUR.map(p => (
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
      <EstimateurCouvreur />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tarifs couvreur a {ville.nom} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom} ({ville.departement})</strong>, les tarifs couvreur varient selon la prestation. Les <strong>prestations courantes</strong> se situent a :
        </p>
        <ul className="text-slate-600 mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li><strong>Reparation toiture</strong> : ${Math.round(40 * ville.coefficient)}-${Math.round(120 * ville.coefficient)} EUR/m2 TTC</li>
          <li><strong>Renovation toiture</strong> : ${Math.round(70 * ville.coefficient)}-${Math.round(200 * ville.coefficient)} EUR/m2 TTC</li>
          <li><strong>Isolation combles</strong> : ${Math.round(25 * ville.coefficient)}-${Math.round(70 * ville.coefficient)} EUR/m2 TTC</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le coefficient regional de <strong>{ville.nom}</strong> est de <strong>x{ville.coefficient.toFixed(2)}</strong>. Pour obtenir le meilleur tarif, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de couvreurs qualifies dans votre region.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de renovation de toiture dans un logement de plus de 2 ans beneficient d&apos;une <strong>TVA a 10%</strong>. Les travaux d&apos;isolation (sarking, combles) beneficient d&apos;une <strong>TVA a 5,5%</strong> et sont eligibles a <strong>MaPrimeRenov&apos;</strong>. Verifiez la qualification RGE et l&apos;assurance decennale de votre artisan.
        </p>
      </section>

      {/* Autres villes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Prix couvreur dans d&apos;autres villes</h2>
        <div className="flex flex-wrap gap-2">
          {autresVilles.map(v => (
            <a
              key={v.slug}
              href={`/prix-couvreur/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-400 hover:text-red-700 hover:bg-red-50/50 transition-all"
            >
              {v.nom} ({v.departement})
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/prix-couvreur" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) return <VillePage ville={ville} />;

  const parsed = parseSlugCouvreur(slug);
  if (!parsed) notFound();

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixCouvreur(prestation.id, quantite, region.id)!;
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
      <Breadcrumb currentPage={`${prestation.nom}${qtyLabel}`} parentPage="Prix Couvreur" parentHref="/prix-couvreur" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-amber-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {prestation.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix {prestation.nom}{qtyLabel} &mdash; {region.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation du cout pour {prestation.nom.toLowerCase()}{qtyLabel} en {region.nom}. Tarif couvreur 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-red-700 to-amber-600 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-200 mb-1">{prestation.nom}{qtyLabel} en {region.nom}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtPrix(r.totalMin)} &mdash; {fmtPrix(r.totalMax)}
        </p>
        <p className="text-red-200 mt-1">TTC &middot; Coefficient regional x{region.coefficient.toFixed(2)}</p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-red-200">Fournitures min</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMin)}</p>
          </div>
          <div>
            <p className="text-red-200">Fournitures max</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMax)}</p>
          </div>
          <div>
            <p className="text-red-200">Main d&apos;oeuvre min</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMin)}</p>
          </div>
          <div>
            <p className="text-red-200">Main d&apos;oeuvre max</p>
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
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-red-700">{Math.round((prestation.totalMin + prestation.totalMax) / 2 * region.coefficient)} &euro;</p>
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
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix couvreur en {region.nom} (2026)</h2>
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
              {PRESTATIONS_COUVREUR.map(p => (
                <tr key={p.id} className={`border-b border-slate-100 ${p.id === prestation.id ? "bg-red-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className={p.id === prestation.id ? "font-bold text-red-700" : "text-slate-700"}>{p.nom}</span>
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
      <EstimateurCouvreur />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {prestation.nom}{qtyLabel} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{prestation.nom.toLowerCase()}</strong>{qtyLabel} en <strong>{region.nom}</strong>, le budget a prevoir se situe entre <strong>{fmtPrix(r.totalMin)}</strong> et <strong>{fmtPrix(r.totalMax)}</strong> TTC en 2026.
          Ce prix comprend les fournitures ({fmtPrix(r.fournituresMin)} a {fmtPrix(r.fournituresMax)}) et la main d&apos;oeuvre du couvreur ({fmtPrix(r.mainOeuvreMin)} a {fmtPrix(r.mainOeuvreMax)}).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le coefficient regional de <strong>{region.nom}</strong> est de <strong>x{region.coefficient.toFixed(2)}</strong> par rapport au prix de base en province.
          Pour obtenir le meilleur tarif, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de couvreurs qualifies dans votre region.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de renovation de toiture dans un logement de plus de 2 ans beneficient d&apos;une <strong>TVA a 10%</strong>. Les travaux d&apos;isolation (sarking, combles) beneficient d&apos;une <strong>TVA a 5,5%</strong> et sont eligibles a <strong>MaPrimeRenov&apos;</strong>. Verifiez la qualification RGE et l&apos;assurance decennale de votre artisan.
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
                href={`/prix-couvreur/${prestation.slug}-${q}${prestation.uniteSlug}-${region.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-400 hover:text-red-700 hover:bg-red-50/50 transition-all"
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
                href={`/prix-couvreur/${prestation.slug}-${quantite}${prestation.uniteSlug}-${rg.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-400 hover:text-red-700 hover:bg-red-50/50 transition-all"
              >
                {rg.nom}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/prix-couvreur" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
