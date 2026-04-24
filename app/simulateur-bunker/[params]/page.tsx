import type { Metadata } from "next";
import SimulateurBunker from "../SimulateurBunker";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

/* ─── Parametres pour les routes dynamiques ─── */
const PERSONNES = [1, 2, 3, 4, 5, 6, 8, 10, 15, 20];

const DUREES = [
  { slug: "2-semaines", label: "2 semaines", jours: 14 },
  { slug: "1-mois", label: "1 mois", jours: 30 },
  { slug: "3-mois", label: "3 mois", jours: 90 },
  { slug: "6-mois", label: "6 mois", jours: 180 },
  { slug: "1-an", label: "1 an", jours: 365 },
  { slug: "2-ans", label: "2 ans", jours: 730 },
];

const TYPES = [
  { slug: "basique", label: "Basique", prixM2: 1500 },
  { slug: "standard", label: "Standard", prixM2: 3000 },
  { slug: "nrbc", label: "NRBC", prixM2: 5500 },
  { slug: "luxe", label: "Luxe", prixM2: 10000 },
];

/* ─── Calculs ─── */
function calculerBudget(personnes: number, jours: number, prixM2: number) {
  const surfaceVie = personnes * 5;
  const surfaceStockage = Math.ceil((personnes * 0.015 * jours) / 2.5);
  const surfaceTotale = surfaceVie + 10 + surfaceStockage;
  const prixConstruction = surfaceTotale * prixM2;
  const prixEau = personnes * 3 * jours * 0.5;
  const prixNourriture = personnes * 8 * jours;
  const prixEquipements = Math.round(prixConstruction * 0.25);
  const total = prixConstruction + prixEau + prixNourriture + prixEquipements;
  return {
    surfaceTotale,
    litresEau: personnes * 3 * jours,
    prixConstruction,
    prixEau: Math.round(prixEau),
    prixNourriture,
    prixEquipements,
    total: Math.round(total),
  };
}

function formatPrix(n: number): string {
  return n.toLocaleString("fr-FR") + " €";
}

/* ─── Parse le slug : "4-personnes-3-mois-standard" ─── */
function parseSlug(slug: string) {
  const match = slug.match(
    /^(\d+)-personnes?-(.+?)-(basique|standard|nrbc|luxe)$/
  );
  if (!match) return null;

  const nbPersonnes = parseInt(match[1]);
  const dureeSlug = match[2];
  const typeSlug = match[3];

  if (!PERSONNES.includes(nbPersonnes)) return null;
  const duree = DUREES.find((d) => d.slug === dureeSlug);
  const type = TYPES.find((t) => t.slug === typeSlug);
  if (!duree || !type) return null;

  return { nbPersonnes, duree, type };
}

