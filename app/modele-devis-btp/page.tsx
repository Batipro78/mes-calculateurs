import type { Metadata } from "next";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import Faq, { FaqItem } from "../components/Faq";
import CTAMonDevisMinute from "../components/CTAMonDevisMinute";
import { SITE_LAST_UPDATED } from "../lib/site-meta";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/modele-devis-btp" },
  title: "Modele de Devis BTP Gratuit 2026 - Exemple + Guide de Redaction",
  description:
    "Modele de devis batiment gratuit a copier + guide complet pour bien le rediger en 2026 : mentions obligatoires, TVA (20/10/5,5%), acompte, etapes. Pour artisans.",
  keywords:
    "modele devis btp, modele devis artisan, exemple devis batiment, faire un devis artisan, comment faire un devis, modele devis gratuit, devis auto-entrepreneur batiment",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment faire un devis quand on est auto-entrepreneur du batiment ?",
    a: "Le devis d'un auto-entrepreneur comporte les memes mentions qu'une entreprise classique (identite, SIRET, description, prix, validite), avec deux specificites : la mention \"TVA non applicable, article 293 B du CGI\" tant que vous n'avez pas depasse les seuils de franchise, et l'assurance decennale obligatoire si vous faites des travaux de batiment. Vous affichez alors des prix nets, sans ligne de TVA.",
  },
  {
    q: "Un devis est-il obligatoire pour des travaux ?",
    a: "Le devis est obligatoire pour tous les travaux de batiment et de depannage (plomberie, electricite, serrurerie...) des que le montant estime depasse 150 € TTC, et systematiquement si le client le demande. Au-dela, meme en dessous de ce seuil, etablir un devis ecrit reste vivement conseille : il protege l'artisan comme le client en cas de litige.",
  },
  {
    q: "Quelle est la duree de validite d'un devis ?",
    a: "La duree de validite est libre, mais elle doit etre clairement indiquee sur le devis. Dans le batiment, on retient le plus souvent 1 a 3 mois. Passe ce delai, vous n'etes plus engage sur les prix annonces : c'est une protection essentielle quand le cout des materiaux varie.",
  },
  {
    q: "Peut-on facturer l'etablissement d'un devis ?",
    a: "Un devis est gratuit par principe. Vous pouvez toutefois facturer son etablissement s'il demande un deplacement, un metre ou une etude technique poussee (devis complexe), a condition d'en informer le client AVANT et de l'indiquer noir sur blanc. Si le chantier est signe, ces frais sont generalement deduits de la facture finale.",
  },
  {
    q: "Quelle difference entre un devis et une facture ?",
    a: "Le devis est une proposition commerciale etablie AVANT les travaux : il engage sur un prix et doit etre accepte et signe par le client. La facture est emise APRES (ou pendant) les travaux : elle constate la prestation realisee et declenche le paiement. Un devis signe peut etre converti en facture sans tout ressaisir.",
  },
];

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Modele de devis BTP gratuit 2026 + guide de redaction",
    description:
      "Modele de devis batiment a copier et guide complet pour bien rediger un devis d'artisan en 2026.",
    author: { "@type": "Organization", name: "Mes Calculateurs" },
    publisher: {
      "@type": "Organization",
      name: "Mes Calculateurs",
      url: "https://mescalculateurs.fr",
    },
    mainEntityOfPage: "https://mescalculateurs.fr/modele-devis-btp",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumb currentPage="Modele de Devis BTP" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🧾
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Modele de Devis BTP Gratuit 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Un exemple de devis batiment pret a copier + le guide complet pour bien
        le rediger : mentions obligatoires, TVA, acompte et erreurs a eviter.
      </p>

      {/* INTRO ARTICLE */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pourquoi le devis est l&apos;outil commercial n°1 de l&apos;artisan
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Dans le batiment, le devis n&apos;est pas une simple formalite : c&apos;est
          souvent le premier document professionnel que le client a entre les
          mains, et c&apos;est sur lui qu&apos;il vous compare aux autres
          entreprises. Un devis clair, detaille et envoye rapidement inspire
          confiance et remporte le chantier ; un devis flou, en retard ou
          incomplet fait douter, meme quand le prix est juste. Apprendre a bien
          rediger un devis, c&apos;est donc autant une question commerciale que
          legale.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un devis bien fait vous protege aussi. Une fois signe par le client avec
          la mention « bon pour accord », il devient un contrat : il fixe le prix,
          le perimetre des travaux et les conditions de paiement. En cas de litige
          sur ce qui etait prevu ou non, c&apos;est ce document qui fait foi. A
          l&apos;inverse, un travail commence sans devis signe vous expose a des
          contestations et complique serieusement le recouvrement de vos factures.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Enfin, le devis est le point de depart de toute votre gestion : une fois
          accepte, il se transforme en facture sans tout ressaisir, alimente votre
          suivi de chantier et votre tresorerie. C&apos;est pourquoi de plus en
          plus d&apos;artisans abandonnent le devis manuel sur traitement de texte
          au profit d&apos;un outil dedie. Dans la suite, vous trouverez un modele
          pret a copier, puis le guide complet pour le remplir correctement :
          mentions obligatoires, taux de TVA, acompte et erreurs a eviter.
        </p>
      </section>

      {/* MODELE PRET A L'EMPLOI */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Modele de devis a copier
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Voici la structure complete d&apos;un devis conforme. Remplacez le
          texte entre crochets par vos informations. Chaque bloc correspond a une
          mention attendue par la loi.
        </p>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="font-bold text-slate-800">[Nom de l&apos;entreprise]</p>
              <p>[Adresse complete]</p>
              <p>SIRET : [14 chiffres] — [Forme juridique : EI, SARL...]</p>
              <p>Tel : [telephone] — Email : [email]</p>
              <p>Assurance decennale : [assureur] — police n° [numero]</p>
            </div>
            <div className="sm:text-right">
              <p className="font-bold text-slate-800">DEVIS n° [2026-001]</p>
              <p>Date : [JJ/MM/AAAA]</p>
              <p>Valable jusqu&apos;au : [date + 1 a 3 mois]</p>
            </div>
          </div>

          <div className="border-b border-slate-200 pb-4">
            <p className="font-semibold text-slate-800">Client</p>
            <p>[Nom et prenom du client]</p>
            <p>[Adresse du chantier]</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs uppercase text-slate-500 border-b border-slate-300">
                  <th className="py-2 pr-2">Designation</th>
                  <th className="py-2 px-2 text-right">Qte</th>
                  <th className="py-2 px-2 text-right">PU HT</th>
                  <th className="py-2 px-2 text-right">TVA</th>
                  <th className="py-2 pl-2 text-right">Total HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-2">[Prestation 1 — ex : pose de prises]</td>
                  <td className="py-2 px-2 text-right">[5]</td>
                  <td className="py-2 px-2 text-right">[90 €]</td>
                  <td className="py-2 px-2 text-right">[10 %]</td>
                  <td className="py-2 pl-2 text-right">[450 €]</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-2">[Prestation 2 — ex : fournitures]</td>
                  <td className="py-2 px-2 text-right">[1]</td>
                  <td className="py-2 px-2 text-right">[120 €]</td>
                  <td className="py-2 px-2 text-right">[10 %]</td>
                  <td className="py-2 pl-2 text-right">[120 €]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-end gap-1 border-t border-slate-300 pt-4">
            <p>Total HT : [570 €]</p>
            <p>TVA (10 %) : [57 €]</p>
            <p className="font-bold text-slate-800">Total TTC : [627 €]</p>
            <p className="text-xs text-slate-500">
              Acompte demande a la commande : [30 %, soit 188,10 €]
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 space-y-1">
            <p>Conditions de paiement : [acompte 30 % a la signature, solde a la fin des travaux].</p>
            <p>Date de debut estimee : [JJ/MM/AAAA] — Duree estimee : [X jours].</p>
            <p>Gestion des dechets : [point de collecte / dechetterie utilisee].</p>
            <p>
              Mention a recopier par le client : « Devis recu avant execution des
              travaux, bon pour accord » + date + signature.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          Besoin de verifier qu&apos;un devis est complet ? Utilisez notre{" "}
          <a href="/verificateur-devis" className="text-blue-600 underline hover:text-blue-800">
            verificateur de devis (16 mentions obligatoires)
          </a>
          .
        </p>
      </section>

      {/* CTA MonDevisMinute */}
      <CTAMonDevisMinute campaign="modele-devis-btp" variant="devis" guide={{ href: "/guides/mentions-obligatoires-devis-batiment", label: "Les mentions obligatoires du devis bâtiment" }} />

      {/* GUIDE : ETAPES */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Comment rediger un devis BTP, etape par etape
        </h2>
        <ol className="space-y-4">
          {[
            {
              t: "1. En-tete et identite",
              d: "Indiquez le nom de votre entreprise, l'adresse, le SIRET, la forme juridique, vos coordonnees et votre assurance decennale. Ajoutez un numero de devis unique et la date.",
            },
            {
              t: "2. Identite du client et du chantier",
              d: "Nom, prenom et adresse du client, ainsi que l'adresse du chantier si elle differe. C'est ce qui rend le devis nominatif et opposable.",
            },
            {
              t: "3. Description detaillee des prestations",
              d: "Le point qui fait gagner ou perdre un chantier : decrivez chaque poste precisement (nature, quantite, unite). Un devis flou inquiete le client ; un devis detaille rassure et limite les litiges.",
            },
            {
              t: "4. Prix unitaires HT et quantites",
              d: "Pour chaque ligne : quantite, prix unitaire HT et total. Separez main-d'oeuvre et fournitures quand c'est pertinent, cela facilite la comprehension.",
            },
            {
              t: "5. TVA et totaux",
              d: "Appliquez le bon taux de TVA (voir plus bas), affichez le total HT, le montant de TVA et le total TTC. Un auto-entrepreneur en franchise affiche un prix net + la mention legale.",
            },
            {
              t: "6. Conditions : validite, acompte, delais",
              d: "Duree de validite (1 a 3 mois), acompte demande, echeancier de paiement, date de debut et duree estimee des travaux.",
            },
            {
              t: "7. Mentions legales et signature",
              d: "Assurance decennale, gestion des dechets, puis l'espace pour la mention manuscrite du client \"Bon pour accord\" datee et signee. Sans signature, pas d'engagement.",
            },
          ].map((s) => (
            <li key={s.t} className="flex gap-3">
              <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">{s.t}</p>
                <p className="text-slate-600 leading-relaxed">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* GUIDE : TVA */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Quelle TVA appliquer sur un devis dans le batiment ?
        </h2>
        <p className="text-slate-600 mb-5 leading-relaxed">
          Le taux de TVA depend de la nature des travaux et de l&apos;anciennete
          du logement. Appliquer le mauvais taux est l&apos;une des erreurs les
          plus frequentes — et c&apos;est l&apos;artisan qui en repond.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">20 % — taux normal</p>
            <p className="text-sm text-slate-600">
              Construction neuve, travaux sur un logement de moins de 2 ans,
              amenagement exterieur et la plupart des prestations hors renovation.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">10 % — taux intermediaire</p>
            <p className="text-sm text-slate-600">
              Travaux d&apos;amelioration, de transformation ou d&apos;entretien
              d&apos;un logement acheve depuis plus de 2 ans. Le cas le plus
              courant en renovation.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">5,5 % — taux reduit</p>
            <p className="text-sm text-slate-600">
              Travaux de renovation energetique (isolation, pompe a chaleur,
              chaudiere performante...) dans un logement de plus de 2 ans, sous
              conditions.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4 leading-relaxed">
          Pour les taux reduits (10 % et 5,5 %), le client doit signer une
          attestation de TVA. Verifiez toujours les conditions a jour sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            service-public.fr
          </a>
          . Besoin de calculer un montant ? Utilisez notre{" "}
          <a href="/calcul-tva" className="text-blue-600 underline hover:text-blue-800">
            calculateur de TVA
          </a>
          .
        </p>
      </section>

      {/* GUIDE : ACOMPTE + DEVIS VS FACTURE + MENTIONS */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Acompte, mentions legales et facture : les regles a connaitre
        </h2>

        <h3 className="font-bold text-slate-800 mt-2 mb-2">
          Quel acompte demander ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Aucun montant n&apos;est impose par la loi, mais l&apos;usage dans le
          batiment est un acompte de <strong>30 %</strong> a la signature, parfois
          un paiement intermediaire en cours de chantier, puis le solde a la
          reception. L&apos;acompte securise votre tresorerie et engage le client.
          Il doit figurer noir sur blanc dans les conditions de paiement.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Les mentions obligatoires, en bref
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un devis BTP doit comporter une serie de mentions obligatoires
          (identite, SIRET, description, prix HT/TTC, TVA, validite, assurance
          decennale, gestion des dechets, signature...). Leur absence expose a une
          amende et fragilise en cas de litige. Le detail complet et la
          verification automatique de votre document sont sur notre page dediee :{" "}
          <a href="/verificateur-devis" className="text-blue-600 underline hover:text-blue-800">
            verificateur de devis — 16 mentions obligatoires
          </a>
          .
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Du devis a la facture
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Une fois le devis signe, il devient la base de votre facture : memes
          lignes, memes prix. Inutile de tout ressaisir — un bon outil convertit
          le devis accepte en facture en un clic et conserve l&apos;historique.
          Pensez aussi a la <strong>facturation electronique</strong> qui se
          generalise entre 2026 et 2027.
        </p>
      </section>

      {/* GUIDE : ERREURS TERRAIN */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Les erreurs qui font perdre des chantiers
        </h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex gap-3">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span>
              <strong>Un devis trop vague.</strong> « Renovation electrique : 4 500 € »
              fait fuir. Detaillez chaque poste : le client paie ce qu&apos;il comprend.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span>
              <strong>Repondre trop tard.</strong> Le premier devis serieux recu
              remporte souvent le chantier. La rapidite est un argument commercial.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span>
              <strong>Oublier la duree de validite.</strong> Sans elle, vous restez
              engage sur vos prix meme si le cout des materiaux explose.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span>
              <strong>Se tromper de taux de TVA.</strong> En cas de controle,
              c&apos;est l&apos;artisan qui regularise la difference.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span>
              <strong>Ne pas faire signer.</strong> Un devis non signe n&apos;engage
              personne : pas de « bon pour accord », pas de recours.
            </span>
          </li>
        </ul>
      </section>

      {/* ARTICLE : BIEN CHIFFRER + AUTO-ENTREPRENEUR */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Bien chiffrer son devis pour ne pas travailler a perte
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La premiere cause de difficulte chez les artisans n&apos;est pas le
          manque de chantiers, mais des devis mal chiffres. Pour fixer un prix
          juste, partez toujours de votre <strong>cout de revient reel</strong> :
          le temps de main-d&apos;oeuvre (heures x taux horaire charge), le cout
          des fournitures, mais aussi les frais souvent oublies — deplacements,
          materiel, assurance, gestion administrative, et la part de votre temps
          passe a etablir les devis eux-memes. Ce n&apos;est qu&apos;ensuite que
          vous appliquez votre marge.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Un tarif horaire qui « parait » correct peut vous faire travailler a
          perte si vous oubliez ces charges. Detaillez chaque poste dans le devis :
          non seulement c&apos;est plus rentable, mais un client comprend et
          accepte bien mieux un prix decompose qu&apos;un montant global. Pensez
          aussi a prevoir une ligne pour les imprevus sur les chantiers de
          renovation, ou les surprises sont frequentes une fois les travaux
          commences.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          Le cas de l&apos;auto-entrepreneur du batiment
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Si vous etes auto-entrepreneur (micro-entreprise), votre devis suit les
          memes regles, avec quelques particularites. Tant que vous restez sous les
          seuils de la franchise en base, vous ne facturez pas la TVA : vos prix
          sont nets et vous ajoutez la mention <strong>« TVA non applicable,
          article 293 B du CGI »</strong>. Attention, des que vous depassez le
          seuil, vous devez facturer la TVA — anticipez ce basculement pour ne pas
          devoir l&apos;absorber sur vos marges.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Autre point essentiel : pour les travaux de batiment,
          l&apos;<strong>assurance decennale est obligatoire</strong>, y compris
          en micro-entreprise, et son numero doit figurer sur le devis. Verifiez
          enfin votre <a href="/simulateur-micro-entreprise" className="text-blue-600 underline hover:text-blue-800">simulation de charges micro-entreprise</a>{" "}
          pour fixer des prix qui tiennent compte de vos cotisations.
        </p>
      </section>

      <HowToJsonLd
        name="Rediger un devis BTP conforme"
        steps={[
          { name: "Renseigner l'en-tete et l'identite", text: "Inscrire le nom de l'entreprise, l'adresse, le SIRET, la forme juridique et le numéro de la police d'assurance decennale. Ajouter un numéro de devis unique (ex : 2026-001) et la date d'etablissement." },
          { name: "Decrire les prestations ligne par ligne", text: "Pour chaque poste, indiquer la designation précise, la quantité, le prix unitaire HT et le taux de TVA : 20 % en neuf, 10 % en rénovation d'un logement de plus de 2 ans, 5,5 % en rénovation energetique." },
          { name: "Calculer les totaux et l'acompte", text: "Additionner les lignes pour le total HT, calculer la TVA par taux puis en déduire le total TTC. Préciser l'acompte demande à la signature (usage : 30 % du total TTC). Ex : 570 EUR HT + TVA 10 % = 627 EUR TTC, acompte 30 % = 188 EUR." },
          { name: "Recueillir la signature du client", text: "Prevoir un espace pour la mention manuscrite 'Bon pour accord' avec date et signature. Sans cette signature, le devis n'engage personne et ne constitue pas un contrat opposable en cas de litige." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />

      {/* CTA final */}
      <CTAMonDevisMinute campaign="modele-devis-btp-bas" variant="devis" />

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-800 mb-2">
          Methode et sources
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Ce modele et ce guide sont fournis a titre informatif et ne remplacent
          pas un conseil juridique. Regles relatives aux devis, mentions
          obligatoires et taux de TVA sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            service-public.fr
          </a>
          {" "}et{" "}
          <a
            href="https://entreprendre.service-public.fr"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:underline"
          >
            entreprendre.service-public.fr
          </a>
          . Mis a jour : {SITE_LAST_UPDATED}.
        </p>
      </section>

      <RelatedCalculators currentSlug="/modele-devis-btp" />
    </div>
  );
}
