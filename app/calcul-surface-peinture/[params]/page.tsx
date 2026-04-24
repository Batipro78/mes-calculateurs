import type { Metadata } from "next";
import CalculateurSurfacePeinture from "../CalculateurSurfacePeinture";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

interface PieceType {
  slug: string;
  nom: string;
  surfaces: number[];
  portes: number;
  fenetres: number;
  description: string;
}

const TYPES_PIECES: PieceType[] = [
  { slug: "chambre", nom: "Chambre", surfaces: [9, 10, 12, 14], portes: 1, fenetres: 1, description: "Piece de repos — 2 couches de peinture acrylique mate recommandees." },
  { slug: "salon", nom: "Salon", surfaces: [18, 20, 25, 30, 35], portes: 1, fenetres: 2, description: "Piece de vie principale — peinture satinee ou velours pour un rendu lumineux." },
  { slug: "cuisine", nom: "Cuisine", surfaces: [8, 10, 12, 15], portes: 1, fenetres: 1, description: "Piece humide — privilegier une peinture lessivable (glycero ou acrylique satinee)." },
  { slug: "salle-de-bain", nom: "Salle de bain", surfaces: [4, 5, 6, 8], portes: 1, fenetres: 0, description: "Piece tres humide — peinture anti-humidite ou glycero indispensable." },
  { slug: "bureau", nom: "Bureau", surfaces: [8, 10, 12], portes: 1, fenetres: 1, description: "Piece calme — peinture mate ou satinee selon vos preferences." },
  { slug: "couloir", nom: "Couloir", surfaces: [4, 6, 8], portes: 2, fenetres: 0, description: "Zone de passage — peinture satinee lessivable recommandee." },
  { slug: "studio", nom: "Studio", surfaces: [15, 20, 25], portes: 1, fenetres: 1, description: "Piece unique a vivre — combiner plusieurs finitions selon les zones." },
];

const HAUTEUR = 2.5;
const SURFACE_PORTE = 1.89;
const SURFACE_FENETRE = 1.44;
const RENDEMENT = 10;
const NB_COUCHES = 2;
const PRIX_LITRE = 25;

function fmt(n: number, dec = 2): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getDimensions(surface: number): { longueur: number; largeur: number } {
  const largeur = Math.sqrt(surface / 1.25);
  const longueur = largeur * 1.25;
  return { longueur: Math.round(longueur * 10) / 10, largeur: Math.round(largeur * 10) / 10 };
}

function calcul(surface: number, piece: PieceType) {
  const { longueur, largeur } = getDimensions(surface);
  const perimetre = 2 * (longueur + largeur);
  const surfaceMurs = perimetre * HAUTEUR;
  const deductions = piece.portes * SURFACE_PORTE + piece.fenetres * SURFACE_FENETRE;
  const surfaceNette = surfaceMurs - deductions;
  const surfacePlafond = surface;
  const surfaceTotale = surfaceNette + surfacePlafond;
  const surfaceAvecCouches = surfaceTotale * NB_COUCHES;
  const litres = surfaceAvecCouches / RENDEMENT;
  const budget = litres * PRIX_LITRE;
  return { longueur, largeur, perimetre, surfaceMurs, deductions, surfaceNette, surfacePlafond, surfaceTotale, surfaceAvecCouches, litres, budget };
}

