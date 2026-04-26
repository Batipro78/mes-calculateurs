import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "../components/Breadcrumb";
import { EMBEDS } from "../embed/embeds";

export const metadata: Metadata = {
  alternates: { canonical: "/integrateurs" },
  title: "Integrateurs & blogueurs — Widgets calculateurs gratuits",
  description:
    "Enrichissez vos articles avec un calculateur interactif. 7 widgets pour blogueurs finance, immobilier, sante, RH : iframe gratuite, responsive, sans inscription, charge en lazy.",
  keywords:
    "widget blog, integrer calculateur, widget gratuit blog, partenariat blogueur, widget finance, widget immobilier, widget sante",
  openGraph: {
    title: "Widgets gratuits pour blogueurs — Mes Calculateurs",
    description:
      "Ajoutez un calculateur interactif a votre article en 30 secondes. Gratuit, responsive, sans inscription.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel benefice pour mon blog ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trois benefices mesurables : (1) temps passe sur la page x2 a x3 vs un texte seul, (2) taux de rebond reduit grace a l'interaction, (3) backlinks et partages sociaux car les outils utiles se partagent. C'est aussi un signal qualite pour Google (E-E-A-T : utilite reelle).",
      },
    },
    {
      "@type": "Question",
      name: "Le widget ralentit-il mon site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. L'iframe utilise loading=lazy, donc elle se charge uniquement lorsqu'elle devient visible. Aucun JavaScript n'est injecte sur votre page. Aucun impact sur Core Web Vitals.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il des publicites dans le widget ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Les widgets embarques sont sans publicite, contrairement a la version sur notre site. Vous gardez le controle total de la monetisation de votre page.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je personnaliser l'apparence ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous pouvez ajuster largeur et hauteur. Pour des personnalisations plus avancees (couleurs, branding, white label sans credit), contactez-nous : nous proposons une version premium pour partenaires reguliers.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la contrepartie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un petit lien discret en bas du widget pointe vers mescalculateurs.fr. C'est tout. Pas d'engagement, pas d'inscription, pas de tracking de vos lecteurs.",
      },
    },
  ],
};

const TOP_WIDGETS = EMBEDS.slice(0, 4);

