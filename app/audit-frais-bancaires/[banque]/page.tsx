import type { Metadata } from "next";
import AuditFraisBancaires from "../AuditFraisBancaires";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { BANQUES, getBanqueBySlug, BANQUE_SLUGS } from "../banques";
import { MOYENNE_BANQUE_TRAD, MOYENNE_BANQUE_LIGNE } from "../calcAuditFraisBancaires";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return BANQUE_SLUGS.map((banque) => ({ banque }));
}

type Props = { params: Promise<{ banque: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { banque } = await params;
  const data = getBanqueBySlug(banque);
  if (!data) return {};

  return {
    alternates: { canonical: `/audit-frais-bancaires/${banque}` },
    title: `Frais bancaires ${data.nom} 2026 — Combien vous payez vraiment`,
    description: `Tarifs ${data.nom} 2026 : tenue de compte ${data.tenueCompte} €, carte Visa Classic ${data.carteClassic} €, total moyen ${data.totalAnnuelMoyen} €/an. Comparez avec les banques en ligne et detectez les frais abusifs.`,
    keywords: `frais bancaires ${data.nom}, tarifs ${data.nom} 2026, ${data.nom} carte bancaire, ${data.nom} commission intervention, ${data.nom} hausse tarifs`,
  };
}

export default async function Page({ params }: Props) {
  const { banque } = await params;
  const data = getBanqueBySlug(banque);
  if (!data) notFound();

  const economieVsBanqueLigne = Math.max(0, data.totalAnnuelMoyen - MOYENNE_BANQUE_LIGNE);
  const perte10Ans = economieVsBanqueLigne * 10;
  const positionVsMoyenne = data.totalAnnuelMoyen - MOYENNE_BANQUE_TRAD;

  // Selection de 3 alternatives moins cheres
  const alternatives = BANQUES
    .filter((b) => b.slug !== data.slug && b.totalAnnuelMoyen < data.totalAnnuelMoyen)
    .sort((a, b) => a.totalAnnuelMoyen - b.totalAnnuelMoyen)
    .slice(0, 3);

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
                name: `Combien coute un compte ${data.nom} en 2026 ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Pour un compte standard a la ${data.nom} en 2026, comptez environ ${data.totalAnnuelMoyen} €/an de frais bancaires totaux : ${data.tenueCompte} € de tenue de compte, ${data.carteClassic} € pour une carte Visa Classic, plus les frais d'usage (virements, decouverts, commissions). En passant a une banque en ligne, vous economisez en moyenne ${economieVsBanqueLigne} €/an.`,
                },
              },
              {
                "@type": "Question",
                name: `Comment quitter ${data.nom} sans frais ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Depuis 2017 (loi Macron), la mobilite bancaire est gratuite et automatique. Votre nouvelle banque s'occupe de tout : transfert des prelevements, virements, et avis aux creanciers. La procedure prend 22 jours ouvres maximum. Vous devez juste cloturer votre compte ${data.nom} apres le transfert (gratuit).`,
                },
              },
              {
                "@type": "Question",
                name: `${data.nom} a-t-elle augmente ses tarifs en 2026 ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: data.hausse2026,
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage={`Frais ${data.nom}`} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          {data.emoji}
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Frais bancaires {data.nom} 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tarifs detailles, comparaison avec la moyenne nationale et alternatives moins cheres pour {data.nom} en 2026.
      </p>

      {/* Encart resume */}
      <div className={`rounded-2xl border-2 shadow-sm p-6 mb-8 bg-gradient-to-br ${
        data.totalAnnuelMoyen > MOYENNE_BANQUE_TRAD
          ? "from-red-50 to-orange-50 border-red-300"
          : data.totalAnnuelMoyen > 100
          ? "from-amber-50 to-yellow-50 border-amber-300"
          : "from-emerald-50 to-teal-50 border-emerald-300"
      }`}>
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-slate-700 mb-1">
            Total moyen estime {data.nom}
          </div>
          <div className="text-5xl font-black text-slate-800">
            {data.totalAnnuelMoyen} €<span className="text-2xl text-slate-500">/an</span>
          </div>
          <div className="text-sm text-slate-600 mt-2">
            {positionVsMoyenne > 10
              ? `+${positionVsMoyenne} € au-dessus de la moyenne nationale (${MOYENNE_BANQUE_TRAD} €)`
              : positionVsMoyenne < -10
              ? `${Math.abs(positionVsMoyenne)} € en dessous de la moyenne nationale (${MOYENNE_BANQUE_TRAD} €)`
              : `Proche de la moyenne nationale (${MOYENNE_BANQUE_TRAD} €)`}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Tenue de compte</div>
            <div className="text-xl font-bold text-slate-800">{data.tenueCompte} €/an</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Carte Visa Classic</div>
            <div className="text-xl font-bold text-slate-800">{data.carteClassic} €/an</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">Carte Visa Premier</div>
            <div className="text-xl font-bold text-slate-800">{data.cartePremier} €/an</div>
          </div>
        </div>
      </div>

      {/* Points cles */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="text-emerald-700 font-bold mb-1">✅ Point fort</div>
          <p className="text-sm text-emerald-900">{data.pointFort}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="text-red-700 font-bold mb-1">⚠️ Point faible</div>
          <p className="text-sm text-red-900">{data.pointFaible}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-blue-700 font-bold mb-1">📊 Hausse 2026</div>
          <p className="text-sm text-blue-900">{data.hausse2026}</p>
        </div>
      </div>

      {/* Recommandation */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r-xl">
        <h2 className="font-bold text-amber-900 mb-2">💡 Notre conseil pour les clients {data.nom}</h2>
        <p className="text-amber-900">{data.recommandation}</p>
      </div>

      {/* Projection economie */}
      {economieVsBanqueLigne > 50 && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-red-800 mb-4">
            💸 Combien vous perdez en restant chez {data.nom}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Sur 1 an</div>
              <div className="text-2xl font-black text-red-700">{economieVsBanqueLigne} €</div>
            </div>
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Sur 5 ans</div>
              <div className="text-2xl font-black text-red-700">{economieVsBanqueLigne * 5} €</div>
            </div>
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Sur 10 ans</div>
              <div className="text-2xl font-black text-red-700">{perte10Ans} €</div>
            </div>
          </div>
          <p className="text-xs text-red-700 mt-3 text-center">
            Compare a une banque en ligne moyenne ({MOYENNE_BANQUE_LIGNE} €/an).
          </p>
        </div>
      )}

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            🏆 3 alternatives moins cheres que {data.nom}
          </h2>
          <div className="space-y-3">
            {alternatives.map((alt) => (
              <a
                key={alt.slug}
                href={`/audit-frais-bancaires/${alt.slug}`}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{alt.emoji}</div>
                  <div>
                    <div className="font-bold text-slate-800">{alt.nom}</div>
                    <div className="text-xs text-slate-500 capitalize">{alt.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Total moyen</div>
                  <div className="text-lg font-bold text-emerald-600">
                    {alt.totalAnnuelMoyen} €/an
                  </div>
                  <div className="text-xs text-emerald-700">
                    -{data.totalAnnuelMoyen - alt.totalAnnuelMoyen} €/an d&apos;economie
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Auditez vos frais bancaires {data.nom}
      </h2>
      <p className="text-slate-600 mb-6">
        Saisissez vos vrais frais ci-dessous pour un diagnostic precis. Les valeurs sont pre-remplies avec les tarifs moyens {data.nom} 2026.
      </p>

      <AuditFraisBancaires />

      <AdSlot adSlot="0987654321" adFormat="rectangle" className="my-8" />

      <RelatedCalculators currentSlug="/audit-frais-bancaires" />
    </div>
  );
}
