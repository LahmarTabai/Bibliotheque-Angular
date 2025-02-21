import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { UserEmpruntStats } from '../../../models/emprunt.models';

@Component({
  selector: 'app-stats-emprunts-user',
  templateUrl: './stats-emprunts-user.component.html',
  styleUrls: ['./stats-emprunts-user.component.css']
})
export class StatsEmpruntsUserComponent implements OnInit {

  stats: UserEmpruntStats[] = [];
  errorMessage = '';

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.empruntService.getStatsEmpruntsByUser().subscribe({
      next: (data) => {
        this.stats = data;
        if (data.length === 0) {
          this.errorMessage = 'Aucun résultat.';
        }
      },
      error: (err) => {
        console.error('Erreur chargement stats user :', err);
        this.errorMessage = 'Impossible de récupérer les stats.';
      }
    });
  }
}
