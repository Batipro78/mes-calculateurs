// Taux des placements proposes par le simulateur d'epargne. Source unique pour le
// simulateur et ses pages par montant : a mettre a jour a chaque changement de
// taux (1er fevrier et 1er aout pour les livrets reglementes).
// Sources (lues le 06/10/2026) : service-public.gouv.fr F2365 (Livret A, 1,7 %,
// periode du 1er aout 2026 au 31 janvier 2027), F2368 (LDDS, 1,7 %), F2367
// (LEP, 2,50 %), F16140 (PEL ouvert a partir du 1er janvier 2026 : 2,00 %).
// Fonds euros : ordre de grandeur, pas un taux officiel.
export const TAUX_EPARGNE = {
  livretA: 1.7,
  ldds: 1.7,
  lep: 2.5,
  assuranceVie: 2.5,
  pel: 2.0,
};
