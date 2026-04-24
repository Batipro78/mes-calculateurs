// Simulateur LOA (Location avec Option d'Achat) vs LLD (Location Longue Duree)

export interface ParamsLoaLld {
  prixVehicule: number;
  apportInitial: number;
  loyerMensuel: number;
  dureeMonths: number;
  valeurResiduelleLOA: number; // option d'achat (LOA uniquement)
  kmParAn: number; // pour info, pas de calcul impact direct
}

export interface ResultatLoaLld {
  coutTotalLOA: number; // apport + loyers + rachat
  coutTotalLLD: number; // apport + loyers
  coutSansRachatLOA: number; // LOA sans lever option (restitution)
  differenceAvecRachat: number;
  ratioRachatValeur: number; // valeur residuelle / prix initial
  verdictLocation: "LOA" | "LLD" | "equivalent";
}

export function calculerLoaLld(p: ParamsLoaLld): ResultatLoaLld {
  const totalLoyers = p.loyerMensuel * p.dureeMonths;

  const coutSansRachatLOA = p.apportInitial + totalLoyers;
  const coutTotalLOA = coutSansRachatLOA + p.valeurResiduelleLOA;
  const coutTotalLLD = p.apportInitial + totalLoyers; // pas de rachat

  const differenceAvecRachat = coutTotalLOA - coutTotalLLD;
  const ratioRachatValeur = p.prixVehicule > 0 ? p.valeurResiduelleLOA / p.prixVehicule : 0;

  // Verdict simple : si on veut garder la voiture, LOA est meilleur que rachat direct
  // sinon LLD plus simple
  let verdict: ResultatLoaLld["verdictLocation"] = "equivalent";
  if (Math.abs(coutSansRachatLOA - coutTotalLLD) < 500) {
    verdict = "equivalent";
  } else if (coutSansRachatLOA < coutTotalLLD) {
    verdict = "LOA";
  } else {
    verdict = "LLD";
  }

  return {
    coutTotalLOA,
    coutTotalLLD,
    coutSansRachatLOA,
    differenceAvecRachat,
    ratioRachatValeur,
    verdictLocation: verdict,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
