import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: DocumentEntity[] = [];
  userId: number | null = null;
  message = '';

  // On injecte DocumentService ET AuthService
  constructor(
    private documentService: DocumentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer l'userId depuis AuthService
    this.userId = this.authService.getUserId();
    console.log('==> [DEBUG] userId récupéré :', this.userId);
    if (!this.userId) {
      // Pas loggué ?
      this.message = 'Veuillez vous connecter pour voir les recommandations.';
      return;
    }

    // Appeler l’endpoint avec le userId
    this.documentService.getRecommendationsForUser(this.userId).subscribe({
      next: (docs) => {
        console.log('==> [DEBUG] Réponse de getRecommendationsForUser :', docs);
        this.recommendations = docs;
        if (docs.length === 0) {
          this.message = 'Aucune recommandation disponible pour le moment.';
        }
      },
      error: (err) => {
        console.error('Erreur chargement recommandations :', err);
        this.message = 'Impossible de charger les recommandations.';
      }
    });
  }
}
