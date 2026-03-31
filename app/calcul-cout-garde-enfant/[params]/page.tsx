import type { Metadata } from "next";
import SimulateurGardeEnfant from "../SimulateurGardeEnfant";
import { calcGardeEnfant, MODES, MODE_LABELS, MODE_EMOJIS, type ModeGarde } from "../calcGardeEnfant";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const REVENUS_SEO = [20000, 30000, 40000, 50000, 60000, 80000];
const ENFANTS_SEO = [1, 2, 3];
const MODE_SLUGS: Record<string, ModeGarde> = {
  creche: "creche",
  "assistante-maternelle": "assmat",
  "garde-domicile": "domicile",
  "micro-creche": "microcreche",
};
const SLUG_TO_LABEL: Record<string, string> = {
  creche: "en creche",
  "assistante-maternelle": "chez une assistante maternelle",
  "garde-domicile": "a domicile",
  "micro-creche": "en micro-creche",
};

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const r of REVENUS_SEO) {
    for (const e of ENFANTS_SEO) {
      for (const m of Object.keys(MODE_SLUGS)) {
        params.push({ params: `${r}-euros-${e}-enfant${e > 1 ? "s" : ""}-${m}` });
      }
    }
  }
  return params;
}

type Props = { params: Promise<{ params: string }> };

function parseSlug(slug: string) {
  const match = slug.match(/^(\d+)-euros-(\d+)-enfants?-(.+)$/);
  if (!match) return null;
  const revenu = parseInt(match[1]);
  const enfants = parseInt(match[2]);
  const modeSlug = match[3];
  const mode = MODE_SLUGS[modeSlug];
  if (!mode || !REVENUS_SEO.includes(revenu) || !ENFANTS_SEO.includes(enfants)) return null;
  return { revenu, enfants, mode, modeSlug };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const sim = calcGardeEnfant(parsed.mode, parsed.revenu, parsed.enfants, 1, 40, 1);
  const label = SLUG_TO_LABEL[parsed.modeSlug];

  return {
    title: `Cout garde enfant ${label} — ${fmtInt(parsed.revenu)} €/an, ${parsed.enfants} enfant${parsed.enfants > 1 ? "s" : ""} : ${fmt(sim.coutMensuelNet)} €/mois`,
    description: `Calculez le cout d'une garde ${label} pour un foyer a ${fmtInt(parsed.revenu)} €/an avec ${parsed.enfants} enfant${parsed.enfants > 1 ? "s" : ""}. Cout net apres aides : ${fmt(sim.coutMensuelNet)} €/mois. CMG, credit impot 50% inclus.`,
  };
}

export default async function Page({ params }: Props) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { revenu, enfants, mode, modeSlug } = parsed;
  const label = SLUG_TO_LABEL[modeSlug];

  const sim = calcGardeEnfant(mode, revenu, enfants, 1, 40, 1);

  // Comparaison tous modes pour ce revenu
  const compModes = MODES.map((m) => {
    const s = calcGardeEnfant(m, revenu, enfants, 1, 40, 1);
    return { ...s };
  });

  // Comparaison par revenu pour ce mode
  const compRevenus = REVENUS_SEO.map((r) => {
    const s = calcGardeEnfant(mode, r, enfants, 1, 40, 1);
    return { revenu: r, ...s };
  });

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
                name: `Combien coute une garde ${label} pour ${fmtInt(revenu)} €/an de revenus ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Pour un foyer gagnant ${fmtInt(revenu)} €/an avec ${enfants} enfant${enfants > 1 ? "s" : ""}, la garde ${label} coute ${fmt(sim.coutMensuelBrut)} €/mois brut. Apres CMG (${fmt(sim.cmgMensuel)} €/mois) et credit d'impot (${fmtInt(sim.creditImpotAnnuel)} €/an), le cout net reel est de ${fmt(sim.coutMensuelNet)} €/mois.`,
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage={`Garde ${label}`} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          👶
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Cout garde enfant {label} — {fmtInt(revenu)} €/an
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation pour {enfants} enfant{enfants > 1 ? "s" : ""} a charge,
        garde {label}, 40h/semaine.
      </p>

      {/* Resultat */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-300 rounded-2xl p-6 mb-8">
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-pink-700 mb-1">
            {MODE_EMOJIS[mode]} Cout net mensuel {label}
          </div>
          <div className="text-5xl font-black text-pink-700">{fmt(sim.coutMensuelNet)} €</div>
          <div className="text-sm text-pink-600 mt-1">
            soit {fmtInt(sim.coutAnnuelNet)} €/an apres aides
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Cout brut</div>
            <div className="text-xl font-bold text-slate-800">{fmt(sim.coutMensuelBrut)} €/mois</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">CMG (aide CAF)</div>
            <div className="text-xl font-bold text-green-600">
              {sim.cmgMensuel > 0 ? `-${fmt(sim.cmgMensuel)} €` : "—"}
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Credit impot 50%</div>
            <div className="text-xl font-bold text-green-600">-{fmtInt(sim.creditImpotAnnuel)} €/an</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500">Tarif horaire</div>
            <div className="text-xl font-bold text-slate-800">{fmt(sim.tarifHoraire)} €/h</div>
          </div>
        </div>
      </div>

      <SimulateurGardeEnfant />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Comparaison modes */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison des modes ({fmtInt(revenu)} €/an, {enfants} enfant{enfants > 1 ? "s" : ""})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Mode</th>
                <th className="text-center p-3 font-semibold text-slate-700">Brut/mois</th>
                <th className="text-center p-3 font-semibold text-slate-700">Aides/mois</th>
                <th className="text-center p-3 font-semibold text-slate-700">Net/mois</th>
              </tr>
            </thead>
            <tbody>
              {compModes.map((r) => (
                <tr key={r.mode} className={`border-b border-slate-100 ${r.mode === mode ? "bg-pink-50 font-bold" : ""}`}>
                  <td className="p-3 text-slate-700">{MODE_EMOJIS[r.mode]} {MODE_LABELS[r.mode]}</td>
                  <td className="p-3 text-center">{fmt(r.coutMensuelBrut)} €</td>
                  <td className="p-3 text-center text-green-600">-{fmt(r.cmgMensuel + r.creditImpotAnnuel / 12)} €</td>
                  <td className="p-3 text-center font-bold text-pink-700">{fmt(r.coutMensuelNet)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par revenu */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {MODE_LABELS[mode]} selon les revenus
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700">Revenus/an</th>
                <th className="text-center p-3 font-semibold text-slate-700">Tarif/h</th>
                <th className="text-center p-3 font-semibold text-slate-700">Brut/mois</th>
                <th className="text-center p-3 font-semibold text-slate-700">Net/mois</th>
              </tr>
            </thead>
            <tbody>
              {compRevenus.map((r) => (
                <tr key={r.revenu} className={`border-b border-slate-100 ${r.revenu === revenu ? "bg-pink-50 font-bold" : ""}`}>
                  <td className="p-3 text-slate-700">{fmtInt(r.revenu)} €</td>
                  <td className="p-3 text-center">{fmt(r.tarifHoraire)} €</td>
                  <td className="p-3 text-center">{fmt(r.coutMensuelBrut)} €</td>
                  <td className="p-3 text-center font-bold text-pink-700">{fmt(r.coutMensuelNet)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-cout-garde-enfant" />
    </div>
  );
}
