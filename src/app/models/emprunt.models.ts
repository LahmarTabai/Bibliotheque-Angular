export interface Emprunt {
  empruntId: number;
  userId: number;
  docId: number;
  dateEmprunt: string;     // ex. "2025-02-21T09:00:00"
  dateEcheance: string;    // ex. "2025-03-01T10:00:00"
  dateRetour?: string;     // null si pas encore rendu
  fraisRetard?: number;    // ex. 3.50
  status?: string;         // "Actif", "Cloturee", ...
}


export interface UserEmpruntStats {
  userId: number;
  userNom: string;
  userPrenom: string;
  totalEmprunts: number;
}

export interface DocumentTypeStats {
  docType: string;
  totalEmprunts: number;
}