/* ─── Static Params : selection strategique ─── */
export function generateStaticParams() {
  const params: { params: string }[] = [];

  // Combinaisons strategiques (pas toutes pour eviter trop de pages)
  // Personnes cles x durees cles x tous les types
  const personnesCles = [1, 2, 4, 6, 10];
  const dureesCles = DUREES;

  for (const p of personnesCles) {
    for (const d of dureesCles) {
      for (const t of TYPES) {
        params.push({
          params: `${p}-personne${p > 1 ? "s" : ""}-${d.slug}-${t.slug}`,
        });
      }
    }
  }

  return params; // 5 personnes × 6 durees × 4 types = 120 pages
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { nbPersonnes, duree, type } = parsed;
  const budget = calculerBudget(nbPersonnes, duree.jours, type.prixM2);

  return {
    alternates: { canonical: `/simulateur-bunker/${slug}` },
    title: `Bunker ${type.label} ${nbPersonnes} personne${nbPersonnes > 1 ? "s" : ""} ${duree.label} - Budget ${formatPrix(budget.total)}`,
    description: `Budget bunker ${type.label.toLowerCase()} pour ${nbPersonnes} personne${nbPersonnes > 1 ? "s" : ""} avec ${duree.label} d'autonomie : ${formatPrix(budget.total)}. Surface ${budget.surfaceTotale} m², ${Math.round(budget.litresEau / 1000 * 10) / 10} m³ d'eau. Estimation detaillee.`,
    keywords: `bunker ${nbPersonnes} personnes, bunker ${type.label.toLowerCase()} prix, abri ${duree.label} autonomie, budget bunker ${formatPrix(budget.total)}, bunker survie France`,
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

  const { nbPersonnes, duree, type } = parsed;
  const budget = calculerBudget(nbPersonnes, duree.jours, type.prixM2);

  // Autres configs pour liens internes
  const autresTypes = TYPES.filter((t) => t.slug !== type.slug);
  const autresDurees = DUREES.filter((d) => d.slug !== duree.slug);
  const autresPersonnes = PERSONNES.filter((p) => p !== nbPersonnes).slice(0, 6);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Combien coute un bunker ${type.label.toLowerCase()} pour ${nbPersonnes} personne${nbPersonnes > 1 ? "s" : ""} ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Un bunker ${type.label.toLowerCase()} pour ${nbPersonnes} personne${nbPersonnes > 1 ? "s" : ""} avec ${duree.label} d'autonomie coute environ ${formatPrix(budget.total)}. Cela comprend ${budget.surfaceTotale} m² de surface (${formatPrix(budget.prixConstruction)} de construction), ${formatPrix(budget.prixEquipements)} d'equipements, ${formatPrix(budget.prixNourriture)} de nourriture et ${formatPrix(budget.prixEau)} d'eau (${budget.litresEau.toLocaleString("fr-FR")} litres).`,
                },
              },
              {
                "@type": "Question",
                name: `Quelle taille de bunker pour ${nbPersonnes} personne${nbPersonnes > 1 ? "s" : ""} ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Pour ${nbPersonnes} personne${nbPersonnes > 1 ? "s" : ""} avec ${duree.label} d'autonomie, il faut prevoir ${budget.surfaceTotale} m² : ${nbPersonnes * 5} m² d'espace de vie, 10 m² d'espaces communs et ${budget.surfaceTotale - nbPersonnes * 5 - 10} m² de stockage pour l'eau et la nourriture.`,
                },
              },
            ],
          }),
        }}
      />

      <Breadcrumb
        currentPage={`${nbPersonnes} pers. / ${duree.label} / ${type.label}`}
        parentPage="Simulateur Bunker"
        parentHref="/simulateur-bunker"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🛡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Bunker {type.label} &mdash; {nbPersonnes} personne
          {nbPersonnes > 1 ? "s" : ""}, {duree.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Budget estime pour un bunker {type.label.toLowerCase()} de{" "}
        {budget.surfaceTotale} m² avec {duree.label} d&apos;autonomie.
      </p>

      {/* ── Resultat principal ── */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-8 text-white mb-8">
        <p className="text-amber-100 text-sm font-medium mb-1">
          Budget total estime
        </p>
        <p className="text-4xl font-extrabold">{formatPrix(budget.total)}</p>
        <p className="text-amber-200 text-sm mt-1">
          soit {formatPrix(Math.round(budget.total / nbPersonnes))} par personne
        </p>
      </div>

      {/* ── Detail ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Construction
          </p>
          <p className="text-xl font-bold text-amber-700 mt-1">
            {formatPrix(budget.prixConstruction)}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {budget.surfaceTotale} m² × {formatPrix(type.prixM2)}/m²
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Equipements
          </p>
          <p className="text-xl font-bold text-blue-700 mt-1">
            {formatPrix(budget.prixEquipements)}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Ventilation, portes, electrique...
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Nourriture
          </p>
          <p className="text-xl font-bold text-green-700 mt-1">
            {formatPrix(budget.prixNourriture)}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {(nbPersonnes * 2000 * duree.jours).toLocaleString("fr-FR")} kcal
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Eau
          </p>
          <p className="text-xl font-bold text-cyan-700 mt-1">
            {formatPrix(budget.prixEau)}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {budget.litresEau.toLocaleString("fr-FR")} litres (
            {Math.round((budget.litresEau / 1000) * 10) / 10} m³)
          </p>
        </div>
      </div>

      {/* ── Informations cles ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Ce bunker en detail
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">
              Surface et agencement
            </h3>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>
                <strong>{nbPersonnes * 5} m²</strong> d&apos;espace de vie ({nbPersonnes}{" "}
                × 5 m²)
              </li>
              <li>
                <strong>10 m²</strong> d&apos;espaces communs (cuisine, sanitaires)
              </li>
              <li>
                <strong>
                  {budget.surfaceTotale - nbPersonnes * 5 - 10} m²
                </strong>{" "}
                de stockage (eau, nourriture, materiel)
              </li>
              <li>
                Hauteur sous plafond : <strong>2,5 m</strong> minimum
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">
              Consommation quotidienne
            </h3>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>
                Eau : <strong>{nbPersonnes * 3} L/jour</strong> ({nbPersonnes} × 3 L)
              </li>
              <li>
                Nourriture :{" "}
                <strong>
                  {(nbPersonnes * 2000).toLocaleString("fr-FR")} kcal/jour
                </strong>
              </li>
              <li>
                Cout journalier :{" "}
                <strong>
                  {formatPrix(
                    Math.round(nbPersonnes * 8 + nbPersonnes * 3 * 0.5)
                  )}
                  /jour
                </strong>
              </li>
              <li>
                Duree : <strong>{duree.jours} jours</strong> ({duree.label})
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Avertissement */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-8">
        <p className="font-semibold mb-1">Estimation indicative</p>
        <p className="text-amber-700">
          Les prix varient selon la region, le terrain et les prestataires. Ce
          simulateur donne un ordre de grandeur. Consultez un professionnel pour
          un devis reel.
        </p>
      </div>

      {/* Calculateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Personnalisez votre simulation
      </h2>
      <SimulateurBunker />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* ── Liens internes : meme config, autre type ── */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {nbPersonnes} personne{nbPersonnes > 1 ? "s" : ""}, {duree.label}{" "}
          &mdash; Autres types de bunker
        </h2>
        <div className="flex flex-wrap gap-2">
          {autresTypes.map((t) => {
            const b = calculerBudget(nbPersonnes, duree.jours, t.prixM2);
            return (
              <a
                key={t.slug}
                href={`/simulateur-bunker/${nbPersonnes}-personne${nbPersonnes > 1 ? "s" : ""}-${duree.slug}-${t.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 hover:text-amber-800 hover:bg-amber-50 transition-all"
              >
                {t.label} &mdash; {formatPrix(b.total)}
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Liens internes : meme type, autre duree ── */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Bunker {type.label} {nbPersonnes} pers. &mdash; Autres durees
        </h2>
        <div className="flex flex-wrap gap-2">
          {autresDurees.map((d) => {
            const b = calculerBudget(nbPersonnes, d.jours, type.prixM2);
            return (
              <a
                key={d.slug}
                href={`/simulateur-bunker/${nbPersonnes}-personne${nbPersonnes > 1 ? "s" : ""}-${d.slug}-${type.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 hover:text-amber-800 hover:bg-amber-50 transition-all"
              >
                {d.label} &mdash; {formatPrix(b.total)}
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Liens internes : autre nombre de personnes ── */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Bunker {type.label} {duree.label} &mdash; Autre taille
        </h2>
        <div className="flex flex-wrap gap-2">
          {autresPersonnes.map((p) => {
            const b = calculerBudget(p, duree.jours, type.prixM2);
            return (
              <a
                key={p}
                href={`/simulateur-bunker/${p}-personne${p > 1 ? "s" : ""}-${duree.slug}-${type.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 hover:text-amber-800 hover:bg-amber-50 transition-all"
              >
                {p} pers. &mdash; {formatPrix(b.total)}
              </a>
            );
          })}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-bunker" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
