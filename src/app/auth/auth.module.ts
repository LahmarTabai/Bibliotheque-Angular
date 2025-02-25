import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
