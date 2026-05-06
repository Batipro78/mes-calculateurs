import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import CalculateurSalairePlenit from "../../salaire-brut-net/CalculateurSalairePlenit";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salaire Brut / Net — Widget Plenit'Finances",
  description:
    "Convertisseur brut/net pour cadre, non-cadre, fonction publique. Widget integrable.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/embed/salaire-brut-net-plenit" },
};

export default function EmbedPagePlenit() {
  return (
    <div data-embed="true" className={montserrat.className}>
      <CalculateurSalairePlenit />
      <p className="mt-4 text-xs text-slate-400 text-center">
        Widget fourni par{" "}
        <a
          href="https://mescalculateurs.fr/salaire-brut-net?utm_source=embed&utm_medium=iframe&utm_campaign=plenit-finances"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-[#F39200] underline"
        >
          mescalculateurs.fr
        </a>
      </p>
    </div>
  );
}
