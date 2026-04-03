import type { Metadata } from "next";
import SimulateurMobilisation from "./SimulateurMobilisation";
import AdSlot from "../components/AdSlot";
import Breadcrumb from "../components/Breadcrumb";
import RelatedCalculators from "../components/RelatedCalculators";
import WebAppJsonLd from "../components/WebAppJsonLd";

export const metadata: Metadata = {
  title:
    "Suis-je mobilisable ? Simulateur de mobilisation 2026 - Test gratuit",
  description:
    "Testez si vous seriez mobilise en cas de guerre en France. Age, sante, experience militaire, profession : decouvrez votre categorie de mobilisation. Simulateur gratuit base sur le Code de la defense.",
  keywords:
    "mobilisation, guerre France, suis-je mobilisable, service militaire, mobilisation generale, conscription, armee, defense nationale, reserviste, 2026",
};

export default function Page() {
  return (
    <div>
      <WebAppJsonLd name="Simulateur Mobilisation" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qui est mobilisable en France en cas de guerre ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En cas de mobilisation generale, tous les citoyens francais ages de 18 a 72 ans peuvent etre appeles. Les anciens militaires et reservistes sont mobilises en priorite, suivis des hommes de 18 a 35 ans. Certaines professions essentielles (sante, securite) peuvent etre maintenues en poste civil.",
                },
              },
              {
                "@type": "Question",
                name: "La France peut-elle retablir le service militaire obligatoire ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui. Le service militaire a ete suspendu en 1997, pas supprime. L'article L112-2 du Code du service national prevoit qu'il peut etre retabli a tout moment par la loi si les conditions de defense nationale l'exigent. Le Parlement doit voter cette reactivation.",
                },
              },
              {
                "@type": "Question",
                name: "Quelles sont les exemptions de mobilisation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les principales exemptions concernent : les mineurs (moins de 18 ans), les personnes de plus de 72 ans, les personnes en situation de handicap grave, et certaines professions essentielles. Les parents isoles et familles nombreuses peuvent obtenir un report. Une commission medicale militaire decide des exemptions pour raison de sante.",
                },
              },
              {
                "@type": "Question",
                name: "Les femmes sont-elles mobilisables en France ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depuis la professionnalisation de l'armee en 1997, les femmes sont integrees aux forces armees sur la base du volontariat. En cas de mobilisation generale, le Code de la defense ne fait pas de distinction de sexe. Les femmes pourraient donc etre mobilisees, notamment pour des postes de soutien, logistique ou sante.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb currentPage="Simulateur Mobilisation" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🪖
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Suis-je mobilisable ? &mdash; Simulateur 2026
        </h1>
      </div>
      <p className="text-slate-500 mb-8 ml-[52px]">
        Testez votre profil en cas de mobilisation generale en France. Base
        sur le Code de la defense.
      </p>

      <SimulateurMobilisation />

      <AdSlot adSlot="1234567890" adFormat="horizontal" className="my-8" />

      {/* Contenu SEO */}
      <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Mobilisation generale en France : qui est concerne ?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          La <strong>mobilisation generale</strong> est un dispositif
          exceptionnel prevu par le Code de la defense (articles L2141-1 a
          L2142-1). Elle permet a l&apos;Etat de rappeler sous les drapeaux
          l&apos;ensemble des citoyens en age de servir en cas de menace grave
          pour la nation. Ce dispositif n&apos;a pas ete active depuis la Seconde
          Guerre mondiale, mais il reste juridiquement en vigueur.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          Depuis la <strong>suspension du service militaire en 1997</strong>,
          l&apos;armee francaise est professionnelle. Cependant, le service
          national n&apos;a jamais ete supprime : il a ete suspendu. L&apos;article
          L112-2 du Code du service national prevoit qu&apos;il peut etre retabli
          a tout moment par un vote du Parlement. En mars 2026, le President
          Macron a annonce un nouveau <strong>service militaire volontaire</strong>{" "}
          de 10 mois pour les 18-25 ans, avec une remuneration de 800 euros par
          mois.
        </p>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les niveaux de mobilisation
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-bold text-red-800 text-sm">
              Niveau 1 — Forces actives
            </p>
            <p className="text-xs text-red-700 mt-1">
              Militaires d&apos;active et reservistes operationnels. Mobilisables
              immediatement, ils constituent le premier rempart en cas de conflit.
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-bold text-orange-800 text-sm">
              Niveau 2 — Anciens militaires
            </p>
            <p className="text-xs text-orange-700 mt-1">
              Anciens militaires ayant quitte l&apos;armee. Rappelables en
              priorite pour leur formation et experience de combat.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <p className="font-bold text-yellow-800 text-sm">
              Niveau 3 — Mobilisation elargie
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Hommes de 18 a 35 ans aptes, puis extension progressive aux
              tranches d&apos;age superieures selon les besoins.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-bold text-green-800 text-sm">
              Niveau 4 — Mobilisation generale
            </p>
            <p className="text-xs text-green-700 mt-1">
              Tous les citoyens de 18 a 72 ans. Dernier recours, concerne
              l&apos;ensemble de la nation pour un effort de guerre total.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Les professions essentielles
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Certaines professions peuvent etre <strong>maintenues en poste
          civil</strong> meme en cas de mobilisation generale. Il s&apos;agit
          des metiers indispensables au fonctionnement de la nation :
        </p>
        <ul className="space-y-1.5 text-sm text-slate-600 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-slate-400">&#8226;</span>
            <span>
              <strong>Sante</strong> : medecins, infirmiers, pharmaciens —
              essentiels pour soigner les civils et les blesses
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400">&#8226;</span>
            <span>
              <strong>Securite interieure</strong> : policiers, gendarmes,
              pompiers — maintien de l&apos;ordre sur le territoire
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400">&#8226;</span>
            <span>
              <strong>Agriculture</strong> : agriculteurs, eleveurs —
              approvisionnement alimentaire de la population
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400">&#8226;</span>
            <span>
              <strong>Energie et transport</strong> : techniciens EDF, SNCF,
              routiers — infrastructure vitale
            </span>
          </li>
        </ul>

        <h3 className="font-bold text-slate-800 mt-6 mb-3">
          Le contexte geopolitique en 2026
        </h3>
        <p className="text-slate-600 leading-relaxed mb-3">
          Depuis l&apos;invasion de l&apos;Ukraine par la Russie en 2022, les
          questions de defense sont revenues au premier plan en Europe. La France
          a vote une <strong>loi de programmation militaire 2024-2030</strong>{" "}
          prevoyant 413 milliards d&apos;euros pour moderniser ses armees. En
          2026, le budget defense atteint plus de 40 milliards d&apos;euros, et
          les hopitaux ont recu l&apos;instruction de se preparer a un scenario
          de conflit majeur.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Ces elements expliquent pourquoi la question &laquo;&nbsp;suis-je
          mobilisable ?&nbsp;&raquo; est devenue l&apos;une des plus recherchees
          sur Google en France. Ce simulateur vous permet d&apos;evaluer votre
          situation de maniere informative, sur la base des textes en vigueur.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Questions frequentes
        </h2>

        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              La Journee Defense et Citoyennete (JDC) m&apos;oblige-t-elle a combattre ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Non. La JDC (ex-JAPD) est une journee d&apos;information
              obligatoire pour tous les jeunes de 16 a 25 ans. Elle ne constitue
              pas un engagement militaire. Cependant, elle permet au ministere
              des Armees de disposer d&apos;un fichier de recensement utilisable
              en cas de mobilisation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Peut-on refuser la mobilisation ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              En theorie, refuser de se soumettre a un ordre de mobilisation
              generale est un delit puni par le Code de justice militaire. Dans
              la pratique, un conflit majeur s&apos;accompagnerait probablement
              de mesures d&apos;encadrement strictes. L&apos;objection de
              conscience, reconnue depuis 1963, pourrait mener a une affectation
              a un service civil (sante, logistique) plutot qu&apos;au combat.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Je vis a l&apos;etranger, suis-je concerne ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Oui. Les citoyens francais residant a l&apos;etranger restent
              soumis aux obligations du Code de la defense. En cas de
              mobilisation generale, ils pourraient etre rappeles via les
              consulats. Dans la pratique, leur mobilisation depend de la
              capacite logistique a les rapatrier.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Quel est le nouveau service militaire 2026 de Macron ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Le President Macron a annonce en mars 2026 un service militaire
              volontaire de 10 mois pour les jeunes de 18 a 25 ans, remunere
              800 euros par mois. Le dispositif demarre avec 3 000 volontaires
              et vise 42 500 a l&apos;horizon 2035. Il est distinct de la
              mobilisation generale : c&apos;est un engagement volontaire, sans
              envoi a l&apos;etranger.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-1">
              A quel age maximum peut-on etre mobilise ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              La limite d&apos;age est fixee a <strong>72 ans</strong> par le
              Code de la defense pour la mobilisation generale. Au-dela, vous
              etes exempte. Pour les reservistes, la limite varie selon le
              grade : 65 ans pour les officiers generaux, 60 ans pour les
              officiers superieurs, 50 ans pour les sous-officiers.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentSlug="/simulateur-mobilisation" />
      <AdSlot adSlot="0987654321" adFormat="horizontal" className="mt-8" />
    </div>
  );
}
