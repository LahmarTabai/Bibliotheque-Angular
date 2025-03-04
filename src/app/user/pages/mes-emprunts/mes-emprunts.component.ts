import { Component, OnInit, ViewChild } from '@angular/core';
import { Emprunt } from '../../../models/emprunt.models';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentService } from '../../../services/document.service';
import { AuthService } from '../../../auth/auth.service';
import { DocumentEntity } from '../../../models/document.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-mes-emprunts',
  templateUrl: './mes-emprunts.component.html',
  styleUrls: ['./mes-emprunts.component.css']
})
export class MesEmpruntsComponent implements OnInit {
  displayedColumns: string[] = ['empruntId', 'docTitre', 'dateEmprunt', 'dateEcheance', 'status', 'actions'];
  dataSource = new MatTableDataSource<Emprunt & { docTitre?: string }>();
  message = '';
  userId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private empruntService: EmpruntService,
    private documentService: DocumentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId === null) {
      this.message = 'Vous devez être connecté pour voir vos emprunts.';
      return;
    }
    this.loadEmprunts();
  }

  loadEmprunts(): void {
    this.empruntService.getEmpruntsParUtilisateur(this.userId!).subscribe({
      next: (emprunts: Emprunt[]) => {
        const observables = emprunts.map(e =>
          this.documentService.getDocumentById(e.docId).pipe(
            map((doc: DocumentEntity) => ({ ...e, docTitre: doc.docTitre })),
            catchError(err => {
              console.error('Erreur lors du chargement du document', err);
              return of(e);
            })
          )
        );
        forkJoin(observables).subscribe({
          next: (results: Array<Emprunt & { docTitre?: string }>) => {
            this.dataSource.data = results;
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          },
          error: (err) => {
            console.error('Erreur lors de l\'enrichissement des emprunts', err);
            this.message = 'Impossible de charger vos emprunts.';
          }
        });
      },
      error: (err) => {
        console.error('Erreur chargement des emprunts utilisateur:', err);
        this.message = 'Impossible de charger vos emprunts.';
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRetourner(empruntId: number): void {
  // Trouver l'emprunt dans la dataSource pour vérifier son statut
  const emprunt = this.dataSource.data.find(e => e.empruntId === empruntId);
  if (emprunt && emprunt.status === 'Cloturée') {
    this.message = 'Cet emprunt est déjà clôturé et ne peut pas être retourné.';
    return;
  }

  this.empruntService.retourner(empruntId).subscribe({
    next: (updated: Emprunt) => {
      this.message = `Emprunt #${updated.empruntId} retourné avec succès !`;
      // Mise à jour de la dataSource en retirant l'emprunt retourné
      this.dataSource.data = this.dataSource.data.filter(e => e.empruntId !== empruntId);
    },
    error: (err) => {
      console.error('Erreur lors du retour:', err);
      this.message = 'Impossible de retourner l’emprunt. ' + (err.error?.message || '');
    }
  });
}

}
