import type { Metadata } from "next";
import CalculateurInflation from "./CalculateurInflation";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Calculateur Inflation 2026 - Perte de pouvoir d'achat en France",
  description:
    "Calculez l'impact de l'inflation sur votre salaire et votre pouvoir d'achat. Combien devriez-vous gagner aujourd'hui pour vivre comme en 2020 ? Donnees INSEE, gratuit et instantane.",
  keywords:
    "calculateur inflation, perte pouvoir achat, inflation France 2026, valeur argent dans le temps, erosion monetaire, inflation salaire, cout de la vie, INSEE inflation, hausse des prix, pouvoir achat salaire",
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
                name: "Quel est le taux d'inflation en France en 2025 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le taux d'inflation en France est d'environ 1,5% en 2025 selon l'INSEE, apres 2,0% en 2024 et 4,9% en 2023. Apres le pic historique de 5,2% en 2022 (crise energetique post-Covid), l'inflation revient progressivement vers la cible de la BCE de 2%."
                }
              },
              {
                "@type": "Question",
                name: "Combien a-t-on perdu de pouvoir d'achat depuis 2020 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entre 2020 et 2025, l'inflation cumulee en France est d'environ 15%. Cela signifie qu'un salaire de 2 000 EUR net en 2020 devrait etre d'environ 2 300 EUR aujourd'hui pour maintenir le meme niveau de vie. Si votre salaire n'a pas augmente de 15%, vous avez perdu du pouvoir d'achat."
                }
              },
              {
                "@type": "Question",
                name: "Comment proteger son argent contre l'inflation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour proteger son epargne contre l'inflation, il faut placer son argent a un taux superieur a l'inflation : le Livret A (2,4%), le LEP (3,5%), l'assurance-vie, ou les investissements en bourse (ETF). Laisser son argent sur un compte courant (0%) garantit une perte de pouvoir d'achat chaque annee."
                }
              }
            ]
          })
        }}
      />
      <Breadcrumb currentPage="Calculateur Inflation" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📉
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calculateur d&apos;Inflation
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Decouvrez combien l&apos;inflation a grignote votre pouvoir d&apos;achat.
        Le voleur silencieux de votre argent.
      </p>

      <CalculateurInflation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          L&apos;inflation : le voleur silencieux
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          L&apos;<strong>inflation</strong> est la hausse generalisee et durable
          des prix. Chaque annee, les prix augmentent en moyenne de 1 a 3% en
          France. Cela signifie que votre argent perd de la valeur : ce que vous
          pouviez acheter avec 100 EUR hier coute plus cher aujourd&apos;hui. Si
          votre salaire n&apos;augmente pas au meme rythme, votre{" "}
          <strong>pouvoir d&apos;achat diminue</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          L&apos;inflation recente en France
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="text-3xl font-bold text-red-600">5,2%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">2022</p>
            <p className="text-xs text-slate-500 mt-1">
              Record depuis 1985. Crise energetique, guerre en Ukraine, ruptures
              d&apos;approvisionnement post-Covid.
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-3xl font-bold text-orange-600">4,9%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">2023</p>
            <p className="text-xs text-slate-500 mt-1">
              Inflation encore elevee malgre les mesures de la BCE. Hausse des
              taux directeurs pour freiner la hausse des prix.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-3xl font-bold text-emerald-600">2,0%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">2024</p>
            <p className="text-xs text-slate-500 mt-1">
              Retour progressif vers la cible de 2% de la BCE. Baisse des prix
              de l&apos;energie, stabilisation des prix alimentaires.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment l&apos;inflation est-elle mesuree ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          L&apos;INSEE mesure l&apos;inflation via l&apos;<strong>Indice des
          Prix a la Consommation</strong> (IPC). Chaque mois, les agents de
          l&apos;INSEE relevent les prix de plus de 200 000 produits et services
          dans 30 000 points de vente a travers la France. L&apos;IPC couvre
          l&apos;alimentation, le logement, les transports, les loisirs, la
          sante et tous les postes de depenses des menages.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          L&apos;impact concret sur votre quotidien
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Alimentation</p>
            <p className="text-xs text-slate-500 mt-1">
              Les prix alimentaires ont augmente de plus de 20% entre 2020 et
              2024. Un caddie qui coutait 100 EUR en coute aujourd&apos;hui
              environ 120 EUR.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Energie</p>
            <p className="text-xs text-slate-500 mt-1">
              L&apos;electricite et le gaz ont subi des hausses massives en
              2022-2023 malgre le bouclier tarifaire du gouvernement.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Immobilier</p>
            <p className="text-xs text-slate-500 mt-1">
              Les loyers augmentent chaque annee (indices IRL). L&apos;achat
              immobilier est devenu plus difficile avec la hausse des taux
              d&apos;interet en 2022-2023.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">Epargne</p>
            <p className="text-xs text-slate-500 mt-1">
              L&apos;argent laisse sur un compte courant (0%) perd 2% par an de
              pouvoir d&apos;achat. Meme le Livret A (2,4%) ne couvre pas
              toujours l&apos;inflation.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Comment proteger son pouvoir d&apos;achat ?
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Negocier son salaire :</strong> demandez une augmentation au
            moins egale a l&apos;inflation chaque annee. Sans augmentation, vous
            acceptez de fait une baisse de salaire reel.
          </li>
          <li>
            <strong>Placer son epargne :</strong> le Livret A (2,4%), le LEP
            (3,5%) ou l&apos;investissement en bourse (ETF) permettent de battre
            ou suivre l&apos;inflation.
          </li>
          <li>
            <strong>Investir dans l&apos;immobilier :</strong> les loyers et la
            valeur des biens augmentent generalement avec l&apos;inflation.
          </li>
          <li>
            <strong>Ne pas laisser dormir son argent :</strong> chaque euro sur
            un compte courant perd de la valeur chaque jour.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La regle des 72 appliquee a l&apos;inflation
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Divisez 72 par le taux d&apos;inflation pour savoir en combien
          d&apos;annees votre argent perd la moitie de sa valeur. A 3%
          d&apos;inflation, votre argent perd 50% de son pouvoir d&apos;achat en
          24 ans. A 5%, en seulement 14 ans. C&apos;est pourquoi on parle de
          &quot;voleur silencieux&quot; : l&apos;inflation est invisible au
          quotidien mais devastatrice sur le long terme.
        </p>
      </section>

      <RelatedCalculators currentSlug="/calculateur-inflation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
