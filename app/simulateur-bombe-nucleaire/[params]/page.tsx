import type { Metadata } from "next";
import SimulateurNucleaire from "../SimulateurNucleaire";
import AdSlot from "../../components/AdSlot";
import Breadcrumb from "../../components/Breadcrumb";
import RelatedCalculators from "../../components/RelatedCalculators";
import { notFound } from "next/navigation";

const ARMES = [
  { slug: "hiroshima", nom: "Little Boy (Hiroshima)", puissance: 15, desc: "Bombe a fission larguee sur Hiroshima le 6 aout 1945. Puissance : 15 kilotonnes. A cause environ 140 000 morts.", article: "la bombe d'Hiroshima" },
  { slug: "nagasaki", nom: "Fat Man (Nagasaki)", puissance: 21, desc: "Bombe au plutonium larguee sur Nagasaki le 9 aout 1945. Puissance : 21 kilotonnes. A cause environ 70 000 morts.", article: "la bombe de Nagasaki" },
  { slug: "tactique", nom: "Arme tactique (5 kT)", puissance: 5, desc: "Bombe nucleaire tactique de faible puissance (5 kT), destinee a un usage sur le champ de bataille. La Russie en possede environ 2 000.", article: "une bombe tactique" },
  { slug: "trident", nom: "W76 Trident (USA)", puissance: 100, desc: "Ogive strategique americaine deployee sur les sous-marins Trident II. Puissance : 100 kT. Environ 1 500 en service.", article: "une ogive Trident americaine" },
  { slug: "tn75", nom: "TN75 (France)", puissance: 300, desc: "Ogive strategique francaise deployee sur les sous-marins SNLE. Puissance : 300 kT. Environ 290 ogives dans l'arsenal francais.", article: "une ogive TN75 francaise" },
  { slug: "sarmat", nom: "RS-28 Sarmat (Russie)", puissance: 800, desc: "Missile intercontinental russe pouvant transporter plusieurs ogives. Puissance par ogive : ~800 kT. Portee : 18 000 km.", article: "un missile Sarmat russe" },
  { slug: "b83", nom: "B83 (USA)", puissance: 1200, desc: "Plus grosse bombe nucleaire active de l'arsenal americain. Puissance : 1,2 Mt. Bombe a gravite larguee depuis un bombardier.", article: "une bombe B83 americaine" },
  { slug: "tsar-bomba", nom: "Tsar Bomba (URSS)", puissance: 50000, desc: "Plus grosse bombe nucleaire jamais testee. 50 Mt (50 000 kT), soit 3 333 fois Hiroshima. Testee le 30 octobre 1961 sur l'ile de Nouvelle-Zemble.", article: "la Tsar Bomba" },
] as const;

const VILLES = [
  { slug: "paris", nom: "Paris", lat: 48.8566, lng: 2.3522, pop: "2,1 millions (12,4M aire urbaine)" },
  { slug: "lyon", nom: "Lyon", lat: 45.7640, lng: 4.8357, pop: "520 000 (2,3M aire urbaine)" },
  { slug: "marseille", nom: "Marseille", lat: 43.2965, lng: 5.3698, pop: "870 000 (1,9M aire urbaine)" },
  { slug: "toulouse", nom: "Toulouse", lat: 43.6047, lng: 1.4442, pop: "490 000 (1,4M aire urbaine)" },
  { slug: "nice", nom: "Nice", lat: 43.7102, lng: 7.2620, pop: "340 000 (1M aire urbaine)" },
  { slug: "lille", nom: "Lille", lat: 50.6292, lng: 3.0573, pop: "230 000 (1,5M aire urbaine)" },
  { slug: "strasbourg", nom: "Strasbourg", lat: 48.5734, lng: 7.7521, pop: "280 000 (800K aire urbaine)" },
  { slug: "bordeaux", nom: "Bordeaux", lat: 44.8378, lng: -0.5792, pop: "260 000 (1,3M aire urbaine)" },
  { slug: "nantes", nom: "Nantes", lat: 47.2184, lng: -1.5536, pop: "320 000 (1M aire urbaine)" },
  { slug: "rennes", nom: "Rennes", lat: 48.1173, lng: -1.6778, pop: "220 000 (750K aire urbaine)" },
] as const;

