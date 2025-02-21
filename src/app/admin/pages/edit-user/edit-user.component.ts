import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/user.models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId!: number;
  userNom = '';
  userPrenom = '';
  userEmail = '';
  userTel = '';
  role = 'USER';
  // On ne force pas forcément à changer le password ici, sauf si souhaité

  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL /admin/users/edit/:id
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    // Charger l'utilisateur depuis le backend
    this.utilisateurService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userNom = user.userNom;
        this.userPrenom = user.userPrenom;
        this.userEmail = user.userEmail;
        this.userTel = user.userTel || '';
        this.role = user.role;
      },
      error: (err) => {
        console.error('Erreur pour charger l\'utilisateur :', err);
        this.errorMessage = 'Impossible de charger l\'utilisateur.';
      }
    });
  }

  onSubmit() {
    // Construire un objet partiel (on ne veut pas forcément changer le password ici)
    const updatedUser: Partial<Utilisateur> = {
      userNom: this.userNom,
      userPrenom: this.userPrenom,
      userEmail: this.userEmail,
      userTel: this.userTel,
      role: this.role
    };

    this.utilisateurService.updateUser(this.userId, updatedUser).subscribe({
      next: (userModifie) => {
        console.log('Utilisateur modifié :', userModifie);
        this.successMessage = 'Utilisateur mis à jour avec succès !';
        setTimeout(() => {
          this.router.navigate(['/admin/users']);
        }, 1500);
      },
      error: (err) => {
        console.error('Erreur lors de la modification :', err);
        this.errorMessage = 'Impossible de modifier l\'utilisateur.';
      }
    });
  }
}
