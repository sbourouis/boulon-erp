import { Product } from '@app-models';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import * as productsActions from '../actions/products-actions'
import {Update} from '@ngrx/entity/src/models';

// This adapter will allow is to manipulate products (mostly CRUD operations)
export const productsAdapter = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false
});

export interface State extends EntityState<Product> {
  currentProductId?: number;
}

export const INIT_STATE: State = productsAdapter.getInitialState({
  currentProductId: undefined
});

export function reducer(
  state: State = INIT_STATE,
  {type, payload}: productsActions.All
){
  switch (type) {
    case productsActions.SET_CURRENT_PRODUCT_ID : {
      return {...state, currentProductId: payload};
    }

    case productsActions.LOAD_ALL_SUCCESS : {
      return {...state, ...productsAdapter.addAll(payload as Product[], state)};
    }

    case productsActions.LOAD_SUCCESS || productsActions.CREATE_SUCCESS : {
      return {...state, ...productsAdapter.addOne(payload as Product, state)};
    }

    case productsActions.PATCH_SUCCESS : {
      return {
        ...state,
        ...productsAdapter.updateOne(payload as Update<Product>, state)
      };
    }

    case productsActions.DELETE_SUCCESS : {
      return {...state, ...productsAdapter.removeOne(payload as number, state)};
    }

    default: {
      return state;
    }
  }
}

export const getCurrentProductId = (state: State) => state.currentProductId;
