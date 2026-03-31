import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SimulateurBlackout from "../SimulateurBlackout";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import {
  calcScoreAutonomie,
  calcBudgetEquipement,
  CHAUFFAGE_LABELS,
  LOGEMENT_LABELS,
  NIVEAU_LABELS,
  type LogementType,
  type ChauffageType,
} from "../blackoutCalc";

const LOGEMENTS: LogementType[] = ["appartement", "maison"];
const CHAUFFAGES: ChauffageType[] = ["tout-electrique", "gaz", "bois", "mixte"];
const NB_PERSONNES = [1, 2, 3, 4, 5];

function fmt(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function parseSlug(slug: string): { logement: LogementType; chauffage: ChauffageType; nbPersonnes: number } | null {
  const match = slug.match(/^(appartement|maison)-(tout-electrique|gaz|bois|mixte)-(\d+)-personnes?$/);
  if (!match) return null;
  return { logement: match[1] as LogementType, chauffage: match[2] as ChauffageType, nbPersonnes: parseInt(match[3]) };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const l of LOGEMENTS) {
    for (const c of CHAUFFAGES) {
      for (const n of NB_PERSONNES) {
        params.push({ params: `${l}-${c}-${n}-personnes` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  // Score avec config tout-electrique (pire cas par defaut pour cette page)
  const cuisineType = parsed.chauffage === "tout-electrique" ? "electrique" as const : "gaz" as const;
  const eauChaudeType = parsed.chauffage === "tout-electrique" ? "electrique" as const : "gaz" as const;
  const score = calcScoreAutonomie(parsed.chauffage, cuisineType, eauChaudeType, parsed.nbPersonnes, []);

  const logLabel = LOGEMENT_LABELS[parsed.logement];
  const chauffLabel = CHAUFFAGE_LABELS[parsed.chauffage].toLowerCase();
  const dureeStr = score.dureeAutonomieH >= 24
    ? `${Math.floor(score.dureeAutonomieH / 24)} jours`
    : `${score.dureeAutonomieH}h`;

  return {
    title: `Blackout ${logLabel.toLowerCase()} ${chauffLabel} (${parsed.nbPersonnes} pers.) — ${dureeStr} d'autonomie`,
    description: `${logLabel} avec chauffage ${chauffLabel}, ${parsed.nbPersonnes} personnes : score ${score.scoreTotal}/100, autonomie estimee ${dureeStr} sans electricite. Budget equipement et conseils.`,
    keywords: `blackout ${logLabel.toLowerCase()}, panne electricite ${chauffLabel}, autonomie coupure ${parsed.nbPersonnes} personnes, preparation blackout`,
    openGraph: {
      title: `Blackout : ${logLabel.toLowerCase()} ${chauffLabel} = ${dureeStr} d'autonomie`,
      description: `Score ${score.scoreTotal}/100. ${score.vulnerabilites.length} vulnerabilites detectees.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  if (!LOGEMENTS.includes(parsed.logement) || !CHAUFFAGES.includes(parsed.chauffage) || !NB_PERSONNES.includes(parsed.nbPersonnes)) {
    notFound();
  }

  const cuisineType = parsed.chauffage === "tout-electrique" ? "electrique" as const : parsed.chauffage === "gaz" || parsed.chauffage === "mixte" ? "gaz" as const : "mixte" as const;
  const eauChaudeType = parsed.chauffage === "tout-electrique" ? "electrique" as const : "gaz" as const;

  const scoreSans = calcScoreAutonomie(parsed.chauffage, cuisineType, eauChaudeType, parsed.nbPersonnes, []);
  const scoreEssentiel = calcScoreAutonomie(parsed.chauffage, cuisineType, eauChaudeType, parsed.nbPersonnes, ["lampes", "radio", "powerbank", "reserve-eau", "nourriture-seche", "couvertures"]);
  const scoreConfort = calcScoreAutonomie(parsed.chauffage, cuisineType, eauChaudeType, parsed.nbPersonnes, ["lampes", "radio", "powerbank", "reserve-eau", "nourriture-7j", "couvertures", "rechaud", "station-500"]);

  const budgetEssentiel = calcBudgetEquipement("essentiel", parsed.nbPersonnes, []);
  const budgetConfort = calcBudgetEquipement("confort", parsed.nbPersonnes, []);
  const budgetAutonome = calcBudgetEquipement("autonome", parsed.nbPersonnes, []);

  const logLabel = LOGEMENT_LABELS[parsed.logement];
  const chauffLabel = CHAUFFAGE_LABELS[parsed.chauffage];

  const dureeStr = (h: number) => h >= 24 ? `${Math.floor(h / 24)} jours` : `${h}h`;

  const niveauColor = scoreSans.niveau === "critique" ? "from-red-600 to-red-800" :
    scoreSans.niveau === "fragile" ? "from-orange-500 to-red-500" :
    scoreSans.niveau === "correct" ? "from-amber-500 to-orange-500" : "from-emerald-500 to-green-600";

  const niveauLabel = scoreSans.niveau === "critique" ? "Critique" :
    scoreSans.niveau === "fragile" ? "Fragile" :
    scoreSans.niveau === "correct" ? "Correct" : "Bien prepare";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien de temps tient un ${logLabel.toLowerCase()} ${chauffLabel.toLowerCase()} sans electricite ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sans equipement de secours, un ${logLabel.toLowerCase()} avec chauffage ${chauffLabel.toLowerCase()} pour ${parsed.nbPersonnes} personnes a une autonomie d'environ ${dureeStr(scoreSans.dureeAutonomieH)}. Avec un kit essentiel (~${fmt(budgetEssentiel.totalNeuf)} EUR), l'autonomie passe a ${dureeStr(scoreEssentiel.dureeAutonomieH)}.`,
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
        currentPage={`${logLabel} ${chauffLabel}`}
        parentPage="Simulateur Blackout"
        parentHref="/simulateur-blackout"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🔦
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Blackout : {logLabel.toLowerCase()} {chauffLabel.toLowerCase()}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Autonomie en cas de panne electrique pour {parsed.nbPersonnes} personne{parsed.nbPersonnes > 1 ? "s" : ""} — {logLabel.toLowerCase()} avec chauffage {chauffLabel.toLowerCase()}.
      </p>

      {/* Score sans equipement */}
      <div className={`bg-gradient-to-br ${niveauColor} text-white rounded-2xl p-8 shadow-lg mb-8`}>
        <p className="text-white/80 mb-1">Score sans equipement de secours</p>
        <p className="text-5xl font-extrabold tracking-tight">{scoreSans.scoreTotal}<span className="text-2xl opacity-70">/100</span></p>
        <p className="text-lg font-medium mt-1">{niveauLabel}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/70">Autonomie</p>
            <p className="font-semibold">{dureeStr(scoreSans.dureeAutonomieH)}</p>
          </div>
          <div>
            <p className="text-white/70">Personnes</p>
            <p className="font-semibold">{parsed.nbPersonnes}</p>
          </div>
          <div>
            <p className="text-white/70">Vulnerabilites</p>
            <p className="font-semibold">{scoreSans.vulnerabilites.length}</p>
          </div>
          <div>
            <p className="text-white/70">Logement</p>
            <p className="font-semibold">{logLabel}</p>
          </div>
        </div>
      </div>

      {/* Vulnerabilites */}
      {scoreSans.vulnerabilites.length > 0 && (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-red-800 mb-3">Vulnerabilites detectees</h2>
          <ul className="space-y-2">
            {scoreSans.vulnerabilites.map((v, i) => (
              <li key={i} className="text-sm text-red-700 flex gap-2">
                <span className="text-red-400">⚠️</span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Progression par niveau */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Progression selon le niveau d&apos;equipement
        </h2>
        <div className="space-y-3">
          {[
            { label: "Sans equipement", score: scoreSans.scoreTotal, duree: scoreSans.dureeAutonomieH, budget: 0 },
            { label: "Kit Essentiel", score: scoreEssentiel.scoreTotal, duree: scoreEssentiel.dureeAutonomieH, budget: budgetEssentiel.totalNeuf },
            { label: "Kit Confort", score: scoreConfort.scoreTotal, duree: scoreConfort.dureeAutonomieH, budget: budgetConfort.totalNeuf },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-slate-600">{row.label}</div>
              <div className="flex-1">
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      row.score >= 60 ? "bg-emerald-500" : row.score >= 35 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${row.score}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-right text-sm font-bold text-slate-700">{row.score}/100</div>
              <div className="w-20 text-right text-xs text-slate-500">{dureeStr(row.duree)}</div>
              <div className="w-20 text-right text-xs text-slate-400">
                {row.budget > 0 ? `${fmt(row.budget)} EUR` : "—"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget par niveau */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Budget d&apos;equipement pour {parsed.nbPersonnes} personne{parsed.nbPersonnes > 1 ? "s" : ""}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { niveau: "essentiel" as const, budget: budgetEssentiel, emoji: "🎒" },
            { niveau: "confort" as const, budget: budgetConfort, emoji: "🏠" },
            { niveau: "autonome" as const, budget: budgetAutonome, emoji: "🏰" },
          ].map((row) => (
            <div key={row.niveau} className="rounded-xl border-2 border-slate-200 p-4 text-center hover:border-slate-400 transition-colors">
              <p className="text-2xl mb-1">{row.emoji}</p>
              <p className="text-sm font-semibold text-slate-600">{NIVEAU_LABELS[row.niveau]}</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">{fmt(row.budget.totalNeuf)} EUR</p>
              <p className="text-xs text-slate-400 mt-1">{row.budget.items.length} equipements</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail score par categorie */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Detail par categorie (sans equipement)</h2>
        <div className="space-y-3">
          {scoreSans.details.map((d) => (
            <div key={d.categorie} className="flex items-center gap-3">
              <span className="text-lg w-8 text-center">{d.emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-600">{d.label}</span>
                  <span className={`text-sm font-bold ${d.score >= d.max * 0.5 ? "text-emerald-600" : d.score > 0 ? "text-amber-600" : "text-red-600"}`}>
                    {d.score}/{d.max}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${d.score >= d.max * 0.5 ? "bg-emerald-500" : d.score > 0 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${(d.score / d.max) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparaison par type de chauffage */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparaison par chauffage ({logLabel.toLowerCase()}, {parsed.nbPersonnes} pers.)
        </h2>
        <div className="space-y-2">
          {CHAUFFAGES.map((c) => {
            const ct = c === "tout-electrique" ? "electrique" as const : "gaz" as const;
            const ect = c === "tout-electrique" ? "electrique" as const : "gaz" as const;
            const s = calcScoreAutonomie(c, ct, ect, parsed.nbPersonnes, []);
            const isCurrent = c === parsed.chauffage;
            return (
              <div
                key={c}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                  isCurrent ? "bg-slate-100 border-slate-400" : "border-slate-100"
                }`}
              >
                <span className={`font-semibold text-sm ${isCurrent ? "text-slate-800" : "text-slate-500"}`}>
                  {isCurrent ? CHAUFFAGE_LABELS[c] : (
                    <a href={`/simulateur-blackout/${parsed.logement}-${c}-${parsed.nbPersonnes}-personnes`} className="hover:text-slate-800 transition-colors">
                      {CHAUFFAGE_LABELS[c]}
                    </a>
                  )}
                </span>
                <div className="flex items-center gap-4">
                  <span className={`text-sm ${isCurrent ? "text-slate-800 font-bold" : "text-slate-500"}`}>
                    {s.scoreTotal}/100
                  </span>
                  <span className={`text-sm font-bold ${isCurrent ? "text-slate-800" : "text-slate-600"}`}>
                    {dureeStr(s.dureeAutonomieH)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <SimulateurBlackout />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Panne electrique en {logLabel.toLowerCase()} {chauffLabel.toLowerCase()}
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un <strong>{logLabel.toLowerCase()}</strong> avec chauffage <strong>{chauffLabel.toLowerCase()}</strong> pour{" "}
          <strong>{parsed.nbPersonnes} personne{parsed.nbPersonnes > 1 ? "s" : ""}</strong> obtient un score de{" "}
          <strong>{scoreSans.scoreTotal}/100</strong> sans equipement de secours, avec une autonomie estimee a{" "}
          <strong>{dureeStr(scoreSans.dureeAutonomieH)}</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Avec un kit essentiel a <strong>{fmt(budgetEssentiel.totalNeuf)} EUR</strong>, le score monte a{" "}
          <strong>{scoreEssentiel.scoreTotal}/100</strong> et l&apos;autonomie a <strong>{dureeStr(scoreEssentiel.dureeAutonomieH)}</strong>.
          Le kit confort (<strong>{fmt(budgetConfort.totalNeuf)} EUR</strong>) offre {dureeStr(scoreConfort.dureeAutonomieH)} d&apos;autonomie.
        </p>
        <p className="text-slate-600 leading-relaxed">
          {parsed.chauffage === "tout-electrique"
            ? "Le chauffage tout-electrique est la configuration la plus vulnerable. Priorite : couvertures de survie et rechaud gaz de camping."
            : parsed.chauffage === "bois"
            ? "Le chauffage au bois offre la meilleure resilience. Assurez-vous d'avoir un stock de buches suffisant pour plusieurs jours."
            : "Le chauffage au gaz reste fonctionnel sans electricite, ce qui est un atout majeur. Attention : la VMC s'arrete, pensez a aerer regulierement."}
        </p>
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres configurations</h2>
        <div className="flex flex-wrap gap-2">
          {CHAUFFAGES.filter((c) => c !== parsed.chauffage).map((c) => (
            <a
              key={c}
              href={`/simulateur-blackout/${parsed.logement}-${c}-${parsed.nbPersonnes}-personnes`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all"
            >
              {CHAUFFAGE_LABELS[c]}
            </a>
          ))}
          {NB_PERSONNES.filter((n) => n !== parsed.nbPersonnes).map((n) => (
            <a
              key={n}
              href={`/simulateur-blackout/${parsed.logement}-${parsed.chauffage}-${n}-personnes`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all"
            >
              {n} pers.
            </a>
          ))}
          {LOGEMENTS.filter((l) => l !== parsed.logement).map((l) => (
            <a
              key={l}
              href={`/simulateur-blackout/${l}-${parsed.chauffage}-${parsed.nbPersonnes}-personnes`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all"
            >
              {LOGEMENT_LABELS[l]}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-blackout" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
