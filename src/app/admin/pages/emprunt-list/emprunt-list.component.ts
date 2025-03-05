import { Component, OnInit, ViewChild } from '@angular/core';
import { Emprunt } from '../../../models/emprunt.models';
import { EmpruntService } from '../../../services/emprunt.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { DocumentService } from '../../../services/document.service';
import { EmpruntDetailDialogComponent } from '../emprunt-detail-dialog/emprunt-detail-dialog.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-emprunt-list',
  templateUrl: './emprunt-list.component.html',
  styleUrls: ['./emprunt-list.component.css']
})
export class EmpruntListComponent implements OnInit {
  displayedColumns: string[] = [
    'empruntId',
    'userName',
    'docTitle',
    'dateEmprunt',
    'dateEcheance',
    'dateRetour',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Emprunt>();
  // Ajout de la propriété "message"
  message: string = '';

  // Mappings pour obtenir le nom complet et le titre du document à partir de leur ID
  userNames: { [id: number]: string } = {};
  docTitles: { [id: number]: string } = {};

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
    // Charger la liste complète des emprunts
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
        this.message = 'Impossible de charger les emprunts.';
      }
    });

    // Charger tous les utilisateurs pour construire le mapping userNames
    this.utilisateurService.getAllUsers().subscribe({
      next: (users: any[]) => {
        users.forEach(user => {
          this.userNames[user.userId] = `${user.userNom} ${user.userPrenom}`;
        });
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs :', err);
      }
    });

    // Charger tous les documents pour construire le mapping docTitles
    this.documentService.getAllDocuments().subscribe({
      next: (docs: any[]) => {
        docs.forEach(doc => {
          this.docTitles[doc.docId] = doc.docTitre;
        });
      },
      error: (err) => {
        console.error('Erreur chargement documents :', err);
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

  onDeleteEmprunt(id: number): void {
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

  onRetournerEmprunt(id: number): void {
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
          console.error('Erreur lors du retour:', err);
          alert('Impossible de retourner le document.');
        }
      });
    }
  }

  onViewEmprunt(emprunt: Emprunt): void {
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
