// Configuration des niches de leads vendables.
// Chaque niche correspond a un calculateur/simulateur et a une famille de partenaires acheteurs.

export type LeadNiche = {
  id: string;
  label: string;                  // affiche sur le formulaire
  cplEstime: { min: number; max: number }; // euros par lead valide
  partenairesCibles: string[];   // partenaires/acheteurs potentiels
  emoji: string;
  champProjet: string;            // libelle du champ "projet"
  optionsProjet: string[];        // choix possibles
};

export const LEAD_NICHES: Record<string, LeadNiche> = {
  "chauffage-pac": {
    id: "chauffage-pac",
    label: "Chauffage / Pompe a chaleur",
    cplEstime: { min: 20, max: 60 },
    partenairesCibles: ["Effy", "Hellio", "Heero", "Cozynergy", "Engie Home Services"],
    emoji: "\u{1f525}",
    champProjet: "Type de projet",
    optionsProjet: [
      "Installation pompe a chaleur",
      "Remplacement chaudiere",
      "Entretien chaudiere",
      "Depannage chauffage",
      "Autre",
    ],
  },
  "electricite": {
    id: "electricite",
    label: "Electricite (depannage / mise en conformite)",
    cplEstime: { min: 8, max: 25 },
    partenairesCibles: ["Hizy", "AlloVoisins", "ManoMano Pro", "reseaux locaux RGE"],
    emoji: "⚡",
    champProjet: "Type de projet",
    optionsProjet: [
      "Depannage urgent",
      "Renovation tableau electrique",
      "Installation neuve",
      "Mise en conformite (Consuel)",
      "Autre",
    ],
  },
  "plomberie": {
    id: "plomberie",
    label: "Plomberie",
    cplEstime: { min: 8, max: 25 },
    partenairesCibles: ["AlloVoisins", "Hizy", "ManoMano Pro"],
    emoji: "\u{1f6bf}",
    champProjet: "Type de projet",
    optionsProjet: [
      "Depannage urgent",
      "Installation salle de bain",
      "Recherche de fuite",
      "Detartrage / entretien",
      "Autre",
    ],
  },
  "renovation-globale": {
    id: "renovation-globale",
    label: "Renovation maison",
    cplEstime: { min: 15, max: 50 },
    partenairesCibles: ["Travaux.com", "Mes Allies Travaux", "Quotatis", "AlloVoisins"],
    emoji: "\u{1f3da}",
    champProjet: "Type de travaux",
    optionsProjet: [
      "Renovation complete",
      "Renovation cuisine",
      "Renovation salle de bain",
      "Extension / surelevation",
      "Autre",
    ],
  },
  "isolation": {
    id: "isolation",
    label: "Isolation thermique",
    cplEstime: { min: 18, max: 45 },
    partenairesCibles: ["Effy", "Hellio", "Isoltoit", "France Renov"],
    emoji: "\u{1f9e7}",
    champProjet: "Zone a isoler",
    optionsProjet: [
      "Combles",
      "Murs (interieur)",
      "Murs (exterieur / ITE)",
      "Sol / vide sanitaire",
      "Autre",
    ],
  },
  "panneaux-solaires": {
    id: "panneaux-solaires",
    label: "Panneaux solaires / Photovoltaique",
    cplEstime: { min: 25, max: 70 },
    partenairesCibles: ["Otovo", "ENGIE My Power", "EDF ENR", "Effy"],
    emoji: "\u{2600}️",
    champProjet: "Type de projet",
    optionsProjet: [
      "Autoconsommation",
      "Vente totale",
      "Stockage batterie",
      "Solaire thermique (eau chaude)",
      "Autre",
    ],
  },
  "credit-immobilier": {
    id: "credit-immobilier",
    label: "Credit immobilier",
    cplEstime: { min: 25, max: 80 },
    partenairesCibles: ["Pretto", "MeilleurTaux", "Empruntis", "Cafpi"],
    emoji: "\u{1f3e0}",
    champProjet: "Type de projet",
    optionsProjet: [
      "Achat residence principale",
      "Achat investissement locatif",
      "Rachat de credit",
      "Renegociation",
      "Autre",
    ],
  },
  "assurance-pret": {
    id: "assurance-pret",
    label: "Assurance emprunteur",
    cplEstime: { min: 15, max: 35 },
    partenairesCibles: ["Magnolia", "Assurly", "Securimut"],
    emoji: "\u{1f6e1}️",
    champProjet: "Statut",
    optionsProjet: [
      "Nouveau pret",
      "Changement d'assurance (loi Lemoine)",
      "Devis comparatif",
    ],
  },
};

export function getNicheConfig(id: string): LeadNiche | undefined {
  return LEAD_NICHES[id];
}
