import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculateurOvulation from "../CalculateurOvulation";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";

const CYCLE_LENGTHS = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
const SITUATIONS = ["conception", "regles-irregulieres", "apres-pilule", "allaitement"];

interface ParsedParams {
  type: "cycle" | "situation";
  cycleLength?: number;
  situation?: string;
}

function parseSlug(slug: string): ParsedParams | null {
  // Format: cycle-28-jours
  const cycleMatch = slug.match(/^cycle-(\d+)-jours$/);
  if (cycleMatch) {
    const cycle = parseInt(cycleMatch[1]);
    if (CYCLE_LENGTHS.includes(cycle)) {
      return { type: "cycle", cycleLength: cycle };
    }
  }

  // Format: ovulation-et-conception, ovulation-et-regles-irregulieres, etc.
  const situationMatch = slug.match(/^ovulation-et-(.+)$/);
  if (situationMatch && SITUATIONS.includes(situationMatch[1])) {
    return { type: "situation", situation: situationMatch[1] };
  }

  return null;
}

export async function generateStaticParams() {
  const params: { params: string }[] = [];

  for (const c of CYCLE_LENGTHS) {
    params.push({ params: `cycle-${c}-jours` });
  }

  for (const s of SITUATIONS) {
    params.push({ params: `ovulation-et-${s}` });
  }

  return params;
}

function getSituationTitle(situation: string): string {
  const map: Record<string, string> = {
    conception: "Conception",
    "regles-irregulieres": "Regles Irregulieres",
    "apres-pilule": "Apres Pilule",
    allaitement: "Allaitement",
  };
  return map[situation] || situation;
}

