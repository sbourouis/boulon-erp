import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as materialsActions from '../actions/materials-actions';

import {Actions, Effect} from '@ngrx/effects';
import { Material } from '@app-models';
import {MaterialsService} from '@app-services';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class MaterialsEffects {
  @Effect()
  loadAll$: Observable<Action> = this.actions$
    .ofType(materialsActions.LOAD_ALL)
    .startWith(new materialsActions.LoadAll())
    .switchMap(() =>
      this.materialsService.index()
        .map((materials: Material[]) => new materialsActions.LoadAllSuccess(materials))
    );

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(materialsActions.LOAD)
    .map( (action: materialsActions.Load ) => action.payload)
    .switchMap((id) =>
      this.materialsService.show(id)
        .mergeMap( (material: Material) => {
          return [
            new materialsActions.LoadSuccess(material),
            new materialsActions.SetCurrentMaterialId(material.id)
          ]
        })
    );

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(materialsActions.CREATE)
    .map((action: materialsActions.Create) => action.payload)
    .switchMap((material) => {
      return this.materialsService.create(material)
        .map( (createdMaterial: Material) => new materialsActions.CreateSuccess(createdMaterial))
        .catch(err => {
          alert(err['error']['error']['message']);
          return Observable.of(new materialsActions.Failure({concern: 'CREATE', error: err}));
        })}
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(materialsActions.PATCH)
    .map((action: materialsActions.Patch) => action.payload)
    .switchMap((material: Material) =>
      this.materialsService.update(material)
        .map( (updatedMaterial: Material) => new materialsActions.PatchSuccess({id: updatedMaterial.id, changes: updatedMaterial}))
        .catch(err => {
          alert(err['error']['error']['message']);
          return Observable.of(new materialsActions.Failure({concern: 'PATCH', error: err}));
        })
    );

  @Effect()
  destroy$: Observable<Action> = this.actions$
    .ofType(materialsActions.DELETE)
    .map((action: materialsActions.Delete) => action.payload)
    .switchMap((id: number) =>
      this.materialsService.destroy(id)
        .map( () => new materialsActions.DeleteSuccess(id))
    );

  constructor(
    private actions$: Actions,
    private materialsService: MaterialsService
  ) {}

}
