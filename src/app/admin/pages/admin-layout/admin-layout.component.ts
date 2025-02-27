import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  constructor(private router: Router) {}

  onLogout() {
    // Faire la déconnexion, ex: this.authService.logout();
    // et redirection vers login
    this.router.navigate(['/auth/login']);
  }

}
