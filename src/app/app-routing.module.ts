import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainPageComponent } from './signup-page/signup-page.component';
import { CalendarComponent } from './calendar/calendar.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: CalendarComponent },
  { path: 'login', component: MainPageComponent },
  { path: 'register', component: MainPageComponent },
  { path: '**',   redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
