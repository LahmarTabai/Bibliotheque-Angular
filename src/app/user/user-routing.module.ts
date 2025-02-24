import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { EmprunterComponent } from './pages/emprunter/emprunter.component';
import { RetournerComponent } from './pages/retourner/retourner.component';
import { MesEmpruntsComponent } from './pages/mes-emprunts/mes-emprunts.component';
import { DocumentsDispoComponent } from './pages/documents-dispo/documents-dispo.component';
import { EmpruntsActifsComponent } from './pages/emprunts-actifs/emprunts-actifs.component';
import { SearchDocumentsComponent } from './pages/search-documents/search-documents.component';
import { RecommendationsComponent } from './pages/recommendations/recommendations.component';



// On ajoutera plus tard EmprunterComponent, RetournerComponent, etc.
const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent
  },
  {
    path: 'emprunter',
    component: EmprunterComponent
  },
  {
    path: 'retourner',
    component: RetournerComponent
  },
  {
    path: 'mes-emprunts',
    component: MesEmpruntsComponent
  },
  {
    path: 'emprunts-actifs',
    component: EmpruntsActifsComponent
  },
  {
    path: 'documents-dispo',
    component: DocumentsDispoComponent
  },
  {
    path: 'search-documents',
    component: SearchDocumentsComponent
  },
  
  {
    path: 'recommendations',
    component: RecommendationsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
