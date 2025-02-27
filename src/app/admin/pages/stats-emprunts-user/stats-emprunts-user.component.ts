import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpruntService } from '../../../services/emprunt.service';
import { UserEmpruntStats } from '../../../models/emprunt.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stats-emprunts-user',
  templateUrl: './stats-emprunts-user.component.html',
  styleUrls: ['./stats-emprunts-user.component.css']
})
export class StatsEmpruntsUserComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'userNom', 'userPrenom', 'totalEmprunts'];
  dataSource = new MatTableDataSource<UserEmpruntStats>();
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.empruntService.getStatsEmpruntsByUser().subscribe({
      next: (data: UserEmpruntStats[]) => {
        if (data.length === 0) {
          this.errorMessage = 'Aucun résultat.';
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
        console.error('Erreur chargement stats user :', err);
        this.errorMessage = 'Impossible de récupérer les stats.';
      }
    });
  }
}
