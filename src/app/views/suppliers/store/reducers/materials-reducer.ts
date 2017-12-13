import { Material } from '@app-models';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import * as materialsActions from '../actions/materials-actions'
import {Update} from '@ngrx/entity/src/models';

export const materialsAdapter = createEntityAdapter<Material>({
  selectId: (material: Material) => material.id
});

export interface State extends EntityState<Material> {
  currentMaterialId?: number
}

export const INIT_STATE: State = materialsAdapter.getInitialState({
  currentMaterialId: undefined
});

export function reducer(
  state: State = INIT_STATE,
  {type, payload}: materialsActions.All
){
  switch (type) {
    case materialsActions.SET_CURRENT_MATERIAL_ID : {
      return {...state, currentMaterialId: payload}
    }

    case materialsActions.LOAD_ALL_SUCCESS : {
      return {...state, ...materialsAdapter.addAll(payload as Material[], state)}
    }

    case materialsActions.LOAD_SUCCESS || materialsActions.CREATE_SUCCESS : {
      return {...state, ...materialsAdapter.addOne(payload as Material, state)}
    }

    case materialsActions.PATCH_SUCCESS : {
      return {
        ...state,
        ...materialsAdapter.updateOne(payload as Update<Material>, state)
      }
    }

    case materialsActions.DELETE_SUCCESS : {
      return {...state, ...materialsAdapter.removeOne(payload as number, state)}
    }

    default: {
      return state;
    }
  }
}

export const getCurrentMaterialId = (state: State) => state.currentMaterialId;
