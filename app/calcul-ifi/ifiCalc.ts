// Calcul IFI (Impot Fortune Immobiliere) 2026
// Bareme officiel : BOI-PAT-IFI / article 977 CGI

export interface ParamsIFI {
  patrimoineImmoBrut: number; // valeur venale tous biens immo
  dettesImmobilieres: number; // emprunts en cours sur les biens
  residencePrincipale: number; // valeur de la residence principale (abattement 30%)
  autresAbattements: number; // autres exonerations (bois, fermages...)
}

export interface ResultatIFI {
  patrimoineNet: number;
  abattementRP: number; // abattement 30% residence principale
  baseImposable: number;
  ifiBrut: number;
  decote: number; // entre 1.3M et 1.4M
  ifiNet: number;
  estRedevable: boolean;
  detail: Array<{ tranche: string; taux: number; assiette: number; impot: number }>;
}

const SEUIL_IFI = 1300000;
const PLAFOND_DECOTE = 1400000;

// Bareme IFI 2026 (identique 2018-2026)
const TRANCHES = [
  { min: 0,       max: 800000,  taux: 0.0   },
  { min: 800000,  max: 1300000, taux: 0.005 }, // 0.5%
  { min: 1300000, max: 2570000, taux: 0.007 }, // 0.7%
  { min: 2570000, max: 5000000, taux: 0.01  }, // 1.0%
  { min: 5000000, max: 10000000,taux: 0.0125}, // 1.25%
  { min: 10000000,max: Infinity,taux: 0.015 }, // 1.5%
];

export function calculerIFI(p: ParamsIFI): ResultatIFI {
  // Abattement 30% residence principale
  const abattementRP = p.residencePrincipale * 0.3;

  // Patrimoine net = brut - dettes - abattement RP - autres
  const patrimoineNet = Math.max(0, p.patrimoineImmoBrut - p.dettesImmobilieres - abattementRP - p.autresAbattements);

  // Pas d'IFI si < 1,3M
  if (patrimoineNet < SEUIL_IFI) {
    return {
      patrimoineNet,
      abattementRP,
      baseImposable: patrimoineNet,
      ifiBrut: 0,
      decote: 0,
      ifiNet: 0,
      estRedevable: false,
      detail: [],
    };
  }

  // Calcul par tranches (sur patrimoine net imposable, qui inclut la tranche 800K-1.3M a 0.5%)
  let ifiBrut = 0;
  const detail: ResultatIFI["detail"] = [];

  for (const t of TRANCHES) {
    if (patrimoineNet <= t.min) break;
    const assiette = Math.min(patrimoineNet, t.max) - t.min;
    const impotTranche = assiette * t.taux;
    ifiBrut += impotTranche;
    if (t.taux > 0) {
      detail.push({
        tranche: `${t.min.toLocaleString("fr-FR")} - ${t.max === Infinity ? "illimite" : t.max.toLocaleString("fr-FR")} EUR`,
        taux: t.taux * 100,
        assiette,
        impot: impotTranche,
      });
    }
  }

  // Decote pour patrimoines entre 1.3M et 1.4M (art. 977-II CGI)
  let decote = 0;
  if (patrimoineNet >= SEUIL_IFI && patrimoineNet <= PLAFOND_DECOTE) {
    decote = 17500 - 1.25 * patrimoineNet / 100;
    decote = Math.max(0, Math.min(decote, ifiBrut));
  }

  const ifiNet = Math.max(0, ifiBrut - decote);

  return {
    patrimoineNet,
    abattementRP,
    baseImposable: patrimoineNet,
    ifiBrut,
    decote,
    ifiNet,
    estRedevable: ifiNet > 0,
    detail,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
