import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/mentions-legales" },
  title: "Mentions legales",
  description: "Mentions legales du site Mes Calculateurs.",
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
        Mentions legales
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            1. Editeur du site
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Le site <strong>mescalculateurs.fr</strong> est edite par :
          </p>
          <ul className="text-slate-600 mt-2 space-y-1">
            <li>
              <strong>Nom :</strong> Fethi Ameur
            </li>
            <li>
              <strong>Statut :</strong> Particulier / Auto-entrepreneur
            </li>
            <li>
              <strong>Email :</strong> ameur.fethi78@gmail.com
            </li>
            <li>
              <strong>Pays :</strong> France
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            2. Hebergement
          </h2>
          <ul className="text-slate-600 space-y-1">
            <li>
              <strong>Hebergeur :</strong> Vercel Inc.
            </li>
            <li>
              <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA
              91723, USA
            </li>
            <li>
              <strong>Site :</strong>{" "}
              <a
                href="https://vercel.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            3. Propriete intellectuelle
          </h2>
          <p className="text-slate-600 leading-relaxed">
            L&apos;ensemble du contenu de ce site (textes, graphismes, logo,
            structure) est la propriete exclusive de l&apos;editeur, sauf
            mention contraire. Toute reproduction, meme partielle, est interdite
            sans autorisation prealable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            4. Responsabilite
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Les outils de calcul proposes sur ce site sont fournis a titre
            indicatif uniquement. Les resultats ne constituent en aucun cas un
            conseil financier, fiscal ou juridique. L&apos;editeur ne saurait
            etre tenu responsable de toute decision prise sur la base des
            resultats obtenus via ces outils.
          </p>
          <p className="text-slate-600 leading-relaxed mt-2">
            Les taux utilises (cotisations salariales, TVA, etc.) sont des
            approximations basees sur les donnees publiques en vigueur. Pour un
            calcul exact, consultez un professionnel (comptable, expert-comptable).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            5. Donnees personnelles
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Ce site ne collecte aucune donnee personnelle. Aucun compte
            utilisateur n&apos;est requis. Les calculs sont effectues
            entierement dans votre navigateur, aucune donnee n&apos;est envoyee
            a un serveur.
          </p>
          <p className="text-slate-600 leading-relaxed mt-2">
            Des cookies tiers peuvent etre utilises par les services de
            publicite (Google AdSense) et d&apos;analyse (Google Analytics).
            Pour plus d&apos;informations, consultez notre{" "}
            <a
              href="/confidentialite"
              className="text-blue-600 hover:underline"
            >
              politique de confidentialite
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            6. Cookies
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Ce site utilise des cookies pour le bon fonctionnement des services
            de publicite et d&apos;analyse d&apos;audience. En continuant votre
            navigation sur ce site, vous acceptez l&apos;utilisation de cookies
            conformement a notre{" "}
            <a
              href="/confidentialite"
              className="text-blue-600 hover:underline"
            >
              politique de confidentialite
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            7. Contact
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Pour toute question relative au site, vous pouvez nous contacter par
            email a :{" "}
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
