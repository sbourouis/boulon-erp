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
import { InvoicesComponent } from './components/invoices/invoices.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { ProductsComponent } from './components/products/products.component';
import { AutomatesComponent } from './components/automates/automates.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import * as fromRoot from './store';
import {SharedModule} from './modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    HeaderComponent,
    CustomerComponent,
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
    MatButtonModule,
    SharedModule,
    StoreModule.forRoot(fromRoot.reducers), /* Initialise the Central Store with Application's main reducer*/
    EffectsModule.forRoot([]), /* Start monitoring app's side effects */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
