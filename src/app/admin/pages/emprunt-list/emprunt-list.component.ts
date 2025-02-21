import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { Emprunt } from '../../../models/emprunt.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emprunt-list',
  templateUrl: './emprunt-list.component.html',
  styleUrls: ['./emprunt-list.component.css']
})
export class EmpruntListComponent implements OnInit {

  emprunts: Emprunt[] = [];

  constructor(
    private empruntService: EmpruntService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empruntService.getAllEmprunts().subscribe({
      next: (data) => {
        this.emprunts = data;
      },
      error: (err) => {
        console.error('Erreur chargement emprunts :', err);
      }
    });
  }

  onDeleteEmprunt(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet emprunt ?')) {
      this.empruntService.deleteEmprunt(id).subscribe({
        next: () => {
          this.emprunts = this.emprunts.filter(e => e.empruntId !== id);
        },
        error: (err) => {
          console.error('Erreur suppression emprunt', err);
          alert('Impossible de supprimer l’emprunt.');
        }
      });
    }
  }

  onRetournerEmprunt(id: number) {
    if (confirm('Voulez-vous retourner ce document ?')) {
      this.empruntService.retourner(id).subscribe({
        next: (updated) => {
          // Mettre à jour l’emprunt dans le tableau local
          const index = this.emprunts.findIndex(e => e.empruntId === id);
          if (index !== -1) {
            this.emprunts[index] = updated;
          }
        },
        error: (err) => {
          console.error('Erreur lors du retour', err);
          alert('Impossible de retourner le document.');
        }
      });
    }
  }
}