function calculerZones(puissanceKt: number) {
  const fireball = 0.033 * Math.pow(puissanceKt, 0.40);
  const radiation = 0.40 * Math.pow(puissanceKt, 0.33);
  const blast20psi = 0.28 * Math.pow(puissanceKt, 0.33);
  const blast5psi = 0.71 * Math.pow(puissanceKt, 0.33);
  const thermal = 0.67 * Math.pow(puissanceKt, 0.41);
  const blast1psi = 2.2 * Math.pow(puissanceKt, 0.33);

  return [
    { nom: "Boule de feu", rayon: fireball, mortalite: "100%", desc: "Vaporisation totale" },
    { nom: "Radiation letale", rayon: radiation, mortalite: "90-100%", desc: "Dose mortelle (500 rem)" },
    { nom: "Destruction totale (20 psi)", rayon: blast20psi, mortalite: "~90%", desc: "Beton arme detruit" },
    { nom: "Batiments effondres (5 psi)", rayon: blast5psi, mortalite: "~50%", desc: "Immeubles d'habitation detruits" },
    { nom: "Brulures 3e degre", rayon: thermal, mortalite: "20-50%", desc: "Brulures graves, incendies" },
    { nom: "Vitres brisees (1 psi)", rayon: blast1psi, mortalite: "~5%", desc: "Degats legers, debris" },
  ];
}

function fmtDist(km: number): string {
  if (km >= 1) return `${km.toFixed(1)} km`;
  return `${Math.round(km * 1000)} m`;
}

function fmtSurface(km: number): string {
  const s = Math.PI * km * km;
  if (s >= 1) return `${s.toFixed(0)} km²`;
  return `${(s * 100).toFixed(0)} hectares`;
}

interface ParsedParams {
  arme: (typeof ARMES)[number];
  ville: (typeof VILLES)[number];
}

function parseSlug(slug: string): ParsedParams | null {
  for (const arme of ARMES) {
    for (const ville of VILLES) {
      if (slug === `${arme.slug}-sur-${ville.slug}`) {
        return { arme, ville };
      }
    }
  }
  return null;
}

