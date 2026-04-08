import type { Metadata } from "next";
import CalculateurPoidsIdeal from "./CalculateurPoidsIdeal";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Poids Ideal 2026 - Lorentz, Devine, Creff Gratuit",
  description:
    "Calculez votre poids ideal gratuitement avec les 3 formules de reference : Lorentz, Devine et Creff. Fourchette de poids sain, comparaison homme/femme selon la taille et l'age.",
  keywords:
    "calcul poids ideal, poids ideal homme, poids ideal femme, formule lorentz, formule devine, formule creff, poids sain, IMC ideal",
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quelle est la formule la plus fiable pour calculer le poids ideal ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Il n'existe pas de formule universelle. La formule de Lorentz est la plus connue et simple a utiliser. La formule de Devine est utilisee en milieu medical. La formule de Creff integre l'age et la morphologie, ce qui la rend plus personnalisee. La moyenne des 3 formules donne une estimation equilibree.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le poids ideal pour une femme de 165 cm ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour une femme de 165 cm, le poids ideal selon la formule de Lorentz est d'environ 58 kg. La fourchette saine (IMC entre 18,5 et 24,9) se situe entre 50,3 kg et 67,8 kg. La formule de Devine donne environ 55,2 kg et la formule de Creff (morphologie normale, 30 ans) donne environ 59,6 kg.",
        },
      },
      {
        "@type": "Question",
        name: "L'age influence-t-il le poids ideal ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, mais uniquement dans la formule de Creff. Cette formule integre l'age car la masse musculaire et la densite osseuse evoluent avec l'age. Les formules de Lorentz et Devine ne prennent pas l'age en compte. En general, un leger surplus de poids apres 60 ans est considere comme protecteur.",
        },
      },
    ],
  };

  return (
    <div>
      <WebAppJsonLd name="Calcul Poids Ideal" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb currentPage="Calcul Poids Ideal" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⚖️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Poids Ideal 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre poids ideal selon les formules de Lorentz, Devine et Creff.
        Comparez les 3 methodes et trouvez votre fourchette de poids sain.
      </p>

      <CalculateurPoidsIdeal />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* SEO : explication des formules */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer son poids ideal ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Il n&apos;existe pas de definition universelle du <strong>poids ideal</strong>.
          Les professionnels de sante utilisent plusieurs formules de reference,
          chacune ayant ses specificites. Notre calculateur compare les 3 principales
          formules pour vous donner une estimation equilibree.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule de Lorentz</h3>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-3">
          <p className="font-mono text-sm text-blue-800 mb-1">
            Homme : Taille (cm) − 100 − (Taille − 150) / 4
          </p>
          <p className="font-mono text-sm text-blue-800">
            Femme : Taille (cm) − 100 − (Taille − 150) / 2,5
          </p>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La formule de Lorentz est la plus connue du grand public. Elle prend en compte
          la difference de morphologie entre hommes et femmes mais ne tient pas compte
          de l&apos;age.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule de Devine</h3>
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-3">
          <p className="font-mono text-sm text-emerald-800 mb-1">
            Homme : 50 + 2,3 × (Taille en pouces − 60)
          </p>
          <p className="font-mono text-sm text-emerald-800">
            Femme : 45,5 + 2,3 × (Taille en pouces − 60)
          </p>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Etablie par le Dr Devine en 1974, cette formule est utilisee en milieu hospitalier
          pour le dosage des medicaments. Elle est exprimee en pouces, d&apos;ou la conversion
          de la taille.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La formule de Creff</h3>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-3">
          <p className="font-mono text-sm text-amber-800">
            (Taille − 100 + Age / 10) × 0,9 × coefficient morphologie
          </p>
          <p className="text-xs text-amber-700 mt-1">
            Coefficient : mince = 0,9 | normal = 1 | large = 1,1
          </p>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La formule de Creff est la plus personnalisee car elle integre l&apos;age et la
          morphologie (ossature). Elle reconnaît qu&apos;une personne a ossature forte peut
          peser plus sans etre en surpoids.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Tableau poids ideal par taille — Homme
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-slate-600 font-semibold">Taille</th>
                <th className="text-right py-2.5 px-3 text-blue-600 font-semibold">Lorentz</th>
                <th className="text-right py-2.5 px-3 text-emerald-600 font-semibold">Devine</th>
                <th className="text-right py-2.5 px-3 text-violet-600 font-semibold">Fourchette IMC</th>
              </tr>
            </thead>
            <tbody>
              {[160, 165, 170, 175, 180, 185, 190].map((t) => {
                const tM = t / 100;
                const lorentz = t - 100 - (t - 150) / 4;
                const devine = 50 + 2.3 * (t / 2.54 - 60);
                const fMin = Math.round(tM * tM * 18.5 * 10) / 10;
                const fMax = Math.round(tM * tM * 24.9 * 10) / 10;
                return (
                  <tr key={t} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2.5 px-3">
                      <a
                        href={`/calcul-poids-ideal/homme-${t}cm-30ans`}
                        className="font-medium text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {t} cm
                      </a>
                    </td>
                    <td className="py-2.5 px-3 text-right text-blue-700 font-medium">{lorentz.toFixed(1)} kg</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-medium">{devine.toFixed(1)} kg</td>
                    <td className="py-2.5 px-3 text-right text-violet-700 font-medium">{fMin} – {fMax} kg</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Tableau poids ideal par taille — Femme
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-slate-600 font-semibold">Taille</th>
                <th className="text-right py-2.5 px-3 text-blue-600 font-semibold">Lorentz</th>
                <th className="text-right py-2.5 px-3 text-emerald-600 font-semibold">Devine</th>
                <th className="text-right py-2.5 px-3 text-violet-600 font-semibold">Fourchette IMC</th>
              </tr>
            </thead>
            <tbody>
              {[155, 158, 160, 163, 165, 168, 170, 173, 175].map((t) => {
                const tM = t / 100;
                const lorentz = t - 100 - (t - 150) / 2.5;
                const devine = 45.5 + 2.3 * (t / 2.54 - 60);
                const fMin = Math.round(tM * tM * 18.5 * 10) / 10;
                const fMax = Math.round(tM * tM * 24.9 * 10) / 10;
                return (
                  <tr key={t} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-2.5 px-3">
                      <a
                        href={`/calcul-poids-ideal/femme-${t}cm-30ans`}
                        className="font-medium text-slate-700 hover:text-violet-600 transition-colors"
                      >
                        {t} cm
                      </a>
                    </td>
                    <td className="py-2.5 px-3 text-right text-blue-700 font-medium">{lorentz.toFixed(1)} kg</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-medium">{devine.toFixed(1)} kg</td>
                    <td className="py-2.5 px-3 text-right text-violet-700 font-medium">{fMin} – {fMax} kg</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Conseils pour atteindre son poids ideal
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1.5 leading-relaxed">
          <li>Ne pas chercher a perdre plus de 0,5 a 1 kg par semaine pour preserver la masse musculaire</li>
          <li>Privilegier une alimentation equilibree plutot que les regimes restrictifs</li>
          <li>Pratiquer une activite physique reguliere pour ameliorer la composition corporelle</li>
          <li>Le poids ideal est une estimation : l&apos;important est de se sentir bien dans son corps</li>
          <li>Consulter un medecin ou un nutritionniste pour un suivi personnalise</li>
        </ul>

        <p className="text-xs text-slate-400 mt-6">
          Mis a jour le 8 avril 2026
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-poids-ideal" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
