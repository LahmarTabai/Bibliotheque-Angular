// DTO pour créer un document
export interface CreateDocumentDto {
  docTitre: string;
  docAuteur?: string;
  docDescription?: string;
  docFicheTechnique?: string;
  // On va le gérer comme une chaîne "YYYY-MM-DDTHH:mm:ss" ou "YYYY-MM-DD"
  docDatePublication?: string;
  docQuantite: number;
  docQuantiteDispo?: number; // si tu laisses le backend init ?
  docType: string; // "Livre", "Magazine", "Journal", "Multimédia" etc.
}

// Document renvoyé par le backend
export interface DocumentEntity {
  docId: number;
  docTitre: string;
  docAuteur?: string;
  docDescription?: string;
  docFicheTechnique?: string;
  docDatePublication?: string;
  docQuantite: number;
  docQuantiteDispo: number;
  docType: string;
}
