import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();
    if (role === 'ADMIN') {
      return true;
    } else {
      // Si l'utilisateur n'est pas admin, rediriger vers la page de login ou une page d'erreur
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
