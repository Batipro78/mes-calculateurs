import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/confidentialite" },
  title: "Politique de confidentialite",
  description:
    "Politique de confidentialite du site Mes Calculateurs. Informations sur les cookies et donnees.",
};

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <a
          href="/"
          className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
        >
          &larr; Accueil
        </a>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">
        Politique de confidentialite
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            1. Introduction
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Le site <strong>mescalculateurs.fr</strong> respecte votre
            vie privee. Cette page vous explique quelles donnees sont collectees
            et comment elles sont utilisees.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            2. Donnees collectees
          </h2>
          <p className="text-slate-600 leading-relaxed">
            <strong>Nous ne collectons aucune donnee personnelle.</strong> Aucun
            compte, aucune inscription, aucun formulaire de contact avec
            stockage. Tous les calculs sont effectues localement dans votre
            navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            3. Cookies et services tiers
          </h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            Ce site peut utiliser les services tiers suivants, qui deposent
            leurs propres cookies :
          </p>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="font-semibold text-slate-700">Google Analytics</p>
              <p className="text-sm text-slate-500 mt-1">
                Service d&apos;analyse d&apos;audience fourni par Google. Il
                permet de mesurer le nombre de visiteurs, les pages consultees
                et la provenance du trafic. Les donnees sont anonymisees.
              </p>
              <a
                href="https://policies.google.com/privacy"
                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Politique de confidentialite Google
              </a>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="font-semibold text-slate-700">Google AdSense</p>
              <p className="text-sm text-slate-500 mt-1">
                Service de publicite fourni par Google. Il affiche des annonces
                personnalisees ou non personnalisees en fonction de vos
                preferences. Des cookies peuvent etre utilises pour adapter les
                annonces.
              </p>
              <a
                href="https://policies.google.com/technologies/ads"
                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comment Google utilise les cookies publicitaires
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            4. Vos droits
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Conformement au Reglement General sur la Protection des Donnees
            (RGPD), vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            <li>Droit d&apos;acces a vos donnees</li>
            <li>Droit de rectification</li>
            <li>Droit a l&apos;effacement</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-2">
            Etant donne que nous ne collectons aucune donnee personnelle, ces
            droits s&apos;appliquent principalement aux cookies tiers. Vous
            pouvez a tout moment desactiver les cookies dans les parametres de
            votre navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            5. Desactiver les cookies
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Vous pouvez refuser les cookies en configurant votre navigateur :
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            <li>
              <strong>Chrome :</strong> Parametres &gt; Confidentialite et
              securite &gt; Cookies
            </li>
            <li>
              <strong>Firefox :</strong> Parametres &gt; Vie privee et securite
            </li>
            <li>
              <strong>Safari :</strong> Preferences &gt; Confidentialite
            </li>
            <li>
              <strong>Edge :</strong> Parametres &gt; Cookies et autorisations
              de site
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            6. Contact
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Pour toute question concernant cette politique de confidentialite :{" "}
            <a
              href="mailto:ameur.fethi78@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ameur.fethi78@gmail.com
            </a>
          </p>
        </section>

        <p className="text-sm text-slate-400 pt-4 border-t border-slate-100">
          Derniere mise a jour : mars 2026
        </p>
      </div>
    </div>
  );
}
