import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  constructor(private router: Router) {}

  goToEmprunter() {
    this.router.navigate(['/user/emprunter']);
  }
  goToRetourner() {
    this.router.navigate(['/user/retourner']);
  }

  goToMesEmprunts() {
    this.router.navigate(['/user/mes-emprunts']);
  }

  goToEmpruntsActifs() {
    this.router.navigate(['/user/emprunts-actifs']);
  }
  goToDocumentsDispo() {
    this.router.navigate(['/user/documents-dispo']);
  }

  goToSearchDocuments() {
    this.router.navigate(['/user/search-documents']);
  }
  goToRecommandations() {
    this.router.navigate(['/user/recommandations']);
  }
}