function getSituationDescription(situation: string): string {
  const map: Record<string, string> = {
    conception: "Maximisez vos chances de concevoir en calculant votre date d'ovulation. Fenetre de fertilite, meilleurs jours, conseils pour tomber enceinte.",
    "regles-irregulieres": "Comment calculer son ovulation avec des regles irregulieres ? Methodes alternatives, courbe de temperature, tests d'ovulation LH.",
    "apres-pilule": "Retour de l'ovulation apres l'arret de la pilule contraceptive. Delais, retrouver un cycle regulier, quand peut-on concevoir ?",
    allaitement: "Ovulation et allaitement : quand revient la fertilite ? Retour de couches, cycles pendant l'allaitement maternel.",
  };
  return map[situation] || "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === "cycle") {
    const c = parsed.cycleLength!;
    const ovuDay = c - 14;
    return {
      title: `Ovulation Cycle de ${c} Jours - Jour ${ovuDay}, Calendrier Fertile`,
      description: `Calculez votre ovulation pour un cycle de ${c} jours. Ovulation au jour ${ovuDay}, fenetre fertile du jour ${ovuDay - 5} au jour ${ovuDay + 1}. Calendrier et conseils.`,
    };
  }

  return {
    title: `Calcul Ovulation et ${getSituationTitle(parsed.situation!)} - Guide 2026`,
    description: getSituationDescription(parsed.situation!),
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

  if (parsed.type === "cycle") {
    const c = parsed.cycleLength!;
    const ovuDay = c - 14;
    const fertileStart = ovuDay - 5;
    const fertileEnd = ovuDay + 1;

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
                  name: `Quand a lieu l'ovulation avec un cycle de ${c} jours ?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Avec un cycle de ${c} jours, l'ovulation survient generalement au jour ${ovuDay} du cycle (${c} - 14 = ${ovuDay}). La fenetre de fertilite s'etend du jour ${fertileStart} au jour ${fertileEnd}.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `Un cycle de ${c} jours est-il normal ?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `${c < 25 ? `Un cycle de ${c} jours est un peu court mais reste dans la normale (21-35 jours). La phase folliculaire est plus courte, l'ovulation arrive plus tot.` : c > 30 ? `Un cycle de ${c} jours est un peu long mais reste dans la normale (21-35 jours). La phase folliculaire est plus longue, l'ovulation arrive plus tard.` : `Un cycle de ${c} jours est parfaitement normal. La duree moyenne d'un cycle est de 28 jours, mais la plage normale va de 21 a 35 jours.`}`,
                  },
                },
              ],
            }),
          }}
        />
        <Breadcrumb
          currentPage={`Cycle ${c} jours`}
          parentPage="Calcul Ovulation"
          parentHref="/calcul-ovulation"
        />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
            🌸
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Ovulation : Cycle de {c} Jours
          </h1>
        </div>
        <p className="text-slate-500 mb-8 ml-[52px]">
          Avec un cycle de {c} jours, votre ovulation a lieu au{" "}
          <strong>jour {ovuDay}</strong>. Fenetre fertile : jour {fertileStart}{" "}
          a {fertileEnd}.
        </p>

        <CalculateurOvulation initialCycle={c} />

        <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

        <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Tout savoir sur le cycle de {c} jours
          </h2>

          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center">
              <p className="text-sm text-pink-600 font-medium">Ovulation</p>
              <p className="text-3xl font-extrabold text-pink-700 mt-1">Jour {ovuDay}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center">
              <p className="text-sm text-pink-600 font-medium">Fenetre fertile</p>
              <p className="text-3xl font-extrabold text-pink-700 mt-1">J{fertileStart}-J{fertileEnd}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center">
              <p className="text-sm text-pink-600 font-medium">Duree du cycle</p>
              <p className="text-3xl font-extrabold text-pink-700 mt-1">{c} jours</p>
            </div>
          </div>

          <h3 className="font-bold text-slate-800 mt-6 mb-3">
            Comparaison avec d&apos;autres durees de cycle
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Cycle</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Ovulation</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Fenetre fertile</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Phase folliculaire</th>
                </tr>
              </thead>
              <tbody>
                {CYCLE_LENGTHS.filter((cl) => cl % 2 === 0 || cl === c || cl === 28).map((cl) => {
                  const ov = cl - 14;
                  const isCurrent = cl === c;
                  return (
                    <tr
                      key={cl}
                      className={`border-b border-slate-100 ${isCurrent ? "bg-pink-50 font-bold" : ""}`}
                    >
                      <td className="py-2.5 px-2 text-slate-700">
                        {isCurrent ? (
                          <span className="text-pink-600">{cl} jours (votre cycle)</span>
                        ) : (
                          <a href={`/calcul-ovulation/cycle-${cl}-jours`} className="text-blue-600 hover:underline">
                            {cl} jours
                          </a>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-700">Jour {ov}</td>
                      <td className="py-2.5 px-2 text-right text-slate-500">J{ov - 5} a J{ov + 1}</td>
                      <td className="py-2.5 px-2 text-right text-slate-500">{ov} jours</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 leading-relaxed">
            {c < 25
              ? `Un cycle de ${c} jours est plus court que la moyenne. Votre phase folliculaire est de ${ovuDay} jours seulement, ce qui signifie que l'ovulation arrive rapidement apres les regles. Cela peut etre normal pour certaines femmes. Si vos cycles sont regulierement courts et que vous essayez de concevoir, les rapports doivent commencer tot dans le cycle.`
              : c > 30
                ? `Un cycle de ${c} jours est plus long que la moyenne de 28 jours. Votre phase folliculaire dure ${ovuDay} jours, ce qui retarde l'ovulation. Cela peut etre du a un syndrome des ovaires polykystiques (SOPK), au stress, a des variations hormonales ou simplement a votre physiologie. Si vos cycles depassent regulierement 35 jours, consultez votre gynecologue.`
                : `Un cycle de ${c} jours est parfaitement normal et proche de la moyenne de 28 jours. Votre ovulation a lieu au jour ${ovuDay}, avec une fenetre de fertilite de 6 jours. Pour maximiser vos chances de concevoir, privilégiez les rapports les 2 jours avant l'ovulation.`}
          </p>
        </section>

        <RelatedCalculators currentSlug="/calcul-ovulation" />
        <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
      </div>
    );
  }

  // Situation pages
  const situation = parsed.situation!;
  const title = getSituationTitle(situation);

  const content: Record<string, React.ReactNode> = {
    conception: (
      <>
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Calculer son ovulation pour tomber enceinte
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Pour maximiser vos chances de <strong>conception</strong>, il est
          essentiel de connaitre votre <strong>date d&apos;ovulation</strong>.
          La probabilite de concevoir est la plus elevee lors de rapports
          dans les <strong>2 jours precedant l&apos;ovulation</strong>.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Probabilite de conception par jour</h3>
        <div className="space-y-2 mb-6">
          {[
            { jour: "J-5 (5 jours avant)", prob: 10 },
            { jour: "J-4 (4 jours avant)", prob: 16 },
            { jour: "J-3 (3 jours avant)", prob: 14 },
            { jour: "J-2 (2 jours avant)", prob: 27 },
            { jour: "J-1 (veille)", prob: 31 },
            { jour: "Jour J (ovulation)", prob: 33 },
            { jour: "J+1 (lendemain)", prob: 0 },
          ].map((d) => (
            <div key={d.jour} className="flex items-center gap-3">
              <div className="w-40 text-sm text-slate-600 shrink-0">{d.jour}</div>
              <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-pink-400"
                  style={{ width: `${d.prob}%` }}
                />
              </div>
              <div className="w-10 text-sm font-bold text-slate-700 text-right">{d.prob}%</div>
            </div>
          ))}
        </div>
        <p className="text-slate-600 leading-relaxed">
          En moyenne, un couple fertile a environ <strong>25% de chances</strong> de
          concevoir par cycle. 85% des couples concoivent dans les 12 premiers mois
          d&apos;essais. Si rien ne se passe apres 12 mois (6 mois apres 35 ans),
          consultez votre medecin.
        </p>
      </>
    ),
    "regles-irregulieres": (
      <>
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Ovulation et regles irregulieres
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si vos <strong>regles sont irregulieres</strong>, la date d&apos;ovulation
          varie d&apos;un cycle a l&apos;autre. Le calcul standard (cycle - 14) devient
          moins fiable. Voici comment vous y retrouver.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Methodes alternatives</h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Courbe de temperature</p>
            <p className="text-xs text-slate-500 mt-1">
              Mesurez votre temperature chaque matin au reveil pendant 2-3 cycles.
              L&apos;ovulation provoque une hausse de 0,2-0,5 degC qui se maintient
              jusqu&apos;aux prochaines regles. Apres quelques cycles, vous identifierez
              votre schema personnel.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Tests d&apos;ovulation (LH)</p>
            <p className="text-xs text-slate-500 mt-1">
              Fiables a 99%, ils detectent le pic de LH 24-36h avant l&apos;ovulation.
              Avec des cycles irreguliers, commencez a tester tot (vers J8-J10)
              et continuez jusqu&apos;au resultat positif.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Glaire cervicale</p>
            <p className="text-xs text-slate-500 mt-1">
              Observez la glaire cervicale : quand elle devient transparente,
              filante et elastique comme du blanc d&apos;oeuf, l&apos;ovulation approche.
              C&apos;est le signe le plus accessible et gratuit.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Applications de suivi</p>
            <p className="text-xs text-slate-500 mt-1">
              Des applications comme Clue, Flo ou Natural Cycles combinent
              plusieurs indicateurs pour predire l&apos;ovulation, meme avec des
              cycles irreguliers. Plus vous renseignez de donnees, plus les
              predictions s&apos;affinent.
            </p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Causes frequentes de cycles irreguliers</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li><strong>SOPK</strong> (syndrome des ovaires polykystiques) : 1 femme sur 10</li>
          <li><strong>Stress</strong> et fatigue : peuvent retarder ou bloquer l&apos;ovulation</li>
          <li><strong>Variations de poids</strong> : perte ou prise rapide de poids</li>
          <li><strong>Thyroide</strong> : hypo ou hyperthyroidie</li>
          <li><strong>Peri-menopause</strong> : irregularites a partir de 40-45 ans</li>
          <li><strong>Exercice intense</strong> : peut perturber le cycle</li>
        </ul>
      </>
    ),
    "apres-pilule": (
      <>
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Retour de l&apos;ovulation apres la pilule
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Apres l&apos;arret de la <strong>pilule contraceptive</strong>, l&apos;ovulation
          revient generalement rapidement. Voici ce qu&apos;il faut savoir.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Delais de retour a la fertilite</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Contraception</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Retour ovulation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Delai moyen conception</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Pilule combinee</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 a 3 mois</td>
                <td className="py-2.5 px-2 text-right text-slate-600">3 a 6 mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Pilule progestative</td>
                <td className="py-2.5 px-2 text-right text-slate-600">Immediat a 1 mois</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 a 3 mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Implant</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 a 3 mois</td>
                <td className="py-2.5 px-2 text-right text-slate-600">3 a 6 mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-medium text-slate-700">Sterilet hormonal</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 a 3 mois</td>
                <td className="py-2.5 px-2 text-right text-slate-600">3 a 12 mois</td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-medium text-slate-700">Sterilet cuivre</td>
                <td className="py-2.5 px-2 text-right text-slate-600">Immediat</td>
                <td className="py-2.5 px-2 text-right text-slate-600">1 a 3 mois</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed">
          La pilule ne diminue pas la fertilite a long terme. Les premiers cycles
          apres l&apos;arret peuvent etre irreguliers (absence de regles ou cycles
          longs). C&apos;est normal. Si vos regles ne reviennent pas apres 3 mois,
          consultez votre gynecologue.
        </p>
      </>
    ),
    allaitement: (
      <>
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Ovulation et allaitement maternel
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>allaitement</strong> peut retarder le retour de l&apos;ovulation
          grace a l&apos;hormone prolactine qui inhibe la production de LH et FSH.
          Mais attention : l&apos;allaitement n&apos;est pas une methode
          contraceptive fiable a 100%.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">La MAMA (Methode de l&apos;Allaitement Maternel et de l&apos;Amenorrhee)</h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La MAMA est efficace a 98% pendant les <strong>6 premiers mois</strong>,
          mais uniquement si les 3 conditions sont reunies simultanement :
        </p>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center">
            <p className="text-2xl mb-2">🍼</p>
            <p className="font-semibold text-pink-700 text-sm">Allaitement exclusif</p>
            <p className="text-xs text-pink-500 mt-1">Pas de biberon, ni lait artificiel</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center">
            <p className="text-2xl mb-2">🩸</p>
            <p className="font-semibold text-pink-700 text-sm">Pas de retour de couches</p>
            <p className="text-xs text-pink-500 mt-1">Aucune regle depuis l&apos;accouchement</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center">
            <p className="text-2xl mb-2">📅</p>
            <p className="font-semibold text-pink-700 text-sm">Bebe &lt; 6 mois</p>
            <p className="text-xs text-pink-500 mt-1">Moins de 6 mois apres la naissance</p>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 mt-6 mb-3">Retour de couches</h3>
        <p className="text-slate-600 leading-relaxed">
          Le <strong>retour de couches</strong> (premieres regles apres
          l&apos;accouchement) survient en moyenne 6 a 8 semaines apres
          l&apos;accouchement sans allaitement, ou plusieurs mois apres
          l&apos;accouchement avec allaitement. L&apos;ovulation peut survenir
          <strong> avant</strong> le retour de couches — il est donc possible
          de tomber enceinte sans avoir eu de regles.
        </p>
      </>
    ),
  };

  return (
    <div>
      <Breadcrumb
        currentPage={`Ovulation et ${title}`}
        parentPage="Calcul Ovulation"
          parentHref="/calcul-ovulation"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌸
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Ovulation et {title}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        {getSituationDescription(situation)}
      </p>

      <CalculateurOvulation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        {content[situation]}
      </section>

      {/* Liens internes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Guides sur l&apos;ovulation</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {SITUATIONS.filter((s) => s !== situation).map((s) => (
            <a
              key={s}
              href={`/calcul-ovulation/ovulation-et-${s}`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>→</span> Ovulation et {getSituationTitle(s).toLowerCase()}
            </a>
          ))}
          {CYCLE_LENGTHS.filter((cl) => cl % 3 === 0 || cl === 28).map((cl) => (
            <a
              key={cl}
              href={`/calcul-ovulation/cycle-${cl}-jours`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>→</span> Ovulation cycle {cl} jours
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-ovulation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
