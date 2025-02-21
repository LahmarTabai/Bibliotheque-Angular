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

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (data) => {
        this.documents = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des documents :', err);
      }
    });
  }

  goToAddDocument() {
    this.router.navigate(['/admin/documents/add']);
  }

  goToEditDocument(docId: number) {
    this.router.navigate([`/admin/documents/edit/${docId}`]);
  }

  onDeleteDocument(docId: number) {
    if (confirm('Voulez-vous vraiment supprimer ce document ?')) {
      this.documentService.deleteDocument(docId).subscribe({
        next: () => {
          this.documents = this.documents.filter(d => d.docId !== docId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer le document');
        }
      });
    }
  }
}
