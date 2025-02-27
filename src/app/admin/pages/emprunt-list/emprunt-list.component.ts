import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { Emprunt } from '../../../models/emprunt.models';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { DocumentService } from '../../../services/document.service';
import { EmpruntDetailDialogComponent } from '../emprunt-detail-dialog/emprunt-detail-dialog.component';


import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-emprunt-list',
  templateUrl: './emprunt-list.component.html',
  styleUrls: ['./emprunt-list.component.css']
})
export class EmpruntListComponent implements OnInit {

  displayedColumns: string[] = [
    'empruntId',
    'userId',
    'docId',
    'dateEmprunt',
    'dateEcheance',
    'dateRetour',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Emprunt>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private empruntService: EmpruntService,
    private utilisateurService: UtilisateurService,
    private documentService: DocumentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.empruntService.getAllEmprunts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Erreur chargement emprunts :', err);
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

  onDeleteEmprunt(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet emprunt ?')) {
      this.empruntService.deleteEmprunt(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(e => e.empruntId !== id);
        },
        error: (err) => {
          console.error('Erreur suppression emprunt', err);
          alert('Impossible de supprimer l’emprunt.');
        }
      });
    }
  }

  onRetournerEmprunt(id: number) {
    if (confirm('Voulez-vous retourner ce document ?')) {
      this.empruntService.retourner(id).subscribe({
        next: (updated: Emprunt) => {
          const index = this.dataSource.data.findIndex(e => e.empruntId === id);
          if (index !== -1) {
            this.dataSource.data[index] = updated;
            this.dataSource._updateChangeSubscription();
          }
        },
        error: (err) => {
          console.error('Erreur lors du retour', err);
          alert('Impossible de retourner le document.');
        }
      });
    }
  }

  onViewEmprunt(emprunt: Emprunt) {
    // Utiliser forkJoin pour charger en parallèle les détails utilisateur et document
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
        console.error('Erreur lors du chargement des détails', err);
        alert('Impossible de charger les détails.');
      }
    });
  }
}
