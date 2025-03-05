import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  constructor(private router: Router,
    private authService: AuthService
  ) {}

  onLogout() {
    // Faire la déconnexion, ex: this.authService.logout();
    // et redirection vers login
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
