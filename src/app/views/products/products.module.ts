import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from './products.component';
import {SharedModule} from '@app-modules/shared.module';
import {ProductsRoutingModule} from './products-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromProducts from './store';
import {EffectsModule} from '@ngrx/effects';
import {ProductsEffects} from './store/effects/products-effects';
import {ProductsMenuComponent} from './products-menu/products-menu.component';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature('products', fromProducts.reducers),
    EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductsComponent,
    ProductsMenuComponent
  ]
})
export class ProductsModule { }
