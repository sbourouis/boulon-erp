import {Action} from '@ngrx/store';
import { Material } from '@app-models';
import {Update} from '@ngrx/entity/src/models';

export const LOAD_ALL = '[Materials] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Materials] LOAD ALL SUCCESS';

export const LOAD = '[Materials] LOAD';
export const LOAD_SUCCESS = '[Materials] LOAD SUCCESS';

export const CREATE = '[Materials] CREATE';
export const CREATE_SUCCESS = '[Materials] CREATE SUCCESS';

export const PATCH = '[Materials] PATCH';
export const PATCH_SUCCESS = '[Materials] PATCH SUCCESS';

export const DELETE = '[Materials] DELETE';
export const DELETE_SUCCESS = '[Materials] DELETE SUCCESS';

export const FAILURE = '[Materials] FAILURE';

export const SET_CURRENT_MATERIAL_ID = '[Materials] SET CURRENT MATERIAL ID';

export class SetCurrentMaterialId implements Action {
  readonly type = SET_CURRENT_MATERIAL_ID;
  constructor(public payload: number) {}
}

export class LoadAll implements Action {
  readonly type = LOAD_ALL;
  constructor(public payload = null) {}
}

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: number) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Material) {}
}

export class Patch implements Action {
  readonly type = PATCH;
  constructor(public payload: Material) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Material[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Material) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Material) {}
}

export class PatchSuccess implements Action {
  readonly type = PATCH_SUCCESS;
  constructor(public payload: Update<Material>) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: number) {}
}

export class Failure implements Action {
  readonly type = FAILURE;
  constructor (public payload: {concern: 'CREATE' | 'PATCH', error: any}) {}
}

export type All =
SetCurrentMaterialId
| LoadAll
| Load
| Create
| Patch
| Delete
| LoadAllSuccess
| LoadSuccess
| PatchSuccess
| CreateSuccess
| DeleteSuccess
| Failure
