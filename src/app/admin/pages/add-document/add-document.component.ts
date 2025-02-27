import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateDocumentDto } from '../../../models/document.models';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {
  docTitre = '';
  docAuteur = '';
  docDescription = '';
  docFicheTechnique = '';
  // Utilisation d'un objet Date pour le datepicker
  docDatePublication: Date | null = null;
  docQuantite = 1;
  docType = 'Livre';

  errorMessage = '';
  successMessage = '';

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  onSubmit() {
    let dateIso = '';
    if (this.docDatePublication) {
      // Convertit l'objet Date en chaîne ISO (sans la partie millisecondes)
      dateIso = this.docDatePublication.toISOString().slice(0, 19);
    }

    const dto: CreateDocumentDto = {
      docTitre: this.docTitre,
      docAuteur: this.docAuteur,
      docDescription: this.docDescription,
      docFicheTechnique: this.docFicheTechnique,
      docDatePublication: dateIso,
      docQuantite: this.docQuantite,
      docType: this.docType
    };

    this.documentService.createDocument(dto).subscribe({
      next: (createdDoc) => {
        console.log('Document créé :', createdDoc);
        this.successMessage = 'Document créé avec succès !';
        setTimeout(() => {
          this.router.navigate(['/admin/documents']);
        }, 1500);
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        this.errorMessage = 'Impossible de créer le document.';
      }
    });
  }

  onCancel() {
    // Retourne à la liste des documents
    this.router.navigate(['/admin/documents']);
  }
}
