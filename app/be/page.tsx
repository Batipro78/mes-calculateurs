import type { Metadata } from "next";
import Breadcrumb from "../components/Breadcrumb";
import WebAppJsonLd from "../components/WebAppJsonLd";
import AdSlot from "../components/AdSlot";

export const metadata: Metadata = {
  alternates: { canonical: "/be" },
  title: "Calculateurs Belgique 2026 - Salaire, TVA, Immobilier",
  description:
    "Calculateurs gratuits adaptes a la Belgique : salaire brut/net belge, TVA 21%, droits d'enregistrement Wallonie/Flandre/Bruxelles, precompte immobilier. Baremes 2026.",
  keywords:
    "calculateur belgique, salaire net belgique, TVA belge, droits enregistrement belgique, precompte immobilier",
};

const outilsBe = [
  {
    titre: "Salaire Brut / Net Belgique",
    description:
      "Convertissez votre brut en net avec ONSS, precompte professionnel et tranches IPP 2026.",
    href: "/be/salaire-brut-net",
    icone: "💰",
    couleur: "from-yellow-500 to-red-500",
    tag: "Populaire",
  },
  {
    titre: "Simulateur Pret Hypothecaire",
    description:
      "Calculez votre mensualite, cout total et interets au taux marche belge 2026 (3,05 % a 3,45 %).",
    href: "/be/simulateur-pret-immobilier",
    icone: "🏠",
    couleur: "from-violet-500 to-purple-500",
    tag: "Nouveau",
  },
  {
    titre: "Capacite d'Emprunt BE",
    description:
      "Combien pouvez-vous emprunter en Belgique ? Taux endettement max 33 %, taux marche 2026, simulation par duree.",
    href: "/be/calcul-capacite-emprunt",
    icone: "💼",
    couleur: "from-blue-500 to-indigo-600",
    tag: "Nouveau",
  },
  {
    titre: "Calcul TVA Belgique",
    description:
      "Calculez HTVA, TVAC et TVA aux taux belges : 21 %, 12 % et 6 %. Conforme 2026.",
    href: "/be/calcul-tva",
    icone: "🧾",
    couleur: "from-emerald-500 to-teal-500",
    tag: "",
  },
  {
    titre: "Droits d'Enregistrement Immobilier",
    description:
      "Calculez les droits d'enregistrement par region : Wallonie 3 % / Flandre 2 % / Bruxelles avec abattement 200 000 EUR.",
    href: "/be/droits-enregistrement",
    icone: "🏘️",
    couleur: "from-rose-500 to-red-600",
    tag: "",
  },
  {
    titre: "Precompte Immobilier",
    description:
      "Estimez votre precompte immobilier annuel en fonction du revenu cadastral, region et commune. Indexation 2,1763 (2026).",
    href: "/be/precompte-immobilier",
    icone: "🏛️",
    couleur: "from-amber-500 to-orange-600",
    tag: "",
  },
  {
    titre: "Droits de Succession",
    description:
      "Calcul des droits de succession en ligne directe selon votre region. Baremes 2026 + reforme wallonne 2028.",
    href: "/be/droits-succession",
    icone: "⚖️",
    couleur: "from-slate-700 to-slate-900",
    tag: "Nouveau",
  },
  {
    titre: "Indemnite Licenciement",
    description:
      "Calculez votre indemnite de rupture selon le bareme officiel post-2014 (statut unifie ouvriers/employes).",
    href: "/be/indemnite-licenciement",
    icone: "📄",
    couleur: "from-indigo-500 to-purple-500",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Chomage ONEM",
    description:
      "Calculez vos allocations chomage avec la reforme 2026 : taux degressifs 65 % / 60 % / 40 %, duree max 24 mois.",
    href: "/be/simulateur-chomage",
    icone: "📋",
    couleur: "from-sky-500 to-blue-600",
    tag: "Nouveau",
  },
  {
    titre: "Pension Alimentaire - Méthode Renard",
    description:
      "Calculez la pension alimentaire selon la méthode Renard officielle. Coefficients par age, plafond 1/3, déduction 80%.",
    href: "/be/pension-alimentaire",
    icone: "👨‍👩‍👧",
    couleur: "from-pink-500 to-rose-600",
    tag: "Nouveau",
  },
  {
    titre: "Indemnité Kilométrique",
    description:
      "Calculez votre indemnite kilometrique selon les taux belges 2026 : 0,4326 EUR/km (trimestriel), 0,4449 EUR/km (annuel), fonctionnaire.",
    href: "/be/indemnite-kilometrique",
    icone: "🚗",
    couleur: "from-teal-500 to-cyan-600",
    tag: "Nouveau",
  },
  {
    titre: "Simulateur Dividendes",
    description:
      "Calculez le net apres precompte mobilier belge : 30 % standard, 15 % VVPRbis PME, 6,5 % reserves liquidation. Exoneration 833 EUR.",
    href: "/be/simulateur-dividendes",
    icone: "📈",
    couleur: "from-green-500 to-emerald-600",
    tag: "Nouveau",
  },
  {
    titre: "Impôt des Sociétés (ISOC)",
    description:
      "Calculez l'impot des societes belge : taux normal 25 %, taux reduit PME 20 % sur les 100 000 EUR de benefice. Conditions PME 2026.",
    href: "/be/simulateur-isoc",
    icone: "🏢",
    couleur: "from-blue-600 to-indigo-700",
    tag: "Nouveau",
  },
];

export default function PageBe() {
  return (
    <div>
      <WebAppJsonLd
        name="Calculateurs Belgique"
        description="Calculateurs gratuits adaptes a la fiscalite belge 2026"
        category="FinanceApplication"
      />
      <Breadcrumb currentPage="Belgique" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🇧🇪
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calculateurs Belgique 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Outils gratuits adaptes a la fiscalite belge. Baremes officiels 2026,
        Wallonie, Flandre et Bruxelles.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {outilsBe.map((outil) => (
          <a
            key={outil.href}
            href={outil.href}
            className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${outil.couleur} rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0`}
              >
                {outil.icone}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {outil.titre}
                  </h2>
                  {outil.tag && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700">
                      {outil.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {outil.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi une section Belgique ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-3">
          La fiscalite et les taux belges different sensiblement de la France :
          TVA a 21 % (au lieu de 20 %), precompte professionnel progressif sur
          4 tranches (25 % / 40 % / 45 % / 50 %), droits d&apos;enregistrement
          regionalises (Wallonie 3 % / Flandre 2 % pour l&apos;habitation propre
          et unique, Bruxelles avec abattement de 200 000 EUR), precompte
          immobilier calcule sur le revenu cadastral indexe.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Nos calculateurs utilisent les baremes officiels 2026 publies par le
          SPF Finances et les Regions wallonne, flamande et bruxelloise.
        </p>
      </section>
    </div>
  );
}