export function generateStaticParams() {
  const params: { params: string }[] = [];
  for (const arme of ARMES) {
    for (const ville of VILLES) {
      params.push({ params: `${arme.slug}-sur-${ville.slug}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string }>;
}): Promise<Metadata> {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { arme, ville } = parsed;
  const zones = calculerZones(arme.puissance);

  return {
    title: `${arme.nom} sur ${ville.nom} - Simulation impact nucleaire 2026`,
    description: `Que se passerait-il si ${arme.article} (${arme.puissance >= 1000 ? `${arme.puissance / 1000} Mt` : `${arme.puissance} kT`}) explosait sur ${ville.nom} ? Destruction totale sur ${fmtDist(zones[2].rayon)}, batiments effondres sur ${fmtDist(zones[3].rayon)}, vitres brisees sur ${fmtDist(zones[5].rayon)}. Carte interactive.`,
    keywords: `bombe nucleaire ${ville.nom}, ${arme.nom} ${ville.nom}, impact nucleaire ${ville.nom}, explosion atomique ${ville.nom}, simulation bombe ${ville.nom}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ params: string }>;
}) {
  const { params: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { arme, ville } = parsed;
  const zones = calculerZones(arme.puissance);
  const puissanceLabel = arme.puissance >= 1000 ? `${arme.puissance / 1000} Mt` : `${arme.puissance} kT`;
  const xHiroshima = arme.puissance >= 15 ? Math.round(arme.puissance / 15) : (arme.puissance / 15).toFixed(1);

  const autresVilles = VILLES.filter((v) => v.slug !== ville.slug).slice(0, 5);
  const autresArmes = ARMES.filter((a) => a.slug !== arme.slug).slice(0, 5);

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
                name: `Que se passerait-il si ${arme.article} explosait sur ${ville.nom} ?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Une explosion de ${puissanceLabel} (${xHiroshima}x Hiroshima) sur ${ville.nom} provoquerait une destruction totale dans un rayon de ${fmtDist(zones[2].rayon)}, l'effondrement des batiments sur ${fmtDist(zones[3].rayon)}, des brulures graves sur ${fmtDist(zones[4].rayon)} et des vitres brisees sur ${fmtDist(zones[5].rayon)}. La population de ${ville.nom} (${ville.pop}) serait massivement touchee.`,
                },
              },
            ],
          }),
        }}
      />

      <Breadcrumb
        currentPage={`${arme.nom} sur ${ville.nom}`}
        parentPage="Simulateur Bombe Nucleaire"
        parentHref="/simulateur-bombe-nucleaire"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          ☢️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          {arme.nom} sur {ville.nom}
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Simulation d&apos;une explosion de {puissanceLabel} ({xHiroshima}x Hiroshima) sur {ville.nom}.
      </p>

      {/* Resultat principal */}
      <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-2xl p-8 shadow-lg shadow-red-200/50 mb-8">
        <p className="text-red-200 text-sm mb-1">{arme.nom} ({puissanceLabel})</p>
        <p className="text-3xl font-extrabold mb-1">Impact sur {ville.nom}</p>
        <p className="text-red-200 text-sm">Population : {ville.pop}</p>
        <div className="h-px bg-white/20 my-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {zones.map((z, i) => (
            <div key={i}>
              <p className="text-red-200 text-xs">{z.nom}</p>
              <p className="font-bold text-lg">{fmtDist(z.rayon)}</p>
              <p className="text-red-300 text-xs">Mortalite : {z.mortalite}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau detaille */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Zones d&apos;impact detaillees — {puissanceLabel} sur {ville.nom}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">Zone</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Rayon</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Surface</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">Mortalite</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-3 px-2">
                    <p className="font-medium text-slate-700">{z.nom}</p>
                    <p className="text-xs text-slate-400">{z.desc}</p>
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">{fmtDist(z.rayon)}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{fmtSurface(z.rayon)}</td>
                  <td className="py-3 px-2 text-right font-bold text-red-600">{z.mortalite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contexte */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {arme.nom} : contexte historique
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">{arme.desc}</p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Avec une puissance de <strong>{puissanceLabel}</strong>, cette arme est{" "}
          <strong>{xHiroshima} fois plus puissante</strong> que la bombe larguee
          sur Hiroshima en 1945. Sur {ville.nom} ({ville.pop}), les effets seraient
          devastateurs : destruction totale dans un rayon de {fmtDist(zones[2].rayon)},
          batiments d&apos;habitation effondres sur {fmtDist(zones[3].rayon)}, et des
          vitres brisees jusqu&apos;a {fmtDist(zones[5].rayon)} du point d&apos;impact.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Ces estimations sont basees sur les formules de Glasstone &amp; Dolan
          (loi de Hopkinson) pour une detonation aerienne optimale. Les effets
          reels varieraient selon l&apos;altitude de detonation, la topographie et
          les conditions meteorologiques. Les retombees radioactives (fallout)
          ne sont pas incluses dans cette simulation.
        </p>
      </section>

      {/* Avertissement */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Avertissement :</strong> Ce simulateur est un outil educatif.
          Les donnees sont des approximations theoriques basees sur la physique
          des explosions nucleaires. Il ne constitue pas une prediction reelle.
        </p>
      </div>

      {/* Simulateur interactif */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Simulateur interactif
      </h2>
      <SimulateurNucleaire />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Meme arme, autres villes */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {arme.nom} sur d&apos;autres villes
        </h2>
        <div className="flex flex-wrap gap-2">
          {autresVilles.map((v) => (
            <a
              key={v.slug}
              href={`/simulateur-bombe-nucleaire/${arme.slug}-sur-${v.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {v.nom}
            </a>
          ))}
        </div>
      </section>

      {/* Meme ville, autres armes */}
      <section className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Autres bombes sur {ville.nom}
        </h2>
        <div className="flex flex-wrap gap-2">
          {autresArmes.map((a) => (
            <a
              key={a.slug}
              href={`/simulateur-bombe-nucleaire/${a.slug}-sur-${ville.slug}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              {a.nom}
            </a>
          ))}
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-bombe-nucleaire" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
