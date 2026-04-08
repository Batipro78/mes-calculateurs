export interface HeuresRecommandees {
  min: number;
  max: number;
  ideal: number;
}

export interface ResultatBesoinSommeil {
  heuresRecommandees: HeuresRecommandees;
  ajustement: number;
  heuresAjustees: number;
  cycles: number;
  heureCoucher: string[];
  heureReveil: string[];
  scoreQualite: number;
}

function getHeuresParAge(age: number): HeuresRecommandees {
  if (age <= 0.25) return { min: 14, max: 17, ideal: 15.5 };  // 0-3 mois
  if (age <= 1) return { min: 12, max: 15, ideal: 13.5 };     // 4-11 mois
  if (age <= 2) return { min: 11, max: 14, ideal: 12.5 };     // 1-2 ans
  if (age <= 5) return { min: 10, max: 13, ideal: 11.5 };     // 3-5 ans
  if (age <= 13) return { min: 9, max: 11, ideal: 10 };       // 6-13 ans
  if (age <= 17) return { min: 8, max: 10, ideal: 9 };        // 14-17 ans
  if (age <= 25) return { min: 7, max: 9, ideal: 8 };         // 18-25 ans
  if (age <= 64) return { min: 7, max: 9, ideal: 8 };         // 26-64 ans
  return { min: 7, max: 8, ideal: 7.5 };                      // 65+
}

function subtractHours(timeStr: string, hours: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const totalMinutes = h * 60 + m - Math.round(hours * 60);
  const adjusted = ((totalMinutes % 1440) + 1440) % 1440;
  const hh = Math.floor(adjusted / 60);
  const mm = adjusted % 60;
  return `${String(hh).padStart(2, "0")}h${String(mm).padStart(2, "0")}`;
}

function addHours(timeStr: string, hours: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const totalMinutes = h * 60 + m + Math.round(hours * 60);
  const adjusted = totalMinutes % 1440;
  const hh = Math.floor(adjusted / 60);
  const mm = adjusted % 60;
  return `${String(hh).padStart(2, "0")}h${String(mm).padStart(2, "0")}`;
}

export function calcBesoinSommeil(
  age: number,
  activite: string,
  qualite: string
): ResultatBesoinSommeil {
  const heuresRecommandees = getHeuresParAge(age);

  let ajustement = 0;
  if (activite === "intense") ajustement += 0.5;
  if (activite === "leger" || activite === "sedentaire") ajustement -= 0.5;
  if (qualite === "mauvaise") ajustement += 1;

  const heuresAjustees = Math.round((heuresRecommandees.ideal + ajustement) * 10) / 10;
  const cycles = Math.round(heuresAjustees * 60 / 90);

  // Heures de coucher si reveil a 6h, 6h30, 7h, 7h30, 8h
  const reveils = ["06:00", "06:30", "07:00", "07:30", "08:00"];
  const heureCoucher = reveils.map((r) => subtractHours(r, heuresAjustees));

  // Heures de reveil si coucher a 21h, 21h30, 22h, 22h30, 23h, 23h30
  const couchers = ["21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
  const heureReveil = couchers.map((c) => addHours(c, heuresAjustees));

  // Score qualite en pourcentage
  let scoreQualite = 50;
  if (qualite === "excellente") scoreQualite = 95;
  else if (qualite === "bonne") scoreQualite = 75;
  else if (qualite === "moyenne") scoreQualite = 50;
  else if (qualite === "mauvaise") scoreQualite = 25;

  if (activite === "actif" || activite === "intense") scoreQualite = Math.min(100, scoreQualite + 10);
  if (activite === "sedentaire") scoreQualite = Math.max(0, scoreQualite - 10);

  return {
    heuresRecommandees,
    ajustement,
    heuresAjustees,
    cycles,
    heureCoucher,
    heureReveil,
    scoreQualite,
  };
}
