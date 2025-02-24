import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Ton backend est accessible via /api/utilisateurs
  private apiUrl = 'http://localhost:8082/api/utilisateurs';

  private userToken: string | null = null;
  private userRole: string | null = null;
  private userId: number | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Envoie l'email et le motDePasse pour s'authentifier.
   * Backend renvoie { utilisateur, mustChangePassword, token }
   */
  login(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };
    // On appelle /api/utilisateurs/authentifier
    return this.http.post<any>(`${this.apiUrl}/authentifier`, body);
  }

  /**
   * Stocke en localStorage le token JWT et le rôle de l'utilisateur
   */
  setAuthData(token: string, role: string, userId: number) {
    this.userToken = token;
    this.userRole = role;
    this.userId = userId;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', String(userId));
  }

  /**
   * Récupère le token depuis la variable interne ou localStorage
   */
  getToken(): string | null {
    if (!this.userToken) {
      this.userToken = localStorage.getItem('token');
    }
    return this.userToken;
  }

  /**
   * Récupère le rôle (ADMIN / USER)
   */
  getRole(): string | null {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('role');
    }
    return this.userRole;
  }

   // Nouvelle méthode getUserId
  getUserId(): number | null {
    if (!this.userId) {
      const storedId = localStorage.getItem('userId');
      if (storedId) {
        this.userId = parseInt(storedId, 10);
      }
    }
    return this.userId;
  }

  /**
   * Indique si on est connecté (si on a un token)
   */
  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  /**
   * Efface les infos de session
   */
  logout() {
    this.userToken = null;
    this.userRole = null;
    this.userId = null;  // reset
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

}
