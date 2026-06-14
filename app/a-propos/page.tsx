import type { Metadata } from "next";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
  alternates: { canonical: "/a-propos" },
  title: "A propos de Mes Calculateurs - Notre mission et methode",
  description:
    "Qui sommes-nous ? La mission de Mes Calculateurs, comment nos calculateurs sont concus, nos sources officielles et notre engagement de gratuite et de fiabilite.",
};

const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Notre mission",
    paras: [
      "Mes Calculateurs met a disposition des outils de calcul et de simulation gratuits, simples et fiables, pour aider chacun a prendre de meilleures decisions au quotidien : salaire, impots, immobilier, sante, travaux, conversions et bien plus.",
      "Notre objectif est qu'une personne sans connaissance technique obtienne en quelques secondes un resultat clair, accompagne d'explications comprehensibles.",
    ],
  },
  {
    title: "Comment nos calculateurs sont concus",
    paras: [
      "Chaque calculateur repose sur des formules et des baremes verifies, accompagnes d'un contenu explicatif : methode de calcul, exemples chiffres, cas particuliers et questions frequentes.",
      "Nous nous appuyons sur des sources officielles (notamment service-public.fr, impots.gouv.fr, l'INSEE et les organismes publics concernes) et nous mettons les donnees a jour lorsque la reglementation evolue.",
      "Les resultats sont fournis a titre indicatif et ne remplacent pas l'avis d'un professionnel (expert-comptable, notaire, medecin, conseiller...) pour une situation precise.",
    ],
  },
  {
    title: "Gratuit, et comment c'est finance",
    paras: [
      "Le site est et reste 100 % gratuit, sans inscription. Il est finance, sur certaines pages, par la mise en relation avec des professionnels partenaires.",
      "Cela nous permet de developper de nouveaux calculateurs et de maintenir les existants a jour, sans jamais facturer l'utilisateur.",
    ],
  },
  {
    title: "Respect de votre vie privee",
    paras: [
      "Nous respectons le RGPD. La mesure d'audience est anonyme et sans cookie : aucune donnee personnelle identifiante n'est collectee lors de votre navigation.",
      "Pour le detail des donnees traitees, consultez notre politique de confidentialite.",
    ],
  },
];

export default function Page() {
  return (
    <div>
      <Breadcrumb currentPage="A propos" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
          MC
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          A propos de Mes Calculateurs
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Des calculateurs gratuits, clairs et a jour pour vous simplifier la vie.
      </p>

      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-6 bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.paras.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-6 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Nous contacter</h2>
        <p className="text-slate-600 leading-relaxed">
          Une question, une erreur reperee, une suggestion de calculateur ?
          Rendez-vous sur notre{" "}
          <a href="/aide" className="text-blue-600 hover:underline font-medium">
            page d&apos;aide
          </a>{" "}
          pour nous ecrire. Voir aussi nos{" "}
          <a href="/mentions-legales" className="text-blue-600 hover:underline font-medium">
            mentions legales
          </a>{" "}
          et notre{" "}
          <a href="/confidentialite" className="text-blue-600 hover:underline font-medium">
            politique de confidentialite
          </a>
          .
        </p>
      </section>
    </div>
  );
}
