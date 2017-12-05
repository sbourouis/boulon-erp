import * as uiActions from '../actions/ui-actions';

export interface UiState {
  isCustomer: boolean;
}

export const INIT_UI_STATE: UiState = {
  isCustomer: undefined
};


export function reducer(state: UiState = INIT_UI_STATE, {type, payload}: uiActions.All): UiState {

  switch (type) {

    case uiActions.SET_IS_CUSTOMER : {
      return Object.assign({}, state, {isCustomer: payload});
    }

    default : {
      return state;
    }
  }
}



// SELECTORS
export const getIsCustomer = (state: UiState) => state.isCustomer;