export default function IntegrateursPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumb currentPage="Integrateurs" />

      <div className="mb-10">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-3">
          Pour blogueurs et editeurs
        </span>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-3 leading-tight">
          Enrichissez vos articles avec un calculateur interactif
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          7 widgets gratuits a integrer en 30 secondes via une simple iframe.
          Pour blogs finance, immobilier, sante, RH ou medias generalistes.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="text-3xl mb-3">⏱</div>
          <h3 className="font-bold text-slate-800 mb-1">x2 temps passe</h3>
          <p className="text-sm text-slate-500">
            Un widget interactif augmente le temps median par page de 2 a 3 fois vs un texte
            seul. Signal positif pour Google.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-bold text-slate-800 mb-1">Rebond reduit</h3>
          <p className="text-sm text-slate-500">
            Les lecteurs interagissent avec l&apos;outil au lieu de quitter la page apres
            quelques secondes. Bon pour le SEO et les pubs.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="text-3xl mb-3">🔗</div>
          <h3 className="font-bold text-slate-800 mb-1">Partages naturels</h3>
          <p className="text-sm text-slate-500">
            Les outils utiles se partagent : reseaux sociaux, newsletters, forums.
            Trafic referral durable.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Comment ca marche ?
        </h2>
        <ol className="grid sm:grid-cols-3 gap-6 text-center">
          <li>
            <div className="w-10 h-10 bg-white border-2 border-indigo-300 rounded-full flex items-center justify-center font-bold text-indigo-600 mx-auto mb-3">
              1
            </div>
            <p className="font-semibold text-slate-800 mb-1">Choisissez un widget</p>
            <p className="text-sm text-slate-500">
              Parmi les 7 calculateurs disponibles dans le catalogue.
            </p>
          </li>
          <li>
            <div className="w-10 h-10 bg-white border-2 border-indigo-300 rounded-full flex items-center justify-center font-bold text-indigo-600 mx-auto mb-3">
              2
            </div>
            <p className="font-semibold text-slate-800 mb-1">Copiez l&apos;iframe</p>
            <p className="text-sm text-slate-500">
              Une seule ligne HTML, ajustable en taille.
            </p>
          </li>
          <li>
            <div className="w-10 h-10 bg-white border-2 border-indigo-300 rounded-full flex items-center justify-center font-bold text-indigo-600 mx-auto mb-3">
              3
            </div>
            <p className="font-semibold text-slate-800 mb-1">Collez dans votre article</p>
            <p className="text-sm text-slate-500">
              Compatible WordPress, Ghost, Webflow, Notion, et tout site HTML.
            </p>
          </li>
        </ol>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Les widgets les plus demandes</h2>
        <p className="text-slate-500 mb-6">
          Apercu des 4 plus populaires. Le catalogue complet contient 7 widgets.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {TOP_WIDGETS.map((w) => (
            <Link
              key={w.slug}
              href={`/embed#${w.slug}`}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className={`inline-flex w-12 h-12 bg-gradient-to-br ${w.color} rounded-xl items-center justify-center text-2xl text-white mb-3`}>
                {w.emoji}
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{w.title}</h3>
              <p className="text-sm text-slate-500">{w.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/embed"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Voir le catalogue complet (7 widgets) &rarr;
          </Link>
        </div>
      </div>

      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Cas d&apos;usage par thematique</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Blogs finance / patrimoine</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Salaire brut/net dans un article sur la negociation</li>
              <li>Pret immobilier dans un guide d&apos;achat</li>
              <li>Interets composes dans un article epargne</li>
              <li>Frais de notaire dans une checklist d&apos;achat</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Blogs immobilier</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Pret immo + frais notaire en duo</li>
              <li>TVA pour articles travaux/renovation</li>
              <li>Lien direct vers les pages villes pour le local</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Blogs sante / fitness</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>IMC dans un article sur le poids ideal</li>
              <li>Pourcentage pour calculs nutritionnels</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Medias generalistes / RH</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Salaire brut/net pour articles emploi</li>
              <li>TVA pour articles fiscalite</li>
              <li>Pourcentage : universel, marche partout</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Questions frequentes</h2>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Quel benefice pour mon blog ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Trois benefices mesurables : (1) <strong>temps passe sur la page</strong> x2 a x3
          vs un texte seul, (2) <strong>taux de rebond reduit</strong> grace a
          l&apos;interaction, (3) <strong>backlinks et partages sociaux</strong> car les
          outils utiles se partagent. C&apos;est aussi un signal qualite pour Google
          (E-E-A-T : utilite reelle).
        </p>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Le widget ralentit-il mon site ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Non. L&apos;iframe utilise <code className="bg-slate-100 px-1 rounded">loading=&quot;lazy&quot;</code>,
          donc elle se charge uniquement lorsqu&apos;elle devient visible. Aucun JavaScript
          n&apos;est injecte sur votre page. <strong>Aucun impact sur Core Web Vitals</strong>.
        </p>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Y a-t-il des publicites dans le widget ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Non. Les widgets embarques sont <strong>sans publicite</strong>, contrairement a
          la version sur notre site. Vous gardez le controle total de la monetisation de
          votre page.
        </p>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Puis-je personnaliser l&apos;apparence ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Vous pouvez ajuster largeur et hauteur. Pour des personnalisations plus avancees
          (couleurs, branding, white label sans credit), contactez-nous : nous proposons une
          version premium pour partenaires reguliers.
        </p>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Quelle est la contrepartie ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Un <strong>petit lien discret</strong> en bas du widget pointe vers
          mescalculateurs.fr. C&apos;est tout. Pas d&apos;engagement, pas d&apos;inscription,
          pas de tracking de vos lecteurs.
        </p>
      </section>

      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Vous etes blogueur ou editeur ?</h2>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Pour un partenariat sur mesure (widget personnalise, white label, contenu
          co-cree), contactez-nous directement. On reponse sous 48h.
        </p>
        <a
          href="mailto:contact@mescalculateurs.fr?subject=Partenariat%20widget"
          className="inline-block px-6 py-3 bg-white text-slate-800 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
        >
          Nous contacter
        </a>
      </section>
    </div>
  );
}
