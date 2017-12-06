import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as productsActions from '../actions/products-actions';

import {Actions, Effect} from '@ngrx/effects';
import { Product } from '@app-models';
import {ProductsService} from '@app-services';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductsEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$
    .ofType(productsActions.LOAD_ALL)
    .startWith(new productsActions.LoadAll())
    .switchMap(() =>
      this.productsService.index()
        .map((products: Product[]) => new productsActions.LoadAllSuccess(products))
    );

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(productsActions.LOAD)
    .map( (action: productsActions.Load ) => action.payload)
    .switchMap((id) =>
      this.productsService.show(id)
        .mergeMap( (product: Product) => {
          return [
            new productsActions.LoadSuccess(product),
            new productsActions.SetCurrentProductId(product.id)
          ]
        })
    );

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(productsActions.CREATE)
    .map((action: productsActions.Create) => action.payload)
    .switchMap((product) => {
      return this.productsService.create(product)
        .map( (createdProduct: Product) => new productsActions.CreateSuccess(createdProduct))
        .catch(err => {
          alert(err['error']['error']['message']);
          return Observable.of(new productsActions.Failure({concern: 'CREATE', error: err}));
        })}
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(productsActions.PATCH)
    .map((action: productsActions.Patch) => action.payload)
    .switchMap((product: Product) =>
      this.productsService.update(product)
        .map( (updatedProduct: Product) => new productsActions.PatchSuccess({id: updatedProduct.id, changes: updatedProduct}))
        .catch(err => {
          alert(err['error']['error']['message']);
          return Observable.of(new productsActions.Failure({concern: 'PATCH', error: err}));
        })
    );

  @Effect()
  destroy$: Observable<Action> = this.actions$
    .ofType(productsActions.DELETE)
    .map((action: productsActions.Delete) => action.payload)
    .switchMap((id: number) =>
      this.productsService.destroy(id)
        .map( () => new productsActions.DeleteSuccess(id))
    );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
