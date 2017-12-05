import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuppliersComponent} from './suppliers.component';
import {SupplierNewComponent} from './supplier-new/supplier-new.component';
import {SupplierIndexComponent} from './supplier-index/supplier-index.component';
import {SupplierDetailComponent} from './supplier-detail/supplier-detail.component';
import {SupplierEditComponent} from './supplier-edit/supplier-edit.component';

const routes: Routes = [
  {
    path: '',
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
        pathMatch: 'full'
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
