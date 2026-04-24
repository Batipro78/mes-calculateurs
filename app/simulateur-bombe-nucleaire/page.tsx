import type { Metadata } from "next";
import SimulateurNucleaire from "./SimulateurNucleaire";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-bombe-nucleaire" },
  title:
    "Simulateur Bombe Nucleaire 2026 - Carte d'impact et zones de destruction",
  description:
    "Simulez l'impact d'une bombe nucleaire sur Paris ou n'importe quelle ville de France. Carte interactive, zones de souffle, radiation, brulures. Outil educatif gratuit.",
  keywords:
    "simulateur bombe nucleaire, impact bombe atomique, carte explosion nucleaire, zone destruction nucleaire, Hiroshima, Tsar Bomba, bombe atomique Paris, guerre nucleaire France",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Bombe Nucleaire" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quel serait l'impact d'une bombe nucleaire sur Paris ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'impact depend de la puissance de la bombe. Une ogive strategique moderne (300 kT, type TN75 francaise) provoquerait une boule de feu de 600 m, une zone de destruction totale de 2 km, des batiments effondres dans un rayon de 4,8 km et des vitres brisees jusqu'a 15 km. Une bombe de type Hiroshima (15 kT) causerait des degats bien moindres, avec une destruction totale sur 700 m.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la bombe nucleaire la plus puissante ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La Tsar Bomba, testee par l'URSS le 30 octobre 1961, est la bombe la plus puissante jamais detonee : 50 megatonnes (50 000 kilotonnes), soit 3 333 fois la puissance de Hiroshima. Son souffle a brise des vitres a 900 km et la boule de feu mesurait 3,5 km de diametre.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de bombes nucleaires possede la France ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La France possede environ 290 ogives nucleaires, ce qui en fait la 3e puissance nucleaire mondiale derriere les Etats-Unis (~5 500) et la Russie (~6 200). L'arsenal francais est compose d'ogives TN75 (300 kT) deployees sur sous-marins nucleaires lanceurs d'engins (SNLE) et de missiles ASMPA lances depuis des avions Rafale.",
                },
              },
              {
                "@type": "Question",
                name: "Comment se proteger d'une bombe nucleaire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En cas d'alerte nucleaire : 1) Se mettre a l'abri dans un batiment en dur (sous-sol, cave, parking souterrain), 2) S'eloigner des fenetres et se coucher au sol, 3) Rester confine au moins 24h pour eviter les retombees radioactives, 4) Ne pas regarder l'explosion (risque de cecite), 5) Ecouter les consignes officielles a la radio. A plus de 10-15 km de l'impact d'une bombe de 300 kT, les chances de survie sont bonnes si l'on se met rapidement a l'abri.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Bombe Nucleaire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ☢️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Bombe Nucleaire &mdash; Carte d&apos;impact
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Visualisez les zones de destruction d&apos;une explosion nucleaire sur la
        carte. Selectionnez une arme et un point d&apos;impact.
      </p>

      <SimulateurNucleaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comprendre les effets d&apos;une explosion nucleaire
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Une <strong>explosion nucleaire</strong> produit plusieurs effets
          devastateurs qui se propagent en cercles concentriques autour du point
          d&apos;impact. La portee de chaque effet depend de la puissance de la bombe,
          mesuree en <strong>kilotonnes (kT)</strong> ou{" "}
          <strong>megatonnes (Mt)</strong> d&apos;equivalent TNT.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 6 zones d&apos;impact
        </h3>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-red-600 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Boule de feu
              </p>
              <p className="text-xs text-slate-500">
                Temperature de plusieurs millions de degres. Tout est vaporise
                instantanement : batiments, vehicules, etres humains. Pour
                Hiroshima (15 kT), la boule de feu mesurait environ 180 m de
                rayon.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-600 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Radiation letale (500 rem)
              </p>
              <p className="text-xs text-slate-500">
                Dose mortelle de radiation initiale. Les personnes exposees
                developpent un syndrome d&apos;irradiation aigue et meurent en
                quelques heures a quelques semaines. Au-dela de cette zone, les
                retombees radioactives restent dangereuses pendant des jours.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Souffle violent (20 psi)
              </p>
              <p className="text-xs text-slate-500">
                Meme les batiments en beton arme sont detruits. La surpression
                de 20 psi (1,4 bar) aplatit tout sur son passage. Mortalite
                quasi-totale (~90%).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Souffle modere (5 psi)
              </p>
              <p className="text-xs text-slate-500">
                Les immeubles d&apos;habitation s&apos;effondrent. Les incendies se
                declenchent massivement. Environ 50% de mortalite. C&apos;est la zone
                ou la majorite des victimes de Hiroshima ont peri.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Brulures 3e degre
              </p>
              <p className="text-xs text-slate-500">
                Le rayonnement thermique provoque des brulures graves sur toute
                peau exposee. Les materiaux inflammables (bois, tissus,
                papier) s&apos;enflamment spontanement, creant des incendies
                secondaires massifs.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Souffle leger (1 psi)
              </p>
              <p className="text-xs text-slate-500">
                Toutes les vitres volent en eclats, causant de nombreuses
                blessures par debris de verre. Degats legers aux structures.
                Zone ou les chances de survie sont bonnes si l&apos;on se met a
                l&apos;abri rapidement.
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          La loi de Hopkinson (cube root scaling)
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Les rayons d&apos;effet suivent la <strong>loi de Hopkinson</strong> :
          le rayon de destruction est proportionnel a la racine cubique de la
          puissance. Cela signifie qu&apos;une bombe 1 000 fois plus puissante
          n&apos;a pas un rayon 1 000 fois plus grand, mais seulement 10 fois plus
          grand (racine cubique de 1 000 = 10).
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-sm font-mono text-slate-700">
            R = R₀ × (P / P₀)^(1/3)
          </p>
          <p className="text-xs text-slate-400 mt-1">
            R = rayon, P = puissance en kT, R₀ et P₀ = valeurs de reference
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Arsenaux nucleaires dans le monde (2026)
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-600">~6 200</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">Russie</p>
            <p className="text-xs text-slate-400">
              Ogives strategiques + tactiques
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-600">~5 500</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Etats-Unis
            </p>
            <p className="text-xs text-slate-400">Triade nucleaire complete</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-600">~350</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">Chine</p>
            <p className="text-xs text-slate-400">Arsenal en forte croissance</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-sky-600">~290</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">France</p>
            <p className="text-xs text-slate-400">SNLE + Rafale ASMPA</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~225</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Royaume-Uni
            </p>
            <p className="text-xs text-slate-400">Sous-marins Trident</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-slate-600">~170</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Autres (Inde, Pakistan, Israel, Coree du Nord)
            </p>
            <p className="text-xs text-slate-400">Estimations</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Questions frequentes
        </h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Quelle difference entre kilotonnes et megatonnes ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              La <strong>kilotonne (kT)</strong> vaut 1 000 tonnes de TNT. La{" "}
              <strong>megatonne (Mt)</strong> vaut 1 million de tonnes de TNT, soit
              1 000 kT. Hiroshima (15 kT) etait une petite bombe comparee aux ogives
              modernes (100-300 kT) ou a la Tsar Bomba (50 000 kT = 50 Mt).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              A quelle distance est-on en securite ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pour une bombe de 300 kT (ogive strategique standard), les degats
              graves s&apos;etendent sur environ 5 km et les vitres brisees sur 15 km.
              Au-dela de 20 km, les effets directs du souffle sont negligeables.
              Cependant, les retombees radioactives (fallout) peuvent contaminer des
              zones a plus de 100 km selon le vent et la meteo.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Pourquoi ce simulateur ne montre pas les retombees radioactives ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Les retombees (fallout) dependent de facteurs tres variables :
              direction et force du vent, humidite, altitude de detonation,
              nature du sol. Les modeliser necessiterait des donnees
              meteorologiques en temps reel. Ce simulateur se concentre sur les
              effets immediats (souffle, chaleur, radiation initiale) qui sont
              calculables avec les formules de physique.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              La France serait-elle une cible nucleaire ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              La France est protegee par sa propre dissuasion nucleaire
              (&laquo;&nbsp;frappe en second&nbsp;&raquo;). Ses sous-marins
              nucleaires (SNLE) sont indetectables et peuvent riposter meme si
              le territoire est frappe. Cette capacite de represailles rend
              theoriquement toute attaque nucleaire contre la France
              &laquo;&nbsp;suicidaire&nbsp;&raquo; pour l&apos;attaquant. C&apos;est le
              principe de la dissuasion.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Quels gestes adopter en cas d&apos;alerte nucleaire ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              1) Se mettre immediatement a l&apos;abri dans un batiment en dur
              (sous-sol, cave). 2) Fermer portes et fenetres, couper la
              ventilation. 3) S&apos;eloigner des fenetres et se coucher au sol.
              4) Ne jamais regarder l&apos;explosion. 5) Rester confine au moins
              24h. 6) Ecouter la radio (France Info) pour les consignes
              officielles. 7) Ne pas sortir tant que les autorites ne l&apos;ont
              pas autorise.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-bombe-nucleaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
