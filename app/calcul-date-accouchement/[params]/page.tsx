import type { Metadata } from "next";
import CalculateurDPA from "../CalculateurDPA";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const SEMAINES = Array.from({ length: 38 }, (_, i) => i + 4); // 4 SA a 41 SA

interface InfoSemaine {
  taille: string;
  poids: string;
  developpement: string;
  conseil: string;
}

const INFOS_SEMAINES: Record<number, InfoSemaine> = {
  4: { taille: "1 mm", poids: "< 1 g", developpement: "L'embryon s'implante dans l'uterus (nidation). Les cellules commencent a se specialiser.", conseil: "Prenez de l'acide folique (vitamine B9) des que possible." },
  5: { taille: "2 mm", poids: "< 1 g", developpement: "Le coeur commence a battre. Le tube neural (futur cerveau et moelle epiniere) se forme.", conseil: "Evitez alcool et tabac. Consultez votre medecin." },
  6: { taille: "5 mm", poids: "< 1 g", developpement: "Les bourgeons des bras et des jambes apparaissent. Le visage commence a se dessiner.", conseil: "Les nausees peuvent commencer. Mangez leger et souvent." },
  7: { taille: "1,2 cm", poids: "< 1 g", developpement: "Les doigts commencent a se former. Le cerveau se developpe rapidement.", conseil: "Buvez beaucoup d'eau. Evitez les fromages au lait cru." },
  8: { taille: "1,6 cm", poids: "1 g", developpement: "Tous les organes principaux sont en place. L'embryon devient officiellement un foetus.", conseil: "Premiere consultation prenatale a programmer." },
  9: { taille: "2,3 cm", poids: "2 g", developpement: "Les yeux sont formes mais fermes. Les oreilles prennent forme.", conseil: "Pensez a declarer votre grossesse a la CAF avant 14 SA." },
  10: { taille: "3,1 cm", poids: "4 g", developpement: "Les empreintes digitales se forment. Le foetus peut bouger (imperceptible).", conseil: "Fatigue frequente : reposez-vous autant que possible." },
  11: { taille: "4,1 cm", poids: "7 g", developpement: "Les organes genitaux externes commencent a se differencier. Les ongles apparaissent.", conseil: "Echographie de datation entre 11 et 14 SA." },
  12: { taille: "5,4 cm", poids: "14 g", developpement: "Le foetus peut sucer son pouce. Les os commencent a durcir. Premiere echographie possible.", conseil: "Depistage trisomie 21 (prise de sang + echographie)." },
  13: { taille: "7,4 cm", poids: "23 g", developpement: "Fin du 1er trimestre. Les risques de fausse couche diminuent fortement. Les cordes vocales se forment.", conseil: "Les nausees devraient bientot s'attenuer." },
  14: { taille: "8,7 cm", poids: "43 g", developpement: "Debut du 2e trimestre. Le foetus peut grimacer. Le lanugo (fin duvet) couvre le corps.", conseil: "Periode plus confortable. L'appetit revient souvent." },
  15: { taille: "10 cm", poids: "70 g", developpement: "Les os continuent a durcir. Le foetus entend les premiers sons (battements du coeur de la mere).", conseil: "Commencez a parler a votre bebe, il vous entend !" },
  16: { taille: "11,6 cm", poids: "100 g", developpement: "Les expressions faciales se developpent. Les yeux sont sensibles a la lumiere.", conseil: "Possible de ressentir les premiers mouvements (surtout 2e grossesse)." },
  17: { taille: "13 cm", poids: "140 g", developpement: "Le vernix (enduit protecteur) commence a recouvrir la peau. Le squelette durcit.", conseil: "Pensez a choisir votre maternite." },
  18: { taille: "14,2 cm", poids: "190 g", developpement: "Les premiers mouvements sont generalement ressentis. Le foetus mesure la taille d'un poivron.", conseil: "Notez les premiers mouvements pour votre sage-femme." },
  19: { taille: "15,3 cm", poids: "240 g", developpement: "Les sens se developpent : gout, toucher. Le foetus reagit aux sons forts.", conseil: "2e consultation prenatale ce mois-ci." },
  20: { taille: "16,4 cm", poids: "300 g", developpement: "Mi-grossesse ! Echographie morphologique. Le sexe du bebe est visible.", conseil: "Echographie morphologique entre 20 et 25 SA. Moment important !" },
  21: { taille: "26,7 cm", poids: "360 g", developpement: "Le foetus a des cycles de sommeil et d'eveil. Il bouge activement.", conseil: "Dormez sur le cote gauche pour une meilleure circulation." },
  22: { taille: "27,8 cm", poids: "430 g", developpement: "Les poumons se developpent mais ne sont pas encore fonctionnels. Les sourcils sont visibles.", conseil: "Maintenez une activite physique douce (marche, natation)." },
  23: { taille: "28,9 cm", poids: "500 g", developpement: "Le foetus pese environ 500 g. Il peut entendre les voix. Seuil de viabilite approche.", conseil: "Pensez a vous inscrire aux cours de preparation a l'accouchement." },
  24: { taille: "30 cm", poids: "600 g", developpement: "Seuil de viabilite. Les poumons produisent du surfactant. Le visage est bien forme.", conseil: "Depistage du diabete gestationnel (test HGPO entre 24 et 28 SA)." },
  25: { taille: "34,6 cm", poids: "660 g", developpement: "Le foetus reagit a la voix de ses parents. Les narines s'ouvrent.", conseil: "Surveillez les signes de contractions prematurees." },
  26: { taille: "35,6 cm", poids: "760 g", developpement: "Les yeux s'ouvrent pour la premiere fois. Le cerveau se developpe rapidement.", conseil: "Evitez de rester debout trop longtemps. Surelever les jambes." },
  27: { taille: "36,6 cm", poids: "875 g", developpement: "Fin du 2e trimestre. Le foetus peut avoir le hoquet. Il distingue la lumiere.", conseil: "Derniere ligne droite ! Commencez a preparer la chambre de bebe." },
  28: { taille: "37,6 cm", poids: "1 kg", developpement: "Debut du 3e trimestre. Le foetus pese environ 1 kg. Il reve (mouvements oculaires rapides).", conseil: "3e echographie vers 32 SA. Preparez votre valise de maternite." },
  29: { taille: "38,6 cm", poids: "1,15 kg", developpement: "Les os sont presque completement formes. Le foetus prend du poids rapidement.", conseil: "Attention au mal de dos : adoptez de bonnes postures." },
  30: { taille: "39,9 cm", poids: "1,3 kg", developpement: "Le foetus se retourne generalement tete en bas. Le cerveau continue sa maturation.", conseil: "Si le bebe ne s'est pas retourne, ne vous inquietez pas encore." },
  31: { taille: "41,1 cm", poids: "1,5 kg", developpement: "Les poumons murissent. Le foetus peut pleurer (silencieusement). Il grossit vite.", conseil: "Repos ++ si fatigue. Les insomnies sont frequentes au 3e trimestre." },
  32: { taille: "42,4 cm", poids: "1,7 kg", developpement: "3e echographie de croissance. Tous les organes sont formes, la maturation continue.", conseil: "Echographie de croissance vers 32 SA." },
  33: { taille: "43,7 cm", poids: "1,9 kg", developpement: "Le systeme immunitaire se renforce. Le foetus stocke du fer et du calcium.", conseil: "Mangez des aliments riches en fer et calcium." },
  34: { taille: "45 cm", poids: "2,1 kg", developpement: "Le vernix s'epaissit. Le foetus a de moins en moins de place pour bouger.", conseil: "Verifiez que votre valise de maternite est prete." },
  35: { taille: "46,2 cm", poids: "2,4 kg", developpement: "Debut du conge maternite (1er ou 2e enfant). Le foetus prend environ 200 g par semaine.", conseil: "Debut du conge prenatal. Profitez-en pour vous reposer !" },
  36: { taille: "47,4 cm", poids: "2,6 kg", developpement: "Le foetus descend dans le bassin. Les poumons sont presque matures.", conseil: "Consultations hebdomadaires. Surveillez les contractions." },
  37: { taille: "48,6 cm", poids: "2,9 kg", developpement: "Le bebe est considere comme a terme ! Il peut naitre en bonne sante.", conseil: "Bebe peut arriver a tout moment. Gardez votre telephone charge !" },
  38: { taille: "49,8 cm", poids: "3,1 kg", developpement: "Le lanugo a presque disparu. Le bebe se prepare a la naissance.", conseil: "Restez active (marche) pour favoriser la descente du bebe." },
  39: { taille: "50,7 cm", poids: "3,3 kg", developpement: "Le bebe est pret a naitre. Il mesure environ 50 cm et pese environ 3,3 kg.", conseil: "Reconnaissez les vrais signes du travail : contractions regulieres, perte des eaux." },
  40: { taille: "51,2 cm", poids: "3,5 kg", developpement: "Date prevue d'accouchement ! Seuls 5% des bebes naissent pile a la DPA.", conseil: "Si pas de signes de travail, votre medecin surveillera de pres." },
  41: { taille: "51,5 cm", poids: "3,6 kg", developpement: "Terme depasse. Surveillance renforcee (monitoring). Declenchement envisage a 41 SA + 6 jours.", conseil: "Consultations tous les 2 jours. Declenchement probable bientot." },
};

