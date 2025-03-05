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
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

// Date

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../services/moment-date-formats'
// import { MY_FORMATS } from './moment-date-formats'





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
    UserLayoutComponent,

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
    MatIconModule,
    MatSelectModule,


    MatTableModule,
    MatPaginatorModule,
    MatSortModule,


    MatButtonModule,
    MatDialogModule


  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class UserModule { }
