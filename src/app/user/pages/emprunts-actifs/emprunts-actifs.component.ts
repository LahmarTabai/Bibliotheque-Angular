import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentService } from '../../../services/document.service';
import { Emprunt } from '../../../models/emprunt.models';
import { DocumentEntity } from '../../../models/document.models';

@Component({
  selector: 'app-emprunts-actifs',
  templateUrl: './emprunts-actifs.component.html',
  styleUrls: ['./emprunts-actifs.component.css']
})
export class EmpruntsActifsComponent implements OnInit {
  empruntsActifs: Array<Emprunt & { docTitre?: string }> = [];
  userId = 5; // ou récupéré via AuthService / token
  message = '';

  constructor(
    private empruntService: EmpruntService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    // 1) Charger tous les emprunts de l’utilisateur
    this.empruntService.getEmpruntsParUtilisateur(this.userId).subscribe({
      next: (allEmprunts: Emprunt[]) => {
        // 2) Filtrer ceux qui sont Actifs
        const actifs = allEmprunts.filter(e => e.status === 'Actif');
        // 3) Récupérer docTitre pour chacun
        actifs.forEach(e => {
          this.documentService.getDocumentById(e.docId).subscribe({
            next: (doc: DocumentEntity) => {
              this.empruntsActifs.push({ ...e, docTitre: doc.docTitre });
            },
            error: (err) => {
              console.error('Erreur doc :', err);
              this.empruntsActifs.push(e); // au moins on l’affiche sans titre
            }
          });
        });
      },
      error: (err) => {
        console.error('Erreur emprunts user:', err);
        this.message = 'Impossible de charger vos emprunts actifs.';
      }
    });
  }
}
