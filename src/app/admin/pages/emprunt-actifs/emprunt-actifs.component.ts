import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { Emprunt } from '../../../models/emprunt.models';

@Component({
  selector: 'app-emprunt-actifs',
  templateUrl: './emprunt-actifs.component.html',
  styleUrls: ['./emprunt-actifs.component.css']
})
export class EmpruntActifsComponent implements OnInit {
  emprunts: Emprunt[] = [];

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    // Charger la liste "actifs"
    this.empruntService.getEmpruntsActifs().subscribe({
      next: (data) => this.emprunts = data,
      error: (err) => console.error('Erreur chargement emprunts actifs', err)
    });
  }

  onDeleteEmprunt(id: number) {
    if (confirm('Supprimer cet emprunt ?')) {
      this.empruntService.deleteEmprunt(id).subscribe({
        next: () => {
          // Retirer de l'affichage
          this.emprunts = this.emprunts.filter(e => e.empruntId !== id);
        },
        error: (err) => {
          console.error('Erreur suppression emprunt', err);
          alert('Impossible de supprimer');
        }
      });
    }
  }
}
