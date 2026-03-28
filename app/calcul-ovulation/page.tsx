import type { Metadata } from "next";
import CalculateurOvulation from "./CalculateurOvulation";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Calcul Ovulation 2026 - Calendrier de fertilite gratuit",
  description:
    "Calculez votre date d'ovulation et votre periode fertile. Calendrier de fertilite, duree du cycle, prochaines regles. Outil gratuit et instantane.",
  keywords:
    "calcul ovulation, calendrier ovulation, date ovulation, periode fertile, fenetre fertilite, cycle menstruel, calcul jour fertile, concevoir bebe, ovulation calcul, calendrier fertilite",
};

export default function Page() {
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
                name: "Comment calculer sa date d'ovulation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'ovulation survient generalement 14 jours avant les prochaines regles. Pour un cycle de 28 jours, l'ovulation a lieu vers le jour 14. Pour un cycle de 30 jours, vers le jour 16. La formule est : jour d'ovulation = duree du cycle - 14.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de jours dure la fenetre de fertilite ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La fenetre de fertilite dure environ 6 jours : les 5 jours avant l'ovulation et le jour de l'ovulation lui-meme. Les spermatozoides peuvent survivre 3 a 5 jours dans l'uterus, tandis que l'ovule est fecondable pendant 12 a 24 heures apres l'ovulation.",
                },
              },
              {
                "@type": "Question",
                name: "Quels sont les signes de l'ovulation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les signes de l'ovulation incluent : une glaire cervicale transparente et filante (type blanc d'oeuf), une legere douleur au bas-ventre (mittelschmerz), une hausse de la temperature basale de 0,2 a 0,5 degC, une augmentation de la libido et parfois un leger spotting.",
                },
              },
              {
                "@type": "Question",
                name: "Un cycle irregulier empeche-t-il de calculer l'ovulation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un cycle irregulier rend le calcul moins precis mais pas impossible. On se base sur la duree moyenne des derniers cycles. Des outils complementaires comme les tests d'ovulation (LH), la courbe de temperature ou le suivi de la glaire cervicale permettent de mieux identifier l'ovulation.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Ovulation" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🌸
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Ovulation 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre date d&apos;ovulation et votre fenetre de fertilite
        en fonction de votre cycle menstruel.
      </p>

      <CalculateurOvulation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tout savoir sur l&apos;ovulation et la fertilite
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;<strong>ovulation</strong> est le moment ou un ovule mature est
          libere par l&apos;ovaire et devient disponible pour la fecondation.
          C&apos;est la periode la plus fertile du cycle menstruel. Comprendre
          son cycle permet de maximiser ses chances de conception ou, a
          l&apos;inverse, de savoir quand on est le plus fertile.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment calculer sa date d&apos;ovulation ?
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          L&apos;ovulation survient <strong>14 jours avant les prochaines
          regles</strong>, quelle que soit la duree du cycle. C&apos;est la
          phase luteale (apres l&apos;ovulation) qui est fixe a 14 jours. La
          phase folliculaire (avant l&apos;ovulation) varie selon les femmes.
        </p>
        <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 mb-4">
          <p className="font-mono text-sm text-pink-800 font-bold">
            Jour d&apos;ovulation = Duree du cycle - 14
          </p>
          <p className="text-xs text-pink-600 mt-1">
            Exemple : cycle de 30 jours → ovulation au jour 16
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Date d&apos;ovulation selon la duree du cycle
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree du cycle</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Jour d&apos;ovulation</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Fenetre fertile</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cycle: 21, ovu: 7, fertile: "J2 a J8" },
                { cycle: 24, ovu: 10, fertile: "J5 a J11" },
                { cycle: 26, ovu: 12, fertile: "J7 a J13" },
                { cycle: 28, ovu: 14, fertile: "J9 a J15" },
                { cycle: 30, ovu: 16, fertile: "J11 a J17" },
                { cycle: 32, ovu: 18, fertile: "J13 a J19" },
                { cycle: 35, ovu: 21, fertile: "J16 a J22" },
              ].map((row) => (
                <tr key={row.cycle} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-medium text-slate-700">{row.cycle} jours</td>
                  <td className="py-2.5 px-2 text-right font-bold text-pink-600">Jour {row.ovu}</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{row.fertile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La fenetre de fertilite
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          La <strong>fenetre de fertilite</strong> dure environ <strong>6 jours</strong> :
          les 5 jours avant l&apos;ovulation et le jour de l&apos;ovulation. Pourquoi ?
          Parce que les spermatozoides survivent <strong>3 a 5 jours</strong> dans
          les voies genitales feminines, tandis que l&apos;ovule n&apos;est
          fecondable que pendant <strong>12 a 24 heures</strong>.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
            <p className="font-semibold text-pink-700 text-sm">J-5 a J-3</p>
            <p className="text-2xl font-extrabold text-pink-800 mt-1">Peu fertile</p>
            <p className="text-xs text-pink-500 mt-1">Debut de la fenetre</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
            <p className="font-semibold text-pink-700 text-sm">J-2 a J-1</p>
            <p className="text-2xl font-extrabold text-pink-800 mt-1">Tres fertile</p>
            <p className="text-xs text-pink-500 mt-1">Meilleur moment</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
            <p className="font-semibold text-pink-700 text-sm">Jour J</p>
            <p className="text-2xl font-extrabold text-pink-800 mt-1">Ovulation</p>
            <p className="text-xs text-pink-500 mt-1">Pic de fertilite</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les signes de l&apos;ovulation
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Glaire cervicale :</strong> elle devient transparente, filante
            et elastique (aspect &quot;blanc d&apos;oeuf&quot;), facilitant le
            passage des spermatozoides.
          </li>
          <li>
            <strong>Temperature basale :</strong> elle augmente de 0,2 a 0,5 degC
            apres l&apos;ovulation et reste elevee jusqu&apos;aux prochaines regles.
          </li>
          <li>
            <strong>Douleur pelvienne :</strong> environ 20% des femmes ressentent
            une douleur au bas-ventre (mittelschmerz) du cote de l&apos;ovaire qui ovule.
          </li>
          <li>
            <strong>Test d&apos;ovulation (LH) :</strong> detecte le pic de
            l&apos;hormone LH 24 a 36 heures avant l&apos;ovulation. Fiable a 99%.
          </li>
          <li>
            <strong>Autres signes :</strong> hausse de la libido, seins sensibles,
            leger spotting (saignement d&apos;ovulation), odorat plus fin.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Ovulation et cycles irreguliers
        </h3>
        <p className="text-slate-600 mb-3 leading-relaxed">
          Si vos cycles varient en longueur, le calcul devient moins precis.
          Voici des methodes complementaires pour identifier votre ovulation :
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Courbe de temperature</p>
            <p className="text-xs text-slate-500 mt-1">
              Prenez votre temperature chaque matin au reveil. L&apos;ovulation
              provoque une hausse de 0,2-0,5 degC qui se maintient. Sur 2-3 cycles,
              vous identifierez votre schema.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Tests d&apos;ovulation</p>
            <p className="text-xs text-slate-500 mt-1">
              Les bandelettes urinaires detectent le pic de LH 24-36h avant
              l&apos;ovulation. Commencez a tester 4-5 jours avant la date
              d&apos;ovulation estimee.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Optimiser ses chances de concevoir
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-semibold text-green-700 text-sm">A faire</p>
            <ul className="text-xs text-green-600 mt-2 space-y-1">
              <li>Rapports tous les 2 jours pendant la fenetre fertile</li>
              <li>Acide folique (400 mcg/jour) des 3 mois avant</li>
              <li>Alimentation equilibree et exercice modere</li>
              <li>Limiter le stress et dormir suffisamment</li>
            </ul>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-semibold text-red-700 text-sm">A eviter</p>
            <ul className="text-xs text-red-600 mt-2 space-y-1">
              <li>Tabac, alcool et drogues (baisse de fertilite)</li>
              <li>Stress excessif (peut retarder l&apos;ovulation)</li>
              <li>Poids trop bas ou trop eleve (perturbe le cycle)</li>
              <li>Lubrifiants classiques (toxiques pour les spermatozoides)</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Quand consulter ?
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Il est recommande de consulter un medecin ou un gynecologue si vous
          n&apos;arrivez pas a concevoir apres <strong>12 mois de rapports
          reguliers</strong> (6 mois si vous avez plus de 35 ans). Des examens
          simples (bilan hormonal, echographie, spermogramme) permettent
          d&apos;identifier d&apos;eventuelles causes d&apos;infertilite. En
          France, la PMA (procreation medicalement assistee) est remboursee
          par la Securite sociale pour les femmes de moins de 43 ans.
        </p>
      </section>

      {/* Cross-link vers date d'accouchement */}
      <section className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🤰</div>
          <div>
            <h3 className="font-bold text-slate-800">
              Deja enceinte ? Calculez votre date d&apos;accouchement
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Decouvrez votre DPA, vos semaines d&apos;amenorrhee, les dates
              de vos echographies et le debut de votre conge maternite.
            </p>
            <a
              href="/calcul-date-accouchement"
              className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 mt-2"
            >
              Calcul date d&apos;accouchement
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-ovulation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
