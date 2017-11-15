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
    AutomatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
