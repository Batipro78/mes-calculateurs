// Girardin industriel (art. 199 undecies B CGI) — logique pure
// Source : BOFiP art. 199 undecies B, loi de finances 2024 (prorogation jusqu'au 31/12/2029)

export type TypeOperation = "plein-droit" | "avec-agrement";

export interface ParamsGirardin {
  impotAnnuel: number;       // impot sur le revenu estime (EUR)
  rendement: number;         // rendement propose en % (7-14)
  typeOperation: TypeOperation;
}

export interface ResultatGirardin {
  // plafond applicable
  plafondNicheOutremer: number;  // 18 000 EUR (fixe)
  tauxRetrocession: number;      // 56% ou 66% selon type
  tauxPartComptee: number;       // 44% ou 34% (part non retrocedee, comptee dans le plafond)
  reductionMaxPlafond: number;   // plafond / tauxPartComptee
  // calcul effectif
  reductionCible: number;        // min(impot, reductionMaxPlafond)
  partDansPlafond: number;       // reductionCible * tauxPartComptee (doit etre <= 18 000)
  apportNecessaire: number;      // reductionCible / (1 + rendement/100)
  gainNet: number;               // reductionCible - apportNecessaire
  rendementEffectif: number;     // en %, = rendement saisi
  // comparaisons
  apportCouvreImpot: boolean;    // reductionCible >= impotAnnuel
}

// Plafond niches fiscales outre-mer (art. 199 undecies B)
const PLAFOND_NICHES_OUTREMER = 18000;

export function calculerGirardin(p: ParamsGirardin): ResultatGirardin {
  const tauxRetrocession = p.typeOperation === "avec-agrement" ? 66 : 56;
  const tauxPartComptee = p.typeOperation === "avec-agrement" ? 34 : 44;

  // Reduction maximale utilisable sans depasser le plafond de 18 000 EUR
  // 18 000 = reductionMax * tauxPartComptee/100  => reductionMax = 18000 / (tauxPartComptee/100)
  const reductionMaxPlafond = Math.round(PLAFOND_NICHES_OUTREMER / (tauxPartComptee / 100));

  // On ne peut pas reduire plus que l'impot reel
  const reductionCible = Math.min(p.impotAnnuel, reductionMaxPlafond);

  const partDansPlafond = Math.round(reductionCible * (tauxPartComptee / 100));

  // Apport = ce que l'investisseur verse
  // Reduction = Apport * (1 + rendement/100)
  // => Apport = Reduction / (1 + rendement/100)
  const apportNecessaire = reductionCible / (1 + p.rendement / 100);
  const gainNet = reductionCible - apportNecessaire;

  return {
    plafondNicheOutremer: PLAFOND_NICHES_OUTREMER,
    tauxRetrocession,
    tauxPartComptee,
    reductionMaxPlafond,
    reductionCible,
    partDansPlafond,
    apportNecessaire,
    gainNet,
    rendementEffectif: p.rendement,
    apportCouvreImpot: reductionCible >= p.impotAnnuel,
  };
}

export function fmtEur(n: number): string {
  return Math.round(n).toLocaleString("fr-FR") + " EUR";
}
