import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt, UserEmpruntStats, DocumentTypeStats } from '../models/emprunt.models';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {
  private baseUrl = 'http://localhost:8082/api/emprunts';

  constructor(private http: HttpClient) {}

  // Obtenir tous les emprunts
  getAllEmprunts(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(this.baseUrl);
  }

  // Récupérer un emprunt par ID
  getEmpruntById(id: number): Observable<Emprunt> {
    return this.http.get<Emprunt>(`${this.baseUrl}/${id}`);
  }

  getEmpruntsActifs(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.baseUrl}/actifs`);
  }

  getEmpruntsClotures(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.baseUrl}/clotures`);
  }


  // Supprimer un emprunt
  deleteEmprunt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //Emprunter un document (POST /emprunts/emprunter)
  // emprunter(empruntData: Partial<Emprunt>): Observable<Emprunt> {
  //   return this.http.post<Emprunt>(`${this.baseUrl}/emprunter`, empruntData);
  // }

  //Emprunter un document (POST /emprunts/emprunter)
  emprunterDocument(userId: number, docId: number, dateEcheance: string): Observable<Emprunt> {
    // Construire le JSON que ton backend attend (Emprunt).
    // Ton backend parse Emprunt avec userId, docId, dateEcheance...
    const body = {
      userId: userId,
      docId: docId,
      dateEcheance: dateEcheance + 'T00:00:00', // format "2025-03-10T00:00:00"
      status: 'Actif'
    };
    return this.http.post<Emprunt>(`${this.baseUrl}/emprunter`, body);
  }




  // Retourner un document (PUT /emprunts/retourner/{id})
  retourner(empruntId: number): Observable<Emprunt> {
    return this.http.put<Emprunt>(`${this.baseUrl}/retourner/${empruntId}`, {});
  }

  // Liste d’emprunts par utilisateur
  getEmpruntsParUtilisateur(userId: number): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.baseUrl}/utilisateur/${userId}`);
  }

  getStatsEmpruntsByUser(): Observable<UserEmpruntStats[]> {
    return this.http.get<UserEmpruntStats[]>(`${this.baseUrl}/stats/users`);
  }

  getStatsEmpruntsByDocType(): Observable<DocumentTypeStats[]> {
    return this.http.get<DocumentTypeStats[]>(`${this.baseUrl}/stats/docTypes`);
  }

  getEmpruntsActifsParUser(userId: number): Observable<Emprunt[]> {
  return this.http.get<Emprunt[]>(`${this.baseUrl}/utilisateurActifs/${userId}`);
}


}
