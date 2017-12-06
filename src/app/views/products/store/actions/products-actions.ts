import {Action} from '@ngrx/store';
import { Product } from '@app-models';
import {Update} from '@ngrx/entity/src/models';

export const LOAD_ALL = '[Products] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Products] LOAD ALL SUCCESS';

export const LOAD = '[Products] LOAD';
export const LOAD_SUCCESS = '[Products] LOAD SUCCESS';

export const CREATE = '[Products] CREATE';
export const CREATE_SUCCESS = '[Products] CREATE SUCCESS';

export const PATCH = '[Products] PATCH';
export const PATCH_SUCCESS = '[Products] PATCH SUCCESS';

export const DELETE = '[Products] DELETE';
export const DELETE_SUCCESS = '[Products] DELETE SUCCESS';

export const FAILURE = '[Products] FAILURE';

export const SET_CURRENT_PRODUCT_ID = '[Products] SET CURRENT PRODUCT ID';

export class SetCurrentProductId implements Action {
  readonly type = SET_CURRENT_PRODUCT_ID;
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
  constructor(public payload: Product) {}
}

export class Patch implements Action {
  readonly type = PATCH;
  constructor(public payload: Product) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Product) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Product) {}
}

export class PatchSuccess implements Action {
  readonly type = PATCH_SUCCESS;
  constructor(public payload: Update<Product>) {}
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
    | SetCurrentProductId
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
