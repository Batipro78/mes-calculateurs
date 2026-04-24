import type { Metadata } from "next";
import TaxeFonciere from "./TaxeFonciere";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import VillesLinks from "../components/VillesLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-taxe-fonciere" },
  title: "Calcul Taxe Fonciere 2026 - Simulateur Estimation Gratuit",
  description:
    "Estimez votre taxe fonciere 2026 en ligne. Valeur locative cadastrale, taux communal par ville, abattement 50%, exoneration neuf. Simulateur gratuit et instantane.",
  keywords:
    "calcul taxe fonciere, simulateur taxe fonciere 2026, estimation taxe fonciere, valeur locative cadastrale, taux communal, taxe fonciere par ville, exoneration taxe fonciere neuf",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Taxe Fonciere 2026" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment est calculee la taxe fonciere ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La taxe fonciere est calculee sur la base de la valeur locative cadastrale du bien, revalorisee chaque annee par un coefficient fixe par la loi de finances. Cette valeur est ensuite reduite d'un abattement forfaitaire de 50% pour obtenir la base imposable. Le taux d'imposition (commune + intercommunalite + taxes speciales) est applique a cette base.",
                },
              },
              {
                "@type": "Question",
                name: "Peut-on etre exonere de taxe fonciere ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, plusieurs exonerations existent. Les constructions neuves beneficient d'une exoneration de 2 ans sur demande (formulaire H1 ou H2 dans les 90 jours). Les personnes agees de plus de 75 ans sous conditions de revenus, les beneficiaires de l'AAH et de l'ASPA peuvent aussi en etre exoneres totalement.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que la valeur locative cadastrale ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La valeur locative cadastrale est le loyer annuel theorique que pourrait produire un bien immobilier s'il etait loue dans des conditions normales. Elle est determinee par l'administration fiscale en fonction de la surface, du type de bien, du confort et de la localisation. Elle est revalorisee chaque annee.",
                },
              },
              {
                "@type": "Question",
                name: "Comment contester sa taxe fonciere ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Vous pouvez contester votre taxe fonciere en adressant une reclamation au centre des impots fonciers avant le 31 decembre de l'annee suivant la mise en recouvrement. Les motifs frequents sont : erreur de surface, mauvaise categorie cadastrale, ou comparaison avec des biens similaires moins imposes dans le voisinage.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Taxe Fonciere" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏠
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Taxe Fonciere 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Estimez votre taxe fonciere selon la valeur locative cadastrale, le taux communal de votre ville et les exonerations applicables.
      </p>

      <TaxeFonciere />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Comment est calculee la taxe fonciere en 2026 ?</h2>

        <p className="text-sm text-slate-600 mb-4">
          La taxe fonciere sur les proprietes baties (TFPB) est un impot local paye chaque annee par tout proprietaire d&apos;un bien immobilier au 1er janvier. Son montant depend de trois elements : la valeur locative cadastrale, le coefficient de revalorisation annuel et le taux d&apos;imposition vote par la commune.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Formule de calcul</h3>
        <div className="bg-amber-50/50 rounded-xl p-4 mb-4">
          <p className="font-semibold text-amber-700 mb-1">Taxe fonciere =</p>
          <p className="text-sm text-slate-600">
            Valeur locative cadastrale &times; Coefficient de revalorisation &times; 50% (abattement) &times; Taux d&apos;imposition global
          </p>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Revalorisation 2026</h3>
        <p className="text-sm text-slate-600 mb-4">
          Chaque annee, la loi de finances fixe un coefficient de revalorisation des valeurs locatives. Pour 2026, ce coefficient est estime a <strong>+3,5%</strong>, en ligne avec l&apos;indice des prix a la consommation harmonise (IPCH). Cette hausse s&apos;applique automatiquement a tous les biens, avant meme toute decision locale sur les taux.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Taux par ville : de grandes disparites</h3>
        <p className="text-sm text-slate-600 mb-3">
          Le taux d&apos;imposition varie considerablement d&apos;une commune a l&apos;autre. Il regroupe le taux communal, le taux intercommunal et la taxe speciale d&apos;equipement. Voici les taux globaux approximatifs pour les grandes villes :
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Ville</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux global approx.</th>
              </tr>
            </thead>
            <tbody>
              {[
                { v: "Paris", t: "13,5%" }, { v: "Lyon", t: "30,5%" }, { v: "Marseille", t: "40,5%" },
                { v: "Toulouse", t: "44,5%" }, { v: "Nice", t: "27%" }, { v: "Bordeaux", t: "52%" },
                { v: "Lille", t: "45%" }, { v: "Nantes", t: "42%" }, { v: "Strasbourg", t: "34%" },
                { v: "Montpellier", t: "47%" },
              ].map((item) => (
                <tr key={item.v} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 text-slate-700">{item.v}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-amber-600">{item.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Exonerations possibles</h3>
        <div className="space-y-2 mb-4">
          {[
            { titre: "Construction neuve", desc: "Exoneration de 2 ans sur demande (formulaire H1/H2 dans les 90 jours suivant l'achevement)" },
            { titre: "Personnes agees (+ 75 ans)", desc: "Exoneration totale sous conditions de revenus (RFR < plafond)" },
            { titre: "Beneficiaires AAH / ASPA", desc: "Exoneration totale sous conditions de ressources et de cohabitation" },
            { titre: "Logements economes en energie", desc: "Exoneration partielle ou totale (50% a 100%) pendant 3 ans pour renovation energetique, sur deliberation communale" },
          ].map((e) => (
            <div key={e.titre} className="bg-amber-50/50 rounded-xl p-3">
              <p className="font-semibold text-amber-700 text-sm">{e.titre}</p>
              <p className="text-xs text-slate-600">{e.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Comment contester sa taxe fonciere ?</h3>
        <p className="text-sm text-slate-600 mb-2">
          Si vous estimez que votre taxe fonciere est trop elevee, vous pouvez adresser une reclamation au centre des impots fonciers de votre commune. Delai : avant le 31 decembre de l&apos;annee suivant l&apos;avis d&apos;imposition.
        </p>
        <p className="text-sm text-slate-600">
          Les motifs les plus frequents : erreur sur la surface, mauvaise categorie cadastrale, ou comparaison avec des biens similaires du voisinage. Vous pouvez demander la fiche d&apos;evaluation cadastrale de votre bien (formulaire 6675 M) pour verifier les informations retenues par l&apos;administration.
        </p>
      </section>

      <VillesLinks baseSlug="/calcul-taxe-fonciere" title="Taxe fonciere par ville" color="amber" />
      <RelatedCalculators currentSlug="/calcul-taxe-fonciere" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
