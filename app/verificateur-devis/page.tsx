import type { Metadata } from "next";
import VerificateurDevis from "./VerificateurDevis";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Verificateur de Devis 2026 - Conformite 16 Mentions Obligatoires",
  description:
    "Deposez votre devis et verifiez sa conformite legale. L'IA analyse les 16 mentions obligatoires en France (2026) : SIRET, assurance decennale, TVA, dechets. Gratuit.",
  keywords:
    "verificateur devis, conformite devis, mentions obligatoires devis, devis conforme 2026, verifier devis artisan, 16 mentions devis, controle devis BTP",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Verificateur de Devis" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quelles sont les mentions obligatoires sur un devis en 2026 ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un devis en 2026 doit comporter 16 mentions obligatoires : date, numero, identite entreprise (nom, adresse, SIRET, forme juridique), identite client, description detaillee, prix unitaires HT, taux TVA, total HT et TTC, duree de validite, conditions de paiement, assurance decennale (BTP), gestion des dechets (travaux), date de debut/duree, et signature du client.",
                },
              },
              {
                "@type": "Question",
                name: "Comment verifier si un devis est conforme ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Deposez votre devis (PDF ou photo) sur notre outil. L'intelligence artificielle analyse automatiquement le document et verifie la presence des 16 mentions obligatoires. Vous obtenez un score de conformite et la liste des mentions presentes, partielles ou manquantes.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les sanctions pour un devis non conforme ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un devis non conforme peut entrainer une amende de 3 000 euros pour une personne physique et 15 000 euros pour une personne morale (article L441-1 du Code de commerce). De plus, un devis incomplet peut etre conteste par le client et compliquer le recouvrement en cas de litige.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Verificateur de Devis" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📋
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Verificateur de Devis 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Deposez votre devis (PDF ou photo) — l&apos;IA verifie les 16 mentions obligatoires en quelques secondes.
      </p>

      <VerificateurDevis />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les 16 mentions obligatoires d&apos;un devis (2026)
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Depuis 2026, un devis professionnel doit comporter <strong>16 mentions obligatoires</strong>.
          L&apos;absence de certaines mentions peut entrainer des <strong>amendes jusqu&apos;a 15 000 &euro;</strong> et fragiliser votre position en cas de litige.
        </p>

        <div className="space-y-3">
          {[
            { n: 1, label: "Date du devis", desc: "Date a laquelle le devis est etabli" },
            { n: 2, label: "Numero du devis", desc: "Numerotation chronologique unique" },
            { n: 3, label: "Identite de l'entreprise", desc: "Nom, adresse du siege social" },
            { n: 4, label: "Numero SIRET", desc: "14 chiffres identifiant l'etablissement" },
            { n: 5, label: "Forme juridique", desc: "SARL, SAS, EI, auto-entrepreneur, etc." },
            { n: 6, label: "Identite du client", desc: "Nom et adresse du client" },
            { n: 7, label: "Description des travaux", desc: "Detail precis de chaque prestation" },
            { n: 8, label: "Prix unitaires HT", desc: "Quantites et prix de chaque poste" },
            { n: 9, label: "Taux de TVA", desc: "Taux applicable(s) : 20%, 10%, 5,5%" },
            { n: 10, label: "Total HT et TTC", desc: "Montants hors taxe et toutes taxes comprises" },
            { n: 11, label: "Duree de validite", desc: "Combien de temps le devis reste valable" },
            { n: 12, label: "Conditions de paiement", desc: "Echeancier, acompte, delais de paiement" },
            { n: 13, label: "Assurance decennale", desc: "Numero de police + nom de l'assureur (BTP)" },
            { n: 14, label: "Gestion des dechets", desc: "Mention obligatoire pour les travaux (loi 2021)" },
            { n: 15, label: "Date et duree des travaux", desc: "Date de debut et duree estimee" },
            { n: 16, label: "Signature client", desc: "Mention \"Devis recu avant execution\" + signature" },
          ].map((m) => (
            <div key={m.n} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{m.n}</span>
              <div>
                <p className="text-sm font-semibold text-slate-700">{m.label}</p>
                <p className="text-xs text-slate-500">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 mt-8 mb-3">Sanctions en cas de non-conformite</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="font-semibold text-red-700">Personne physique</p>
            <p className="text-sm text-slate-600">Amende jusqu&apos;a <strong>3 000 &euro;</strong></p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="font-semibold text-red-700">Personne morale</p>
            <p className="text-sm text-slate-600">Amende jusqu&apos;a <strong>15 000 &euro;</strong></p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-8 mb-3">Facturation electronique 2026-2027</h3>
        <p className="text-slate-600 leading-relaxed">
          A partir de <strong>septembre 2026</strong>, les grandes entreprises devront emettre des factures electroniques au format Factur-X.
          Les PME et micro-entreprises suivront en <strong>septembre 2027</strong>. Les devis papier restent legaux si toutes les mentions sont presentes.
        </p>
      </section>

      <RelatedCalculators currentSlug="/verificateur-devis" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
