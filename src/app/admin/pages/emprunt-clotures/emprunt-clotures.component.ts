import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { Emprunt } from '../../../models/emprunt.models';

@Component({
  selector: 'app-emprunt-clotures',
  templateUrl: './emprunt-clotures.component.html',
  styleUrls: ['./emprunt-clotures.component.css']
})
export class EmpruntCloturesComponent implements OnInit {
  emprunts: Emprunt[] = [];

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.empruntService.getEmpruntsClotures().subscribe({
      next: (data) => {
        this.emprunts = data;
      },
      error: (err) => {
        console.error('Erreur chargement emprunts cloturés :', err);
      }
    });
  }

  onDeleteEmprunt(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet emprunt clôturé ?')) {
      this.empruntService.deleteEmprunt(id).subscribe({
        next: () => {
          this.emprunts = this.emprunts.filter(e => e.empruntId !== id);
        },
        error: (err) => {
          console.error('Erreur suppression emprunt', err);
        }
      });
    }
  }
}
