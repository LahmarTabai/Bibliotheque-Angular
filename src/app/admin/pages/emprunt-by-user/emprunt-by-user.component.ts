import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { DocumentService } from '../../../services/document.service';
import { Emprunt } from '../../../models/emprunt.models';
import { Utilisateur } from '../../../models/user.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-emprunt-by-user',
  templateUrl: './emprunt-by-user.component.html',
  styleUrls: ['./emprunt-by-user.component.css']
})
export class EmpruntByUserComponent implements OnInit {
  users: Utilisateur[] = [];       // liste complète des utilisateurs
  selectedUserId: number | null = null;
  errorMessage = '';

  // DataSource pour la datatable
  dataSource = new MatTableDataSource<Emprunt>();
  displayedColumns: string[] = ['empruntId', 'docTitle', 'dateEmprunt', 'dateEcheance', 'dateRetour', 'status'];

  // Mapping pour associer docId à son titre
  docTitles: { [id: number]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private empruntService: EmpruntService,
    private utilisateurService: UtilisateurService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    // Charger la liste de tous les utilisateurs
    this.utilisateurService.getAllUsers().subscribe({
      next: (data: Utilisateur[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs :', err);
        this.errorMessage = 'Impossible de charger la liste des utilisateurs.';
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

  // Méthode appelée lors de la sélection d'un utilisateur
  onSelectUser(): void {
    if (!this.selectedUserId) {
      this.dataSource.data = [];
      return;
    }
    this.empruntService.getEmpruntsParUtilisateur(this.selectedUserId).subscribe({
      next: (data: Emprunt[]) => {
        if (data.length === 0) {
          this.errorMessage = `Aucun emprunt trouvé pour l'utilisateur #${this.selectedUserId}.`;
        } else {
          this.errorMessage = '';
        }
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Erreur chargement emprunts par user :', err);
        this.errorMessage = 'Impossible de récupérer les emprunts.';
      }
    });
  }
}
