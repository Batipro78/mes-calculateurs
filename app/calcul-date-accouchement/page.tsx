import type { Metadata } from "next";
import CalculateurDPA from "./CalculateurDPA";

export const metadata: Metadata = {
  title:
    "Calcul Date d'Accouchement 2026 - DPA, semaines de grossesse gratuit",
  description:
    "Calculez votre date prevue d'accouchement (DPA) a partir de vos dernieres regles, de la date de conception ou de l'echographie. Semaines d'amenorrhee, trimestre, conge maternite. Gratuit.",
  keywords:
    "calcul date accouchement, date prevue accouchement, DPA, semaines amenorrhee, semaines grossesse, calculer accouchement, grossesse semaine par semaine, conge maternite, date terme grossesse",
};

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <a
          href="/"
          className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
        >
          &larr; Tous les calculateurs
        </a>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🤰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Calcul Date d&apos;Accouchement
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez votre date prevue d&apos;accouchement, vos semaines de
        grossesse et les dates cles de votre suivi.
      </p>

      <CalculateurDPA />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment calculer sa date d&apos;accouchement ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          La date prevue d&apos;accouchement (DPA) est calculee a partir du
          premier jour des dernieres regles en utilisant la <strong>regle de
          Naegele</strong> : on ajoute 280 jours (soit 40 semaines
          d&apos;amenorrhee) a cette date. C&apos;est la methode la plus
          couramment utilisee par les professionnels de sante. Si vous
          connaissez la date de conception, la DPA se situe 266 jours
          (38 semaines) plus tard.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les 3 methodes de calcul
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Dernieres regles (DDR)
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              DDR + 280 jours
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Methode standard, la plus utilisee. Suppose un cycle de 28 jours.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Date de conception
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Conception + 266 jours
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Plus precise si vous connaissez la date exacte (FIV, ovulation
              surveillee).
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              Echographie de datation
            </p>
            <p className="font-mono text-sm text-slate-600 mt-2">
              Mesure embryon → DPA
            </p>
            <p className="text-xs text-slate-400 mt-1">
              La plus precise. Realisee entre 11 et 14 SA. Marge de +/- 3 jours.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Semaines d&apos;amenorrhee (SA) vs semaines de grossesse (SG)
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          En France, les professionnels de sante utilisent les <strong>semaines
          d&apos;amenorrhee (SA)</strong>, comptees a partir du 1er jour des
          dernieres regles. Les <strong>semaines de grossesse (SG)</strong>
          sont comptees a partir de la date de conception, soit environ
          2 semaines de moins. Exemple : 12 SA = 10 SG. La duree normale
          d&apos;une grossesse est de 41 SA (ou 39 SG), soit environ 9 mois.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les trois trimestres de la grossesse
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              1er trimestre (1-13 SA)
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Formation des organes du bebe. Nausees frequentes.
              Premiere echographie vers 12 SA. Declaration de grossesse
              a la CAF et a la securite sociale avant 14 SA.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              2e trimestre (14-27 SA)
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Periode la plus confortable. Premiers mouvements du bebe
              (vers 18-20 SA). Echographie morphologique vers 22 SA.
              Sexe du bebe visible.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm">
              3e trimestre (28-41 SA)
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Prise de poids du bebe. Preparation a l&apos;accouchement.
              3e echographie vers 32 SA. Conge maternite a 35 SA (6 semaines
              avant terme).
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le conge maternite en France
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">Situation</th>
                <th className="pb-2 text-slate-500 font-medium">Avant</th>
                <th className="pb-2 text-slate-500 font-medium">Apres</th>
                <th className="pb-2 text-slate-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">1er ou 2e enfant</td>
                <td className="py-2">6 semaines</td>
                <td className="py-2">10 semaines</td>
                <td className="py-2 font-bold">16 semaines</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">3e enfant et +</td>
                <td className="py-2">8 semaines</td>
                <td className="py-2">18 semaines</td>
                <td className="py-2 font-bold">26 semaines</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold">Jumeaux</td>
                <td className="py-2">12 semaines</td>
                <td className="py-2">22 semaines</td>
                <td className="py-2 font-bold">34 semaines</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Triples et +</td>
                <td className="py-2">24 semaines</td>
                <td className="py-2">22 semaines</td>
                <td className="py-2 font-bold">46 semaines</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les examens obligatoires
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>7 consultations prenatales :</strong> une par mois a
            partir du 1er trimestre, obligatoires pour le suivi de grossesse.
          </li>
          <li>
            <strong>3 echographies recommandees :</strong> datation (11-14 SA),
            morphologique (20-25 SA) et de croissance (30-35 SA).
          </li>
          <li>
            <strong>Prise de sang :</strong> groupe sanguin, serologies
            (toxoplasmose, rubeole, HIV, hepatite B), depistage trisomie 21.
          </li>
          <li>
            <strong>Depistage diabete gestationnel :</strong> entre 24 et
            28 SA (test HGPO).
          </li>
          <li>
            <strong>Preparation a l&apos;accouchement :</strong> 7 seances
            remboursees par la Securite sociale a partir du 7e mois.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Quand le bebe peut-il naitre ?
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          La DPA est une estimation : seulement <strong>5% des bebes</strong>
          naissent exactement a la date prevue. La majorite des naissances
          surviennent entre 38 et 42 SA. Un bebe est considere comme &quot;a
          terme&quot; a partir de 37 SA. Avant 37 SA, on parle de prematurite.
          Au-dela de 41 SA, une surveillance renforcee est mise en place et
          un declenchement est souvent propose a 41 SA + 6 jours.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les demarches administratives
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
          <li>
            <strong>Avant 14 SA :</strong> declaration de grossesse a la CAF
            et a la CPAM (faite par le medecin ou la sage-femme).
          </li>
          <li>
            <strong>Avant le 6e mois :</strong> prevenir votre employeur
            (pas d&apos;obligation legale de date, mais recommande).
          </li>
          <li>
            <strong>7e mois :</strong> choisir votre maternite et vous
            pre-inscrire (surtout dans les grandes villes).
          </li>
          <li>
            <strong>Apres la naissance :</strong> declaration de naissance
            en mairie dans les 5 jours.
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les aides financieres
        </h3>
        <p className="text-slate-600 leading-relaxed">
          En France, la grossesse et la naissance ouvrent droit a plusieurs
          aides : la <strong>prime a la naissance</strong> (1 066,30 EUR,
          versee au 7e mois), l&apos;<strong>allocation de base</strong> de
          la PAJE (184,81 EUR/mois sous conditions de ressources), le
          <strong> complement libre choix du mode de garde</strong> (CMG)
          pour la garde d&apos;enfant, et les <strong>indemnites journalieres
          </strong> pendant le conge maternite (calculees sur la base de
          votre salaire, plafonnees a 100,36 EUR/jour en 2026). Toutes
          ces aides sont a demander aupres de la CAF.
        </p>
      </section>
    </div>
  );
}
