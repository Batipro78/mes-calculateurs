import type { Metadata } from "next";
import RemboursementMutuelle from "./RemboursementMutuelle";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-remboursement-mutuelle" },
  title: "Calcul Remboursement Mutuelle 2026 - Simulateur Gratuit",
  description:
    "Simulez le remboursement de votre mutuelle sante : Securite Sociale + complementaire. Consultations, dentaire, optique, hospitalisation. Comparatif par niveau de garantie.",
  keywords:
    "calcul remboursement mutuelle, simulateur mutuelle, remboursement securite sociale, reste a charge, complementaire sante 2026, 100% sante, RAC 0, base de remboursement",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Remboursement Mutuelle" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Comment fonctionne le remboursement Securite Sociale + mutuelle ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La Securite Sociale rembourse un pourcentage (60 a 80%) de la base de remboursement (BR), pas du cout reel. La mutuelle complementaire prend en charge tout ou partie du reste, selon le niveau de garantie souscrit (100%, 200%, 300% de la BR). Le reste a charge est ce qui n'est couvert ni par la SS ni par la mutuelle.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que le 100% Sante (RAC 0) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La reforme 100% Sante, entree en vigueur progressivement depuis 2019, permet un reste a charge zero (RAC 0) sur certains soins dentaires (couronnes, bridges, dentiers), optiques (verres et montures) et auditifs (audioprotheses). Il faut pour cela choisir des equipements du panier 100% Sante et avoir un contrat de mutuelle responsable.",
                },
              },
              {
                "@type": "Question",
                name: "Que signifie 200% BR ou 300% BR pour une mutuelle ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Le pourcentage de la Base de Remboursement (BR) indique le plafond de prise en charge totale (SS + mutuelle). Par exemple, 200% BR pour une consultation a 26,50 € de base signifie que la prise en charge totale peut aller jusqu'a 53 €. Au-dela de ce plafond, les depassements d'honoraires restent a votre charge.",
                },
              },
            ],
          }),
        }}
      />
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
              <strong>70%</strong> de la BR (26,50 € generaliste, 30 € specialiste secteur 1).
              Participation forfaitaire de 1 € deduite.
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-xl p-4">
            <p className="font-semibold text-cyan-700 mb-2">Hospitalisation</p>
            <p className="text-sm text-slate-600">
              <strong>80%</strong> de la BR. Forfait hospitalier journalier de 20 € a votre charge
              (sauf exceptions : maternite, ALD).
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-xl p-4">
            <p className="font-semibold text-cyan-700 mb-2">Dentaire &amp; Optique</p>
            <p className="text-sm text-slate-600">
              <strong>60 a 70%</strong> de la BR. Attention, la BR est souvent tres inferieure au cout reel
              (ex : 2,84 € pour une monture).
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-xl p-4">
            <p className="font-semibold text-cyan-700 mb-2">Pharmacie</p>
            <p className="text-sm text-slate-600">
              <strong>15 a 65%</strong> selon le medicament (vignette blanche 65%, bleue 30%, orange 15%).
              Franchise de 0,50 € par boite.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Etape 2 : La mutuelle complementaire</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La mutuelle prend en charge tout ou partie du <strong>ticket moderateur</strong> (part non remboursee par la SS)
          et des eventuels <strong>depassements d&apos;honoraires</strong>. Le niveau de prise en charge est exprime
          en pourcentage de la BR :
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Niveau</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Prise en charge</th>
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Ideal pour</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-cyan-600">100% BR</td>
                <td className="py-2.5 px-2 text-slate-700">Ticket moderateur uniquement</td>
                <td className="py-2.5 px-2 text-slate-500">Personnes en bonne sante, peu de soins</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-blue-600">200% BR</td>
                <td className="py-2.5 px-2 text-slate-700">Ticket moderateur + depassements moderes</td>
                <td className="py-2.5 px-2 text-slate-500">Besoin regulier de specialistes</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 px-2 font-semibold text-indigo-600">300%+ BR</td>
                <td className="py-2.5 px-2 text-slate-700">Couverture large, depassements eleves</td>
                <td className="py-2.5 px-2 text-slate-500">Dentaire/optique importants, famille</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">La reforme 100% Sante (RAC 0)</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Depuis 2021, la reforme <strong>100% Sante</strong> garantit un <strong>reste a charge zero</strong> sur
          un panier de soins en dentaire, optique et audiologie. Pour en beneficier, il faut :
        </p>
        <div className="grid gap-2 sm:grid-cols-3 mb-4">
          {[
            { soin: "Dentaire", detail: "Couronnes ceramiques, bridges, dentiers (panier RAC 0)" },
            { soin: "Optique", detail: "Verres correcteurs + monture jusqu'a 30 € (tous les 2 ans)" },
            { soin: "Audiologie", detail: "Audioprotheses de classe I (tous les 4 ans)" },
          ].map((item) => (
            <div key={item.soin} className="bg-green-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-green-700">{item.soin}</p>
              <p className="text-xs text-green-600">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          Condition : avoir une <strong>mutuelle responsable</strong> (plus de 95% des contrats en France).
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">Conseils pour reduire son reste a charge</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { conseil: "Choisir un medecin traitant", detail: "Evite la majoration du ticket moderateur (30% au lieu de 70%)" },
            { conseil: "Respecter le parcours de soins", detail: "Passer par le generaliste avant le specialiste" },
            { conseil: "Privilegier le secteur 1", detail: "Praticiens sans depassements d'honoraires" },
            { conseil: "Comparer les mutuelles", detail: "Verifier les plafonds poste par poste, pas seulement le prix" },
            { conseil: "Utiliser le 100% Sante", detail: "Pour dentaire, optique et audioprotheses" },
            { conseil: "Demander un devis prealable", detail: "Obligatoire pour le dentaire (devis DCAM)" },
          ].map((item) => (
            <div key={item.conseil} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{item.conseil}</p>
              <p className="text-xs text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-remboursement-mutuelle" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
