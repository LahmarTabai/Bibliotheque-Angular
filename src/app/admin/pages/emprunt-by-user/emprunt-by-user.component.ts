import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Emprunt } from '../../../models/emprunt.models'; // adapter le chemin
import { Utilisateur } from '../../../models/user.models'; // adapter le chemin

@Component({
  selector: 'app-emprunt-by-user',
  templateUrl: './emprunt-by-user.component.html',
  styleUrls: ['./emprunt-by-user.component.css']
})
export class EmpruntByUserComponent implements OnInit {
  users: Utilisateur[] = [];       // liste complète des utilisateurs
  selectedUserId: number | null = null;
  emprunts: Emprunt[] = [];
  errorMessage = '';

  constructor(
    private empruntService: EmpruntService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    // Charger la liste de tous les utilisateurs
    this.utilisateurService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => {
        console.error('Erreur chargement utilisateurs :', err);
        this.errorMessage = 'Impossible de charger la liste des utilisateurs.';
      }
    });
  }

  // Quand on choisit un user dans la liste déroulante
  onSelectUser() {
    // Vérifier qu'on a un userId sélectionné
    if (!this.selectedUserId) {
      this.emprunts = [];
      return;
    }

    // Appeler le service Emprunt pour récupérer la liste
    this.empruntService.getEmpruntsParUtilisateur(this.selectedUserId).subscribe({
      next: (data) => {
        this.emprunts = data;
        if (data.length === 0) {
          this.errorMessage = `Aucun emprunt trouvé pour l'utilisateur #${this.selectedUserId}.`;
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        console.error('Erreur chargement emprunts par user :', err);
        this.errorMessage = 'Impossible de récupérer les emprunts.';
      }
    });
  }
}
