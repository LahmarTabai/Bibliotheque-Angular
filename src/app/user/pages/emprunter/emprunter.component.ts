import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentService } from '../../../services/document.service';
import { Emprunt } from '../../../models/emprunt.models';
import { DocumentEntity } from '../../../models/document.models';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-emprunter',
  templateUrl: './emprunter.component.html',
  styleUrls: ['./emprunter.component.css']
})
export class EmprunterComponent implements OnInit {
  documentsDispo: DocumentEntity[] = [];
  selectedDocId: number | null = null;
  // Ici, dateEcheance sera de type Date pour le datepicker
  dateEcheance: Date | null = null;
  message = '';

  constructor(
    private documentService: DocumentService,
    private empruntService: EmpruntService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Charger la liste de documents disponibles
    this.documentService.getDocumentsDisponibles().subscribe({
      next: (docs: DocumentEntity[]) => {
        this.documentsDispo = docs;
      },
      error: (err: any) => {
        console.error('Erreur chargement docs:', err);
        this.message = 'Impossible de charger la liste des documents.';
      }
    });
  }

  onEmprunter() {
    if (!this.selectedDocId) {
      this.message = 'Veuillez choisir un document.';
      return;
    }
    if (!this.dateEcheance) {
      this.message = 'Veuillez sélectionner une date d’échéance.';
      return;
    }

    // const userId = 5; // Exemple : l'ID de l'utilisateur connecté
    const userId = this.authService.getUserId()!;


    // Convertir la date d'échéance en chaîne "YYYY-MM-DD"
    const dateStr = this.dateEcheance.toISOString().slice(0, 10);

    this.empruntService.emprunterDocument(userId, this.selectedDocId!, dateStr).subscribe({
      next: (emprunt: Emprunt) => {
        // this.message = `Emprunt #${emprunt.empruntId} créé pour le document #${emprunt.docId}`;

        // On retrouve le document emprunté pour récupérer son titre
      const docTitre = this.documentsDispo.find(doc => doc.docId === emprunt.docId)?.docTitre;

      this.message = `Emprunt avec succès pour le document « ${docTitre} »`;

      },
      error: (err: any) => {
        console.error('Erreur emprunt :', err);
        this.message = 'Impossible d’emprunter : ' + (err.error?.message || '');
      }
    });
  }






}
