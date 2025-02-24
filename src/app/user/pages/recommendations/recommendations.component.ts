import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../..//models/document.models';


import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  recommendations: DocumentEntity[] = [];
  message = '';

  constructor(
    private documentService: DocumentService,
    private authService: AuthService
  ) {
    console.log('[DEBUG] constructor RecommendationsComponent');
  }

  ngOnInit(): void {
    console.log('[DEBUG] ngOnInit RecommendationsComponent');

    // On récupère l'ID de l'utilisateur depuis AuthService
    const userId = this.authService.getUserId();
    console.log('[DEBUG] userId =', userId);

    if (!userId) {
      this.message = 'Vous devez être connecté pour voir les recommandations.';
      return;
    }

    // Appeler le service
    this.documentService.getRecommendationsForUser(userId).subscribe({
      next: (docs) => {
        console.log('[DEBUG] Reçus docs recommendations:', docs);
        this.recommendations = docs;
        if (docs.length === 0) {
          this.message = 'Aucune recommandation disponible pour le moment.';
        }
      },
      error: (err) => {
        console.error('[DEBUG] Erreur chargement recommandations:', err);
        this.message = 'Impossible de charger les recommandations.';
      }
    });
  }
}
