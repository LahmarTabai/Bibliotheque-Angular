import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { DocumentTypeStats } from '../../../models/emprunt.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stats-emprunts-doc-type',
  templateUrl: './stats-emprunts-doc-type.component.html',
  styleUrls: ['./stats-emprunts-doc-type.component.css']
})
export class StatsEmpruntsDocTypeComponent implements OnInit {

  displayedColumns: string[] = ['docType', 'totalEmprunts'];
  dataSource = new MatTableDataSource<DocumentTypeStats>();
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.empruntService.getStatsEmpruntsByDocType().subscribe({
      next: (data: DocumentTypeStats[]) => {
        if (data.length === 0) {
          this.errorMessage = 'Aucun résultat pour les stats.';
        } else {
          this.errorMessage = '';
        }
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Erreur chargement stats docType :', err);
        this.errorMessage = 'Impossible de récupérer les stats.';
      }
    });
  }
}
