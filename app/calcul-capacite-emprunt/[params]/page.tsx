import type { Metadata } from "next";
import { calcCapaciteEmprunt, calcComparatifDurees, TAUX_MOYENS, DUREES, TAUX_ASSURANCE_DEFAUT } from "../empruntCalc";
import RelatedCalculators from "../../components/RelatedCalculators";

const REVENUS_SEO = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000];
const DUREES_SEO = [15, 20, 25];

interface Props {
  params: Promise<{ params: string }>;
}

function parseSlug(slug: string) {
  const match = slug.match(/^(\d+)-euros-(\d+)-ans$/);
  if (!match) return null;
  const revenu = parseInt(match[1]);
  const duree = parseInt(match[2]);
  if (!REVENUS_SEO.includes(revenu) || !DUREES_SEO.includes(duree)) return null;
  return { revenu, duree };
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR");
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const r of REVENUS_SEO) {
    for (const d of DUREES_SEO) {
      params.push({ params: `${r}-euros-${d}-ans` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Capacite d'emprunt" };

  const { revenu, duree } = parsed;
  const taux = TAUX_MOYENS[duree] || 3.35;
  const res = calcCapaciteEmprunt(revenu, 0, 0, 0, duree, taux, TAUX_ASSURANCE_DEFAUT);

  return {
    title: `Capacite d'emprunt avec ${fmt(revenu)} € de revenus sur ${duree} ans - Simulation 2026`,
    description: `Avec ${fmt(revenu)} € de revenus mensuels, vous pouvez emprunter jusqu'a ${fmt(res.capitalMax)} € sur ${duree} ans (taux ${taux}%). Mensualite max : ${fmt(res.mensualiteMax)} €. Calcul gratuit selon les regles HCSF 2026.`,
  };
}

export default async function Page({ params }: Props) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Parametres invalides.</p>
        <a href="/calcul-capacite-emprunt" className="text-blue-600 hover:underline mt-2 inline-block">
          Retour au simulateur
        </a>
      </div>
    );
  }

  const { revenu, duree } = parsed;
  const taux = TAUX_MOYENS[duree] || 3.35;
  const res = calcCapaciteEmprunt(revenu, 0, 0, 0, duree, taux, TAUX_ASSURANCE_DEFAUT);
  const comparatif = calcComparatifDurees(revenu, 0, 0, 0, TAUX_ASSURANCE_DEFAUT);

  // Avec co-emprunteur (meme revenu)
  const resCouple = calcCapaciteEmprunt(revenu, revenu, 0, 0, duree, taux, TAUX_ASSURANCE_DEFAUT);

  // Avec apport 20 000 et 50 000
  const resApport20k = calcCapaciteEmprunt(revenu, 0, 0, 20000, duree, taux, TAUX_ASSURANCE_DEFAUT);
  const resApport50k = calcCapaciteEmprunt(revenu, 0, 0, 50000, duree, taux, TAUX_ASSURANCE_DEFAUT);

  const endettementColor = res.tauxEndettement <= 25 ? "text-green-600" : res.tauxEndettement <= 35 ? "text-orange-500" : "text-red-600";

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Combien puis-je emprunter avec ${fmt(revenu)} € de revenus sur ${duree} ans ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Avec ${fmt(revenu)} € de revenus nets mensuels, vous pouvez emprunter jusqu'a ${fmt(res.capitalMax)} € sur ${duree} ans au taux moyen de ${taux}%. Votre mensualite maximale serait de ${fmt(res.mensualiteMax)} €, soit un taux d'endettement de ${res.tauxEndettement}%.`,
                },
              },
              {
                "@type": "Question",
                name: `Quel budget immobilier avec ${fmt(revenu)} € de salaire ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Sans apport, votre budget immobilier est de ${fmt(res.capitalMax)} €. Avec un apport de 20 000 €, il passe a ${fmt(resApport20k.budgetTotal)} €. Avec un co-emprunteur au meme revenu, vous pouvez atteindre ${fmt(resCouple.capitalMax)} € d'emprunt.`,
                },
              },
            ],
          }),
        }}
      />

      <section className="mb-8">
        <nav className="text-sm text-slate-400 mb-4">
          <a href="/" className="hover:text-blue-600">Accueil</a>
          <span className="mx-2">/</span>
          <a href="/calcul-capacite-emprunt" className="hover:text-blue-600">Capacite d&apos;emprunt</a>
          <span className="mx-2">/</span>
          <span className="text-slate-600">{fmt(revenu)} € sur {duree} ans</span>
        </nav>

        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">
          Capacite d&apos;emprunt avec {fmt(revenu)} € de revenus sur {duree} ans
        </h1>
        <p className="text-slate-500">
          Simulation detaillee selon les regles HCSF 2026 (taux moyen : {taux}%).
        </p>
      </section>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-200/50 mb-8">
        <p className="text-blue-100 text-sm font-medium mb-1">Capacite d&apos;emprunt maximale</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(res.capitalMax)} €</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-blue-100 text-xs">Mensualite max</p>
            <p className="text-xl font-bold mt-1">{fmt(res.mensualiteMax)} €</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-blue-100 text-xs">Endettement</p>
            <p className="text-xl font-bold mt-1">{res.tauxEndettement}%</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-blue-100 text-xs">Reste a vivre</p>
            <p className="text-xl font-bold mt-1">{fmt(res.resteAVivre)} €</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-blue-100 text-xs">Cout total credit</p>
            <p className="text-xl font-bold mt-1">{fmt(res.coutTotal)} €</p>
          </div>
        </div>
      </div>

      {/* Comparatif par duree */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Comparatif par duree pour {fmt(revenu)} € de revenus
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Duree</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taux</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Capacite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Cout credit</th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((c) => (
                <tr
                  key={c.duree}
                  className={`border-b border-slate-100 ${c.duree === duree ? "bg-blue-50 font-semibold" : ""}`}
                >
                  <td className="py-3 px-2 text-slate-800">
                    <a href={`/calcul-capacite-emprunt/${revenu}-euros-${c.duree}-ans`} className="text-blue-600 hover:underline">
                      {c.duree} ans
                    </a>
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">{c.taux}%</td>
                  <td className="py-3 px-2 text-right text-slate-800 font-semibold">{fmt(c.capitalMax)} €</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmt(c.mensualite)} €/mois</td>
                  <td className="py-3 px-2 text-right text-orange-600">{fmt(c.coutTotal)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact co-emprunteur et apport */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Impact du co-emprunteur et de l&apos;apport
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Scenario</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Capacite</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Budget total</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mensualite</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 bg-blue-50 font-semibold">
                <td className="py-3 px-2 text-slate-800">Seul, sans apport</td>
                <td className="py-3 px-2 text-right text-slate-800">{fmt(res.capitalMax)} €</td>
                <td className="py-3 px-2 text-right text-slate-800">{fmt(res.budgetTotal)} €</td>
                <td className="py-3 px-2 text-right text-slate-600">{fmt(res.mensualiteMax)} €</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 text-slate-800">Seul + 20 000 € d&apos;apport</td>
                <td className="py-3 px-2 text-right text-slate-800">{fmt(resApport20k.capitalMax)} €</td>
                <td className="py-3 px-2 text-right text-green-600 font-semibold">{fmt(resApport20k.budgetTotal)} €</td>
                <td className="py-3 px-2 text-right text-slate-600">{fmt(resApport20k.mensualiteMax)} €</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-2 text-slate-800">Seul + 50 000 € d&apos;apport</td>
                <td className="py-3 px-2 text-right text-slate-800">{fmt(resApport50k.capitalMax)} €</td>
                <td className="py-3 px-2 text-right text-green-600 font-semibold">{fmt(resApport50k.budgetTotal)} €</td>
                <td className="py-3 px-2 text-right text-slate-600">{fmt(resApport50k.mensualiteMax)} €</td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-slate-800">Couple ({fmt(revenu)} € x 2)</td>
                <td className="py-3 px-2 text-right text-blue-600 font-bold">{fmt(resCouple.capitalMax)} €</td>
                <td className="py-3 px-2 text-right text-blue-600 font-bold">{fmt(resCouple.budgetTotal)} €</td>
                <td className="py-3 px-2 text-right text-slate-600">{fmt(resCouple.mensualiteMax)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Liens internes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Autres niveaux de revenus</h2>
        <div className="flex flex-wrap gap-2">
          {REVENUS_SEO.filter((r) => r !== revenu).map((r) => (
            <a
              key={r}
              href={`/calcul-capacite-emprunt/${r}-euros-${duree}-ans`}
              className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm text-slate-600 transition-colors"
            >
              {fmt(r)} €/mois
            </a>
          ))}
        </div>
      </div>

      {/* Texte SEO adapte */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Emprunter avec {fmt(revenu)} € de salaire : ce qu&apos;il faut savoir
        </h2>
        <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
          <p>
            Avec un revenu net mensuel de {fmt(revenu)} €, la regle HCSF impose une mensualite maximale de {fmt(res.mensualiteMax)} € (35% d&apos;endettement). Sur {duree} ans au taux moyen de {taux}%, cela permet d&apos;emprunter {fmt(res.capitalMax)} €.
          </p>
          <p>
            {res.resteAVivre >= 1200
              ? `Votre reste a vivre de ${fmt(res.resteAVivre)} € est confortable et permettra de passer facilement l'etude de faisabilite en banque.`
              : res.resteAVivre >= 700
                ? `Votre reste a vivre de ${fmt(res.resteAVivre)} € est correct mais limite. Les banques pourraient demander des garanties supplementaires.`
                : `Attention : votre reste a vivre de ${fmt(res.resteAVivre)} € est faible. Les banques pourraient refuser le pret sans apport consequent ou co-emprunteur.`}
          </p>
          <p>
            Le cout total du credit sur {duree} ans est de {fmt(res.coutTotal)} € (interets : {fmt(res.coutInterets)} € + assurance : {fmt(res.coutAssurance)} €). Comparer les offres de plusieurs banques peut permettre d&apos;economiser plusieurs milliers d&apos;euros.
          </p>
        </div>
      </div>

      <div className="text-center mb-8">
        <a
          href="/calcul-capacite-emprunt"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all"
        >
          Faire une simulation personnalisee
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <RelatedCalculators currentSlug="/calcul-capacite-emprunt" />
    </div>
  );
}
