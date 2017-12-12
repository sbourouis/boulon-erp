import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupplierListComponent} from '../components/suppliers/supplier-list/supplier-list.component';
import {SupplierFormComponent} from '../components/suppliers/supplier-form/supplier-form.component';
import {SupplierDetailsContainerComponent} from '../components/suppliers/supplier-details/supplier-details.component';
import {SuppliersService} from '../services/suppliers.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {ProductListComponent} from "../components/products/product-list/product-list.component";
import {ProductFormComponent} from "../components/products/product-form/product-form.component";
import {ProductDetailsComponent} from "../components/products/product-details/product-details.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    SupplierListComponent,
    SupplierDetailsContainerComponent,
    SupplierFormComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductFormComponent
  ],
  exports: [
    SupplierListComponent,
    SupplierDetailsContainerComponent,
    SupplierFormComponent,
    RouterModule,
    ProductListComponent,
    ProductDetailsComponent,
    ProductFormComponent
  ],
  providers: [SuppliersService, ProductsService]
})
export class SharedModule { }
