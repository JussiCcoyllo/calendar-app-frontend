import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './main-page/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
{ path: '**', redirectTo: '/landing-page', pathMatch: 'full' },
{ path: 'landing-page', component: LandingPageComponent},
{ path: 'main', component: MainPageComponent},
{ path: 'login', component: CalendarComponent},
{ path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
