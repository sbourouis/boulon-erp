import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ErrorPageComponent,
  HomeComponent,
  InvoicesComponent,
  AutomatesComponent
} from './components';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'customers', loadChildren: 'app/views/suppliers/suppliers.module#SuppliersModule', data: {isCustomer: true} },
  {
    path: 'suppliers', loadChildren: 'app/views/suppliers/suppliers.module#SuppliersModule', data: {isCustomer: false}
  },
  { path: 'invoices', component: InvoicesComponent, pathMatch: 'full' },
  { path: 'orders', component: InvoicesComponent, pathMatch: 'full' },
  { path: 'automates', component: AutomatesComponent, pathMatch: 'full' },
  { path: 'products', loadChildren: 'app/views/products/products.module#ProductsModule' },
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
