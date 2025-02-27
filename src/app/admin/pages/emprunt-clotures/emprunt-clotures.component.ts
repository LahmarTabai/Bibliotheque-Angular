import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { Emprunt } from '../../../models/emprunt.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { EmpruntDetailDialogComponent } from '../emprunt-detail-dialog/emprunt-detail-dialog.component';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-emprunt-clotures',
  templateUrl: './emprunt-clotures.component.html',
  styleUrls: ['./emprunt-clotures.component.css']
})
export class EmpruntCloturesComponent implements OnInit {
  displayedColumns: string[] = [
    'empruntId',
    'userId',
    'docId',
    'dateEmprunt',
    'dateEcheance',
    'dateRetour',
    'actions'
  ];
  dataSource = new MatTableDataSource<Emprunt>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private empruntService: EmpruntService,
    private utilisateurService: UtilisateurService,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.empruntService.getEmpruntsClotures().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => console.error('Erreur chargement emprunts clôturés :', err)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteEmprunt(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet emprunt clôturé ?')) {
      this.empruntService.deleteEmprunt(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(e => e.empruntId !== id);
        },
        error: (err) => {
          console.error('Erreur suppression emprunt', err);
          alert('Impossible de supprimer cet emprunt.');
        }
      });
    }
  }

  onViewEmprunt(emprunt: Emprunt): void {
    // Charger en parallèle les détails de l'utilisateur et du document
    forkJoin({
      user: this.utilisateurService.getUserById(emprunt.userId),
      document: this.documentService.getDocumentById(emprunt.docId)
    }).subscribe({
      next: ({ user, document }) => {
        this.dialog.open(EmpruntDetailDialogComponent, {
          width: '500px',
          data: { emprunt, user, document }
        });
      },
      error: (err) => {
        console.error('Erreur chargement détails', err);
        alert('Impossible de charger les détails.');
      }
    });
  }
}
