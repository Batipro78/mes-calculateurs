import type { Metadata } from "next";
import SimulateurDCA from "../SimulateurDCA";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const MONTANTS = [50, 100, 150, 200, 300, 500, 1000];

const SP500: Record<string, number> = {
  "2010-01":1073,"2010-06":1031,"2010-12":1258,"2011-06":1321,"2011-12":1258,
  "2012-06":1362,"2012-12":1426,"2013-06":1606,"2013-12":1848,"2014-06":1960,
  "2014-12":2059,"2015-06":2063,"2015-12":2044,"2016-06":2099,"2016-12":2239,
  "2017-06":2423,"2017-12":2674,"2018-06":2718,"2018-12":2507,"2019-06":2942,
  "2019-12":3231,"2020-06":3100,"2020-12":3756,"2021-06":4298,"2021-12":4766,
  "2022-06":3785,"2022-12":3840,"2023-06":4450,"2023-12":4770,"2024-06":5460,
  "2024-12":5882,"2025-06":6067,"2025-12":5881,
};

const CAC40: Record<string, number> = {
  "2010-01":3739,"2010-06":3443,"2010-12":3805,"2011-06":3982,"2011-12":3160,
  "2012-06":3197,"2012-12":3641,"2013-06":3739,"2013-12":4296,"2014-06":4423,
  "2014-12":4273,"2015-06":4790,"2015-12":4637,"2016-06":4237,"2016-12":4862,
  "2017-06":5121,"2017-12":5313,"2018-06":5323,"2018-12":4731,"2019-06":5539,
  "2019-12":5978,"2020-06":4936,"2020-12":5551,"2021-06":6508,"2021-12":7153,
  "2022-06":5923,"2022-12":6474,"2023-06":7400,"2023-12":7543,"2024-06":7479,
  "2024-12":7380,"2025-06":7700,"2025-12":7450,
};

const BITCOIN: Record<string, number> = {
  "2014-01":800,"2014-06":640,"2014-12":320,"2015-06":257,"2015-12":430,
  "2016-06":672,"2016-12":963,"2017-06":2500,"2017-12":13860,"2018-06":6394,
  "2018-12":3693,"2019-06":10817,"2019-12":7193,"2020-06":9137,"2020-12":29002,
  "2021-06":35040,"2021-12":46306,"2022-06":19785,"2022-12":16548,"2023-06":30468,
  "2023-12":42265,"2024-06":62700,"2024-12":93400,"2025-06":107000,"2025-12":93000,
};

// Donnees completes mensuelles pour la simulation reelle
const SP500_FULL: Record<string, number> = {
  "2015-01":1995,"2015-02":2105,"2015-03":2068,"2015-04":2086,"2015-05":2107,"2015-06":2063,"2015-07":2104,"2015-08":1972,"2015-09":1920,"2015-10":2079,"2015-11":2080,"2015-12":2044,
  "2016-01":1940,"2016-02":1932,"2016-03":2060,"2016-04":2065,"2016-05":2097,"2016-06":2099,"2016-07":2174,"2016-08":2171,"2016-09":2168,"2016-10":2126,"2016-11":2199,"2016-12":2239,
  "2017-01":2279,"2017-02":2364,"2017-03":2362,"2017-04":2384,"2017-05":2412,"2017-06":2423,"2017-07":2470,"2017-08":2472,"2017-09":2519,"2017-10":2575,"2017-11":2584,"2017-12":2674,
  "2018-01":2824,"2018-02":2714,"2018-03":2641,"2018-04":2648,"2018-05":2705,"2018-06":2718,"2018-07":2816,"2018-08":2901,"2018-09":2914,"2018-10":2712,"2018-11":2760,"2018-12":2507,
  "2019-01":2704,"2019-02":2784,"2019-03":2834,"2019-04":2946,"2019-05":2752,"2019-06":2942,"2019-07":2980,"2019-08":2926,"2019-09":2977,"2019-10":3038,"2019-11":3141,"2019-12":3231,
  "2020-01":3226,"2020-02":2954,"2020-03":2585,"2020-04":2912,"2020-05":3044,"2020-06":3100,"2020-07":3271,"2020-08":3500,"2020-09":3363,"2020-10":3270,"2020-11":3622,"2020-12":3756,
  "2021-01":3714,"2021-02":3811,"2021-03":3973,"2021-04":4181,"2021-05":4204,"2021-06":4298,"2021-07":4395,"2021-08":4522,"2021-09":4307,"2021-10":4605,"2021-11":4567,"2021-12":4766,
  "2022-01":4516,"2022-02":4374,"2022-03":4530,"2022-04":4132,"2022-05":4132,"2022-06":3785,"2022-07":4130,"2022-08":3955,"2022-09":3586,"2022-10":3872,"2022-11":4080,"2022-12":3840,
  "2023-01":4077,"2023-02":3970,"2023-03":4109,"2023-04":4169,"2023-05":4179,"2023-06":4450,"2023-07":4589,"2023-08":4508,"2023-09":4288,"2023-10":4194,"2023-11":4568,"2023-12":4770,
  "2024-01":4846,"2024-02":5096,"2024-03":5254,"2024-04":5036,"2024-05":5277,"2024-06":5460,"2024-07":5522,"2024-08":5648,"2024-09":5762,"2024-10":5705,"2024-11":6032,"2024-12":5882,
  "2025-01":6041,"2025-02":5955,"2025-03":5612,"2025-04":5526,"2025-05":5893,"2025-06":6067,"2025-07":6058,"2025-08":6013,"2025-09":5700,"2025-10":5929,"2025-11":6033,"2025-12":5881,
};

