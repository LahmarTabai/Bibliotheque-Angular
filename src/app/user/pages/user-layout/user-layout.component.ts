import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})


export class UserLayoutComponent implements OnInit {

  userFullName: string = '';

   constructor(private router: Router,
     private authService: AuthService
   ) {}

   onLogout() {
    // Faire la déconnexion, ex: this.authService.logout();
    // et redirection vers login
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    // Imaginons que vous ayez l'ID du user
    const userId = this.authService.getUserId();
    if (userId) {
      // On récupère l'utilisateur complet
      this.authService.getUserById(userId).subscribe({
        next: (user) => {
          // user = { userId: 17, userNom: "Admin", userPrenom: "System", ... }
          this.userFullName = `${user.userPrenom} ${user.userNom}`;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l’utilisateur :', err);
        }
      });
    }
  }




}
