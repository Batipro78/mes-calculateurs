import type { Metadata } from "next";
import CalculateurInflammation from "../CalculateurInflammation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

// Scenarios pre-configures pour le SEO
const SCENARIOS: Array<{ slug: string; title: string; description: string; content: string }> = [
  { slug: "regime-mediterraneen", title: "Regime mediterraneen", description: "Le modele anti-inflammatoire de reference", content: "Le regime mediterraneen est l'alimentation anti-inflammatoire la plus etudiee au monde, avec un score DII typique de -3 a -5 (tres anti-inflammatoire)." },
  { slug: "regime-vegetarien", title: "Regime vegetarien", description: "Sans viande, score inflammatoire tres bas", content: "Un regime vegetarien bien equilibre (avec legumineuses, noix, fruits, legumes) affiche un score DII autour de -2 a -4, tres favorable a la reduction de l'inflammation." },
  { slug: "regime-vegan", title: "Regime vegan", description: "Sans produit animal, impact anti-inflammatoire", content: "Un regime vegan bien compose (riche en legumes et fruits varies, noix, graines, legumineuses) peut atteindre un score DII de -3 a -5. Attention aux carences en B12 et omega-3 si mal equilibre." },
  { slug: "regime-occidental-standard", title: "Regime occidental standard", description: "Fast-food, viande rouge, sucre - tres pro-inflammatoire", content: "Le regime occidental standard (fast-food, sodas, charcuterie, sucres ajoutes, ultra-transformes) a un score DII typique de +3 a +6, tres pro-inflammatoire et lie aux maladies chroniques." },
  { slug: "regime-keto", title: "Regime cetogene (keto)", description: "Impact inflammatoire variable selon choix alimentaires", content: "Un regime keto a base de viandes transformees et graisses animales a un score DII eleve (+2 a +4). Un keto plus sain avec poissons, avocat, noix, huile d'olive, legumes verts peut atteindre -1 a -3." },
  { slug: "regime-paleo", title: "Regime paleo", description: "Impact anti-inflammatoire modere", content: "Le regime paleo (viandes maigres, poissons, legumes, fruits, noix, pas de cereales ni legumineuses) a un score DII autour de -1 a -3, anti-inflammatoire mais moins que le mediterraneen." },
];

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ params: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const scenario = SCENARIOS.find((s) => s.slug === slug);
  if (!scenario) return {};

  return {
    alternates: { canonical: `/calcul-indice-inflammation/${slug}` },
    title: `Indice inflammation : ${scenario.title} - Score DII 2026`,
    description: `${scenario.content} Calculez votre propre score inflammation alimentaire.`,
    keywords: `indice inflammation ${scenario.title.toLowerCase()}, DII ${scenario.title.toLowerCase()}, score inflammation ${scenario.title.toLowerCase()}`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const scenario = SCENARIOS.find((s) => s.slug === slug);
  if (!scenario) notFound();

  return (
    <div>
      <Breadcrumb currentPage={scenario.title} parentPage="Calcul Indice Inflammation" parentHref="/calcul-indice-inflammation" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🥗
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Indice inflammation : {scenario.title}</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">{scenario.description}</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <p className="text-slate-600 leading-relaxed">{scenario.content}</p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculez votre propre score</h2>
      <CalculateurInflammation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres regimes</h2>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.filter(s => s.slug !== scenario.slug).map(s => (
            <a key={s.slug} href={`/calcul-indice-inflammation/${s.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all">
              {s.title}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-indice-inflammation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
