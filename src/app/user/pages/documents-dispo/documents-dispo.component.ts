import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';

@Component({
  selector: 'app-documents-dispo',
  templateUrl: './documents-dispo.component.html',
  styleUrls: ['./documents-dispo.component.css']
})
export class DocumentsDispoComponent implements OnInit {
  documents: DocumentEntity[] = [];
  message = '';

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocumentsDisponibles().subscribe({
      next: (data) => {
        this.documents = data;
        if (data.length === 0) {
          this.message = 'Aucun document disponible.';
        }
      },
      error: (err) => {
        console.error('Erreur chargement documents dispo:', err);
        this.message = 'Impossible de charger les documents disponibles.';
      }
    });
  }
}