const CAC40_FULL: Record<string, number> = {
  "2015-01":4604,"2015-02":4951,"2015-03":5034,"2015-04":5084,"2015-05":5008,"2015-06":4790,"2015-07":5082,"2015-08":4680,"2015-09":4455,"2015-10":4897,"2015-11":4957,"2015-12":4637,
  "2016-01":4117,"2016-02":4238,"2016-03":4385,"2016-04":4428,"2016-05":4505,"2016-06":4237,"2016-07":4440,"2016-08":4438,"2016-09":4448,"2016-10":4509,"2016-11":4578,"2016-12":4862,
  "2017-01":4868,"2017-02":4858,"2017-03":5122,"2017-04":5267,"2017-05":5284,"2017-06":5121,"2017-07":5093,"2017-08":5086,"2017-09":5329,"2017-10":5503,"2017-11":5361,"2017-12":5313,
  "2018-01":5481,"2018-02":5320,"2018-03":5168,"2018-04":5521,"2018-05":5399,"2018-06":5323,"2018-07":5511,"2018-08":5407,"2018-09":5493,"2018-10":4989,"2018-11":5003,"2018-12":4731,
  "2019-01":4993,"2019-02":5182,"2019-03":5351,"2019-04":5586,"2019-05":5208,"2019-06":5539,"2019-07":5519,"2019-08":5480,"2019-09":5678,"2019-10":5730,"2019-11":5905,"2019-12":5978,
  "2020-01":5806,"2020-02":5309,"2020-03":4396,"2020-04":4572,"2020-05":4695,"2020-06":4936,"2020-07":4784,"2020-08":4947,"2020-09":4803,"2020-10":4594,"2020-11":5518,"2020-12":5551,
  "2021-01":5399,"2021-02":5703,"2021-03":6067,"2021-04":6269,"2021-05":6447,"2021-06":6508,"2021-07":6613,"2021-08":6680,"2021-09":6520,"2021-10":6830,"2021-11":6721,"2021-12":7153,
  "2022-01":7025,"2022-02":6659,"2022-03":6660,"2022-04":6534,"2022-05":6469,"2022-06":5923,"2022-07":6448,"2022-08":6284,"2022-09":5762,"2022-10":6267,"2022-11":6739,"2022-12":6474,
  "2023-01":7082,"2023-02":7187,"2023-03":7322,"2023-04":7491,"2023-05":7099,"2023-06":7400,"2023-07":7403,"2023-08":7317,"2023-09":7135,"2023-10":6885,"2023-11":7311,"2023-12":7543,
  "2024-01":7634,"2024-02":7927,"2024-03":8206,"2024-04":7984,"2024-05":7992,"2024-06":7479,"2024-07":7531,"2024-08":7431,"2024-09":7635,"2024-10":7381,"2024-11":7235,"2024-12":7380,
  "2025-01":7850,"2025-02":8111,"2025-03":7790,"2025-04":7531,"2025-05":7884,"2025-06":7700,"2025-07":7820,"2025-08":7650,"2025-09":7500,"2025-10":7700,"2025-11":7600,"2025-12":7450,
};

