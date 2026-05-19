export interface DatesIslamiques {
  annee: number;
  ramadanDebut: Date;
  aidAlFitr: Date;
  aidAlAdha: Date;
  confirme: boolean;
}

export const DATES_2026_2030: DatesIslamiques[] = [
  {
    annee: 2026,
    ramadanDebut: new Date("2026-02-18"),
    aidAlFitr: new Date("2026-03-20"),
    aidAlAdha: new Date("2026-05-27"),
    confirme: true,
  },
  {
    annee: 2027,
    ramadanDebut: new Date("2027-02-08"),
    aidAlFitr: new Date("2027-03-10"),
    aidAlAdha: new Date("2027-05-16"),
    confirme: false,
  },
  {
    annee: 2028,
    ramadanDebut: new Date("2028-01-28"),
    aidAlFitr: new Date("2028-02-27"),
    aidAlAdha: new Date("2028-05-05"),
    confirme: false,
  },
  {
    annee: 2029,
    ramadanDebut: new Date("2029-01-16"),
    aidAlFitr: new Date("2029-02-15"),
    aidAlAdha: new Date("2029-04-24"),
    confirme: false,
  },
  {
    annee: 2030,
    ramadanDebut: new Date("2030-01-07"),
    aidAlFitr: new Date("2030-02-05"),
    aidAlAdha: new Date("2030-04-13"),
    confirme: false,
  },
];

export function joursAvant(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dateRef = new Date(date);
  dateRef.setHours(0, 0, 0, 0);
  const diff = dateRef.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getProchaineRamadan(): DatesIslamiques {
  const now = new Date();
  return (
    DATES_2026_2030.find((d) => d.ramadanDebut > now) || DATES_2026_2030[DATES_2026_2030.length - 1]
  );
}

export function getProchainAid(): {
  type: "fitr" | "adha";
  date: Date;
  annee: number;
} {
  const now = new Date();
  for (const dates of DATES_2026_2030) {
    if (dates.aidAlFitr > now) {
      return { type: "fitr", date: dates.aidAlFitr, annee: dates.annee };
    }
    if (dates.aidAlAdha > now) {
      return { type: "adha", date: dates.aidAlAdha, annee: dates.annee };
    }
  }
  return {
    type: "adha",
    date: DATES_2026_2030[DATES_2026_2030.length - 1].aidAlAdha,
    annee: DATES_2026_2030[DATES_2026_2030.length - 1].annee,
  };
}

export function dureeRamadan(annee: number): number {
  const data = DATES_2026_2030.find((d) => d.annee === annee);
  if (!data) return 29;
  const debut = data.ramadanDebut;
  const fin = new Date(data.aidAlFitr);
  fin.setDate(fin.getDate() - 1);
  return Math.floor((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

export function formatDateFR(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateFRShort(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
