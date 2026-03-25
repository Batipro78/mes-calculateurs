"use client";

import { useState, useMemo } from "react";

// Prix mensuels de cloture (approximatifs) - Sources: Yahoo Finance, CoinGecko
// Format: "YYYY-MM": prix

const SP500: Record<string, number> = {
  "2010-01":1073,"2010-02":1104,"2010-03":1169,"2010-04":1187,"2010-05":1089,"2010-06":1031,
  "2010-07":1102,"2010-08":1049,"2010-09":1141,"2010-10":1183,"2010-11":1180,"2010-12":1258,
  "2011-01":1286,"2011-02":1327,"2011-03":1326,"2011-04":1364,"2011-05":1345,"2011-06":1321,
  "2011-07":1292,"2011-08":1219,"2011-09":1131,"2011-10":1253,"2011-11":1247,"2011-12":1258,
  "2012-01":1312,"2012-02":1366,"2012-03":1408,"2012-04":1397,"2012-05":1310,"2012-06":1362,
  "2012-07":1379,"2012-08":1407,"2012-09":1441,"2012-10":1412,"2012-11":1416,"2012-12":1426,
  "2013-01":1498,"2013-02":1515,"2013-03":1569,"2013-04":1598,"2013-05":1631,"2013-06":1606,
  "2013-07":1686,"2013-08":1633,"2013-09":1682,"2013-10":1757,"2013-11":1806,"2013-12":1848,
  "2014-01":1783,"2014-02":1859,"2014-03":1872,"2014-04":1884,"2014-05":1924,"2014-06":1960,
  "2014-07":1931,"2014-08":2003,"2014-09":1972,"2014-10":2018,"2014-11":2068,"2014-12":2059,
  "2015-01":1995,"2015-02":2105,"2015-03":2068,"2015-04":2086,"2015-05":2107,"2015-06":2063,
  "2015-07":2104,"2015-08":1972,"2015-09":1920,"2015-10":2079,"2015-11":2080,"2015-12":2044,
  "2016-01":1940,"2016-02":1932,"2016-03":2060,"2016-04":2065,"2016-05":2097,"2016-06":2099,
  "2016-07":2174,"2016-08":2171,"2016-09":2168,"2016-10":2126,"2016-11":2199,"2016-12":2239,
  "2017-01":2279,"2017-02":2364,"2017-03":2362,"2017-04":2384,"2017-05":2412,"2017-06":2423,
  "2017-07":2470,"2017-08":2472,"2017-09":2519,"2017-10":2575,"2017-11":2584,"2017-12":2674,
  "2018-01":2824,"2018-02":2714,"2018-03":2641,"2018-04":2648,"2018-05":2705,"2018-06":2718,
  "2018-07":2816,"2018-08":2901,"2018-09":2914,"2018-10":2712,"2018-11":2760,"2018-12":2507,
  "2019-01":2704,"2019-02":2784,"2019-03":2834,"2019-04":2946,"2019-05":2752,"2019-06":2942,
  "2019-07":2980,"2019-08":2926,"2019-09":2977,"2019-10":3038,"2019-11":3141,"2019-12":3231,
  "2020-01":3226,"2020-02":2954,"2020-03":2585,"2020-04":2912,"2020-05":3044,"2020-06":3100,
  "2020-07":3271,"2020-08":3500,"2020-09":3363,"2020-10":3270,"2020-11":3622,"2020-12":3756,
  "2021-01":3714,"2021-02":3811,"2021-03":3973,"2021-04":4181,"2021-05":4204,"2021-06":4298,
  "2021-07":4395,"2021-08":4522,"2021-09":4307,"2021-10":4605,"2021-11":4567,"2021-12":4766,
  "2022-01":4516,"2022-02":4374,"2022-03":4530,"2022-04":4132,"2022-05":4132,"2022-06":3785,
  "2022-07":4130,"2022-08":3955,"2022-09":3586,"2022-10":3872,"2022-11":4080,"2022-12":3840,
  "2023-01":4077,"2023-02":3970,"2023-03":4109,"2023-04":4169,"2023-05":4179,"2023-06":4450,
  "2023-07":4589,"2023-08":4508,"2023-09":4288,"2023-10":4194,"2023-11":4568,"2023-12":4770,
  "2024-01":4846,"2024-02":5096,"2024-03":5254,"2024-04":5036,"2024-05":5277,"2024-06":5460,
  "2024-07":5522,"2024-08":5648,"2024-09":5762,"2024-10":5705,"2024-11":6032,"2024-12":5882,
  "2025-01":6041,"2025-02":5955,"2025-03":5612,"2025-04":5526,"2025-05":5893,"2025-06":6067,
  "2025-07":6058,"2025-08":6013,"2025-09":5700,"2025-10":5929,"2025-11":6033,"2025-12":5881,
};

