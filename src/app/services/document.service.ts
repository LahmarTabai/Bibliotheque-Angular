import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDocumentDto, DocumentEntity } from '../models/document.models';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:8082/api/documents';

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<DocumentEntity[]> {
    return this.http.get<DocumentEntity[]>(this.baseUrl);
  }

  createDocument(dto: CreateDocumentDto): Observable<DocumentEntity> {
    return this.http.post<DocumentEntity>(this.baseUrl, dto);
  }

  getDocumentById(id: number): Observable<DocumentEntity> {
    return this.http.get<DocumentEntity>(`${this.baseUrl}/${id}`);
  }

  updateDocument(id: number, data: Partial<CreateDocumentDto>): Observable<DocumentEntity> {
    return this.http.put<DocumentEntity>(`${this.baseUrl}/${id}`, data);
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getDocumentsDisponibles(): Observable<DocumentEntity[]> {
    return this.http.get<DocumentEntity[]>(`${this.baseUrl}/disponibles`);
  }

  searchDocuments(params: {
  titre?: string;
  auteur?: string;
  description?: string;
  docType?: string;
  dateFrom?: string;
  dateTo?: string;
}): Observable<DocumentEntity[]> {
  // Construire un query string
  let query = '';
  const queryParams: string[] = [];
  if (params.titre) { queryParams.push(`titre=${encodeURIComponent(params.titre)}`); }
  if (params.auteur) { queryParams.push(`auteur=${encodeURIComponent(params.auteur)}`); }
  if (params.description) { queryParams.push(`description=${encodeURIComponent(params.description)}`); }
  if (params.docType) { queryParams.push(`docType=${encodeURIComponent(params.docType)}`); }
  if (params.dateFrom) { queryParams.push(`dateFrom=${encodeURIComponent(params.dateFrom)}`); }
  if (params.dateTo) { queryParams.push(`dateTo=${encodeURIComponent(params.dateTo)}`); }

  if (queryParams.length > 0) {
    query = '?' + queryParams.join('&');
  }

  return this.http.get<DocumentEntity[]>(`${this.baseUrl}/search${query}`);
}




}
