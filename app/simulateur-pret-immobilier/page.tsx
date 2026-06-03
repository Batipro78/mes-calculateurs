import type { Metadata } from "next";
import SimulateurPret from "./SimulateurPret";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";
import LeadCaptureForm from "../components/LeadCaptureForm";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/simulateur-pret-immobilier" },
  title: "Simulateur Pret Immobilier 2026 - Calcul mensualite gratuit",
  description:
    "Simulez votre pret immobilier gratuitement. Calculez vos mensualites, le cout total du credit et le tableau d'amortissement. Taux 2026, TAEG, apport et FAQ.",
  keywords:
    "simulateur pret immobilier, calcul mensualite, credit immobilier, taux pret, tableau amortissement, emprunt immobilier 2026, TAEG, taux endettement",
};

const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "Ce qui compose vraiment le cout de votre credit",
    paras: [
      "La mensualite affichee ne raconte pas toute l'histoire. Le cout total d'un pret immobilier additionne plusieurs elements qu'il faut comparer banque par banque.",
      "Les interets : c'est la remuneration de la banque, calculee sur le capital restant du. Plus la duree est longue, plus le total d'interets grimpe.",
      "L'assurance emprunteur : souvent 0,10 % a 0,40 % du capital par an. Sur 20 ans, elle peut representer plusieurs milliers d'euros. Depuis la loi Lemoine, vous pouvez en changer a tout moment pour la faire baisser.",
      "Les frais de garantie (caution ou hypotheque) et les frais de dossier : quelques centaines a quelques milliers d'euros, parfois negociables.",
    ],
  },
  {
    title: "Le TAEG, le bon chiffre a comparer",
    paras: [
      "Le TAEG (taux annuel effectif global) regroupe le taux d'interet, l'assurance, les frais de dossier et de garantie. C'est l'indicateur le plus fiable pour comparer deux offres.",
      "Deux prets affichant le meme taux nominal peuvent avoir un TAEG different a cause de l'assurance ou des frais. Comparez toujours les TAEG, pas seulement le taux mis en avant.",
      "Le TAEG ne peut pas depasser le taux d'usure, un plafond legal fixe par la Banque de France et revise regulierement.",
    ],
  },
  {
    title: "Apport, duree et taux d'endettement",
    paras: [
      "Taux d'endettement : vos mensualites de credit ne doivent en principe pas depasser 35 % de vos revenus nets, assurance comprise.",
      "Apport personnel : un apport de 10 a 20 % du prix (souvent destine a couvrir les frais de notaire et de garantie) rassure la banque et permet d'obtenir un meilleur taux.",
      "Duree : allonger la duree reduit la mensualite mais augmente le cout total. Raccourcir la duree fait l'inverse. La duree maximale courante est de 25 ans.",
    ],
  },
  {
    title: "Comment obtenir un meilleur taux",
    paras: [
      "Faites jouer la concurrence : sollicitez plusieurs banques ou passez par un courtier.",
      "Soignez votre dossier : revenus stables, comptes bien tenus, absence de decouverts sur les 3 derniers mois.",
      "Negociez l'assurance separement : c'est souvent la plus grosse marge d'economie, grace a la delegation d'assurance.",
      "Comparez le cout total du credit sur toute la duree, pas uniquement la mensualite.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment est calculee la mensualite d'un pret immobilier ?",
    a: "Avec la formule d'annuite constante : Mensualite = Capital x (taux mensuel) / (1 - (1 + taux mensuel)^(-nombre de mois)), ou le taux mensuel est le taux annuel divise par 12. Le simulateur ci-dessus fait le calcul pour vous.",
  },
  {
    q: "Quels sont les taux moyens de pret immobilier en 2026 ?",
    a: "A titre indicatif, environ 3,10 % sur 10 ans, 3,25 % sur 15 ans, 3,40 % sur 20 ans et 3,55 % sur 25 ans. Les taux varient selon votre profil et la banque ; verifiez les baremes du moment.",
  },
  {
    q: "Quel taux d'endettement maximum est accepte ?",
    a: "En regle generale, vos mensualites (assurance comprise) ne doivent pas depasser 35 % de vos revenus nets. Au-dela, l'obtention du pret devient difficile.",
  },
  {
    q: "Faut-il un apport pour emprunter ?",
    a: "Ce n'est pas obligatoire mais fortement recommande. Un apport de 10 a 20 % du prix couvre les frais annexes et permet d'obtenir un meilleur taux.",
  },
  {
    q: "C'est quoi le TAEG ?",
    a: "Le taux annuel effectif global inclut le taux d'interet, l'assurance et les frais (dossier, garantie). C'est l'indicateur a comparer pour choisir la meilleure offre, car il reflete le cout reel.",
  },
  {
    q: "Peut-on changer d'assurance emprunteur pour payer moins cher ?",
    a: "Oui. Depuis la loi Lemoine, vous pouvez resilier et changer d'assurance emprunteur a tout moment, ce qui permet souvent d'economiser plusieurs milliers d'euros sur la duree du pret.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Pret Immobilier" />
      <Breadcrumb currentPage="Simulateur Pret Immobilier" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Simulateur Pret Immobilier 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez vos mensualites, le cout total et visualisez votre tableau
        d&apos;amortissement.
      </p>

      <SimulateurPret />

      <LeadCaptureForm
        nicheId="credit-immobilier"
        titreOverride="Obtenez le meilleur taux pour votre pret immobilier"
        couleur="#1d4ed8"
      />


      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Taux moyens en 2026 et formule de calcul
        </h2>
        <div className="grid gap-3 sm:grid-cols-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">10 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,10%</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">15 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,25%</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">20 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,40%</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">25 ans</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">~3,55%</p>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700">
          Mensualite = Capital x (taux / 12) / (1 - (1 + taux / 12)^(-nb mois))
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-8"
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

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          Outils complementaires
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Pour une vision complete de votre projet, estimez vos{" "}
          <a href="/frais-de-notaire" className="text-violet-600 underline hover:text-violet-800">frais de notaire</a>, verifiez votre{" "}
          <a href="/calcul-capacite-emprunt" className="text-violet-600 underline hover:text-violet-800">capacite d&apos;emprunt</a> et votre{" "}
          <a href="/calcul-taux-endettement" className="text-violet-600 underline hover:text-violet-800">taux d&apos;endettement</a>. Pour un bien a renover, chiffrez les travaux avec{" "}
          <a href="/prix-electricien" className="text-violet-600 underline hover:text-violet-800">prix electricien</a>,{" "}
          <a href="/prix-plombier" className="text-violet-600 underline hover:text-violet-800">prix plombier</a>,{" "}
          <a href="/prix-chauffagiste" className="text-violet-600 underline hover:text-violet-800">prix chauffagiste</a> et{" "}
          <a href="/prix-macon" className="text-violet-600 underline hover:text-violet-800">prix macon</a>.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode="Le simulateur calcule la mensualite a partir de la formule d'amortissement classique : M = C x t / (1 - (1 + t)^-n), ou C est le capital emprunte, t le taux d'interet mensuel et n le nombre de mensualites. Le cout total et le tableau d'amortissement en decoulent. Le taux d'endettement maximal de 35 % suit la recommandation du HCSF."
        sources={[
          { label: "Service-Public.fr - Le credit immobilier", url: "https://www.service-public.fr/particuliers/vosdroits/F1397" },
          { label: "Banque de France - Taux d'usure en vigueur", url: "https://www.banque-france.fr/fr/statistiques/taux-et-cours/taux-dusure" },
          { label: "HCSF - Conditions d'octroi des credits immobiliers (35 %)", url: "https://www.economie.gouv.fr/hcsf" },
        ]}
      />

      <VillesLinks baseSlug="/simulateur-pret-immobilier" title="Pret immobilier par ville" color="blue" />
      <RelatedCalculators currentSlug="/simulateur-pret-immobilier" />
    </div>
  );
}