function parseSlug(slug: string): { typeSlug: string; surface: number } | null {
  const match = slug.match(/^(.+)-(\d+)-m2$/);
  if (!match) return null;
  return { typeSlug: match[1], surface: parseInt(match[2]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const type of TYPES_PIECES) {
    for (const s of type.surfaces) {
      params.push({ params: `${type.slug}-${s}-m2` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { typeSlug, surface } = parsed;
  const piece = TYPES_PIECES.find((p) => p.slug === typeSlug);
  if (!piece || !piece.surfaces.includes(surface)) return {};

  const r = calcul(surface, piece);

  return {
    alternates: { canonical: `/calcul-surface-peinture/${slug}` },
    title: `Peinture ${piece.nom} ${surface} m2 - Surface et quantite (2026)`,
    description: `${piece.nom} de ${surface} m2 : ${fmt(r.surfaceTotale)} m2 a peindre, ${fmt(r.litres)} litres necessaires (2 couches). Budget estime : ${fmtInt(Math.ceil(r.budget))} EUR. Calcul gratuit.`,
    keywords: `peinture ${piece.nom.toLowerCase()} ${surface}m2, surface peinture ${piece.nom.toLowerCase()}, quantite peinture ${surface} m2, combien litres peinture ${piece.nom.toLowerCase()}`,
    openGraph: {
      title: `Peinture ${piece.nom} ${surface} m2 = ${fmt(r.litres)} litres`,
      description: `${piece.nom} de ${surface} m2 : ${fmt(r.surfaceTotale)} m2 a peindre, ${fmt(r.litres)} litres, budget ~${fmtInt(Math.ceil(r.budget))} EUR.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { typeSlug, surface } = parsed;
  const piece = TYPES_PIECES.find((p) => p.slug === typeSlug);
  if (!piece || !piece.surfaces.includes(surface)) notFound();

  const r = calcul(surface, piece);

  // Tableau des autres surfaces pour ce type de piece
  const tableauSurfaces = piece.surfaces.map((s) => ({
    surface: s,
    ...calcul(s, piece),
    isCurrent: s === surface,
  }));

  // Tableau des autres types pour cette surface
  const tableauTypes = TYPES_PIECES.filter((p) => p.surfaces.includes(surface) || Math.abs(p.surfaces[0] - surface) < 10).map((p) => {
    const surfaceProche = p.surfaces.includes(surface) ? surface : p.surfaces.reduce((a, b) => Math.abs(b - surface) < Math.abs(a - surface) ? b : a);
    return {
      ...p,
      surfaceUtilisee: surfaceProche,
      ...calcul(surfaceProche, p),
      isCurrent: p.slug === typeSlug && surfaceProche === surface,
    };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de peinture pour une ${piece.nom.toLowerCase()} de ${surface} m2 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour une ${piece.nom.toLowerCase()} de ${surface} m2, il faut environ ${fmt(r.litres)} litres de peinture (2 couches, rendement 10 m2/L). La surface totale a peindre est de ${fmt(r.surfaceTotale)} m2 (murs + plafond, ouvertures deduites). Budget estime : ${fmtInt(Math.ceil(r.budget))} EUR.`,
        },
      },
      {
        "@type": "Question",
        name: `Quelle est la surface des murs d'une ${piece.nom.toLowerCase()} de ${surface} m2 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Une ${piece.nom.toLowerCase()} de ${surface} m2 (environ ${r.longueur}m x ${r.largeur}m) a une surface de murs d'environ ${fmt(r.surfaceMurs)} m2 bruts. Apres deduction des ouvertures (${piece.portes} porte(s), ${piece.fenetres} fenetre(s) = ${fmt(r.deductions)} m2), la surface nette est de ${fmt(r.surfaceNette)} m2.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${piece.nom} ${surface} m2`} parentPage="Surface Peinture" parentHref="/calcul-surface-peinture" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎨
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Peinture {piece.nom} {surface} m&sup2;
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Quantite de peinture et budget pour une {piece.nom.toLowerCase()} de {surface} m&sup2;. {piece.description}
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white rounded-2xl p-8 shadow-lg shadow-fuchsia-200/50 mb-8">
        <p className="text-fuchsia-200 mb-1">{piece.nom} {surface} m&sup2; =</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmt(r.litres)} <span className="text-2xl font-semibold">litres</span>
        </p>
        <p className="text-fuchsia-200 mt-1">de peinture (2 couches, acrylique 10 m&sup2;/L)</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-fuchsia-200">Dimensions</p>
            <p className="font-semibold">{r.longueur}m x {r.largeur}m</p>
          </div>
          <div>
            <p className="text-fuchsia-200">Surface murs</p>
            <p className="font-semibold">{fmt(r.surfaceNette)} m&sup2;</p>
          </div>
          <div>
            <p className="text-fuchsia-200">Plafond</p>
            <p className="font-semibold">{fmt(r.surfacePlafond)} m&sup2;</p>
          </div>
          <div>
            <p className="text-fuchsia-200">Budget estime</p>
            <p className="font-semibold">{fmtInt(Math.ceil(r.budget))} EUR</p>
          </div>
        </div>
      </div>

      {/* Detail du calcul */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Dimensions estimees</span>
            <span className="font-medium text-slate-800">{r.longueur}m x {r.largeur}m (hauteur {HAUTEUR}m)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Perimetre</span>
            <span className="font-medium text-slate-800">{fmt(r.perimetre)} m</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Surface brute murs</span>
            <span className="font-medium text-slate-800">{fmt(r.surfaceMurs)} m&sup2;</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Deductions ({piece.portes} porte(s), {piece.fenetres} fenetre(s))</span>
            <span className="font-medium text-red-600">-{fmt(r.deductions)} m&sup2;</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Surface nette murs</span>
            <span className="font-medium text-slate-800">{fmt(r.surfaceNette)} m&sup2;</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Plafond</span>
            <span className="font-medium text-slate-800">{fmt(r.surfacePlafond)} m&sup2;</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Surface totale (1 couche)</span>
            <span className="font-bold text-slate-800">{fmt(r.surfaceTotale)} m&sup2;</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Surface totale ({NB_COUCHES} couches)</span>
            <span className="font-bold text-fuchsia-600">{fmt(r.surfaceAvecCouches)} m&sup2;</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Peinture necessaire ({RENDEMENT} m&sup2;/L)</span>
            <span className="font-bold text-fuchsia-600">{fmt(r.litres)} litres</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Budget ({PRIX_LITRE} EUR/L)</span>
            <span className="font-bold text-fuchsia-600">{fmtInt(Math.ceil(r.budget))} EUR</span>
          </div>
        </div>
      </div>

      {/* Tableau surfaces pour ce type */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Peinture {piece.nom} — toutes les surfaces
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Surface</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">A peindre</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Budget</th>
              </tr>
            </thead>
            <tbody>
              {tableauSurfaces.map((row) => (
                <tr key={row.surface} className={`border-b border-slate-100 ${row.isCurrent ? "bg-fuchsia-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-fuchsia-600">{piece.nom} {row.surface} m&sup2;</span>
                    ) : (
                      <a href={`/calcul-surface-peinture/${piece.slug}-${row.surface}-m2`} className="text-slate-700 hover:text-fuchsia-600 transition-colors">
                        {piece.nom} {row.surface} m&sup2;
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-fuchsia-600" : "text-slate-700"}`}>
                    {fmt(row.surfaceTotale)} m&sup2;
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-fuchsia-600" : "text-slate-700"}`}>
                    {fmt(row.litres)} L
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-fuchsia-600" : "text-slate-700"}`}>
                    {fmtInt(Math.ceil(row.budget))} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau autres types de pieces */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par type de piece
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Piece</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Surface</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Budget</th>
              </tr>
            </thead>
            <tbody>
              {tableauTypes.map((row) => (
                <tr key={row.slug} className={`border-b border-slate-100 ${row.isCurrent ? "bg-fuchsia-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className="font-bold text-fuchsia-600">{row.nom} {row.surfaceUtilisee} m&sup2;</span>
                    ) : (
                      <a href={`/calcul-surface-peinture/${row.slug}-${row.surfaceUtilisee}-m2`} className="text-slate-700 hover:text-fuchsia-600 transition-colors">
                        {row.nom} {row.surfaceUtilisee} m&sup2;
                      </a>
                    )}
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-fuchsia-600" : "text-slate-700"}`}>
                    {fmt(row.surfaceTotale)} m&sup2;
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? "text-fuchsia-600" : "text-slate-700"}`}>
                    {fmt(row.litres)} L
                  </td>
                  <td className={`py-2.5 px-2 text-right ${row.isCurrent ? "font-bold text-fuchsia-600" : "text-slate-700"}`}>
                    {fmtInt(Math.ceil(row.budget))} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurSurfacePeinture />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Peindre une {piece.nom.toLowerCase()} de {surface} m&sup2;
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour peindre une <strong>{piece.nom.toLowerCase()} de {surface} m&sup2;</strong> (dimensions approximatives {r.longueur}m x {r.largeur}m),
          vous aurez besoin d&apos;environ <strong>{fmt(r.litres)} litres de peinture</strong> en 2 couches.
          La surface totale a peindre est de <strong>{fmt(r.surfaceTotale)} m&sup2;</strong> (murs + plafond, ouvertures deduites).
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le budget estime est de <strong>{fmtInt(Math.ceil(r.budget))} EUR</strong> pour une peinture de qualite moyenne a {PRIX_LITRE} EUR/litre.
          Ce budget peut varier de {fmtInt(Math.ceil(r.litres * 5))} EUR (entree de gamme) a {fmtInt(Math.ceil(r.litres * 40))} EUR (haut de gamme) selon la qualite choisie.
        </p>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 mt-4">
          <p className="text-xs text-amber-700">
            Calcul base sur une hauteur standard de {HAUTEUR}m, {piece.portes} porte(s) standard (0.90m x 2.10m)
            {piece.fenetres > 0 ? ` et ${piece.fenetres} fenetre(s) standard (1.20m x 1.20m)` : ""}.
            Prevoyez 10 a 15% de marge supplementaire pour les pertes et retouches.
          </p>
        </div>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres calculs de surface</h2>
        <div className="flex flex-wrap gap-2">
          {TYPES_PIECES.filter((p) => p.slug !== typeSlug).map((p) => (
            <a
              key={p.slug}
              href={`/calcul-surface-peinture/${p.slug}-${p.surfaces[Math.floor(p.surfaces.length / 2)]}-m2`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-fuchsia-300 hover:text-fuchsia-600 hover:bg-fuchsia-50/50 transition-all"
            >
              {p.nom} {p.surfaces[Math.floor(p.surfaces.length / 2)]} m&sup2;
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-surface-peinture" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
