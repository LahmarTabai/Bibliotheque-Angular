import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-search-documents',
  templateUrl: './search-documents.component.html',
  styleUrls: ['./search-documents.component.css']
})
export class SearchDocumentsComponent {
  // Champs de recherche
  titre = '';
  auteur = '';
  description = '';
  docType = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  // Datatable
  displayedColumns: string[] = [
    'docId',
    'docTitre',
    'docAuteur',
    'docType',
    'docDatePublication',
    'docQuantiteDispo',
    'actions'
  ];
  dataSource = new MatTableDataSource<DocumentEntity>();

  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentService: DocumentService,
              private router: Router) {}

  onSearch() {
    // Construction de l'objet params en convertissant les dates en ISO si définies
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
    if (this.dateFrom) { params.dateFrom = this.dateFrom.toISOString(); }
    if (this.dateTo) { params.dateTo = this.dateTo.toISOString(); }

    this.documentService.searchDocuments(params).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.errorMessage = 'Aucun document trouvé.';
        } else {
          this.errorMessage = '';
        }
        this.dataSource = new MatTableDataSource(data);
        // Assurez-vous d'attendre que le paginator et le sort soient prêts
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Erreur recherche documents :', err);
        this.errorMessage = 'Impossible de faire la recherche.';
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(docId: number) {
    this.router.navigate(['/admin/edit-document', docId]);
  }

  onDelete(docId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      this.documentService.deleteDocument(docId).subscribe({
        next: () => {
          // Supprime le document du dataSource
          this.dataSource.data = this.dataSource.data.filter(doc => doc.docId !== docId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du document :', err);
          this.errorMessage = 'Erreur lors de la suppression du document.';
        }
      });
    }
  }
}
