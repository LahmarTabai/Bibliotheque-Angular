import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
    {
    path: 'register',
    component: RegisterComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

  ,
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
