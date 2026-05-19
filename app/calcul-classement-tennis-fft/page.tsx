import type { Metadata } from "next";
import CalculClassementTennisFFT from "./CalculClassementTennisFFT";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-classement-tennis-fft" },
  title: "Calcul Classement Tennis FFT 2026 - Estimer son Classement",
  description:
    "Calculez votre progression de classement tennis FFT. Évaluez votre bilan de saison (victoires, défaites) selon le système V-E-2I-5G. Outil gratuit pour les tennismen.",
  keywords:
    "calcul classement tennis fft, classement 30/3 15/5, bilan tennis, progression amateur, systeme fft, v-e-2i-5g",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Classement Tennis FFT - Estimer sa progression" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment fonctionne le classement tennis FFT ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le classement FFT (Fédération Française de Tennis) utilise un système de points appelé V-E-2I-5G. V = victoires, E = égalités, 2I = 2 items (points perdus pour défaites contre joueur moins bien classé), 5G = 5 G (bonus victoires d&apos;or contre joueurs mieux classés). Le bilan annuel determine la progression ou regression du classement.",
                },
              },
              {
                "@type": "Question",
                name: "Qu&apos;est-ce que le système V-E-2I-5G ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "C&apos;est la formule officielle FFT : V = victoires (points positifs), E = egalites (moins courant en moderne), 2I = moins 2 points par defaite contre joueur moins bien classé (penalite de regression), 5G = bonus pour les 5 meilleures victoires contre joueurs mieux classes (gold wins). Cette formule encourage les victoires contre plus fort.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de victoires faut-il pour progresser en tennis ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cela depend du classement actuel et des adversaires affrontes. Pour passer de NC a 40 : 2-3 victoires suffisent. Pour passer de 40 a 30/5 : environ 5 victoires. Pour passer de 30/2 a 15/5 : 5-7 victoires. Les victoires contre plus fort classement comptent beaucoup plus.",
                },
              },
              {
                "@type": "Question",
                name: "Est-ce que les defaites font diminuer le classement ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui. Les defaites contre des joueurs moins bien classes coutent 2 points chacune. Les defaites contre plus fort count peu ou pas. Ce systeme encourage la coherence : si vous perdez contre moins bon, votre bilan se degrade et progression stagne.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Classement Tennis FFT" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Classement Tennis FFT
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre progression de classement selon votre bilan de saison.
      </p>

      <CalculClassementTennisFFT />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Échelle FFT complète
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Voici l&apos;ordre complet du classement tennis FFT en France, du meilleur au moins bon.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Catégorie
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Classements
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-red-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">Élite</td>
                <td className="py-3 px-2 text-slate-600">1 à 100</td>
                <td className="py-3 px-2 text-slate-600">
                  Classements numérotés les plus hauts
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-yellow-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  1ère série
                </td>
                <td className="py-3 px-2 text-slate-600">
                  -30, -15, -4/6, -2/6, 0
                </td>
                <td className="py-3 px-2 text-slate-600">
                  Très bon niveau national
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-emerald-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  2ème série
                </td>
                <td className="py-3 px-2 text-slate-600">
                  1/6, 2/6, 3/6, 4/6, 5/6
                </td>
                <td className="py-3 px-2 text-slate-600">
                  Bon niveau régional
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-cyan-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  3ème série
                </td>
                <td className="py-3 px-2 text-slate-600">
                  15, 15/1, 15/2, 15/3, 15/4, 15/5
                </td>
                <td className="py-3 px-2 text-slate-600">
                  Bon amateur
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-blue-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  4ème série
                </td>
                <td className="py-3 px-2 text-slate-600">
                  30, 30/1, 30/2, 30/3, 30/4, 30/5
                </td>
                <td className="py-3 px-2 text-slate-600">
                  Amateur moyen
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-purple-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  5ème série
                </td>
                <td className="py-3 px-2 text-slate-600">40</td>
                <td className="py-3 px-2 text-slate-600">
                  Débutant confirmé
                </td>
              </tr>
              <tr className="hover:bg-slate-50 bg-slate-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  Non-classé
                </td>
                <td className="py-3 px-2 text-slate-600">NC</td>
                <td className="py-3 px-2 text-slate-600">
                  Débutant / 0 victoire
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Système V-E-2I-5G expliqué
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le bilan annuel FFT se calcule selon cette formule officielle :
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">V</h3>
            <p className="text-sm text-slate-600">
              <strong>Victoires</strong> — Points positifs. Plus les adversaires sont mieux classés, plus les points comptent. Victoire contre -15 = très gros bonus.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">E</h3>
            <p className="text-sm text-slate-600">
              <strong>Égalités</strong> — Très rare en tennis moderne. Compte peu ou pas.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">2I</h3>
            <p className="text-sm text-slate-600">
              <strong>2 Items (défaites)</strong> — Défaite contre moins bon = -2 points. Pénalité d&apos;incohérence. Défaite contre mieux classé = peu ou 0 points.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">5G</h3>
            <p className="text-sm text-slate-600">
              <strong>5 Gold Wins</strong> — Les 5 meilleures victoires (contre plus fort) sont bonifiées. Levier majeur de progression.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Conseils pour progresser en tennis
        </h2>
        <ul className="space-y-4 text-slate-600">
          <li className="flex gap-3">
            <span className="text-yellow-600 font-bold">1.</span>
            <span>
              <strong>Affrontez plus fort :</strong> Les victoires contre meilleur classement sont les plus précieuses. Recherchez des partenaires ou adversaires plus forts.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 font-bold">2.</span>
            <span>
              <strong>Limitez les surprises :</strong> Évitez les défaites contre moins bon classement. Chaque défaite « anormale » coûte 2 points.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 font-bold">3.</span>
            <span>
              <strong>Cumulez les victoires :</strong> Le volume aide. 5-7 victoires coup sur coup suffisent généralement pour progresser d&apos;une catégorie.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 font-bold">4.</span>
            <span>
              <strong>Respectez vos classements :</strong> Le système FFT récompense la cohérence. Rester régulier à votre niveau = progression.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 font-bold">5.</span>
            <span>
              <strong>Consultez l&apos;espace licencié FFT :</strong> La progression officielle dépend d&apos;autres paramètres non publics (volume de matchs, classements sur plusieurs années, etc.).
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-8">
        <h2 className="text-lg font-bold text-blue-900 mb-3">📋 Disclaimer</h2>
        <p className="text-sm text-blue-800 leading-relaxed">
          Ce calculateur est <strong>indicatif uniquement</strong> et basé sur les règles publiques du système FFT (V-E-2I-5G). La Fédération Française de Tennis applique des paramètres internes non publics (nombre minimum de matchs, saisonnalité, réévaluations par secteur, etc.) qui peuvent influencer la progression réelle. Pour un classement <strong>officiel exact</strong>, consultez votre espace licencié sur le site de la FFT.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calcul-classement-tennis-fft" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
