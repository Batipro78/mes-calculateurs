import type { Metadata } from "next";
import CalculMentionBac from "../CalculMentionBac";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";
import { calculerMention, MENTIONS } from "../mentionBacCalc";

const MOYENNES_GENEREES = [8, 10, 11, 12, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20];

function parseSlug(slug: string): number | null {
  // Format : moyenne-13 ou moyenne-13-5 ou moyenne-15-5
  const match = slug.match(/^moyenne-(\d+)(?:-(\d+))?$/);
  if (!match) return null;
  const entier = parseInt(match[1]);
  const decimal = match[2] ? parseFloat(`0.${match[2]}`) : 0;
  const moyenne = entier + decimal;
  return MOYENNES_GENEREES.includes(moyenne) ? moyenne : null;
}

function moyenneToSlug(m: number): string {
  if (Number.isInteger(m)) return `moyenne-${m}`;
  const [entier, decimal] = m.toString().split(".");
  return `moyenne-${entier}-${decimal}`;
}

export function generateStaticParams() {
  return MOYENNES_GENEREES.map((m) => ({ params: moyenneToSlug(m) }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const moyenne = parseSlug(slug);
  if (moyenne === null) return {};

  const resultat = calculerMention(moyenne);

  return {
    alternates: { canonical: `/calcul-mention-bac/${slug}` },
    title: `${moyenne}/20 au bac : ${resultat.mention.nom}`,
    description: `Avec ${moyenne}/20 au baccalauréat, vous obtenez la ${resultat.mention.nom}. ${resultat.mention.bonus} Barème officiel Éducation Nationale.`,
    keywords: `${moyenne} sur 20 bac, mention bac ${moyenne}, ${resultat.mention.nom}, moyenne ${moyenne} baccalaureat`,
    openGraph: {
      title: `${moyenne}/20 au bac = ${resultat.mention.nom}`,
      description: `Mention obtenue avec ${moyenne}/20 au baccalauréat. Détails et avantages.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const moyenne = parseSlug(slug);
  if (moyenne === null) notFound();

  const resultat = calculerMention(moyenne);

  const autresMoyennes = MOYENNES_GENEREES.filter((m) => m !== moyenne).slice(0, 8);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Avec ${moyenne}/20 au bac, quelle mention obtient-on ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec une moyenne de ${moyenne}/20 au baccalauréat, vous obtenez la ${resultat.mention.nom}. ${resultat.mention.description}`,
        }
      },
      {
        "@type": "Question",
        name: `Quel est l'avantage d'une moyenne de ${moyenne}/20 au bac ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: resultat.mention.bonus,
        }
      },
      {
        "@type": "Question",
        name: `Combien de points pour passer à la mention supérieure depuis ${moyenne}/20 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: resultat.prochainePalier
            ? `Il manque ${resultat.pointsPourProchainePalier.toFixed(2)} point(s) pour obtenir la mention ${resultat.prochainePalier.nom} (seuil ${resultat.prochainePalier.seuilMin}/20).`
            : `Vous avez déjà atteint la mention maximale.`,
        }
      }
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Breadcrumb currentPage={`${moyenne}/20 au bac`} parentPage="Mention Bac" parentHref="/calcul-mention-bac" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {resultat.mention.emoji}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {moyenne}/20 au bac : {resultat.mention.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Avec une moyenne de {moyenne}/20 au baccalauréat, vous obtenez la <strong>{resultat.mention.nom}</strong>.
        {resultat.felicitationsJury && " Avec les Félicitations du jury (18+)."}
      </p>

      <CalculMentionBac />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Détails pour {moyenne}/20 au bac
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">Mention obtenue</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">{resultat.mention.nom}</p>
            <p className="text-sm text-blue-700 mt-1">{resultat.mention.emoji}</p>
          </div>

          <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
            <p className="text-sm text-violet-700 font-medium">Point Parcoursup</p>
            <p className="text-3xl font-bold text-violet-900 mt-1">
              {resultat.pointsBonusParcoursup === 1 ? "+1" : "0"}
            </p>
            <p className="text-sm text-violet-700 mt-1">
              {resultat.pointsBonusParcoursup === 1 ? "Bonus formations sélectives" : "Aucun bonus"}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700">Moyenne</span>
            <span className="font-semibold text-slate-800">{moyenne}/20</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Bac obtenu</span>
            <span className="font-semibold text-slate-800">{resultat.obtenu ? "Oui" : "Non"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700">Félicitations du jury</span>
            <span className="font-semibold text-slate-800">{resultat.felicitationsJury ? "Oui" : "Non"}</span>
          </div>
          {resultat.prochainePalier && (
            <div className="flex justify-between">
              <span className="text-slate-700">Pour la mention suivante</span>
              <span className="font-semibold text-slate-800">
                +{resultat.pointsPourProchainePalier.toFixed(2)} pt vers {resultat.prochainePalier.nom}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 font-semibold mb-1">Avantages</p>
          <p className="text-blue-800 text-sm">{resultat.mention.bonus}</p>
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Autres moyennes possibles
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {autresMoyennes.map((m) => {
            const r = calculerMention(m);
            return (
              <a
                key={m}
                href={`/calcul-mention-bac/${moyenneToSlug(m)}`}
                className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition"
              >
                <span className="text-lg mr-2">{r.mention.emoji}</span>
                <strong>{m}/20</strong> : {r.mention.nom}
              </a>
            );
          })}
        </div>
      </section>

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Tableau complet des mentions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Mention</th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Moyenne</th>
              </tr>
            </thead>
            <tbody>
              {MENTIONS.filter((m) => m.id !== "insuffisant").map((m) => (
                <tr
                  key={m.id}
                  className={`border-b border-slate-100 ${m.id === resultat.mention.id ? "bg-blue-50" : ""}`}
                >
                  <td className="py-3 px-3 text-slate-800">
                    <span className="mr-2">{m.emoji}</span>
                    {m.nom}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {m.seuilMin === 18 ? "18 et plus" : `${m.seuilMin} à ${m.seuilMax}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-mention-bac" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
