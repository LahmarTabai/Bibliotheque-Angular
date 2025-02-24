import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { EmprunterComponent } from './pages/emprunter/emprunter.component';
import { RetournerComponent } from './pages/retourner/retourner.component';
import { MesEmpruntsComponent } from './pages/mes-emprunts/mes-emprunts.component';

// Imports Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DocumentsDispoComponent } from './pages/documents-dispo/documents-dispo.component';
import { EmpruntsActifsComponent } from './pages/emprunts-actifs/emprunts-actifs.component';
import { SearchDocumentsComponent } from './pages/search-documents/search-documents.component';
import { RecommendationsComponent } from './pages/recommendations/recommendations.component';



@NgModule({
  declarations: [
    UserDashboardComponent,
    EmprunterComponent,
    RetournerComponent,
    MesEmpruntsComponent,
    DocumentsDispoComponent,
    EmpruntsActifsComponent,
    SearchDocumentsComponent,
    RecommendationsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,

      // ===== MAT modules pour le DatePicker / Formfield =====
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class UserModule { }