function getTrimestreLabel(sa: number): string {
  if (sa <= 13) return "1er trimestre";
  if (sa <= 27) return "2e trimestre";
  return "3e trimestre";
}

function getTrimestreColor(sa: number): { bg: string; text: string; gradient: string } {
  if (sa <= 13) return { bg: "bg-blue-50", text: "text-blue-700", gradient: "from-blue-500 to-cyan-500" };
  if (sa <= 27) return { bg: "bg-amber-50", text: "text-amber-700", gradient: "from-amber-500 to-orange-500" };
  return { bg: "bg-purple-50", text: "text-purple-700", gradient: "from-purple-500 to-pink-500" };
}

function parseSlug(slug: string): number | null {
  const match = slug.match(/^enceinte-de-(\d+)-semaines$/);
  if (!match) return null;
  return parseInt(match[1]);
}

export function generateStaticParams() {
  return SEMAINES.map((sa) => ({ params: `enceinte-de-${sa}-semaines` }));
}

export async function generateMetadata({ params }: { params: Promise<{ params: string }> }): Promise<Metadata> {
  const { params: slug } = await params;
  const sa = parseSlug(slug);
  if (!sa || !INFOS_SEMAINES[sa]) return {};

  const info = INFOS_SEMAINES[sa];
  const sg = sa - 2;
  const trimestre = getTrimestreLabel(sa);
  const mois = Math.floor(sg / 4.33);

  return {
    alternates: { canonical: `/calcul-date-accouchement/${slug}` },
    title: `Enceinte de ${sa} semaines (${sg} SG) - ${trimestre} | Taille, poids, developpement`,
    description: `Grossesse a ${sa} semaines d'amenorrhee (${sg} SG, ${mois} mois). Bebe : ${info.taille}, ${info.poids}. ${info.developpement.slice(0, 100)}...`,
    keywords: `enceinte ${sa} semaines, grossesse ${sa} SA, ${sg} semaines grossesse, ${sa} semaines amenorrhee, bebe ${sa} semaines, ${trimestre} grossesse`,
    openGraph: {
      title: `${sa} SA (${sg} SG) - Votre grossesse semaine par semaine`,
      description: `A ${sa} semaines, votre bebe mesure ${info.taille} et pese ${info.poids}. ${info.developpement}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ params: string }> }) {
  const { params: slug } = await params;
  const sa = parseSlug(slug);
  if (!sa || !SEMAINES.includes(sa) || !INFOS_SEMAINES[sa]) notFound();

  const info = INFOS_SEMAINES[sa];
  const sg = sa - 2;
  const trimestre = getTrimestreLabel(sa);
  const trimestreColor = getTrimestreColor(sa);
  const mois = Math.floor(sg / 4.33);
  const joursRestants = Math.max(0, (41 - sa) * 7);
  const progression = Math.min(100, (sa / 41) * 100);

  // Semaines proches
  const semainesProches = SEMAINES.filter((s) => Math.abs(s - sa) <= 3 && s !== sa);

  // Meme trimestre
  const memeTrimestre = SEMAINES.filter((s) => getTrimestreLabel(s) === trimestre && s !== sa);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Que se passe-t-il a ${sa} semaines de grossesse ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${sa} SA (${sg} SG), votre bebe mesure environ ${info.taille} et pese ${info.poids}. ${info.developpement}`,
        },
      },
      {
        "@type": "Question",
        name: `${sa} SA correspond a combien de mois de grossesse ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${sa} semaines d'amenorrhee (SA) correspondent a ${sg} semaines de grossesse (SG), soit environ ${mois} mois. Vous etes dans le ${trimestre}.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        currentPage={`${sa} semaines`}
        parentPage="Date d'Accouchement"
        parentHref="/calcul-date-accouchement"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 bg-gradient-to-br ${trimestreColor.gradient} rounded-xl flex items-center justify-center text-xl shadow-sm`}>
          🤰
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Enceinte de {sa} semaines ({sg} SG)
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Tout savoir sur la {sa}e semaine d&apos;amenorrhee — {trimestre}, environ {mois} mois de grossesse.
      </p>

      {/* Resultat principal */}
      <div className={`bg-gradient-to-br ${trimestreColor.gradient} text-white rounded-2xl p-8 shadow-lg mb-8`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/80 mb-1">Semaine de grossesse</p>
            <p className="text-5xl font-extrabold tracking-tight">{sa} SA</p>
            <p className="text-xl font-bold mt-1">{sg} SG &middot; {trimestre}</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 mb-1">Environ</p>
            <p className="text-3xl font-extrabold">{mois} mois</p>
          </div>
        </div>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/70">Taille bebe</p>
            <p className="font-semibold text-lg">{info.taille}</p>
          </div>
          <div>
            <p className="text-white/70">Poids bebe</p>
            <p className="font-semibold text-lg">{info.poids}</p>
          </div>
          <div>
            <p className="text-white/70">Jours restants</p>
            <p className="font-semibold text-lg">~{joursRestants} jours</p>
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500">Progression de la grossesse</span>
          <span className="font-bold text-purple-600">{Math.round(progression)}%</span>
        </div>
        <div className="h-4 rounded-full overflow-hidden bg-slate-100">
          <div
            className={`h-full bg-gradient-to-r ${trimestreColor.gradient} rounded-full transition-all`}
            style={{ width: `${progression}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>4 SA</span>
          <span>13 SA</span>
          <span>27 SA</span>
          <span>41 SA</span>
        </div>
      </div>

      {/* Developpement du bebe */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Developpement du bebe a {sa} SA
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {info.developpement}
        </p>
        <div className={`${trimestreColor.bg} rounded-xl p-4`}>
          <p className={`text-sm font-semibold ${trimestreColor.text} mb-1`}>Conseil</p>
          <p className={`text-sm ${trimestreColor.text}`}>{info.conseil}</p>
        </div>
      </div>

      {/* Tableau recapitulatif */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recapitulatif a {sa} SA</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2.5 font-medium text-slate-500">Semaines d&apos;amenorrhee (SA)</td>
                <td className="py-2.5 text-right font-bold text-slate-800">{sa} SA</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 font-medium text-slate-500">Semaines de grossesse (SG)</td>
                <td className="py-2.5 text-right font-bold text-slate-800">{sg} SG</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 font-medium text-slate-500">Mois de grossesse</td>
                <td className="py-2.5 text-right font-bold text-slate-800">{mois} mois</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 font-medium text-slate-500">Trimestre</td>
                <td className="py-2.5 text-right font-bold text-slate-800">{trimestre}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 font-medium text-slate-500">Taille du bebe</td>
                <td className="py-2.5 text-right font-bold text-slate-800">{info.taille}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 font-medium text-slate-500">Poids du bebe</td>
                <td className="py-2.5 text-right font-bold text-slate-800">{info.poids}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-slate-500">Jours restants (approx.)</td>
                <td className="py-2.5 text-right font-bold text-slate-800">~{joursRestants} jours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Semaines voisines */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Semaines proches
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Semaine</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Taille</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Poids</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Trimestre</th>
              </tr>
            </thead>
            <tbody>
              {semainesProches.map((s) => {
                const sInfo = INFOS_SEMAINES[s];
                if (!sInfo) return null;
                return (
                  <tr key={s} className="border-b border-slate-100">
                    <td className="py-2.5 px-2">
                      <a
                        href={`/calcul-date-accouchement/enceinte-de-${s}-semaines`}
                        className="text-slate-700 hover:text-purple-600 transition-colors font-medium"
                      >
                        {s} SA ({s - 2} SG)
                      </a>
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{sInfo.taille}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{sInfo.poids}</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{getTrimestreLabel(s)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Calculateur interactif</h2>
      <CalculateurDPA />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Texte SEO */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Grossesse a {sa} semaines : tout ce qu&apos;il faut savoir
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A <strong>{sa} semaines d&apos;amenorrhee</strong> ({sg} semaines de grossesse),
          vous etes dans le <strong>{trimestre}</strong> de votre grossesse, soit environ{" "}
          <strong>{mois} mois</strong>. Votre bebe mesure environ <strong>{info.taille}</strong> et
          pese <strong>{info.poids}</strong>.
        </p>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {info.developpement}
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">
          SA vs SG : quelle difference ?
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Les <strong>semaines d&apos;amenorrhee (SA)</strong> sont comptees depuis le 1er jour
          des dernieres regles. Les <strong>semaines de grossesse (SG)</strong> commencent a la
          conception, soit 2 semaines de moins. Ainsi, {sa} SA = {sg} SG. Les professionnels
          de sante en France utilisent les SA.
        </p>
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Conseil pour cette semaine</h3>
        <p className="text-slate-600 leading-relaxed">
          {info.conseil}
        </p>
      </section>

      {/* Liens toutes les semaines */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Toutes les semaines du {trimestre}</h2>
        <div className="flex flex-wrap gap-2">
          {memeTrimestre.map((s) => (
            <a
              key={s}
              href={`/calcul-date-accouchement/enceinte-de-${s}-semaines`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50/50 transition-all"
            >
              {s} SA
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/calcul-date-accouchement" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
