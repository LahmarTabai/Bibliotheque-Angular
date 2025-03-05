import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { EmpruntService } from '../../../services/emprunt.service';
import { AuthService } from '../../../auth/auth.service';
import { DocumentEntity } from '../../../models/document.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-search-documents',
  templateUrl: './search-documents.component.html',
  styleUrls: ['./search-documents.component.css']
})
export class SearchDocumentsComponent implements OnInit {
  // Champs de recherche
  titre = '';
  auteur = '';
  description = '';
  docType = '';
  // Les dates seront saisies via le datepicker (format affiché "dd/MM/yyyy" grâce à la configuration de l'adaptateur)
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  // MatTableDataSource pour la datatable
  dataSource = new MatTableDataSource<DocumentEntity>();
  displayedColumns: string[] = [
    'docId',
    'docTitre',
    'docAuteur',
    'docType',
    'docQuantiteDispo',
    'docDatePublication',
    'action'
  ];

  message = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    // ID de l'utilisateur connecté
  userId: number | null = null;

 constructor(
    private documentService: DocumentService,
    private empruntService: EmpruntService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID utilisateur
    this.userId = this.authService.getUserId();
    // Initialement, la table est vide
    this.dataSource.data = [];
  }

  // Convertit un objet Date (ou similaire) en chaîne "yyyy-MM-dd HH:mm:ss"
  formatDate(date: any, defaultTime: string): string {
    if (date && typeof date.format === 'function') {
      // Si date est un objet Moment (si vous utilisez MomentDateAdapter)
      return date.format('YYYY-MM-DD') + ' ' + defaultTime;
    } else if (date instanceof Date) {
      const pad = (n: number) => n < 10 ? '0' + n : n;
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      return `${year}-${month}-${day} ${defaultTime}`;
    }
    return '';
  }

  // Convertit une date de publication du backend (format "YYYY-MM-DD HH:mm:ss.000000")
  // en format français "dd/MM/yyyy HH:mm:ss"
  convertDate(dateStr: string): string {
    if (!dateStr) {
      return '';
    }
    // Pour obtenir un format ISO, remplacez l'espace par "T"
    const isoStr = dateStr.replace(' ', 'T');
    const date = new Date(isoStr);
    if (isNaN(date.getTime())) {
      return dateStr;
    }
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  onSearch(): void {
    const params: any = {};

    if (this.titre.trim()) { params.titre = this.titre.trim(); }
    if (this.auteur.trim()) { params.auteur = this.auteur.trim(); }
    if (this.description.trim()) { params.description = this.description.trim(); }
    if (this.docType.trim()) { params.docType = this.docType.trim(); }

    // Convertir les dates sélectionnées en format "yyyy-MM-dd HH:mm:ss"
    if (this.dateFrom) {
      params.dateFrom = this.formatDate(this.dateFrom, '00:00:00'); // début de journée
    }
    if (this.dateTo) {
      params.dateTo = this.formatDate(this.dateTo, '23:59:59'); // fin de journée
    }

    this.documentService.searchDocuments(params).subscribe({
      next: (docs: DocumentEntity[]) => {
        this.dataSource.data = docs;
        this.message = docs.length === 0 ? 'Aucun document trouvé.' : '';
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Erreur recherche documents :', err);
        this.message = 'Impossible de faire la recherche.';
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Action d'emprunt (à adapter selon votre service)
  onEmprunter(docId: number): void {
    // Par exemple, vous pouvez appeler votre service d'emprunt ici
    this.message = `Action emprunter pour le document #${docId} déclenchée.`;
  }
}









  // ngOnInit(): void {
  //   // Récupération de l'ID utilisateur
  //   this.userId = this.authService.getUserId();
  //   // Initialement, la table est vide
  //   this.dataSource.data = [];
  // }
