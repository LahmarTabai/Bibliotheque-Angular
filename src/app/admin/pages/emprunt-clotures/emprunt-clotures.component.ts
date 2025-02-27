import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { Emprunt } from '../../../models/emprunt.models';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { DocumentService } from '../../../services/document.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmpruntDetailDialogComponent } from '../emprunt-detail-dialog/emprunt-detail-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-emprunt-clotures',
  templateUrl: './emprunt-clotures.component.html',
  styleUrls: ['./emprunt-clotures.component.css']
})
export class EmpruntCloturesComponent implements OnInit {

  displayedColumns: string[] = [
    'empruntId',
    'userName',  // Afficher le nom complet
    'docTitle',
    'dateEmprunt',
    'dateEcheance',
    'dateRetour',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Emprunt>();
  // Dictionnaire pour associer userId à leur nom complet
  userNames: { [id: number]: string } = {};
  // Dictionnaire pour associer docId à leur titre
  docTitles: { [id: number]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private empruntService: EmpruntService,
    private utilisateurService: UtilisateurService,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Charger tous les emprunts clôturés
    this.empruntService.getEmpruntsClotures().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Erreur chargement emprunts clôturés :', err);
      }
    });

    // Charger la liste de tous les utilisateurs et construire le mapping
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

    // Charger tous les documents pour construire le mapping des titres
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
        console.error('Erreur lors du chargement des détails', err);
        alert('Impossible de charger les détails.');
      }
    });
  }
}
