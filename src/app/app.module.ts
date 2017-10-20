import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  ErrorPageComponent,
  HomeComponent,
  HeaderComponent
} from './components';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
