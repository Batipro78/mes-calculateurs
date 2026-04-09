export interface ResultatRevenusFonciers {
  regime: "micro" | "reel";
  // Micro-foncier
  abattement?: number;
  // Reel
  chargesDeductibles?: number;
  deficitFoncier?: number;
  // Commun
  revenuImposable: number;
  impotRevenu: number;
  prelevementsSociaux: number;
  totalImposition: number;
  rendementNet: number;
}

export interface ComparaisonRegimes {
  micro: ResultatRevenusFonciers;
  reel: ResultatRevenusFonciers;
  meilleurRegime: "micro" | "reel";
  economie: number;
}

export interface ResultatComplet extends ResultatRevenusFonciers {
  comparaison: ComparaisonRegimes;
}

function calcMicro(
  loyersAnnuels: number,
  tmi: number
): ResultatRevenusFonciers {
  const abattement = loyersAnnuels * 0.3;
  const revenuImposable = loyersAnnuels * 0.7;
  const impotRevenu = Math.max(0, revenuImposable) * (tmi / 100);
  const prelevementsSociaux = Math.max(0, revenuImposable) * 0.172;
  const totalImposition = impotRevenu + prelevementsSociaux;
  const rendementNet =
    loyersAnnuels > 0
      ? ((loyersAnnuels - totalImposition) / loyersAnnuels) * 100
      : 0;

  return {
    regime: "micro",
    abattement,
    revenuImposable,
    impotRevenu,
    prelevementsSociaux,
    totalImposition,
    rendementNet,
  };
}

function calcReel(
  loyersAnnuels: number,
  charges: number,
  interetsEmprunt: number,
  travauxDeductibles: number,
  tmi: number
): ResultatRevenusFonciers {
  const chargesDeductibles = charges + interetsEmprunt + travauxDeductibles;
  const revenuBrut = loyersAnnuels - chargesDeductibles;

  let deficitFoncier: number | undefined;
  let revenuImposable = revenuBrut;

  if (revenuBrut < 0) {
    // Deficit foncier : imputable sur revenu global dans la limite de 10 700 €/an
    deficitFoncier = Math.min(Math.abs(revenuBrut), 10700);
    revenuImposable = 0;
  }

  const impotRevenu = revenuImposable * (tmi / 100);
  const prelevementsSociaux = revenuImposable * 0.172;
  const totalImposition = impotRevenu + prelevementsSociaux;
  const rendementNet =
    loyersAnnuels > 0
      ? ((loyersAnnuels - totalImposition) / loyersAnnuels) * 100
      : 0;

  return {
    regime: "reel",
    chargesDeductibles,
    deficitFoncier,
    revenuImposable,
    impotRevenu,
    prelevementsSociaux,
    totalImposition,
    rendementNet,
  };
}

export function calcRevenusFonciers(
  loyersAnnuels: number,
  charges: number,
  interetsEmprunt: number,
  travauxDeductibles: number,
  regime: "micro" | "reel",
  tmi: number
): ResultatComplet {
  const micro = calcMicro(loyersAnnuels, tmi);
  const reel = calcReel(
    loyersAnnuels,
    charges,
    interetsEmprunt,
    travauxDeductibles,
    tmi
  );

  const meilleurRegime =
    reel.totalImposition <= micro.totalImposition ? "reel" : "micro";
  const economie = Math.abs(micro.totalImposition - reel.totalImposition);

  const comparaison: ComparaisonRegimes = {
    micro,
    reel,
    meilleurRegime,
    economie,
  };

  const base = regime === "micro" ? micro : reel;

  return {
    ...base,
    comparaison,
  };
}
