import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './main-page/login/login.component';
import { LoginWithPasswordComponent } from './main-page/login/login-with-password/login-with-password.component';
import { RegisterComponent } from './main-page/register/register.component';
import { RegisterWithPasswordComponent } from './main-page/register/register-with-password/register-with-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { JwtModule } from '@auth0/angular-jwt';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { LandingPageComponent } from './landing-page/landing-page.component';



// specify the key where the token is stored in the local storage
export const LOCALSTORAGE_TOKEN_KEY = 'angular_material_login_and_register_example';

// specify tokenGetter for the angular jwt package
export function tokenGetter() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent, 
    MainPageComponent, 
    LoginComponent, 
    LoginWithPasswordComponent, 
    RegisterComponent, 
    RegisterWithPasswordComponent, 
    CalendarGridComponent, LandingPageComponent
  
    
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPseudoCheckboxModule,
    MatSnackBarModule,
    MatTabsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000', 'localhost:8080']
      }
    })
    


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
