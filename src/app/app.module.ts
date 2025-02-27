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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
