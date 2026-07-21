import type { Metadata } from "next";
import CalculateurVolumeCylindre from "./CalculateurVolumeCylindre";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";
import HowToJsonLd from "../components/HowToJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-volume-cylindre" },
  title: "Calcul Volume Cylindre - Formule, Surface, Litres",
  description:
    "Calculez le volume d'un cylindre \u00e0 partir du rayon et de la hauteur. Formule \u03c0 r\u00b2 h, surface lat\u00e9rale et totale, conversion en litres. Avec exemples. Gratuit.",
  keywords:
    "calcul volume cylindre, volume cylindre formule, pi r2 h, surface cylindre, volume en litres, cylindre calcul, calculer volume cylindre",
};

// Prose en chaines JS (guillemets doubles) pour eviter les soucis d'apostrophe.
const SECTIONS: { title: string; paras: string[] }[] = [
  {
    title: "La formule du volume d'un cylindre",
    paras: [
      "Le volume d'un cylindre se calcule avec la formule V = \u03c0 \u00d7 r\u00b2 \u00d7 h, o\u00f9 r est le rayon de la base circulaire et h la hauteur. Le nombre \u03c0 (pi) vaut environ 3,14159.",
      "Le principe est simple : on calcule d'abord l'aire du disque de base (\u03c0 \u00d7 r\u00b2), puis on la multiplie par la hauteur. Le r\u00e9sultat s'exprime dans l'unit\u00e9 de longueur \u00e9lev\u00e9e au cube (cm\u00b3, m\u00b3, etc.).",
      "Point de vigilance : si l'\u00e9nonc\u00e9 donne le diam\u00e8tre et non le rayon, le rayon en est la moiti\u00e9 (r = d \u00f7 2). Une erreur sur ce point fausse tout le calcul.",
    ],
  },
  {
    title: "Un exemple concret, \u00e9tape par \u00e9tape",
    paras: [
      "Prenons un cylindre de 5 cm de rayon et 10 cm de hauteur. \u00c9tape 1 : l'aire de la base = \u03c0 \u00d7 5\u00b2 = \u03c0 \u00d7 25 \u2248 78,54 cm\u00b2. \u00c9tape 2 : le volume = 78,54 \u00d7 10 = 785,4 cm\u00b3. \u00c9tape 3 : en litres, 785,4 \u00f7 1 000 \u2248 0,785 L.",
      "Si l'on ne conna\u00eet que le diam\u00e8tre (10 cm dans cet exemple), on prend r = 5 cm et on applique exactement la m\u00eame formule. Le r\u00e9sultat est identique.",
    ],
  },
  {
    title: "Surface lat\u00e9rale et surface totale",
    paras: [
      "La surface lat\u00e9rale (le \u00ab tour \u00bb du cylindre, sans les deux disques) vaut 2 \u00d7 \u03c0 \u00d7 r \u00d7 h. Pour notre exemple : 2 \u00d7 \u03c0 \u00d7 5 \u00d7 10 \u2248 314,16 cm\u00b2.",
      "La surface totale ajoute les deux disques de base : 2 \u00d7 \u03c0 \u00d7 r\u00b2 + 2 \u00d7 \u03c0 \u00d7 r \u00d7 h. Soit ici 2 \u00d7 \u03c0 \u00d7 25 + 314,16 \u2248 157,08 + 314,16 = 471,24 cm\u00b2. Ce calcul est utile pour estimer la quantit\u00e9 de peinture, d'\u00e9tiquette ou de t\u00f4le n\u00e9cessaire pour recouvrir l'objet.",
    ],
  },
  {
    title: "\u00c0 quoi sert le calcul du volume d'un cylindre ?",
    paras: [
      "Ce calcul est tr\u00e8s courant dans la vie quotidienne et le bricolage : conna\u00eetre la capacit\u00e9 d'une cuve, d'une citerne ou d'un r\u00e9servoir d'eau ; estimer le volume d'une piscine ronde ; mesurer la contenance d'un verre, d'une casserole ou d'un seau.",
      "Il sert aussi \u00e0 calculer le volume d'eau contenu dans un tuyau, la quantit\u00e9 de b\u00e9ton n\u00e9cessaire pour couler un poteau cylindrique, ou encore la contenance d'un f\u00fbt ou d'un silo.",
    ],
  },
  {
    title: "Erreurs fr\u00e9quentes \u00e0 \u00e9viter",
    paras: [
      "Confondre le rayon et le diam\u00e8tre : le rayon est la moiti\u00e9 du diam\u00e8tre. Utiliser le diam\u00e8tre \u00e0 la place du rayon multiplie le volume par quatre.",
      "Oublier d'\u00e9lever le rayon au carr\u00e9 : la formule contient r\u00b2, pas r.",
      "M\u00e9langer les unit\u00e9s : si le rayon est en centim\u00e8tres, la hauteur doit l'\u00eatre aussi. Convertissez tout dans la m\u00eame unit\u00e9 avant de calculer.",
      "Pour convertir en litres, retenez que 1 litre = 1 dm\u00b3 = 1 000 cm\u00b3. Un volume en cm\u00b3 se divise donc par 1 000 pour obtenir des litres.",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment calculer le volume d'un cylindre ?",
    a: "Volume = \u03c0 \u00d7 rayon\u00b2 \u00d7 hauteur. Si le rayon est de 5 cm et la hauteur de 10 cm : V = 3,14159 \u00d7 25 \u00d7 10 = 785,40 cm\u00b3 (soit 0,785 litre).",
  },
  {
    q: "Quelle est la formule du volume d'un cylindre ?",
    a: "La formule est V = \u03c0 \u00d7 r\u00b2 \u00d7 h, o\u00f9 r est le rayon de la base et h la hauteur. On calcule l'aire du disque de base (\u03c0 \u00d7 r\u00b2) puis on la multiplie par la hauteur.",
  },
  {
    q: "Comment calculer le volume d'un cylindre \u00e0 partir du diam\u00e8tre ?",
    a: "Divisez d'abord le diam\u00e8tre par 2 pour obtenir le rayon (r = d \u00f7 2), puis appliquez la formule V = \u03c0 \u00d7 r\u00b2 \u00d7 h. Exemple avec un diam\u00e8tre de 10 cm et une hauteur de 10 cm : r = 5 cm, donc V = \u03c0 \u00d7 25 \u00d7 10 \u2248 785,4 cm\u00b3.",
  },
  {
    q: "Comment calculer la capacit\u00e9 d'une cuve cylindrique en litres ?",
    a: "Calculez le volume en d\u00e9cim\u00e8tres cubes (dm\u00b3) : exprimez le rayon et la hauteur en dm, puis appliquez V = \u03c0 \u00d7 r\u00b2 \u00d7 h. Le r\u00e9sultat est directement en litres, car 1 dm\u00b3 = 1 litre. Vous pouvez aussi calculer en cm\u00b3 puis diviser par 1 000.",
  },
  {
    q: "Comment convertir un volume en litres ?",
    a: "1 litre = 1 000 cm\u00b3 = 1 dm\u00b3. Divisez le volume en cm\u00b3 par 1 000 pour obtenir des litres. Exemple : 5 000 cm\u00b3 = 5 litres.",
  },
  {
    q: "Comment calculer la surface totale d'un cylindre ?",
    a: "La surface totale vaut 2 \u00d7 \u03c0 \u00d7 r\u00b2 + 2 \u00d7 \u03c0 \u00d7 r \u00d7 h : les deux disques de base plus la surface lat\u00e9rale. Pour un rayon de 5 cm et une hauteur de 10 cm : 157,08 + 314,16 \u2248 471,24 cm\u00b2.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Volume Cylindre" />
      <Breadcrumb currentPage="Volume Cylindre" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-sm">🛢️</div>
        <h1 className="text-3xl font-extrabold text-slate-800">Calcul Volume Cylindre</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">Calculez le volume, la surface laterale et totale d&apos;un cylindre. Conversion en litres.</p>
      <CalculateurVolumeCylindre />
      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tableau de volumes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Rayon</th>
              <th className="text-left py-3 px-2 text-slate-500 font-medium">Hauteur</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Volume</th>
              <th className="text-right py-3 px-2 text-slate-500 font-medium">Litres</th>
            </tr></thead>
            <tbody>
              {[[2,5],[3,8],[5,10],[5,20],[10,15],[10,30],[15,20],[20,40],[25,50]].map(([r,h]) => {
                const v = Math.PI * r * r * h;
                return (
                  <tr key={`${r}-${h}`} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 text-slate-700">{r}</td>
                    <td className="py-2.5 px-2 text-slate-700">{h}</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-teal-600">{v.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}</td>
                    <td className="py-2.5 px-2 text-right text-slate-500">{(v / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} L</td>
                  </tr>
                );
              })}
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
        name="Calculer le volume d'un cylindre"
        steps={[
          { name: "Saisir le rayon et la hauteur", text: "Relever le rayon r de la base circulaire (en cm, dm ou m) et la hauteur h. Si seul le diametre d est connu, diviser par 2 pour obtenir le rayon (r = d / 2). Exprimer les deux mesures dans la même unité." },
          { name: "Calculer l'aire de la base", text: "Aire de la base = pi x r x r. Exemple : r = 5 cm donne pi x 25 = 78,54 cm2." },
          { name: "Calculer le volume", text: "Volume V = pi x r x r x h. Exemple : 78,54 x 10 cm = 785,4 cm3. Pour convertir en litres, diviser par 1 000 : 785,4 / 1 000 = 0,785 L." },
          { name: "Lire la surface laterale (optionnel)", text: "Surface laterale = 2 x pi x r x h. Surface totale (avec les 2 disques) = 2 x pi x r x r + 2 x pi x r x h. Exemple r=5 cm, h=10 cm : surface totale = 157,08 + 314,16 = 471,24 cm2." },
        ]}
      />

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-volume-cylindre" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
