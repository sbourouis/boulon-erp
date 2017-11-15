import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ErrorPageComponent,
  HomeComponent,
  CustomerComponent,
  SuppliersComponent,
  InvoicesComponent,
  StocksComponent,
  ProductsComponent,
  AutomatesComponent
} from './components';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'automates', component: AutomatesComponent },
  { path: 'products', component: ProductsComponent },
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
