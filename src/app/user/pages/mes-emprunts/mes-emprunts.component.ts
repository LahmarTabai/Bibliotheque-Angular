import { Component, OnInit } from '@angular/core';
import { Emprunt } from '../../../models/emprunt.models';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models'; // adapter le nom

@Component({
  selector: 'app-mes-emprunts',
  templateUrl: './mes-emprunts.component.html',
  styleUrls: ['./mes-emprunts.component.css']
})
export class MesEmpruntsComponent implements OnInit {
  emprunts: Array<Emprunt & { docTitre?: string }> = [];
  userId = 5; // ou récupéré depuis AuthService
  message = '';

  constructor(
    private empruntService: EmpruntService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    // Charger les emprunts
    this.empruntService.getEmpruntsParUtilisateur(this.userId).subscribe({
      next: (data) => {
        // data est Emprunt[]
        // On va fetch docTitre pour chaque emprunt
        data.forEach((e) => {
          this.documentService.getDocumentById(e.docId).subscribe({
            next: (doc) => {
              // On étend l'objet emprunt pour lui ajouter docTitre
              const empruntAvecTitre = { ...e, docTitre: doc.docTitre };
              this.emprunts.push(empruntAvecTitre);
            },
            error: (err) => {
              console.error('Erreur doc', err);
              this.emprunts.push(e); // on push quand même
            }
          });
        });
      },
      error: (err) => {
        console.error('Erreur emprunts user :', err);
        this.message = 'Impossible de charger vos emprunts.';
      }
    });
  }

  onRetourner(empruntId: number) {
    this.empruntService.retourner(empruntId).subscribe({
      next: (empruntRet) => {
        this.message = `Emprunt #${empruntRet.empruntId} retourné avec succès !`;
        // Retirer de la liste ou changer son status
        this.emprunts = this.emprunts.filter(e => e.empruntId !== empruntId);
      },
      error: (err) => {
        console.error('Erreur lors du retour :', err);
        this.message = 'Impossible de retourner l’emprunt. ' + (err.error?.message || '');
      }
    });
  }
}
