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
  selector: 'app-emprunts-actifs',
  templateUrl: './emprunts-actifs.component.html',
  styleUrls: ['./emprunts-actifs.component.css']
})
export class EmpruntsActifsComponent implements OnInit {
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
    // Récupérer l'ID de l'utilisateur connecté
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
        // Filtrer les emprunts actifs
        const actifs = emprunts.filter(e => e.status === 'Actif');
        // Créer un tableau d'observables pour enrichir chaque emprunt avec le titre du document
        const observables = actifs.map(e =>
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
            // Configurer le paginator et le tri
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
    this.empruntService.retourner(empruntId).subscribe({
      next: (updated: Emprunt) => {
        this.message = `Emprunt #${updated.empruntId} retourné avec succès !`;
        this.dataSource.data = this.dataSource.data.filter(e => e.empruntId !== empruntId);
      },
      error: (err) => {
        console.error('Erreur lors du retour:', err);
        this.message = 'Impossible de retourner l’emprunt. ' + (err.error?.message || '');
      }
    });
  }
}
