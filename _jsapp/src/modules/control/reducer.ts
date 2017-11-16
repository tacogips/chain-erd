import * as actions from './actions'
import { Reducer } from 'redux'

export interface ControlState {
    creatingNewEntity: boolean
    repeatAction: boolean
}

export const initialState: ControlState = {
    creatingNewEntity: false,
    repeatAction: false
}

// reducer
export const controlReducer: Reducer<ControlState> = (state: ControlState = initialState, action: actions.ControlAction) => {
    switch (action.type) {
        case actions.ControlActionTypes.PREPARE_NEW_ENTIY:
            return <ControlState>{
                ...state,
                creatingNewEntity: !state.creatingNewEntity,
								repeatAction :action.payload.repeat
            }

        case actions.ControlActionTypes.FINISH_CREATE_ENTITY:
            return <ControlState>{
                ...state,
                creatingNewEntity: false,
								repeatAction :false
            }

        default:
            return state
    }
}


