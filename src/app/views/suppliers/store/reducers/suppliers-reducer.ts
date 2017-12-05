import { Supplier } from '@app-models';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import * as suppliersActions from '../actions/suppliers-actions'
import {Update} from '@ngrx/entity/src/models';

// This adapter will allow is to manipulate suppliers (mostly CRUD operations)
export const suppliersAdapter = createEntityAdapter<Supplier>({
  selectId: (supplier: Supplier) => supplier.id,
  sortComparer: false
});

export interface State extends EntityState<Supplier> {
  currentSupplierId?: number
}

export const INIT_STATE: State = suppliersAdapter.getInitialState({
  currentSupplierId: undefined
});

export function reducer(
  state: State = INIT_STATE,
  {type, payload}: suppliersActions.All
){
  switch (type) {
    case suppliersActions.SET_CURRENT_SUPPLIER_ID : {
      return {...state, currentSupplierId: payload}
    }

    case suppliersActions.LOAD_ALL_SUCCESS : {
      return {...state, ...suppliersAdapter.addAll(payload as Supplier[], state)}
    }

    case suppliersActions.LOAD_SUCCESS || suppliersActions.CREATE_SUCCESS : {
      return {...state, ...suppliersAdapter.addOne(payload as Supplier, state)}
    }

    case suppliersActions.PATCH_SUCCESS : {
      return {
        ...state,
        ...suppliersAdapter.updateOne(payload as Update<Supplier>, state)
      }
    }

    case suppliersActions.DELETE_SUCCESS : {
      return {...state, ...suppliersAdapter.removeOne(payload as number, state)}
    }

    default: {
      return state;
    }
  }
}

export const getCurrentSupplierId = (state: State) => state.currentSupplierId;
