import type { Metadata } from "next";
import EstimateurElectricien from "../EstimateurElectricien";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { PRESTATIONS_ELECTRICIEN, REGIONS_SEO, parseSlugElectricien, generateAllSlugsElectricien, calculerPrixElectricien, fmtPrix } from "../calcElectricien";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

export function generateStaticParams() {
  const prestationSlugs = generateAllSlugsElectricien().map(s => ({ params: s }));
  const villeSlugs = getVillesSlugs().map(s => ({ params: s }));
  return [...prestationSlugs, ...villeSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) {
    return {
      title: `Prix Electricien a ${ville.nom} (${ville.departement}) - Tarifs 2026`,
      description: `Tous les prix electricien a ${ville.nom} en 2026 : installation prise, tableau electrique, renovation. Tarifs ${ville.nom} avec coefficient x${ville.coefficient.toFixed(2)}.`,
      keywords: `prix electricien ${ville.nom.toLowerCase()}, tarif electricien ${ville.nom.toLowerCase()}, cout electricien ${ville.nom.toLowerCase()}, devis electricien ${ville.nom.toLowerCase()} ${ville.departement}`,
    };
  }

  const parsed = parseSlugElectricien(slug);
  if (!parsed) return {};

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixElectricien(prestation.id, quantite, region.id)!;
  const qtyLabel = prestation.unite === "forfait" ? "" : ` ${quantite} ${prestation.uniteLabel}`;

  return {
    title: `Prix ${prestation.nom}${qtyLabel} ${region.nom} - ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} (2026)`,
    description: `Cout ${prestation.nom.toLowerCase()}${qtyLabel} en ${region.nom} : ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} TTC. Detail fournitures (${fmtPrix(r.fournituresMin)}-${fmtPrix(r.fournituresMax)}) et main d'oeuvre (${fmtPrix(r.mainOeuvreMin)}-${fmtPrix(r.mainOeuvreMax)}). Tarif electricien 2026.`,
    keywords: `prix ${prestation.nom.toLowerCase()}, cout ${prestation.nom.toLowerCase()} ${region.nom.toLowerCase()}, tarif electricien ${prestation.nom.toLowerCase()}, devis electricien`,
  };
}

interface VillePageProps {
  ville: Ville;
}

