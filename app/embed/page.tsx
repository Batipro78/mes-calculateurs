import type { Metadata } from "next";
import Breadcrumb from "../components/Breadcrumb";
import { EMBEDS } from "./embeds";
import EmbedCard from "./EmbedCard";

export const metadata: Metadata = {
  alternates: { canonical: "/embed" },
  title: "Widgets gratuits a integrer — Calculateurs embeddables",
  description:
    "Integrez gratuitement nos calculateurs (IMC, TVA, salaire brut/net, pret immobilier, frais de notaire...) sur votre site via un simple iframe. 7 widgets disponibles.",
  keywords:
    "widget calculateur, embed calculateur, iframe calculateur, widget IMC, widget TVA, widget pret immobilier, integrer calculateur site",
};

export default function EmbedIndexPage() {
  return (
    <div>
      <Breadcrumb currentPage="Widgets a integrer" />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Widgets gratuits a integrer sur votre site
        </h1>
        <p className="text-slate-500 max-w-3xl">
          Ajoutez un calculateur interactif a votre blog, site d&apos;agence ou article en quelques secondes.
          Copiez le code d&apos;integration, collez-le dans votre HTML — aucune inscription, aucun frais.
          Tous nos widgets sont responsive et optimises pour les sites rapides.
        </p>
      </div>

      {/* Utilisation */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Comment ca marche ?</h2>
        <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
          <li>Choisissez un widget dans la liste ci-dessous</li>
          <li>Ajustez la taille si besoin (largeur et hauteur)</li>
          <li>Cliquez sur <strong>&laquo; Copier &raquo;</strong> pour recuperer le code iframe</li>
          <li>Collez le code dans votre article ou page HTML</li>
        </ol>
        <p className="text-xs text-slate-500 mt-4">
          <strong>Licence</strong> : utilisation libre et gratuite, y compris sur sites commerciaux.
          Un lien discret vers mes-calculateurs.vercel.app est inclus par defaut.
        </p>
      </div>

      {/* Gallery */}
      <div className="grid gap-5 md:grid-cols-2">
        {EMBEDS.map((e) => (
          <EmbedCard key={e.slug} embed={e} />
        ))}
      </div>

      {/* FAQ */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Questions frequentes</h2>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Est-ce vraiment gratuit ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Oui, totalement gratuit et sans inscription. Vous pouvez integrer autant de widgets que vous voulez,
          sur autant de sites que vous voulez, y compris commerciaux.
        </p>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Les widgets ralentissent-ils mon site ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Non. L&apos;iframe est charge en <code className="bg-slate-100 px-1 rounded">loading=&quot;lazy&quot;</code>,
          donc seulement lorsqu&apos;il devient visible. Le reste de votre page charge normalement.
        </p>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Puis-je retirer le lien de credit ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Le petit lien en bas du widget est volontaire et doit rester visible. C&apos;est la seule contrepartie
          de la gratuite. Pour une version &laquo; white label &raquo; (sans credit), contactez-nous.
        </p>

        <h3 className="font-bold text-slate-800 mt-4 mb-2">Vous voulez un calculateur qui n&apos;est pas dans la liste ?</h3>
        <p className="text-slate-600 leading-relaxed">
          Nous avons 90+ calculateurs sur le site, mais seulement les plus demandes sont disponibles en widget.
          Si vous avez besoin d&apos;un widget specifique, envoyez-nous un message.
        </p>
      </section>
    </div>
  );
}
