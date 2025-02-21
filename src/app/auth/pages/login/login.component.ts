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
        // response = { utilisateur: { role: ... }, mustChangePassword: false, token: "..." }

        if (response.token) {
          // Stocker token + rôle
          const role = response.utilisateur?.role || 'USER';
          // si jamais l'objet utilisateur est null ou n'a pas role

          this.authService.setAuthData(response.token, role);

          // Rediriger selon le rôle
          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        }
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        this.errorMessage = 'Identifiants invalides ou erreur du serveur';
      }
    });
  }
}
