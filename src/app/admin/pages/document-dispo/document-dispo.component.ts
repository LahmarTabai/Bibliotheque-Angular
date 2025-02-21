import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';

@Component({
  selector: 'app-document-dispo',
  templateUrl: './document-dispo.component.html',
  styleUrls: ['./document-dispo.component.css']
})
export class DocumentDispoComponent implements OnInit {
  documents: DocumentEntity[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocumentsDisponibles().subscribe({
      next: (data) => {
        this.documents = data;
      },
      error: (err) => {
        console.error('Erreur chargement documents disponibles :', err);
      }
    });
  }
}
