import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ErrorPageComponent,
  HomeComponent
} from './components';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Customers', component: CustomerComponent },
  // { path: 'users', component: UsersComponent, children: [
  //   { path: ':id/:name', component: UserComponent }
  // ] },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
