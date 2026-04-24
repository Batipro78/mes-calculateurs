export interface TaxeFonciereConfig {
  valeurLocative: number | null; // null = estimer depuis surface + type
  surface: number; // m2
  typeBien: "appartement" | "maison" | "terrain";
  ville: string;
  tauxCustom: number | null; // si ville = "autre"
  neuf: boolean;
}

export interface ResultatTaxeFonciere {
  valeurLocative: number;
  valeurLocativeRevisee: number;
  baseImposable: number;
  tauxCommunal: number;
  taxeAnnuelle: number;
  taxeMensuelle: number;
  exoneration: boolean;
  detail: string;
}

// Taux communaux approximatifs 2026 (taux global = commune + interco + departement + TSE)
export const TAUX_VILLES: Record<string, number> = {
  Paris: 13.5,
  Lyon: 30.5,
  Marseille: 40.5,
  Toulouse: 44.5,
  Nice: 27,
  Bordeaux: 52,
  Lille: 45,
  Nantes: 42,
  Strasbourg: 34,
  Montpellier: 47,
};

export const VILLES = Object.keys(TAUX_VILLES);

// Coefficient de revalorisation forfaitaire 2026 (base loi de finances)
const COEFF_REVALORISATION = 1.035;

// Valeur locative estimee par m2/mois selon type
const VL_PAR_M2_MOIS: Record<string, number> = {
  appartement: 12,
  maison: 10,
  terrain: 5,
};

export function estimerValeurLocative(surface: number, typeBien: string): number {
  const tarifMensuel = VL_PAR_M2_MOIS[typeBien] ?? 10;
  return surface * tarifMensuel * 12;
}

export function calculerTaxeFonciere(config: TaxeFonciereConfig): ResultatTaxeFonciere | null {
  const { surface, typeBien, ville, tauxCustom, neuf } = config;

  if (surface <= 0) return null;

  // Valeur locative cadastrale
  const valeurLocative =
    config.valeurLocative && config.valeurLocative > 0
      ? config.valeurLocative
      : estimerValeurLocative(surface, typeBien);

  // Revalorisation annuelle
  const valeurLocativeRevisee = valeurLocative * COEFF_REVALORISATION;

  // Abattement forfaitaire de 50% pour la taxe fonciere sur le bati
  const baseImposable = valeurLocativeRevisee * 0.5;

  // Taux communal
  const tauxCommunal =
    ville === "autre" && tauxCustom !== null ? tauxCustom : TAUX_VILLES[ville] ?? 30;

  // Calcul taxe
  const taxeAnnuelle = baseImposable * (tauxCommunal / 100);
  const taxeMensuelle = taxeAnnuelle / 12;

  // Exoneration 2 ans si construction neuve
  const exoneration = neuf;

  let detail = `Valeur locative cadastrale : ${Math.round(valeurLocative).toLocaleString("fr-FR")} EUR/an`;
  detail += `\nCoefficient revalorisation 2026 : x${COEFF_REVALORISATION}`;
  detail += `\nValeur revisee : ${Math.round(valeurLocativeRevisee).toLocaleString("fr-FR")} EUR`;
  detail += `\nAbattement 50% : base imposable = ${Math.round(baseImposable).toLocaleString("fr-FR")} EUR`;
  detail += `\nTaux global (${ville}) : ${tauxCommunal}%`;
  detail += `\nTaxe fonciere annuelle : ${Math.round(taxeAnnuelle).toLocaleString("fr-FR")} EUR`;
  if (exoneration) {
    detail += `\n⚠ Construction neuve : exoneration possible de 2 ans (sur demande)`;
  }

  return {
    valeurLocative,
    valeurLocativeRevisee,
    baseImposable,
    tauxCommunal,
    taxeAnnuelle: exoneration ? 0 : taxeAnnuelle,
    taxeMensuelle: exoneration ? 0 : taxeMensuelle,
    exoneration,
    detail,
  };
}

// Pour la comparaison multi-villes
export function comparerVilles(
  surface: number,
  typeBien: "appartement" | "maison" | "terrain",
  valeurLocative: number | null
): { ville: string; taux: number; taxeAnnuelle: number }[] {
  return VILLES.map((ville) => {
    const result = calculerTaxeFonciere({
      valeurLocative,
      surface,
      typeBien,
      ville,
      tauxCustom: null,
      neuf: false,
    });
    return {
      ville,
      taux: TAUX_VILLES[ville],
      taxeAnnuelle: result ? result.taxeAnnuelle : 0,
    };
  }).sort((a, b) => a.taxeAnnuelle - b.taxeAnnuelle);
}
