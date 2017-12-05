import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  ErrorPageComponent,
  HomeComponent,
  HeaderComponent
} from './components';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule, MatToolbarModule, MatButtonModule} from "@angular/material";
import { CustomerComponent } from './components/customer/customer.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { ProductsComponent } from './components/products/products.component';
import { AutomatesComponent } from './components/automates/automates.component';
import { SupplierDetailComponent } from './views/suppliers/supplier-detail/supplier-detail.component';
import { SupplierEditComponent } from './views/suppliers/supplier-edit/supplier-edit.component';
import { SupplierNewComponent } from './views/suppliers/supplier-new/supplier-new.component';
import { SupplierIndexComponent } from './views/suppliers/supplier-index/supplier-index.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SuppliersEffects} from "./store/effects/suppliers-effects";
import { SupplierFormComponent } from './components/suppliers/supplier-form/supplier-form.component';
import { SupplierListComponent } from './components/suppliers/supplier-list/supplier-list.component';
import {
  SupplierDetailsContainerComponent
} from './components/suppliers/supplier-details/supplier-details.component';
import * as fromRoot from './store';
import {SuppliersService} from "./services/suppliers.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    HeaderComponent,
    CustomerComponent,
    SuppliersComponent,
    InvoicesComponent,
    StocksComponent,
    ProductsComponent,
    AutomatesComponent,
    SupplierDetailComponent,
    SupplierEditComponent,
    SupplierNewComponent,
    SupplierIndexComponent,
    SupplierFormComponent,
    SupplierListComponent,
    SupplierDetailsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromRoot.reducers)
  ],
  providers: [SuppliersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
