// Calcul Vignette Crit'Air — Classification officielle France

export type CritairClasse = 0 | 1 | 2 | 3 | 4 | 5 | "non-classe";

export interface ResultatCritair {
  classe: CritairClasse;
  couleur: string;
  label: string;
  description: string;
  restrictionsZFE: string[];
  prix: number;
  validite: string;
  conseil: string;
}

// Norme Euro a partir de la date de premiere immatriculation (voitures/utilitaires)
function getEuroFromDate(dateImmat: string): string {
  const [annee, mois] = dateImmat.split("-").map(Number);
  const date = annee * 100 + mois; // AAAAMM pour comparaison simple

  if (date < 199301) return "pre-euro";
  if (date < 199701) return "euro1";
  if (date < 200101) return "euro2";
  if (date < 200601) return "euro3";
  if (date < 201101) return "euro4";
  if (date < 201509) return "euro5";
  return "euro6";
}

// Couleurs officielles des vignettes
const COULEURS: Record<string, string> = {
  "0": "#00B050",
  "1": "#8B5CF6",
  "2": "#EAB308",
  "3": "#F97316",
  "4": "#881337",
  "5": "#6B7280",
  "non-classe": "#1F2937",
};

const LABELS: Record<string, string> = {
  "0": "Crit'Air 0",
  "1": "Crit'Air 1",
  "2": "Crit'Air 2",
  "3": "Crit'Air 3",
  "4": "Crit'Air 4",
  "5": "Crit'Air 5",
  "non-classe": "Non classe",
};

const DESCRIPTIONS: Record<string, string> = {
  "0": "Vehicule zero emission (electrique, hydrogene). Aucune restriction de circulation.",
  "1": "Vehicule essence/hybride Euro 5-6 ou gaz. Acces a toutes les ZFE.",
  "2": "Vehicule essence Euro 4 ou diesel Euro 5-6. Acces a la plupart des ZFE.",
  "3": "Vehicule essence Euro 2-3 ou diesel Euro 4. Restrictions dans certaines ZFE.",
  "4": "Vehicule diesel Euro 3. Interdit dans la plupart des ZFE.",
  "5": "Vehicule diesel Euro 2. Interdit dans toutes les ZFE.",
  "non-classe": "Vehicule immatricule avant 1997. Interdit dans toutes les ZFE. Non eligible a la vignette.",
};

const RESTRICTIONS: Record<string, string[]> = {
  "0": [
    "Circulation libre dans toutes les ZFE",
    "Stationnement gratuit dans certaines villes",
    "Acces aux voies reservees sur autoroute",
  ],
  "1": [
    "Circulation autorisee dans toutes les ZFE",
    "Aucune restriction en 2026",
  ],
  "2": [
    "Circulation autorisee dans la plupart des ZFE",
    "Restrictions possibles lors des pics de pollution",
  ],
  "3": [
    "Interdit dans la ZFE de Paris depuis 2022",
    "Restrictions dans plusieurs grandes metropoles",
    "Interdit lors des pics de pollution niveau 2",
  ],
  "4": [
    "Interdit dans la ZFE de Paris et Lyon",
    "Interdit dans la plupart des ZFE en 2026",
    "Interdit lors de tout pic de pollution",
  ],
  "5": [
    "Interdit dans toutes les ZFE de France",
    "Interdit lors de tout pic de pollution",
    "Vehicule considere comme tres polluant",
  ],
  "non-classe": [
    "Interdit dans toutes les ZFE de France",
    "Aucune vignette disponible",
    "Vehicule non eligible a la vignette Crit'Air",
    "Circulation tres restreinte en agglomeration",
  ],
};

const CONSEILS: Record<string, string> = {
  "0": "Votre vehicule est exemplaire ! Vous beneficiez de tous les avantages ZFE et de stationnement.",
  "1": "Votre vehicule est peu polluant. Aucune restriction prevue a court terme.",
  "2": "Votre vignette est encore acceptee dans la majorite des ZFE. Anticipez un eventuel durcissement.",
  "3": "Votre vehicule est deja interdit dans plusieurs ZFE. Envisagez un remplacement pour circuler librement.",
  "4": "Votre vehicule est interdit dans la plupart des ZFE. Un remplacement est fortement recommande.",
  "5": "Votre vehicule est interdit partout en ZFE. Un remplacement est necessaire pour circuler en ville.",
  "non-classe": "Votre vehicule ne peut pas obtenir de vignette Crit'Air. Il est interdit dans toutes les ZFE.",
};

export function calcCritair(
  typeVehicule: string,
  carburant: string,
  dateImmat: string
): ResultatCritair {
  // Electrique / hydrogene => toujours Crit'Air 0
  if (carburant === "electrique" || carburant === "hydrogene") {
    return buildResult(0);
  }

  const euro = getEuroFromDate(dateImmat);

  // Pre-Euro => non classe
  if (euro === "pre-euro") {
    return buildResult("non-classe");
  }

  // GPL / GNV => Crit'Air 1 (si Euro 1 minimum, deja garanti ici)
  if (carburant === "gpl" || carburant === "gnv") {
    return buildResult(1);
  }

  // Hybride rechargeable : classe selon le moteur thermique
  // On les traite comme essence (le moteur thermique est generalement essence)
  const estEssence = carburant === "essence" || carburant === "hybride-rechargeable";
  const estDiesel = carburant === "diesel";

  if (estEssence) {
    switch (euro) {
      case "euro1":
        return buildResult("non-classe"); // Euro 1 essence = avant 1997 en pratique, mais regle officielle : non classe
      case "euro2":
      case "euro3":
        return buildResult(3);
      case "euro4":
        return buildResult(2);
      case "euro5":
      case "euro6":
        return buildResult(1);
      default:
        return buildResult("non-classe");
    }
  }

  if (estDiesel) {
    switch (euro) {
      case "euro1":
        return buildResult("non-classe");
      case "euro2":
        return buildResult(5);
      case "euro3":
        return buildResult(4);
      case "euro4":
        return buildResult(3);
      case "euro5":
      case "euro6":
        return buildResult(2);
      default:
        return buildResult("non-classe");
    }
  }

  return buildResult("non-classe");
}

function buildResult(classe: CritairClasse): ResultatCritair {
  const key = String(classe);
  return {
    classe,
    couleur: COULEURS[key],
    label: LABELS[key],
    description: DESCRIPTIONS[key],
    restrictionsZFE: RESTRICTIONS[key],
    prix: 3.72, // 3.70 EUR + 0.02 EUR affranchissement
    validite: "Valable pour toute la duree de vie du vehicule (tant qu'il n'est pas modifie).",
    conseil: CONSEILS[key],
  };
}
