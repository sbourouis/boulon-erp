import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuppliersComponent} from './suppliers.component';
import {SupplierDetailComponent} from './supplier-detail/supplier-detail.component';
import {SupplierEditComponent} from './supplier-edit/supplier-edit.component';
import {SupplierNewComponent} from './supplier-new/supplier-new.component';
import {SupplierIndexComponent} from './supplier-index/supplier-index.component';
import {SharedModule} from '@app-modules/shared.module';
import {SuppliersRoutingModule} from './suppliers-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromSuppliers from './store'
import {EffectsModule} from '@ngrx/effects';
import {SuppliersEffects} from './store/effects/suppliers-effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SuppliersRoutingModule,
    StoreModule.forFeature('suppliers', fromSuppliers.reducers),
    EffectsModule.forFeature([SuppliersEffects])
  ],
  declarations: [
    SuppliersComponent,
    SupplierDetailComponent,
    SupplierEditComponent,
    SupplierNewComponent,
    SupplierIndexComponent
  ]
})
export class SuppliersModule { }
