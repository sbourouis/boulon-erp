import * as fromSuppliers from './reducers/suppliers-reducer';
import * as fromMaterials from './reducers/materials-reducer';
import * as fromRoot from '@app-root-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface SuppliersState {
  suppliers: fromSuppliers.State;
  materials: fromMaterials.State;
}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
  suppliers: SuppliersState;
}

export const reducers = {
  suppliers: fromSuppliers.reducer,
  materials: fromMaterials.reducer
};

export const getSuppliersRootState = createFeatureSelector<SuppliersState>('suppliers');
export const getSuppliersState = createSelector(
  getSuppliersRootState,
  state => state.suppliers
);
export const getSelectedSupplierId = createSelector(
  getSuppliersState,
  fromSuppliers.getCurrentSupplierId
);
export const getSelectedSupplierMaterials = createSelector(
  getSuppliersState,
  fromSuppliers.getCurrentSupplierMaterials
);
export const {
  selectAll: getAllSuppliers,
  selectEntities: getSupplierEntities
} = fromSuppliers.suppliersAdapter.getSelectors(getSuppliersState);
export const getCurrentSupplier = createSelector(
  getSupplierEntities,
  getSelectedSupplierId,
  (entities, id) => id && entities[id]
);

export const getMaterialsState = createSelector(
  getSuppliersRootState,
  state => state.materials
);
export const getSelectedMaterialId = createSelector(
  getMaterialsState,
  fromMaterials.getCurrentMaterialId
);
export const {
  selectAll: getAllMaterials,
  selectEntities: getMaterialEntities
} = fromMaterials.materialsAdapter.getSelectors(getMaterialsState);
export const getCurrentMaterial = createSelector(
  getMaterialEntities,
  getSelectedMaterialId,
  (entities, id) => id && entities[id]
);
