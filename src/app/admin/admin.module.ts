import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Import de DataTablesModule
import { DataTablesModule } from 'angular-datatables';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';



import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { DocumentListComponent } from './pages/document-list/document-list.component';
import { AddDocumentComponent } from './pages/add-document/add-document.component';
import { EmpruntListComponent } from './pages/emprunt-list/emprunt-list.component';
import { EmpruntActifsComponent } from './pages/emprunt-actifs/emprunt-actifs.component';
import { EmpruntCloturesComponent } from './pages/emprunt-clotures/emprunt-clotures.component';
import { DocumentDispoComponent } from './pages/document-dispo/document-dispo.component';
import { EmpruntByUserComponent } from './pages/emprunt-by-user/emprunt-by-user.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { SearchDocumentsComponent } from './pages/search-documents/search-documents.component';
import { StatsEmpruntsUserComponent } from './pages/stats-emprunts-user/stats-emprunts-user.component';
import { StatsEmpruntsDocTypeComponent } from './pages/stats-emprunts-doc-type/stats-emprunts-doc-type.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { EditDocumentComponent } from './pages/edit-document/edit-document.component';
import { EmpruntDetailDialogComponent } from './pages/emprunt-detail-dialog/emprunt-detail-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';








@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    DocumentListComponent,
    AddDocumentComponent,
    EmpruntListComponent,
    EmpruntActifsComponent,
    EmpruntCloturesComponent,
    DocumentDispoComponent,
    EmpruntByUserComponent,
    UserSearchComponent,
    SearchDocumentsComponent,
    StatsEmpruntsUserComponent,
    StatsEmpruntsDocTypeComponent,
    AdminLayoutComponent,
    EditDocumentComponent,
    EmpruntDetailDialogComponent,




  ],
  imports: [
    CommonModule,
    FormsModule,


    // Angular Material
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    // Ajout de DataTablesModule pour le tableau
    DataTablesModule,
    ReactiveFormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,


    AdminRoutingModule
  ]
})
export class AdminModule {}
