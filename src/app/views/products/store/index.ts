import * as fromProducts from './reducers/products-reducer';
import * as fromRoot from '@app-root-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ProductsState {
  products: fromProducts.State;
}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
  products: ProductsState;
}

export const reducers = {
  products: fromProducts.reducer
};

export const getProductsRootState = createFeatureSelector<ProductsState>('products');

export const getProductsState = createSelector(
  getProductsRootState,
  state => state.products
);

export const getSelectedProductId = createSelector(
  getProductsState,
  fromProducts.getCurrentProductId
);

export const {
  selectAll: getAllProducts,
  selectEntities: getProductEntities
} = fromProducts.productsAdapter.getSelectors(getProductsState);

export const getCurrentProduct = createSelector(
  getProductEntities,
  getSelectedProductId,
  (entities, id) => id && entities[id]
);