const CAC40: Record<string, number> = {
  "2010-01":3739,"2010-02":3709,"2010-03":3974,"2010-04":3816,"2010-05":3507,"2010-06":3443,
  "2010-07":3643,"2010-08":3490,"2010-09":3715,"2010-10":3833,"2010-11":3610,"2010-12":3805,
  "2011-01":3976,"2011-02":4110,"2011-03":3989,"2011-04":4107,"2011-05":3989,"2011-06":3982,
  "2011-07":3672,"2011-08":3256,"2011-09":2982,"2011-10":3243,"2011-11":3154,"2011-12":3160,
  "2012-01":3298,"2012-02":3452,"2012-03":3424,"2012-04":3213,"2012-05":3017,"2012-06":3197,
  "2012-07":3292,"2012-08":3413,"2012-09":3355,"2012-10":3429,"2012-11":3557,"2012-12":3641,
  "2013-01":3733,"2013-02":3723,"2013-03":3731,"2013-04":3857,"2013-05":3949,"2013-06":3739,
  "2013-07":3993,"2013-08":4045,"2013-09":4143,"2013-10":4300,"2013-11":4296,"2013-12":4296,
  "2014-01":4166,"2014-02":4408,"2014-03":4392,"2014-04":4488,"2014-05":4520,"2014-06":4423,
  "2014-07":4247,"2014-08":4381,"2014-09":4417,"2014-10":4233,"2014-11":4390,"2014-12":4273,
  "2015-01":4604,"2015-02":4951,"2015-03":5034,"2015-04":5084,"2015-05":5008,"2015-06":4790,
  "2015-07":5082,"2015-08":4680,"2015-09":4455,"2015-10":4897,"2015-11":4957,"2015-12":4637,
  "2016-01":4117,"2016-02":4238,"2016-03":4385,"2016-04":4428,"2016-05":4505,"2016-06":4237,
  "2016-07":4440,"2016-08":4438,"2016-09":4448,"2016-10":4509,"2016-11":4578,"2016-12":4862,
  "2017-01":4868,"2017-02":4858,"2017-03":5122,"2017-04":5267,"2017-05":5284,"2017-06":5121,
  "2017-07":5093,"2017-08":5086,"2017-09":5329,"2017-10":5503,"2017-11":5361,"2017-12":5313,
  "2018-01":5481,"2018-02":5320,"2018-03":5168,"2018-04":5521,"2018-05":5399,"2018-06":5323,
  "2018-07":5511,"2018-08":5407,"2018-09":5493,"2018-10":4989,"2018-11":5003,"2018-12":4731,
  "2019-01":4993,"2019-02":5182,"2019-03":5351,"2019-04":5586,"2019-05":5208,"2019-06":5539,
  "2019-07":5519,"2019-08":5480,"2019-09":5678,"2019-10":5730,"2019-11":5905,"2019-12":5978,
  "2020-01":5806,"2020-02":5309,"2020-03":4396,"2020-04":4572,"2020-05":4695,"2020-06":4936,
  "2020-07":4784,"2020-08":4947,"2020-09":4803,"2020-10":4594,"2020-11":5518,"2020-12":5551,
  "2021-01":5399,"2021-02":5703,"2021-03":6067,"2021-04":6269,"2021-05":6447,"2021-06":6508,
  "2021-07":6613,"2021-08":6680,"2021-09":6520,"2021-10":6830,"2021-11":6721,"2021-12":7153,
  "2022-01":7025,"2022-02":6659,"2022-03":6660,"2022-04":6534,"2022-05":6469,"2022-06":5923,
  "2022-07":6448,"2022-08":6284,"2022-09":5762,"2022-10":6267,"2022-11":6739,"2022-12":6474,
  "2023-01":7082,"2023-02":7187,"2023-03":7322,"2023-04":7491,"2023-05":7099,"2023-06":7400,
  "2023-07":7403,"2023-08":7317,"2023-09":7135,"2023-10":6885,"2023-11":7311,"2023-12":7543,
  "2024-01":7634,"2024-02":7927,"2024-03":8206,"2024-04":7984,"2024-05":7992,"2024-06":7479,
  "2024-07":7531,"2024-08":7431,"2024-09":7635,"2024-10":7381,"2024-11":7235,"2024-12":7380,
  "2025-01":7850,"2025-02":8111,"2025-03":7790,"2025-04":7531,"2025-05":7884,"2025-06":7700,
  "2025-07":7820,"2025-08":7650,"2025-09":7500,"2025-10":7700,"2025-11":7600,"2025-12":7450,
};

