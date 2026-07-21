import type { Metadata } from "next";
import CalculateurSurfaceCercle from "./CalculateurSurfaceCercle";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-surface-cercle" },
  title: "Calcul Surface Cercle - Aire, Perimetre, Rayon, Diametre",
  description:
    "Calculez la surface (aire) d'un cercle \u00e0 partir du rayon, du diam\u00e8tre ou du p\u00e9rim\u00e8tre. Formule \u03c0 \u00d7 r\u00b2, circonf\u00e9rence, exemples. Gratuit.",
  keywords:
    "calcul surface cercle, aire cercle, surface cercle formule, pi r carre, perimetre cercle, calcul aire disque, surface disque",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "La formule de l'aire d'un cercle",
    paras: [
      "L'aire (ou surface) d'un cercle se calcule avec la formule A = \u03c0 \u00d7 r\u00b2, o\u00f9 r est le rayon et \u03c0 (pi) vaut environ 3,14159. Autrement dit, on multiplie le rayon par lui-m\u00eame, puis par \u03c0.",
      "\u00c0 ne pas confondre avec le p\u00e9rim\u00e8tre (ou circonf\u00e9rence), qui mesure la longueur du contour et se calcule par P = 2 \u00d7 \u03c0 \u00d7 r. L'aire s'exprime en unit\u00e9s carr\u00e9es (cm\u00b2, m\u00b2), le p\u00e9rim\u00e8tre en unit\u00e9s simples (cm, m).",
    ],
  },
  {
    title: "Un exemple pas \u00e0 pas",
    paras: [
      "Prenons un cercle de 5 cm de rayon. Aire = \u03c0 \u00d7 5\u00b2 = \u03c0 \u00d7 25 \u2248 78,54 cm\u00b2. P\u00e9rim\u00e8tre = 2 \u00d7 \u03c0 \u00d7 5 \u2248 31,42 cm.",
      "Si l'on conna\u00eet le diam\u00e8tre (10 cm) au lieu du rayon, on prend d'abord r = 10 \u00f7 2 = 5 cm, puis on applique la m\u00eame formule.",
    ],
  },
  {
    title: "Calculer l'aire \u00e0 partir du diam\u00e8tre ou du p\u00e9rim\u00e8tre",
    paras: [
      "\u00c0 partir du diam\u00e8tre d : le rayon vaut d \u00f7 2, donc l'aire = \u03c0 \u00d7 (d \u00f7 2)\u00b2. Par exemple, pour un diam\u00e8tre de 8 cm : r = 4 cm et A = \u03c0 \u00d7 16 \u2248 50,27 cm\u00b2.",
      "\u00c0 partir du p\u00e9rim\u00e8tre P : on retrouve le rayon avec r = P \u00f7 (2 \u00d7 \u03c0), puis on calcule l'aire. Inversement, pour retrouver le rayon depuis l'aire, on utilise r = \u221a(A \u00f7 \u03c0).",
    ],
  },
  {
    title: "\u00c0 quoi sert le calcul de l'aire d'un cercle ?",
    paras: [
      "Ce calcul revient souvent \u00e0 la maison et au jardin : surface d'un parterre ou d'un rond de pelouse, d'une table ronde, d'un tapis circulaire, d'une terrasse ronde ou d'une piscine vue de dessus.",
      "Il sert aussi \u00e0 conna\u00eetre la section d'un tuyau ou d'un c\u00e2ble, la surface d'une pizza ou d'un moule, ou la quantit\u00e9 de mat\u00e9riau n\u00e9cessaire pour couvrir une zone circulaire.",
    ],
  },
  {
    title: "Erreurs fr\u00e9quentes \u00e0 \u00e9viter",
    paras: [
      "Confondre rayon et diam\u00e8tre : le rayon est la moiti\u00e9 du diam\u00e8tre. Utiliser le diam\u00e8tre dans la formule multiplie l'aire par quatre.",
      "Confondre aire et p\u00e9rim\u00e8tre : l'aire mesure la surface int\u00e9rieure (en unit\u00e9s carr\u00e9es), le p\u00e9rim\u00e8tre la longueur du contour.",
      "Oublier d'\u00e9lever le rayon au carr\u00e9 : la formule contient r\u00b2, pas r.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer la surface d'un cercle ?",
    a: "La surface (aire) d'un cercle = \u03c0 \u00d7 rayon au carr\u00e9 (\u03c0 \u00d7 r\u00b2). Si le rayon est de 5 cm, la surface = 3,14159 \u00d7 25 = 78,54 cm\u00b2. Si vous connaissez le diam\u00e8tre, divisez-le par 2 pour obtenir le rayon.",
  },
  {
    q: "Quelle est la formule de l'aire d'un cercle ?",
    a: "La formule est A = \u03c0 \u00d7 r\u00b2, o\u00f9 r est le rayon et \u03c0 vaut environ 3,14159. On multiplie le rayon par lui-m\u00eame, puis par \u03c0. Le r\u00e9sultat est une surface, exprim\u00e9e en unit\u00e9s carr\u00e9es (cm\u00b2, m\u00b2).",
  },
  {
    q: "Comment calculer l'aire d'un cercle avec le diam\u00e8tre ?",
    a: "Divisez d'abord le diam\u00e8tre par 2 pour obtenir le rayon, puis appliquez A = \u03c0 \u00d7 r\u00b2. Exemple avec un diam\u00e8tre de 8 cm : r = 4 cm, donc A = \u03c0 \u00d7 16 \u2248 50,27 cm\u00b2.",
  },
  {
    q: "Comment calculer le p\u00e9rim\u00e8tre d'un cercle ?",
    a: "Le p\u00e9rim\u00e8tre (circonf\u00e9rence) d'un cercle = 2 \u00d7 \u03c0 \u00d7 rayon, ou \u03c0 \u00d7 diam\u00e8tre. Si le rayon est de 5 cm, le p\u00e9rim\u00e8tre = 2 \u00d7 3,14159 \u00d7 5 = 31,42 cm.",
  },
  {
    q: "Comment trouver le rayon \u00e0 partir de la surface ?",
    a: "On inverse la formule de l'aire : r = \u221a(A \u00f7 \u03c0). Par exemple, pour une aire de 78,54 cm\u00b2 : r = \u221a(78,54 \u00f7 3,14159) = \u221a25 = 5 cm.",
  },
  {
    q: "Quelle est la diff\u00e9rence entre rayon et diam\u00e8tre ?",
    a: "Le rayon est la distance du centre au bord du cercle. Le diam\u00e8tre est la distance d'un bord \u00e0 l'autre en passant par le centre. Le diam\u00e8tre est donc \u00e9gal \u00e0 2 fois le rayon. Dans les formules, on utilise toujours le rayon.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Surface Cercle" />
      <Breadcrumb currentPage="Surface Cercle" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">⭕</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Surface Cercle</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez l&apos;aire, le perimetre, le rayon et le diametre d&apos;un cercle.</p>
      <CalculateurSurfaceCercle />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tableau de surfaces</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Rayon</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Diametre</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Surface</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Perimetre</th>
            </tr></thead>
            <tbody>
              {[1,2,3,4,5,6,7,8,9,10,15,20,25,50,100].map((r) => (
                <tr key={r} className="border-b border-slate-100">
                  <td className="py-2.5 px-2 font-semibold text-slate-700">{r}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{r * 2}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-blue-600">{(Math.PI * r * r).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                  <td className="py-2.5 px-2 text-right text-slate-500">{(2 * Math.PI * r).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Sections de contenu detaille (prose en chaines JS) */}
      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-8 bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.paras.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <HowToJsonLd
        name="Calculer la surface et le perimetre d'un cercle"
        steps={[
          { name: "Saisir le rayon, le diametre ou le perimetre", text: "Entrer l'une des trois mesures connues : rayon (r), diametre (d = 2 x r) ou perimetre (P = 2 x pi x r). Le calculateur deduit automatiquement les deux autres valeurs." },
          { name: "Appliquer la formule de l'aire", text: "Aire = pi x r carre (pi x r x r). Exemple : rayon 5 cm -> Aire = 3,14159 x 25 = 78,54 cm carre. À partir du diametre 8 cm : r = 4 cm -> Aire = pi x 16 = 50,27 cm carre." },
          { name: "Lire le perimetre et vérifier les unités", text: "Perimetre (circonference) = 2 x pi x r. Exemple : rayon 5 cm -> Perimetre = 2 x 3,14159 x 5 = 31,42 cm. L'aire s'exprime en unités carrees (cm carre, m carre), le perimetre en unités simples (cm, m)." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-surface-cercle" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
