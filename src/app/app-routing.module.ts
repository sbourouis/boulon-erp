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
import {SupplierIndexComponent} from "./views/suppliers/supplier-index/supplier-index.component";
import {SupplierNewComponent} from "./views/suppliers/supplier-new/supplier-new.component";
import {SupplierEditComponent} from "./views/suppliers/supplier-edit/supplier-edit.component";
import {SupplierDetailComponent} from "./views/suppliers/supplier-detail/supplier-detail.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent, pathMatch: 'full' },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    children: [
      {
        path: '',
        component: SupplierIndexComponent,
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: SupplierNewComponent,
        pathMatch: 'full',
      },
      {
        path: ':supplierId',
        component: SupplierDetailComponent,
        pathMatch: 'full'
      },
      {
        path: ':supplierId/edit',
        component: SupplierEditComponent,
        pathMatch: 'full'
      }]
  },
  { path: 'invoices', component: InvoicesComponent, pathMatch: 'full' },
  { path: 'stocks', component: StocksComponent, pathMatch: 'full' },
  { path: 'automates', component: AutomatesComponent, pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
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
