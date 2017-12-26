import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupplierListComponent} from '../components/suppliers/supplier-list/supplier-list.component';
import {SupplierFormComponent} from '../components/suppliers/supplier-form/supplier-form.component';
import {SupplierDetailsContainerComponent} from '../components/suppliers/supplier-details/supplier-details.component';
import {SuppliersService} from '../services/suppliers.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {UtilsService} from "../services/utils.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    SupplierListComponent,
    SupplierDetailsContainerComponent,
    SupplierFormComponent,
  ],
  exports: [
    SupplierListComponent,
    SupplierDetailsContainerComponent,
    SupplierFormComponent,
    RouterModule
  ],
  providers: [SuppliersService, UtilsService]
})
export class SharedModule { }
