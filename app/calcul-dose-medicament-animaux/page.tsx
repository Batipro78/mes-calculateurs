import type { Metadata } from "next";
import CalculDoseMedicamentAnimaux from "./CalculDoseMedicamentAnimaux";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-dose-medicament-animaux" },
  title:
    "Calcul Dose Médicament Chien Chat - Vermifuge Anti-puces par Poids",
  description:
    "Calculez la bonne dose de vermifuge ou anti-puces pour votre chien ou chat selon son poids. Milbemax, Frontline, Bravecto, Stronghold, Drontal, Profender. Dosage vétérinaire officiel, basé sur AMM française.",
  keywords:
    "dose vermifuge chien, dose anti-puces chat, milbemax dosage, frontline poids, bravecto chien, posologie vétérinaire, medicament animal poids, calculateur dose vermifuge",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Dose Médicament Animaux" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Combien de fois vermifuger un chien adulte ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un chien adulte doit être vermifugé tous les 3 mois (4 fois par an). Un chiot doit l'être chaque mois jusqu'à 6 mois, puis tous les 3 mois. Un chien senior (> 7 ans) peut être vermifugé 2 fois par an si pas d'exposition à des risques.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la différence entre vermifuge et anti-puces ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un vermifuge tue les vers internes (vers ronds et plats intestinaux). Un anti-puces (comme Frontline ou Bravecto) tue les puces externes et souvent aussi les tiques. Certains produits (Milbemax) combinent les deux actions. Chaque animal a besoin des deux traitements réguliers.",
                },
              },
              {
                "@type": "Question",
                name: "Peut-on donner Bravecto à un chien < 4.5 kg ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, mais il existe une formule spécifique Bravecto petit chien (112.5 mg) pour 2-4.5 kg. Il ne faut jamais utiliser une dose prévue pour un chien plus lourd. Cet outil vous indique précisément la bonne formule selon le poids.",
                },
              },
              {
                "@type": "Question",
                name: "Frontline vs Bravecto : lequel choisir ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Frontline (fipronil) : effet mensuel, moins cher, OTC (sans ordonnance). Bravecto (fluralaner) : protection 3 mois, plus pratique, nécessite ordonnance vétérinaire. Bravecto est plus puissant pour les tiques résistantes. Le choix dépend de votre animal et de l'avis du vétérinaire.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Dose Médicament Animaux" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          💊
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Dose Médicament Chien & Chat
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez la bonne dose de vermifuge ou anti-puces selon le poids de
        votre animal. Formules vétérinaires officielles, basées sur AMM
        française.
      </p>

      <CalculDoseMedicamentAnimaux />

      {/* ===== TABLEAU VERMIFUGES ===== */}
      <section className="mt-12 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span>🐕 Vermifuges Chien</span>
        </h2>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Médicament
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Marque
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Spectre
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Posologie
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  AMM
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">Milbémycine oxime</td>
                <td className="px-4 py-3">Milbemax</td>
                <td className="px-4 py-3">Vers ronds & plats</td>
                <td className="px-4 py-3">1 comprimé / 3 mois</td>
                <td className="px-4 py-3">Prescription</td>
              </tr>
              <tr className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  Fébantel + Pyrantel + Praziquantel
                </td>
                <td className="px-4 py-3">Drontal Plus</td>
                <td className="px-4 py-3">Vers ronds & plats + Giardia</td>
                <td className="px-4 py-3">1 comprimé / 3 mois</td>
                <td className="px-4 py-3">Prescription</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== TABLEAU ANTI-PUCES CHIEN ===== */}
      <section className="mt-12 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span>🐕 Anti-puces & Tiques Chien</span>
        </h2>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Médicament
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Marque
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Format
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Durée
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  AMM
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">Fipronil</td>
                <td className="px-4 py-3">Frontline</td>
                <td className="px-4 py-3">Puces & tiques</td>
                <td className="px-4 py-3">Spot-on</td>
                <td className="px-4 py-3">1 mois</td>
                <td className="px-4 py-3">OTC</td>
              </tr>
              <tr className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">Fluralaner</td>
                <td className="px-4 py-3">Bravecto</td>
                <td className="px-4 py-3">Puces, tiques & poux</td>
                <td className="px-4 py-3">Comprimé / Spot-on</td>
                <td className="px-4 py-3">3 mois</td>
                <td className="px-4 py-3">Prescription</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== TABLEAU CHAT ===== */}
      <section className="mt-12 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span>🐱 Vermifuges & Anti-puces Chat</span>
        </h2>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Médicament
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Marque
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Spectre
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">
                  Fréquence
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">Milbémycine oxime</td>
                <td className="px-4 py-3">Milbemax Chat</td>
                <td className="px-4 py-3">Vers ronds & plats</td>
                <td className="px-4 py-3">Comprimé</td>
                <td className="px-4 py-3">/ 3 mois</td>
              </tr>
              <tr className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">Selamectine</td>
                <td className="px-4 py-3">Stronghold</td>
                <td className="px-4 py-3">
                  Puces, vers ronds & otodectes
                </td>
                <td className="px-4 py-3">Spot-on</td>
                <td className="px-4 py-3">/ mois</td>
              </tr>
              <tr className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">Emodepsid + Praziquantel</td>
                <td className="px-4 py-3">Profender</td>
                <td className="px-4 py-3">Vers ronds & plats</td>
                <td className="px-4 py-3">Spot-on</td>
                <td className="px-4 py-3">/ 3 mois</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== QUAND VERMIFUGER ===== */}
      <section className="mt-12 mb-12 bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-900 mb-6">
          📅 Calendrier de Vermifugation
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-green-800 mb-3">🐕 Chien</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <strong>Chiot (0-6 mois)</strong> : 1 fois par mois
              </li>
              <li>
                <strong>Chiot (6-12 mois)</strong> : tous les 3 mois
              </li>
              <li>
                <strong>Chien adulte (1-7 ans)</strong> : 4 fois par an
                (trimestres)
              </li>
              <li>
                <strong>Chien senior (> 7 ans)</strong> : 2-4 fois par an
              </li>
              <li>
                <strong>Chienne gestante</strong> : consultation vétérinaire
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-green-800 mb-3">🐱 Chat</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <strong>Chaton (0-6 mois)</strong> : 1 fois par mois
              </li>
              <li>
                <strong>Chat adulte (1-7 ans)</strong> : 2 fois par an
              </li>
              <li>
                <strong>Chat senior (> 7 ans)</strong> : 1-2 fois par an
              </li>
              <li>
                <strong>Chat d&apos;intérieur</strong> : 1 fois par an
                (minimum)
              </li>
              <li>
                <strong>Chattes gestante/allaitante</strong> : consultation vét
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== PRÉCAUTIONS ===== */}
      <section className="mt-12 mb-12 bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">
          ⚠️ Précautions Importantes
        </h2>
        <ul className="space-y-3 text-sm text-gray-800">
          <li className="flex gap-3">
            <span className="font-bold text-amber-600">•</span>
            <span>
              <strong>Gestation & allaitement</strong> : certains vermifuges
              sont contre-indiqués. Consulter le vétérinaire AVANT toute
              administration à une femelle en gestation ou allaitante.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-amber-600">•</span>
            <span>
              <strong>Chiots très jeunes</strong> (< 2-6 semaines) : certaines
              formules ne conviennent pas. Respecter l&apos;âge minimum sur la
              notice.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-amber-600">•</span>
            <span>
              <strong>Races sensibles (Collies, Bergers Australiens)</strong> :
              hypersensibilité à l&apos;ivermectine. Certains vermifuges sont
              contre-indiqués — vérifier avec le vétérinaire.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-amber-600">•</span>
            <span>
              <strong>Allergies connues</strong> : informer le vétérinaire. Des
              réactions cutanées ou digestives sont possibles.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-amber-600">•</span>
            <span>
              <strong>Interactions médicamenteuses</strong> : si l&apos;animal
              prend d&apos;autres médicaments, consulter avant l&apos;administration.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-amber-600">•</span>
            <span>
              <strong>Surdosage</strong> : en cas d&apos;erreur, contact urgence
              vétérinaire. Signes : tremblements, sédation excessive, vomissements.
            </span>
          </li>
        </ul>
      </section>

      {/* ===== SOURCES ===== */}
      <section className="mt-12 mb-12 bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-300 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">📚 Sources & Références</h3>
        <ul className="text-xs text-gray-700 space-y-2">
          <li>
            • <strong>Vidal Vétérinaire</strong> : notices officielles des
            médicaments (https://www.vidal.fr)
          </li>
          <li>
            • <strong>ANSES</strong> : Agence Nationale de Sécurité Sanitaire
            de l&apos;Alimentation (sante-animale)
          </li>
          <li>
            • <strong>AFMPS / Autorité Compétente Belge</strong> : données
            pharmacologiques vétérinaires
          </li>
          <li>
            • <strong>AMM françaises</strong> : autorisations de mise sur le
            marché officielles
          </li>
          <li>
            • <strong>Notices médicament</strong> : documentation patient
            fournie avec chaque boîte
          </li>
        </ul>
      </section>

      <RelatedCalculators currentSlug="/calcul-dose-medicament-animaux" />
    </div>
  );
}
