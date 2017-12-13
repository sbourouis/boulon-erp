import {Action} from '@ngrx/store';
import { Supplier } from '@app-models';
import {Update} from '@ngrx/entity/src/models';

export const LOAD_ALL = '[Suppliers] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Suppliers] LOAD ALL SUCCESS';

export const LOAD = '[Suppliers] LOAD';
export const LOAD_SUCCESS = '[Suppliers] LOAD SUCCESS';

export const CREATE = '[Suppliers] CREATE';
export const CREATE_SUCCESS = '[Suppliers] CREATE SUCCESS';

export const PATCH = '[Suppliers] PATCH';
export const PATCH_SUCCESS = '[Suppliers] PATCH SUCCESS';

export const DELETE = '[Suppliers] DELETE';
export const DELETE_SUCCESS = '[Suppliers] DELETE SUCCESS';

export const FAILURE = '[Suppliers] FAILURE';

export const SET_CURRENT_SUPPLIER_ID = '[Suppliers] SET CURRENT SUPPLIER ID';

export class SetCurrentSupplierId implements Action {
  readonly type = SET_CURRENT_SUPPLIER_ID;
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
  constructor(public payload: Supplier) {}
}

export class Patch implements Action {
  readonly type = PATCH;
  constructor(public payload: Supplier) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Supplier[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Supplier) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Supplier) {}
}

export class PatchSuccess implements Action {
  readonly type = PATCH_SUCCESS;
  constructor(public payload: Update<Supplier>) {}
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
    SetCurrentSupplierId
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
