import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/mentions-legales" },
  title: "Mentions legales",
  description: "Mentions legales du site Mes Calculateurs : editeur, hebergeur, responsabilite.",
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
              <strong>Statut :</strong> Micro-entrepreneur
            </li>
            <li>
              <strong>Pays de residence :</strong> France
            </li>
            <li>
              <strong>Email :</strong>{" "}
              <a
                href="mailto:ameur.fethi78@gmail.com"
                className="text-blue-600 hover:underline"
              >
                ameur.fethi78@gmail.com
              </a>
            </li>
            <li>
              <strong>Directeur de la publication :</strong> Fethi Ameur
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
              <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA
              91789, USA
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
            <li>
              <strong>Conformite RGPD :</strong> Vercel est signataire du Data
              Privacy Framework UE-USA et applique les Clauses Contractuelles
              Types pour les transferts de donnees hors Union europeenne.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            3. Propriete intellectuelle
          </h2>
          <p className="text-slate-600 leading-relaxed">
            L&apos;ensemble du contenu de ce site (textes, graphismes, logo,
            structure des outils de calcul) est la propriete exclusive de
            l&apos;editeur, sauf mention contraire. Toute reproduction, meme
            partielle, est interdite sans autorisation prealable. Les widgets
            integrables proposes sur la page{" "}
            <a href="/embed" className="text-blue-600 hover:underline">
              /embed
            </a>{" "}
            sont libres de reutilisation dans le respect des conditions
            indiquees sur cette page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            4. Responsabilite
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Les outils de calcul proposes sur ce site sont fournis a titre
            informatif uniquement. Les resultats <strong>ne constituent en
            aucun cas un conseil financier, fiscal, juridique ou medical</strong>.
            L&apos;editeur ne saurait etre tenu responsable de toute decision
            prise sur la base des resultats obtenus via ces outils.
          </p>
          <p className="text-slate-600 leading-relaxed mt-2">
            Les baremes utilises (cotisations sociales, taux de TVA, plafonds
            de l&apos;impot sur le revenu, etc.) sont des approximations basees
            sur les donnees publiques en vigueur au moment de la mise a jour de
            chaque page. Pour un calcul personnalise et engageant, consultez un
            professionnel competent (comptable, notaire, avocat, medecin, ...).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            5. Donnees personnelles et cookies
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Le site utilise <strong>Google Analytics</strong> pour la mesure
            d&apos;audience et <strong>Google AdSense</strong> pour
            l&apos;affichage de publicites. Ces services peuvent deposer des
            cookies et collecter des donnees (adresse IP, identifiants
            techniques, comportement de navigation) uniquement apres votre
            consentement, exprime via le bandeau de cookies affiche a votre
            premiere visite.
          </p>
          <p className="text-slate-600 leading-relaxed mt-2">
            Pour le detail des donnees collectees, des bases legales, des
            durees de conservation et de vos droits (RGPD), consultez notre{" "}
            <a
              href="/confidentialite"
              className="text-blue-600 hover:underline"
            >
              politique de confidentialite
            </a>
            . Vous pouvez modifier vos choix a tout moment via le lien{" "}
            <strong>&laquo;&nbsp;Gerer les cookies&nbsp;&raquo;</strong> en bas
            de chaque page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            6. Contact
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Pour toute question relative au site, pour exercer vos droits sur
            vos donnees personnelles ou pour signaler un contenu, vous pouvez
            ecrire a :{" "}
            <a
              href="mailto:ameur.fethi78@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ameur.fethi78@gmail.com
            </a>
          </p>
        </section>

        <p className="text-sm text-slate-400 pt-4 border-t border-slate-100">
          Derniere mise a jour : 22 mai 2026
        </p>
      </div>
    </div>
  );
}
