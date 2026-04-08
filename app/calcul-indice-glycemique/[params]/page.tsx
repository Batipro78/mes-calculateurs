import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurIndiceGlycemique from "../CalculateurIndiceGlycemique";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { ALIMENTS, ALIMENTS_BY_SLUG, calcChargeGlycemique } from "../indiceGlycemiqueCalc";
import type { CategorieAliment } from "../indiceGlycemiqueCalc";

const CATEGORIE_LABELS: Record<CategorieAliment, string> = {
  fruit: "Fruit",
  legume: "Legume / Legumineuse",
  feculent: "Feculent",
  sucre: "Sucre / Confiserie",
  "produit-laitier": "Produit Laitier",
  boisson: "Boisson",
  cereale: "Cereale",
};

export function generateStaticParams() {
  return ALIMENTS.map((a) => ({ params: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const aliment = ALIMENTS_BY_SLUG[slug];
  if (!aliment) return {};

  const glucidesParPortion = Math.round((aliment.glucidesPar100g * aliment.portion) / 100);
  const res = calcChargeGlycemique(aliment.ig, glucidesParPortion);

  const categorieIG =
    aliment.ig <= 55 ? "bas" : aliment.ig <= 69 ? "moyen" : "eleve";

  return {
    title: `Indice Glycemique ${aliment.nom} = ${aliment.ig} (IG ${categorieIG}) | CG ${res.chargeGlycemique}`,
    description: `Indice glycemique de ${aliment.nom} : IG ${aliment.ig} (${categorieIG}), charge glycemique ${res.chargeGlycemique} pour une portion de ${aliment.portion}g. ${aliment.glucidesPar100g}g de glucides pour 100g. Conseils nutrition.`,
    keywords: `indice glycemique ${aliment.nom}, IG ${aliment.nom}, charge glycemique ${aliment.nom}, ${aliment.nom} diabete, ${aliment.nom} glycemie`,
    openGraph: {
      title: `IG ${aliment.nom} = ${aliment.ig} — Charge Glycemique ${res.chargeGlycemique}`,
      description: `${aliment.nom} : indice glycemique ${aliment.ig} (${categorieIG}), ${aliment.glucidesPar100g}g glucides/100g, CG ${res.chargeGlycemique} pour ${aliment.portion}g.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const aliment = ALIMENTS_BY_SLUG[slug];
  if (!aliment) notFound();

  const glucidesParPortion = Math.round((aliment.glucidesPar100g * aliment.portion) / 100);
  const res = calcChargeGlycemique(aliment.ig, glucidesParPortion);

  const categorieIG =
    aliment.ig <= 55 ? "bas" : aliment.ig <= 69 ? "moyen" : "eleve";
  const categorieIGLabel =
    categorieIG === "bas" ? "Bas" : categorieIG === "moyen" ? "Moyen" : "Eleve";

  const badgeIGColor =
    categorieIG === "bas"
      ? "from-green-500 to-emerald-600"
      : categorieIG === "moyen"
      ? "from-yellow-500 to-amber-500"
      : "from-red-500 to-rose-600";

  const badgeCGColor =
    res.categorieCG === "faible"
      ? "text-green-700 bg-green-50 border-green-200"
      : res.categorieCG === "moyenne"
      ? "text-yellow-700 bg-yellow-50 border-yellow-200"
      : "text-red-700 bg-red-50 border-red-200";

  // Aliments de la meme categorie (sauf l'actuel)
  const alimentsSameCategory = ALIMENTS.filter(
    (a) => a.categorie === aliment.categorie && a.slug !== aliment.slug
  ).sort((a, b) => a.ig - b.ig);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est l'indice glycemique de ${aliment.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `L'indice glycemique de ${aliment.nom} est de ${aliment.ig}, ce qui correspond a un IG ${categorieIG}. ${aliment.nom} contient ${aliment.glucidesPar100g}g de glucides pour 100g. Pour une portion typique de ${aliment.portion}g, la charge glycemique est de ${res.chargeGlycemique} (${res.categorieCG}).`,
        },
      },
      {
        "@type": "Question",
        name: `${aliment.nom} convient-il aux personnes diabetiques ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${aliment.nom} a un indice glycemique de ${aliment.ig} (${categorieIG}) et une charge glycemique de ${res.chargeGlycemique} pour ${aliment.portion}g. ${
            categorieIG === "bas"
              ? `Avec un IG bas, ${aliment.nom} est generalement adapte aux personnes diabetiques car il provoque une montee progressive de la glycemie.`
              : categorieIG === "moyen"
              ? `Avec un IG moyen, ${aliment.nom} peut etre consomme avec moderation par les personnes diabetiques, de preference associe a des proteines ou des fibres.`
              : `Avec un IG eleve, ${aliment.nom} doit etre consomme avec precaution par les personnes diabetiques. Il est conseille de le combiner avec des aliments a faible IG.`
          } Consultez toujours votre medecin ou diabetologue pour un suivi personnalise.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle est la charge glycemique de ${aliment.nom} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La charge glycemique de ${aliment.nom} pour une portion de ${aliment.portion}g est de ${res.chargeGlycemique}. Elle se calcule ainsi : CG = (IG x glucides par portion) / 100 = (${aliment.ig} x ${glucidesParPortion}) / 100 = ${res.chargeGlycemique}. Une CG <= 10 est faible, 11-19 est moyenne, >= 20 est elevee.`,
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
        currentPage={aliment.nom}
        parentPage="Indice Glycemique des Aliments"
        parentHref="/calcul-indice-glycemique"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 bg-gradient-to-br ${badgeIGColor} rounded-xl flex items-center justify-center text-xl shadow-sm`}>
          {aliment.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Indice Glycemique — {aliment.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        IG {aliment.ig} ({categorieIGLabel}) &middot; Charge glycemique {res.chargeGlycemique} pour {aliment.portion}g &middot;{" "}
        {CATEGORIE_LABELS[aliment.categorie]}
      </p>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-8" />

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${badgeIGColor} text-white rounded-2xl p-8 shadow-lg mb-8`}>
        <p className="text-white/80 mb-1">Indice Glycemique</p>
        <p className="text-6xl font-extrabold tracking-tight">{aliment.ig}</p>
        <p className="text-xl font-medium mt-1">IG {categorieIGLabel}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Glucides/100g</p>
            <p className="text-2xl font-bold">{aliment.glucidesPar100g}g</p>
          </div>
          <div>
            <p className="text-white/70">Portion ref.</p>
            <p className="text-2xl font-bold">{aliment.portion}g</p>
          </div>
          <div>
            <p className="text-white/70">Glucides/portion</p>
            <p className="text-2xl font-bold">{glucidesParPortion}g</p>
          </div>
          <div>
            <p className="text-white/70">Charge Glyc.</p>
            <p className="text-2xl font-bold">{res.chargeGlycemique}</p>
          </div>
        </div>
        <div className="mt-4 bg-white/10 rounded-xl px-4 py-3 text-sm">
          CG = (IG x glucides/portion) / 100 = ({aliment.ig} x {glucidesParPortion}) / 100 = <strong>{res.chargeGlycemique}</strong>{" "}
          — Charge <strong>{res.categorieCG}</strong>
        </div>
      </div>

      {/* Indicateurs detailles */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Classification de l&apos;IG
          </h2>
          <div className="space-y-3">
            {[
              { label: "IG Bas", range: "0 – 55", color: "bg-green-500", isActive: categorieIG === "bas" },
              { label: "IG Moyen", range: "56 – 69", color: "bg-yellow-500", isActive: categorieIG === "moyen" },
              { label: "IG Eleve", range: "70 – 100", color: "bg-red-500", isActive: categorieIG === "eleve" },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  row.isActive ? "border-slate-300 bg-slate-50 shadow-sm" : "border-transparent"
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${row.color}`} />
                <div className="flex-1">
                  <span className={`text-sm font-semibold ${row.isActive ? "text-slate-800" : "text-slate-500"}`}>
                    {row.label}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">{row.range}</span>
                </div>
                {row.isActive && (
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-sm">
                    {aliment.ig} ←
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Classification de la Charge Glycemique
          </h2>
          <div className="space-y-3">
            {[
              { label: "CG Faible", range: "0 – 10", color: "bg-green-500", isActive: res.categorieCG === "faible" },
              { label: "CG Moyenne", range: "11 – 19", color: "bg-yellow-500", isActive: res.categorieCG === "moyenne" },
              { label: "CG Elevee", range: "&ge; 20", color: "bg-red-500", isActive: res.categorieCG === "elevee" },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  row.isActive ? "border-slate-300 bg-slate-50 shadow-sm" : "border-transparent"
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${row.color}`} />
                <div className="flex-1">
                  <span className={`text-sm font-semibold ${row.isActive ? "text-slate-800" : "text-slate-500"}`}>
                    {row.label}
                  </span>
                  <span
                    className="text-xs text-slate-400 ml-2"
                    dangerouslySetInnerHTML={{ __html: row.range }}
                  />
                </div>
                {row.isActive && (
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-sm">
                    {res.chargeGlycemique} ←
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparaison avec aliments de la meme categorie */}
      {alimentsSameCategory.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Comparaison : autres {CATEGORIE_LABELS[aliment.categorie].toLowerCase()}s
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Aliment</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">IG</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium hidden sm:table-cell">Glucides/100g</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">CG/portion</th>
                </tr>
              </thead>
              <tbody>
                {/* Ligne actuelle en tete */}
                <tr className="border-b border-slate-100 bg-green-50/50">
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-2">
                      <span>{aliment.emoji}</span>
                      <span className="font-bold text-green-700">{aliment.nom}</span>
                      <span className="text-xs text-slate-400">({aliment.portion}g)</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-right font-extrabold text-green-700">{aliment.ig}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-green-700 hidden sm:table-cell">{aliment.glucidesPar100g}g</td>
                  <td className="py-2.5 px-2 text-right font-extrabold text-green-700">{res.chargeGlycemique}</td>
                </tr>
                {alimentsSameCategory.map((a) => {
                  const gluc = Math.round((a.glucidesPar100g * a.portion) / 100);
                  const r = calcChargeGlycemique(a.ig, gluc);
                  const igCat = a.ig <= 55 ? "text-green-600" : a.ig <= 69 ? "text-yellow-600" : "text-red-600";
                  return (
                    <tr key={a.slug} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-2">
                          <span>{a.emoji}</span>
                          <a
                            href={`/calcul-indice-glycemique/${a.slug}`}
                            className="text-slate-700 hover:text-green-600 transition-colors font-medium"
                          >
                            {a.nom}
                          </a>
                          <span className="text-xs text-slate-400 hidden sm:inline">({a.portion}g)</span>
                        </div>
                      </td>
                      <td className={`py-2.5 px-2 text-right font-bold ${igCat}`}>{a.ig}</td>
                      <td className="py-2.5 px-2 text-right text-slate-600 hidden sm:table-cell">{a.glucidesPar100g}g</td>
                      <td className={`py-2.5 px-2 text-right font-bold ${igCat}`}>{r.chargeGlycemique}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Texte SEO specifique */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {aliment.nom} et glycemie : tout savoir
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          <strong>{aliment.nom}</strong> possede un{" "}
          <strong>indice glycemique de {aliment.ig}</strong>, ce qui le classe
          dans la categorie IG <strong>{categorieIGLabel.toLowerCase()}</strong>.{" "}
          {categorieIG === "bas"
            ? `Un IG bas signifie que ${aliment.nom} libere ses sucres lentement dans le sang, ce qui favorise une energie stable et reduit les pics d'insuline. C'est un aliment favorable pour les personnes diabetiques ou souhaitant controler leur glycemie.`
            : categorieIG === "moyen"
            ? `Un IG moyen signifie que ${aliment.nom} a un impact glycemique modere. Il est preferable de le consommer accompagne de proteines, fibres ou lipides pour abaisser son impact sur la glycemie.`
            : `Un IG eleve signifie que ${aliment.nom} fait monter rapidement la glycemie. Pour les personnes diabetiques ou souhaitant controler leur poids, il est conseille de limiter la portion ou de l'associer a des aliments a IG bas.`}
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour une <strong>portion de reference de {aliment.portion}g</strong>,{" "}
          {aliment.nom} apporte <strong>{glucidesParPortion}g de glucides</strong>,
          ce qui donne une <strong>charge glycemique de {res.chargeGlycemique}</strong>{" "}
          (CG {res.categorieCG}).{" "}
          {res.categorieCG === "faible"
            ? "Cette CG faible confirme que même si l'IG peut paraître modere, l'impact reel sur la glycemie reste limite grace a la teneur relativement faible en glucides par portion."
            : res.categorieCG === "moyenne"
            ? "La charge glycemique moyenne indique un impact glycemique modere sur le repas. A consommer dans le cadre d'un repas equilibre."
            : "La charge glycemique elevee signifie que cette portion provoque un impact glycemique significatif. Limitez la portion ou associez cet aliment a des proteines et des fibres."}
        </p>
        <p className="text-slate-600 leading-relaxed">
          {aliment.nom} appartient a la categorie <strong>{CATEGORIE_LABELS[aliment.categorie]}</strong>{" "}
          et contient <strong>{aliment.glucidesPar100g}g de glucides pour 100g</strong>.
          Pour comparer avec d&apos;autres aliments, utilisez notre{" "}
          <a href="/calcul-indice-glycemique" className="text-green-600 hover:underline font-medium">
            tableau complet de l&apos;indice glycemique
          </a>.
        </p>
        <p className="text-xs text-slate-400 mt-6">Mis a jour le 8 avril 2026</p>
      </section>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Tableau complet des indices glycemiques
      </h2>
      <CalculateurIndiceGlycemique />

      <RelatedCalculators currentSlug="/calcul-indice-glycemique" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
