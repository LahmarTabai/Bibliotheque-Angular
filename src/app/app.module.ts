import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './auth/jwt.interceptor'; // chemin à adapter
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from './services/custom-date-adapter'; // chemin à adapter



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService, // pas obligatoire si c'est already providedIn: 'root'
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true  // important : on peut avoir plusieurs intercepteurs
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // Définit le locale par défaut
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, // Définit le locale des composants Material
    { provide: DateAdapter, useClass: CustomDateAdapter } // Utilise notre CustomDateAdapter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
