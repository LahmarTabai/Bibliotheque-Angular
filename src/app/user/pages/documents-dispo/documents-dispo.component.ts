import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { EmpruntService } from '../../../services/emprunt.service';
import { AuthService } from '../../../auth/auth.service';

import { DocumentEntity } from '../../../models/document.models';
import { Emprunt } from '../../../models/emprunt.models';

@Component({
  selector: 'app-documents-dispo',
  templateUrl: './documents-dispo.component.html',
  styleUrls: ['./documents-dispo.component.css']
})
export class DocumentsDispoComponent implements OnInit {
  documents: DocumentEntity[] = [];
  message = '';

  // ID du user connecté
  userId: number | null = null;

  constructor(
    private documentService: DocumentService,
    private empruntService: EmpruntService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'AuthService
    this.userId = this.authService.getUserId();

    // Charger la liste des documents disponibles
    this.loadDocumentsDispo();
  }

  loadDocumentsDispo(): void {
    this.documentService.getDocumentsDisponibles().subscribe({
      next: (data) => {
        this.documents = data;
        if (!data || data.length === 0) {
          this.message = 'Aucun document disponible.';
        }
      },
      error: (err) => {
        console.error('Erreur chargement documents dispo:', err);
        this.message = 'Impossible de charger les documents disponibles.';
      }
    });
  }

  onEmprunter(docId: number): void {
    if (!this.userId) {
      this.message = 'Vous devez être connecté pour emprunter un document.';
      return;
    }

    // Choix de la date d'échéance : par ex. +7 jours
    const now = new Date();
    now.setDate(now.getDate() + 7);
    // On récupère juste la partie YYYY-MM-DD
    const dateEcheance = now.toISOString().slice(0, 10); // ex. "2025-03-15"

    this.empruntService.emprunterDocument(this.userId, docId, dateEcheance).subscribe({
      next: (empruntCree: Emprunt) => {
        console.log('Emprunt créé :', empruntCree);
        this.message = `Document #${docId} emprunté avec succès !`;

        // Recharger la liste pour mettre à jour la quantité dispo
        this.loadDocumentsDispo();
      },
      error: (err: any) => {
        console.error('Erreur lors de l’emprunt :', err);
        this.message = err.error?.message || 'Impossible d’emprunter ce document.';
      }
    });
  }
}
