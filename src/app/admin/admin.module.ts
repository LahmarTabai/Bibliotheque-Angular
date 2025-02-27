import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

  ],
  imports: [
    CommonModule,
    FormsModule,

    // Angular Material
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,

    AdminRoutingModule
  ]
})
export class AdminModule {}
