// Encart de mise en relation vers Amatech, l'activite d'electricien de l'editeur
// du site (Mantes-la-Ville 78).
//
// A n'utiliser QUE sur /prix-electricien : c'est son metier reel. Le placer sur
// les pages plombier, macon ou couvreur serait mensonger.
//
// Cible le PARTICULIER qui compare des prix, la ou CTAMonDevisMinute cible
// l'artisan. Les deux encarts coexistent donc sans se marcher dessus.
//
// ⚠️ DIVULGATION OBLIGATOIRE : le site parle en « nous » et sa page /a-propos
// annonce un financement « par la mise en relation avec des professionnels
// partenaires ». L'editeur n'etant pas un partenaire tiers, taire ce lien
// d'interet serait une omission trompeuse (art. L121-3 code de la consommation).
// D'ou la mention explicite « l'auteur de ce site » ci-dessous : ne pas la
// retirer.
//
// ⚠️ PAS DE BORNE DE RECHARGE ICI : cette page repete trois fois qu'une borne
// exige un electricien certifie IRVE, et Amatech n'affiche aucune certification
// IRVE. Ne remettre cette prestation dans l'encart que le jour ou la
// certification est affichee sur electricien-mantes.

// URL provisoire : Amatech est encore sur un sous-domaine vercel.app
// (cf electricien-mantes/src/lib/site.ts, « remplace par ton vrai domaine »).
// A mettre a jour ici le jour de l'achat du nom de domaine.
const AMATECH_URL = "https://electricien-mantes.vercel.app";

export default function CTAElectricienLocal() {
  const url = `${AMATECH_URL}/?utm_source=mescalculateurs&utm_medium=referral&utm_campaign=prix-electricien`;

  return (
    <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-2">
        Vous êtes autour de Mantes-la-Jolie ? Je peux venir voir.
      </h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Ces fourchettes servent à vous situer, pas à remplacer une visite : le prix réel dépend de
        votre installation. Je suis <strong>électricien à Mantes-la-Ville (78)</strong> et je me
        déplace dans un rayon d&apos;environ 35 km — dépannage, mise aux normes, remplacement de
        tableau, rénovation. Je viens voir et je donne un prix ferme avant de commencer.
      </p>
      <a
        href={url}
        target="_blank"
        // `noopener` seul, sans `noreferrer` : la cible est un site de l'auteur,
        // rien a masquer, et le referent permettra de voir ce trafic le jour ou
        // une mesure d'audience sera installee sur Amatech (aujourd'hui : aucune,
        // donc les UTM ci-dessus ne sont lus par personne).
        rel="noopener"
        className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-amber-800"
      >
        Voir mes prestations et me contacter
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
      <p className="mt-3 text-xs text-slate-500">
        Amatech — entreprise de l&apos;auteur de ce site. Ce n&apos;est pas un partenaire tiers ni un
        encart publicitaire payé.
      </p>
    </section>
  );
}
