import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as suppliersActions from '../actions/suppliers-actions';

import {Actions, Effect} from '@ngrx/effects';
import { Supplier } from '@app-models';
import {SuppliersService} from '@app-services';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class SuppliersEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(suppliersActions.LOAD_ALL)
      .startWith(new suppliersActions.LoadAll())
      .switchMap(() =>
          this.suppliersService.index()
              .map((suppliers: Supplier[]) => new suppliersActions.LoadAllSuccess(suppliers))
      );

  @Effect()
  load$: Observable<Action> = this.actions$
      .ofType(suppliersActions.LOAD)
      .map( (action: suppliersActions.Load ) => action.payload)
      .switchMap((id) =>
          this.suppliersService.show(id)
              .mergeMap( (supplier: Supplier) => {
                return [
                    new suppliersActions.LoadSuccess(supplier),
                    new suppliersActions.SetCurrentSupplierId(supplier.id)
                ]
              })
      );

  @Effect()
  getSupplierMaterials$: Observable<Action> = this.actions$
    .ofType(suppliersActions.GET_SUPPLIER_MATERIALS)
    .map( (action: suppliersActions.GetSupplierMaterials) => action.payload)
    .switchMap((id) =>
        this.suppliersService.getMaterials(id)
        .map((materialLines) => new suppliersActions.GetSupplierMaterialsSuccess(materialLines))
    );

  @Effect()
  create$: Observable<Action> = this.actions$
      .ofType(suppliersActions.CREATE)
      .map((action: suppliersActions.Create) => action.payload)
      .switchMap((supplier) => {
          return this.suppliersService.create(supplier)
              .map( (createdSupplier: Supplier) => new suppliersActions.CreateSuccess(createdSupplier))
              .catch(err => {
                alert(err['error']['error']['message']);
                return Observable.of(new suppliersActions.Failure({concern: 'CREATE', error: err}));
              })}
      );

  @Effect()
  update$: Observable<Action> = this.actions$
      .ofType(suppliersActions.PATCH)
      .map((action: suppliersActions.Patch) => action.payload)
      .switchMap((supplier: Supplier) =>
          this.suppliersService.update(supplier)
              .map( (updatedSupplier: Supplier) => new suppliersActions.PatchSuccess({id: updatedSupplier.id, changes: updatedSupplier}))
              .catch(err => {
                alert(err['error']['error']['message']);
                return Observable.of(new suppliersActions.Failure({concern: 'PATCH', error: err}));
              })
      );

  @Effect()
  destroy$: Observable<Action> = this.actions$
      .ofType(suppliersActions.DELETE)
      .map((action: suppliersActions.Delete) => action.payload)
      .switchMap((id: number) =>
          this.suppliersService.destroy(id)
              .map( () => new suppliersActions.DeleteSuccess(id))
      );

  constructor(
      private actions$: Actions,
      private suppliersService: SuppliersService
  ) {}

}
