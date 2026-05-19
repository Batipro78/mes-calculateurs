import type { Metadata } from "next";
import CalculFovJeu from "./CalculFovJeu";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-fov-jeu" },
  title:
    "Convertisseur FOV Jeux Video - HFOV VFOV 16:9 21:9 - Gratuit",
  description:
    "Convertissez votre FOV (field of view) entre HFOV/VFOV et entre ratios d&apos;écran (16:9, 21:9, 4:3). Compatible avec CS2, Valorant, Apex Legends, Overwatch. Calcul trigonometrique precis.",
  keywords:
    "convertisseur fov, hfov vfov, fov 16:9 21:9, fov gaming, field of view jeu video, fov ultra-wide, cs2 valorant apex fov",
  openGraph: {
    title: "Convertisseur FOV Jeux Video",
    description:
      "Convertissez votre FOV entre formats et ratios d&apos;écran. Hor+ et Vert- scaling.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Convertisseur FOV Jeux Video" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quelle est la difference entre HFOV et VFOV ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "HFOV (horizontal FOV) est l&apos;angle de vue horizontal. VFOV (vertical FOV) est l&apos;angle vertical. Ils sont lies par le ratio d&apos;écran de votre moniteur. Par exemple, sur 16:9, HFOV=90° donne VFOV≈56.25°. Utilisez notre convertisseur pour les conversions automatiques.",
                },
              },
              {
                "@type": "Question",
                name: "Quel FOV utiliser sur un ecran 16:9 vs 21:9 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Avec Hor+ scaling (le plus courant), si vous jouez a 90° FOV sur 16:9, le FOV sur 21:9 sera ~110°. Cela augmente la vision peripherique sur ultra-wide sans perdre la precision au centre. Pour Vert- scaling, seul le VFOV change et le HFOV diminue.",
                },
              },
              {
                "@type": "Question",
                name: "Quel FOV est optimal pour le jeu competitif ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En competitif, la plupart des joueurs preferent 90-110° HFOV sur 16:9, ce qui balance vision peripherique et taille des ennemis. Pour ultra-wide (21:9), 100-120° HFOV est normal grace a Hor+ scaling. Testez ce qui vous convient et restez coherent sur tous vos jeux (utilisez cm/360 ou ce convertisseur).",
                },
              },
              {
                "@type": "Question",
                name: "Pourquoi Fortnite verrouille-t-il le FOV ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fortnite verrouille VFOV a 80° (vertical-) pour tous les ratios d&apos;écran. Cela signifie que HFOV augmente automatiquement sur les ecrans plus larges (16:9 → 21:9 → 32:9). C&apos;est un choix de game design pour eviter les avantages des ultra-wide monitors en multijoueur competitif.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Convertisseur FOV Jeux Video" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🎮
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Convertisseur FOV Jeux Video
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Convertissez votre FOV (field of view) entre HFOV/VFOV et entre ratios d&apos;écran
        (4:3, 16:9, 16:10, 21:9, 32:9). Calcul precis pour CS2, Valorant, Apex, Overwatch.
      </p>

      <CalculFovJeu />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre HFOV et VFOV
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le FOV (Field of View / Angle de vue) est l&apos;angle de vision de votre personnage en jeu.
          Il existe deux dimensions :
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">HFOV (Horizontal FOV)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Angle de vue <strong>gauche-droite</strong>. C&apos;est la vue horizontale de votre ecran.
              Par exemple, CS2 par defaut = <strong>90° HFOV</strong>. Plus HFOV est grand, plus vous
              voyez de cotes (peripherique), mais les ennemis semblent plus petits.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">VFOV (Vertical FOV)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Angle de vue <strong>haut-bas</strong>. C&apos;est la vue verticale de votre ecran.
              Calcule automatiquement depuis HFOV selon votre ratio d&apos;écran. Moins courant dans les
              jeux, mais important pour comprendre la relation entre formats.
            </p>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed">
          <strong>Relation :</strong> HFOV et VFOV sont lies par le ratio d&apos;écran. Sur 16:9 (1.778), un
          HFOV de 90° donne un VFOV d&apos;environ 56.25°. Sur 21:9 (2.333), le VFOV reste proche (vertical-
          scaling) ou change selon le jeu (Hor+ scaling).
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Ratios d&apos;écran et FOV
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Votre ratio d&apos;écran (largeur:hauteur) determine comment HFOV et VFOV se relient.
          Voici les ratios populaires et leurs consequences :
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Ratio
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Decription
                </th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">
                  Nombre decimal
                </th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-bold text-slate-700">4:3</td>
                <td className="py-3 px-2 text-slate-600">Carre / ancien CRT</td>
                <td className="py-3 px-2 text-right text-slate-600">1.333</td>
                <td className="py-3 px-2 text-slate-600 text-xs">
                  Retrograde (nostalgie CS 1.6)
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-bold text-slate-700">16:10</td>
                <td className="py-3 px-2 text-slate-600">Wide ancien</td>
                <td className="py-3 px-2 text-right text-slate-600">1.6</td>
                <td className="py-3 px-2 text-slate-600 text-xs">
                  Rare (moniteurs WSXGA+)
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-teal-50/50">
                <td className="py-3 px-2 font-bold text-slate-700">16:9</td>
                <td className="py-3 px-2 text-slate-600">Full HD / HD (standard)</td>
                <td className="py-3 px-2 text-right text-slate-600">1.778</td>
                <td className="py-3 px-2 text-slate-600 text-xs">
                  <strong>MAJORITE</strong> des joueurs (1920x1080, 2560x1440)
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-bold text-slate-700">21:9</td>
                <td className="py-3 px-2 text-slate-600">Ultra-wide</td>
                <td className="py-3 px-2 text-right text-slate-600">2.333</td>
                <td className="py-3 px-2 text-slate-600 text-xs">
                  Joueurs comp haut niveau, streamer (3440x1440)
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 font-bold text-slate-700">32:9</td>
                <td className="py-3 px-2 text-slate-600">Super ultra-wide</td>
                <td className="py-3 px-2 text-right text-slate-600">3.556</td>
                <td className="py-3 px-2 text-slate-600 text-xs">
                  Niche (dual moniteurs, 5120x1440)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-600 leading-relaxed">
          <strong>Impact :</strong> Quand vous passez d&apos;un ratio a un autre (ex: 16:9 → 21:9), votre
          jeu adapte le FOV automatiquement ou vous doit le changer manuellement selon le "scaling mode"
          (Hor+ ou Vert-).
        </p>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          FOV par genre de jeu
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Differents genres ont des conventions de FOV differentes :
        </p>

        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 bg-teal-50/30 p-4 rounded">
            <h3 className="font-bold text-slate-800 mb-2">FPS competitif (CS2, Valorant, R6)</h3>
            <p className="text-slate-600 text-sm mb-3">
              <strong>FOV standard :</strong> 90-110° HFOV (16:9)
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Equilibre precision et vision peripherique. Trop bas ({"<"} 80°) = tunnel vision. Trop
              haut ({">"}120°) = ennemis trop petits. Les pros jouent souvent entre 32-40 cm/360° de
              sensibilite physique (cherchez notre convertisseur sensibilite pour plus de details).
            </p>
          </div>

          <div className="border-l-4 border-cyan-500 bg-cyan-50/30 p-4 rounded">
            <h3 className="font-bold text-slate-800 mb-2">
              FPS arcade (Fortnite, Overwatch)
            </h3>
            <p className="text-slate-600 text-sm mb-3">
              <strong>FOV standard :</strong> 80-103° HFOV (Fortnite verrouille VFOV 80°)
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Fortnite verrouille le VFOV pour eviter les avantages des ultra-wide. Overwatch offre
              103° fixe en competitive. Ces jeux favorisent l&apos;arcade et la visibilite sur les mouvements
              rapides.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 bg-indigo-50/30 p-4 rounded">
            <h3 className="font-bold text-slate-800 mb-2">
              FPS hardcore (Apex Legends)
            </h3>
            <p className="text-slate-600 text-sm mb-3">
              <strong>FOV standard :</strong> 70-110° HFOV (full range configurable)
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Apex laisse le choix complet. Beaucoup de joueurs en comp jouent a 100-110° pour les
              legends mobiles (Pathfinder, Wraith) et 90-100° pour les tanks (Caustic, Gibraltar).
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Formules de conversion
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Nos conversions utilisent la trigonometrie pour calculs precis. Voici les formules :
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">HFOV → VFOV</h3>
            <p className="text-xs font-mono text-slate-700 bg-white rounded p-2 mb-2">
              VFOV = 2 × atan( tan(HFOV/2) / aspectRatio )
            </p>
            <p className="text-xs text-slate-500">
              Divise HFOV par le ratio pour obtenir l&apos;angle vertical.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">VFOV → HFOV</h3>
            <p className="text-xs font-mono text-slate-700 bg-white rounded p-2 mb-2">
              HFOV = 2 × atan( tan(VFOV/2) × aspectRatio )
            </p>
            <p className="text-xs text-slate-500">
              Multiplie VFOV par le ratio pour obtenir l&apos;angle horizontal.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">FOV Hor+ entre ratios</h3>
            <p className="text-xs font-mono text-slate-700 bg-white rounded p-2 mb-2">
              FOV_cible = 2 × atan( tan(FOV_source/2) × ratio_cible/ratio_source )
            </p>
            <p className="text-xs text-slate-500">
              Scaling proportionnel (HFOV augmente, VFOV adapte).
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">FOV Vert- entre ratios</h3>
            <p className="text-xs font-mono text-slate-700 bg-white rounded p-2 mb-2">
              VFOV = constant, HFOV adapte au ratio cible
            </p>
            <p className="text-xs text-slate-500">
              Fortnite-like : seul le VFOV reste stable (Vert-).
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-fov-jeu" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
