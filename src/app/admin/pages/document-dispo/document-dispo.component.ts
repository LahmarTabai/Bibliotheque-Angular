import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-document-dispo',
  templateUrl: './document-dispo.component.html',
  styleUrls: ['./document-dispo.component.css']
})
export class DocumentDispoComponent implements OnInit {
  displayedColumns: string[] = [
    'docId',
    'docTitre',
    'docAuteur',
    'docQuantite',
    'docQuantiteDispo',
    'docType',
    'actions'
  ];
  dataSource!: MatTableDataSource<DocumentEntity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getDocumentsDisponibles().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Erreur chargement documents disponibles :', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(docId: number): void {
    // Redirige vers le composant d'édition (par exemple /admin/edit-document/{id})
    this.router.navigate(['/admin/documents/edit', docId]);
  }

  onDelete(docId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      this.documentService.deleteDocument(docId).subscribe({
        next: () => {
          console.log('Document supprimé avec succès');
          this.loadDocuments();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du document :', err);
        }
      });
    }
  }
}
