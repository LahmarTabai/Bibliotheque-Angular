import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { DocumentEntity } from '../../../models/document.models';
import { AuthService } from '../../../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['docId', 'docTitre', 'docAuteur', 'docType', 'docQuantiteDispo'];
  dataSource = new MatTableDataSource<DocumentEntity>();
  message = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private documentService: DocumentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.message = 'Vous devez être connecté pour voir les recommandations.';
      return;
    }
    this.documentService.getRecommendationsForUser(userId).subscribe({
      next: (docs: DocumentEntity[]) => {
        this.dataSource.data = docs;
        if (docs.length === 0) {
          this.message = 'Aucune recommandation disponible pour le moment.';
        }
      },
      error: (err) => {
        console.error('Erreur chargement recommandations:', err);
        this.message = 'Impossible de charger les recommandations.';
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
