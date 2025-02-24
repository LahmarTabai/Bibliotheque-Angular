import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentService } from '../../../services/document.service'; // <== ICI
import { Emprunt } from '../../../models/emprunt.models';
import { DocumentEntity } from '../../../models/document.models'; // <== ICI

@Component({
  selector: 'app-emprunter',
  templateUrl: './emprunter.component.html',
  styleUrls: ['./emprunter.component.css']
})
export class EmprunterComponent implements OnInit {
  documentsDispo: DocumentEntity[] = [];
  selectedDocId: number | null = null;
  dateEcheance = '';
  message = '';

  constructor(
    private documentService: DocumentService,    // <== Injection
    private empruntService: EmpruntService
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

  const userId = 5; // ex.

  let dateStr = ''; // On mettra la forme "YYYY-MM-DD"
  if (this.dateEcheance) {
    // 'this.dateEcheance' est un objet Date
    const d = new Date(this.dateEcheance);
    // Convertir en "YYYY-MM-DD"
    dateStr = d.toISOString().slice(0, 10);
    // .toISOString() => "2023-07-15T00:00:00.000Z" => on garde les 10 premiers chars => "2023-07-15"
  }

  this.empruntService.emprunterDocument(userId, this.selectedDocId, dateStr).subscribe({
    next: (emprunt: Emprunt) => {
      this.message = `Emprunt #${emprunt.empruntId} créé pour doc #${emprunt.docId}`;
    },
    error: (err: any) => {
      console.error('Erreur emprunt :', err);
      this.message = 'Impossible d’emprunter : ' + (err.error?.message || '');
    }
  });
}

}
