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
            Pour la mesure d&apos;audience, le site utilise{" "}
            <strong>Vercel Web Analytics</strong>, un outil respectueux de la
            vie privee qui <strong>ne depose aucun cookie</strong> et ne
            collecte aucune donnee personnelle identifiante. Seules des
            statistiques agregees et anonymes sont mesurees (pages consultees,
            pays, type d&apos;appareil, source du trafic).
          </p>
          <p className="text-slate-600 leading-relaxed">
            Si vous remplissez un <strong>formulaire de demande de devis</strong>,
            les informations que vous saisissez (nom, e-mail, telephone,
            description du projet) sont transmises a notre prestataire
            d&apos;envoi d&apos;e-mails ainsi qu&apos;au partenaire
            professionnel concerne par votre demande, dans le seul but d&apos;y
            repondre.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            3. Base legale et finalites
          </h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>
              <strong>Interet legitime</strong> de l&apos;editeur (article
              6.1.f RGPD) pour la mesure d&apos;audience anonyme et sans cookie
              (Vercel Web Analytics) et pour les logs techniques
              d&apos;hebergement (anti-abus, securite).
            </li>
            <li>
              <strong>Consentement</strong> (article 6.1.a RGPD) lorsque vous
              envoyez volontairement un formulaire de demande de devis.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-2">
            Finalites : mesurer l&apos;audience de maniere anonyme, ameliorer le
            contenu et, le cas echeant, mettre en relation avec un partenaire
            professionnel a votre demande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            4. Duree de conservation
          </h2>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>
              <strong>Statistiques d&apos;audience</strong> (Vercel Web
              Analytics) : donnees agregees et anonymes, sans identification
              individuelle.
            </li>
            <li>
              <strong>Donnees de formulaire de devis</strong> : conservees le
              temps necessaire au traitement de votre demande, puis archivees
              ou supprimees.
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
            L&apos;hebergement et la mesure d&apos;audience sont assures par
            Vercel Inc. (siege aux Etats-Unis),{" "}
            <strong>signataire du Data Privacy Framework</strong> UE-USA
            (decision d&apos;adequation de la Commission europeenne du 10
            juillet 2023). Les donnees des formulaires de devis sont traitees
            via Brevo (Sendinblue SAS, societe francaise, donnees hebergees
            dans l&apos;Union europeenne). Des Clauses Contractuelles Types
            s&apos;appliquent pour tout transfert eventuel hors UE.
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
            7. Cookies
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Ce site <strong>ne depose aucun cookie de mesure d&apos;audience
            ni de publicite</strong> sur votre appareil. La mesure
            d&apos;audience (Vercel Web Analytics) fonctionne sans cookie et
            sans donnee personnelle identifiante. Aucun bandeau de
            consentement n&apos;est donc necessaire pour naviguer sur le site.
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
          Derniere mise a jour : 15 juin 2026
        </p>
      </div>
    </div>
  );
}
