import type { Metadata } from "next";
import CalculateurProduitEnCroix from "../CalculateurProduitEnCroix";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const EXEMPLES = [
  { a: 2, b: 5, c: 6 }, { a: 2, b: 5, c: 10 }, { a: 3, b: 4, c: 9 }, { a: 3, b: 6, c: 12 },
  { a: 4, b: 5, c: 8 }, { a: 4, b: 7, c: 12 }, { a: 5, b: 8, c: 10 }, { a: 5, b: 3, c: 15 },
  { a: 6, b: 10, c: 9 }, { a: 7, b: 3, c: 14 }, { a: 8, b: 5, c: 16 }, { a: 10, b: 4, c: 25 },
  { a: 10, b: 15, c: 20 }, { a: 12, b: 8, c: 18 }, { a: 15, b: 20, c: 30 }, { a: 20, b: 50, c: 40 },
  { a: 25, b: 100, c: 50 }, { a: 50, b: 75, c: 100 }, { a: 100, b: 250, c: 40 }, { a: 100, b: 150, c: 200 },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function parseSlug(slug: string): { a: number; b: number; c: number } | null {
  const match = slug.match(/^(\d+)-sur-(\d+)-egale-(\d+)-sur-x$/);
  if (!match) return null;
  const a = parseInt(match[1]);
  const b = parseInt(match[2]);
  const c = parseInt(match[3]);
  if (a === 0) return null;
  return { a, b, c };
}

export function generateStaticParams() {
  return EXEMPLES.map((ex) => ({ params: `${ex.a}-sur-${ex.b}-egale-${ex.c}-sur-x` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { a, b, c } = parsed;
  const d = (b * c) / a;

  return {
    alternates: { canonical: `/produit-en-croix/${slug}` },
    title: `Produit en croix : ${a}/${b} = ${c}/? → ${fmtInt(d)}`,
    description: `Produit en croix : si ${a}/${b} = ${c}/x, alors x = ${fmtInt(d)}. Calcul detaille, verification et formule.`,
    keywords: `produit en croix ${a} ${b} ${c}, regle de trois ${a} ${b} ${c}, ${a} sur ${b} egale ${c} sur, proportionnalite`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { a, b, c } = parsed;
  const d = (b * c) / a;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Si ${a}/${b} = ${c}/x, combien vaut x ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `x = (${b} x ${c}) / ${a} = ${fmtInt(d)}. On multiplie les deux valeurs en diagonale (${b} x ${c} = ${b * c}) puis on divise par la valeur restante (${a}).`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb currentPage={`${a}/${b} = ${c}/?`} parentPage="Produit en Croix" parentHref="/produit-en-croix" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ✖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {a}/{b} = {c}/? — Produit en Croix
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Resolution detaillee de ce produit en croix avec verification.
      </p>

      {/* Resultat */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg shadow-sky-200/50 mb-8">
        <div className="flex items-center justify-center gap-6 text-2xl mb-4">
          <div className="text-center">
            <p className="font-bold">{a}</p>
            <div className="w-12 h-px bg-white/50 my-1" />
            <p className="font-bold">{b}</p>
          </div>
          <p className="text-3xl">=</p>
          <div className="text-center">
            <p className="font-bold">{c}</p>
            <div className="w-12 h-px bg-white/50 my-1" />
            <p className="font-extrabold text-yellow-300">{fmt(d)}</p>
          </div>
        </div>
        <p className="text-center text-sky-200">x = <span className="text-3xl font-extrabold text-white">{fmt(d)}</span></p>
      </div>

      {/* Calcul detaille */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Calcul detaille</h2>
        <div className="bg-sky-50/50 rounded-xl p-4 text-sm text-slate-700 space-y-1">
          <p>On cherche x tel que {a}/{b} = {c}/x</p>
          <p>x = (B &times; C) &divide; A</p>
          <p>x = ({b} &times; {c}) &divide; {a}</p>
          <p>x = {b * c} &divide; {a}</p>
          <p className="font-bold text-sky-600">x = {fmt(d)}</p>
        </div>
      </div>

      {/* Verification */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Verification</h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-400">{a} &divide; {b}</p>
            <p className="text-lg font-bold text-slate-800">{fmt(a / b)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-400">{c} &divide; {fmtInt(d)}</p>
            <p className="text-lg font-bold text-slate-800">{fmt(c / d)}</p>
          </div>
        </div>
        <p className="text-xs text-green-600 font-medium text-center mt-2">Les deux rapports sont egaux</p>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurProduitEnCroix />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Produit en croix {a}/{b} = {c}/x
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si <strong>{a}</strong> est a <strong>{b}</strong> ce que <strong>{c}</strong> est a <strong>x</strong>,
          alors <strong>x = {fmt(d)}</strong>. Le rapport de proportionnalite est de {fmt(a / b)}.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Ce type de calcul est utile dans de nombreuses situations : adapter une recette,
          convertir des unites, calculer des pourcentages, des echelles de carte, etc.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres exemples</h2>
        <div className="flex flex-wrap gap-2">
          {EXEMPLES.filter((ex) => !(ex.a === a && ex.b === b && ex.c === c)).slice(0, 10).map((ex) => (
            <a
              key={`${ex.a}-${ex.b}-${ex.c}`}
              href={`/produit-en-croix/${ex.a}-sur-${ex.b}-egale-${ex.c}-sur-x`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
            >
              {ex.a}/{ex.b} = {ex.c}/?
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/produit-en-croix" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
