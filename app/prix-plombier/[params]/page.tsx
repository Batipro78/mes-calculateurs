import type { Metadata } from "next";
import EstimateurPlombier from "../EstimateurPlombier";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { PRESTATIONS_PLOMBIER, REGIONS_SEO, parseSlugPlombier, generateAllSlugsPlombier, calculerPrixPlombier, fmtPrix } from "../calcPlombier";
import { VILLES, findVille, getVillesSlugs } from "../../data/villes";
import type { Ville } from "../../data/villes";

export function generateStaticParams() {
  const prestationSlugs = generateAllSlugsPlombier().map(s => ({ params: s }));
  const villeSlugs = getVillesSlugs().map(s => ({ params: s }));
  return [...prestationSlugs, ...villeSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;

  // Check if it's a city page
  const ville = findVille(slug);
  if (ville) {
    return {
    alternates: { canonical: `/prix-plombier/${slug}` },
      title: `Prix Plombier a ${ville.nom} (${ville.departement}) - Tarifs 2026`,
      description: `Tous les prix plombier a ${ville.nom} en 2026 : debouchage (${Math.round(100 * ville.coefficient)}-${Math.round(450 * ville.coefficient)} EUR), installation WC, salle de bain. Tarifs ${ville.nom} avec coefficient x${ville.coefficient.toFixed(2)}.`,
      keywords: `prix plombier ${ville.nom.toLowerCase()}, tarif plombier ${ville.nom.toLowerCase()}, cout plombier ${ville.nom.toLowerCase()}, devis plombier ${ville.nom.toLowerCase()} ${ville.departement}`,
    };
  }

  const parsed = parseSlugPlombier(slug);
  if (!parsed) return {};

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixPlombier(prestation.id, quantite, region.id)!;
  const qtyLabel = prestation.unite === "forfait" ? "" : ` ${quantite} ${prestation.uniteLabel}`;

  return {
    alternates: { canonical: `/prix-plombier/${slug}` },
    title: `Prix ${prestation.nom}${qtyLabel} ${region.nom} - ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} (2026)`,
    description: `Cout ${prestation.nom.toLowerCase()}${qtyLabel} en ${region.nom} : ${fmtPrix(r.totalMin)} a ${fmtPrix(r.totalMax)} TTC. Detail fournitures (${fmtPrix(r.fournituresMin)}-${fmtPrix(r.fournituresMax)}) et main d'oeuvre (${fmtPrix(r.mainOeuvreMin)}-${fmtPrix(r.mainOeuvreMax)}). Tarif plombier 2026.`,
    keywords: `prix ${prestation.nom.toLowerCase()}, cout ${prestation.nom.toLowerCase()} ${region.nom.toLowerCase()}, tarif plombier ${prestation.nom.toLowerCase()}, devis plombier`,
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
        name: `Combien coute un plombier a ${ville.nom} en 2026 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les tarifs plombier a ${ville.nom} (${ville.departement}) varient selon la prestation : debouchage ${Math.round(100 * ville.coefficient)}-${Math.round(450 * ville.coefficient)} \u20ac, installation WC ${Math.round(250 * ville.coefficient)}-${Math.round(900 * ville.coefficient)} \u20ac, salle de bain complete ${Math.round(900 * ville.coefficient)}-${Math.round(2500 * ville.coefficient)} \u20ac/m\u00b2. Coefficient de prix a ${ville.nom} : x${ville.coefficient.toFixed(2)}.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment trouver un bon plombier a ${ville.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour trouver un plombier fiable a ${ville.nom}, demandez au moins 3 devis, verifiez l'assurance decennale et les avis clients. ${ville.nom} compte environ ${ville.population} habitants et une forte demande en plombiers qualifies. Mefiez-vous des depanneurs d'urgence non agrees.`,
        },
      },
      {
        "@type": "Question",
        name: `Les prix plombier a ${ville.nom} sont-ils plus chers qu'ailleurs ?`,
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
      <Breadcrumb currentPage={`Plombier ${ville.nom}`} parentPage="Prix Plombier" parentHref="/prix-plombier" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {"\ud83d\udeb0"}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix Plombier a {ville.nom} ({ville.departement}) &mdash; Tarifs 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tous les tarifs plombier a {ville.nom} : installation, depannage, salle de bain. Coefficient de prix x{ville.coefficient.toFixed(2)}.
      </p>

      {/* Resume ville */}
      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg shadow-cyan-200/50 mb-8">
        <p className="text-cyan-200 mb-1">Tarifs plombier a {ville.nom} ({ville.codePostal})</p>
        <p className="text-3xl font-extrabold tracking-tight mb-1">
          Coefficient de prix : x{ville.coefficient.toFixed(2)}
        </p>
        <p className="text-cyan-200">
          {ville.coefficient > 1.0 ? `+${Math.round((ville.coefficient - 1) * 100)}% par rapport a la moyenne nationale` : "Prix dans la moyenne nationale"}
        </p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-cyan-200">Ville</p>
            <p className="font-bold text-lg">{ville.nom}</p>
          </div>
          <div>
            <p className="text-cyan-200">Departement</p>
            <p className="font-bold text-lg">{ville.departement}</p>
          </div>
          <div>
            <p className="text-cyan-200">Population</p>
            <p className="font-bold text-lg">{ville.population} hab.</p>
          </div>
        </div>
      </div>

      {/* Tableau toutes prestations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix plombier a {ville.nom} (2026)</h2>
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
              {PRESTATIONS_PLOMBIER.map(p => (
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
      <EstimateurPlombier />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Prix plombier a {ville.nom} : ce qu&apos;il faut savoir
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{ville.nom}</strong> ({ville.departement}), les tarifs des plombiers suivent un coefficient de <strong>x{ville.coefficient.toFixed(2)}</strong> par rapport aux prix de reference en province.
          {ville.coefficient > 1.0
            ? ` Cela represente une majoration de ${Math.round((ville.coefficient - 1) * 100)}%, liee a la forte demande et au cout de la vie dans l'agglomeration de ${ville.nom} (${ville.population} habitants).`
            : ` Les prix a ${ville.nom} sont dans la moyenne nationale, ce qui est avantageux pour les habitants.`
          }
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les prestations les plus demandees a <strong>{ville.nom}</strong> sont le <strong>debouchage de canalisation</strong> ({Math.round(100 * ville.coefficient)}-{Math.round(450 * ville.coefficient)} &euro;), l&apos;<strong>installation de WC</strong> ({Math.round(250 * ville.coefficient)}-{Math.round(900 * ville.coefficient)} &euro;) et la <strong>creation de salle de bain</strong> ({Math.round(900 * ville.coefficient)}-{Math.round(2500 * ville.coefficient)} &euro;/m&sup2;).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour obtenir le meilleur tarif a {ville.nom}, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de plombiers qualifies dans le {ville.departement}. Attention aux depanneurs d&apos;urgence non agrees qui pratiquent des tarifs abusifs.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de plomberie dans un logement de plus de 2 ans beneficient d&apos;une <strong>TVA reduite a 10%</strong>. Verifiez l&apos;assurance decennale de votre artisan avant de signer le devis.
        </p>
      </section>

      {/* Autres villes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Prix plombier dans d&apos;autres villes</h2>
        <div className="flex flex-wrap gap-2">
          {autresVilles.map(v => (
            <a
              key={v.slug}
              href={`/prix-plombier/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all"
            >
              {v.nom} ({v.departement})
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/prix-plombier" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;

  // Check if it's a city page
  const ville = findVille(slug);
  if (ville) return <VillePage ville={ville} />;

  const parsed = parseSlugPlombier(slug);
  if (!parsed) notFound();

  const { prestation, quantite, region } = parsed;
  const r = calculerPrixPlombier(prestation.id, quantite, region.id)!;
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
      <Breadcrumb currentPage={`${prestation.nom}${qtyLabel}`} parentPage="Prix Plombier" parentHref="/prix-plombier" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {prestation.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Prix {prestation.nom}{qtyLabel} — {region.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimation du cout pour {prestation.nom.toLowerCase()}{qtyLabel} en {region.nom}. Tarif plombier 2026.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg shadow-cyan-200/50 mb-8">
        <p className="text-cyan-200 mb-1">{prestation.nom}{qtyLabel} en {region.nom}</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtPrix(r.totalMin)} — {fmtPrix(r.totalMax)}
        </p>
        <p className="text-cyan-200 mt-1">TTC &middot; Coefficient regional x{region.coefficient.toFixed(2)}</p>
        <div className="h-px bg-white/20 my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-cyan-200">Fournitures min</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMin)}</p>
          </div>
          <div>
            <p className="text-cyan-200">Fournitures max</p>
            <p className="font-bold text-lg">{fmtPrix(r.fournituresMax)}</p>
          </div>
          <div>
            <p className="text-cyan-200">Main d&apos;oeuvre min</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMin)}</p>
          </div>
          <div>
            <p className="text-cyan-200">Main d&apos;oeuvre max</p>
            <p className="font-bold text-lg">{fmtPrix(r.mainOeuvreMax)}</p>
          </div>
        </div>
      </div>

      {/* Prix unitaire */}
      {prestation.unite !== "forfait" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Prix {prestation.unite === "m2" ? "au" : "a l'"} {prestation.uniteLabel}</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-slate-800">{Math.round(prestation.totalMin * region.coefficient)} €</p>
              <p className="text-xs text-slate-400">minimum / {prestation.uniteLabel}</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-cyan-600">{Math.round((prestation.totalMin + prestation.totalMax) / 2 * region.coefficient)} €</p>
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
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tous les prix plombier en {region.nom} (2026)</h2>
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
              {PRESTATIONS_PLOMBIER.map(p => (
                <tr key={p.id} className={`border-b border-slate-100 ${p.id === prestation.id ? "bg-cyan-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    <span className="mr-2">{p.emoji}</span>
                    <span className={p.id === prestation.id ? "font-bold text-cyan-700" : "text-slate-700"}>{p.nom}</span>
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
      <EstimateurPlombier />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {prestation.nom}{qtyLabel} : quel budget prevoir ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour <strong>{prestation.nom.toLowerCase()}</strong>{qtyLabel} en <strong>{region.nom}</strong>, le budget a prevoir se situe entre <strong>{fmtPrix(r.totalMin)}</strong> et <strong>{fmtPrix(r.totalMax)}</strong> TTC en 2026.
          Ce prix comprend les fournitures ({fmtPrix(r.fournituresMin)} a {fmtPrix(r.fournituresMax)}) et la main d&apos;oeuvre du plombier ({fmtPrix(r.mainOeuvreMin)} a {fmtPrix(r.mainOeuvreMax)}).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le coefficient regional de <strong>{region.nom}</strong> est de <strong>x{region.coefficient.toFixed(2)}</strong> par rapport au prix de base en province.
          Pour obtenir le meilleur tarif, nous vous recommandons de <strong>comparer au moins 3 devis</strong> de plombiers qualifies dans votre region.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Les travaux de plomberie dans un logement de plus de 2 ans beneficient d&apos;une <strong>TVA reduite a 10%</strong>. Verifiez l&apos;assurance decennale et la qualification RGE de votre artisan pour les travaux importants.
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
                href={`/prix-plombier/${prestation.slug}-${q}${prestation.uniteSlug}-${region.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all"
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
                  href={`/prix-plombier/${s}`}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all"
                >
                  {rg.nom}
                </a>
              );
            })}
          </div>
        </section>
      )}

      <RelatedCalculators currentSlug="/prix-plombier" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
