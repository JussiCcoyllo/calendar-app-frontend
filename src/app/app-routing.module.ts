// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth-guard/auth.guard';
// import { MainPageComponent } from './main-page/main-page.component';
// import { CalendarComponent } from './calendar/calendar.component';
// import { RegisterComponent } from './main-page/register/register.component';

// const routes: Routes = [
// //   {
// //     // Lazy Loading the public module (all children routes will be under '/public/{route from lazy loaded module}')
// //     path: 'main-page',
// //     loadChildren: () => import('./main-page/public.module').then(m => m.PublicModule)
// //   },
// //   {
// //     // Lazy Loading the protected module (all children routes will be under '/protected/{route from lazy loaded module}')
// //     // The guard will check if the user is having a jwt, otherwise he will be redirected to the base route
// //     path: 'protected',
// //     canActivate: [AuthGuard],
// //     loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
// //   },
// //   {
// //     // Redirects all paths that are not matching to the 'public' route/path
// //     path: '**',
// //     redirectTo: 'public',
// //     pathMatch: 'full'
// //   }
// // ];
// { path: 'main-page', component: MainPageComponent},
// { path: 'login', component: CalendarComponent},
// { path: 'register', component: RegisterComponent},
// { path: ''}

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
