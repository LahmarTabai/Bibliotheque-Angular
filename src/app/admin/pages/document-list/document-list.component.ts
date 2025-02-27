import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: DocumentEntity[] = [];
  filteredDocuments: DocumentEntity[] = [];
  searchTerm: string = '';

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (data) => {
        this.documents = data;
        this.filteredDocuments = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des documents :', err);
      }
    });
  }

  goToAddDocument(): void {
    this.router.navigate(['/admin/documents/add']);
  }

  goToEditDocument(docId: number): void {
    this.router.navigate([`/admin/documents/edit/${docId}`]);
  }

  onDeleteDocument(docId: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce document ?')) {
      this.documentService.deleteDocument(docId).subscribe({
        next: () => {
          this.documents = this.documents.filter(d => d.docId !== docId);
          this.filterDocuments();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer le document');
        }
      });
    }
  }

  onSearch(): void {
    this.filterDocuments();
  }

  private filterDocuments(): void {
    if (!this.searchTerm) {
      this.filteredDocuments = this.documents;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredDocuments = this.documents.filter(doc =>
        (doc.docTitre && doc.docTitre.toLowerCase().includes(term)) ||
        (doc.docAuteur && doc.docAuteur.toLowerCase().includes(term)) ||
        (doc.docType && doc.docType.toLowerCase().includes(term))
      );

    }
  }
}
