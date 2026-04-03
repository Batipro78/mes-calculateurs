import type { Metadata } from "next";
import SimulateurBunker from "./SimulateurBunker";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title:
    "Simulateur Budget Bunker 2026 - Prix, taille et autonomie par personne",
  description:
    "Calculez le budget pour construire un bunker : prix de construction, taille necessaire, provisions (eau, nourriture), equipements. De 1 a 20 personnes, de 2 semaines a 2 ans d'autonomie.",
  keywords:
    "budget bunker, prix bunker, construire bunker France, abri anti-atomique prix, bunker survie cout, abri souterrain budget, bunker NRBC prix, autonomie bunker, taille bunker personnes",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calculateur Cout Bunker" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien coute un bunker en France ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le prix d'un bunker en France varie de 30 000 euros pour un abri basique 2 personnes a plus de 500 000 euros pour un bunker NRBC familial. Le cout moyen est de 1 500 a 5 500 euros par m2 selon le niveau de protection. Les principaux postes de depense sont la construction (60-70%), les equipements (20-25%) et les provisions (5-15%).",
                },
              },
              {
                "@type": "Question",
                name: "Quelle taille de bunker pour une famille de 4 personnes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pour 4 personnes, prevoyez minimum 30 a 40 m2 : 20 m2 d'espace de vie (5 m2 par personne), 10 m2 d'espaces communs (sanitaires, cuisine) et 5 a 10 m2 de stockage selon la duree d'autonomie souhaitee. Pour un confort acceptable sur plusieurs mois, 50 m2 est recommande.",
                },
              },
              {
                "@type": "Question",
                name: "Combien d'eau et de nourriture stocker dans un bunker ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Prevoyez minimum 3 litres d'eau par personne par jour (boisson + hygiene minimale). Pour la nourriture, comptez 2 000 calories par jour par adulte. Pour 4 personnes sur 3 mois, cela represente 1 080 litres d'eau et environ 720 000 calories. Les rations militaires longue conservation (MRE) ou les aliments lyophilises sont les plus adaptes (duree de conservation 5 a 25 ans).",
                },
              },
              {
                "@type": "Question",
                name: "Faut-il un permis de construire pour un bunker ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En France, une construction souterraine de plus de 20 m2 necessite un permis de construire. En dessous de 20 m2, une declaration prealable de travaux suffit. Il faut egalement respecter le PLU (Plan Local d'Urbanisme) de votre commune. Certaines zones (protegees, inondables) peuvent interdire ce type de construction. Consultez votre mairie avant tout projet.",
                },
              },
              {
                "@type": "Question",
                name: "Quels equipements sont essentiels dans un bunker ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les equipements essentiels sont : 1) Systeme de ventilation et filtration d'air (vital), 2) Porte blindee anti-souffle, 3) Reserves d'eau et systeme de filtration, 4) Source d'energie (batteries, generateur), 5) Sanitaires (WC chimiques), 6) Kit medical complet, 7) Radio pour les communications. Pour une protection NRBC, ajoutez des filtres anti-radiation et des dosimetres.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Budget Bunker" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🛡️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Budget Bunker
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le budget, la taille et les provisions necessaires pour
        construire un bunker. De 1 a 20 personnes, de 2 semaines a 2 ans
        d&apos;autonomie.
      </p>

      <SimulateurBunker />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Construire un bunker en France : guide complet
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          La construction d&apos;un <strong>bunker</strong> ou{" "}
          <strong>abri souterrain</strong> est un projet qui necessite une
          planification rigoureuse. Que ce soit pour se proteger d&apos;une{" "}
          <strong>catastrophe naturelle</strong>, d&apos;un{" "}
          <strong>conflit arme</strong> ou d&apos;un{" "}
          <strong>accident nucleaire</strong>, le budget depend de trois facteurs
          principaux : le <strong>nombre de personnes</strong>, la{" "}
          <strong>duree d&apos;autonomie</strong> souhaitee et le{" "}
          <strong>niveau de protection</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 4 niveaux de bunker
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">Basique (1 500 €/m²)</p>
            <p className="text-sm text-slate-500 mt-1">
              Abri souterrain en beton standard. Protection contre les tempetes,
              tornades et effondrements. Ventilation simple, sans filtration
              NRBC. Ideal pour un usage temporaire (quelques jours a semaines).
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">Standard (3 000 €/m²)</p>
            <p className="text-sm text-slate-500 mt-1">
              Bunker en beton arme renforce. Filtration d&apos;air basique,
              systeme electrique autonome, sanitaires complets. Protection contre
              les explosions conventionnelles. Autonomie de 1 a 6 mois.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">NRBC (5 500 €/m²)</p>
            <p className="text-sm text-slate-500 mt-1">
              Protection Nucleaire, Radiologique, Biologique et Chimique.
              Filtration HEPA + charbon actif, sas de decontamination, blindage
              anti-radiation. Le standard militaire pour un usage civil.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800">Luxe (10 000 €/m²)</p>
            <p className="text-sm text-slate-500 mt-1">
              Bunker haut de gamme avec confort total : panneaux solaires, culture
              hydroponique, osmose inverse, surveillance video. Concu pour une
              autonomie de 1 a 2 ans dans des conditions de vie confortables.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les besoins vitaux par personne
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-cyan-600">3 L/jour</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">Eau</p>
            <p className="text-xs text-slate-400">Boisson + hygiene minimale</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">2 000 kcal/j</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Nourriture
            </p>
            <p className="text-xs text-slate-400">Rations longue conservation</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">5 m²</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">Surface</p>
            <p className="text-xs text-slate-400">Espace vital minimum</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Ventilation : le poste le plus critique
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          La <strong>ventilation</strong> est l&apos;equipement le plus
          important d&apos;un bunker. Sans renouvellement d&apos;air, le CO2
          s&apos;accumule en quelques heures et devient mortel. Un adulte
          consomme environ <strong>500 litres d&apos;oxygene par jour</strong>.
          Pour un bunker NRBC, il faut ajouter des{" "}
          <strong>filtres HEPA et a charbon actif</strong> capables de bloquer
          les particules radioactives et les agents chimiques.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le marche du bunker en France en 2026
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Depuis 2022, la demande de bunkers a explose en France : +300% selon
          les constructeurs specialises. Les tensions geopolitiques (guerre en
          Ukraine, menaces nucleaires) et les catastrophes naturelles ont pousse
          de nombreux Francais a envisager la construction d&apos;un abri. Les
          entreprises comme Artemis Protection, Atlas Survival Shelters ou
          Fortified Estate proposent des solutions cle en main de 30 000 a
          plusieurs millions d&apos;euros.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Questions frequentes
        </h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Peut-on construire un bunker dans son jardin ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Oui, sous conditions. Si la surface est inferieure a 20 m², une
              simple declaration prealable suffit. Au-dela, un permis de
              construire est necessaire. Verifiez le PLU de votre commune, car
              certaines zones (inondables, classees) peuvent l&apos;interdire. La
              profondeur d&apos;excavation doit aussi etre compatible avec la nappe
              phreatique locale.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Quelle est la duree de vie d&apos;un bunker ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un bunker en beton arme bien construit a une duree de vie de{" "}
              <strong>50 a 100 ans</strong>. Le beton se renforce avec le temps
              (prise de ciment). Les points faibles sont la ventilation
              (filtres a remplacer tous les 5-10 ans), l&apos;etancheite (a
              verifier regulierement) et les batteries (duree de vie 5-15 ans
              selon la technologie).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Combien de temps peut-on survivre dans un bunker ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cela depend des provisions stockees. Avec les bonnes reserves, un
              bunker peut assurer la survie de{" "}
              <strong>quelques semaines a plusieurs annees</strong>. Le facteur
              limitant n&apos;est souvent pas la nourriture ou l&apos;eau, mais
              la <strong>sante mentale</strong> : le confinement prolonge sans
              lumiere naturelle provoque depression, anxiete et conflits
              interpersonnels. Les bunkers de luxe integrent des solutions
              (eclairage circadien, espaces de loisirs) pour attenuer cet
              effet.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Quelle nourriture stocker dans un bunker ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Privilegiez les aliments a longue conservation :{" "}
              <strong>rations militaires (MRE, 5-7 ans)</strong>, aliments{" "}
              <strong>lyophilises (25 ans)</strong>, conserves (2-5 ans), riz et
              pates sous vide (10-30 ans), miel (indefini), sucre et sel
              (indefini). Prevoyez aussi des complements de vitamines
              (notamment vitamine C et D). Pour les longues durees, un{" "}
              <strong>systeme hydroponique</strong> permet de cultiver des
              legumes frais avec de la lumiere artificielle.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Un bunker protege-t-il d&apos;une bombe nucleaire ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un bunker <strong>standard</strong> protege des retombees
              radioactives (fallout) si vous restez confine 2 a 4 semaines. Un
              bunker <strong>NRBC</strong> offre une protection superieure grace
              a ses filtres anti-radiation et son blindage renforce. Cependant,
              aucun bunker civil ne resiste a un{" "}
              <strong>impact direct</strong> d&apos;une ogive nucleaire
              moderne. La protection porte sur les effets indirects : souffle,
              radiation et retombees a distance de l&apos;impact.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-bunker" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
