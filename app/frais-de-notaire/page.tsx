import type { Metadata } from "next";
import CalculateurNotaire from "./CalculateurNotaire";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import VillesLinks from "../components/VillesLinks";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";
import SourcesMethodo from "../components/SourcesMethodo";

export const metadata: Metadata = {
  alternates: { canonical: "/frais-de-notaire" },
  title: "Calcul Frais de Notaire 2026 - Simulateur gratuit",
  description:
    "Estimez les frais de notaire pour votre achat immobilier en 2026. Ancien, neuf, terrain. Calcul detaille : droits de mutation, emoluments, debours. FAQ et conseils.",
  keywords:
    "frais de notaire, calcul frais notaire, simulateur frais notaire, frais acquisition, droits mutation, achat immobilier 2026",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Combien coutent les frais de notaire dans l'ancien en 2026 ?",
    a: "Environ 7 a 8 % du prix du bien. Ils comprennent les droits de mutation (environ 5,80 %), les emoluments du notaire (bareme reglemente) et les debours (frais avances pour les documents administratifs).",
  },
  {
    q: "Quelle difference entre frais de notaire dans le neuf et l'ancien ?",
    a: "Dans le neuf, ils sont reduits a environ 2 a 3 % du prix, car les droits de mutation sont remplaces par la TVA deja incluse dans le prix de vente. Dans l'ancien, ils s'elevent a 7-8 %.",
  },
  {
    q: "Peut-on negocier les frais de notaire ?",
    a: "Les droits de mutation (l'essentiel des frais) sont fixes par l'Etat et non negociables. Mais le notaire peut accorder une remise jusqu'a 20 % sur ses emoluments au-dela de 100 000 EUR. Vous pouvez aussi deduire la valeur du mobilier (cuisine equipee, meubles) du prix de vente pour reduire l'assiette des droits.",
  },
  {
    q: "Qui paie les frais de notaire ?",
    a: "C'est l'acheteur qui regle les frais de notaire, en plus du prix du bien. Ils sont verses le jour de la signature de l'acte authentique.",
  },
  {
    q: "Les frais de notaire peuvent-ils etre finances par le pret ?",
    a: "Oui, mais les banques preferent que l'apport personnel couvre au moins les frais de notaire. Les inclure dans le pret augmente le montant emprunte et le cout total du credit.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Frais de Notaire" />
      <Breadcrumb currentPage="Frais de Notaire" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Frais de Notaire 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez les frais de notaire pour votre achat immobilier. Ancien, neuf
        ou terrain.
      </p>

      <CalculateurNotaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment sont calcules les frais de notaire ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les &quot;frais de notaire&quot; designent l&apos;ensemble des sommes
          versees au notaire lors d&apos;un achat immobilier. Contrairement a ce
          que l&apos;on croit, le notaire ne garde qu&apos;une petite partie :
          la majorite va a l&apos;Etat sous forme de taxes.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Decomposition des frais
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~80%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Droits de mutation
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Taxes reversees a l&apos;Etat et au departement
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~10%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Emoluments du notaire
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Remuneration reglee par l&apos;Etat (bareme fixe)
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-600">~10%</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">
              Debours et formalites
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Frais avances par le notaire (cadastre, etc.)
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Ancien vs Neuf
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Dans l&apos;<strong>ancien</strong>, les frais sont d&apos;environ{" "}
          <strong>7 a 8%</strong> du prix du bien. Dans le{" "}
          <strong>neuf</strong>, ils sont reduits a environ{" "}
          <strong>2 a 3%</strong> car les droits de mutation sont remplaces par
          la TVA (deja incluse dans le prix).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Estimez aussi vos travaux de renovation
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Si vous achetez un bien a renover, anticipez le <strong>budget travaux</strong> en complement des frais de notaire. Consultez nos estimateurs : <a href="/prix-electricien" className="text-cyan-600 underline hover:text-cyan-800">prix electricien</a>, <a href="/prix-plombier" className="text-cyan-600 underline hover:text-cyan-800">prix plombier</a>, <a href="/prix-chauffagiste" className="text-cyan-600 underline hover:text-cyan-800">prix chauffagiste</a>, <a href="/prix-macon" className="text-cyan-600 underline hover:text-cyan-800">prix macon</a>, <a href="/prix-peintre" className="text-cyan-600 underline hover:text-cyan-800">prix peintre</a> et <a href="/prix-couvreur" className="text-cyan-600 underline hover:text-cyan-800">prix couvreur</a>. Pour le financement, simulez vos <a href="/simulateur-pret-immobilier" className="text-cyan-600 underline hover:text-cyan-800">mensualites de pret</a> et verifiez votre <a href="/calcul-taux-endettement" className="text-cyan-600 underline hover:text-cyan-800">taux d&apos;endettement</a>.
        </p>
      </section>

      <HowToJsonLd
        name="Estimer les frais de notaire"
        steps={[
          { name: "Renseigner le bien", text: "Indiquer le prix d'achat et le type de bien : ancien, neuf ou terrain." },
          { name: "Droits de mutation", text: "Appliquer les droits de mutation (environ 5,80 pour cent dans l'ancien) selon le département." },
          { name: "Total des frais", text: "Ajouter les emoluments du notaire (barème reglemente) et les debours pour obtenir le total." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode="Les frais de notaire sont calcules a partir du prix d'achat : droits de mutation (DMTO, environ 5,80 % dans l'ancien, fixes par departement), emoluments du notaire (bareme reglemente par decret) et debours. Notre simulateur applique ces baremes officiels selon le type de bien (ancien, neuf, terrain)."
        sources={[
          { label: "Service-Public.fr - Frais d'acquisition (frais de notaire)", url: "https://www.service-public.fr/particuliers/vosdroits/F2761" },
          { label: "Notaires de France - Bareme des emoluments", url: "https://www.notaires.fr/fr/donation-succession/frais-de-notaire" },
          { label: "Impots.gouv.fr - Droits de mutation a titre onereux", url: "https://www.impots.gouv.fr" },
        ]}
      />

      <VillesLinks baseSlug="/frais-de-notaire" title="Frais de notaire par ville" color="cyan" />
      <RelatedCalculators currentSlug="/frais-de-notaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
