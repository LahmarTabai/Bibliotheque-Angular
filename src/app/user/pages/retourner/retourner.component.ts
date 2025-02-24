import { Component, OnInit } from '@angular/core';
import { Emprunt } from '../../../models/emprunt.models';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';

@Component({
  selector: 'app-retourner',
  templateUrl: './retourner.component.html',
  styleUrls: ['./retourner.component.css']
})
export class RetournerComponent implements OnInit {
  empruntsActifs: Array<Emprunt & { docTitre?: string }> = [];
  userId = 5; // ou récupéré depuis AuthService, token...
  message = '';

  constructor(
    private empruntService: EmpruntService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    // 1) Charger TOUTES les emprunts du user
    this.empruntService.getEmpruntsParUtilisateur(this.userId).subscribe({
      next: (emprunts: Emprunt[]) => {
        // 2) On ne garde que ceux dont status="Actif"
        const actifs = emprunts.filter(e => e.status === 'Actif');

        // 3) Pour chacun, on va chercher le docTitre
        actifs.forEach(e => {
          this.documentService.getDocumentById(e.docId).subscribe({
            next: (doc: DocumentEntity) => {
              // On enrichit l'emprunt avec docTitre
              const avecTitre = { ...e, docTitre: doc.docTitre };
              this.empruntsActifs.push(avecTitre);
            },
            error: (err) => {
              console.error('Erreur document:', err);
              // on push quand même l'emprunt, sans titre
              this.empruntsActifs.push(e);
            }
          });
        });
      },
      error: (err) => {
        console.error('Erreur emprunts user:', err);
        this.message = 'Impossible de charger vos emprunts.';
      }
    });
  }

  onRetourner(empruntId: number) {
    this.empruntService.retourner(empruntId).subscribe({
      next: (updated: Emprunt) => {
        this.message = `Emprunt #${updated.empruntId} retourné avec succès !`;
        // Retirer l’emprunt de la liste (ou mettre status="Cloturee")
        this.empruntsActifs = this.empruntsActifs.filter(e => e.empruntId !== empruntId);
      },
      error: (err) => {
        console.error('Erreur lors du retour:', err);
        this.message = 'Impossible de retourner. ' + (err.error?.message || '');
      }
    });
  }
}
