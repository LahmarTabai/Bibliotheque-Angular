import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  documentForm!: FormGroup;
  documentId!: number;
  documentData!: DocumentEntity | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID depuis l'URL
    this.documentId = +this.route.snapshot.paramMap.get('id')!;

    // Création du formulaire avec tous les champs obligatoires
    this.documentForm = this.fb.group({
      docTitre: ['', Validators.required],
      docAuteur: [''],
      docDescription: [''],
      docFicheTechnique: [''],
      // Utilisation d'un input type="date" : le contrôle attend une chaîne au format 'yyyy-MM-dd'
      docDatePublication: ['', Validators.required],
      docQuantite: [1, [Validators.required, Validators.min(1)]],
      // Ce champ est non-nullable dans la BDD, il faut donc le fournir
      docQuantiteDispo: [1, [Validators.required, Validators.min(0)]],
      docType: ['', Validators.required]
    });

    // Charger le document pour pré-remplir le formulaire
    this.loadDocument();
  }

  loadDocument(): void {
    this.documentService.getDocumentById(this.documentId).subscribe({
      next: (doc) => {
        this.documentData = doc;
        // Pour la date, on suppose que le back renvoie une chaîne ISO
        // On extrait la partie "yyyy-MM-dd" pour le champ type="date"
        const datePublication = doc.docDatePublication ? doc.docDatePublication.substring(0, 10) : '';
        this.documentForm.patchValue({
          docTitre: doc.docTitre,
          docAuteur: doc.docAuteur,
          docDescription: doc.docDescription,
          docFicheTechnique: doc.docFicheTechnique,
          docDatePublication: datePublication,
          docQuantite: doc.docQuantite,
          docQuantiteDispo: doc.docQuantiteDispo,
          docType: doc.docType
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du document : ', err);
      }
    });
  }

  onSubmit(): void {
    if (this.documentForm.invalid) {
      return;
    }
    // Construire l'objet de mise à jour
    const updatedDoc: Partial<DocumentEntity> = {
      docTitre: this.documentForm.value.docTitre,
      docAuteur: this.documentForm.value.docAuteur,
      docDescription: this.documentForm.value.docDescription,
      docFicheTechnique: this.documentForm.value.docFicheTechnique,
      // Conversion de la date depuis la chaîne 'yyyy-MM-dd' en format ISO
      docDatePublication: new Date(this.documentForm.value.docDatePublication).toISOString(),
      docQuantite: this.documentForm.value.docQuantite,
      docQuantiteDispo: this.documentForm.value.docQuantiteDispo,
      docType: this.documentForm.value.docType
    };

    // Appel du service pour mettre à jour le document
    this.documentService.updateDocument(this.documentId, updatedDoc).subscribe({
      next: (res) => {
        console.log('Document mis à jour avec succès', res);
        this.router.navigate(['/admin/documents']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du document : ', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/documents']);
  }
}
