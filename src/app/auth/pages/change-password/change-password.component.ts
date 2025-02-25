import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';
  confirmNewPassword = '';

  errorMessage = '';
  successMessage = '';

  // On suppose qu'on récupère l'userId depuis l'AuthService
  userId = this.authService.getUserId();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router   // <-- on injecte le Router
  ) {}

  onSubmit() {
    if (!this.userId) {
      this.errorMessage = 'Vous n’êtes pas connecté.';
      return;
    }
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const body = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    };

    this.http.post(`http://localhost:8082/api/utilisateurs/${this.userId}/changePassword`, body)
      .subscribe({
        next: (user: any) => {
          console.log('Mot de passe changé pour user:', user);
          this.successMessage = 'Mot de passe changé avec succès.';
          this.errorMessage = '';

          // Rediriger vers la page de login
          // Attendre 2 secondes avant de rediriger
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 2000);
        },
        error: (err) => {
          console.error('Erreur changePassword:', err);
          this.errorMessage = err.error?.message || 'Impossible de changer le mot de passe.';
          this.successMessage = '';
        }
      });
  }
}