const BITCOIN: Record<string, number> = {
  "2014-01":800,"2014-02":550,"2014-03":450,"2014-04":450,"2014-05":630,"2014-06":640,
  "2014-07":590,"2014-08":480,"2014-09":380,"2014-10":340,"2014-11":375,"2014-12":320,
  "2015-01":217,"2015-02":255,"2015-03":244,"2015-04":237,"2015-05":237,"2015-06":257,
  "2015-07":286,"2015-08":230,"2015-09":237,"2015-10":327,"2015-11":377,"2015-12":430,
  "2016-01":379,"2016-02":437,"2016-03":416,"2016-04":454,"2016-05":530,"2016-06":672,
  "2016-07":624,"2016-08":572,"2016-09":608,"2016-10":697,"2016-11":741,"2016-12":963,
  "2017-01":965,"2017-02":1190,"2017-03":1070,"2017-04":1349,"2017-05":2300,"2017-06":2500,
  "2017-07":2875,"2017-08":4700,"2017-09":4340,"2017-10":6468,"2017-11":10975,"2017-12":13860,
  "2018-01":10222,"2018-02":10326,"2018-03":6926,"2018-04":9240,"2018-05":7490,"2018-06":6394,
  "2018-07":8220,"2018-08":7015,"2018-09":6604,"2018-10":6317,"2018-11":3990,"2018-12":3693,
  "2019-01":3458,"2019-02":3784,"2019-03":4092,"2019-04":5270,"2019-05":8575,"2019-06":10817,
  "2019-07":9590,"2019-08":9630,"2019-09":8313,"2019-10":9190,"2019-11":7569,"2019-12":7193,
  "2020-01":9350,"2020-02":8778,"2020-03":6425,"2020-04":8788,"2020-05":9455,"2020-06":9137,
  "2020-07":11351,"2020-08":11681,"2020-09":10784,"2020-10":13805,"2020-11":19698,"2020-12":29002,
  "2021-01":33114,"2021-02":45240,"2021-03":58918,"2021-04":57750,"2021-05":37305,"2021-06":35040,
  "2021-07":41461,"2021-08":47100,"2021-09":43790,"2021-10":61350,"2021-11":57005,"2021-12":46306,
  "2022-01":38483,"2022-02":43192,"2022-03":45528,"2022-04":37715,"2022-05":31793,"2022-06":19785,
  "2022-07":23337,"2022-08":20050,"2022-09":19423,"2022-10":20496,"2022-11":17168,"2022-12":16548,
  "2023-01":23139,"2023-02":23147,"2023-03":28478,"2023-04":29252,"2023-05":27220,"2023-06":30468,
  "2023-07":29231,"2023-08":26044,"2023-09":27000,"2023-10":34500,"2023-11":37700,"2023-12":42265,
  "2024-01":42580,"2024-02":62000,"2024-03":71290,"2024-04":60672,"2024-05":67500,"2024-06":62700,
  "2024-07":66800,"2024-08":59015,"2024-09":63300,"2024-10":72300,"2024-11":96400,"2024-12":93400,
  "2025-01":102000,"2025-02":84500,"2025-03":82500,"2025-04":94200,"2025-05":103000,"2025-06":107000,
  "2025-07":100000,"2025-08":96000,"2025-09":90000,"2025-10":95000,"2025-11":98000,"2025-12":93000,
};

