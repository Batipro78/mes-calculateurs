import type { Metadata } from "next";
import ConvertisseurMonnaieJeu from "./ConvertisseurMonnaieJeu";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseur-monnaie-jeu" },
  title:
    "Convertisseur monnaie jeux vidéo - V-bucks, RP, Apex Coins en euros",
  description:
    "Convertissez V-bucks (Fortnite), RP (LoL), Apex Coins, Robux, COD Points et autres monnaies de jeux en euros. Taux officiels à jour.",
  keywords:
    "v-bucks euros, rp lol euros, apex coins euros, robux euros, prix monnaie jeu, convertisseur jeu video, fortnite, league of legends, cod points, fifa points",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Monnaie Jeux Video" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien coûte 1000 V-bucks en euros ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1000 V-bucks (Fortnite) coûtent environ 7.99 EUR selon le pack officiel. Cela représente un ratio de 125 V-bucks par euro.",
                },
              },
              {
                "@type": "Question",
                name: "Comment convertir les RP en euros ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Utilisez notre convertisseur pour transformer les Riot Points (RP) de League of Legends en euros. 1380 RP = 10 EUR environ, soit un ratio de 138 RP par euro.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le prix officiel des Apex Coins ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "1000 Apex Coins (Apex Legends) coûtent 9.99 EUR, avec un ratio de 100 AC pour 1 EUR.",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi le prix des monnaies jeux varie selon les packs ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les éditeurs proposent des bonus de monnaie à l&apos;achat de gros packs. Par exemple, acheter 13500 V-bucks coûte moins que 13.5 fois le prix de 1000 V-bucks. Notre outil utilise les tarifs officiels des packs de base.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Convertisseur Monnaie Jeux Video" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-pink-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎮
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur Monnaie Jeux Video
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez V-bucks, RP, Apex Coins, Robux et autres monnaies de jeux
        en euros.
      </p>

      <ConvertisseurMonnaieJeu />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Prix officiels des packs
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Voici les tarifs officiels des packs de monnaies jeux selon les
          éditeurs. Les ratios calculés ci-dessous permettent de faire vos
          conversions euros vers monnaies.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Jeu / Monnaie
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Quantite
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Prix EUR
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Ratio
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-indigo-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  ⚡ Fortnite (V-bucks)
                </td>
                <td className="py-3 px-2 text-slate-600">1000</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  7.99 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  125 / EUR
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  💎 League of Legends (RP)
                </td>
                <td className="py-3 px-2 text-slate-600">1380</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  10.00 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  138 / EUR
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-red-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🔴 Apex Legends (AC)
                </td>
                <td className="py-3 px-2 text-slate-600">1000</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  9.99 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  100 / EUR
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🟢 Roblox (Robux)
                </td>
                <td className="py-3 px-2 text-slate-600">800</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  9.99 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  80 / EUR
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-orange-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🎯 Call of Duty (CP)
                </td>
                <td className="py-3 px-2 text-slate-600">1100</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  9.99 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  110 / EUR
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  ⚽ EA Sports FC (FP)
                </td>
                <td className="py-3 px-2 text-slate-600">1050</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  9.99 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  105 / EUR
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-red-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🎮 Valorant (VP)
                </td>
                <td className="py-3 px-2 text-slate-600">1000</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  9.99 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  100 / EUR
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🟫 Minecraft (Minecoins)
                </td>
                <td className="py-3 px-2 text-slate-600">1720</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  9.99 €
                </td>
                <td className="py-3 px-2 text-right text-slate-600">
                  172 / EUR
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Astuces pour economiser
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Acheter des gros packs
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Les gros packs offrent un meilleur ratio. Par exemple, acheter
              13500 V-bucks coûte moins que 13.5 fois le prix de 1000 V-bucks.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Attendre les soldes
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Certains jeux proposent des bonus occasionnels ou des promotions
              sur les packs pendant les evenements saison.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Utiliser le Battle Pass
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dans Fortnite et League of Legends, le Battle Pass permet de
              regagner une partie de la monnaie investie en completant des
              defis.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Comparer les prix par region
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Les prix en euros peuvent varier selon les plateformes (PC, console, mobile).
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/convertisseur-monnaie-jeu" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
