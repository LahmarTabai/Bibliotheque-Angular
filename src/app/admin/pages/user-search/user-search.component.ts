import { Component } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/user.models'; // adapter le chemin

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {
  term = '';
  results: Utilisateur[] = [];
  selectedUser?: Utilisateur;
  errorMessage = '';

  constructor(private utilisateurService: UtilisateurService) {}

  onSearch() {
    if (!this.term.trim()) {
      this.results = [];
      this.errorMessage = '';
      return;
    }
    this.utilisateurService.searchUsers(this.term.trim()).subscribe({
      next: (data) => {
        this.results = data;
        if (data.length === 0) {
          this.errorMessage = 'Aucun utilisateur trouvé.';
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        console.error('Erreur de recherche utilisateur :', err);
        this.errorMessage = 'Impossible de faire la recherche.';
      }
    });
  }

  onSelectUser(u: Utilisateur) {
    this.selectedUser = u;
    // Par exemple, aller chercher les emprunts de cet utilisateur
    // ou naviguer vers une page
    console.log('Utilisateur sélectionné :', u);
    // ...
  }
}
