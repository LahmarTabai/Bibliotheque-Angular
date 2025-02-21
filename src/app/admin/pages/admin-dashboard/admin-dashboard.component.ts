import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private router: Router) { }

  goToUsers() {
    // redirige vers /admin/users
    this.router.navigate(['/admin/users']);
  }

  // Exemple pour la gestion des documents
  goToDocuments() {
    this.router.navigate(['/admin/documents']);
  }

  // Exemple pour la gestion des emprunts
  goToEmprunts() {
    this.router.navigate(['/admin/emprunts']);
  }

  goToEmpruntsActifs() {
    this.router.navigate(['/admin/emprunts-actifs']);
  }

  goToEmpruntsClotures() {
    this.router.navigate(['/admin/emprunts-clotures']);
  }

  goToDocumentsDispo() {
    this.router.navigate(['/admin/documents-dispo']);
  }

  goToEmpruntsByUser() {
    this.router.navigate(['/admin/emprunts-user']);
  }

  goToSearchUser() {
    this.router.navigate(['/admin/user-search']);
  }

  goToSearchDocuments() {
    this.router.navigate(['/admin/search-documents']);
  }

  goToStatsEmpruntsByUser() {
    this.router.navigate(['/admin/emprunts-stats-users']);
  }

  goToStatsEmpruntsByDocType() {
    this.router.navigate(['/admin/emprunts-stats-docTypes']);
  }



}
