import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromUi from './reducers/ui-reducer';

export interface State {
  ui: fromUi.UiState;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.reducer
};


/// selectors
export const getUiState = createFeatureSelector<fromUi.UiState>('ui');
export const getIsCustomer = createSelector(getUiState, fromUi.getIsCustomer);
