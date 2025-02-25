import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  motDePasse = ''; // Changer le nom pour correspondre au backend
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

    onSubmit() {
    // On envoie email + motDePasse
    this.authService.login(this.email, this.motDePasse).subscribe({
      next: (response) => {
        console.log('Réponse du backend :', response);
        // response = {
        //   utilisateur: { userId, role, ... },
        //   mustChangePassword: boolean,
        //   token: string
        // }

        if (response.token) {
          const userId = response.utilisateur?.userId || 0;
          const role = response.utilisateur?.role || 'USER';

          // On stocke le token, le rôle, et l'userId
          this.authService.setAuthData(response.token, role, userId);

          if (response.mustChangePassword) {
            // Si mustChangePassword = true, on redirige vers la page de changement
            this.router.navigate(['/auth/changePassword']);
          } else {
            // Sinon, on redirige selon le rôle
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
          }
        }
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        this.errorMessage = 'Identifiants invalides ou erreur du serveur';
      }
    });
  }


  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

}