interface AssetConfig {
  label: string;
  data: Record<string, number>;
  devise: string;
  description: string;
}

const ASSETS: AssetConfig[] = [
  { label: "S&P 500", data: SP500, devise: "USD", description: "Indice boursier americain (500 plus grandes entreprises US)" },
  { label: "CAC 40", data: CAC40, devise: "EUR", description: "Indice boursier francais (40 plus grandes entreprises)" },
  { label: "Bitcoin (BTC)", data: BITCOIN, devise: "USD", description: "Cryptomonnaie decentralisee" },
];

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getAvailableYears(data: Record<string, number>): number[] {
  const years = new Set<number>();
  Object.keys(data).forEach((k) => years.add(parseInt(k.split("-")[0])));
  const arr = Array.from(years).sort((a, b) => a - b);
  // Exclure la derniere annee pour avoir au moins 12 mois de donnees
  arr.pop();
  return arr;
}

function getLastDate(data: Record<string, number>): string {
  const keys = Object.keys(data).sort();
  return keys[keys.length - 1];
}

export default function SimulateurDCA() {
  const [assetIdx, setAssetIdx] = useState(0);
  const [montant, setMontant] = useState("150");
  const [anneeDepart, setAnneeDepart] = useState("2020");

  const asset = ASSETS[assetIdx];
  const availableYears = useMemo(() => getAvailableYears(asset.data), [asset.data]);
  const mensuel = parseFloat(montant) || 0;
  const startYear = parseInt(anneeDepart) || availableYears[0];

  // Recalculer l'annee de depart si elle n'est pas dispo pour cet actif
  const validStartYear = availableYears.includes(startYear) ? startYear : availableYears[availableYears.length - 1];

  const lastDate = getLastDate(asset.data);
  const lastPrice = asset.data[lastDate];

  // Calcul DCA
  const result = useMemo(() => {
    const startKey = `${validStartYear}-01`;
    const months = Object.keys(asset.data).sort().filter((k) => k >= startKey);
    if (months.length < 2) return null;

    let totalUnits = 0;
    let totalInvested = 0;
    const evolution: { date: string; invested: number; value: number }[] = [];

    for (const month of months) {
      const price = asset.data[month];
      const units = mensuel / price;
      totalUnits += units;
      totalInvested += mensuel;

      evolution.push({
        date: month,
        invested: totalInvested,
        value: totalUnits * asset.data[month],
      });
    }

    const currentValue = totalUnits * lastPrice;
    const gain = currentValue - totalInvested;
    const gainPct = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;
    const nbYears = months.length / 12;
    const rendementAnnualise = nbYears > 0
      ? (Math.pow(currentValue / totalInvested, 1 / nbYears) - 1) * 100
      : 0;

    return {
      totalInvested,
      currentValue,
      gain,
      gainPct,
      rendementAnnualise,
      nbMonths: months.length,
      nbYears,
      totalUnits,
      evolution,
    };
  }, [asset.data, validStartYear, mensuel, lastPrice]);

  // Donnees pour le graphique (par annee)
  const chartData = useMemo(() => {
    if (!result) return [];
    const byYear: Record<string, { invested: number; value: number }> = {};
    result.evolution.forEach((e) => {
      const year = e.date.split("-")[0];
      byYear[year] = { invested: e.invested, value: e.value };
    });
    return Object.entries(byYear).map(([year, d]) => ({ year, ...d }));
  }, [result]);

  const maxChartValue = chartData.length > 0 ? Math.max(...chartData.map((d) => Math.max(d.value, d.invested))) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Formulaire */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 mb-6">Parametres</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Actif
            </label>
            <div className="grid gap-2">
              {ASSETS.map((a, i) => (
                <button
                  key={a.label}
                  onClick={() => {
                    setAssetIdx(i);
                    const years = getAvailableYears(a.data);
                    if (!years.includes(parseInt(anneeDepart))) {
                      setAnneeDepart(String(years[years.length - 1]));
                    }
                  }}
                  className={`text-left px-4 py-3 rounded-xl border-2 transition-all ${
                    assetIdx === i
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <p className="font-semibold text-sm text-slate-800">{a.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Investissement mensuel
            </label>
            <div className="relative">
              <input
                type="number"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-800"
                min="1"
                step="10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                EUR
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Investir depuis
            </label>
            <select
              value={validStartYear}
              onChange={(e) => setAnneeDepart(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-800"
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  Janvier {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 p-3 bg-slate-50 rounded-xl">
          <p className="text-xs text-slate-400">
            Donnees historiques mensuelles jusqu&apos;a {lastDate.replace("-", "/")}.
            Prix en {asset.devise}. Simulation a titre indicatif, les performances passees ne garantissent pas les resultats futurs.
          </p>
        </div>
      </div>

      {/* Resultats */}
      <div className="lg:col-span-3 space-y-6">
        {result && mensuel > 0 ? (
          <>
            {/* Chiffres cles */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-400">Total investi</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {fmt(result.totalInvested)} EUR
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {result.nbMonths} versements de {fmt(mensuel)} EUR
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-400">Valeur actuelle</p>
                <p className={`text-2xl font-bold mt-1 ${result.gain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {fmt(result.currentValue)} EUR
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  au {lastDate.replace("-", "/")}
                </p>
              </div>
              <div className={`rounded-2xl border p-5 ${result.gain >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                <p className="text-sm text-slate-500">Gain / Perte</p>
                <p className={`text-2xl font-bold mt-1 ${result.gain >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                  {result.gain >= 0 ? "+" : ""}{fmt(result.gain)} EUR
                </p>
                <p className={`text-sm font-semibold mt-1 ${result.gain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {result.gain >= 0 ? "+" : ""}{result.gainPct.toFixed(1)}%
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-400">Rendement annualise</p>
                <p className={`text-2xl font-bold mt-1 ${result.rendementAnnualise >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {result.rendementAnnualise >= 0 ? "+" : ""}{result.rendementAnnualise.toFixed(1)}% / an
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  sur {result.nbYears.toFixed(1)} ans
                </p>
              </div>
            </div>

            {/* Phrase resumee */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
              <p className="text-slate-700 leading-relaxed">
                Si vous aviez investi <strong>{fmt(mensuel)} EUR par mois</strong> sur le{" "}
                <strong>{asset.label}</strong> depuis <strong>janvier {validStartYear}</strong>,
                vous auriez investi au total <strong>{fmt(result.totalInvested)} EUR</strong> et
                votre portefeuille vaudrait aujourd&apos;hui{" "}
                <strong className={result.gain >= 0 ? "text-emerald-700" : "text-red-700"}>
                  {fmt(result.currentValue)} EUR
                </strong>
                , soit un {result.gain >= 0 ? "benefice" : "deficit"} de{" "}
                <strong className={result.gain >= 0 ? "text-emerald-700" : "text-red-700"}>
                  {result.gain >= 0 ? "+" : ""}{result.gainPct.toFixed(1)}%
                </strong>.
              </p>
            </div>

            {/* Graphique barres */}
            {chartData.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Evolution du portefeuille</h3>
                <div className="space-y-2">
                  {chartData.map((d) => (
                    <div key={d.year} className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 w-10 text-right font-mono">{d.year}</span>
                      <div className="flex-1 relative h-7">
                        {/* Barre investissement */}
                        <div
                          className="absolute top-0 left-0 h-full bg-slate-200 rounded-md"
                          style={{ width: `${(d.invested / maxChartValue) * 100}%` }}
                        />
                        {/* Barre valeur */}
                        <div
                          className={`absolute top-0 left-0 h-full rounded-md ${
                            d.value >= d.invested ? "bg-emerald-400/70" : "bg-red-400/70"
                          }`}
                          style={{ width: `${(d.value / maxChartValue) * 100}%` }}
                        />
                        <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                          <span className="text-xs font-medium text-slate-700 drop-shadow-sm">
                            {fmt(d.value)}
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
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-400">
              Entrez un montant mensuel pour voir la simulation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
