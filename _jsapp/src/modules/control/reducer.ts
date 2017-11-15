import * as actions from './actions'
import { Reducer } from 'redux'

export interface ControlState {
    creatingNewEntity: boolean
}

export const initialState: ControlState = {
    creatingNewEntity: false,
}

// reducer
export const controlReducer: Reducer<ControlState> = (state: ControlState = initialState, action: actions.ControlAction) => {
    switch (action.type) {
        case actions.ControlActionTypes.PREPARE_NEW_ENTIY:
            return <ControlState>{
                ...state,
                creatingNewEntity: true
            }

        case actions.ControlActionTypes.FINISH_CREATE_ENTITY:
            return <ControlState>{
                ...state,
                creatingNewEntity: false
            }

        default:
            return state
    }
}


