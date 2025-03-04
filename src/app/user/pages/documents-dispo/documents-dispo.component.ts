import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { EmpruntService } from '../../../services/emprunt.service';
import { AuthService } from '../../../auth/auth.service';
import { DocumentEntity } from '../../../models/document.models';
import { Emprunt } from '../../../models/emprunt.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-documents-dispo',
  templateUrl: './documents-dispo.component.html',
  styleUrls: ['./documents-dispo.component.css']
})
export class DocumentsDispoComponent implements OnInit {
  // DataSource pour la datatable
  dataSource = new MatTableDataSource<DocumentEntity>();
  displayedColumns: string[] = ['docId', 'docTitre', 'docAuteur', 'docType', 'docQuantiteDispo', 'action'];
  message = '';
  userId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private documentService: DocumentService,
    private empruntService: EmpruntService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté
    this.userId = this.authService.getUserId();
    // Charger la liste des documents disponibles
    this.loadDocumentsDispo();
  }

  loadDocumentsDispo(): void {
    this.documentService.getDocumentsDisponibles().subscribe({
      next: (docs: DocumentEntity[]) => {
        if (!docs || docs.length === 0) {
          this.message = 'Aucun document disponible.';
        } else {
          this.message = '';
        }
        this.dataSource.data = docs;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err: any) => {
        console.error('Erreur chargement documents dispo:', err);
        this.message = 'Impossible de charger les documents disponibles.';
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

  onEmprunter(docId: number): void {
    if (!this.userId) {
      this.message = 'Vous devez être connecté pour emprunter un document.';
      return;
    }

    // Pour cet exemple, on définit la date d'échéance à 7 jours à partir d'aujourd'hui
    const now = new Date();
    now.setDate(now.getDate() + 7);
    const dateEcheance = now.toISOString().slice(0, 10); // "YYYY-MM-DD"

    this.empruntService.emprunterDocument(this.userId, docId, dateEcheance).subscribe({
      next: (emprunt: Emprunt) => {
        console.log('Emprunt créé :', emprunt);
        this.message = `Document #${docId} emprunté avec succès !`;
        // Recharger la liste pour mettre à jour la quantité disponible
        this.loadDocumentsDispo();
      },
      error: (err: any) => {
        console.error('Erreur lors de l’emprunt :', err);
        this.message = err.error?.message || 'Impossible d’emprunter ce document.';
      }
    });
  }
}
