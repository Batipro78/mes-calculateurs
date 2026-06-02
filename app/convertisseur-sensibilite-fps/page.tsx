import type { Metadata } from "next";
import ConvertisseurSensiFps from "./ConvertisseurSensiFps";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/convertisseur-sensibilite-fps" },
  title:
    "Convertisseur Sensibilite FPS - CS2, Valorant, Apex, Fortnite, Overwatch",
  description:
    "Convertissez votre sensibilite souris entre CS2, Valorant, Apex Legends, Fortnite, Overwatch et Rainbow Six. Calcul eDPI et cm/360° gratuit.",
  keywords:
    "sensibilite valorant cs2, convertisseur sens fps, edpi calculator, cm/360, sensibilite souris jeux, apex fortnite overwatch",
  openGraph: {
    title: "Convertisseur Sensibilite FPS",
    description:
      "Convertissez votre sensibilite entre les grands jeux FPS. Calcul eDPI et cm/360°.",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment convertir sa sensibilite entre deux jeux FPS ?",
    a: "Utilisez le cm/360° (distance pour faire un tour complet) comme reference. C'est le meme geste physique dans tous les jeux. Notre convertisseur calcule automatiquement la sensibilite equivalente en preservant ce cm/360°.",
  },
  {
    q: "Qu'est-ce que l'eDPI ?",
    a: "eDPI (effective DPI) = DPI de votre souris × Sensibilite du jeu. Par exemple : 800 DPI × 1.0 sens = 800 eDPI. C'est une metrique pour comparer la vitesse de visee entre joueurs.",
  },
  {
    q: "Quelle sensibilite utilise les joueurs professionnels ?",
    a: "La plupart des pros jouent entre 30-40 cm/360°. En CS2 : 32 cm/360. En Valorant : 35 cm/360. En Apex : 28 cm/360. Cherchez votre confort personnel plutot que de copier les pros.",
  },
  {
    q: "Pourquoi le cm/360° est-il important ?",
    a: "Le cm/360° represente la distance physique de votre geste pour faire un tour complet. Preserver cette valeur garantit que votre geste physique reste identique en changeant de jeu ou de sensibilite. C'est la base du muscle memory.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur Sensibilite FPS" />
      <Breadcrumb currentPage="Convertisseur Sensibilite FPS" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎯
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur Sensibilite FPS
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez votre sensibilite souris entre CS2, Valorant, Apex, Fortnite, Overwatch et
        Rainbow Six. Calcul eDPI et cm/360° inclus.
      </p>

      <ConvertisseurSensiFps />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Guide conversion sensibilite
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le cm/360° (centimetres pour faire un tour complet) est la metrique universelle pour
          comparer la vitesse de visee entre jeux FPS. En preservant ce cm/360°, vous gardez le
          meme muscle memory quel que soit le jeu.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Jeu</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Sensibilite
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  cm/360° (pro)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">CS2 / CS:GO</td>
                <td className="py-3 px-2 text-slate-600">~1.0</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">32 cm</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-teal-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">Valorant</td>
                <td className="py-3 px-2 text-slate-600">~0.4 - 0.5</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">35 cm</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">Apex Legends</td>
                <td className="py-3 px-2 text-slate-600">~1.0 - 1.2</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">28 cm</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">Fortnite</td>
                <td className="py-3 px-2 text-slate-600">~8 - 10</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">30 cm</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">Overwatch 2</td>
                <td className="py-3 px-2 text-slate-600">~3 - 4</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">33 cm</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">Rainbow Six Siege</td>
                <td className="py-3 px-2 text-slate-600">~1.0 - 1.2</td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">32 cm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-600 leading-relaxed">
          <strong>Note :</strong> Ces valeurs supposent 800 DPI et sont des moyennes. Les pros varient
          selon leur espace de jeu et leurs preferences. Le plus important : trouvez le cm/360° qui
          vous convient et utilisez-le de base pour tous vos jeux.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Formule de conversion
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Calcul eDPI</h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              eDPI = DPI × Sensibilite
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : 800 DPI × 1.0 = 800 eDPI
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Calcul cm/360°</h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              cm/360° = (2.54 × 360) / (DPI × Sens × Yaw)
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Yaw = sensibilite angulaire du jeu (constante par jeu)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              Conversion entre jeux
            </h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              Preserve cm/360° = change Sens selon Yaw
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Exemple : Valorant a un Yaw different, donc la sens change
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">Muscle memory</h3>
            <p className="text-sm font-mono text-slate-700 bg-white rounded p-2">
              cm/360° = constante physique
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Meme geste = meme distance, quel que soit le jeu
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment trouver votre cm/360° ideal ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Le cm/360° ideal depend de votre playstyle, votre espace et votre confort. Voici un guide :
        </p>
        <ul className="space-y-3 text-slate-600">
          <li className="flex gap-3">
            <span className="text-teal-600 font-bold">25-30 cm/360°</span>
            <span>Visee rapide (highjitter/joueurs agressifs). Moins de mouvement de bras.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-600 font-bold">30-40 cm/360°</span>
            <span>
              Equilibre populaire (pros, joueurs competitifs). Bon controle + reactivite.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-600 font-bold">40+ cm/360°</span>
            <span>Visee lente (lowsens) pour precision fine. Plus de mouvement requis.</span>
          </li>
        </ul>
        <p className="text-slate-600 mt-6 leading-relaxed">
          <strong>Conseil :</strong> Choisissez votre cm/360° de base en soft & stable (CS2, Aim
          Trainer), puis convertissez dans les autres jeux. Laissez votre muscle memory s&apos;adapter
          2-3 semaines avant de changer.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/convertisseur-sensibilite-fps" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