const BITCOIN_FULL: Record<string, number> = {
  "2016-01":379,"2016-02":437,"2016-03":416,"2016-04":454,"2016-05":530,"2016-06":672,"2016-07":624,"2016-08":572,"2016-09":608,"2016-10":697,"2016-11":741,"2016-12":963,
  "2017-01":965,"2017-02":1190,"2017-03":1070,"2017-04":1349,"2017-05":2300,"2017-06":2500,"2017-07":2875,"2017-08":4700,"2017-09":4340,"2017-10":6468,"2017-11":10975,"2017-12":13860,
  "2018-01":10222,"2018-02":10326,"2018-03":6926,"2018-04":9240,"2018-05":7490,"2018-06":6394,"2018-07":8220,"2018-08":7015,"2018-09":6604,"2018-10":6317,"2018-11":3990,"2018-12":3693,
  "2019-01":3458,"2019-02":3784,"2019-03":4092,"2019-04":5270,"2019-05":8575,"2019-06":10817,"2019-07":9590,"2019-08":9630,"2019-09":8313,"2019-10":9190,"2019-11":7569,"2019-12":7193,
  "2020-01":9350,"2020-02":8778,"2020-03":6425,"2020-04":8788,"2020-05":9455,"2020-06":9137,"2020-07":11351,"2020-08":11681,"2020-09":10784,"2020-10":13805,"2020-11":19698,"2020-12":29002,
  "2021-01":33114,"2021-02":45240,"2021-03":58918,"2021-04":57750,"2021-05":37305,"2021-06":35040,"2021-07":41461,"2021-08":47100,"2021-09":43790,"2021-10":61350,"2021-11":57005,"2021-12":46306,
  "2022-01":38483,"2022-02":43192,"2022-03":45528,"2022-04":37715,"2022-05":31793,"2022-06":19785,"2022-07":23337,"2022-08":20050,"2022-09":19423,"2022-10":20496,"2022-11":17168,"2022-12":16548,
  "2023-01":23139,"2023-02":23147,"2023-03":28478,"2023-04":29252,"2023-05":27220,"2023-06":30468,"2023-07":29231,"2023-08":26044,"2023-09":27000,"2023-10":34500,"2023-11":37700,"2023-12":42265,
  "2024-01":42580,"2024-02":62000,"2024-03":71290,"2024-04":60672,"2024-05":67500,"2024-06":62700,"2024-07":66800,"2024-08":59015,"2024-09":63300,"2024-10":72300,"2024-11":96400,"2024-12":93400,
  "2025-01":102000,"2025-02":84500,"2025-03":82500,"2025-04":94200,"2025-05":103000,"2025-06":107000,"2025-07":100000,"2025-08":96000,"2025-09":90000,"2025-10":95000,"2025-11":98000,"2025-12":93000,
};

interface AssetInfo {
  label: string;
  slug: string;
  data: Record<string, number>;
  devise: string;
  rendementMoyen: string;
  description: string;
  couleur: string;
  gradient: string;
}

const ASSETS_MAP: Record<string, AssetInfo> = {
  "sp500": {
    label: "S&P 500",
    slug: "sp500",
    data: SP500_FULL,
    devise: "USD",
    rendementMoyen: "~10% / an",
    description: "Les 500 plus grandes entreprises americaines",
    couleur: "text-blue-600",
    gradient: "from-blue-500 to-indigo-600",
  },
  "cac40": {
    label: "CAC 40",
    slug: "cac40",
    data: CAC40_FULL,
    devise: "EUR",
    rendementMoyen: "~7% / an",
    description: "Les 40 plus grandes entreprises francaises",
    couleur: "text-emerald-600",
    gradient: "from-emerald-500 to-green-600",
  },
  "bitcoin": {
    label: "Bitcoin",
    slug: "bitcoin",
    data: BITCOIN_FULL,
    devise: "USD",
    rendementMoyen: "Tres variable",
    description: "Cryptomonnaie decentralisee",
    couleur: "text-orange-600",
    gradient: "from-orange-500 to-amber-500",
  },
};

