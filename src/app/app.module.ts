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
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromRoot from './store';
import {SharedModule} from './modules/shared.module';
import {StocksService} from "./services/stocks.service";
import {CommandsService} from "./services/commands.service";

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ProductsService} from "./services/products.service";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    SharedModule,
    NgxDatatableModule,
    StoreModule.forRoot(fromRoot.reducers), /* Initialise the Central Store with Application's main reducer*/
    EffectsModule.forRoot([]), /* Start monitoring app's side effects */
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  providers: [CommandsService, StocksService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
