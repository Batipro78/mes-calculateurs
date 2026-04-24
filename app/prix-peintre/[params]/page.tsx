import type { Metadata } from "next";
import EstimateurPeintre from "../EstimateurPeintre";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { PRESTATIONS_PEINTRE, REGIONS_SEO_PEINTRE, parseSlugPeintre, generateAllSlugsPeintre, calculerPrixPeintre, fmtPrix } from "../calcPeintre";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

export function generateStaticParams() {
  const prestationSlugs = generateAllSlugsPeintre().map(s => ({ params: s }));
  const villeSlugs = getVillesSlugs().map(s => ({ params: s }));
  return [...prestationSlugs, ...villeSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) {
    return {
    alternates: { canonical: `/prix-peintre/${slug}` },
      title: `Prix Peintre a ${ville.nom} (${ville.departement}) - Tarifs 2026`,
      description: `Tous les prix peintre a ${ville.nom} en 2026 : peinture mur, plafond, facade, papier peint. Tarifs ${ville.nom} avec coefficient x${ville.coefficient.toFixed(2)}.`,
      keywords: `prix peintre ${ville.nom.toLowerCase()}, tarif peintre ${ville.nom.toLowerCase()}, cout peinture ${ville.nom.toLowerCase()}, devis peintre ${ville.nom.toLowerCase()} ${ville.departement}`,
    };
  }

  const parsed = parseSlugPeintre(slug);
  if (!parsed) return {};

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixPeintre(prestation.id, quantite, region.id)!;
  const qtyLabel = `${quantite} ${prestation.uniteLabel}`;

  return {
    alternates: { canonical: `/prix-peintre/${slug}` },
    title: `Prix ${prestation.nom} ${qtyLabel} ${region.nom} - ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} (2026)`,
    description: `Cout ${prestation.nom.toLowerCase()} ${qtyLabel} en ${region.nom} : ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} TTC. Detail fournitures (${fmtPrix(r.fournituresMin)}-${fmtPrix(r.fournituresMax)}) et main d'oeuvre (${fmtPrix(r.mainOeuvreMin)}-${fmtPrix(r.mainOeuvreMax)}). Tarif peintre 2026.`,
    keywords: `prix ${prestation.nom.toLowerCase()}, cout peinture ${region.nom.toLowerCase()}, tarif peintre ${prestation.nom.toLowerCase()}, devis peinture ${quantite} ${prestation.uniteLabel}`,
  };
}

