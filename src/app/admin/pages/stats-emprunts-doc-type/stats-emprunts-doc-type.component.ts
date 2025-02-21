import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentTypeStats } from '../../../models/emprunt.models';

@Component({
  selector: 'app-stats-emprunts-doc-type',
  templateUrl: './stats-emprunts-doc-type.component.html',
  styleUrls: ['./stats-emprunts-doc-type.component.css']
})
export class StatsEmpruntsDocTypeComponent implements OnInit {

  stats: DocumentTypeStats[] = [];
  errorMessage = '';

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.empruntService.getStatsEmpruntsByDocType().subscribe({
      next: (data) => {
        this.stats = data;
        if (data.length === 0) {
          this.errorMessage = 'Aucun résultat pour les stats.';
        }
      },
      error: (err) => {
        console.error('Erreur chargement stats docType :', err);
        this.errorMessage = 'Impossible de récupérer les stats.';
      }
    });
  }
}
