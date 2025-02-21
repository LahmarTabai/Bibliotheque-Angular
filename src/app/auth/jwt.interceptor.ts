import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // adapt the path if needed

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1) Récupérer le token stocké dans AuthService
    const token = this.authService.getToken();

    // 2) S'il y a un token, cloner la requête et ajouter l'en-tête Authorization
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // 3) Continuer le flux avec la requête clonée
      return next.handle(authReq);
    }

    // 4) S'il n'y a pas de token, on ne modifie pas la requête
    return next.handle(request);
  }
}
