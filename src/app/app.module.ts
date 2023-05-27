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


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent, 
    MainPageComponent, 
    LoginComponent, 
    LoginWithPasswordComponent, 
    RegisterComponent, 
    RegisterWithPasswordComponent
    
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
    MatTabsModule
    


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
