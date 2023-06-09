import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CalendarComponent } from './calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './signup-page/login/login.component';
import { RegisterComponent } from './signup-page/register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskCreateDialogComponent } from './calendar/task-create-dialog/task-create-dialog.component';
import { DeleteTaskDialogComponent } from './calendar/delete-task-dialog/delete-task-dialog.component';

// specify the key where the token is stored in the local storage
export const LOCALSTORAGE_TOKEN_KEY =
  'angular_material_login_and_register_example';

// specify tokenGetter for the angular jwt package
export function tokenGetter() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    MainPageComponent,
    CalendarComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    TaskCreateDialogComponent,
    DeleteTaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPseudoCheckboxModule,
    MatSnackBarModule,
    MatTabsModule,
    CommonModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