function VillePage({ ville }: { ville: Ville }) {
  return (
    <div>
      <Breadcrumb currentPage={`${ville.nom}`} parentPage="Prix Peintre" parentHref="/prix-peintre" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Peintre a {ville.nom} ({ville.departement})
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tous les tarifs peintre a {ville.nom} en 2026. Coefficient regional x{ville.coefficient.toFixed(2)}.
      </p>

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix peintre a {ville.nom} (2026)</h2>
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
              {PRESTATIONS_PEINTRE.map(p => (
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
      <EstimateurPeintre />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tarifs peintre a {ville.nom} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom}</strong> ({ville.departement}), les tarifs peintre en 2026 varient en fonction du type de prestation et de la complexite du chantier.
          Avec un coefficient regional de <strong>x{ville.coefficient.toFixed(2)}</strong>, voici les prix moyens pour les prestations les plus courantes :
        </p>
        <ul className="text-slate-600 mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li><strong>Peinture mur</strong> : {Math.round(12 * ville.coefficient)}-{Math.round(35 * ville.coefficient)} EUR/m2</li>
          <li><strong>Peinture plafond</strong> : {Math.round(18 * ville.coefficient)}-{Math.round(50 * ville.coefficient)} EUR/m2</li>
          <li><strong>Peinture facade</strong> : {Math.round(25 * ville.coefficient)}-{Math.round(70 * ville.coefficient)} EUR/m2</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Ces tarifs comprennent generalement la preparation des surfaces (lessivage, rebouchage des fissures), une sous-couche et 2 couches de finition.
          Les prix varient selon la qualite de la peinture, l&apos;etat de la surface et l&apos;accessibilite du chantier.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour obtenir le meilleur prix, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de peintres qualifies a {ville.nom}.
          N&apos;oubliez pas la <strong>TVA a 10%</strong> pour les travaux de renovation dans un logement de plus de 2 ans.
        </p>
      </section>

      {/* Autres villes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres villes de {ville.nom}</h2>
        <div className="flex flex-wrap gap-2">
          {VILLES.filter(v => v.departement === ville.departement && v.slug !== ville.slug).map(v => (
            <a
              key={v.slug}
              href={`/prix-peintre/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
            >
              {v.nom}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/prix-peintre" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) return <VillePage ville={ville} />;

  const parsed = parseSlugPeintre(slug);
  if (!parsed) notFound();

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixPeintre(prestation.id, quantite, region.id)!;
  const qtyLabel = `${quantite} ${prestation.uniteLabel}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien coute ${prestation.nom.toLowerCase()} ${qtyLabel} en ${region.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le prix pour ${prestation.nom.toLowerCase()} ${qtyLabel} en ${region.nom} est estime entre ${fmtPrix(r.totalMin)} et ${fmtPrix(r.totalMax)} TTC en 2026. Cela inclut les fournitures (${fmtPrix(r.fournituresMin)} a ${fmtPrix(r.fournituresMax)}) et la main d'oeuvre (${fmtPrix(r.mainOeuvreMin)} a ${fmtPrix(r.mainOeuvreMax)}).`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le prix au ${prestation.uniteLabel} pour ${prestation.nom.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le prix au ${prestation.uniteLabel} pour ${prestation.nom.toLowerCase()} en ${region.nom} est de ${Math.round(prestation.totalMin * region.coefficient)} a ${Math.round(prestation.totalMax * region.coefficient)} \u20ac TTC, fournitures et main d'oeuvre incluses.`,
        },
      },
    ],
  };

  const autresQuantites = prestation.quantites.filter(q => q !== quantite);
  const autresRegions = REGIONS_SEO_PEINTRE.filter(rg => rg.id !== region.id);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${prestation.nom} ${qtyLabel}`} parentPage="Prix Peintre" parentHref="/prix-peintre" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {prestation.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix {prestation.nom} {qtyLabel} — {region.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation du cout pour {prestation.nom.toLowerCase()} {qtyLabel} en {region.nom}. Tarif peintre 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg shadow-violet-200/50 mb-8">
        <p className="text-violet-200 mb-1">{prestation.nom} {qtyLabel} en {region.nom}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtPrix(r.totalMin)} — {fmtPrix(r.totalMax)}
        </p>
        <p className="text-violet-200 mt-1">TTC &middot; Coefficient regional x{region.coefficient.toFixed(2)}</p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-violet-200">Fournitures min</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMin)}</p>
          </div>
          <div>
            <p className="text-violet-200">Fournitures max</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMax)}</p>
          </div>
          <div>
            <p className="text-violet-200">Main d&apos;oeuvre min</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMin)}</p>
          </div>
          <div>
            <p className="text-violet-200">Main d&apos;oeuvre max</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMax)}</p>
          </div>
        </div>
      </div>

      {/* Prix unitaire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Prix au {prestation.uniteLabel}</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMin * region.coefficient)} &euro;</p>
            <p className="text-xs text-slate-400">minimum / {prestation.uniteLabel}</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-violet-600">{Math.round((prestation.totalMin + prestation.totalMax) / 2 * region.coefficient)} &euro;</p>
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
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix peintre en {region.nom} (2026)</h2>
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
              {PRESTATIONS_PEINTRE.map(p => (
                <tr key={p.id} className={`border-b border-slate-100 ${p.id === prestation.id ? "bg-violet-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className={p.id === prestation.id ? "font-bold text-violet-700" : "text-slate-700"}>{p.nom}</span>
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
      <EstimateurPeintre />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {prestation.nom} {qtyLabel} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{prestation.nom.toLowerCase()}</strong> sur une surface de <strong>{qtyLabel}</strong> en <strong>{region.nom}</strong>, le budget a prevoir se situe entre <strong>{fmtPrix(r.totalMin)}</strong> et <strong>{fmtPrix(r.totalMax)}</strong> TTC en 2026.
          Ce prix comprend les fournitures ({fmtPrix(r.fournituresMin)} a {fmtPrix(r.fournituresMax)}) et la main d&apos;oeuvre du peintre ({fmtPrix(r.mainOeuvreMin)} a {fmtPrix(r.mainOeuvreMax)}).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le coefficient regional de <strong>{region.nom}</strong> est de <strong>x{region.coefficient.toFixed(2)}</strong> par rapport au prix de base en province.
          Ces prix incluent generalement la preparation des surfaces (lessivage, rebouchage), une sous-couche et 2 couches de finition.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pour obtenir le meilleur tarif, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de peintres qualifies. N&apos;oubliez pas la <strong>TVA a 10%</strong> pour les travaux de renovation dans un logement de plus de 2 ans.
        </p>
      </section>

      {/* Autres quantites */}
      {autresQuantites.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Autres {prestation.unite === "unite" ? "quantites" : "surfaces"} — {prestation.nom} en {region.nom}
          </h2>
          <div className="flex flex-wrap gap-2">
            {autresQuantites.map(q => (
              <a
                key={q}
                href={`/prix-peintre/${prestation.slug}-${q}${prestation.uniteSlug}-${region.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
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
          <h2 className="text-lg font-bold text-slate-800 mb-4">Autres regions — {prestation.nom} {qtyLabel}</h2>
          <div className="flex flex-wrap gap-2">
            {autresRegions.map(rg => (
              <a
                key={rg.id}
                href={`/prix-peintre/${prestation.slug}-${quantite}${prestation.uniteSlug}-${rg.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50 transition-all"
              >
                {rg.nom}
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/prix-peintre" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
