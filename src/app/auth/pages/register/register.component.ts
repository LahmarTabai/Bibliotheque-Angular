import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userNom = '';
  userPrenom = '';
  userEmail = '';
  userTel = '';
  password = '';
  confirmPassword = ''; // <-- nouveau champ
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    // 1) Vérifier correspondance des passwords
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      this.successMessage = '';
      return;
    }

    // 2) Construire l'objet userData
    const userData = {
      userNom: this.userNom,
      userPrenom: this.userPrenom,
      userEmail: this.userEmail,
      userTel: this.userTel,

      // Toujours USER
      role: 'USER',

      // On envoie password (le champ “confirmPassword” n’existe pas dans la BDD)
      password: this.password,

      // Forcer passwordChanged = true si tu veux que, dans la BDD, ce soit directement 1
      // Mais attention au code backend qui fait setPasswordChanged(false) si c'est null.
      // Pour contourner, on envoie la propriété passwordChanged.
      passwordChanged: true
    };

    console.log('Envoi de userData :', userData);

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Compte créé, réponse backend :', response);
        this.successMessage = 'Compte créé avec succès. Vous pouvez maintenant vous connecter.';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur lors de la création du compte :', err);
        this.errorMessage = err.error?.message || 'Impossible de créer le compte.';
        this.successMessage = '';
      }
    });
  }
}
