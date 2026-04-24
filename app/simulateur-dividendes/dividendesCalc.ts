// Simulateur dividendes 2026 - PFU (flat tax) vs bareme progressif
// Source : articles 117 quater, 158-3 et 200 A du CGI

export type OptionFiscale = "pfu" | "bareme";

export interface ParamsDividendes {
  dividendesBruts: number; // montant distribue annuel
  tmi: number; // tranche marginale imposition en %
  optionFiscale: OptionFiscale;
  gerantMajoritaire: boolean; // cotisations TNS si majoritaire dans EURL/SARL
}

export interface ResultatDividendes {
  // PFU (flat tax 30%)
  pfu_ir: number;
  pfu_ps: number;
  pfu_total: number;
  pfu_net: number;
  pfu_tauxEffectif: number;
  // Bareme progressif
  bareme_abattement: number;
  bareme_baseImposable: number;
  bareme_ir: number;
  bareme_ps: number; // 17.2% sur le brut (sans abattement)
  bareme_total: number;
  bareme_net: number;
  bareme_tauxEffectif: number;
  // Cotisations sociales TNS si gerant majoritaire
  cotisationsTNS: number;
  // Meilleur choix
  meilleurChoix: "pfu" | "bareme";
  economieMeilleurChoix: number;
}

const PFU_IR = 12.8;
const PFU_PS = 17.2;
const PS_BAREME = 17.2;
const ABATTEMENT_BAREME = 40; // %
const COTISATIONS_TNS_TAUX = 0.2; // ~20% pour part > 10% capital (EURL/SARL gerant majoritaire)

export function calculerDividendes(p: ParamsDividendes): ResultatDividendes {
  const div = p.dividendesBruts;

  // PFU
  const pfu_ir = div * (PFU_IR / 100);
  const pfu_ps = div * (PFU_PS / 100);
  const pfu_total = pfu_ir + pfu_ps;
  const pfu_net = div - pfu_total;
  const pfu_tauxEffectif = div > 0 ? (pfu_total / div) * 100 : 0;

  // Bareme progressif
  const bareme_abattement = div * (ABATTEMENT_BAREME / 100);
  const bareme_baseImposable = div - bareme_abattement;
  const bareme_ir = bareme_baseImposable * (p.tmi / 100);
  const bareme_ps = div * (PS_BAREME / 100); // PS sur le brut, pas sur la base apres abattement
  const bareme_total = bareme_ir + bareme_ps;
  const bareme_net = div - bareme_total;
  const bareme_tauxEffectif = div > 0 ? (bareme_total / div) * 100 : 0;

  // Cotisations sociales TNS (gerant majoritaire EURL/SARL)
  // Plafond : au-dela de 10% du capital + primes d'emission + apports en compte courant
  // Ici simplification : 20% si gerant majoritaire
  const cotisationsTNS = p.gerantMajoritaire ? div * COTISATIONS_TNS_TAUX : 0;

  const meilleurChoix: "pfu" | "bareme" = pfu_total <= bareme_total ? "pfu" : "bareme";
  const economieMeilleurChoix = Math.abs(pfu_total - bareme_total);

  return {
    pfu_ir, pfu_ps, pfu_total, pfu_net, pfu_tauxEffectif,
    bareme_abattement, bareme_baseImposable, bareme_ir, bareme_ps, bareme_total, bareme_net, bareme_tauxEffectif,
    cotisationsTNS,
    meilleurChoix, economieMeilleurChoix,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
