import type { Metadata } from "next";
import RemboursementMutuelle from "./RemboursementMutuelle";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import SourcesMethodo from "../components/SourcesMethodo";
import HowToJsonLd from "../components/HowToJsonLd";
import Visuel from "../components/Visuel";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-remboursement-mutuelle" },
  title: "Calcul Remboursement Mutuelle 2026 - Simulateur Gratuit",
  description:
    "Simulez le remboursement de votre mutuelle sante : Securite Sociale + complementaire. Consultations, dentaire, optique, pharmacie, kine. Comparatif par niveau de garantie.",
  keywords:
    "calcul remboursement mutuelle, simulateur mutuelle, remboursement securite sociale, reste a charge, complementaire sante 2026, 100% sante, RAC 0, base de remboursement",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment fonctionne le remboursement Securite Sociale + mutuelle ?",
    a: "La Securite Sociale rembourse un pourcentage (60 ou 70 % pour la plupart des soins, 80 % a l'hopital) de la base de remboursement (BR), pas du prix paye. La mutuelle complementaire prend en charge tout ou partie du reste, selon le niveau de garantie souscrit (100 %, 200 %, 300 % de la BR). Le reste a charge est ce qui n'est couvert ni par la SS ni par la mutuelle, dont la participation forfaitaire et les franchises que la mutuelle ne rembourse jamais.",
  },
  {
    q: "Qu'est-ce que le 100% Sante (RAC 0) ?",
    a: "L'offre 100 % Sante est accessible a tous depuis le 1er janvier 2021 pour les assures qui ont une complementaire sante responsable (ou la Complementaire sante solidaire). Elle permet un reste a charge zero (RAC 0) sur un panier de soins : couronnes, bridges et dentiers, lunettes (verres de classe A et monture a 30 € maximum) et aides auditives de classe I. Il faut choisir les equipements de ce panier.",
  },
  {
    q: "Que signifie 200% BR ou 300% BR pour une mutuelle ?",
    a: "Le pourcentage de la Base de Remboursement (BR) indique le plafond de prise en charge totale (Securite Sociale + mutuelle). Par exemple, 200 % BR pour une consultation a 30 € de base signifie que la prise en charge totale peut aller jusqu'a 60 €. Au-dela de ce plafond, les depassements d'honoraires restent a votre charge. La participation forfaitaire de 2 € n'est jamais remboursee par un contrat responsable.",
  },
  {
    q: "Quelle est la difference entre ticket moderateur et reste a charge ?",
    a: "Le ticket moderateur est la part des soins non prise en charge par la Securite Sociale (30 % pour les consultations medicales, d'apres ameli). Le reste a charge (RAC) est ce que vous payez vraiment apres remboursement SS et mutuelle, incluant la participation forfaitaire, les franchises et les depassements d'honoraires non couverts.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Remboursement Mutuelle" />
      <Breadcrumb currentPage="Calcul Remboursement Mutuelle" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏥
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Remboursement Mutuelle 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulez vos remboursements Securite Sociale + complementaire sante. Comparez les niveaux de garantie.
      </p>

      <RemboursementMutuelle />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment fonctionne le remboursement sante en France ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          En France, le systeme de remboursement des soins repose sur <strong>deux etages</strong> :
          la <strong>Securite Sociale</strong> (regime obligatoire) et la <strong>mutuelle complementaire</strong> (facultative mais quasi-indispensable).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Etape 1 : La Securite Sociale</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          L&apos;Assurance Maladie rembourse un <strong>pourcentage de la base de remboursement</strong> (BR),
          aussi appelee tarif de convention. Ce taux varie selon le type de soin :
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <div className="bg-cyan-50/50 rounded-xl p-4">
            <p className="font-semibold text-cyan-700 mb-2">Consultations</p>
            <p className="text-sm text-slate-600">
              <strong>70%</strong> de la BR (30 € generaliste, 31,50 € pour un specialiste consulte sur avis du medecin traitant en secteur 1, hors cas particuliers).
              Participation forfaitaire de 2 € deduite.
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-xl p-4">
            <p className="font-semibold text-cyan-700 mb-2">Hospitalisation</p>
            <p className="text-sm text-slate-600">
              <strong>80%</strong> de la BR. Forfait hospitalier de 23 € par jour depuis le 1er mars 2026
              (17 € en psychiatrie), non rembourse par la Securite Sociale mais pris en charge par un contrat responsable. Des exonerations existent.
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-xl p-4">
            <p className="font-semibold text-cyan-700 mb-2">Dentaire &amp; Optique</p>
            <p className="text-sm text-slate-600">
              <strong>60%</strong> de la BR (couronne : base de 120 €, monture : base de 2,84 €).
              Attention, la BR est souvent tres inferieure au prix reel.
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-xl p-4">
            <p className="font-semibold text-cyan-700 mb-2">Pharmacie</p>
            <p className="text-sm text-slate-600">
              <strong>15 a 100%</strong> selon le medicament (65 % pour la plupart, 30 % pour un service medical rendu modere, 15 % pour un service faible).
              Franchise de 1 € par boite.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Etape 2 : La mutuelle complementaire</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La mutuelle prend en charge tout ou partie du <strong>ticket moderateur</strong> (part non remboursee par la SS)
          et des eventuels <strong>depassements d&apos;honoraires</strong>. Le niveau de prise en charge est exprime
          en pourcentage de la BR, <strong>Securite Sociale comprise</strong> : avec 200 % BR, la Securite Sociale
          et la mutuelle remboursent ensemble jusqu&apos;a 2 fois la base.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Niveau</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prise en charge</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Total remboursable (base de 30 €)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-cyan-600">100% BR</td>
                <td className="py-2.5 px-2 text-slate-700">Le ticket moderateur (la part que la Securite Sociale ne rembourse pas)</td>
                <td className="py-2.5 px-2 text-slate-500">30 € : aucun depassement couvert</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-blue-600">200% BR</td>
                <td className="py-2.5 px-2 text-slate-700">Le ticket moderateur + une partie des depassements</td>
                <td className="py-2.5 px-2 text-slate-500">60 € au maximum, Securite Sociale comprise</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-indigo-600">300% BR</td>
                <td className="py-2.5 px-2 text-slate-700">Le ticket moderateur + une plus grande partie des depassements</td>
                <td className="py-2.5 px-2 text-slate-500">90 € au maximum, Securite Sociale comprise</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Visuel
          fichier="mutuelle-100-200-300-br-meme-acte"
          alt="Pour une consultation de spécialiste, sur avis du médecin traitant, à 80 € (base de remboursement 31,50 €), la Sécurité sociale paie 20,05 € ; une mutuelle à 100 % de la base paie 9,45 € et il reste 50,50 € à payer, à 200 % elle paie 40,95 € et il reste 19 €, à 300 % elle paie 57,95 € et il reste 2 €"
          legende="Calcul du simulateur pour une consultation a 80 € chez un specialiste de secteur 2 adherent a l'Optam (consulte sur avis du medecin traitant, base 31,50 €, Securite Sociale 70 % moins 2 € de participation forfaitaire). Les garanties 100 %, 200 % et 300 % sont des niveaux types, pas un contrat precis."
          className="mt-6"
        />
        <p className="text-sm text-slate-600 mt-4 mb-4 leading-relaxed">
          Pour comprendre la base de remboursement, les depassements d&apos;honoraires et ce que la mutuelle ne rembourse
          jamais, lisez{" "}
          <a href="/remboursement-mutuelle-comment-ca-marche" className="text-blue-600 hover:underline font-medium">
            Remboursement mutuelle : comment ca marche
          </a>
          .
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La reforme 100% Sante (RAC 0)</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis le 1er janvier 2021, l&apos;offre <strong>100% Sante</strong> garantit un <strong>reste a charge zero</strong> sur
          un panier de soins en dentaire, optique et audiologie. Pour en beneficier, il faut :
        </p>
        <div className="grid gap-2 sm:grid-cols-3 mb-4">
          {[
            { soin: "Dentaire", detail: "Couronnes ceramiques, bridges, dentiers (panier RAC 0)" },
            { soin: "Optique", detail: "Verres de classe A + monture jusqu'a 30 € (renouvellement tous les 2 ans des 16 ans)" },
            { soin: "Audiologie", detail: "Aides auditives de classe I, prix plafonne a 950 € par oreille (renouvellement apres 4 ans)" },
          ].map((item) => (
            <div key={item.soin} className="bg-green-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-green-700">{item.soin}</p>
              <p className="text-xs text-green-600">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          Condition : avoir une <strong>mutuelle responsable</strong> (pres de 95 % des contrats du marche, selon la Securite sociale) ou la Complementaire sante solidaire.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Conseils pour reduire son reste a charge</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { conseil: "Choisir un medecin traitant", detail: "Hors parcours de soins, vous etes moins bien rembourse par l'Assurance Maladie" },
            { conseil: "Respecter le parcours de soins", detail: "Passer par le generaliste avant le specialiste" },
            { conseil: "Privilegier le secteur 1", detail: "Praticiens sans depassements d'honoraires" },
            { conseil: "Comparer les mutuelles", detail: "Verifier les garanties poste par poste, en pourcentage de la BR ou en euros" },
            { conseil: "Utiliser le 100% Sante", detail: "Pour dentaire, optique et audioprotheses" },
            { conseil: "Demander un devis prealable", detail: "Pour une prothese dentaire, le dentiste etablit un devis a transmettre a votre mutuelle" },
          ].map((item) => (
            <div key={item.conseil} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.conseil}</p>
              <p className="text-xs text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <HowToJsonLd
        name="Calculer le remboursement mutuelle et le reste à charge"
        steps={[
          { name: "Saisir le type de soin et le tarif pratique", text: "Sélectionner le type de soin (consultation generaliste, specialiste, dentaire, optique, pharmacie, kine, imagerie) et entrer le montant facture par le praticien." },
          { name: "Identifier le remboursement Sécurité Sociale", text: "La SS rembourse 70 % de la base de remboursement (BR) pour une consultation (BR generaliste secteur 1 = 30 EUR). Pour l'hospitalisation : 80 % de la BR. Participation forfaitaire de 2 EUR deduite par consultation chez un medecin." },
          { name: "Appliquer la garantie mutuelle", text: "La mutuelle couvre le ticket modérateur et une part des depassements selon le niveau souscrit : 100 % BR (ticket moderateur seul), 200 % BR ou 300 % BR (Securite sociale comprise). Elle ne rembourse jamais la participation forfaitaire de 2 EUR ni les franchises." },
          { name: "Lire le reste à charge", text: "Reste à charge = tarif pratique - part SS - part mutuelle (participation forfaitaire et franchises comprises). Pour les soins du panier 100 % Santé (couronnes RAC 0, verres de classe A, aides auditives de classe I), le reste à charge est nul avec une mutuelle responsable." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      <SourcesMethodo
        methode={`Le remboursement se decompose en base de remboursement (BR), part Securite sociale (RO), part mutuelle (RC selon le contrat) et reste a charge. Le simulateur estime ces postes a partir des taux et des bases de l'Assurance maladie en vigueur en octobre 2026 (taux general, medecin de secteur 1 ou adherent a l'Optam, dans le parcours de soins) et d'une garantie exprimee en pourcentage de la BR, Securite sociale comprise. La participation forfaitaire (2 € par consultation ou examen d'imagerie) et la franchise (1 € par boite ou par acte paramedical) sont retenues par la Securite sociale et jamais remboursees par la mutuelle. Les cas particuliers (ALD, maternite, Alsace-Moselle, Complementaire sante solidaire, hospitalisation, implants dentaires, garanties en euros) ne sont pas calcules.`}
        sources={[
          { label: "Ameli.fr - Tableaux recapitulatifs des taux de remboursement", url: "https://www.ameli.fr/assure/remboursements/rembourse/tableau-recapitulatif-taux-remboursement" },
          { label: "Ameli.fr - La participation forfaitaire de 2 €", url: "https://www.ameli.fr/assure/remboursements/reste-charge/participation-forfaitaire-2-euros" },
          { label: "Ameli.fr - La franchise medicale", url: "https://www.ameli.fr/assure/remboursements/reste-charge/franchise-medicale" },
          { label: "Service-Public.fr - Couverture maladie complementaire (mutuelle)", url: "https://www.service-public.fr/particuliers/vosdroits/F20314" },
        ]}
      />

      <RelatedCalculators currentSlug="/calcul-remboursement-mutuelle" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
