import type { Metadata } from "next";
import CalculZakatFitr from "./CalculZakatFitr";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";
import Faq, { FaqItem } from "../components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/calcul-zakat-al-fitr" },
  title: "Calcul Zakat al-Fitr 2026 - Aumône fin Ramadan",
  description:
    "Calculez votre Zakat al-Fitr pour le foyer. Montants officiels Mosquée de Paris (7 €) et CFCM (9 €). À verser avant la prière de l&apos;Aïd al-Fitr. Tous les membres comptent.",
  keywords:
    "zakat al fitr 2026, aumone fin ramadan, mosquee paris cfcm, aid al fitr, zakat fitr montant, obligation religieuse",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce que la Zakat al-Fitr ?",
    a: "La Zakat al-Fitr est une aumône obligatoire (Zakat) que doit verser tout musulman ayant les moyens avant la prière de l'Aïd al-Fitr (fête marquant la fin du Ramadan). Elle purifie le jeûne et aide les personnes nécessiteuses. Contrairement à la Zakat annuelle, la Zakat al-Fitr est due par chaque membre du foyer.",
  },
  {
    q: "Pourquoi 7 € ou 9 € selon la source ?",
    a: "La Zakat al-Fitr se calcule traditionnellement en sa' (~2.5-3 kg) de denrée de base. Les montants officiels 2026 varient selon l'interprétation : la Mosquée de Paris retient 7 € par personne, tandis que le CFCM (Conseil Français du Culte Musulman) retient 9 €. Les deux sont considérés comme valides selon les écoles juridiques islamiques. Vérifiez avec votre mosquée locale le montant retenu.",
  },
  {
    q: "Qui doit payer la Zakat al-Fitr ?",
    a: "Le chef de famille paie la Zakat al-Fitr pour tous les membres du foyer à sa charge, y compris les enfants (même nourrissons), les parents âgés et les personnes dépendantes. Chaque personne à charge = 1 part de Zakat al-Fitr.",
  },
  {
    q: "Quand faut-il verser la Zakat al-Fitr ?",
    a: "La Zakat al-Fitr doit être versée avant la prière de l'Aïd al-Fitr. Elle peut être versée dès le début du Ramadan, quelques jours avant l'Aïd est courant. Il est recommandé de verser quelques jours avant plutôt que le jour même, pour assurer que l'argent parvient aux nécessiteux à temps.",
  },
];

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Calcul Zakat al-Fitr - Aumône fin Ramadan" />
      <Breadcrumb currentPage="Calcul Zakat al-Fitr - Aumône fin Ramadan" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
          📿
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
          Calcul Zakat al-Fitr - Aumône fin Ramadan
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Calculez le montant exact de Zakat al-Fitr à verser pour votre foyer.
      </p>

      <CalculZakatFitr />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Doctrine et sources officielles
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Mosquée de Paris */}
          <div>
            <h3 className="font-bold text-emerald-700 mb-3">Mosquée de Paris</h3>
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              <strong>Montant 2026 :</strong> 7 € par personne
            </p>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              La Mosquée de Paris, la plus ancienne institution musulmane de France, est l&apos;une des
              références majeures pour les montants de Zakat al-Fitr. Elle se fonde sur le hadith
              du Prophète Muhammad (paix soit sur lui) rapporté par Boukhari.
            </p>
            <a
              href="https://www.mosquee-de-paris.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Visiter le site →
            </a>
          </div>

          {/* CFCM */}
          <div>
            <h3 className="font-bold text-emerald-700 mb-3">CFCM (Conseil Français du Culte Musulman)</h3>
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              <strong>Montant 2026 :</strong> 9 € par personne
            </p>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Le CFCM regroupe les principales fédérations islamiques en France. Son montant de 9 € par
              personne est également reconnu comme valide par les écoles juridiques islamiques.
            </p>
            <a
              href="https://www.cfcm.asso.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Visiter le site →
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Qui paie, pour qui ?
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Le chef de famille versera la Zakat al-Fitr pour <strong>tous les membres à sa charge</strong>, indépendamment de leur âge ou de leur relation.
        </p>
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Comptent pour 1 part chacun :</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>L&apos;époux ou l&apos;épouse</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Tous les enfants (y compris nourrissons)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Parents ou beaux-parents à charge</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Autres personnes dépendantes (apprentis, etc.)</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Quand verser ?
        </h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          La Zakat al-Fitr doit être versée <strong>avant la prière de l&apos;Aïd al-Fitr</strong> (fête marquant la fin du Ramadan).
        </p>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
          <h3 className="font-semibold text-emerald-800 mb-3">Recommandations :</h3>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li className="flex gap-2">
              <span>→</span>
              <span>Dès le début du Ramadan, vous pouvez calculer et préparer votre Zakat al-Fitr.</span>
            </li>
            <li className="flex gap-2">
              <span>→</span>
              <span>Quelques jours avant l&apos;Aïd : moment idéal pour verser, afin que l&apos;argent parvienne aux nécessiteux à temps.</span>
            </li>
            <li className="flex gap-2">
              <span>→</span>
              <span>Le jour de l&apos;Aïd avant la prière : moment limite (après c&apos;est trop tard).</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          À qui verser la Zakat al-Fitr ?
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          La Zakat al-Fitr est versée aux <strong>personnes nécessiteuses</strong> de votre communauté. Vous pouvez :
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Via une mosquée</h3>
            <p className="text-sm text-slate-600">
              La plupart des mosquées collectent la Zakat al-Fitr et la distribuent à des familles en difficulté.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Directement</h3>
            <p className="text-sm text-slate-600">
              Vous pouvez aussi verser directement à des familles nécessiteuses ou à des associations caritatives musulmanes.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-emerald-50 rounded-2xl border border-emerald-200 p-8">
        <p className="text-sm text-emerald-800 leading-relaxed">
          <strong>⚠️ Disclaimer :</strong> Les montants 2026 présentés (Mosquée de Paris 7 € et CFCM 9 €) sont à titre informatif. Ils peuvent varier selon les années et les instituts islamiques.
          <strong> Vérifiez auprès de votre mosquée locale ou de votre référent religieux le montant exact retenu pour votre région en 2026.</strong> Cette application n&apos;est qu&apos;une aide au calcul.
        </p>
      </section>

      <Faq items={FAQ_ITEMS} />
      <RelatedCalculators currentSlug="/calcul-zakat-al-fitr" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
