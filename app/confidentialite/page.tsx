import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/confidentialite" },
  title: "Politique de confidentialite",
  description:
    "Politique de confidentialite du site Mes Calculateurs : donnees collectees, cookies, base legale, droits RGPD.",
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
            1. Responsable du traitement
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Le responsable du traitement des donnees personnelles est Fethi
            Ameur, editeur du site <strong>mescalculateurs.fr</strong>.
            Contact :{" "}
            <a
              href="mailto:ameur.fethi78@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ameur.fethi78@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            2. Donnees collectees
          </h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            Le site ne demande aucune inscription ni creation de compte. Les
            calculs sont effectues directement dans votre navigateur et ne
            sont pas transmis a un serveur.
          </p>
          <p className="text-slate-600 leading-relaxed mb-3">
            En revanche, deux services tiers sont utilises et peuvent
            collecter des donnees apres votre consentement :
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>
              <strong>Google Analytics 4</strong> : adresse IP tronquee,
              identifiants de session, pages consultees, source du trafic,
              type d&apos;appareil, navigateur, duree de visite.
            </li>
            <li>
              <strong>Google AdSense</strong> : identifiants publicitaires,
              historique de navigation a des fins de personnalisation des
              publicites, donnees techniques (resolution, langue, fuseau).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            3. Base legale et finalites
          </h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>
              <strong>Consentement</strong> (article 6.1.a RGPD) pour
              l&apos;ensemble des cookies de mesure d&apos;audience et de
              publicite. Aucun cookie tiers n&apos;est depose tant que vous
              n&apos;avez pas valide votre choix dans le bandeau.
            </li>
            <li>
              <strong>Interet legitime</strong> de l&apos;editeur (article
              6.1.f RGPD) pour les seuls logs techniques d&apos;hebergement
              (anti-abus, securite), conserves au maximum 12 mois.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-2">
            Finalites : mesurer l&apos;audience, ameliorer le contenu, financer
            le site gratuit par l&apos;affichage de publicites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            4. Duree de conservation
          </h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>
              <strong>Google Analytics 4</strong> : 14 mois (parametrage par
              defaut Google).
            </li>
            <li>
              <strong>Google AdSense</strong> : jusqu&apos;a 13 mois pour les
              cookies publicitaires, selon politique Google.
            </li>
            <li>
              <strong>Cookie de consentement</strong> :{" "}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">
                mc_cookie_consent_v1
              </code>{" "}
              conserve 13 mois dans votre navigateur (recommandation CNIL).
            </li>
            <li>
              <strong>Logs serveur Vercel</strong> : maximum 12 mois.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            5. Destinataires et transferts hors UE
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Les donnees sont transmises a Google LLC (siege aux Etats-Unis)
            pour les services Analytics et AdSense, et a Vercel Inc. (siege
            aux Etats-Unis) pour l&apos;hebergement. Ces deux entreprises sont{" "}
            <strong>signataires du Data Privacy Framework</strong> UE-USA
            (decision d&apos;adequation de la Commission europeenne du 10
            juillet 2023) et appliquent les Clauses Contractuelles Types pour
            tout transfert eventuel hors de ce cadre.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            6. Vos droits
          </h2>
          <p className="text-slate-600 leading-relaxed mb-2">
            Conformement au Reglement General sur la Protection des Donnees
            (RGPD) et a la loi Informatique et Libertes, vous disposez des
            droits suivants :
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Droit d&apos;acces a vos donnees</li>
            <li>Droit de rectification</li>
            <li>Droit a l&apos;effacement</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit a la limitation du traitement</li>
            <li>Droit a la portabilite</li>
            <li>Droit de retirer votre consentement a tout moment</li>
            <li>
              Droit d&apos;introduire une reclamation aupres de la CNIL
              (Commission Nationale de l&apos;Informatique et des Libertes) :{" "}
              <a
                href="https://www.cnil.fr"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                cnil.fr
              </a>
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-2">
            Pour exercer vos droits, ecrivez a{" "}
            <a
              href="mailto:ameur.fethi78@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ameur.fethi78@gmail.com
            </a>{" "}
            avec preuve d&apos;identite. Reponse sous un mois maximum.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            7. Gestion de votre consentement
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Lors de votre premiere visite, un bandeau vous permet
            d&apos;accepter ou de refuser le depot des cookies de mesure
            d&apos;audience et de publicite. Vous pouvez modifier votre choix
            a tout moment via le lien{" "}
            <strong>&laquo;&nbsp;Gerer les cookies&nbsp;&raquo;</strong> en
            bas de chaque page, ou en effaçant les cookies de votre
            navigateur.
          </p>
          <p className="text-slate-600 leading-relaxed mt-2">
            Tant que vous n&apos;avez pas donne votre consentement, aucun
            cookie de mesure d&apos;audience ni de publicite n&apos;est
            depose (mecanisme Google Consent Mode v2).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            8. Modifications
          </h2>
          <p className="text-slate-600 leading-relaxed">
            La presente politique peut etre mise a jour pour refleter les
            evolutions legales ou techniques du site. La date de derniere
            mise a jour est indiquee ci-dessous.
          </p>
        </section>

        <p className="text-sm text-slate-400 pt-4 border-t border-slate-100">
          Derniere mise a jour : 22 mai 2026
        </p>
      </div>
    </div>
  );
}
