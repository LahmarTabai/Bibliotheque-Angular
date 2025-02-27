import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/user.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];
  searchTerm: string = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération de la liste complète des utilisateurs
    this.utilisateurService.getAllUsers().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        // Au démarrage, aucun filtre n'est appliqué
        this.filteredUtilisateurs = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
      }
    });
  }

  goToAddUser() {
    this.router.navigate(['/admin/users/add']);
  }

  goToEditUser(id: number) {
    this.router.navigate([`/admin/users/edit/${id}`]);
  }

  onDeleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUser(id).subscribe({
        next: () => {
          this.utilisateurs = this.utilisateurs.filter(u => u.userId !== id);
          this.filterUtilisateurs(); // Mettre à jour le filtre après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          alert('Échec de la suppression');
        }
      });
    }
  }

  // Méthode appelée à chaque saisie dans la barre de recherche
  onSearch(): void {
    this.filterUtilisateurs();
  }

  // Filtre les utilisateurs en fonction de searchTerm
  private filterUtilisateurs(): void {
    if (!this.searchTerm) {
      this.filteredUtilisateurs = this.utilisateurs;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUtilisateurs = this.utilisateurs.filter(user =>
        user.userNom.toLowerCase().includes(term) ||
        user.userPrenom.toLowerCase().includes(term) ||
        user.userEmail.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    }
  }
}
