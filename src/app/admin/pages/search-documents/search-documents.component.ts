import { Component } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';

@Component({
  selector: 'app-search-documents',
  templateUrl: './search-documents.component.html',
  styleUrls: ['./search-documents.component.css']
})
export class SearchDocumentsComponent {
  titre = '';
  auteur = '';
  description = '';
  docType = '';
  dateFrom = '';
  dateTo = '';

  results: DocumentEntity[] = [];
  errorMessage = '';

  constructor(private documentService: DocumentService) {}

  onSearch() {
    // Construire l'objet "params"
    const params: {
      titre?: string;
      auteur?: string;
      description?: string;
      docType?: string;
      dateFrom?: string;
      dateTo?: string;
    } = {};

    if (this.titre.trim()) { params.titre = this.titre.trim(); }
    if (this.auteur.trim()) { params.auteur = this.auteur.trim(); }
    if (this.description.trim()) { params.description = this.description.trim(); }
    if (this.docType.trim()) { params.docType = this.docType.trim(); }
    if (this.dateFrom.trim()) { params.dateFrom = this.dateFrom.trim(); }
    if (this.dateTo.trim()) { params.dateTo = this.dateTo.trim(); }

    this.documentService.searchDocuments(params).subscribe({
      next: (data) => {
        this.results = data;
        if (data.length === 0) {
          this.errorMessage = 'Aucun document trouvé.';
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        console.error('Erreur recherche documents :', err);
        this.errorMessage = 'Impossible de faire la recherche.';
      }
    });
  }
}
