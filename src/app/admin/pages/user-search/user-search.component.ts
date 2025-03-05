import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/user.models';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnDestroy {
  term = '';
  results: Utilisateur[] = [];
  selectedUser?: Utilisateur;
  errorMessage = '';
  loading = false;

  // Sujet pour capter et temporiser la recherche
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On souscrit au subject avec un debounce
    this.subscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => this.performSearch(term));
  }

  // Méthode appelée à chaque frappe dans l'input
  onSearch() {
    this.searchSubject.next(this.term.trim());
  }

  performSearch(term: string) {
    if (!term) {
      this.results = [];
      this.errorMessage = '';
      return;
    }
    this.loading = true;
    this.utilisateurService.searchUsers(term).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
        this.errorMessage = data.length === 0 ? 'Aucun utilisateur trouvé.' : '';
      },
      error: (err) => {
        console.error('Erreur de recherche utilisateur :', err);
        this.errorMessage = 'Impossible de faire la recherche.';
        this.loading = false;
      }
    });
  }

  // Pour sélectionner un utilisateur (affichage optionnel d'un détail)
  onSelectUser(u: Utilisateur) {
    this.selectedUser = u;
    console.log('Utilisateur sélectionné :', u);
  }

  // Redirige vers la page d'édition de l'utilisateur
  goToEditUser(id: number) {
    this.router.navigate([`/admin/users/edit/${id}`]);
  }

  // Supprime l'utilisateur après confirmation
  onDeleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUser(id).subscribe({
        next: () => {
          // Mise à jour de la liste des résultats
          this.results = this.results.filter(u => u.userId !== id);
          // Si l'utilisateur supprimé était sélectionné, on l'efface
          if (this.selectedUser?.userId === id) {
            this.selectedUser = undefined;
          }
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          alert('Échec de la suppression');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
