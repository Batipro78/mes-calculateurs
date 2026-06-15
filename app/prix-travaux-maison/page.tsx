import type { Metadata } from "next";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/prix-travaux-maison" },
  title: "Prix Travaux & Artisans 2026 - Estimateurs Gratuits par Metier",
  description:
    "Estimez le prix de vos travaux par metier : macon, peintre, electricien, plombier, couvreur, chauffagiste. Prix au m2, par prestation et par region. Tarifs 2026.",
  keywords:
    "prix travaux maison, cout artisan, prix macon, prix peintre, prix electricien, prix plombier, prix couvreur, prix chauffagiste, devis travaux 2026, tarif artisan",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment estimer le prix de ses travaux ?",
    a: "Nos estimateurs utilisent les prix moyens constatés en 2026, ajustés par région (Île-de-France x1.25, grandes villes x1.10, province x1.00, rural x0.90). Sélectionnez la prestation, la surface/quantité et votre région pour obtenir une fourchette de prix réaliste.",
  },
  {
    q: "Quelles aides pour réduire le coût des travaux ?",
    a: "Selon les travaux, vous pouvez bénéficier de : MaPrimeRénov' (rénovation énergétique), TVA à 5,5 % ou 10 % (travaux dans un logement de plus de 2 ans), éco-PTZ (prêt à taux zéro), CEE (certificats d'économie d'énergie). Nos estimateurs mentionnent les aides applicables.",
  },
  {
    q: "Faut-il demander plusieurs devis ?",
    a: "Oui, il est recommandé de demander au moins 3 devis pour comparer. Nos estimateurs vous donnent une fourchette de prix pour mieux évaluer les devis reçus. Vérifiez aussi que l'artisan est assuré (décennale) et, pour les travaux énergétiques, qu'il est certifié RGE.",
  },
  {
    q: "Comment bien comparer les devis de travaux ?",
    a: "Demandez au moins trois devis détaillés et comparez-les ligne par ligne : assurez-vous qu'ils portent sur les mêmes prestations, distinguent la main d'œuvre des fournitures, indiquent les quantités et le taux de TVA, et précisent délais et garanties. Un devis anormalement bas cache souvent des prestations manquantes.",
  },
  {
    q: "Comment réduire le coût global de ses travaux de rénovation ?",
    a: "Trois leviers : regrouper les corps de métier sur une même période pour limiter les déplacements et coordonner le chantier, comparer plusieurs devis, et vérifier votre éligibilité à la TVA réduite (10 % en rénovation d'un logement de plus de 2 ans, 5,5 % pour les travaux d'amélioration énergétique) ainsi qu'aux aides comme MaPrimeRénov'.",
  },
];

const metiers = [
  { slug: "/prix-macon", titre: "Prix Macon 2026", emoji: "🧱", desc: "Mur parpaings, dalle beton, terrasse, ravalement facade, ouverture mur porteur et plus.", gradient: "from-amber-400 to-orange-500", prestations: "10 prestations" },
  { slug: "/prix-peintre", titre: "Prix Peintre 2026", emoji: "🎨", desc: "Peinture mur, plafond, facade, papier peint, enduit, peinture decorative.", gradient: "from-violet-400 to-purple-500", prestations: "10 prestations" },
  { slug: "/prix-electricien", titre: "Prix Electricien 2026", emoji: "⚡", desc: "Prise, luminaire, tableau, renovation, VMC, volet roulant, borne IRVE.", gradient: "from-blue-400 to-indigo-500", prestations: "10 prestations" },
  { slug: "/prix-plombier", titre: "Prix Plombier 2026", emoji: "🔧", desc: "Robinet, WC, chauffe-eau, douche, debouchage, salle de bain complete.", gradient: "from-cyan-400 to-teal-500", prestations: "10 prestations" },
  { slug: "/prix-couvreur", titre: "Prix Couvreur 2026", emoji: "🏠", desc: "Reparation toiture, renovation, demoussage, isolation, Velux, gouttiere.", gradient: "from-red-400 to-rose-500", prestations: "10 prestations" },
  { slug: "/prix-chauffagiste", titre: "Prix Chauffagiste 2026", emoji: "🔥", desc: "Chaudiere gaz, PAC air-eau/air-air, plancher chauffant, entretien, depannage.", gradient: "from-orange-400 to-red-500", prestations: "10 prestations" },
];