const ASSET_SLUGS = Object.keys(ASSETS_MAP);

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function simulerDCA(montant: number, data: Record<string, number>, anneeDepart: number = 2020) {
  const startKey = `${anneeDepart}-01`;
  const months = Object.keys(data).sort().filter((k) => k >= startKey);
  if (months.length < 2) return null;

  const lastPrice = data[months[months.length - 1]];
  let totalUnits = 0;
  let totalInvested = 0;
  const parAnnee: Record<string, { invested: number; value: number }> = {};

  for (const month of months) {
    const price = data[month];
    totalUnits += montant / price;
    totalInvested += montant;
    const year = month.split("-")[0];
    parAnnee[year] = { invested: totalInvested, value: totalUnits * data[month] };
  }

  const currentValue = totalUnits * lastPrice;
  const gain = currentValue - totalInvested;
  const gainPct = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;
  const nbYears = months.length / 12;
  const rendementAnnualise = nbYears > 0 ? (Math.pow(currentValue / totalInvested, 1 / nbYears) - 1) * 100 : 0;

  return { totalInvested, currentValue, gain, gainPct, rendementAnnualise, nbMonths: months.length, nbYears, parAnnee };
}

function parseSlug(slug: string): { montant: number; asset: string } | null {
  const match = slug.match(/^(\d+)-euros-par-mois-(.+)$/);
  if (!match) return null;
  return { montant: parseInt(match[1]), asset: match[2] };
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const m of MONTANTS) {
    for (const a of ASSET_SLUGS) {
      params.push({ params: `${m}-euros-par-mois-${a}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { montant, asset } = parsed;
  const assetInfo = ASSETS_MAP[asset];
  if (!assetInfo) return {};

  const sim = simulerDCA(montant, assetInfo.data, 2020);
  if (!sim) return {};

  return {
    alternates: { canonical: `/simulateur-dca/${slug}` },
    title: `DCA ${montant} EUR/mois sur ${assetInfo.label} - Combien auriez-vous gagne ? (2026)`,
    description: `Simulation DCA : ${montant} EUR investis chaque mois sur le ${assetInfo.label} depuis 2020. Total investi : ${fmtInt(Math.round(sim.totalInvested))} EUR, valeur actuelle : ${fmtInt(Math.round(sim.currentValue))} EUR (${sim.gain >= 0 ? "+" : ""}${sim.gainPct.toFixed(1)}%).`,
    keywords: `DCA ${montant} euros ${assetInfo.label}, investir ${montant} euros par mois, ${assetInfo.label} DCA, dollar cost averaging ${assetInfo.label}, si j'avais investi ${montant} euros`,
    openGraph: {
      title: `${montant} EUR/mois sur ${assetInfo.label} = ${fmtInt(Math.round(sim.currentValue))} EUR`,
      description: `Simulation DCA depuis 2020 : ${montant} EUR/mois sur le ${assetInfo.label} → ${fmtInt(Math.round(sim.currentValue))} EUR (${sim.gain >= 0 ? "+" : ""}${sim.gainPct.toFixed(1)}%).`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { montant, asset } = parsed;
  if (!MONTANTS.includes(montant) || !ASSETS_MAP[asset]) notFound();

  const assetInfo = ASSETS_MAP[asset];

  // Simulations pour differentes annees de depart
  const ANNEES_DEPART = [2016, 2018, 2020, 2022, 2024];
  const simParAnnee = ANNEES_DEPART.map((a) => {
    const sim = simulerDCA(montant, assetInfo.data, a);
    return { annee: a, ...sim };
  }).filter((s) => s.totalInvested);

  // Simulation principale (depuis 2020)
  const simPrincipale = simulerDCA(montant, assetInfo.data, 2020);
  if (!simPrincipale) notFound();

  // Comparaison par montant pour cet actif
  const comparaisonMontants = MONTANTS.map((m) => {
    const sim = simulerDCA(m, assetInfo.data, 2020);
    return { montant: m, ...sim, isCurrent: m === montant };
  }).filter((s) => s.totalInvested);

  // Comparaison par actif pour ce montant
  const comparaisonActifs = ASSET_SLUGS.map((a) => {
    const info = ASSETS_MAP[a];
    const sim = simulerDCA(montant, info.data, 2020);
    return { slug: a, label: info.label, rendement: info.rendementMoyen, ...sim, isCurrent: a === asset };
  }).filter((s) => s.totalInvested);

  // Donnees pour barres annuelles
  const chartData = Object.entries(simPrincipale.parAnnee).map(([year, d]) => ({ year, ...d }));
  const maxChartValue = chartData.length > 0 ? Math.max(...chartData.map((d) => Math.max(d.value, d.invested))) : 1;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Combien rapportent ${montant} EUR par mois investis sur le ${assetInfo.label} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `En investissant ${montant} EUR par mois sur le ${assetInfo.label} depuis janvier 2020, vous auriez investi ${fmtInt(Math.round(simPrincipale.totalInvested))} EUR au total. La valeur actuelle de votre portefeuille serait de ${fmtInt(Math.round(simPrincipale.currentValue))} EUR, soit un ${simPrincipale.gain >= 0 ? "gain" : "perte"} de ${simPrincipale.gain >= 0 ? "+" : ""}${simPrincipale.gainPct.toFixed(1)}%.`,
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
        currentPage={`${montant} EUR - ${assetInfo.label}`}
        parentPage="Simulateur DCA"
        parentHref="/simulateur-dca"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 bg-gradient-to-br ${assetInfo.gradient} rounded-xl flex items-center justify-center text-xl shadow-sm`}>
          📈
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          DCA : {montant} EUR/mois sur {assetInfo.label}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation d&apos;un investissement de {montant} EUR par mois sur le {assetInfo.label} depuis 2020.
      </p>

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${assetInfo.gradient} text-white rounded-2xl p-8 shadow-lg mb-8`}>
        <p className="text-white/80 mb-1">Valeur actuelle du portefeuille</p>
        <p className="text-5xl font-extrabold tracking-tight">
          {fmtInt(Math.round(simPrincipale.currentValue))} <span className="text-2xl font-semibold">EUR</span>
        </p>
        <p className={`text-xl font-bold mt-2 ${simPrincipale.gain >= 0 ? "text-green-200" : "text-red-200"}`}>
          {simPrincipale.gain >= 0 ? "+" : ""}{fmt(simPrincipale.gain)} EUR ({simPrincipale.gain >= 0 ? "+" : ""}{simPrincipale.gainPct.toFixed(1)}%)
        </p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/70">Total investi</p>
            <p className="font-semibold">{fmtInt(Math.round(simPrincipale.totalInvested))} EUR</p>
          </div>
          <div>
            <p className="text-white/70">Rendement annualise</p>
            <p className="font-semibold">{simPrincipale.rendementAnnualise.toFixed(1)}%/an</p>
          </div>
          <div>
            <p className="text-white/70">Duree</p>
            <p className="font-semibold">{simPrincipale.nbMonths} mois</p>
          </div>
        </div>
      </div>

      {/* Phrase resumee */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 mb-8">
        <p className="text-slate-700 leading-relaxed">
          Si vous aviez investi <strong>{montant} EUR par mois</strong> sur le{" "}
          <strong>{assetInfo.label}</strong> depuis <strong>janvier 2020</strong>,
          vous auriez investi au total <strong>{fmtInt(Math.round(simPrincipale.totalInvested))} EUR</strong> et
          votre portefeuille vaudrait aujourd&apos;hui{" "}
          <strong className={simPrincipale.gain >= 0 ? "text-emerald-700" : "text-red-700"}>
            {fmtInt(Math.round(simPrincipale.currentValue))} EUR
          </strong>.
        </p>
      </div>

      {/* Graphique barres */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="font-bold text-slate-800 mb-4">Evolution du portefeuille</h2>
          <div className="space-y-2">
            {chartData.map((d) => (
              <div key={d.year} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-10 text-right font-mono">{d.year}</span>
                <div className="flex-1 relative h-7">
                  <div
                    className="absolute top-0 left-0 h-full bg-slate-200 rounded-md"
                    style={{ width: `${(d.invested / maxChartValue) * 100}%` }}
                  />
                  <div
                    className={`absolute top-0 left-0 h-full rounded-md ${
                      d.value >= d.invested ? "bg-emerald-400/70" : "bg-red-400/70"
                    }`}
                    style={{ width: `${(d.value / maxChartValue) * 100}%` }}
                  />
                  <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                    <span className="text-xs font-medium text-slate-700 drop-shadow-sm">
                      {fmtInt(Math.round(d.value))} EUR
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-slate-200 rounded-sm" /> Investi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-400/70 rounded-sm" /> Valeur portefeuille
            </span>
          </div>
        </div>
      )}

      {/* Comparaison par annee de depart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {montant} EUR/mois sur {assetInfo.label} selon l&apos;annee de depart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Depuis</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Investi</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Valeur</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Gain</th>
              </tr>
            </thead>
            <tbody>
              {simParAnnee.map((row) => (
                <tr key={row.annee} className={`border-b border-slate-100 ${row.annee === 2020 ? "bg-blue-50/50" : ""}`}>
                  <td className="py-2.5 px-2 font-medium text-slate-700">Janvier {row.annee}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmtInt(Math.round(row.totalInvested!))} EUR</td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-800">{fmtInt(Math.round(row.currentValue!))} EUR</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.gain! >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {row.gain! >= 0 ? "+" : ""}{row.gainPct!.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par montant */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {assetInfo.label} depuis 2020 : comparaison par montant
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Mensuel</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Investi</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Valeur</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Gain</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonMontants.map((row) => (
                <tr key={row.montant} className={`border-b border-slate-100 ${row.isCurrent ? "bg-blue-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className={`font-bold ${assetInfo.couleur}`}>{row.montant} EUR/mois</span>
                    ) : (
                      <a href={`/simulateur-dca/${row.montant}-euros-par-mois-${asset}`} className="text-slate-700 hover:text-blue-600 transition-colors">
                        {row.montant} EUR/mois
                      </a>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{fmtInt(Math.round(row.totalInvested!))} EUR</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? assetInfo.couleur : "text-slate-700"}`}>
                    {fmtInt(Math.round(row.currentValue!))} EUR
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.gain! >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {row.gain! >= 0 ? "+" : ""}{fmt(row.gain!)} EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparaison par actif */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {montant} EUR/mois depuis 2020 : comparaison des actifs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Actif</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Rendement moy.</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Valeur</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Gain</th>
              </tr>
            </thead>
            <tbody>
              {comparaisonActifs.map((row) => (
                <tr key={row.slug} className={`border-b border-slate-100 ${row.isCurrent ? "bg-blue-50/50" : ""}`}>
                  <td className="py-2.5 px-2">
                    {row.isCurrent ? (
                      <span className={`font-bold ${assetInfo.couleur}`}>{row.label}</span>
                    ) : (
                      <a href={`/simulateur-dca/${montant}-euros-par-mois-${row.slug}`} className="text-slate-700 hover:text-blue-600 transition-colors">
                        {row.label}
                      </a>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{row.rendement}</td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.isCurrent ? assetInfo.couleur : "text-slate-700"}`}>
                    {fmtInt(Math.round(row.currentValue!))} EUR
                  </td>
                  <td className={`py-2.5 px-2 text-right font-bold ${row.gain! >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {row.gain! >= 0 ? "+" : ""}{row.gainPct!.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Simulateur interactif</h2>
      <SimulateurDCA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Investir {montant} EUR par mois sur le {assetInfo.label} en DCA
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le <strong>DCA (Dollar Cost Averaging)</strong> consiste a investir{" "}
          <strong>{montant} EUR chaque mois</strong> sur le <strong>{assetInfo.label}</strong>,
          quel que soit le prix du marche. En investissant depuis janvier 2020,
          vous auriez place au total <strong>{fmtInt(Math.round(simPrincipale.totalInvested))} EUR</strong> et
          votre portefeuille vaudrait aujourd&apos;hui{" "}
          <strong>{fmtInt(Math.round(simPrincipale.currentValue))} EUR</strong>, soit un{" "}
          {simPrincipale.gain >= 0 ? "gain" : "perte"} de{" "}
          <strong>{simPrincipale.gain >= 0 ? "+" : ""}{simPrincipale.gainPct.toFixed(1)}%</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {assetInfo.description}. Rendement historique moyen : <strong>{assetInfo.rendementMoyen}</strong>.
          Le DCA permet de lisser le prix d&apos;achat moyen et de reduire l&apos;impact de la
          volatilite. Vous achetez plus de parts quand les prix sont bas et moins quand ils sont hauts.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Avertissement</h3>
        <p className="text-slate-600 leading-relaxed">
          Les performances passees ne garantissent pas les resultats futurs.
          Ce simulateur est fourni a titre indicatif. Il ne constitue pas un
          conseil en investissement. Tout investissement comporte un risque de
          perte en capital.
        </p>
      </section>

      {/* Liens */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres simulations DCA</h2>
        <div className="flex flex-wrap gap-2">
          {ASSET_SLUGS.filter((a) => a !== asset).map((a) => (
            <a
              key={a}
              href={`/simulateur-dca/${montant}-euros-par-mois-${a}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {montant} EUR - {ASSETS_MAP[a].label}
            </a>
          ))}
          {MONTANTS.filter((m) => m !== montant).slice(0, 5).map((m) => (
            <a
              key={m}
              href={`/simulateur-dca/${m}-euros-par-mois-${asset}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {m} EUR - {assetInfo.label}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-dca" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
