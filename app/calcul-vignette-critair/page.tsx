import type { Metadata } from "next";
import VignetteCritair from "./VignetteCritair";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Calcul Vignette Crit'Air 2026 - Simulateur Gratuit en Ligne",
  description:
    "Determinez votre vignette Crit'Air gratuitement. Type de vehicule, carburant, date d'immatriculation. Classification, restrictions ZFE, prix et commande.",
  keywords:
    "vignette crit'air, calcul crit'air, classification vehicule, ZFE, zone faible emission, certificat qualite air, vignette pollution, norme euro, restriction circulation, pic pollution",
  openGraph: {
    title: "Calcul Vignette Crit'Air 2026 - Simulateur Gratuit",
    description:
      "Determinez votre classe Crit'Air en quelques clics. Classification officielle, restrictions ZFE et prix de la vignette.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcul Vignette Crit'Air 2026 - Simulateur Gratuit",
    description:
      "Determinez votre classe Crit'Air en quelques clics. Classification officielle, restrictions ZFE et prix de la vignette.",
  },
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Vignette Crit'Air" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment connaitre sa vignette Crit'Air ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La vignette Crit'Air depend du type de carburant et de la date de premiere immatriculation de votre vehicule. Les vehicules electriques obtiennent Crit'Air 0, les essence recents Crit'Air 1, et les diesel anciens Crit'Air 4 ou 5. Utilisez notre simulateur pour connaitre votre classe exacte.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coute la vignette Crit'Air ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La vignette Crit'Air coute 3,72 euros (3,70 euros + 0,02 euro de frais d'affranchissement). Elle se commande uniquement sur le site officiel certificat-air.gouv.fr. Attention aux sites frauduleux qui facturent beaucoup plus cher.",
                },
              },
              {
                "@type": "Question",
                name: "La vignette Crit'Air est-elle obligatoire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La vignette Crit'Air est obligatoire pour circuler dans les Zones a Faibles Emissions (ZFE). En 2026, plus de 40 agglomerations francaises sont concernees. Sans vignette en ZFE, l'amende est de 68 euros pour les voitures et 135 euros pour les poids lourds.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la duree de validite de la vignette Crit'Air ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La vignette Crit'Air est valable pour toute la duree de vie du vehicule, tant que celui-ci n'est pas modifie (changement de motorisation). Il n'est pas necessaire de la renouveler. Si elle est deterioree, vous pouvez en commander une nouvelle sur le site officiel.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Calcul Vignette Crit'Air" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏷️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Vignette Crit&apos;Air 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Determinez votre classe Crit&apos;Air en quelques clics. Type de
        vehicule, carburant et date d&apos;immatriculation.
      </p>

      <VignetteCritair />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO riche */}
      <div className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Qu&apos;est-ce que la vignette Crit&apos;Air ?
        </h2>
        <p>
          La <strong>vignette Crit&apos;Air</strong> (ou certificat qualite de
          l&apos;air) est un autocollant rond et colore appose sur le
          pare-brise. Elle classe les vehicules en fonction de leurs{" "}
          <strong>emissions de polluants atmospheriques</strong> (oxydes
          d&apos;azote, particules fines). Mise en place en 2016, elle est
          devenue indispensable pour circuler dans les{" "}
          <strong>Zones a Faibles Emissions (ZFE)</strong> qui se multiplient en
          France.
        </p>
        <p>
          La classification repose sur le <strong>type de carburant</strong>{" "}
          (essence, diesel, electrique, GPL) et la{" "}
          <strong>norme Euro du vehicule</strong>, determinee par sa date de
          premiere immatriculation. Il existe 6 classes : de Crit&apos;Air 0
          (vert, zero emission) a Crit&apos;Air 5 (gris, diesel ancien).
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Les 6 classes Crit&apos;Air
        </h3>
        <div className="not-prose grid gap-3 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#00B050]/10 border border-[#00B050]/30">
            <div className="w-10 h-10 rounded-full bg-[#00B050] text-white flex items-center justify-center font-black text-lg flex-shrink-0">
              0
            </div>
            <div>
              <span className="font-bold text-slate-800">Crit&apos;Air 0 — Vert</span>
              <span className="text-sm text-slate-600 block">
                Vehicules electriques et hydrogene. Aucune restriction.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-black text-lg flex-shrink-0">
              1
            </div>
            <div>
              <span className="font-bold text-slate-800">Crit&apos;Air 1 — Violet</span>
              <span className="text-sm text-slate-600 block">
                Essence / hybride Euro 5-6 (depuis 01/2011), GPL, GNV.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/30">
            <div className="w-10 h-10 rounded-full bg-[#EAB308] text-white flex items-center justify-center font-black text-lg flex-shrink-0">
              2
            </div>
            <div>
              <span className="font-bold text-slate-800">Crit&apos;Air 2 — Jaune</span>
              <span className="text-sm text-slate-600 block">
                Essence Euro 4 (01/2006-12/2010), diesel Euro 5-6 (depuis 01/2011).
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30">
            <div className="w-10 h-10 rounded-full bg-[#F97316] text-white flex items-center justify-center font-black text-lg flex-shrink-0">
              3
            </div>
            <div>
              <span className="font-bold text-slate-800">Crit&apos;Air 3 — Orange</span>
              <span className="text-sm text-slate-600 block">
                Essence Euro 2-3 (01/1997-12/2005), diesel Euro 4 (01/2006-12/2010).
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#881337]/10 border border-[#881337]/30">
            <div className="w-10 h-10 rounded-full bg-[#881337] text-white flex items-center justify-center font-black text-lg flex-shrink-0">
              4
            </div>
            <div>
              <span className="font-bold text-slate-800">Crit&apos;Air 4 — Bordeaux</span>
              <span className="text-sm text-slate-600 block">
                Diesel Euro 3 (01/2001-12/2005).
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#6B7280]/10 border border-[#6B7280]/30">
            <div className="w-10 h-10 rounded-full bg-[#6B7280] text-white flex items-center justify-center font-black text-lg flex-shrink-0">
              5
            </div>
            <div>
              <span className="font-bold text-slate-800">Crit&apos;Air 5 — Gris</span>
              <span className="text-sm text-slate-600 block">
                Diesel Euro 2 (01/1997-12/2000).
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Les ZFE en France en 2026
        </h3>
        <p>
          En 2026, plus de <strong>40 agglomerations francaises</strong>{" "}
          appliquent une Zone a Faibles Emissions. Les principales sont :
        </p>
        <ul>
          <li>
            <strong>Paris et Grand Paris</strong> : Crit&apos;Air 3, 4, 5 et non
            classes interdits (la plus stricte de France)
          </li>
          <li>
            <strong>Lyon et metropole</strong> : Crit&apos;Air 3+ interdits
            depuis 2025
          </li>
          <li>
            <strong>Marseille</strong> : Crit&apos;Air 4+ interdits, passage a
            3+ prevu
          </li>
          <li>
            <strong>Strasbourg</strong> : Crit&apos;Air 3+ interdits
          </li>
          <li>
            <strong>Grenoble</strong> : Crit&apos;Air 3+ interdits
          </li>
          <li>
            <strong>Toulouse, Rouen, Nice, Montpellier</strong> : Crit&apos;Air
            4+ interdits, durcissement en cours
          </li>
        </ul>
        <p>
          L&apos;amende pour circulation sans vignette (ou avec une vignette non
          autorisee) en ZFE est de <strong>68 euros</strong> pour les voitures et{" "}
          <strong>135 euros</strong> pour les poids lourds.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">
          Comment commander sa vignette Crit&apos;Air ?
        </h3>
        <ol>
          <li>
            Rendez-vous sur le{" "}
            <strong>
              <a
                href="https://www.certificat-air.gouv.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                site officiel certificat-air.gouv.fr
              </a>
            </strong>
          </li>
          <li>
            Renseignez votre <strong>numero d&apos;immatriculation</strong>
          </li>
          <li>
            Verifiez les informations de votre vehicule
          </li>
          <li>
            Payez en ligne : <strong>3,72 euros</strong> (vignette 3,70 euros +
            affranchissement 0,02 euro)
          </li>
          <li>
            Recevez votre vignette par courrier sous <strong>7 a 10 jours</strong>
          </li>
        </ol>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
          <div className="flex items-start gap-3">
            <span className="text-xl">&#9888;&#65039;</span>
            <div>
              <h4 className="font-bold text-amber-800 mb-1">Attention aux arnaques</h4>
              <p className="text-sm text-amber-700">
                Le seul site officiel est{" "}
                <strong>certificat-air.gouv.fr</strong>. De nombreux sites
                frauduleux proposent la vignette a des prix bien superieurs (15
                a 59 euros). Le prix reel est de 3,72 euros. Ne passez jamais
                par un intermediaire.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500 italic">
          Mis a jour en avril 2026. Ce simulateur est fourni a titre indicatif.
          La classification definitive est celle attribuee par le Ministere de
          la Transition Ecologique lors de la commande sur le site officiel.
        </p>
      </div>

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/calcul-vignette-critair" />
    </div>
  );
}
