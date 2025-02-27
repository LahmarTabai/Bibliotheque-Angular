import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

// import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';





// const routes: Routes = [
//   { path: '', component: AdminDashboardComponent },
//   { path: 'users', component: UserListComponent },
//   { path: 'users/add', component: AddUserComponent },
//   { path: 'users/edit/:id', component: EditUserComponent },
//   { path: 'user-search', component: UserSearchComponent },

//   { path: 'documents', component: DocumentListComponent },
//   { path: 'documents/add', component: AddDocumentComponent },
//   { path: 'documents-dispo', component: DocumentDispoComponent },
//   { path: 'search-documents', component: SearchDocumentsComponent },

//   { path: 'emprunts', component: EmpruntListComponent },
//   { path: 'emprunts-actifs', component: EmpruntActifsComponent },
//   { path: 'emprunts-clotures', component: EmpruntCloturesComponent },
//   { path: 'emprunts-user', component: EmpruntByUserComponent },
//   { path: 'emprunts-stats-users', component: StatsEmpruntsUserComponent },
//   { path: 'emprunts-stats-docTypes', component: StatsEmpruntsDocTypeComponent },
// ];


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'users/edit/:id', component: EditUserComponent },
      { path: 'user-search', component: UserSearchComponent },

      { path: 'documents', component: DocumentListComponent },
      { path: 'documents-dispo', component: DocumentDispoComponent },
      { path: 'search-documents', component: SearchDocumentsComponent },

      { path: 'emprunts', component: EmpruntListComponent },
      { path: 'emprunts-actifs', component: EmpruntActifsComponent },
      { path: 'emprunts-clotures', component: EmpruntCloturesComponent },
      { path: 'emprunts-user', component: EmpruntByUserComponent },
      { path: 'emprunts-stats-users', component: StatsEmpruntsUserComponent },
      { path: 'emprunts-stats-docTypes', component: StatsEmpruntsDocTypeComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