function VillePage({ ville }: VillePageProps) {
  const prestationSamples = [
    {
      name: "Installation prise",
      minEUR: Math.round(60 * ville.coefficient),
      maxEUR: Math.round(265 * ville.coefficient),
    },
    {
      name: "Tableau électrique",
      minEUR: Math.round(650 * ville.coefficient),
      maxEUR: Math.round(2600 * ville.coefficient),
    },
    {
      name: "Rénovation électrique (par m²)",
      minEUR: Math.round(35 * ville.coefficient),
      maxEUR: Math.round(100 * ville.coefficient),
    },
  ];

  const otherVilles = VILLES.filter(v => v.departement === ville.departement && v.slug !== ville.slug).slice(0, 5);

  return (
    <div>
      <Breadcrumb currentPage={`Prix Electricien à ${ville.nom}`} parentPage="Prix Electricien" parentHref="/prix-electricien" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚡
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Electricien à {ville.nom} ({ville.departement})
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tarifs électricien 2026 à {ville.nom}. Coefficient régional x{ville.coefficient.toFixed(2)}.
      </p>

      {/* Tarifs principaux */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-200 mb-4">Tarifs électricien à {ville.nom} en 2026</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {prestationSamples.map((prestation, idx) => (
            <div key={idx}>
              <p className="text-blue-200 text-sm font-medium mb-2">{prestation.name}</p>
              <p className="text-2xl font-extrabold">{prestation.minEUR} - {prestation.maxEUR} €</p>
            </div>
          ))}
        </div>
        <p className="text-blue-200 mt-6 text-sm">Coefficient régional : x{ville.coefficient.toFixed(2)} | Incluant TVA et main d'œuvre</p>
      </div>

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix électricien à {ville.nom} (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prestation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Unité</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Prix min</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Prix max</th>
              </tr>
            </thead>
            <tbody>
              {PRESTATIONS_ELECTRICIEN.map(p => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className="text-slate-700">{p.nom}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.totalMin * ville.coefficient)} €</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMax * ville.coefficient)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outil interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Estimateur interactif</h2>
      <EstimateurElectricien />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Electricien à {ville.nom} : tarifs et prestations 2026
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Vous cherchez à connaître les tarifs pour un <strong>électricien à {ville.nom}</strong> ?
          Le coût des travaux électriques varie selon la région. Pour <strong>{ville.nom}</strong>,
          le coefficient régional est de <strong>x{ville.coefficient.toFixed(2)}</strong>, ce qui signifie
          que les prix sont environ <strong>{Math.round((ville.coefficient - 1) * 100)}% {ville.coefficient > 1 ? "plus" : "moins"} chers qu'en province</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>prestations courantes</strong> à {ville.nom} incluent :
        </p>
        <ul className="text-slate-600 mb-4 leading-relaxed list-disc list-inside">
          <li><strong>Installation de prises</strong> : {Math.round(60 * ville.coefficient)} - {Math.round(265 * ville.coefficient)} € (main d'œuvre + fournitures)</li>
          <li><strong>Tableau électrique</strong> : {Math.round(650 * ville.coefficient)} - {Math.round(2600 * ville.coefficient)} € selon la complexité</li>
          <li><strong>Rénovation électrique</strong> : {Math.round(35 * ville.coefficient)} - {Math.round(100 * ville.coefficient)} € au m² en moyenne</li>
        </ul>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour vos travaux électriques à {ville.nom}, assurez-vous que votre électricien dispose d'une
          <strong> certification Qualifelec</strong> et d'une <strong>assurance décennale</strong>.
          N'oubliez pas que les travaux de rénovation bénéficient d'une <strong>TVA réduite à 10%</strong>
          (sous certaines conditions) et demandez un devis conforme aux normes <strong>Consuel</strong>.
        </p>
      </section>

      {/* Autres villes du département */}
      {otherVilles.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Autres villes du {ville.departement}</h2>
          <div className="flex flex-wrap gap-2">
            {otherVilles.map(v => (
              <a
                key={v.slug}
                href={`/prix-electricien/${v.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
              >
                {v.nom} ({v.coefficient.toFixed(2)}x)
              </a>
            ))}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/prix-electricien" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  const ville = findVille(slug);
  if (ville) return <VillePage ville={ville} />;

  const parsed = parseSlugElectricien(slug);
  if (!parsed) notFound();

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixElectricien(prestation.id, quantite, region.id)!;
  const qtyLabel = prestation.unite === "forfait" ? "" : ` ${quantite} ${prestation.uniteLabel}`;

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
        name: `Quel est le prix ${prestation.unite === "forfait" ? "" : `au ${prestation.uniteLabel} `}pour ${prestation.nom.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le prix ${prestation.unite === "forfait" ? "" : `au ${prestation.uniteLabel} `}pour ${prestation.nom.toLowerCase()} en ${region.nom} est de ${Math.round(prestation.totalMin * region.coefficient)} a ${Math.round(prestation.totalMax * region.coefficient)} € TTC, fournitures et main d'oeuvre incluses.`,
        },
      },
    ],
  };

  const autresQuantites = prestation.quantites.filter(q => q !== quantite);
  const autresRegions = REGIONS_SEO.filter(rg => rg.id !== region.id);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${prestation.nom}${qtyLabel}`} parentPage="Prix Electricien" parentHref="/prix-electricien" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {prestation.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix {prestation.nom}{qtyLabel} — {region.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation du cout pour {prestation.nom.toLowerCase()}{qtyLabel} en {region.nom}. Tarif electricien 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-200 mb-1">{prestation.nom}{qtyLabel} en {region.nom}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtPrix(r.totalMin)} — {fmtPrix(r.totalMax)}
        </p>
        <p className="text-blue-200 mt-1">TTC &middot; Coefficient regional x{region.coefficient.toFixed(2)}</p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-blue-200">Fournitures min</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMin)}</p>
          </div>
          <div>
            <p className="text-blue-200">Fournitures max</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMax)}</p>
          </div>
          <div>
            <p className="text-blue-200">Main d&apos;oeuvre min</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMin)}</p>
          </div>
          <div>
            <p className="text-blue-200">Main d&apos;oeuvre max</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMax)}</p>
          </div>
        </div>
      </div>

      {/* Prix unitaire */}
      {prestation.unite !== "forfait" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Prix {prestation.unite === "m2" ? "au" : "a l'"}  {prestation.uniteLabel}</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMin * region.coefficient)} €</p>
              <p className="text-xs text-slate-400">minimum / {prestation.uniteLabel}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-blue-600">{Math.round((prestation.totalMin + prestation.totalMax) / 2 * region.coefficient)} €</p>
              <p className="text-xs text-slate-400">moyen / {prestation.uniteLabel}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMax * region.coefficient)} €</p>
              <p className="text-xs text-slate-400">maximum / {prestation.uniteLabel}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix electricien en {region.nom} (2026)</h2>
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
              {PRESTATIONS_ELECTRICIEN.map(p => (
                <tr key={p.id} className={`border-b border-slate-100 ${p.id === prestation.id ? "bg-blue-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className={p.id === prestation.id ? "font-bold text-blue-700" : "text-slate-700"}>{p.nom}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{p.uniteLabel}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{Math.round(p.totalMin * region.coefficient)} €</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{Math.round(p.totalMax * region.coefficient)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outil interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Estimateur interactif</h2>
      <EstimateurElectricien />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {prestation.nom}{qtyLabel} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{prestation.nom.toLowerCase()}</strong>{qtyLabel} en <strong>{region.nom}</strong>, le budget a prevoir se situe entre <strong>{fmtPrix(r.totalMin)}</strong> et <strong>{fmtPrix(r.totalMax)}</strong> TTC en 2026.
          Ce prix comprend les fournitures ({fmtPrix(r.fournituresMin)} a {fmtPrix(r.fournituresMax)}) et la main d&apos;oeuvre de l&apos;electricien ({fmtPrix(r.mainOeuvreMin)} a {fmtPrix(r.mainOeuvreMax)}).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le coefficient regional de <strong>{region.nom}</strong> est de <strong>x{region.coefficient.toFixed(2)}</strong> par rapport au prix de base en province.
          Pour obtenir le meilleur tarif, nous vous recommandons de <strong>comparer au moins 3 devis</strong> d&apos;electriciens qualifies dans votre region.
        </p>
        <p className="text-slate-600 leading-relaxed">
          N&apos;oubliez pas que les travaux de renovation electrique dans un logement de plus de 2 ans beneficient d&apos;une <strong>TVA reduite a 10%</strong>. Verifiez que votre electricien dispose d&apos;une <strong>assurance decennale</strong> et d&apos;une certification <strong>Qualifelec</strong> avant de signer le devis.
        </p>
      </section>

      {/* Autres quantites */}
      {autresQuantites.length > 0 && (
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Autres quantites — {prestation.nom} en {region.nom}</h2>
          <div className="flex flex-wrap gap-2">
            {autresQuantites.map(q => (
              <a
                key={q}
                href={`/prix-electricien/${prestation.slug}-${q}${prestation.uniteSlug}-${region.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
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
          <h2 className="text-lg font-bold text-slate-800 mb-4">Autres regions — {prestation.nom}{qtyLabel}</h2>
          <div className="flex flex-wrap gap-2">
            {autresRegions.map(rg => {
              const s = prestation.unite === "forfait"
                ? `${prestation.slug}-${rg.slug}`
                : `${prestation.slug}-${quantite}${prestation.uniteSlug}-${rg.slug}`;
              return (
                <a
                  key={rg.id}
                  href={`/prix-electricien/${s}`}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                >
                  {rg.nom}
                </a>
              );
            })}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/prix-electricien" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
