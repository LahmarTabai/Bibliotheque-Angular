import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UtilisateurService, Utilisateur } from '../../services/utilisateur.service';
// import { UtilisateurService, Utilisateur } from '../../services/utilisateur.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/user.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Quand le composant se charge, on récupère la liste
    this.utilisateurService.getAllUsers().subscribe({
      next: (data) => {
        this.utilisateurs = data;
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
  // Redirige vers /admin/users/edit/ID
  this.router.navigate([`/admin/users/edit/${id}`]);
}

onDeleteUser(id: number) {
  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    this.utilisateurService.deleteUser(id).subscribe({
      next: () => {
        // Une fois supprimé, on recharge la liste
        this.utilisateurs = this.utilisateurs.filter(u => u.userId !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Échec de la suppression');
      }
    });
  }
}








}
