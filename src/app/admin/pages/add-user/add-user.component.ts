import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CreateUserDto, Utilisateur } from '../../../models/user.models';
import { UtilisateurService } from '../../../services/utilisateur.service';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userNom = '';
  userPrenom = '';
  userEmail = '';
  userTel = '';
  role = 'USER';      // valeur par défaut
  password = 'test';  // mot de passe initial ?

  errorMessage = '';
  successMessage = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  onSubmit() {
  const dto: CreateUserDto = {
    userNom: this.userNom,
    userPrenom: this.userPrenom,
    userEmail: this.userEmail,
    userTel: this.userTel,
    role: this.role,
    password: this.password
  };

  // On appelle createUser(dto), qui renvoie un Observable<Utilisateur>
  this.utilisateurService.createUser(dto).subscribe({
    next: (createdUser: Utilisateur) => {
      console.log('Utilisateur créé :', createdUser);
      this.successMessage = `Utilisateur ${createdUser.userNom} créé avec succès !`;
      setTimeout(() => {
        this.router.navigate(['/admin/users']);
      }, 1500);
    },
    error: (err) => {
      console.error('Erreur lors de la création :', err);
      this.errorMessage = 'Impossible de créer l\'utilisateur.';
    }
  });
}

}
