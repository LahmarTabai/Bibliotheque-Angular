import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // ajustez le chemin si nécessaire

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Récupère l'utilisateur via AuthService
    const token = this.authService.getToken();
    const role = this.authService.getRole();

    // Vérifier que l'utilisateur est connecté
    if (token) {
      // Optionnel : si vous souhaitez restreindre aux "USER" (et éventuellement autoriser les "ADMIN"),
      // vous pouvez adapter la condition. Par exemple, pour n'autoriser que les utilisateurs standards :
      if (role === 'USER') {
        return true;
      } else {
        // Si vous ne souhaitez pas autoriser les ADMIN sur les pages user, vous pouvez rediriger
        this.router.navigate(['/admin']);
        return false;
      }
      // Si vous souhaitez autoriser aussi les admins, vous pouvez simplement retourner true ici.
    } else {
      // Si aucun token n'est présent, rediriger vers la page de login
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