const villes = [
  "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Montpellier", "Strasbourg", "Bordeaux", "Lille",
  "Rennes", "Toulon", "Reims", "Saint-Etienne", "Le Havre", "Dijon", "Grenoble", "Angers", "Aix-en-Provence", "Brest",
];

export default function PrixTravauxMaison() {
  return (
    <>
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Prix Travaux & Artisans 2026</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Estimez le cout de vos travaux par metier d'artisan. Prix detailles par prestation, ajustes par region, avec les aides disponibles (MaPrimeRenov', TVA reduite, eco-PTZ).
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {metiers.map((m) => (
          <a key={m.slug} href={m.slug} className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:-translate-y-1">
            <div className={`h-2 bg-gradient-to-r ${m.gradient}`} />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{m.emoji}</span>
                <h2 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{m.titre}</h2>
              </div>
              <p className="text-sm text-slate-500 mb-2">{m.desc}</p>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{m.prestations}</span>
            </div>
          </a>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Prix par ville</h2>
        <p className="text-slate-600 mb-4">Consultez les tarifs artisans ajustes pour votre ville :</p>
        <div className="flex flex-wrap gap-2">
          {villes.map((v) => {
            const slug = v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
            return (
              <a key={v} href={`/prix-electricien/${slug}`} className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                {v}
              </a>
            );
          })}
        </div>
      </section>

      <section className="prose prose-slate max-w-none mb-12">
        <h2>Comment bien estimer le cout de ses travaux</h2>
        <p>
          Les prix des travaux varient selon la region, la complexite du chantier et la periode de l'annee. En Ile-de-France, comptez en moyenne 25% de plus qu'en province. Nos estimateurs couvrent 6 metiers avec 10 prestations chacun, soit 60 types de travaux avec des prix au m2 ou forfaitaires.
        </p>
        <p>
          Pour un projet de renovation, commencez par le <a href="/prix-macon" className="text-blue-600 hover:underline">gros oeuvre (macon)</a>, puis l'<a href="/prix-electricien" className="text-blue-600 hover:underline">electricite</a> et la <a href="/prix-plombier" className="text-blue-600 hover:underline">plomberie</a>, la <a href="/prix-couvreur" className="text-blue-600 hover:underline">toiture</a> si necessaire, le <a href="/prix-chauffagiste" className="text-blue-600 hover:underline">chauffage</a>, et enfin les <a href="/prix-peintre" className="text-blue-600 hover:underline">finitions peinture</a>.
        </p>
        <h3>Voir aussi</h3>
        <ul>
          <li><a href="/calculateurs-finance" className="text-blue-600 hover:underline">Calculateurs Finance</a> — pret immobilier, frais de notaire, capacite emprunt</li>
          <li><a href="/simulateurs-emploi" className="text-blue-600 hover:underline">Simulateurs Emploi &amp; Salaire</a> — brut/net, chomage, retraite</li>
          <li><a href="/calculateurs-sante-famille" className="text-blue-600 hover:underline">Calculateurs Sante &amp; Famille</a> — IMC, calories, grossesse</li>
        </ul>
      </section>

      <Faq items={FAQ_ITEMS} />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-800 mb-2">
          Méthode et sources
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Les montants affichés sont des fourchettes indicatives, basées sur les
          tarifs couramment observés sur le marché français en 2026 ; le prix
          réel dépend de chaque chantier et ne remplace pas un devis. Aides et
          TVA des travaux sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            service-public.fr
          </a>{" "}
          et{" "}
          <a
            href="https://www.maprimerenov.gouv.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            maprimerenov.gouv.fr
          </a>
          .
        </p>
      </section>
    </>
  );
}
