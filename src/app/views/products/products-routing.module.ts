import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products.component';
import {ProductsMenuComponent} from './products-menu/products-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductsMenuComponent,
        pathMatch: 'full'
      },
      // {
      //   path: 'build',
      //   component: ProductsBuildComponent,
      //   pathMatch: 'full'
      // },
      // {
      //   path: '/stock',
      //   component: ProductsStockComponent,
      //   pathMatch: 'full'
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
