// Simulateur rente viagere (assurance-vie / PER / DSK)
// Formule : rente annuelle = capital × taux de conversion selon age

export interface ParamsRente {
  capital: number;
  ageAuVersement: number; // age au 1er versement de la rente
  typeContrat: "assurance-vie" | "per" | "dsk";
  reversionConjoint: boolean; // rente reversion au conjoint (~80% typiquement)
}

export interface ResultatRente {
  tauxConversion: number; // %
  renteAnnuelle: number;
  renteMensuelle: number;
  abattementFiscal: number; // %
  fractionImposable: number; // % de la rente soumise a IR
  impotRentier: number; // par an, TMI 30% + 17.2% PS (approximatif)
  renteNetteAnnuelle: number;
  renteNetteMensuelle: number;
}

// Taux de conversion approximatifs (base taux technique ~1%)
// Source : baremes INSEE + tables de mortalite TGH05/TGF05
export function tauxConversion(age: number, reversion: boolean): number {
  // Formule simplifiee : plus on est age, plus le taux est eleve (esperance de vie restante plus courte)
  const baseRate: Record<number, number> = {
    50: 3.3, 55: 3.8, 60: 4.3, 65: 4.9, 70: 5.7, 75: 6.8, 80: 8.3, 85: 10.5,
  };
  // Interpolation lineaire
  const ages = Object.keys(baseRate).map(Number).sort((a, b) => a - b);
  let rate = baseRate[ages[0]];
  if (age <= ages[0]) rate = baseRate[ages[0]];
  else if (age >= ages[ages.length - 1]) rate = baseRate[ages[ages.length - 1]];
  else {
    for (let i = 0; i < ages.length - 1; i++) {
      if (age >= ages[i] && age <= ages[i + 1]) {
        const ratio = (age - ages[i]) / (ages[i + 1] - ages[i]);
        rate = baseRate[ages[i]] + (baseRate[ages[i + 1]] - baseRate[ages[i]]) * ratio;
        break;
      }
    }
  }
  // Reversion conjoint : reduction de ~15% du taux (car la rente peut durer plus longtemps)
  if (reversion) rate *= 0.85;
  return rate;
}

// Fraction imposable de la rente (rente a titre onereux - art. 158-6 CGI)
// Plus on est age au 1er versement, moins la fraction imposable est elevee
export function fractionImposable(ageAuVersement: number): number {
  if (ageAuVersement < 50) return 70; // 30% abattement
  if (ageAuVersement < 60) return 50; // 50% abattement
  if (ageAuVersement < 70) return 40; // 60% abattement
  return 30; // 70% abattement (70 ans et +)
}

export function calculerRente(p: ParamsRente): ResultatRente {
  const tc = tauxConversion(p.ageAuVersement, p.reversionConjoint);
  const renteAnnuelle = p.capital * (tc / 100);
  const renteMensuelle = renteAnnuelle / 12;

  let fractionImp = fractionImposable(p.ageAuVersement);
  // PER : exoneration si sortie en rente (ou imposition integrale selon options)
  // Simplification : PER = traitement identique pour la demo
  if (p.typeContrat === "per") {
    fractionImp = 100; // PER : rente integralement imposable (sauf cas particulier)
  }

  const abattement = 100 - fractionImp;
  // Approximation fiscalite : TMI 30% + 17,2% PS sur la fraction imposable
  const tauxFiscal = (30 + 17.2) / 100;
  const impotRentier = renteAnnuelle * (fractionImp / 100) * tauxFiscal;

  const renteNetteAnnuelle = renteAnnuelle - impotRentier;
  const renteNetteMensuelle = renteNetteAnnuelle / 12;

  return {
    tauxConversion: tc,
    renteAnnuelle,
    renteMensuelle,
    abattementFiscal: abattement,
    fractionImposable: fractionImp,
    impotRentier,
    renteNetteAnnuelle,
    renteNetteMensuelle,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
