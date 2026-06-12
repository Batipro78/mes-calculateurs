import type { Metadata } from "next";
import CalculateurLodeom from "../CalculateurLodeom";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerLodeom, fmtEur, fmtPct, BAREMES_INFO, type Bareme } from "../lodeomCalc";

const BAREMES_SLUGS: Record<string, Bareme> = {
  "competitivite": "competitivite",
  "competitivite-renforcee": "competitivite-renforcee",
  "innovation-croissance": "innovation-croissance",
};

const SALAIRES_SLUGS: Record<string, number> = {
  "2000": 2000,
  "2500": 2500,
  "3000": 3000,
  "3500": 3500,
};

interface SlugData {
  slug: string;
  bareme: Bareme;
  salaireMensuel: number;
}

function parseSlug(slug: string): SlugData | null {
  const match = slug.match(/^(competitivite|competitivite-renforcee|innovation-croissance)-(\d+)-euros$/);
  if (!match) return null;
  const baremeKey = match[1];
  const salaireKey = match[2];
  const bareme = BAREMES_SLUGS[baremeKey];
  const salaireMensuel = SALAIRES_SLUGS[salaireKey];
  if (!bareme || !salaireMensuel) return null;
  return { slug, bareme, salaireMensuel };
}

export function generateStaticParams() {
  const baremes = ["competitivite", "competitivite-renforcee", "innovation-croissance"];
  const salaires = ["2000", "2500", "3000", "3500"];
  return baremes.flatMap((b) => salaires.map((s) => ({ params: `${b}-${s}-euros` })));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const data = parseSlug(slug);
  if (!data) return {};

  const res = calculerLodeom({
    bareme: data.bareme,
    effectif: "moins-11",
    salaireMensuelBrut: data.salaireMensuel,
  });

  const baremeLabel = BAREMES_INFO[data.bareme].label;

  return {
    alternates: { canonical: `/calcul-exoneration-lodeom/${slug}` },
    title: `LODEOM ${baremeLabel} — ${data.salaireMensuel} EUR/mois : exoneration ${fmtEur(res.exonerationAnnuelle)}/an`,
    description: `Calcul LODEOM bareme ${baremeLabel} pour un salaire de ${data.salaireMensuel} EUR par mois : coefficient ${res.coefficient.toFixed(4)}, exoneration ${fmtEur(res.exonerationAnnuelle)} par an (${fmtEur(res.exonerationMensuelle)}/mois), soit ${fmtPct(res.pourcentageBrut)} du salaire brut. Simulation detaillee 2026.`,
    keywords: `LODEOM ${data.salaireMensuel} euros, exoneration LODEOM ${data.bareme}, calcul LODEOM ${data.salaireMensuel}, cotisations patronales outre-mer`,
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const data = parseSlug(slug);
  if (!data) notFound();

  const res = calculerLodeom({
    bareme: data.bareme,
    effectif: "moins-11",
    salaireMensuelBrut: data.salaireMensuel,
  });

  const baremeLabel = BAREMES_INFO[data.bareme].label;

  const zoneLabel =
    res.zone === "totale"
      ? "Exoneration totale (coefficient = T)"
      : res.zone === "degressive"
      ? "Exoneration degressive"
      : "Hors plafond — exoneration nulle";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle est l'exoneration LODEOM pour ${data.salaireMensuel} EUR par mois avec le bareme ${baremeLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour un salaire de ${data.salaireMensuel} EUR par mois (${fmtEur(res.remAnnuelle)} par an) avec le bareme LODEOM ${baremeLabel} et une entreprise de moins de 11 salaries (T = ${res.T}), le ratio salaire/SMIC est de ${res.ratioSmic.toFixed(3)}, ce qui correspond a une zone ${res.zone}. Le coefficient applique est ${res.coefficient.toFixed(4)}, l'exoneration annuelle est de ${fmtEur(res.exonerationAnnuelle)} (${fmtEur(res.exonerationMensuelle)} par mois), soit ${fmtPct(res.pourcentageBrut)} du salaire brut exonere.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment est calcule le coefficient LODEOM pour ${data.salaireMensuel} EUR avec le bareme ${baremeLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour le bareme ${baremeLabel}, l'exoneration totale s'applique jusqu'a ${res.seuilBas} SMIC et devient nulle a partir de ${res.seuilHaut} SMIC. Avec ${data.salaireMensuel} EUR par mois, le ratio est ${res.ratioSmic.toFixed(3)} SMIC, donc la situation est : ${zoneLabel}. Le coefficient est ${res.coefficient.toFixed(4)} et l'exoneration est ${fmtEur(res.exonerationAnnuelle)} par an.`,
        },
      },
      {
        "@type": "Question",
        name: "Peut-on cumuler cette exoneration LODEOM avec la reduction generale 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non, la LODEOM et la reduction generale degressive unique (LFSS 2026) ne se cumulent pas. L'employeur doit choisir le dispositif le plus avantageux pour chaque salarie. Pour la plupart des salaires en DOM, la LODEOM offre une exoneration superieure car ses plafonds (1,3 a 3,5 SMIC selon le bareme) depassent le plafond de 1,6 SMIC de la reduction generale.",
        },
      },
    ],
  };

  // Autres variantes du meme bareme
  const autresVariantes = Object.keys(SALAIRES_SLUGS)
    .filter((s) => parseInt(s) !== data.salaireMensuel)
    .map((s) => ({
      slug: `${data.bareme}-${s}-euros`,
      label: `${s} EUR/mois`,
    }));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb
        currentPage={`LODEOM ${baremeLabel} — ${data.salaireMensuel} EUR/mois`}
        parentPage="Calcul Exoneration LODEOM"
        parentHref="/calcul-exoneration-lodeom"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌴
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          LODEOM {baremeLabel} — {data.salaireMensuel} EUR/mois
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation LODEOM 2026 pour un salaire de {data.salaireMensuel} EUR par mois, bareme {baremeLabel}, entreprise de moins de 11 salaries.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg shadow-blue-200/50 mb-8">
        <p className="text-blue-100 mb-1">Exoneration LODEOM annuelle</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmtEur(res.exonerationAnnuelle)}</p>
        <p className="text-blue-100 mt-2">
          Soit {fmtEur(res.exonerationMensuelle)} par mois — {fmtPct(res.pourcentageBrut)} du salaire brut exonere
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-100">Remuneration annuelle</p>
            <p className="font-semibold">{fmtEur(res.remAnnuelle)}</p>
          </div>
          <div>
            <p className="text-blue-100">Ratio salaire / SMIC</p>
            <p className="font-semibold">{res.ratioSmic.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-blue-100">Coefficient</p>
            <p className="font-semibold">{res.coefficient.toFixed(4)}</p>
          </div>
        </div>
      </div>

      {/* Detail du calcul */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail du calcul</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Salaire mensuel brut</td>
              <td className="py-2 text-right font-semibold text-slate-800">{data.salaireMensuel.toLocaleString("fr-FR")} EUR</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Remuneration annuelle (x 12)</td>
              <td className="py-2 text-right font-semibold text-slate-800">{fmtEur(res.remAnnuelle)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">SMIC annuel 2026</td>
              <td className="py-2 text-right font-semibold text-slate-800">{fmtEur(res.smicAnnuel)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Ratio remuneration / SMIC</td>
              <td className="py-2 text-right font-semibold text-slate-800">{res.ratioSmic.toFixed(4)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Bareme</td>
              <td className="py-2 text-right font-semibold text-slate-800">{baremeLabel}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Taux T (moins de 11 salaries)</td>
              <td className="py-2 text-right font-semibold text-slate-800">{res.T}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Zone d&apos;exoneration</td>
              <td className="py-2 text-right font-semibold text-slate-800">{zoneLabel}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Coefficient (arrondi 4 dec.)</td>
              <td className="py-2 text-right font-semibold text-slate-800">{res.coefficient.toFixed(4)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 text-slate-600">Exoneration annuelle</td>
              <td className="py-2 text-right font-bold text-blue-700 text-base">{fmtEur(res.exonerationAnnuelle)}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-600">Exoneration mensuelle</td>
              <td className="py-2 text-right font-bold text-blue-700 text-base">{fmtEur(res.exonerationMensuelle)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Personnaliser la simulation</h2>
      <CalculateurLodeom />

      {/* Autres variantes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres salaires — bareme {baremeLabel}</h2>
        <div className="flex flex-wrap gap-2">
          {autresVariantes.map((v) => (
            <a
              key={v.slug}
              href={`/calcul-exoneration-lodeom/${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {v.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-exoneration-lodeom" />
    </div>
  );
}
