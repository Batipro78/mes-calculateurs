import type { Metadata } from "next";
import CalculTempsTelechargement from "./CalculTempsTelechargement";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-temps-telechargement" },
  title:
    "Calcul temps de téléchargement - Convertisseur Mb/s en Mo/s, jeux vidéo",
  description:
    "Calculez le temps de téléchargement d&apos;un fichier (jeux, films, apps) selon votre débit internet (Mb/s, fibre). Convertisseur Mb/s en Mo/s.",
  keywords:
    "temps telechargement, calcul vitesse internet, mb/s en mo/s, fibre 1gb, fortnite, cyberpunk, call of duty, vitesse download, debits internet",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quelle est la différence entre Mb/s et Mo/s ?",
    a: "Mb/s (mégabit par seconde) est une unité de débit, utilisée par les FAI. Mo/s (mégaoctet par seconde) est une unité de taille/vitesse. 1 octet = 8 bits, donc 1 Mb/s = 0.125 Mo/s. Un FAI qui annonce 100 Mb/s = 12.5 Mo/s maximum.",
  },
  {
    q: "Pourquoi mon téléchargement est plus lent que le débit annoncé ?",
    a: "Plusieurs facteurs ralentissent les téléchargements réels : overhead TCP/IP, retransmissions, pertes réseau, partage de la bande passante, saturations du serveur source. En général, compter un overhead de 10-15% par rapport au débit théorique. Notre calculateur inclut cet overhead.",
  },
  {
    q: "Combien de temps pour télécharger Cyberpunk 2077 en 100 Mb/s ?",
    a: "Cyberpunk 2077 fait environ 70 Go. À 100 Mb/s (soit 12.5 Mo/s théorique), le temps théorique est ~5600 secondes = 1h 33min. Avec overhead réseau, comptez environ 1h 45min en réalité.",
  },
  {
    q: "Comment accélérer les téléchargements ?",
    a: "Utilisez une connexion filaire Ethernet plutôt que WiFi. Fermez les autres applications/téléchargements. Réduisez la distance au routeur. Contactez votre FAI si vous payez pour 100 Mb/s mais n'obtenez que 30 Mb/s. Vérifiez votre vitesse réelle sur speedtest.net. Passez à la fibre si disponible.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Temps Telechargement" />
      <Breadcrumb currentPage="Calcul Temps Telechargement" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ⏱️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Temps Telechargement
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le temps exact pour télécharger un fichier (jeux, films, apps)
        selon votre débit internet.
      </p>

      <CalculTempsTelechargement />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Temps de téléchargement des jeux populaires
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Voici le temps estimé pour télécharger les jeux les plus gros selon
          votre débit. Les valeurs incluent un overhead réseau de ~10%.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Jeu
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Taille
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  VDSL 50 Mb/s
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Fibre 100 Mb/s
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Fibre 1 Gb/s
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-orange-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🎯 Call of Duty MW3
                </td>
                <td className="py-3 px-2 text-right text-slate-600">220 Go</td>
                <td className="py-3 px-2 text-right text-slate-600">
                  ~15h 50min
                </td>
                <td className="py-3 px-2 text-right font-semibold text-slate-800">
                  ~7h 55min
                </td>
                <td className="py-3 px-2 text-right font-bold text-green-700">
                  ~47min
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🌃 Cyberpunk 2077
                </td>
                <td className="py-3 px-2 text-right text-slate-600">70 Go</td>
                <td className="py-3 px-2 text-right text-slate-600">
                  ~5h 2min
                </td>
                <td className="py-3 px-2 text-right font-semibold text-slate-800">
                  ~2h 31min
                </td>
                <td className="py-3 px-2 text-right font-bold text-green-700">
                  ~15min
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-blue-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🚗 GTA V
                </td>
                <td className="py-3 px-2 text-right text-slate-600">95 Go</td>
                <td className="py-3 px-2 text-right text-slate-600">
                  ~6h 48min
                </td>
                <td className="py-3 px-2 text-right font-semibold text-slate-800">
                  ~3h 24min
                </td>
                <td className="py-3 px-2 text-right font-bold text-green-700">
                  ~20min
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  ⚔️ Baldur&apos;s Gate 3
                </td>
                <td className="py-3 px-2 text-right text-slate-600">150 Go</td>
                <td className="py-3 px-2 text-right text-slate-600">
                  ~10h 47min
                </td>
                <td className="py-3 px-2 text-right font-semibold text-slate-800">
                  ~5h 23min
                </td>
                <td className="py-3 px-2 text-right font-bold text-green-700">
                  ~32min
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-red-50/50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  🚀 Starfield
                </td>
                <td className="py-3 px-2 text-right text-slate-600">125 Go</td>
                <td className="py-3 px-2 text-right text-slate-600">
                  ~8h 59min
                </td>
                <td className="py-3 px-2 text-right font-semibold text-slate-800">
                  ~4h 29min
                </td>
                <td className="py-3 px-2 text-right font-bold text-green-700">
                  ~27min
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-medium text-slate-700">
                  ⚡ Fortnite
                </td>
                <td className="py-3 px-2 text-right text-slate-600">30 Go</td>
                <td className="py-3 px-2 text-right text-slate-600">
                  ~2h 9min
                </td>
                <td className="py-3 px-2 text-right font-semibold text-slate-800">
                  ~1h 4min
                </td>
                <td className="py-3 px-2 text-right font-bold text-green-700">
                  ~6min
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre Mb/s vs Mo/s
        </h2>
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
            <h3 className="font-bold text-cyan-800 mb-2">Mb/s (mégabit/s)</h3>
            <p className="text-sm text-cyan-700 leading-relaxed">
              <strong>M</strong>égabit par seconde. Unité utilisée par les FAI
              pour annoncer le débit. 1 Mb/s = 1 million bits/seconde. C&apos;est la
              vitesse brute du signal.
            </p>
            <p className="text-sm text-cyan-700 leading-relaxed mt-2">
              Exemple: "Fibre 100 Mb/s" = 100 mégabits/s.
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-2">Mo/s (mégaoctet/s)</h3>
            <p className="text-sm text-orange-700 leading-relaxed">
              <strong>M</strong>égaoctet par seconde. Unité de transfert de données.
              1 Mo/s = 1 million octets/seconde = 8 millions bits/seconde = 8
              Mb/s.
            </p>
            <p className="text-sm text-orange-700 leading-relaxed mt-2">
              Exemple: Un fichier télécharge à "12.5 Mo/s" sur votre PC.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-3">Conversion simple :</h3>
          <div className="space-y-2 text-sm text-slate-700 font-mono bg-white p-4 rounded-lg">
            <div>100 Mb/s ÷ 8 = <strong>12.5 Mo/s</strong></div>
            <div>50 Mb/s ÷ 8 = <strong>6.25 Mo/s</strong></div>
            <div>1000 Mb/s ÷ 8 = <strong>125 Mo/s</strong> (fibre 1 Gb/s)</div>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi les téléchargements sont plus lents ?
        </h2>
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              1. Overhead réseau (10-15%)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Le débit annoncé est théorique. Le protocole TCP/IP, les retransmissions
              de paquets, et les erreurs réseau consomment 10-15% de la bande
              passante.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              2. Saturation du serveur
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Si le serveur (Steam, PlayStation, Epic Games) est surchargé, il
              limite sa vitesse d&apos;envoi. Cela réduit votre vitesse réelle
              de téléchargement.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              3. Distance et réseau
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Plus les serveurs sont loin, plus les délais augmentent. WiFi vs
              Ethernet, interférences, qualité du routeur impactent aussi la
              vitesse.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              4. Partage de bande passante
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Si quelqu&apos;un d&apos;autre regarde Netflix ou télécharge sur votre
              réseau, cela partage la bande passante et ralentit votre
              téléchargement.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment accélérer les téléchargements ?
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              🔌 Utiliser Ethernet (filaire)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ethernet est plus stable et rapide que WiFi. Même sur fibre, le
              WiFi peut être 20-30% plus lent. Branchez votre console ou PC
              directement au routeur.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              🛑 Fermez les autres applications
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Netflix, YouTube, navigateur, torrent... Fermez tout ce qui
              consomme la bande passante avant de lancer un gros téléchargement.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              ⏰ Télécharger tard la nuit
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Les serveurs sont moins saturés la nuit (vers 2-5h du matin).
              Programez les gros téléchargements à ce moment.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              ⚙️ Optimisez votre routeur
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Placez le routeur au centre de votre maison, redémarrez-le
              régulièrement, mettez à jour son firmware. Un routeur moderne
              (WiFi 6) peut faire la différence.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              📊 Testez votre vitesse
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Allez sur <strong>speedtest.net</strong> pour vérifier votre débit
              réel. Si vous payez 100 Mb/s et n&apos;en obtenez que 30, contactez
              votre FAI.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-2">
              📡 Passez à la fibre (si disponible)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              ADSL (~8 Mb/s) vers Fibre (100-1000 Mb/s) = différence énorme.
              Vérifiez la couverture fibre à votre adresse et changez de FAI si
              nécessaire.
            </p>
          </div>
        </div>
      </section>

      <HowToJsonLd
        name="Calculer le temps de telechargement d'un fichier"
        steps={[
          { name: "Saisir la taille du fichier", text: "Entrer la taille en gigaoctets (Go) ou megaoctets (Mo). Exemples courants : Fortnite = 30 Go, Cyberpunk 2077 = 70 Go, GTA V = 95 Go, Starfield = 125 Go, Baldur's Gate 3 = 150 Go, Call of Duty MW3 = 220 Go." },
          { name: "Indiquer le debit internet en Mb/s", text: "Entrer le debit annonce par le fournisseur en megabits par seconde (Mb/s). Conversion en megaoctets par seconde : Mo/s = Mb/s / 8. Exemples : fibre 100 Mb/s = 12,5 Mo/s, fibre 1 000 Mb/s = 125 Mo/s, ADSL 8 Mb/s = 1 Mo/s." },
          { name: "Lire le temps réel avec overhead réseau", text: "Le calculateur applique un overhead de 10% (protocole TCP/IP, pertes de paquets, saturation serveur). Formule : temps (s) = taille (Mo) / (debit Mb/s x 0,9 / 8). Exemple : 70 Go à 100 Mb/s -> environ 1h 43min en conditions réelles (vs 1h 33min théorique)." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-temps-telechargement" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
