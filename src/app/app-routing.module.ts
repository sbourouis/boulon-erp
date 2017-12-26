import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ErrorPageComponent,
  HomeComponent
} from './components';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'customers', loadChildren: 'app/views/suppliers/suppliers.module#SuppliersModule', data: {isCustomer: true} },
  {
    path: 'suppliers', loadChildren: 'app/views/suppliers/suppliers.module#SuppliersModule', data: {isCustomer: false}
  },
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
